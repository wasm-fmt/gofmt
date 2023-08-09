import init from "./lib.js";
import wasm from "./lib.wasm?url";

export default function __wbg_init(input = wasm) {
    return init(input);
}

export * from "./lib.js";
