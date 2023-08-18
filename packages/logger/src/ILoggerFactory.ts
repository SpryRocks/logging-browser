import {ILogger} from './ILogger';
import {LogObjectFormatter} from './ILogFormatter';

export type CreateLoggerOptions<TGlobalData> = {
  globalData?: Partial<TGlobalData>;
  objectFormatter?: LogObjectFormatter;
};

export interface ILoggerFactory<TGlobalData = unknown> {
  createLogger(tag?: string, options?: CreateLoggerOptions<TGlobalData>): ILogger;
}
