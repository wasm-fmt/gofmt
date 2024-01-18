export type InitInput =
	| RequestInfo
	| URL
	| Response
	| BufferSource
	| WebAssembly.Module;

export default function initAsync(wasm_url?: InitInput): Promise<void>;
export declare function initSync(module: BufferSource | WebAssembly.Module): void;
export declare function format(input: string): string;
