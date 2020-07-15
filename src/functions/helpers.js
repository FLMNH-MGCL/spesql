// TODO: refactor to consider a chunk of specimen, and what the majority of them have
export function getQueryHeaders(specimen) {
  if (specimen === undefined) {
    return [];
  }
  // test for ideal headers first
  let ret = [
    "catalogNumber",
    "otherCatalogNumber",
    "superfamily",
    "family",
    "genus",
    "specificEpithet",
    "country",
    "freezer",
  ];
  if (
    specimen.catalogNumber &&
    specimen.otherCatalogNumber &&
    specimen.superfamily &&
    specimen.family &&
    specimen.genus &&
    specimen.specificEpithet &&
    specimen.country &&
    specimen.freezer
  ) {
    return ret;
  } else {
    ret = [];
    let count = 0;

    if (
      count < 8 &&
      (specimen.catalogNumber || specimen.catalogNumber === "")
    ) {
      ret.push("catalogNumber");
      count += 1;
    }
    if (
      count < 8 &&
      (specimen.otherCatalogNumber || specimen.otherCatalogNumber === "")
    ) {
      ret.push("otherCatalogNumber");
      count += 1;
    }
    if (count < 8 && (specimen.order_ || specimen.order_ === "")) {
      ret.push("order_");
      count += 1;
    }
    if (count < 8 && (specimen.superfamily || specimen.superfamily === "")) {
      ret.push("superfamily");
      count += 1;
    }
    if (count < 8 && (specimen.family || specimen.family === "")) {
      ret.push("family");
      count += 1;
    }
    if (count < 8 && (specimen.subfamily || specimen.subfamily === "")) {
      ret.push("subfamily");
      count += 1;
    }
    if (count < 8 && (specimen.tribe || specimen.tribe === "")) {
      ret.push("tribe");
      count += 1;
    }
    if (count < 8 && (specimen.genus || specimen.genus === "")) {
      ret.push("genus");
      count += 1;
    }
    if (count < 8 && (specimen.subgenus || specimen.subgenus === "")) {
      ret.push("subgenus");
      count += 1;
    }
    if (
      count < 8 &&
      (specimen.specificEpithet || specimen.specificEpithet === "")
    ) {
      ret.push("specificEpithet");
      count += 1;
    }
    if (count < 8 && (specimen.sex || specimen.sex === "")) {
      ret.push("sex");
      count += 1;
    }
    if (count < 8 && (specimen.country || specimen.country === "")) {
      ret.push("country");
      count += 1;
    }
    if (
      count < 8 &&
      (specimen.stateProvince || specimen.stateProvince === "")
    ) {
      ret.push("stateProvince");
      count += 1;
    }
    if (count < 8 && (specimen.locality || specimen.locality === "")) {
      ret.push("locality");
      count += 1;
    }
    if (
      count < 8 &&
      (specimen.verbatimLatitude || specimen.verbatimLatitude === "")
    ) {
      ret.push("verbatimLatitude");
      count += 1;
    }
    if (
      count < 8 &&
      (specimen.verbatimLongitude || specimen.verbatimLongitude === "")
    ) {
      ret.push("verbatimLongitude");
      count += 1;
    }
    if (
      count < 8 &&
      (specimen.elevationInMeters || specimen.elevationInMeters === "")
    ) {
      ret.push("elevationInMeters");
      count += 1;
    }
    if (
      count < 8 &&
      (specimen.otherCollectors || specimen.otherCollectors === "")
    ) {
      ret.push("otherCollectors");
      count += 1;
    }
    if (count < 8 && (specimen.freezer || specimen.freezer === "")) {
      ret.push("freezer");
      count += 1;
    }
    if (count < 8 && (specimen.rack || specimen.rack === "")) {
      ret.push("rack");
      count += 1;
    }
    if (count < 8 && (specimen.box || specimen.box === "")) {
      ret.push("box");
      count += 1;
    }
    if (count < 8 && (specimen.tubeSize || specimen.tubesize === "")) {
      ret.push("tubeSize");
      count += 1;
    }

    return ret;
  }
}

/**
 * this function will be responsible for creating some of the 'metadata' the table will have.
 *
 * fields would include: recordEnteredBy, etc.
 */
export function createAutoGenFields(/* requires things like current user, date, etc */) {}

// export function headerToField
