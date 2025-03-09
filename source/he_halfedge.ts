import {he_halfedge_t} from "./he_type.ts";

export function he_halfedge_is_free(halfedge: he_halfedge_t): boolean {
    return halfedge.face === null;
}

export function he_halfedge_is_boundary(halfedge: he_halfedge_t): boolean {
    return halfedge.face === null && halfedge.twin.face !== null;
}

export function *he_halfedge_next_loop(start: he_halfedge_t) {
    let curr: he_halfedge_t = start;

    do {
        yield curr;

        curr = curr.next;
    } while(curr !== start);

    return null;
}

export function *he_halfedge_prev_loop(start: he_halfedge_t) {
    let curr: he_halfedge_t = start;

    do {
        yield curr;

        curr = curr.prev;
    } while(curr !== start);

    return null;
}
