import {LogData as CoreLogData, LogParams, LogType} from '@spryrocks/logger-core';

export type LogData = CoreLogData & {plugin: string; action: string | undefined};

export {LogParams, LogType};
