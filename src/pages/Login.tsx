import { useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { register, Hanko } from '@teamhanko/hanko-elements';
import { useAuth } from '@contexts/AuthProvider';
import { logo, dark_logo, iphone, dark_iphone, avatar, dark_avatar } from '@images/index';
import { useTheme } from '@contexts/ThemeProvider';

const hankoApi = import.meta.env.VITE_APP_HANKO_API_URL;

const Login = () => {
  const { isDarkTheme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();
  const hanko = useMemo(() => new Hanko(hankoApi ?? ''), []);

  const redirectAfterLogin = useCallback(() => {
    setIsAuthenticated(true);
    navigate('/dashboard');
  }, [navigate, setIsAuthenticated]);

  useEffect(
    () =>
      hanko.onAuthFlowCompleted(() => {
        redirectAfterLogin();
      }),
    [hanko, redirectAfterLogin]
  );

  useEffect(() => {
    register(hankoApi ?? '').catch((error) => {
      // eslint-disable-next-line no-console
      console.log(error);
    });
  }, []);

  return (
    <div className="flex flex-col sm:flex-row h-screen w-full">
      <div className="hidden sm:flex w-full sm:w-1/2 bg-light-bg dark:bg-[#0F0F0F] center-child text-center p-[80px] relative">
        <div className="mx-auto flex flex-col gap-5 h-full center-child">
          <div className="w-[230px] h-[267px] mx-auto">
            <img
              src={isDarkTheme ? dark_iphone : iphone}
              alt="iphone"
              className="parent-full block object-contain"
            />
          </div>
          <h1 className="font-bold text-2xl">Simplifying tasks management</h1>
          <p className="text-sm max-w-[367px] mx-auto dark:text-light-text">
            Welcome to a new era of task management with TaskEase; the key to unlocking a world of
            streamlined productivity.
          </p>
          <div className="absolute bottom-[80px] left-1/2 -translate-x-1/2 flex flex-col gap-5">
            <div className="w-[192px] mx-auto">
              <img
                src={isDarkTheme ? dark_avatar : avatar}
                alt="logo"
                className="parent-full block object-contain"
              />
            </div>
            <p className="text-sm">Trusted by 50k+ users</p>
          </div>
        </div>
      </div>
      <div className="w-full flex h-full sm:w-1/2 center-child bg-white dark:bg-dark-bg">
        <div>
          <button
            type="button"
            className="absolute top-0 right-0 mt-[20px] mr-[20px] text-sm"
            onClick={() => toggleTheme()}
          >
            toggle theme
          </button>
          <div className="w-[160px] mx-auto mb-[56px]">
            <img
              src={isDarkTheme ? dark_logo : logo}
              alt="logo"
              className="parent-full block object-contain"
            />
          </div>
          <hanko-auth />
        </div>
      </div>
    </div>
  );
};

export default Login;
