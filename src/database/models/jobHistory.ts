import { Model, Sequelize, DataTypes } from 'sequelize';
import { JobHistoryAttributes } from '../attributes';

class JobHistory extends Model implements JobHistoryAttributes {
  public id!: number;
  public employeeId!: number;
  public jobId!: number;
  public startDate!: Date;
  public endDate!: Date;
  public readonly createdAt!: Date;
  public readonly updated!: Date;

  static initModel(sequelize: Sequelize): void {
    JobHistory.init(
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
        jobId: {
          field: 'job_id',
          type: DataTypes.INTEGER,
        },
        startDate: {
          field: 'start_date',
          type: DataTypes.DATE,
        },
        endDate: {
          field: 'end_date',
          type: DataTypes.DATE,
        },
      },
      {
        sequelize,
        underscored: true,
        tableName: 'job_history',
      }
    );
  }
}

export default JobHistory;
