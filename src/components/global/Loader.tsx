import { Icon } from '@iconify/react/dist/iconify.js';

interface LoaderProps {
  text?: string;
  className?: string;
  noText?: boolean;
}

const Loader = ({ text, className, noText }: LoaderProps) => {
  return (
    <div className={`flex flex-col items-center justify-center gap-3 h-full ${className}`}>
      <Icon icon="eos-icons:loading" className="text-2xl" />
      {!noText && (
        <p className="text-sm text-sub-200-light dark:text-sub-200-dark">{text || 'Loading...'}</p>
      )}
    </div>
  );
};

Loader.defaultProps = {
  text: '',
  className: '',
  noText: false,
};
export default Loader;
