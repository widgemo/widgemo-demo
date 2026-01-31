import type { WidgemoTheme } from 'widgemo-core';
import type { Theme } from './themeConfig';
import { getThemeConfig } from './themeConfig';

/**
 * Converts widgemo-demo app themes to widgemo-core theme format
 * Maps app theme colors to appropriate widgemo theme properties
 */
export function createWidgemoTheme(appTheme: Theme): WidgemoTheme {
  const config = getThemeConfig(appTheme);

  return {
    colors: {
      // Core colors - map app theme to widgemo
      primary: config.focusColor,
      background: config.backgroundColor,
      text: config.textColor,
      border: config.borderColor,
      secondary: config.textMuted,

      // Semantic colors - use app colors where appropriate
      success: config.focusColor, // Use focus color for success
      warning: '#ffc107', // Keep standard warning
      danger: '#dc3545', // Keep standard danger
      info: '#17a2b8', // Keep standard info

      // Light/dark variants
      light: config.buttonBg,
      colorDark: config.textColor,

      // Accent and primary variants
      accent: config.focusColor,
      primaryLight: config.focusColor, // Could be adjusted
      primaryDark: config.focusColor, // Could be adjusted

      // UI element colors
      cardBg: config.backgroundColor,
      cardBorder: config.borderColor,
      tableBg: config.tableBodyBg,
      tableBorder: config.tableBorder,
      headerBg: config.tableHeaderBg,

      // Interactive elements
      ghostButtonBorder: config.ghostButtonBorder,
      ghostButtonHoverBg: config.ghostButtonHoverBg,
      focusColor: config.focusColor,
      shadowColor: config.shadowColor,

      // Title and subtitle colors
      titleText: config.textColor,
      subtitleText: config.textMuted,
    }
  };
}

/**
 * Creates a theme that forces widgemo-core defaults (ignoring app theme)
 * Used for demonstration purposes in SimplifiedTest
 */
export function createWidgemoCoreDefaultsTheme(): WidgemoTheme {
  // Return undefined to use widgemo-core defaults
  return {};
}