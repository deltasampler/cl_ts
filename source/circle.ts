import {vec2_t} from "./type.ts";

export class circle_t {
    position: vec2_t;
    diameter: number;

    get radius(): number {
        return this.diameter / 2.0;
    }

    set radius(r: number) {
        this.diameter = r * 2.0;
    }
};

export function cl_circle(position: vec2_t, diameter: number): circle_t {
    const out = new circle_t();
    out.position = position;
    out.diameter = diameter;

    return out;
}

export function cl_circle_r(position: vec2_t, radius: number): circle_t {
    const out = new circle_t();
    out.position = position;
    out.diameter = radius * 2.0;

    return out;
}
