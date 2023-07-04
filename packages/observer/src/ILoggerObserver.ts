import {ILoggerReceiver} from './ILoggerReceiver';
import {LogData} from '@spryrocks/logging-browser-core';

export interface ILoggerObserver<TLogData extends LogData> {
  add(logger: ILoggerReceiver<TLogData>): void;
}
