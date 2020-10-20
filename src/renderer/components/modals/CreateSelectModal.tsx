import React from 'react';
import Button, { ButtonGroup } from '../ui/Button';
import Dropdown from '../ui/Dropdown';
import Form from '../ui/Form';
import Modal from '../ui/Modal';
import Select from '../ui/SelectBAD';
import useToggle from '../utils/useToggle';

export default function CreateSelectModal() {
  const [open, { on, off }] = useToggle(false);

  // function handleSubmit(query: string) {}

  return (
    <React.Fragment>
      <Modal open={open} onClose={off}>
        <Modal.Content title="Select Query">
          <Form>
            <Form.Field type="input" />

            <Select />
          </Form>
        </Modal.Content>

        <Modal.Footer>
          <ButtonGroup>
            <Button onClick={off}>Cancel</Button>
            <Button variant="primary">Confirm</Button>
          </ButtonGroup>
        </Modal.Footer>
      </Modal>

      <Dropdown.Item text="Select" onClick={on} />
    </React.Fragment>
  );
}
