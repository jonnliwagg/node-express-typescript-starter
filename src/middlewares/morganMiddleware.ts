import morgan from 'morgan';
import { logConfiguration } from '../logging/logger';

morgan.token('date', () => {
  return logConfiguration.morgan.dateFormat;
});

export default {
  config: morgan(logConfiguration.morgan.logFormat, {
    stream: logConfiguration.morgan.stream,
  }),
};
