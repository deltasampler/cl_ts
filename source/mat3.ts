import {TYPE, mat3_t, vec3_t} from "./type.ts";

// creation
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
    out[6] = 0.0;
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

// setter
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

// arithmetic matrix x matrix
export function mat3_add(a: mat3_t, b: mat3_t, out: mat3_t): mat3_t {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    out[3] = a[3] + b[3];
    out[4] = a[4] + b[4];
    out[5] = a[5] + b[5];
    out[6] = a[6] + b[6];
    out[7] = a[7] + b[7];
    out[8] = a[8] + b[8];

    return out;
}

export function mat3_add1(a: mat3_t, b: mat3_t): mat3_t {
    return mat3_add(a, b, new TYPE(9));
}

export function mat3_add2(a: mat3_t, b: mat3_t): mat3_t {
    return mat3_add(a, b, a);
}

export function mat3_sub(a: mat3_t, b: mat3_t, out: mat3_t): mat3_t {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    out[3] = a[3] - b[3];
    out[4] = a[4] - b[4];
    out[5] = a[5] - b[5];
    out[6] = a[6] - b[6];
    out[7] = a[7] - b[7];
    out[8] = a[8] - b[8];

    return out;
}

export function mat3_sub1(a: mat3_t, b: mat3_t): mat3_t {
    return mat3_sub(a, b, new TYPE(9));
}

export function mat3_sub2(a: mat3_t, b: mat3_t): mat3_t {
    return mat3_sub(a, b, a);
}

// arithmetic matrix x scalar
export function mat3_muls(m: mat3_t, s: number, out: mat3_t): mat3_t {
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

export function mat3_muls1(m: mat3_t, s: number): mat3_t {
    return mat3_muls(m, s, new TYPE(9));
}

export function mat3_muls2(m: mat3_t, s: number): mat3_t {
    return mat3_muls(m, s, m);
}

// arithmetic matrix x matrix x scalar
export function mat3_addmuls(a: mat3_t, b: mat3_t, s: number, out: mat3_t): mat3_t {
    out[0] = a[0] + b[0] * s;
    out[1] = a[1] + b[1] * s;
    out[2] = a[2] + b[2] * s;
    out[3] = a[3] + b[3] * s;
    out[4] = a[4] + b[4] * s;
    out[5] = a[5] + b[5] * s;
    out[6] = a[6] + b[6] * s;
    out[7] = a[7] + b[7] * s;
    out[8] = a[8] + b[8] * s;

    return out;
}

export function mat3_addmuls1(a: mat3_t, b: mat3_t, s: number): mat3_t {
    return mat3_addmuls(a, b, s, new TYPE(9));
}

export function mat3_addmuls2(a: mat3_t, b: mat3_t, s: number): mat3_t {
    return mat3_addmuls(a, b, s, a);
}

// product matrix x matrix
export function mat3_mul(a: mat3_t, b: mat3_t, out: mat3_t): mat3_t {
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

export function mat3_mul1(a: mat3_t, b: mat3_t): mat3_t {
    return mat3_mul(a, b, new TYPE(9));
}

export function mat3_mul2(a: mat3_t, b: mat3_t): mat3_t {
    return mat3_mul(a, b, a);
}

// product matrix x vector
export function mat3_mulmv(m: mat3_t, v: vec3_t, out: mat3_t): vec3_t {
    const x = v[0], y = v[1], z = v[2];

    out[0] = x * m[0] + y * m[3] + z * m[6];
    out[1] = x * m[1] + y * m[4] + z * m[7];
    out[2] = x * m[2] + y * m[5] + z * m[8];

    return out;
}

export function mat3_mulmv1(m: mat3_t, v: vec3_t): vec3_t {
    return mat3_mulmv(m, v, new TYPE(3));
}

export function mat3_mulmv2(m: mat3_t, v: vec3_t): vec3_t {
    return mat3_mulmv(m, v, v);
}

export function mat3_mulvm(v: vec3_t, m: mat3_t, out: mat3_t): vec3_t {
    const x = v[0], y = v[1], z = v[2];

    out[0] = x * m[0] + y * m[1] + z * m[2];
    out[1] = x * m[3] + y * m[4] + z * m[5];
    out[2] = x * m[6] + y * m[7] + z * m[8];

    return out;
}

export function mat3_mulvm1(m: mat3_t, v: vec3_t): vec3_t {
    return mat3_mulvm(m, v, new TYPE(3));
}

export function mat3_mulvm2(m: mat3_t, v: vec3_t): vec3_t {
    return mat3_mulvm(m, v, v);
}

// determinant
export function mat3_det(m: mat3_t): number {
    const m00 = m[0], m01 = m[1], m02 = m[2],
          m10 = m[3], m11 = m[4], m12 = m[5],
          m20 = m[6], m21 = m[7], m22 = m[8];

    return (
        m00 * (m22 * m11 - m12 * m21) +
        m01 * (-m22 * m10 + m12 * m20) +
        m02 * (m21 * m10 - m11 * m20)
    );
}

// norm
export function mat3_frob(m: mat3_t): number {
    return Math.hypot(
        m[0], m[1], m[2],
        m[3], m[4], m[5],
        m[6], m[7], m[8]
    );
}

export function mat3_transpose(m: mat3_t, out: mat3_t): mat3_t {
    if (out === m) {
        const m01 = m[1], a02 = m[2], a12 = m[5];

        out[1] = m[3];
        out[2] = m[6];
        out[3] = m01;
        out[5] = m[7];
        out[6] = a02;
        out[7] = a12;
    } else {
        out[0] = m[0];
        out[1] = m[3];
        out[2] = m[6];
        out[3] = m[1];
        out[4] = m[4];
        out[5] = m[7];
        out[6] = m[2];
        out[7] = m[5];
        out[8] = m[8];
    }

    return out;
}

export function mat3_adjoint(m: mat3_t, out: mat3_t): mat3_t {
    const m00 = m[0], m01 = m[1], m02 = m[2],
          m10 = m[3], m11 = m[4], m12 = m[5],
          m20 = m[6], m21 = m[7], m22 = m[8];

    out[0] = m11 * m22 - m12 * m21;
    out[1] = m02 * m21 - m01 * m22;
    out[2] = m01 * m12 - m02 * m11;
    out[3] = m12 * m20 - m10 * m22;
    out[4] = m00 * m22 - m02 * m20;
    out[5] = m02 * m10 - m00 * m12;
    out[6] = m10 * m21 - m11 * m20;
    out[7] = m01 * m20 - m00 * m21;
    out[8] = m00 * m11 - m01 * m10;

    return out;
}

export function mat3_inv(m: mat3_t, out: mat3_t): mat3_t|null {
    const a00 = m[0], a01 = m[1], a02 = m[2],
          a10 = m[3], a11 = m[4], a12 = m[5],
          a20 = m[6], a21 = m[7], a22 = m[8];

    const b01 = a22 * a11 - a12 * a21;
    const b11 = -a22 * a10 + a12 * a20;
    const b21 = a21 * a10 - a11 * a20;

    let det = a00 * b01 + a01 * b11 + a02 * b21;

    if (!det) {
        return null;
    }

    det = 1.0 / det;

    out[0] = b01 * det;
    out[1] = (-a22 * a01 + a02 * a21) * det;
    out[2] = (a12 * a01 - a02 * a11) * det;
    out[3] = b11 * det;
    out[4] = (a22 * a00 - a02 * a20) * det;
    out[5] = (-a12 * a00 + a02 * a10) * det;
    out[6] = b21 * det;
    out[7] = (-a21 * a00 + a01 * a20) * det;
    out[8] = (a11 * a00 - a01 * a10) * det;

    return out;
}

// string
export function mat3_str(m: mat3_t): string {
    return "mat3(\n" +
        `\t${m[0]}, ${m[3]}, ${m[6]},\n` +
        `\t${m[1]}, ${m[4]}, ${m[7]},\n` +
        `\t${m[2]}, ${m[5]}, ${m[8]}\n` +
        ")";
}

export function mat3_print(m: mat3_t): void {
    console.log(mat3_str(m));
}
