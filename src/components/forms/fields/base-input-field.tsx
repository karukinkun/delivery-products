'use client';

import { LabelField } from '@/components/forms/fields/label-field';
import { Field, FieldDescription, FieldError } from '@/components/ui/field';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { ComponentProps, ReactNode, useId } from 'react';
import { useController, useFormContext, type FieldValues, type Path } from 'react-hook-form';

type InputMode = NonNullable<ComponentProps<'input'>['inputMode']>;

type InputType = 'text' | 'email' | 'password' | 'search' | 'tel';

type OmitInputProps =
  | 'name'
  | 'type'
  | 'value'
  | 'defaultValue'
  | 'onChange'
  | 'inputMode'
  | 'maxLength'
  | 'required';

export type BaseInputFieldProps<
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues>,
> = {
  name: TName;
  label?: string;
  required?: boolean;
  type?: InputType;
  inputMode?: InputMode;
  maxLength?: ComponentProps<'input'>['maxLength'];
  icon?: ReactNode;
  iconAlign?: 'inline-start' | 'inline-end';
  description?: ReactNode;
  transformValue?: (value: string) => string; // React Hook Formへ渡す前に値を加工する
  onValueChange?: (value: string) => void; // 加工後の値を外部で使う
} & Omit<ComponentProps<typeof InputGroupInput>, OmitInputProps>;

export function BaseInputField<TFieldValues extends FieldValues, TName extends Path<TFieldValues>>({
  name,
  label,
  required = false,
  type = 'text',
  inputMode = 'text',
  maxLength,
  icon,
  iconAlign = 'inline-end',
  description,
  transformValue,
  onValueChange,
  id,
  ...props
}: BaseInputFieldProps<TFieldValues, TName>) {
  const reactId = useId();

  const { control } = useFormContext<TFieldValues>();

  const { field, fieldState } = useController<TFieldValues, TName>({
    name,
    control,
  });

  const normalizedName = field.name.replace(/[^a-zA-Z0-9_-]/g, '-');
  const inputId = id ?? `form-${normalizedName}-${reactId}`;
  const descriptionId = description ? `${inputId}-description` : undefined;
  const errorId = fieldState.error ? `${inputId}-error` : undefined;

  const describedBy = [descriptionId, errorId].filter(Boolean).join(' ') || undefined;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value;
    const value = transformValue ? transformValue(rawValue) : rawValue;

    field.onChange(value);
    onValueChange?.(value);
  };

  return (
    <Field>
      {label && <LabelField label={label} required={required} htmlFor={inputId} />}

      <InputGroup>
        <InputGroupInput
          id={inputId}
          type={type}
          inputMode={inputMode}
          maxLength={maxLength}
          aria-invalid={fieldState.invalid}
          aria-describedby={describedBy}
          {...field}
          value={field.value ?? ''}
          onChange={handleChange}
          {...props}
        />

        {icon && <InputGroupAddon align={iconAlign}>{icon}</InputGroupAddon>}
      </InputGroup>

      {description && <FieldDescription id={descriptionId}>{description}</FieldDescription>}

      {fieldState.error?.message && <FieldError id={errorId} errors={[fieldState.error]} />}
    </Field>
  );
}
