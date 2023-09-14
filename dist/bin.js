#!/usr/bin/env node
import {
  install
} from "./chunk-Q4VAU6RX.js";

// src/bin.ts
function help(code) {
  process.exit(code);
}
var [, , cmd, ...args] = process.argv;
var ln = args.length;
var [x, y] = args;
var cmds = {
  install: () => ln > 1 ? help(2) : install(x)
};
try {
  cmds[cmd] ? cmds[cmd]() : help(0);
} catch (e) {
  console.error(e instanceof Error ? `husky - ${e.message}` : e);
  process.exit(1);
}
