import {mat2x3_t} from "./mat2x3.ts";
import {vec2_t} from "./vec2.ts";

export function mat2x3_translation(out: mat2x3_t, v: vec2_t): mat2x3_t {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    out[4] = v[0];
    out[5] = v[1];

    return out;
}

export function mat2x3_rotation(out: mat2x3_t, r: number): mat2x3_t {
    const s = Math.sin(r), c = Math.cos(r);

    out[0] = c;
    out[1] = s;
    out[2] = -s;
    out[3] = c;
    out[4] = 0;
    out[5] = 0;

    return out;
}

export function mat2x3_scaling(out: mat2x3_t, v: vec2_t): mat2x3_t {
    out[0] = v[0];
    out[1] = 0;
    out[2] = 0;
    out[3] = v[1];
    out[4] = 0;
    out[5] = 0;

    return out;
}

export function mat2x3_translate(out: mat2x3_t, m: mat2x3_t, v: vec2_t): mat2x3_t {
    const m0 = m[0], m1 = m[1],
          m2 = m[2], m3 = m[3],
          m4 = m[4], m5 = m[5];
    const x = v[0], y = v[1];

    out[0] = m0;
    out[1] = m1;
    out[2] = m2;
    out[3] = m3;
    out[4] = m0 * x + m2 * y + m4;
    out[5] = m1 * x + m3 * y + m5;

    return out;
}

export function mat2x3_rotate(out: mat2x3_t, m: mat2x3_t, r: number): mat2x3_t {
    const m0 = m[0], m1 = m[1],
          m2 = m[2], m3 = m[3],
          m4 = m[4], m5 = m[5];
    const s = Math.sin(r), c = Math.cos(r);

    out[0] = m0 * c + m2 * s;
    out[1] = m1 * c + m3 * s;
    out[2] = m0 * -s + m2 * c;
    out[3] = m1 * -s + m3 * c;
    out[4] = m4;
    out[5] = m5;

    return out;
}

export function mat2x3_scale(out: mat2x3_t, m :mat2x3_t, v: vec2_t): mat2x3_t {
    const m0 = m[0], m1 = m[1],
          m2 = m[2], m3 = m[3],
          m4 = m[4], m5 = m[5];
    const x = v[0], y = v[1];

    out[0] = m0 * x;
    out[1] = m1 * x;
    out[2] = m2 * y;
    out[3] = m3 * y;
    out[4] = m4;
    out[5] = m5;

    return out;
}
