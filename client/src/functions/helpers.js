export function getQueryHeaders(specimen) {
    if (specimen === undefined) {
        return []
    }
    // test for ideal headers first
    let ret = ['Lep #', 'Superfamily', 'Family', 'Genus', 'Species', 'Country', 'Freezer']
    if (
        specimen.id && specimen.recordNumber && specimen.superfamily && specimen.family &&
        specimen.genus && specimen.specificEpithet && specimen.country && specimen.freezer
    ) {
        return ret
    }

    else {
        ret = []
        let count = 0

        if (count < 8 && specimen.catalogNumber) {
            ret.push('MGCL #')
            count += 1
        }
        if (count < 8 && specimen.recordNumber) {
            ret.push('LEP #')
            count += 1
        }
        if (count < 8 && specimen.order_) {
            ret.push('Order')
            count += 1
        }
        if (count < 8 && specimen.superfamily) {
            ret.push('Superfamily')
            count += 1
        }
        if (count < 8 && specimen.family) {
            ret.push('Family')
            count += 1
        }
        if (count < 8 && specimen.subfamily) {
            ret.push('Subfamily')
            count += 1
        }
        if (count < 8 && specimen.tribe) {
            ret.push('Tribe')
            count += 1
        }
        if (count < 8 && specimen.genus) {
            ret.push('Genus')
            count += 1
        }
        if (count < 8 && specimen.subgenus) {
            ret.push('Subgenus')
            count += 1
        }
        if (count < 8 && specimen.specificEpithet) {
            ret.push('Species')
            count += 1
        }
        if (count < 8 && specimen.sex) {
            ret.push('Sex')
            count += 1
        }
        if (count < 8 && specimen.country) {
            ret.push('Country')
            count += 1
        }
        if (count < 8 && specimen.stateProvince) {
            ret.push('Province')
            count += 1
        }
        if (count < 8 && specimen.locality) {
            ret.push('Locality')
            count += 1
        }
        if (count < 8 && specimen.verbatimLatitude) {
            ret.push('Latitude')
            count += 1
        }
        if (count < 8 && specimen.verbatimLongitude) {
            ret.push('Longitude')
            count += 1
        }
        if (count < 8 && specimen.verbatimElevation) {
            ret.push('Elevation')
            count += 1
        }
        if (count < 8 && specimen.collectors) {
            ret.push('Collector(s)')
            count += 1
        }
        if (count < 8 && specimen.freezer) {
            ret.push('Freezer')
            count += 1
        }
        if (count < 8 && specimen.rack) {
            ret.push('Rack #')
            count += 1
        }
        if (count < 8 && specimen.box) {
            ret.push('Box')
            count += 1
        }
        if (count < 8 && specimen.size) {
            ret.push('Size')
            count += 1
        }


        return ret
    }
}