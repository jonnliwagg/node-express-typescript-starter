"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class JobHistory extends sequelize_1.Model {
    static initModel(sequelize) {
        JobHistory.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            employeeId: {
                field: 'employee_id',
                type: sequelize_1.DataTypes.INTEGER,
            },
            jobId: {
                field: 'job_id',
                type: sequelize_1.DataTypes.INTEGER,
            },
            startDate: {
                field: 'start_date',
                type: sequelize_1.DataTypes.DATE,
            },
            endDate: {
                field: 'end_date',
                type: sequelize_1.DataTypes.DATE,
            },
        }, {
            sequelize,
            underscored: true,
            tableName: 'job_history',
        });
    }
}
exports.default = JobHistory;
