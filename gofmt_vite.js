/* @ts-self-types="./gofmt_web.d.ts" */
import init from "./gofmt.wasm?init";
import initAsync from "./gofmt_web.js";
import { format as _format } from "./gofmt_binding.js";

let wasm, wasmModule;

function finalize_init(instance, module) {
	wasm = instance.exports;
	wasmModule = module;
	wasm._initialize();
	return wasm;
}

export default async function initAsync() {
	if (wasm !== void 0) return wasm;
	const instance = await init();
	return finalize_init(instance);
}

export function initSync(module) {
	if (wasm !== void 0) return wasm;

	if (!(module instanceof WebAssembly.Module)) {
		module = new WebAssembly.Module(module);
	}
	const instance = new WebAssembly.Instance(module);
	return finalize_init(instance, module);
}

export function format(source) {
	return _format(wasm, source);
}
