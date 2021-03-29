import React from 'react';
import EditBroadChart from './configs/EditBroadChart';
import EditSankeyChart from './configs/EditSankeyChart';

export function getConfigModal(chart: string) {
  switch (chart) {
    case 'Sankey': {
      return <EditSankeyChart />;
    }

    default: {
      return <EditBroadChart />;
    }
  }
}

export function canHaveTrends(chart: string) {
  switch (chart) {
    case 'AreaChart':
      return false;

    default:
      return true;
  }
}
