import { Button, Modal } from '@flmnh-mgcl/ui';
import React from 'react';
import HelpButton from '../buttons/HelpButton';
import useToggle from '../utils/useToggle';
import AdvancedQueryBuilderHelpModal from './help/AdvancedQueryBuilderHelpModal';
import CountHelpModal from './help/CountHelpModal';
import GlobalHelpModal from './help/GlobalHelpModal';
import InsertHelpModal from './help/InsertHelpModal';
import SelectHelpModal from './help/SelectHelpModal';
import UpdateHelpModal from './help/UpdateHelpModal';

type HelpModalProps = {
  variant:
    | 'global'
    | 'select'
    | 'count'
    | 'update'
    | 'single-update'
    | 'insert'
    | 'single-insert'
    | 'queryBuilder'
    | 'admin-user'
    | 'admin-table';
  float?: 'left' | 'right';
};

export default function CreateHelpModal({ variant, float }: HelpModalProps) {
  const [open, { on, off }] = useToggle(false);
  //TODO:
  function determineModalToRender() {
    switch (variant) {
      case 'global': {
        return <GlobalHelpModal />;
      }

      case 'select': {
        return <SelectHelpModal />;
      }

      case 'count': {
        return <CountHelpModal />;
      }

      case 'update': {
        return <UpdateHelpModal />;
      }

      case 'insert': {
        return <InsertHelpModal />;
      }

      case 'queryBuilder': {
        return <AdvancedQueryBuilderHelpModal />;
      }

      case 'admin-user': {
        return <SelectHelpModal />;
      }

      case 'admin-table': {
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
