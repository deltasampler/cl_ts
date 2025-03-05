import {vec2_t} from "./type.ts";
import {cl_vec2, cl_vec2_add_mul_s, cl_vec2_dir, cl_vec2_dist, cl_vec2_dist_sq} from "./vec2.ts";
import {cl_abs, cl_clamp} from "./math.ts";

export function point_inside_circle(cp: vec2_t, cr: number, p: vec2_t): boolean {
    return cl_vec2_dist_sq(cp, p) <= cr * cr;
}

export function point_inside_capsule(a: vec2_t, b: vec2_t, cr: number, p: vec2_t) {
    const bax = b[0] - a[0], bay = b[1] - a[1];
    const pax = p[0] - a[0], pay = p[1] - a[1];
    const t = (bax * pax + bay * pay) / (bax * bax + bay * bay);
    const tc = cl_clamp(t, 0.0, 1.0);
    const tp = cl_vec2(a[0] + bax * tc, a[1] + bay * tc);

    return cl_vec2_dist_sq(tp, p) <= cr * cr;
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

    return point_inside_convex(points, cl_vec2(lx, ly));
}

export function point_closest_circle(cp: vec2_t, cr: number, p: vec2_t): vec2_t {
    const d = cl_vec2_dir(p, cp);

    return cl_vec2_add_mul_s(cp, d, cr);
}

export function point_closest_line(a: vec2_t, b: vec2_t, p: vec2_t): vec2_t {
    const bax = b[0] - a[0], bay = b[1] - a[1];
    const pax = p[0] - a[0], pay = p[1] - a[1];
    const t = (bax * pax + bay * pay) / (bax * bax + bay * bay);
    const tc = cl_clamp(t, 0.0, 1.0);

    return cl_vec2(a[0] + bax * tc, a[1] + bay * tc);
}

export function point_closest_capsule(a: vec2_t, b: vec2_t, cr: number, p: vec2_t): vec2_t {
    const bax = b[0] - a[0], bay = b[1] - a[1];
    const pax = p[0] - a[0], pay = p[1] - a[1];
    const t = (bax * pax + bay * pay) / (bax * bax + bay * bay);
    const tc = cl_clamp(t, 0.0, 1.0);
    const tp = cl_vec2(a[0] + bax * tc, a[1] + bay * tc);
    const d = cl_vec2_dir(p, tp);

    return cl_vec2_add_mul_s(tp, d, cr);
}

export function point_closest_aabb(bp: vec2_t, bs: vec2_t, p: vec2_t): vec2_t {
    const [bx, by] = bp;
    const [px, py] = p;
    const sx = bs[0] / 2, sy = bs[1] / 2;
    const minx = bx - sx, miny = by - sy;
    const maxx = bx + sx, maxy = by + sy;

    const cx = cl_abs(minx - px) < cl_abs(maxx - px) ? minx : maxx;
    const cy = cl_abs(miny - py) < cl_abs(maxy - py) ? miny : maxy;

    const ex = point_closest_line(cl_vec2(cx, miny), cl_vec2(cx, maxy), p);
    const ey = point_closest_line(cl_vec2(minx, cy), cl_vec2(maxx, cy), p);

    if (cl_vec2_dist_sq(ex, p) < cl_vec2_dist_sq(ey, p)) {
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
    const [px2, py2] = point_closest_aabb(cl_vec2(), bs, cl_vec2(lx, ly));
    const lx2 = (px2 * cos2 - py2 * sin2) + cx;
    const ly2 = (px2 * sin2 + py2 * cos2) + cy;

    return cl_vec2(lx2, ly2);
}

export function point_closest_convex(points: vec2_t[], p: vec2_t): vec2_t {
    let closest;

    for (let i = 0; i < points.length; i += 1) {
        const a = points[i];
        const b = points[(i + 1) % points.length];
        const c = point_closest_line(a, b, p);

        if (!closest || cl_vec2_dist_sq(p, c) < cl_vec2_dist_sq(p, closest)) {
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
    const [px2, py2] = point_closest_convex(points, cl_vec2(lx, ly));
    const lx2 = (px2 * cos2 - py2 * sin2) + cx;
    const ly2 = (px2 * sin2 + py2 * cos2) + cy;

    return cl_vec2(lx2, ly2);
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
        points.push(cl_vec2(a[0] + t1 * dx, a[1] + t1 * dy));
    }

    if (t2 >= 0 && t2 <= 1) {
        points.push(cl_vec2(a[0] + t2 * dx, a[1] + t2 * dy));
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
        points.push(cl_vec2(a[0] + t_min * dx, a[1] + t_min * dy));
    }

    if (t_max > 0 && t_max < 1 && t_max !== t_min) {
        points.push(cl_vec2(a[0] + t_max * dx, a[1] + t_max * dy));
    }

    return points;
}

export function line_intersect_obb(bp: vec2_t, bs: vec2_t, br: number, a: vec2_t, b: vec2_t) {
    const cos_r = Math.cos(-br);
    const sin_r = Math.sin(-br);

    function rotate_point(p: vec2_t): vec2_t {
        const x = p[0] - bp[0];
        const y = p[1] - bp[1];
        return cl_vec2(
            x * cos_r - y * sin_r,
            x * sin_r + y * cos_r
        );
    }

    function rotate_back(p: vec2_t): vec2_t {
        const cos_r2 = Math.cos(br);
        const sin_r2 = Math.sin(br);
        return cl_vec2(
            p[0] * cos_r2 - p[1] * sin_r2 + bp[0],
            p[0] * sin_r2 + p[1] * cos_r2 + bp[1]
        );
    }

    const local_a = rotate_point(a);
    const local_b = rotate_point(b);
    const local_bp: vec2_t = cl_vec2(0, 0);
    const local_bs = cl_vec2(bs[0], bs[1]);

    const intersections = line_intersect_aabb(local_bp, local_bs, local_a, local_b);

    return intersections.map(rotate_back);
}

export function line_intersect_line(a0: vec2_t, b0: vec2_t, a1: vec2_t, b1: vec2_t): vec2_t[] {
    const x1 = a0[0], y1 = a0[1], x2 = b0[0], y2 = b0[1];
    const x3 = a1[0], y3 = a1[1], x4 = b1[0], y4 = b1[1];

    // Denominators for the system of equations
    const denom = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    
    // If denom is zero, the lines are parallel, so no intersection
    if (denom === 0) {
        return [];
    }

    // Calculate the intersection point (px, py)
    const px = ((x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4)) / denom;
    const py = ((x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4)) / denom;

    // Check if the intersection is within both line segments
    const t = ((px - x1) * (x2 - x1) + (py - y1) * (y2 - y1)) / ((x2 - x1) ** 2 + (y2 - y1) ** 2);
    const u = ((px - x3) * (x4 - x3) + (py - y3) * (y4 - y3)) / ((x4 - x3) ** 2 + (y4 - y3) ** 2);

    // If t and u are both between 0 and 1, the intersection is within the line segments
    if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
        return [cl_vec2(px, py)];
    }

    return [];
}

export function line_intersect_convex(points: vec2_t[], a: vec2_t, b: vec2_t): vec2_t[] {
    const intersections: vec2_t[] = [];

    // Iterate over each edge of the convex polygon
    for (let i = 0; i < points.length; i++) {
        const p1 = points[i];
        const p2 = points[(i + 1) % points.length]; // Next point (wrap around to first point)
        
        // Get intersections between line segment (a, b) and polygon edge (p1, p2)
        const edge_intersections = line_intersect_line(p1, p2, a, b);
        
        // Collect the intersection points
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
        return cl_vec2(
            x * cos_r - y * sin_r,
            x * sin_r + y * cos_r
        );
    }

    function rotate_back(p: vec2_t): vec2_t {
        const cos_r2 = Math.cos(br);
        const sin_r2 = Math.sin(br);
        return cl_vec2(
            p[0] * cos_r2 - p[1] * sin_r2 + bp[0],
            p[0] * sin_r2 + p[1] * cos_r2 + bp[1]
        );
    }

    const local_a = rotate_point(a);
    const local_b = rotate_point(b);

    const intersections = line_intersect_convex(points, local_a, local_b);

    return intersections.map(rotate_back);
}

export function line_intersect_capsule(a0: vec2_t, b0: vec2_t, cr: number, a1: vec2_t, b1: vec2_t): vec2_t[] {
    const d = cl_vec2_dir(a0, b0);
    const dp = cl_vec2(-d[1], d[0]);
    const start0 = cl_vec2_add_mul_s(a0, dp, -cr);
    const start1 = cl_vec2_add_mul_s(a0, dp, cr);
    const end0 = cl_vec2_add_mul_s(b0, dp, -cr);
    const end1 = cl_vec2_add_mul_s(b0, dp, cr);

    const out = [];

    for (const point of line_intersect_circle(a0, cr, a1, b1)) {
        if (cl_vec2_dist(point, point_closest_capsule(a0, b0, cr, point)) <= 0.001) {
            out.push(point);
        }
    }

    for (const point of line_intersect_circle(b0, cr, a1, b1)) {
        if (cl_vec2_dist(point, point_closest_capsule(a0, b0, cr, point)) <= 0.001) {
            out.push(point);
        }
    }

    out.push(...line_intersect_line(start0, end0, a1, b1));
    out.push(...line_intersect_line(start1, end1, a1, b1));

    if (out.length > 2) {
        console.log('test');
    }

    return out;
}
