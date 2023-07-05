import {ILogger, TagOptions} from './ILogger';
import {ILoggerNotifier, LogData, LogParams, LogType} from '@spryrocks/logger-observer';

export type PrepareLogData<TLogData extends LogData> = (data: LogData) => TLogData;

type LoggerOptions<TLogData extends LogData> = {
  notifier: ILoggerNotifier<TLogData>;
  prepareLogData: PrepareLogData<TLogData>;
  tag: string | undefined;
  logParams: LogParams | undefined;
};

export class Logger<TLogData extends LogData> implements ILogger {
  constructor(private readonly options: LoggerOptions<TLogData>) {}

  warning(message: string, params?: LogParams): void {
    this.notify(LogType.Warning, message, params);
  }

  debug(message: string, params?: LogParams) {
    this.notify(LogType.Debug, message, params);
  }

  info(message: string, params?: LogParams): void {
    this.notify(LogType.Info, message, params);
  }

  error(message: string, params?: LogParams): void {
    this.notify(LogType.Error, message, params);
  }

  tag(tag: string, options?: TagOptions): ILogger {
    return new Logger({
      notifier: this.options.notifier,
      prepareLogData: this.options.prepareLogData,
      tag,
      logParams: options?.keepParams ? this.options.logParams : undefined,
    });
  }

  updateParams(params: LogParams): void {
    this.options.logParams = {
      ...this.options.logParams,
      ...params,
    };
  }

  private notify(type: LogType, message: string, params: LogParams | undefined) {
    const data: LogData = {
      type,
      message,
      params: this.prepareParams(params),
      tag: this.options.tag,
    };
    this.options.notifier.notify(this.options.prepareLogData(data));
  }

  private prepareParams(params: LogParams | undefined): LogParams {
    return {
      ...this.options.logParams,
      ...params,
    };
  }
}
