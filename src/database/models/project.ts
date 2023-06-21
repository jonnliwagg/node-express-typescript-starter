import { Model, Sequelize, DataTypes } from 'sequelize';
import { ProjectAttributes } from '../attributes';

class Project extends Model implements ProjectAttributes {
  public id!: number;
  public name!: string;
  public readonly createdAt!: Date;
  public readonly updated!: Date;

  static initModel(sequelize: Sequelize): void {
    Project.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: DataTypes.STRING,
        },
      },
      {
        sequelize,
        underscored: true,
        tableName: 'projects',
      }
    );
  }
}

export default Project;
