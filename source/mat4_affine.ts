import {num_t, vec3_t, mat4_t, TYPE} from "./type.ts";

export function cl_mat4_translation(v: vec3_t): mat4_t {
    const out = new TYPE(16);

    out[0] = 1.0;
    out[1] = 0.0;
    out[2] = 0.0;
    out[3] = 0.0;
    out[4] = 0.0;
    out[5] = 1.0;
    out[6] = 0.0;
    out[7] = 0.0;
    out[8] = 0.0;
    out[9] = 0.0;
    out[10] = 1.0;
    out[11] = 0.0;
    out[12] = v[0];
    out[13] = v[1];
    out[14] = v[2];
    out[15] = 1.0;

    return out;
}

export function cl_mat4_scaling(v: vec3_t): mat4_t {
    const out = new TYPE(16);

    out[0] = v[0];
    out[1] = 0.0;
    out[2] = 0.0;
    out[3] = 0.0;
    out[4] = 0.0;
    out[5] = v[1];
    out[6] = 0.0;
    out[7] = 0.0;
    out[8] = 0.0;
    out[9] = 0.0;
    out[10] = v[2];
    out[11] = 0.0;
    out[12] = 0.0;
    out[13] = 0.0;
    out[14] = 0.0;
    out[15] = 1.0;

    return out;
}

export function cl_mat4_rotation_x(rad: num_t): mat4_t {
    const out = new TYPE(16);
    const s = Math.sin(rad);
    const c = Math.cos(rad);

    out[0] = 1.0;
    out[1] = 0.0;
    out[2] = 0.0;
    out[3] = 0.0;
    out[4] = 0.0;
    out[5] = c;
    out[6] = s;
    out[7] = 0.0;
    out[8] = 0.0;
    out[9] = -s;
    out[10] = c;
    out[11] = 0.0;
    out[12] = 0.0;
    out[13] = 0.0;
    out[14] = 0.0;
    out[15] = 1.0;

    return out;
}

export function cl_mat4_rotation_y(rad: num_t): mat4_t {
    const out = new TYPE(16);
    const s = Math.sin(rad);
    const c = Math.cos(rad);

    out[0] = c;
    out[1] = 0.0;
    out[2] = -s;
    out[3] = 0.0;
    out[4] = 0.0;
    out[5] = 1.0;
    out[6] = 0.0;
    out[7] = 0.0;
    out[8] = s;
    out[9] = 0.0;
    out[10] = c;
    out[11] = 0.0;
    out[12] = 0.0;
    out[13] = 0.0;
    out[14] = 0.0;
    out[15] = 1.0;

    return out;
}

export function cl_mat4_rotation_z(rad: num_t): mat4_t {
    const out = new TYPE(16);
    const s = Math.sin(rad);
    const c = Math.cos(rad);

    out[0] = c;
    out[1] = s;
    out[2] = 0.0;
    out[3] = 0.0;
    out[4] = -s;
    out[5] = c;
    out[6] = 0.0;
    out[7] = 0.0;
    out[8] = 0.0;
    out[9] = 0.0;
    out[10] = 1.0;
    out[11] = 0.0;
    out[12] = 0.0;
    out[13] = 0.0;
    out[14] = 0.0;
    out[15] = 1.0;

    return out;
}
