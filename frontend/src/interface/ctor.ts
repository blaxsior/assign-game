export type IConstructor<T, P extends any[] = any[]> = new (...args: P) => T;

// export type IConstructor<T> = new (...args: any) => T;
export type Constructor = new (...args: any) => any;