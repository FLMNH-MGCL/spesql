import React from 'react';
import {
  DeepPartial,
  FormProvider,
  SubmitHandler,
  UnpackNestedValue,
  useForm,
} from 'react-hook-form';
import Input from '../Input';
import createFormComponent from './createFormComponent';

const FormInput = createFormComponent(Input);

// function FormSelect() {}

// function FormTextArea() {}

// function FormGroup() {}

// function FormActions() {}

export type Values = Record<string, any>;

type FormProps<T> = {
  onSubmit: SubmitHandler<T>;
  children: React.ReactNode;
  disabled?: boolean;
  defaultValues?: UnpackNestedValue<DeepPartial<T>>;
  mode?: 'onChange' | 'onBlur' | 'onSubmit' | 'onTouched' | 'all';
} & Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit'>;

export default function Form<T = Values>({
  children,
  onSubmit,
  defaultValues,
  autoComplete,
  disabled = false,
  mode = 'onChange',
  ...props
}: FormProps<T>) {
  const form = useForm<T>({
    defaultValues,
    mode,
  });

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} {...props}>
        {children}
      </form>
    </FormProvider>
  );
}

Form.Input = FormInput;
