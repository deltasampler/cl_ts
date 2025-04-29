import {mat2x3_t, TYPE} from "./mat2x3.ts";
import {vec2_t} from "./vec2.ts";

export function mat2x3_translation(out: mat2x3_t, v: vec2_t): void {
    out[0] = 1.0;
    out[1] = 0.0;
    out[2] = 0.0;
    out[3] = 1.0;
    out[4] = v[0];
    out[5] = v[1];
}

export function mat2x3n_translation(v: vec2_t): mat2x3_t {
    const out = new TYPE(6);

    mat2x3_translation(out, v);

    return out;
}

export function mat2x3_rotation(out: mat2x3_t, r: number): void {
    const s = Math.sin(r), c = Math.cos(r);

    out[0] = c;
    out[1] = s;
    out[2] = -s;
    out[3] = c;
    out[4] = 0.0;
    out[5] = 0.0;
}

export function mat2x3n_rotation(r: number): mat2x3_t {
    const out = new TYPE(6);

    mat2x3_rotation(out, r);

    return out;
}

export function mat2x3_scaling(out: mat2x3_t, v: vec2_t): void {
    out[0] = v[0];
    out[1] = 0.0;
    out[2] = 0.0;
    out[3] = v[1];
    out[4] = 0.0;
    out[5] = 0.0;
}

export function mat2x3n_scaling(v: vec2_t): mat2x3_t {
    const out = new TYPE(6);

    mat2x3_scaling(out, v);

    return out;
}

export function mat2x3_translate(out: mat2x3_t, m: mat2x3_t, v: vec2_t): void {
    const e00 = m[0], e01 = m[1],
          e10 = m[2], e11 = m[3],
          e20 = m[4], e21 = m[5];
    const x = v[0], y = v[1];

    out[0] = e00;
    out[1] = e01;
    out[2] = e10;
    out[3] = e11;
    out[4] = e00 * x + e10 * y + e20;
    out[5] = e01 * x + e11 * y + e21;
}

export function mat2x3n_translate(m: mat2x3_t, v: vec2_t): mat2x3_t {
    const out = new TYPE(6);

    mat2x3_translate(out, m, v);

    return out;
}

export function mat2x3m_translate(out: mat2x3_t, v: vec2_t): void {
    mat2x3_translate(out, out, v);
}

export function mat2x3_rotate(out: mat2x3_t, m: mat2x3_t, r: number): void {
    const e00 = m[0], e01 = m[1],
          e10 = m[2], e11 = m[3],
          e20 = m[4], e21 = m[5];
    const s = Math.sin(r), c = Math.cos(r);

    out[0] = e00 * c + e10 * s;
    out[1] = e01 * c + e11 * s;
    out[2] = e00 * -s + e10 * c;
    out[3] = e01 * -s + e11 * c;
    out[4] = e20;
    out[5] = e21;
}

export function mat2x3n_rotate(m: mat2x3_t, r: number): mat2x3_t {
    const out = new TYPE(6);

    mat2x3_rotate(out, m, r);

    return out;
}

export function mat2x3m_rotate(out: mat2x3_t, r: number): void {
    mat2x3_rotate(out, out, r);
}

export function mat2x3_scale(out: mat2x3_t, m: mat2x3_t, v: vec2_t): void {
    const e00 = m[0], e01 = m[1],
          e10 = m[2], e11 = m[3],
          e20 = m[4], e21 = m[5];
    const x = v[0], y = v[1];

    out[0] = e00 * x;
    out[1] = e01 * x;
    out[2] = e10 * y;
    out[3] = e11 * y;
    out[4] = e20;
    out[5] = e21;
}

export function mat2x3n_scale(m: mat2x3_t, v: vec2_t): mat2x3_t {
    const out = new TYPE(6);

    mat2x3_scale(out, m, v);

    return out;
}

export function mat2x3m_scale(out: mat2x3_t, v: vec2_t): void {
    mat2x3_scale(out, out, v);
}
