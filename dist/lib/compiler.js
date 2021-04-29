"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTypescriptResolver = void 0;
const ts_node_1 = require("ts-node");
function useTypescriptResolver(options) {
    return ts_node_1.register({
        project: options.project,
    });
}
exports.useTypescriptResolver = useTypescriptResolver;
