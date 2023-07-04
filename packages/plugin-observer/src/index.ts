import {LogData as CoreLogData} from '@spryrocks/logging-browser-core';
import {
  ILoggerObserver as CoreILoggerObserver,
  LoggerObserver as CoreLoggerObserver,
} from '@spryrocks/logging-browser-observer';

export type LogData = CoreLogData & {plugin: string; action: string | undefined};

export type ILoggerObserver<TLogData extends LogData = LogData> =
  CoreILoggerObserver<TLogData>;

export type LoggerObserver<TLogData extends LogData = LogData> =
  CoreLoggerObserver<TLogData>;
