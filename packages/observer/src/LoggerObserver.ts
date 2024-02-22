import {ILoggerObserver} from './ILoggerObserver';
import {ILoggerReceiver} from './ILoggerReceiver';
import {LogData} from '@spryrocks/logger-core';
import {LoggerNotifierBase} from './LoggerNotifierBase';

export class LoggerObserver<TLogData extends LogData = LogData>
  extends LoggerNotifierBase<TLogData>
  implements ILoggerObserver<TLogData>
{
  private readonly receivers: ILoggerReceiver<TLogData>[] = [];

  add(logger: ILoggerReceiver<TLogData>) {
    this.receivers.push(logger);
  }

  override notify(data: TLogData) {
    if (!super.notify(data)) return false;
    for (let receiver of this.receivers) {
      if (receiver.onLogReceived(data)) return true;
    }
    return false;
  }
}
