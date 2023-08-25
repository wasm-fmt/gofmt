import { Go } from "./go_wasm.js";
const go = new Go();

let wasm;

export default async function init(input) {
    if (wasm) {
        await wasm;
        return;
    }

    wasm = load(input, go.importObject);
    wasm = await wasm;
    go.run(wasm.instance);
}

async function load(module, importObject) {
    switch (typeof module) {
        case "undefined":
            module = "lib.wasm";
        case "string":
            module = new URL(module, import.meta.url);
    }

    if (module instanceof URL || module instanceof Request) {
        if (
            typeof __webpack_require__ !== "function" &&
            module.protocol === "file:"
        ) {
            const fs = await import("node:fs/promises");
            module = await fs.readFile(module);
        } else {
            module = await fetch(module);
        }
    }

    if (module instanceof Response) {
        if ("instantiateStreaming" in WebAssembly) {
            try {
                return await WebAssembly.instantiateStreaming(
                    module,
                    importObject
                );
            } catch (e) {
                if (module.headers.get("Content-Type") != "application/wasm") {
                    console.warn(
                        "`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n",
                        e
                    );
                } else {
                    throw e;
                }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, importObject);
    }
    const instance = await WebAssembly.instantiate(module, importObject);

    if (instance instanceof WebAssembly.Instance) {
        return { instance, module };
    }

    return instance;
}

export function format(input) {
    const [err, result] = wasm.format(input);
    if (err) {
        throw new Error(result);
    }

    return result;
}
