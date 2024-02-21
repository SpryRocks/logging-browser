import {ILoggerFilters, ILoggerFiltersTester, LoggerFilter} from './ILoggerFilters';
import {LogData} from '@spryrocks/logger-core';

export class LoggerFilters<TLogData extends LogData>
  implements ILoggerFilters<TLogData>, ILoggerFiltersTester<TLogData>
{
  private filters: LoggerFilter<TLogData>[] = [];

  add(filter: LoggerFilter<TLogData>) {
    this.filters.push(filter);
  }

  remove(filter: LoggerFilter<TLogData>) {
    const index = this.filters.indexOf(filter);
    if (index < 0) return;
    this.filters.splice(index, 1);
  }

  clear() {
    this.filters = [];
  }

  test(data: TLogData) {
    return this.filters.every((f) => f(data));
  }
}
