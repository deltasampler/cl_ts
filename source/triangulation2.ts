import {vec2_t, vec4_t} from "@cl/type.ts";
import {vec2, vec2_abs, vec2_add1, vec2_addmuls1, vec2_divs2, vec2_lerp1, vec2_perp_ab1, vec2_rotate2, vec2_sub1, vec2_unit2} from "@cl/vec2";
import {vec4_bitpack256v} from "@cl/vec4.ts";

export class poly_data_t {
    stride: number;
    vertices: number[];
    indices: number[];
};

export function poly_data_vertex_count(data: poly_data_t) {
    return data.vertices.length / data.stride;
}

export function poly_data_index_count(data: poly_data_t) {
    return data.indices.length;
}

export function gen_obb(pos: vec2_t, size: vec2_t, rot: number, z: number, col: vec4_t, data: poly_data_t): void {
    const vc = poly_data_vertex_count(data);
    const px = pos[0], py = pos[1];
    const sx = size[0] / 2.0, sy = size[1] / 2.0;

    const p0 = vec2(px - sx, py + sy);
    const p1 = vec2(px - sx, py - sy);
    const p2 = vec2(px + sx, py - sy);
    const p3 = vec2(px + sx, py + sy);

    if (rot !== 0.0) {

        vec2_rotate2(p0, pos, rot);
        vec2_rotate2(p1, pos, rot);
        vec2_rotate2(p2, pos, rot);
        vec2_rotate2(p3, pos, rot);
    }

    const c = vec4_bitpack256v(col);

    data.vertices.push(
        ...p0, z, c,
        ...p1, z, c,
        ...p2, z, c,
        ...p3, z, c
    );

    data.indices.push(vc, vc + 1, vc + 2, vc, vc + 2, vc + 3);
}

export function gen_aabb(pos: vec2_t, size: vec2_t, z: number, col: vec4_t, data: poly_data_t): void {
    gen_obb(pos, size, 0.0, z, col, data);
}

export function gen_aabb2(min: vec2_t, max: vec2_t, z: number, col: vec4_t, data: poly_data_t): void {
    const pos = vec2_divs2(vec2_add1(min, max), 2.0);
    const size = vec2_abs(vec2_sub1(max, min));

    gen_obb(pos, size, 0.0, z, col, data);
}

export function gen_circle(pos: vec2_t, radius: number, lod: number, z: number, col: vec4_t, data: poly_data_t): void {
    const vc = poly_data_vertex_count(data);
    const angle = Math.PI * 2.0 / lod;
    const offset = (lod % 2 === 0) ? Math.PI / lod : Math.PI / 2;
    const c = vec4_bitpack256v(col);

    for (let i = 0; i < lod; i += 1) {
        const p = vec2_add1(pos, vec2(Math.cos(angle * i + offset) * radius, Math.sin(angle * i + offset) * radius));

        data.vertices.push(
            ...p, z, c
        );
    }

    for (let i = 1; i < lod - 1; i += 1) {
        data.indices.push(vc, vc + i, vc + i + 1);
    }
}

export function gen_line(pt0: vec2_t, width0: number, pt1: vec2_t, width1: number, z: number, col: vec4_t, data: poly_data_t): void {
    const vc = poly_data_vertex_count(data);
    const perp = vec2_unit2(vec2_perp_ab1(pt1, pt0));
    const radius0 = width0 / 2.0, radius1 = width1 / 2.0;
    const p0 = vec2_addmuls1(pt0, perp, -radius0);
    const p1 = vec2_addmuls1(pt0, perp, radius0);
    const p2 = vec2_addmuls1(pt1, perp, radius1);
    const p3 = vec2_addmuls1(pt1, perp, -radius1);
    const c = vec4_bitpack256v(col);

    data.vertices.push(
        ...p0, z, c,
        ...p1, z, c,
        ...p2, z, c,
        ...p3, z, c
    );

    data.indices.push(vc, vc + 1, vc + 2, vc, vc + 2, vc + 3);
}

export function gen_line_triangle(pt0: vec2_t, pt1: vec2_t, width: number, z: number, col: vec4_t, data: poly_data_t): void {
    const vc = poly_data_vertex_count(data);
    const perp = vec2_unit2(vec2_perp_ab1(pt1, pt0));
    const radius = width / 2.0;
    const pl = vec2_addmuls1(pt0, perp, -radius);
    const pr = vec2_addmuls1(pt0, perp, radius);
    const c = vec4_bitpack256v(col);

    data.vertices.push(
        ...pr, z, c,
        ...pl, z, c,
        ...pt1, z, c
    );

    data.indices.push(vc, vc + 1, vc + 2);
}

export function gen_line_kite(pt0: vec2_t, pt1: vec2_t, width: number, ratio: number, z: number, col: vec4_t, data: poly_data_t): void {
    const vc = poly_data_vertex_count(data);
    const perp = vec2_unit2(vec2_perp_ab1(pt1, pt0));
    const radius = width / 2.0;
    const mp = vec2_lerp1(pt0, pt1, ratio);
    const pl = vec2_addmuls1(mp, perp, -radius);
    const pr = vec2_addmuls1(mp, perp, radius);
    const c = vec4_bitpack256v(col);

    data.vertices.push(
        ...pt0, -0.5, c,
        ...pr, -0.5, c,
        ...pt1, -0.5, c,
        ...pl, -0.5, c
    );

    data.indices.push(vc, vc + 1, vc + 2, vc, vc + 2, vc + 3);
}

export function gen_line_rhomb(pt0: vec2_t, pt1: vec2_t, width: number, z: number, col: vec4_t, data: poly_data_t): void {
    gen_line_kite(pt0, pt1, width, 0.5, z, col, data);
}

export function gen_line_ellipse(pt0: vec2_t, pt1: vec2_t, width: number, z: number, col: vec4_t, data: poly_data_t): void {

}

export function monotone_decompose(points: vec2_t[]) {

};

export function gen_polygon(points: vec2_t[], z: number, col: vec4_t, data: poly_data_t): void {
}

export function gen_star(pos: vec2_t, radius: number, inner_radius: number, lod: number, z: number, col: vec4_t, data: poly_data_t): void {
    const vc = poly_data_vertex_count(data);
    const angle = Math.PI * 2.0 / lod;
    const offset = (lod % 2 === 0) ? Math.PI / lod : Math.PI / 2;
    const c = vec4_bitpack256v(col);

    for (let i = 0; i < lod; i += 1) {
        const p0 = vec2_add1(pos, vec2(Math.cos(angle * i + offset) * inner_radius, Math.sin(angle * i + offset) * inner_radius));
        const p1 = vec2_add1(pos, vec2(Math.cos(angle / 2.0 + angle * i + offset) * radius, Math.sin(angle / 2.0 + angle * i + offset) * radius));

        data.vertices.push(
            ...p0, z, c,
            ...p1, z, c
        );
    }

    for (let i = 1; i < lod - 1; i += 1) {
        data.indices.push(vc, vc + i * 2, vc + i * 2 + 2);
    }

    for (let i = 0; i < lod; i += 1) {
        data.indices.push(vc + i * 2, vc + i * 2 + 1, vc + ((i + 1) * 2) % (lod * 2));
    }
}
