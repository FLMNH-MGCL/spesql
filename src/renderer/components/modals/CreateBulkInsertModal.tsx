import React, { ChangeEvent, useCallback, useState } from 'react';
import Button, { ButtonGroup } from '../ui/Button';
import Modal from '../ui/Modal';
import Tabs from '../ui/Tabs';
import { useDropzone } from 'react-dropzone';
import CreateLogModal from './CreateLogModal';

type UploadProps = { onFileUpload(data: string | ArrayBuffer | null): void };

function FileUpload({ onFileUpload }: UploadProps) {
  const onDrop = useCallback(
    (acceptedFiles: any) => {
      console.log(acceptedFiles);

      if (acceptedFiles.length > 1 || acceptedFiles.length === 0) {
        alert('You must upload only 1 file');
        return;
      }

      const file = acceptedFiles[0];
      const reader = new FileReader();

      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.onload = () => {
        const binaryStr = reader.result;
        onFileUpload(binaryStr);

        alert(binaryStr);
      };
      reader.readAsText(file);
    },
    [onFileUpload]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ['text/csv'],
  });

  return (
    <div
      className="max-w-lg flex justify-center pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer mx-auto"
      {...getRootProps()}
    >
      <input {...getInputProps()} />
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
          {isDragActive
            ? 'Cool looking file!'
            : 'Click or drag and drop to upload a file'}
        </p>
        <p className="mt-1 text-xs text-gray-500">CSV files only</p>
      </div>
    </div>
  );
}

function PasteUpload({ onFileUpload }: UploadProps) {
  return (
    <textarea
      onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
        onFileUpload(e.target.value)
      }
      rows={4}
      placeholder="Be sure to include the CSV header row"
      className="max-w-lg flex w-full justify-center px-6 mx-auto pt-5 pb-6 border-2 border-gray-200 rounded-md h-full "
    ></textarea>
  );
}

type Props = {
  open: boolean;
  onClose(): void;
};

export default function CreateBulkInsertModal({ open, onClose }: Props) {
  const [tab, setTab] = useState(0);
  const [data, setData] = useState('');

  console.log(data);

  return (
    <React.Fragment>
      <Modal open={open} onClose={onClose}>
        <Modal.Content title="Bulk Insert Query">
          <Tabs
            tabs={['File Upload', 'CSV Paste']}
            selectedIndex={tab}
            onChange={setTab}
          />

          <div className="py-8">
            {tab === 0 && (
              <FileUpload onFileUpload={(data: any) => setData(data)} />
            )}

            {tab === 1 && (
              <PasteUpload onFileUpload={(data: any) => setData(data)} />
            )}
          </div>
        </Modal.Content>

        <Modal.Footer>
          <ButtonGroup>
            <Button onClick={onClose}>Cancel</Button>
            <Button variant="primary">Submit</Button>
          </ButtonGroup>

          <CreateLogModal initialTab={2} />
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
}
