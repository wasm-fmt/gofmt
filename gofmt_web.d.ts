/**
 * gofmt entry with initialization functions.
 * @module
 */
export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;
export type SyncInitInput = BufferSource | WebAssembly.Module;
import type * as InitOutput from "./gofmt.wasm";

/**
 * Initializes the WASM module asynchronously.
 * @param init_input - Optional URL/path to the WASM file, or any valid InitInput
 */
export default function initAsync(init_input?: InitInput): Promise<InitOutput>;
/**
 * Initializes the WASM module synchronously.
 * @param buffer_or_module - The WASM module or buffer source
 */
export declare function initSync(buffer_or_module: BufferSource | WebAssembly.Module): InitOutput;

export * from "gofmt_entry.d.ts";
