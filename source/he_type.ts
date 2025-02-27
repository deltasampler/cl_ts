import {vec3_t} from "./type.ts";

export class he_halfedge_t {
    twin: he_halfedge_t;
    prev: he_halfedge_t;
    next: he_halfedge_t;
    vertex: he_vertex_t;
    face: he_face_t|null;

    constructor(vertex: he_vertex_t) {
        this.vertex = vertex;
    }
};

export class he_vertex_t {
    halfedge: he_halfedge_t|null;
    position: vec3_t;
};

export class he_face_t {
    halfedge: he_halfedge_t;

    constructor(halfedge: he_halfedge_t) {
        this.halfedge = halfedge;
    }
};
