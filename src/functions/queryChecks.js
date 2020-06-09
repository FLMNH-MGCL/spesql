import {
  identificationQualifierControl,
  samplingProtocolControl,
  dispositionControl,
  preparationsControl,
  tubeSizeControl,
  lifeStageControl,
  sexControl,
  // setCountOptions,
  countryControl,
  geodeticDatumControl,
  yesOrNo,
} from "../components/Query/QueryConstants/constants";

const correctHeaders = [
  "catalogNumber", //
  "otherCatalogNumber", //
  "recordNumber", //
  "order_", //
  "superfamily", //
  "family", //
  "subfamily", //
  "tribe", //
  "genus", //
  "subgenus", //
  "specificEpithet", //
  "infraspecificEpithet", //
  "identificationQualifier", //
  "recordedBy", //
  "otherCollectors", //
  "identifiedBy", //
  "dateIdentified", //
  "verbatimDate", //
  "collectedYear", //
  "collectedMonth", //
  "collectedDay", //
  "sex", //
  "lifeStage", //
  "habitat", //
  "occurrenceRemarks", //
  "molecularOccurrenceRemarks", //
  "samplingProtocol", //
  "country", //
  "stateProvince", //
  "county", //
  "municipality", //
  "locality", //
  "elevationInMeters", //
  "decimalLatitude", //
  "decimalLongitude", //
  "geodeticDatum", //
  "coordinateUncertainty", //
  "verbatimLatitude", //
  "verbatimLongitude", //
  "georeferencedBy", //
  "disposition", //
  "isLoaned", //
  "loanInstitution", //
  "loaneeName", //
  "loanDate", //
  "loanReturnDate", //
  "preparations", //
  "freezer", //
  "rack", //
  "box", //
  "tubeSize", //
  "associatedSequences", //
  "associatedReferences", //
  "withholdData", //
  "reared", //
  "fieldNotes", //
];

export function checkHeaders(headers) {
  let errors = [];
  if (headers === undefined) {
    return errors;
  }

  if (correctHeaders.length === headers.length) {
    headers.forEach((header, index) => {
      // console.log(`${header.toLowerCase()} vs ${correctHeaders[index].toLowerCase()}`)
      if (header.toLowerCase() !== correctHeaders[index].toLowerCase()) {
        errors.push(
          `INVALID COLUMN HEADER: Expected ${correctHeaders[index]}, Recieved ${header}`
        );
      }
    });
  } else if (headers.length < correctHeaders.length) {
    errors.push(
      `Detected missing headers: Expected ${correctHeaders.length}, Recieved ${headers.length}`
    );

    // check for correctness in the headers that exist:
    correctHeaders.forEach((header, index) => {
      if (index < headers.length) {
        if (header.toLowerCase() !== headers[index].toLowerCase()) {
          errors.push(
            `INVALID COLUMN HEADER: Expected ${header}, Recieved ${headers[index]}`
          );
        }
      } else {
        errors.push(`INVALID COLUMN HEADER: Expected ${header}, Recieved ''`);
      }
    });
  } else if (headers.length > correctHeaders.length) {
    errors.push(
      `Detected too many headers: Expected ${correctHeaders.length}, Recieved ${headers.length}`
    );

    headers.forEach((header, index) => {
      if (index < correctHeaders.length) {
        if (header.toLowerCase() !== correctHeaders[index].toLowerCase()) {
          errors.push(
            `INVALID COLUMN HEADER: Expected ${correctHeaders[index]}, Recieved ${header}`
          );
        }
      } else {
        let correctPosition = correctHeaders.indexOf(header);
        if (correctPosition > -1) {
          // it exists, just positioned wrong
          errors.push(
            `EXCESS HEADER FOUND: Found ${header}. (This header is valid, however it is positioned incorrectly)`
          );
        } else {
          errors.push(
            `EXCESS HEADER FOUND: Found ${header}. (This header is invalid regardless of its position)`
          );
        }
      }
    });
  }

  console.log(errors);

  return errors;
}

export function parseRawMonth(month) {
  const parsedMonth = parseInt(month, 10);

  if (parsedMonth < 0 || parsedMonth > 12) {
    return "INVALID";
  } else if (parsedMonth < 10) {
    return `0${parsedMonth}`;
  } else {
    return `${parsedMonth}`;
  }
}

export function checkAdvancedSelect(query) {
  let errors = [];

  // implement checks

  return errors;
}

/*
    FUNCTION RETURN STRUCTURE

    return_value = {
        errs: [{lineNumber (integer), error_message (string message)}]
    }

    GENERAL CHECKS:
    1). check correct capitalization

    SPECIFIC CHECKS:
    1). check valid specimen-specific data (i.e. valid family, genus, etc)
    2).

    If the error isn't automatically correctable by software, the entire entry will be skipped and
    the error will be added to the return log of errors. If it can be correct, it will be corrected
    treated as otherwise normal.
*/

export function checkManualEntry(specimen) {
  // corrections: fields that just need a small change but are otherwise valid
  let corrections = [];

  // errors: fields that are invalid and will result in a displayed error to the user
  let errors = [];

  // implement checks

  let ret = {
    corrections: corrections,
    errors: errors,
  };

  return ret;
}

export function checkEntryControlFields(/* fields to check */) {}

function setCharAt(str, index, char) {
  if (index > str.length - 1) return str;

  return str.substr(0, index) + char + str.substr(index + 1);
}

export function checkFirstCapitalized(field, upperFirst) {
  if (field === "" || field === undefined) {
    return field;
  } else {
    let newField = field;
    if (upperFirst) {
      if (newField[0] !== newField[0].toUpperCase()) {
        newField = setCharAt(newField, 0, newField[0].toUpperCase());
      }

      return newField;
    } else {
      if (newField[0] !== newField[0].toLowerCase()) {
        newField = setCharAt(newField, 0, newField[0].toLowerCase());
      }

      return newField;
    }
  }
}

export function checkRandomCaps(field, upperFirst) {
  if (field === "") {
    return "";
  }

  let correctField = "";
  let words = [];
  if (field.indexOf(" ") < 0 && field.indexOf("-") > -1) {
    words = field.split("-");
  } else {
    words = field.split(" ");
  }

  for (let j = 0; j < words.length; j++) {
    let newWord = checkFirstCapitalized(words[j], upperFirst);

    for (let i = 0; i < newWord.length; i++) {
      if (i > 0) {
        if (newWord[i] !== newWord[i].toLowerCase())
          newWord = setCharAt(newWord, i, newWord[i].toLowerCase());
      }
    }

    words[j] = newWord;
  }

  correctField = words
    .map((word) => {
      return word;
    })
    .join(" ");

  return correctField;
}

const isNumeric = (n) => {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

export function parseDate(date) {
  if (date === "") {
    return date;
  }

  var dd = String(date.getDate()).padStart(2, "0");
  var mm = String(date.getMonth() + 1).padStart(2, "0");
  var yyyy = date.getFullYear();

  return yyyy + "-" + mm + "-" + dd;
}

export const parseMeasurement = (measurement) => {
  // comes in like 30 meters
  // empty would look like " "

  let numValue = NaN;

  if (measurement === " " || measurement.split(" ")[0] === "") {
    return "";
  } else {
    if (
      measurement.toLowerCase().endsWith(" meters") ||
      measurement.toLowerCase().endsWith(" meter")
    ) {
      console.log(measurement);

      console.log(parseFloat(measurement.split(" ")[0]));

      numValue = parseFloat(measurement.split(" ")[0]);
    } else if (measurement.toLowerCase().endsWith(" feet")) {
      let feetToMeters = parseFloat(measurement.split(" ")[0]);
      feetToMeters = feetToMeters * 0.3048;
      numValue = feetToMeters;
    } else if (
      measurement.toLowerCase().endsWith(" miles") ||
      measurement.toLowerCase().endsWith(" mile")
    ) {
      let milesToMeters = parseFloat(measurement.split(" ")[0]);
      milesToMeters = milesToMeters * 1609.34;
      numValue = milesToMeters;
    } else if (isNumeric(measurement)) {
      // missing unit
      return "INVALID ENTRY: No unit specified.";
    } else {
      return "INVALID ENTRY: Unknown entry type.";
    }

    if (isNaN(numValue)) {
      return "INVALID ENTRY: Entry resulted in NaN value.";
    } else {
      return numValue;
    }
  }
};

const controlHasString = (control, value) => {
  let options = control.map((option) => {
    return option.value;
  });

  if (options.includes(value)) {
    return true;
  } else return false;
};

const includesPunctuation = (field) => {
  if (
    field.includes("'") ||
    field.includes(".") ||
    field.includes('"') ||
    field.includes(",")
  ) {
    return true;
  } else return false;
};

const isFutureDate = (date) => {
  let now = new Date();

  // date is in the future (move this to prechecks)
  if (date > now) {
    return true;
  }

  return false;
};

export const capsChecks = (fieldName, fieldValue, upperFirst) => {
  let errors = [];
  let capsSingle = upperFirst
    ? "First letter should be capitalized."
    : "First letter should be lowercase.";

  let capsMultiple = upperFirst
    ? "Be sure to capitalize the first letter in each word."
    : "Be sure the first letter in each word is lowercase.";

  let correctValue = checkRandomCaps(fieldValue, upperFirst);
  if (fieldValue === "") {
    return errors;
  }

  if (upperFirst) {
    if (fieldValue[0] !== fieldValue[0].toUpperCase()) {
      errors.push(`Format error (@ ${fieldName}): ${capsSingle}`);
    }
  } else {
    if (fieldValue[0] !== fieldValue[0].toLowerCase()) {
      errors.push(`Format error (@ ${fieldName}): ${capsSingle}`);
    }
  }

  if (correctValue !== fieldValue) {
    // let randomError = true;
    let arr = [];
    if (fieldValue.indexOf(" ") < 0 && fieldValue.indexOf("-") > -1) {
      arr = fieldValue.split("-");
    } else {
      arr = fieldValue.split(" ");
    }
    if (arr.length > 1) {
      for (let i = 1; i < arr.length; i++) {
        arr[i].split("").forEach((letter, index) => {
          if (index === 0 && upperFirst && letter.toUpperCase() !== arr[i][0]) {
            errors.push(`Format error (@ ${fieldName}): ${capsMultiple}`);
          } else if (
            index === 0 &&
            !upperFirst &&
            letter.toLowerCase() !== arr[i][0]
          ) {
            errors.push(`Format error (@ ${fieldName}): ${capsMultiple}`);
          } else if (index !== 0) {
            console.log(`${letter.toLowerCase()} vs ${letter}`);
            if (letter.toLowerCase() !== arr[i][index]) {
              errors.push(
                `Format error (@ ${fieldName}): Random capitalization detected.`
              );
            }
          }
        });
      }
    } else {
      // only check for random here
      fieldValue.split("").forEach((letter, index) => {
        if (index !== 0) {
          if (letter.toLowerCase() !== letter) {
            errors.push(
              `Format error (@ ${fieldName}): Random capitalization detected.`
            );
          }
        }
      });
    }
  }

  return errors;
};

export function checkField(fieldName, fieldValue) {
  let errors = [];
  switch (fieldName) {
    case "databaseTable":
      if (fieldValue === "") {
        errors.push(`Query error (@ ${fieldName}): Must select a table.`);
      }
      return errors;
    case "catalogNumber":
      if (fieldValue === "") {
        return errors;
      }

      if (fieldValue.indexOf("MGCL_") < 0) {
        errors.push(
          `Format error (@ ${fieldName}): ${fieldName} must start with 'MGCL_', followed by 6-8 digits.`
        );
        //return errors
      }

      if (fieldValue.indexOf("_") > -1) {
        if (
          fieldValue.split("_")[1].length < 6 ||
          fieldValue.split("_")[1].length > 8
        ) {
          errors.push(
            `Format error (@ ${fieldName}): MGCL_ must be followed by 6-8 digits.`
          );
        }

        if (!isNumeric(fieldValue.split("_")[1])) {
          let inValidDigs = fieldValue.split("_")[1];
          errors.push(
            `Format error (@ ${fieldName}): Expected digits, found ${inValidDigs}.`
          );
        }
      }

      if (includesPunctuation(fieldValue)) {
        errors.push(
          `Format error (@ ${fieldName}): Remove punctuation from catalogNumber.`
        );
      }

      return errors;

    case "otherCatalogNumber":
      if (fieldValue === "") {
        return errors;
      }

      if (fieldValue.indexOf("LEP") < 0) {
        errors.push(
          `Format error (@ ${fieldName}): ${fieldName} must start with 'LEP', followed by 5-8 digits.`
        );
      }

      if (
        fieldValue.indexOf("LEP") > -1 &&
        fieldValue.split("LEP").length < 2
      ) {
        errors.push(
          `Format error (@ ${fieldName}): LEP must be followed by 5-8 digits.`
        );
      }

      if (
        fieldValue.indexOf("LEP") > -1 &&
        fieldValue.split("LEP").length === 2
      ) {
        if (
          fieldValue.split("LEP")[1].length < 5 ||
          fieldValue.split("LEP")[1].length > 8
        ) {
          errors.push(
            `Format error (@ ${fieldName}): LEP must be followed by 5-8 digits.`
          );
        }

        if (!isNumeric(fieldValue.split("LEP")[1])) {
          let inValidDigs = fieldValue.split("-")[1];
          errors.push(
            `Format error (@ ${fieldName}): Expected digits, found ${inValidDigs}.`
          );
        }
      }

      if (includesPunctuation(fieldValue)) {
        errors.push(
          `Format error (@ ${fieldName}): Remove punctuation from recordNumber.`
        );
      }

      return errors;

    case "order_":
    case "superfamily":
    case "family":
    case "subfamily":
    case "tribe":
    case "genus":
    case "subgenus":
      if (fieldValue === "" || !fieldValue) return errors;

      errors = errors.concat(capsChecks(fieldName, fieldValue, true));
      return errors;

    case "specificEpithet":
    case "infraspecificEpithet":
      if (fieldValue === "" || !fieldValue) return errors;
      errors = errors.concat(capsChecks(fieldName, fieldValue, false));
      return errors;

    case "identificationQualifier":
      if (fieldValue === "") {
        return errors;
      }

      errors = errors.concat(capsChecks(fieldName, fieldValue, false));

      if (includesPunctuation(fieldValue)) {
        errors.push(
          `Format error (@ ${fieldName}): Remove punctuation from ${fieldName}.`
        );
      }

      if (!controlHasString(identificationQualifierControl, fieldValue)) {
        errors.push(
          `Control error (@ ${fieldName}): ${fieldValue} is not one of the accepted inputs.`
        );
      }

      return errors;

    case "otherCollectors":
      if (fieldValue === "") return errors;

      const parsedNames = fieldValue.split(" ");

      // more than one person
      if (parsedNames.length > 1) {
        // check each name
        parsedNames.forEach((name) => {
          if (name.split(",").length < 2) {
            // invalid format
          } else {
            const firstName = name.split(",")[1];
            const lastName = name.split(",")[0];

            // add check for names
          }
        });
      } else {
        // check fieldValue for correct name
        // TODO:
      }

      return errors;

    case "recordedBy":
    case "identifiedBy":
      if (fieldValue === "" || fieldValue === ",") {
        return errors;
      }

      let parsedName = fieldValue.split(",");

      if (parsedName.length !== 2) {
        errors.push(`Format error (@ ${fieldName}): Invalid formatting.`);
      } else if (parsedName[0] !== "" && parsedName[1] !== "") {
        // check last name
        if (parsedName[0][0] !== parsedName[0][0].toUpperCase()) {
          errors.push(`Format error (@ ${fieldName}): Capitalize last name.`);
        }
        if (parsedName[1][0] !== parsedName[1][0].toUpperCase()) {
          errors.push(`Format error (@ ${fieldName}): Capitalize first name.`);
        }
      } else {
        errors.push(`Format error (@ ${fieldName}): Must provide both names.`);
      }
      return errors;

    case "dateIdentified":
      if (fieldValue === "") {
        return errors;
      }

      if (isFutureDate(fieldValue)) {
        errors.push(
          `Date error (@ ${fieldName}): Cannot select date in future.`
        );
      }

      return errors;

    // TODO: add error check
    case "verbatimDate":
      return errors;

    case "collectedYear":
      if (fieldValue == "") return errors;

      if (!isNumeric(fieldValue)) {
        errors.push(
          `Format error (@ ${fieldName}): Non-numeric values detected.`
        );
      }

      if (fieldValue.length !== 4) {
        errors.push(`Format error (@ ${fieldName}): Year should be YYYY.`);
      }

      const currentYear = new Date().getFullYear();
      if (parseInt(fieldValue, 10) > currentYear) {
        errors.push(`Date error (@ ${fieldName}): Year is in future.`);
      }

      return errors;

    case "collectedMonth":
      if (fieldValue === "") {
        return errors;
      }

      if (!isNumeric(fieldValue)) {
        errors.push(
          `Format error (@ ${fieldName}): Non-numeric values detected.`
        );
      }

      const parsedMonth = parseRawMonth(fieldValue);

      if (parsedMonth === "INVALID") {
        errors.push(
          `Format error (@ ${fieldName}): ${fieldValue} is an invalid month.`
        );
      }

      // if (fieldValue.length !== 2) {
      //   errors.push(`Format error (@ ${fieldName}): Month should be MM.`);
      // }

      return errors;

    case "collectedDay":
      if (fieldValue === "") {
        return errors;
      }

      if (!isNumeric(fieldValue)) {
        errors.push(
          `Format error (@ ${fieldName}): Non-numeric values detected.`
        );
      }

      if (fieldValue.length !== 2) {
        errors.push(`Format error (@ ${fieldName}): Month should be MM.`);
      }

      if (parseInt(fieldValue, 10) < 0 || parseInt(fieldValue, 10) > 31) {
        errors.push(
          `Format error (@ ${fieldName}): ${fieldValue} is an invalid day.`
        );
      }

      return errors;

    case "sex":
      if (fieldValue === "") {
        return errors;
      }

      if (!controlHasString(sexControl, fieldValue)) {
        errors.push(
          `Control error (@ ${fieldName}): ${fieldValue} is not one of the accepted inputs.`
        );
      }

      return errors;

    case "preparations":
      // if (fieldValue === 'Genetic Resources') {
      //   return {content: 'Warning: See Specify GRR for disposition.'}
      // }
      if (fieldValue === "") {
        return errors;
      }

      if (!controlHasString(preparationsControl, fieldValue)) {
        errors.push(
          `Control error (@ ${fieldName}): ${fieldValue} is not one of the accepted inputs.`
        );
      }

      return errors;

    case "lifeStage":
      if (fieldValue === "") {
        return errors;
      }

      if (!controlHasString(lifeStageControl, fieldValue)) {
        errors.push(
          `Control error (@ ${fieldName}): ${fieldValue} is not one of the accepted inputs.`
        );
      }

      return errors;

    case "samplingProtocol":
      if (fieldValue === "") {
        return errors;
      }

      if (!controlHasString(samplingProtocolControl, fieldValue)) {
        errors.push(
          `Control error (@ ${fieldName}): ${fieldValue} is not one of the accepted inputs.`
        );
      }

      return errors;

    case "country":
      if (fieldValue === "") {
        return errors;
      }

      if (!controlHasString(countryControl, fieldValue)) {
        errors.push(
          `Control error (@ ${fieldName}): ${fieldValue} is not one of the accepted inputs.`
        );
      }

      return errors;

    case "stateProvince":
    case "county":
    case "municipality":
    case "locality":
      if (fieldValue === "") {
        return errors;
      }

      if (fieldValue[0].toUpperCase() !== fieldValue[0]) {
        errors.push(
          `Format error (@ ${fieldName}): Capitalize the first letter.`
        );
      }

      // errors = errors.concat(capsChecks(fieldName, fieldValue, true));
      return errors;

    case "elevationInMetersUPDATE":
      if (fieldValue === "") {
        return errors;
      }

      if (!isNumeric(fieldValue)) {
        errors.push(
          `Format error (@${fieldName}): Elevation must only contain digits`
        );
      }

      return errors;

    case "elevationInMeters":
      if (fieldValue === " ") {
        return errors;
      }

      // alert(typeof(fieldValue))

      if (typeof fieldValue === "string") {
        if (fieldValue.indexOf("INVALID") > -1) {
          let invalidError = fieldValue.split(": ")[1];
          switch (invalidError) {
            case "No unit specified.":
              errors.push(`Format error (@ ${fieldName}): must specify unit.`);
              break;
            default:
              errors.push(`Format error (@ ${fieldName}): invalid format.`);
              break;
          }
          // errors.push(``)
        }
      } else {
      }

      // ADD CONVERSIONS LATER
      return errors;

    case "decimalLatitude":
      const parsedLat = parseFloat(fieldValue);
      if (fieldValue === "") {
        return errors;
      }

      if (!isNumeric(fieldValue)) {
        errors.push(
          `Number error (@ ${fieldName}): detected non-numeric values.`
        );
      }

      if (parsedLat !== NaN) {
        if (parsedLat < -90 || parsedLat > 90) {
          errors.push(
            `Number error (@ ${fieldName}): ${fieldValue} out of range (+- 90).`
          );
        }
      } else {
        errors.push(
          `Number error (@ ${fieldName}): detected non-numeric values.`
        );
      }

      return errors;

    case "decimalLongitude":
      const parsed = parseFloat(fieldValue);
      if (fieldValue === "") {
        return errors;
      }

      if (!isNumeric(fieldValue)) {
        errors.push(
          `Number error (@ ${fieldName}): detected non-numeric values.`
        );
      }

      if (parsed !== NaN) {
        if (parsed < -180 || parsed > 180) {
          errors.push(
            `Number error (@ ${fieldName}): ${fieldValue} out of range (+- 180).`
          );
        }
      } else {
        errors.push(
          `Number error (@ ${fieldName}): detected non-numeric values.`
        );
      }

      return errors;

    case "geodeticDatum":
      if (fieldValue === "") {
        return errors;
      }

      if (!controlHasString(geodeticDatumControl, fieldValue)) {
        errors.push(
          `Control error (@ ${fieldName}): ${fieldValue} is not one of the accepted inputs.`
        );
      }

      return errors;

    case "coordinateUncertainty":
      if (fieldValue === "") {
        return errors;
      }

      // TODO: ADD CONVERSION

      if (!isNumeric(fieldValue)) {
        errors.push(
          `Number error (@ ${fieldName}): detected non-numeric values.`
        );
      }

      return errors;

    // verbatimLat

    // verbatimLong

    case "georeferencedBy":
      if (fieldValue === "") {
        return errors;
      }

      // check name for caps

      return errors;

    case "disposition":
      if (fieldValue === "") {
        return errors;
      }

      if (!controlHasString(dispositionControl, fieldValue)) {
        errors.push(
          `Control error (@ ${fieldName}): ${fieldValue} is not one of the accepted inputs.`
        );
      }

      return errors;

    // loanInfo
    // TODO: add all loan related checks
    case "isLoaned":
      if (fieldValue === "") {
        return errors;
      }

      if (!controlHasString(yesOrNo, fieldValue)) {
        errors.push(
          `Control error (@ ${fieldName}): ${fieldValue} is not one of the accepted inputs.`
        );
      }

      return errors;

    case "loanInstitution":
    case "loaneeName":
    case "loanDate":
    case "loanReturnDate":
      return errors;

    // freezer
    case "freezer":
      if (fieldValue === "") {
        return errors;
      }

      if (!fieldValue.startsWith("Kawahara")) {
        errors.push(`Format error (@ ${fieldName}): Must start with Kawahara`);
      } else {
        let words = fieldValue.split(" ");
        if (words.length > 1) {
          errors.push(
            `Format error (@${fieldName}): Remove spaces/punctuation.`
          );
        }

        let digs = fieldValue.replace("Kawahara", "");
        if (digs === "") {
          errors.push(`Format error (@ ${fieldName}): Missing freezer number.`);
        } else {
          // let digs = parts[1]
          if (!isNumeric(digs)) {
            errors.push(
              `Number error (@ ${fieldName}): Detected non-numeric values.`
            );
          }
          if (digs.length > 2) {
            errors.push(
              `Format error (@ ${fieldName}): Number must only be 2 digits.`
            );
          }
        }
      }

      return errors;

    // rack
    case "rack":
      if (fieldValue === "") {
        return errors;
      }

      if (fieldValue.length > 3) {
        errors.push(
          `Format error (@ ${fieldName}): Must be 1-3 characters long.`
        );
      }

      if (includesPunctuation(fieldValue)) {
        errors.push(`Format error (@ ${fieldName}): Remove punctuation.`);
      }

      return errors;

    // box
    case "box":
      if (fieldValue === "") {
        return errors;
      }

      if (!isNumeric(fieldValue)) {
        errors.push(
          `Number error (@ ${fieldName}): Detected non-numeric values.`
        );
      } else {
        let value = parseFloat(fieldValue);
        if (value < 1 || value > 20) {
          errors.push(`Number error (@ ${fieldName}): Must be from 1-20 only.`);
        }
      }

      return errors;

    case "tubeSize":
      if (fieldValue === "") {
        return errors;
      }

      if (!controlHasString(tubeSizeControl, fieldValue)) {
        errors.push(
          `Control error (@ ${fieldName}): ${fieldValue} is not one of the accepted inputs.`
        );
      }

      return errors;

    case "withholdData":
    case "reared":
      if (fieldValue === "") {
        return errors;
      }

      if (!controlHasString(yesOrNo, fieldValue)) {
        errors.push(
          `Control error (@ ${fieldName}): ${fieldValue} is not one of the accepted inputs.`
        );
      }

      return errors;

    // collectors

    // NON-HEADER ERROR CHECKS !!!!

    case "updateReason":
      if (fieldValue === "") {
        errors.push(`Query error (@ ${fieldValue}): You must provide a reason`);
      }

      if (fieldValue.length < 5) {
        errors.push(`Query error (@ ${fieldValue}): Reason is too short`);
      }

      return errors;

    default:
      return errors;
  }
}

export function checkSpecimen(specimen) {
  // check EVERY field using checkfield
  let errors = [];
  for (let field of Object.keys(specimen)) {
    let fieldErrors = checkField(field, specimen[field]);
    if (fieldErrors.length > 0) {
      errors = errors.concat(fieldErrors);
    }
  }
  return errors;
}
