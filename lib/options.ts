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
    console.log("sqlrc exists");
    sequelizercConfigs = require(sequelizercPath);
  }

  if (!process.env.PWD) {
    process.env.PWD = process.cwd();
  }

  return {
    migrationsDirectory:
      sequelizercConfigs["migrations-path"] ||
      join(process.env.PWD, "migrations"),
    modelsDirectory:
      sequelizercConfigs["models-path"] || join(process.env.PWD, "models"),
  };
};
