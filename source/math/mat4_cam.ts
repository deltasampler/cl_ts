import {mat4_t, mat4_ident} from "./mat4.ts";
import {EPSILON} from "./math.ts";
import {vec3_t} from "./vec3.ts";
import { TYPE } from "./vec4.ts";

export function mat4_look_at(out: mat4_t, eye: vec3_t, center: vec3_t, up: vec3_t): void {
    let x0, x1, x2, y0, y1, y2, z0, z1, z2, len;
    const eyex = eye[0];
    const eyey = eye[1];
    const eyez = eye[2];
    const upx = up[0];
    const upy = up[1];
    const upz = up[2];
    const centerx = center[0];
    const centery = center[1];
    const centerz = center[2];

    if (
        Math.abs(eyex - centerx) < EPSILON &&
        Math.abs(eyey - centery) < EPSILON &&
        Math.abs(eyez - centerz) < EPSILON
    ) {
        mat4_ident(out);

        return;
    }

    z0 = eyex - centerx;
    z1 = eyey - centery;
    z2 = eyez - centerz;
    len = 1.0 / Math.hypot(z0, z1, z2);
    z0 *= len;
    z1 *= len;
    z2 *= len;
    x0 = upy * z2 - upz * z1;
    x1 = upz * z0 - upx * z2;
    x2 = upx * z1 - upy * z0;
    len = Math.hypot(x0, x1, x2);

    if (!len) {
        x0 = 0.0;
        x1 = 0.0;
        x2 = 0.0;
    } else {
        len = 1.0 / len;
        x0 *= len;
        x1 *= len;
        x2 *= len;
    }

    y0 = z1 * x2 - z2 * x1;
    y1 = z2 * x0 - z0 * x2;
    y2 = z0 * x1 - z1 * x0;
    len = Math.hypot(y0, y1, y2);

    if (!len) {
        y0 = 0.0;
        y1 = 0.0;
        y2 = 0.0;
    } else {
        len = 1.0 / len;
        y0 *= len;
        y1 *= len;
        y2 *= len;
    }

    out[0] = x0;
    out[1] = y0;
    out[2] = z0;
    out[3] = 0.0;
    out[4] = x1;
    out[5] = y1;
    out[6] = z1;
    out[7] = 0.0;
    out[8] = x2;
    out[9] = y2;
    out[10] = z2;
    out[11] = 0.0;
    out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
    out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
    out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
    out[15] = 1.0;
}

export function mat4n_look_at(eye: vec3_t, center: vec3_t, up: vec3_t): mat4_t {
    const out = new TYPE(16);

    mat4_look_at(out, eye, center, up);

    return out;
}

export function mat4_target_to(out: mat4_t, eye: vec3_t, target: vec3_t, up: vec3_t): void{
    const eyex = eye[0], eyey = eye[1], eyez = eye[2];
    const upx = up[0], upy = up[1], upz = up[2];

    let z0 = eyex - target[0],
        z1 = eyey - target[1],
        z2 = eyez - target[2];

    let len = z0 * z0 + z1 * z1 + z2 * z2;

    if (len > 0.0) {
        len = 1.0 / Math.sqrt(len);
        z0 *= len;
        z1 *= len;
        z2 *= len;
    }
  
    let x0 = upy * z2 - upz * z1,
          x1 = upz * z0 - upx * z2,
          x2 = upx * z1 - upy * z0;

    len = x0 * x0 + x1 * x1 + x2 * x2;

    if (len > 0.0) {
        len = 1.0 / Math.sqrt(len);
        x0 *= len;
        x1 *= len;
        x2 *= len;
    }

    out[0] = x0;
    out[1] = x1;
    out[2] = x2;
    out[3] = 0.0;
    out[4] = z1 * x2 - z2 * x1;
    out[5] = z2 * x0 - z0 * x2;
    out[6] = z0 * x1 - z1 * x0;
    out[7] = 0.0;
    out[8] = z0;
    out[9] = z1;
    out[10] = z2;
    out[11] = 0.0;
    out[12] = eyex;
    out[13] = eyey;
    out[14] = eyez;
    out[15] = 1.0;
}

export function mat4n_target_to(eye: vec3_t, target: vec3_t, up: vec3_t): mat4_t {
    const out = new TYPE(16);

    mat4_target_to(out, eye, target, up);

    return out;
}
