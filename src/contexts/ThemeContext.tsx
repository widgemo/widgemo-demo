import React, { useState, useEffect, createContext, useContext } from 'react';

interface ThemeContextType {
  currentTheme: string;
  setCurrentTheme: (theme: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState('theme-light');

  // Safe theming application - only runs in development and with proper error handling
  useEffect(() => {
    // Only apply theming in development to avoid production issues
    if (typeof window === 'undefined' || !window.location || window.location.port !== '5173') {
      return;
    }

    // Delay execution to avoid render conflicts
    const timer = setTimeout(() => {
      try {
        if (document.documentElement) {
          // Apply basic theme colors via CSS variables
          document.documentElement.style.setProperty('--bg-color', currentTheme === 'theme-dark' ? '#1a1a1a' : '#ffffff');
          document.documentElement.style.setProperty('--text-color', currentTheme === 'theme-dark' ? '#ffffff' : '#333333');
          document.documentElement.style.setProperty('--border-color', currentTheme === 'theme-dark' ? '#444444' : '#dddddd');
        }
      } catch (error) {
        // Silently fail if theming fails
        console.warn('Theme application failed:', error);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [currentTheme]);

  return (
    <ThemeContext.Provider value={{ currentTheme, setCurrentTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Export the context for advanced usage
export { ThemeContext };