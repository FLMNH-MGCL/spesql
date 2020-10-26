import React from 'react';
import HeaderConfigButton from '../buttons/HeaderConfigButton';
import HeaderConfigurationForm from '../forms/HeaderConfigurationForm';
import Button, { ButtonGroup } from '../ui/Button';
import Modal from '../ui/Modal';
import useToggle from '../utils/useToggle';

export default function CreateHeaderConfigModal() {
  const [open, { on, off }] = useToggle(false);

  function handleConfirm() {}

  return (
    <React.Fragment>
      <Modal open={open} onClose={off} size="medium">
        <Modal.Content title="Table Header Configuration">
          <HeaderConfigurationForm />
        </Modal.Content>
        <Modal.Footer>
          <ButtonGroup>
            <Button onClick={off}>Cancel</Button>
            <Button variant="primary" onClick={handleConfirm}>
              Confirm
            </Button>
          </ButtonGroup>
        </Modal.Footer>
      </Modal>

      <HeaderConfigButton onClick={on} />
    </React.Fragment>
  );
}
