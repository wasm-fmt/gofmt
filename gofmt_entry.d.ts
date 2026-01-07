export type InitInput =
	| RequestInfo
	| URL
	| Response
	| BufferSource
	| WebAssembly.Module;
export type SyncInitInput = BufferSource | WebAssembly.Module;
import type * as InitOutput from "./gofmt.d.wasm.ts";

export default function initAsync(
	init_input?: InitInput | Promise<InitInput>,
): Promise<InitOutput>;
export declare function initSync(buffer_or_module: SyncInitInput): InitOutput;
export declare function format(input: string): string;
