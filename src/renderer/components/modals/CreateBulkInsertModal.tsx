import React, { ChangeEvent, useState } from 'react';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import Tabs from '../ui/Tabs';
import CreateLogModal from './CreateLogModal';
import { CSVReader } from 'react-papaparse';
import { BACKEND_URL, isSpecimen, Specimen } from '../../types';
import { useNotify } from '../utils/context';
import CreateHelpModal from './CreateHelpModal';
import {
  fixPartiallyCorrect,
  validateSpecimen,
} from '../../functions/validation';
import { useStore } from '../../../stores';
import axios from 'axios';
import useToggle from '../utils/useToggle';

// TODO: add typings in this file

function CSVParser({ onFileUpload }: UploadProps) {
  const { notify } = useNotify();
  function handleOnFileLoad(data: any) {
    // FIXME: I am waiting on version 4.0 release for papaparse, which will introduce
    // convenient hooks for offloading files programatically!!

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
    onFileUpload(data);
  }

  return (
    <CSVReader
      onDrop={handleOnFileLoad}
      onError={handleOnError}
      config={{ header: true }}
      style={{ borderRadius: '0.375rem' }}
      onRemoveFile={handleRemoveFile}
      addRemoveButton
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
  const [data, setData] = useState('');
  const [rawData, setRawFile] = useState<any>();

  const [loading, { on, off }] = useToggle(false);

  const updateInsertLog = useStore((state) => state.updateInsertLog);

  // console.log(data, rawData);

  // look into xlsx package:
  // https://stackoverflow.com/questions/46909260/reading-excel-file-in-reactjs

  //https://github.com/Bunlong/react-papaparse/blob/master/demo/CSVReader1.js

  // TODO: types and stuff
  async function handleSubmit() {
    if (rawData && rawData.length > 0) {
      on();
      console.log(rawData);
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

      console.log('VALID:\n', insertionValues);
      console.log('============================');
      console.log('INVALID:\n', allErrors);

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
        let serverErrors = [];

        for (let i = 0; i < insertionValues.length; i++) {
          const currentValue = insertionValues[i];
          const insertResponse = await axios
            .post(BACKEND_URL + '/api/insert/single', {
              values: currentValue,
              table: 'molecularLab',
            })
            .catch((error) => error.response);

          if (insertResponse.status !== 201) {
            const { code, sqlMessage } = insertResponse.data;
            serverErrors.push({
              index: i,
              errors: [{ field: code, message: sqlMessage }],
            });
          }
        }

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
  }

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
            {tab === 0 && (
              <CSVParser onFileUpload={(data: any) => setRawFile(data)} />
            )}

            {tab === 1 && (
              <PasteUpload onFileUpload={(data: any) => setData(data)} />
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
