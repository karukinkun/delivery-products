import { signupDefaultValues, SignupFormType } from '@/forms/signup/signup-form';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type StoreType = {
  form: SignupFormType;
  setForm: (data: Partial<SignupFormType>) => void;
  clearForm: () => void;
};

export const signupFormStore = create<StoreType>()(
  persist(
    (set) => ({
      form: signupDefaultValues,
      setForm: (data) =>
        set((state) => ({
          form: { ...state.form, ...data },
        })),
      clearForm: () =>
        set({
          form: signupDefaultValues,
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
