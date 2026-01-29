"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  BrowserCounter: () => BrowserCounter,
  NodeCounter: () => NodeCounter
});
module.exports = __toCommonJS(index_exports);

// src/adapter/browserCounter.ts
var BrowserCounter = class {
  constructor(worker) {
    this.listeners = [];
    this.worker = worker;
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
};

// src/adapter/nodeCounter.ts
var NodeCounter = class {
  constructor(worker) {
    this.listeners = [];
    this.worker = worker;
    if (isMockWorker(worker)) {
      worker.on.message = (v) => {
        this.listeners.forEach((cb) => cb(v));
      };
    } else {
      worker.on("message", (v) => {
        this.listeners.forEach((cb) => cb(v));
      });
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
};
function isMockWorker(worker) {
  return worker && "on" in worker && "message" in worker.on;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BrowserCounter,
  NodeCounter
});
