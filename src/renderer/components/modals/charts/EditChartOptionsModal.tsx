import {
  Button,
  Form,
  FormSubmitValues,
  Heading,
  Label,
  Modal,
  Radio,
} from '@flmnh-mgcl/ui';
import React, { useState } from 'react';
import CircleButton from '../../buttons/CircleButton';
import useToggle from '../../utils/useToggle';
import ChartColorPicker, { SingleColorPicker } from '../../ChartColorPicker';
import { useChartStore } from '../../../../stores/chart';
import shallow from 'zustand/shallow';
import { legendOptions } from '../../utils/constants';

/**
 *     options: Partial<{
        width: number;
        height: number;
        is3D: boolean;
        title: string;
        backgroundColor: string;
        hAxis?: {
            minValue?: any;
            maxValue?: any;
            ticks?: GoogleChartTicks;
            title?: string;
            viewWindow?: {
                max?: any;
                min?: any;
            };
            [otherOptionKey: string]: any;
        };
        vAxis?: {
            minValue?: any;
            maxValue?: any;
            ticks?: GoogleChartTicks;
            title?: string;
            viewWindow?: {
                max?: any;
                min?: any;
            };
            [otherOptionKey: string]: any;
        };
        legend: any;
        colors: string[];
        [otherOptionKey: string]: any;
    }>;
 */

export default function EditChartOptionsModal() {
  const [open, { on, off }] = useToggle(false);

  const defaultColors = useChartStore((state) => state.config.options.colors);
  const defaultBgColor = useChartStore(
    (state) => state.config.options.backgroundColor
  );

  const { title, is3D, legend } = useChartStore(
    (state) => ({
      title: state.config.options.title,
      is3D: state.config.options.is3D,
      legend: state.config.options.legend,
    }),
    shallow
  );

  const setOptions = useChartStore((state) => state.config.setOptions);

  const [colors, setColors] = useState(defaultColors);
  const [bgColor, setBgColor] = useState(defaultBgColor ?? '#fff');

  function handleSubmit(values: FormSubmitValues) {
    console.log(values);
    setOptions({
      ...values,
      colors,
      backgroundColor: bgColor,
    });

    off();
  }

  return (
    <React.Fragment>
      <Modal open={open} onClose={off} size="large">
        <Modal.Content title="Chart Options">
          <Form onSubmit={handleSubmit} id="options">
            <Heading size="sm">General</Heading>
            <div className="flex space-x-2 py-2 items-end">
              <Form.Input
                name="title"
                label="Chart Title"
                fullWidth
                defaultValue={title}
              />
              <Form.Select
                name="legend"
                label="Legend"
                options={legendOptions}
                defaultValue={legend}
                fullWidth
              />
              <Form.Radio
                name="is3D"
                label="Render 3D"
                stacked
                defaultChecked={is3D ?? false}
              />
            </div>

            <Heading size="sm">Colors</Heading>

            <div className="flex space-x-4 py-1">
              <Label>Background Color:</Label>
              <SingleColorPicker defaultColor={bgColor} onChange={setBgColor} />
            </div>

            <div className="py-1">
              <Label>Other Colors:</Label>

              <ChartColorPicker updateColors={setColors} />
            </div>
          </Form>
        </Modal.Content>

        <Modal.Footer>
          <Button.Group className="ml-3">
            <Button onClick={off}>Cancel</Button>
            <Button variant="primary" type="submit" form="options">
              Confirm
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal>

      <CircleButton
        onClick={on}
        icon={
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
            />
          </svg>
        }
      >
        Configure Query
      </CircleButton>
    </React.Fragment>
  );
}
