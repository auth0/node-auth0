#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const packageJson = require("../package.json");
const version = packageJson.version;

const versionFilePath = path.join(__dirname, "../src/management/version.ts");
const content = `export const SDK_VERSION = "${version}";\n`;

fs.writeFileSync(versionFilePath, content, "utf8");

console.log(`SDK_VERSION updated to "${version}"`);
