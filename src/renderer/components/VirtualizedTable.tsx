import React from 'react';
import { Table, Column, AutoSizer } from 'react-virtualized';
import useWindowDimensions from './utils/useWindowDimensions';
import { SortableContainer } from 'react-sortable-hoc';
import _ from 'lodash';
import 'react-virtualized/styles.css';

import { Specimen } from '../types';
import { FilterToggle, FilterSearch } from './Filter';
import ClearQueryButton from './buttons/ClearQueryButton';
import RefreshQueryButton from './buttons/RefreshQueryButton';
import CreateHelpModal from './modals/CreateHelpModal';
// import "./VirtualizedList.css";

const SortableTable = SortableContainer(Table);

function TableFooter() {
  return (
    <div className="h-16 bg-gray-50 flex items-center justify-between px-4">
      <div className="flex space-x-2">
        <FilterToggle />
        <ClearQueryButton />
        <FilterSearch />
        <RefreshQueryButton />
      </div>
      <div className="flex space-x-2">
        <CreateHelpModal variant="global" />
      </div>
    </div>

    // <div className="bg-gray-50 flex items-center border border-gray-100 px-4 h-16 w-full">
    //   <div className="flex justify-between">
    //     <div className="justify-between items-center space-x-2 ">
    //       <FilterToggle />
    //       <ClearQueryButton />
    //       <FilterSearch />
    //       <RefreshQueryButton />
    //     </div>

    //     <div>
    //       <CreateHelpModal variant="global" />
    //     </div>
    //   </div>
    // </div>
  );
}

type TableProps = {
  headers: Set<keyof Specimen>;
  data: Specimen[];
};

// TODO: make me
export default function ({ headers, data }: TableProps) {
  const { width } = useWindowDimensions();

  function getColumns() {
    const columns = Array.from(headers).map((header) => {
      return (
        <Column
          key={header}
          label={header}
          dataKey={header}
          flexGrow={1}
          flexShrink={1}
          width={width / headers.size}
        />
      );
    });

    return columns;
  }

  function renderHeader({ dataKey, sortBy, sortDirection }: any) {
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
        <AutoSizer>
          {({ height, width }) => (
            <SortableTable
              height={height}
              width={width}
              rowHeight={40}
              headerHeight={60}
              rowCount={0}
              rowGetter={({ index }) => data[index]}
              headerRenderer={renderHeader}
              // rowRenderer={rowRenderer}
              // onRowClick={handleRowClick}
              // onRowsRendered={updateLoading}
              // onHeaderClick={handleHeaderClick}
            >
              {getColumns()}
            </SortableTable>
          )}
        </AutoSizer>
      </div>
      <TableFooter />
    </React.Fragment>
  );
}
