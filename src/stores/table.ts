export type TableConfig = {
  headers: string[];
  updateTableHeaders(newHeaders: string[]): void;
};

export type LoggingError = {
  index?: number; // refers to the line number in the CSV
  code?: string | number;
  sql?: string;
  field?: string;
  message: string;
};

// TODO: this needs to be changed, server errors should be handled differently
export type BulkInsertError = {
  index: number;
  errors: { field: string; message: string | boolean }[];
};

export type Logs = {
  select: LoggingError[];
  count: LoggingError[];
  update: LoggingError[];
  bulkInsert: BulkInsertError[];
  singleInsert: LoggingError[];
  delete: LoggingError[];
  global: LoggingError[];
};

export const defaultTableConfig = {
  headers: [
    'catalogNumber',
    'otherCatalogNumber',
    'order_',
    'genus',
    'specificEpithet',
  ],
};

export const defaultLogs = {
  select: [],
  count: [],
  update: [],
  bulkInsert: [],
  singleInsert: [],
  delete: [],
  global: [],
};
