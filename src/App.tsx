import AppRouter from '@routes/AppRouter';

const App = () => {
  return (
    <div className="font-satoshi bg-white dark:bg-dark-bg text-dark-text dark:text-white transition-colors duration-200">
      <AppRouter />
    </div>
  );
};

export default App;
