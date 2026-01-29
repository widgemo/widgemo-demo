import React, { useState, useEffect, createContext } from 'react';
import type { Theme } from '../utils/themeConfig';

interface ThemeContextType {
  currentTheme: Theme;
  setCurrentTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize with saved theme from localStorage or default to 'light'
  const [currentTheme, setCurrentTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('app-theme');
      return (saved as Theme) || 'light';
    }
    return 'light';
  });

  // Save theme to localStorage when it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('app-theme', currentTheme);
    }
  }, [currentTheme]);

  // Apply theme by setting data attributes
  useEffect(() => {
    console.log('🎨 ThemeProvider useEffect triggered for theme:', currentTheme);

    // Check if we're in a browser environment
    if (typeof window === 'undefined' || !window.document) {
      console.log('❌ Not in browser environment');
      return;
    }

    console.log('✅ In browser environment, applying theme...');

    // Set data attributes for theme switching
    document.documentElement.setAttribute('data-theme', currentTheme);
    document.documentElement.setAttribute('data-bs-theme', currentTheme);

    console.log('✅ Theme applied successfully:', currentTheme, 'data-theme:', document.documentElement.getAttribute('data-theme'));
  }, [currentTheme]);

  return (
    <ThemeContext.Provider value={{ currentTheme, setCurrentTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Export the context for advanced usage
export { ThemeContext };