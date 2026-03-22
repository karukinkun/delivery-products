import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type {
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
  Path,
} from 'react-hook-form';

type Props<TFieldValues extends FieldValues, TName extends Path<TFieldValues>> = {
  field: ControllerRenderProps<TFieldValues, TName>;
  fieldState: ControllerFieldState;
  options: { label: string; value: string | number }[];
  placeholder?: string;
  selectBoxLabel?: string;
};

export function SelectField<TFieldValues extends FieldValues, TName extends Path<TFieldValues>>(
  props: Props<TFieldValues, TName>,
) {
  const { field, fieldState, options, placeholder, selectBoxLabel } = props;

  return (
    <>
      {selectBoxLabel && <FieldLabel>{selectBoxLabel}</FieldLabel>}
      <Field data-invalid={fieldState.invalid}>
        <Select name={field.name} value={field.value.toString()} onValueChange={field.onChange}>
          <SelectTrigger
            id={`form-${field.name}`}
            aria-invalid={fieldState.invalid}
            className="min-w-[120px]"
          >
            <SelectValue placeholder={placeholder || ''} />
          </SelectTrigger>
          <SelectContent position="item-aligned">
            <SelectSeparator />
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value.toString()}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>
      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </>
  );
}
