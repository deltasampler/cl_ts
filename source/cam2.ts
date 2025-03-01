import {cl_mat4, cl_mat4_ident} from "./mat4.ts";
import {mat4_t, num_t, vec2_t} from "./type.ts";
import {cl_vec2, cl_vec2_add_mul_s2} from "./vec2.ts";
import {cl_mat4_scale, cl_mat4_translate} from "./mat4_affine.ts";
import {cl_vec3} from "./vec3.ts";

export class cam2_t {
    position: vec2_t;
    scale: num_t;
    roll: num_t;
    right: vec2_t;
    up: vec2_t;
    world_up: vec2_t;
    projection: mat4_t;
    view: mat4_t;
    movement_speed: num_t;
    roll_speed: num_t;
};

export function cl_cam2_new() {
    const cam = new cam2_t();

    cam.position = cl_vec2();
    cam.right = cl_vec2(1.0, 0.0);
    cam.up = cl_vec2(0.0, 1.0);
    cam.world_up = cl_vec2(0.0, 1.0);
    cam.projection = cl_mat4(1.0);
    cam.view = cl_mat4(1.0);
    cam.scale = 50;
    cam.roll = 0.0;
    cam.movement_speed = 0.1;
    cam.roll_speed = 0.1;

    return cam;
}

export function cl_cam2_move_right(camera: cam2_t, dir: num_t) {
    cl_vec2_add_mul_s2(camera.position, camera.right, camera.movement_speed * dir);
}

export function cl_cam2_move_up(camera: cam2_t, dir: num_t) {
    cl_vec2_add_mul_s2(camera.position, camera.up, camera.movement_speed * dir);
}

export function cl_cam2_roll(camera: cam2_t, dir: num_t) {
    camera.roll += camera.roll_speed * dir;
}

export function cl_cam2_update(camera: cam2_t) {

}

export function cl_cam2_compute_proj(camera: cam2_t, viewport_x: num_t, viewport_y: num_t): mat4_t {
    cl_mat4_ident(camera.projection);
    cl_mat4_scale(camera.projection, cl_vec3(camera.scale / viewport_x, camera.scale / viewport_y, 1.0));

    return camera.projection;
}

export function cl_cam2_compute_view(camera: cam2_t): mat4_t {
    cl_mat4_ident(camera.view);
    cl_mat4_translate(camera.view, cl_vec3(-camera.position[0], -camera.position[1], 0.0));

    return camera.view;
}

export function cl_cam2_proj_mouse(camera: cam2_t, mx: num_t, my: num_t, width: num_t, height: num_t): vec2_t {
    const x = mx / width * 2.0 - 1.0;
    const y = my / height * -2.0 + 1.0;
    const w = width / camera.scale;
    const h = height / camera.scale;

    return cl_vec2(camera.position[0] + x * w, camera.position[1] + y * h);
}
