import React from 'react';
import { SankeyInfoSheet } from './SankeyForm';
import SankeyModal from '../../modals/charts/SankeyModal';
import { AreaChartInfoSheet } from './AreaChartForm';
import AreaChartModal from '../../modals/charts/AreaChartModal';
import BarChartModal from '../../modals/charts/BarChartModal';
import { BarChartInfoSheet } from './BarChartForm';
import { BubbleChartInfoSheet } from './BubbleChartForm';

export function getChartInfoSheet(chartType: string) {
  switch (chartType) {
    case 'AreaChart': {
      return <AreaChartInfoSheet />;
    }
    case 'BarChart': {
      return <BarChartInfoSheet />;
    }
    case 'BubbleChart': {
      return <BubbleChartInfoSheet />;
    }
    case 'ComboChart': {
      return <div>This chart type isn't supported yet! Stay tuned!</div>;
    }
    case 'DiffChart': {
      return <div>This chart type isn't supported yet! Stay tuned!</div>;
    }
    case 'DonutChart': {
      return <div>This chart type isn't supported yet! Stay tuned!</div>;
    }
    case 'Gantt': {
      return <div>This chart type isn't supported yet! Stay tuned!</div>;
    }
    case 'Gauge': {
      return <div>This chart type isn't supported yet! Stay tuned!</div>;
    }
    case 'GeoChart': {
      return <div>This chart type isn't supported yet! Stay tuned!</div>;
    }
    case 'Histogram': {
      return <div>This chart type isn't supported yet! Stay tuned!</div>;
    }
    case 'LineChart': {
      return <div>This chart type isn't supported yet! Stay tuned!</div>;
    }
    case 'Line': {
      return <div>This chart type isn't supported yet! Stay tuned!</div>;
    }
    case 'Map': {
      return <div>This chart type isn't supported yet! Stay tuned!</div>;
    }
    case 'OrgChart': {
      return <div>This chart type isn't supported yet! Stay tuned!</div>;
    }
    case 'PieChart': {
      return <div>This chart type isn't supported yet! Stay tuned!</div>;
    }
    case 'Sankey': {
      return <SankeyInfoSheet />;
    }
    case 'ScatterChart': {
      return <div>This chart type isn't supported yet! Stay tuned!</div>;
    }
    case 'SteppedAreaChart': {
      return <div>This chart type isn't supported yet! Stay tuned!</div>;
    }
    case 'Table': {
      return <div>This chart type isn't supported yet! Stay tuned!</div>;
    }
    case 'Timeline': {
      return <div>This chart type isn't supported yet! Stay tuned!</div>;
    }
    case 'TreeMap': {
      return <div>This chart type isn't supported yet! Stay tuned!</div>;
    }
    case 'WaterfallChart': {
      return <div>This chart type isn't supported yet! Stay tuned!</div>;
    }
    case 'WordTree': {
      return <div>This chart type isn't supported yet! Stay tuned!</div>;
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
