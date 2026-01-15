/**
 * A wasm based golang formatter
 *
 * @example
 * ```ts
 * ```javascript
 * import { format } from "@wasm-fmt/gofmt";
 *
 * const source = `
 * package main
 * import "fmt"
 * func main(){fmt.Println("Hello, 世界")
 * }
 * `;
 *
 * const formatted = format(source);
 * ```
 *
 * @module
 */

/**
 * Formats a Go source code.
 * @param input - The Go source code to format
 * @returns The formatted Go source code
 */
export declare function format(input: string): string;
