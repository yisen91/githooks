#!/usr/bin/env node
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/index.ts
var import_node_child_process = __toESM(require("child_process"), 1);
var import_node_path = __toESM(require("path"), 1);
var import_node_path2 = require("path");
var import_node_fs = __toESM(require("fs"), 1);
var import_node_url = require("url");
var import_meta = {};
var l = (msg) => console.log(`githooks - ${msg}`);
var copyFilesSync = (source, target) => {
  if (!import_node_fs.default.existsSync(target)) {
    import_node_fs.default.mkdirSync(target);
  }
  const files = import_node_fs.default.readdirSync(source);
  files.forEach((file) => {
    const sourceFilePath = import_node_path.default.join(source, file);
    const targetFilePath = import_node_path.default.join(target, file);
    console.log(targetFilePath);
    if (import_node_fs.default.lstatSync(sourceFilePath).isDirectory()) {
      copyFilesSync(sourceFilePath, targetFilePath);
    } else {
      import_node_fs.default.copyFileSync(sourceFilePath, targetFilePath);
    }
  });
};
function install(dir = ".husky") {
  if (process.env.GITHOOKS === "0") {
    l("HUSKY env variable is set to 0, skipping install");
    return;
  }
  try {
    const __filename = (0, import_node_url.fileURLToPath)(import_meta.url);
    const __dirname = (0, import_node_path2.dirname)(__filename);
    console.log("source", import_node_path.default.join(__dirname, "../hooks"));
    console.log("target", dir);
    copyFilesSync(import_node_path.default.join(__dirname, "../hooks"), dir);
  } catch (e) {
    l("Git hooks failed to install");
    throw e;
  }
  l("Git hooks installed");
}

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
module.exports = module.exports.default;
