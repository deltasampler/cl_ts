import {cl_he_halfedge_next_loop} from "./he_halfedge.ts";
import {he_face_t, he_halfedge_t, he_vertex_t} from "./he_type.ts";

export function cl_he_face_halfedge_from_vertex(face: he_face_t, vertex: he_vertex_t): he_halfedge_t|null {
    for (const he of cl_he_halfedge_next_loop(face.halfedge)) {
        if (he.vertex === vertex) {
            return he;
        }
    }

    return null;
}

export function cl_he_face_has_vertex(face: he_face_t, vertex: he_vertex_t): boolean {
    for (const he of cl_he_halfedge_next_loop(face.halfedge)) {
        if (he.vertex === vertex) {
            return true;
        }
    }

    return false;
}
