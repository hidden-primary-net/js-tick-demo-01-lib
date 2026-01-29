"use strict";

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

// src/worker/browser.worker.ts
var counter = new CounterCore();
var intervalId;
counter.onTick((value) => {
  self.postMessage(value);
});
self.onmessage = (e) => {
  if (e.data === "start") {
    if (!intervalId) {
      intervalId = setInterval(() => {
        counter.next();
      }, 1e3);
    }
  } else if (e.data === "stop") {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = void 0;
    }
  } else if (e.data === "reset") {
    counter.reset();
  }
};
