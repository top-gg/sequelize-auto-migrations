import { Sequelize } from "sequelize-typescript";
import { useTypescriptResolver } from "./compiler";
import { BaseOptions } from "./types";
import { resolve } from "path";
import fs from "fs";

export async function importSequelizeModel(
  options: BaseOptions
): Promise<Sequelize> {
  const { modelsDirectory } = options;

  // Asserts that ts-node is initialized
  useTypescriptResolver(options);


  if (!fs.existsSync(modelsDirectory)) {
    console.log("Models dir doesn't exist");
    return;
  }

  let modelsImportPath = resolve(modelsDirectory);

  if (fs.lstatSync(modelsDirectory).isDirectory()) {
    if (!fs.existsSync(resolve(modelsDirectory, "index.ts"))) {
      console.log("Models dir is a file and doesn't have index.ts");
      return;
    }
    else modelsImportPath = resolve(modelsDirectory, "index.ts");
  }

  let modelsImport: any = await import(resolve(modelsImportPath, "index.ts"));
  if ("default" in modelsImport) {
    modelsImport = modelsImport.default;
  }

  if (!("sequelize" in modelsImport)) {
    console.log("Could not find sequelize from import path.");
    return;
  }

  return modelsImport.sequelize;
}
