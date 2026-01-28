export class CounterCore {
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
}
//# sourceMappingURL=counter.js.map