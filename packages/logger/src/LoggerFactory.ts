import {ILoggerNotifier, LogData} from '@spryrocks/logger-observer';
import {Logger, LoggerDelegate} from './Logger';
import {ILogger} from './ILogger';
import {ILoggerFactory} from './ILoggerFactory';
import {LogObjectFormatter} from './ILogFormatter';

export type PrepareLogData<
  TLogData extends LogData,
  TGlobalData extends object | undefined,
> = (options: {data: LogData; globalData: TGlobalData}) => TLogData;

type LoggerFactorySetup<
  TLogData extends LogData,
  TGlobalData extends object | undefined,
> = {
  notifier: ILoggerNotifier<TLogData>;
  prepareLogData: PrepareLogData<TLogData, TGlobalData>;
  globalData: TGlobalData;
  objectFormatter: LogObjectFormatter | undefined;
};

class Delegate<TLogData extends LogData, TGlobalData extends object | undefined>
  implements LoggerDelegate<TLogData, TGlobalData>
{
  constructor(private readonly setup: LoggerFactorySetup<TLogData, TGlobalData>) {}

  prepareLogData(options: {
    data: LogData;
    globalData: Partial<TGlobalData> | undefined;
  }): TLogData {
    return this.setup.prepareLogData({
      data: options.data,
      globalData: {...this.setup.globalData, ...options.globalData},
    });
  }

  getObjectFormatter(): LogObjectFormatter | undefined {
    return this.setup.objectFormatter;
  }
}

export class LoggerFactory<
  TLogData extends LogData = LogData,
  TGlobalData extends object | undefined = undefined,
> implements ILoggerFactory
{
  private readonly delegate: Delegate<TLogData, TGlobalData>;

  constructor(private readonly setup: LoggerFactorySetup<TLogData, TGlobalData>) {
    this.delegate = new Delegate<TLogData, TGlobalData>(setup);
  }

  createLogger(
    tag?: string,
    options?: {globalData?: Partial<TGlobalData>; objectFormatter: LogObjectFormatter},
  ): ILogger {
    return new Logger({
      notifier: this.setup.notifier,
      tag,
      logParams: undefined,
      delegate: this.delegate,
      globalData: options?.globalData,
      objectFormatter: options?.objectFormatter,
    });
  }
}
