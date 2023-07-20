import {LogLevel} from './LogLevel';

export type LogParams = {[key: string]: unknown};

export type LogData = {
  level: LogLevel;
  tag: string | undefined;
  message: string;
  params: LogParams | undefined;
  error: unknown | undefined;
};
