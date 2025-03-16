import {vec2_t} from "@cl/type.ts";
import {vec2, vec2_addmuls1, vec2_clone, vec2_copy} from "@cl/vec2.ts";
import {rad} from "./math.ts";

enum LSYS_ACTION_TYPE {
    FORWARD,
    ROTATE_CCW,
    ROTATE_CW,
    STACK_PUSH,
    STACK_POP,
    RULE,
    CALLBACK
};

export class lsys_action_t {
    type: LSYS_ACTION_TYPE;
    ref: string;
    actions: lsys_action_t[];
};

export function lsys_action_new(type: LSYS_ACTION_TYPE, ref = "") {
    const action = new lsys_action_t();
    action.type = type;
    action.ref = ref;
    action.actions = [];

    return action;
}

export type lsys_callback_t = (p0: vec2_t, w0: number, p1: vec2_t, w1: number, n: number) => void;

export type change_callback_t = (v: number, n: number, d: number) => number;

export function change_exp(r: number): change_callback_t {
    return function(v: number, n: number, d: number) {
        return v * Math.pow(r, n);
    }
}

export function change_exp1(r: number): change_callback_t {
    return function(v: number, n: number, d: number) {
        return v * r;
    }
}

export function change_deg(a: number): change_callback_t {
    return function(v: number, n: number, d: number) {
        return v + a * d;
    }
}

export class lsys_t {
    start_position: vec2_t;
    start_angle: number;
    start_width: number;
    start_length: number;

    change_angle: change_callback_t;
    on_forward: lsys_callback_t;
    change_width: change_callback_t;
    change_length: change_callback_t;

    rules: {[key: string]: lsys_action_t};
    callbacks: {[key: string]: lsys_callback_t};
};

export function lsys_new(start_position: vec2_t, start_angle: number, start_width: number, start_length: number): lsys_t {
    const lsys = new lsys_t();
    lsys.start_position = start_position;
    lsys.start_angle = start_angle;
    lsys.start_width = start_width;
    lsys.start_length = start_length;
    lsys.change_length = change_exp(0.98);
    lsys.change_width = change_exp(0.9);
    lsys.change_angle = change_deg(20.0);
    lsys.on_forward = () => {};
    lsys.rules = {};
    lsys.callbacks = {};

    return lsys;
}

export class lsys_state_t {
    position: vec2_t;
    angle: number;
    width: number;
    length: number;
};

export function lsys_state_new(position: vec2_t, angle: number, width: number, length: number): lsys_state_t {
    const state = new lsys_state_t();
    state.position = vec2_clone(position);
    state.angle = angle;
    state.width = width;
    state.length = length;

    return state;
}

export function lsys_parse(input: string): lsys_action_t[] {
    const actions: lsys_action_t[] = [];
    let expect_rule = false;
    let expect_callback = false;

    for (let i = 0; i < input.length; i += 1) {
        const c = input[i];

        switch (c) {
            case "F":
                actions.push(lsys_action_new(LSYS_ACTION_TYPE.FORWARD));

                break;
            case "-":
                actions.push(lsys_action_new(LSYS_ACTION_TYPE.ROTATE_CCW));

                break;
            case "+":
                actions.push(lsys_action_new(LSYS_ACTION_TYPE.ROTATE_CW));

                break;
            case "[":
                actions.push(lsys_action_new(LSYS_ACTION_TYPE.STACK_PUSH));

                break;
            case "]":
                actions.push(lsys_action_new(LSYS_ACTION_TYPE.STACK_POP));

                break;
            case "?":
                expect_rule = true;

                break;
            case "!":
                expect_callback = true;

                break;
            default:
                if (expect_rule) {
                    expect_rule = false;
                    actions.push(lsys_action_new(LSYS_ACTION_TYPE.RULE, c));
                } else if (expect_callback) {
                    expect_callback = false;
                    actions.push(lsys_action_new(LSYS_ACTION_TYPE.CALLBACK, c));
                }

                break;
        }
    }

    return actions;
}

export function lsys_add_rule(sys: lsys_t, key: string, input: string): void {
    const rule = lsys_action_new(LSYS_ACTION_TYPE.RULE);
    rule.actions = lsys_parse(input);

    sys.rules[key] = rule;
}

export function lsys_add_callback(sys: lsys_t, key: string, callback: lsys_callback_t): void {
    sys.callbacks[key] = callback;
}

function lsys_rec(sys: lsys_t, actions: lsys_action_t[], stack: lsys_state_t[], state: lsys_state_t, limit: number) {
    if (limit <= 0) {
        return;
    }

    for (const action of actions) {
        switch (action.type) {
            case LSYS_ACTION_TYPE.FORWARD:
                const dir = vec2(Math.cos(rad(state.angle)), Math.sin(rad(state.angle)));
                const next_position = vec2_addmuls1(state.position, dir, state.length);
                const next_width = sys.change_width(state.width, limit, 0);
                const next_length = sys.change_length(state.length, limit, 0);

                sys.on_forward(vec2_clone(state.position), state.width, next_position, next_width, limit);

                vec2_copy(state.position, next_position);
                state.width = next_width;
                state.length = next_length;

                break;
            case LSYS_ACTION_TYPE.ROTATE_CCW:
                state.angle = sys.change_angle(state.angle, limit, 1);

                break;
            case LSYS_ACTION_TYPE.ROTATE_CW:
                state.angle = sys.change_angle(state.angle, limit, -1);

                break;
            case LSYS_ACTION_TYPE.STACK_PUSH:
                stack.push(lsys_state_new(state.position, state.angle, state.width, state.length));

                break;
            case LSYS_ACTION_TYPE.STACK_POP:
                const temp = stack.pop();

                if (temp) {
                    state = temp;
                }

                break;
            case LSYS_ACTION_TYPE.RULE:
                const rule = sys.rules[action.ref];

                if (rule) {
                    lsys_rec(sys, rule.actions, stack, state, limit - 1);
                }

                break;
            case LSYS_ACTION_TYPE.CALLBACK:
                const callback = sys.callbacks[action.ref];

                if (callback) {
                    callback(vec2_clone(state.position), state.width, vec2_clone(state.position), state.width, limit);
                }

                break;
        }
    }
}

export function lsys_gen(sys: lsys_t, input: string, limit: number): void {
    const actions = lsys_parse(input);
    const state = lsys_state_new(sys.start_position, sys.start_angle, sys.start_width, sys.start_length);

    lsys_rec(sys, actions, [], state, limit);
};
