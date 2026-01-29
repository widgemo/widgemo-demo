import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import type { Theme } from '../utils/themeConfig';

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context as { currentTheme: Theme; setCurrentTheme: (theme: Theme) => void };
};