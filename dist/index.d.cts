import { Worker as Worker$1 } from 'node:worker_threads';

interface WorkerLike {
    on: {
        message?: (data: any) => void;
        [event: string]: ((data: any) => void) | undefined;
    };
    postMessage(msg: any): void;
}

declare class BrowserCounter {
    private worker;
    private listeners;
    constructor(worker: Worker);
    start(): void;
    stop(): void;
    reset(): void;
    onTick(cb: (v: number) => void): void;
}

declare class NodeCounter {
    private listeners;
    private worker;
    constructor(worker: WorkerLike | Worker$1);
    private emit;
    start(): void;
    stop(): void;
    reset(): void;
    onTick(cb: (v: number) => void): void;
}

export { BrowserCounter, NodeCounter, type WorkerLike };
