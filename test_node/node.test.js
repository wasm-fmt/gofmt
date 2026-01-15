#!/usr/bin/env node --test
import assert from "node:assert/strict";
import { glob, readFile } from "node:fs/promises";
import { basename } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import { format } from "../gofmt_node.js";

const test_root = fileURLToPath(new URL("../test_data", import.meta.url));

for await (const case_name of glob("**/*.input", { cwd: test_root })) {
	if (basename(case_name).startsWith(".")) {
		test(case_name, { skip: true }, () => {});
		continue;
	}

	const input_path = `${test_root}/${case_name}`;
	const expect_path = input_path.replace(/\.input$/, ".golden");

	const [input, expected] = await Promise.all([readFile(input_path, "utf-8"), readFile(expect_path, "utf-8")]);

	test(case_name, () => {
		const actual = format(input);
		assert.equal(actual, expected);
	});
}
