/**
 * Centralized theme configuration for widgemo-demo
 * This file contains light and dark theme definitions
 */

export type Theme = 'light' | 'dark';

export interface ThemeConfig {
  key: Theme;
  label: string;
  backgroundColor: string;
  textColor: string;
  borderColor: string;
  shadowColor: string;
  buttonBg: string;
  buttonHover: string;
  rowHoverBg: string;
  tableHeaderHoverBg: string;
  tableBorder: string;
  tableHeaderBg: string;
  tableBodyBg: string;
  rowAltBg: string;
  focusColor: string;
  textMuted: string;
  ghostButtonBorder: string;
  ghostButtonHoverBg: string;
}

export const THEME_CONFIGS: Record<Theme, ThemeConfig> = {
  light: {
    key: 'light',
    label: 'Light',
    backgroundColor: '#ffffff',
    textColor: '#161616',
    borderColor: '#cccccc',
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    buttonBg: '#f0f0f0',
    buttonHover: '#e0e0e0',
    rowHoverBg: '#e0e0e0',
    tableHeaderHoverBg: '#ffffff',
    tableBorder: '#e0e0e0',
    tableHeaderBg: '#ffffff',
    tableBodyBg: '#ffffff',
    rowAltBg: '#fafafa',
    focusColor: '#007bff',
    textMuted: '#6c757d',
    ghostButtonBorder: 'none',
    ghostButtonHoverBg: '#e9ecef',
  },
  dark: {
    key: 'dark',
    label: 'Dark',
    backgroundColor: '#1a1a2a',
    textColor: '#cccccc',
    borderColor: '#444466',
    shadowColor: 'rgba(255, 255, 255, 0.1)',
    buttonBg: '#2a2a4a',
    buttonHover: '#4a4a6a',
    rowHoverBg: '#4a4a6a',
    tableHeaderHoverBg: '#1a1a2a',
    tableBorder: '#444466',
    tableHeaderBg: '#1a1a2a',
    tableBodyBg: '#1a1a2a',
    rowAltBg: '#222233',
    focusColor: '#6f42c1',
    textMuted: '#888888',
    ghostButtonBorder: 'none',
    ghostButtonHoverBg: '#2a2a3a',
  },
};

// Helper functions - keeping only essential ones for current light/dark implementation
export const getThemeConfig = (theme: Theme): ThemeConfig => {
  return THEME_CONFIGS[theme];
};

// Note: getThemeBackgroundColor, getThemeBorderColor, isThemeDark, and getAllThemes
// have been removed as they're no longer needed with CSS variables approach