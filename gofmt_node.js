/* @ts-self-types="./gofmt_entry.d.ts" */
/**
 * Loads the Wasm module using Node's fs API.
 * Consider using `./esm` entry if your environment supports source phase import.
 * @module
 */
import { readFileSync } from "node:fs";
import { format as _format } from "./gofmt.js";

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
