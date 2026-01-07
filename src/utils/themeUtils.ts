import type { WidgemoConfig } from 'widgemo-core';

// Utility functions for theme management
export const mergeThemeIntoConfig = (config: WidgemoConfig, demoTheme: string): WidgemoConfig => {
  // Convert demo theme format to Widgemo theme format (light, dark, auto)
  let widgemoTheme: 'light' | 'dark' | 'auto' | undefined;

  // All light themes map to 'light'
  if (demoTheme.startsWith('theme-light')) {
    widgemoTheme = 'light';
  }
  // All dark themes map to 'dark'
  else if (demoTheme.startsWith('theme-dark')) {
    widgemoTheme = 'dark';
  }
  // Auto theme
  else if (demoTheme === 'auto') {
    widgemoTheme = 'auto';
  }
  // Simple theme names
  else if (demoTheme === 'light') {
    widgemoTheme = 'light';
  }
  else if (demoTheme === 'dark') {
    widgemoTheme = 'dark';
  }
  // Fallback
  else {
    widgemoTheme = 'light';
  }

  return {
    ...config,
    styling: {
      ...config.styling,
      theme: widgemoTheme === 'auto' ? (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') : widgemoTheme
    }
  };
};

// Get theme background color for dynamicBackground feature
// (re-exported from themeConfig for backward compatibility)
export { getThemeBackgroundColor } from './themeConfig';