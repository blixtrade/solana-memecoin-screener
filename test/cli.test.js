import test from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL("../", import.meta.url));
const packageJson = JSON.parse(
  readFileSync(new URL("../package.json", import.meta.url), "utf8"),
);

function runCli(args) {
  return execFileSync(process.execPath, ["bin/screener.js", ...args], {
    cwd: projectRoot,
    encoding: "utf8",
    env: { ...process.env, BLIX_NO_FOOTER: "1" },
  });
}

test("--version prints the package version without starting live data load", () => {
  const output = runCli(["--version"]);
  assert.equal(output.trim(), packageJson.version);
});

test("--help documents --version", () => {
  const help = runCli(["--help"]);
  assert.match(help, /--version\s+Print the installed version and exit/);
});
