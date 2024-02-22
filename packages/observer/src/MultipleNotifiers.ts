import {LoggerNotifierBase, LoggerNotifierBaseOptions} from './LoggerNotifierBase';
import {ILoggerNotifier} from './ILoggerNotifier';
import {LogData} from '@spryrocks/logger-core';

export type MultipleNotifiersOptions<TLogData extends LogData> =
  LoggerNotifierBaseOptions<TLogData> & {
    notifiers: Array<ILoggerNotifier<TLogData>>;
  };

export class MultipleNotifiers<
  TLogData extends LogData = LogData,
> extends LoggerNotifierBase<TLogData> {
  private readonly notifiers: Array<ILoggerNotifier<TLogData>>;

  constructor(options: MultipleNotifiersOptions<TLogData>) {
    super(options);
    this.notifiers = options.notifiers;
  }

  override notify(data: TLogData) {
    if (!super.notify(data)) return false;
    for (let notifier of this.notifiers) {
      if (notifier.notify(data)) return true;
    }
    return false;
  }
}
