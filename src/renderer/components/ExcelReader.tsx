import React, { useCallback, useState } from 'react';
import xlsx from 'node-xlsx';
import { jsonToCSV, readString } from 'react-papaparse';
import { useDropzone } from 'react-dropzone';
import useToggle from './utils/useToggle';
import { useNotify } from './utils/context';
import { isSpecimen } from '../types';

type Props = {
  onFileUpload(data: any): void;
};

export default function ExcelReader({ onFileUpload }: Props) {
  const { notify } = useNotify();
  const [loading, { on, off }] = useToggle(false);
  const [loaded, setLoaded] = useToggle(false);

  const [hasError, setHasError] = useState(false);

  async function attemptLoad(filePath: string) {
    const workSheetsFromFile = xlsx.parse(filePath);

    if (!workSheetsFromFile || !workSheetsFromFile.length) {
      notify({
        title: 'Upload Error',
        message:
          'No worksheets could be extracted from the uploaded .xslx file',
        level: 'error',
      });

      setHasError(true);
    } else if (workSheetsFromFile.length > 1) {
      notify({
        title: 'Upload Error',
        message:
          'Multiple sheets detected: please merge .xlsx sheets together before uploading',
        level: 'error',
      });

      setHasError(true);
    } else {
      let data = workSheetsFromFile[0].data;
      let fields = data[0];
      data.shift();

      const csv = jsonToCSV({
        fields,
        data,
      });

      const parsed: any = readString(csv, { header: true });

      if (!parsed || !parsed.data || !parsed.data.length) {
        notify({
          title: 'Upload Error',
          message:
            'No entries were found in the uploaded file. Please remove the selected file',
          level: 'error',
        });
      } else {
        // FIXME: I think this needs refectoring
        const invalidFields = isSpecimen(parsed.data[0]);

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
          onFileUpload(parsed.data);
          setLoaded.on();
        }
      }
    }

    off();
  }

  const onDrop = useCallback((acceptedFiles) => {
    on();

    if (hasError) {
      setHasError(false);
    }

    if (loaded) {
      setLoaded.off();
    }

    if (!acceptedFiles.length) {
      notify({
        title: 'Upload Error',
        message: 'No valid files were detected on upload attempt',
        level: 'error',
      });

      setHasError(true);
      off();
    } else if (acceptedFiles.length > 1) {
      notify({
        title: 'Upload Error',
        message: 'Cannot handle multiple files at once',
        level: 'error',
      });

      setHasError(true);
      off();
    } else if (!acceptedFiles[0].path) {
      notify({
        title: 'Upload Error',
        message: 'Failed to extract absolute path of uploaded file',
        level: 'error',
      });
      setHasError(true);
      off();
    } else {
      attemptLoad(acceptedFiles[0].path);
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: '.xlsx',
  });

  return (
    <div
      {...getRootProps()}
      style={{
        alignItems: 'center',
        borderStyle: 'dashed',
        borderWidth: '2px',
        borderRadius: '0.375rem',
        borderColor: 'rgb(204, 204, 204)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'center',
        padding: '20px',
        cursor: 'pointer',
        // maunually styling div as the other library does to match exact
      }}
    >
      <input {...getInputProps()} />
      <div className="text-center">
        <svg
          className="mx-auto h-12 w-12 text-gray-400 dark:text-dark-300"
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
      </div>
      {isDragActive ? (
        <p className="mt-1 text-sm text-gray-600 dark:text-dark-300">
          Drop it here!
        </p>
      ) : loading ? (
        <p className="mt-1 text-sm text-gray-600 dark:text-dark-300">
          Loading file...
        </p>
      ) : hasError ? (
        <p className="mt-1 text-sm text-gray-600 dark:text-dark-300">
          Could not process file, please upload another
        </p>
      ) : loaded ? (
        <p className="mt-1 text-sm text-gray-600 dark:text-dark-300">
          File loaded!
        </p>
      ) : (
        <p className="mt-1 text-sm text-gray-600 dark:text-dark-300">
          Click or drag and drop to upload a XLSX file
        </p>
      )}
    </div>
  );
}
