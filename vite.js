import init from "./gofmt.js";
import wasm_url from "./gofmt.wasm?url";

export default function (input = wasm_url) {
	return init(input);
}

export * from "./gofmt.js";
