#!/usr/bin/env node --test
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import { format } from "../gofmt_node.js";

const test_root = fileURLToPath(new URL("../test_data", import.meta.url));

for await (const input_path of fs.glob(`${test_root}/**/*.input`)) {
	const test_name = path.relative(test_root, input_path);
	const expect_path = input_path.replace(/\.input$/, ".golden");
	const [input, expected] = await Promise.all([
		fs.readFile(input_path, { encoding: "utf-8" }),
		fs.readFile(expect_path, { encoding: "utf-8" }),
	]);

	const actual = format(input);

	test(test_name, () => {
		assert.equal(actual, expected);
	});
}
