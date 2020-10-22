import React, { useState } from "react";
import { Table, Column, AutoSizer } from "react-virtualized";
import useWindowDimensions from "../utils/useWindowDimensions";
import { headerToReadable } from "../../constants/constants";
import { SortableContainer } from "react-sortable-hoc";
import SearchFilter from "./SearchFilter";
import DBSearch from "./DBSearch";
import { Button, Icon } from "semantic-ui-react";
import CreateErrorLogModal from "../modals/CreateErrorLogModal";
import CreateHelpModal from "../modals/CreateHelpModal";
import _ from "lodash";
import "react-virtualized/styles.css";
import "./VirtualizedList.css";
import CreateToolsModal from "../modals/CreateToolsModal";

const SortableTable = SortableContainer(Table);

export default function VirtualizedList({
  props,
  runSelectQuery,
  runCountQuery,
  runUpdateQuery,
  runDeleteQuery,
  notify,
}) {
  const { width } = useWindowDimensions();
  const [selected, select] = useState(undefined);
  const [selectedElement, selectElement] = useState(undefined);
  const [sorting, setSorting] = useState(undefined);

  function updateLoading() {
    props.updateLoadingStatus(false);
  }

  function handleRowClick(data) {
    const { event, index } = data;
    let element = event.target;

    if (element.className === "ReactVirtualized__Table__rowColumn") {
      element = element.parentNode;
    }
    // console.log(element);
    const newTarget = props.data[index];

    if (!selected && !selectedElement) {
      element.classList.toggle("active-row");
      selectElement(element);
      select(newTarget);
      props.updateSelectedSpecimen(newTarget);
    } else if (selected && selectedElement && selected.id !== newTarget.id) {
      // untoggle current active && toggle newly selected
      selectedElement.classList.toggle("active-row");
      element.classList.toggle("active-row");
      selectElement(element);
      select(newTarget);
      props.updateSelectedSpecimen(newTarget);
    } else if (selected && selected.id === newTarget.id) {
      select(undefined);
      element.classList.toggle("active-row");
      selectElement(undefined);
      props.updateSelectedSpecimen(undefined);
    } else {
      // force reset
      select(undefined);
      selectElement(undefined);
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

  const list = props.data.filter((specimen) => {
    return specimenIncludes(specimen, props.filteredText, props.filterCategory);
  });

  const display = sorting
    ? _.orderBy(list, [sorting.column], [sorting.direction])
    : list;

  return (
    <div style={{ height: "85vh" }}>
      <div style={{ height: "89%" }}>
        <AutoSizer>
          {({ height, width }) => (
            <SortableTable
              className="table-main"
              rowClassName="table-row"
              height={height}
              width={width}
              headerHeight={60}
              rowHeight={40}
              rowCount={display.length}
              rowGetter={({ index }) => display[index]}
              // rowRenderer={rowRenderer}
              onRowClick={handleRowClick}
              onRowsRendered={updateLoading}
              onHeaderClick={handleHeaderClick}
            >
              {getColumns()}
            </SortableTable>
          )}
        </AutoSizer>
      </div>
      <div style={{ height: "11%" }}>
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
                  runSelectQuery(command);
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
              <CreateToolsModal {...props} />
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
                    {props.filteredText !== ""
                      ? list.length
                      : props.data.length}
                  </p>
                </div>
              )}

              <div style={{ paddingLeft: ".75rem" }}>
                <CreateHelpModal queryType="LIST_HELP" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
