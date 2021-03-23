import { Select, TABLE_CLASSES } from '@flmnh-mgcl/ui';
import React, { useCallback } from 'react';
import shallow from 'zustand/shallow';
import { charts } from './utils/constants';
import { getChartInfoSheet, getChartModal } from './forms/charts/utils';
import { useChartStore } from '../../stores/chart';
import AdvancedQueryModal from './modals/charts/AdvancedQueryModal';

export default function ChartConfigForm() {
  const { chartType } = useChartStore((state) => state.config, shallow);

  const setChartType = useChartStore((state) => state.config.setChartType);

  const getInfoSheet = useCallback(() => getChartInfoSheet(chartType), [
    chartType,
  ]);

  const getModal = useCallback(() => getChartModal(chartType), [chartType]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 p-3">
        <Select
          label="Chart Type"
          name="chartType"
          options={charts}
          value={chartType}
          updateControlled={(newChart) => setChartType(newChart)}
          searchable
          fullWidth
        />

        {getInfoSheet()}
      </div>
      <nav className={TABLE_CLASSES.footerFixed}>
        <div>{chartType && <AdvancedQueryModal />}</div>
        <div>{getModal()}</div>
      </nav>
    </div>
  );
}
