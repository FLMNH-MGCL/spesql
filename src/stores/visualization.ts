import { ChartWrapperOptions } from 'react-google-charts/dist/types';
import { GoogleChartType } from '../renderer/types';

// export type ChartDataStructure = '';

export type ChartConfig = {
  chartType: GoogleChartType;
  data: any[];
  availableFields: string[] | '*';

  setAvailableFields(fields: string[] | '*'): void;
  setChartType(newChart: GoogleChartType): void;
} & Pick<ChartWrapperOptions, 'options'>;

export const defaultChartConfig: Partial<ChartConfig> = {
  chartType: 'Sankey',
  data: [],
  options: {},
  availableFields: [],
};
