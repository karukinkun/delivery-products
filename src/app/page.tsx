'use client';

import LoginPage from '@/app/login/page';
import Image from 'next/image';
import Link from 'next/link';
import { useForm, SubmitHandler } from 'react-hook-form';

type Inputs = {
  example: string;
  exampleRequired: string;
};

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          {/* <input
            {...register('example')}
            type="text"
            placeholder="検索"
            className="block min-w-0 grow bg-white py-1.5 pr-3 pl-1 text-base text-gray-900 outline-gray-300 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
          /> */}

          <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
            <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6">
              workcation.com/
            </div>
            <input
              id="username"
              type="text"
              name="username"
              placeholder="janesmith"
              className="block min-w-0 grow bg-white py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
            />
          </div>
          <input type="submit" />
        </div>
        <div className="aspect-square w-12 bg-white">Text</div>
      </form>
    </div>
  );
}
