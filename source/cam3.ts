import {vec3_t, mat4_t} from "./type.ts";
import {clamp, cos, rad, sin} from "./math.ts";
import {vec3, vec3_add1, vec3_addmuls2, vec3_cross1, vec3_unit2} from "./vec3.ts";
import {mat4} from "./mat4.ts";
import {mat4_perspective} from "./mat4_proj.ts";
import {mat4_look_at} from "./mat4_cam.ts";

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
    zoom_speed: number;
};

export function cam3_new() {
    const cam = new cam3_t();

    cam.position = vec3();
    cam.forward = vec3(0.0, 0.0, -1.0);
    cam.right = vec3(1.0, 0.0, 0.0);
    cam.up = vec3(0.0, 1.0, 0.0);
    cam.world_up = vec3(0.0, 1.0, 0.0);
    cam.projection = mat4(1.0);
    cam.view = mat4(1.0);
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
    cam.zoom_speed = 0.1;

    return cam;
}

export function cam3_move_forward(cam: cam3_t, dir: number) {
    vec3_addmuls2(cam.position, cam.forward, cam.movement_speed * dir);
}

export function cam3_move_right(cam: cam3_t, dir: number) {
    vec3_addmuls2(cam.position, cam.right, cam.movement_speed * dir);
}

export function cam3_move_up(cam: cam3_t, dir: number) {
    vec3_addmuls2(cam.position, cam.up, cam.movement_speed * dir);
}

export function cam3_pan(cam: cam3_t, dir: number) {
    cam.yaw += cam.yaw_speed * dir;
}

export function cam3_tilt(cam: cam3_t, dir: number) {
    cam.pitch = clamp(cam.pitch - cam.pitch_speed * dir, -89.0, 89.0);
}

export function cam3_roll(cam: cam3_t, dir: number) {
    cam.roll += cam.roll_speed * dir;
}

export function cam3_zoom(cam: cam3_t, dir: number) {
    cam.fov += cam.zoom_speed * dir;
}

export function cam3_fru(cam: cam3_t) {
    cam.forward = vec3_unit2(vec3(
        sin(rad(cam.yaw)) * cos(rad(cam.pitch)),
        sin(rad(cam.pitch)),
        -cos(rad(cam.yaw)) * cos(rad(cam.pitch))
    ));

    cam.right = vec3_unit2(vec3_cross1(cam.forward, cam.world_up));

    cam.up = vec3_unit2(vec3_cross1(cam.right, cam.forward));
}

export function cam3_compute_proj(cam: cam3_t, viewport_x: number, viewport_y: number) {
    mat4_perspective(rad(cam.fov), viewport_x / viewport_y, cam.near, cam.far, cam.projection);
}

export function cam3_compute_view(cam: cam3_t) {
    mat4_look_at(cam.position, vec3_add1(cam.position, cam.forward), cam.up, cam.view);
}
