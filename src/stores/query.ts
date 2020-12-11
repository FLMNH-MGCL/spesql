import { Specimen } from '../renderer/types';

export type QueryConfig = {
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

export const defaultQueryConfig = {
  queryString: '',
  filter: '',
  filterByFields: 'all' as (keyof Specimen)[] | 'all',
  data: [],
  table: '',
};
