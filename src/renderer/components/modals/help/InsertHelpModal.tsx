import React from 'react';
import Heading from '../../ui/Heading';
import Modal from '../../ui/Modal';
import Text from '../../ui/Text';

export default function InsertHelpModal() {
  return (
    <Modal.Content title="Insert Query Help">
      <div className="w-full">
        <Text className="pb-4">
          You won't actually be handling any of the SQL insert statements,
          rather SpeSQL generates the SQL for you using the CSV parser or
          form-based single insert.
        </Text>
        <Heading>CSV Upload / Paste</Heading>
        <div className="py-4 flex flex-col space-y-3">
          <Text>
            You may upload an entire CSV file, or paste the CSV contents into
            the text area form input, on the Bulk Insert section and SpeSQL will
            attempt to generate a list of Specimen objects to be inserted into
            the database for each row of the CSV.
          </Text>

          <Text>
            You will have the option to insert passing values even when there
            are invalid values in the CSV. By default, if there are any invalid
            rows then none will be inserted. By checking this radio option,
            valid entries will continue on to insertion.
          </Text>

          <p className="text-sm">
            To see a complete list of the available fields, or how to structure
            the CSV file, please refer to the{' '}
            <a
              className="text-blue-500"
              href="https://flmnh-mgcl.github.io/spesql/docs/insertbulk"
              target="_blank"
              rel="noopener noreferrer"
            >
              Bulk Insert Docs
            </a>
            {' and the '}
            <a
              className="text-blue-500"
              href="https://flmnh-mgcl.github.io/spesql/docs/fieldguide"
              target="_blank"
              rel="noopener noreferrer"
            >
              Database Field Guide
            </a>{' '}
            (and subsequent guides).
          </p>
        </div>

        <Heading>Single Insert Form</Heading>
        <div className="py-4 flex flex-col space-y-3">
          <Text>
            The Single Insert Form requires you to manually enter all of the
            available data for a single entry, and then attempts to insert it
            into the target table. The process is rather similar to
            transcription.
          </Text>

          <p className="text-sm">
            To see a complete list of the available fields, or how to structure
            the CSV file, please refer to the{' '}
            <a
              className="text-blue-500"
              href="https://flmnh-mgcl.github.io/spesql/docs/insertsingle"
              target="_blank"
              rel="noopener noreferrer"
            >
              Single Insert Docs
            </a>
            {' and the '}
            <a
              className="text-blue-500"
              href="https://flmnh-mgcl.github.io/spesql/docs/fieldguide"
              target="_blank"
              rel="noopener noreferrer"
            >
              Database Field Guide
            </a>{' '}
            (and subsequent guides).
          </p>
        </div>
      </div>
    </Modal.Content>
  );
}
