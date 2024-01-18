import initAsync from "./gofmt.js";
import wasm_url from "./gofmt.wasm?url";

export default function (input = wasm_url) {
	return initAsync(input);
}

export * from "./gofmt.js";
