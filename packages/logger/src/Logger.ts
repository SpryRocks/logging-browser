import {ILogger, TagOptions} from './ILogger';
import {ILoggerNotifier, LogData, LogLevel, LogParams} from '@spryrocks/logger-observer';

export interface LoggerDelegate<
  TLogData extends LogData,
  TGlobalData extends object | undefined,
> {
  prepareLogData(options: {
    data: LogData;
    globalData: Partial<TGlobalData> | undefined;
  }): TLogData;
}

type LoggerSetup<TLogData extends LogData, TGlobalData extends object | undefined> = {
  notifier: ILoggerNotifier<TLogData>;
  tag: string | undefined;
  logParams: LogParams | undefined;
  delegate: LoggerDelegate<TLogData, TGlobalData>;
  globalData: Partial<TGlobalData> | undefined;
};

export class Logger<
  TLogData extends LogData,
  TGlobalData extends object | undefined = undefined,
> implements ILogger
{
  constructor(private readonly setup: LoggerSetup<TLogData, TGlobalData>) {}

  warning(message: string, params?: LogParams): void {
    this.notify(LogLevel.Warning, message, params);
  }

  debug(message: string, params?: LogParams) {
    this.notify(LogLevel.Debug, message, params);
  }

  info(message: string, params?: LogParams): void {
    this.notify(LogLevel.Info, message, params);
  }

  error(message: string, error?: unknown, params?: LogParams): void {
    this.notify(LogLevel.Error, message, params, error);
  }

  tag(tag: string, options?: TagOptions): ILogger {
    return new Logger({
      notifier: this.setup.notifier,
      tag,
      logParams: options?.keepParams ? this.setup.logParams : undefined,
      delegate: this.setup.delegate,
      globalData: this.setup.globalData,
    });
  }

  updateParams(params: LogParams): void {
    this.setup.logParams = {
      ...this.setup.logParams,
      ...params,
    };
  }

  private notify(
    level: LogLevel,
    message: string,
    params: LogParams | undefined,
    error?: unknown,
  ) {
    const data: LogData = {
      level,
      message,
      params: this.prepareParams(params),
      tag: this.setup.tag,
      error,
    };
    this.setup.notifier.notify(
      this.setup.delegate.prepareLogData({data, globalData: this.setup.globalData}),
    );
  }

  private prepareParams(params: LogParams | undefined): LogParams {
    return {
      ...this.setup.logParams,
      ...params,
    };
  }
}
