export type TickListener = (value: number) => void;
export declare class CounterCore {
    private value;
    private listeners;
    next(): number;
    onTick(listener: TickListener): void;
    reset(): void;
    getValue(): number;
}
//# sourceMappingURL=counter.d.ts.map