import { CommandLineOptions } from "command-line-args";
import { BaseOptions } from "./types";
import { join } from "path";
import { existsSync } from "fs";

export function build(options: CommandLineOptions): BaseOptions {
  const { migrationsDirectory, modelsDirectory } = readSequelizercOptions();

  return {
    project: options["project"],
    migrationsDirectory: options["migrations-path"] || migrationsDirectory,
    modelsDirectory: options["models-path"] || modelsDirectory,
  };
}

const readSequelizercOptions = () => {
  let sequelizercConfigs = [];
  let sequelizercPath = join(process.env.PWD, ".sequelizerc");
  if (existsSync(sequelizercPath)) {
    sequelizercConfigs = require(sequelizercPath);
  }

  if (!process.env.PWD) {
    process.env.PWD = process.cwd();
  }

  return {
    migrationsDirectory:
      sequelizercConfigs[""] || join(process.env.PWD, "migrations"),
    modelsDirectory: sequelizercConfigs[""] || join(process.env.PWD, "models"),
  };
};
