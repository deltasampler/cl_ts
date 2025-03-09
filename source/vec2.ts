import {EPSILON} from "./math.ts";
import {TYPE, mat2_t, mat2x3_t, mat3_t, mat4_t, vec2_t} from "./type.ts";

// constructor
export function vec2(x: number = 0.0, y?: number): vec2_t {
    const out = new TYPE(2);

    out[0] = x;
    out[1] = y ?? x;

    return out;
}

export function vec2_new(): vec2_t {
    const out = new TYPE(2);

    out[0] = 0.0;
    out[1] = 0.0;

    return out;
}

export function vec2_x(x: number): vec2_t {
    const out = new TYPE(2);

    out[0] = x;
    out[1] = x;

    return out;
}

export function vec2_xy(x: number, y: number): vec2_t {
    const out = new TYPE(2);

    out[0] = x;
    out[1] = y;

    return out;
}

export function vec2_clone(v: vec2_t): vec2_t {
    const out = new TYPE(2);

    out[0] = v[0];
    out[1] = v[1];

    return out;
}

// setter
export function vec2_zero(v: vec2_t): vec2_t {
    v[0] = 0.0;
    v[1] = 0.0;

    return v;
}

export function vec2_set(v: vec2_t, x: number, y: number): vec2_t {
    v[0] = x;
    v[1] = y;

    return v;
}

export function vec2_copy(a: vec2_t, b: vec2_t): vec2_t {
    a[0] = b[0];
    a[1] = b[1];

    return a;
}

// unary
export function vec2_neg(v: vec2_t): vec2_t {
    v[0] = -v[0];
    v[1] = -v[1];

    return v;
}

export function vec2_abs(v: vec2_t): vec2_t {
    v[0] = Math.abs(v[0]);
    v[1] = Math.abs(v[1]);

    return v;
}

export function vec2_inv(v: vec2_t): vec2_t {
    v[0] = 1.0 / v[0];
    v[1] = 1.0 / v[1];

    return v;
}

// arithemtic vector x vector
export function vec2_add(a: vec2_t, b: vec2_t): vec2_t {
    const out = new TYPE(2);

    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];

    return out;
}

export function vec2_add2(a: vec2_t, b: vec2_t): vec2_t {
    a[0] += b[0];
    a[1] += b[1];

    return a;
}

export function vec2_sub(a: vec2_t, b: vec2_t): vec2_t {
    const out = new TYPE(2);

    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];

    return out;
}

export function vec2_sub2(a: vec2_t, b: vec2_t): vec2_t {
    a[0] -= b[0];
    a[1] -= b[1];

    return a;
}

export function vec2_mul(a: vec2_t, b: vec2_t): vec2_t {
    const out = new TYPE(2);

    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];

    return out;
}

export function vec2_mul2(a: vec2_t, b: vec2_t): vec2_t {
    a[0] *= b[0];
    a[1] *= b[1];

    return a;
}

export function vec2_div(a: vec2_t, b: vec2_t): vec2_t {
    const out = new TYPE(2);

    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];

    return out;
}

export function vec2_div2(a: vec2_t, b: vec2_t): vec2_t {
    a[0] /= b[0];
    a[1] /= b[1];

    return a;
}

// arithemtic vector x scalar
export function vec2_add_s(v: vec2_t, s: number): vec2_t {
    const out = new TYPE(2);

    out[0] = v[0] + s;
    out[1] = v[1] + s;

    return out;
}

export function vec2_add_s2(v: vec2_t, s: number): vec2_t {
    v[0] += s;
    v[1] += s;

    return v;
}

export function vec2_sub_s(v: vec2_t, s: number): vec2_t {
    const out = new TYPE(2);

    out[0] = v[0] - s;
    out[1] = v[1] - s;

    return out;
}

export function vec2_sub_s2(v: vec2_t, s: number): vec2_t {
    v[0] -= s;
    v[1] -= s;

    return v;
}

export function vec2_mul_s(v: vec2_t, s: number): vec2_t {
    const out = new TYPE(2);

    out[0] = v[0] * s;
    out[1] = v[1] * s;

    return out;
}

export function vec2_mul_s2(v: vec2_t, s: number): vec2_t {
    v[0] *= s;
    v[1] *= s;

    return v;
}

export function vec2_div_s(v: vec2_t, s: number): vec2_t {
    const out = new TYPE(2);

    out[0] = v[0] / s;
    out[1] = v[1] / s;

    return out;
}

export function vec2_div_s2(v: vec2_t, s: number): vec2_t {
    v[0] /= s;
    v[1] /= s;

    return v;
}

// arithemtic vector x vector x scalar
export function vec2_add_mul_s(a: vec2_t, b: vec2_t, s: number): vec2_t {
    const out = new TYPE(2);

    out[0] = a[0] + b[0] * s;
    out[1] = a[1] + b[1] * s;

    return out;
}

export function vec2_add_mul_s2(a: vec2_t, b: vec2_t, s: number): vec2_t {
    a[0] += b[0] * s;
    a[1] += b[1] * s;

    return a;
}

// product
export function vec2_dot(a: vec2_t, b: vec2_t): number {
    return a[0] * b[0] + a[1] * b[1];
}

export function vec2_cross(a: vec2_t, b: vec2_t): number {
    return a[0] * b[1] - a[1] * b[0];
}

// norm
export function vec2_len(v: vec2_t): number {
    return Math.hypot(v[0], v[1]);
}

export function vec2_len_sq(v: vec2_t): number {
    const x = v[0], y = v[1];

    return x * x + y * y;
}

export function vec2_dist(a: vec2_t, b: vec2_t): number {
    return Math.hypot(a[0] - b[0], a[1] - b[1]);
}

export function vec2_dist_sq(a: vec2_t, b: vec2_t): number {
    const x = a[0] - b[0], y = a[1] - b[1];

    return x * x + y * y;
}

export function vec2_unit(v: vec2_t): vec2_t {
    const out = new TYPE(2);
    const x = v[0], y = v[1];
    let l = x * x + y * y;

    if (l > 0) {
        l = 1.0 / Math.sqrt(l);
    }

    out[0] = x * l;
    out[1] = y * l;

    return out;
}

export function vec2_unit2(v: vec2_t): vec2_t {
    const x = v[0], y = v[1];
    let l = x * x + y * y;

    if (l > 0) {
        l = 1.0 / Math.sqrt(l);
    }

    v[0] *= l;
    v[1] *= l;

    return v;
}

export function vec2_dir(a: vec2_t, b: vec2_t): vec2_t {
    const out = new TYPE(2);
    const x = a[0] - b[0], y = a[1] - b[1];
    let l = x * x + y * y;

    if (l > 0) {
        l = 1.0 / Math.sqrt(l);
    }

    out[0] = x * l;
    out[1] = y * l;

    return out;
}

// transform
export function vec2_transf_mat2(v: vec2_t, m: mat2_t): vec2_t {
    const out = new TYPE(2);
    const x = v[0], y = v[1];

    out[0] = m[0] * x + m[2] * y;
    out[1] = m[1] * x + m[3] * y;

    return out;
}

export function vec2_transf_2x3(v: vec2_t, m: mat2x3_t): vec2_t {
    const out = new TYPE(2);
    const x = v[0], y = v[1];

    out[0] = m[0] * x + m[2] * y + m[4];
    out[1] = m[1] * x + m[3] * y + m[5];

    return out;
}

export function vec2_transf_mat3(v: vec2_t, m: mat3_t): vec2_t {
    const out = new TYPE(2);
    const x = v[0], y = v[1];

    out[0] = m[0] * x + m[3] * y + m[6];
    out[1] = m[1] * x + m[4] * y + m[7];

    return out;
}

export function vec2_transf_mat4(v: vec2_t, m: mat4_t): vec2_t {
    const out = new TYPE(2);
    const x = v[0], y = v[1];

    out[0] = m[0] * x + m[4] * y + m[12];
    out[1] = m[1] * x + m[5] * y + m[13];

    return out;
}

export function vec2_rotate(v: vec2_t, c: vec2_t, a: number) {
    const out = new TYPE(2);
    const cx = c[0], cy = c[1];
    const x = v[0] - cx;
    const y = v[1] - cy;
    const cos = Math.cos(a);
    const sin = Math.sin(a);

    out[0] = x * cos - y * sin + cx;
    out[1] = x * sin + y * cos + cy;

    return out;
}

// angular
export function vec2_angle(v: vec2_t): number {
    return Math.atan2(v[1], v[0]);
}

export function vec2_angle2(a: vec2_t, b: vec2_t): number {
    const x1 = a[0], y1 = a[1], x2 = b[0], y2 = b[1];
    const mag = Math.sqrt((x1 * x1 + y1 * y1) * (x2 * x2 + y2 * y2));
    const cosine = mag && (x1 * x2 + y1 * y2) / mag;

    return Math.acos(Math.min(Math.max(cosine, -1.0), 1.0));
}

// geometric
export function vec2_refl(v: vec2_t, n: vec2_t): vec2_t {
    const out = new TYPE(2);
    const l = vec2_dot(n, v) * 2.0;

    out[0] = v[0] - n[0] * l;
    out[1] = v[1] - n[1] * l;

    return out;
}

// interpolation
export function vec2_lerp(a: vec2_t, b: vec2_t, t: number): vec2_t {
    const out = new TYPE(2);
    const x = a[0], y = a[1];

    out[0] = x + t * (b[0] - x);
    out[1] = y + t * (b[1] - y);

    return out;
}

export function vec2_lerp2(a: vec2_t, b: vec2_t, t: number): vec2_t {
    const x = a[0], y = a[1];

    a[0] = x + t * (b[0] - x);
    a[1] = y + t * (b[1] - y);

    return a;
}

// rounding
export function vec2_floor(v: vec2_t): vec2_t {
    const out = new TYPE(2);

    out[0] = Math.floor(v[0]);
    out[1] = Math.floor(v[1]);

    return out;
}

export function vec2_floor2(v: vec2_t): vec2_t {
    v[0] = Math.floor(v[0]);
    v[1] = Math.floor(v[1]);

    return v;
}

export function vec2_ceil(v: vec2_t): vec2_t {
    const out = new TYPE(2);

    out[0] = Math.ceil(v[0]);
    out[1] = Math.ceil(v[1]);

    return out;
}

export function vec2_ceil2(v: vec2_t): vec2_t {
    v[0] = Math.ceil(v[0]);
    v[1] = Math.ceil(v[1]);

    return v;
}

export function vec2_round(v: vec2_t): vec2_t {
    const out = new TYPE(2);

    out[0] = Math.round(v[0]);
    out[1] = Math.round(v[1]);

    return out;
}

export function vec2_round2(v: vec2_t): vec2_t {
    v[0] = Math.round(v[0]);
    v[1] = Math.round(v[1]);

    return v;
}

export function vec2_trunc(v: vec2_t): vec2_t {
    const out = new TYPE(2);

    out[0] = Math.trunc(v[0]);
    out[1] = Math.trunc(v[1]);

    return out;
}

export function vec2_trunc2(v: vec2_t): vec2_t {
    v[0] = Math.trunc(v[0]);
    v[1] = Math.trunc(v[1]);

    return v;
}

export function vec2_snap(v: vec2_t, g: vec2_t): vec2_t {
    const out = new TYPE(2);

    out[0] = Math.round(v[0] / g[0]) * g[0];
    out[1] = Math.round(v[1] / g[1]) * g[1];

    return out;
}

export function vec2_snap2(v: vec2_t, g: vec2_t): vec2_t {
    v[0] = Math.round(v[0] / g[0]) * g[0];
    v[1] = Math.round(v[1] / g[1]) * g[1];

    return v;
}

// bounding
export function vec2_min(a: vec2_t, b: vec2_t): vec2_t {
    const out = new TYPE(2);

    out[0] = Math.min(a[0], b[0]);
    out[1] = Math.min(a[1], b[1]);

    return out;
}

export function vec2_min2(a: vec2_t, b: vec2_t): vec2_t {
    a[0] = Math.min(a[0], b[0]);
    a[1] = Math.min(a[1], b[1]);

    return a;
}

export function vec2_max(a: vec2_t, b: vec2_t): vec2_t {
    const out = new TYPE(2);

    out[0] = Math.max(a[0], b[0]);
    out[1] = Math.max(a[1], b[1]);

    return out;
}

export function vec2_max2(a: vec2_t, b: vec2_t): vec2_t {
    a[0] = Math.max(a[0], b[0]);
    a[1] = Math.max(a[1], b[1]);

    return a;
}

export function vec2_clamp(v: vec2_t, min: vec2_t, max: vec2_t): vec2_t {
    const out = new TYPE(2);

    out[0] = Math.min(Math.max(v[0], min[0]), max[0]);
    out[1] = Math.min(Math.max(v[1], min[1]), max[1]);

    return out;
}

export function vec2_clamp2(v: vec2_t, min: vec2_t, max: vec2_t): vec2_t {
    v[0] = Math.min(Math.max(v[0], min[0]), max[0]);
    v[1] = Math.min(Math.max(v[1], min[1]), max[1]);

    return v;
}

export function vec2_wrap(v: vec2_t, min: vec2_t, max: vec2_t): vec2_t {
    const out = new TYPE(2);
    const mn0 = min[0], mn1 = min[1];
    const r0 = max[0] - mn0, r1 = max[1] - mn1;

    out[0] = ((v[0] - mn0) % r0 + r0) % r0 + mn0;
    out[1] = ((v[1] - mn1) % r1 + r1) % r1 + mn1;

    return out;
}

export function vec2_wrap2(v: vec2_t, min: vec2_t, max: vec2_t): vec2_t {
    const mn0 = min[0], mn1 = min[1];
    const r0 = max[0] - mn0, r1 = max[1] - mn1;

    v[0] = ((v[0] - mn0) % r0 + r0) % r0 + mn0;
    v[1] = ((v[1] - mn1) % r1 + r1) % r1 + mn1;

    return v;
}

// comparison
export function vec2_equals(a: vec2_t, b: vec2_t, e: number = EPSILON): boolean {
    const a0 = a[0], a1 = a[1];
    const b0 = b[0], b1 = b[1];

    return (
        Math.abs(a0 - b0) <= e * Math.max(1.0, Math.abs(a0), Math.abs(b0)) &&
        Math.abs(a1 - b1) <= e * Math.max(1.0, Math.abs(a1), Math.abs(b1))
    );
}

export function vec2_equals_exact(a: vec2_t, b: vec2_t): boolean {
    return a[0] === b[0] && a[1] === b[1];
}

// random
export function vec2_rand(): vec2_t {
    const out = new TYPE(2);

    out[0] = Math.random();
    out[1] = Math.random();

    return out;
}

export function vec2_rand_unit(scale: number = 1.0): vec2_t {
    const out = new TYPE(2);
    const r = Math.random() * 2.0 * Math.PI;

    out[0] = Math.cos(r) * scale;
    out[1] = Math.sin(r) * scale;

    return out;
}

// string
export function vec2_str(v: vec2_t): string {
    return `vec2(${v[0]}, ${v[1]})`;
}

export function vec2_print(v: vec2_t): void {
    console.log(vec2_str(v));
}
