package main

import (
	"bytes"
	gofmt "go/format"

	bridge "github.com/wasm-fmt/bridge/fdk-go"
)

type gofmtFormatter struct{}

func (gofmtFormatter) Format(source []byte, _ *string) bridge.FormatResult {
	output, err := formatSource(source)
	if err == nil && bytes.Equal(source, output) {
		return bridge.Unchanged()
	}
	return bridge.FromBytes(output, err)
}

func formatSource(source []byte) ([]byte, error) {
	return gofmt.Source(source)
}
