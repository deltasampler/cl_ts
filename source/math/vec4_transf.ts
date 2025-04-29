import {vec4_t, TYPE} from "./vec4.ts";
import {mat4_t} from "./mat4.ts";

export function vec4_transf_mat4(out: vec4_t, v: vec4_t, m: mat4_t): void {
    const x = v[0], y = v[1], z = v[2], w = v[3];

    out[0] = m[0] * x + m[4] * y + m[8] * z + m[12] * w;
    out[1] = m[1] * x + m[5] * y + m[9] * z + m[13] * w;
    out[2] = m[2] * x + m[6] * y + m[10] * z + m[14] * w;
    out[3] = m[3] * x + m[7] * y + m[11] * z + m[15] * w;
}

export function vec4n_transf_mat4(v: vec4_t, m: mat4_t): vec4_t {
    const out = new TYPE(4);

    vec4_transf_mat4(out, v, m);

    return out;
}

export function vec4m_transf_mat4(out: vec4_t, m: mat4_t): void {
    vec4_transf_mat4(out, out, m);
}
