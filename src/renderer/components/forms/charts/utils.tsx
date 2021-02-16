import React from 'react';
import { SankeyInfoSheet } from './SankeyForm';
import SankeyModal from '../../modals/charts/SankeyModal';
import { AreaChartInfoSheet } from './AreaChartForm';
import AreaChartModal from '../../modals/charts/AreaChartModal';
import BarChartModal from '../../modals/charts/BarChartModal';
import { BarChartInfoSheet } from './BarChartForm';

export function getChartInfoSheet(chartType: string) {
  switch (chartType) {
    case 'AreaChart': {
      return <AreaChartInfoSheet />;
    }
    case 'BarChart': {
      return <BarChartInfoSheet />;
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
      return null;
    }
  }
}

export function getChartModal(chartType: string) {
  switch (chartType) {
    case 'AreaChart': {
      return <AreaChartModal />;
    }
    case 'BarChart': {
      return <BarChartModal />;
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
      return null;
    }
  }
}
