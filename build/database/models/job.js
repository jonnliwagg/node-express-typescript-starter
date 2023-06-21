"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class Job extends sequelize_1.Model {
    static initModel(sequelize) {
        Job.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: sequelize_1.DataTypes.STRING,
            },
        }, {
            sequelize,
            underscored: true,
            tableName: 'jobs',
        });
    }
}
exports.default = Job;
