import React, { useState } from "react";
import {
  Table,
  Column,
  AutoSizer,
  defaultTableHeaderRowRenderer,
  defaultTableRowRenderer,
} from "react-virtualized";
import useWindowDimensions from "../utils/useWindowDimensions";
import "react-virtualized/styles.css";
import { headerToReadable } from "../Query/QueryConstants/constants";
import "./VirtualizedList.css";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import SearchFilter from "../Search/SearchFilter";
import DBSearch from "../Search/DBSearch";
import { Button, Icon } from "semantic-ui-react";
import CreateErrorLogModal from "../Error/CreateErrorLogModal";
import CreateHelpModal from "../Help/CreateHelpModal";
import _ from "lodash";

const SortableTable = SortableContainer(Table);
const SortableTableRowRenderer = SortableElement(defaultTableRowRenderer);

export default function VirtualizedList({ props, runQuery, notify }) {
  const { height, width } = useWindowDimensions();
  const [selected, select] = useState(props.selectedSpecimen);
  const [sorting, setSorting] = useState(undefined);

  function updateLoading() {
    props.updateLoadingStatus(false);
  }

  function handleRowClick(rowIndex) {
    const newTarget = props.data[rowIndex];
    if (!selected || selected.id !== newTarget.id) {
      select(newTarget);
      props.updateSelectedSpecimen(newTarget);
    } else if (selected && selected.id === newTarget.id) {
      select(undefined);
      props.updateSelectedSpecimen(undefined);
    }
  }

  function handleHeaderClick({ dataKey }) {
    if (!sorting) {
      setSorting({
        column: dataKey,
        direction: "asc",
      });
    } else if (sorting && sorting.column === dataKey) {
      if (sorting.direction === "asc") {
        setSorting({
          ...sorting,
          direction: "desc",
        });
      } else {
        setSorting(undefined);
      }
    } else {
      setSorting({
        column: dataKey,
        direction: "asc",
      });
    }
  }

  function rowRenderer(rowProps) {
    const activeClass =
      selected && selected.id === rowProps.rowData.id ? " active-row" : "";
    rowProps = {
      ...rowProps,
      className: rowProps.className + activeClass,
    };

    // if (activeClass === " active-row") {
    //   console.log(rowProps);
    // }

    return (
      <SortableTableRowRenderer
        {...rowProps}
        onRowClick={() => handleRowClick(rowProps.index)}
      />
    );
  }

  function renderHeader({ dataKey, sortBy, sortDirection }) {
    return (
      <div className="header-cell" key={dataKey}>
        {headerToReadable[dataKey]}{" "}
        {sorting &&
          sorting.column === dataKey &&
          sorting.direction === "asc" && <Icon name="angle up" />}
        {sorting &&
          sorting.column === dataKey &&
          sorting.direction === "desc" && <Icon name="angle down" />}
      </div>
    );
  }

  function renderCell({ cellData }) {
    return cellData;
  }

  function getColumns() {
    let headers = props.query_headers;

    const columns = headers.map((header) => {
      return (
        <Column
          key={header}
          label={headerToReadable[header]}
          dataKey={header}
          flexGrow={1}
          flexShrink={1}
          width={width / headers.length}
          headerRenderer={renderHeader}
        />
      );
    });

    return columns;
  }

  function specimenIncludes(specimen, text, category = "*") {
    if (category !== "*") {
      return specimen[category].toLowerCase().indexOf(text.toLowerCase()) >= 0;
    }

    let doesInclude = Object.values(specimen).some((field) =>
      String(field).includes(text)
    );

    // console.log(specimen, doesInclude);

    return doesInclude;
  }

  console.log(sorting);

  const rowGetter = ({ index }) => _getDatum(props.data, index);

  const list = props.data.filter((specimen) => {
    return specimenIncludes(specimen, props.filteredText, props.filterCategory);
  });

  const display = sorting
    ? _.orderBy(list, [sorting.column], [sorting.direction])
    : list;

  return (
    // <AutoSizer>
    //   {({ height, width }) => (
    <>
      <SortableTable
        className="table-main"
        rowClassName="table-row"
        height={height * 0.8}
        width={width * 0.66 - 4}
        headerHeight={60}
        rowHeight={40}
        rowCount={display.length}
        rowGetter={({ index }) => display[index]}
        rowRenderer={rowRenderer}
        onRowsRendered={updateLoading}
        onHeaderClick={handleHeaderClick}
      >
        {/* <Column label="lep" dataKey="otherCatalogNumber" width={width / 2} />
        <Column label="order" dataKey="order_" width={width / 2} /> */}
        {getColumns()}
      </SortableTable>

      <div className="query-curr">
        <h4>Current Query:</h4>
        <p>{props.current_query}</p>
      </div>

      <div>
        <div className="query-info">
          <div className="info-actions">
            <SearchFilter
              filterCategory={props.filterCategory}
              updateFilteredCategory={props.updateFilteredCategory}
              disabled={props.data.length === 0}
            />
            <DBSearch
              filteredText={props.filteredText}
              updateFilteredText={props.updateFilteredText}
              disabled={props.data.length === 0}
            />
            <Button
              negative
              onClick={() => {
                props.clearQuery();
              }}
              disabled={props.current_query === "" ? true : false}
              style={{ marginLeft: ".2rem" }}
            >
              Clear Query
            </Button>
            <Button
              icon
              onClick={() => {
                // console.log('refreshed!')
                props.clearQuery();
                let command = props.current_query;
                props.updateRefreshStatus(true);
                props.updateLoadingStatus(true);
                runQuery(command);
              }}
              disabled={props.current_query === "" ? true : false}
            >
              <Icon name="refresh" />
            </Button>
            <CreateErrorLogModal
              type="Global Errors"
              errors={props.errorMessages.globalError}
              updateError={props.updateGlobalErrorMessage}
              inline
            />
          </div>
          <div className="query-infosheet">
            <div className="query-text">
              <h4>Query Size:</h4>
              <p>{props.data.length}</p>
            </div>
            {props.filteredText !== "" && (
              <div className="query-text">
                <h4>Filtered Size:</h4>
                <p>
                  {props.filteredText !== "" ? list.length : props.data.length}
                </p>
              </div>
            )}

            <div style={{ paddingLeft: ".75rem" }}>
              <CreateHelpModal queryType="LIST_HELP" />
            </div>
          </div>
        </div>
      </div>
    </>
    // )}
    // </AutoSizer>
  );
}

function _getDatum(list, index) {
  return list.get(index % list.size);
}
