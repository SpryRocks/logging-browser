import {
  ILoggerObserver as CoreILoggerObserver,
  ILoggerReceiver as CoreILoggerReceiver,
  LoggerObserver as CoreLoggerObserver,
  ILoggerNotifier,
} from '@spryrocks/logger-observer';
import {LogData, LogParams, LogType} from '@spryrocks/logger-plugin-core';

export interface ILoggerObserver<TLogData extends LogData = LogData>
  extends CoreILoggerObserver<TLogData> {}

export interface ILoggerReceiver<TLogData extends LogData = LogData>
  extends CoreILoggerReceiver<TLogData> {}

export class LoggerObserver<
  TLogData extends LogData = LogData,
> extends CoreLoggerObserver<TLogData> {}

export {LogData, LogParams, LogType, ILoggerNotifier};
