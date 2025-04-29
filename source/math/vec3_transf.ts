import {vec3_t, TYPE} from "./vec3.ts";
import {mat3_t} from "./mat3.ts";
import {mat4_t} from "./mat4.ts";

export function vec3_transf_mat3(out: vec3_t, v: vec3_t, m: mat3_t): void {
    const x = v[0], y = v[1], z = v[2];

    out[0] = x * m[0] + y * m[3] + z * m[6];
    out[1] = x * m[1] + y * m[4] + z * m[7];
    out[2] = x * m[2] + y * m[5] + z * m[8];
}

export function vec3n_transf_mat3(v: vec3_t, m: mat3_t): vec3_t {
    const out = new TYPE(3);

    vec3_transf_mat3(out, v, m);

    return out;
}

export function vec3m_transf_mat3(out: vec3_t, m: mat3_t): void {
    vec3_transf_mat3(out, out, m);
}

export function vec3_transf_mat4(out: vec3_t, v: vec3_t, m: mat4_t): void {
    const x = v[0], y = v[1], z = v[2];
    const w = (m[3] * x + m[7] * y + m[11] * z + m[15]) || 1.0;

    out[0] = (m[0] * x + m[4] * y + m[8] * z + m[12]) / w;
    out[1] = (m[1] * x + m[5] * y + m[9] * z + m[13]) / w;
    out[2] = (m[2] * x + m[6] * y + m[10] * z + m[14]) / w;
}

export function vec3n_transf_mat4(v: vec3_t, m: mat4_t): vec3_t {
    const out = new TYPE(3);

    vec3_transf_mat4(out, v, m);

    return out;
}

export function vec3m_transf_mat4(out: vec3_t, m: mat4_t): void {
    vec3_transf_mat4(out, out, m);
}
