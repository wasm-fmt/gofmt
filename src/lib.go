//go:build tinygo

package main

import (
	"bytes"
	"unsafe"

	gofmt "go/format"
)

var (
	input, output []byte
)

//go:wasmexport alloc
func alloc(size uint32) uint32 {
	if size == 0 {
		input = nil
		return 0
	}

	input = make([]byte, size)
	return uint32(uintptr(unsafe.Pointer(&input[0])))
}

//go:wasmexport dispose
func dispose() {
	input = nil
	output = nil
}

//go:wasmexport format
func format() uint32 {
	var err error
	output, err = gofmt.Source(input)
	if err != nil {
		output = []byte(err.Error())
		return 2
	}

	if bytes.Equal(input, output) {
		return 0
	}

	return 1
}

//go:wasmexport output_ptr
func outputPtr() uint32 {
	if len(output) == 0 {
		return 0
	}
	return uint32(uintptr(unsafe.Pointer(&output[0])))
}

//go:wasmexport output_len
func outputLen() uint32 {
	return uint32(len(output))
}
