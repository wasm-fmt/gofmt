export type InitInput =
	| RequestInfo
	| URL
	| Response
	| BufferSource
	| WebAssembly.Module;

export default function init(wasm_url?: InitInput): Promise<void>;
export declare function format(input: string): string;
