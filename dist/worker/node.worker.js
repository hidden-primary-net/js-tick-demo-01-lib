import {
  CounterCore
} from "../chunk-3XS2FNCH.js";

// src/worker/node.worker.ts
import { parentPort } from "worker_threads";
if (!parentPort) {
  throw new Error("Not running in a worker thread");
}
var counter = new CounterCore();
var intervalId;
counter.onTick((value) => {
  parentPort.postMessage(value);
});
parentPort.on("message", (msg) => {
  if (msg === "start") {
    intervalId ?? (intervalId = setInterval(() => counter.next(), 1e3));
  } else if (msg === "stop") {
    intervalId && clearInterval(intervalId);
    intervalId = void 0;
  } else if (msg === "reset") {
    counter.reset();
  }
});
