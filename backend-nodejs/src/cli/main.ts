import {Kernel, TypeBinding, TypeBindingScopeEnum} from "../../node_modules/inversify/source/inversify";
import {StockService} from "../service/StockService";
import {StockServiceImpl} from "../service/impl/StockServiceImpl";
import {ImportStocksCLI} from "./ImportStocksCLI";
import models = require('../domain/sequelize-models');

let packageJson = require('../../package.json');

models.initialize( packageJson.database.name , packageJson.database.username, packageJson.database.password, {
    dialect : packageJson.database.dialect,
    define : {
        timestamps : false,
        freezeTableName : true
    }
});

let kernel : IKernel = new Kernel();
kernel.bind(new TypeBinding<StockService>("StockService", StockServiceImpl, TypeBindingScopeEnum.Singleton));

let cli : ImportStocksCLI = new ImportStocksCLI(kernel);
cli.doFileImport();