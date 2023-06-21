import { ErrorRequestHandler } from 'express';
import logger from '../logging/logger';

const errorHandler: ErrorRequestHandler = (err, req, res) => {
  if (err) {
    logger.error(`${req.method}: ${req.url} - ${err.message}`);
    res.status(500).json({ message: err.message });
  }
};

export default errorHandler;
