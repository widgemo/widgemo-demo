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
    text?: string;
    border?: string;
    secondary?: string;
    success?: string;
    warning?: string;
    danger?: string;
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
    headerBg?: string;
    ghostButtonBorder?: string;
    ghostButtonHoverBg?: string;
    focusColor?: string;
    shadowColor?: string;
    titleText?: string;
    subtitleText?: string;
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

  return theme;
}

/**
 * widgemo-demo's specific theme mapping configuration.
 * Maps widgemo properties to our app's CSS variables.
 * Developers can modify this to customize the mapping.
 */
export const widgemoDemoThemeMapping: WidgemoThemeMapping = {
  colors: {
    // Map to our app's CSS variables
    primary: 'var(--app-accent)',
    background: 'var(--app-bg-primary)', // 
    text: 'var(--app-text-primary)',
    border: 'var(--app-border)',
    secondary: 'var(--app-text-secondary)',

    // Additional semantic colors
    success: 'var(--app-accent)', // Reuse accent for success
    warning: '#ffc107', // Keep standard warning
    danger: '#dc3545', // Keep standard danger
    info: '#17a2b8', // Keep standard info

    // UI element colors
    cardBg: 'var(--app-bg-primary)',
    cardBorder: 'var(--app-border)',
    tableBg: 'var(--app-table-body-bg)',
    tableBorder: 'var(--app-table-border)',
    headerBg: 'var(--app-table-header-bg)',

    // Interactive elements
    ghostButtonBorder: 'transparent',
    ghostButtonHoverBg: 'var(--app-button-hover)',
    focusColor: 'var(--app-focus)',
    shadowColor: 'var(--app-shadow)',

    // Title and subtitle colors
    titleText: 'var(--app-text-primary)',
    subtitleText: 'var(--app-text-secondary)',
  }
};

/**
 * Creates the widgemo theme for widgemo-demo using the mapping configuration.
 * This automatically handles light/dark theme switching through CSS variables.
 */
export function createWidgemoTheme(): WidgemoTheme {
  return createWidgemoThemeFromMapping(widgemoDemoThemeMapping);
}

/**
 * Creates a theme that forces widgemo-core defaults (ignoring app theme)
 * Used for demonstration purposes in SimplifiedTest
 */
export function createWidgemoCoreDefaultsTheme(): WidgemoTheme {
  // Return an empty theme object to use widgemo-core defaults
  return {};
}