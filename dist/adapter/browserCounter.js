export class BrowserCounter {
    constructor(worker) {
        this.listeners = [];
        this.worker = worker;
        // Nachrichten vom Worker weitergeben
        this.worker.onmessage = (e) => {
            this.listeners.forEach((cb) => cb(e.data));
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
//# sourceMappingURL=browserCounter.js.map