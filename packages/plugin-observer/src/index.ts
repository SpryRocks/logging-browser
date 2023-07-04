import {
  ILoggerObserver as CoreILoggerObserver,
  ILoggerReceiver as CoreILoggerReceiver,
  LoggerObserver as CoreLoggerObserver,
} from '@spryrocks/logging-browser-observer';
import {LogData as CoreLogData} from '@spryrocks/logging-browser-core';

export type LogData = CoreLogData & {plugin: string; action: string | undefined};

export interface ILoggerObserver<TLogData extends LogData = LogData>
  extends CoreILoggerObserver<TLogData> {}

export interface ILoggerReceiver<TLogData extends LogData = LogData>
  extends CoreILoggerReceiver<TLogData> {}

export class LoggerObserver<
  TLogData extends LogData = LogData,
> extends CoreLoggerObserver<TLogData> {}
