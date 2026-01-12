import { useMemo } from 'react';
import type { WidgemoConfig, WidgemoAdapters, WidgemoTheme, RenderIcon, WidgemoProps } from 'widgemo-core';
import { defaultTheme } from 'widgemo-core';
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
    if (currentSandboxTheme === null) {
      // Use defaults - don't set theme property
      delete props.config.theme;
    } else if (currentSandboxTheme !== undefined) {
      // Override with custom theme
      props.config.theme = currentSandboxTheme;
    }
    // If currentSandboxTheme is undefined, keep config.theme as-is

    // Add theme-related props
    // Note: Theme is applied via CSS variables to container, not passed as prop to Widgemo
    // if (currentSandboxTheme) {
    //   props.theme = currentSandboxTheme;
    // }

    // Add icon renderer if available
    if (currentIconRenderer) {
      props.renderIcon = currentIconRenderer;
    }

    // Add showConfigDetails if enabled
    if (showConfigDetails) {
      props.showConfigDetails = showConfigDetails;
    }

    // Add base color from theme
    const baseColor = getThemeBackgroundColor(currentTheme);
    if (baseColor) {
      props.baseColor = baseColor;
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

      // Base color override
      if (appliedBaseColor?.trim()) {
        props.baseColor = appliedBaseColor;
      }

      // Background override
      if (appliedOverrideBackground?.trim()) {
        props.overrideBackground = appliedOverrideBackground;
      }

      // Auto contrast (only if different from default)
      if (appliedAutoContrast !== undefined && appliedAutoContrast !== true) {
        props.autoContrast = appliedAutoContrast;
      }

      // Contrast amount (only if different from default 0.05)
      if (appliedContrastAmount !== undefined && Math.abs(appliedContrastAmount - 0.05) > 0.001) {
        props.contrastAmount = appliedContrastAmount;
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
    applyAdvancedProps,
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
  ]);

  // Memoize resolved theme from config
  const resolvedTheme = useMemo(() => 
    config.theme ?? config.styling?.themeOverrides ?? defaultTheme,
    [config.theme, config.styling?.themeOverrides]
  );

  // Memoize resolved dark mode
  const resolvedDark = useMemo(() => {
    if (resolvedTheme.autoDetect) {
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return resolvedTheme.dark ?? false;
  }, [resolvedTheme.autoDetect, resolvedTheme.dark]);

  return {
    mergedProps,
    resolvedTheme,
    resolvedDark,
    effectiveRenderIcon: currentIconRenderer,
  };
};