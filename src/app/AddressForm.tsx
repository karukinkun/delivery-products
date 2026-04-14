'use client';

import { SelectField } from '@/components/SelectField';
import { TextField } from '@/components/TextField';
import { FieldGroup } from '@/components/ui/field';
import { getAddressApi } from '@/lib/api/address';
import { prefectureList } from '@/lib/utils';
import { fetchErrorMsg, words } from 'constants/messages';
import { useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

const AddressForm = () => {
  const { setValue, setError, resetField, trigger } = useFormContext();

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
        setValue('city', response.address2 + response.address3, {
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
          inputMode="numeric"
          maxLength={7}
          autoComplete="postal-code"
          onChange={(e) => {
            console.log('onChange');
            console.log(e.target.value);
            // 数字以外除去
            const value = e.target.value.replace(/\D/g, '').slice(0, 7);
            setValue('postalCode', value);
            // 郵便番号のバリデーションを実行
            trigger('postalCode');
          }}
        />
        <SelectField name="prefecture" options={prefectureList} label={words.prefecture} required />
      </div>
      <TextField
        name="city"
        label={words.city}
        required
        maxLength={100}
        autoComplete="address-level2"
      />
      <TextField
        name="address1"
        label={words.address1}
        required
        maxLength={100}
        autoComplete="address-line1"
      />
      <TextField
        name="address2"
        label={words.address2}
        maxLength={100}
        autoComplete="address-line2"
      />
    </FieldGroup>
  );
};

export default AddressForm;
