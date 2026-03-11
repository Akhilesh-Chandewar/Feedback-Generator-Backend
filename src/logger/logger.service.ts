import { Injectable } from '@nestjs/common';
import { WinstonModuleOptions } from 'nest-winston';
import * as winston from 'winston';
import 'winston-daily-rotate-file';

export const winstonLoggerOptions: WinstonModuleOptions = {
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.colorize(),
        winston.format.printf(({ level, message, timestamp, context }) => {
          return `${timestamp} [${level}] ${context || 'App'}: ${message}`;
        }),
      ),
    }),
    new winston.transports.DailyRotateFile({
      filename: 'logs/app-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxFiles: '30',
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
    }),
  ],
};

@Injectable()
export class LoggerService {}
