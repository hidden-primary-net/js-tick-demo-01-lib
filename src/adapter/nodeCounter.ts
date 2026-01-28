import type { Worker } from "node:worker_threads";
import type { WorkerLike } from "./types";

export class NodeCounter {
    private listeners: Array<(v: number) => void> = [];
    private worker: WorkerLike | Worker;

    constructor(worker: WorkerLike | Worker) {
        this.worker = worker;

        if (isMockWorker(worker)) {
            worker.on.message = (v: any) => {
                this.listeners.forEach((cb) => cb(v));
            };
        } else {
            worker.on("message", (v) => { this.listeners.forEach((cb) => cb(v)); });
        }
    }

    private emit(v: any) {
        this.listeners.forEach((cb) => cb(v));
    }

    start() {
        this.worker.postMessage("start");
    }

    stop() {
        this.worker.postMessage("stop");
    }

    reset() {
        this.worker.postMessage("reset");
    }

    onTick(cb: (v: number) => void) {
        this.listeners.push(cb);
    }
}

// Type Guard für MockWorker
function isMockWorker(worker: any): worker is WorkerLike {
    return worker && "on" in worker && "message" in worker.on;
}
