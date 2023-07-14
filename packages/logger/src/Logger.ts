import {ChildOptions, ILogger, TagOptions} from './ILogger';
import {ILoggerNotifier, LogData, LogLevel, LogParams} from '@spryrocks/logger-observer';
import {ILogFormatter} from './ILogFormatter';

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

  error(error?: unknown, message?: string, params?: LogParams): void {
    this.notify(
      LogLevel.Error,
      message ?? this.prepareErrorMessage(error),
      params,
      error,
    );
  }

  private createChildLogger(setup: {
    tag: string | undefined | null;
    logParams: LogParams | undefined | null;
  }): ILogger {
    const tag = (() => {
      switch (setup.tag) {
        case null:
          return undefined;
        case undefined:
          return this.setup.tag;
        default:
          return setup.tag;
      }
    })();
    const logParams = (() => {
      switch (setup.logParams) {
        case null:
          return undefined;
        case undefined:
          return {...this.setup.logParams};
        default:
          return setup.logParams;
      }
    })();
    return new Logger({
      tag,
      logParams,
      globalData: this.setup.globalData,
      delegate: this.setup.delegate,
      notifier: this.setup.notifier,
    });
  }

  tag(tag: string, options?: TagOptions) {
    return this.createChildLogger({
      tag,
      logParams: options?.keepParams ? this.setup.logParams : null,
    });
  }

  child(options?: ChildOptions) {
    return this.createChildLogger({
      tag: undefined,
      logParams: options?.keepParams ? this.setup.logParams : null,
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
    return this.formatParams({
      ...this.setup.logParams,
      ...params,
    });
  }

  private formatParams(params: LogParams): LogParams {
    params = {...params};
    for (const key in params) {
      const param = params[key] as ILogFormatter;
      const logFormatter = param.logFormatter;
      if (logFormatter) {
        if (logFormatter.formatObject) {
          params[key] = logFormatter.formatObject();
        }
      }
    }
    return params;
  }

  private prepareErrorMessage(error: unknown): string {
    if (typeof error === 'object') {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const message = (error as any).message;
      if (message) return message;
    }
    return 'Unknown error';
  }
}
