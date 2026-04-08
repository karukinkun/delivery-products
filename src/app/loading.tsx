import { Spinner } from '@/components/ui/spinner';

type PropsType = {
  className?: string;
};
const Loading = (props: PropsType) => {
  const { className = '' } = props;

  return (
    <div className={`flex items-center justify-center mt-30 ${className}`}>
      <Spinner />
    </div>
  );
};

export default Loading;
