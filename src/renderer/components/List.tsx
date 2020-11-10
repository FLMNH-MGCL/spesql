import React from 'react';
import Form, { Values } from './ui/Form';
import { getFormElementForField } from './forms/utils';

// TODO: fix types

type ItemProps = {
  img?: React.ReactNode;
  label: any;
  value: any;
  editable?: boolean;
  formId?: string;
};

function Item({ img, label, value, editable }: ItemProps) {
  return (
    <li className="py-2 flex space-x-3">
      {img}
      <div className="flex flex-col">
        {editable ? (
          getFormElementForField(label, value)
        ) : (
          <span className="text-sm leading-5 font-medium text-gray-900">
            {value}
          </span>
        )}

        <span className="text-sm leading-5 text-gray-500">{label}</span>
      </div>
    </li>
  );
}

type ListProps = {
  children: React.ReactNode;
  onEditSubmit?(values: Values): void;
  formId?: string;
};

export default function List({ children, onEditSubmit, formId }: ListProps) {
  if ((onEditSubmit && !formId) || (formId && !onEditSubmit)) {
    throw new Error(
      'You must provide both formId and onEditSubmit when using the List component as a Form'
    );
  }

  if (onEditSubmit && formId) {
    return (
      <Form id={formId} onSubmit={onEditSubmit}>
        <ul className="divide-y divide-gray-200">{children}</ul>
      </Form>
    );
  }

  return <ul className="divide-y divide-gray-200">{children}</ul>;
}

List.Item = Item;
