import React, { useState } from "react";
import { Modal, Button, Form, TextArea } from "semantic-ui-react";
import "./../../assets/globals.css";
import JSONDrop from "./JSONDrop";

const configExample = {
  host: "host goes here",
  port: "port goes here",
  user: "username goes here",
  password: "user's password goes here",
  database: "database name goes here",
};

export default function CreateConfigModal(props) {
  const [textData, setTextData] = useState("");
  return (
    <Modal size="small" trigger={<Button type="button">Import Config</Button>}>
      <Modal.Header>Upload Config</Modal.Header>
      <Modal.Content>
        <p>
          You may either paste JSON content inside the text area or upload the
          JSON file directly (via drap n drop or clicking that same area)
        </p>

        <Form>
          <Form.Field
            control={TextArea}
            placeholder={JSON.stringify(configExample, null, 4)}
            style={{ minHeight: 150 }}
            value={textData}
            onChange={(e) => {
              setTextData(e.target.value);
            }}
          />

          <JSONDrop setJson={setTextData} createError={props.createError} />
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button
          onClick={() => props.populate(textData)}
          style={{ backgroundColor: "#5c6ac4", color: "#fff" }}
        >
          Import
        </Button>
      </Modal.Actions>
    </Modal>
  );
}
