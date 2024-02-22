import {ILoggerNotifier, LogNotifierFilter} from './ILoggerNotifier';
import {LogData} from '@spryrocks/logger-core';

export type LoggerNotifierBaseOptions<TLogData extends LogData> = {
  filter?: LogNotifierFilter<TLogData>;
};

export abstract class LoggerNotifierBase<TLogData extends LogData>
  implements ILoggerNotifier<TLogData>
{
  private readonly _filter: LogNotifierFilter<TLogData> | undefined;

  constructor(options?: LoggerNotifierBaseOptions<TLogData>) {
    this._filter = options?.filter;
  }

  notify(data: TLogData) {
    return this.test(data);
  }

  private test(data: TLogData): boolean {
    if (!this._filter) return true;
    return this._filter(data);
  }
}
