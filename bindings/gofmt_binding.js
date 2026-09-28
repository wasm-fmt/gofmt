// @ts-check

/** @type {import("@wasm-fmt/runtime").FormatterAdapter<typeof import("./gofmt.d.ts")>} */
const adapter = {
	create(wasm, host) {
		const runtime = host.createRuntime(wasm);

		/** @type {typeof import("./gofmt.d.ts")} */
		const api = {
			/**
			 * @param {string} source
			 * @param {string} [path]
			 */
			format(source, path) {
				return runtime.format(source, path);
			},
		};
		return api;
	},
};

export default adapter;
