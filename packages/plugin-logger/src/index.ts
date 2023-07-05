import {LoggerFactory as CoreLoggerFactory, ILoggerFactory} from '@spryrocks/logger';
import {
  ILoggerNotifier,
  ILoggerObserver,
  ILoggerReceiver,
  LogData,
  LoggerObserver,
  LogParams,
  LogType,
} from '@spryrocks/logger-plugin-observer';

export class LoggerFactory<
  TLogData extends LogData = LogData,
  TGlobalParams extends object | undefined = undefined,
> extends CoreLoggerFactory<TLogData, TGlobalParams> {}

export {
  ILoggerFactory,
  ILoggerObserver,
  LoggerObserver,
  ILoggerReceiver,
  LogData,
  LogType,
  LogParams,
  ILoggerNotifier,
};
