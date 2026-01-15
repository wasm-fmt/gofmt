/**
 * @import * as WASM from "./gofmt.wasm"
 */

/**
 * @param {WASM} wasm
 * @param {string} source
 * @return {string}
 */
export function format(wasm, source) {
	try {
		writeStringToWasmMemory(wasm, source);
		const result = wasm.format();
		if (result === 0) {
			return source;
		}

		const ptr = wasm.output_ptr();
		const length = wasm.output_len();
		const text = readStringFromWasmMemory(wasm, ptr, length);

		if (result === 1) {
			return text;
		}

		throw new Error(text);
	} finally {
		wasm.dispose();
	}
}

/**
 * @param {WASM} wasm
 * @param {string} str
 */
function writeStringToWasmMemory(wasm, str) {
	const bytes = encoder.encode(str);
	const ptr = wasm.alloc(bytes.length);
	const memory = new Uint8Array(wasm.memory.buffer, ptr, bytes.length);
	memory.set(bytes);
}

function readStringFromWasmMemory(wasm, ptr, length) {
	const memory = new Uint8Array(wasm.memory.buffer, ptr, length);
	return decoder.decode(memory);
}

const encoder = new TextEncoder();
const decoder = new TextDecoder();
