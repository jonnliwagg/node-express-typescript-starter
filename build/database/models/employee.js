"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class Employee extends sequelize_1.Model {
    static initModel(sequelize) {
        Employee.init({
            id: {
                field: 'id',
                type: sequelize_1.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            firstName: {
                field: 'first_name',
                type: sequelize_1.DataTypes.STRING,
            },
            lastName: {
                field: 'last_name',
                type: sequelize_1.DataTypes.STRING,
            },
            email: {
                type: sequelize_1.DataTypes.STRING,
            },
            phoneNumber: {
                field: 'phone_number',
                type: sequelize_1.DataTypes.STRING,
            },
            hireDate: {
                field: 'hire_date',
                type: sequelize_1.DataTypes.DATEONLY,
            },
            jobId: {
                field: 'job_id',
                type: sequelize_1.DataTypes.INTEGER,
            },
            salary: {
                type: sequelize_1.DataTypes.DECIMAL(8, 2),
            },
            commissionPercentage: {
                field: 'commission_pct',
                type: sequelize_1.DataTypes.DECIMAL(2, 2),
                allowNull: true,
            },
            managerId: {
                field: 'manager_id',
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true,
            },
            departmentId: {
                field: 'department_id',
                type: sequelize_1.DataTypes.INTEGER,
            },
        }, {
            sequelize,
            underscored: true,
            tableName: 'employees',
        });
    }
}
exports.default = Employee;
