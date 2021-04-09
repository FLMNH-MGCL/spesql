import React, { useEffect, useState } from 'react';
import shallow from 'zustand/shallow';
import { useStore } from '../../stores';
import DeleteButton from './buttons/DeleteButton';
import EditSpecimen, {
  ConfirmEditButton,
  CancelEditButton,
} from './buttons/EditSpecimen';
import useToggle from './utils/useToggle';
import emptyDataIcon from '../assets/svg/empty_data_waiting.svg';
import selectItemIconTest from '../assets/svg/specimen.svg';
import { Specimen } from '../types';
import List from './List';
import { Values } from '../types';
import CreateConfirmModal from './modals/CreateConfirmModal';
import { useNotify } from './utils/context';
import { buildSingleUpdateQuery } from '../functions/builder';
import useQuery from './utils/useQuery';

import { FormSubmitValues, Heading, Radio } from '@flmnh-mgcl/ui';
import useWindowDimensions from './utils/useWindowDimensions';
import Resizable from './Resizable';
import CreateRecordButton from './buttons/CreateRecordButton';
import InsertNewRecord from './forms/InsertNewRecord';
import {
  arrayFieldsToString,
  getSpecimenDefaults,
  noChangesOccurred,
} from '../functions/util';
import CreateRequestSingleUpdateModal from './modals/CreateRequestSingleUpdateModal';

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

export default function () {
  const { notify } = useNotify();

  const [showMissing, missingToggles] = useToggle(false);
  const [loading, loadingToggles] = useToggle(false);

  const [viewRequestModal, setViewRequestModal] = useState(false);
  const [requestUpdate, setRequestUpdate] = useState<any>(null);

  const table = useStore((state) => state.queryData.table, shallow);

  const { hasQueried } = useStore(
    (state) => ({
      hasQueried:
        state.queryData.queryString !== undefined &&
        state.queryData.queryString !== '',
    }),
    shallow
  );

  const user = useStore((state) => state.user, shallow);

  const { databaseTable, selectedSpecimen } = useStore(
    (state) => ({
      databaseTable: state.queryData.table,
      selectedSpecimen: state.selectedSpecimen,
    }),
    shallow
  );

  const {
    isInsertingRecord,
    isEditingRecord,
    setIsInsertingRecord,
    setIsEditingRecord,
  } = useStore(
    (state) => ({
      user: state.user,
      isInsertingRecord: state.isInsertingRecord,
      isEditingRecord: state.isEditingRecord,
      setIsInsertingRecord: state.setIsInsertingRecord,
      setIsEditingRecord: state.setIsEditingRecord,
    }),
    shallow
  );

  // All form elements must be rendered when making an inline edit. Therefore,
  // I am enforcing this in an effect hook, which will toggle on the show missing
  // when editing
  useEffect(() => {
    if (isEditingRecord && !showMissing) {
      missingToggles.on();
    }
  }, [isEditingRecord]);

  const { width } = useWindowDimensions();

  const { update, deleteSpecimen, logUpdate, logDelete, insert } = useQuery();

  function cancelEdit() {
    setIsEditingRecord(false);
  }

  function cancelInsert() {
    setIsInsertingRecord(false);
  }

  function requestEdit(query: string, conditions: any[], updates: any) {
    console.log(updates);
    setRequestUpdate({
      query,
      conditions,
      updates,
    });

    setViewRequestModal(true);
  }

  async function commitEdit(values: Values) {
    if (!selectedSpecimen) {
      return;
    }

    loadingToggles.on();

    const correctedSpecimen = getSpecimenDefaults(selectedSpecimen);
    const updatedFieldArray = arrayFieldsToString(values as Specimen);
    const correctedUpdates = getSpecimenDefaults(updatedFieldArray);

    console.log('RAW VALUES (AS SPECIMEN):', values as Specimen);
    console.log('RAW VALUES (AS ARRAY):', updatedFieldArray);
    console.log('CORRECTED NULLS ON UPDATES:', correctedUpdates);
    console.log('\nCORRECTED NULLS ON SELECTED:', correctedSpecimen);

    const { errors, updates, query, logUpdates } = buildSingleUpdateQuery(
      databaseTable,
      values,
      selectedSpecimen
    );

    if (user && user.accessRole === 'guest') {
      if (errors.length) {
        notify({
          title: 'Update Request Failed',
          message: 'Please check logs to correct errors in the form',
          level: 'error',
        });
      } else if (!updates || !Object.keys(updates).length) {
        notify({
          title: 'Update Failed',
          message: 'No changes were detected in the form',
          level: 'warning',
        });
      } else {
        const conditions = ['id', selectedSpecimen.id];

        requestEdit(query, conditions, updates);
      }
    } else {
      if (errors.length) {
        notify({
          title: 'Update Failed',
          message: 'Please check logs to correct errors in the form',
          level: 'error',
        });
      } else if (!updates || !Object.keys(updates).length) {
        notify({
          title: 'Update Failed',
          message: 'No changes were detected in the form',
          level: 'warning',
        });
      } else {
        const conditions = ['id', selectedSpecimen.id];

        const storedCatalogNumber = selectedSpecimen.catalogNumber ?? null;

        const ret = await update(query, conditions, updates);

        if (ret) {
          const { queryStr, message } = ret;

          // THIS should NOT happen in a single insert
          if (noChangesOccurred(message)) {
            notify({
              title: 'No matches found',
              message: 'No changes were made',
              level: 'info',
            });
          } else {
            await logUpdate(queryStr, logUpdates, table, storedCatalogNumber);
          }

          setIsEditingRecord(false);
        } else {
          notify({
            title: 'Update Failed',
            message: 'Please check the corresponding logs',
            level: 'error',
          });
        }
      }
    }

    loadingToggles.off();
  }

  async function commitInsert(values: FormSubmitValues) {
    loadingToggles.on();

    const targetTable = values.databaseTable;

    delete values.databaseTable;

    const correctedArrays = arrayFieldsToString(values as Specimen);
    const correctedNulls = getSpecimenDefaults(correctedArrays);

    const inserted = await insert(targetTable, correctedNulls);

    if (inserted) {
      setIsInsertingRecord(false);
    }

    loadingToggles.off();
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

  const HasNotQueried = () => (
    <div className="flex items-center justify-center h-full select-none">
      <div>
        <img
          className="object-scale-down h-48 select-none"
          src={emptyDataIcon}
        />
      </div>
    </div>
  );

  const SelectSpecimenPrompt = () => (
    <div className="flex items-center justify-center h-full select-none">
      <div>
        <img
          className="object-scale-down h-48 select-none"
          src={selectItemIconTest}
        />
        <Heading tag="h3" className="mt-3 text-center">
          Select a specimen to view more
        </Heading>
      </div>
    </div>
  );

  const ShowOverview = () => (
    <SpecimenOverview
      editing={isEditingRecord}
      specimen={selectedSpecimen!}
      showEmpty={showMissing}
      onCommitEdit={commitEdit}
      onCancelEdit={cancelEdit}
    />
  );

  const InsertRecordFooter = () => (
    <div className="flex flex-row space-x-2 items-center">
      <div className="space-x-2 items-center">
        <CancelEditButton onClick={cancelInsert} loading={loading} />
        <ConfirmEditButton
          type="submit"
          form="new-record-form"
          loading={loading}
        />
      </div>
    </div>
  );

  const SelectedSpecimenFooter = () => (
    <React.Fragment>
      <div className="flex flex-row space-x-2 items-center">
        <EditSpecimen
          onClick={() => setIsEditingRecord(true)}
          disabled={!selectedSpecimen || isEditingRecord || !hasQueried}
        />
        <CreateConfirmModal
          disabled={!selectedSpecimen}
          trigger={<DeleteButton disabled={!selectedSpecimen || !hasQueried} />}
          details="This action cannot be undone"
          onConfirm={() => handleDelete(selectedSpecimen?.id)}
        />

        <Radio
          disabled={!hasQueried || isEditingRecord}
          checked={!hasQueried ? false : showMissing}
          onChange={missingToggles.toggle}
          stacked
          label="Show Missing"
        />
      </div>

      {isEditingRecord && (
        <div className="space-x-2 items-center">
          <CancelEditButton onClick={cancelEdit} loading={loading} />
          <ConfirmEditButton
            type="submit"
            form="inline-update-form"
            loading={loading}
          />
        </div>
      )}
    </React.Fragment>
  );

  function renderBody() {
    if (isInsertingRecord) {
      return <InsertNewRecord onSubmit={commitInsert} />;
    } else if (!hasQueried) {
      return <HasNotQueried />;
    } else if (selectedSpecimen) {
      return <ShowOverview />;
    } else {
      return <SelectSpecimenPrompt />;
    }
  }

  function renderFooter() {
    if (isInsertingRecord) {
      return <InsertRecordFooter />;
    } else if (selectedSpecimen) {
      return <SelectedSpecimenFooter />;
    } else {
      return <CreateRecordButton />;
    }
  }

  return (
    <React.Fragment>
      {requestUpdate && (
        <CreateRequestSingleUpdateModal
          {...requestUpdate}
          open={viewRequestModal}
          onClose={() => {
            setViewRequestModal(false);
            setRequestUpdate(null);
          }}
        />
      )}
      <div className="h-full overflow-hidden bg-white dark:bg-dark-800 shadow-around-lg rounded-md">
        <Resizable
          defaultWidth={width * 0.25}
          leftConstraint={100}
          dragTo="left"
        >
          <div className="flex flex-col h-full">
            <div className="flex-1 h-full px-3 py-1 overflow-y-scroll">
              {renderBody()}
            </div>

            {/* FOOTER */}
            <div className="bg-gray-50 dark:bg-dark-600 h-16 flex items-center px-4 justify-between">
              {/* if inserting then render insert form, else if I had a selected specimen, render selected footer, 
            and if I am currently editing show the confirm and cancel buttons. otherwise, just render the insert
            new record button */}
              {renderFooter()}
            </div>
          </div>
        </Resizable>
      </div>
    </React.Fragment>
  );
}
