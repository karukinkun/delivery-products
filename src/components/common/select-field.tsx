import { LabelField } from '@/components/common/label-field';
import { Field, FieldError } from '@/components/ui/field';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { ComponentProps } from 'react';
import { useController, useFormContext, type FieldValues, type Path } from 'react-hook-form';

type Props<TFieldValues extends FieldValues, TName extends Path<TFieldValues>> = {
  name: TName;
  label?: string;
  endLabel?: string;
  required?: boolean;
  options: { label: string; value: string | number }[];
} & Omit<ComponentProps<typeof SelectTrigger>, 'id' | 'name' | 'value' | 'onValueChange'>;

export function SelectField<TFieldValues extends FieldValues, TName extends Path<TFieldValues>>({
  name,
  label,
  endLabel,
  options,
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
    <Field orientation="vertical" className="self-end">
      {label && <LabelField label={label} htmlFor={formId} required={required} />}
      <div className="flex items-center gap-2">
        <Select value={field.value?.toString() ?? ''} onValueChange={(val) => field.onChange(val)}>
          <SelectTrigger
            id={formId}
            aria-invalid={fieldState.invalid}
            aria-describedby={fieldState.error ? errorId : undefined}
            {...props}
            className={cn('w-full', props.className)}
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent position="item-aligned">
            <SelectSeparator />
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value?.toString() ?? ''}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {endLabel && <span>{endLabel}</span>}
      </div>
      {fieldState.error?.message && <FieldError id={errorId} errors={[fieldState.error]} />}
    </Field>
  );
}
