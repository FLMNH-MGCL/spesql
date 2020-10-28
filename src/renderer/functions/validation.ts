export const NeutralValidator = { validate: () => true };
// TODO: look into conditional register settings for validator, I do not like this solution at all

export function validateAdvancedSelectQuery(query: string) {
  if (query === '') {
    return true;
  } else if (!query.toLowerCase().startsWith('select')) {
    return 'Invalid Select query';
  } else {
    return true;
  }
}

export function validateAdvancedCountQuery(query: string) {
  if (query === '') {
    return true;
  } else if (!query.toLowerCase().startsWith('select')) {
    return 'Invalid Select query';
  } else {
    return true;
  }
}

export function validateFieldSelection(fields: string[]) {
  console.log(fields);
  return 'bad no no';
}
