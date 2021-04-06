import { Request, Response } from 'express';
import { connection } from '../../../server';

function getCreationString(name: string) {
  return `CREATE TABLE \`${name}\` (
    \`id\` int(11) NOT NULL AUTO_INCREMENT,
    \`catalogNumber\` varchar(20) NOT NULL,
    \`otherCatalogNumber\` varchar(25) DEFAULT NULL,
    \`recordNumber\` varchar(20) DEFAULT NULL,
    \`order_\` varchar(40) DEFAULT NULL,
    \`superfamily\` varchar(40) DEFAULT NULL,
    \`family\` varchar(40) DEFAULT NULL,
    \`subfamily\` varchar(40) DEFAULT NULL,
    \`tribe\` varchar(40) DEFAULT NULL,
    \`genus\` varchar(40) DEFAULT NULL,
    \`subgenus\` varchar(40) DEFAULT NULL,
    \`specificEpithet\` varchar(40) DEFAULT NULL,
    \`infraspecificEpithet\` varchar(30) DEFAULT NULL,
    \`identificationQualifier\` varchar(25) DEFAULT NULL,
    \`recordedBy\` varchar(255) DEFAULT NULL,
    \`identifiedBy\` varchar(255) DEFAULT NULL,
    \`dateIdentified\` varchar(10) DEFAULT NULL,
    \`verbatimDate\` varchar(30) DEFAULT NULL,
    \`collectedYear\` varchar(4) DEFAULT NULL,
    \`collectedMonth\` varchar(2) DEFAULT NULL,
    \`collectedDay\` varchar(2) DEFAULT NULL,
    \`sex\` char(1) DEFAULT NULL,
    \`lifeStage\` varchar(40) DEFAULT NULL,
    \`habitat\` varchar(50) DEFAULT NULL,
    \`occurrenceRemarks\` text,
    \`molecularOccurrenceRemarks\` text,
    \`samplingProtocol\` varchar(30) DEFAULT NULL,
    \`country\` varchar(100) DEFAULT NULL,
    \`stateProvince\` varchar(100) DEFAULT NULL,
    \`county\` varchar(100) DEFAULT NULL,
    \`municipality\` varchar(100) DEFAULT NULL,
    \`locality\` varchar(100) DEFAULT NULL,
    \`elevationInMeters\` varchar(20) DEFAULT NULL,
    \`decimalLatitude\` decimal(10,8) DEFAULT NULL,
    \`decimalLongitude\` decimal(11,8) DEFAULT NULL,
    \`geodeticDatum\` varchar(20) DEFAULT NULL,
    \`coordinateUncertainty\` varchar(20) DEFAULT NULL,
    \`verbatimLatitude\` varchar(20) DEFAULT NULL,
    \`verbatimLongitude\` varchar(20) DEFAULT NULL,
    \`georeferencedBy\` text,
    \`disposition\` varchar(50) DEFAULT NULL,
    \`isLoaned\` char(1) DEFAULT NULL,
    \`loanInstitution\` varchar(50) DEFAULT NULL,
    \`loaneeName\` varchar(50) DEFAULT NULL,
    \`loanDate\` varchar(10) DEFAULT NULL,
    \`loanReturnDate\` varchar(10) DEFAULT NULL,
    \`preparations\` varchar(100) DEFAULT NULL,
    \`freezer\` varchar(20) DEFAULT NULL,
    \`rack\` varchar(10) DEFAULT NULL,
    \`box\` varchar(5) DEFAULT NULL,
    \`tubeSize\` varchar(20) DEFAULT NULL,
    \`associatedSequences\` varchar(15) DEFAULT NULL,
    \`associatedReferences\` text,
    \`recordEnteredBy\` varchar(50) DEFAULT NULL,
    \`dateEntered\` date DEFAULT NULL,
    \`withholdData\` char(1) DEFAULT NULL,
    \`reared\` char(1) DEFAULT NULL,
    \`fieldNotes\` text,
    \`otherCollectors\` text,
    \`modifiedInfo\` text,
    \`otherIdentifier\` varchar(25) DEFAULT NULL,
    \`projectNumber\` varchar(50) DEFAULT NULL,
    PRIMARY KEY (\`id\`),
    UNIQUE KEY \`catalogNumber\` (\`catalogNumber\`)
  );`;
}

export default function createTable(req: Request, res: Response) {
  if (!connection) {
    res.status(502).send('Connection to the MySQL database was lost');
  } else {
    const { tableName } = req?.body;

    if (!tableName || !tableName.length) {
      res.status(400).send('Missing table name in creation request');
    } else {
      const creationString = getCreationString(tableName);

      connection.query(creationString, (err, data) => {
        if (err) {
          res.status(503);
          res.json({ err: err });
        } else {
          console.log('sucessfully created table');
          res.status(201).send(data);
        }
      });
    }
  }
}
