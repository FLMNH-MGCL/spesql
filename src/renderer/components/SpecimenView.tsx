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
import selectItemIconTest from '../assets/svg/specimen.svg';
import { Specimen } from '../types';
import List from './List';
import Radio from './ui/Radio';
import { Values } from './ui/Form';
import CreateConfirmModal from './modals/CreateConfirmModal';
import { useNotify } from './utils/context';
import { buildSingleUpdateQuery } from '../functions/builder';
import useQuery from './utils/useQuery';

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

// TODO: make editing a global, zustand value... this will enable me to disallow
// the user from selecting another specimen while already editing another!
// TODO: once that is completed, send a notification when they attempt to do this so
// they aren't clueless as to why their clicks aren't working
export default function () {
  const { notify } = useNotify();

  const [editing, { on, off }] = useToggle(false);
  const [showMissing, missingToggles] = useToggle(false);
  const [loading, loadingToggles] = useToggle(false);

  const table = useStore((state) => state.queryData.table);

  const { hasQueried } = useStore((state) => ({
    hasQueried:
      state.queryData.queryString !== undefined &&
      state.queryData.queryString !== '',
  }));

  const { databaseTable, selectedSpecimen } = useStore(
    (state) => ({
      databaseTable: state.queryData.table,
      selectedSpecimen: state.selectedSpecimen,
    }),
    shallow
  );

  const { update, deleteSpecimen, logUpdate, logDelete } = useQuery();

  function cancelEdit() {
    off();
  }

  async function commitEdit(values: Values) {
    if (!selectedSpecimen) {
      return;
    }

    loadingToggles.on();

    const { errors, updates, query, logUpdates } = buildSingleUpdateQuery(
      databaseTable,
      values,
      selectedSpecimen
    );

    if (errors.length) {
      notify({
        title: 'Update Failed',
        message: 'Please check logs to correct errors in the form',
        level: 'error',
      });

      // TODO: write to log
    } else {
      const conditions = ['id', selectedSpecimen.id];

      const storedCatalogNumber = selectedSpecimen.catalogNumber;

      const queryString = await update(query, conditions, updates);

      if (queryString) {
        await logUpdate(queryString, logUpdates, table, storedCatalogNumber!);
      }
    }

    loadingToggles.off();
    off();
  }

  async function handleDelete(id?: number) {
    if (id === undefined || !table) {
      notify({
        title: 'Missing ID or Table',
        message:
          'These fields are typically extracted automatically, however they cannot be found. Please submit this as a bug!',
        level: 'error',
      });
      return;
    } else {
      // TODO: recieve errors ??
      const queryString = await deleteSpecimen(id, table);

      if (queryString) {
        await logDelete(
          queryString,
          JSON.stringify(selectedSpecimen),
          table,
          selectedSpecimen?.catalogNumber ?? null
        );
      }
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
      <div className="bg-gray-50 dark:bg-dark-600 h-16 flex items-center px-4 justify-between">
        <div className="flex flex-row space-x-2 items-center">
          <EditSpecimen
            onClick={on}
            disabled={!selectedSpecimen || editing || !hasQueried}
          />
          <CreateConfirmModal
            disabled={!selectedSpecimen}
            trigger={
              <DeleteButton disabled={!selectedSpecimen || !hasQueried} />
            }
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
            <CancelEditButton onClick={cancelEdit} loading={loading} />
            <ConfirmEditButton
              type="submit"
              form="inline-update-form"
              loading={loading}
            />
          </div>
        )}
      </div>
    </React.Fragment>
  );
}
