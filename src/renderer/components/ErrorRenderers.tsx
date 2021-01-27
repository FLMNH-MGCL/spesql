import { Heading, Label, Text } from '@flmnh-mgcl/ui';
import React from 'react';
import {
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
  List,
  ListRowProps,
} from 'react-virtualized';
import { BulkInsertError, LoggingError } from '../../stores/logging';

export function BulkInsertLogRenderer({ list }: { list: BulkInsertError[] }) {
  const cache = new CellMeasurerCache({
    defaultHeight: 100,
    fixedWidth: true,
  });

  function renderErrors(errors: LoggingError[], serverError: boolean) {
    if (serverError) {
      return errors.map(({ field, message }, index) => {
        return (
          <div
            key={index}
            className="pl-2 border-l border-gray-500 dark:border-dark-200"
          >
            <div className="flex space-x-3">
              <Label>Code:</Label>
              <Text>{field}</Text>
            </div>
            <div className="flex space-x-3">
              <Label>Message:</Label>
              <Text>{message}</Text>
            </div>
          </div>
        );
      });
    } else {
      return errors.map(
        ({ field, message, fieldValue, catalogNumber }, index) => {
          return (
            <div
              className="pl-2 border-l border-gray-500 dark:border-dark-200"
              key={index}
            >
              <div className="flex space-x-3">
                <Label>Field:</Label>
                <Text>{field}</Text>
              </div>
              <div className="flex space-x-3">
                <Label>Field Value:</Label>
                <Text>{fieldValue}</Text>
              </div>
              <div className="flex space-x-3">
                <Label>Message:</Label>
                <Text>{message}</Text>
              </div>
              <div className="flex space-x-3">
                <Label>catalogNumber:</Label>
                <Text>{catalogNumber}</Text>
              </div>
            </div>
          );
        }
      );
    }
  }

  function rowRenderer({ index, key, parent, style }: ListRowProps) {
    const { row, errors } = list[index];
    // const i = list[index].index;

    let serverError = false;

    if (!row && row !== 0) {
      serverError = true;
    }

    return (
      <CellMeasurer
        cache={cache}
        columnIndex={0}
        key={key}
        parent={parent}
        rowIndex={index}
      >
        {({ registerChild }) => (
          // @ts-ignore
          <div ref={registerChild} style={style} className="p-2 w-full">
            <Heading>{serverError ? 'Server Error' : `Row: ${row}`}</Heading>
            <div className="ml-4 flex flex-col space-y-3">
              {renderErrors(errors, serverError)}
            </div>
          </div>
        )}
      </CellMeasurer>
    );
  }

  return (
    <AutoSizer>
      {({ height, width }) => (
        <List
          width={width}
          height={height}
          rowGetter={({ index }: any) => list[index]}
          rowCount={list.length}
          deferredMeasurementCache={cache}
          rowHeight={cache.rowHeight}
          rowRenderer={rowRenderer}
          headerHeight={20}
        />
      )}
    </AutoSizer>
  );
}

export function GeneralErrorLogRenderer({ list }: { list: LoggingError[] }) {
  const cache = new CellMeasurerCache({
    defaultHeight: 100,
    fixedWidth: true,
  });

  function renderError(error: LoggingError) {
    const {
      index,
      code,
      sql,
      field,
      fieldValue,
      catalogNumber,
      message,
    } = error;

    const heading = sql ? 'SQL Error' : index ? 'Validation Error' : 'Error';

    // TODO: FIXME
    if (heading === 'Error') {
      console.log('HANDLE ME PLZ', error);
    }

    return (
      <React.Fragment>
        <Heading>{heading}</Heading>
        <div className="ml-4 flex flex-col space-y-3">
          <div
            className="pl-2 border-l border-gray-500 dark:border-dark-200"
            key={index}
          >
            {code && (
              <div className="flex space-x-3">
                <Label>Code:</Label>
                <Text>{code}</Text>
              </div>
            )}
            {field && (
              <div className="flex space-x-3">
                <Label>Field:</Label>
                <Text>{field}</Text>
              </div>
            )}
            {(fieldValue !== undefined || fieldValue !== null) && !sql && (
              <div className="flex space-x-3">
                <Label>Field Value:</Label>
                <Text>{fieldValue}</Text>
              </div>
            )}
            {message && (
              <div className="flex space-x-3">
                <Label>Message:</Label>
                <Text>{message}</Text>
              </div>
            )}
            {sql && (
              <div className="flex space-x-3">
                <Label>SQL:</Label>
                <Text>{sql}</Text>
              </div>
            )}
            {catalogNumber && (
              <div className="flex space-x-3">
                <Label>catalogNumber:</Label>
                <Text>{catalogNumber}</Text>
              </div>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }

  function rowRenderer({ index, key, parent, style }: ListRowProps) {
    const error = list[index];

    return (
      <CellMeasurer
        cache={cache}
        columnIndex={0}
        key={key}
        parent={parent}
        rowIndex={index}
      >
        {({ registerChild }) => (
          // @ts-ignore
          <div ref={registerChild} style={style} className="p-2 w-full">
            {renderError(error)}
          </div>
        )}
      </CellMeasurer>
    );
  }

  return (
    <AutoSizer>
      {({ height, width }) => (
        <List
          width={width}
          height={height}
          rowGetter={({ index }: any) => list[index]}
          rowCount={list.length}
          deferredMeasurementCache={cache}
          rowHeight={cache.rowHeight}
          rowRenderer={rowRenderer}
          headerHeight={20}
        />
      )}
    </AutoSizer>
  );
}
