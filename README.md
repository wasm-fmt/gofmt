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

## Node.js / Deno / Bun / Bundler

```javascript
import { format } from "@wasm-fmt/gofmt";

const source = `
package main
import "fmt"
func main(){fmt.Println("Hello, 世界")
}
`;

const formatted = format(source);
console.log(formatted);
```

## Web

For web environments, you need to initialize WASM module manually:

```javascript
import init, { format } from "@wasm-fmt/gofmt/web";

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

### Vite

```JavaScript
import init, { format } from "@wasm-fmt/gofmt/vite";

await init();
// ...
```

Or use the `./bundler` entry with [vite-plugin-wasm](https://www.npmjs.com/package/vite-plugin-wasm)

```javascript
import { format } from "@wasm-fmt/gofmt/bundler";
```

## Entry Points

- `.` - Auto-detects environment (Node.js uses node, Webpack uses bundler, default is ESM)
- `./node` - Node.js environment (no init required)
- `./esm` - ESM environments like Deno (no init required)
- `./bundler` - Bundlers like Webpack (no init required)
- `./web` - Web browsers (requires manual init)
- `./vite` - Vite bundler (requires manual init)

# Build from source

```bash
# 1. install Go https://go.dev/doc/install

# 2. install TinyGo https://tinygo.org/getting-started/install/

# 3. clone this repo
git clone https://github.com/wasm-fmt/gofmt.git

# 4. build
npm run build

# 6. test
npm run test:node
```
