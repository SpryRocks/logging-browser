import {ChildOptions, ILogger, TagOptions} from './ILogger';
import {ILogFormatter, LogFormatterOptions, LogObjectFormatter} from './ILogFormatter';
import {ILoggerNotifier, LogData, LogLevel, LogParams} from '@spryrocks/logger-observer';

export interface LoggerDelegate<
  TLogData extends LogData,
  TGlobalData extends object | undefined,
> {
  prepareLogData(options: {
    data: LogData;
    globalData: Partial<TGlobalData> | undefined;
  }): TLogData;
  getObjectFormatter(): LogObjectFormatter | undefined;
}

type LoggerSetup<TLogData extends LogData, TGlobalData extends object | undefined> = {
  notifier: ILoggerNotifier<TLogData>;
  tag: string | undefined;
  logParams: LogParams | undefined;
  delegate: LoggerDelegate<TLogData, TGlobalData>;
  globalData: Partial<TGlobalData> | undefined;
  objectFormatter: LogObjectFormatter | undefined;
};

export class Logger<
  TLogData extends LogData,
  TGlobalData extends object | undefined = undefined,
> implements ILogger
{
  constructor(private readonly setup: LoggerSetup<TLogData, TGlobalData>) {}

  error(error?: unknown, message?: string, params?: LogParams): void {
    this.notify(
      LogLevel.Error,
      message ?? this.prepareErrorMessage(error),
      params,
      error,
    );
  }

  warning(message: string, params?: LogParams): void {
    this.notify(LogLevel.Warning, message, params);
  }

  info(message: string, params?: LogParams): void {
    this.notify(LogLevel.Info, message, params);
  }

  debug(message: string, params?: LogParams) {
    this.notify(LogLevel.Debug, message, params);
  }

  trace(message: string, params?: LogParams) {
    this.notify(LogLevel.Trace, message, params);
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
      objectFormatter: this.setup.objectFormatter,
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

  private prepareParams(params: LogParams | undefined): LogParams | undefined {
    if (!this.setup.logParams && !params) return undefined;
    return this.formatParams({
      ...this.setup.logParams,
      ...params,
    });
  }

  private formatParams(params: LogParams): LogParams {
    return this.processParamObject(params) as LogParams;
  }

  private processParamArray(arr: Array<unknown>): Array<unknown> {
    return arr.map((a) => this.processParam(a));
  }

  private processParam(param: unknown): unknown {
    if (!param) return param;
    if (typeof param === 'object') return this.processParamObject(param);
    return param;
  }

  private processParamObject(param: object): object {
    if (Array.isArray(param)) {
      return this.processParamArray(param);
    }
    const param_ = param as ILogFormatter<unknown>;
    // format object with logFormatter
    const ownLogFormatter = param_.logFormatter;
    if (ownLogFormatter) {
      const result = this.formatParamObjectWithOwnFormatter(param, ownLogFormatter);
      if (result) return result;
    }
    const globalLogFormatter =
      this.setup.objectFormatter ?? this.setup.delegate.getObjectFormatter();
    if (globalLogFormatter) {
      return this.formatParamObjectWithGlobalFormatter(param, globalLogFormatter);
    }
    const params = {...param};
    for (const key in params) {
      // eslint-disable-next-line
      // @ts-ignore
      params[key] = this.processParam(params[key]);
    }
    return params;
  }

  private formatParamObjectWithOwnFormatter(
    param: object,
    logFormatter: LogFormatterOptions<unknown>,
  ): object | undefined {
    if (logFormatter.formatObject) {
      return this.processParamObject(logFormatter.formatObject());
    }
    if (logFormatter.excludeFields) {
      let excludeFields = logFormatter.excludeFields as string[];
      const result = {};
      for (const key in result) {
        if (excludeFields.includes(key)) continue;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        result[key] = this.processParam(param[key]);
      }
      return result;
    }
  }

  private formatParamObjectWithGlobalFormatter(
    param: object,
    logFormatter: LogObjectFormatter,
  ): object {
    return this.processParamObject(logFormatter(param));
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
