import create from 'zustand';
import { Specimen } from '../renderer/types';

type User = {
  id: string;
  username: string;
  fullName: string;
  accessRole: string;
};

type QueryConfig = {
  queryString: string;
  filter: string;
  filterByFields: (keyof Specimen)[] | 'all';
  table: string;
  data: Specimen[];
  setData(data: Specimen[]): void;
  setTable(table: string): void;
  setCurrentQuery(query: string): void;
  setFilter(filter: string): void;
  setFilterByFields(fields: (keyof Specimen)[] | 'all'): void;
};

const defaultQueryConfig = {
  queryString: '',
  filter: '',
  filterByFields: 'all' as (keyof Specimen)[] | 'all',
  data: [],
  table: '',
};

type TableConfig = {
  headers: string[];
  updateTableHeaders(newHeaders: string[]): void;
};

export type LoggingError = {
  index?: number; // refers to the line number in the CSV
  code?: string | number;
  field?: string;
  message: string;
};

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

const defaultTableConfig = {
  headers: [
    'catalogNumber',
    'otherCatalogNumber',
    'order_',
    'genus',
    'specificEpithet',
  ],
};

const defaultLogs = {
  select: [],
  count: [],
  update: [],
  bulkInsert: [],
  singleInsert: [],
  delete: [],
  global: [],
};

// TODO: change naming scheme for some of these fields, they don't make sense
type SpesqlSession = {
  user?: User | null;

  expiredSession: boolean;
  expireSession(): void;

  prefersSound: boolean;
  toggleSoundPreference(newVal?: boolean): void;

  // query config
  queryData: QueryConfig;
  tableConfig: TableConfig;

  selectedSpecimen: Specimen | null;

  // globals
  loading: boolean;
  errors: Logs;

  clearErrors(target: string): void;

  updateSelectLog(newLog: LoggingError[]): void;
  updateCountLog(newLog: LoggingError[]): void;
  updateUpdateLog(newLog: LoggingError[]): void;
  updateSingleInsertLog(newLog: LoggingError[]): void;
  updateBulkInsertLog(newLog: BulkInsertError[]): void;
  updateDeleteLog(newLog: LoggingError[]): void;

  // actions
  toggleLoading(newLoading?: boolean): void;
  setSelectedSpecimen(specimen: Specimen | null): void;
  login(
    id: string,
    fullName: string,
    username: string,
    accessRole: string
  ): void;
  logout(): void;
};

export const useStore = create<SpesqlSession>((set) => ({
  user: null,

  expiredSession: true,

  expireSession: () =>
    set((state) => ({
      ...state,
      expiredSession: true,
    })),

  // TODO: should i add a queue for functions to be rerun on expired session?

  prefersSound: true,
  toggleSoundPreference: (newVal?: boolean) =>
    set((state) => ({
      ...state,
      prefersSound: newVal ?? !state.prefersSound,
    })),

  login: (id: string, fullName: string, username: string, accessRole: string) =>
    set((state) => ({
      ...state,
      user: { id, fullName, username, accessRole },
      expiredSession: false,
    })),

  logout: () =>
    set((state) => ({ ...state, user: null, expiredSession: true })),

  // QUERY CONFIGS
  queryData: {
    ...defaultQueryConfig,
    setData: (data: Specimen[]) =>
      set((state) => ({
        ...state,
        queryData: { ...state.queryData, data },
      })),
    setTable: (table: string) =>
      set((state) => ({
        ...state,
        queryData: { ...state.queryData, table },
      })),
    setCurrentQuery: (query: string) =>
      set((state) => ({
        ...state,
        queryData: { ...state.queryData, queryString: query },
      })),
    setFilter: (filter: string) =>
      set((state) => ({
        ...state,
        queryData: { ...state.queryData, filter },
      })),
    setFilterByFields: (fields: (keyof Specimen)[] | 'all') =>
      set((state) => ({
        ...state,
        queryData: { ...state.queryData, filterByFields: fields },
      })),
  },
  tableConfig: {
    ...defaultTableConfig,
    updateTableHeaders: (newHeaders: string[]) =>
      set((state) => ({
        ...state,
        tableConfig: { ...state.tableConfig, headers: newHeaders },
      })),
  },

  selectedSpecimen: null,
  setSelectedSpecimen: (specimen: Specimen | null) => {
    set((state) => ({
      ...state,
      selectedSpecimen: specimen,
    }));
  },

  errors: defaultLogs,

  clearErrors: (target: string) => {
    set((state) => ({
      ...state,
      errors: {
        ...state.errors,
        [target]: [],
      },
    }));
  },

  updateSelectLog: (newLog: LoggingError[]) => {
    set((state) => ({
      ...state,
      errors: {
        ...state.errors,
        select: newLog,
      },
    }));
  },
  updateCountLog: (newLog: LoggingError[]) => {
    set((state) => ({
      ...state,
      errors: {
        ...state.errors,
        count: newLog,
      },
    }));
  },
  updateUpdateLog: (newLog: LoggingError[]) => {
    set((state) => ({
      ...state,
      errors: {
        ...state.errors,
        update: newLog,
      },
    }));
  },
  updateSingleInsertLog: (newLog: LoggingError[]) => {
    set((state) => ({
      ...state,
      errors: {
        ...state.errors,
        singleInsert: newLog,
      },
    }));
  },
  updateBulkInsertLog: (newLog: BulkInsertError[]) => {
    set((state) => ({
      ...state,
      errors: {
        ...state.errors,
        bulkInsert: newLog,
      },
    }));
  },
  updateDeleteLog: (newLog: LoggingError[]) => {
    set((state) => ({
      ...state,
      errors: {
        ...state.errors,
        delete: newLog,
      },
    }));
  },

  // APP STATES
  loading: false,
  toggleLoading: (newLoading?: boolean) =>
    set((state) => ({
      ...state,
      loading: newLoading ?? !state.loading,
    })),
}));
