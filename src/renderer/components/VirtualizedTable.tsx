import React from 'react';
import { Table, Column, AutoSizer } from 'react-virtualized';
import useWindowDimensions from './utils/useWindowDimensions';
import { SortableContainer } from 'react-sortable-hoc';
import _ from 'lodash';
import 'react-virtualized/styles.css';

import { FilterToggle, FilterSearch } from './Filter';
import ClearQueryButton from './buttons/ClearQueryButton';
import RefreshQueryButton from './buttons/RefreshQueryButton';
import CreateHelpModal from './modals/CreateHelpModal';
import CreateHeaderConfigModal from './modals/CreateHeaderConfigModal';
import { useStore } from '../../stores';
import shallow from 'zustand/shallow';
import Spinner from './ui/Spinner';
import CreateLogModal from './modals/CreateLogModal';

const SortableTable = SortableContainer(Table);

type FooterProps = {
  disableInteractables?: boolean;
};

// TODO: CONSIDER https://medium.com/better-programming/an-introduction-to-react-table-6ebd34d8059e

function TableFooter({ disableInteractables }: FooterProps) {
  return (
    <div className="h-16 bg-gray-50 flex items-center justify-between px-4">
      <div className="flex space-x-2">
        <FilterToggle disabled={disableInteractables} />
        <ClearQueryButton disabled={disableInteractables} />
        <FilterSearch disabled={disableInteractables} />
        <RefreshQueryButton disabled={disableInteractables} />
        <CreateHeaderConfigModal disabled={disableInteractables} />
      </div>
      <div className="flex space-x-2">
        <CreateLogModal />
        <CreateHelpModal variant="global" />
      </div>
    </div>
  );
}

// TODO: make me
export default function () {
  const { width } = useWindowDimensions();

  const { headers, data, loading } = useStore(
    (state) => ({
      headers: state.tableConfig.headers,
      data: state.queryData.data,
      loading: state.loading,
    }),
    shallow
  );

  const toggleLoading = useStore((state) => state.toggleLoading);

  function getColumns() {
    const columns =
      !data || !data.length
        ? []
        : Array.from(headers).map((header) => {
            return (
              <Column
                key={header}
                label={header}
                dataKey={header}
                flexGrow={1}
                flexShrink={1}
                width={width / headers.length}
              />
            );
          });

    return columns;
  }

  function renderHeader({ dataKey, sortBy, sortDirection }: any) {
    // console.log(sortBy, sortDirection);
    return (
      <div className="header-cell" key={dataKey}>
        {dataKey}
        {/* {headerToReadable[dataKey]}{' '} */}
        {/* {sorting &&
          sorting.column === dataKey &&
          sorting.direction === 'asc' && <Icon name="angle up" />}
        {sorting &&
          sorting.column === dataKey &&
          sorting.direction === 'desc' && <Icon name="angle down" />} */}
      </div>
    );
  }

  return (
    <React.Fragment>
      <div className="table-height">
        <Spinner active={loading} />

        <AutoSizer>
          {({ height, width }) => (
            <SortableTable
              height={height}
              width={width}
              rowHeight={40}
              headerHeight={60}
              rowCount={data.length}
              rowGetter={({ index }) => data[index]}
              headerRenderer={renderHeader}
              // rowRenderer={rowRenderer}
              // onRowClick={handleRowClick}
              onRowsRendered={() => toggleLoading(false)}
              // onHeaderClick={handleHeaderClick}
            >
              {getColumns()}
            </SortableTable>
          )}
        </AutoSizer>
      </div>
      <TableFooter disableInteractables={!data || !data.length} />
    </React.Fragment>
  );
}
