#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.builder = exports.description = exports.command = void 0;
const path = require("path");
const Async = require("async");
const fs_1 = require("fs");
const migrate_1 = require("../../lib/migrate");
const options_1 = require("../../lib/options");
const import_1 = require("../../lib/import");
// Windows support
if (!process.env.PWD) {
    process.env.PWD = process.cwd();
}
exports.command = "run";
exports.description = "run migrations to your database";
exports.builder = {
    rev: {
        alias: "r",
        describe: "which revision to start migrating from",
        default: 0,
        type: "number",
    },
    pos: {
        alias: "p",
        describe: "which operation to start migrating from",
        type: "number",
        default: 0,
    },
    one: {
        describe: "run a single migration revision",
        defaultValue: false,
        type: "boolean",
    },
    "migrations-path": {
        describe: "override the .sequelizerc directory for migrations",
        type: "string",
    },
    "models-path": {
        describe: "override the .sequelizerc directory for models",
        type: "string",
    },
    project: {
        describe: "relative path to which tsconfig.json to use",
        type: "string",
    },
};
const handler = async (options) => {
    let baseOptions = options_1.build(options);
    if (!fs_1.existsSync(baseOptions.modelsDirectory)) {
        console.log("Can't find models directory. Use `sequelize init` to create it");
        return;
    }
    if (!fs_1.existsSync(baseOptions.migrationsDirectory)) {
        console.log("Can't find migrations directory. Use `makemigration` to create your initial migration");
        return;
    }
    const sequelize = await import_1.importSequelizeModel(baseOptions);
    const queryInterface = sequelize.getQueryInterface();
    // execute all migration from
    let fromRevision = options.rev;
    let fromPos = options.pos;
    let stop = options.one;
    let migrationFiles = fs_1.readdirSync(baseOptions.migrationsDirectory)
        // filter JS files
        .filter((file) => {
        return file.indexOf(".") !== 0 && file.slice(-3) === ".ts";
    })
        // sort by revision
        .sort((a, b) => {
        let revA = parseInt(path.basename(a).split("-", 2)[0]), revB = parseInt(path.basename(b).split("-", 2)[0]);
        if (revA < revB)
            return -1;
        if (revA > revB)
            return 1;
        return 0;
    })
        // remove all migrations before fromRevision
        .filter((file) => {
        let rev = parseInt(path.basename(file).split("-", 2)[0]);
        return rev >= fromRevision;
    });
    console.log("Migrations to execute:");
    migrationFiles.forEach((file) => {
        console.log("\t" + file);
    });
    Async.eachSeries(migrationFiles, (file, cb) => {
        console.log("Execute migration from file: " + file);
        migrate_1.executeMigration(queryInterface, path.join(baseOptions.migrationsDirectory, file), fromPos, (err) => {
            if (stop) {
                return cb("Stopped");
            }
            cb(err);
        });
        // set pos to 0 for next migration
        fromPos = 0;
    }, function (err) {
        console.log(err);
        process.exit(0);
    });
};
exports.handler = handler;
