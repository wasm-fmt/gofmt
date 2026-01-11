/* @ts-self-types="./gofmt_entry.d.ts" */
/**
 * Loads the Wasm module via source phase import.
 * @module
 */
// prettier-ignore
import source wasmModule from "./gofmt.wasm";
import { format as _format } from "./gofmt.js";
/**
 * @import * as WASM from "./gofmt.wasm"
 */

const instance = new WebAssembly.Instance(wasmModule);

/**
 * @type {WASM}
 */
const wasm = instance.exports;
wasm._initialize();

export function format(source) {
	return _format(wasm, source);
}
