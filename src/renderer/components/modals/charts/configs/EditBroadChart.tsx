import {
  Button,
  Divider,
  Form,
  FormSubmitValues,
  Label,
  Modal,
  Radio,
} from '@flmnh-mgcl/ui';
import React, { useCallback, useState } from 'react';
import CircleButton from '../../../buttons/CircleButton';
import useToggle from '../../../utils/useToggle';
import ChartColorPicker, { SingleColorPicker } from '../../../ChartColorPicker';
import { useChartStore } from '../../../../../stores/chart';
import shallow from 'zustand/shallow';
import { chartOrientation, legendOptions } from '../../../utils/constants';
import TrendlineForm from '../../../forms/charts/TrendlineForm';
import { canHaveTrends } from '../utils';
import RefreshButton from '../../../buttons/RefreshButton';
import { defaultChartConfig } from '../../../../../stores/chartDefaults';

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

/**
 * A lot of charts share the same configuration pattern, however there are some that don't.
 * This react component will serve to configure the majority of chart types, where others
 * will have their own modal configs
 */
export default function EditBroadChart() {
  const [open, { on, off }] = useToggle(false);

  const [hasTrends, setHasTrends] = useState(false);
  const [numTrends, setNumTrends] = useState(1);
  const [trends, setTrends] = useState<any[]>([{}]);

  const defaultColors = useChartStore(
    (state) => state.config.options.colors,
    shallow
  );
  const defaultBgColor = useChartStore(
    (state) => state.config.options.backgroundColor,
    shallow
  );

  const { title, legend, chartType } = useChartStore(
    (state) => ({
      title: state.config.options.title,
      // is3D: state.config.options.is3D,
      legend: state.config.options.legend,
      chartType: state.config.chartType,
    }),
    shallow
  );

  const options = useChartStore((state) => state.config.options, shallow);

  const defaultXAxisColor = options.hAxis?.titleTextStyle?.color ?? '#000';
  const defaultVAxisColor = options.vAxis?.titleTextStyle?.color ?? '#000';

  const setOptions = useChartStore((state) => state.config.setOptions);

  const [colors, setColors] = useState(defaultColors);
  const [bgColor, setBgColor] = useState(defaultBgColor ?? '#fff');
  const [innerBgColor, setInnerBgColor] = useState(
    options.chartArea?.backgroundColor ?? '#fff'
  );
  const [xAxisColor, setXAxisColor] = useState(defaultXAxisColor);
  const [vAxisColor, setVAxisColor] = useState(defaultVAxisColor);

  function handleSubmit(values: FormSubmitValues) {
    const {
      hTitle,
      hFontSize,
      hBold,
      hItalic,
      vTitle,
      vFontSize,
      vBold,
      vItalic,
      innerWidth,
      innerHeight,
      ...rest
    } = values;

    let trendlines: any = {};

    if (hasTrends) {
      for (let i = 0; i < trends.length; i++) {
        trendlines[i] = trends[i];
      }
    }

    setOptions({
      ...options,
      colors,
      backgroundColor: bgColor,
      trendlines: hasTrends ? { ...trendlines } : null,
      chartArea: {
        ...options.chartArea,
        backgroundColor: innerBgColor,
        height: !!innerHeight ? `${innerHeight}%` : '80%',
        width: !!innerWidth ? `${innerWidth}%` : '80%',
      },
      hAxis: {
        ...options.hAxis,
        title: hTitle,
        titleTextStyle: {
          ...options.hAxis?.titleTextStyle,
          color: xAxisColor,
          fontSize: hFontSize,
          bold: hBold,
          italic: hItalic,
        },
      },
      vAxis: {
        ...options.hAxis,
        title: vTitle,
        titleTextStyle: {
          ...options.vAxis?.titleTextStyle,
          color: vAxisColor,
          fontSize: vFontSize,
          bold: vBold,
          italic: vItalic,
        },
      },
      ...rest,
    });

    off();
  }

  // FIXME: does not work
  const resetConfig = useCallback(() => {
    setOptions(defaultChartConfig);
    setColors(defaultColors);
    setHasTrends(false);
    setNumTrends(1);
    setTrends([{}]);
    setBgColor(defaultBgColor ?? '#fff');
    setInnerBgColor(options.chartArea?.backgroundColor ?? '#fff');
    setXAxisColor(defaultXAxisColor);
    setVAxisColor(defaultVAxisColor);
  }, []);

  function percentStringToNumber(percent: string) {
    try {
      return parseInt(percent);
    } catch {
      return 80;
    }
  }

  return (
    <React.Fragment>
      <Modal open={open} onClose={off} size="large">
        <Modal.Content title="Chart Options">
          <Form onSubmit={handleSubmit} id="options">
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
              <Form.Select
                name="orientation"
                label="Orientation"
                options={chartOrientation}
                defaultValue={options.orientation ?? 'horizontal'}
                fullWidth
              />
              {/* <Form.Radio
                name="is3D"
                label="Render 3D"
                stacked
                defaultChecked={is3D ?? false}
              /> */}
            </div>

            <div className="flex space-x-2 py-2 items-end">
              <Form.Input
                name="hTitle"
                label="X-Axis Title"
                fullWidth
                defaultValue={options.hAxis?.title}
              />
              <Form.Input
                name="hFontSize"
                label="Font Size"
                fullWidth
                defaultValue={options.hAxis?.titleTextStyle?.fontSize ?? 10}
                type="number"
              />
              <div>
                <Label>Font Color:</Label>
                <SingleColorPicker
                  defaultColor={xAxisColor}
                  onChange={setXAxisColor}
                  width="full"
                />
              </div>
              <Form.Radio
                name="hBold"
                label="Bold X-Axis"
                stacked
                defaultChecked={options.hAxis?.titleTextStyle?.bold ?? false}
              />
              <Form.Radio
                name="hItalic"
                label="Italic X-Axis"
                stacked
                defaultChecked={options.hAxis?.titleTextStyle?.italic ?? false}
              />
            </div>

            <div className="flex space-x-2 py-2 items-end">
              <Form.Input
                name="vTitle"
                label="Y-Axis Title"
                fullWidth
                defaultValue={options.vAxis?.title}
              />
              <Form.Input
                name="vFontSize"
                label="Font Size"
                fullWidth
                defaultValue={options.vAxis?.titleTextStyle?.fontSize ?? 10}
                type="number"
              />
              <div>
                <Label>Font Color:</Label>
                <SingleColorPicker
                  defaultColor={vAxisColor}
                  onChange={setVAxisColor}
                  width="24"
                />
              </div>
              <Form.Radio
                name="vBold"
                label="Bold Y-Axis"
                stacked
                defaultChecked={options.vAxis?.titleTextStyle?.bold ?? false}
              />
              <Form.Radio
                name="vItalic"
                label="Italic Y-Axis"
                stacked
                defaultChecked={options.vAxis?.titleTextStyle?.italic ?? false}
              />
            </div>

            <div className="flex space-x-2 py-2 items-end">
              <Form.Input
                name="innerWidth"
                label="Inner Width (%)"
                fullWidth
                defaultValue={percentStringToNumber(options.chartArea?.width)}
                type="number"
              />
              <Form.Input
                name="innerHeight"
                label="Inner Height (%)"
                fullWidth
                defaultValue={percentStringToNumber(options.chartArea?.height)}
                type="number"
              />
              <div>
                <Label>Inner Background Color:</Label>
                <SingleColorPicker
                  defaultColor={innerBgColor}
                  onChange={setInnerBgColor}
                  width="full"
                />
              </div>
            </div>

            {canHaveTrends(chartType) && (
              <Form.Group>
                <Radio
                  name="hasTrends"
                  label="Draw Trend Lines"
                  checked={hasTrends}
                  onChange={() => setHasTrends((has) => !has)}
                />
              </Form.Group>
            )}

            {hasTrends && (
              <TrendlineForm
                numTrends={numTrends}
                setNumTrends={setNumTrends}
                trends={trends}
                setTrends={setTrends}
              />
            )}

            <Divider />

            <div className="flex space-x-4 pt-3 py-1">
              <Label>Outer Background Color:</Label>
              <SingleColorPicker defaultColor={bgColor} onChange={setBgColor} />
            </div>

            <div className="py-1">
              <Label>Chart Color Palette:</Label>

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

          <div className="flex justify-start items-center flex-1">
            <RefreshButton onClick={resetConfig} type="reset" form="options" />
          </div>
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
