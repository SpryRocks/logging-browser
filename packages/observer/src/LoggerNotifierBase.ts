import {ILoggerNotifier, LogNotifierFilter} from './ILoggerNotifier';
import {LogData} from '@spryrocks/logger-core';

export abstract class LoggerNotifierBase<TLogData extends LogData>
  implements ILoggerNotifier<TLogData>
{
  private _filter: LogNotifierFilter<TLogData> | undefined;

  notify(data: TLogData) {
    return this.test(data);
  }

  set filter(filter: LogNotifierFilter<TLogData>) {
    this._filter = filter;
  }

  private test(data: TLogData): boolean {
    if (!this._filter) return true;
    return this._filter(data);
  }
}
