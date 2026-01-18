package main

import (
	"flag"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"

	gofmt "go/format"
)

var update = flag.Bool("update", false, "update golden files")

func TestGofmtSource(t *testing.T) {
	flag.Parse()

	_, filename, _, _ := runtime.Caller(0)
	testDataDir := filepath.Join(filepath.Dir(filename), "..", "test_data")

	matches, err := filepath.Glob(filepath.Join(testDataDir, "*.input"))
	if err != nil {
		t.Fatalf("failed to glob test files: %v", err)
	}

	for _, inputPath := range matches {
		testName := strings.TrimSuffix(filepath.Base(inputPath), ".input")

		t.Run(testName, func(t *testing.T) {
			input, err := os.ReadFile(inputPath)
			if err != nil {
				t.Fatalf("failed to read input file: %v", err)
			}

			output, err := gofmt.Source(input)
			if err != nil {
				t.Fatalf("failed to format: %v", err)
			}

			goldenPath := inputPath + ".golden"

			if *update {
				if err := os.WriteFile(goldenPath, output, 0644); err != nil {
					t.Fatalf("failed to write golden file: %v", err)
				}
			} else {
				expected, err := os.ReadFile(goldenPath)
				if err != nil {
					if os.IsNotExist(err) {
						t.Skipf("golden file not found: %s (run with -update to create)", goldenPath)
					}
					t.Fatalf("failed to read golden file: %v", err)
				}

				if string(output) != string(expected) {
					t.Errorf("output does not match golden file\nGOT:\n%s\nWANT:\n%s", string(output), string(expected))
				}
			}
		})
	}
}
