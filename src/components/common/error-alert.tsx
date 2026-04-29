import { fetchErrorMsg } from '@/constants/messages';
import { AlertCircleIcon } from 'lucide-react';

type PropsType = {
  fetchErrorMessage: string;
};

export const ErrorAlert = ({ fetchErrorMessage }: PropsType) => {
  return (
    <div className="text-destructive flex w-full gap-2">
      <AlertCircleIcon />
      <div>
        <p role="alert">{fetchErrorMsg.title}</p>
        <p role="alert">{fetchErrorMessage}</p>
      </div>
    </div>
  );
};
