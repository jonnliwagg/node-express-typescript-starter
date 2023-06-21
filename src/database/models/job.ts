import { Model, Sequelize, DataTypes } from 'sequelize';
import { JobAttributes } from '../attributes';

class Job extends Model implements JobAttributes {
  public id!: number;
  public name!: string;
  public readonly createdAt!: Date;
  public readonly updated!: Date;

  static initModel(sequelize: Sequelize): void {
    Job.init(
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
        tableName: 'jobs',
      }
    );
  }
}

export default Job;
