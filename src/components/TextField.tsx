import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { ComponentProps, ReactNode } from 'react';
import type {
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
  Path,
} from 'react-hook-form';

type Props<TFieldValues extends FieldValues, TName extends Path<TFieldValues>> = {
  label?: string;
  field: ControllerRenderProps<TFieldValues, TName>;
  fieldState: ControllerFieldState;
  error?: string;
  type?: 'text' | 'password' | 'email' | 'tel' | 'number' | 'search';
  autoComplete?: string;
  icon?: ReactNode;
  iconAlign?: 'inline-start' | 'inline-end';
  description?: string;
} & Omit<ComponentProps<'input'>, 'id' | 'autoComplete' | 'type'>;

export function TextField<TFieldValues extends FieldValues, TName extends Path<TFieldValues>>({
  className,
  field,
  fieldState,
  error,
  type,
  autoComplete,
  label,
  icon,
  iconAlign,
  description,
  ...props
}: Props<TFieldValues, TName>) {
  console.log(error);
  return (
    <Field data-invalid={fieldState.invalid} className={className}>
      {label && <FieldLabel htmlFor={`form-${field.name}`}>{label}</FieldLabel>}
      <InputGroup>
        <InputGroupInput
          id={`form-${field.name}`}
          aria-invalid={fieldState.invalid}
          type={type || 'text'}
          autoComplete={autoComplete || 'off'}
          {...props}
          {...field}
        />
        {icon && <InputGroupAddon align={iconAlign || 'inline-end'}>{icon}</InputGroupAddon>}
      </InputGroup>
      {description && <FieldDescription>{description}</FieldDescription>}
      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  );
}
