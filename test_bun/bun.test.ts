#!/usr/bin/env bun test
import { Glob } from "bun";
import { expect, test } from "bun:test";

import init, { format } from "../gofmt_web.js";

await init();

const test_root = Bun.fileURLToPath(import.meta.resolve("../test_data"));

for await (const case_name of new Glob("**/*.input").scan({ cwd: test_root, dot: true })) {
	if (case_name.startsWith(".")) {
		test.skip(case_name, () => {});
		continue;
	}

	const input_path = `${test_root}/${case_name}`;
	const expect_path = input_path + ".golden";

	const [input, expected] = await Promise.all([Bun.file(input_path).text(), Bun.file(expect_path).text()]);

	const actual = format(input);

	test(case_name, () => {
		expect(actual).toBe(expected);
	});
}
