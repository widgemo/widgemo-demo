import type { WidgemoTheme } from 'widgemo-core';

/**
 * Configuration interface for mapping widgemo theme properties to app values.
 * Developers can specify either CSS variables (e.g., 'var(--my-color)') or explicit colors (e.g., '#007bff').
 * Unspecified properties will use widgemo-core defaults.
 */
export interface WidgemoThemeMapping {
  colors?: {
    primary?: string;
    background?: string;
    surfaceBg?: string;
    text?: string;
    textMuted?: string;
    border?: string;
    secondary?: string;
    secondaryDark?: string;
    success?: string;
    successDark?: string;
    warning?: string;
    danger?: string;
    dangerDark?: string;
    info?: string;
    light?: string;
    colorDark?: string;
    primaryLight?: string;
    primaryDark?: string;
    accent?: string;
    cardBg?: string;
    cardBorder?: string;
    tableBg?: string;
    tableBorder?: string;
    tableHeaderBg?: string;
    tableHeaderHoverBg?: string;
    tableBodyBg?: string;
    rowHoverBg?: string;
    rowAltBg?: string;
    headerBg?: string;
    ghostButtonBorder?: string;
    ghostButtonHoverBg?: string;
    focusColor?: string;
    shadowColor?: string;
    titleText?: string;
    subtitleText?: string;
    boardBg?: string;
    swimlaneHeaderBg?: string;
    columnBg?: string;
  };
  borderRadius?: string;
  spacing?: string;
  fontFamily?: string;
  fontSize?: string;
  buttonBorderRadius?: string;
  buttonPadding?: string;
  buttonHeight?: string;
  inputBorderRadius?: string;
  inputPadding?: string;
  shadow?: boolean;
  showBorder?: boolean;
  dynamicBackground?: boolean;
  dark?: boolean;
  autoDetect?: boolean;
}

/**
 * Reads the computed value of a CSS variable or returns explicit color values.
 * Handles both 'var(--css-variable)' and explicit color strings.
 */
function resolveThemeValue(value: string): string {
  if (typeof window === 'undefined') return value;

  // If it's a CSS variable reference like 'var(--my-color)'
  if (value.startsWith('var(') && value.endsWith(')')) {
    const varName = value.slice(4, -1); // Extract --my-color from var(--my-color)
    const computedValue = getComputedStyle(document.documentElement)
      .getPropertyValue(varName).trim();
    return computedValue || value; // Fallback to original if variable not found
  }

  // Otherwise return the explicit color/value as-is
  return value;
}

/**
 * Creates a widgemo theme from an explicit mapping configuration.
 * Developers specify exactly which app values map to which widgemo properties.
 * Unmapped properties will use widgemo-core defaults.
 */
export function createWidgemoThemeFromMapping(mapping: WidgemoThemeMapping): WidgemoTheme {
  const theme: WidgemoTheme = {};

  if (mapping.colors) {
    theme.colors = {} as WidgemoTheme['colors']; // Start with empty object
    // Resolve each mapping (CSS variables or explicit colors)
    Object.entries(mapping.colors).forEach(([key, value]) => {
      if (value) {
        (theme.colors as Record<string, string>)[key] = resolveThemeValue(value);
      }
    });
  }

  // Copy other theme properties directly
  if (mapping.borderRadius !== undefined) theme.borderRadius = mapping.borderRadius;
  if (mapping.spacing !== undefined) theme.spacing = mapping.spacing;
  if (mapping.fontFamily !== undefined) theme.fontFamily = mapping.fontFamily;
  if (mapping.fontSize !== undefined) theme.fontSize = mapping.fontSize;
  if (mapping.buttonBorderRadius !== undefined) theme.buttonBorderRadius = mapping.buttonBorderRadius;
  if (mapping.buttonPadding !== undefined) theme.buttonPadding = mapping.buttonPadding;
  if (mapping.buttonHeight !== undefined) theme.buttonHeight = mapping.buttonHeight;
  if (mapping.inputBorderRadius !== undefined) theme.inputBorderRadius = mapping.inputBorderRadius;
  if (mapping.inputPadding !== undefined) theme.inputPadding = mapping.inputPadding;
  if (mapping.shadow !== undefined) theme.shadow = mapping.shadow;
  if (mapping.showBorder !== undefined) theme.showBorder = mapping.showBorder;
  if (mapping.dynamicBackground !== undefined) theme.dynamicBackground = mapping.dynamicBackground;
  if (mapping.dark !== undefined) theme.dark = mapping.dark;
  if (mapping.autoDetect !== undefined) theme.autoDetect = mapping.autoDetect;

  return theme;
}

/**
 * widgemo-demo's specific theme mapping configuration.
 * Maps widgemo properties to our app's values.
 * Developers can modify this to customize the mapping.
 */
export const widgemoDemoThemeMapping: WidgemoThemeMapping = {
  colors: {
    // Map to static values that work for both light and dark modes
    primary: '#0d6efd', // Bootstrap primary
    primaryDark: '#0a58ca',
    background: '#fefce8', // Light mode value - will be overridden by theme provider
    surfaceBg: '#fdf7d8', // Light mode value - will be overridden by theme provider
    text: '#2d3748', // Good text color
    textMuted: '#718096', // Muted text
    border: '#e2e8f0', // Light border
    secondary: '#718096',
    secondaryDark: '#4a5568',

    // Additional semantic colors
    success: '#308e78', // Reuse accent for success
    warning: '#ffc107', // Keep standard warning
    danger: '#dc3545', // Keep standard danger
    info: '#17a2b8', // Keep standard info

    // UI element colors - these will be overridden by the dynamic theme
    cardBg: '#fdf7d8',
    cardBorder: '#e2e8f0',
    tableBodyBg: '#fefce8',
    tableBorder: '#e2e8f0',
    tableHeaderBg: '#fefce8',
    tableHeaderHoverBg: '#e2e8f0',
    rowHoverBg: '#e2e8f0',
    rowAltBg: '#fdf7d8',
    headerBg: 'transparent',

    // Interactive elements
    ghostButtonBorder: '#e2e8f0',
    ghostButtonHoverBg: '#fdf7d8',
    focusColor: '#0d6efd',
    shadowColor: 'rgba(0, 0, 0, 0.1)',

    // Board mode colors
    boardBg: '#fefce8',
    swimlaneHeaderBg: '#fdf7d8',
    columnBg: '#fdf7d8',
  },
  autoDetect: true,
};
export function createWidgemoTheme(isDark: boolean = false): WidgemoTheme {
  // Create different mappings for light and dark modes
  const lightMapping: WidgemoThemeMapping = {
    colors: {
      primary: '#0d6efd',
      primaryDark: '#0a58ca',
      background: '#fefce8', // Light background
      surfaceBg: '#fdf7d8', // Light surface
      text: '#2d3748',
      textMuted: '#718096',
      border: '#e2e8f0',
      secondary: '#718096',
      secondaryDark: '#4a5568',
      success: '#308e78',
      warning: '#ffc107',
      danger: '#dc3545',
      info: '#17a2b8',
      cardBg: '#fdf7d8',
      cardBorder: '#e2e8f0',
      tableBodyBg: '#fefce8',
      tableBorder: '#e2e8f0',
      tableHeaderBg: '#fefce8',
      tableHeaderHoverBg: '#e2e8f0',
      rowHoverBg: '#e2e8f0',
      rowAltBg: '#fdf7d8',
      headerBg: 'transparent',
      ghostButtonBorder: '#e2e8f0',
      ghostButtonHoverBg: '#fdf7d8',
      focusColor: '#0d6efd',
      shadowColor: 'rgba(0, 0, 0, 0.1)',
      boardBg: '#fefce8',
      swimlaneHeaderBg: '#fdf7d8',
      columnBg: '#fdf7d8',
    },
    autoDetect: true,
  };

  const darkMapping: WidgemoThemeMapping = {
    colors: {
      primary: '#0d6efd',
      primaryDark: '#0a58ca',
      background: '#222233', // Dark background
      surfaceBg: '#1a1a2a', // Dark surface
      text: '#e0e0e0',
      textMuted: '#adb5bd',
      border: '#3f454c',
      secondary: '#6c757d',
      secondaryDark: '#545b62',
      success: '#28a745',
      warning: '#ffc107',
      danger: '#dc3545',
      info: '#17a2b8',
      cardBg: '#1a1a2a',
      cardBorder: '#3f454c',
      tableBodyBg: '#222233',
      tableBorder: '#3f454c',
      tableHeaderBg: '#222233',
      tableHeaderHoverBg: '#3f454c',
      rowHoverBg: '#3f454c',
      rowAltBg: '#1a1a2a',
      headerBg: 'transparent',
      ghostButtonBorder: '#3f454c',
      ghostButtonHoverBg: '#2a2a3a',
      focusColor: '#6ea8fe',
      shadowColor: 'rgba(0, 0, 0, 0.3)',
      boardBg: '#1e1e1e',
      swimlaneHeaderBg: '#101010',
      columnBg: '#121212',
    },
    autoDetect: true,
  };

  const mapping = isDark ? darkMapping : lightMapping;
  return createWidgemoThemeFromMapping(mapping);
}

/**
 * Creates a theme that forces widgemo-core defaults (ignoring app theme)
 * Used for demonstration purposes in SimplifiedTest
 */
export function createWidgemoCoreDefaultsTheme(): WidgemoTheme {
  // Return an empty theme object to use widgemo-core defaults
  return {};
}