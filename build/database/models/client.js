"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class Client extends sequelize_1.Model {
    static initModel(sequelize) {
        Client.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: sequelize_1.DataTypes.STRING,
            },
            key: {
                type: sequelize_1.DataTypes.STRING,
            },
        }, {
            sequelize,
            underscored: false,
            tableName: 'Clients',
            timestamps: false,
        });
    }
}
exports.default = Client;
