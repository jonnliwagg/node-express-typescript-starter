import SequelizeConnection from '../configuration';
import Department from './department';
import Employee from './employee';
import Job from './job';
import JobHistory from './jobHistory';
import Project from './project';
import EmployeeProject from './employeeProject';
import Client from './client';

const sequelize = SequelizeConnection.getInstance();

// Initialize Models
Department.initModel(sequelize);
Employee.initModel(sequelize);
Job.initModel(sequelize);
JobHistory.initModel(sequelize);
Project.initModel(sequelize);
EmployeeProject.initModel(sequelize);
Client.initModel(sequelize);

Department.belongsTo(Employee, {
  foreignKey: 'managerId',
  as: 'manager',
});

Employee.belongsTo(Department, {
  foreignKey: 'departmentId',
  as: 'department',
});
Employee.belongsTo(Job, {
  foreignKey: 'jobId',
  as: 'job',
});

JobHistory.belongsTo(Employee, {
  foreignKey: 'employeeId',
  as: 'employee',
});
JobHistory.belongsTo(Job, {
  foreignKey: 'jobId',
  as: 'job',
});

Employee.belongsToMany(Project, { through: EmployeeProject });
Project.belongsToMany(Employee, { through: EmployeeProject });

export const db = {
  sequelize,
  Department,
  Employee,
  Job,
  JobHistory,
  EmployeeProject,
  Client,
};
