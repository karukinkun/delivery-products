'use client';

import {
  BaseInputField,
  type BaseInputFieldProps,
} from '@/components/forms/fields/base-input-field';
import { ComponentProps } from 'react';
import type { FieldValues, Path } from 'react-hook-form';

type InputMode = NonNullable<ComponentProps<'input'>['inputMode']>;
type PropsType<TFieldValues extends FieldValues, TName extends Path<TFieldValues>> = Omit<
  BaseInputFieldProps<TFieldValues, TName>,
  'transformValue'
> & {
  type?: 'text' | 'email' | 'password' | 'search' | 'tel';
  inputMode?: Exclude<InputMode, 'numeric'>;
};

export function TextField<TFieldValues extends FieldValues, TName extends Path<TFieldValues>>({
  type = 'text',
  inputMode = 'text',
  ...props
}: PropsType<TFieldValues, TName>) {
  return <BaseInputField type={type} inputMode={inputMode} {...props} />;
}
