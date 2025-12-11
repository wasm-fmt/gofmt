set -Eeo pipefail

cd $(dirname $0)/..

echo "Building..."
tinygo build -o=gofmt.wasm -target=wasm -no-debug ./src/lib.go

echo "Generating JS..."
node ./scripts/transform.mjs $(tinygo env TINYGOROOT)/targets/wasm_exec.js ./gofmt.js ./gofmt.wasm

./scripts/package.mjs ./package.json
