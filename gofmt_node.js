import fs from "node:fs/promises";
import initAsync from "./gofmt.js";

const wasm = new URL("./gofmt.wasm", import.meta.url);

export default function (init = fs.readFile(wasm)) {
	return initAsync(init);
}

export * from "./gofmt.js";
