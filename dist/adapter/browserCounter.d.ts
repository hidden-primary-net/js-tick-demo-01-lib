export declare class BrowserCounter {
    private worker;
    private listeners;
    constructor(worker: Worker);
    start(): void;
    stop(): void;
    reset(): void;
    onTick(cb: (v: number) => void): void;
}
//# sourceMappingURL=browserCounter.d.ts.map