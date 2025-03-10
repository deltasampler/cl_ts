import {vec2_t} from "./type.ts";
import {vec2, vec2_abs, vec2_add1, vec2_divs1, vec2_sub1} from "./vec2.ts";

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

export function aabb2_is_inside(aabb: aabb2_t, point): boolean {
    const hs1 = vec2_divs1(aabb.size, 2.0);

    const l1 = aabb.position[0] - hs1[0];
    const r1 = aabb.position[0] + hs1[0];
    const b1 = aabb.position[1] - hs1[1];
    const t1 = aabb.position[1] + hs1[1];

    return point[0] < r1 && point[0] > l1 && point[1] < t1 && point[1] > b1;
}

export function aabb2_is_overlapping_sideways(a: aabb2_t, b: aabb2_t): boolean {
    const hs1 = vec2_divs1(a.size, 2.0);
    const hs2 = vec2_divs1(b.size, 2.0);

    const l1 = a.position[0] - hs1[0];
    const r1 = a.position[0] + hs1[0];
    const l2 = b.position[0] - hs2[0];
    const r2 = b.position[0] + hs2[0];

    return l1 < r2 && r1 > l2;
}

export function aabb2_is_overlapping_vertically(a: aabb2_t, b: aabb2_t): boolean {
    const hs1 = vec2_divs1(a.size, 2.0);
    const hs2 = vec2_divs1(b.size, 2.0);

    const b1 = a.position[1] - hs1[1];
    const t1 = a.position[1] + hs1[1];
    const b2 = b.position[1] - hs2[1];
    const t2 = b.position[1] + hs2[1];

    return t1 > b2 && b1 < t2;
}

export function aabb2_overlap_aabb(a: aabb2_t, b: aabb2_t): vec2_t|null {
    const hs1 = vec2_divs1(a.size, 2.0);
    const hs2 = vec2_divs1(b.size, 2.0);

    const l1 = a.position[0] - hs1[0];
    const r1 = a.position[0] + hs1[0];
    const b1 = a.position[1] - hs1[1];
    const t1 = a.position[1] + hs1[1];

    const l2 = b.position[0] - hs2[0];
    const r2 = b.position[0] + hs2[0];
    const b2 = b.position[1] - hs2[1];
    const t2 = b.position[1] + hs2[1];

    const is_overlapping = l1 < r2 && r1 > l2 && t1 > b2 && b1 < t2;

    if (!is_overlapping) {
        return null;
    }

    return vec2(
        Math.min(Math.abs(l1 - r2), Math.abs(r1 - l2)),
        Math.min(Math.abs(t1 - b2), Math.abs(b1 - t2))
    );
}
