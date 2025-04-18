const TYPE = Float32Array;
export type mat2x3_t = Float32Array;

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

export function mat2x3_new(): mat2x3_t {
    const out = new TYPE(6);

    out[0] = 0.0;
    out[1] = 0.0;
    out[2] = 0.0;
    out[3] = 0.0;
    out[4] = 0.0;
    out[5] = 0.0;

    return out;
}

export function mat2x3_x(x: number): mat2x3_t {
    const out = new TYPE(6);

    out[0] = x;
    out[1] = 0.0;
    out[2] = 0.0;
    out[3] = x;
    out[4] = 0.0;
    out[5] = 0.0;

    return out;
}

export function mat2x3_all(e00: number, e01: number, e10: number, e11: number, e20: number, e21: number): mat2x3_t {
    const out = new TYPE(6);

    out[0] = e00;
    out[1] = e01;
    out[2] = e10;
    out[3] = e11;
    out[4] = e20;
    out[5] = e21;

    return out;
}

export function mat2x3_clone(m: mat2x3_t): mat2x3_t {
    const out = new TYPE(6);

    out[0] = m[0];
    out[1] = m[1];
    out[2] = m[2];
    out[3] = m[3];
    out[4] = m[4];
    out[5] = m[5];

    return out;
}

// setter
export function mat2x3_ident(m: mat2x3_t): mat2x3_t {
    m[0] = 1.0;
    m[1] = 0.0;
    m[2] = 0.0;
    m[3] = 1.0;
    m[4] = 0.0;
    m[5] = 0.0;

    return m;
}

export function mat2x3_set(m: mat2x3_t, e00: number, e01: number, e10: number, e11: number, e20: number, e21: number): mat2x3_t {
    m[0] = e00;
    m[1] = e01;
    m[2] = e10;
    m[3] = e11;
    m[4] = e20;
    m[5] = e21;

    return m;
}

export function mat2x3_copy(a: mat2x3_t, b: mat2x3_t): mat2x3_t {
    a[0] = b[0];
    a[1] = b[1];
    a[2] = b[2];
    a[3] = b[3];
    a[4] = b[4];
    a[5] = b[5];

    return a;
}


// arithmetic matrix x matrix
export function mat2x3_add(out: mat2x3_t, a: mat2x3_t, b: mat2x3_t): mat2x3_t {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    out[3] = a[3] + b[3];
    out[4] = a[4] + b[4];
    out[5] = a[5] + b[5];

    return out;
}

export function mat2x3_add1(a: mat2x3_t, b: mat2x3_t): mat2x3_t {
    return mat2x3_add(new TYPE(6), a, b);
}

export function mat2x3_add2(a: mat2x3_t, b: mat2x3_t): mat2x3_t {
    return mat2x3_add(a, a, b);
}

export function mat2x3_sub(out: mat2x3_t, a: mat2x3_t, b: mat2x3_t): mat2x3_t {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    out[3] = a[3] - b[3];
    out[4] = a[4] - b[4];
    out[5] = a[5] - b[5];

    return out;
}

export function mat2x3_sub1(a: mat2x3_t, b: mat2x3_t): mat2x3_t {
    return mat2x3_sub(new TYPE(6), a, b);
}

export function mat2x3_sub2(a: mat2x3_t, b: mat2x3_t): mat2x3_t {
    return mat2x3_sub(a, a, b);
}

// arithmetic matrix x scalar
export function mat2x3_muls(out: mat2x3_t, m: mat2x3_t, s: number): mat2x3_t {
    out[0] = m[0] * s;
    out[1] = m[1] * s;
    out[2] = m[2] * s;
    out[3] = m[3] * s;
    out[4] = m[4] * s;
    out[5] = m[5] * s;

    return out;
}

export function mat2x3_muls1(m: mat2x3_t, s: number): mat2x3_t {
    return mat2x3_muls(new TYPE(6), m, s);
}

export function mat2x3_muls2(m: mat2x3_t, s: number): mat2x3_t {
    return mat2x3_muls(m, m, s);
}

// arithmetic matrix x matrix x scalar
export function mat2x3_addmuls(out: mat2x3_t, a: mat2x3_t, b: mat2x3_t, s: number): mat2x3_t {
    out[0] = a[0] + b[0] * s;
    out[1] = a[1] + b[1] * s;
    out[2] = a[2] + b[2] * s;
    out[3] = a[3] + b[3] * s;
    out[4] = a[4] + b[4] * s;
    out[5] = a[5] + b[5] * s;

    return out;
}

export function mat2x3_addmuls1(a: mat2x3_t, b: mat2x3_t, s: number): mat2x3_t {
    return mat2x3_addmuls(new TYPE(6), a, b, s);
}

export function mat2x3_addmuls2(a: mat2x3_t, b: mat2x3_t, s: number): mat2x3_t {
    return mat2x3_addmuls(a, a, b, s);
}

// product matrix x matrix
export function mat2x3_mul(out: mat2x3_t, a: mat2x3_t, b: mat2x3_t): mat2x3_t {
    let a0 = a[0], a1 = a[1],
        a2 = a[2], a3 = a[3],
        a4 = a[4], a5 = a[5];
    let b0 = b[0], b1 = b[1],
        b2 = b[2], b3 = b[3],
        b4 = b[4], b5 = b[5];

    out[0] = a0 * b0 + a2 * b1;
    out[1] = a1 * b0 + a3 * b1;
    out[2] = a0 * b2 + a2 * b3;
    out[3] = a1 * b2 + a3 * b3;
    out[4] = a0 * b4 + a2 * b5 + a4;
    out[5] = a1 * b4 + a3 * b5 + a5;

    return out;
}

export function mat2x3_mul1(a: mat2x3_t, b: mat2x3_t): mat2x3_t {
    return mat2x3_mul(new TYPE(6), a, b);
}

export function mat2x3_mul2(a: mat2x3_t, b: mat2x3_t): mat2x3_t {
    return mat2x3_mul(a, a, b);
}

// determinant
export function mat2x3_det(m: mat2x3_t): number {
    return m[0] * m[3] - m[1] * m[2];
}

// norm
export function mat2x3_frob(m: mat2x3_t): number {
    return Math.hypot(
        m[0], m[1],
        m[2], m[3],
        m[4], m[5], 1.0
    );
}

// special
export function mat2x3_inv(out: mat2x3_t, m: mat2x3_t): mat2x3_t|null {
    const m0 = m[0], m1 = m[1],
          m2 = m[2], m3 = m[3],
          m4 = m[4], m5 = m[5];

    let det = m0 * m3 - m1 * m2;

    if (!det) {
        return null;
    }

    det = 1.0 / det;

    out[0] = m3 * det;
    out[1] = -m1 * det;
    out[2] = -m2 * det;
    out[3] = m0 * det;
    out[4] = (m2 * m5 - m3 * m4) * det;
    out[5] = (m1 * m4 - m0 * m5) * det;

    return out;
}

// string
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
