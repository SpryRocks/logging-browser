import {LogData as CoreLogData} from '@spryrocks/logger-core';

export type LogData = CoreLogData & {plugin: string; action: string | undefined};
