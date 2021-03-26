import {
  Badge,
  Button,
  Code,
  Form,
  FormSubmitValues,
  Label,
  Modal,
  Text,
} from '@flmnh-mgcl/ui';
import React from 'react';
import useLogError from '../utils/useLogError';
import useQuery from '../utils/useQuery';
import useToggle from '../utils/useToggle';

const tableCreationString = `CREATE TABLE \`table_name\` (
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
  \`samplingProtocol\` varchar(20) DEFAULT NULL,
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

export default function CreateCreateTableModal({
  refresh,
}: {
  refresh(): void;
}) {
  const [open, { on, off }] = useToggle(false);

  const { createTable } = useQuery();
  const { logAdminTableError } = useLogError();

  async function handleSubmit(values: FormSubmitValues) {
    console.log(values);

    const res = await createTable(values.tableName);

    if (res) {
      if (res?.status !== 201) {
        const { status, data } = res;
        logAdminTableError({ status, data: data.err });
      } else {
        refresh();
        off();
      }
    } else {
      // TODO: implement me
    }
  }

  return (
    <React.Fragment>
      <Modal open={open} onClose={off}>
        <Modal.Content title="Create Table">
          <Text className="text-gray-500 py-1">
            Everything apart from the table name is prestructured, and is
            therefore the only configurable aspect
          </Text>

          <Form onSubmit={handleSubmit} id="create-table-form" className="py-2">
            <Form.Group flex>
              <Form.Input
                name="tableName"
                label="Table Name"
                placeholder="Enter a name"
                fullWidth
              />
            </Form.Group>
          </Form>

          <Label>Table Creation SQL</Label>
          <Code
            language="sql"
            rounded
            codeString={tableCreationString}
            maxHeight="12rem"
          />
        </Modal.Content>

        <Modal.Footer>
          <Button.Group>
            <Button onClick={off}>Close</Button>
            <Button variant="primary" type="submit" form="create-table-form">
              Submit
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal>

      <Badge label="Create" onClick={on} />
    </React.Fragment>
  );
}
