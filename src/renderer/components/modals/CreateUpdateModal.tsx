import React from "react";
import Dropdown from "../ui/Dropdown";
import Form from "../ui/Form";
import Modal from "../ui/Modal";
import useToggle from "../utils/useToggle";

export default function CreateUpdateModal() {
  const [open, { on, off }] = useToggle(false);

  return (
    <React.Fragment>
      <Modal open={open} onClose={off}>
        <Modal.Content title="Update Query">
          <Form>
            <Form.Field type="input" />
          </Form>
        </Modal.Content>
      </Modal>

      <Dropdown.Item text="Update" onClick={on} />
    </React.Fragment>
  );
}
