import { Model, Sequelize, DataTypes } from 'sequelize';
import { EmployeeAttributes } from '../attributes';

class Employee extends Model implements EmployeeAttributes {
  public id!: number;
  public firstName!: string;
  public lastName!: string;
  public email!: string;
  public phoneNumber!: string;
  public hireDate!: Date;
  public jobId!: number;
  public salary!: number;
  public commissionPercentage!: number;
  public managerId!: number;
  public departmentId!: number;
  public readonly createdAt!: Date;
  public readonly updated!: Date;

  static initModel(sequelize: Sequelize): void {
    Employee.init(
      {
        id: {
          field: 'id',
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        firstName: {
          field: 'first_name',
          type: DataTypes.STRING,
        },
        lastName: {
          field: 'last_name',
          type: DataTypes.STRING,
        },
        email: {
          type: DataTypes.STRING,
        },
        phoneNumber: {
          field: 'phone_number',
          type: DataTypes.STRING,
        },
        hireDate: {
          field: 'hire_date',
          type: DataTypes.DATEONLY,
        },
        jobId: {
          field: 'job_id',
          type: DataTypes.INTEGER,
        },
        salary: {
          type: DataTypes.DECIMAL(8, 2),
        },
        commissionPercentage: {
          field: 'commission_pct',
          type: DataTypes.DECIMAL(2, 2),
          allowNull: true,
        },
        managerId: {
          field: 'manager_id',
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        departmentId: {
          field: 'department_id',
          type: DataTypes.INTEGER,
        },
      },
      {
        sequelize,
        underscored: true,
        tableName: 'employees',
      }
    );
  }
}

export default Employee;
