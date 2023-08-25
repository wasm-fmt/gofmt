import init from "./lib.js";
import wasm_url from "./lib.wasm?url";

export default function (input = wasm_url) {
    return init(input);
}

export * from "./lib.js";
