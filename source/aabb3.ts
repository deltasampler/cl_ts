import {vec3_t} from "./type.ts";
import {cl_vec3_abs, cl_vec3_add, cl_vec3_div_s, cl_vec3_sub} from "./vec3.ts";

export class aabb3_t {
    position: vec3_t;
    size: vec3_t;
};

export function cl_aabb3(position: vec3_t, size: vec3_t): aabb3_t {
    const out = new aabb3_t();
    out.position = position;
    out.size = size;

    return out;
}

export function cl_aabb3_half(position: vec3_t, size: vec3_t): aabb3_t {
    const out = new aabb3_t();
    out.position = position;
    out.size = cl_vec3_div_s(size, 2.0);

    return out;
}

export function cl_aabb3_minmax(min: vec3_t, max: vec3_t): aabb3_t {
    const out = new aabb3_t();
    out.position = out.position = cl_vec3_div_s(cl_vec3_add(min, max), 2.0);
    out.size = cl_vec3_abs(cl_vec3_sub(max, min));

    return out;
}
