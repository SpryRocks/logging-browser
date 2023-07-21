import {LogParams} from '@spryrocks/logger-observer';

export type TagOptions = {keepParams?: boolean};

export type ChildOptions = {keepParams?: boolean};

export interface ILogger {
  error(error: unknown, message?: string, params?: LogParams): void;
  warning(message: string, params?: LogParams): void;
  info(message: string, params?: LogParams): void;
  debug(message: string, params?: LogParams): void;
  trace(message: string, params?: LogParams): void;
  updateParams(params: LogParams): void;
  tag(tag: string, options?: TagOptions): ILogger;
  child(options?: ChildOptions): ILogger;
}
