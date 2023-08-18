import {ILogger} from './ILogger';
import {LogObjectFormatter} from './ILogFormatter';

export type CreateLoggerOptions<TGlobalData = unknown> = {
  globalData?: Partial<TGlobalData>;
  objectFormatter?: LogObjectFormatter;
};

export interface ILoggerFactory<TGlobalData> {
  createLogger(tag?: string, options?: CreateLoggerOptions<TGlobalData>): ILogger;
}
