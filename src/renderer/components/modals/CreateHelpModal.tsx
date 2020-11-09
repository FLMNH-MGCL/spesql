import React from 'react';
import HelpButton from '../buttons/HelpButton';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import useToggle from '../utils/useToggle';
import GlobalHelpModal from './help/GlobalHelpModal';
import SelectHelpModal from './help/SelectHelpModal';

type HelpModalProps = {
  variant: 'global' | 'select' | 'count' | 'update' | 'admin';
  float?: 'left' | 'right';
};

export default function CreateHelpModal({ variant, float }: HelpModalProps) {
  const [open, { on, off }] = useToggle(false);

  function determineModalToRender() {
    switch (variant) {
      case 'global': {
        return <GlobalHelpModal />;
      }

      case 'select': {
        return <SelectHelpModal />;
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
          <Button.Group>
            <Button onClick={off} variant="primary">
              Got it!
            </Button>
          </Button.Group>
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
