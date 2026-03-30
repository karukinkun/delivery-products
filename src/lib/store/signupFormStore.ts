import { signupDefaultValues, SignupFormType } from '@/lib/form/signupForm';
import { create } from 'zustand';

type StoreType = {
  form: SignupFormType;
  setForm: (data: Partial<SignupFormType>) => void;
  clearForm: () => void;
};

export const signupFormStore = create<StoreType>((set) => ({
  form: signupDefaultValues,
  setForm: (data) =>
    set((state) => ({
      form: { ...state.form, ...data },
    })),
  clearForm: () =>
    set({
      form: signupDefaultValues,
    }),
}));
