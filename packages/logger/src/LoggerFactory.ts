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
  TGlobalParams extends object | undefined = undefined,
> = {
  notifier: ILoggerNotifier<TLogData>;
  prepareLogData: PrepareLogData<TLogData, TGlobalParams>;
  globalParams?: TGlobalParams;
};

export class LoggerFactory<TLogData extends LogData = LogData>
  implements ILoggerFactory, LoggerDelegate<TLogData>
{
  constructor(private readonly setup: LoggerFactorySetup<TLogData>) {}

  createLogger(tag?: string): ILogger {
    return new Logger({
      notifier: this.setup.notifier,
      tag,
      logParams: undefined,
      delegate: this,
    });
  }

  prepareLogData(data: LogData): TLogData {
    return this.setup.prepareLogData({data, globalPrams: this.setup.globalParams});
  }
}
