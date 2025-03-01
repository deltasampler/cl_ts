import {vec2_t} from "./type.ts";

export class ray2_t {
    position: vec2_t;
    direction: vec2_t;
};

export function cl_ray2(position: vec2_t, direction: vec2_t): ray2_t {
    const out = new ray2_t();
    out.position = position;
    out.direction = direction;

    return out;
}
