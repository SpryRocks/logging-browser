export type LogFormatOptions = {
  formatObject?: () => object;
};

export interface ILogFormatter {
  get logFormatter(): LogFormatOptions;
}
