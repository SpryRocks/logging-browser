export type LogFormatterOptions = {
  formatObject?: () => object;
};

export interface ILogFormatter {
  get logFormatter(): LogFormatterOptions;
}
