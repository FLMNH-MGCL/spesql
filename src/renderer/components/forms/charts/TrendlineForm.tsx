import { Input, Label, Radio, Select } from '@flmnh-mgcl/ui';
import React from 'react';
import { SingleColorPicker } from '../../ChartColorPicker';
import { DEFAULT_CHART_COLORS, trendLineTypes } from '../../utils/constants';

type TProps = {
  index: number;
  handleTrendChange(index: number, field: string, value: any): void;
};

// FIXME
function TrendLine({ index, handleTrendChange }: TProps) {
  return (
    <div className="flex space-x-2 py-2 items-end">
      <Select
        name="type"
        label="Trend Type"
        updateControlled={(newVal) => handleTrendChange(index, 'type', newVal)}
        options={trendLineTypes}
        defaultValue=""
        fullWidth
      />
      <Radio
        name="labelInLegend"
        label="Show Label"
        stacked
        onChange={(e) =>
          handleTrendChange(index, 'labelInLegend', e.target.value)
        }
        defaultChecked={true}
      />
      <div>
        <Label>Trend Color:</Label>
        <SingleColorPicker
          defaultColor={
            DEFAULT_CHART_COLORS[DEFAULT_CHART_COLORS.length - 1 - index]
          }
          onChange={(newColor) => handleTrendChange(index, 'color', newColor)}
          width="full"
        />
      </div>
    </div>
  );
}

type Props = {
  numTrends: number;
  setNumTrends: React.Dispatch<React.SetStateAction<number>>;
  trends: any[];
  setTrends: React.Dispatch<React.SetStateAction<any[]>>;
};

export default function TrendlineForm({
  numTrends,
  setNumTrends,
  trends,
  setTrends,
}: Props) {
  function handleNumTrendsChange(num: number) {
    if (num > trends.length) {
      let newTrends = [
        ...trends,
        ...Array.from({ length: num - trends.length }, () => {
          return {};
        }),
      ];

      setTrends(newTrends);
    } else if (num < trends.length) {
      let newTrends = trends.slice(0, num);
      setTrends(newTrends);
    }

    setNumTrends(num);
  }

  function handleTrendChange(index: number, field: string, value: any) {
    if (field === 'type' && (!value || !value.length)) {
      let target = trends[index];
      delete target.type;
      let newTrends = trends.splice(index, 1, target);
      setTrends(newTrends);
    } else {
      let target = trends[index];
      target[field] = value;
      let newTrends = trends.splice(index, 1, target);
      setTrends(newTrends);
    }
  }

  return (
    <div className="pb-3">
      <Input
        name="numTrends"
        label="Number of Trendlines"
        value={numTrends}
        onChange={(e) => handleNumTrendsChange(parseInt(e.target.value, 10))}
        type="number"
        min="1"
      />
      {Array.from({ length: numTrends }, (_, i) => {
        return (
          <TrendLine key={i} index={i} handleTrendChange={handleTrendChange} />
        );
      })}
    </div>
  );
}
