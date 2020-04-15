export function getQueryHeaders(specimen) {
  if (specimen === undefined) {
    return [];
  }
  // test for ideal headers first
  let ret = [
    "Lep #",
    "Superfamily",
    "Family",
    "Genus",
    "Species",
    "Country",
    "Freezer",
  ];
  if (
    specimen.id &&
    specimen.recordNumber &&
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
      ret.push("MGCL #");
      count += 1;
    }
    if (
      count < 8 &&
      (specimen.otherCatalogNumber || specimen.otherCatalogNumber === "")
    ) {
      ret.push("LEP #");
      count += 1;
    }
    if (count < 8 && (specimen.order_ || specimen.order_ === "")) {
      ret.push("Order");
      count += 1;
    }
    if (count < 8 && (specimen.superfamily || specimen.superfamily === "")) {
      ret.push("Superfamily");
      count += 1;
    }
    if (count < 8 && (specimen.family || specimen.family === "")) {
      ret.push("Family");
      count += 1;
    }
    if (count < 8 && (specimen.subfamily || specimen.subfamily === "")) {
      ret.push("Subfamily");
      count += 1;
    }
    if (count < 8 && (specimen.tribe || specimen.tribe === "")) {
      ret.push("Tribe");
      count += 1;
    }
    if (count < 8 && (specimen.genus || specimen.genus === "")) {
      ret.push("Genus");
      count += 1;
    }
    if (count < 8 && (specimen.subgenus || specimen.subgenus === "")) {
      ret.push("Subgenus");
      count += 1;
    }
    if (
      count < 8 &&
      (specimen.specificEpithet || specimen.specificEpithet === "")
    ) {
      ret.push("Species");
      count += 1;
    }
    if (count < 8 && (specimen.sex || specimen.sex === "")) {
      ret.push("Sex");
      count += 1;
    }
    if (count < 8 && (specimen.country || specimen.country === "")) {
      ret.push("Country");
      count += 1;
    }
    if (
      count < 8 &&
      (specimen.stateProvince || specimen.stateProvince === "")
    ) {
      ret.push("Province");
      count += 1;
    }
    if (count < 8 && (specimen.locality || specimen.locality === "")) {
      ret.push("Locality");
      count += 1;
    }
    if (
      count < 8 &&
      (specimen.verbatimLatitude || specimen.verbatimLatitude === "")
    ) {
      ret.push("Latitude");
      count += 1;
    }
    if (
      count < 8 &&
      (specimen.verbatimLongitude || specimen.verbatimLongitude === "")
    ) {
      ret.push("Longitude");
      count += 1;
    }
    if (
      count < 8 &&
      (specimen.elevationInMeters || specimen.elevationInMeters === "")
    ) {
      ret.push("Elevation");
      count += 1;
    }
    if (count < 8 && (specimen.collectors || specimen.collectors === "")) {
      ret.push("Collector(s)");
      count += 1;
    }
    if (count < 8 && (specimen.freezer || specimen.freezer === "")) {
      ret.push("Freezer");
      count += 1;
    }
    if (count < 8 && (specimen.rack || specimen.rack === "")) {
      ret.push("Rack #");
      count += 1;
    }
    if (count < 8 && (specimen.box || specimen.box === "")) {
      ret.push("Box");
      count += 1;
    }
    if (count < 8 && (specimen.tubeSize || specimen.tubesize === "")) {
      ret.push("Size");
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
