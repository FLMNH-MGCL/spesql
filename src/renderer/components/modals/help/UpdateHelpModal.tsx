import { Code, Heading, Label, Modal, Table, Text } from '@flmnh-mgcl/ui';
import React from 'react';

export default function UpdateHelpModal() {
  return (
    <Modal.Content title="Update Query Help">
      <div className="w-full">
        <Text className="pb-4">
          Update queries are those which update tuples in the database given a
          set of changes and conditions. In SpeSQL they are limited to requiring
          narrow conditions, as a safety precaution to prevent mass, accidental
          updates.
        </Text>

        <Heading>SQL Syntax Basics</Heading>
        <div className="py-4 flex flex-col space-y-3">
          <Text className="pb-2">
            One of the basic formats of a SQL UPDATE statement is as follows:
          </Text>

          <Code language="sql" rounded>
            UPDATE table_name SET column_name = 'new_value' [WHERE condition];
          </Code>

          <Text>
            This will set the value of each tuple that matches the provided
            condition to the 'new_value' specified in the query.
          </Text>
        </div>

        <Heading>Update Form</Heading>
        <div className="py-4 flex flex-col space-y-3">
          <Text className="pb-2">
            The form to build update queries is structured in a way to support
            this query format, with the main parts being "set statements" and
            "condition statements." These are not valid, SQL terms, rather
            representations of two essential parts of the UPDATE statement.
          </Text>

          <Heading size="sm">Set Statements</Heading>
          <Text>
            These refer to the changes / updates that will be made on a
            successful query. You must state how many set statements there will
            be (how many fields will be altered) and then indicate what the new
            values should be. Validation is run on all the proposed updates once
            the fields are selected.
          </Text>

          <Text>
            The stucture to select fields and their corresponding update values
            is the following: select the field, select the operator ('=' is the
            only available operator for update set statements), and write the
            proposed, updated value.
          </Text>
          <Heading size="sm">Condition Statements</Heading>
          <Text>
            These refer to the conditions for which tuples in the database must
            match in order for the set statements above to take effect. You must
            state how many conditions there will be (how many fields will be
            altered) and then indicate what the conditional values should be.
          </Text>
          <Text>
            There is a toggle between AND and OR in the conditional section of
            the query builder forms, this is where you are able to select how
            your conditions are grouped together. The selection applies for all
            conditions, however, so if you were to select AND then all the
            conditions would be AND'ed together.
          </Text>
        </div>

        <Heading>Examples</Heading>
        <div className="py-4 flex flex-col space-y-3">
          <Text>
            Please refer to this table (referred to as 'myTable') for the
            following example situations:
          </Text>

          <Table
            basic
            data={[
              {
                id: 1,
                catalogNumber: 'LEP1234567',
                identificationQualifier: 'cf',
              },
              {
                id: 2,
                catalogNumber: 'LEP1234568',
                identificationQualifier: 'cf',
              },
              {
                id: 3,
                catalogNumber: 'LEP1234569',
                identificationQualifier: null,
              },
            ]}
            headers={['id', 'catalogNumber', 'identificationQualifier']}
          />

          <div className="flex space-x-2">
            <Label>Situation 1:</Label>
            <Text className="flex-1">
              Let's pretend that recently the field has decided to move away
              from using 'cf' as an accepted value for identificationQualifier,
              and instead use 'cool'. As a result, I would like to update all
              tuples that have identificationQualifier as 'cf' to be the
              replacement value.
            </Text>
          </div>

          <Text>
            The query to make the target updates would look something like this:
          </Text>

          <Code language="sql" rounded>
            UPDATE myTable SET identificationQualifier = 'cool' WHERE
            identificationQualifier = 'cf';
          </Code>

          <Text>
            This will update ALL tuples that have 'cf' in
            identificationQualifier to have 'cool' instead! The resulting table
            after running this query would be:
          </Text>

          <Table
            basic
            data={[
              {
                id: 1,
                catalogNumber: 'LEP1234567',
                identificationQualifier: 'cool',
              },
              {
                id: 2,
                catalogNumber: 'LEP1234568',
                identificationQualifier: 'cool',
              },
              {
                id: 3,
                catalogNumber: 'LEP1234569',
                identificationQualifier: null,
              },
            ]}
            headers={['id', 'catalogNumber', 'identificationQualifier']}
          />
        </div>

        <p className="text-sm">
          For more help, please refer to the{' '}
          <a
            className="text-blue-500"
            href="https://flmnh-mgcl.github.io/spesql/docs/updatebulk"
            target="_blank"
            rel="noopener noreferrer"
          >
            official documentation
          </a>
          .
        </p>
      </div>
    </Modal.Content>
  );
}
