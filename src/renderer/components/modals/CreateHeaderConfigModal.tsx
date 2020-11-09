import React from 'react';
import HeaderConfigButton from '../buttons/HeaderConfigButton';
import HeaderConfigurationForm from '../forms/HeaderConfigurationForm';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import Text from '../ui/Text';
import useToggle from '../utils/useToggle';
import CreateHelpModal from './CreateHelpModal';

type Props = {
  disabled?: boolean;
};

export default function CreateHeaderConfigModal({ disabled }: Props) {
  const [open, { on, off }] = useToggle(false);

  return (
    <React.Fragment>
      <Modal open={open} onClose={off} size="medium">
        <Modal.Content title="Table Header Configuration">
          <Text className="pb-3">
            This modal will allow you to change the columns currently visible in
            the query table. You may select up to 8 columns to render.
          </Text>
          <HeaderConfigurationForm />
        </Modal.Content>
        <Modal.Footer>
          <Button.Group>
            <Button onClick={off}>Close</Button>
          </Button.Group>

          <CreateHelpModal variant="global" float="left" />
        </Modal.Footer>
      </Modal>

      <HeaderConfigButton onClick={on} disabled={disabled} />
    </React.Fragment>
  );
}
