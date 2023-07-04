export type LogParam = [string, unknown];

export interface ILogger {
  warning(message: string, ...params: LogParam[]): void;
  debug(message: string, ...params: LogParam[]): void;
  info(message: string, ...params: LogParam[]): void;
  error(message: string, ...params: LogParam[]): void;
  updateParams(...params: LogParam[]): void;
  tag(tag: string): ILogger;
}
