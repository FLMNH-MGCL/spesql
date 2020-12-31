import React, { useState, useEffect } from 'react';
import { AutoSizer, Column, Table, TableRowProps } from 'react-virtualized';
import RefreshButton from './buttons/RefreshButton';
import Spinner from './ui/Spinner';
import { useNotify } from './utils/context';
import useQuery from './utils/useQuery';
import useToggle from './utils/useToggle';
import useWindowDimensions from './utils/useWindowDimensions';
import { SortingConfig } from './VirtualizedTable';
import CopyToClipboard from 'react-copy-to-clipboard';
import CreateDownloadModal from './modals/CreateDownloadModal';
import CreateConfirmModal from './modals/CreateConfirmModal';
import Button from './ui/Button';
import _ from 'lodash';
import { usePersistedStore } from '../../stores/persisted';
import { TABLE_CLASSES } from './ui/constants';

const headerStrings = [
  'catalogNumber',
  'query',
  'user',
  'field',
  'oldValue',
  'newValue',
  'timestamp',
];

type TableRowRenderer = (
  props: TableRowProps & {
    onCopy(index: number): void;
  }
) => React.ReactNode;

const rowRenderer: TableRowRenderer = ({
  className,
  columns,
  index,
  key,
  onRowClick,
  onRowDoubleClick,
  onRowMouseOut,
  onRowMouseOver,
  onRowRightClick,
  rowData,
  style,
  onCopy,
  // onDeleteClick,
}) => {
  const a11yProps = { 'aria-rowindex': index + 1 } as any;

  if (
    onRowClick ||
    onRowDoubleClick ||
    onRowMouseOut ||
    onRowMouseOver ||
    onRowRightClick
  ) {
    a11yProps['aria-label'] = 'row';
    a11yProps.tabIndex = 0;

    if (onRowClick) {
      a11yProps.onClick = (event: any) => onRowClick({ event, index, rowData });
    }
    if (onRowDoubleClick) {
      a11yProps.onDoubleClick = (event: any) =>
        onRowDoubleClick({ event, index, rowData });
    }
    if (onRowMouseOut) {
      a11yProps.onMouseOut = (event: any) =>
        onRowMouseOut({ event, index, rowData });
    }
    if (onRowMouseOver) {
      a11yProps.onMouseOver = (event: any) =>
        onRowMouseOver({ event, index, rowData });
    }
    if (onRowRightClick) {
      a11yProps.onContextMenu = (event: any) =>
        onRowRightClick({ event, index, rowData });
    }
  }

  return (
    <div
      {...a11yProps}
      className={className}
      key={key}
      role="row"
      style={style}
    >
      {columns.map((col: any, index) => {
        // console.log(col);

        const queryString = col.props?.children;

        return (
          <CopyToClipboard
            text={queryString ?? ''}
            onCopy={() => onCopy(index)}
            key={index}
          >
            <div
              aria-colindex={index + 1}
              className="ReactVirtualized__Table__rowColumn cursor-pointer"
              role="gridcell"
              title="Click to copy"
              style={{ overflow: 'hidden', flex: '1 1 330.6px' }}
            >
              {queryString}
            </div>
          </CopyToClipboard>
        );
      })}
    </div>
  );
};

export default function TableLog({ table }: { table: string }) {
  const { notify } = useNotify();
  const { getTableLogs } = useQuery();
  const { height, width } = useWindowDimensions();

  const theme = usePersistedStore((state) => state.theme);

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

  function onCopy(index: number) {
    notify({
      title: `${headerStrings[index]} Copied`,
      message: '',
      level: 'success',
    });
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

    if (sortingDirection) {
      return _.orderBy(
        display,
        [sortingDirection.column],
        [sortingDirection.direction]
      );
    } else {
      return display;
    }
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

  function handleHeaderClick({ dataKey }: any) {
    if (!dataKey || dataKey === '') {
      return;
    }

    if (!sortingDirection) {
      setSortingDirection({
        column: dataKey,
        direction: 'asc',
      });
    } else if (sortingDirection && sortingDirection.column === dataKey) {
      if (sortingDirection.direction === 'asc') {
        setSortingDirection({
          ...sortingDirection,
          direction: 'desc',
        });
      } else {
        setSortingDirection(undefined);
      }
    } else {
      setSortingDirection({
        column: dataKey,
        direction: 'asc',
      });
    }
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

  async function handleClearLogs() {}

  function getRowStyle({ index }: { index: number }) {
    // -1 is the header row
    if (index === -1) {
      return {
        backgroundColor: theme === 'dark' ? '#2D2D2D' : '#f7fafc',
      };
    }

    // default styles for all rows
    return {
      cursor: 'pointer',
    };
  }

  return (
    <div className="bg-white dark:bg-dark-500 overflow-hidden rounded-md shadow-around-lg w-full mt-4 mb-2">
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
              rowStyle={getRowStyle}
              onHeaderClick={handleHeaderClick}
              rowClassName={TABLE_CLASSES.row}
              headerClassName={TABLE_CLASSES.headerRow}
              gridClassName={TABLE_CLASSES.grid}
              rowRenderer={(props) =>
                rowRenderer({
                  ...props,
                  onCopy,
                })
              }
            >
              {getColumns()}
            </Table>
          )}
        </AutoSizer>
      </div>
      <nav className={TABLE_CLASSES.footer}>
        <RefreshButton />

        <Button.Group>
          <CreateDownloadModal data={display} variant="default" />
          <CreateConfirmModal
            details="You will not be able to retrieve the logs once cleared! It is recommeded to download them first."
            onConfirm={handleClearLogs}
            trigger={<Button variant="danger">Clear</Button>}
          />
        </Button.Group>
      </nav>
    </div>
  );
}
