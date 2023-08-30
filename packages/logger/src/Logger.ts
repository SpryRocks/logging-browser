import {ChildOptions, ErrorOptions, ILogger, TagOptions} from './ILogger';
import {
  ErrorLevel,
  ILoggerNotifier,
  LogData,
  LogLevel,
  LogParams,
} from '@spryrocks/logger-observer';
import {LogObjectFormatter} from './ILogFormatter';
import {ObjectFormatter} from './ObjectFormatter';

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
  objectFormatter?: LogObjectFormatter;
};

export class Logger<
  TLogData extends LogData,
  TGlobalData extends object | undefined = undefined,
> implements ILogger
{
  private readonly objectFormatter: ObjectFormatter;

  constructor(private readonly setup: LoggerSetup<TLogData, TGlobalData>) {
    this.objectFormatter = new ObjectFormatter({
      objectFormatter: setup.objectFormatter,
      getGlobalObjectFormatters: () => setup.delegate.getObjectFormatter(),
    });
  }

  //region log methods
  error(
    error?: unknown,
    message?: string,
    options?: ErrorOptions,
    params?: LogParams,
  ): void {
    this.notify(
      LogLevel.Error,
      message ?? this.prepareErrorMessage(error),
      params,
      error,
      options?.level,
    );
  }

  warning(message: string, params?: LogParams): void {
    this.notify(LogLevel.Warning, message, params, undefined, undefined);
  }

  info(message: string, params?: LogParams): void {
    this.notify(LogLevel.Info, message, params, undefined, undefined);
  }

  debug(message: string, params?: LogParams) {
    this.notify(LogLevel.Debug, message, params, undefined, undefined);
  }

  trace(message: string, params?: LogParams) {
    this.notify(LogLevel.Trace, message, params, undefined, undefined);
  }
  //endregion

  //region factory methods
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
  //endregion

  //region setup methods
  updateParams(params: LogParams): void {
    this.setup.logParams = {
      ...this.setup.logParams,
      ...params,
    };
  }
  //endregion

  //region internal logic
  private notify(
    level: LogLevel,
    message: string,
    params: LogParams | undefined,
    error: unknown | undefined,
    errorLevel: ErrorLevel | undefined,
  ) {
    const data: LogData = {
      level,
      message,
      params: this.prepareParams(params),
      tag: this.setup.tag,
      error,
      errorLevel,
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
    return this.objectFormatter.processParamObject(params) as LogParams;
  }
  //endregion

  //region error formatter
  private prepareErrorMessage(error: unknown): string {
    if (typeof error === 'string') return error;
    if (typeof error === 'object') {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const message = (error as any).message;
      if (message) return message;
    }
    return 'Unknown error';
  }
  //endregion
}
