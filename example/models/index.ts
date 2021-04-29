import { Sequelize } from "sequelize-typescript";
import { Account } from "./account";
import { City } from "./city";
import { Country } from "./country";
import { Geo } from "./geo";
import { PurchaseProducts } from "./purchaseProducts";

const config = require("../config/config.json");

const sequelize = new Sequelize(config);

sequelize.addModels([Account, City, Country, Geo, PurchaseProducts]);

export default {
  sequelize,
  Sequelize,
};
