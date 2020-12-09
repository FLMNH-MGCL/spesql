import React from 'react';
import { useStore } from '../../../stores';
import RefreshButton from '../buttons/RefreshButton';
import FilterFieldForm from '../forms/FilterFieldForm';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import Text from '../ui/Text';
import useToggle from '../utils/useToggle';

type Props = {
  disabled?: boolean;
};

export default function CreateFilterFieldModal({ disabled }: Props) {
  const [open, { on, off }] = useToggle(false);

  const setFilterByFields = useStore(
    (state) => state.queryData.setFilterByFields
  );

  const hasFiltered = useStore(
    (state) => state.queryData.filterByFields !== 'all'
  );

  function reset() {
    setFilterByFields('all');
  }

  return (
    <React.Fragment>
      <Modal open={open} onClose={off}>
        <Modal.Content title="Filter Search">
          <Text className="pb-3">
            This modal will allow you to narrow the targeted field(s) for the
            search input at the footer of the table. By default, no fields are
            selected, which is interpreted as 'search in all available fields.'
          </Text>
          <FilterFieldForm />
        </Modal.Content>
        <Modal.Footer>
          <Button.Group>
            <RefreshButton onClick={reset} />
            <Button onClick={off}>Close</Button>
          </Button.Group>
        </Modal.Footer>
      </Modal>

      <Button
        variant={hasFiltered ? 'activated' : 'outline'}
        rounded
        disabled={disabled}
        onClick={on}
        title="Reset Selection"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
          />
        </svg>
      </Button>
    </React.Fragment>
  );
}
