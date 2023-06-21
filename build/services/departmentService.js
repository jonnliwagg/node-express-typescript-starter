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
class DepartmentService {
    constructor() {
        this.findAll = () => __awaiter(this, void 0, void 0, function* () {
            const departments = yield models_1.db.Department.findAll();
            return departments;
        });
        this.findById = (id) => __awaiter(this, void 0, void 0, function* () {
            const existinDepartment = yield models_1.db.Department.findByPk(id);
            return existinDepartment;
        });
        this.save = (object) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!object && Object.keys(object).length == 0) {
                    throw new Error('Object must contain at least one property');
                }
                const department = yield department_1.default.create(Object.assign({}, object));
                return department;
            }
            catch (err) {
                throw err;
            }
        });
        this.update = (id, object) => __awaiter(this, void 0, void 0, function* () {
            if (!object && Object.keys(object).length == 0) {
                throw new Error('Object to be updated must contain at least one property.');
            }
            let existingDepartment = yield this.findById(id);
            if (!existingDepartment) {
                throw new Error('department_not_found');
            }
            try {
                yield models_1.db.Department.update(Object.assign({}, object), {
                    where: { id },
                });
                existingDepartment = yield this.findById(id);
                return existingDepartment;
            }
            catch (err) {
                throw err;
            }
        });
        this.deleteByPrimaryKey = (id) => __awaiter(this, void 0, void 0, function* () {
            let existingDepartment = yield this.findById(id);
            if (!existingDepartment) {
                throw new Error('department_not_found');
            }
            try {
                yield existingDepartment.destroy();
            }
            catch (err) {
                throw err;
            }
        });
    }
    static getInstance() {
        if (!DepartmentService.instance) {
            DepartmentService.instance = new DepartmentService();
        }
        return DepartmentService.instance;
    }
}
exports.default = DepartmentService;
