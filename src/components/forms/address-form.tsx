'use client';

import { SelectField } from '@/components/forms/fields/select-field';
import { TextField } from '@/components/forms/fields/text-field';
import { FieldGroup } from '@/components/ui/field';
import { fetchErrorMsg, words } from '@/constants/messages';
import { getAddressApi } from '@/lib/api/address';
import { prefectureList } from '@/lib/utils';
import { useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

const AddressForm = () => {
  const { setValue, setError, resetField } = useFormContext();

  // watchだとフォーム値が変更時に際レンダリングされるため useWatchを使用する
  const postalCode = useWatch({ name: 'postalCode' });

  // 郵便番号が七桁入力されたらAPIから住所情報を取得するため、watchで郵便番号を毎入力取得する
  // TODO: 下記の処理を別コンポーネント化（hook化）けする
  useEffect(() => {
    if (!postalCode || postalCode.length !== 7) return;

    const getAddress = async () => {
      try {
        const response = await getAddressApi(postalCode);
        if (!response) return;

        setValue('prefecture', response.address1, {
          shouldValidate: true,
          shouldDirty: true,
        });
        setValue('address2', response.address2, {
          shouldValidate: true,
          shouldDirty: true,
        });
        setValue('address3', response.address3, {
          shouldValidate: true,
          shouldDirty: true,
        });
      } catch (e) {
        setError('postalCode', {
          type: 'manual',
          message: e instanceof Error ? e.message : fetchErrorMsg.postalCode.failure,
        });
        resetField('prefecture');
        resetField('city');
        resetField('address1');
        resetField('address2');
      }
    };

    getAddress();
  }, [postalCode, setValue, setError, resetField]);

  return (
    <FieldGroup role="group">
      <div className="flex flex-row gap-5">
        <TextField
          name="postalCode"
          label={words.postalCode}
          required
          type="text"
          maxLength={7}
          autoComplete="postal-code"
        />
        <SelectField name="prefecture" options={prefectureList} label={words.prefecture} required />
      </div>
      <TextField
        name="address2"
        label={words.address2}
        required
        maxLength={100}
        autoComplete="address-level2"
      />
      <TextField
        name="address3"
        label={words.address3}
        required
        maxLength={100}
        autoComplete="address-line1"
      />
      <TextField
        name="address4"
        label={words.address4}
        maxLength={100}
        autoComplete="address-line2"
      />
    </FieldGroup>
  );
};

export default AddressForm;
