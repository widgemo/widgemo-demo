import type { WidgemoConfig } from 'widgemo-core';

// Utility functions for theme management
export const mergeThemeIntoConfig = (config: WidgemoConfig, demoTheme: string): WidgemoConfig => {
  // Convert demo theme format to Widgemo theme format using dark and autoDetect booleans
  let isDark: boolean = false;
  let autoDetect: boolean = false;

  // All light themes map to light mode
  if (demoTheme.startsWith('theme-light')) {
    isDark = false;
    autoDetect = false;
  }
  // All dark themes map to dark mode
  else if (demoTheme.startsWith('theme-dark')) {
    isDark = true;
    autoDetect = false;
  }
  // Auto theme enables auto-detection
  else if (demoTheme === 'auto') {
    isDark = false; // Will be overridden by autoDetect
    autoDetect = true;
  }
  // Simple theme names
  else if (demoTheme === 'light') {
    isDark = false;
    autoDetect = false;
  }
  else if (demoTheme === 'dark') {
    isDark = true;
    autoDetect = false;
  }
  // Fallback to light
  else {
    isDark = false;
    autoDetect = false;
  }

  return {
    ...config,
    theme: {
      ...config.theme,
      dark: isDark,
      autoDetect: autoDetect
    }
  };
};

// Get theme background color for dynamicBackground feature
// (re-exported from themeConfig for backward compatibility)
// Note: These functions were removed during cleanup to use CSS variables instead
// export { getThemeBackgroundColor, getThemeBorderColor } from './themeConfig';