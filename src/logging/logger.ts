import winston from 'winston';
import moment from 'moment';
import 'winston-daily-rotate-file';
import * as FileStreamRotator from 'file-stream-rotator';
import path from 'path';

export const logConfiguration = {
  morgan: {
    stream: FileStreamRotator.getStream({
      date_format: 'YYYY-MM-DD',
      filename: path.join(__dirname, '../../logs', 'access.%DATE%.log'),
      frequency: 'daily',
      verbose: false,
    }),
    logFormat:
      ':date[iso] :remote-addr :method :url :status :res[content-length] - :response-time ms',
    dateFormat: moment().format(' HH:mm:ss.ms'),
  },
  winston: {
    transports: [
      new winston.transports.Console({
        level: 'verbose',
      }),
      new winston.transports.DailyRotateFile({
        filename: './logs/application.%DATE%.log',
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        level: 'verbose',
        maxFiles: '5d',
      }),
    ],
    format: winston.format.combine(
      winston.format.label({
        label: 'node-api',
      }),
      winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      winston.format.printf((info) => {
        return `[${info.level}]-${info.label}: ${info.timestamp} - ${info.message}`;
      })
    ),
  },
};

export default winston.createLogger(logConfiguration.winston);
