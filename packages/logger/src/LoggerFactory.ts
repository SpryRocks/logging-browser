import {Logger, PrepareLogData} from './Logger';
import {ILogger} from './ILogger';
import {ILoggerFactory} from './ILoggerFactory';
import {ILoggerNotifier} from '@spryrocks/logging-browser-observer';
import {LogData} from '@spryrocks/logging-browser-core';

type LoggerFactoryOptions<TLogData extends LogData> = {
  notifier: ILoggerNotifier<TLogData>;
  prepareLogData: PrepareLogData<TLogData>;
};

export class LoggerFactory<TLogData extends LogData = LogData> implements ILoggerFactory {
  constructor(private readonly options: LoggerFactoryOptions<TLogData>) {}

  createLogger(tag?: string): ILogger {
    return new Logger({
      notifier: this.options.notifier,
      prepareLogData: this.options.prepareLogData,
      tag,
      logParams: undefined,
    });
  }
}
