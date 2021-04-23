import { createLogger, transports, format } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import path from 'path';

const { combine, timestamp, label, printf } = format;

const myFormat = printf(
  // eslint-disable-next-line no-shadow
  ({ level, message, label, timestamp }) => {
    return `${timestamp} ${label} [${level}]: ${message}`;
  },
);

const getLogFileName = () => {
  const logDir = process.env.LOG_DIR || process.cwd();
  const logFileName = process.env.SERVICE_NAME || 'application';
  return path.join(logDir, `${logFileName}-%DATE%.log`);
};

const logger = createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: combine(
    label({ label: process.env.SERVICE_NAME || 'application' }),
    timestamp(),
    myFormat,
  ),
  transports: [
    new transports.Console({
      colorize: true,
    }),
    new DailyRotateFile({
      filename: getLogFileName(),
      datePattern: 'YYYY-MM-DD',
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
});

logger.stream = {
  write: message => {
    logger.info(JSON.stringify(message));
  },
};

export default logger;
