#!/usr/bin/env deno test --allow-read --parallel
import { format } from "../gofmt_esm.js";

import { assertEquals } from "jsr:@std/assert";
import { walk } from "jsr:@std/fs";
import { fromFileUrl, relative } from "jsr:@std/path";

const test_root = fromFileUrl(new URL("../test_data", import.meta.url));

for await (const entry of walk(test_root, {
	includeDirs: false,
	exts: ["input"],
})) {
	const expect_path = entry.path.replace(/input$/, "golden");
	const input = Deno.readTextFileSync(entry.path);

	const actual = format(input);
	const expected = Deno.readTextFileSync(expect_path);

	const test_name = relative(test_root, entry.path);

	Deno.test(test_name, () => {
		assertEquals(actual, expected);
	});
}
