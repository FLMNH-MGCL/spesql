import create from 'zustand';
import { Specimen } from '../renderer/types';

type User = {
  id: string;
  username: string;
  accessRole: string;
};

type QueryConfig = {
  queryString: string;
  data: Specimen[];
  setData(data: Specimen[]): void;
  setCurrentQuery(query: string): void;
};

const defaultQueryConfig = {
  queryString: '',
  data: [],
};

type TableConfig = {
  headers: string[];
  updateTableHeaders(newHeaders: string[]): void;
};

type LoggingError = {
  code?: string | number;
  message: string;
};

type Logs = {
  select: LoggingError[];
  count: LoggingError[];
  update: LoggingError[];
  insert: LoggingError[];
  delete: LoggingError[];
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
};

// TODO: change naming scheme for some of these fields, they don't make sense
type SpesqlSession = {
  user?: User | null;

  // query config
  queryData: QueryConfig;
  tableConfig: TableConfig;

  // globals
  loading: boolean;
  errors: Logs;

  // actions
  toggleLoading(newLoading?: boolean): void;
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

  errors: defaultLogs,

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
