import {
  ILoggerFilters as CoreILoggerFilters,
  ILoggerObserver as CoreILoggerObserver,
  ILoggerReceiver as CoreILoggerReceiver,
  LoggerFilters as CoreLoggerFilters,
  LoggerObserver as CoreLoggerObserver,
  MultipleNotifiers as CoreMultipleNotifiers,
  ILoggerNotifier,
} from '@spryrocks/logger-observer';
import {CoreLogData, LogData, LogLevel, LogParams} from '@spryrocks/logger-plugin-core';

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

export interface ILoggerFilters<TLogData extends LogData = LogData>
  extends CoreILoggerFilters<TLogData> {}

export class LoggerFilters<
  TLogData extends LogData = LogData,
> extends CoreLoggerFilters<TLogData> {}

export {LogData, LogParams, LogLevel, ILoggerNotifier, CoreLogData};
