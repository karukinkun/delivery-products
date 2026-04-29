import { FieldLabel } from '@/components/ui/field';

type Props = {
  label: string;
  required?: boolean;
  htmlFor?: string;
};

export function LabelField({ label, required = false, htmlFor = undefined }: Props) {
  return (
    <div className="flex items-center gap-2">
      <FieldLabel htmlFor={htmlFor}>{label}</FieldLabel>
      {required && (
        <span className="bg-destructive px-1 py-0.5 text-xs font-black text-white">必須</span>
      )}
    </div>
  );
}
