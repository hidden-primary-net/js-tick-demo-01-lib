export class CounterCore {
    private value = 0;

    next(): number {
        this.value += 1;
        return this.value;
    }

    reset(): void {
        this.value = 0;
    }

    getValue(): number {
        return this.value;
    }
}
