import {ILogger} from './ILogger';

export interface ILoggerFactory {
  createLogger(tag?: string): ILogger;
}
