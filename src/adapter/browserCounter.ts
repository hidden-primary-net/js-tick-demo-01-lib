export class BrowserCounter {
    private worker: Worker;
    private listeners: Array<(v: number) => void> = [];

    constructor(worker: Worker) {
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

    onTick(cb: (v: number) => void) {
        this.listeners.push(cb);
    }
}
