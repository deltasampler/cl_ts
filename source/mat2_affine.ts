import {TYPE, mat2_t, vec2_t} from "./type.ts";

export function mat2_rotation(r: number, out: mat2_t): mat2_t {
    const s = Math.sin(r);
    const c = Math.cos(r);

    out[0] = c;
    out[1] = s;
    out[2] = -s;
    out[3] = c;

    return out;
}

export function mat2_scaling(v: vec2_t, out: mat2_t): mat2_t {
    out[0] = v[0];
    out[1] = 0;
    out[2] = 0;
    out[3] = v[1];

    return out;
}

export function mat2_rotate(m: mat2_t, r: number, out: mat2_t): mat2_t {
    const a0 = m[0],
        a1 = m[1],
        a2 = m[2],
        a3 = m[3];
    const s = Math.sin(r);
    const c = Math.cos(r);

    out[0] = a0 * c + a2 * s;
    out[1] = a1 * c + a3 * s;
    out[2] = a0 * -s + a2 * c;
    out[3] = a1 * -s + a3 * c;

    return out;
}

export function mat2_scale(m: mat2_t, v: vec2_t, out: mat2_t): mat2_t {
    const a0 = m[0],
          a1 = m[1],
          a2 = m[2],
          a3 = m[3];
    const v0 = v[0],
          v1 = v[1];

    out[0] = a0 * v0;
    out[1] = a1 * v0;
    out[2] = a2 * v1;
    out[3] = a3 * v1;

    return out;
}
