import {mat2_t} from "./mat2.ts";
import {vec2_t} from "./vec2.ts";

export function mat2_rotation(out: mat2_t, r: number): mat2_t {
    const s = Math.sin(r), c = Math.cos(r);

    out[0] = c;
    out[1] = s;
    out[2] = -s;
    out[3] = c;

    return out;
}

export function mat2_scaling(out: mat2_t, v: vec2_t): mat2_t {
    out[0] = v[0];
    out[1] = 0;
    out[2] = 0;
    out[3] = v[1];

    return out;
}

export function mat2_rotate(out: mat2_t, m: mat2_t, r: number): mat2_t {
    const m0 = m[0], m1 = m[1],
          m2 = m[2], m3 = m[3];
    const s = Math.sin(r), c = Math.cos(r);

    out[0] = m0 * c + m2 * s;
    out[1] = m1 * c + m3 * s;
    out[2] = m0 * -s + m2 * c;
    out[3] = m1 * -s + m3 * c;

    return out;
}

export function mat2_scale(out: mat2_t, m: mat2_t, v: vec2_t): mat2_t {
    const x = v[0], y = v[1];

    out[0] = m[0] * x;
    out[1] = m[1] * x;
    out[2] = m[2] * y;
    out[3] = m[3] * y;

    return out;
}
