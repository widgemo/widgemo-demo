import type { LegacyWidgemoConfig } from 'widgemo-core';

// Utility functions for theme management
export const mergeThemeIntoConfig = (config: LegacyWidgemoConfig, _demoTheme: string): LegacyWidgemoConfig => {
  // Convert demo theme format to Widgemo theme format using dark and autoDetect booleans
  // Note: dark and autoDetect are no longer used in the new theme system

  return {
    ...config,
    theme: {
      ...config.theme,
      // dark: isDark, // Removed - using CSS variables for theming
      // autoDetect: autoDetect // Removed - using CSS variables for theming
    }
  };
};

// Get theme background color for dynamicBackground feature
// (re-exported from themeConfig for backward compatibility)
// Note: These functions were removed during cleanup to use CSS variables instead
// export { getThemeBackgroundColor, getThemeBorderColor } from './themeConfig';