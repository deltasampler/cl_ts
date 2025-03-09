import {vec2_t, mat2_t, TYPE} from "./type.ts";

export function cl_mat2(e00: number = 1.0, e01: number = 0.0, e10: number = 0.0, e11?: number): mat2_t {
    const out = new TYPE(4);

    out[0] = e00;
    out[1] = e01;
    out[2] = e10;
    out[3] = e11 ?? e00;

    return out;
}

export function cl_mat2_new(): mat2_t {
    const out = new TYPE(4);

    out[0] = 0.0;
    out[1] = 0.0;
    out[2] = 0.0;
    out[3] = 0.0;

    return out;
}

export function cl_mat2_x(x: number): mat2_t {
    const out = new TYPE(4);

    out[0] = x;
    out[1] = 0.0;
    out[2] = 0.0;
    out[3] = x;

    return out;
}

export function cl_mat2_all(e00: number, e01: number, e10: number, e11: number): mat2_t {
    const out = new TYPE(4);

    out[0] = e00;
    out[1] = e01;
    out[2] = e10;
    out[3] = e11;

    return out;
}

export function cl_mat2_clone(m: mat2_t): mat2_t {
    const out = new TYPE(4);

    out[0] = m[0];
    out[1] = m[1];
    out[2] = m[2];
    out[3] = m[3];

    return out;
}

export function cl_mat2_set(m: mat2_t, e00: number, e01: number, e10: number, e11: number): mat2_t {
    m[0] = e00;
    m[1] = e01;
    m[2] = e10;
    m[3] = e11;

    return m;
}

export function cl_mat2_copy(a: mat2_t, b: mat2_t): mat2_t {
    a[0] = b[0];
    a[1] = b[1];
    a[2] = b[2];
    a[3] = b[3];

    return a;
}

export function cl_mat2_ident(m: mat2_t): mat2_t {
    m[0] = 1.0;
    m[1] = 0.0;
    m[2] = 0.0;
    m[3] = 1.0;

    return m;
}

export function cl_mat2_mul(a: mat2_t, b: mat2_t): mat2_t {
    const out = new TYPE(4);
    const a00 = a[0], a01 = a[1],
          a10 = a[2], a11 = a[3];
    const b00 = b[0], b01 = b[1],
          b10 = b[2], b11 = b[3];

    out[0] = a00 * b00 + a10 * b01;
    out[1] = a01 * b00 + a11 * b01;
    out[2] = a00 * b10 + a10 * b11;
    out[3] = a01 * b10 + a11 * b11;

    return out;
}

export function cl_mat2_mul2(a: mat2_t, b: mat2_t): mat2_t {
    const a00 = a[0], a01 = a[1],
          a10 = a[2], a11 = a[3];
    const b00 = b[0], b01 = b[1],
          b10 = b[2], b11 = b[3];

    a[0] = a00 * b00 + a10 * b01;
    a[1] = a01 * b00 + a11 * b01;
    a[2] = a00 * b10 + a10 * b11;
    a[3] = a01 * b10 + a11 * b11;

    return a;
}

export function cl_mat2_mul_s(m: mat2_t, s: number): mat2_t {
    const out = new TYPE(4);

    out[0] = m[0] * s;
    out[1] = m[1] * s;
    out[2] = m[2] * s;
    out[3] = m[3] * s;

    return out;
}

export function cl_mat2_mul_s2(m: mat2_t, s: number): mat2_t {
    m[0] *= s;
    m[1] *= s;
    m[2] *= s;
    m[3] *= s;

    return m;
}

export function cl_mat2_mul_mv(m: mat2_t, v: vec2_t): vec2_t {
    const out = new TYPE(2);
    const x = v[0], y = v[1];

    out[0] = x * m[0] + y * m[2];
    out[1] = x * m[1] + y * m[3];

    return out;
}

export function cl_mat2_mul_vm(v: vec2_t, m: mat2_t): vec2_t {
    const out = new TYPE(2);
    const x = v[0], y = v[1];

    out[0] = x * m[0] + y * m[1];
    out[1] = x * m[2] + y * m[3];

    return out;
}

export function cl_mat2_str(m: mat2_t): string {
    return "mat2(\n" +
        `\t${m[0]}, ${m[2]},\n` +
        `\t${m[1]}, ${m[3]},\n` +
        ")";
}

export function cl_mat2_print(m: mat2_t): void {
    console.log(cl_mat2_str(m));
}
