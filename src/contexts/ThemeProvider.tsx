import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

interface ThemeContextType {
  isDarkTheme: boolean;
  toggleTheme: () => void;
}
const SESSION_STORAGE_KEY = 'themePreference';

const defaultContextValue: ThemeContextType = {
  isDarkTheme: false,
  toggleTheme: () => {},
};

const ThemeContext = createContext<ThemeContextType>(defaultContextValue);

export const ThemeProvider: React.FC<React.PropsWithChildren<Record<string, unknown>>> = ({
  children,
}) => {
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(
    JSON.parse(sessionStorage.getItem(SESSION_STORAGE_KEY) || 'null') ?? false
  );

  useEffect(() => {
    // Load the theme preference from sessionStorage
    const savedThemePreference = JSON.parse(sessionStorage.getItem(SESSION_STORAGE_KEY) || 'null');
    if (savedThemePreference !== null) {
      setIsDarkTheme(savedThemePreference);
    }
  }, []);

  useEffect(() => {
    // Apply the theme preference
    if (isDarkTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Save the theme preference to sessionStorage
    sessionStorage.setItem(SESSION_STORAGE_KEY, isDarkTheme.toString());
  }, [isDarkTheme]);

  const toggleTheme = () => {
    setIsDarkTheme((prevTheme) => !prevTheme);
  };

  const contextValues: ThemeContextType = useMemo(() => {
    return { isDarkTheme, toggleTheme };
  }, [isDarkTheme]);

  return <ThemeContext.Provider value={contextValues}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);
