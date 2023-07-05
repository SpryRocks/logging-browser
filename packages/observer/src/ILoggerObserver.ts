import {ILoggerReceiver} from './ILoggerReceiver';
import {LogData} from '@spryrocks/logger-core';

export interface ILoggerObserver<TLogData extends LogData = LogData> {
  add(logger: ILoggerReceiver<TLogData>): void;
}
