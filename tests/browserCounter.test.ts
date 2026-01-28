import { describe, it, expect } from "vitest";
import { BrowserCounter } from "../src/adapter/browserCounter";

class MockWorker {
    onmessage: ((e: { data: number }) => void) | null = null;
    interval?: ReturnType<typeof setInterval>;

    postMessage(msg: string) {
        if (msg === "start") {
            let val = 0;
            this.interval = setInterval(() => {
                val++;
                this.onmessage?.({ data: val });
            }, 10); // sehr schnell für Tests
        } else if (msg === "stop" || msg === "reset") {
            if (this.interval)
                clearInterval((this as any).interval);
            this.interval = undefined;
        }
    }
}

describe("BrowserCounter (mocked)", () => {
    it("emits values via onTick", async () => {
        const worker = new MockWorker() as any;
        const counter = new BrowserCounter(worker);

        const results: number[] = [];
        counter.onTick((v) => results.push(v));

        counter.start();

        // kurz warten, damit 3 Ticks durchlaufen
        await new Promise((r) => setTimeout(r, 35));

        counter.stop();

        expect(results.length).toBeGreaterThanOrEqual(3);
        expect(results[0]).toBe(1);
        expect(results[1]).toBe(2);
        expect(results[2]).toBe(3);
    });
});
