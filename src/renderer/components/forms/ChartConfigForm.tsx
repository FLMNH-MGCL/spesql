import React, { useCallback, useState } from 'react';
import shallow from 'zustand/shallow';
import { useStore } from '../../../stores';
import { SpecimenValidator } from '../../types';
import Code from '../ui/Code';
import Form, { Values } from '../ui/Form';
import Heading from '../ui/Heading';
import { SelectOption } from '../ui/Select';
import Text from '../ui/Text';
import { aggregates, charts } from '../utils/constants';

type ChartConfigProps = {
  keys: string[];
};

function validateStringConstraint(value: any) {
  return true;
}

function validateNumberConstraint(value: any) {}

type AggregateProps = {
  fields: SelectOption[];
  updateSelection?(newVal: any): void;
};

function AggregateForm({ fields, updateSelection }: AggregateProps) {
  return (
    <Form.Group flex>
      <Form.Select
        name="aggregate"
        label="Aggregate"
        register={{ validate: validateStringConstraint }}
        options={aggregates}
        fullWidth
      />
      <Form.Select
        name="field3"
        label="Field Three"
        register={{ validate: validateStringConstraint }}
        options={fields}
        updateControlled={updateSelection}
        fullWidth
      />
    </Form.Group>
  );
}

function SanekeyChartForm({ keys }: ChartConfigProps) {
  // const { getValues, setValue } = useFormContext();

  const [selected, setSelected] = useState<[string, string, string]>([
    '',
    '',
    '',
  ]);

  function getOptions(newSelected: any) {
    return keys
      .filter((key) => !newSelected?.includes(key))
      .map((key) => {
        return { label: key, value: key };
      });
  }

  const [options, setOptions] = useState(getOptions(['', '', '']));

  function handleChange(index: number, field: string) {
    let newSelected = selected;
    newSelected[index] = field;
    setSelected(newSelected);
    setOptions(getOptions(newSelected));
  }

  return (
    <React.Fragment>
      <Text className="py-1">
        Saneky Charts require three columns in the structure of:
      </Text>

      <Code rounded>[string, string, number]</Code>

      <Form.Group flex>
        <Form.Select
          name="field1"
          label="Field One"
          register={{ validate: validateStringConstraint }}
          options={options}
          updateControlled={(newVal) => handleChange(0, newVal)}
          fullWidth
        />
        <Form.Select
          name="field2"
          label="Field Two"
          register={{ validate: validateStringConstraint }}
          options={options}
          updateControlled={(newVal) => handleChange(1, newVal)}
          fullWidth
        />
      </Form.Group>

      <AggregateForm
        fields={options}
        updateSelection={(newVal: string) => handleChange(2, newVal)}
      />
    </React.Fragment>
  );
}

function getChartConfigForm(chartType: string, keys: string[]) {
  console.log('getting chart');
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
      return <SanekeyChartForm keys={keys} />;
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

export default function ChartConfigForm() {
  const { chartType, availableFields } = useStore(
    (state) => state.chartConfig,
    shallow
  );

  const hasQueried = useStore(
    (state) => !!state.queryData.queryString,
    shallow
  );

  const setChartType = useStore((state) => state.chartConfig.setChartType);

  const selectableFields =
    availableFields === '*' ? Object.keys(SpecimenValidator) : availableFields;

  function onSubmit(values: Values) {
    console.log(values);
  }

  const getForm = useCallback(
    () => getChartConfigForm(chartType, selectableFields),
    [chartType, selectableFields]
  );

  if (!hasQueried) {
    return (
      <div className="p-2 h-full w-full flex flex-col items-center justify-center">
        <Heading>No data detected</Heading>
        <Text>Please run a Select query to get started</Text>
      </div>
    );
  }

  return (
    <Form
      onSubmit={onSubmit}
      className="p-2"
      mode="onChange"
      id="chart-config-form"
    >
      <Form.Group flex>
        <Form.Select
          label="Chart Type"
          name="chartType"
          options={charts}
          value={chartType}
          updateControlled={(newChart) => setChartType(newChart)}
          fullWidth
        />
      </Form.Group>

      {getForm()}
    </Form>
  );
}
