
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

function checkHeaders(headers) {
    let ret = true
    if (correctHeaders.length === headers.length) {
        headers.forEach((header, index) => {
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

export default checkHeaders