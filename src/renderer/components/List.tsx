import React from 'react';
import Form, { Values } from './ui/Form';
import { getFormElementForField } from './forms/utils';
import clsx from 'clsx';

// TODO: fix types

type ItemProps = {
  fullWidth?: boolean;
  img?: React.ReactNode;
  label: any;
  value: any;
  editable?: boolean;
  formId?: string;
};

function Item({ fullWidth, img, label, value, editable }: ItemProps) {
  return (
    <li className="py-2 flex space-x-3">
      {img}
      <div className={clsx(fullWidth && 'w-full', 'flex flex-col space-y-2')}>
        {editable ? (
          getFormElementForField(label, value)
        ) : (
          <span className="text-sm leading-5 font-medium text-gray-900 dark:text-dark-200">
            {value}
          </span>
        )}

        <span className="text-sm leading-5 text-gray-500 dark:text-dark-300">
          {label}
        </span>
      </div>
    </li>
  );
}

type ListProps = {
  children: React.ReactNode;
  onEditSubmit?(values: Values): void;
  formId?: string;
};

// NOTE: this component is not in the ui folder because I felt it was too specific,
// the use of getFormElementForField on an editable field makes it less compatible with
// any list that isn't a specimen list
export default function List({ children, onEditSubmit, formId }: ListProps) {
  if ((onEditSubmit && !formId) || (formId && !onEditSubmit)) {
    throw new Error(
      'You must provide both formId and onEditSubmit when using the List component as a Form'
    );
  }

  if (onEditSubmit && formId) {
    return (
      <Form id={formId} onSubmit={onEditSubmit}>
        <ul className="divide-y divide-gray-200 dark:divide-dark-400">
          {children}
        </ul>
      </Form>
    );
  }

  return (
    <ul className="divide-y divide-gray-200 dark:divide-dark-400">
      {children}
    </ul>
  );
}

List.Item = Item;
