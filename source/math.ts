export const PI = Math.PI;

export const EPSILON = 0.000001;

export const abs = Math.abs;

export const sign = Math.sign;

export function fract(x: number): number {
    return x - Math.floor(x);
}

export function mod(x: number, y: number): number {
    return x - y * Math.floor(x / y);
}

export const pow = Math.pow;

export const sqrt = Math.sqrt;

export function invsqrt(x: number): number {
    return 1.0 / Math.sqrt(x);
}

export const hypot = Math.hypot;

export const cbrt = Math.cbrt;

export const exp = Math.exp;

export function exp2(x: number) {
    return Math.pow(2, x);
}

export const log = Math.log;

export const log2 = Math.log2;

export const log10 = Math.log10;

export function rad(deg: number): number {
    return deg * Math.PI / 180.0;
}

export function deg(rad: number): number {
    return rad * 180.0 / Math.PI;
}

export const sin = Math.sin;

export const cos = Math.cos;

export const tan = Math.tan;

export const asin = Math.asin;

export const acos = Math.acos;

export const atan = Math.atan;

export const atan2 = Math.atan2;

export const sinh = Math.sinh;

export const cosh = Math.cosh;

export const tanh = Math.tanh;

export const asinh = Math.asinh;

export const acosh = Math.acosh;

export const atanh = Math.atanh;

export const floor = Math.floor;

export const ceil = Math.ceil;

export const round = Math.round;

export function round2(x: number, precision: number) {
    const factor = Math.pow(10.0, precision);

    return Math.round(x * factor) / factor;
}

export const trunc = Math.trunc;

export const min = Math.min;

export const max = Math.max;

export function clamp(x: number, min: number, max: number): number {
    return Math.min(Math.max(x, min), max);
}

export function lerp(x: number, y: number, t: number): number {
    return x + t * (y - x);
}

export function lerp2(x: number, y: number, t: number): number {
    return x * (1.0 - t) + y * t;
}

export function step(e: number, x: number): number {
    if (x < e) {
        return 0.0;
    }

    return 1.0;
}

export function smoothstep(e0: number, e1: number, x: number): number {
    if (x <= e0) {
        return 0.0;
    }

    if (x >= e1) {
        return 1.0;
    }

    const t = (x - e0) / (e1 - e0);

    return t * t * (3.0 - 2.0 * t);
}

export function wrap(x: number, max: number): number {
    return (x + max) % max;
}

export function wrap2(x: number, min: number, max: number): number {
    const r = max - min;

    return ((x - min) % r + r) % r + min;
}

export const rand = Math.random;

export function rand_ex(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
}

export function rand_in(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export function index2(x: number, y: number, width: number): number {
    return y * width + x;
}

export function deg90even(d: number): boolean {
    return (d / 90.0) % 2 === 0;
}

export function deg90odd(d: number): boolean {
    return (d / 90.0) % 2 === 1;
}

export function rad90even(r: number): boolean {
    return deg90even(deg(r));
}

export function rad90odd(r: number): boolean {
    return deg90odd(deg(r));
}
