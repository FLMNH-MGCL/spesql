import clsx from 'clsx';

// TODO: type me plz
export function buildSelectQuery(table: string, conditionals?: any[]) {
  let queryString = clsx(
    'SELECT ?? FROM',
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

// TODO: type me plz
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
