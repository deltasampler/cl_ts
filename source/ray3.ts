import {vec3_t} from "./type.ts";

export class ray3_t {
    position: vec3_t;
    direction: vec3_t;
};

export function cl_ray3(position: vec3_t, direction: vec3_t): ray3_t {
    const out = new ray3_t();
    out.position = position;
    out.direction = direction;

    return out;
}
