import {
  Button,
  FormSubmitValues,
  Modal,
  Select,
  SelectOption,
  Tabs,
  Text,
} from '@flmnh-mgcl/ui';
import React, { useEffect, useRef, useState } from 'react';
import shallow from 'zustand/shallow';
import { useStore } from '../../../stores';
import useKeyboard from '../utils/useKeyboard';
import CreateLogModal from './CreateLogModal';
import CreateHelpModal from './CreateHelpModal';
import { useNotify } from '../utils/context';
import { CSVParser } from './CreateBulkInsertModal';
import ExcelReader from '../ExcelReader';
import useExpiredSession from '../utils/useExpiredSession';
import { fetchTables } from '../forms/utils';
import { Specimen } from '../../types';
import { validateSpecimen } from '../../functions/validation';
import {
  cleanObject,
  noChangesOccurred,
  toUpdateFormat,
} from '../../functions/util';
import useLogError from '../utils/useLogError';
import clsx from 'clsx';
import useQuery from '../utils/useQuery';

type Props = {
  open: boolean;
  onClose(): void;
};

type UpdateValues = {
  catalogNumber: string;
  updates: Partial<Specimen>;
};

export default function CreateCsvUpdateModal({ open, onClose }: Props) {
  const { notify } = useNotify();

  const { logError } = useLogError();
  const { update } = useQuery();

  const toggleLoading = useStore((state) => state.toggleLoading);
  const loading = useStore((state) => state.loading, shallow);

  const [tab, setTab] = useState(0);
  const [rawData, setRawFile] = useState<any>();
  const [databaseTable, setDatabaseTable] = useState();
  const [tables, setTables] = useState<SelectOption[]>([]);
  const [downloadFailures, setDownloadFailures] = useState<boolean>(true);
  const [failures, setFailures] = useState<any>([]);

  const [expiredSession, { expireSession }] = useExpiredSession();

  const expiredRef = useRef(expiredSession);

  const mountedRef = useRef(true);

  useEffect(() => {
    async function init() {
      const errored = await fetchTables((data: any) => {
        if (mountedRef.current === true) {
          setTables(data);
        }
      });

      if (errored) {
        if (errored === 'BAD SESSION') {
          expireSession();
        } else {
          throw new Error('Some other error occurred!');
        }
      }
    }

    expiredRef.current = expiredSession;
    if (mountedRef.current === true) {
      init();
    }

    return () => {
      mountedRef.current = false;
    };
  }, [expiredSession]);

  useKeyboard('Escape', () => {
    onClose();
  });

  async function runQuery(updateValues: UpdateValues[]) {
    let serverErrors = [];
    let noChanges = [];

    for (let i = 0; i < updateValues.length; i++) {
      let current = updateValues[i];
      const catalogNumber = current.catalogNumber;
      const conditions = ['catalogNumber', catalogNumber];
      let query = clsx('UPDATE', databaseTable, 'SET ? WHERE ?? = ?');
      const ret = await update(query, conditions, current.updates);

      if (!ret) {
        serverErrors.push({
          catalogNumber,
          message: 'Could not process this update',
        });
      } else if (noChangesOccurred(ret.message)) {
        noChanges.push({
          catalogNumber,
          message: 'Unaffected by update request.',
          level: 'Warning',
        });
      }
    }

    return { serverErrors, noChanges };
  }

  function parseRows() {
    let allErrors = [];
    let updateValues = [];
    let newCsv = [];
    const useCsv = tab === 0;

    for (let i = 0; i < rawData.length; i++) {
      // // xlsx reader returns a slightly different structure than the Csv reader,
      // // so I have to collect the current specimen a little differently
      const currentAsSpecimen = useCsv
        ? (rawData[i].data as Specimen)
        : (rawData[i] as Specimen);

      const specimenErrors = validateSpecimen(currentAsSpecimen);

      if (specimenErrors && specimenErrors.length) {
        allErrors.push({ index: i, row: i + 2, errors: specimenErrors });

        if (downloadFailures) {
          newCsv.push(currentAsSpecimen);
        }
      } else {
        const cleanedObject = toUpdateFormat(cleanObject(currentAsSpecimen));
        updateValues.push(cleanedObject);
      }
    }

    if (downloadFailures) {
      setFailures(newCsv);
    }

    return { allErrors, updateValues };
  }

  async function handleSubmit() {
    toggleLoading(true);

    if (!databaseTable) {
      notify({
        title: 'Invalid Table',
        message: 'You must select a table!',
        level: 'error',
      });
    } else if (rawData && rawData.length > 0) {
      const { allErrors, updateValues } = parseRows();

      if (!updateValues || !updateValues.length) {
        notify({
          title: 'Could not complete query',
          message: 'All rows contained validation errors',
          level: 'error',
        });

        allErrors.forEach((err) => logError(err, 'update'));
      } else {
        const { serverErrors, noChanges } = await runQuery(updateValues);

        if (
          serverErrors &&
          serverErrors.length &&
          noChanges &&
          noChanges.length
        ) {
          notify({
            title: 'Errors & Warnings Occurred',
            message: 'Please check the corresponding logs.',
            level: 'error',
          });

          [...noChanges, ...serverErrors, ...allErrors].forEach((err) =>
            logError(err, 'update')
          );
        } else if (
          serverErrors &&
          serverErrors.length &&
          (!noChanges || !noChanges.length)
        ) {
          notify({
            title: 'Errors Occurred',
            message: 'Please check the corresponding logs.',
            level: 'error',
          });

          [...serverErrors, ...allErrors].forEach((err) =>
            logError(err, 'update')
          );
        } else if (
          (!serverErrors || !serverErrors.length) &&
          noChanges &&
          noChanges.length
        ) {
          notify({
            title: 'Warnings Occurred',
            message: 'Please check the corresponding logs.',
            level: 'warning',
          });

          [...noChanges, ...allErrors].forEach((err) =>
            logError(err, 'update')
          );
        } else {
          notify({
            title: 'Updates completed.',
            message: 'No warnings or errors occurred.',
            level: 'success',
          });
        }
      }
    } else {
      // notify
    }

    toggleLoading(false);
  }

  return (
    <React.Fragment>
      <Modal open={open} onClose={onClose} size="medium">
        <Modal.Content title="CSV/XLSX Update">
          <Tabs
            fullWidth
            tabs={['CSV', 'XLSX']}
            selectedIndex={tab}
            onChange={setTab}
          />

          <div className="pt-8 pb-2">
            <Select
              name=""
              className="-mt-3 mb-4"
              options={tables}
              value={databaseTable}
              label="Select a Table"
              updateControlled={(newVal: any) => {
                setDatabaseTable(newVal);
              }}
            />

            {tab === 0 && (
              <CSVParser onFileUpload={(data: any) => setRawFile(data)} />
            )}

            {tab === 1 && (
              <ExcelReader onFileUpload={(data: any) => setRawFile(data)} />
            )}
          </div>
        </Modal.Content>

        <Modal.Footer>
          <Button.Group>
            <Button onClick={onClose}>Cancel</Button>
            <Button
              variant="primary"
              onClick={handleSubmit}
              disabled={loading}
              loading={loading}
            >
              Confirm
            </Button>
          </Button.Group>

          <div className="flex space-x-2 flex-1">
            <CreateLogModal initialTab={3} watch="update" />
            <CreateHelpModal variant="update" />
          </div>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
}
