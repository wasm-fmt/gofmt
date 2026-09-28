//go:build tinygo

package main

import bridge "github.com/wasm-fmt/bridge/fdk-go"

var engine = bridge.NewEngine(gofmtFormatter{})

//go:wasmexport wasm_fmt_abi_version
func WasmFmtABIVersion() uint32 {
	return bridge.ABIVersion
}

//go:wasmexport wasm_fmt_alloc
func WasmFmtAlloc(size uint32) uint32 {
	return engine.Alloc(size)
}

//go:wasmexport wasm_fmt_reset
func WasmFmtReset() {
	engine.Reset()
}

//go:wasmexport wasm_fmt_register_config
func WasmFmtRegisterConfig(id uint32, ptr uint32, length uint32) uint32 {
	return engine.RegisterConfig(id, ptr, length)
}

//go:wasmexport wasm_fmt_release_config
func WasmFmtReleaseConfig(id uint32) {
	engine.ReleaseConfig(id)
}

//go:wasmexport wasm_fmt_format
func WasmFmtFormat(ptr uint32, length uint32) uint32 {
	return engine.Format(ptr, length)
}

//go:wasmexport wasm_fmt_output
func WasmFmtOutput() uint32 {
	return engine.Output()
}

//go:wasmexport wasm_fmt_error
func WasmFmtError() uint32 {
	return engine.Error()
}
