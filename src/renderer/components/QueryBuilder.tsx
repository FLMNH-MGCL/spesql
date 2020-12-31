import React from 'react';
import {
  ActionProps,
  ActionWithRulesProps,
  CombinatorSelectorProps,
  default as Builder,
  // Field,
  FieldSelectorProps,
  // NameLabelPair,
  QueryBuilderProps,
  ValueEditorProps,
} from 'react-querybuilder';
import Button from './ui/Button';
import Select from './querybuilder/Select';
import Input from './querybuilder/Input';
import TextArea from './querybuilder/TextArea';

/**
 * NOTE: QueryBuilder is a custom component wrapper around the QueryBuilder from
 * react-querybuilder. It's an amazing tool, and has great documentation: (https://github.com/sapientglobalmarkets/react-querybuilder).
 *
 * Most of this file will consist of me creating wrapper components around my UI form elements to work alongside
 * this library, and then overriding the QueryBuilder's control elements with these
 */

// function convertFieldSelectOptions(options: Field[]) {
//   // return options.map((opt) => {
//   // })
// }

export function convertCombinatorSelectorOptions(
  options: { name: string; label: string }[]
) {
  return options.map(({ name, label }) => {
    return { label, value: name };
  });
}

export function convertToQBCombinatorOptions(
  options: { value: any; label: string }[]
) {
  return options.map(({ value, label }) => {
    return { label, name: value };
  });
}

export function operatorRequiresList(operator: string) {
  console.log(operator);
  return operator === 'in' || operator === 'notIn';
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
}: // rules,
// level,
ActionWithRulesProps) {
  // console.log(rules, level);

  return <Button onClick={handleOnClick}>{title}</Button>;
}

function RemoveRuleButton({ handleOnClick }: ActionProps) {
  return (
    <button
      title="Remove Rule"
      onClick={handleOnClick}
      className="flex items-center h-full"
    >
      <svg
        className="mt-5 w-6 h-6 text-red-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </button>
  );
}

function RemoveGroupButton({ handleOnClick }: ActionProps) {
  return (
    <button
      title="Remove Group"
      onClick={handleOnClick}
      className="flex items-center h-full"
    >
      <svg
        className="w-6 h-6 text-red-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </button>
  );
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
      options={options}
      onChange={handleOnChange}
    />
  );
}

function FieldSelectorSelect({
  options,
  value,
  title,
  // operator,
  handleOnChange,
}: FieldSelectorProps) {
  return (
    <Select
      label={title}
      value={value}
      options={options}
      onChange={handleOnChange}
      fullWidth
    />
  );
}

function OperatorSelect({
  options,
  value,
  title,
  // operator,
  handleOnChange,
}: FieldSelectorProps) {
  return (
    <Select
      label={title}
      value={value}
      options={options}
      onChange={handleOnChange}
      fullWidth
    />
  );
}

function ValueEditor({
  field,
  value,
  inputType,
  handleOnChange,
  operator,
}: ValueEditorProps) {
  if (operator && operatorRequiresList(operator)) {
    return (
      <TextArea
        name={field}
        value={value}
        label="Value"
        onChange={handleOnChange}
        disabled={operator.indexOf('null') >= 0 ?? false}
      />
    );
  }

  return (
    <Input
      name={field}
      value={value}
      label="Value"
      type={inputType ?? 'text'}
      onChange={handleOnChange}
      disabled={operator ? operator.indexOf('null') >= 0 : false}
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
        removeRuleAction: RemoveRuleButton,
        removeGroupAction: RemoveGroupButton,
        fieldSelector: FieldSelectorSelect,
        operatorSelector: OperatorSelect,
        combinatorSelector: CombinatorSelectorSelect,
        valueEditor: ValueEditor,
      }}
      controlClassnames={{
        queryBuilder: 'py-2 rounded-md p-3 bg-gray-100 dark:bg-dark-500',
        header: 'flex space-x-2 items-center w-1/2 mt-3 p-2',
        rule: 'flex flex-wrap space-x-2 items-center p-2',
        ruleGroup:
          'rounded-md bg-gray-50 dark:bg-dark-stacking first:ml-0 ml-6',
      }}
      getDefaultField={() => ''}
    />
  );
}

/**
 interface Controls {
  addGroupAction?: React.ComponentType<ActionWithRulesProps>;
  addRuleAction?: React.ComponentType<ActionWithRulesProps>;
  combinatorSelector?: React.ComponentType<CombinatorSelectorProps>;
  fieldSelector?: React.ComponentType<FieldSelectorProps>;
  notToggle?: React.ComponentType<NotToggleProps>;
  operatorSelector?: React.ComponentType<OperatorSelectorProps>;
  removeGroupAction?: React.ComponentType<ActionWithRulesProps>;
  removeRuleAction?: React.ComponentType<ActionProps>;
  rule?: React.ComponentType<RuleProps>;
  ruleGroup?: React.ComponentType<RuleGroupProps>;
  valueEditor?: React.ComponentType<ValueEditorProps>;
}
 */
