import {
  ILoggerObserver as CoreILoggerObserver,
  ILoggerReceiver as CoreILoggerReceiver,
  LoggerObserver as CoreLoggerObserver,
  MultipleNotifiers as CoreMultipleNotifiers,
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

export class MultipleNotifiers<
  TLogData extends LogData = LogData,
> extends CoreMultipleNotifiers<TLogData> {}

export {LogData, LogParams, LogType, ILoggerNotifier};
