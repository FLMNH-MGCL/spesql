const mysql = require("mysql");

module.exports = function (connection, app) {
  app.post("/api/insert", function (req, res) {
    let { specimen } = req.body;
    let { table } = req.body;

    // console.log(req);

    const decimalLongitude = specimen.decimalLongitude
      ? specimen.decimalLongitude
      : "NULL";
    const decimalLatitude = specimen.decimalLatitude
      ? specimen.decimalLatitude
      : "NULL";

    let insertPrefix =
      `INSERT INTO ${table}(catalogNumber, otherCatalogNumber, recordNumber, order_, superfamily, family, ` +
      "subfamily, tribe, genus, subgenus, specificEpithet, identificationQualifier, recordedBy, otherCollectors, identifiedBy, " +
      "dateIdentified, verbatimDate, collectedYear, collectedMonth, collectedDay, sex, lifeStage, habitat, occurrenceRemarks, molecularOccurrenceRemarks, samplingProtocol, country, stateProvince, county, municipality, locality, " +
      "elevationInMeters, decimalLatitude, decimalLongitude, geodeticDatum, coordinateUncertainty, verbatimLatitude, verbatimLongitude, " +
      "georeferencedBy, disposition, isLoaned, loanInstitution, loaneeName, loanDate, loanReturnDate, preparations, freezer, rack, box, tubeSize, associatedSequences, associatedReferences, withholdData, reared, fieldNotes, modifiedInfo)";
    // let command = `INSERT INTO specimen(id,superfamily,family,genus,species,locality,date_collected,rack) VALUES ('${specimen.id}', '${specimen.superfamily}', '${specimen.family}',' ${specimen.genus}', '${specimen.species}', '${specimen.locality}', '${specimen.date_collected}', '${specimen.rack}');`
    let command =
      `${insertPrefix} VALUES ("${specimen.catalogNumber}", "${specimen.otherCatalogNumber}" ,"${specimen.recordNumber}", ` +
      `"${specimen.order_}", "${specimen.superfamily}", "${specimen.family}", "${specimen.subfamily}", "${specimen.tribe}", "${specimen.genus}", "${specimen.subgenus}", ` +
      `"${specimen.specificEpithet}", "${specimen.identificationQualifier}", "${specimen.recordedBy}", "${specimen.otherCollectors}", "${specimen.identifiedBy}", ` +
      `"${specimen.dateIdentified}", "${specimen.verbatimDate}", "${specimen.collectedYear}", "${specimen.collectedMonth}", "${specimen.collectedDay}", ` +
      `"${specimen.sex}", "${specimen.lifeStage}", "${specimen.habitat}", "${specimen.occurrenceRemarks}", "${specimen.molecularOccurrenceRemarks}", "${specimen.samplingProtocol}", ` +
      `"${specimen.country}", "${specimen.stateProvince}", "${specimen.county}",  "${specimen.municipality}", "${specimen.locality}", "${specimen.elevationInMeters}", ` +
      `${decimalLatitude}, ${decimalLongitude}, "${specimen.geodeticDatum}", "${specimen.coordinateUncertainty}", "${specimen.verbatimLatitude}", "${specimen.verbatimLongitude}", ` +
      `"${specimen.georeferencedBy}", "${specimen.disposition}", "${specimen.isLoaned}", "${specimen.loanInstitution}", "${specimen.loaneeName}", "${specimen.loanStartDate}", ` +
      `"${specimen.loanReturnDate}", "${specimen.preparations}", "${specimen.freezer}", "${specimen.rack}", "${specimen.box}", "${specimen.tubeSize}", "${specimen.associatedSequences}", ` +
      `"${specimen.associatedReferences}", "${specimen.withholdData}", "${specimen.reared}", "${specimen.fieldNotes}", "${specimen.modifiedInfo}");`;
    // console.log(command);

    connection.query(command, (err, data) => {
      if (err) {
        console.log("Insertion Failure. Error logged.");
        console.log(command, "FAILED");
        res.json({
          success: false,
          data: err,
        });
      } else {
        // console.log("Inserted Row(s):", data.affectedRows);
        console.log("Sucess!");
        res.json({
          success: true,
          data: data,
        });
      }
    });
  });
};
