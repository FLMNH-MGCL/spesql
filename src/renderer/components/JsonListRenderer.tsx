// import { Code } from '@flmnh-mgcl/ui';
import React from 'react';
import ReactJson from 'react-json-view';
// import { AutoSizer, List, ListRowProps } from 'react-virtualized';

// // List data as an array of strings
// const list = Array.from({ length: 5000 }, () => {
//   return {
//     code: 'ER_PARSE_ERROR',
//     message:
//       "You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near 'FROM WHERE ()' at line 1",
//     sql: 'SELECT FROM WHERE ()',
//   };
// });

export type JsonListRendererProps = {
  list?: any;
};

export default function JsonListRenderer({ list }: JsonListRendererProps) {
  // function rowRenderer({ key, index }: ListRowProps) {
  //   return (
  //     <Code language="sql" key={key} style={{ margin: 0 }}>
  //       {list[index]}
  //     </Code>
  //   );
  // }

  // return (
  //   <AutoSizer>
  //     {({ height, width }) => (
  //       <List
  //         width={width}
  //         height={height}
  //         rowGetter={({ index }: any) => list[index]}
  //         rowCount={list.length}
  //         rowHeight={40}
  //         rowRenderer={rowRenderer}
  //         headerHeight={20}
  //       />
  //     )}
  //   </AutoSizer>
  // );

  return (
    <ReactJson
      theme="railscasts"
      src={list}
      collapsed={false}
      enableClipboard={false}
      collapseStringsAfterLength={false}
      groupArraysAfterLength={50}
      displayDataTypes={false}
      onEdit={false}
      onAdd={false}
      onDelete={false}
      displayObjectSize={false}
      name={false}
    />
  );
}
