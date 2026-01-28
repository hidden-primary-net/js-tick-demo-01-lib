import type { Worker } from "node:worker_threads";
import type { WorkerLike } from "./types";
export declare class NodeCounter {
    private listeners;
    private worker;
    constructor(worker: WorkerLike | Worker);
    private emit;
    start(): void;
    stop(): void;
    reset(): void;
    onTick(cb: (v: number) => void): void;
}
//# sourceMappingURL=nodeCounter.d.ts.map