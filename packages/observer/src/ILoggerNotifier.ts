import {LogData} from '@spryrocks/logger-core';

export interface ILoggerNotifier<TLogData extends LogData = LogData> {
  notify(data: TLogData): boolean;
}
