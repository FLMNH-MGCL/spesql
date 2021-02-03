import React from 'react';
import { Text } from '@flmnh-mgcl/ui';
import { SankeyInfoSheet } from './SankeyForm';
import SankeyModal from '../../modals/charts/SankeyModal';

export function getChartInfoSheet(chartType: string) {
  switch (chartType) {
    case 'AnnotationChart': {
      return <div></div>;
    }
    case 'AreaChart': {
      return <div></div>;
    }
    case 'BarChart': {
      return <div></div>;
    }
    case 'BubbleChart': {
      return <div></div>;
    }
    case 'Calendar': {
      return <div></div>;
    }
    case 'CandlestickChart': {
      return <div></div>;
    }
    case 'ColumnChart': {
      return <div></div>;
    }
    case 'ComboChart': {
      return <div></div>;
    }
    case 'DiffChart': {
      return <div></div>;
    }
    case 'DonutChart': {
      return <div></div>;
    }
    case 'Gantt': {
      return <div></div>;
    }
    case 'Gauge': {
      return <div></div>;
    }
    case 'GeoChart': {
      return <div></div>;
    }
    case 'Histogram': {
      return <div></div>;
    }
    case 'LineChart': {
      return <div></div>;
    }
    case 'Line': {
      return <div></div>;
    }
    case 'Bar': {
      return <div></div>;
    }
    case 'Map': {
      return <div></div>;
    }
    case 'OrgChart': {
      return <div></div>;
    }
    case 'PieChart': {
      return <div></div>;
    }
    case 'Sankey': {
      return <SankeyInfoSheet />;
    }
    case 'ScatterChart': {
      return <div></div>;
    }
    case 'SteppedAreaChart': {
      return <div></div>;
    }
    case 'Table': {
      return <div></div>;
    }
    case 'Timeline': {
      return <div></div>;
    }
    case 'TreeMap': {
      return <div></div>;
    }
    case 'WaterfallChart': {
      return <div></div>;
    }
    case 'WordTree': {
      return <div></div>;
    }
    default: {
      return <Text>Select a Chart Type to get started</Text>;
    }
  }
}

export function getChartModal(chartType: string) {
  switch (chartType) {
    case 'AnnotationChart': {
      return <div></div>;
    }
    case 'AreaChart': {
      return <div></div>;
    }
    case 'BarChart': {
      return <div></div>;
    }
    case 'BubbleChart': {
      return <div></div>;
    }
    case 'Calendar': {
      return <div></div>;
    }
    case 'CandlestickChart': {
      return <div></div>;
    }
    case 'ColumnChart': {
      return <div></div>;
    }
    case 'ComboChart': {
      return <div></div>;
    }
    case 'DiffChart': {
      return <div></div>;
    }
    case 'DonutChart': {
      return <div></div>;
    }
    case 'Gantt': {
      return <div></div>;
    }
    case 'Gauge': {
      return <div></div>;
    }
    case 'GeoChart': {
      return <div></div>;
    }
    case 'Histogram': {
      return <div></div>;
    }
    case 'LineChart': {
      return <div></div>;
    }
    case 'Line': {
      return <div></div>;
    }
    case 'Bar': {
      return <div></div>;
    }
    case 'Map': {
      return <div></div>;
    }
    case 'OrgChart': {
      return <div></div>;
    }
    case 'PieChart': {
      return <div></div>;
    }
    case 'Sankey': {
      return <SankeyModal />;
    }
    case 'ScatterChart': {
      return <div></div>;
    }
    case 'SteppedAreaChart': {
      return <div></div>;
    }
    case 'Table': {
      return <div></div>;
    }
    case 'Timeline': {
      return <div></div>;
    }
    case 'TreeMap': {
      return <div></div>;
    }
    case 'WaterfallChart': {
      return <div></div>;
    }
    case 'WordTree': {
      return <div></div>;
    }
    default: {
      return <Text>Select a Chart Type to get started</Text>;
    }
  }
}
