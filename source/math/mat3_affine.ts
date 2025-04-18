import {mat3_t} from "./mat3.ts";
import {vec2_t} from "./vec2.ts";

export function mat3_translation(out: mat3_t, v: vec2_t): mat3_t {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 1;
    out[5] = 0;
    out[6] = v[0];
    out[7] = v[1];
    out[8] = 1;

    return out;
}

export function mat3_rotation(out: mat3_t, r: number) {
    const s = Math.sin(r),
          c = Math.cos(r);

    out[0] = c;
    out[1] = s;
    out[2] = 0;
    out[3] = -s;
    out[4] = c;
    out[5] = 0;
    out[6] = 0;
    out[7] = 0;
    out[8] = 1;

    return out;
}

export function mat3_scaling(out: mat3_t, v: vec2_t): mat3_t {
    out[0] = v[0];
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = v[1];
    out[5] = 0;
    out[6] = 0;
    out[7] = 0;
    out[8] = 1;

    return out;
}

export function mat3_translate(out: mat3_t, m: mat3_t, v: vec2_t): mat3_t {
    const a00 = m[0],
          a01 = m[1],
          a02 = m[2],
          a10 = m[3],
          a11 = m[4],
          a12 = m[5],
          a20 = m[6],
          a21 = m[7],
          a22 = m[8],
          x = v[0],
          y = v[1];

    out[0] = a00;
    out[1] = a01;
    out[2] = a02;
    out[3] = a10;
    out[4] = a11;
    out[5] = a12;
    out[6] = x * a00 + y * a10 + a20;
    out[7] = x * a01 + y * a11 + a21;
    out[8] = x * a02 + y * a12 + a22;

    return out;
}

export function mat3_rotate(out: mat3_t, m: mat3_t, r: number): mat3_t {
    const a00 = m[0],
          a01 = m[1],
          a02 = m[2],
          a10 = m[3],
          a11 = m[4],
          a12 = m[5],
          a20 = m[6],
          a21 = m[7],
          a22 = m[8],
          s = Math.sin(r),
          c = Math.cos(r);

    out[0] = c * a00 + s * a10;
    out[1] = c * a01 + s * a11;
    out[2] = c * a02 + s * a12;
    out[3] = c * a10 - s * a00;
    out[4] = c * a11 - s * a01;
    out[5] = c * a12 - s * a02;
    out[6] = a20;
    out[7] = a21;
    out[8] = a22;

    return out;
}

export function mat3_scale(out: mat3_t, m: mat3_t, v: vec2_t): mat3_t {
    const x = v[0], y = v[1];

    out[0] = x * m[0];
    out[1] = x * m[1];
    out[2] = x * m[2];
    out[3] = y * m[3];
    out[4] = y * m[4];
    out[5] = y * m[5];
    out[6] = m[6];
    out[7] = m[7];
    out[8] = m[8];

    return out;
}
