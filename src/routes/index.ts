import express from 'express';
import gtgRoute from './gtgRoute';
import departmentRoute from './departmentRoute';
import employeeRoute from './employeeRoute';
import clientRoute from './clientRoute';

const apiRoutes = express.Router();
apiRoutes.use('/departments', departmentRoute);
apiRoutes.use('/employees', employeeRoute);

export { gtgRoute, apiRoutes, clientRoute };
