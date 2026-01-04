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
export const getThemeBackgroundColor = (demoTheme: string): string => {
  const themeColors: Record<string, string> = {
    'theme-light': '#ffffff',
    'theme-light-blue': '#f0f8ff',
    'theme-light-green': '#f0fff0',
    'theme-light-purple': '#f8f0ff',
    'theme-dark': '#1a1a1a',
    'theme-dark-red': '#2a1a1a',
    'theme-dark-purple': '#1a1a2a',
    'theme-dark-teal': '#1a2a2a',
  };
  return themeColors[demoTheme] || '#ffffff'; // fallback to white
};