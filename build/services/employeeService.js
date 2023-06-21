"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../database/models");
const department_1 = __importDefault(require("../database/models/department"));
const project_1 = __importDefault(require("../database/models/project"));
class EmployeeService {
    constructor() {
        this.findAll = () => __awaiter(this, void 0, void 0, function* () {
            const employees = yield models_1.db.Employee.findAll({
                include: [{ model: department_1.default, as: 'department' }, project_1.default],
            });
            return employees;
        });
        this.findById = (id) => __awaiter(this, void 0, void 0, function* () {
            const existingEmployee = yield models_1.db.Employee.findByPk(id, {
                include: [
                    { model: department_1.default, as: 'department' },
                    {
                        model: project_1.default,
                        attributes: ['id', 'name', 'created_at', 'updated_at'],
                        through: { attributes: [] },
                    },
                ],
            });
            return existingEmployee;
        });
        this.save = (object) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!object && Object.keys(object).length == 0) {
                    throw new Error('Object must contain at least one property');
                }
                const employee = yield models_1.db.Employee.create(Object.assign({}, object));
                return employee;
            }
            catch (err) {
                throw err;
            }
        });
        this.update = (id, object) => __awaiter(this, void 0, void 0, function* () {
            if (!object && Object.keys(object).length == 0) {
                throw new Error('Object to be updated must contain at least one property.');
            }
            let existingEmployee = yield this.findById(id);
            if (!existingEmployee) {
                throw new Error('employee_not_found');
            }
            try {
                yield models_1.db.Employee.update(Object.assign({}, object), {
                    where: { id },
                });
                existingEmployee = yield this.findById(id);
                return existingEmployee;
            }
            catch (err) {
                throw err;
            }
        });
        this.deleteByPrimaryKey = (id) => __awaiter(this, void 0, void 0, function* () {
            let existingEmployee = yield this.findById(id);
            if (!existingEmployee) {
                throw new Error('department_not_found');
            }
            try {
                yield existingEmployee.destroy();
            }
            catch (err) {
                throw err;
            }
        });
    }
    static getInstance() {
        if (!EmployeeService.instance) {
            EmployeeService.instance = new EmployeeService();
        }
        return EmployeeService.instance;
    }
}
exports.default = EmployeeService;
