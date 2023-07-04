import {LogData} from '@spryrocks/logging-browser-core';

export interface ILoggerNotifier<TLogData extends LogData> {
  notify(data: TLogData): void;
}
