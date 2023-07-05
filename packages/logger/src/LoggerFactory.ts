import {ILoggerNotifier, LogData} from '@spryrocks/logger-observer';
import {Logger, LoggerDelegate} from './Logger';
import {ILogger} from './ILogger';
import {ILoggerFactory} from './ILoggerFactory';

export type PrepareLogData<TLogData extends LogData> = (data: LogData) => TLogData;

type LoggerFactorySetup<TLogData extends LogData> = {
  notifier: ILoggerNotifier<TLogData>;
  prepareLogData: PrepareLogData<TLogData>;
};

class Delegate<TLogData extends LogData> implements LoggerDelegate<TLogData> {
  constructor(private readonly setup: LoggerFactorySetup<TLogData>) {}

  prepareLogData(data: LogData): TLogData {
    return this.setup.prepareLogData(data);
  }
}

export class LoggerFactory<TLogData extends LogData = LogData> implements ILoggerFactory {
  private readonly delegate: Delegate<TLogData>;

  constructor(private readonly setup: LoggerFactorySetup<TLogData>) {
    this.delegate = new Delegate<TLogData>(setup);
  }

  createLogger(tag?: string): ILogger {
    return new Logger({
      notifier: this.setup.notifier,
      tag,
      logParams: undefined,
      delegate: this.delegate,
    });
  }
}
