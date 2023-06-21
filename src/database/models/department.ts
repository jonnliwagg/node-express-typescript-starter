import { Model, Sequelize, DataTypes } from 'sequelize';
import { DepartmentAttributes } from '../attributes';

class Department extends Model implements DepartmentAttributes {
  public id!: number;
  public name!: string;
  public managerId!: number;
  public locationId!: number;
  public readonly createdAt!: Date;
  public readonly updated!: Date;

  static initModel(sequelize: Sequelize): void {
    Department.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: DataTypes.STRING,
        },
        managerId: {
          field: 'manager_id',
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        locationId: {
          field: 'location_id',
          type: DataTypes.INTEGER,
          allowNull: true,
        },
      },
      {
        sequelize,
        underscored: true,
        tableName: 'departments',
      }
    );
  }
}

export default Department;
