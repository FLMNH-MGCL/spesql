import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Text from './ui/Text';
import { useNotify } from './utils/context';

type Props = {
  setJson(content: any): void;
  prompt?: string;
  draggingPrompt?: string;
};

export default function JsonFileUpload({
  setJson,
  prompt,
  draggingPrompt,
}: Props) {
  const { notify } = useNotify();

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length > 1 || acceptedFiles.length === 0) {
        alert('Either too many or no files selected');
        return;
      }

      const file = acceptedFiles[0];
      const reader = new FileReader();

      reader.onabort = () => {
        notify({
          title: 'JSON Parse Error',
          level: 'error',
          message: 'File reading forcibly aborted',
        });
      };
      reader.onerror = () => {
        notify({
          title: 'JSON Parse Error',
          level: 'error',
          message: 'File reading errored',
        });
      };
      reader.onload = () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result;
        // console.log(binaryStr);
        setJson(binaryStr);
      };
      reader.readAsText(file);
    },
    [setJson]
  );

  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragActive,
  } = useDropzone({ onDrop, accept: 'application/json' });

  const acceptedFile = acceptedFiles.length ? (
    <Text>{`${acceptedFiles[0].name} - ${acceptedFiles[0].size} bytes`}</Text>
  ) : null;

  return (
    <React.Fragment>
      <div
        {...getRootProps()}
        className="flex flex-col space-y-3 items-center h-32 border-2 border-gray-200 border-dashed p-3 rounded-md"
      >
        <input {...getInputProps()} />
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

        {isDragActive ? (
          <Text>{draggingPrompt ?? 'Nice file! Just drop it here!'}</Text>
        ) : (
          <Text>{prompt ?? 'Drag and drop a JSON file'}</Text>
        )}
      </div>

      {acceptedFile}
    </React.Fragment>
  );
}
