import { LabelField } from '@/components/common/label-field';
import { Field, FieldDescription, FieldError } from '@/components/ui/field';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { ComponentProps, ReactNode } from 'react';
import { useController, useFormContext, type FieldValues, type Path } from 'react-hook-form';

type Props<TFieldValues extends FieldValues, TName extends Path<TFieldValues>> = {
  name: TName;
  label?: string;
  required?: boolean;
  type?: 'text' | 'password' | 'email' | 'tel' | 'number' | 'search';
  icon?: ReactNode;
  iconAlign?: 'inline-start' | 'inline-end';
  description?: string;
} & Omit<
  ComponentProps<typeof InputGroupInput>,
  'id' | 'type' | 'name' | 'icon' | 'iconAlign' | 'description'
>;

export function TextField<TFieldValues extends FieldValues, TName extends Path<TFieldValues>>({
  name,
  label,
  type = 'text',
  icon,
  iconAlign = 'inline-end',
  description,
  required = false,
  ...props
}: Props<TFieldValues, TName>) {
  const { control } = useFormContext();

  const { field, fieldState } = useController({
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
