import React, { createContext, useState } from 'react';
import { ThemeProvider } from 'styled-components/native';
import { lightTheme } from './L';
import { darkTheme } from './D';

export const ThemeContext = createContext();

export const ThemeProviderWrapper = ({ children }) => {
  const [theme, setTheme] = useState(lightTheme);
  const toggleTheme = () => {
    setTheme((prev) => (prev === lightTheme ? darkTheme : lightTheme));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};