#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.builder = exports.description = exports.command = void 0;
const js_beautify_1 = require("js-beautify");
const path = __importStar(require("path"));
const fs_1 = require("fs");
const migrate_1 = require("../../lib/migrate");
const lodash_1 = require("lodash");
const import_1 = require("../../lib/import");
const options_1 = require("../../lib/options");
// Support Windows
if (!process.env.PWD) {
    process.env.PWD = process.cwd();
}
exports.command = "create";
exports.description = "create a new migration with your current models";
exports.builder = {
    name: {
        describe: "describe your newly generated migration",
        type: "string",
        default: lodash_1.uniqueId(),
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
const handler = async (args) => {
    const options = options_1.build(args);
    if (!fs_1.existsSync(options.modelsDirectory)) {
        console.log("Can't find models directory. Use `sequelize init` to create it");
        return;
    }
    if (!fs_1.existsSync(options.migrationsDirectory)) {
        console.log("Can't find migrations directory. Creating an empty one");
        fs_1.mkdirSync(options.migrationsDirectory);
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
        previousState = JSON.parse(fs_1.readFileSync(path.join(options.migrationsDirectory, "_current.json")).toString());
    }
    catch (e) { }
    //console.log(path.join(migrationsDir, '_current.json'), JSON.parse(fs.readFileSync(path.join(migrationsDir, '_current.json') )))
    const sequelize = await import_1.importSequelizeModel(options);
    let models = sequelize.models;
    currentState.tables = migrate_1.reverseModels(sequelize, models);
    let actions = migrate_1.parseDifference(previousState.tables, currentState.tables);
    // sort actions
    migrate_1.sortActions(actions);
    let migration = migrate_1.getMigration(actions);
    if (migration.commandsUp.length === 0) {
        console.log("No changes found");
        process.exit(0);
    }
    // log migration actions
    lodash_1.each(migration.consoleOut, (v) => {
        console.log("[Actions] " + v);
    });
    if (args.preview) {
        console.log("Migration result:");
        console.log(js_beautify_1.js_beautify("[ \n" + migration.commandsUp.join(", \n") + " \n];\n"));
        process.exit(0);
    }
    // backup _current file
    if (fs_1.existsSync(path.join(options.migrationsDirectory, "_current.json"))) {
        fs_1.writeFileSync(path.join(options.migrationsDirectory, "_current_bak.json"), fs_1.readFileSync(path.join(options.migrationsDirectory, "_current.json")));
    }
    // save current state
    currentState.revision = previousState.revision + 1;
    fs_1.writeFileSync(path.join(options.migrationsDirectory, "_current.json"), JSON.stringify(currentState, null, 4));
    // write migration to file
    let info = migrate_1.writeMigration(currentState.revision, migration, options.migrationsDirectory, args.name ? args.name : "noname", args.comment ? args.comment : "");
    console.log(`New migration to revision ${currentState.revision} has been saved to file '${info.filename}'`);
    if (args.execute) {
        migrate_1.executeMigration(sequelize.getQueryInterface(), info.filename, 0, (err) => {
            if (!err)
                console.log("Migration has been executed successfully");
            else
                console.log("Errors, during migration execution", err);
            process.exit(0);
        });
    }
    else {
        process.exit(0);
    }
};
exports.handler = handler;
