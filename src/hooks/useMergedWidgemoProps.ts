import { useMemo, useState, useEffect } from 'react';
import type { WidgemoConfig, WidgemoAdapters, WidgemoTheme, RenderIcon, WidgemoProps, ResolvedWidgemoProps } from 'widgemo-core';
import { getThemeBackgroundColor } from '../utils/themeUtils';

interface UseMergedWidgemoPropsInput {
  // Core configuration
  config: WidgemoConfig;
  adapters: WidgemoAdapters;

  // Theme and styling
  currentTheme: string;
  currentSandboxTheme?: Partial<WidgemoTheme> | null;
  currentIconRenderer?: RenderIcon;

  // Advanced props (applied state)
  applyAdvancedProps?: boolean;
  appliedOverrides?: Partial<WidgemoConfig>;
  appliedClassName?: string;
  appliedStyleJson?: string;
  appliedLoading?: boolean;
  appliedError?: string | Error;
  appliedBaseColor?: string;
  appliedOverrideBackground?: string;
  appliedAutoContrast?: boolean;
  appliedContrastAmount?: number;

  // Custom components
  customLoadingComponent?: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  customErrorComponent?: React.ComponentType<{
    error: string | Error;
    onRetry?: () => void;
    className?: string;
    style?: React.CSSProperties;
  }>;

  // Other options
  showConfigDetails?: boolean;
  onResolvedProps?: (resolved: ResolvedWidgemoProps) => void;
}

interface UseMergedWidgemoPropsOutput {
  /** Final merged props object ready to pass to <Widgemo /> */
  mergedProps: Omit<WidgemoProps, 'config' | 'adapters'> & {
    config: WidgemoConfig;
    adapters: WidgemoAdapters;
  };
  /** Resolved theme object (for debugging/display) */
  resolvedTheme?: Partial<WidgemoTheme>;
  /** Resolved dark mode state */
  resolvedDark?: boolean;
  /** Effective renderIcon function (for debugging/display) */
  effectiveRenderIcon?: RenderIcon;
}

/**
 * Custom hook that computes the final merged props for the Widgemo component.
 *
 * This hook centralizes all the complex logic for merging:
 * - Base configuration with user overrides
 * - Theme settings with automatic palette generation
 * - Icon renderer selection
 * - Advanced props (loading, error, styling overrides)
 * - Custom components
 *
 * The hook ensures consistent prop merging across PreviewPanel and AppliedConfigViewer.
 *
 * @param input - All the inputs needed to compute the final props
 * @returns Object containing mergedProps and optional debugging info
 *
 * @example
 * ```tsx
 * const { mergedProps } = useMergedWidgemoProps({
 *   config,
 *   adapters,
 *   currentTheme,
 *   currentSandboxTheme,
 *   currentIconRenderer,
 *   applyAdvancedProps: true,
 *   appliedOverrides,
 *   // ... other props
 * });
 *
 * return <Widgemo {...mergedProps} />;
 * ```
 */
export const useMergedWidgemoProps = (input: UseMergedWidgemoPropsInput): UseMergedWidgemoPropsOutput => {
  const {
    config,
    adapters,
    currentTheme,
    currentSandboxTheme,
    currentIconRenderer,
    applyAdvancedProps = false,
    appliedOverrides,
    appliedClassName,
    appliedStyleJson,
    appliedLoading,
    appliedError,
    appliedBaseColor,
    appliedOverrideBackground,
    appliedAutoContrast,
    appliedContrastAmount,
    customLoadingComponent,
    customErrorComponent,
    showConfigDetails,
    onResolvedProps,
  } = input;

  const mergedProps = useMemo(() => {
    // Start with the core required props
    const props: Omit<WidgemoProps, 'config' | 'adapters'> & {
      config: WidgemoConfig;
      adapters: WidgemoAdapters;
    } = {
      config: { ...config }, // Start with base config
      adapters,
    };

    // Apply theme based on currentSandboxTheme
    // - null: Use defaults (don't set theme)
    // - undefined: Use config.theme as-is (don't override)
    // - object: Override with the provided theme
    let themeToApply = currentSandboxTheme;
    
    if (applyAdvancedProps) {
      // Merge applied theme props into the theme
      const appliedThemeProps: Partial<WidgemoTheme> = {};
      
      // For 'config' mode, don't include default baseColor to preserve config.theme.baseColor
      if (currentSandboxTheme !== undefined) {
        // Always set baseColor from current theme for non-config modes
        const baseColorFromTheme = getThemeBackgroundColor(currentTheme);
        if (baseColorFromTheme) {
          appliedThemeProps.baseColor = baseColorFromTheme;
        }
      }
      
      if (appliedBaseColor?.trim()) {
        appliedThemeProps.baseColor = appliedBaseColor;
      }
      if (appliedOverrideBackground?.trim()) {
        appliedThemeProps.overrideBackground = appliedOverrideBackground;
      }
      if (appliedAutoContrast !== undefined) {
        appliedThemeProps.autoContrast = appliedAutoContrast;
      }
      if (appliedContrastAmount !== undefined) {
        appliedThemeProps.contrastAmount = appliedContrastAmount;
      }
      
      // For 'config' mode, merge applied props with config.theme
      // For other modes, merge with currentSandboxTheme
      if (currentSandboxTheme === undefined) {
        // 'config' mode: use config.theme as base
        themeToApply = { ...config.theme, ...appliedThemeProps };
      } else {
        // Other modes: use currentSandboxTheme as base
        themeToApply = { ...currentSandboxTheme, ...appliedThemeProps };
      }
    } else {
      // Even without advanced props, include baseColor
      const baseColorFromTheme = getThemeBackgroundColor(currentTheme);
      if (baseColorFromTheme) {
        if (currentSandboxTheme === undefined) {
          // 'config' mode: merge baseColor with config.theme only if not already present
          themeToApply = { baseColor: baseColorFromTheme, ...config.theme };
        } else {
          // Other modes: merge baseColor with currentSandboxTheme
          themeToApply = { ...currentSandboxTheme, baseColor: baseColorFromTheme };
        }
      }
    }

    if (themeToApply === null) {
      // Use defaults - don't set theme property
      delete props.config.theme;
    } else if (themeToApply !== undefined) {
      // Override with custom theme
      props.config.theme = themeToApply;
    }
    // Note: themeToApply is never undefined now due to the logic above

    // Add icon renderer if available
    if (currentIconRenderer) {
      props.renderIcon = currentIconRenderer;
    }

    // Add showConfigDetails if enabled
    if (showConfigDetails) {
      props.showConfigDetails = showConfigDetails;
    }

    // Add onResolvedProps if provided
    if (onResolvedProps) {
      props.onResolvedProps = onResolvedProps;
    }

    // Handle loading states
    const hasLoading = appliedLoading || !!customLoadingComponent;
    if (hasLoading) {
      props.loading = appliedLoading || !!customLoadingComponent;
    }

    // Handle error states
    if (appliedError) {
      props.error = appliedError;
    }

    // Add custom components
    if (customLoadingComponent) {
      props.customLoading = customLoadingComponent;
    }
    if (customErrorComponent) {
      props.customError = customErrorComponent;
    }

    // Apply advanced props if enabled
    if (applyAdvancedProps) {
      // Config overrides
      if (appliedOverrides && Object.keys(appliedOverrides).length > 0) {
        props.overrides = appliedOverrides;
      }

      // Class name
      if (appliedClassName?.trim()) {
        props.className = appliedClassName;
      }

      // Style object (parse from JSON string)
      if (appliedStyleJson?.trim()) {
        try {
          props.style = JSON.parse(appliedStyleJson);
        } catch (error) {
          console.warn('Failed to parse style JSON:', error);
        }
      }
    }

    return props;
  }, [
    config,
    adapters,
    currentTheme,
    currentSandboxTheme,
    currentIconRenderer,
    showConfigDetails,
    onResolvedProps,
    applyAdvancedProps,
    appliedOverrides,
    appliedClassName,
    appliedStyleJson,
    appliedLoading,
    appliedError,
    customLoadingComponent,
    customErrorComponent,
  ]);

  // Memoize resolved theme from config
  const resolvedTheme = useMemo(() => 
    config.theme ?? config.styling?.themeOverrides ?? {},
    [config.theme, config.styling?.themeOverrides]
  );

  // Track system dark mode preference
  const [systemDark, setSystemDark] = useState(() => 
    window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)').matches : false
  );

  useEffect(() => {
    if (!window.matchMedia) return;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => setSystemDark(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Memoize resolved dark mode
  const resolvedDark = useMemo(() => {
    if (resolvedTheme.dark !== undefined) {
      return resolvedTheme.dark;
    }
    if (resolvedTheme.autoDetect) {
      return systemDark;
    }
    return false;
  }, [resolvedTheme.autoDetect, resolvedTheme.dark, systemDark]);

  return {
    mergedProps,
    resolvedTheme,
    resolvedDark,
    effectiveRenderIcon: currentIconRenderer,
  };
};