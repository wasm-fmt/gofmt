set -Eeo pipefail

echo "Building..."
tinygo build -o=gofmt.wasm -target=wasm -no-debug -stack-size=64kb ./src/lib.go

if [[ ! -z "${WASM_OPT}" ]]; then
	echo "Optimizing..."

	tmp_dir=$(mktemp -d)
	cp gofmt.wasm $tmp_dir/gofmt.wasm

	wasm-opt gofmt.wasm -Os -o $tmp_dir/gofmt_os.wasm
	wasm-opt gofmt.wasm -Oz -o $tmp_dir/gofmt_oz.wasm

	smallest_wasm=$(ls -Sr $tmp_dir/*.wasm | head -1)

	mv $smallest_wasm gofmt.wasm
	rm -rf $tmp_dir
fi

echo "Generating JS..."
cp $(tinygo env TINYGOROOT)/targets/wasm_exec.js ./gofmt.js
git apply ./gofmt.patch
