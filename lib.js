import { Go } from "./go_wasm.js";
const go = new Go();

let inst;

export default async function init(wasm_url) {
    if (inst) {
        return await inst;
    }

    if (!wasm_url) {
        wasm_url = new URL("lib.wasm", import.meta.url);
    }

    if (typeof wasm_url === "string") {
        wasm_url = new URL(wasm_url);
    }

    if (
        typeof __webpack_require__ !== "function" &&
        wasm_url.protocol === "file:"
    ) {
        inst = import("node:fs/promises")
            .then((fs) => fs.readFile(wasm_url))
            .then((bytes) => WebAssembly.instantiate(bytes, go.importObject));
    } else if ("instantiateStreaming" in WebAssembly) {
        inst = WebAssembly.instantiateStreaming(
            fetch(wasm_url),
            go.importObject
        );
    } else {
        inst = fetch(wasm_url)
            .then((response) => response.arrayBuffer())
            .then((bytes) => WebAssembly.instantiate(bytes, go.importObject));
    }
    inst = (await inst).instance;
    go.run(inst);
}

export function format(input) {
    const [err, result] = inst.format(input);
    if (err) {
        throw new Error(result);
    }

    return result;
}
