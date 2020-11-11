import React from 'react';
import { InsertError, LoggingError, Logs } from '../../stores';
import Heading from './ui/Heading';
import Text from './ui/Text';

type Props = {
  errors: any[];
  variant: keyof Logs;
};

export default function LogTerminal({ errors, variant }: Props) {
  const emptyMessage = <p>No errors exist in the log</p>;

  function renderInsertErrors() {
    if (!errors) return emptyMessage;

    return errors.map((error: InsertError) => {
      const csvRow = error.index + 2;

      return (
        <React.Fragment>
          <Heading>Error(s) @ Row {csvRow}:</Heading>
          <div>
            {error.errors.map(({ field, message }) => {
              return (
                <div className="flex space-x-2">
                  <Text>{field}</Text>
                  <Text>
                    {typeof message !== 'boolean' ? message : 'INVALID'}
                  </Text>
                </div>
              );
            })}
          </div>
        </React.Fragment>
      );
    });
  }

  function renderErrors() {
    switch (variant) {
      case 'select': {
        return null;
      }
      case 'count': {
        return null;
      }
      case 'insert': {
        return errors.length ? renderInsertErrors() : emptyMessage;
      }
      case 'update': {
        return null;
      }
      case 'delete': {
        return null;
      }

      case 'global': {
        return null;
      }

      default: {
        throw new Error(
          `Invalid error variant attempted to be rendered: ${variant}`
        );
      }
    }
  }

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 rounded-md h-56 overflow-auto p-2">
      {renderErrors()}
    </div>
  );
}
