export interface BaseOptions {
  /**
   * Relative path to tsconfig.json
   */
  project: string;

  modelsDirectory: string;
  migrationsDirectory: string;
}

export interface Options {}

export interface MigrationCommand {
  fn:
    | "createTable"
    | "dropTable"
    | "addColumn"
    | "removeColumn"
    | "changeColumn"
    | "addIndex"
    | "removeIndex";

  // TODO(velddev): Properly parse this type.
  params: unknown[];
}
