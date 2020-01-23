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
    'NOTE',
]

function checkHeaders(headers) {
    let ret = true
    if (correct_headers.length === headers.length) {
        headers.forEach((header, index) => {
            if (header.toLowerCase() !== correct_headers[index].toLowerCase()) {
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