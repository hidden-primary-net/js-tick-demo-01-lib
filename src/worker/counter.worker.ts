import { CounterCore } from "../core/counter";

// 1. CounterCore erzeugen
const counter = new CounterCore();

// 2. Interval-Variable
let intervalId: number | undefined;

// 3. TickListener: postMessage an Main Thread
counter.onTick((value) => {
    self.postMessage(value);
});

// 4. Worker Nachrichten behandeln
self.onmessage = (e: MessageEvent) => {
    if (e.data === "start") {
        if (!intervalId) {
            intervalId = setInterval(() => {
                counter.next();
            }, 1000) as unknown as number; // TS braucht Typcast
        }
    } else if (e.data === "stop") {
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = undefined;
        }
    } else if (e.data === "reset") {
        counter.reset();
    }
};
