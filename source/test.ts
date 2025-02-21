import {cl_vec2, cl_vec2_print} from "./vec2";
import {cl_vec3, cl_vec3_print} from "./vec3";
import {cl_vec4, cl_vec4_print} from "./vec4";
import {cl_mat2, cl_mat2_mul, cl_mat2_mul_mv, cl_mat2_mul_vm, cl_mat2_print} from "./mat2";
import {cl_mat3, cl_mat3_mul, cl_mat3_mul_mv, cl_mat3_mul_vm, cl_mat3_print} from "./mat3";
import {cl_mat4, cl_mat4_mul, cl_mat4_mul_mv, cl_mat4_mul_vm, cl_mat4_print} from "./mat4";

export function mat2_mul() {
    const a = cl_mat2(1, 2, 3, 4);
    const b = cl_mat2(4, 3, 2, 1);

    console.log("a:");
    cl_mat2_print(a);
    console.log("b:");
    cl_mat2_print(b);
    console.log("a * b:");
    cl_mat2_print(cl_mat2_mul(a, b));
    console.log("b * a:");
    cl_mat2_print(cl_mat2_mul(b, a));
}

export function mat2_mul_mv() {
    const m = cl_mat2(1, 2, 3, 4);
    const v = cl_vec2(2, 1);

    console.log("m:");
    cl_mat2_print(m);
    console.log("v:");
    cl_vec2_print(v);
    console.log("m * v:");
    cl_vec2_print(cl_mat2_mul_mv(m, v));
    console.log("v * m:");
    cl_vec2_print(cl_mat2_mul_vm(v, m));
}

export function mat3_mul() {
    const a = cl_mat3(1, 2, 3, 4, 5, 6, 7, 8, 9);
    const b = cl_mat3(9, 8, 7, 6, 5, 4, 3, 2, 1);

    console.log("a:");
    cl_mat3_print(a);
    console.log("b:");
    cl_mat3_print(b);
    console.log("a * b:");
    cl_mat3_print(cl_mat3_mul(a, b));
    console.log("b * a:");
    cl_mat3_print(cl_mat3_mul(b, a));
}

export function mat3_mul_mv() {
    const m = cl_mat3(1, 2, 3, 4, 5, 6, 7, 8, 9);
    const v = cl_vec3(3, 2, 1);

    console.log("m:");
    cl_mat3_print(m);
    console.log("v:");
    cl_vec3_print(v);
    console.log("m * v:");
    cl_vec3_print(cl_mat3_mul_mv(m, v));
    console.log("v * m:");
    cl_vec3_print(cl_mat3_mul_vm(v, m));
}

export function mat4_mul() {
    const a = cl_mat4(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16);
    const b = cl_mat4(16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1);

    console.log("a:");
    cl_mat4_print(a);
    console.log("b:");
    cl_mat4_print(b);
    console.log("a * b:");
    cl_mat4_print(cl_mat4_mul(a, b));
    console.log("b * a:");
    cl_mat4_print(cl_mat4_mul(b, a));
}

export function mat4_mul_mv() {
    const m = cl_mat4(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16);
    const v = cl_vec4(4, 3, 2, 1);

    console.log("m:");
    cl_mat4_print(m);
    console.log("v:");
    cl_vec4_print(v);
    console.log("m * v:");
    cl_vec4_print(cl_mat4_mul_mv(m, v));
    console.log("v * m:");
    cl_vec4_print(cl_mat4_mul_vm(v, m));
}
