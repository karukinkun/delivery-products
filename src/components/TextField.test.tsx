// UIモック
// vi.mock('@/components/ui/field', () => ({
//   FieldLabel: ({ children }: any) => <label>{children}</label>,
//   FieldError: ({ errors }: any) => <div>{errors?.[0]?.message}</div>,
// }));

// vi.mock('@/components/ui/input-group', () => ({
//   InputGroup: ({ children }: any) => <div>{children}</div>,
//   InputGroupInput: (props: any) => <input {...props} />,
//   InputGroupAddon: ({ children }: any) => <div>{children}</div>,
// }));

import { TextField } from '@/components/TextField';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Controller, ControllerFieldState, useForm } from 'react-hook-form';
import { describe, expect, it } from 'vitest';

type TestTextFieldProps = {
  label?: string;
  fieldStateOverride?: Partial<ControllerFieldState>;
};

// 共通テスト用コンポーネント
const TestTextField = ({ label, fieldStateOverride }: TestTextFieldProps) => {
  const { control } = useForm({
    defaultValues: {
      test: '',
    },
  });

  return (
    <Controller
      name="test"
      control={control}
      render={({ field, fieldState }) => (
        <TextField
          label={label}
          field={field}
          fieldState={{ ...fieldState, ...fieldStateOverride }}
        />
      )}
    />
  );
};

describe('TextField', () => {
  // =========================
  // ① 表示テスト
  // =========================
  it('labelが表示される', () => {
    render(<TestTextField label="ラベル名" />);
    expect(screen.getByText('ラベル名')).toBeInTheDocument();
  });

  it('labelと紐づいたinputが表示される', () => {
    render(<TestTextField label="ラベル名" />);
    expect(screen.getByLabelText('ラベル名')).toBeInTheDocument();
  });

  it('labelが指定されていない場合は表示されない', () => {
    render(<TestTextField />);
    expect(screen.queryByText('ラベル名')).not.toBeInTheDocument();
  });

  // =========================
  // ② 入力テスト
  // =========================
  it('入力値が反映される', async () => {
    render(<TestTextField label="ラベル名" />);
    const user = userEvent.setup();

    const input = screen.getByLabelText('ラベル名');

    await user.type(input, '入力値');

    expect(input).toHaveValue('入力値');
  });

  // =========================
  // ③ エラーテスト
  // =========================
  it('初期表示時はエラーメッセージが表示されない', () => {
    render(<TestTextField label="ラベル名" />);
    expect(screen.queryByText('必須項目です')).not.toBeInTheDocument();
  });

  it('エラー時にエラーメッセージが表示される', () => {
    render(
      <TestTextField
        label="ラベル名"
        fieldStateOverride={{
          invalid: true,
          error: { message: '必須項目です', type: 'required' },
        }}
      />,
    );

    expect(screen.getByText('必須項目です')).toBeInTheDocument();
  });
});
