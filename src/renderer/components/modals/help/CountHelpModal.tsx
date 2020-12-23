import React from 'react';
import Code from '../../ui/Code';
import Heading from '../../ui/Heading';
import Modal from '../../ui/Modal';
import Table from '../../ui/Table';
import Text from '../../ui/Text';

export default function CountHelpModal() {
  return (
    <Modal.Content title="Count Query Help">
      <div className="w-full">
        <Text className="pb-4">
          Count queries aren't actually a separate query type, rather they are
          just select queries with an aggregate function being applied (in this
          case, the COUNT function).
        </Text>

        <Heading>SQL Syntax Basics</Heading>
        <div className="py-4 flex flex-col space-y-3">
          <Text className="pb-2">
            The basic structure of a SELECT statement using a COUNT aggregate
            function is as follows:
          </Text>

          <Code language="sql" theme="light" rounded>
            SELECT COUNT(col_name) FROM table_name;
          </Code>

          <Text>
            The form available to you in this query builder follows this format
            only; since this is a SELECT statement, tuple data may be returned
            by querying for more than just the count, however this will only be
            supported in the visualization page of SpeSQL.
          </Text>
        </div>

        <Heading>Distinct Toggle</Heading>
        <div className="py-4 flex flex-col space-y-3">
          <Text className="pb-2">
            When applying an aggregate COUNT function on more than one field,
            you will need to toggle the Distinct radio button in the query
            builder form. This will group and only count tuples with distinct
            combinations of the fields in the aggregate.
          </Text>

          <Code language="sql" theme="light" rounded>
            SELECT COUNT(DISTINCT col_name, col_name_2) FROM table_name;
          </Code>

          <Text>Let's take the following table:</Text>

          <Table
            basic
            data={[
              {
                genus: 'Genus',
                specificEpithet: 'Species',
                samplingProtocol: 'LightMV',
              },
              {
                genus: 'Genus',
                specificEpithet: 'Species',
                samplingProtocol: 'LightUV',
              },
              {
                genus: 'OtherGenus',
                specificEpithet: 'OtherSpc',
                samplingProtocol: null,
              },
            ]}
            headers={['genus', 'specificEpithet', 'samplingProtocol']}
          />

          <Text className="pb-2">
            If I were to run a count query with genus and specificEpithet in the
            aggregate function, the query and resulting return value would be:
          </Text>

          <Code language="sql" theme="light" rounded>
            SELECT COUNT(DISTINCT genus, specificEpithet) FROM table_name;
          </Code>

          <Text>
            This query will return a count of 2, since the first two rows of the
            table had the same genus and specificEpithet combinations, they were
            not counted as distinct and therefore not counted individually.
          </Text>

          <Text>
            Using the wildcard asterisk (*) will simply count ALL the rows in
            the table (at least in the structure we are using the aggregate)
          </Text>
        </div>
      </div>
    </Modal.Content>
  );
}
