import {
  ILoggerObserver as CoreILoggerObserver,
  ILoggerReceiver as CoreILoggerReceiver,
  LoggerObserver as CoreLoggerObserver,
} from '@spryrocks/logging-browser-observer';
import {LogData as CoreLogData} from '@spryrocks/logging-browser-core';

export type LogData = CoreLogData & {plugin: string; action: string | undefined};

export type ILoggerObserver<TLogData extends LogData = LogData> =
  CoreILoggerObserver<TLogData>;

export type ILoggerReceiver<TLogData extends LogData = LogData> =
  CoreILoggerReceiver<TLogData>;

export class LoggerObserver<
  TLogData extends LogData = LogData,
> extends CoreLoggerObserver<TLogData> {}
