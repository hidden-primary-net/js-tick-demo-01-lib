export class NodeCounter {
    constructor(worker) {
        this.listeners = [];
        this.worker = worker;
        if (isMockWorker(worker)) {
            worker.on.message = (v) => {
                this.listeners.forEach((cb) => cb(v));
            };
        }
        else {
            worker.on("message", (v) => { this.listeners.forEach((cb) => cb(v)); });
        }
    }
    emit(v) {
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
    onTick(cb) {
        this.listeners.push(cb);
    }
}
// Type Guard für MockWorker
function isMockWorker(worker) {
    return worker && "on" in worker && "message" in worker.on;
}
//# sourceMappingURL=nodeCounter.js.map