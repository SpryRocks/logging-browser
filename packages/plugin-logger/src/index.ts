import {LoggerFactory as CoreLoggerFactory, ILoggerFactory} from '@spryrocks/logger';
import {
  ILoggerObserver,
  LogData,
  LoggerObserver,
} from '@spryrocks/logger-plugin-observer';

export class LoggerFactory<
  TLogData extends LogData = LogData,
> extends CoreLoggerFactory<TLogData> {}

export {ILoggerFactory, ILoggerObserver, LoggerObserver};
