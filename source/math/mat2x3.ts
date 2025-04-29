import {abs, EPSILON} from "./math.ts";

export type mat2x3_t = Float32Array;
export const TYPE = Float32Array;

// creation
export function mat2x3(e00: number = 1.0, e01: number = 0.0, e10: number = 0.0, e11?: number, e20: number = 0.0, e21: number = 0.0): mat2x3_t {
    const out = new TYPE(6);

    out[0] = e00;
    out[1] = e01;
    out[2] = e10;
    out[3] = e11 ?? e00;
    out[4] = e20;
    out[5] = e21;

    return out;
}

export function mat2x3_set(out: mat2x3_t, e00: number, e01: number, e10: number, e11: number, e20: number, e21: number): void {
    out[0] = e00;
    out[1] = e01;
    out[2] = e10;
    out[3] = e11;
    out[4] = e20;
    out[5] = e21;
}

export function mat2x3_copy(out: mat2x3_t, m: mat2x3_t): void {
    out[0] = m[0];
    out[1] = m[1];
    out[2] = m[2];
    out[3] = m[3];
    out[4] = m[4];
    out[5] = m[5];
}

export function mat2x3n_copy(m: mat2x3_t): mat2x3_t {
    const out = new TYPE(6);

    mat2x3_copy(out, m);

    return out;
}

// unary
export function mat2x3_zero(out: mat2x3_t): void {
    out[0] = 0.0;
    out[1] = 0.0;
    out[2] = 0.0;
    out[3] = 0.0;
    out[4] = 0.0;
    out[5] = 0.0;
}

export function mat2x3n_zero(): mat2x3_t {
    const out = new TYPE(6);

    mat2x3_zero(out);

    return out;
}

export function mat2x3_ident(out: mat2x3_t): void {
    out[0] = 1.0;
    out[1] = 0.0;
    out[2] = 0.0;
    out[3] = 1.0;
    out[4] = 0.0;
    out[5] = 0.0;
}

export function mat2x3n_ident(): mat2x3_t {
    const out = new TYPE(6);

    mat2x3_ident(out);

    return out;
}

// arithmetic matrix x matrix
export function mat2x3_add(out: mat2x3_t, m0: mat2x3_t, m1: mat2x3_t): void {
    out[0] = m0[0] + m1[0];
    out[1] = m0[1] + m1[1];
    out[2] = m0[2] + m1[2];
    out[3] = m0[3] + m1[3];
    out[4] = m0[4] + m1[4];
    out[5] = m0[5] + m1[5];
}

export function mat2x3n_add(m0: mat2x3_t, m1: mat2x3_t): mat2x3_t {
    const out = new TYPE(6);

    mat2x3_add(out, m0, m1);

    return out;
}

export function mat2x3m_add(out: mat2x3_t, m: mat2x3_t): void {
    mat2x3_add(out, out, m);
}

export function mat2x3_sub(out: mat2x3_t, m0: mat2x3_t, m1: mat2x3_t): void {
    out[0] = m0[0] - m1[0];
    out[1] = m0[1] - m1[1];
    out[2] = m0[2] - m1[2];
    out[3] = m0[3] - m1[3];
    out[4] = m0[4] - m1[4];
    out[5] = m0[5] - m1[5];
}

export function mat2x3n_sub(m0: mat2x3_t, m1: mat2x3_t): mat2x3_t {
    const out = new TYPE(6);

    mat2x3_sub(out, m0, m1);

    return out;
}

export function mat2x3m_sub(out: mat2x3_t, m: mat2x3_t): void {
    mat2x3_sub(out, out, m);
}

// arithmetic matrix x scalar
export function mat2x3_muls(out: mat2x3_t, m: mat2x3_t, s: number): void {
    out[0] = m[0] * s;
    out[1] = m[1] * s;
    out[2] = m[2] * s;
    out[3] = m[3] * s;
    out[4] = m[4] * s;
    out[5] = m[5] * s;
}

export function mat2x3n_muls(m: mat2x3_t, s: number): mat2x3_t {
    const out = new TYPE(6);

    mat2x3_muls(out, m, s);

    return out;
}

export function mat2x3m_muls(out: mat2x3_t, s: number): void {
    mat2x3_muls(out, out, s);
}

// arithmetic matrix x matrix x scalar
export function mat2x3_addmuls(out: mat2x3_t, m0: mat2x3_t, m1: mat2x3_t, s: number): void {
    out[0] = m0[0] + m1[0] * s;
    out[1] = m0[1] + m1[1] * s;
    out[2] = m0[2] + m1[2] * s;
    out[3] = m0[3] + m1[3] * s;
    out[4] = m0[4] + m1[4] * s;
    out[5] = m0[5] + m1[5] * s;
}

export function mat2x3n_addmuls(m0: mat2x3_t, m1: mat2x3_t, s: number): mat2x3_t {
    const out = new TYPE(6);

    mat2x3_addmuls(out, m0, m1, s);

    return out;
}

export function mat2x3m_addmuls(out: mat2x3_t, m: mat2x3_t, s: number): void {
    mat2x3_addmuls(out, out, m, s);
}

// product matrix x matrix
export function mat2x3_mul(out: mat2x3_t, m0: mat2x3_t, m1: mat2x3_t): void {
    let a00 = m0[0], a01 = m0[1],
        a10 = m0[2], a11 = m0[3],
        a20 = m0[4], a21 = m0[5];
    let b00 = m1[0], b01 = m1[1],
        b10 = m1[2], b11 = m1[3],
        b20 = m1[4], b21 = m1[5];

    out[0] = a00 * b00 + a10 * b01;
    out[1] = a01 * b00 + a11 * b01;
    out[2] = a00 * b10 + a10 * b11;
    out[3] = a01 * b10 + a11 * b11;
    out[4] = a00 * b20 + a10 * b21 + a20;
    out[5] = a01 * b20 + a11 * b21 + a21;
}

export function mat2x3n_mul(m0: mat2x3_t, m1: mat2x3_t): mat2x3_t {
    const out = new TYPE(6);

    mat2x3_mul(out, m0, m1);

    return out;
}

export function mat2x3m_mul(out: mat2x3_t, m: mat2x3_t): void {
    mat2x3_mul(out, out, m);
}

// special
export function mat2x3_det(m: mat2x3_t): number {
    return m[0] * m[3] - m[1] * m[2];
}

export function mat2x3_frob(m: mat2x3_t): number {
    return Math.hypot(
        m[0], m[1],
        m[2], m[3],
        m[4], m[5], 1.0
    );
}

export function mat2x3_inv(out: mat2x3_t, m: mat2x3_t): void {
    const e00 = m[0], e01 = m[1],
          e10 = m[2], e11 = m[3],
          e20 = m[4], e21 = m[5];
    let det = e00 * e11 - e01 * e10;

    if (abs(det) < EPSILON) {
        return;
    }

    det = 1.0 / det;

    out[0] = e11 * det;
    out[1] = -e01 * det;
    out[2] = -e10 * det;
    out[3] = e00 * det;
    out[4] = (e10 * e21 - e11 * e20) * det;
    out[5] = (e01 * e20 - e00 * e21) * det;
}

export function mat2x3n_inv(m: mat2x3_t): mat2x3_t {
    const out = new TYPE(6);

    mat2x3_inv(out, m);

    return out;
}

export function mat2x3m_inv(out: mat2x3_t): void {
    mat2x3_inv(out, out);
}

export function mat2x3_str(m: mat2x3_t): string {
    return "mat2x3(\n" +
        `\t${m[0]}, ${m[3]},\n` +
        `\t${m[1]}, ${m[4]},\n` +
        `\t${m[2]}, ${m[5]}\n` +
        ")";
}

export function mat2x3_print(m: mat2x3_t): void {
    console.log(mat2x3_str(m));
}
