import {ILogFormatter, LogFormatterOptions, LogObjectFormatter} from './ILogFormatter';

export class ObjectFormatter {
  constructor(
    private readonly setup: {
      objectFormatter: LogObjectFormatter | undefined;
      getGlobalObjectFormatters: () => LogObjectFormatter | undefined;
    },
  ) {}

  private processParamArray(arr: Array<unknown>): Array<unknown> {
    return arr.map((a) => this.processParam(a));
  }

  private processParam(param: unknown): unknown {
    if (!param) return param;
    if (typeof param === 'object') return this.processParamObject(param);
    return param;
  }

  processParamObject(param: object): object {
    if (Array.isArray(param)) {
      return this.processParamArray(param);
    }

    const param_ = param as ILogFormatter<unknown>;
    // format object with logFormatter
    const ownLogFormatter = param_.logFormatter;
    if (ownLogFormatter) {
      const result = this.formatParamObjectWithOwnFormatter(param, ownLogFormatter);
      if (result) return result;
    }
    const globalLogFormatter =
      this.setup.objectFormatter ?? this.setup.getGlobalObjectFormatters();
    if (globalLogFormatter) {
      return this.formatParamObjectWithGlobalFormatter(param, globalLogFormatter);
    }
    return this.processObjectFields(param);
  }

  private processObjectFields(data: object) {
    const params = {...data};
    for (const key in params) {
      // eslint-disable-next-line
      // @ts-ignore
      params[key] = this.processParam(params[key]);
    }
    return params;
  }

  private formatParamObjectWithOwnFormatter(
    param: object,
    logFormatter: LogFormatterOptions<unknown>,
  ): object | undefined {
    if (logFormatter.formatObject) {
      return this.processObjectFields(logFormatter.formatObject());
    }
    if (logFormatter.excludeFields) {
      let excludeFields = logFormatter.excludeFields as string[];
      const result = {};
      for (const key in param) {
        if (excludeFields.includes(key)) continue;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        result[key] = this.processParam(param[key]);
      }
      return result;
    }
  }

  private formatParamObjectWithGlobalFormatter(
    param: object,
    logFormatter: LogObjectFormatter,
  ): object {
    return this.processObjectFields(logFormatter(param));
  }
}
