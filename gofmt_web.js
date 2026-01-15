/* @ts-self-types="./gofmt_web.d.ts" */
import { format as _format } from "./gofmt_binding.js";
let wasm, wasmModule;

async function load(module, imports) {
	if (typeof Response === "function" && module instanceof Response) {
		if (typeof WebAssembly.instantiateStreaming === "function") {
			try {
				return await WebAssembly.instantiateStreaming(module, imports);
			} catch (e) {
				const validResponse = module.ok && expectedResponseType(module.type);

				if (validResponse && module.headers.get("Content-Type") !== "application/wasm") {
					console.warn(
						"`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n",
						e,
					);
				} else {
					throw e;
				}
			}
		}

		const bytes = await module.arrayBuffer();
		return await WebAssembly.instantiate(bytes, imports);
	} else {
		const instance = await WebAssembly.instantiate(module, imports);

		if (instance instanceof WebAssembly.Instance) {
			return { instance, module };
		} else {
			return instance;
		}
	}

	function expectedResponseType(type) {
		switch (type) {
			case "basic":
			case "cors":
			case "default":
				return true;
		}
		return false;
	}
}

function finalize_init(instance, module) {
	((wasm = instance.exports), (wasmModule = module));
	wasm._initialize();
	return wasm;
}

export function initSync(buffer_or_module) {
	if (wasm !== void 0) return wasm;

	if (!(buffer_or_module instanceof WebAssembly.Module)) {
		buffer_or_module = new WebAssembly.Module(buffer_or_module);
	}
	const instance = new WebAssembly.Instance(buffer_or_module);
	return finalize_init(instance, buffer_or_module);
}

export default async function initAsync(init_input) {
	if (wasm !== void 0) return wasm;

	if (init_input === void 0) {
		init_input = new URL("gofmt.wasm", import.meta.url);
	}

	if (
		typeof init_input === "string" ||
		(typeof Request === "function" && init_input instanceof Request) ||
		(typeof URL === "function" && init_input instanceof URL)
	) {
		init_input = fetch(init_input);
	}

	const { instance, module } = await load(await init_input);

	return finalize_init(instance, module);
}

export function format(source) {
	return _format(wasm, source);
}
