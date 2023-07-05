import {
  ILoggerObserver as CoreILoggerObserver,
  ILoggerReceiver as CoreILoggerReceiver,
  LogData as CoreLogData,
  LoggerObserver as CoreLoggerObserver,
} from '@spryrocks/logger-observer';

export type LogData = CoreLogData & {plugin: string; action: string | undefined};

export interface ILoggerObserver<TLogData extends LogData = LogData>
  extends CoreILoggerObserver<TLogData> {}

export interface ILoggerReceiver<TLogData extends LogData = LogData>
  extends CoreILoggerReceiver<TLogData> {}

export class LoggerObserver<
  TLogData extends LogData = LogData,
> extends CoreLoggerObserver<TLogData> {}
