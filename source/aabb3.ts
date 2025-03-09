import {vec3_t} from "./type.ts";
import {vec3_abs, vec3_add, vec3_div_s, vec3_sub} from "./vec3.ts";

export class aabb3_t {
    position: vec3_t;
    size: vec3_t;
};

export function aabb3(position: vec3_t, size: vec3_t): aabb3_t {
    const out = new aabb3_t();
    out.position = position;
    out.size = size;

    return out;
}

export function aabb3_half(position: vec3_t, size: vec3_t): aabb3_t {
    const out = new aabb3_t();
    out.position = position;
    out.size = vec3_div_s(size, 2.0);

    return out;
}

export function aabb3_minmax(min: vec3_t, max: vec3_t): aabb3_t {
    const out = new aabb3_t();
    out.position = out.position = vec3_div_s(vec3_add(min, max), 2.0);
    out.size = vec3_abs(vec3_sub(max, min));

    return out;
}
