export type LogObjectFormatter = (data: object) => object;

export type LogFormatterOptions<TSource> = {
  excludeFields?: (keyof TSource)[];
  formatObject?: () => object;
};

export interface ILogFormatter<TSource> {
  get logFormatter(): LogFormatterOptions<TSource>;
}
