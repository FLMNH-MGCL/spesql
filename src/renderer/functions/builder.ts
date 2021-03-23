import { FormSubmitValues } from '@flmnh-mgcl/ui';
import clsx from 'clsx';
import { Specimen, SpecimenFields } from '../types';
import {
  determineAndRunFieldValidator,
  specialCaseEmpties,
} from './validation';

// TODO: alter all builders to account for new operators added!!

export function buildSelectQuery(table: string, conditionals?: any[]) {
  let queryString = clsx(
    'SELECT ?? FROM',
    table,
    conditionals?.length && 'WHERE'
  );

  let queryArray: any[] = [];

  conditionals?.forEach((conditional, index) => {
    const { field, operator, value } = conditional;

    if (operator.indexOf('BETWEEN') >= 0) {
      queryString = clsx(
        queryString,
        '??',
        operator,
        value,
        index !== conditionals.length - 1 && 'AND'
      );

      queryArray.push(field);
    } else if (['IS NULL', 'IS NOT NULL'].includes(operator)) {
      queryString = clsx(
        queryString,
        '??',
        operator,
        index !== conditionals.length - 1 && 'AND'
      );

      queryArray.push(field);
    } else {
      queryString = clsx(
        queryString,
        '??',
        operator,
        '?',
        index !== conditionals.length - 1 && 'AND'
      );

      queryArray.push(field);
      queryArray.push(value);
    }
  });

  return { queryString, queryArray };
}

export function buildCountQuery(
  table: string,
  fields: string[],
  conditionals?: any[],
  distinct?: boolean
) {
  let fieldString = fields.toString().replace(',', ', ');

  fieldString =
    fields.length > 1 || distinct ? 'DISTINCT ' + fieldString : fieldString;

  let queryString = clsx(
    `SELECT COUNT(${fieldString}) FROM`,
    table,
    conditionals?.length && 'WHERE'
  );

  let queryArray: any[] = [];

  conditionals?.forEach((conditional, index) => {
    queryString = clsx(
      queryString,
      '??',
      conditional.operator,
      '?',
      index !== conditionals.length - 1 && 'AND'
    );

    queryArray.push(conditional.field);
    queryArray.push(conditional.value);
  });

  return { queryString, queryArray };
}

export function buildUpdateQuery(
  table: string,
  conditionals: any[],
  sets: any[]
  // distinct?: boolean
) {
  // console.log(table, conditionals, sets);

  let queryString = clsx('UPDATE', table, 'SET ? WHERE');

  let conditionalPairs: any[] = [];

  conditionals.forEach((condition, index) => {
    queryString = clsx(
      queryString,
      '??',
      condition.operator,
      '?',
      index !== conditionals.length - 1 && 'AND'
    );

    conditionalPairs.push(condition.field);
    conditionalPairs.push(condition.value);
  });

  let updates: any = {};

  sets.forEach((statement) => {
    updates[statement.field] = statement.value;
  });

  console.log(queryString, conditionalPairs, updates);

  return { queryString, conditionalPairs, updates };
}

export function buildSingleUpdateQuery(
  table: string,
  updatedSpecimen: Partial<SpecimenFields>,
  currentSpecimen: Partial<SpecimenFields>
) {
  let query = clsx('UPDATE', table, 'SET ? WHERE ?? = ?');

  let updates: any = {};
  let logUpdates: any[] = [];
  let errors: any[] = [];

  Object.keys(updatedSpecimen).forEach((key) => {
    const _key = key as keyof SpecimenFields;
    if (updatedSpecimen[_key] !== currentSpecimen[_key]) {
      const valid = determineAndRunFieldValidator(key, updatedSpecimen[_key]);

      // valid: string | boolean
      if (!valid || valid !== true) {
        errors.push({ field: _key, message: valid });
      } else {
        updates[_key] = updatedSpecimen[_key];
        logUpdates.push({
          [_key]: {
            old: currentSpecimen[_key],
            new: updatedSpecimen[_key],
          },
        });
      }
    }
  });

  return { errors, updates, query, logUpdates };
}
