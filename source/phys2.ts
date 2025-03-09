import {vec2_t} from "./type.ts";
import {vec2, vec2_add, vec2_add2, vec2_add_mul_s, vec2_copy, vec2_dir, vec2_dist, vec2_dist_sq, vec2_div_s2, vec2_mul_s} from "./vec2.ts";
import {abs, clamp} from "./math.ts";
import {vec2_add_mul_s2, vec2_div_s, vec2_len_sq} from "@cl/vec2.ts";
import {hypot, sqrt} from "@cl/math.ts";

export function point_inside_circle(cp: vec2_t, cr: number, p: vec2_t): boolean {
    return vec2_dist_sq(cp, p) <= cr * cr;
}

export function point_inside_capsule(a: vec2_t, b: vec2_t, cr: number, p: vec2_t) {
    const bax = b[0] - a[0], bay = b[1] - a[1];
    const pax = p[0] - a[0], pay = p[1] - a[1];
    const t = (bax * pax + bay * pay) / (bax * bax + bay * bay);
    const tc = clamp(t, 0.0, 1.0);
    const tp = vec2(a[0] + bax * tc, a[1] + bay * tc);

    return vec2_dist_sq(tp, p) <= cr * cr;
}

export function point_inside_aabb(bp: vec2_t, bs: vec2_t, p: vec2_t): boolean {
    const [bx, by] = bp;
    const [px, py] = p;
    const sx = bs[0] / 2, sy = bs[1] / 2;

    return px >= bx - sx && px <= bx + sx && py >= by - sy && py <= by + sy;
}

export function point_inside_obb(bp: vec2_t, bs: vec2_t, ba: number, p: vec2_t): boolean {
    const dx = p[0] - bp[0];
    const dy = p[1] - bp[1];
    const cos = Math.cos(-ba);
    const sin = Math.sin(-ba);
    const lx = dx * cos - dy * sin;
    const ly = dx * sin + dy * cos;
    const sx = bs[0] / 2;
    const sy = bs[1] / 2;

    return Math.abs(lx) <= sx && Math.abs(ly) <= sy;
}

export function point_inside_convex(points: vec2_t[], p: vec2_t): boolean {
    const [px, py] = p;

    let first_sign = 0.0;

    for (let i = 0; i < points.length; i += 1) {
        const [x0, y0] = points[i];
        const [x1, y1] = points[(i + 1) % points.length];
        const cross = (x1 - x0) * (py - y0) - (y1 - y0) * (px - x0);
        const sign = Math.sign(cross);

        if (sign === 0) {
            continue;
        }

        if (first_sign === 0) {
            first_sign = sign;
        } else if (sign !== first_sign) {
            return false;
        }
    }

    return true;
}

export function point_inside_convex_cent(points: vec2_t[], pos: vec2_t, a: number, p: vec2_t): boolean {
    const [cx, cy] = pos;
    const [px, py] = p;
    const cos = Math.cos(-a);
    const sin = Math.sin(-a);
    const lx = (px - cx) * cos - (py - cy) * sin;
    const ly = (px - cx) * sin + (py - cy) * cos;

    return point_inside_convex(points, vec2(lx, ly));
}

export function point_closest_line(a: vec2_t, b: vec2_t, p: vec2_t): vec2_t {
    const bax = b[0] - a[0], bay = b[1] - a[1];
    const pax = p[0] - a[0], pay = p[1] - a[1];
    const t = (bax * pax + bay * pay) / (bax * bax + bay * bay);
    const tc = clamp(t, 0.0, 1.0);

    return vec2(a[0] + bax * tc, a[1] + bay * tc);
}

export function point_closest_circle(cp: vec2_t, cr: number, p: vec2_t): vec2_t {
    const d = vec2_dir(p, cp);

    return vec2_add_mul_s(cp, d, cr);
}

export function point_closest_capsule(a: vec2_t, b: vec2_t, cr: number, p: vec2_t): vec2_t {
    const bax = b[0] - a[0], bay = b[1] - a[1];
    const pax = p[0] - a[0], pay = p[1] - a[1];
    const t = (bax * pax + bay * pay) / (bax * bax + bay * bay);
    const tc = clamp(t, 0.0, 1.0);
    const tp = vec2(a[0] + bax * tc, a[1] + bay * tc);
    const d = vec2_dir(p, tp);

    return vec2_add_mul_s(tp, d, cr);
}

export function point_closest_aabb(bp: vec2_t, bs: vec2_t, p: vec2_t): vec2_t {
    const [bx, by] = bp;
    const [px, py] = p;
    const sx = bs[0] / 2, sy = bs[1] / 2;
    const minx = bx - sx, miny = by - sy;
    const maxx = bx + sx, maxy = by + sy;

    const cx = abs(minx - px) < abs(maxx - px) ? minx : maxx;
    const cy = abs(miny - py) < abs(maxy - py) ? miny : maxy;

    const ex = point_closest_line(vec2(cx, miny), vec2(cx, maxy), p);
    const ey = point_closest_line(vec2(minx, cy), vec2(maxx, cy), p);

    if (vec2_dist_sq(ex, p) < vec2_dist_sq(ey, p)) {
        return ex;
    }

    return ey;
}

export function point_closest_obb(bp: vec2_t, bs: vec2_t, a: number, p: vec2_t): vec2_t {
    const [cx, cy] = bp;
    const [px, py] = p;
    const cos = Math.cos(-a);
    const sin = Math.sin(-a);
    const lx = (px - cx) * cos - (py - cy) * sin;
    const ly = (px - cx) * sin + (py - cy) * cos;

    const cos2 = Math.cos(a);
    const sin2 = Math.sin(a);
    const [px2, py2] = point_closest_aabb(vec2(), bs, vec2(lx, ly));
    const lx2 = (px2 * cos2 - py2 * sin2) + cx;
    const ly2 = (px2 * sin2 + py2 * cos2) + cy;

    return vec2(lx2, ly2);
}

export function point_closest_convex(points: vec2_t[], p: vec2_t): vec2_t {
    let closest;

    for (let i = 0; i < points.length; i += 1) {
        const a = points[i];
        const b = points[(i + 1) % points.length];
        const c = point_closest_line(a, b, p);

        if (!closest || vec2_dist_sq(p, c) < vec2_dist_sq(p, closest)) {
            closest = c;
        }
    }

    return closest!;
}

export function point_closest_convex_cent(points: vec2_t[], pos: vec2_t, a: number, p: vec2_t): vec2_t {
    const [cx, cy] = pos;
    const [px, py] = p;
    const cos = Math.cos(-a);
    const sin = Math.sin(-a);
    const lx = (px - cx) * cos - (py - cy) * sin;
    const ly = (px - cx) * sin + (py - cy) * cos;

    const cos2 = Math.cos(a);
    const sin2 = Math.sin(a);
    const [px2, py2] = point_closest_convex(points, vec2(lx, ly));
    const lx2 = (px2 * cos2 - py2 * sin2) + cx;
    const ly2 = (px2 * sin2 + py2 * cos2) + cy;

    return vec2(lx2, ly2);
}

export function line_intersect_line(a0: vec2_t, b0: vec2_t, a1: vec2_t, b1: vec2_t): vec2_t[] {
    const x1 = a0[0], y1 = a0[1], x2 = b0[0], y2 = b0[1];
    const x3 = a1[0], y3 = a1[1], x4 = b1[0], y4 = b1[1];
    const denom = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

    if (denom === 0) {
        return [];
    }

    const px = ((x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4)) / denom;
    const py = ((x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4)) / denom;
    const t = ((px - x1) * (x2 - x1) + (py - y1) * (y2 - y1)) / ((x2 - x1) ** 2 + (y2 - y1) ** 2);
    const u = ((px - x3) * (x4 - x3) + (py - y3) * (y4 - y3)) / ((x4 - x3) ** 2 + (y4 - y3) ** 2);

    if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
        return [vec2(px, py)];
    }

    return [];
}

export function line_intersect_circle(cp: vec2_t, cr: number, a: vec2_t, b: vec2_t): vec2_t[] {
    const dx = b[0] - a[0];
    const dy = b[1] - a[1];
    const fx = a[0] - cp[0];
    const fy = a[1] - cp[1];
    const A = dx * dx + dy * dy;
    const B = 2 * (fx * dx + fy * dy);
    const C = fx * fx + fy * fy - cr * cr;
    const D = B * B - 4 * A * C;

    if (D < 0) {
        return [];
    }

    const sqrt_d = Math.sqrt(D);
    const t1 = (-B - sqrt_d) / (2 * A);
    const t2 = (-B + sqrt_d) / (2 * A);
    const points: vec2_t[] = [];

    if (t1 >= 0 && t1 <= 1) {
        points.push(vec2(a[0] + t1 * dx, a[1] + t1 * dy));
    }

    if (t2 >= 0 && t2 <= 1) {
        points.push(vec2(a[0] + t2 * dx, a[1] + t2 * dy));
    }

    return points;
}

export function line_intersect_capsule(a0: vec2_t, b0: vec2_t, cr: number, a1: vec2_t, b1: vec2_t): vec2_t[] {
    const d = vec2_dir(a0, b0);
    const dp = vec2(-d[1], d[0]);
    const start0 = vec2_add_mul_s(a0, dp, -cr);
    const start1 = vec2_add_mul_s(a0, dp, cr);
    const end0 = vec2_add_mul_s(b0, dp, -cr);
    const end1 = vec2_add_mul_s(b0, dp, cr);

    const out: vec2_t[] = [];

    for (const point of line_intersect_circle(a0, cr, a1, b1)) {
        if (vec2_dist(point, point_closest_capsule(a0, b0, cr, point)) <= 0.001) {
            out.push(point);
        }
    }

    for (const point of line_intersect_circle(b0, cr, a1, b1)) {
        if (vec2_dist(point, point_closest_capsule(a0, b0, cr, point)) <= 0.001) {
            out.push(point);
        }
    }

    out.push(...line_intersect_line(start0, end0, a1, b1));
    out.push(...line_intersect_line(start1, end1, a1, b1));

    return out;
}

export function line_intersect_aabb(bp: vec2_t, bs: vec2_t, a: vec2_t, b: vec2_t): vec2_t[] {
    const min_x = bp[0] - bs[0] / 2;
    const max_x = bp[0] + bs[0] / 2;
    const min_y = bp[1] - bs[1] / 2;
    const max_y = bp[1] + bs[1] / 2;
    const dx = b[0] - a[0];
    const dy = b[1] - a[1];
    let t_min = 0;
    let t_max = 1;

    if (dx !== 0) {
        let t1 = (min_x - a[0]) / dx;
        let t2 = (max_x - a[0]) / dx;

        if (t1 > t2) [t1, t2] = [t2, t1];
        t_min = Math.max(t_min, t1);
        t_max = Math.min(t_max, t2);
    } else if (a[0] < min_x || a[0] > max_x) {
        return [];
    }

    if (dy !== 0) {
        let t1 = (min_y - a[1]) / dy;
        let t2 = (max_y - a[1]) / dy;

        if (t1 > t2) [t1, t2] = [t2, t1];
        t_min = Math.max(t_min, t1);
        t_max = Math.min(t_max, t2);
    } else if (a[1] < min_y || a[1] > max_y) {
        return [];
    }

    if (t_min > t_max) return [];

    const points: vec2_t[] = [];

    if (t_min > 0 && t_min < 1) {
        points.push(vec2(a[0] + t_min * dx, a[1] + t_min * dy));
    }

    if (t_max > 0 && t_max < 1 && t_max !== t_min) {
        points.push(vec2(a[0] + t_max * dx, a[1] + t_max * dy));
    }

    return points;
}

export function line_intersect_obb(bp: vec2_t, bs: vec2_t, br: number, a: vec2_t, b: vec2_t) {
    const cos_r = Math.cos(-br);
    const sin_r = Math.sin(-br);

    function rotate_point(p: vec2_t): vec2_t {
        const x = p[0] - bp[0];
        const y = p[1] - bp[1];
        return vec2(
            x * cos_r - y * sin_r,
            x * sin_r + y * cos_r
        );
    }

    function rotate_back(p: vec2_t): vec2_t {
        const cos_r2 = Math.cos(br);
        const sin_r2 = Math.sin(br);
        return vec2(
            p[0] * cos_r2 - p[1] * sin_r2 + bp[0],
            p[0] * sin_r2 + p[1] * cos_r2 + bp[1]
        );
    }

    const local_a = rotate_point(a);
    const local_b = rotate_point(b);
    const local_bp: vec2_t = vec2(0, 0);
    const local_bs = vec2(bs[0], bs[1]);
    const intersections = line_intersect_aabb(local_bp, local_bs, local_a, local_b);

    return intersections.map(rotate_back);
}

export function line_intersect_convex(points: vec2_t[], a: vec2_t, b: vec2_t): vec2_t[] {
    const intersections: vec2_t[] = [];

    for (let i = 0; i < points.length; i++) {
        const p1 = points[i];
        const p2 = points[(i + 1) % points.length];0.
        
        const edge_intersections = line_intersect_line(p1, p2, a, b);
        intersections.push(...edge_intersections);
    }

    return intersections;
}

export function line_intersect_convex_cent(points: vec2_t[], bp: vec2_t, br: number, a: vec2_t, b: vec2_t): vec2_t[] {
    const cos_r = Math.cos(-br);
    const sin_r = Math.sin(-br);

    function rotate_point(p: vec2_t): vec2_t {
        const x = p[0] - bp[0];
        const y = p[1] - bp[1];
        return vec2(
            x * cos_r - y * sin_r,
            x * sin_r + y * cos_r
        );
    }

    function rotate_back(p: vec2_t): vec2_t {
        const cos_r2 = Math.cos(br);
        const sin_r2 = Math.sin(br);
        return vec2(
            p[0] * cos_r2 - p[1] * sin_r2 + bp[0],
            p[0] * sin_r2 + p[1] * cos_r2 + bp[1]
        );
    }

    const local_a = rotate_point(a);
    const local_b = rotate_point(b);
    const intersections = line_intersect_convex(points, local_a, local_b);

    return intersections.map(rotate_back);
}

export function rotate_point(point: vec2_t, angle: number): vec2_t {
    const cos_theta = Math.cos(angle);
    const sin_theta = Math.sin(angle);
    return vec2(
        point[0] * cos_theta - point[1] * sin_theta,
        point[0] * sin_theta + point[1] * cos_theta
    );
}

export type sat_return = {
    collision: boolean;
    mtv: vec2_t;
    overlap: number;
};

export function sat(points_0: vec2_t[], pos_0: vec2_t, angle_0: number, points_1: vec2_t[], pos_1: vec2_t, angle_1: number): sat_return {
    let min_overlap = Infinity;
    let smallest_axis: vec2_t | null = null;

    function transform_polygon(points: vec2_t[], position: vec2_t, angle: number): vec2_t[] {
        return points.map(p => {
            const rotated = rotate_point(p, angle);
            return vec2(rotated[0] + position[0], rotated[1] + position[1]);
        });
    }

    const transformed_0 = transform_polygon(points_0, pos_0, angle_0);
    const transformed_1 = transform_polygon(points_1, pos_1, angle_1);

    function get_perpendicular_axis(p1: vec2_t, p2: vec2_t): vec2_t {
        const edge = vec2(p2[0] - p1[0], p2[1] - p1[1]);
        return vec2(-edge[1], edge[0]);
    }

    function project_points(points: vec2_t[], axis: vec2_t): { min: number; max: number } {
        let min = Infinity, max = -Infinity;
        for (const p of points) {
            const projection = p[0] * axis[0] + p[1] * axis[1];
            min = Math.min(min, projection);
            max = Math.max(max, projection);
        }
        return { min, max };
    }

    function check_axes(points_a: vec2_t[]): boolean {
        for (let i = 0; i < points_a.length; i++) {
            const axis = get_perpendicular_axis(points_a[i], points_a[(i + 1) % points_a.length]);
            const length = Math.hypot(axis[0], axis[1]);
            const normalized_axis = vec2(axis[0] / length, axis[1] / length);

            const proj_0 = project_points(transformed_0, normalized_axis);
            const proj_1 = project_points(transformed_1, normalized_axis);

            const overlap = Math.min(proj_0.max, proj_1.max) - Math.max(proj_0.min, proj_1.min);
            if (overlap <= 0) return false;

            if (overlap < min_overlap) {
                min_overlap = overlap;
                smallest_axis = normalized_axis;
            }
        }
        return true;
    }

    if (!check_axes(transformed_0) || !check_axes(transformed_1)) {
        return {
            collision: false,
            mtv: vec2(),
            overlap: 0.0
        };
    }

    if (smallest_axis) {
        const center_0 = pos_0;
        const center_1 = pos_1;

        const direction = vec2(center_1[0] - center_0[0], center_1[1] - center_0[1]);
        if (direction[0] * smallest_axis[0] + direction[1] * smallest_axis[1] < 0) {
            smallest_axis = vec2(-smallest_axis[0], -smallest_axis[1]);
        }

        return { collision: true, mtv: vec2(smallest_axis[0], smallest_axis[1]), overlap: min_overlap };
    }

    return {
        collision: false,
        mtv: vec2(),
        overlap: 0.0
    };
}

export function center_vertices(vertices: vec2_t[]): vec2_t[] {
    let cx = 0.0, cy = 0.0, area = 0.0;

    for (let i = 0; i < vertices.length; i++) {
        const curr = vertices[i];
        const next = vertices[(i + 1) % vertices.length];
        const x0 = curr[0], y0 = curr[1];
        const x1 = next[0], y1 = next[1];
        const cross = x0 * y1 - x1 * y0;

        cx += (x0 + x1) * cross;
        cy += (y0 + y1) * cross;
        area += cross;
    }

    area *= 0.5;
    cx /= (6 * area);
    cy /= (6 * area);

    for (let i = 0; i < vertices.length; i++) {
        const point = vertices[i];
        point[0] -= cx;
        point[1] -= cy;
    }

    return vertices;
}

export function polygon_radius(vertices: vec2_t[]): number {
    let longest = 0.0;

    for (let i = 0; i < vertices.length; i++) {
        const point = vertices[i];
        const l = vec2_len_sq(point);

        if (!longest || l > longest) {
            longest = l;
        }
    }

    return sqrt(longest);
}

export function polygon_size(vertices: vec2_t[]): vec2_t[] {
    let min_x = vertices[0][0], max_x = vertices[0][0];
    let min_y = vertices[0][1], max_y = vertices[0][1];

    for (const v of vertices) {
        if (v[0] < min_x) min_x = v[0];
        if (v[0] > max_x) max_x = v[0];
        if (v[1] < min_y) min_y = v[1];
        if (v[1] > max_y) max_y = v[1];
    }

    return [vec2(min_x, min_y), vec2(max_x, max_y)];
}

export enum BODY_TYPE {
    CIRCLE,
    BOX,
    POLYGON
};

export class body_t {
    position: vec2_t;
    rotation: number;
    radius: number;
    min: vec2_t;
    max: vec2_t;
    vertices: vec2_t[];
    type: BODY_TYPE;

    mass: number;
    acceleration: vec2_t;
    acceleration_last: vec2_t;
    accelaration_average: vec2_t;
    velocity: vec2_t;
    intertia_moment: number;
    angular_acceleration: number;
    angular_acceleration_last: number;
    angular_acceleration_average: number;
    angular_velocity: number;
    is_static: boolean;

    constructor() {
        this.mass = 1.0;
        this.acceleration = vec2();
        this.acceleration_last = vec2();
        this.accelaration_average = vec2();
        this.velocity = vec2();
        this.intertia_moment = 1.0;
        this.angular_acceleration = 0.0;
        this.angular_acceleration_last = 0.0;
        this.angular_acceleration_average = 0.0;
        this.angular_velocity = 0.0;
        this.is_static = false;
    }

    update(force: vec2_t, time_step: number): void {
        if (this.is_static) {
            return;
        }

        vec2_copy(this.acceleration_last, this.acceleration);

        vec2_add2(this.position, vec2_mul_s(this.velocity, time_step));
        vec2_add2(this.position, vec2_mul_s(this.acceleration_last, time_step * time_step * 0.5));

        vec2_copy(this.acceleration, vec2_div_s(force, this.mass));

        vec2_copy(this.accelaration_average, vec2_div_s2(vec2_add(this.acceleration_last, this.acceleration), 2.0));

        vec2_add2(this.velocity, vec2_mul_s(this.accelaration_average, time_step));
    }

    update_angular(torque: number, time_step: number): void {
        this.angular_acceleration_last = this.angular_acceleration;

        this.rotation += this.angular_velocity * time_step + this.angular_acceleration_last * (time_step * time_step * 0.5);

        this.angular_acceleration = torque / this.intertia_moment;

        this.angular_acceleration_average = (this.angular_acceleration_last + this.angular_acceleration) / 2.0;

        this.angular_velocity += this.angular_acceleration_average * time_step;
    }


    get size(): vec2_t {
        return vec2(Math.abs(this.max[0] - this.min[0]), Math.abs(this.max[1] - this.min[1]));
    }
};

export function body_circle(position: vec2_t, rotation: number, radius: number) {
    const body = new body_t();
    body.position = position;
    body.rotation = rotation;
    body.radius = radius;
    body.min = vec2(-radius);
    body.max = vec2(radius);
    body.vertices = [];
    body.type = BODY_TYPE.CIRCLE;

    return body;
}

export function body_box(position: vec2_t, rotation: number, size: vec2_t) {
    const body = new body_t();
    body.position = position;
    body.rotation = rotation;
    body.radius = hypot(size[0] / 2.0, size[1] / 2.0);
    body.min = vec2_div_s(size, -2.0);
    body.max = vec2_div_s(size, 2.0);
    body.vertices = [];
    body.type = BODY_TYPE.BOX;

    return body;
}

export function body_polygon(position: vec2_t, rotation: number, vertices: vec2_t[]) {
    const body = new body_t();
    body.position = position;
    body.rotation = rotation;
    body.vertices = center_vertices(vertices);
    body.radius = polygon_radius(body.vertices);

    const size = polygon_size(body.vertices);
    body.min = size[0];
    body.max = size[1];

    body.type = BODY_TYPE.POLYGON;

    return body;
}

class pair_t {
    body_a: body_t;
    body_b: body_t;
};

export function circle_intersect_circle(p0: vec2_t, r0: number, p1: vec2_t, r1: number): boolean {
    return vec2_dist_sq(p0, p1) <= (r0 + r1) * (r0 + r1);
}

export function broad_phase_naive(bodies: body_t[]): pair_t[] {
    const pairs: pair_t[] = [];

    for (const body_a of bodies) {
        for (const body_b of bodies) {
            if (body_a !== body_b) {
                if (circle_intersect_circle(body_a.position, body_a.radius, body_b.position, body_b.radius)) {
                    const pair = new pair_t();
                    pair.body_a = body_a;
                    pair.body_b = body_b;
                    pairs.push(pair);
                }
            }
        }
    }

    return pairs;
}

export function narrow_phase(pairs: pair_t[]): void {
    for (const pair of pairs) {
        const body_a = pair.body_a;
        const body_b = pair.body_b;

        if (body_a.type === BODY_TYPE.CIRCLE && body_b.type === BODY_TYPE.CIRCLE) {
            const depth = body_a.radius + body_b.radius - vec2_dist(body_a.position, body_b.position);
            const dir = vec2_dir(body_a.position, body_b.position);

            if (!body_a.is_static) {
                vec2_add_mul_s2(body_a.position, dir, depth / 2.0);
            }

            if (!body_b.is_static) {
                vec2_add_mul_s2(body_b.position, dir, -depth / 2.0);
            }
        }

        if (body_a.type === BODY_TYPE.CIRCLE && body_b.type === BODY_TYPE.BOX) {
            const cp = point_closest_obb(body_b.position, body_b.size, body_b.rotation, body_a.position);
            const is_inside = point_inside_obb(body_b.position, body_b.size, body_b.rotation, body_a.position);
            const sign = is_inside ? -1.0 : 1.0;
            const distance_to_cp = vec2_dist(body_a.position, cp) * sign;
            const depth = body_a.radius - distance_to_cp;
            const dir = vec2_dir(body_a.position, cp);

            if (distance_to_cp < body_a.radius) {
                if (!body_a.is_static) {
                    vec2_add_mul_s2(body_a.position, dir, depth / 2.0 * sign);
                }
    
                if (!body_b.is_static) {
                    vec2_add_mul_s2(body_b.position, dir, -depth / 2.0 * sign);
                }
            }
        }

        if (body_a.type === BODY_TYPE.CIRCLE && body_b.type === BODY_TYPE.POLYGON) {
            const cp = point_closest_convex_cent(body_b.vertices, body_b.position, body_b.rotation, body_a.position);
            const is_inside = point_inside_convex_cent(body_b.vertices, body_b.position, body_b.rotation, body_a.position);
            const sign = is_inside ? -1.0 : 1.0;
            const distance_to_cp = vec2_dist(body_a.position, cp) * sign;
            const depth = body_a.radius - distance_to_cp;
            const dir = vec2_dir(body_a.position, cp);

            if (distance_to_cp < body_a.radius) {
                if (!body_a.is_static) {
                    vec2_add_mul_s2(body_a.position, dir, depth / 2.0 * sign);
                }

                if (!body_b.is_static) {
                    vec2_add_mul_s2(body_b.position, dir, -depth / 2.0 * sign);
                }
            }
        }

        if (body_a.type === BODY_TYPE.BOX && body_b.type === BODY_TYPE.BOX) {
            const vertices1 = [vec2(body_a.min[0], body_a.max[1]), body_a.max, vec2(body_a.max[0], body_a.min[1]), body_a.min];
            const vertices2 = [vec2(body_b.min[0], body_b.max[1]), body_b.max, vec2(body_b.max[0], body_b.min[1]), body_b.min];
            const result = sat(vertices1, body_a.position, body_a.rotation, vertices2, body_b.position, body_b.rotation);

            if (result.collision && result.mtv) {
                if (!body_a.is_static) {
                    vec2_add_mul_s2(body_a.position, result.mtv, -result.overlap / 2.0);
                }

                if (!body_b.is_static) {
                    vec2_add_mul_s2(body_b.position, result.mtv, result.overlap / 2.0);
                }
            }
        }

        if (body_a.type === BODY_TYPE.POLYGON && body_b.type === BODY_TYPE.POLYGON) {
            const result = sat(body_a.vertices, body_a.position, body_a.rotation, body_b.vertices, body_b.position, body_b.rotation);

            if (result.collision && result.mtv) {
                if (!body_a.is_static) {
                    vec2_add_mul_s2(body_a.position, result.mtv, -result.overlap / 2.0);
                }

                if (!body_b.is_static) {
                    vec2_add_mul_s2(body_b.position, result.mtv, result.overlap / 2.0);
                }
            }
        }

        if (body_a.type === BODY_TYPE.POLYGON && body_b.type === BODY_TYPE.BOX) {
            const vertices = [vec2(body_b.min[0], body_b.max[1]), body_b.max, vec2(body_b.max[0], body_b.min[1]), body_b.min];
            const result = sat(body_a.vertices, body_a.position, body_a.rotation, vertices, body_b.position, body_b.rotation);

            if (result.collision && result.mtv) {
                if (!body_a.is_static) {
                    vec2_add_mul_s2(body_a.position, result.mtv, -result.overlap / 2.0);
                }

                if (!body_b.is_static) {
                    vec2_add_mul_s2(body_b.position, result.mtv, result.overlap / 2.0);
                }
            }
        }
    }
}
