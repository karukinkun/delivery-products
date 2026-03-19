'use client';

import type {
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
  Path,
} from 'react-hook-form';
import { InputGroupInput, InputGroupAddon, InputGroup } from '@/components/ui/input-group';
import { Field, FieldLabel, FieldError, FieldDescription } from '@/components/ui/field';

type Props<TFieldValues extends FieldValues, TName extends Path<TFieldValues>> = {
  label?: string;
  field: ControllerRenderProps<TFieldValues, TName>;
  fieldState: ControllerFieldState;
  type?: 'text' | 'password' | 'email';
  autoComplete?: 'off' | 'on';
  icon?: React.ReactNode;
  iconAlign?: 'inline-start' | 'inline-end';
  description?: string;
} & Omit<React.ComponentProps<'input'>, 'id' | 'autoComplete' | 'type'>;

export function TextField<TFieldValues extends FieldValues, TName extends Path<TFieldValues>>({
  className,
  field,
  fieldState,
  type = 'text',
  autoComplete = 'off',
  label,
  icon,
  iconAlign = 'inline-end',
  description,
  ...props
}: Props<TFieldValues, TName>) {
  return (
    <Field data-invalid={fieldState.invalid}>
      {label && <FieldLabel htmlFor={`form-${field.name}`}>{label}</FieldLabel>}
      <InputGroup>
        <InputGroupInput
          {...field}
          id={`form-${field.name}`}
          aria-invalid={fieldState.invalid}
          type={type}
          {...props}
        />
        {icon && <InputGroupAddon align={iconAlign}>{icon}</InputGroupAddon>}
      </InputGroup>
      {description && <FieldDescription>{description}</FieldDescription>}
      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  );
}
