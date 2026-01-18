#!/usr/bin/env node --test
import assert from "node:assert/strict";
import { glob, readFile } from "node:fs/promises";
import { basename, join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

import { format } from "../gofmt_node.js";

const test_root = fileURLToPath(import.meta.resolve("../test_data"));

for await (const case_name of glob("**/*.input", { cwd: test_root })) {
	if (basename(case_name).startsWith(".")) {
		test.skip(case_name, () => {});
		continue;
	}

	const input_path = join(test_root, case_name);
	const expect_path = input_path + ".golden";

	const [input, expected] = await Promise.all([readFile(input_path, "utf-8"), readFile(expect_path, "utf-8")]);

	test(case_name, () => {
		const actual = format(input);
		assert.equal(actual, expected);
	});
}
