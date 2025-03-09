import {vec2_t, TYPE} from "./type.ts";

export function cl_vec2(x: number = 0.0, y?: number): vec2_t {
    const out = new TYPE(2);

    out[0] = x;
    out[1] = y ?? x;

    return out;
}

export function cl_vec2_new(): vec2_t {
    const out = new TYPE(2);

    out[0] = 0.0;
    out[1] = 0.0;

    return out;
}

export function cl_vec2_x(x: number): vec2_t {
    const out = new TYPE(2);

    out[0] = x;
    out[1] = x;

    return out;
}

export function cl_vec2_xy(x: number, y: number): vec2_t {
    const out = new TYPE(2);

    out[0] = x;
    out[1] = y;

    return out;
}

export function cl_vec2_clone(v: vec2_t): vec2_t {
    const out = new TYPE(2);

    out[0] = v[0];
    out[1] = v[1];

    return out;
}

export function cl_vec2_set(v: vec2_t, x: number ,y: number): vec2_t {
    v[0] = x;
    v[1] = y;

    return v;
}

export function cl_vec2_copy(a: vec2_t, b: vec2_t): vec2_t {
    a[0] = b[0];
    a[1] = b[1];

    return a;
}

export function cl_vec2_zero(v: vec2_t): vec2_t {
    v[0] = 0.0;
    v[1] = 0.0;

    return v;
}

export function cl_vec2_abs(v: vec2_t): vec2_t {
    v[0] = Math.abs(v[0]);
    v[1] = Math.abs(v[1]);

    return v;
}

export function cl_vec2_neg(v: vec2_t): vec2_t {
    v[0] = -v[0];
    v[1] = -v[1];

    return v;
}

export function cl_vec2_inv(v: vec2_t): vec2_t {
    v[0] = 1.0 / v[0];
    v[1] = 1.0 / v[1];

    return v;
}

export function cl_vec2_add(a: vec2_t, b: vec2_t): vec2_t {
    const out = new TYPE(2);

    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];

    return out;
}

export function cl_vec2_add2(a: vec2_t, b: vec2_t): vec2_t {
    a[0] += b[0];
    a[1] += b[1];

    return a;
}

export function cl_vec2_sub(a: vec2_t, b: vec2_t): vec2_t {
    const out = new TYPE(2);

    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];

    return out;
}

export function cl_vec2_sub2(a: vec2_t, b: vec2_t): vec2_t {
    a[0] -= b[0];
    a[1] -= b[1];

    return a;
}

export function cl_vec2_mul(a: vec2_t, b: vec2_t): vec2_t {
    const out = new TYPE(2);

    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];

    return out;
}

export function cl_vec2_mul2(a: vec2_t, b: vec2_t): vec2_t {
    a[0] *= b[0];
    a[1] *= b[1];

    return a;
}

export function cl_vec2_div(a: vec2_t, b: vec2_t): vec2_t {
    const out = new TYPE(2);

    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];

    return out;
}

export function cl_vec2_div2(a: vec2_t, b: vec2_t): vec2_t {
    a[0] /= b[0];
    a[1] /= b[1];

    return a;
}

export function cl_vec2_add_mul_s(a: vec2_t, b: vec2_t, s: number): vec2_t {
    const out = new TYPE(2);

    out[0] = a[0] + b[0] * s;
    out[1] = a[1] + b[1] * s;

    return out;
}

export function cl_vec2_add_mul_s2(a: vec2_t, b: vec2_t, s: number): vec2_t {
    a[0] += b[0] * s;
    a[1] += b[1] * s;

    return a;
}

export function cl_vec2_add_s(v: vec2_t, s: number): vec2_t {
    const out = new TYPE(2);

    out[0] = v[0] + s;
    out[1] = v[1] + s;

    return out;
}

export function cl_vec2_add_s2(v: vec2_t, s: number): vec2_t {
    v[0] += s;
    v[1] += s;

    return v;
}

export function cl_vec2_sub_s(v: vec2_t, s: number): vec2_t {
    const out = new TYPE(2);

    out[0] = v[0] - s;
    out[1] = v[1] - s;

    return out;
}

export function cl_vec2_sub_s2(v: vec2_t, s: number): vec2_t {
    v[0] -= s;
    v[1] -= s;

    return v;
}

export function cl_vec2_mul_s(v: vec2_t, s: number): vec2_t {
    const out = new TYPE(2);

    out[0] = v[0] * s;
    out[1] = v[1] * s;

    return out;
}

export function cl_vec2_mul_s2(v: vec2_t, s: number): vec2_t {
    v[0] *= s;
    v[1] *= s;

    return v;
}

export function cl_vec2_div_s(v: vec2_t, s: number): vec2_t {
    const out = new TYPE(2);

    out[0] = v[0] / s;
    out[1] = v[1] / s;

    return out;
}

export function cl_vec2_div_s2(v: vec2_t, s: number): vec2_t {
    v[0] /= s;
    v[1] /= s;

    return v;
}

export function cl_vec2_len(v: vec2_t): number {
    return Math.hypot(v[0], v[1]);
}

export function cl_vec2_len_sq(v: vec2_t): number {
    const x = v[0], y = v[1];

    return x * x + y * y;
}

export function cl_vec2_rotate_ccw(v: vec2_t, c: vec2_t, a: number) {
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

export function cl_vec2_to_local(v: vec2_t, c: vec2_t, a: number) {
    const out = new TYPE(2);
    const cx = c[0], cy = c[1];
    const x = v[0] - cx;
    const y = v[1] - cy;
    const cos = Math.cos(a);
    const sin = Math.sin(a);

    out[0] = x * cos - y * sin;
    out[1] = x * sin + y * cos;

    return out;
}

export function cl_vec2_unit(v: vec2_t): vec2_t {
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

export function cl_vec2_unit2(v: vec2_t): vec2_t {
    const x = v[0], y = v[1];
    let l = x * x + y * y;

    if (l > 0) {
        l = 1.0 / Math.sqrt(l);
    }

    v[0] *= l;
    v[1] *= l;

    return v;
}

export function cl_vec2_dir(a: vec2_t, b: vec2_t): vec2_t {
    const x = a[0] - b[0];
    const y = a[1] - b[1];
    let l = x * x + y * y;

    if (l > 0) {
        l = 1.0 / Math.sqrt(l);
    }

    const out = new TYPE(2);
    out[0] = x * l;
    out[1] = y * l;

    return out;
}

export function cl_vec2_dot(a: vec2_t, b: vec2_t): number {
    return a[0] * b[0] + a[1] * b[1];
}

export function cl_vec2_cross(a: vec2_t, b: vec2_t): number {
    return a[0] * b[1] - a[1] * b[0];
}

export function cl_vec2_dist(a: vec2_t, b: vec2_t): number {
    return Math.hypot(a[0] - b[0], a[1] - b[1]);
}

export function cl_vec2_dist_sq(a: vec2_t, b: vec2_t): number {
    const x = a[0] - b[0];
    const y = a[1] - b[1];

    return x * x + y * y;
}

export function cl_vec2_refl(v: vec2_t, n: vec2_t): vec2_t {
    const out = new TYPE(2);
    const l = cl_vec2_dot(n, v) * 2.0;

    out[0] = v[0] - n[0] * l;
    out[1] = v[1] - n[1] * l;

    return out;
}

export function cl_vec2_floor(v: vec2_t): vec2_t {
    const out = new TYPE(2);

    out[0] = Math.floor(v[0]);
    out[1] = Math.floor(v[1]);

    return out;
}

export function cl_vec2_floor2(v: vec2_t): vec2_t {
    v[0] = Math.floor(v[0]);
    v[1] = Math.floor(v[1]);

    return v;
}

export function cl_vec2_ceil(v: vec2_t): vec2_t {
    const out = new TYPE(2);

    out[0] = Math.ceil(v[0]);
    out[1] = Math.ceil(v[1]);

    return out;
}

export function cl_vec2_ceil2(v: vec2_t): vec2_t {
    v[0] = Math.ceil(v[0]);
    v[1] = Math.ceil(v[1]);

    return v;
}

export function cl_vec2_round(v: vec2_t): vec2_t {
    const out = new TYPE(2);

    out[0] = Math.round(v[0]);
    out[1] = Math.round(v[1]);

    return out;
}

export function cl_vec2_round2(v: vec2_t): vec2_t {
    v[0] = Math.round(v[0]);
    v[1] = Math.round(v[1]);

    return v;
}

export function cl_vec2_trunc(v: vec2_t): vec2_t {
    const out = new TYPE(2);

    out[0] = Math.trunc(v[0]);
    out[1] = Math.trunc(v[1]);

    return out;
}

export function cl_vec2_trunc2(v: vec2_t): vec2_t {
    v[0] = Math.trunc(v[0]);
    v[1] = Math.trunc(v[1]);

    return v;
}

export function cl_vec2_min(a: vec2_t, b: vec2_t): vec2_t {
    const out = new TYPE(2);

    out[0] = Math.min(a[0], b[0]);
    out[1] = Math.min(a[1], b[1]);

    return out;
}

export function cl_vec2_min2(a: vec2_t, b: vec2_t): vec2_t {
    a[0] = Math.min(a[0], b[0]);
    a[1] = Math.min(a[1], b[1]);

    return a;
}

export function cl_vec2_max(a: vec2_t, b: vec2_t): vec2_t {
    const out = new TYPE(2);

    out[0] = Math.max(a[0], b[0]);
    out[1] = Math.max(a[1], b[1]);

    return out;
}

export function cl_vec2_max2(a: vec2_t, b: vec2_t): vec2_t {
    a[0] = Math.max(a[0], b[0]);
    a[1] = Math.max(a[1], b[1]);

    return a;
}

export function cl_vec2_clamp(v: vec2_t, min: vec2_t, max: vec2_t): vec2_t {
    const out = new TYPE(2);

    out[0] = Math.min(Math.max(v[0], min[0]), max[0]);
    out[1] = Math.min(Math.max(v[1], min[1]), max[1]);

    return out;
}

export function cl_vec2_clamp2(v: vec2_t, min: vec2_t, max: vec2_t): vec2_t {
    v[0] = Math.min(Math.max(v[0], min[0]), max[0]);
    v[1] = Math.min(Math.max(v[1], min[1]), max[1]);

    return v;
}

export function cl_vec2_loop(v: vec2_t, min: vec2_t, max: vec2_t): vec2_t {
    const out = new TYPE(2);
    const mn0 = min[0], mn1 = min[1];
    const r0 = max[0] - mn0, r1 = max[1] - mn1;

    out[0] = ((v[0] - mn0) % r0 + r0) % r0 + mn0;
    out[1] = ((v[1] - mn1) % r1 + r1) % r1 + mn1;

    return out;
}

export function cl_vec2_loop2(v: vec2_t, min: vec2_t, max: vec2_t): vec2_t {
    const mn0 = min[0], mn1 = min[1];
    const r0 = max[0] - mn0, r1 = max[1] - mn1;

    v[0] = ((v[0] - mn0) % r0 + r0) % r0 + mn0;
    v[1] = ((v[1] - mn1) % r1 + r1) % r1 + mn1;

    return v;
}

export function cl_vec2_lerp(a: vec2_t, b: vec2_t, t: number): vec2_t {
    const out = new TYPE(2);
    const x = a[0];
    const y = a[1];

    out[0] = x + t * (b[0] - x);
    out[1] = y + t * (b[1] - y);

    return out;
}

export function cl_vec2_lerp2(a: vec2_t, b: vec2_t, t: number): vec2_t {
    const x = a[0];
    const y = a[1];

    a[0] = x + t * (b[0] - x);
    a[1] = y + t * (b[1] - y);

    return a;
}

export function cl_vec2_snap(v: vec2_t, g: vec2_t): vec2_t {
    const out = new TYPE(2);

    out[0] = Math.round(v[0] / g[0]) * g[0];
    out[1] = Math.round(v[1] / g[1]) * g[1];

    return out;
}

export function cl_vec2_str(v: vec2_t): string {
    return `vec2(${v[0]}, ${v[1]})`;
}

export function cl_vec2_print(v: vec2_t): void {
    console.log(cl_vec2_str(v));
}
