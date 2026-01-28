export interface WorkerLike {
    on: {
        message?: (data: any) => void;
        [event: string]: ((data: any) => void) | undefined;
    };
    postMessage(msg: any): void;
}
//# sourceMappingURL=types.d.ts.map