package main

import (
	"go/format"
	"syscall/js"
)

func Format(this js.Value, args []js.Value) any {
	input := ([]byte)(args[0].String())

	output, err := format.Source(input)
	if err != nil {
		return []interface{}{true, err.Error()}
	}

	return []interface{}{false, string(output)}
}

func main() {
	done := make(chan bool)
	js.Global().Set("format", js.FuncOf(Format))
	<-done
}
