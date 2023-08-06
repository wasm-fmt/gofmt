import { Go } from "./go_wasm.js";
const go = new Go();

let mod;

export async function format(input) {
  if (!mod) {
    const url = new URL("lib.wasm", import.meta.url);

    if (url.protocol === "file:") {
      const fs = await import("node:fs");
      const bytes = fs.readFileSync(url);
      mod = new WebAssembly.Module(bytes);
    } else if ("instantiateStreaming" in WebAssembly) {
      mod = await WebAssembly.compileStreaming(fetch(url), go.importObject);
    } else {
      const response = await fetch(url);
      const bytes = await response.arrayBuffer();
      mod = new WebAssembly.Module(bytes);
    }
  }

  const inst = new WebAssembly.Instance(mod, go.importObject);
  go.run(inst);

  const input_len = go.storeString(input);
  if (input_len < 0) {
    throw new Error(go.loadString(-input_len));
  }

  const output_len = inst.exports.format(input_len);
  return go.loadString(output_len);
}
