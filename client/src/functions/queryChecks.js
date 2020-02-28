const correctHeaders = [
  "catalogNumber",
  "recordNumber",
  "otherRecordNumber",
  "order_",
  "superfamily",
  "family",
  "subfamily",
  "tribe",
  "genus",
  "subgenus",
  "specificEpithet",
  "infraspecificEpithet",
  "identificationQualifier",
  "recordedBy",
  "identifiedBy",
  "dateIdentified",
  "sex",
  "lifeStage",
  "habitat",
  "occurrenceRemarks",
  "molecularOccurrenceRemarks",
  "samplingProtocol",
  "country",
  "stateProvince",
  "county",
  "municipality",
  "locality",
  "verbatimElevation",
  "decimalLatitude",
  "decimalLongitude",
  "geodeticDatum",
  "coordinateUncertainty",
  "verbatimLatitude",
  "verbatimLongitude",
  "georeferencedBy",
  "disposition",
  "loanInfo",
  "preparations",
  "freezer",
  "rack",
  "box",
  "tubeSize",
  "associatedSequences",
  "associatedReferences",
  "withholdData",
  "reared",
  "fieldNotes",
  "collectors"
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
    errors: errors
  };

  return ret;
}

export function checkEntryControlFields(/* fields to check */) {}

function setCharAt(str, index, char) {
  if (index > str.length - 1) return str

  return str.substr(0, index) + char + str.substr(index + 1)
}

export function checkFirstCapitalized(field) {
  if (field === "" || field === undefined) {
    return field;
  }

  else {
    let newField = field
    if (newField[0] !== newField[0].toUpperCase()) {
      newField = setCharAt(newField, 0, newField[0].toUpperCase())
    }

    return newField
  }
}

export function checkRandomCaps(field) {
  if (field === '') {
    return ''
  }

  let correctField = ''
  let words = field.split(' ')

  console.log(words)

  for (let j = 0; j < words.length; j++) {
    let newWord = checkFirstCapitalized(words[j])

    for (let i = 0; i < newWord.length; i++) {
      if (i > 0) {
        if (newWord[i] !== newWord[i].toLowerCase())
          newWord = setCharAt(newWord, i, newWord[i].toLowerCase())
      }
    }

    words[j] = newWord
  }

  correctField = words.map(word => {
    return word
  }).join(' ')

  return correctField


}
