/* @ts-self-types="./gofmt.d.ts" */
// prettier-ignore
import source wasmModule from "./gofmt.wasm";
import { format as _format } from "./gofmt_binding.js";
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
