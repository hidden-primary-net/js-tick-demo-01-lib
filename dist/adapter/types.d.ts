export interface WorkerLike {
    on: {
        [event: string]: ((data: any) => void) | undefined;
    };
    postMessage(msg: any): void;
}
//# sourceMappingURL=types.d.ts.map