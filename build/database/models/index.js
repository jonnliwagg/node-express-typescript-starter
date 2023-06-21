"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const configuration_1 = __importDefault(require("../configuration"));
const department_1 = __importDefault(require("./department"));
const employee_1 = __importDefault(require("./employee"));
const job_1 = __importDefault(require("./job"));
const jobHistory_1 = __importDefault(require("./jobHistory"));
const project_1 = __importDefault(require("./project"));
const employeeProject_1 = __importDefault(require("./employeeProject"));
const client_1 = __importDefault(require("./client"));
const sequelize = configuration_1.default.getInstance();
// Initialize Models
department_1.default.initModel(sequelize);
employee_1.default.initModel(sequelize);
job_1.default.initModel(sequelize);
jobHistory_1.default.initModel(sequelize);
project_1.default.initModel(sequelize);
employeeProject_1.default.initModel(sequelize);
client_1.default.initModel(sequelize);
department_1.default.belongsTo(employee_1.default, {
    foreignKey: 'managerId',
    as: 'manager',
});
employee_1.default.belongsTo(department_1.default, {
    foreignKey: 'departmentId',
    as: 'department',
});
employee_1.default.belongsTo(job_1.default, {
    foreignKey: 'jobId',
    as: 'job',
});
jobHistory_1.default.belongsTo(employee_1.default, {
    foreignKey: 'employeeId',
    as: 'employee',
});
jobHistory_1.default.belongsTo(job_1.default, {
    foreignKey: 'jobId',
    as: 'job',
});
employee_1.default.belongsToMany(project_1.default, { through: employeeProject_1.default });
project_1.default.belongsToMany(employee_1.default, { through: employeeProject_1.default });
exports.db = {
    sequelize,
    Department: department_1.default,
    Employee: employee_1.default,
    Job: job_1.default,
    JobHistory: jobHistory_1.default,
    EmployeeProject: employeeProject_1.default,
    Client: client_1.default,
};
