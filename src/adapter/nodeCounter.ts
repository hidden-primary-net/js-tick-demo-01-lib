import { type WorkerLike } from "./types";

export class NodeCounter {
    private worker: WorkerLike;
    private listeners: Array<(v: number) => void> = [];

    constructor(worker: WorkerLike) {
        this.worker = worker;

        this.worker.on["message"] = (v: any) => {
            this.listeners.forEach((cb) => cb(v));
        };
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
