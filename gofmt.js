/* @ts-self-types="./gofmt.d.ts" */
import wasm from "./gofmt.wasm";
import { format as _format } from "./gofmt_binding.js";

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
