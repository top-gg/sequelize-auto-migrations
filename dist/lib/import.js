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
exports.importSequelizeModel = void 0;
const compiler_1 = require("./compiler");
async function importSequelizeModel(options) {
    const { modelsDirectory } = options;
    // Asserts that ts-node is initialized
    compiler_1.useTypescriptResolver(options);
    let modelsImport = await Promise.resolve().then(() => __importStar(require(modelsDirectory + "/index.ts")));
    if ("default" in modelsImport) {
        modelsImport = modelsImport.default;
    }
    if (!("sequelize" in modelsImport)) {
        console.log("Could not find sequelize from import path.");
        return;
    }
    return modelsImport.sequelize;
}
exports.importSequelizeModel = importSequelizeModel;
