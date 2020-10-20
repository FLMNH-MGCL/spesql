import React from "react";
import { Table, Column, AutoSizer } from "react-virtualized";
import useWindowDimensions from "./utils/useWindowDimensions";
import { SortableContainer } from "react-sortable-hoc";
import _ from "lodash";
import "react-virtualized/styles.css";

import { Specimen } from "../types";
import { FilterToggle, FilterSearch } from "./Filter";
import ClearQueryButton from "./ClearQueryButton";
// import "./VirtualizedList.css";

const SortableTable = SortableContainer(Table);

function TableFooter() {
  return (
    <div
      style={{ height: "10%" }}
      className="flex items-center bg-gray-500 px-4"
    >
      <div>
        <div className="block">
          <div className="flex justify-between items-center space-x-2">
            <FilterToggle />
            <ClearQueryButton />
            <FilterSearch />
          </div>
        </div>

        <div className="block">
          <div className="flex justify-between items-center"></div>
        </div>
      </div>
    </div>
  );
}

type TableProps = {
  headers: Set<keyof Specimen>;
  data: Specimen[];
};

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

  return (
    <React.Fragment>
      <div style={{ height: "90%" }}>
        <AutoSizer>
          {({ height, width }) => (
            <SortableTable
              height={height}
              width={width}
              headerHeight={60}
              rowHeight={40}
              rowCount={0}
              // rowGetter={({ index }) => display[index]}
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
