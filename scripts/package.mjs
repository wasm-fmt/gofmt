#!/usr/bin/env node
import process from "node:process";
import path from "node:path";
import fs from "node:fs";

const pkg_path = path.resolve(process.cwd(), process.argv[2]);
const pkg_text = fs.readFileSync(pkg_path, { encoding: "utf-8" });
const pkg_json = JSON.parse(pkg_text);

// JSR

const jsr_path = path.resolve(pkg_path, "..", "jsr.jsonc");
pkg_json.name = "@fmt/gofmt";
pkg_json.exports = "./gofmt_web.js";
pkg_json.exclude = [
	"!**",
	"test_*",
	"src",
	"scripts",
	"node_modules",
	"jsconfig.json",
	"tsconfig.json",
	"*.tgz",
	"*.sh",
	"*.patch",
	"*.mod",
	".*",
];
fs.writeFileSync(jsr_path, JSON.stringify(pkg_json, null, 4));
