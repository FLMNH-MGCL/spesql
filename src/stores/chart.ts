import create from 'zustand';
import { ChartOptions, GoogleChartType } from '../renderer/types';
import { ChartWrapperOptions } from 'react-google-charts/dist/types';
import { DEFAULT_CHART_COLORS } from '../renderer/components/utils/constants';

// export type ChartDataStructure = '';

export type ChartConfig = {
  chartType: GoogleChartType;
  data: any[];
  availableFields: string[] | '*';

  setAvailableFields(fields: string[] | '*'): void;
  setChartType(newChart: GoogleChartType): void;
  setOptions(options: ChartOptions): void;
} & Pick<ChartWrapperOptions, 'options'>;

const defaultControls = {
  explorer: {
    actions: ['dragToZoom', 'rightClickToReset'],
    axis: 'horizontal',
    maxZoomIn: 10,
  },
  colors: DEFAULT_CHART_COLORS,
};

export const defaultSankeyOptions = {
  sankey: {
    link: {
      color: {
        fill: '#aaaaaa',
        fillOpacity: 0.6,
        stroke: 'none',
        strokeWidth: 0,
      },
    },
    node: {
      label: {
        fontSize: 12,
        color: '#000',
        bold: false,
        italic: false,
      },
      colors: DEFAULT_CHART_COLORS,
      labelPadding: 6, // Horizontal distance between the label and the node.
      nodePadding: 10, // Vertical distance between nodes.
      width: 5, // Thickness of the node.
    },
  },
};

export const defaultChartConfig: Partial<ChartConfig> = {
  chartType: undefined,
  data: [],
  options: {
    ...defaultControls,
    legend: 'right',
    orientation: 'horizontal',
    chartArea: {
      height: '80%',
      width: '80%',
      backgroundColor: '#fff',
    },
    hAxis: {
      title: '',
    },
    vAxis: {
      title: '',
    },
    trendlines: {
      0: {
        type: 'exponential',
        color: 'green',
        lineWidth: 3,
        opacity: 0.3,
        showR2: true,
        visibleInLegend: true,
      },
    },
    ...defaultSankeyOptions,
  },
  availableFields: [],
};

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
