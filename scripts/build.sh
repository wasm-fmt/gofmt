set -Eeo pipefail

echo "Building..."
tinygo build -o=gofmt.wasm -target=wasm -no-debug -stack-size=24kb ./src/lib.go
if [[ ! -z "${WASM_OPT}" ]]; then
	echo "Optimizing..."
	wasm-opt gofmt.wasm -Os -o gofmt.opt.wasm
	mv gofmt.opt.wasm gofmt.wasm
fi

echo "Generating JS..."
cp $(tinygo env TINYGOROOT)/targets/wasm_exec.js ./gofmt.js
git apply ./gofmt.patch
