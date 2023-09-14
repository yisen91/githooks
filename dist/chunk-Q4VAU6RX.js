// src/index.ts
import path from "node:path";
import { dirname } from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
var l = (msg) => console.log(`githooks - ${msg}`);
var copyFilesSync = (source, target) => {
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target);
  }
  const files = fs.readdirSync(source);
  files.forEach((file) => {
    const sourceFilePath = path.join(source, file);
    const targetFilePath = path.join(target, file);
    if (fs.lstatSync(sourceFilePath).isDirectory()) {
      copyFilesSync(sourceFilePath, targetFilePath);
    } else {
      fs.copyFileSync(sourceFilePath, targetFilePath);
    }
  });
};
function install(dir = ".husky") {
  if (process.env.GITHOOKS === "0") {
    l("HUSKY env variable is set to 0, skipping install");
    return;
  }
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    copyFilesSync(path.join(__dirname, "../hooks"), dir);
  } catch (e) {
    l("Git hooks failed to install");
    throw e;
  }
  l("Git hooks installed");
}

export {
  install
};
