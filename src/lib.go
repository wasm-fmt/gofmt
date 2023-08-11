package main

import (
	"go/format"
	"syscall/js"
)

func Format(this js.Value, args []js.Value) any {
	input := ([]byte)(args[0].String())

	output, err := format.Source(input)
	if err != nil {
		return []any{true, err.Error()}
	}

	return []any{false, string(output)}
}

func main() {
	done := make(chan bool)
	js.Global().Set("format", js.FuncOf(Format))
	<-done
}
