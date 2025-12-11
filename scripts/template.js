/**
 * ================== End of wasm_exec.js ==================
 */
let wasm;
async function __load(module, imports) {
	if (typeof Response === "function" && module instanceof Response) {
		if (typeof WebAssembly.instantiateStreaming === "function") {
			try {
				return await WebAssembly.instantiateStreaming(module, imports);
			} catch (e) {
				if (module.headers.get("Content-Type") != "application/wasm") {
					console.warn(
						"`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n",
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
		if (instance instanceof WebAssembly.Instance)
			return { instance, module };
		else return instance;
	}
}
function __finalize_init(instance) {
	return (wasm = instance);
}
function __init_memory(imports, maybe_memory) {}
export function initSync(module) {
	if (wasm !== undefined) return wasm;

	const go = new Go();
	const imports = go.importObject;

	__init_memory(imports);

	if (!(module instanceof WebAssembly.Module))
		module = new WebAssembly.Module(module);

	const instance = new WebAssembly.Instance(module, imports);

	go.run(instance);
	return __finalize_init(instance, module);
}
export default async function initAsync(input) {
	if (wasm !== undefined) return wasm;

	if (typeof input === "undefined")
		input = new URL("gofmt.wasm", import.meta.url);

	const go = new Go();
	const imports = go.importObject;

	if (
		typeof input === "string" ||
		(typeof Request === "function" && input instanceof Request) ||
		(typeof URL === "function" && input instanceof URL)
	) {
		input = fetch(input);
	}

	__init_memory(imports);

	const { instance, module } = await __load(await input, imports);

	go.run(instance);
	return __finalize_init(instance, module);
}
export function format(input) {
	const [err, result] = wasm.format(input);
	if (err) {
		throw new Error(result);
	}
	return result;
}
