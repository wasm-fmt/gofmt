/* @ts-self-types="./gofmt.d.ts" */
import { readFileSync } from "node:fs";
import { format as _format } from "./gofmt_binding.js";

const wasmUrl = new URL("gofmt.wasm", import.meta.url);
const wasmBytes = readFileSync(wasmUrl);
const wasmModule = new WebAssembly.Module(wasmBytes);

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
