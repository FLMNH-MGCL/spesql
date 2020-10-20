import React from "react";
import Dropdown from "../ui/Dropdown";
import Form from "../ui/Form";
import Modal from "../ui/Modal";
import useToggle from "../utils/useToggle";

export default function CreateBulkInsertModal() {
  const [open, { on, off }] = useToggle(false);

  return (
    <React.Fragment>
      <Modal open={open} onClose={off}>
        <Modal.Content title="Bulk Insert Query">
          <Form>
            <Form.Field type="input" />
          </Form>
        </Modal.Content>
      </Modal>

      <Dropdown.Item text="Bulk Insert" onClick={on} />
    </React.Fragment>
  );
}
