/* @ts-self-types="./gofmt.d.ts" */
import wasm from "./gofmt.wasm";
import { format as _format } from "./gofmt_binding.js";

wasm._initialize();

export function format(source) {
	return _format(wasm, source);
}
