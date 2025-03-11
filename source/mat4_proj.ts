import {mat4_t} from "./type.ts";

export function mat4_perspective(fov: number, aspect: number, near: number, far: number, out: mat4_t): mat4_t {
    const f = 1.0 / Math.tan(fov / 2.0);

    out[0] = f / aspect;
    out[1] = 0.0;
    out[2] = 0.0;
    out[3] = 0.0;
    out[4] = 0.0;
    out[5] = f;
    out[6] = 0.0;
    out[7] = 0.0;
    out[8] = 0.0;
    out[9] = 0.0;
    out[11] = -1.0;
    out[12] = 0.0;
    out[13] = 0.0;
    out[15] = 0.0;

    if (far != null && far !== Infinity) {
        const nf = 1.0 / (near - far);

        out[10] = (far + near) * nf;
        out[14] = 2.0 * far * near * nf;
    } else {
        out[10] = -1.0;
        out[14] = -2.0 * near;
    }

    return out;
}
