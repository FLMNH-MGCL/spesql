import React from 'react';
import Code from '../../ui/Code';
import Divider from '../../ui/Divider';
import Heading from '../../ui/Heading';
import Label from '../../ui/Label';
import Modal from '../../ui/Modal';
import Table from '../../ui/Table';
import Text from '../../ui/Text';

export default function SelectHelpModal() {
  return (
    <Modal.Content title="Select Query Help">
      <div className="w-full">
        <Text className="pb-4">
          Select queries are those which retrieve data from one or more tables
          in the database. You can use this statement to retrieve all the rows
          from a table in one go, as well as to retrieve only those rows that
          satisfy any number of conditions.
        </Text>

        <Heading>SQL Syntax Basics</Heading>
        <div className="py-4 flex flex-col space-y-4">
          <Text>The basic structure of a SELECT statement is as follows:</Text>

          <Code language="sql" rounded>
            SELECT col_name, col_name_2, col_name_3 FROM table_name;
          </Code>

          <Text>
            Where you specify (or 'select') a list of columns from a named table
            in the database to extract. This will result in a table which is a
            subset of the entire table, but with the specified columns only.
          </Text>

          <Text>
            The form available to you in this query builder follows this format,
            where you select the fields you would like returned, the table you
            are querying from, and then a list of conditions.
          </Text>

          <Divider />

          <Text>
            Often times, you may find that you simply want to 'select' all the
            available fields, in which case you may use the wildcard asterisk
            character as a shorthand. For example, if the columns selected above
            represent the entire table, then the shorthand would be as follows:
          </Text>

          <Code language="sql" rounded>
            SELECT * FROM table_name;
          </Code>

          <Text>
            Where the * character is shorthand for col_name, col_name_2 and
            col_name_3
          </Text>
        </div>

        <div className="py-4 flex flex-col space-y-4">
          <Text>
            An important part of SQL select queries are conditional statements,
            or WHERE statements. WHERE statements alter the resulting table so
            that only entries that match a given condition are returned. The
            general format is as follows:
          </Text>

          <Code language="sql" rounded>
            SELECT * FROM table_name WHERE col_name_2 = 'Some Value';
          </Code>

          <p className="text-sm dark:text-dark-200">
            There are many SQL operators other than 'equal to' used in the
            example, so be sure to reference{' '}
            <a
              className="text-blue-500"
              href="https://www.w3schools.com/sql/sql_operators.asp"
              target="_blank"
              rel="noopener noreferrer"
            >
              this
            </a>{' '}
            small help guide for more examples.
          </p>

          <Divider />
        </div>

        <div className="py-4 flex flex-col space-y-4">
          <Heading>Advanced SQL</Heading>
          <Text>
            A complicated but complete example template for a SELECT statement
            with most possible syntax combinations would be as follows:
          </Text>

          <Code language="sql" rounded>
            {String(
              'SELECT [DISTINCT|ALL ] { * | [fieldExpression [AS newName]} FROM tableName [alias] [WHERE condition][GROUP BY fieldName(s)]  [HAVING condition] ORDER BY fieldName(s)'
            )}
          </Code>

          <p className="text-sm dark:text-dark-200">
            To overview a full breakdown of each part of this SQL statement,
            refer to{' '}
            <a
              className="text-blue-500"
              href="https://www.w3schools.com/sql/sql_operators.asp"
              target="_blank"
              rel="noopener noreferrer"
            >
              this
            </a>{' '}
            small help guide, as it breaks each individually into smaller bits.
          </p>

          <Text>
            You may use the Advanced Query input in the query builder form to
            achieve more complicated queries.
          </Text>

          <Divider />
        </div>

        <Heading className="pb-3">Examples</Heading>
        <Text>
          To give a few examples of relevant queries you might use, please
          imagine the following table as a table named 'myTable' existing in the
          musuem's database.
        </Text>

        <Table
          basic
          data={[
            { id: 1, catalogNumber: 'LEP1234567', samplingProtocol: 'LightMV' },
            { id: 2, catalogNumber: 'LEP1234568', samplingProtocol: 'LightUV' },
            { id: 3, catalogNumber: 'LEP1234569', samplingProtocol: null },
          ]}
          headers={['id', 'catalogNumber', 'samplingProtocol']}
        />

        <div className="py-4 flex flex-col space-y-4">
          <div>
            <div className="flex space-x-2">
              <Label>Situation 1:</Label>
              <Text className="flex-1">
                I would like to get all entries, as well as all available
                fields, in 'myTable' where samplingProtocol is NULL.
              </Text>
            </div>

            <Text>
              To achieve this, SQL has a handy IS NULL operator! One query we
              could use would be:
            </Text>

            <Code language="sql" rounded>
              SELECT * FROM myTable WHERE samplingProtocol IS NULL;
            </Code>

            <div className="py-4 flex flex-col space-y-4">
              <Text>
                This will return all entries in myTable which have a NULL value
                in samplingProtocol, which is just the third row of the entire
                table. The resulting table would be:
              </Text>

              <Table
                basic
                data={[
                  {
                    id: 3,
                    catalogNumber: 'LEP1234569',
                    samplingProtocol: null,
                  },
                ]}
                headers={['id', 'catalogNumber', 'samplingProtocol']}
              />
            </div>

            <div className="py-4 flex flex-col space-y-4">
              <Text>
                Let's say perhaps I only needed the IDs of these entries, and
                not the entire set of fields. We could tweak the above query to
                narrow the returned table, which would look something like this:
              </Text>

              <Code language="sql" rounded>
                SELECT id FROM myTable WHERE samplingProtocol IS NULL;
              </Code>

              <Text>The resulting table of this narrower query would be: </Text>

              <Table basic data={[{ id: 3 }]} headers={['id']} />
            </div>
          </div>
        </div>

        <div>
          <div className="flex space-x-2">
            <Label>Situation 2:</Label>
            <Text className="flex-1">
              I would like to get the catalogNumbers of entries in 'myTable'
              where samplingProtocol is either LightMV or LightUV.
            </Text>
          </div>

          <Text>
            To achieve this, you would need to need to combine two conditions
            using the OR operator:
          </Text>

          <Code language="sql" rounded>
            SELECT catalogNumber FROM myTable WHERE samplingProtocol = 'LightMV'
            OR samplingProtocol = 'LightUV';
          </Code>

          <div className="py-4 flex flex-col space-y-4">
            <Text>
              This will return all the catalogNumbers of entries in myTable
              which have either LightMV or LightUV in samplingProtocol. The
              resulting table would be:
            </Text>

            <Table
              basic
              data={[
                {
                  id: 1,
                  catalogNumber: 'LEP1234567',
                  samplingProtocol: 'LightMV',
                },
                {
                  id: 2,
                  catalogNumber: 'LEP1234568',
                  samplingProtocol: 'LightUV',
                },
              ]}
              headers={['id', 'catalogNumber', 'samplingProtocol']}
            />
          </div>

          <div className="py-4 flex flex-col space-y-4">
            <Text>
              The use of OR here is important, if I were to change this query to
              use AND instead, I would actually get an empty return. Taking a
              look at the table, there does not exist an entry that both equals
              two things (this would be impossible given the structure of the
              table, anyways).
            </Text>

            <Text>
              There is a toggle between AND and OR in the conditional section of
              the query builder forms, this is where you are able to select how
              your conditions are grouped together. The selection applies for
              all conditions, however, so if you were to select AND then all the
              conditions would be AND'ed together. Please see the advanced query
              builder section for more controlled conditional manipulation.
            </Text>

            <Text>
              Lets say I wanted to get the ID of specimen that have NULL in
              samplingProtocol and LEP1234569 in catalogNumber. The query for
              this would be using AND instead of OR, as I need both to be true.
              The query would be:
            </Text>

            <Code language="sql" rounded>
              SELECT id FROM myTable WHERE samplingProtocol IS NULL AND
              catalogNumber = 'LEP1234569';
            </Code>

            <Text>The resulting table of this narrower query would be: </Text>

            <Table
              basic
              data={[
                {
                  id: 3,
                },
              ]}
              headers={['id']}
            />
          </div>
        </div>

        <Heading className="pt-3">For Additional Help</Heading>
        <p className="text-sm dark:text-dark-200">
          Or for more usage-centered help, please refer to the official{' '}
          <a
            className="text-blue-500"
            href="https://flmnh-mgcl.github.io/spesql/docs/selectquery"
            target="_blank"
            rel="noopener noreferrer"
          >
            documentation
          </a>{' '}
          for SpeSQL
        </p>
      </div>
    </Modal.Content>
  );
}
