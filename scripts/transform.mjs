import { Lang, parse } from "@ast-grep/napi";
import assert from "node:assert";
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

let debug = false;
if (process.env.ACTIONS_STEP_DEBUG === "true" || process.env.DEBUG) {
	debug = true;
}

function logDebug(...args) {
	if (debug) {
		console.debug(...args);
	}
}

const [input_js_path, output_js_path, wasm_path] = process.argv.slice(2);
logDebug({
	input_js_path,
	output_js_path,
	wasm_path,
});

const source = readFileSync(input_js_path, "utf-8");
const template_path = fileURLToPath(import.meta.resolve("./template.js"));
const template = readFileSync(template_path, "utf-8");
const root = parse(Lang.JavaScript, source).root();
const wasmBinary = readFileSync(wasm_path);

const wasmModule = new WebAssembly.Module(wasmBinary);
const wasmImports = WebAssembly.Module.imports(wasmModule);

const wasip1 = new Set();
const gojs = new Set();

for (const { module, name } of wasmImports) {
	if (module === "wasi_snapshot_preview1") {
		wasip1.add(name);
	} else if (module === "gojs") {
		gojs.add(name);
	}
}

logDebug("WASI imports:", [...wasip1]);
logDebug("GoJS imports:", [...gojs]);

const end_of_polyfill = source.indexOf("// End of polyfills for common API.");
assert(end_of_polyfill !== -1, "Could not find end of polyfill marker");

const edit_list = [
	{
		startPos: 0,
		endPos: 0,
		insertedText: `/* @ts-self-types="./gofmt.d.ts" */\n`,
	},
];

// Task 1: Find IIFE - (()=>{...})()
const iifeNode = root.find("(() => { $$$BODY })()");
assert(iifeNode, "Could not find IIFE wrapper");
const iifeRange = iifeNode.range();
edit_list.push({
	startPos: iifeRange.start.index,
	endPos: end_of_polyfill,
	insertedText: "",
});

// Task 2: Find global.Go = class { ... }
const goClassNode = root.find("global.Go = class { $$$BODY }");
assert(goClassNode, "Could not find global.Go class definition");
// Navigate: assignment_expression -> class -> class_body
const classNode = goClassNode.children().find((c) => c.kind() === "class");
assert(classNode, "Could not find class node inside global.Go assignment");
const classBody = classNode.children().find((c) => c.kind() === "class_body");
assert(classBody, "Could not find class_body node inside Go class");

edit_list.push({
	startPos: goClassNode.range().start.index,
	endPos: classBody.range().start.index,
	insertedText: "class Go ",
});

// Task 3: Find global inside an array []
const globalInArray = root.find({
	rule: {
		pattern: "global",
		inside: { kind: "array" },
	},
});
assert(globalInArray, "Could not find global in array");
const fakeGlobal = `/* fake global */ { set format(fn) { instance.format = fn }, Array, Object}`;
edit_list.push({
	startPos: globalInArray.range().start.index,
	endPos: globalInArray.range().end.index,
	insertedText: fakeGlobal,
});

// Task 4 & 5: Find pairs in wasi_snapshot_preview1 and gojs, remove unused functions
const importPairs = root.findAll({
	rule: {
		kind: "pair",
		inside: {
			kind: "object",
			inside: {
				kind: "pair",
				has: {
					field: "key",
					regex: "^(wasi_snapshot_preview1|gojs)$",
				},
			},
		},
	},
});

for (const pair of importPairs) {
	const keyNode = pair.field("key");
	const is_wasip1 = pair.ancestors().some((n) => n.kind() === "pair" && n.field("key")?.text() === "wasi_snapshot_preview1");
	const is_gojs = pair.ancestors().some((n) => n.kind() === "pair" && n.field("key")?.text() === "gojs");

	if (is_wasip1) {
		const key = keyNode.text();
		if (!wasip1.has(key)) {
			logDebug(`Removing unused wasip1 function:`, key);
			const start = pair.range().start.index;
			const next = pair.next();
			// Include trailing comma if present
			const end =
				next?.kind() === ","
					? next.range().end.index
					: pair.range().end.index;
			edit_list.push({
				startPos: start,
				endPos: end,
				insertedText: `/* removed ${key} */`,
			});
		}
	} else if (is_gojs) {
		const key = keyNode.text().slice(1, -1);
		if (!gojs.has(key)) {
			logDebug(`Removing unused gojs function:`, key);
			const start = pair.range().start.index;
			const next = pair.next();
			// Include trailing comma if present
			const end =
				next?.kind() === ","
					? next.range().end.index
					: pair.range().end.index;
			edit_list.push({
				startPos: start,
				endPos: end,
				insertedText: `/* removed ${key} */`,
			});
		}
	}
}

edit_list.push({
	startPos: classBody.range().end.index,
	endPos: source.length,
	insertedText: "\n" + template,
});

writeFileSync(output_js_path, root.commitEdits(edit_list));
