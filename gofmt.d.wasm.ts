/**
 * WebAssembly module for gofmt.
 * @module
 */
export declare const memory: WebAssembly.Memory;
export declare function _initialize(): void;
export declare function alloc(size: number): number;
export declare function dispose(): void;
export declare function format(): 0 | 1 | 2;
export declare function output_ptr(): number;
export declare function output_len(): number;
