#!/usr/bin/env bun test
import { Glob } from "bun";
import { expect, test } from "bun:test";
import path from "node:path";
import init, { format } from "../gofmt_web.js";

await init();

const test_root = path.join(import.meta.dir, "../test_data");
const glob = new Glob("*.{input}");

for await (const input_path of glob.scan({ cwd: test_root })) {
	const full_input_path = path.join(test_root, input_path);
	const expect_path = full_input_path.replace(/input$/, "golden");

	const [input, expected] = await Promise.all([Bun.file(full_input_path).text(), Bun.file(expect_path).text()]);

	const actual = format(input);

	test(input_path, () => {
		expect(actual).toBe(expected);
	});
}
