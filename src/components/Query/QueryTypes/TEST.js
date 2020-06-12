import React, { useState } from "react";
import { Modal, Form, TextArea } from "semantic-ui-react";

export default function UPDATETEST() {
  const [value, setValue] = useState("");
  return (
    <Modal.Content>
      <Form>
        <Form.Field>
          <input
            value={value}
            name="value"
            onKeyDown={(e) => {
              setValue(e.key);
            }}
          />
        </Form.Field>
      </Form>
    </Modal.Content>
  );
}
