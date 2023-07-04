import {ILoggerNotifier} from './ILoggerNotifier';
import {ILoggerObserver} from './ILoggerObserver';
import {ILoggerReceiver} from './ILoggerReceiver';
import {LogData} from '@spryrocks/logging-browser-core';

export class LoggerObserver<TLogData extends LogData>
  implements ILoggerObserver<TLogData>, ILoggerNotifier<TLogData>
{
  private readonly receivers: ILoggerReceiver<TLogData>[] = [];

  add(logger: ILoggerReceiver<TLogData>) {
    this.receivers.push(logger);
  }

  notify(data: TLogData) {
    for (let receiver of this.receivers) {
      if (receiver.onLogReceived(data)) return true;
    }
    return false;
  }
}
