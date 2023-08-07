import { Go } from "./go_wasm.js";
const go = new Go();

let mod;

export async function format(input, wasm_url) {
  if (!mod) {
    if (!wasm_url) {
      wasm_url = new URL("lib.wasm", import.meta.url);
    }

    if (typeof wasm_url === "string") {
      wasm_url = new URL(wasm_url);
    }

    if (wasm_url.protocol === "file:") {
      const fs = await import("node:fs");
      const bytes = fs.readFileSync(wasm_url);
      mod = new WebAssembly.Module(bytes);
    } else if ("instantiateStreaming" in WebAssembly) {
      mod = await WebAssembly.compileStreaming(fetch(wasm_url), go.importObject);
    } else {
      const response = await fetch(wasm_url);
      const bytes = await response.arrayBuffer();
      mod = new WebAssembly.Module(bytes);
    }
  }

  const inst = new WebAssembly.Instance(mod, go.importObject);
  go.run(inst);

  const input_len = go.storeString(input);
  const output_len = inst.exports.format(input_len);
  if (output_len < 0) {
    throw new Error(go.loadString(-output_len));
  }

  return go.loadString(output_len);
}
