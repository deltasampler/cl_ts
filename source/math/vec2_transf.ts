import {vec2_t, TYPE} from "./vec2.ts";
import {mat2_t} from "./mat2.ts";
import {mat2x3_t} from "./mat2x3.ts";
import {mat3_t} from "./mat3.ts";
import {mat4_t} from "./mat4.ts";

export function vec2_transf_mat2(out: vec2_t, v: vec2_t, m: mat2_t): void {
    const x = v[0], y = v[1];

    out[0] = m[0] * x + m[2] * y;
    out[1] = m[1] * x + m[3] * y;
}

export function vec2n_transf_mat2(v: vec2_t, m: mat2_t): vec2_t {
    const out = new TYPE(2);

    vec2_transf_mat2(out, v, m);

    return out;
}

export function vec2m_transf_mat2(out: vec2_t, m: mat2_t): void {
    vec2_transf_mat2(out, out, m);
}

export function vec2_transf_2x3(out : vec2_t, v: vec2_t, m: mat2x3_t): void {
    const x = v[0], y = v[1];

    out[0] = m[0] * x + m[2] * y + m[4];
    out[1] = m[1] * x + m[3] * y + m[5];
}

export function vec2n_transf_2x3(v: vec2_t, m: mat2x3_t): vec2_t {
    const out = new TYPE(2);

    vec2_transf_2x3(out, v, m);

    return out;
}

export function vec2m_transf_2x3(out: vec2_t, m: mat2x3_t): void {
    vec2_transf_2x3(out, out, m);
}

export function vec2_transf_mat3(out: vec2_t, v: vec2_t, m: mat3_t): void {
    const x = v[0], y = v[1];

    out[0] = m[0] * x + m[3] * y + m[6];
    out[1] = m[1] * x + m[4] * y + m[7];
}

export function vec2n_transf_mat3(v: vec2_t, m: mat3_t): vec2_t {
    const out = new TYPE(2);

    vec2_transf_mat3(out, v, m);

    return out;
}

export function vec2m_transf_mat3(out: vec2_t, m: mat3_t): void {
    vec2_transf_mat3(out, out, m);
}

export function vec2_transf_mat4(out: vec2_t, v: vec2_t, m: mat4_t): void {
    const x = v[0], y = v[1];

    out[0] = m[0] * x + m[4] * y + m[12];
    out[1] = m[1] * x + m[5] * y + m[13];
}

export function vec2n_transf_mat4(v: vec2_t, m: mat4_t): vec2_t {
    const out = new TYPE(2);

    vec2_transf_mat4(out, v, m);

    return out;
}

export function vec2m_transf_mat4(out: vec2_t, m: mat4_t): void {
    vec2_transf_mat4(out, out, m);
}
