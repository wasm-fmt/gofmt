import init, { format } from "../gofmt.js";

import { assertEquals } from "https://deno.land/std@0.201.0/assert/mod.ts";
import { walk } from "https://deno.land/std@0.201.0/fs/walk.ts";
import { relative } from "https://deno.land/std@0.201.0/path/mod.ts";

await init();

const update = Deno.args.includes("--update");

const test_root = new URL("../test_data", import.meta.url);

for await (const entry of walk(test_root, {
	includeDirs: false,
	exts: ["input"],
})) {
	const expect_path = entry.path.replace(/input$/, "golden");
	const input = Deno.readTextFileSync(entry.path);

	const actual = format(input);

	if (update) {
		Deno.writeTextFileSync(expect_path, actual);
	} else {
		const expected = Deno.readTextFileSync(expect_path);

		const test_name = relative(test_root.pathname, entry.path);

		Deno.test(test_name, () => {
			assertEquals(actual, expected);
		});
	}
}
