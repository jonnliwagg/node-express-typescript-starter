"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class Project extends sequelize_1.Model {
    static initModel(sequelize) {
        Project.init({
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
            tableName: 'projects',
        });
    }
}
exports.default = Project;
