import {mat4, mat4_ident} from "./mat4.ts";
import {mat4_t, vec2_t} from "./type.ts";
import {vec2, vec2_addmuls2} from "./vec2.ts";
import {mat4_scale, mat4_translate} from "./mat4_affine.ts";
import {vec3} from "./vec3.ts";

export class cam2_t {
    position: vec2_t;
    scale: number;
    roll: number;
    right: vec2_t;
    up: vec2_t;
    world_up: vec2_t;
    projection: mat4_t;
    view: mat4_t;
    movement_speed: number;
    roll_speed: number;
    zoom_speed: number;
};

export function cam2_new() {
    const cam = new cam2_t();

    cam.position = vec2();
    cam.right = vec2(1.0, 0.0);
    cam.up = vec2(0.0, 1.0);
    cam.world_up = vec2(0.0, 1.0);
    cam.projection = mat4(1.0);
    cam.view = mat4(1.0);
    cam.scale = 50;
    cam.roll = 0.0;
    cam.movement_speed = 0.1;
    cam.roll_speed = 0.1;
    cam.zoom_speed = 0.1;

    return cam;
}

export function cam2_move_right(camera: cam2_t, dir: number) {
    vec2_addmuls2(camera.position, camera.right, camera.movement_speed * dir);
}

export function cam2_move_up(camera: cam2_t, dir: number) {
    vec2_addmuls2(camera.position, camera.up, camera.movement_speed * dir);
}

export function cam2_roll(camera: cam2_t, dir: number) {
    camera.roll += camera.roll_speed * dir;
}

export function cam2_compute_proj(camera: cam2_t, viewport_x: number, viewport_y: number): mat4_t {
    mat4_ident(camera.projection);
    mat4_scale(camera.projection, vec3(camera.scale / viewport_x, camera.scale / viewport_y, 1.0), camera.projection);

    return camera.projection;
}

export function cam2_compute_view(camera: cam2_t): mat4_t {
    mat4_ident(camera.view);
    mat4_translate(camera.view, vec3(-camera.position[0], -camera.position[1], 0.0), camera.view);

    return camera.view;
}

export function cam2_proj_mouse(camera: cam2_t, mx: number, my: number, width: number, height: number): vec2_t {
    const x = mx / width * 2.0 - 1.0;
    const y = my / height * -2.0 + 1.0;
    const w = width / camera.scale;
    const h = height / camera.scale;

    return vec2(camera.position[0] + x * w, camera.position[1] + y * h);
}
