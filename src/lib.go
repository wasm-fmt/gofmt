package main

import "go/format"

const buf_len = 8192

var buf [buf_len]byte

//go:export getBuffer
func GetBuffer() *byte {
	return &buf[0]
}

//go:export format
func Format(input_len uint) int {
	input := buf[:input_len]
	output, err := format.Source(input)
	if err != nil {
		return -copy(buf[:], []byte(err.Error()))
	}
	result := len(output)

	if result > buf_len {
		return -copy(buf[:], []byte("Buffer out of memory"))
	}

	copy(buf[:], output)
	return result
}

func main() {}
