import { Model, Sequelize, DataTypes } from 'sequelize';
import { EmployeeProjectAttributes, JobHistoryAttributes } from '../attributes';

class EmployeeProject extends Model implements EmployeeProjectAttributes {
  public id!: number;
  public employeeId!: number;
  public projectId!: number;
  public readonly createdAt!: Date;
  public readonly updated!: Date;

  static initModel(sequelize: Sequelize): void {
    EmployeeProject.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        employeeId: {
          field: 'employee_id',
          type: DataTypes.INTEGER,
        },
        projectId: {
          field: 'project_id',
          type: DataTypes.INTEGER,
        },
      },
      {
        sequelize,
        underscored: true,
        tableName: 'employee_project',
      }
    );
  }
}

export default EmployeeProject;
