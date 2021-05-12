// takes a CSV row and converts to proper representation
export function convertToDbSpecimen() {}

export function flattenDBSpecimen(specimen: any) {
  return Object.assign(
    {},
    ...(function _flatten(o): any {
      return [].concat(
        ...Object.keys(o).map((k) =>
          o[k] && typeof o[k] === 'object' ? _flatten(o[k]) : { [k]: o[k] }
        )
      );
    })(specimen)
  );
}
