import {EPSILON} from "./math.ts";
import {TYPE, mat3_t, mat4_t, vec2_t, vec3_t} from "./type.ts";

// creation
export function vec3(x: number = 0.0, y?: number, z?: number): vec3_t {
    const out = new TYPE(3);

    out[0] = x;
    out[1] = y ?? x;
    out[2] = z ?? x;

    return out;
}

export function vec3_new(): vec3_t {
    const out = new TYPE(3);

    out[0] = 0.0;
    out[1] = 0.0;
    out[2] = 0.0;

    return out;
}

export function vec3_x(x: number): vec3_t {
    const out = new TYPE(3);

    out[0] = x;
    out[1] = x;
    out[2] = x;

    return out;
}

export function vec3_xyz(x: number, y: number, z: number): vec3_t {
    const out = new TYPE(3);

    out[0] = x;
    out[1] = y;
    out[2] = z;

    return out;
}

export function vec3_clone(v: vec3_t): vec3_t {
    const out = new TYPE(3);

    out[0] = v[0];
    out[1] = v[1];
    out[2] = v[2];

    return out;
}

// setter
export function vec3_zero(v: vec3_t): vec3_t {
    v[0] = 0.0;
    v[1] = 0.0;
    v[2] = 0.0;

    return v;
}

export function vec3_set(v: vec3_t, x: number, y: number, z: number): vec3_t {
    v[0] = x;
    v[1] = y;
    v[2] = z;

    return v;
}

export function vec3_copy(a: vec3_t, b: vec3_t): vec3_t {
    a[0] = b[0];
    a[1] = b[1];
    a[2] = b[2];

    return a;
}

// color
export function rgb(r: number = 0.0, g: number = 0.0, b: number = 0.0): vec3_t {
    const out = new TYPE(3);

    out[0] = r / 255.0;
    out[1] = g / 255.0;
    out[2] = b / 255.0;

    return out;
}

export function hex(h: number): vec3_t {
    const out = new TYPE(3);

    out[0] = ((h >> 16) & 0xFF) / 255.0;
    out[1] = ((h >> 8) & 0xFF) / 255.0;
    out[2] = (h & 0xFF) / 255.0;

    return out;
}

// unary
export function vec3_neg(v: vec3_t): vec3_t {
    v[0] = -v[0];
    v[1] = -v[1];
    v[2] = -v[2];

    return v;
}

export function vec3_abs(v: vec3_t): vec3_t {
    v[0] = Math.abs(v[0]);
    v[1] = Math.abs(v[1]);
    v[2] = Math.abs(v[2]);

    return v;
}

export function vec3_inv(v: vec3_t): vec3_t {
    v[0] = 1.0 / v[0];
    v[1] = 1.0 / v[1];
    v[2] = 1.0 / v[2];

    return v;
}

// arithmetic vector x vector
export function vec3_add(a: vec3_t, b: vec3_t, out: vec3_t): vec3_t {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];

    return out;
}

export function vec3_add1(a: vec3_t, b: vec3_t): vec3_t {
    return vec3_add(a, b, new TYPE(3));
}

export function vec3_add2(a: vec3_t, b: vec3_t): vec3_t {
    return vec3_add(a, b, a);
}

export function vec3_sub(a: vec3_t, b: vec3_t, out: vec3_t): vec3_t {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];

    return out;
}

export function vec3_sub1(a: vec3_t, b: vec3_t): vec3_t {
    return vec3_sub(a, b, new TYPE(3));

}

export function vec3_sub2(a: vec3_t, b: vec3_t): vec3_t {
    return vec3_sub(a, b, a);
}

export function vec3_mul(a: vec3_t, b: vec3_t, out: vec3_t): vec3_t {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    out[2] = a[2] * b[2];

    return out;
}

export function vec3_mul1(a: vec3_t, b: vec3_t): vec3_t {
    return vec3_mul(a, b, new TYPE(3));
}

export function vec3_mul2(a: vec3_t, b: vec3_t): vec3_t {
    return vec3_mul(a, b, a);
}

export function vec3_div(a: vec3_t, b: vec3_t, out: vec3_t): vec3_t {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    out[2] = a[2] / b[2];

    return out;
}

export function vec3_div1(a: vec3_t, b: vec3_t): vec3_t {
    return vec3_div(a, b, new TYPE(3));
}

export function vec3_div2(a: vec3_t, b: vec3_t): vec3_t {
    return vec3_div(a, b, a);
}

// arithmetic vector x scalar
export function vec3_adds(v: vec3_t, s: number, out: vec3_t): vec3_t {
    out[0] = v[0] + s;
    out[1] = v[1] + s;
    out[2] = v[2] + s;

    return out;
}

export function vec3_adds1(v: vec3_t, s: number): vec3_t {
    return vec3_adds(v, s, new TYPE(3));
}

export function vec3_adds2(v: vec3_t, s: number): vec3_t {
    return vec3_adds(v, s, v);
}

export function vec3_subs(v: vec3_t, s: number, out: vec3_t): vec3_t {
    out[0] = v[0] - s;
    out[1] = v[1] - s;
    out[2] = v[2] - s;

    return out;
}

export function vec3_subs1(v: vec3_t, s: number): vec3_t {
    return vec3_subs(v, s, new TYPE(3));
}

export function vec3_subs2(v: vec3_t, s: number): vec3_t {
    return vec3_subs(v, s, v);
}

export function vec3_muls(v: vec3_t, s: number, out: vec3_t): vec3_t {
    out[0] = v[0] * s;
    out[1] = v[1] * s;
    out[2] = v[2] * s;

    return out;
}

export function vec3_muls1(v: vec3_t, s: number): vec3_t {
    return vec3_muls(v, s, new TYPE(3));
}

export function vec3_muls2(v: vec3_t, s: number): vec3_t {
    return vec3_muls(v, s, v);
}

export function vec3_divs(v: vec3_t, s: number, out: vec3_t): vec3_t {
    out[0] = v[0] / s;
    out[1] = v[1] / s;
    out[2] = v[2] / s;

    return out;
}

export function vec3_divs1(v: vec3_t, s: number): vec3_t {
    return vec3_divs(v, s, new TYPE(3));
}

export function vec3_divs2(v: vec3_t, s: number): vec3_t {
    return vec3_divs(v, s, v);
}

// arithmetic vector x vector x scalar
export function vec3_addmuls(a: vec3_t, b: vec3_t, s: number, out: vec3_t): vec3_t {
    out[0] = a[0] + b[0] * s;
    out[1] = a[1] + b[1] * s;
    out[2] = a[2] + b[2] * s;

    return out;
}

export function vec3_addmuls1(a: vec3_t, b: vec3_t, s: number): vec3_t {
    return vec3_addmuls(a, b, s, new TYPE(2));
}

export function vec3_addmuls2(a: vec3_t, b: vec3_t, s: number): vec3_t {
    return vec3_addmuls(a, b, s, a);
}

// product
export function vec3_dot(a: vec3_t, b: vec3_t): number {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

export function vec3_cross(a: vec3_t, b: vec3_t, out: vec3_t): vec3_t {
    const ax = a[0], ay = a[1], az = a[2];
    const bx = b[0], by = b[1], bz = b[2];

    out[0] = ay * bz - az * by;
    out[1] = az * bx - ax * bz;
    out[2] = ax * by - ay * bx;

    return out;
}

export function vec3_cross1(a: vec3_t, b: vec3_t): vec3_t {
    return vec3_cross(a, b, new TYPE(3));
}

// norm
export function vec3_len(v: vec3_t): number {
    return Math.hypot(v[0], v[1], v[2]);
}

export function vec3_len_sq(v: vec3_t): number {
    const x = v[0], y = v[1], z = v[2];

    return x * x + y * y + z * z;
}

export function vec3_dist(a: vec3_t, b: vec3_t): number {
    return Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
}

export function vec3_dist_sq(a: vec3_t, b: vec3_t): number {
    const x = a[0] - b[0];
    const y = a[1] - b[1];
    const z = a[2] - b[2];

    return x * x + y * y + z * z;
}

export function vec3_unit(v: vec3_t, out: vec3_t): vec3_t {
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

export function vec3_unit1(v: vec3_t): vec3_t {
    return vec3_unit(v, new TYPE(3));
}

export function vec3_unit2(v: vec3_t): vec3_t {
    return vec3_unit(v, v);
}

export function vec3_dir(a: vec3_t, b: vec3_t, out: vec3_t): vec3_t {
    const x = a[0] - b[0], y = a[1] - b[1], z = a[2] - b[2];
    let l = x * x + y * y + z * z;

    if (l > 0) {
        l = 1.0 / Math.sqrt(l);
    }

    out[0] = x * l;
    out[1] = y * l;
    out[2] = z * l;

    return out;
}

export function vec3_dir1(a: vec3_t, b: vec3_t): vec3_t {
    return vec3_dir(a, b, new TYPE(2));
}

// transform
export function vec3_transf_mat3(v: vec3_t, m: mat3_t, out: vec3_t): vec3_t {
    const x = v[0], y = v[1], z = v[2];

    out[0] = x * m[0] + y * m[3] + z * m[6];
    out[1] = x * m[1] + y * m[4] + z * m[7];
    out[2] = x * m[2] + y * m[5] + z * m[8];

    return v;
}

export function vec3_transf_mat3_1(v: vec3_t, m: mat3_t): vec3_t {
    return vec3_transf_mat3(v, m, new TYPE(3));
}

export function vec3_transf_mat3_2(v: vec3_t, m: mat3_t): vec3_t {
    return vec3_transf_mat3(v, m, v);
}

export function vec3_transf_mat4(v: vec3_t, m: mat4_t, out: vec3_t): vec3_t {
    const x = v[0], y = v[1], z = v[2];
    const w = (m[3] * x + m[7] * y + m[11] * z + m[15]) || 1.0;

    out[0] = (m[0] * x + m[4] * y + m[8] * z + m[12]) / w;
    out[1] = (m[1] * x + m[5] * y + m[9] * z + m[13]) / w;
    out[2] = (m[2] * x + m[6] * y + m[10] * z + m[14]) / w;

    return out;
}

export function vec3_transf_mat4_1(v: vec3_t, m: mat3_t): vec3_t {
    return vec3_transf_mat4(v, m, new TYPE(3));
}

export function vec3_transf_mat4_2(v: vec3_t, m: mat3_t): vec3_t {
    return vec3_transf_mat4(v, m, v);
}

export function vec3_rotate_x(v: vec3_t, c: vec3_t, r: number, out: vec3_t): vec3_t {
    const p0 = v[0] - c[0], p1 = v[1] - c[1], p2 = v[2] - c[2];
    const r0 = p0,
          r1 = p1 * Math.cos(r) - p2 * Math.sin(r),
          r2 = p1 * Math.sin(r) + p2 * Math.cos(r);

    out[0] = r0 + c[0];
    out[1] = r1 + c[1];
    out[2] = r2 + c[2];

    return out;
}

export function vec3_rotate_x1(v: vec3_t, c: vec3_t, r: number): vec3_t {
    return vec3_rotate_x(v, c, r, new TYPE(3));
}

export function vec3_rotate_x2(v: vec3_t, c: vec3_t, r: number): vec3_t {
    return vec3_rotate_x(v, c, r, v);
}

export function vec3_rotate_y(v: vec3_t, c: vec3_t, r: number, out: vec3_t): vec3_t {
    const p0 = v[0] - c[0], p1 = v[1] - c[1], p2 = v[2] - c[2];
    const r0 = p2 * Math.sin(r) + p0 * Math.cos(r),
          r1 = p1,
          r2 = p2 * Math.cos(r) - p0 * Math.sin(r);

    out[0] = r0 + c[0];
    out[1] = r1 + c[1];
    out[2] = r2 + c[2];

    return out;
}

export function vec3_rotate_y1(v: vec3_t, c: vec3_t, r: number): vec3_t {
    return vec3_rotate_y(v, c, r, new TYPE(3));
}

export function vec3_rotate_y2(v: vec3_t, c: vec3_t, r: number): vec3_t {
    return vec3_rotate_y(v, c, r, v);
}

export function vec3_rotate_z(v: vec3_t, c: vec3_t, r: number, out: vec3_t): vec3_t {
    const p0 = v[0] - c[0], p1 = v[1] - c[1], p2 = v[2] - c[2];
    const r0 = p0 * Math.cos(r) - p1 * Math.sin(r),
          r1 = p0 * Math.sin(r) + p1 * Math.cos(r),
          r2 = p2;

    out[0] = r0 + c[0];
    out[1] = r1 + c[1];
    out[2] = r2 + c[2];

    return out;
}

export function vec3_rotate_z1(v: vec3_t, c: vec3_t, r: number): vec3_t {
    return vec3_rotate_z(v, c, r, new TYPE(3));
}

export function vec3_rotate_z2(v: vec3_t, c: vec3_t, r: number): vec3_t {
    return vec3_rotate_z(v, c, r, v);
}

// geometric
export function vec3_refl(v: vec3_t, n: vec3_t, out: vec3_t): vec3_t {
    const l = vec3_dot(n, v) * 2.0;

    out[0] = v[0] - n[0] * l;
    out[1] = v[1] - n[1] * l;
    out[2] = v[2] - n[2] * l;

    return out;
}

export function vec3_refl1(v: vec3_t, n: vec3_t): vec3_t {
    return vec3_refl(v, n, new TYPE(3));
}

// angular
export function vec3_angle(v: vec3_t): vec2_t {
    const out = new TYPE(2);
    const x = v[0], y = v[1], z = v[2];

    out[0] = Math.atan2(y, x);
    out[1] = Math.acos(z / Math.hypot(x, y, z));

    return out;
}

export function vec3_angle_ab(a: vec3_t, b: vec3_t): number {
    const ax = a[0], ay = a[1], az = a[2];
    const bx = b[0], by = b[1], bz = b[2];
    const mag = Math.sqrt((ax * ax + ay * ay + az * az) * (bx * bx + by * by + bz * bz));
    const cos = mag && (ax * bx + ay * by + az * bz) / mag;

    return Math.acos(Math.min(Math.max(cos, -1.0), 1.0));
}

// interpolation
export function vec3_lerp(a: vec3_t, b: vec3_t, t: number, out: vec3_t): vec3_t {
    const x = a[0], y = a[1], z = a[2];

    out[0] = x + t * (b[0] - x);
    out[1] = y + t * (b[1] - y);
    out[2] = z + t * (b[2] - z);

    return out;
}

export function vec3_lerp1(a: vec3_t, b: vec3_t, t: number): vec3_t {
    return vec3_lerp(a, b, t, new TYPE(3));
}

export function vec3_lerp2(a: vec3_t, b: vec3_t, t: number): vec3_t {
    return vec3_lerp(a, b, t, a);
}

export function vec3_slerp(a: vec3_t, b: vec3_t, t: number, out: vec3_t): vec3_t {
    const angle = Math.acos(Math.min(Math.max(vec3_dot(a, b), -1), 1));
    const sin_total = Math.sin(angle);
    const ratio_a = Math.sin((1 - t) * angle) / sin_total;
    const ratio_b = Math.sin(t * angle) / sin_total;

    out[0] = ratio_a * a[0] + ratio_b * b[0];
    out[1] = ratio_a * a[1] + ratio_b * b[1];
    out[2] = ratio_a * a[2] + ratio_b * b[2];

    return out;
}

export function vec3_hermite(a: vec3_t, b: vec3_t, c: vec3_t, d: vec3_t, t: number, out: vec3_t): vec3_t {
    const factor_times_2 = t * t;
    const factor_1 = factor_times_2 * (2 * t - 3) + 1;
    const factor_2 = factor_times_2 * (t - 2) + t;
    const factor_3 = factor_times_2 * (t - 1);
    const factor_4 = factor_times_2 * (3 - 2 * t);

    out[0] = a[0] * factor_1 + b[0] * factor_2 + c[0] * factor_3 + d[0] * factor_4;
    out[1] = a[1] * factor_1 + b[1] * factor_2 + c[1] * factor_3 + d[1] * factor_4;
    out[2] = a[2] * factor_1 + b[2] * factor_2 + c[2] * factor_3 + d[2] * factor_4;

    return out;
}

export function vec3_bezier(a: vec3_t, b: vec3_t, c: vec3_t, d: vec3_t, t: number, out: vec3_t): vec3_t {
    const inverse_factor = 1 - t;
    const inverse_factor_times_two = inverse_factor * inverse_factor;
    const factor_times_two = t * t;
    const factor1 = inverse_factor_times_two * inverse_factor;
    const factor2 = 3 * t * inverse_factor_times_two;
    const factor3 = 3 * factor_times_two * inverse_factor;
    const factor4 = factor_times_two * t;

    out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
    out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
    out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;

    return out;
}

// random
export function vec3_rand(out: vec3_t): vec3_t {
    out[0] = Math.random();
    out[1] = Math.random();
    out[2] = Math.random();

    return out;
}

export function vec3_rand1(): vec3_t {
    return vec3_rand(new TYPE(3));
}

export function vec3_rand_unit(scale: number, out: vec3_t): vec3_t {
    const r = Math.random() * 2.0 * Math.PI;
    const z = Math.random() * 2.0 - 1.0;
    const z_scale = Math.sqrt(1.0 - z * z) * scale;

    out[0] = Math.cos(r) * z_scale;
    out[1] = Math.sin(r) * z_scale;
    out[2] = z * scale;

    return out;
}

export function vec3_rand_unit1(scale: number, out: vec3_t): vec3_t {
    return vec3_rand_unit(scale, new TYPE(3));
}

// rounding
export function vec3_floor(v: vec3_t, out: vec3_t): vec3_t {
    out[0] = Math.floor(v[0]);
    out[1] = Math.floor(v[1]);
    out[2] = Math.floor(v[2]);

    return out;
}

export function vec3_floor1(v: vec3_t): vec3_t {
    return vec3_floor(v, new TYPE(3));
}

export function vec3_ceil(v: vec3_t, out: vec3_t): vec3_t {
    out[0] = Math.ceil(v[0]);
    out[1] = Math.ceil(v[1]);
    out[2] = Math.ceil(v[2]);

    return out;
}

export function vec3_ceil1(v: vec3_t): vec3_t {
    return vec3_ceil(v, new TYPE(3));
}

export function vec3_round(v: vec3_t, out: vec3_t): vec3_t {
    out[0] = Math.round(v[0]);
    out[1] = Math.round(v[1]);
    out[2] = Math.round(v[2]);

    return out;
}

export function vec3_round1(v: vec3_t): vec3_t {
    return vec3_round(v, new TYPE(3));
}

export function vec3_trunc(v: vec3_t, out: vec3_t): vec3_t {
    out[0] = Math.trunc(v[0]);
    out[1] = Math.trunc(v[1]);
    out[2] = Math.trunc(v[2]);

    return out;
}

export function vec3_trunc1(v: vec3_t): vec3_t {
    return vec3_trunc(v, new TYPE(3));
}

export function vec3_snap(v: vec3_t, g: vec3_t, out: vec3_t): vec3_t {
    out[0] = Math.round(v[0] / g[0]) * g[0];
    out[1] = Math.round(v[1] / g[1]) * g[1];
    out[2] = Math.round(v[2] / g[2]) * g[2];

    return out;
}

export function vec3_snap1(v: vec3_t, g: vec3_t): vec3_t {
    return vec3_snap(v, g, new TYPE(3));
}

// bounding
export function vec3_min(a: vec3_t, b: vec3_t, out: vec3_t): vec3_t {
    out[0] = Math.min(a[0], b[0]);
    out[1] = Math.min(a[1], b[1]);
    out[2] = Math.min(a[2], b[2]);

    return out;
}

export function vec3_min1(a: vec3_t, b: vec3_t): vec3_t {
    return vec3_min(a, b, new TYPE(3));
}

export function vec3_max(a: vec3_t, b: vec3_t, out: vec3_t): vec3_t {
    out[0] = Math.max(a[0], b[0]);
    out[1] = Math.max(a[1], b[1]);
    out[2] = Math.max(a[2], b[2]);

    return out;
}

export function vec3_max1(a: vec3_t, b: vec3_t): vec3_t {
    return vec3_max(a, b, new TYPE(3));
}

export function vec3_clamp(v: vec3_t, min: vec3_t, max: vec3_t, out: vec3_t): vec3_t {
    out[0] = Math.min(Math.max(v[0], min[0]), max[0]);
    out[1] = Math.min(Math.max(v[1], min[1]), max[1]);
    out[2] = Math.min(Math.max(v[2], min[2]), max[2]);

    return out;
}

export function vec3_clamp1(v: vec3_t, min: vec3_t, max: vec3_t): vec3_t {
    return vec3_clamp(v, min, max, new TYPE(3));
}

export function vec3_clamp2(v: vec3_t, min: vec3_t, max: vec3_t): vec3_t {
    return vec3_clamp(v, min, max, v);
}

export function vec3_wrap(v: vec3_t, min: vec3_t, max: vec3_t, out: vec3_t): vec3_t {
    const mn0 = min[0], mn1 = min[1], mn2 = min[2];
    const r0 = max[0] - mn0, r1 = max[1] - mn1, r2 = max[2] - mn2;

    out[0] = ((v[0] - mn0) % r0 + r0) % r0 + mn0;
    out[1] = ((v[1] - mn1) % r1 + r1) % r1 + mn1;
    out[2] = ((v[2] - mn2) % r2 + r2) % r2 + mn2;

    return out;
}

export function vec3_wrap1(v: vec3_t, min: vec3_t, max: vec3_t): vec3_t {
    return vec3_wrap(v, min, max, new TYPE(3));
}

export function vec3_wrap2(v: vec3_t, min: vec3_t, max: vec3_t): vec3_t {
    return vec3_wrap(v, min, max, v);
}

// comparison
export function vec3_equals_exact(a: vec3_t, b: vec3_t): boolean {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
}

export function vec3_equals(a: vec3_t, b: vec3_t, e: number = EPSILON): boolean {
    const a0 = a[0], a1 = a[1], a2 = a[2];
    const b0 = b[0], b1 = b[1], b2 = b[2];

    return (
        Math.abs(a0 - b0) <= e * Math.max(1.0, Math.abs(a0), Math.abs(b0)) &&
        Math.abs(a1 - b1) <= e * Math.max(1.0, Math.abs(a1), Math.abs(b1)) &&
        Math.abs(a2 - b2) <= e * Math.max(1.0, Math.abs(a2), Math.abs(b2))
    );
}

// string
export function vec3_str(v: vec3_t): string {
    return `vec3(${v[0]}, ${v[1]}, ${v[2]})`;
}

export function vec3_print(v: vec3_t): void {
    console.log(vec3_str(v));
}
