import React, { useState, useEffect, createContext } from 'react';
import type { Theme } from '../utils/themeConfig';

interface ThemeContextType {
  currentTheme: Theme;
  setCurrentTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Default to light theme
  const [currentTheme, setCurrentTheme] = useState<Theme>('light');

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