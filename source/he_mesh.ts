import {he_face_halfedge_from_vertex} from "./he_face.ts";
import {he_halfedge_next_loop} from "./he_halfedge.ts";
import {he_face_t, he_halfedge_t, he_vertex_t} from "./he_type.ts";
import {he_free_halfedges_in_loop, he_free_halfedges_out_loop, he_get_halfedge_to_vertex, he_loop_cw, he_vertex_is_free, he_vertex_matches_position} from "./he_vertex.ts";
import {vec3_t} from "./type.ts";
import {vec3_copy} from "./vec3.ts";

export class he_mesh_t {
    faces: he_face_t[];
    vertices: he_vertex_t[];
    halfedges: he_halfedge_t[];
};

export function he_array_remove(array: any[], value: any): boolean {
    const i = array.indexOf(value);

    if (i > -1) {
        array.splice(i, 1);

        return true;
    }

    return false;
}

export function he_mesh_add_edge(struct: he_mesh_t, v1: he_vertex_t, v2: he_vertex_t, allow_parallels: boolean = false): he_halfedge_t|null {
    if (v1 === v2) {
        return null;
    }

    if (!allow_parallels) {
        const current_half_edge = he_get_halfedge_to_vertex(v1, v2);

        if (current_half_edge) {
            return current_half_edge;
        }
    }

    if (!he_vertex_is_free(v1) || !he_vertex_is_free(v2)) {
        return null;
    }

    const h1 = new he_halfedge_t(v1);
    const h2 = new he_halfedge_t(v2);
    h1.twin = h2;
    h1.next = h2;
    h1.prev = h2;
    h2.twin = h1;
    h2.next = h1;
    h2.prev = h1;

    const in1 = he_free_halfedges_in_loop(v1).next().value;

    if (in1) {
        const out1 = in1.next;
        h1.prev = in1;
        in1.next = h1;

        h2.next = out1;
        out1.prev = h2;
    } else {
        v1.halfedge = h1;
    }

    const in2 = he_free_halfedges_in_loop(v2).next().value;

    if (in2) {
        const out2 = in2.next;

        h2.prev = in2;
        in2.next = h2;

        h1.next = out2;
        out2.prev = h1;
    } else {
        v2.halfedge = h2;
    }

    struct.halfedges.push(h1);
    struct.halfedges.push(h2);

    return h1;
}

export function he_mesh_make_halfedges_adjacent(half_in: he_halfedge_t, half_out: he_halfedge_t): boolean {
    if (half_in.next === half_out) {
        return true;
    }

    let g: he_halfedge_t|null = null;
    const loop = he_free_halfedges_in_loop(half_out.vertex, half_out);
    let he = loop.next();

    while (!g && !he.done) {
        if (he.value !== half_in) {
            g = he.value;
        }

        he = loop.next();
    }

    if (!g) {
        return false;
    }

    const b = half_in.next;
    const d = half_out.prev;
    const h = g.next;

    half_in.next = half_out;
    half_out.prev = half_in;

    g.next = b;
    b.prev = g;

    d.next = h;
    h.prev = d;

    return true;
}

export function he_mesh_add_face(struct: he_mesh_t, halfedges: he_halfedge_t[]): he_face_t|null {
    const size = halfedges.length;

    if (size < 2) {
        return null;
    }

    for (let i = 0; i < size; i += 1) {
        const curr = halfedges[i];
        const next = halfedges[(i + 1) % size];

        if (curr.face) {
            return null;
        }

        if (curr.twin.vertex !== next.vertex) {
            return null;
        }
    }

    for (let i = 0; i < size; i += 1) {
        const curr = halfedges[i];
        const next = halfedges[(i + 1) % size];

        if (!he_mesh_make_halfedges_adjacent(curr, next)) {
            return null;
        }
    }

    const face = new he_face_t(halfedges[0]);

    for (const halfedge of halfedges) {
        halfedge.face = face;
    }

    struct.faces.push(face);

    return face;
}

export function he_mesh_add_vertex(struct: he_mesh_t, position: vec3_t, check_duplicates: boolean = false, tolerance: number = 1e-10): he_vertex_t {
    if (check_duplicates) {
        for (const vertex of struct.vertices) {
            if (he_vertex_matches_position(vertex, position, tolerance)) {
                return vertex;
            }
        }
    }

    const v = new he_vertex_t();
    vec3_copy(v.position, position);
    struct.vertices.push(v);

    return v;
}

export function he_mesh_remove_face(struct: he_mesh_t, face: he_face_t): void {
    if (!he_array_remove(struct.faces, face)) {
        return;
    }

    for (const halfedge of he_halfedge_next_loop(face.halfedge)) {
        halfedge.face = null;
    }
}

export function he_mesh_remove_edge(struct: he_mesh_t, halfedge: he_halfedge_t, merge_faces = true): void {
    const twin = halfedge.twin;

    if (merge_faces && halfedge.face && twin.face) {
        he_mesh_remove_face(struct, twin.face);
        halfedge.face.halfedge = halfedge.prev;
    } else {
        if (halfedge.face) {
            he_mesh_remove_face(struct, halfedge.face);
        }

        if (twin.face) {
            he_mesh_remove_face(struct, twin.face);
        }
    }

    const v1 = halfedge.vertex;

    if (twin.next === halfedge) {
        v1.halfedge = null;
    } else {
        v1.halfedge = twin.next;
        halfedge.prev.next = twin.next;
        twin.next.prev = halfedge.prev;
    }

    const v2 = twin.vertex;

    if (halfedge.next === twin) {
        v2.halfedge = null;
    } else {
        v2.halfedge = halfedge.next;
        halfedge.next.prev = twin.prev;
        twin.prev.next = halfedge.next
    }

    he_array_remove(struct.halfedges, halfedge);
    he_array_remove(struct.halfedges, twin);
}

export function he_mesh_remove_vertex(struct: he_mesh_t, vertex: he_vertex_t, merge_faces: boolean = true): void {
    for (const halfedge of he_loop_cw(vertex)) {
        he_mesh_remove_edge(struct, halfedge, merge_faces);
    }

    he_array_remove(struct.vertices, vertex);
}

export function he_mesh_cut_face(struct: he_mesh_t, face: he_face_t, v1: he_vertex_t, v2: he_vertex_t, create_new_face: boolean = true): he_halfedge_t|null {
    if (v1 === v2) {
        return null;
    }

    let out1 = he_face_halfedge_from_vertex(face, v1);

    if (!out1 && !he_vertex_is_free(v1)) {
        return null;
    }

    let out2 = he_face_halfedge_from_vertex(face, v2);

    if (!out2 && !he_vertex_is_free(v2)) {
        return null;
    }

    if ((out1 && out1.next.vertex === v2) || (out2 && out2.next.vertex === v1)) {
        return null;
    }

    const h1 = new he_halfedge_t(v1);
    const h2 = new he_halfedge_t(v2);
    h1.face = face;
    h2.face = face;
    h1.twin = h2;
    h1.next = h2;
    h1.prev = h2;
    h2.twin = h1;
    h2.next = h1;
    h2.prev = h1;

    out1 = out1 ?? he_free_halfedges_out_loop(v1).next().value;

    if (out1) {
        const in1 = out1.prev;
        h1.prev = in1;
        in1.next = h1;

        h2.next = out1;
        out1.prev = h2;
    } else {
        v1.halfedge = h1;
    }

    out2 = out2 ?? he_free_halfedges_out_loop(v2).next().value;

    if (out2) {
        const in2 = out2.prev;
        h2.prev = in2;
        in2.next = h2;

        h1.next = out2;
        out2.prev = h1;
    } else {
        v2.halfedge = h2;
    }

    struct.halfedges.push(h1);
    struct.halfedges.push(h2);

    for (const he of he_halfedge_next_loop(face.halfedge)){
        he.face = face;
    }

    let found = false;
    const loop = he_halfedge_next_loop(h1);
    let h = loop.next();

    while(!found && !h.done) {
        found = h.value === h2;
        h = loop.next();
    }

    if (!found) {
        face.halfedge = h1;

        let new_face: he_face_t|null = null;

        if (create_new_face) {
            new_face = new he_face_t(h2);
            struct.faces.push(new_face);
        }

        for (const h of he_halfedge_next_loop(h2)) {
            h.face = new_face;
        }
    }

    return h1;
}

export function he_mesh_split_edge(struct: he_mesh_t, halfedge: he_halfedge_t, position: vec3_t, tolerance: number = 1e-10): he_vertex_t {
    const twin = halfedge.twin;
    const a = halfedge.vertex;
    const b = twin.vertex;

    if (he_vertex_matches_position(a, position, tolerance)) {
        return a;
    }

    if (he_vertex_matches_position(b, position, tolerance)) {
        return b;
    }

    const new_vertex = new he_vertex_t();
    vec3_copy(new_vertex.position, position);

    const new_halfedge = new he_halfedge_t(new_vertex);
    const new_twin = new he_halfedge_t(b);
    new_halfedge.twin = new_twin;
    new_twin.twin = new_halfedge;

    a.halfedge = halfedge;
    new_vertex.halfedge = new_halfedge;
    b.halfedge = new_twin;

    new_halfedge.face = halfedge.face;
    new_twin.face = twin.face;

    new_halfedge.next = halfedge.next;
    new_halfedge.prev = halfedge;
    halfedge.next = new_halfedge;
    new_twin.next = twin;
    new_twin.prev = twin.prev;
    twin.prev = new_twin;

    struct.vertices.push(new_vertex);
    struct.halfedges.push(new_halfedge);
    struct.halfedges.push(new_twin);

    return new_vertex;
}
