import { addressDefaultValues, AddressFormType } from '@/lib/form/addressForm';
import { signupDefaultValues, SignupFormType } from '@/lib/form/signupForm';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type FormType = SignupFormType & AddressFormType;
const defaultValues = { ...signupDefaultValues, ...addressDefaultValues };

type StoreType = {
  form: FormType;
  setForm: (data: Partial<FormType>) => void;
  clearForm: () => void;
};

export const signupFormStore = create<StoreType>()(
  persist(
    (set) => ({
      form: defaultValues,
      setForm: (data) =>
        set((state) => ({
          form: { ...state.form, ...data },
        })),
      clearForm: () =>
        set({
          form: defaultValues,
        }),
    }),
    {
      name: 'signup-form-storage',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        form: {
          ...state.form,
          // パスワードはセッションストレージに保存しない
          password: '',
          passwordConfirm: '',
        },
      }),
    },
  ),
);
