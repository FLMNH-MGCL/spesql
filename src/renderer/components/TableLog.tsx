import React, { useState, useEffect } from 'react';
import { AutoSizer, Column, Table } from 'react-virtualized';
import RefreshButton from './buttons/RefreshButton';
import Spinner from './ui/Spinner';
import useQuery from './utils/useQuery';
import useToggle from './utils/useToggle';
import useWindowDimensions from './utils/useWindowDimensions';
import { SortingConfig } from './VirtualizedTable';

const headerStrings = [
  'catalogNumber',
  'query',
  'user',
  'field',
  'oldValue',
  'newValue',
  'timestamp',
];

export default function TableLog({ table }: { table: string }) {
  const { getTableLogs } = useQuery();
  const { height, width } = useWindowDimensions();

  const customHeight = height > 700 ? 700 : height - 100;

  const [logs, setLogs] = useState<any>();
  const [loading, { on, off }] = useToggle(false);
  const [sortingDirection, setSortingDirection] = useState<SortingConfig>();

  async function getLogs() {
    on();

    const res = await getTableLogs(table);

    if (res) {
      setLogs(res.logs);
    }

    off();
  }

  useEffect(() => {
    if (!logs) {
      getLogs();
    }
  }, []);

  function generateDisplay() {
    let display: any[] = [];

    if (!logs || !logs.length) return [];

    logs.forEach((log: any) => {
      const { catalogNumber, query, user, timestamp } = log;
      const updates = JSON.parse(log.updates);

      let baseLog: any = { catalogNumber, query, user, timestamp };

      if (updates) {
        console.log(updates);
        updates.forEach((update: any) => {
          const field = Object.keys(update)[0];
          const oldValue = update[field].old;
          const newValue = update[field].new;

          const partialLog = { ...baseLog, field, oldValue, newValue };

          display.push(partialLog);
        });
      } else {
        display.push(baseLog);
      }
    });

    return display;
  }

  const display = generateDisplay();

  function renderHeader({ dataKey }: any) {
    let icon = null;

    if (sortingDirection && sortingDirection.column === dataKey) {
      if (sortingDirection.direction === 'asc') {
        icon = (
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 15l7-7 7 7"
            />
          </svg>
        );
      } else {
        icon = (
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        );
      }
    }

    return (
      <div key={dataKey} className="flex space-x-2 items-center">
        <p>{dataKey}</p>
        {icon}
      </div>
    );
  }

  function getColumns() {
    const columns =
      !logs || !logs.length
        ? []
        : headerStrings.map((header) => {
            return (
              <Column
                key={header}
                label={header}
                dataKey={header}
                flexGrow={1}
                flexShrink={1}
                width={width / headerStrings.length}
                headerRenderer={renderHeader}
              />
            );
          });

    return columns;
  }

  console.log(display, getColumns());

  return (
    <div className="bg-white rounded-md shadow-around-lg w-full mt-4 mb-2">
      <div
        className="w-full align-middle overflow-x-auto overflow-hidden"
        style={{ height: customHeight }}
      >
        <Spinner active={loading} />
        <AutoSizer>
          {({ height, width }) => (
            <Table
              height={height}
              width={width}
              rowHeight={40}
              headerHeight={60}
              rowCount={display.length}
              rowGetter={({ index }) => display[index]}
              // onHeaderClick={handleHeaderClick}
              headerClassName="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-600  tracking-wider cursor-pointer focus:outline-none"
              gridClassName="whitespace-no-wrap text-sm leading-5 font-medium text-gray-900"
              // rowRenderer={(props) =>
              //   rowRenderer({
              //     ...props,
              //     onEditClick: setEditing,
              //     onDeleteClick: setDeleting,
              //   })
              // }
            >
              {getColumns()}
            </Table>
          )}
        </AutoSizer>
      </div>
      <nav className="bg-gray-50 px-4 py-3 flex items-center justify-between sm:px-6 border-t border-cool-gray-100">
        <RefreshButton />
      </nav>
    </div>
  );
}

// logs: Array(1)
// 0:
//  catalogNumber: "LEP75596"
//  query: "fakequerylawl"
//  timestamp: "2020-12-01T21:00:11.000Z"
//  updates: "{"otherCatalogNumber": {"new": "MGCL_12346758", "old": ""}}"
// query: "SELECT * FROM molecularLab_logs"
