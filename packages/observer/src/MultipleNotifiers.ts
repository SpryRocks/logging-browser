import {ILoggerNotifier} from './ILoggerNotifier';
import {LogData} from '@spryrocks/logger-core';

export class MultipleNotifiers<TLogData extends LogData = LogData>
  implements ILoggerNotifier<TLogData>
{
  constructor(private readonly notifiers: Array<ILoggerNotifier<TLogData>>) {}

  notify(data: TLogData): boolean {
    for (let notifier of this.notifiers) {
      if (notifier.notify(data)) return true;
    }
    return false;
  }
}
