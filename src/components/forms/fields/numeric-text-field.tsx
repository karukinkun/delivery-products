'use client';

import {
  BaseInputField,
  type BaseInputFieldProps,
} from '@/components/forms/fields/base-input-field';
import type { FieldValues, Path } from 'react-hook-form';

type PropsType<TFieldValues extends FieldValues, TName extends Path<TFieldValues>> = Omit<
  BaseInputFieldProps<TFieldValues, TName>,
  'type' | 'inputMode' | 'transformValue' | 'maxLength'
> & {
  maxLength: number;
};

export function NumericTextField<
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues>,
>({ maxLength, ...props }: PropsType<TFieldValues, TName>) {
  return (
    <BaseInputField
      type="text"
      inputMode="numeric"
      maxLength={maxLength}
      transformValue={(value) => value.replace(/\D/g, '').slice(0, maxLength)}
      {...props}
    />
  );
}
