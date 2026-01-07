/* @ts-self-types="./gofmt_entry.d.ts" */
import initAsync from "./gofmt_web.js";
import wasm_url from "./gofmt.wasm?url";

export default function (input = wasm_url) {
	return initAsync(input);
}

export * from "./gofmt_web.js";
