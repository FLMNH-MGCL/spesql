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
// TODO: distinct boolean
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
