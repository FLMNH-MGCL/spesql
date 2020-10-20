import React from "react";
import Dropdown from "../ui/Dropdown";
import Form from "../ui/Form";
import Modal from "../ui/Modal";
import useToggle from "../utils/useToggle";

export default function CreateCountModal() {
  const [open, { on, off }] = useToggle(false);

  return (
    <React.Fragment>
      <Modal open={open} onClose={off}>
        <Modal.Content title="Count Query">
          <Form>
            <Form.Field type="input" />
          </Form>
        </Modal.Content>
      </Modal>

      <Dropdown.Item text="Count" onClick={on} />
    </React.Fragment>
  );
}
