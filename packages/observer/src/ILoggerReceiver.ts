import {LogData} from '@spryrocks/logger-core';

export interface ILoggerReceiver<TLogData extends LogData = LogData> {
  onLogReceived(data: TLogData): boolean;
}
