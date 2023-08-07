[![Build](https://github.com/wasm-fmt/gofmt/actions/workflows/build.yml/badge.svg)](https://github.com/wasm-fmt/gofmt/actions/workflows/build.yml)
[![npm](https://img.shields.io/npm/v/@wasm-fmt/gofmt)](https://www.npmjs.com/package/@wasm-fmt/gofmt)

# Install

```bash
npm install @wasm-fmt/gofmt
```

# Usage

```JavaScript
import { format } from '@wasm-fmt/gofmt';

const source = `
package main
import "fmt"
func main(){fmt.Println("Hello, 世界")}
`;

const formatted = await format(source);
console.log(formatted);
```

Vite users tip:

```JavaScript
import { format } from '@wasm-fmt/gofmt';
import wasmUrl from "@wasm-fmt/gofmt/lib.wasm?url";

// ...

const formatted = await format(source, new URL(wasmUrl, import.meta.url));
```

# Build from source

```bash
# 1. clone this repo
git clone https://github.com/wasm-fmt/gofmt.git

# 2. install TinyGo https://tinygo.org/getting-started/install/

# 3. build
npm run build

# 4. test
npm run test
```
