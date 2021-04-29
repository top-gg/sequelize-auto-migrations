"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const account_1 = require("./account");
const city_1 = require("./city");
const country_1 = require("./country");
const geo_1 = require("./geo");
const purchaseProducts_1 = require("./purchaseProducts");
const config = require("../config/config.json");
const sequelize = new sequelize_typescript_1.Sequelize(config);
sequelize.addModels([account_1.Account, city_1.City, country_1.Country, geo_1.Geo, purchaseProducts_1.PurchaseProducts]);
exports.default = {
    sequelize,
    Sequelize: sequelize_typescript_1.Sequelize,
};
