export class CounterCore {
    constructor() {
        this.value = 0;
    }
    next() {
        this.value += 1;
        return this.value;
    }
    reset() {
        this.value = 0;
    }
    getValue() {
        return this.value;
    }
}
//# sourceMappingURL=counter.js.map