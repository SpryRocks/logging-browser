import {LogData} from '@spryrocks/logging-browser-core';

export interface ILoggerReceiver<TLogData extends LogData = LogData> {
  onLogReceived(data: TLogData): boolean;
}
