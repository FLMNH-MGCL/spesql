import React from 'react';
import DeleteButton from './buttons/DeleteButton';
import EditSpecimen, {
  ConfirmEditButton,
  CancelEditButton,
} from './buttons/EditSpecimen';
import Heading from './ui/Heading';
import useToggle from './utils/useToggle';

function SpecimenOverview() {
  return <div></div>;
}

export default function () {
  // TODO: get selected from store!
  const selected = undefined;

  const [editing, { on, off }] = useToggle(false);

  function cancelEdit() {
    // do stuff here
    off();
  }

  function commitEdit() {
    // do stuff here
    // make query
    // interpret response

    off();
  }

  return (
    <React.Fragment>
      <div className="table-height px-4 pt-4">
        {selected ? (
          <SpecimenOverview />
        ) : (
          <Heading tag="h3">No specimen selected</Heading>
        )}
      </div>
      <div className="bg-gray-50 h-16 flex items-center px-4 justify-between">
        <div className="space-x-2 items-center">
          <EditSpecimen onClick={on} disabled={!selected || editing} />
          <DeleteButton disabled={!selected} />
        </div>

        {editing && (
          <div className="space-x-2 items-center">
            <CancelEditButton onClick={cancelEdit} />
            <ConfirmEditButton onClick={commitEdit} />
          </div>
        )}
      </div>
    </React.Fragment>
  );
}
