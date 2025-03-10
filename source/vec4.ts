import {EPSILON} from "./math.ts";
import {TYPE, mat4_t, vec3_t, vec4_t} from "./type.ts";

// constructor
export function vec4(x: number = 0.0, y?: number, z?: number, w?: number): vec4_t {
    const out = new TYPE(4);

    out[0] = x;
    out[1] = y ?? x;
    out[2] = z ?? x;
    out[3] = w ?? x;

    return out;
}

export function vec4_new(): vec4_t {
    const out = new TYPE(4);

    out[0] = 0.0;
    out[1] = 0.0;
    out[2] = 0.0;
    out[3] = 0.0;

    return out;
}

export function vec4_x(x: number): vec4_t {
    const out = new TYPE(4);

    out[0] = x;
    out[1] = x;
    out[2] = x;
    out[3] = x;

    return out;
}

export function vec4_xyzw(x: number, y: number, z: number, w: number): vec4_t {
    const out = new TYPE(4);

    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = w;

    return out;
}

export function vec4_clone(v: vec4_t): vec4_t {
    const out = new TYPE(4);

    out[0] = v[0];
    out[1] = v[1];
    out[2] = v[2];
    out[3] = v[3];

    return out;
}

// setter
export function vec4_zero(v: vec4_t): vec4_t {
    v[0] = 0.0;
    v[1] = 0.0;
    v[2] = 0.0;
    v[3] = 0.0;

    return v;
}

export function vec4_set(v: vec4_t, x: number, y: number, z: number, w: number): vec4_t {
    v[0] = x;
    v[1] = y;
    v[2] = z;
    v[3] = w;

    return v;
}

export function vec4_copy(a: vec4_t, b: vec4_t): vec4_t {
    a[0] = b[0];
    a[1] = b[1];
    a[2] = b[2];
    a[3] = b[3];

    return a;
}

// color
export function rgba(r: number = 0.0, g: number = 0.0, b: number = 0.0, a: number = 0.0): vec4_t {
    const out = new TYPE(4);

    out[0] = r / 255.0;
    out[1] = g / 255.0;
    out[2] = b / 255.0;
    out[3] = a / 255.0;

    return out;
}

export function hexa(h: number): vec4_t {
    const out = new TYPE(4);

    out[0] = ((h >> 24) & 0xFF) / 255.0;
    out[1] = ((h >> 16) & 0xFF) / 255.0;
    out[2] = ((h >> 8) & 0xFF) / 255.0;
    out[3] = (h & 0xFF) / 255.0;

    return out;
}

// unary
export function vec4_neg(v: vec4_t): vec4_t {
    v[0] = -v[0];
    v[1] = -v[1];
    v[2] = -v[2];
    v[3] = -v[3];

    return v;
}

export function vec4_abs(v: vec4_t): vec4_t {
    v[0] = Math.abs(v[0]);
    v[1] = Math.abs(v[1]);
    v[2] = Math.abs(v[2]);
    v[3] = Math.abs(v[3]);

    return v;
}

export function vec4_inv(v: vec4_t): vec4_t {
    v[0] = 1.0 / v[0];
    v[1] = 1.0 / v[1];
    v[2] = 1.0 / v[2];
    v[3] = 1.0 / v[3];

    return v;
}

// arithmetic vector x vector
export function vec4_add(a: vec4_t, b: vec4_t): vec4_t {
    const out = new TYPE(4);

    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    out[3] = a[3] + b[3];

    return out;
}

export function vec4_add2(a: vec4_t, b: vec4_t): vec4_t {
    a[0] += b[0];
    a[1] += b[1];
    a[2] += b[2];
    a[3] += b[3];

    return a;
}

export function vec4_sub(a: vec4_t, b: vec4_t): vec4_t {
    const out = new TYPE(4);

    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    out[3] = a[3] - b[3];

    return out;
}

export function vec4_sub2(a: vec4_t, b: vec4_t): vec4_t {
    a[0] -= b[0];
    a[1] -= b[1];
    a[2] -= b[2];
    a[3] -= b[3];

    return a;
}

export function vec4_mul(a: vec4_t, b: vec4_t): vec4_t {
    const out = new TYPE(4);

    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    out[2] = a[2] * b[2];
    out[3] = a[3] * b[3];

    return out;
}

export function vec4_mul2(a: vec4_t, b: vec4_t): vec4_t {
    a[0] *= b[0];
    a[1] *= b[1];
    a[2] *= b[2];
    a[3] *= b[3];

    return a;
}

export function vec4_div(a: vec4_t, b: vec4_t): vec4_t {
    const out = new TYPE(4);

    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    out[2] = a[2] / b[2];
    out[3] = a[3] / b[3];

    return out;
}

export function vec4_div2(a: vec4_t, b: vec4_t): vec4_t {
    a[0] /= b[0];
    a[1] /= b[1];
    a[2] /= b[2];
    a[3] /= b[3];

    return a;
}

// arithmetic vector x scalar
export function vec4_add_s(v: vec4_t, s: number): vec4_t {
    const out = new TYPE(4);

    out[0] = v[0] + s;
    out[1] = v[1] + s;
    out[2] = v[2] + s;
    out[3] = v[3] + s;

    return out;
}

export function vec4_add_s2(v: vec4_t, s: number): vec4_t {
    v[0] += s;
    v[1] += s;
    v[2] += s;
    v[3] += s;

    return v;
}

export function vec4_sub_s(v: vec4_t, s: number): vec4_t {
    const out = new TYPE(4);

    out[0] = v[0] - s;
    out[1] = v[1] - s;
    out[2] = v[2] - s;
    out[3] = v[3] - s;

    return out;
}

export function vec4_sub_s2(v: vec4_t, s: number): vec4_t {
    v[0] -= s;
    v[1] -= s;
    v[2] -= s;
    v[3] -= s;

    return v;
}

export function vec4_mul_s(v: vec4_t, s: number): vec4_t {
    const out = new TYPE(4);

    out[0] = v[0] * s;
    out[1] = v[1] * s;
    out[2] = v[2] * s;
    out[3] = v[3] * s;

    return out;
}

export function vec4_mul_s2(v: vec4_t, s: number): vec4_t {
    v[0] *= s;
    v[1] *= s;
    v[2] *= s;
    v[3] *= s;

    return v;
}

export function vec4_div_s(v: vec4_t, s: number): vec4_t {
    const out = new TYPE(4);

    out[0] = v[0] / s;
    out[1] = v[1] / s;
    out[2] = v[2] / s;
    out[3] = v[3] / s;

    return out;
}

export function vec4_div_s2(v: vec4_t, s: number): vec4_t {
    v[0] /= s;
    v[1] /= s;
    v[2] /= s;
    v[3] /= s;

    return v;
}

// arithmetic vector x vector x scalar
export function vec4_add_mul_s(a: vec4_t, b: vec4_t, s: number): vec4_t {
    const out = new TYPE(4);

    out[0] = a[0] + b[0] * s;
    out[1] = a[1] + b[1] * s;
    out[2] = a[2] + b[2] * s;
    out[3] = a[3] + b[3] * s;

    return out;
}

export function vec4_add_mul_s2(a: vec4_t, b: vec4_t, s: number): vec4_t {
    a[0] += b[0] * s;
    a[1] += b[1] * s;
    a[2] += b[2] * s;
    a[3] += b[3] * s;

    return a;
}

// product
export function vec4_dot(a: vec4_t, b: vec4_t): number {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
}

export function vec4_cross(a: vec4_t, b: vec4_t, c: vec4_t): vec4_t {
    const out = new TYPE(4);
    const A = b[0] * c[1] - b[1] * c[0],
        B = b[0] * c[2] - b[2] * c[0],
        C = b[0] * c[3] - b[3] * c[0],
        D = b[1] * c[2] - b[2] * c[1],
        E = b[1] * c[3] - b[3] * c[1],
        F = b[2] * c[3] - b[3] * c[2],
        G = a[0],
        H = a[1],
        I = a[2],
        J = a[3];

    out[0] = H * F - I * E + J * D;
    out[1] = -(G * F) + I * C - J * B;
    out[2] = G * E - H * C + J * A;
    out[3] = -(G * D) + H * B - I * A;

    return out;
}

// norm
export function vec4_len(v: vec4_t): number {
    return Math.hypot(v[0], v[1], v[2], v[3]);
}

export function vec4_len_sq(v: vec4_t): number {
    const x = v[0], y = v[1], z = v[2], w = v[3];

    return x * x + y * y + z * z + w * w;
}

export function vec4_dist(a: vec4_t, b: vec4_t): number {
    return Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2], a[3] - b[3]);
}

export function vec4_dist_sq(a: vec4_t, b: vec4_t): number {
    const x = a[0] - b[0];
    const y = a[1] - b[1];
    const z = a[2] - b[2];
    const w = a[3] - b[3];

    return x * x + y * y + z * z + w * w;
}

export function vec4_unit(v: vec4_t): vec4_t {
    const out = new TYPE(4);
    const x = v[0], y = v[1], z = v[2], w = v[3];
    let l = x * x + y * y + z * z + w * w;

    if (l > 0) {
        l = 1.0 / Math.sqrt(l);
    }

    out[0] = x * l;
    out[1] = y * l;
    out[2] = z * l;
    out[3] = w * l;

    return out;
}

export function vec4_unit2(v: vec4_t): vec4_t {
    const x = v[0], y = v[1], z = v[2], w = v[3];
    let l = x * x + y * y + z * z + w * w;

    if (l > 0) {
        l = 1.0 / Math.sqrt(l);
    }

    v[0] = x * l;
    v[1] = y * l;
    v[2] = z * l;
    v[3] = w * l;

    return v;
}

export function vec4_dir(a: vec3_t, b: vec4_t): vec4_t {
    const out = new TYPE(4);
    const x = a[0] - b[0], y = a[1] - b[1], z = a[2] - b[2], w = a[3] - b[3];
    let l = x * x + y * y + z * z + w * w;

    if (l > 0) {
        l = 1.0 / Math.sqrt(l);
    }

    out[0] = x * l;
    out[1] = y * l;
    out[2] = z * l;
    out[3] = w * l;

    return out;
}

// transform
export function vec4_transf_mat4(v: vec4_t, m: mat4_t): vec4_t {
    const out = new TYPE(4);
    const x = v[0], y = v[1], z = v[2], w = v[3];

    out[0] = m[0] * x + m[4] * y + m[8] * z + m[12] * w;
    out[1] = m[1] * x + m[5] * y + m[9] * z + m[13] * w;
    out[2] = m[2] * x + m[6] * y + m[10] * z + m[14] * w;
    out[3] = m[3] * x + m[7] * y + m[11] * z + m[15] * w;

    return out;
}

// geometric
export function vec4_refl(v: vec4_t, n: vec4_t): vec4_t {
    const out = new TYPE(4);
    const l = vec4_dot(n, v) * 2.0;

    out[0] = v[0] - n[0] * l;
    out[1] = v[1] - n[1] * l;
    out[2] = v[2] - n[2] * l;
    out[3] = v[3] - n[3] * l;

    return out;
}

// interpolation
export function vec4_lerp(a: vec4_t, b: vec4_t, t: number): vec4_t {
    const out = new TYPE(4);
    const x = a[0], y = a[1], z = a[2], w = a[3];

    out[0] = x + t * (b[0] - x);
    out[1] = y + t * (b[1] - y);
    out[2] = z + t * (b[2] - z);
    out[3] = w + t * (b[3] - w);

    return out;
}

export function vec4_lerp2(a: vec4_t, b: vec4_t, t: number): vec4_t {
    const x = a[0], y = a[1], z = a[2], w = a[3];

    a[0] = x + t * (b[0] - x);
    a[1] = y + t * (b[1] - y);
    a[2] = z + t * (b[2] - z);
    a[3] = w + t * (b[3] - w);

    return a;
}

// rounding
export function vec4_floor(v: vec4_t): vec4_t {
    const out = new TYPE(4);

    out[0] = Math.floor(v[0]);
    out[1] = Math.floor(v[1]);
    out[2] = Math.floor(v[2]);
    out[3] = Math.floor(v[3]);

    return out;
}

export function vec4_floor2(v: vec4_t): vec4_t {
    v[0] = Math.floor(v[0]);
    v[1] = Math.floor(v[1]);
    v[2] = Math.floor(v[2]);
    v[3] = Math.floor(v[3]);

    return v;
}

export function vec4_ceil(v: vec4_t): vec4_t {
    const out = new TYPE(4);

    out[0] = Math.ceil(v[0]);
    out[1] = Math.ceil(v[1]);
    out[2] = Math.ceil(v[2]);
    out[3] = Math.ceil(v[3]);

    return out;
}

export function vec4_ceil2(v: vec4_t): vec4_t {
    v[0] = Math.ceil(v[0]);
    v[1] = Math.ceil(v[1]);
    v[2] = Math.ceil(v[2]);
    v[3] = Math.ceil(v[3]);

    return v;
}

export function vec4_round(v: vec4_t): vec4_t {
    const out = new TYPE(4);

    out[0] = Math.round(v[0]);
    out[1] = Math.round(v[1]);
    out[2] = Math.round(v[2]);
    out[3] = Math.round(v[3]);

    return out;
}

export function vec4_round2(v: vec4_t): vec4_t {
    v[0] = Math.round(v[0]);
    v[1] = Math.round(v[1]);
    v[2] = Math.round(v[2]);
    v[3] = Math.round(v[3]);

    return v;
}

export function vec4_trunc(v: vec4_t): vec4_t {
    const out = new TYPE(4);

    out[0] = Math.trunc(v[0]);
    out[1] = Math.trunc(v[1]);
    out[2] = Math.trunc(v[2]);
    out[3] = Math.trunc(v[3]);

    return out;
}

export function vec4_trunc2(v: vec4_t): vec4_t {
    v[0] = Math.trunc(v[0]);
    v[1] = Math.trunc(v[1]);
    v[2] = Math.trunc(v[2]);
    v[3] = Math.trunc(v[3]);

    return v;
}

export function vec4_snap(v: vec4_t, g: vec4_t): vec4_t {
    const out = new TYPE(4);

    out[0] = Math.round(v[0] / g[0]) * g[0];
    out[1] = Math.round(v[1] / g[1]) * g[1];
    out[2] = Math.round(v[2] / g[2]) * g[2];
    out[3] = Math.round(v[3] / g[3]) * g[3];

    return out;
}

export function vec4_snap2(v: vec4_t, g: vec4_t): vec4_t {
    v[0] = Math.round(v[0] / g[0]) * g[0];
    v[1] = Math.round(v[1] / g[1]) * g[1];
    v[2] = Math.round(v[2] / g[2]) * g[2];
    v[3] = Math.round(v[3] / g[3]) * g[3];

    return v;
}

// bounding
export function vec4_min(a: vec4_t, b: vec4_t): vec4_t {
    const out = new TYPE(4);

    out[0] = Math.min(a[0], b[0]);
    out[1] = Math.min(a[1], b[1]);
    out[2] = Math.min(a[2], b[2]);
    out[3] = Math.min(a[3], b[3]);

    return out;
}

export function vec4_min2(a: vec4_t, b: vec4_t): vec4_t {
    a[0] = Math.min(a[0], b[0]);
    a[1] = Math.min(a[1], b[1]);
    a[2] = Math.min(a[2], b[2]);
    a[3] = Math.min(a[3], b[3]);

    return a;
}

export function vec4_max(a: vec4_t, b: vec4_t): vec4_t {
    const out = new TYPE(4);

    out[0] = Math.max(a[0], b[0]);
    out[1] = Math.max(a[1], b[1]);
    out[2] = Math.max(a[2], b[2]);
    out[3] = Math.max(a[3], b[3]);

    return out;
}

export function vec4_max2(a: vec4_t, b: vec4_t): vec4_t {
    a[0] = Math.max(a[0], b[0]);
    a[1] = Math.max(a[1], b[1]);
    a[2] = Math.max(a[2], b[2]);
    a[3] = Math.max(a[3], b[3]);

    return a;
}

export function vec4_clamp(v: vec4_t, min: vec4_t, max: vec4_t): vec4_t {
    const out = new TYPE(4);

    out[0] = Math.min(Math.max(v[0], min[0]), max[0]);
    out[1] = Math.min(Math.max(v[1], min[1]), max[1]);
    out[2] = Math.min(Math.max(v[2], min[2]), max[2]);
    out[3] = Math.min(Math.max(v[3], min[3]), max[3]);

    return out;
}

export function vec4_clamp2(v: vec4_t, min: vec4_t, max: vec4_t): vec4_t {
    v[0] = Math.min(Math.max(v[0], min[0]), max[0]);
    v[1] = Math.min(Math.max(v[1], min[1]), max[1]);
    v[2] = Math.min(Math.max(v[2], min[2]), max[2]);
    v[3] = Math.min(Math.max(v[3], min[3]), max[3]);

    return v;
}

export function vec4_wrap(v: vec4_t, min: vec4_t, max: vec4_t): vec4_t {
    const out = new TYPE(4);
    const mn0 = min[0], mn1 = min[1], mn2 = min[2], mn3 = min[3];
    const r0 = max[0] - mn0, r1 = max[1] - mn1, r2 = max[2] - mn2, r3 = max[3] - mn3;

    out[0] = ((v[0] - mn0) % r0 + r0) % r0 + mn0;
    out[1] = ((v[1] - mn1) % r1 + r1) % r1 + mn1;
    out[2] = ((v[2] - mn2) % r2 + r2) % r2 + mn2;
    out[3] = ((v[3] - mn3) % r3 + r3) % r3 + mn3;

    return out;
}

export function vec4_wrap2(v: vec4_t, min: vec4_t, max: vec4_t): vec4_t {
    const mn0 = min[0], mn1 = min[1], mn2 = min[2], mn3 = min[3];
    const r0 = max[0] - mn0, r1 = max[1] - mn1, r2 = max[2] - mn2, r3 = max[3] - mn3;

    v[0] = ((v[0] - mn0) % r0 + r0) % r0 + mn0;
    v[1] = ((v[1] - mn1) % r1 + r1) % r1 + mn1;
    v[2] = ((v[2] - mn2) % r2 + r2) % r2 + mn2;
    v[3] = ((v[3] - mn3) % r3 + r3) % r3 + mn3;

    return v;
}

// comparison
export function vec4_equals(a: vec4_t, b: vec4_t, e: number = EPSILON): boolean {
    const a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
    const b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];

    return (
        Math.abs(a0 - b0) <= e * Math.max(1.0, Math.abs(a0), Math.abs(b0)) &&
        Math.abs(a1 - b1) <= e * Math.max(1.0, Math.abs(a1), Math.abs(b1)) &&
        Math.abs(a2 - b2) <= e * Math.max(1.0, Math.abs(a2), Math.abs(b2)) &&
        Math.abs(a3 - b3) <= e * Math.max(1.0, Math.abs(a3), Math.abs(b3))
    );
}

export function vec4_equals_exact(a: vec4_t, b: vec4_t): boolean {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
}

// random
export function vec4_rand(): vec4_t {
    const out = new TYPE(4);

    out[0] = Math.random();
    out[1] = Math.random();
    out[2] = Math.random();
    out[2] = Math.random();

    return out;
}

export function vec4_rand_unit(scale: number = 1.0): vec4_t {
    const out = new TYPE(4);
    let v1, v2, v3, v4;
    let s1, s2;
    let rand;

    rand = Math.random();
    v1 = rand * 2 - 1;
    v2 = (4 * Math.random() - 2) * Math.sqrt(rand * -rand + rand);
    s1 = v1 * v1 + v2 * v2;

    rand = Math.random();
    v3 = rand * 2 - 1;
    v4 = (4 * Math.random() - 2) * Math.sqrt(rand * -rand + rand);
    s2 = v3 * v3 + v4 * v4;

    let d = Math.sqrt((1 - s1) / s2);

    out[0] = scale * v1;
    out[1] = scale * v2;
    out[2] = scale * v3 * d;
    out[3] = scale * v4 * d;

    return out;
}

// string
export function vec4_str(v: vec4_t): string {
    return `vec4(${v[0]}, ${v[1]}, ${v[2]}, ${v[3]})`;
}

export function vec4_print(v: vec4_t): void {
    console.log(vec4_str(v));
}
