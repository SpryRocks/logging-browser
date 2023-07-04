import {LogData} from '@spryrocks/logging-browser-core';

export interface ILoggerNotifier<TLogData extends LogData = LogData> {
  notify(data: TLogData): boolean;
}
