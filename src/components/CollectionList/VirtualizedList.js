import React from "react";
import {
  Table,
  Column,
  AutoSizer,
  defaultTableHeaderRowRenderer,
} from "react-virtualized";
import useWindowDimensions from "../utils/useWindowDimensions";
import "react-virtualized/styles.css";

export default function VirtualizedList({ props, runQuery, notify }) {
  const { height, width } = useWindowDimensions();

  function renderRow({ index, key, style }) {
    return (
      <div key={key} style={style}>
        props.data[index]
      </div>
    );
  }

  function renderHeader({ dataKey, sortBy, sortDirection }) {
    return <div>Header</div>;
  }

  function renderCell({ cellData }) {
    return cellData;
  }

  console.log(props.data);

  const rowGetter = ({ index }) => _getDatum(props.data, index);

  const list = props.data;

  return (
    // <AutoSizer>
    //   {({ height, width }) => (
    <>
      <Table
        height={height * 0.8}
        width={width}
        headerHeight={40}
        rowHeight={40}
        rowCount={list.length}
        rowGetter={({ index }) => list[index]}
      >
        <Column label="lep" dataKey="otherCatalogNumber" width={width / 2} />
        <Column label="order" dataKey="order_" width={width / 2} />
      </Table>
      <div>footer</div>
    </>
    // )}
    // </AutoSizer>
  );
}

function _getDatum(list, index) {
  return list.get(index % list.size);
}
