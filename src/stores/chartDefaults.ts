import { DEFAULT_CHART_COLORS } from '../renderer/components/utils/constants';
import { ChartConfig } from './chart';

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
