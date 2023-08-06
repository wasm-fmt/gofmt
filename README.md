# Build from source

```bash
# 1. clone this repo
git clone https://github.com/wasm-fmt/gofmt.git

# 2. install TinyGo https://tinygo.org/getting-started/install/

# 3. build
npm run go_wasm # copy `wasm_exec.js`
npm run patch
npm run build

# 4. test
npm run test
```