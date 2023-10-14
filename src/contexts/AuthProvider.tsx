import paths from '@constants/paths';
import React, { ReactNode, createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthProviderProps {
  children: ReactNode;
}

interface User {
  firstName: string;
  lastName: string;
  theme: string;
}

interface AuthContextTypes {
  user: User;
  logout: () => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
}

const initialUserState: User = {
  firstName: '',
  lastName: '',
  theme: '',
};

const AuthContext = createContext<AuthContextTypes>({
  user: initialUserState,
  logout: () => {},
  isAuthenticated: false,
  setIsAuthenticated: () => {},
});

export const useAuth = () => useContext(AuthContext);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState<User>(initialUserState);

  // Save token to local storage
  useEffect(() => {
    if (!isAuthenticated) {
      navigate(paths.login);
    }
  }, [isAuthenticated, navigate]);

  //   // Get user
  //   useEffect(() => {
  //     const getUser = async () => {
  //       const accessToken = localStorage.getItem('accessToken');
  //       if (accessToken) {
  //         try {
  //           const res = await baseAxios.get<UserProfileResponse>(API.userProfile);
  //           const { data } = res.data;
  //           setUser({
  //             firstName: data?.first_name,
  //             lastName: data?.last_name,
  //             theme: data?.theme,
  //           });
  //         } catch {
  //           return false;
  //         }
  //       }
  //       return false;
  //     };
  //     getUser();
  //   }, []);

  const logout = () => {
    setIsAuthenticated(false);
    setUser(initialUserState);
  };

  const contextValues: AuthContextTypes = useMemo(() => {
    return { user, logout, isAuthenticated, setIsAuthenticated };
  }, [isAuthenticated, user]);

  return <AuthContext.Provider value={contextValues}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
