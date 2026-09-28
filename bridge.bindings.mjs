import { defineBindings } from "@wasm-fmt/bindgen";

export default defineBindings({
	name: "gofmt",
	wasm: "gofmt.wasm",
	adapter: "bindings/gofmt_binding.js",
	types: {
		main: "bindings/gofmt.d.ts",
	},
	outDir: ".",
});
