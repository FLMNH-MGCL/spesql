import clsx from 'clsx';
import React from 'react';

const ConfigTypes = {
  input: FormInput,
  select: FormSelect,
  textArea: FormTextArea,
};

// TODO: add validation, maybe useForm hook

type FormInputProps = {
  className?: string;
  width?: 'full' | '1/2' | '1/3' | 'auto';
};

function FormInput({ className, width }: FormInputProps) {
  return (
    <span>
      <input className={clsx(width && `w-${width}`, 'form-input', className)} />
    </span>
  );
}

function FormSelect() {}

function FormTextArea() {}

function FormGroup() {}

type FormFieldProps = {
  type: keyof typeof ConfigTypes;
  className?: string;
  width?: 'full' | '1/2' | '1/3' | 'auto';
};

// TODO: render corresponding form input types above
function FormField({ type, width = 'auto', ...props }: FormFieldProps) {
  switch (type) {
    case 'input':
      return <FormInput {...props} />;
    default: {
      throw new Error(
        `Error in Form component: ${type} is not a valid Form.Field type`
      );
    }
  }
}

function FormActions() {}

type FormProps = {
  children: React.ReactNode;
  onSubmit?(): ((event: React.FormEvent<HTMLFormElement>) => void) | undefined;
};

export default function Form({ onSubmit, children }: FormProps) {
  return <form onSubmit={onSubmit}>{children}</form>;
}

Form.Group = FormGroup;
Form.Field = FormField;
Form.Actions = FormActions;
