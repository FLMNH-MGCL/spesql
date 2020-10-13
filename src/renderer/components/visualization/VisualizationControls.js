import React, { useState } from "react";
import { Form, Header, Select, Button } from "semantic-ui-react";
import { CHARTS, headerSelection } from "../../constants/constants";
import { createDataSlice } from "../../functions/helpers";

export default function VisualizationControls(props) {
  const { headers, chart } = props.visualizationConfig;
  const [height, setHeight] = useState(0);

  console.log(headers);

  function handleChartChange(e, newChart) {
    e.preventDefault();

    if (newChart.value) {
      props.updateChartConfigChartType(newChart.value);
    }
  }

  function handleFieldSelection(e, newField) {
    console.log(newField.value);
    if (newField.value) {
      props.updateChartConfigChartHeaders(newField.value);
    }
  }

  function generateConfig(e) {
    e.preventDefault();
    if (!props.data || props.data.length === 0) {
      props.notify({
        type: "error",
        title: "Could not create chart",
        message:
          "You must have data returned from a select query before you can generate a chart",
      });

      return;
    }

    const fieldError = checkFieldError();

    if (fieldError) {
      const message = fieldError.content || "Error detected in config form";
      props.notify({
        type: "error",
        title: "Could not create chart",
        message,
      });

      return;
    }

    const dataSlice = createDataSlice(props.data, headers);

    props.generateChartConfig({
      chart,
      dataSlice,
      height,
    });

    console.log(dataSlice);
  }

  function checkFieldError() {
    if (!headers) {
      // something went wrong
      props.updateChartConfigChartHeaders([]);
      return;
    }

    if (headers.length > 1 && headers.indexOf("*") > -1) {
      return {
        content: "If All is selected no other fields should be selected.",
      };
    }
  }

  return (
    <div>
      <Header as="h3">Chart Options</Header>

      <Form style={{ marginTop: "1rem" }} onSubmit={generateConfig}>
        <Form.Field>
          <label>Select a Chart Type</label>
          <Select
            value={chart}
            options={CHARTS}
            placeholder="Select One"
            onChange={handleChartChange}
          />
        </Form.Field>

        <Form.Field
          control={Select}
          label="Select a Chart Type"
          value={headers ? headers : []}
          options={headerSelection}
          placeholder="Select Headers"
          onChange={handleFieldSelection}
          multiple
          error={checkFieldError()}
        />

        <Button floated="right">Generate Configuration</Button>
      </Form>
    </div>
  );
}
