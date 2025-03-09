import {vec2, vec2_print} from "./vec2";
import {vec3, vec3_print} from "./vec3";
import {vec4, vec4_print} from "./vec4";
import {mat2, mat2_mul, mat2_mul_mv, mat2_mul_vm, mat2_print} from "./mat2";
import {mat3, mat3_mul, mat3_mul_mv, mat3_mul_vm, mat3_print} from "./mat3";
import {mat4, mat4_mul, mat4_mul_mv, mat4_mul_vm, mat4_print} from "./mat4";

export function mat2_mul() {
    const a = mat2(1, 2, 3, 4);
    const b = mat2(4, 3, 2, 1);

    console.log("a:");
    mat2_print(a);
    console.log("b:");
    mat2_print(b);
    console.log("a * b:");
    mat2_print(mat2_mul(a, b));
    console.log("b * a:");
    mat2_print(mat2_mul(b, a));
}

export function mat2_mul_mv() {
    const m = mat2(1, 2, 3, 4);
    const v = vec2(2, 1);

    console.log("m:");
    mat2_print(m);
    console.log("v:");
    vec2_print(v);
    console.log("m * v:");
    vec2_print(mat2_mul_mv(m, v));
    console.log("v * m:");
    vec2_print(mat2_mul_vm(v, m));
}

export function mat3_mul() {
    const a = mat3(1, 2, 3, 4, 5, 6, 7, 8, 9);
    const b = mat3(9, 8, 7, 6, 5, 4, 3, 2, 1);

    console.log("a:");
    mat3_print(a);
    console.log("b:");
    mat3_print(b);
    console.log("a * b:");
    mat3_print(mat3_mul(a, b));
    console.log("b * a:");
    mat3_print(mat3_mul(b, a));
}

export function mat3_mul_mv() {
    const m = mat3(1, 2, 3, 4, 5, 6, 7, 8, 9);
    const v = vec3(3, 2, 1);

    console.log("m:");
    mat3_print(m);
    console.log("v:");
    vec3_print(v);
    console.log("m * v:");
    vec3_print(mat3_mul_mv(m, v));
    console.log("v * m:");
    vec3_print(mat3_mul_vm(v, m));
}

export function mat4_mul() {
    const a = mat4(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16);
    const b = mat4(16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1);

    console.log("a:");
    mat4_print(a);
    console.log("b:");
    mat4_print(b);
    console.log("a * b:");
    mat4_print(mat4_mul(a, b));
    console.log("b * a:");
    mat4_print(mat4_mul(b, a));
}

export function mat4_mul_mv() {
    const m = mat4(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16);
    const v = vec4(4, 3, 2, 1);

    console.log("m:");
    mat4_print(m);
    console.log("v:");
    vec4_print(v);
    console.log("m * v:");
    vec4_print(mat4_mul_mv(m, v));
    console.log("v * m:");
    vec4_print(mat4_mul_vm(v, m));
}
