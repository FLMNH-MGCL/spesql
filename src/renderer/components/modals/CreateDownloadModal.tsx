import React from 'react';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import useToggle from '../utils/useToggle';
import { CSVLink } from 'react-csv';
import DownloadButton, { DOWNLOAD_ICONS } from '../buttons/DownloadButton';
import Text from '../ui/Text';

type Props = {
  variant?: keyof typeof DOWNLOAD_ICONS;
  disableDownload?: boolean;
  title?: string;
  description?: string;
  data: any[];
};

export default function CreateDownloadModal({
  variant,
  disableDownload,
  title,
  description,
  data,
}: Props) {
  const [open, { on, off }] = useToggle(false);

  function onDownload() {
    off();
  }

  return (
    <React.Fragment>
      <Modal open={open} onClose={off} size="tiny">
        <Modal.Content title={title ?? 'Download'}>
          <Text>{description ?? 'To download press the Confirm button'}</Text>

          <div className="py-2">
            {data.length && <Text>{`Total Size: ${data.length}`}</Text>}
            {data.length && <Text>{`Default Separator: '\\t'`}</Text>}
          </div>
        </Modal.Content>
        <Modal.Footer>
          <Button.Group>
            <Button onClick={off}>Cancel</Button>
            <CSVLink data={data ?? []} target="_blank" separator={'\t'}>
              <Button variant="primary" onClick={onDownload}>
                Confirm
              </Button>
            </CSVLink>
          </Button.Group>
        </Modal.Footer>
      </Modal>

      {variant ? (
        <DownloadButton
          onClick={on}
          disabled={disableDownload}
          variant={variant}
        />
      ) : (
        <Button onClick={on} disabled={disableDownload}>
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
            />
          </svg>
          Download
        </Button>
      )}
    </React.Fragment>
  );
}
