import React from 'react';
import Form, { Values } from '../ui/Form';

type Props = {
  table: string;
  onSubmit(values: Values): void;
};

// TODO
// @ts-ignore
export default function EditTableForm({ table, onSubmit }: Props) {
  return (
    <Form onSubmit={onSubmit} id="edit-table-form">
      <Form.Group flex>
        <Form.Input
          name="newName"
          defaultValue={table}
          label="Table Name"
          fullWidth
        />
      </Form.Group>
    </Form>
  );
}
