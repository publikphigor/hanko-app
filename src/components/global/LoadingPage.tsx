import Loader from './Loader';

const LoadingPage = () => {
  return (
    <div className="w-fulll h-screen center-child flex">
      <Loader text="Loading..." />
    </div>
  );
};

export default LoadingPage;
