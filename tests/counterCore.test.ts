import { describe, it, expect, beforeEach } from "vitest";
import { CounterCore } from "../src/core/counter";

describe("CounterCore", () => {
    let counter: CounterCore;

    beforeEach(() => {
        counter = new CounterCore();
    });

    it("starts at 0", () => {
        expect(counter.getValue()).toBe(0);
    });

    it("increments value on next()", () => {
        expect(counter.next()).toBe(1);
        expect(counter.next()).toBe(2);
    });

    it("reset sets value back to 0", () => {
        counter.next();
        counter.next();
        counter.reset();

        expect(counter.getValue()).toBe(0);
    });
});
