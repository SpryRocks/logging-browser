import {LoggerFactory as CoreLoggerFactory, ILoggerFactory} from '@spryrocks/logger';
import {
  CoreLogData,
  ILoggerNotifier,
  ILoggerObserver,
  ILoggerReceiver,
  LogData,
  LoggerObserver,
  LogParams,
  LogType,
  MultipleNotifiers,
} from '@spryrocks/logger-plugin-observer';

export class LoggerFactory<
  TLogData extends LogData = LogData,
  TGlobalData extends object | undefined = undefined,
> extends CoreLoggerFactory<TLogData, TGlobalData> {}

export {
  ILoggerFactory,
  ILoggerObserver,
  LoggerObserver,
  ILoggerReceiver,
  LogData,
  LogType,
  LogParams,
  ILoggerNotifier,
  MultipleNotifiers,
  CoreLogData,
};
