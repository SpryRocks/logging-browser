import {LoggerFactory as CoreLoggerFactory} from '@spryrocks/logger';
import {LogData} from '@spryrocks/logger-plugin-observer';

export class LoggerFactory<
  TLogData extends LogData = LogData,
> extends CoreLoggerFactory<TLogData> {}
