import {vec4_t, TYPE} from "./type.ts";

export function cl_vec4(x: number = 0.0, y?: number, z?: number, w?: number): vec4_t {
    const out = new TYPE(4);

    out[0] = x;
    out[1] = y ?? x;
    out[2] = z ?? x;
    out[3] = w ?? x;

    return out;
}

export function cl_vec4_new(): vec4_t {
    const out = new TYPE(4);

    out[0] = 0.0;
    out[1] = 0.0;
    out[2] = 0.0;
    out[3] = 0.0;

    return out;
}

export function cl_vec4_x(x: number): vec4_t {
    const out = new TYPE(4);

    out[0] = x;
    out[1] = x;
    out[2] = x;
    out[3] = x;

    return out;
}

export function cl_vec4_xyzw(x: number, y: number, z: number, w: number): vec4_t {
    const out = new TYPE(4);

    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = w;

    return out;
}

export function cl_vec4_clone(v: vec4_t): vec4_t {
    const out = new TYPE(4);

    out[0] = v[0];
    out[1] = v[1];
    out[2] = v[2];
    out[3] = v[3];

    return out;
}

export function cl_vec4_set(v: vec4_t, x: number, y: number, z: number, w: number): vec4_t {
    v[0] = x;
    v[1] = y;
    v[2] = z;
    v[3] = w;

    return v;
}

export function cl_vec4_copy(a: vec4_t, b: vec4_t): vec4_t {
    a[0] = b[0];
    a[1] = b[1];
    a[2] = b[2];
    a[3] = b[3];

    return a;
}

export function cl_rgba(r: number = 0.0, g: number = 0.0, b: number = 0.0, a: number = 0.0): vec4_t {
    const out = new TYPE(4);

    out[0] = r / 255.0;
    out[1] = g / 255.0;
    out[2] = b / 255.0;
    out[3] = a / 255.0;

    return out;
}

export function cl_hexa(h: number): vec4_t {
    const out = new TYPE(4);

    out[0] = ((h >> 24) & 0xFF) / 255.0;
    out[1] = ((h >> 16) & 0xFF) / 255.0;
    out[2] = ((h >> 8) & 0xFF) / 255.0;
    out[3] = (h & 0xFF) / 255.0;

    return out;
}

export function cl_vec4_zero(v: vec4_t): vec4_t {
    v[0] = 0.0;
    v[1] = 0.0;
    v[2] = 0.0;
    v[3] = 0.0;

    return v;
}

export function cl_vec4_abs(v: vec4_t): vec4_t {
    v[0] = Math.abs(v[0]);
    v[1] = Math.abs(v[1]);
    v[2] = Math.abs(v[2]);
    v[3] = Math.abs(v[3]);

    return v;
}

export function cl_vec4_neg(v: vec4_t): vec4_t {
    v[0] = -v[0];
    v[1] = -v[1];
    v[2] = -v[2];
    v[3] = -v[3];

    return v;
}

export function cl_vec4_inv(v: vec4_t): vec4_t {
    v[0] = 1.0 / v[0];
    v[1] = 1.0 / v[1];
    v[2] = 1.0 / v[2];
    v[3] = 1.0 / v[3];

    return v;
}

export function cl_vec4_add(a: vec4_t, b: vec4_t): vec4_t {
    const out = new TYPE(4);

    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    out[3] = a[3] + b[3];

    return out;
}

export function cl_vec4_add2(a: vec4_t, b: vec4_t): vec4_t {
    a[0] += b[0];
    a[1] += b[1];
    a[2] += b[2];
    a[3] += b[3];

    return a;
}

export function cl_vec4_sub(a: vec4_t, b: vec4_t): vec4_t {
    const out = new TYPE(4);

    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    out[3] = a[3] - b[3];

    return out;
}

export function cl_vec4_sub2(a: vec4_t, b: vec4_t): vec4_t {
    a[0] -= b[0];
    a[1] -= b[1];
    a[2] -= b[2];
    a[3] -= b[3];

    return a;
}

export function cl_vec4_mul(a: vec4_t, b: vec4_t): vec4_t {
    const out = new TYPE(4);

    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    out[2] = a[2] * b[2];
    out[3] = a[3] * b[3];

    return out;
}

export function cl_vec4_mul2(a: vec4_t, b: vec4_t): vec4_t {
    a[0] *= b[0];
    a[1] *= b[1];
    a[2] *= b[2];
    a[3] *= b[3];

    return a;
}

export function cl_vec4_div(a: vec4_t, b: vec4_t): vec4_t {
    const out = new TYPE(4);

    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    out[2] = a[2] / b[2];
    out[3] = a[3] / b[3];

    return out;
}

export function cl_vec4_div2(a: vec4_t, b: vec4_t): vec4_t {
    a[0] /= b[0];
    a[1] /= b[1];
    a[2] /= b[2];
    a[3] /= b[3];

    return a;
}

export function cl_vec4_add_mul_s(a: vec4_t, b: vec4_t, s: number): vec4_t {
    const out = new TYPE(4);

    out[0] = a[0] + b[0] * s;
    out[1] = a[1] + b[1] * s;
    out[2] = a[2] + b[2] * s;
    out[3] = a[3] + b[3] * s;

    return out;
}

export function cl_vec4_add_mul_s2(a: vec4_t, b: vec4_t, s: number): vec4_t {
    a[0] += b[0] * s;
    a[1] += b[1] * s;
    a[2] += b[2] * s;
    a[3] += b[3] * s;

    return a;
}

export function cl_vec4_add_s(v: vec4_t, s: number): vec4_t {
    const out = new TYPE(4);

    out[0] = v[0] + s;
    out[1] = v[1] + s;
    out[2] = v[2] + s;
    out[3] = v[3] + s;

    return out;
}

export function cl_vec4_add_s2(v: vec4_t, s: number): vec4_t {
    v[0] += s;
    v[1] += s;
    v[2] += s;
    v[3] += s;

    return v;
}

export function cl_vec4_sub_s(v: vec4_t, s: number): vec4_t {
    const out = new TYPE(4);

    out[0] = v[0] - s;
    out[1] = v[1] - s;
    out[2] = v[2] - s;
    out[3] = v[3] - s;

    return out;
}

export function cl_vec4_sub_s2(v: vec4_t, s: number): vec4_t {
    v[0] -= s;
    v[1] -= s;
    v[2] -= s;
    v[3] -= s;

    return v;
}

export function cl_vec4_mul_s(v: vec4_t, s: number): vec4_t {
    const out = new TYPE(4);

    out[0] = v[0] * s;
    out[1] = v[1] * s;
    out[2] = v[2] * s;
    out[3] = v[3] * s;

    return out;
}

export function cl_vec4_mul_s2(v: vec4_t, s: number): vec4_t {
    v[0] *= s;
    v[1] *= s;
    v[2] *= s;
    v[3] *= s;

    return v;
}

export function cl_vec4_div_s(v: vec4_t, s: number): vec4_t {
    const out = new TYPE(4);

    out[0] = v[0] / s;
    out[1] = v[1] / s;
    out[2] = v[2] / s;
    out[3] = v[3] / s;

    return out;
}

export function cl_vec4_div_s2(v: vec4_t, s: number): vec4_t {
    v[0] /= s;
    v[1] /= s;
    v[2] /= s;
    v[3] /= s;

    return v;
}

export function cl_vec4_len(v: vec4_t): number {
    return Math.hypot(v[0], v[1], v[2], v[3]);
}

export function cl_vec4_len_sq(v: vec4_t): number {
    const x = v[0], y = v[1], z = v[2], w = v[3];

    return x * x + y * y + z * z + w * w;
}

export function cl_vec4_unit(v: vec4_t): vec4_t {
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

export function cl_vec4_unit2(v: vec4_t): vec4_t {
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

export function cl_vec4_dot(a: vec4_t, b: vec4_t): number {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
}

export function cl_vec4_dist(a: vec4_t, b: vec4_t): number {
    return Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2], a[3] - b[3]);
}

export function cl_vec4_dist_sq(a: vec4_t, b: vec4_t): number {
    const x = a[0] - b[0];
    const y = a[1] - b[1];
    const z = a[2] - b[2];
    const w = a[3] - b[3];

    return x * x + y * y + z * z + w * w;
}

export function cl_vec4_refl(v: vec4_t, n: vec4_t): vec4_t {
    const out = new TYPE(4);
    const l = cl_vec4_dot(n, v) * 2.0;

    out[0] = v[0] - n[0] * l;
    out[1] = v[1] - n[1] * l;
    out[2] = v[2] - n[2] * l;
    out[3] = v[3] - n[3] * l;

    return out;
}

export function cl_vec4_floor(v: vec4_t): vec4_t {
    const out = new TYPE(4);

    out[0] = Math.floor(v[0]);
    out[1] = Math.floor(v[1]);
    out[2] = Math.floor(v[2]);
    out[3] = Math.floor(v[3]);

    return out;
}

export function cl_vec4_floor2(v: vec4_t): vec4_t {
    v[0] = Math.floor(v[0]);
    v[1] = Math.floor(v[1]);
    v[2] = Math.floor(v[2]);
    v[3] = Math.floor(v[3]);

    return v;
}

export function cl_vec4_ceil(v: vec4_t): vec4_t {
    const out = new TYPE(4);

    out[0] = Math.ceil(v[0]);
    out[1] = Math.ceil(v[1]);
    out[2] = Math.ceil(v[2]);
    out[3] = Math.ceil(v[3]);

    return out;
}

export function cl_vec4_ceil2(v: vec4_t): vec4_t {
    v[0] = Math.ceil(v[0]);
    v[1] = Math.ceil(v[1]);
    v[2] = Math.ceil(v[2]);
    v[3] = Math.ceil(v[3]);

    return v;
}

export function cl_vec4_round(v: vec4_t): vec4_t {
    const out = new TYPE(4);

    out[0] = Math.round(v[0]);
    out[1] = Math.round(v[1]);
    out[2] = Math.round(v[2]);
    out[3] = Math.round(v[3]);

    return out;
}

export function cl_vec4_round2(v: vec4_t): vec4_t {
    v[0] = Math.round(v[0]);
    v[1] = Math.round(v[1]);
    v[2] = Math.round(v[2]);
    v[3] = Math.round(v[3]);

    return v;
}

export function cl_vec4_trunc(v: vec4_t): vec4_t {
    const out = new TYPE(4);

    out[0] = Math.trunc(v[0]);
    out[1] = Math.trunc(v[1]);
    out[2] = Math.trunc(v[2]);
    out[3] = Math.trunc(v[3]);

    return out;
}

export function cl_vec4_trunc2(v: vec4_t): vec4_t {
    v[0] = Math.trunc(v[0]);
    v[1] = Math.trunc(v[1]);
    v[2] = Math.trunc(v[2]);
    v[3] = Math.trunc(v[3]);

    return v;
}

export function cl_vec4_min(a: vec4_t, b: vec4_t): vec4_t {
    const out = new TYPE(4);

    out[0] = Math.min(a[0], b[0]);
    out[1] = Math.min(a[1], b[1]);
    out[2] = Math.min(a[2], b[2]);
    out[3] = Math.min(a[3], b[3]);

    return out;
}

export function cl_vec4_min2(a: vec4_t, b: vec4_t): vec4_t {
    a[0] = Math.min(a[0], b[0]);
    a[1] = Math.min(a[1], b[1]);
    a[2] = Math.min(a[2], b[2]);
    a[3] = Math.min(a[3], b[3]);

    return a;
}

export function cl_vec4_max(a: vec4_t, b: vec4_t): vec4_t {
    const out = new TYPE(4);

    out[0] = Math.max(a[0], b[0]);
    out[1] = Math.max(a[1], b[1]);
    out[2] = Math.max(a[2], b[2]);
    out[3] = Math.max(a[3], b[3]);

    return out;
}

export function cl_vec4_max2(a: vec4_t, b: vec4_t): vec4_t {
    a[0] = Math.max(a[0], b[0]);
    a[1] = Math.max(a[1], b[1]);
    a[2] = Math.max(a[2], b[2]);
    a[3] = Math.max(a[3], b[3]);

    return a;
}

export function cl_vec4_clamp(v: vec4_t, min: vec4_t, max: vec4_t): vec4_t {
    const out = new TYPE(4);

    out[0] = Math.min(Math.max(v[0], min[0]), max[0]);
    out[1] = Math.min(Math.max(v[1], min[1]), max[1]);
    out[2] = Math.min(Math.max(v[2], min[2]), max[2]);
    out[3] = Math.min(Math.max(v[3], min[3]), max[3]);

    return out;
}

export function cl_vec4_clamp2(v: vec4_t, min: vec4_t, max: vec4_t): vec4_t {
    v[0] = Math.min(Math.max(v[0], min[0]), max[0]);
    v[1] = Math.min(Math.max(v[1], min[1]), max[1]);
    v[2] = Math.min(Math.max(v[2], min[2]), max[2]);
    v[3] = Math.min(Math.max(v[3], min[3]), max[3]);

    return v;
}

export function cl_vec4_loop(v: vec4_t, min: vec4_t, max: vec4_t): vec4_t {
    const out = new TYPE(4);
    const mn0 = min[0], mn1 = min[1], mn2 = min[2], mn3 = min[3];
    const r0 = max[0] - mn0, r1 = max[1] - mn1, r2 = max[2] - mn2, r3 = max[3] - mn3;

    out[0] = ((v[0] - mn0) % r0 + r0) % r0 + mn0;
    out[1] = ((v[1] - mn1) % r1 + r1) % r1 + mn1;
    out[2] = ((v[2] - mn2) % r2 + r2) % r2 + mn2;
    out[3] = ((v[3] - mn3) % r3 + r3) % r3 + mn3;

    return out;
}

export function cl_vec4_loop2(v: vec4_t, min: vec4_t, max: vec4_t): vec4_t {
    const mn0 = min[0], mn1 = min[1], mn2 = min[2], mn3 = min[3];
    const r0 = max[0] - mn0, r1 = max[1] - mn1, r2 = max[2] - mn2, r3 = max[3] - mn3;

    v[0] = ((v[0] - mn0) % r0 + r0) % r0 + mn0;
    v[1] = ((v[1] - mn1) % r1 + r1) % r1 + mn1;
    v[2] = ((v[2] - mn2) % r2 + r2) % r2 + mn2;
    v[3] = ((v[3] - mn3) % r3 + r3) % r3 + mn3;

    return v;
}

export function cl_vec4_lerp(a: vec4_t, b: vec4_t, t: number): vec4_t {
    const out = new TYPE(4);
    const x = a[0];
    const y = a[1];
    const z = a[2];
    const w = a[3];

    out[0] = x + t * (b[0] - x);
    out[1] = y + t * (b[1] - y);
    out[2] = z + t * (b[2] - z);
    out[3] = w + t * (b[3] - w);

    return out;
}

export function cl_vec4_lerp2(a: vec4_t, b: vec4_t, t: number): vec4_t {
    const x = a[0];
    const y = a[1];
    const z = a[2];
    const w = a[3];

    a[0] = x + t * (b[0] - x);
    a[1] = y + t * (b[1] - y);
    a[2] = z + t * (b[2] - z);
    a[3] = w + t * (b[3] - w);

    return a;
}

export function cl_vec4_str(v: vec4_t): string {
    return `vec4(${v[0]}, ${v[1]}, ${v[2]}, ${v[3]})`;
}

export function cl_vec4_print(v: vec4_t): void {
    console.log(cl_vec4_str(v));
}
