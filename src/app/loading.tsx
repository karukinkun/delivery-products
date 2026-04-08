import { Spinner } from '@/components/ui/spinner';

type PropsType = {
  className?: string;
};
const Loading = (props: PropsType) => {
  const { className = '' } = props;

  return (
    <div className={`mt-30 flex w-full items-center justify-center ${className}`}>
      <Spinner />
    </div>
  );
};

export default Loading;
