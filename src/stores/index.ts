import create from 'zustand';
import { Specimen } from '../renderer/types';

type User = {
  id: string;
  username: string;
  accessRole: string;
};

type QueryConfig = {
  queryString: string;
  table: string;
  data: Specimen[];
  setData(data: Specimen[]): void;
  setTable(table: string): void;
  setCurrentQuery(query: string): void;
};

const defaultQueryConfig = {
  queryString: '',
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
  message: string;
};

export type InsertError = {
  index: number;
  errors: { field: string; message: string | boolean }[];
};

export type Logs = {
  select: LoggingError[];
  count: LoggingError[];
  update: LoggingError[];
  insert: InsertError[];
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
  insert: [],
  delete: [],
  global: [],
};

// TODO: change naming scheme for some of these fields, they don't make sense
type SpesqlSession = {
  user?: User | null;

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
  updateInsertLog(newLog: InsertError[]): void;
  updateDeleteLog(newLog: LoggingError[]): void;

  // actions
  toggleLoading(newLoading?: boolean): void;
  setSelectedSpecimen(specimen: Specimen | null): void;
  login(id: string, username: string, accessRole: string): void;
  logout(): void;
};

export const useStore = create<SpesqlSession>((set) => ({
  user: null,

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
  updateInsertLog: (newLog: InsertError[]) => {
    set((state) => ({
      ...state,
      errors: {
        ...state.errors,
        insert: newLog,
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

  login: (id: string, username: string, accessRole: string) =>
    set((state) => ({ ...state, user: { id, username, accessRole } })),
  logout: () => set((state) => ({ ...state, user: null })),
}));
