import {LogData} from '@spryrocks/logger-core';

export type LogNotifierFilter<TLogData extends LogData> = (data: TLogData) => boolean;

export interface ILoggerNotifier<TLogData extends LogData = LogData> {
  notify(data: TLogData): boolean;
}
