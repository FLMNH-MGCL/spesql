import React from 'react';
import { Values } from '../ui/Form';
import Modal from '../ui/Modal';
import { useNotify } from '../utils/context';
import useKeyboard from '../utils/useKeyboard';
import Button from '../ui/Button';
import CreateLogModal from './CreateLogModal';
import CreateHelpModal from './CreateHelpModal';
import Heading from '../ui/Heading';
import Text from '../ui/Text';
import QueryBuilder from '../QueryBuilder';
import { formatQuery } from 'react-querybuilder';

import coderConstruction from '../../assets/svg/coder_two.svg';

// IDEAS
// https://reactjsexample.com/drag-and-drop-sortable-component-for-nested-data-and-hierarchies/
//https://github.com/fridaymeng/react-sql-query-builder
//https://sapientglobalmarkets.github.io/react-querybuilder/

type Props = {
  open: boolean;
  onClose(): void;
};

export default function CreateQueryBuilderModal({ open, onClose }: Props) {
  const { notify } = useNotify();
  // I am using local loading state here, since it doesn't really
  // interact with global state in this modal
  // const [loading, { on, off }] = useToggle(false);

  const fields = [
    { name: 'firstName', label: 'First Name' },
    { name: 'lastName', label: 'Last Name' },
    { name: 'age', label: 'Age' },
    { name: 'address', label: 'Address' },
    { name: 'phone', label: 'Phone' },
    { name: 'email', label: 'Email' },
    { name: 'twitter', label: 'Twitter' },
    { name: 'isDev', label: 'Is a Developer?', defaultValue: false },
  ];

  useKeyboard('Escape', () => {
    onClose();
  });

  async function runQuery(values: Values) {
    console.log(values);
  }

  function logQuery(query: any) {
    console.log(formatQuery(query, 'sql'));
  }

  return (
    <React.Fragment>
      <Modal open={open} onClose={onClose} size="almostMassive">
        <Modal.Content title="Query Builder">
          <Heading centered className="mb-3">
            This isn't available yet
          </Heading>
          <img src={coderConstruction} />
          <Text centered className="mt-4">
            But I'm working really hard to make it perfect! (and really cool!)
          </Text>
          <QueryBuilder fields={fields} onQueryChange={logQuery} />;
        </Modal.Content>

        <Modal.Footer>
          <Button.Group className="ml-3">
            <Button onClick={onClose}>Cancel</Button>

            <Button
              onClick={onClose} // TODO: CHANGE ME
              variant="primary"
              // type="submit"
              // form="count-form"
              // loading={loading}
              // disabled={loading}
            >
              Confirm
            </Button>
          </Button.Group>

          <div className="flex space-x-2 flex-1">
            <CreateLogModal initialTab={0} />
            <CreateHelpModal variant="queryBuilder" />
          </div>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
}
