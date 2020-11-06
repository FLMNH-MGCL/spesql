import React from 'react';
import shallow from 'zustand/shallow';
import { useStore } from '../../stores';
import DeleteButton from './buttons/DeleteButton';
import EditSpecimen, {
  ConfirmEditButton,
  CancelEditButton,
} from './buttons/EditSpecimen';
import Heading from './ui/Heading';
import useToggle from './utils/useToggle';

import emptyDataIcon from '../assets/svg/empty_data_waiting.svg';
import selectItemIcon from '../assets/svg/select_item_third.svg';
import selectItemIconTest from '../assets/svg/specimen.svg';

function SpecimenOverview() {
  return <div></div>;
}

export default function () {
  // TODO: get selected from store!
  const selected = undefined;

  const [editing, { on, off }] = useToggle(false);

  const { hasQueried } = useStore(
    (state) => ({
      hasQueried:
        state.queryData.queryString !== undefined &&
        state.queryData.queryString !== '',
    }),
    shallow
  );

  console.log(hasQueried);

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
        {/* {selected ? (
          <SpecimenOverview />
        ) : hasQueried ? (
          <Heading tag="h3" className="text-center">
            No specimen selected
          </Heading>
        ) : (
          <Heading tag="h3" className="text-center">
            Make a query to get started
          </Heading>
        )} */}

        {!hasQueried ? (
          <div className="flex items-center justify-center h-full">
            <div>
              <img className="object-scale-down h-48" src={emptyDataIcon} />
              <Heading tag="h3" className="mt-3 text-center">
                Make a query to get started
              </Heading>
            </div>
          </div>
        ) : selected ? (
          <SpecimenOverview />
        ) : (
          <div className="flex items-center justify-center h-full">
            <div>
              <img
                className="object-scale-down h-48"
                src={selectItemIconTest}
              />
              <Heading tag="h3" className="mt-3 text-center">
                Select a specimen to view more
              </Heading>
            </div>
          </div>
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
