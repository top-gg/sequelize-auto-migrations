#!/usr/bin/env node
import "reflect-metadata";
import * as createCommand from "./cmds/create";
import * as runCommand from "./cmds/run";

require("yargs/yargs")(process.argv.slice(2))
  .command(createCommand)
  .command(runCommand)
  .demandCommand()
  .help().argv;
