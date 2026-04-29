import { LabelField } from '@/components/forms/fields/label-field';
import { Field, FieldError } from '@/components/ui/field';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ComponentProps } from 'react';
import { useController, useFormContext, type FieldValues, type Path } from 'react-hook-form';

type RadioOption<TLabel extends string = string, TValue = string> = {
  label: TLabel;
  value: TValue;
};
type Props<
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues>,
  TLabel extends string = string,
  TValue = string,
> = {
  name: TName;
  label?: string;
  orientation?: 'horizontal' | 'vertical';
  required?: boolean;
  options: readonly RadioOption<TLabel, TValue>[];
} & Omit<ComponentProps<typeof RadioGroup>, 'name' | 'id' | 'value' | 'onValueChange'>;

export function RadioField<TFieldValues extends FieldValues, TName extends Path<TFieldValues>>({
  name,
  label,
  orientation = 'horizontal',
  required = false,
  options,
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
      {label && <LabelField label={label} required={required} />}
      <RadioGroup
        id={formId}
        value={field.value}
        onValueChange={field.onChange}
        aria-invalid={fieldState.invalid}
        aria-describedby={fieldState.error ? errorId : undefined}
        {...props}
      >
        <Field orientation={orientation}>
          {options.map((option) => (
            <div key={option.value} className="flex items-center gap-3">
              <RadioGroupItem
                id={`${name}-${option.value}`}
                value={option.value}
                aria-invalid={fieldState.invalid}
              />
              <Label htmlFor={`${name}-${option.value}`}>{option.label}</Label>
            </div>
          ))}
        </Field>
      </RadioGroup>
      {fieldState.error?.message && <FieldError id={errorId} errors={[fieldState.error]} />}
    </Field>
  );
}
