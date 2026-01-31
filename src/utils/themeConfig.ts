/**
 * Minimal theme configuration for widgemo-demo
 * Colors are now defined directly in index.css as CSS variables
 * This file only contains theme type definitions and basic config
 */

export type Theme = 'light' | 'dark';

// Minimal interface - colors removed since they're in CSS
export interface ThemeConfig {
  key: Theme;
  label: string;
  // Colors removed - now defined in index.css as CSS variables
}

export const THEME_CONFIGS: Record<Theme, ThemeConfig> = {
  light: {
    key: 'light',
    label: 'Light',
  },
  dark: {
    key: 'dark',
    label: 'Dark',
  },
};

// Helper functions - keeping only essential ones
export const getThemeConfig = (theme: Theme): ThemeConfig => {
  return THEME_CONFIGS[theme];
};

// Note: All color-related functions and properties removed since colors are now in CSS
