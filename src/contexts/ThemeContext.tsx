import React, { useState, useEffect } from 'react';
import { injectThemeCSS } from '../utils/themeConfig';

// eslint-disable-next-line react-refresh/only-export-components
export const ThemeContext = React.createContext<{
  currentTheme: string;
  setCurrentTheme: (theme: string) => void;
}>({
  currentTheme: 'theme-light',
  setCurrentTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(() => {
    // Load from localStorage or detect system preference
    const saved = localStorage.getItem('widgemo-theme');
    if (saved) return saved;
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'theme-dark' : 'theme-light';
    }
    return 'theme-light';
  });

  // Inject theme CSS on mount and theme change
  useEffect(() => {
    injectThemeCSS();
  }, [currentTheme]);

  // Save theme to localStorage
  useEffect(() => {
    localStorage.setItem('widgemo-theme', currentTheme);
  }, [currentTheme]);

  return (
    <ThemeContext.Provider value={{ currentTheme, setCurrentTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};