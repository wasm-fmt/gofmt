import source wasmModule from "./gofmt.wasm";
import { format as _format } from "./gofmt.js";
/**
 * @import * as WASM from "./gofmt.wasm"
 */

const instance = new WebAssembly.Instance(wasmModule);

/**
 * @type {WASM}
 */
let wasm = instance.exports;
wasm._initialize();

export function initSync() {
	return wasm;
}

export default async function initAsync() {
	return wasm;
}

export function format(source) {
	return _format(wasm, source);
}
