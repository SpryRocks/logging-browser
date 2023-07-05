import {ILoggerNotifier, LogData} from '@spryrocks/logger-observer';
import {Logger, LoggerDelegate} from './Logger';
import {ILogger} from './ILogger';
import {ILoggerFactory} from './ILoggerFactory';

export type PrepareLogData<
  TLogData extends LogData,
  TGlobalParams extends object | undefined,
> = (options: {data: LogData; globalPrams: TGlobalParams}) => TLogData;

type LoggerFactorySetup<
  TLogData extends LogData,
  TGlobalParams extends object | undefined,
> = {
  notifier: ILoggerNotifier<TLogData>;
  prepareLogData: PrepareLogData<TLogData, TGlobalParams>;
  globalParams: TGlobalParams;
};

class Delegate<TLogData extends LogData, TGlobalParams extends object | undefined>
  implements LoggerDelegate<TLogData>
{
  constructor(private readonly setup: LoggerFactorySetup<TLogData, TGlobalParams>) {}

  prepareLogData(data: LogData): TLogData {
    return this.setup.prepareLogData({data, globalPrams: this.setup.globalParams});
  }
}

export class LoggerFactory<
  TLogData extends LogData = LogData,
  TGlobalParams extends object | undefined = undefined,
> implements ILoggerFactory
{
  private readonly delegate: Delegate<TLogData, TGlobalParams>;

  constructor(private readonly setup: LoggerFactorySetup<TLogData, TGlobalParams>) {
    this.delegate = new Delegate<TLogData, TGlobalParams>(setup);
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
