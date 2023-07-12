import {LogData as CoreLogData, LogLevel, LogParams} from '@spryrocks/logger-core';

export type LogData = CoreLogData & {plugin: string; action: string | undefined};

export {LogParams, LogLevel, CoreLogData};
