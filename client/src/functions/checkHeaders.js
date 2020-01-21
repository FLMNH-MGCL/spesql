const correct_headers = [
    'MGCL',
    'LEP #',
    'ORDER',
    'SUPERFAMILY',
    'FAMILY',
    'SUBFAMILY',
    'TRIBE',
    'SECTION',
    'GENUS',
    'SPECIES',
    'SUB-SPECIES',
    'SEX',
    'COUNTRY',
    'PROVINCE',
    'LOCALITY',
    'Latitude',
    'Longitude',
    'ELEVATION',
    'MV',
    'DAYS',
    'MONTH',
    'YEAR',
    'COLLECTORS',
    'FREEZER',
    'RACK',
    'BOX',
    'SIZE',
    'Note',
]

function checkHeaders(headers) {
    if (correct_headers.length === headers.length) {
        return (JSON.stringify(headers, (a, b) => {
            return typeof b === "string" ? b.toUpperCase() : b
        }) == JSON.stringify(correct_headers))
    }
    else return false

}

export default checkHeaders