import {vec3_t, mat4_t} from "./type.ts";
import {cl_clamp, cl_cos, cl_rad, cl_sin} from "./math.ts";
import {cl_vec3, cl_vec3_add, cl_vec3_add_mul_s2, cl_vec3_cross, cl_vec3_unit2} from "./vec3.ts";
import {cl_mat4} from "./mat4.ts";
import {cl_mat4_perspective} from "./mat4_proj.ts";
import {cl_mat4_look_at} from "./mat4_cam.ts";

export class cam3_t {
    position: vec3_t;
    forward: vec3_t;
    right: vec3_t;
    up: vec3_t;
    world_up: vec3_t;
    projection: vec3_t;
    view: mat4_t;
    near: number;
    far: number;
    fov: number;
    yaw: number;
    pitch: number;
    roll: number;
    movement_speed: number;
    yaw_speed: number;
    pitch_speed: number;
    roll_speed: number;
};

export function cl_cam3_new() {
    const cam = new cam3_t();

    cam.position = cl_vec3();
    cam.forward = cl_vec3(0.0, 0.0, -1.0);
    cam.right = cl_vec3(1.0, 0.0, 0.0);
    cam.up = cl_vec3(0.0, 1.0, 0.0);
    cam.world_up = cl_vec3(0.0, 1.0, 0.0);
    cam.projection = cl_mat4(1.0);
    cam.view = cl_mat4(1.0);
    cam.near = 0.01;
    cam.far = 1000.0;
    cam.fov = 80.0;
    cam.yaw = 0.0;
    cam.pitch = 0.0;
    cam.roll = 0.0;
    cam.movement_speed = 0.1;
    cam.yaw_speed = 0.1;
    cam.pitch_speed = 0.1;
    cam.roll_speed = 0.1;

    return cam;
}

export function cl_cam3_move_forward(camera: cam3_t, dir: number) {
    cl_vec3_add_mul_s2(camera.position, camera.forward, camera.movement_speed * dir);
}

export function cl_cam3_move_right(camera: cam3_t, dir: number) {
    cl_vec3_add_mul_s2(camera.position, camera.right, camera.movement_speed * dir);
}

export function cl_cam3_move_up(camera: cam3_t, dir: number) {
    cl_vec3_add_mul_s2(camera.position, camera.up, camera.movement_speed * dir);
}

export function cl_cam3_pan(camera: cam3_t, dir: number) {
    camera.yaw += camera.yaw_speed * dir;
}

export function cl_cam3_tilt(camera: cam3_t, dir: number) {
    camera.pitch = cl_clamp(camera.pitch - camera.pitch_speed * dir, -89.0, 89.0);
}

export function cl_cam3_roll(camera: cam3_t, dir: number) {
    camera.roll += camera.roll_speed * dir;
}

export function cl_cam3_update(camera: cam3_t) {
    camera.forward = cl_vec3_unit2(cl_vec3(
        cl_sin(cl_rad(camera.yaw)) * cl_cos(cl_rad(camera.pitch)),
        cl_sin(cl_rad(camera.pitch)),
        -cl_cos(cl_rad(camera.yaw)) * cl_cos(cl_rad(camera.pitch))
    ));

    camera.right = cl_vec3_unit2(cl_vec3_cross(camera.forward, camera.world_up));

    camera.up = cl_vec3_unit2(cl_vec3_cross(camera.right, camera.forward));
}

export function cl_cam3_compute_proj(camera: cam3_t, viewport_x: number, viewport_y: number) {
    cl_mat4_perspective(camera.projection, cl_rad(camera.fov), viewport_x / viewport_y, camera.near, camera.far);
}

export function cl_cam3_compute_view(camera: cam3_t) {
    cl_mat4_look_at(camera.view, camera.position, cl_vec3_add(camera.position, camera.forward), camera.up);
}
