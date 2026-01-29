// src/worker/node.worker.ts
import { parentPort } from "node:worker_threads";
import { CounterCore } from "../core/counter";

if (!parentPort) {
    throw new Error("Not running in a worker thread");
}

const counter = new CounterCore();
let intervalId: NodeJS.Timeout | undefined;

counter.onTick((value) => {
    parentPort!.postMessage(value);
});

parentPort.on("message", (msg) => {
    if (msg === "start") {
        intervalId ??= setInterval(() => counter.next(), 1000);
    } else if (msg === "stop") {
        intervalId && clearInterval(intervalId);
        intervalId = undefined;
    } else if (msg === "reset") {
        counter.reset();
    }
});
