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

const defaultTableConfig = {
  headers: [
    'catalogNumber',
    'otherCatalogNumber',
    'order_',
    'genus',
    'specificEpithet',
  ],
};

// TODO: change naming scheme for some of these fields, they don't make sense
type SpesqlSession = {
  user?: User | null;
  queryData: QueryConfig;
  tableConfig: TableConfig;
  login(id: string, username: string, accessRole: string): void;
  logout(): void;
};

export const useStore = create<SpesqlSession>((set) => ({
  user: null,
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
  login: (id: string, username: string, accessRole: string) =>
    set((state) => ({ ...state, user: { id, username, accessRole } })),
  logout: () => set((state) => ({ ...state, user: null })),
}));
