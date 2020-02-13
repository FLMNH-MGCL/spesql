
const correctHeaders = [
    "catalogNumber",
    "recordNumber",
    "order_",
    "superfamily",
    "family",
    "subfamily",
    "tribe",
    "genus",
    "subgenus",	
    "specificEpithet",	
    "identificationQualifier",	//
    "recordedBy", //
    "identifiedBy", //
    "dateIdentified", //
    "sex",
    "lifeStage", //
    "habitat", //
    "occurrenceRemarks", //
    "country", 
    "stateProvince",
    "county", //
    "municipality", //
    "locality", 
    "verbatimElevation",
    "decimalLatitude", //
    "decimalLongitude", //
    "geodeticDatum", //
    "coordinateUncertainty", //
    "verbatimLatitude",
    "verbatimLongitude",
    "loanInfo",
    "preparations",
    "freezer",
    "rack",
    "box",
    "tubeSize",
    "collectors"								
]

export function checkHeaders(headers) {
    let errors = []
    if (headers === undefined) {
        return errors
    } 

    if (correctHeaders.length === headers.length) {
        headers.forEach((header, index) => {
            // console.log(`${header.toLowerCase()} vs ${correctHeaders[index].toLowerCase()}`)
            if (header.toLowerCase() !== correctHeaders[index].toLowerCase()) {
                errors.push(`INVALID COLUMN HEADER: Expected ${correctHeaders[index]}, Recieved ${header}`)
            }
        });
    }

    else if (headers.length < correctHeaders.length) {
        errors.push(`Detected missing headers: Expected ${correctHeaders.length}, Recieved ${headers.length}`)

        // check for correctness in the headers that exist:
        correctHeaders.forEach((header, index) => {
            if (index < headers.length) {
                if (header.toLowerCase() !== headers[index].toLowerCase()) {
                    errors.push(`INVALID COLUMN HEADER: Expected ${header}, Recieved ${headers[index]}`)
                }
            }
            else {
                errors.push(`INVALID COLUMN HEADER: Expected ${header}, Recieved ''`)
            }
        })
    }

    else if (headers.length > correctHeaders.length) {
        errors.push(`Detected too many headers: Expected ${correctHeaders.length}, Recieved ${headers.length}`)

        headers.forEach((header, index) => {
            if (index < correctHeaders.length) {
                if (header.toLowerCase() !== correctHeaders[index].toLowerCase()) {
                    errors.push(`INVALID COLUMN HEADER: Expected ${correctHeaders[index]}, Recieved ${header}`)
                }
            }
            else {
                let correctPosition = correctHeaders.indexOf(header)
                if (correctPosition > -1) {
                    // it exists, just positioned wrong
                    errors.push(`EXCESS HEADER FOUND: Found ${header}. (This header is valid, however it is positioned incorrectly)`)
                }
                else {
                    errors.push(`EXCESS HEADER FOUND: Found ${header}. (This header is invalid regardless of its position)`)
                }
            }
        })
    }

    console.log(errors)

    return errors

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

export function checkEntry(lineNumber, specimen) {
    let ret = {
        errs: [],
    }

    // implement checks

    return ret
}