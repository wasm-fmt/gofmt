import init, { format } from "../gofmt.js";
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

await init();

const test_root = fileURLToPath(new URL("../test_data", import.meta.url));

for await (const dirent of await fs.opendir(test_root, { recursive: true })) {
	if (!dirent.isFile()) {
		continue;
	}

	const input_path = dirent.path;
	const ext = path.extname(input_path);

	switch (ext) {
		case ".input":
			break;

		default:
			continue;
	}

	const test_name = path.relative(test_root, input_path);
	const [input, expected] = await Promise.all([
		fs.readFile(input_path, { encoding: "utf-8" }),
		fs.readFile(input_path.replace(ext, ".golden"), { encoding: "utf-8" }),
	]);

	const actual = format(input, input_path);

	test(test_name, () => {
		assert.equal(actual, expected);
	});
}
