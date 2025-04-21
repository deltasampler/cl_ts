import {EPSILON} from "./math.ts";
import {mat4_t} from "./mat4.ts";
import {vec3_t} from "./vec3.ts";

const TYPE = Float32Array;
export type vec4_t = Float32Array;

// creation
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

export function vec4_v3w(v3: vec3_t, w: number): vec4_t {
    const out = new TYPE(4);

    out[0] = v3[0];
    out[1] = v3[1];
    out[2] = v3[2];
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

export function vec4_bitpack256(r: number, g: number, b: number, a: number): number {
    return (((r & 0xFF) << 24) | ((g & 0xFF) << 16) | ((b & 0xFF) << 8) | (a & 0xFF)) >>> 0;
}

export function vec4_bitpack256v(v: vec4_t): number {
    return (((v[0] & 0xFF) << 24) | ((v[1] & 0xFF) << 16) | ((v[2] & 0xFF) << 8) | (v[3] & 0xFF)) >>> 0;
}

export function vec4_bitunpack256(p: number): vec4_t {
    const out = new TYPE(4);

    out[0] = (p >> 24) & 0xFF,
    out[1] = (p >> 16) & 0xFF,
    out[2] = (p >> 8) & 0xFF,
    out[3] = p & 0xFF

    return out;
}

export function vec4_pack256(r: number, g: number, b: number, a: number): number {
    return r + g * 256 + b * 65536 + a * 16777216;
}

export function vec4_pack256v(v: vec4_t): number {
    return v[0] + v[1] * 256 + v[2] * 65536 + v[3] * 16777216;
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
export function vec4_add(out: vec4_t, a: vec4_t, b: vec4_t): vec4_t {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    out[3] = a[3] + b[3];

    return out;
}

export function vec4_add1(a: vec4_t, b: vec4_t): vec4_t {
    const out = new TYPE(4);

    vec4_add(out, a, b);

    return out;
}

export function vec4_add2(a: vec4_t, b: vec4_t): vec4_t {
    return vec4_add(a, a, b);
}

export function vec4_sub(out: vec4_t, a: vec4_t, b: vec4_t): vec4_t {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    out[3] = a[3] - b[3];

    return out;
}

export function vec4_sub1(a: vec4_t, b: vec4_t): vec4_t {
    const out = new TYPE(4);

    vec4_sub(out, a, b);

    return out;
}

export function vec4_sub2(a: vec4_t, b: vec4_t): vec4_t {
    return vec4_sub(a, a, b);
}

export function vec4_mul(out: vec4_t, a: vec4_t, b: vec4_t): vec4_t {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    out[2] = a[2] * b[2];
    out[3] = a[3] * b[3];

    return out;
}

export function vec4_mul1(a: vec4_t, b: vec4_t): vec4_t {
    const out = new TYPE(4);

    vec4_mul(out, a, b);

    return out;
}

export function vec4_mul2(a: vec4_t, b: vec4_t): vec4_t {
    return vec4_mul(a, a, b);
}

export function vec4_div(out: vec4_t, a: vec4_t, b: vec4_t): vec4_t {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    out[2] = a[2] / b[2];
    out[3] = a[3] / b[3];

    return out;
}

export function vec4_div1(a: vec4_t, b: vec4_t): vec4_t {
    const out = new TYPE(4);

    vec4_div(out, a, b);

    return out;
}

export function vec4_div2(a: vec4_t, b: vec4_t): vec4_t {
    return vec4_div(a, a, b);
}

// arithmetic vector x scalar
export function vec4_adds(out: vec4_t, v: vec4_t, s: number): vec4_t {
    out[0] = v[0] + s;
    out[1] = v[1] + s;
    out[2] = v[2] + s;
    out[3] = v[3] + s;

    return out;
}

export function vec4_adds1(v: vec4_t, s: number): vec4_t {
    const out = new TYPE(4);

    vec4_adds(out, v, s);

    return out;
}

export function vec4_adds2(v: vec4_t, s: number): vec4_t {
    return vec4_adds(v, v, s);
}

export function vec4_subs(out: vec4_t, v: vec4_t, s: number): vec4_t {
    out[0] = v[0] - s;
    out[1] = v[1] - s;
    out[2] = v[2] - s;
    out[3] = v[3] - s;

    return out;
}

export function vec4_subs1(v: vec4_t, s: number): vec4_t {
    const out = new TYPE(4);

    vec4_subs(out, v, s);

    return out;
}

export function vec4_subs2(v: vec4_t, s: number): vec4_t {
    return vec4_subs(v, v, s);
}

export function vec4_muls(out: vec4_t, v: vec4_t, s: number): vec4_t {
    out[0] = v[0] * s;
    out[1] = v[1] * s;
    out[2] = v[2] * s;
    out[3] = v[3] * s;

    return out;
}

export function vec4_muls1(v: vec4_t, s: number): vec4_t {
    const out = new TYPE(4);

    vec4_muls(out, v, s);

    return out;
}

export function vec4_muls2(v: vec4_t, s: number): vec4_t {
    return vec4_muls(v, v, s);
}

export function vec4_divs(out: vec4_t, v: vec4_t, s: number): vec4_t {
    out[0] = v[0] / s;
    out[1] = v[1] / s;
    out[2] = v[2] / s;
    out[3] = v[3] / s;

    return out;
}

export function vec4_divs1(v: vec4_t, s: number): vec4_t {
    const out = new TYPE(4);

    vec4_divs(out, v, s);

    return out;
}

export function vec4_divs2(v: vec4_t, s: number): vec4_t {
    return vec4_divs(v, v, s);
}

// arithmetic vector x vector x scalar
export function vec4_addmuls(out: vec4_t, a: vec4_t, b: vec4_t, s: number): vec4_t {
    out[0] = a[0] + b[0] * s;
    out[1] = a[1] + b[1] * s;
    out[2] = a[2] + b[2] * s;
    out[3] = a[3] + b[3] * s;

    return out;
}

export function vec4_addmuls1(a: vec4_t, b: vec4_t, s: number): vec4_t {
    const out = new TYPE(4);

    vec4_addmuls(out, a, b, s);

    return out;
}

export function vec4_addmuls2(a: vec4_t, b: vec4_t, s: number): vec4_t {
    return vec4_addmuls(a, a, b, s);
}

// product
export function vec4_dot(a: vec4_t, b: vec4_t): number {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
}

export function vec4_cross(out: vec4_t, a: vec4_t, b: vec4_t, c: vec4_t): vec4_t {
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

export function vec4_cross1(a: vec4_t, b: vec4_t, c: vec4_t): vec4_t {
    const out = new TYPE(4);

    vec4_cross(out, a, b, c);

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

export function vec4_unit(out: vec4_t, v: vec4_t): vec4_t {
    const x = v[0], y = v[1], z = v[2], w = v[3];
    let l = x * x + y * y + z * z + w * w;

    if (l > 0.0) {
        l = 1.0 / Math.sqrt(l);
    }

    out[0] = x * l;
    out[1] = y * l;
    out[2] = z * l;
    out[3] = w * l;

    return out;
}

export function vec4_unit1(v: vec4_t): vec4_t {
    const out = new TYPE(4);

    vec4_unit(out, v);

    return out;
}

export function vec4_unit2(v: vec4_t): vec4_t {
    return vec4_unit(v, v);
}

export function vec4_dir(out: vec4_t, a: vec3_t, b: vec4_t): vec4_t {
    const x = a[0] - b[0], y = a[1] - b[1], z = a[2] - b[2], w = a[3] - b[3];
    let l = x * x + y * y + z * z + w * w;

    if (l > 0.0) {
        l = 1.0 / Math.sqrt(l);
    }

    out[0] = x * l;
    out[1] = y * l;
    out[2] = z * l;
    out[3] = w * l;

    return out;
}

export function vec4_dir1(a: vec3_t, b: vec4_t): vec4_t {
    const out = new TYPE(4);

    vec4_dir(out, a, b);

    return out;
}

// transform
export function vec4_transf_mat4(out: vec4_t, v: vec4_t, m: mat4_t): vec4_t {
    const x = v[0], y = v[1], z = v[2], w = v[3];

    out[0] = m[0] * x + m[4] * y + m[8] * z + m[12] * w;
    out[1] = m[1] * x + m[5] * y + m[9] * z + m[13] * w;
    out[2] = m[2] * x + m[6] * y + m[10] * z + m[14] * w;
    out[3] = m[3] * x + m[7] * y + m[11] * z + m[15] * w;

    return out;
}

export function vec4_transf_mat4_1(v: vec4_t, m: mat4_t): vec4_t {
    const out = new TYPE(4);

    vec4_transf_mat4(out, v, m);

    return out;
}

export function vec4_transf_mat4_2(v: vec4_t, m: mat4_t): vec4_t {
    return vec4_transf_mat4(v, v, m);
}

// interpolation
export function vec4_lerp(out: vec4_t, a: vec4_t, b: vec4_t, t: number): vec4_t {
    const x = a[0], y = a[1], z = a[2], w = a[3];

    out[0] = x + t * (b[0] - x);
    out[1] = y + t * (b[1] - y);
    out[2] = z + t * (b[2] - z);
    out[3] = w + t * (b[3] - w);

    return out;
}

export function vec4_lerp1(a: vec4_t, b: vec4_t, t: number): vec4_t {
    const out = new TYPE(4);

    vec4_lerp(out, a, b, t);

    return out;
}

export function vec4_lerp2(a: vec4_t, b: vec4_t, t: number): vec4_t {
    return vec4_lerp(a, a, b, t);
}

// random
export function vec4_rand(out: vec4_t): vec4_t {
    out[0] = Math.random();
    out[1] = Math.random();
    out[2] = Math.random();
    out[2] = Math.random();

    return out;
}

export function vec4_rand1(): vec4_t {
    const out = new TYPE(4);

    vec4_rand(out);

    return out;
}

export function vec4_rand_unit(out: vec4_t, scale: number): vec4_t {
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

export function vec4_rand_unit1(scale: number): vec4_t {
    const out = new TYPE(4);

    vec4_rand_unit(out, scale);

    return out;
}

// rounding
export function vec4_floor(out: vec4_t, v: vec4_t): vec4_t {
    out[0] = Math.floor(v[0]);
    out[1] = Math.floor(v[1]);
    out[2] = Math.floor(v[2]);
    out[3] = Math.floor(v[3]);

    return out;
}

export function vec4_floor1(v: vec4_t): vec4_t {
    const out = new TYPE(4);

    vec4_floor(out, v);

    return out;
}

export function vec4_ceil(out: vec4_t, v: vec4_t): vec4_t {
    out[0] = Math.ceil(v[0]);
    out[1] = Math.ceil(v[1]);
    out[2] = Math.ceil(v[2]);
    out[3] = Math.ceil(v[3]);

    return out;
}

export function vec4_ceil1(v: vec4_t): vec4_t {
    const out = new TYPE(4);

    vec4_ceil(out, v);

    return out;
}

export function vec4_round(out: vec4_t, v: vec4_t): vec4_t {
    out[0] = Math.round(v[0]);
    out[1] = Math.round(v[1]);
    out[2] = Math.round(v[2]);
    out[3] = Math.round(v[3]);

    return out;
}

export function vec4_round1(v: vec4_t): vec4_t {
    const out = new TYPE(4);

    vec4_round(out, v);

    return out;
}

export function vec4_trunc(out: vec4_t, v: vec4_t): vec4_t {
    out[0] = Math.trunc(v[0]);
    out[1] = Math.trunc(v[1]);
    out[2] = Math.trunc(v[2]);
    out[3] = Math.trunc(v[3]);

    return out;
}

export function vec4_trunc1(v: vec4_t): vec4_t {
    const out = new TYPE(4);

    vec4_trunc(out, v);

    return out;
}

export function vec4_snap(out: vec4_t, v: vec4_t, g: vec4_t): vec4_t {
    out[0] = Math.round(v[0] / g[0]) * g[0];
    out[1] = Math.round(v[1] / g[1]) * g[1];
    out[2] = Math.round(v[2] / g[2]) * g[2];
    out[3] = Math.round(v[3] / g[3]) * g[3];

    return out;
}

export function vec4_snap1(v: vec4_t, g: vec4_t): vec4_t {
    const out = new TYPE(4);

    vec4_snap(out, v, g);

    return out;
}

// bounding
export function vec4_min(out: vec4_t, a: vec4_t, b: vec4_t): vec4_t {
    out[0] = Math.min(a[0], b[0]);
    out[1] = Math.min(a[1], b[1]);
    out[2] = Math.min(a[2], b[2]);
    out[3] = Math.min(a[3], b[3]);

    return out;
}

export function vec4_min1(a: vec4_t, b: vec4_t): vec4_t {
    const out = new TYPE(4);

    vec4_min(out, a, b);

    return out;
}

export function vec4_max(out: vec4_t, a: vec4_t, b: vec4_t): vec4_t {
    out[0] = Math.max(a[0], b[0]);
    out[1] = Math.max(a[1], b[1]);
    out[2] = Math.max(a[2], b[2]);
    out[3] = Math.max(a[3], b[3]);

    return out;
}

export function vec4_max1(a: vec4_t, b: vec4_t): vec4_t {
    const out = new TYPE(4);

    vec4_max(out, a, b);

    return out;
}

export function vec4_clamp(out: vec4_t, v: vec4_t, min: vec4_t, max: vec4_t): vec4_t {
    out[0] = Math.min(Math.max(v[0], min[0]), max[0]);
    out[1] = Math.min(Math.max(v[1], min[1]), max[1]);
    out[2] = Math.min(Math.max(v[2], min[2]), max[2]);
    out[3] = Math.min(Math.max(v[3], min[3]), max[3]);

    return out;
}

export function vec4_clamp1(v: vec4_t, min: vec4_t, max: vec4_t): vec4_t {
    const out = new TYPE(4);

    vec4_clamp(out, v, min, max);

    return out;
}

export function vec4_clamp2(v: vec4_t, min: vec4_t, max: vec4_t): vec4_t {
    return vec4_clamp(v, v, min, max);
}

export function vec4_wrap(out: vec4_t, v: vec4_t, min: vec4_t, max: vec4_t): vec4_t {
    const mn0 = min[0], mn1 = min[1], mn2 = min[2], mn3 = min[3];
    const r0 = max[0] - mn0, r1 = max[1] - mn1, r2 = max[2] - mn2, r3 = max[3] - mn3;

    out[0] = ((v[0] - mn0) % r0 + r0) % r0 + mn0;
    out[1] = ((v[1] - mn1) % r1 + r1) % r1 + mn1;
    out[2] = ((v[2] - mn2) % r2 + r2) % r2 + mn2;
    out[3] = ((v[3] - mn3) % r3 + r3) % r3 + mn3;

    return out;
}
export function vec4_wrap1(v: vec4_t, min: vec4_t, max: vec4_t): vec4_t {
    const out = new TYPE(4);

    vec4_wrap(out, v, min, max);

    return out;
}

export function vec4_wrap2(v: vec4_t, min: vec4_t, max: vec4_t): vec4_t {
    return vec4_wrap(v, v, min, max);
}

// comparison
export function vec4_equals_exact(a: vec4_t, b: vec4_t): boolean {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
}

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

// string
export function vec4_str(v: vec4_t): string {
    return `vec4(${v[0]}, ${v[1]}, ${v[2]}, ${v[3]})`;
}

export function vec4_print(v: vec4_t): void {
    console.log(vec4_str(v));
}
