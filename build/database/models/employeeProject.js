"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class EmployeeProject extends sequelize_1.Model {
    static initModel(sequelize) {
        EmployeeProject.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            employeeId: {
                field: 'employee_id',
                type: sequelize_1.DataTypes.INTEGER,
            },
            projectId: {
                field: 'project_id',
                type: sequelize_1.DataTypes.INTEGER,
            },
        }, {
            sequelize,
            underscored: true,
            tableName: 'employee_project',
        });
    }
}
exports.default = EmployeeProject;
