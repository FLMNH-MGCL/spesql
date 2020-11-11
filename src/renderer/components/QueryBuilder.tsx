import React from 'react';
import {
  ActionWithRulesProps,
  CombinatorSelectorProps,
  default as Builder,
  Field,
  FieldSelectorProps,
  NameLabelPair,
  QueryBuilderProps,
} from 'react-querybuilder';
import Button from './ui/Button';
import Select, { SelectOption } from './ui/Select';

/**
 * NOTE: QueryBuilder is a custom component wrapper around the QueryBuilder from
 * react-querybuilder. It's an amazing tool, and has great documentation: (https://github.com/sapientglobalmarkets/react-querybuilder).
 *
 * Most of this file will consist of me creating wrapper components around my UI form elements to work alongside
 * this library, and then overriding the QueryBuilder's control elements with these
 */

function convertFieldSelectOptions(options: Field[]) {
  // return options.map((opt) => {
  // })
}

function convertCombinatorSelectorOptions(
  options: { name: string; label: string }[]
) {
  return options.map(({ name, label }) => {
    return { label, value: name };
  });
}

type Props = {} & QueryBuilderProps;

function AddRuleButton({
  title,
  handleOnClick,
  rules,
  level,
}: ActionWithRulesProps) {
  console.log(rules, level);
  return <Button onClick={handleOnClick}>{title}</Button>;
}

function AddGroupButton({
  title,
  handleOnClick,
  rules,
  level,
}: ActionWithRulesProps) {
  console.log(rules, level);

  return <Button onClick={handleOnClick}>{title}</Button>;
}

function CombinatorSelectorSelect({
  options,
  value,
  handleOnChange,
}: CombinatorSelectorProps) {
  return (
    <Select
      fullWidth
      value={value}
      options={convertCombinatorSelectorOptions(options)}
      onChange={handleOnChange}
    />
  );
}

// TODO: very broken
function FieldSelectorSelect({
  options,
  value,
  title,
  operator,
  handleOnChange,
}: FieldSelectorProps) {
  return (
    <Select
      label={title}
      value={value}
      options={[]}
      onChange={handleOnChange}
    />
  );
}

export default function QueryBuilder({ ...props }: Props) {
  return (
    <Builder
      {...props}
      controlElements={{
        addGroupAction: AddGroupButton,
        addRuleAction: AddRuleButton,
        fieldSelector: FieldSelectorSelect,
        combinatorSelector: CombinatorSelectorSelect,
      }}
      controlClassnames={{
        header: 'flex space-x-2 items-center w-1/2',
      }}
    />
  );
}
