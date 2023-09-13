#!/usr/bin/env node
import { install } from './'

// Show usage and exit with code
function help(code: number) {
  process.exit(code)
}

// Get CLI arguments
const [, , cmd, ...args] = process.argv
const ln = args.length
const [x, y] = args

// CLI commands
const cmds: { [key: string]: () => void } = {
  install: (): void => (ln > 1 ? help(2) : install(x)),
}

// Run CLI
try {
  // Run command or show usage for unknown command
  cmds[cmd] ? cmds[cmd]() : help(0)
} catch (e) {
  console.error(e instanceof Error ? `husky - ${e.message}` : e)
  process.exit(1)
}
