set -Eeo pipefail

echo "Building..."
tinygo build -o=gofmt.wasm -target=wasm -no-debug ./src/lib.go

echo "Generating JS..."
cp $(tinygo env TINYGOROOT)/targets/wasm_exec.js ./gofmt.js
git apply ./gofmt.patch
