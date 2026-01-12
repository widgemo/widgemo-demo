import React from 'react';
import { AppliedConfigViewer } from './sandbox/AppliedConfigViewer';

interface AppliedConfigProps {
  config: any;
  adapters: any;
  showConfigDetails?: boolean;
  baseColor?: string;
  renderIcon?: any;
  overrides?: any;
  className?: string;
  style?: any;
  loading?: boolean;
  error?: string | Error;
  autoContrast?: boolean;
  contrastAmount?: number;
  overrideBackground?: string;
  currentSandboxTheme?: any;
  currentIconRenderer?: any;
  customLoading?: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  customError?: React.ComponentType<{ error: string | Error; onRetry?: () => void; className?: string; style?: React.CSSProperties }>;
}

export const AppliedConfig: React.FC<AppliedConfigProps> = ({
  config,
  adapters,
  showConfigDetails,
  baseColor,
  renderIcon,
  overrides,
  className,
  style,
  loading,
  error,
  autoContrast,
  contrastAmount,
  overrideBackground,
  currentSandboxTheme,
  currentIconRenderer,
  customLoading,
  customError,
}) => {
  // Build the effective configuration object
  const resolvedProps = React.useMemo(() => {
    // Helper to truncate large arrays/objects
    const truncateData = (data: any, maxItems = 3): any => {
      if (Array.isArray(data)) {
        if (data.length > maxItems) {
          return [...data.slice(0, maxItems), `... ${data.length - maxItems} more items`];
        }
        return data;
      }
      if (typeof data === 'object' && data !== null) {
        const keys = Object.keys(data);
        if (keys.length > maxItems) {
          const truncated: any = {};
          keys.slice(0, maxItems).forEach(key => {
            truncated[key] = data[key];
          });
          truncated[`... ${keys.length - maxItems} more properties`] = '...';
          return truncated;
        }
      }
      return data;
    };

    const mergedProps: any = {
      // Main configuration
      config: {
        ...config,
        // Add theme info if available - prioritize top-level theme
        theme: currentSandboxTheme || config.theme,
        // Keep styling.themeOverrides for display
        styling: config.styling ? {
          ...config.styling,
          themeOverrides: config.styling.themeOverrides
        } : undefined,
        // Truncate large data for display
        data: config.data ? truncateData(config.data) : undefined
      },
      // Adapters (shown as function references)
      adapters: {
        fetchData: '[Function: fetchData]',
        createRecord: '[Function: createRecord]',
        updateRecord: '[Function: updateRecord]',
        deleteRecord: '[Function: deleteRecord]',
      },
      // Display options
      showConfigDetails,
      baseColor,
      renderIcon: renderIcon ? (currentIconRenderer === renderIcon ? 'Custom renderer (from Icons tab)' : 'FontAwesome renderer') : undefined,
      // Advanced props (only if applied)
      ...(overrides && Object.keys(overrides).length > 0 && { overrides }),
      ...(className && { className }),
      ...(style && { style }),
      ...(loading !== undefined && { loading }),
      ...(error && { error: typeof error === 'string' ? error : error.message }),
      ...(autoContrast !== undefined && { autoContrast }),
      ...(contrastAmount !== undefined && { contrastAmount }),
      ...(overrideBackground && { overrideBackground }),
      ...(customLoading && { customLoading: '[Custom Loading Component]' }),
      ...(customError && { customError: '[Custom Error Component]' }),
    };

    return mergedProps;
  }, [
    config,
    adapters,
    showConfigDetails,
    baseColor,
    renderIcon,
    currentIconRenderer,
    overrides,
    className,
    style,
    loading,
    error,
    autoContrast,
    contrastAmount,
    overrideBackground,
    currentSandboxTheme,
    customLoading,
    customError,
  ]);

  return (
    <AppliedConfigViewer
      resolvedProps={resolvedProps}
      title="Applied Configuration"
      note="This shows the effective, resolved configuration after defaults + overrides + auto-generation. Data adapters are shown as function references for brevity."
    />
  );
};