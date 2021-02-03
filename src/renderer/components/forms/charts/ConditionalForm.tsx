import { Code, Heading, Label } from '@flmnh-mgcl/ui';
import React from 'react';
import { formatQuery } from 'react-querybuilder';
import QueryBuilder from '../../QueryBuilder';
import { queryBuilderFields } from '../../utils/constants';

type Props = {
  codeString: string;
  setCodeString: React.Dispatch<React.SetStateAction<string>>;
};

export default function ConditionalForm({ codeString, setCodeString }: Props) {
  function getInputType(field: string, _operator: string): string {
    return (
      queryBuilderFields.find((el) => el.name === field)?.inputType ?? 'text'
    );
  }

  function logQuery(query: any) {
    const formatted = formatQuery(query, 'sql');
    if (typeof formatted === 'string') {
      setCodeString(formatted);
    } else {
      const { sql, params } = formatted;
      console.log('what is this:', params);
      setCodeString(sql);
    }
  }

  return (
    <React.Fragment>
      <Heading className="py-2">Conditional Builder</Heading>

      <QueryBuilder
        fields={queryBuilderFields}
        onQueryChange={logQuery}
        getInputType={getInputType}
      />

      <div className="my-3 bg-gray-50 dark:bg-dark-400 rounded-md p-3 mb-8">
        <Label>Query Conditional Statement:</Label>
        <Code language="sql" rounded codeString={codeString} />
      </div>
    </React.Fragment>
  );
}
