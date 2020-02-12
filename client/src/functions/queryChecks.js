
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
    if (headers === undefined) {
        return false
    } 

    let ret = true
    if (correctHeaders.length === headers.length) {
        headers.forEach((header, index) => {
            console.log(`${header.toLowerCase()} vs ${correctHeaders[index].toLowerCase()}`)
            if (header.toLowerCase() !== correctHeaders[index].toLowerCase()) {
                ret = false
            }
        });
    }
    else {
        ret = false
    }

    return ret

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