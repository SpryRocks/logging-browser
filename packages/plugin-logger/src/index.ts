import {LoggerFactory as CoreLoggerFactory} from '@spryrocks/logger';
import {LogData} from '@spryrocks/logger-plugin-observer';

export class LoggerFactory<
  TLogData extends LogData = LogData,
  TGlobalData extends object | undefined = undefined,
> extends CoreLoggerFactory<TLogData, TGlobalData> {}

export {ILoggerFactory, ErrorLevel} from '@spryrocks/logger';
export {
  CoreLogData,
  ILoggerNotifier,
  ILoggerObserver,
  ILoggerReceiver,
  LoggerObserver,
  LogLevel,
  LogParams,
  MultipleNotifiers,
  ILoggerFilters,
  LoggerFilters,
} from '@spryrocks/logger-plugin-observer';
export {LogData};
