import {cl_he_face_has_vertex} from "./he_face.ts";
import {cl_he_halfedge_is_boundary, cl_he_halfedge_is_free} from "./he_halfedge.ts";
import {he_face_t, he_halfedge_t, he_vertex_t} from "./he_type.ts";
import {vec3_t} from "./type.ts";
import {cl_vec3_dist} from "./vec3.ts";

export function *cl_he_free_halfedges_out_loop(vertex: he_vertex_t, start?: he_halfedge_t) {
    start = start ?? vertex.halfedge!;

    for (const halfedge of cl_he_loop_cw(vertex, start)) {
        if (cl_he_halfedge_is_free(halfedge)) {
            yield halfedge;
        }
    }

    return null;
}

export function *cl_he_free_halfedges_in_loop(vertex: he_vertex_t, start?: he_halfedge_t) {
    start = start ?? vertex.halfedge!;

    for (const halfedge of cl_he_loop_cw(vertex, start)) {
        if (cl_he_halfedge_is_free(halfedge.twin)) {
            yield halfedge.twin;
        }
    }

    return null;
}

export function *cl_he_boundary_halfedges_out_loop(vertex: he_vertex_t, start?: he_halfedge_t) {
    start = start ?? vertex.halfedge!;

    for (const halfedge of cl_he_loop_cw(vertex, start)) {
        if (cl_he_halfedge_is_boundary(halfedge)) {
            yield halfedge;
        }
    }

    return null;
}

export function *cl_he_boundary_halfedges_in_loop(vertex: he_vertex_t, start?: he_halfedge_t) {
    start = start ?? vertex.halfedge!;

    for (const halfedge of cl_he_loop_cw(vertex, start)) {
        if (cl_he_halfedge_is_boundary(halfedge.twin)) {
            yield halfedge.twin;
        }
    }

    return null;
}

export function cl_he_vertex_is_free(vertex: he_vertex_t): boolean {
    if (cl_he_vertex_is_isolated(vertex)) {
      return true;
    }

    for (const halfedge of cl_he_loop_cw(vertex)) {
        if (cl_he_halfedge_is_free(halfedge)) {
            return true;
        }
    }

    return false;
}

export function cl_he_vertex_is_isolated(vertex: he_vertex_t): boolean {
    return vertex.halfedge === null;
}

export function cl_he_common_faces_with_vertex(vertex: he_vertex_t, other: he_vertex_t): he_face_t[] {
    const faces: he_face_t[] = [];

    for (const halfedge of cl_he_loop_cw(vertex)) {
        if (halfedge.face && cl_he_face_has_vertex(halfedge.face, other)) {
            faces.push(halfedge.face);
        }
    }

    return faces;
}

export function cl_he_vertex_matches_position(vertex: he_vertex_t, position: vec3_t, tolerance: number = 1e-10): boolean {
    return cl_vec3_dist(vertex.position, position) < tolerance;
}

export function cl_he_get_halfedge_to_vertex(vertex: he_vertex_t, other: he_vertex_t): he_halfedge_t|null {
    for (const halfedge of cl_he_loop_cw(vertex)) {
        if (halfedge.twin.vertex === other) {
            return halfedge;
        }
    }

    return null;
}

export function cl_he_is_connected_to_vertex(vertex: he_vertex_t, other: he_vertex_t): boolean {
    return cl_he_get_halfedge_to_vertex(vertex, other) !== null;
}

export function *cl_he_loop_cw(vertex: he_vertex_t, start?: he_halfedge_t) {
    start = start ?? vertex.halfedge!;

    if (start && start.vertex === vertex) {
        let curr: he_halfedge_t = start;

        do {
            yield curr;

            curr = curr.twin.next;
        } while(curr != start);
    }

    return null;
}

export function *cl_he_loop_ccw(vertex: he_vertex_t, start?: he_halfedge_t) {
    start = start ?? vertex.halfedge!;

    if (start && start.vertex === vertex) {
        let curr: he_halfedge_t = start;

        do {
            yield curr;

            curr = curr.prev.twin;
        } while(curr != start);
    }

    return null;
}
