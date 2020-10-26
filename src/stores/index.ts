import create from 'zustand';
import { Specimen, SpecimenFields } from '../renderer/types';

type User = {
  id: string;
  username: string;
  accessRole: string;
};

type Query = {
  queryString: string;
  data: Specimen[];
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

type SpesqlSession = {
  user?: User | null;
  queryData?: Query | null;
  tableConfig: TableConfig;
  login(id: string, username: string, accessRole: string): void;
  logout(): void;
};

export const useStore = create<SpesqlSession>((set) => ({
  user: null,
  queryData: null,
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
