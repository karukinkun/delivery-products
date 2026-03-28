import { Field, FieldError } from '@/components/ui/field';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import type {
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
  Path,
} from 'react-hook-form';

type Props<TFieldValues extends FieldValues, TName extends Path<TFieldValues>> = {
  radioGrouplabel?: string;
  field: ControllerRenderProps<TFieldValues, TName>;
  fieldState: ControllerFieldState;
  orientation?: 'horizontal' | 'vertical';
  options: { label: string; value: string }[];
};

export function RadioField<TFieldValues extends FieldValues, TName extends Path<TFieldValues>>({
  radioGrouplabel,
  field,
  fieldState,
  orientation,
  options,
}: Props<TFieldValues, TName>) {
  return (
    <>
      <RadioGroup
        id={`form-${field.name}`}
        onValueChange={field.onChange}
        aria-invalid={fieldState.invalid}
        className="w-fit"
        {...field}
      >
        <Field orientation={orientation || 'horizontal'} data-invalid={fieldState.invalid}>
          {options.map((option) => (
            <div key={option.value} className="flex items-center gap-3">
              <RadioGroupItem
                value={option.value}
                id={option.value}
                aria-invalid={fieldState.invalid}
              />
              <Label htmlFor={option.value}>{option.label}</Label>
            </div>
          ))}
        </Field>
      </RadioGroup>
      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </>
  );
}
