import { addressDefaultValues, AddressFormType } from '@/lib/form/addressForm';
import { signupDefaultValues, SignupFormType } from '@/lib/form/signupForm';
import { create } from 'zustand';

type StoreType = {
  form: SignupFormType & AddressFormType;
  setForm: (data: Partial<SignupFormType & AddressFormType>) => void;
  clearForm: () => void;
};

export const signupFormStore = create<StoreType>((set) => ({
  form: { ...signupDefaultValues, ...addressDefaultValues },
  setForm: (data) =>
    set((state) => ({
      form: { ...state.form, ...data },
    })),
  clearForm: () =>
    set({
      form: { ...signupDefaultValues, ...addressDefaultValues },
    }),
}));
