[![Test](https://github.com/wasm-fmt/gofmt/actions/workflows/test.yml/badge.svg)](https://github.com/wasm-fmt/gofmt/actions/workflows/test.yml)

# Install

[![npm](https://img.shields.io/npm/v/@wasm-fmt/gofmt?color=00ADD8)](https://www.npmjs.com/package/@wasm-fmt/gofmt)

```bash
npm install @wasm-fmt/gofmt
```

[![jsr.io](https://jsr.io/badges/@fmt/gofmt?color=00ADD8)](https://jsr.io/@fmt/gofmt)

```bash
npx jsr add @fmt/gofmt
```

# Usage

```JavaScript
import init, { format } from "@wasm-fmt/gofmt";

await init();

const source = `
package main
import "fmt"
func main(){fmt.Println("Hello, 世界")
}
`;

const formatted = format(source);
console.log(formatted);
```

Vite users tip:

```JavaScript
import init, { format } from "@wasm-fmt/gofmt/vite";
```

# Build from source

```bash
# 1. clone this repo
git clone https://github.com/wasm-fmt/gofmt.git

# 2. install TinyGo https://tinygo.org/getting-started/install/

# 3. build
pnpm build

# 4. test
pnpm run /^test:/
```
