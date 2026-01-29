import {
  CounterCore
} from "../chunk-3XS2FNCH.js";

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
