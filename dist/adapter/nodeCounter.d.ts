import { type WorkerLike } from "./types";
export declare class NodeCounter {
    private worker;
    private listeners;
    constructor(worker: WorkerLike);
    start(): void;
    stop(): void;
    reset(): void;
    onTick(cb: (v: number) => void): void;
}
//# sourceMappingURL=nodeCounter.d.ts.map