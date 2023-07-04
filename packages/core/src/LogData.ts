import {LogType} from './LogType';

export type LogParams = {[key: string]: string};

export type LogData = {
  type: LogType;
  tag: string | undefined;
  message: string;
  params: LogParams;
};
