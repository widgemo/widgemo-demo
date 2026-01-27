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
  // Check if localStorage is available and working
  const isLocalStorageAvailable = () => {
    if (typeof window === 'undefined') {
      return false;
    }
    try {
      const testKey = '__localStorage_test__';
      localStorage.setItem(testKey, 'test');
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  };

  // Load theme from localStorage or default to light
  const [currentTheme, setCurrentTheme] = useState(() => {
    if (isLocalStorageAvailable()) {
      try {
        const saved = localStorage.getItem('widgemo-theme');
        if (saved) {
          return saved;
        } else {
          return 'theme-light';
        }
      } catch (error) {
        return 'theme-light';
      }
    } else {
      return 'theme-light';
    }
  });

  // Save theme to localStorage whenever it changes
  useEffect(() => {
    if (isLocalStorageAvailable()) {
      try {
        localStorage.setItem('widgemo-theme', currentTheme);
      } catch (error) {
        // Silently fail if localStorage is not available
      }
    }
  }, [currentTheme]);

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
            document.documentElement.style.setProperty('--button-hover', themeConfig.buttonHover);
            document.documentElement.style.setProperty('--row-hover-bg', themeConfig.rowHoverBg);
            document.documentElement.style.setProperty('--table-header-hover-bg', themeConfig.tableHeaderHoverBg);
            document.documentElement.style.setProperty('--table-border', themeConfig.tableBorder);
            document.documentElement.style.setProperty('--table-header-bg', themeConfig.tableHeaderBg);
            document.documentElement.style.setProperty('--table-body-bg', themeConfig.tableBodyBg);
            document.documentElement.style.setProperty('--row-alt-bg', themeConfig.rowAltBg);
            document.documentElement.style.setProperty('--focus-color', themeConfig.focusColor);
            document.documentElement.style.setProperty('--text-muted', themeConfig.textMuted);

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
            document.documentElement.style.setProperty('--button-hover', '#e0e0e0');
            document.documentElement.style.setProperty('--row-hover-bg', '#e0e0e0');
            document.documentElement.style.setProperty('--table-header-hover-bg', '#e0e0e0');
            document.documentElement.style.setProperty('--table-border', '#e0e0e0');
            document.documentElement.style.setProperty('--table-header-bg', '#f8f9fa');
            document.documentElement.style.setProperty('--table-body-bg', '#ffffff');
            document.documentElement.style.setProperty('--row-alt-bg', '#fafafa');
            document.documentElement.style.setProperty('--focus-color', '#007bff');
            document.documentElement.style.setProperty('--text-muted', '#6c757d');
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