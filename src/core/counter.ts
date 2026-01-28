export type TickListener = (value: number) => void;

export class CounterCore {
    private value = 0;
    private listeners: TickListener[] = [];

    next(): number {
        this.value += 1;
        this.listeners.forEach((l) => l(this.value));
        return this.value;
    }

    onTick(listener: TickListener): void {
        this.listeners.push(listener);
    }

    reset(): void {
        this.value = 0;
    }

    getValue(): number {
        return this.value;
    }
}
