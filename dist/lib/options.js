"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.build = void 0;
const path_1 = require("path");
const fs_1 = require("fs");
function build(options) {
    const { migrationsDirectory, modelsDirectory } = readSequelizercOptions();
    return {
        project: options["project"],
        migrationsDirectory: options["migrations-path"] || migrationsDirectory,
        modelsDirectory: options["models-path"] || modelsDirectory,
    };
}
exports.build = build;
const readSequelizercOptions = () => {
    let sequelizercConfigs = [];
    let sequelizercPath = path_1.join(process.env.PWD, ".sequelizerc");
    if (fs_1.existsSync(sequelizercPath)) {
        sequelizercConfigs = require(sequelizercPath);
    }
    if (!process.env.PWD) {
        process.env.PWD = process.cwd();
    }
    return {
        migrationsDirectory: sequelizercConfigs[""] || path_1.join(process.env.PWD, "migrations"),
        modelsDirectory: sequelizercConfigs[""] || path_1.join(process.env.PWD, "models"),
    };
};
