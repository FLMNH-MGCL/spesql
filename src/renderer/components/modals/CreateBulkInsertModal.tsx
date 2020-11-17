import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import Tabs from '../ui/Tabs';
import CreateLogModal from './CreateLogModal';
import { CSVReader, readString } from 'react-papaparse';
import { BACKEND_URL, isSpecimen, Specimen, SpecimenFields } from '../../types';
import { useNotify } from '../utils/context';
import CreateHelpModal from './CreateHelpModal';
import {
  fixPartiallyCorrect,
  validateSpecimen,
} from '../../functions/validation';
import { useStore } from '../../../stores';
import axios from 'axios';
import useToggle from '../utils/useToggle';
import shallow from 'zustand/shallow';
import { sleep } from '../../functions/util';
import Select, { SelectOption } from '../ui/Select';
import { fetchTables } from '../forms/utils';

// TODO: add typings in this file

function CSVParser({ onFileUpload }: UploadProps) {
  const { notify } = useNotify();

  const [isReset, setReset] = useState(false);

  function handleOnFileLoad(data: any) {
    console.log(data);
    if (!data || !data.length) {
      notify({
        title: 'Upload Error',
        message:
          'No entries were found in the uploaded file. Please remove the selected file',
        level: 'error',
      });
    }

    const invalidFields = isSpecimen(data[0].data);

    if (invalidFields.length > 0) {
      let message = 'Entries were found that are not valid specimen: ';

      invalidFields.forEach((field, index) => {
        if (index != invalidFields.length - 1) {
          message += field + ', ';
        } else {
          message += field + '... ';
        }
      });

      message += 'Please remove the selected file.';

      notify({
        title: 'Upload Error',
        message,
        level: 'error',
      });
    } else {
      onFileUpload(data);
    }
  }
  function handleOnError(error: any) {
    // TODO: notify

    console.log(error);
  }

  function handleRemoveFile(data: any) {
    // FIXME: I am waiting on version 4.0 release for papaparse, which will introduce
    // convenient, react hooks for offloading files programatically!!
    // until then, I have to trigger the reset state twice to get the cache to clear
    onFileUpload(data);

    setReset(true);

    setTimeout(() => setReset(false), 200);
  }

  // documentation for styling the CSV reader https://github.com/Bunlong/react-papaparse/wiki/CSVReader-(Drag-to-Upload)-Style
  return (
    <CSVReader
      onDrop={handleOnFileLoad}
      onError={handleOnError}
      config={{ header: true }}
      style={{ dropArea: { borderRadius: '.375rem' } }}
      onRemoveFile={handleRemoveFile}
      addRemoveButton
      isReset={isReset}
    >
      <div className="text-center">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <p className="mt-1 text-sm text-gray-600">
          Click or drag and drop to upload a file
        </p>
        <p className="mt-1 text-xs text-gray-500">
          CSV files only (don't worry, I'm working on XLSX)
        </p>{' '}
      </div>
    </CSVReader>
  );
}

type UploadProps = { onFileUpload(data: any): void };

function PasteUpload({ onFileUpload }: UploadProps) {
  return (
    <textarea
      onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
        onFileUpload(e.target.value)
      }
      rows={4}
      placeholder="Be sure to include the CSV header row"
      className="flex w-full justify-center px-6 mx-auto pt-5 pb-6 border border-gray-500 rounded-md h-full "
    ></textarea>
  );
}

type Props = {
  open: boolean;
  onClose(): void;
};

export default function CreateBulkInsertModal({ open, onClose }: Props) {
  const { notify } = useNotify();

  const [tab, setTab] = useState(0);
  const [pasteData, setPasteData] = useState('');
  const [rawData, setRawFile] = useState<any>();
  const [databaseTable, setDatabaseTable] = useState();
  const [tables, setTables] = useState<SelectOption[]>([]);

  const [loading, { on, off }] = useToggle(false);

  const updateInsertLog = useStore((state) => state.updateInsertLog);

  const { expiredSession, expireSession } = useStore(
    (state) => ({
      expiredSession: state.expiredSession,
      expireSession: state.expireSession,
    }),
    shallow
  );

  const expiredRef = useRef(expiredSession);

  //FIXME: attempting to fix some memory leaks
  // TODO: maybe fixed??
  const mountedRef = useRef(true);

  useEffect(() => {
    async function init() {
      const res = await axios
        .get(BACKEND_URL + '/api/queriables/select/')
        .catch((error) => error.response);

      if (res.data && res.data.tables) {
        if (mountedRef.current === true) {
          setTables(
            res.data.tables.map((table: string) => {
              return { label: table, value: table };
            })
          );
        }
      } else if (res.status === 401) {
        expireSession();
      }
    }

    expiredRef.current = expiredSession;
    if (mountedRef.current === true) {
      init();
    }

    return () => {
      console.log('TODO: cleanup');
      mountedRef.current = false;
    };
  }, [expiredSession]);

  // console.log(data, rawData);

  // look into xlsx package:
  // https://stackoverflow.com/questions/46909260/reading-excel-file-in-reactjs

  //https://github.com/Bunlong/react-papaparse/blob/master/demo/CSVReader1.js

  async function awaitReauth() {
    notify({
      title: 'Session Expired',
      message: 'Pausing the insertion query until you revalidate the session',
      level: 'warning',
    });

    while (expiredRef.current === true) {
      await sleep(2000);
    }

    if (expiredRef.current === false) {
      notify({
        title: 'Session Restored',
        message: 'Insert query resuming',
        level: 'success',
      });
    }

    return '';
  }

  function parseUploadRows() {
    let allErrors = [];
    let insertionValues = [];
    for (let i = 0; i < rawData.length; i++) {
      const currentSpecimen = rawData[i].data as Specimen;
      const specimenErrors = validateSpecimen(currentSpecimen);

      if (specimenErrors && specimenErrors.length) {
        console.log('ERROR OCCURRED:', currentSpecimen);
        allErrors.push({ index: i, errors: specimenErrors });
      } else {
        insertionValues.push(fixPartiallyCorrect(currentSpecimen));
      }
    }

    return { allErrors, insertionValues };
  }

  function parsePasteRows(result: any[]) {
    let allErrors = [];
    let insertionValues = [];
    for (let i = 0; i < result.length; i++) {
      const currentSpecimen = result[i] as Specimen;
      const specimenErrors = validateSpecimen(currentSpecimen);

      if (specimenErrors && specimenErrors.length) {
        console.log('ERROR OCCURRED:', currentSpecimen);
        allErrors.push({ index: i, errors: specimenErrors });
      } else {
        insertionValues.push(fixPartiallyCorrect(currentSpecimen));
      }
    }

    return { allErrors, insertionValues };
  }

  async function insertRows(insertionValues: Partial<SpecimenFields>[]) {
    let serverErrors = [];
    for (let i = 0; i < insertionValues.length; i++) {
      const currentValue = insertionValues[i];
      const insertResponse = await axios
        .post(BACKEND_URL + '/api/insert/single', {
          values: currentValue,
          table: databaseTable,
        })
        .catch((error) => error.response);

      if (insertResponse.status === 401) {
        // session expired
        expireSession();

        await awaitReauth().then(() => {
          i -= 1;
        });
      } else if (insertResponse.status !== 201) {
        const { code, sqlMessage } = insertResponse.data;
        serverErrors.push({
          index: i,
          errors: [{ field: code, message: sqlMessage }],
        });
      }
    }

    return serverErrors;
  }

  async function handleUploadSubmit() {
    on();
    // let allErrors = [];
    // let insertionValues = [];
    // for (let i = 0; i < rawData.length; i++) {
    //   const currentSpecimen = rawData[i].data as Specimen;
    //   const specimenErrors = validateSpecimen(currentSpecimen);

    //   if (specimenErrors && specimenErrors.length) {
    //     console.log('ERROR OCCURRED:', currentSpecimen);
    //     allErrors.push({ index: i, errors: specimenErrors });
    //   } else {
    //     insertionValues.push(fixPartiallyCorrect(currentSpecimen));
    //   }
    // }

    const { allErrors, insertionValues } = parseUploadRows();

    // console.log('VALID:\n', insertionValues);
    // console.log('============================');
    // console.log('INVALID:\n', allErrors);

    if (allErrors.length) {
      notify({
        title: 'Insert Errors',
        message:
          'There were one or more errors that occurred during this request that prevented it from being submitted. Please review the appropriate logs.',
        level: 'error',
      });
      updateInsertLog(allErrors);
      off();
    } else {
      // let serverErrors = [];

      const serverErrors = await insertRows(insertionValues);

      // for (let i = 0; i < insertionValues.length; i++) {
      //   const currentValue = insertionValues[i];
      //   const insertResponse = await axios
      //     .post(BACKEND_URL + '/api/insert/single', {
      //       values: currentValue,
      //       table: 'molecularLab',
      //     })
      //     .catch((error) => error.response);

      //   if (insertResponse.status === 401) {
      //     // session expired
      //     expireSession();

      //     await awaitReauth().then(() => {
      //       i -= 1;
      //     });
      //   } else if (insertResponse.status !== 201) {
      //     const { code, sqlMessage } = insertResponse.data;
      //     serverErrors.push({
      //       index: i,
      //       errors: [{ field: code, message: sqlMessage }],
      //     });
      //   }
      // }

      if (serverErrors.length) {
        notify({
          title: 'Server Errors Occurred',
          message:
            'Some or all of the insertions emitted errors. Please review the appropriate logs.',
          level: 'warning',
        });
        updateInsertLog(serverErrors);
      } else {
        notify({
          title: 'Insertions Complete',
          message: 'No errors detected',
          level: 'success',
        });
      }
      off();
    }
  }

  async function handlePasteSubmit() {
    const readingConfig = { header: true };

    const results = readString(pasteData, readingConfig);

    on();

    const { allErrors, insertionValues } = parsePasteRows(results.data);

    console.log(allErrors, insertionValues);

    if (allErrors.length) {
      notify({
        title: 'Insert Errors',
        message:
          'There were one or more errors that occurred during this request that prevented it from being submitted. Please review the appropriate logs.',
        level: 'error',
      });
      updateInsertLog(allErrors);
      off();
    } else {
      const serverErrors = await insertRows(insertionValues);

      if (serverErrors.length) {
        notify({
          title: 'Server Errors Occurred',
          message:
            'Some or all of the insertions emitted errors. Please review the appropriate logs.',
          level: 'warning',
        });
        updateInsertLog(serverErrors);
      } else {
        notify({
          title: 'Insertions Complete',
          message: 'No errors detected',
          level: 'success',
        });
      }
      off();
    }
  }

  // TODO: types and stuff
  async function handleSubmit() {
    if (!databaseTable) {
      notify({
        title: 'Invalid Table',
        message: 'You must select a table!',
        level: 'error',
      });
    } else if (rawData && rawData.length > 0) {
      handleUploadSubmit();
    } else if (pasteData) {
      handlePasteSubmit();
    }
  }

  console.log(databaseTable);

  return (
    <React.Fragment>
      {/* I do not want you to be able to close this while it is loading */}
      <Modal open={loading ? true : open} size="medium" onClose={onClose}>
        <Modal.Content title="Bulk Insert Query">
          <Tabs
            fullWidth
            tabs={['File Upload', 'CSV Paste']}
            selectedIndex={tab}
            onChange={setTab}
          />

          <div className="py-8">
            <Select
              className="pb-3 -mt-3"
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
              <PasteUpload onFileUpload={(data: any) => setPasteData(data)} />
            )}
          </div>
        </Modal.Content>

        <Modal.Footer>
          <Button.Group>
            <Button onClick={onClose} disabled={loading}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleSubmit}
              disabled={loading}
              loading={loading}
            >
              Submit
            </Button>
          </Button.Group>

          <div className="flex space-x-2 flex-1">
            <CreateLogModal initialTab={2} watch="insert" />
            <CreateHelpModal variant="insert" />
          </div>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
}
