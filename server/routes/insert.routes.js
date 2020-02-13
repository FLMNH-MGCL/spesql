const mysql = require('mysql')

let insertPrefix = 'INSERT INTO molecularLab(catalogNumber, recordNumber, order_, superfamily, family, \
    subfamily, tribe, genus, subgenus, specificEpithet, identificationQualifier, recordedBy, identifiedBy, \
    dateIdentified, sex, lifeStage, habitat, occurrenceRemarks, country, stateProvince, county, municipality, locality, \
    verbatimElevation, decimalLatitude, decimalLongitude, geodeticDatum, coordinateUncertainty, verbatimLatitude, verbatimLongitude, \
    loanInfo, preparations, freezer, rack, box, tubeSize, collectors, modifiedInfo)'

module.exports = function(connection, app) {
    app.post('/api/insert', function(req, res) {
        let specimen = req.body
        // let command = `INSERT INTO specimen(id,superfamily,family,genus,species,locality,date_collected,rack) VALUES ('${specimen.id}', '${specimen.superfamily}', '${specimen.family}',' ${specimen.genus}', '${specimen.species}', '${specimen.locality}', '${specimen.date_collected}', '${specimen.rack}');`
        let command = `${insertPrefix} VALUES ("${specimen.catalogNumber}", "${specimen.recordNumber}", "${specimen.order_}", "${specimen.superfamily}", "${specimen.family}", "${specimen.subfamily}", "${specimen.tribe}", "${specimen.genus}", "${specimen.subgenus}", "${specimen.specificEpithet}", "${specimen.identificationQualifier}", "${specimen.recordedBy}", "${specimen.identifiedBy}", "${specimen.dateIdentified}", "${specimen.sex}", "${specimen.lifeStage}", "${specimen.habitat}", "${specimen.occurrenceRemarks}", "${specimen.country}", "${specimen.stateProvince}", "${specimen.county}",  "${specimen.municipality}", "${specimen.locality}", "${specimen.verbatimElevation}", "${specimen.decimalLatitude}", "${specimen.decimalLongitude}", "${specimen.geodeticDatum}", "${specimen.coordinateUncertainty}", "${specimen.verbatimLatitude}", "${specimen.verbatimLongitude}", "${specimen.loanInfo}", "${specimen.preparations}", "${specimen.freezer}", "${specimen.rack}", "${specimen.box}", "${specimen.tubeSize}", "${specimen.collectors}", "${specimen.modifiedInfo}");`
        // console.log(command)
        connection.query(command, (err, data) => {
            if (err) {
                console.log('Insertion Failure. Error logged.')
                // console.log(err)
                res.json({
                        success: false,
                        data: err
                    })
            }
            else {
                // console.log("Inserted Row(s):", data.affectedRows);
                console.log('Sucess!')
                res.json({
                    success: true,
                    data: data
                })
            }

        }) 
    })
}

// https://stackoverflow.com/questions/8899802/how-do-i-do-a-bulk-insert-in-mysql-using-node-js