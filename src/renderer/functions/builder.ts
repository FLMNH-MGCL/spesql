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
