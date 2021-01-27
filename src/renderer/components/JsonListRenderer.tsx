import React from 'react';
import ReactJson from 'react-json-view';

export type JsonListRendererProps = {
  list?: any;
};

export default function JsonListRenderer({ list }: JsonListRendererProps) {
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
