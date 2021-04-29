import { Sequelize } from "sequelize-typescript";
import { useTypescriptResolver } from "./compiler";
import { BaseOptions } from "./types";

export async function importSequelizeModel(
  options: BaseOptions
): Promise<Sequelize> {
  const { modelsDirectory } = options;

  // Asserts that ts-node is initialized
  useTypescriptResolver(options);

  let modelsImport: any = await import(modelsDirectory + "/index.ts");
  if ("default" in modelsImport) {
    modelsImport = modelsImport.default;
  }

  if (!("sequelize" in modelsImport)) {
    console.log("Could not find sequelize from import path.");
    return;
  }

  return modelsImport.sequelize;
}
