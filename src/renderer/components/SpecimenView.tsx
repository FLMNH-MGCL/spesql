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
// import selectItemIcon from '../assets/svg/select_item_third.svg';
import selectItemIconTest from '../assets/svg/specimen.svg';
import { BACKEND_URL, Specimen } from '../types';
import List from './List';
import Radio from './ui/Radio';
import { Values } from './ui/Form';
import CreateConfirmModal from './modals/CreateConfirmModal';
import axios from 'axios';
import { useNotify } from './utils/context';

// TODO: remove ? where needed
type OverviewProps = {
  specimen: Specimen;
  showEmpty?: boolean;
  editing?: boolean;
  onCommitEdit?(values: Values): void;
  onCancelEdit?(): void;
};

function SpecimenOverview({
  specimen,
  showEmpty,
  editing,
  onCommitEdit,
}: OverviewProps) {
  return (
    <List onEditSubmit={onCommitEdit} formId="inline-update-form">
      {Object.keys(specimen).map((key) => {
        // @ts-ignore
        const isEmpty = !specimen[key];

        // console.log(key, specimen[key], isEmpty);

        if ((isEmpty && showEmpty) || !isEmpty) {
          return (
            <List.Item
              fullWidth
              editable={editing}
              key={key}
              label={key}
              // @ts-ignore
              value={specimen[key]}
            />
          );
        } else {
          return null;
        }
      })}
    </List>
  );
}

// TODO: add toggle to show empty values
// TODO: make editing a global, zustand value... this will enable me to disallow
// the user from selecting another specimen while already editing another!
// TODO: once that is completed, send a notification when they attempt to do this so
// they aren't clueless as to why their clicks aren't working
export default function () {
  const { notify } = useNotify();
  const [editing, { on, off }] = useToggle(false);
  const [showMissing, missingToggles] = useToggle(false);
  const table = useStore((state) => state.queryData.table);

  const {
    hasQueried,
    queryString,
    setData,
    selectedSpecimen,
    setSelectedSpecimen,
    toggleLoading,
  } = useStore(
    (state) => ({
      hasQueried:
        state.queryData.queryString !== undefined &&
        state.queryData.queryString !== '',
      queryString: state.queryData.queryString,
      setData: state.queryData.setData,
      selectedSpecimen: state.selectedSpecimen,
      setSelectedSpecimen: state.setSelectedSpecimen,
      toggleLoading: state.toggleLoading,
    }),
    shallow
  );

  function cancelEdit() {
    // do stuff here
    off();
  }

  function commitEdit(values: Values) {
    console.log(values);
    // do stuff here
    // make query
    // interpret response

    off();
  }

  async function refresh() {
    if (!queryString || queryString === '') {
      return;
    }

    setData([]);

    toggleLoading(true);

    const selectResponse = await axios
      .post(BACKEND_URL + '/api/select', {
        query: queryString,
      })
      .catch((error) => error.response);

    console.log(selectResponse);

    if (selectResponse.status === 200 && selectResponse.data) {
      const { specimen } = selectResponse.data;
      setData(specimen);
    } else {
      // TODO: interpret status
      const error = selectResponse.data;
      notify({ title: 'TODO', message: error, level: 'error' });
    }

    toggleLoading(false);
  }

  // TODO: handle errors
  async function handleDelete(id?: number) {
    if (id === undefined || !table) {
      console.log(id, table);
      return;
    } else {
      const deleteResponse = await axios.post(BACKEND_URL + '/api/delete', {
        id,
        table,
      });

      console.log(deleteResponse);
      setSelectedSpecimen(null);
      refresh();
    }
  }

  return (
    <React.Fragment>
      <div className="table-height overflow-auto px-4 pt-4">
        {!hasQueried ? (
          <div className="flex items-center justify-center h-full">
            <div>
              <img className="object-scale-down h-48" src={emptyDataIcon} />
            </div>
          </div>
        ) : selectedSpecimen ? (
          <SpecimenOverview
            editing={editing}
            specimen={selectedSpecimen}
            showEmpty={showMissing}
            onCommitEdit={commitEdit}
            onCancelEdit={cancelEdit}
          />
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
        <div className="flex flex-row space-x-2 items-center">
          <EditSpecimen onClick={on} disabled={!selectedSpecimen || editing} />
          <CreateConfirmModal
            disabled={!selectedSpecimen}
            trigger={<DeleteButton disabled={!selectedSpecimen} />}
            details="This action cannot be undone"
            onConfirm={() => handleDelete(selectedSpecimen?.id)}
          />

          <Radio
            disabled={!hasQueried}
            checked={!hasQueried ? false : showMissing}
            onChange={missingToggles.toggle}
            stacked
            label="Show Missing"
          />
        </div>

        {editing && (
          <div className="space-x-2 items-center">
            <CancelEditButton onClick={cancelEdit} />
            <ConfirmEditButton type="submit" form="inline-update-form" />
          </div>
        )}
      </div>
    </React.Fragment>
  );
}
