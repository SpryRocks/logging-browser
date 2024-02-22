import {ILoggerNotifier} from './ILoggerNotifier';
import {LogData} from '@spryrocks/logger-core';
import {LoggerNotifierBase} from './LoggerNotifierBase';

export class MultipleNotifiers<
  TLogData extends LogData = LogData,
> extends LoggerNotifierBase<TLogData> {
  constructor(private readonly notifiers: Array<ILoggerNotifier<TLogData>>) {
    super();
  }

  override notify(data: TLogData) {
    if (!super.notify(data)) return false;
    for (let notifier of this.notifiers) {
      if (notifier.notify(data)) return true;
    }
    return false;
  }
}
