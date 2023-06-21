import { db } from '../database/models';
import Department from '../database/models/department';
import Employee from '../database/models/employee';
import Project from '../database/models/project';

class EmployeeService {
  private static instance: EmployeeService;

  static getInstance(): EmployeeService {
    if (!EmployeeService.instance) {
      EmployeeService.instance = new EmployeeService();
    }
    return EmployeeService.instance;
  }

  findAll = async () => {
    const employees: Employee[] = await db.Employee.findAll({
      include: [{ model: Department, as: 'department' }, Project],
    });
    return employees;
  };

  findById = async (id: number) => {
    const existingEmployee: Employee | null = await db.Employee.findByPk(id, {
      include: [
        { model: Department, as: 'department' },
        {
          model: Project,
          attributes: ['id', 'name', 'created_at', 'updated_at'],
          through: { attributes: [] },
        },
      ],
    });
    return existingEmployee;
  };

  save = async (object: any) => {
    try {
      if (!object && Object.keys(object).length == 0) {
        throw new Error('Object must contain at least one property');
      }
      const employee = await db.Employee.create({ ...object });
      return employee;
    } catch (err) {
      throw err;
    }
  };

  update = async (id: number, object: any) => {
    if (!object && Object.keys(object).length == 0) {
      throw new Error(
        'Object to be updated must contain at least one property.'
      );
    }

    let existingEmployee = await this.findById(id);
    if (!existingEmployee) {
      throw new Error('employee_not_found');
    }

    try {
      await db.Employee.update(
        { ...object },
        {
          where: { id },
        }
      );

      existingEmployee = await this.findById(id);
      return existingEmployee;
    } catch (err) {
      throw err;
    }
  };

  deleteByPrimaryKey = async (id: number) => {
    let existingEmployee = await this.findById(id);
    if (!existingEmployee) {
      throw new Error('department_not_found');
    }

    try {
      await existingEmployee.destroy();
    } catch (err) {
      throw err;
    }
  };
}

export default EmployeeService;
