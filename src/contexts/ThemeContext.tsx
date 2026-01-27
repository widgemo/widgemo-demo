import React, { useState, useEffect, createContext, useContext } from 'react';
import { getThemeConfig } from '../utils/themeConfig';

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
  console.log('🎨 ThemeProvider component rendered with initial theme:', 'theme-light');
  const [currentTheme, setCurrentTheme] = useState('theme-light');

  // Safe theming application - works in both development and production
  useEffect(() => {
    console.log('🎨 ThemeProvider useEffect triggered for theme:', currentTheme);

    // Check if we're in a browser environment
    if (typeof window === 'undefined' || !window.document) {
      console.log('❌ Not in browser environment');
      return;
    }

    console.log('✅ In browser environment, applying theme...');

    const applyTheme = () => {
      console.log('🎨 ThemeProvider: Applying theme for', currentTheme);
      try {
        if (document.documentElement && document.body) {
          // Get the actual theme configuration
          const themeConfig = getThemeConfig(currentTheme);
          console.log('🎨 ThemeProvider: Got theme config', themeConfig);

          if (themeConfig) {
            // Apply theme colors to CSS variables on document root
            document.documentElement.style.setProperty('--bg-color', themeConfig.backgroundColor);
            document.documentElement.style.setProperty('--text-color', themeConfig.textColor);
            document.documentElement.style.setProperty('--border-color', themeConfig.borderColor);

            // Also apply to body for broader coverage
            document.body.style.setProperty('color', themeConfig.textColor);
            document.body.style.setProperty('background-color', themeConfig.backgroundColor);

            console.log('✅ Theme applied successfully:', currentTheme, {
              bg: themeConfig.backgroundColor,
              text: themeConfig.textColor,
              border: themeConfig.borderColor
            });
          } else {
            console.error('❌ Theme config not found for:', currentTheme, '- using fallback');
            // Fallback to light theme
            document.documentElement.style.setProperty('--bg-color', '#ffffff');
            document.documentElement.style.setProperty('--text-color', '#161616');
            document.documentElement.style.setProperty('--border-color', '#cccccc');
            document.body.style.setProperty('color', '#161616');
            document.body.style.setProperty('background-color', '#ffffff');
          }
        } else {
          console.error('❌ DOM elements not available');
        }
      } catch (error) {
        // Silently fail if theming fails
        console.error('❌ Theme application failed:', error);
      }
    };

    // Apply theme immediately for initial render
    applyTheme();

    // Also apply with delay to ensure DOM is fully ready (for safety)
    const timer = setTimeout(applyTheme, 100);

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