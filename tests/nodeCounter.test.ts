import { describe, it, expect } from "vitest";
import { NodeCounter } from "../src/adapter/nodeCounter";
import { WorkerLike } from "../src/adapter/types";

class MockNodeWorker implements WorkerLike {
    on: any = {};
    interval?: ReturnType<typeof setInterval>;

    postMessage(msg: string) {
        if (msg === "start") {
            let val = 0;
            this.interval = setInterval(() => {
                val++;
                this.on["message"]?.(val);
            }, 10);
        } else if (msg === "stop" || msg === "reset") {
            if (this.interval)
                clearInterval(this.interval);
            this.interval = undefined;
        }
    }
}

describe("NodeCounter (mocked)", () => {
    it("emits values via onTick", async () => {
        const counter = new NodeCounter(new MockNodeWorker());

        const results: number[] = [];
        counter.onTick((v) => results.push(v));

        counter.start();

        await new Promise((r) => setTimeout(r, 35));

        counter.stop();

        expect(results.length).toBeGreaterThanOrEqual(3);
        expect(results[0]).toBe(1);
        expect(results[1]).toBe(2);
        expect(results[2]).toBe(3);
    });
});
