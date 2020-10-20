import React from 'react';

export type SelectOption = {
  label: string;
  value: any;
};

type SelectProps = {
  muliple?: boolean;
  options: SelectOption[];
  onSelect(): void;
};

type OptionProps = {
  option: SelectOption;
  onSelect(): void;
};

// TODO:
function Option({ option, onSelect }: OptionProps) {}

// TODO:
function MultiSelect({ options, onSelect }: SelectProps) {
  return <div></div>;
}

export default function Select({ muliple, ...props }: SelectProps) {
  if (muliple) {
    return <MultiSelect {...props} />;
  }

  const { onSelect } = props;

  return <div></div>;
}
