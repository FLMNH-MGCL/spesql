export type LoggingError = {
  index?: number; // refers to the line number in the CSV
  code?: string | number;
  sql?: string;
  field?: string;
  fieldValue?: any;
  catalogNumber?: string;
  message: string | boolean;
};

export type BulkInsertError = {
  index: number;
  row?: number;
  errors: LoggingError[];
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

export const defaultLogs = {
  select: [],
  count: [],
  update: [],
  bulkInsert: [],
  singleInsert: [],
  delete: [],
  global: [],
};
