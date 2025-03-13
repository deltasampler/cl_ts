import {vec2_t} from "./type.ts";
import {vec2_abs, vec2_add1, vec2_divs1, vec2_sub1} from "./vec2.ts";

export class aabb2_t {
    position: vec2_t;
    size: vec2_t;
};

export function aabb2(position: vec2_t, size: vec2_t): aabb2_t {
    const out = new aabb2_t();
    out.position = position;
    out.size = size;

    return out;
}

export function aabb2_half(position: vec2_t, size: vec2_t): aabb2_t {
    const out = new aabb2_t();
    out.position = position;
    out.size = vec2_divs1(size, 2.0);

    return out;
}

export function aabb2_minmax(min: vec2_t, max: vec2_t): aabb2_t {
    const out = new aabb2_t();
    out.position = vec2_divs1(vec2_add1(min, max), 2.0);
    out.size = vec2_abs(vec2_sub1(max, min));

    return out;
}
