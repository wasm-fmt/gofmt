import assert from "node:assert";
import fs from "node:fs/promises";
import test from "node:test";
import { format } from "./lib.js";

const files = (await fs.readdir("testdata"))
  .filter((f) => f.endsWith(".input"))
  .map((f) => {
    return {
      input_name: f,
      golden_name: f.replace(".input", ".golden"),
    };
  });

for (const { input_name, golden_name } of files) {
  await test(
    `format ${input_name}`,
    { skip: input_name[0] === "." },
    async () => {
      const [input, expected] = await Promise.all(
        [input_name, golden_name].map((f) =>
          fs.readFile(`testdata/${f}`, "utf-8")
        )
      );

      const actual = await format(input);

      assert.strictEqual(actual, expected);
    }
  );
}
