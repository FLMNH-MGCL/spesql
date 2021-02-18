import create from 'zustand';
import { ChartOptions, GoogleChartType } from '../renderer/types';
import { ChartWrapperOptions } from 'react-google-charts/dist/types';
import { defaultChartConfig } from './chartDefaults';

// export type ChartDataStructure = '';

export type ChartConfig = {
  chartType: GoogleChartType;
  data: any[];
  availableFields: string[] | '*';

  setAvailableFields(fields: string[] | '*'): void;
  setChartType(newChart: GoogleChartType): void;
  setOptions(options: ChartOptions): void;
} & Pick<ChartWrapperOptions, 'options'>;

type ChartData = {
  data: any[];
  setData(newData: any[]): void;

  currentQuery: string;
  setCurrentQuery(queryString: string): void;

  config: ChartConfig;
};

export const useChartStore = create<ChartData>((set, _get) => ({
  data: [],

  setData: function (newData: any[]) {
    set((state) => ({
      ...state,
      data: newData,
    }));
  },

  currentQuery: '',

  setCurrentQuery: function (queryString: string) {
    set((state) => ({
      ...state,
      currentQuery: queryString,
    }));
  },

  config: {
    ...(defaultChartConfig as ChartConfig),
    setAvailableFields: (fields: string[] | '*') =>
      set((state) => ({
        ...state,
        config: { ...state.config, availableFields: fields },
      })),
    setChartType: (newChart: GoogleChartType) =>
      set((state) => ({
        ...state,
        config: { ...state.config, chartType: newChart },
      })),
    setOptions: function (options) {
      set((state) => ({
        ...state,
        config: {
          ...state.config,
          options: {
            ...state.config.options,
            ...options,
          },
        },
      }));
    },
  },
}));
