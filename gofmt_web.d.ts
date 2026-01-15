/**
 * A wasm based golang formatter
 *
 * @example
 * ```ts
 * ```javascript
 * import init, { format } from "@wasm-fmt/gofmt";
 *
 * await init();
 *
 * const source = `
 * package main
 * import "fmt"
 * func main(){fmt.Println("Hello, 世界")
 * }
 * `;
 *
 * const formatted = format(source);
 * ```
 *
 * @module
 */

/**
 * Input types for asynchronous WASM initialization.
 * Can be a URL/path to fetch, a Response object, raw bytes, or a pre-compiled WebAssembly.Module.
 */
export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

/**
 * Input types for synchronous WASM initialization.
 * Must be raw bytes (BufferSource) or a pre-compiled WebAssembly.Module.
 */
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

export * from "./gofmt.d.ts";
