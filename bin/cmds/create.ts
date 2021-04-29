#!/usr/bin/env node
import { js_beautify } from "js-beautify";
import { Sequelize } from "sequelize-typescript";
import * as path from "path";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import {
  executeMigration,
  getMigration,
  parseDifference,
  reverseModels,
  sortActions,
  writeMigration,
} from "../../lib/migrate";
import { each, uniqueId } from "lodash";
import { importSequelizeModel } from "../../lib/import";
import { build } from "../../lib/options";
import { BaseOptions } from "../../lib/types";

interface CreateOptions extends BaseOptions {
  name: string;
  preview: boolean;
  execute: boolean;
  comment?: string;
}

// Support Windows
if (!process.env.PWD) {
  process.env.PWD = process.cwd();
}

export const command = "create";

export const description = "create a new migration with your current models";

export const builder = {
  name: {
    describe: "describe your newly generated migration",
    type: "string",
    default: uniqueId(),
  },
  preview: {
    describe: "print current changes instead of writing to a file",
    type: "boolean",
    default: false,
  },
  comment: {
    describe: "a longer description for inside of the file",
    type: "string",
  },
  execute: {
    describe: "run the migration right after creating it",
    type: "boolean",
    default: false,
  },
  "migrations-path": {
    type: "string",
    describe: "The path to the migrations folder",
  },
  "models-path": {
    type: "string",
    describe: "The path to the models folder",
  },
  project: {
    type: "string",
    describe: "Relative path to tsconfig file",
  },
};

export const handler = async (args: CreateOptions) => {
  const options = build(args);

  if (!existsSync(options.modelsDirectory)) {
    console.log(
      "Can't find models directory. Use `sequelize init` to create it"
    );
    return;
  }

  if (!existsSync(options.migrationsDirectory)) {
    console.log("Can't find migrations directory. Creating an empty one");
    mkdirSync(options.migrationsDirectory);
  }

  // current state
  const currentState = {
    tables: {},
    revision: null,
  };

  // load last state
  let previousState = {
    revision: 0,
    version: 1,
    tables: {},
  };

  try {
    previousState = JSON.parse(
      readFileSync(
        path.join(options.migrationsDirectory, "_current.json")
      ).toString()
    );
  } catch (e) {}

  //console.log(path.join(migrationsDir, '_current.json'), JSON.parse(fs.readFileSync(path.join(migrationsDir, '_current.json') )))

  const sequelize: Sequelize = await importSequelizeModel(options);

  let models = sequelize.models;

  currentState.tables = reverseModels(sequelize, models);

  let actions = parseDifference(previousState.tables, currentState.tables);

  // sort actions
  sortActions(actions);

  let migration = getMigration(actions);

  if (migration.commandsUp.length === 0) {
    console.log("No changes found");
    process.exit(0);
  }

  // log migration actions
  each(migration.consoleOut, (v) => {
    console.log("[Actions] " + v);
  });

  if (args.preview) {
    console.log("Migration result:");
    console.log(
      js_beautify("[ \n" + migration.commandsUp.join(", \n") + " \n];\n")
    );
    process.exit(0);
  }

  // backup _current file
  if (existsSync(path.join(options.migrationsDirectory, "_current.json"))) {
    writeFileSync(
      path.join(options.migrationsDirectory, "_current_bak.json"),
      readFileSync(path.join(options.migrationsDirectory, "_current.json"))
    );
  }

  // save current state
  currentState.revision = previousState.revision + 1;
  writeFileSync(
    path.join(options.migrationsDirectory, "_current.json"),
    JSON.stringify(currentState, null, 4)
  );

  // write migration to file
  let info = writeMigration(
    currentState.revision,
    migration,
    options.migrationsDirectory,
    args.name ? args.name : "noname",
    args.comment ? args.comment : ""
  );

  console.log(
    `New migration to revision ${currentState.revision} has been saved to file '${info.filename}'`
  );

  if (args.execute) {
    executeMigration(sequelize.getQueryInterface(), info.filename, 0, (err) => {
      if (!err) console.log("Migration has been executed successfully");
      else console.log("Errors, during migration execution", err);
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
};
