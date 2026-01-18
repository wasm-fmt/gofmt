#!/usr/bin/env deno test --allow-read --parallel
import { assertEquals } from "jsr:@std/assert";
import { expandGlob } from "jsr:@std/fs";
import { fromFileUrl } from "jsr:@std/path";

import { format } from "../gofmt_esm.js";

const test_root = fromFileUrl(import.meta.resolve("../test_data"));

for await (const { path: input_path, name: case_name } of expandGlob("**/*.input", { root: test_root })) {
	if (case_name.startsWith(".")) {
		Deno.test.ignore(case_name, () => {});
		continue;
	}

	const expect_path = input_path + ".golden";

	const [input, expected] = await Promise.all([Deno.readTextFile(input_path), Deno.readTextFile(expect_path)]);

	Deno.test(case_name, () => {
		const actual = format(input);
		assertEquals(actual, expected);
	});
}
