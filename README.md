[![Test](https://github.com/wasm-fmt/gofmt/actions/workflows/test.yml/badge.svg)](https://github.com/wasm-fmt/gofmt/actions/workflows/test.yml)
[![npm](https://img.shields.io/npm/v/@wasm-fmt/gofmt)](https://www.npmjs.com/package/@wasm-fmt/gofmt)

# Install

```bash
npm install @wasm-fmt/gofmt
```

# Usage

```JavaScript
import init, { format } from '@wasm-fmt/gofmt';

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
import init, { format } from '@wasm-fmt/gofmt/vite';
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
