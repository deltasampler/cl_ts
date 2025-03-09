import {vec4_t, mat4_t, TYPE} from "./type.ts";

export function cl_mat4(e00: number = 1.0, e01: number = 0.0, e02: number = 0.0, e03: number = 0.0, e10: number = 0.0, e11?: number, e12: number = 0.0, e13: number = 0.0, e20: number = 0.0, e21: number = 0.0, e22?: number, e23: number = 0.0, e30: number = 0.0, e31: number = 0.0, e32: number = 0.0, e33?: number): mat4_t {
    const out = new TYPE(16);

    out[0] = e00;
    out[1] = e01;
    out[2] = e02;
    out[3] = e03;
    out[4] = e10;
    out[5] = e11 ?? e00;
    out[6] = e12;
    out[7] = e13;
    out[8] = e20;
    out[9] = e21;
    out[10] = e22 ?? e00;
    out[11] = e23;
    out[12] = e30;
    out[13] = e31;
    out[14] = e32;
    out[15] = e33 ?? e00;

    return out;
}

export function cl_mat4_new(): mat4_t {
    const out = new TYPE(16);

    out[0] = 0.0;
    out[1] = 0.0;
    out[2] = 0.0;
    out[3] = 0.0;
    out[4] = 0.0;
    out[5] = 0.0;
    out[7] = 0.0;
    out[8] = 0.0;
    out[9] = 0.0;
    out[10] = 0.0;
    out[11] = 0.0;
    out[12] = 0.0;
    out[13] = 0.0;
    out[14] = 0.0;
    out[15] = 0.0;

    return out;
}

export function cl_mat4_x(x: number): mat4_t {
    const out = new TYPE(16);

    out[0] = x;
    out[1] = 0.0;
    out[2] = 0.0;
    out[3] = 0.0;
    out[4] = 0.0;
    out[5] = x;
    out[7] = 0.0;
    out[8] = 0.0;
    out[9] = 0.0;
    out[10] = 0.0;
    out[11] = x;
    out[12] = 0.0;
    out[13] = 0.0;
    out[14] = 0.0;
    out[15] = x;

    return out;
}

export function cl_mat4_all(e00: number, e01: number, e02: number, e03: number, e10: number, e11: number, e12: number, e13: number, e20: number, e21: number, e22: number, e23: number, e30: number, e31: number, e32: number, e33: number): mat4_t {
    const out = new TYPE(16);

    out[0] = e00;
    out[1] = e01;
    out[2] = e02;
    out[3] = e03;
    out[4] = e10;
    out[5] = e11;
    out[6] = e12;
    out[7] = e13;
    out[8] = e20;
    out[9] = e21;
    out[10] = e22;
    out[11] = e23;
    out[12] = e30;
    out[13] = e31;
    out[14] = e32;
    out[15] = e33;

    return out;
}

export function cl_mat4_clone(m: mat4_t): mat4_t {
    const out = new TYPE(16);

    out[0] = m[0];
    out[1] = m[1];
    out[2] = m[2];
    out[3] = m[3];
    out[4] = m[4];
    out[5] = m[5];
    out[6] = m[6];
    out[7] = m[7];
    out[8] = m[8];
    out[9] = m[9];
    out[10] = m[10];
    out[11] = m[11];
    out[12] = m[12];
    out[13] = m[13];
    out[14] = m[14];
    out[15] = m[15];

    return out;
}

export function cl_mat4_set(m: mat4_t, e00: number, e01: number, e02: number, e03: number, e10: number, e11: number, e12: number, e13: number, e20: number, e21: number, e22: number, e23: number, e30: number, e31: number, e32: number, e33: number): mat4_t {
    m[0] = e00;
    m[1] = e01;
    m[2] = e02;
    m[3] = e03;
    m[4] = e10;
    m[5] = e11;
    m[6] = e12;
    m[7] = e13;
    m[8] = e20;
    m[9] = e21;
    m[10] = e22;
    m[11] = e23;
    m[12] = e30;
    m[13] = e31;
    m[14] = e32;
    m[15] = e33;

    return m;
}

export function cl_mat4_copy(a: mat4_t, b: mat4_t): mat4_t {
    a[0] = b[0];
    a[1] = b[1];
    a[2] = b[2];
    a[3] = b[3];
    a[4] = b[4];
    a[5] = b[5];
    a[6] = b[6];
    a[7] = b[7];
    a[8] = b[8];
    a[9] = b[9];
    a[10] = b[10];
    a[11] = b[11];
    a[12] = b[12];
    a[13] = b[13];
    a[14] = b[14];
    a[15] = b[15];

    return a;
}

export function cl_mat4_ident(m: mat4_t): mat4_t {
    m[0] = 1.0;
    m[1] = 0.0;
    m[2] = 0.0;
    m[3] = 0.0;
    m[4] = 0.0;
    m[5] = 1.0;
    m[6] = 0.0;
    m[7] = 0.0;
    m[8] = 0.0;
    m[9] = 0.0;
    m[10] = 1.0;
    m[11] = 0.0;
    m[12] = 0.0;
    m[13] = 0.0;
    m[14] = 0.0;
    m[15] = 1.0;

    return m;
}

export function cl_mat4_mul(a: mat4_t, b: mat4_t): mat4_t {
    const out = new TYPE(16);
    const a00 = a[0],  a01 = a[1],  a02 = a[2],  a03 = a[3],
          a10 = a[4],  a11 = a[5],  a12 = a[6],  a13 = a[7],
          a20 = a[8],  a21 = a[9],  a22 = a[10], a23 = a[11],
          a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
    const b00 = b[0],  b01 = b[1],  b02 = b[2],  b03 = b[3],
          b10 = b[4],  b11 = b[5],  b12 = b[6],  b13 = b[7],
          b20 = b[8],  b21 = b[9],  b22 = b[10], b23 = b[11],
          b30 = b[12], b31 = b[13], b32 = b[14], b33 = b[15];

    out[0] = a00 * b00 + a10 * b01 + a20 * b02 + a30 * b03;
    out[1] = a01 * b00 + a11 * b01 + a21 * b02 + a31 * b03;
    out[2] = a02 * b00 + a12 * b01 + a22 * b02 + a32 * b03;
    out[3] = a03 * b00 + a13 * b01 + a23 * b02 + a33 * b03;
    out[4] = a00 * b10 + a10 * b11 + a20 * b12 + a30 * b13;
    out[5] = a01 * b10 + a11 * b11 + a21 * b12 + a31 * b13;
    out[6] = a02 * b10 + a12 * b11 + a22 * b12 + a32 * b13;
    out[7] = a03 * b10 + a13 * b11 + a23 * b12 + a33 * b13;
    out[8] = a00 * b20 + a10 * b21 + a20 * b22 + a30 * b23;
    out[9] = a01 * b20 + a11 * b21 + a21 * b22 + a31 * b23;
    out[10] = a02 * b20 + a12 * b21 + a22 * b22 + a32 * b23;
    out[11] = a03 * b20 + a13 * b21 + a23 * b22 + a33 * b23;
    out[12] = a00 * b30 + a10 * b31 + a20 * b32 + a30 * b33;
    out[13] = a01 * b30 + a11 * b31 + a21 * b32 + a31 * b33;
    out[14] = a02 * b30 + a12 * b31 + a22 * b32 + a32 * b33;
    out[15] = a03 * b30 + a13 * b31 + a23 * b32 + a33 * b33;

    return out;
}

export function cl_mat4_mul2(a: mat4_t, b: mat4_t): mat4_t {
    const a00 = a[0],  a01 = a[1],  a02 = a[2],  a03 = a[3],
          a10 = a[4],  a11 = a[5],  a12 = a[6],  a13 = a[7],
          a20 = a[8],  a21 = a[9],  a22 = a[10], a23 = a[11],
          a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
    const b00 = b[0],  b01 = b[1],  b02 = b[2],  b03 = b[3],
          b10 = b[4],  b11 = b[5],  b12 = b[6],  b13 = b[7],
          b20 = b[8],  b21 = b[9],  b22 = b[10], b23 = b[11],
          b30 = b[12], b31 = b[13], b32 = b[14], b33 = b[15];

    a[0] = a00 * b00 + a10 * b01 + a20 * b02 + a30 * b03;
    a[1] = a01 * b00 + a11 * b01 + a21 * b02 + a31 * b03;
    a[2] = a02 * b00 + a12 * b01 + a22 * b02 + a32 * b03;
    a[3] = a03 * b00 + a13 * b01 + a23 * b02 + a33 * b03;
    a[4] = a00 * b10 + a10 * b11 + a20 * b12 + a30 * b13;
    a[5] = a01 * b10 + a11 * b11 + a21 * b12 + a31 * b13;
    a[6] = a02 * b10 + a12 * b11 + a22 * b12 + a32 * b13;
    a[7] = a03 * b10 + a13 * b11 + a23 * b12 + a33 * b13;
    a[8] = a00 * b20 + a10 * b21 + a20 * b22 + a30 * b23;
    a[9] = a01 * b20 + a11 * b21 + a21 * b22 + a31 * b23;
    a[10] = a02 * b20 + a12 * b21 + a22 * b22 + a32 * b23;
    a[11] = a03 * b20 + a13 * b21 + a23 * b22 + a33 * b23;
    a[12] = a00 * b30 + a10 * b31 + a20 * b32 + a30 * b33;
    a[13] = a01 * b30 + a11 * b31 + a21 * b32 + a31 * b33;
    a[14] = a02 * b30 + a12 * b31 + a22 * b32 + a32 * b33;
    a[15] = a03 * b30 + a13 * b31 + a23 * b32 + a33 * b33;

    return a;
}

export function cl_mat4_mul_s(m: mat4_t, s: number): mat4_t {
    const out = new TYPE(16);

    out[0] = m[0] * s;
    out[1] = m[1] * s;
    out[2] = m[2] * s;
    out[3] = m[3] * s;
    out[4] = m[4] * s;
    out[5] = m[5] * s;
    out[6] = m[6] * s;
    out[7] = m[7] * s;
    out[8] = m[8] * s;
    out[9] = m[9] * s;
    out[10] = m[10] * s;
    out[11] = m[11] * s;
    out[12] = m[12] * s;
    out[13] = m[13] * s;
    out[14] = m[14] * s;
    out[15] = m[15] * s;


    return out;
}

export function cl_mat4_mul_s2(m: mat4_t, s: number): mat4_t {
    m[0] *= s;
    m[1] *= s;
    m[2] *= s;
    m[3] *= s;
    m[4] *= s;
    m[5] *= s;
    m[6] *= s;
    m[7] *= s;
    m[8] *= s;
    m[9] *= s;
    m[10] *= s;
    m[11] *= s;
    m[12] *= s;
    m[13] *= s;
    m[14] *= s;
    m[15] *= s;

    return m;
}

export function cl_mat4_mul_mv(m: mat4_t, v: vec4_t): vec4_t {
    const out = new TYPE(4);
    const x = v[0], y = v[1], z = v[2], w = v[3];

    out[0] = x * m[0] + y * m[4] + z * m[8] + w * m[12];
    out[1] = x * m[1] + y * m[5] + z * m[9] + w * m[13];
    out[2] = x * m[2] + y * m[6] + z * m[10] + w * m[14];
    out[3] = x * m[3] + y * m[7] + z * m[11] + w * m[15];

    return out;
}

export function cl_mat4_mul_vm(v: vec4_t, m: mat4_t): vec4_t {
    const out = new TYPE(4);
    const x = v[0], y = v[1], z = v[2], w = v[3];

    out[0] = x * m[0] + y * m[1] + z * m[2] + w * m[3];
    out[1] = x * m[4] + y * m[5] + z * m[6] + w * m[7];
    out[2] = x * m[8] + y * m[9] + z * m[10] + w * m[11];
    out[3] = x * m[12] + y * m[13] + z * m[14] + w * m[15];

    return out;
}

export function cl_mat4_str(m: mat4_t): string {
    return "mat4(\n" +
        `\t${m[0]}, ${m[4]}, ${m[8]}, ${m[12]},\n` +
        `\t${m[1]}, ${m[5]}, ${m[9]}, ${m[13]},\n` +
        `\t${m[2]}, ${m[6]}, ${m[10]}, ${m[14]},\n` +
        `\t${m[3]}, ${m[7]}, ${m[11]}, ${m[15]}\n` +
        ")"
}

export function cl_mat4_print(m: mat4_t): void {
    console.log(cl_mat4_str(m));
}
