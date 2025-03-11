import {TYPE, mat2_t, vec2_t} from "./type.ts";

// construction
export function mat2(e00 = 1.0, e01 = 0.0, e10 = 0.0, e11?: number): mat2_t {
    const out = new TYPE(4);

    out[0] = e00;
    out[1] = e01;
    out[2] = e10;
    out[3] = e11 ?? e00;

    return out;
}

export function mat2_new(): mat2_t {
    const out = new TYPE(4);

    out[0] = 0.0;
    out[1] = 0.0;
    out[2] = 0.0;
    out[3] = 0.0;

    return out;
}

export function mat2_x(x: number): mat2_t {
    const out = new TYPE(4);

    out[0] = x;
    out[1] = 0.0;
    out[2] = 0.0;
    out[3] = x;

    return out;
}

export function mat2_all(e00: number, e01: number, e10: number, e11: number): mat2_t {
    const out = new TYPE(4);

    out[0] = e00;
    out[1] = e01;
    out[2] = e10;
    out[3] = e11;

    return out;
}

export function mat2_clone(m: mat2_t): mat2_t {
    const out = new TYPE(4);

    out[0] = m[0];
    out[1] = m[1];
    out[2] = m[2];
    out[3] = m[3];

    return out;
}

// setter
export function mat2_zero(m: mat2_t): mat2_t {
    m[0] = 0.0;
    m[1] = 0.0;
    m[2] = 0.0;
    m[3] = 0.0;

    return m;
}

export function mat2_ident(m: mat2_t): mat2_t {
    m[0] = 1.0;
    m[1] = 0.0;
    m[2] = 0.0;
    m[3] = 1.0;

    return m;
}

export function mat2_set(m: mat2_t, e00: number, e01: number, e10: number, e11: number): mat2_t {
    m[0] = e00;
    m[1] = e01;
    m[2] = e10;
    m[3] = e11;

    return m;
}

export function mat2_copy(a: mat2_t, b: mat2_t): mat2_t {
    a[0] = b[0];
    a[1] = b[1];
    a[2] = b[2];
    a[3] = b[3];

    return a;
}

// arithmetic matrix x matrix
export function mat2_add(a: mat2_t, b: mat2_t, out: mat2_t): mat2_t {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    out[3] = a[3] + b[3];

    return out;
}

export function mat2_add1(a: mat2_t, b: mat2_t): mat2_t {
    return mat2_add(a, b, new TYPE(4));
}

export function mat2_add2(a: mat2_t, b: mat2_t): mat2_t {
    return mat2_add(a, b, a);
}

export function mat2_sub(a: mat2_t, b: mat2_t, out: mat2_t): mat2_t {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    out[3] = a[3] - b[3];

    return out;
}

export function mat2_sub1(a: mat2_t, b: mat2_t): mat2_t {
    return mat2_sub(a, b, new TYPE(4));
}

export function mat2_sub2(a: mat2_t, b: mat2_t): mat2_t {
    return mat2_sub(a, b, a);
}

// arithmetic matrix x scalar
export function mat2_muls(m: mat2_t, s: number, out: mat2_t): mat2_t {
    out[0] = m[0] * s;
    out[1] = m[1] * s;
    out[2] = m[2] * s;
    out[3] = m[3] * s;

    return out;
}

export function mat2_muls1(m: mat2_t, s: number): mat2_t {
    return mat2_muls(m, s, new TYPE(4));
}

export function mat2_muls2(m: mat2_t, s: number): mat2_t {
    return mat2_muls(m, s, m);
}

// arithmetic matrix x matrix x scalar
export function mat2_addmuls(a: mat2_t, b: mat2_t, s: number, out: mat2_t): mat2_t {
    out[0] = a[0] + b[0] * s;
    out[1] = a[1] + b[1] * s;
    out[2] = a[2] + b[2] * s;
    out[3] = a[3] + b[3] * s;

    return out;
}

export function mat2_addmuls1(a: mat2_t, b: mat2_t, s: number): mat2_t {
    return mat2_addmuls(a, b, s, new TYPE(4));
}

export function mat2_addmuls2(a: mat2_t, b: mat2_t, s: number): mat2_t {
    return mat2_addmuls(a, b, s, a);
}

// product matrix x matrix
export function mat2_mul(a: mat2_t, b: mat2_t, out: mat2_t): mat2_t {
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

export function mat2_mul1(a: mat2_t, b: mat2_t): mat2_t {
    return mat2_mul(a, b, new TYPE(4));
}

export function mat2_mul2(a: mat2_t, b: mat2_t): mat2_t {
    return mat2_mul(a, b, a);
}

// product matrix x vector
export function mat2_mulmv(m: mat2_t, v: vec2_t, out: vec2_t): vec2_t {
    const x = v[0], y = v[1];

    out[0] = x * m[0] + y * m[2];
    out[1] = x * m[1] + y * m[3];

    return out;
}

export function mat2_mulmv1(m: mat2_t, v: vec2_t): vec2_t {
    return mat2_mulmv(m, v, new TYPE(2));
}

export function mat2_mulmv2(m: mat2_t, v: vec2_t): vec2_t {
    return mat2_mulmv(m, v, v);
}

export function mat2_mulvm(v: vec2_t, m: mat2_t, out: vec2_t): vec2_t {
    const x = v[0], y = v[1];

    out[0] = x * m[0] + y * m[1];
    out[1] = x * m[2] + y * m[3];

    return out;
}

export function mat2_mulvm1(m: mat2_t, v: vec2_t): vec2_t {
    return mat2_mulvm(m, v, new TYPE(2));
}

export function mat2_mulvm2(m: mat2_t, v: vec2_t): vec2_t {
    return mat2_mulvm(m, v, v);
}

// determinant
export function mat2_det(m: mat2_t): number {
    return m[0] * m[3] - m[2] * m[1];
}

// norm
export function mat2_frob(m: mat2_t): number {
    return Math.hypot(
        m[0], m[1],
        m[2], m[3]
    );
}

// special
export function mat2_transpose(m: mat2_t, out: mat2_t): mat2_t {
    if (out === m) {
        const m1 = m[1];

        out[1] = m[2];
        out[2] = m1;
    } else {
        out[0] = m[0];
        out[1] = m[2];
        out[2] = m[1];
        out[3] = m[3];
    }

    return out;
}

export function mat2_adjoint(m: mat2_t, out: mat2_t): mat2_t {
    out[0] = m[3];
    out[1] = -m[1];
    out[2] = -m[2];
    out[3] = m[0];

    return out;
}

export function mat2_inv(m: mat2_t, out: mat2_t): mat2_t|null {
    const m0 = m[0], m1 = m[1],
          m2 = m[2], m3 = m[3];
    let det = m0 * m3 - m2 * m1;

    if (!det) {
        return null;
    }

    det = 1.0 / det;

    out[0] = m3 * det;
    out[1] = -m1 * det;
    out[2] = -m2 * det;
    out[3] = m0 * det;

    return out;
}

// string
export function mat2_str(m: mat2_t): string {
    return "mat2(\n" +
        `\t${m[0]}, ${m[2]},\n` +
        `\t${m[1]}, ${m[3]},\n` +
        ")";
}

export function mat2_print(m: mat2_t): void {
    console.log(mat2_str(m));
}
