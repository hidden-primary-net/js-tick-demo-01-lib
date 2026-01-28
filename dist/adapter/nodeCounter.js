import {} from "./types";
export class NodeCounter {
    constructor(worker) {
        this.listeners = [];
        this.worker = worker;
        this.worker.on["message"] = (v) => {
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
    onTick(cb) {
        this.listeners.push(cb);
    }
}
//# sourceMappingURL=nodeCounter.js.map