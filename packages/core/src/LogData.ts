import {LogType} from './LogType';

export type LogParams = {[key: string]: unknown};

export type LogData = {
  type: LogType;
  tag: string | undefined;
  message: string;
  params: LogParams;
};
