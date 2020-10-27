import React from 'react';
import HelpButton from '../buttons/HelpButton';
import Button, { ButtonGroup } from '../ui/Button';
import Modal from '../ui/Modal';
import useToggle from '../utils/useToggle';

function GlobalHelpModal() {
  return <Modal.Content title="General Help">todo</Modal.Content>;
}

type HelpModalProps = {
  variant: 'global' | '';
  float?: 'left' | 'right';
};

export default function CreateHelpModal({ variant, float }: HelpModalProps) {
  const [open, { on, off }] = useToggle(false);

  function determineModalToRender() {
    switch (variant) {
      case 'global': {
        return <GlobalHelpModal />;
      }

      default: {
        throw new Error(
          `Error when attempting to create Help Modal: ${variant} is not a valid variant`
        );
      }
    }
  }

  return (
    <React.Fragment>
      <Modal open={open} onClose={off} size="large">
        {determineModalToRender()}

        <Modal.Footer>
          <ButtonGroup>
            <Button onClick={off} variant="primary">
              Got it!
            </Button>
          </ButtonGroup>
        </Modal.Footer>
      </Modal>

      {float && float === 'left' ? (
        <div className="flex-1">
          <HelpButton onClick={on} />
        </div>
      ) : (
        <HelpButton onClick={on} />
      )}
    </React.Fragment>
  );
}
