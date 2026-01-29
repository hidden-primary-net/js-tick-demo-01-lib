"use strict";

// src/worker/node.worker.ts
var import_node_worker_threads = require("worker_threads");

// src/core/counter.ts
var CounterCore = class {
  constructor() {
    this.value = 0;
    this.listeners = [];
  }
  next() {
    this.value += 1;
    this.listeners.forEach((l) => l(this.value));
    return this.value;
  }
  onTick(listener) {
    this.listeners.push(listener);
  }
  reset() {
    this.value = 0;
  }
  getValue() {
    return this.value;
  }
};

// src/worker/node.worker.ts
if (!import_node_worker_threads.parentPort) {
  throw new Error("Not running in a worker thread");
}
var counter = new CounterCore();
var intervalId;
counter.onTick((value) => {
  import_node_worker_threads.parentPort.postMessage(value);
});
import_node_worker_threads.parentPort.on("message", (msg) => {
  if (msg === "start") {
    intervalId ?? (intervalId = setInterval(() => counter.next(), 1e3));
  } else if (msg === "stop") {
    intervalId && clearInterval(intervalId);
    intervalId = void 0;
  } else if (msg === "reset") {
    counter.reset();
  }
});
