import {vec2_t} from "./type.ts";
import {cl_vec2, cl_vec2_add_mul_s, cl_vec2_dir, cl_vec2_dist_sq} from "./vec2.ts";
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
