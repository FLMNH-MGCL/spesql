import { Button, Form, FormSubmitValues, Label, Modal } from '@flmnh-mgcl/ui';
import React, { useState } from 'react';
import CircleButton from '../../../buttons/CircleButton';
import useToggle from '../../../utils/useToggle';
import ChartColorPicker, { SingleColorPicker } from '../../../ChartColorPicker';
import { useChartStore } from '../../../../../stores/chart';

/**
 *  DEFAULT CONFIG   
 * sankey: {
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
 */

/**
 * A lot of charts share the same configuration pattern, however there are some that don't.
 * This react component will serve to configure the majority of chart types, where others
 * will have their own modal configs
 */
export default function EditSankeyChart() {
  const [open, { on, off }] = useToggle(false);

  const defaultColors = useChartStore((state) => state.config.options.colors);
  const defaultLinkColor = useChartStore(
    (state) => state.config.options.sankey?.link?.color
  );
  const defaultFontColor = useChartStore(
    (state) => state.config.options.sankey?.node?.label?.color
  );

  const options = useChartStore((state) => state.config.options);

  const setOptions = useChartStore((state) => state.config.setOptions);

  const [colors, setColors] = useState(defaultColors);
  const [lColor, setLColor] = useState(defaultLinkColor ?? '#aaaaa');
  const [fColor, setFColor] = useState(defaultFontColor ?? '#000');

  function handleSubmit(values: FormSubmitValues) {
    const { labelPadding, nodePadding, width, fontSize, bold, italic } = values;

    setOptions({
      ...options,
      sankey: {
        ...options.sankey,
        link: {
          ...options.sankey.link,
          color: lColor,
        },
        node: {
          ...options.sankey.node,
          label: {
            ...options.sankey.node.label,
            fontSize,
            bold,
            italic,
            color: fColor,
          },
          colors,
          labelPadding,
          nodePadding,
          width,
        },
      },
    });

    off();
  }

  return (
    <React.Fragment>
      <Modal open={open} onClose={off} size="large">
        <Modal.Content title="Chart Options">
          <Form onSubmit={handleSubmit} id="options">
            <div className="flex space-x-2 py-2 items-end">
              <Form.Input
                name="labelPadding"
                label="Label Padding"
                fullWidth
                defaultValue={options.sankey?.node?.labelPadding}
                type="number"
              />
              <Form.Input
                name="nodePadding"
                label="Node Padding"
                fullWidth
                defaultValue={options.sankey?.node?.nodePadding}
                type="number"
              />
              <Form.Input
                name="width"
                label="Node Thickness"
                fullWidth
                defaultValue={options.sankey?.node?.width}
                type="number"
              />
            </div>

            <div className="flex space-x-4 py-1 items-end">
              <Form.Input
                name="fontSize"
                label="Font Size"
                fullWidth
                defaultValue={options.sankey?.node?.label?.fontSize ?? 12}
                type="number"
              />
              <Form.Radio
                name="bold"
                label="Bold Font"
                stacked
                defaultChecked={options.sankey?.node?.label?.bold ?? false}
              />
              <Form.Radio
                name="italic"
                label="Italic Font"
                stacked
                defaultChecked={options.sankey?.node?.label?.italic ?? false}
              />
            </div>

            <div className="w-full pt-2">
              <div className="flex space-x-4 py-1">
                <Label>Link Color:</Label>
                <SingleColorPicker defaultColor={lColor} onChange={setLColor} />
              </div>

              <div className="flex space-x-4 py-1">
                <Label>Font Color:</Label>
                <SingleColorPicker defaultColor={fColor} onChange={setFColor} />
              </div>
            </div>

            <div className="py-1">
              <Label>Node Colors:</Label>
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
