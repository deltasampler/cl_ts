export const PI = Math.PI;

export const EPSILON = 0.000001;

export const cl_abs = Math.abs;

export const cl_sign = Math.sign;

export function cl_fract(x: number): number {
    return x - Math.floor(x);
}

export function cl_mod(x: number, y: number): number {
    return x - y * Math.floor(x / y);
}

export const cl_pow = Math.pow;

export const cl_sqrt = Math.sqrt;

export function cl_invsqrt(x: number): number {
    return 1.0 / Math.sqrt(x);
}

export const cl_hypot = Math.hypot;

export const cl_cbrt = Math.cbrt;

export const cl_exp = Math.exp;

export function cl_exp2(x: number) {
    return Math.pow(2, x);
}

export const cl_log = Math.log;

export const cl_log2 = Math.log2;

export const cl_log10 = Math.log10;

export function cl_rad(deg: number): number {
    return deg * Math.PI / 180.0;
}

export function cl_deg(rad: number): number {
    return rad * 180.0 / Math.PI;
}

export const cl_sin = Math.sin;

export const cl_cos = Math.cos;

export const cl_tan = Math.tan;

export const cl_asin = Math.asin;

export const cl_acos = Math.acos;

export const cl_atan = Math.atan;

export const cl_atan2 = Math.atan2;

export const cl_sinh = Math.sinh;

export const cl_cosh = Math.cosh;

export const cl_tanh = Math.tanh;

export const cl_asinh = Math.asinh;

export const cl_acosh = Math.acosh;

export const cl_atanh = Math.atanh;

export const cl_floor = Math.floor;

export const cl_ceil = Math.ceil;

export const cl_round = Math.round;

export const cl_trunc = Math.trunc;

export const cl_min = Math.min;

export const cl_max = Math.max;

export function cl_clamp(x: number, min: number, max: number): number {
    return Math.min(Math.max(x, min), max);
}

export function cl_lerp(x: number, y: number, t: number): number {
    return x + t * (y - x);
}

export function cl_lerp2(x: number, y: number, t: number): number {
    return x * (1.0 - t) + y * t;
}

export function cl_step(e: number, x: number): number {
    if (x < e) {
        return 0.0;
    }

    return 1.0;
}

export function cl_smoothstep(e0: number, e1: number, x: number): number {
    if (x <= e0) {
        return 0.0;
    }

    if (x >= e1) {
        return 1.0;
    }

    const t = (x - e0) / (e1 - e0);

    return t * t * (3.0 - 2.0 * t);
}

export function cl_loop(x: number, max: number): number {
    return (x + max) % max;
}

export function cl_loop2(x: number, min: number, max: number): number {
    const r = max - min;

    return ((x - min) % r + r) % r + min;
}

export function cl_rand_ex(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
}

export function cl_rand_in(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export function cl_index2(x: number, y: number, width: number): number {
    return y * width + x;
}
