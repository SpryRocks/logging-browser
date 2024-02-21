import {LogData} from '@spryrocks/logger-core';

export type LoggerFilter<TLogData extends LogData> = (data: TLogData) => boolean;

export interface ILoggerFilters<TLogData extends LogData> {
  add(filter: LoggerFilter<TLogData>): void;
  remove(filter: LoggerFilter<TLogData>): void;
  clear(): void;
}

export interface ILoggerFiltersTester<TLogData extends LogData> {
  test(data: TLogData): boolean;
}
