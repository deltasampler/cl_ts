import {vec3_t, TYPE} from "./type.ts";

export function cl_vec3(x: number = 0.0, y?: number, z?: number): vec3_t {
    const out = new TYPE(3);

    out[0] = x;
    out[1] = y ?? x;
    out[2] = z ?? x;

    return out;
}

export function cl_vec3_new(): vec3_t {
    const out = new TYPE(3);

    out[0] = 0.0;
    out[1] = 0.0;
    out[2] = 0.0;

    return out;
}

export function cl_vec3_x(x: number): vec3_t {
    const out = new TYPE(3);

    out[0] = x;
    out[1] = x;
    out[2] = x;

    return out;
}

export function cl_vec3_xyz(x: number, y: number, z: number): vec3_t {
    const out = new TYPE(3);

    out[0] = x;
    out[1] = y;
    out[2] = z;

    return out;
}

export function cl_vec3_clone(v: vec3_t): vec3_t {
    const out = new TYPE(3);

    out[0] = v[0];
    out[1] = v[1];
    out[2] = v[2];

    return out;
}

export function cl_vec3_set(v: vec3_t, x: number, y: number, z: number): vec3_t {
    v[0] = x;
    v[1] = y;
    v[2] = z;

    return v;
}

export function cl_vec3_copy(a: vec3_t, b: vec3_t): vec3_t {
    a[0] = b[0];
    a[1] = b[1];
    a[2] = b[2];

    return a;
}

export function cl_rgb(r: number = 0.0, g: number = 0.0, b: number = 0.0): vec3_t {
    const out = new TYPE(3);

    out[0] = r / 255.0;
    out[1] = g / 255.0;
    out[2] = b / 255.0;

    return out;
}

export function cl_hex(h: number): vec3_t {
    const out = new TYPE(3);

    out[0] = ((h >> 16) & 0xFF) / 255.0;
    out[1] = ((h >> 8) & 0xFF) / 255.0;
    out[2] = (h & 0xFF) / 255.0;

    return out;
}

export function cl_vec3_zero(v: vec3_t): vec3_t {
    v[0] = 0.0;
    v[1] = 0.0;
    v[2] = 0.0;

    return v;
}

export function cl_vec3_abs(v: vec3_t): vec3_t {
    v[0] = Math.abs(v[0]);
    v[1] = Math.abs(v[1]);
    v[2] = Math.abs(v[2]);

    return v;
}

export function cl_vec3_neg(v: vec3_t): vec3_t {
    v[0] = -v[0];
    v[1] = -v[1];
    v[2] = -v[2];

    return v;
}

export function cl_vec3_inv(v: vec3_t): vec3_t {
    v[0] = 1.0 / v[0];
    v[1] = 1.0 / v[1];
    v[2] = 1.0 / v[2];

    return v;
}

export function cl_vec3_add(a: vec3_t, b: vec3_t): vec3_t {
    const out = new TYPE(3);

    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];

    return out;
}

export function cl_vec3_add2(a: vec3_t, b: vec3_t): vec3_t {
    a[0] += b[0];
    a[1] += b[1];
    a[2] += b[2];

    return a;
}

export function cl_vec3_sub(a: vec3_t, b: vec3_t): vec3_t {
    const out = new TYPE(3);

    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];

    return out;
}

export function cl_vec3_sub2(a: vec3_t, b: vec3_t): vec3_t {
    a[0] -= b[0];
    a[1] -= b[1];
    a[2] -= b[2];

    return a;
}

export function cl_vec3_mul(a: vec3_t, b: vec3_t): vec3_t {
    const out = new TYPE(3);

    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    out[2] = a[2] * b[2];

    return out;
}

export function cl_vec3_mul2(a: vec3_t, b: vec3_t): vec3_t {
    a[0] *= b[0];
    a[1] *= b[1];
    a[2] *= b[2];

    return a;
}

export function cl_vec3_div(a: vec3_t, b: vec3_t): vec3_t {
    const out = new TYPE(3);

    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    out[2] = a[2] / b[2];

    return out;
}

export function cl_vec3_div2(a: vec3_t, b: vec3_t): vec3_t {
    a[0] /= b[0];
    a[1] /= b[1];
    a[2] /= b[2];

    return a;
}

export function cl_vec3_add_mul_s(a: vec3_t, b: vec3_t, s: number): vec3_t {
    const out = new TYPE(3);

    out[0] = a[0] + b[0] * s;
    out[1] = a[1] + b[1] * s;
    out[2] = a[2] + b[2] * s;

    return out;
}

export function cl_vec3_add_mul_s2(a: vec3_t, b: vec3_t, s: number): vec3_t {
    a[0] += b[0] * s;
    a[1] += b[1] * s;
    a[2] += b[2] * s;

    return a;
}

export function cl_vec3_add_s(v: vec3_t, s: number): vec3_t {
    const out = new TYPE(3);

    out[0] = v[0] + s;
    out[1] = v[1] + s;
    out[2] = v[2] + s;

    return out;
}

export function cl_vec3_add_s2(v: vec3_t, s: number): vec3_t {
    v[0] += s;
    v[1] += s;
    v[2] += s;

    return v;
}

export function cl_vec3_sub_s(v: vec3_t, s: number): vec3_t {
    const out = new TYPE(3);

    out[0] = v[0] - s;
    out[1] = v[1] - s;
    out[2] = v[2] - s;

    return out;
}

export function cl_vec3_sub_s2(v: vec3_t, s: number): vec3_t {
    v[0] -= s;
    v[1] -= s;
    v[2] -= s;

    return v;
}

export function cl_vec3_mul_s(v: vec3_t, s: number): vec3_t {
    const out = new TYPE(3);

    out[0] = v[0] * s;
    out[1] = v[1] * s;
    out[2] = v[2] * s;

    return out;
}

export function cl_vec3_mul_s2(v: vec3_t, s: number): vec3_t {
    v[0] *= s;
    v[1] *= s;
    v[2] *= s;

    return v;
}

export function cl_vec3_div_s(v: vec3_t, s: number): vec3_t {
    const out = new TYPE(3);

    out[0] = v[0] / s;
    out[1] = v[1] / s;
    out[2] = v[2] / s;

    return out;
}

export function cl_vec3_div_s2(v: vec3_t, s: number): vec3_t {
    v[0] /= s;
    v[1] /= s;
    v[2] /= s;

    return v;
}

export function cl_vec3_len(v: vec3_t): number {
    return Math.hypot(v[0], v[1], v[2]);
}

export function cl_vec3_len_sq(v: vec3_t): number {
    const x = v[0], y = v[1], z = v[2];

    return x * x + y * y + z * z;
}

export function cl_vec3_unit(v: vec3_t): vec3_t {
    const out = new TYPE(3);
    const x = v[0], y = v[1], z = v[2];
    let l = x * x + y * y + z * z;

    if (l > 0) {
        l = 1.0 / Math.sqrt(l);
    }

    out[0] = x * l;
    out[1] = y * l;
    out[2] = z * l;

    return out;
}

export function cl_vec3_unit2(v: vec3_t): vec3_t {
    const x = v[0], y = v[1], z = v[2];
    let l = x * x + y * y + z * z;

    if (l > 0) {
        l = 1.0 / Math.sqrt(l);
    }

    v[0] *= l;
    v[1] *= l;
    v[2] *= l;

    return v;
}

export function cl_vec3_dot(a: vec3_t, b: vec3_t): number {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

export function cl_vec3_cross(a: vec3_t, b: vec3_t): vec3_t {
    const out = new TYPE(3);
    const ax = a[0], ay = a[1], az = a[2];
    const bx = b[0], by = b[1], bz = b[2];

    out[0] = ay * bz - az * by;
    out[1] = az * bx - ax * bz;
    out[2] = ax * by - ay * bx;

    return out;
}

export function cl_vec3_dist(a: vec3_t, b: vec3_t): number {
    return Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
}

export function cl_vec3_dist_sq(a: vec3_t, b: vec3_t): number {
    const x = a[0] - b[0];
    const y = a[1] - b[1];
    const z = a[2] - b[2];

    return x * x + y * y + z * z;
}

export function cl_vec3_refl(v: vec3_t, n: vec3_t): vec3_t {
    const out = new TYPE(3);
    const l = cl_vec3_dot(n, v) * 2.0;

    out[0] = v[0] - n[0] * l;
    out[1] = v[1] - n[1] * l;
    out[2] = v[2] - n[2] * l;

    return out;
}

export function cl_vec3_floor(v: vec3_t): vec3_t {
    const out = new TYPE(3);

    out[0] = Math.floor(v[0]);
    out[1] = Math.floor(v[1]);
    out[2] = Math.floor(v[2]);

    return out;
}

export function cl_vec3_floor2(v: vec3_t): vec3_t {
    v[0] = Math.floor(v[0]);
    v[1] = Math.floor(v[1]);
    v[2] = Math.floor(v[2]);

    return v;
}

export function cl_vec3_ceil(v: vec3_t): vec3_t {
    const out = new TYPE(3);

    out[0] = Math.ceil(v[0]);
    out[1] = Math.ceil(v[1]);
    out[2] = Math.ceil(v[2]);

    return out;
}

export function cl_vec3_ceil2(v: vec3_t): vec3_t {
    v[0] = Math.ceil(v[0]);
    v[1] = Math.ceil(v[1]);
    v[2] = Math.ceil(v[2]);

    return v;
}

export function cl_vec3_round(v: vec3_t): vec3_t {
    const out = new TYPE(3);

    out[0] = Math.round(v[0]);
    out[1] = Math.round(v[1]);
    out[2] = Math.round(v[2]);

    return out;
}

export function cl_vec3_round2(v: vec3_t): vec3_t {
    v[0] = Math.round(v[0]);
    v[1] = Math.round(v[1]);
    v[2] = Math.round(v[2]);

    return v;
}

export function cl_vec3_trunc(v: vec3_t): vec3_t {
    const out = new TYPE(3);

    out[0] = Math.trunc(v[0]);
    out[1] = Math.trunc(v[1]);
    out[2] = Math.trunc(v[2]);

    return out;
}

export function cl_vec3_trunc2(v: vec3_t): vec3_t {
    v[0] = Math.trunc(v[0]);
    v[1] = Math.trunc(v[1]);
    v[2] = Math.trunc(v[2]);

    return v;
}

export function cl_vec3_min(a: vec3_t, b: vec3_t): vec3_t {
    const out = new TYPE(3);

    out[0] = Math.min(a[0], b[0]);
    out[1] = Math.min(a[1], b[1]);
    out[2] = Math.min(a[2], b[2]);

    return out;
}

export function cl_vec3_min2(a: vec3_t, b: vec3_t): vec3_t {
    a[0] = Math.min(a[0], b[0]);
    a[1] = Math.min(a[1], b[1]);
    a[2] = Math.min(a[2], b[2]);

    return a;
}

export function cl_vec3_max(a: vec3_t, b: vec3_t): vec3_t {
    const out = new TYPE(3);

    out[0] = Math.max(a[0], b[0]);
    out[1] = Math.max(a[1], b[1]);
    out[2] = Math.max(a[2], b[2]);

    return out;
}

export function cl_vec3_max2(a: vec3_t, b: vec3_t): vec3_t {
    a[0] = Math.max(a[0], b[0]);
    a[1] = Math.max(a[1], b[1]);
    a[2] = Math.max(a[2], b[2]);

    return a;
}

export function cl_vec3_clamp(v: vec3_t, min: vec3_t, max: vec3_t): vec3_t {
    const out = new TYPE(3);

    out[0] = Math.min(Math.max(v[0], min[0]), max[0]);
    out[1] = Math.min(Math.max(v[1], min[1]), max[1]);
    out[2] = Math.min(Math.max(v[2], min[2]), max[2]);

    return out;
}

export function cl_vec3_clamp2(v: vec3_t, min: vec3_t, max: vec3_t): vec3_t {
    v[0] = Math.min(Math.max(v[0], min[0]), max[0]);
    v[1] = Math.min(Math.max(v[1], min[1]), max[1]);
    v[2] = Math.min(Math.max(v[2], min[2]), max[2]);

    return v;
}

export function cl_vec3_loop(v: vec3_t, min: vec3_t, max: vec3_t): vec3_t {
    const out = new TYPE(3);
    const mn0 = min[0], mn1 = min[1], mn2 = min[2];
    const r0 = max[0] - mn0, r1 = max[1] - mn1, r2 = max[2] - mn2;

    out[0] = ((v[0] - mn0) % r0 + r0) % r0 + mn0;
    out[1] = ((v[1] - mn1) % r1 + r1) % r1 + mn1;
    out[2] = ((v[2] - mn2) % r2 + r2) % r2 + mn2;

    return out;
}

export function cl_vec3_loop2(v: vec3_t, min: vec3_t, max: vec3_t): vec3_t {
    const mn0 = min[0], mn1 = min[1], mn2 = min[2];
    const r0 = max[0] - mn0, r1 = max[1] - mn1, r2 = max[2] - mn2;

    v[0] = ((v[0] - mn0) % r0 + r0) % r0 + mn0;
    v[1] = ((v[1] - mn1) % r1 + r1) % r1 + mn1;
    v[2] = ((v[2] - mn2) % r2 + r2) % r2 + mn2;

    return v;
}

export function cl_vec3_lerp(a: vec3_t, b: vec3_t, t: number): vec3_t {
    const out = new TYPE(3);
    const x = a[0];
    const y = a[1];
    const z = a[2];

    out[0] = x + t * (b[0] - x);
    out[1] = y + t * (b[1] - y);
    out[2] = z + t * (b[2] - z);

    return out;
}

export function cl_vec3_lerp2(a: vec3_t, b: vec3_t, t: number): vec3_t {
    const x = a[0];
    const y = a[1];
    const z = a[2];

    a[0] = x + t * (b[0] - x);
    a[1] = y + t * (b[1] - y);
    a[2] = z + t * (b[2] - z);

    return a;
}

export function cl_vec3_str(v: vec3_t): string {
    return `vec3(${v[0]}, ${v[1]}, ${v[2]})`;
}

export function cl_vec3_print(v: vec3_t): void {
    console.log(cl_vec3_str(v));
}
