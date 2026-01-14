import React, { useState, useEffect } from 'react';
import { injectThemeCSS, THEME_CONFIGS } from '../utils/themeConfig';

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
    console.log('ThemeContext: Injecting CSS for theme:', currentTheme);
    injectThemeCSS();
    
    // Also set CSS variables on document root for global access
    const themeConfig = THEME_CONFIGS[currentTheme];
    if (themeConfig && document.documentElement) {
      document.documentElement.style.setProperty('--bg-color', themeConfig.backgroundColor);
      document.documentElement.style.setProperty('--text-color', themeConfig.textColor);
      document.documentElement.style.setProperty('--border-color', themeConfig.borderColor);
      document.documentElement.style.setProperty('--button-bg', themeConfig.buttonBg);
      document.documentElement.style.setProperty('--button-hover', themeConfig.buttonHover);
    }
    
    // Apply theme class to document body for proper inheritance
    if (document.body) {
      // Remove any existing theme classes
      document.body.className = document.body.className.replace(/\btheme-\w+/g, '').trim();
      // Add current theme class
      document.body.classList.add(currentTheme);
    }
    
    // Directly apply colors to theme-aware-text elements
    const themeAwareElements = document.querySelectorAll('.theme-aware-text');
    themeAwareElements.forEach((element) => {
      (element as HTMLElement).style.color = themeConfig?.textColor || '#161616';
    });
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