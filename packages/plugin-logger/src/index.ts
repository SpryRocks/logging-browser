import {LoggerFactory as CoreLoggerFactory, ILoggerFactory} from '@spryrocks/logger';
import {
  CoreLogData,
  ILoggerNotifier,
  ILoggerObserver,
  ILoggerReceiver,
  LogData,
  LoggerObserver,
  LogLevel,
  LogParams,
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
  LogLevel,
  LogParams,
  ILoggerNotifier,
  MultipleNotifiers,
  CoreLogData,
};
