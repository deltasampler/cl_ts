import {vec3_t, mat3_t, TYPE} from "./type.ts";

export function mat3(e00: number = 1.0, e01: number = 0.0, e02: number = 0.0, e10: number = 0.0, e11?: number, e12: number = 0.0, e20: number = 0.0, e21: number = 0.0, e22?: number): mat3_t {
    const out = new TYPE(9);

    out[0] = e00;
    out[1] = e01;
    out[2] = e02;
    out[3] = e10;
    out[4] = e11 ?? e00;
    out[5] = e12;
    out[6] = e20;
    out[7] = e21;
    out[8] = e22 ?? e00;

    return out;
}

export function mat3_new(): mat3_t {
    const out = new TYPE(9);

    out[0] = 0.0;
    out[1] = 0.0;
    out[2] = 0.0;
    out[3] = 0.0;
    out[4] = 0.0;
    out[5] = 0.0;
    out[7] = 0.0;
    out[8] = 0.0;

    return out;
}

export function mat3_x(x: number): mat3_t {
    const out = new TYPE(9);

    out[0] = x;
    out[1] = 0.0;
    out[2] = 0.0;
    out[3] = 0.0;
    out[4] = x;
    out[5] = 0.0;
    out[6] = 0.0;
    out[7] = 0.0;
    out[8] = x;

    return out;
}

export function mat3_all(e00: number, e01: number, e02: number, e10: number, e11: number, e12: number, e20: number, e21: number, e22: number): mat3_t {
    const out = new TYPE(9);

    out[0] = e00;
    out[1] = e01;
    out[2] = e02;
    out[3] = e10;
    out[4] = e11;
    out[5] = e12;
    out[6] = e20;
    out[7] = e21;
    out[8] = e22;

    return out;
}

export function mat3_clone(m: mat3_t): mat3_t {
    const out = new TYPE(9);

    out[0] = m[0];
    out[1] = m[1];
    out[2] = m[2];
    out[3] = m[3];
    out[4] = m[4];
    out[5] = m[5];
    out[6] = m[6];
    out[7] = m[7];
    out[8] = m[8];

    return out;
}

export function mat3_set(m: mat3_t, e00: number, e01: number, e02: number, e10: number, e11: number, e12: number, e20: number, e21: number, e22: number): mat3_t {
    m[0] = e00;
    m[1] = e01;
    m[2] = e02;
    m[3] = e10;
    m[4] = e11;
    m[5] = e12;
    m[6] = e20;
    m[7] = e21;
    m[8] = e22;

    return m;
}

export function mat3_copy(a: mat3_t, b: mat3_t): mat3_t {
    a[0] = b[0];
    a[1] = b[1];
    a[2] = b[2];
    a[3] = b[3];
    a[4] = b[4];
    a[5] = b[5];
    a[6] = b[6];
    a[7] = b[7];
    a[8] = b[8];

    return a;
}

export function mat3_ident(m: mat3_t): mat3_t {
    m[0] = 1.0;
    m[1] = 0.0;
    m[2] = 0.0;
    m[3] = 0.0;
    m[4] = 1.0;
    m[5] = 0.0;
    m[6] = 0.0;
    m[7] = 0.0;
    m[8] = 1.0;

    return m;
}

export function mat3_mul(a: mat3_t, b: mat3_t): mat3_t {
    const out = new TYPE(9);
    const a00 = a[0], a01 = a[1], a02 = a[2],
          a10 = a[3], a11 = a[4], a12 = a[5],
          a20 = a[6], a21 = a[7], a22 = a[8];
    const b00 = b[0], b01 = b[1], b02 = b[2],
          b10 = b[3], b11 = b[4], b12 = b[5],
          b20 = b[6], b21 = b[7], b22 = b[8];

    out[0] = a00 * b00 + a10 * b01 + a20 * b02;
    out[1] = a01 * b00 + a11 * b01 + a21 * b02;
    out[2] = a02 * b00 + a12 * b01 + a22 * b02;
    out[3] = a00 * b10 + a10 * b11 + a20 * b12;
    out[4] = a01 * b10 + a11 * b11 + a21 * b12;
    out[5] = a02 * b10 + a12 * b11 + a22 * b12;
    out[6] = a00 * b20 + a10 * b21 + a20 * b22;
    out[7] = a01 * b20 + a11 * b21 + a21 * b22;
    out[8] = a02 * b20 + a12 * b21 + a22 * b22;

    return out;
}

export function mat3_mul2(a: mat3_t, b: mat3_t): mat3_t {
    const a00 = a[0], a01 = a[1], a02 = a[2],
          a10 = a[3], a11 = a[4], a12 = a[5],
          a20 = a[6], a21 = a[7], a22 = a[8];
    const b00 = b[0], b01 = b[1], b02 = b[2],
          b10 = b[3], b11 = b[4], b12 = b[5],
          b20 = b[6], b21 = b[7], b22 = b[8];

    a[0] = a00 * b00 + a10 * b01 + a20 * b02;
    a[1] = a01 * b00 + a11 * b01 + a21 * b02;
    a[2] = a02 * b00 + a12 * b01 + a22 * b02;
    a[3] = a00 * b10 + a10 * b11 + a20 * b12;
    a[4] = a01 * b10 + a11 * b11 + a21 * b12;
    a[5] = a02 * b10 + a12 * b11 + a22 * b12;
    a[6] = a00 * b20 + a10 * b21 + a20 * b22;
    a[7] = a01 * b20 + a11 * b21 + a21 * b22;
    a[8] = a02 * b20 + a12 * b21 + a22 * b22;

    return a;
}

export function mat3_mul_s(m: mat3_t, s: number): mat3_t {
    const out = new TYPE(9);

    out[0] = m[0] * s;
    out[1] = m[1] * s;
    out[2] = m[2] * s;
    out[3] = m[3] * s;
    out[4] = m[4] * s;
    out[5] = m[5] * s;
    out[6] = m[6] * s;
    out[7] = m[7] * s;
    out[8] = m[8] * s;

    return out;
}

export function mat3_mul_s2(m: mat3_t, s: number): mat3_t {
    m[0] *= s;
    m[1] *= s;
    m[2] *= s;
    m[3] *= s;
    m[4] *= s;
    m[5] *= s;
    m[6] *= s;
    m[7] *= s;
    m[8] *= s;

    return m;
}

export function mat3_mul_mv(m: mat3_t, v: vec3_t): vec3_t {
    const out = new TYPE(3);
    const x = v[0], y = v[1], z = v[2];

    out[0] = x * m[0] + y * m[3] + z * m[6];
    out[1] = x * m[1] + y * m[4] + z * m[7];
    out[2] = x * m[2] + y * m[5] + z * m[8];

    return out;
}

export function mat3_mul_vm(v: vec3_t, m: mat3_t): vec3_t {
    const out = new TYPE(3);
    const x = v[0], y = v[1], z = v[2];

    out[0] = x * m[0] + y * m[1] + z * m[2];
    out[1] = x * m[3] + y * m[4] + z * m[5];
    out[2] = x * m[6] + y * m[7] + z * m[8];

    return out;
}

export function mat3_str(m: mat3_t): string {
    return "mat3(\n" +
        `\t${m[0]}, ${m[3]}, ${m[6]},\n` +
        `\t${m[1]}, ${m[4]}, ${m[7]},\n` +
        `\t${m[2]}, ${m[5]}, ${m[8]}\n` +
        ")"
}

export function mat3_print(m: mat3_t): void {
    console.log(mat3_str(m));
}
