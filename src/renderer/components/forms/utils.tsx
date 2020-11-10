import React from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../../types';
import { validateCatalogNumber } from '../../functions/validation';
import Form from '../ui/Form';

export async function fetchTables(setTables: any) {
  const res = await axios
    .get(BACKEND_URL + '/api/queriables/select/')
    .catch((error) => error.response);

  if (res.data && res.data.tables) {
    setTables(
      res.data.tables.map((table: string) => {
        return { label: table, value: table };
      })
    );
  }
}

// TODO: complete me
// this will map specimen fields to their corresponding form elements
export const formElementForField = {
  catalogNumber: (
    <Form.Input
      name="catalogNumber"
      register={{ validate: validateCatalogNumber }}
    />
  ),
};
