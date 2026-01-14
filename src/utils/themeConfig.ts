/**
 * Centralized theme configuration for widgemo-demo
 * This file contains all theme definitions used across the application
 */

export interface ThemeConfig {
  key: string;
  label: string;
  backgroundColor: string;
  textColor: string;
  borderColor: string;
  buttonBg: string;
  buttonHover: string;
}

export const THEME_CONFIGS: Record<string, ThemeConfig> = {
  'theme-light': {
    key: 'theme-light',
    label: 'Light',
    backgroundColor: '#ffffff',
    textColor: '#161616',
    borderColor: '#cccccc',
    buttonBg: '#f0f0f0',
    buttonHover: '#e0e0e0',
  },
  'theme-light-blue': {
    key: 'theme-light-blue',
    label: 'Light Blue',
    backgroundColor: '#f0f8ff',
    textColor: '#333333',
    borderColor: '#b3d9ff',
    buttonBg: '#cce7ff',
    buttonHover: '#99d6ff',
  },
  'theme-light-green': {
    key: 'theme-light-green',
    label: 'Light Green',
    backgroundColor: '#f0fff0',
    textColor: '#333333',
    borderColor: '#b3ffb3',
    buttonBg: '#ccffcc',
    buttonHover: '#99ff99',
  },
  'theme-light-purple': {
    key: 'theme-light-purple',
    label: 'Light Purple',
    backgroundColor: '#f8f0ff',
    textColor: '#333333',
    borderColor: '#d9b3ff',
    buttonBg: '#e6ccff',
    buttonHover: '#d9b3ff',
  },
  'theme-dark': {
    key: 'theme-dark',
    label: 'Dark',
    backgroundColor: '#1a1a1a',
    textColor: '#cccccc',
    borderColor: '#444444',
    buttonBg: '#333333',
    buttonHover: '#555555',
  },
  'theme-dark-red': {
    key: 'theme-dark-red',
    label: 'Dark Red',
    backgroundColor: '#2a1a1a',
    textColor: '#cccccc',
    borderColor: '#664444',
    buttonBg: '#4a2a2a',
    buttonHover: '#6a4a4a',
  },
  'theme-dark-purple': {
    key: 'theme-dark-purple',
    label: 'Dark Purple',
    backgroundColor: '#1a1a2a',
    textColor: '#cccccc',
    borderColor: '#444466',
    buttonBg: '#2a2a4a',
    buttonHover: '#4a4a6a',
  },
  'theme-dark-teal': {
    key: 'theme-dark-teal',
    label: 'Dark Teal',
    backgroundColor: '#022833',
    textColor: '#cccccc',
    borderColor: '#446166',
    buttonBg: '#2a4a48',
    buttonHover: '#4a6a6a',
  },
};

// Generate CSS custom properties for all themes
export const generateThemeCSS = (): string => {
  let css = '';

  Object.values(THEME_CONFIGS).forEach(theme => {
    css += `
.${theme.key} {
  --bg-color: ${theme.backgroundColor};
  --text-color: ${theme.textColor};
  --border-color: ${theme.borderColor};
  --button-bg: ${theme.buttonBg};
  --button-hover: ${theme.buttonHover};
}

.${theme.key} .theme-aware-card {
  background-color: ${theme.backgroundColor} !important;
  color: ${theme.textColor} !important;
  border: 1px solid ${theme.borderColor} !important;
}

.${theme.key} .theme-aware-card .card-body {
  background-color: ${theme.backgroundColor} !important;
  color: ${theme.textColor} !important;
}

.${theme.key} .theme-aware-card .text-muted {
  color: ${theme.textColor} !important;
  opacity: 0.6;
}
`;
  });

  // Add common styles for all themes
  css += `
.theme-light:not(.App),
.theme-light-blue:not(.App),
.theme-light-green:not(.App),
.theme-light-purple:not(.App),
.theme-dark:not(.App),
.theme-dark-red:not(.App),
.theme-dark-purple:not(.App),
.theme-dark-teal:not(.App) {
  background-color: var(--bg-color);
  color: var(--text-color);
  transition: background-color 0.3s ease, color 0.3s ease;
}

.dropdown-menu {
  background-color: var(--bg-color) !important;
  border: 1px solid var(--border-color) !important;
  color: var(--text-color) !important;
}

.dropdown-item {
  color: var(--text-color) !important;
}

.dropdown-item:hover {
  background-color: var(--button-hover) !important;
}
`;

  return css;
};

// Inject theme CSS into the document head
export const injectThemeCSS = (): void => {
  // Remove existing theme styles if they exist
  const existingStyle = document.getElementById('dynamic-theme-styles');
  if (existingStyle) {
    existingStyle.remove();
  }

  // Create new style element
  const style = document.createElement('style');
  style.id = 'dynamic-theme-styles';
  style.textContent = generateThemeCSS();

  // Insert at the end of head to ensure it loads after Bootstrap
  document.head.appendChild(style);
};

// Helper functions
export const getThemeConfig = (themeKey: string): ThemeConfig | undefined => {
  return THEME_CONFIGS[themeKey];
};

export const getThemeBackgroundColor = (themeKey: string): string => {
  return THEME_CONFIGS[themeKey]?.backgroundColor || '#ffffff';
};

export const getThemeBorderColor = (themeKey: string): string => {
  return THEME_CONFIGS[themeKey]?.borderColor || '#cccccc';
};

export const isThemeDark = (themeKey: string): boolean => {
  return themeKey.includes('dark');
};

export const getAllThemeKeys = (): string[] => {
  return Object.keys(THEME_CONFIGS);
};

export const getAllThemes = (): ThemeConfig[] => {
  return Object.values(THEME_CONFIGS);
};