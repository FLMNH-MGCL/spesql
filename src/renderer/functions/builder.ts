import clsx from 'clsx';
import { Values } from '../components/ui/Form';
import { SpecimenFields } from '../types';
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

// export function buildSingleUpdateQuery(table: string) {
//   let queryString = clsx('UPDATE', table, 'SET ? WHERE ?? = ?');

//   return { queryString };
// }

export function buildSingleUpdateQuery(
  table: string,
  values: Values,
  selectedSpecimen: Partial<SpecimenFields>
) {
  let query = clsx('UPDATE', table, 'SET ? WHERE ?? = ?');

  let errors: any[] = [];
  let logUpdates: any[] = [];
  let updates: any = {};

  // console.log(values);

  // TODO: try and break me please
  Object.keys(values).forEach((key) => {
    if (selectedSpecimen[key as keyof SpecimenFields] !== values[key]) {
      const error = determineAndRunFieldValidator(key, values[key]);

      if (error !== true) {
        errors.push({ field: key, message: error });
      } else if (key in specialCaseEmpties) {
        // IF the value[key] is empty (null, undefined, ''), and if it doesn't match its
        // special case empty value (e.g. if it needs to be null or undefined but is '', or vice-versa)
        // then it should not be updated
        if (
          !values[key] &&
          specialCaseEmpties[key as keyof typeof specialCaseEmpties] !==
            values[key]
        ) {
          // therefore, I do nothing with it
        } else {
          // update the field
          updates[key] = values[key];
          logUpdates.push({
            [key]: {
              old: selectedSpecimen[key as keyof SpecimenFields],
              new: values[key],
            },
          });
        }
      } else {
        updates[key] = values[key];
        logUpdates.push({
          [key]: {
            old: selectedSpecimen[key as keyof SpecimenFields],
            new: values[key],
          },
        });
      }
    }
  });

  return { errors, updates, query, logUpdates };
}
