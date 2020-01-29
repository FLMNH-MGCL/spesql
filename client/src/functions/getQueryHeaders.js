function getQueryHeaders(specimen) {
    if (specimen === undefined) {
        return []
    }
    // test for ideal headers first
    let ret = ['Lep #', 'Superfamily', 'Family', 'Genus', 'Species', 'Country', 'Rack #']
    if (
        specimen.id && specimen.lep_num && specimen.superfamily && specimen.family &&
        specimen.genus && specimen.species && specimen.country && specimen.rack
    ) {
        return ret
    }

    else {
        ret = []
        let count = 0

        if (count < 8 && specimen.mgcl_num) {
            ret.push('MGCL #')
            count += 1
        }
        if (count < 8 && specimen.lep_num) {
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
        if (count < 8 && specimen.section) {
            ret.push('Section')
            count += 1
        }
        if (count < 8 && specimen.genus) {
            ret.push('Genus')
            count += 1
        }
        if (count < 8 && specimen.species) {
            ret.push('Species')
            count += 1
        }
        if (count < 8 && specimen.subspecies) {
            ret.push('Subspecies')
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
        if (count < 8 && specimen.province) {
            ret.push('Province')
            count += 1
        }
        if (count < 8 && specimen.locality) {
            ret.push('Locality')
            count += 1
        }
        if (count < 8 && specimen.latitude) {
            ret.push('Latitude')
            count += 1
        }
        if (count < 8 && specimen.longitude) {
            ret.push('Longitude')
            count += 1
        }
        if (count < 8 && specimen.elevation) {
            ret.push('Elevation')
            count += 1
        }
        if (count < 8 && specimen.mv_lamp) {
            ret.push('MV Lamp')
            count += 1
        }
        if (count < 8 && specimen.days) {
            ret.push('Days')
            count += 1
        }
        if (count < 8 && specimen.month) {
            ret.push('Month')
            count += 1
        }
        if (count < 8 && specimen.year) {
            ret.push('Year')
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
        if (count < 8 && specimen.note) {
            ret.push('Note')
            count += 1
        }


        return ret
    }
}

export default getQueryHeaders