import {LogData} from '@spryrocks/logging-browser-core';

export interface ILoggerReceiver<TData extends LogData> {
  onLogReceived: (data: TData) => void;
}
