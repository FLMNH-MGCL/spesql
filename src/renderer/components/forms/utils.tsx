import React, { Component } from 'react';
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

export function getFormElementForField(key: string, currentValue: any) {
  console.log(key, currentValue);

  if (key !== 'catalogNumber') return null;

  const formElementForField = {
    catalogNumber: (
      <Form.Input
        slim
        name="catalogNumber"
        register={{ validate: validateCatalogNumber }}
        defaultValue={currentValue}
      />
    ),
  };

  // @ts-ignore
  let element = formElementForField[key];

  console.log(element);

  return element ?? null;
}
