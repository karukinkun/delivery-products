import { LabelField } from '@/components/forms/fields/label-field';
import { Field, FieldDescription, FieldError } from '@/components/ui/field';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { ComponentProps } from 'react';
import { useController, useFormContext, type FieldValues, type Path } from 'react-hook-form';

type OmitProps =
  | 'id'
  | 'name'
  | 'type'
  | 'icon'
  | 'iconAlign'
  | 'description'
  | 'required'
  | 'inputMode'
  | 'maxLength';

type TextFieldProps<TFieldValues extends FieldValues, TName extends Path<TFieldValues>> = {
  name: TName;
  label?: string;
  required?: boolean;
  type?: Exclude<ComponentProps<'input'>['inputMode'], '' | 'tel'> | 'password';
  icon?: React.ReactNode;
  iconAlign?: 'inline-start' | 'inline-end';
  inputMode?: Exclude<ComponentProps<'input'>['inputMode'], 'numeric' | 'tel'>;
  maxLength?: ComponentProps<'input'>['maxLength'];
  description?: string;
} & Omit<ComponentProps<typeof InputGroupInput>, OmitProps>;

export function TextField<TFieldValues extends FieldValues, TName extends Path<TFieldValues>>({
  name,
  label,
  type = 'text',
  icon,
  iconAlign = 'inline-end',
  description,
  required = false,
  inputMode = 'text',
  maxLength,
  ...props
}: TextFieldProps<TFieldValues, TName>) {
  const { control } = useFormContext<TFieldValues>();
  const { field, fieldState } = useController<TFieldValues, TName>({
    name,
    control,
  });

  const formId = `form-${field.name}`;
  const errorId = `error-${field.name}`;

  return (
    <Field>
      {label && <LabelField label={label} required={required} htmlFor={formId} />}
      <InputGroup>
        <InputGroupInput
          id={formId}
          aria-invalid={fieldState.invalid}
          aria-describedby={fieldState.error ? errorId : undefined}
          type={type}
          inputMode={inputMode}
          maxLength={maxLength}
          {...field}
          {...props}
        />
        {icon && <InputGroupAddon align={iconAlign}>{icon}</InputGroupAddon>}
      </InputGroup>
      {description && <FieldDescription>{description}</FieldDescription>}
      {fieldState.error?.message && <FieldError id={errorId} errors={[fieldState.error]} />}
    </Field>
  );
}
