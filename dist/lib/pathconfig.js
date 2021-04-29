"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pathConfig = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const pathConfig = (options) => {
    let sequelizercConfigs = [];
    let sequelizercPath = path_1.default.join(process.env.PWD, ".sequelizerc");
    if (fs_1.default.existsSync(sequelizercPath)) {
        sequelizercConfigs = require(sequelizercPath);
    }
    if (!process.env.PWD) {
        process.env.PWD = process.cwd();
    }
    let migrationsDir = path_1.default.join(process.env.PWD, "migrations"), modelsDir = path_1.default.join(process.env.PWD, "models");
    if (options["migrations-path"]) {
        migrationsDir = path_1.default.join(process.env.PWD, options["migrations-path"]);
    }
    else if (sequelizercConfigs["migrations-path"]) {
        migrationsDir = sequelizercConfigs["migrations-path"];
    }
    if (options["models-path"]) {
        modelsDir = path_1.default.join(process.env.PWD, options["models-path"]);
    }
    else if (sequelizercConfigs["models-path"]) {
        modelsDir = sequelizercConfigs["models-path"];
    }
    return {
        migrationsDirectory: migrationsDir,
        modelsDirectory: modelsDir,
    };
};
exports.pathConfig = pathConfig;
