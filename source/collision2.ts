import {vec2_t} from "./type.ts";
import {vec2, vec2_add2, vec2_addmuls1, vec2_copy, vec2_dir1, vec2_dist, vec2_dist_sq, vec2_rotate_origin1, vec2_sub1} from "./vec2.ts";
import {abs, clamp} from "./math.ts";

// point inside
export function point_inside_circle(cp: vec2_t, cr: number, p: vec2_t): boolean {
    return vec2_dist_sq(cp, p) <= cr * cr;
}

export function point_inside_aabb(bp: vec2_t, bs: vec2_t, p: vec2_t): boolean {
    const [bx, by] = bp;
    const [px, py] = p;
    const sx = bs[0] / 2, sy = bs[1] / 2;

    return px >= bx - sx && px <= bx + sx && py >= by - sy && py <= by + sy;
}

export function point_inside_obb(bp: vec2_t, bs: vec2_t, ba: number, p: vec2_t): boolean {
    const dp = vec2_sub1(p, bp);
    const lp = vec2_rotate_origin1(dp, -ba);
    const sx = bs[0] / 2;
    const sy = bs[1] / 2;

    return Math.abs(lp[0]) <= sx && Math.abs(lp[1]) <= sy;
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
    const dp = vec2_sub1(p, pos);
    const lp = vec2_rotate_origin1(dp, -a);

    return point_inside_convex(points, lp);
}

export function point_inside_capsule(a: vec2_t, b: vec2_t, cr: number, p: vec2_t) {
    const bax = b[0] - a[0], bay = b[1] - a[1];
    const pax = p[0] - a[0], pay = p[1] - a[1];
    const t = (bax * pax + bay * pay) / (bax * bax + bay * bay);
    const tc = clamp(t, 0.0, 1.0);
    const tp = vec2(a[0] + bax * tc, a[1] + bay * tc);

    return vec2_dist_sq(tp, p) <= cr * cr;
}

// point closest
export function point_closest_line(a: vec2_t, b: vec2_t, p: vec2_t): vec2_t {
    const bax = b[0] - a[0], bay = b[1] - a[1];
    const pax = p[0] - a[0], pay = p[1] - a[1];
    const t = (bax * pax + bay * pay) / (bax * bax + bay * bay);
    const tc = clamp(t, 0.0, 1.0);

    return vec2(a[0] + bax * tc, a[1] + bay * tc);
}

export function point_closest_circle(cp: vec2_t, cr: number, p: vec2_t): vec2_t {
    const d = vec2_dir1(p, cp);

    return vec2_addmuls1(cp, d, cr);
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
    const dp = vec2_sub1(p, bp);
    const lp = vec2_rotate_origin1(dp, -a);
    const cp = point_closest_aabb(vec2(), bs, lp);
    const cpr = vec2_add2(vec2_rotate_origin1(cp, a), bp);

    return cpr;
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
    const dp = vec2_sub1(p, pos);
    const lp = vec2_rotate_origin1(dp, -a);
    const cp = point_closest_convex(points, lp);
    const cpr = vec2_add2(vec2_rotate_origin1(cp, a), pos);

    return cpr;
}

export function point_closest_capsule(a: vec2_t, b: vec2_t, cr: number, p: vec2_t): vec2_t {
    const bax = b[0] - a[0], bay = b[1] - a[1];
    const pax = p[0] - a[0], pay = p[1] - a[1];
    const t = (bax * pax + bay * pay) / (bax * bax + bay * bay);
    const tc = clamp(t, 0.0, 1.0);
    const tp = vec2(a[0] + bax * tc, a[1] + bay * tc);
    const d = vec2_dir1(p, tp);

    return vec2_addmuls1(tp, d, cr);
}

// line intersect
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
    const local_a = vec2_rotate_origin1(vec2_sub1(a, bp), -br);
    const local_b = vec2_rotate_origin1(vec2_sub1(b, bp), -br);
    const local_bp: vec2_t = vec2(0, 0);
    const local_bs = vec2(bs[0], bs[1]);
    const intersections = line_intersect_aabb(local_bp, local_bs, local_a, local_b);

    for (const inter of intersections) {
        vec2_copy(inter, vec2_add2(vec2_rotate_origin1(inter, br), bp));
    }

    return intersections;
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
    const local_a = vec2_rotate_origin1(vec2_sub1(a, bp), -br);
    const local_b = vec2_rotate_origin1(vec2_sub1(b, bp), -br);
    const intersections = line_intersect_convex(points, local_a, local_b);

    for (const inter of intersections) {
        vec2_copy(inter, vec2_add2(vec2_rotate_origin1(inter, br), bp));
    }

    return intersections;
}

export function line_intersect_capsule(a0: vec2_t, b0: vec2_t, cr: number, a1: vec2_t, b1: vec2_t): vec2_t[] {
    const d = vec2_dir1(a0, b0);
    const dp = vec2(-d[1], d[0]);
    const start0 = vec2_addmuls1(a0, dp, -cr);
    const start1 = vec2_addmuls1(a0, dp, cr);
    const end0 = vec2_addmuls1(b0, dp, -cr);
    const end1 = vec2_addmuls1(b0, dp, cr);

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

// sat
export type sat_return = {
    collision: boolean;
    mtv: vec2_t;
    overlap: number;
};

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

function transform_polygon(points: vec2_t[], position: vec2_t, angle: number): vec2_t[] {
    return points.map(p => {
        const rotated = vec2_rotate_origin1(p, angle);
        return vec2(rotated[0] + position[0], rotated[1] + position[1]);
    });
}

export function sat(points_0: vec2_t[], pos_0: vec2_t, angle_0: number, points_1: vec2_t[], pos_1: vec2_t, angle_1: number): sat_return {
    let min_overlap = Infinity;
    let smallest_axis: vec2_t | null = null;

    const transformed_0 = transform_polygon(points_0, pos_0, angle_0);
    const transformed_1 = transform_polygon(points_1, pos_1, angle_1);

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
        const direction = vec2_sub1(pos_1, pos_0);

        if (direction[0] * smallest_axis[0] + direction[1] * smallest_axis[1] < 0) {
            smallest_axis = vec2(-smallest_axis[0], -smallest_axis[1]);
        }

        return {
            collision: true,
            mtv: vec2(smallest_axis[0], smallest_axis[1]),
            overlap: min_overlap
        };
    }

    return {
        collision: false,
        mtv: vec2(),
        overlap: 0.0
    };
}

export function circle_intersect_circle(p0: vec2_t, r0: number, p1: vec2_t, r1: number): boolean {
    return vec2_dist_sq(p0, p1) <= (r0 + r1) * (r0 + r1);
}
