import React from 'react';
import { AppliedConfigViewer } from './sandbox/AppliedConfigViewer';
import type { ResolvedWidgemoProps } from 'widgemo-core';

interface AppliedConfigProps {
  config: any;
  adapters: any;
  showConfigDetails?: boolean;
  renderIcon?: any;
  overrides?: any;
  className?: string;
  style?: any;
  loading?: boolean;
  error?: string | Error;
  currentSandboxTheme?: any;
  currentIconRenderer?: any;
  customLoading?: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  customError?: React.ComponentType<{ error: string | Error; onRetry?: () => void; className?: string; style?: React.CSSProperties }>;
  resolvedConfig?: ResolvedWidgemoProps | null;
}

export function AppliedConfig(props: AppliedConfigProps) {
  const { config, showConfigDetails, renderIcon, overrides, className, style, loading, error, currentSandboxTheme, currentIconRenderer, customLoading, customError, resolvedConfig } = props;
  // Build the effective configuration object
  let resolvedProps;
  if (resolvedConfig) {
    resolvedProps = {
      ...resolvedConfig,
      adapters: {
        fetchData: '[Function: fetchData]',
        createRecord: '[Function: createRecord]',
        updateRecord: '[Function: updateRecord]',
        deleteRecord: '[Function: deleteRecord]',
      },
      ...(showConfigDetails && { showConfigDetails }),
      ...(renderIcon && { renderIcon: currentIconRenderer === renderIcon ? 'Custom renderer (from Icons tab)' : 'FontAwesome renderer' }),
      ...(overrides && Object.keys(overrides).length > 0 && { overrides }),
      ...(className && { className }),
      ...(style && { style }),
      ...(loading !== undefined && { loading }),
      ...(error && { error: typeof error === 'string' ? error : error.message }),
      ...(customLoading && { customLoading: '[Custom Loading Component]' }),
      ...(customError && { customError: '[Custom Error Component]' }),
    };
  } else {
    // Fallback
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

    // Build theme with baseColor included
    const effectiveTheme = currentSandboxTheme === null ? undefined :
      currentSandboxTheme !== undefined ? currentSandboxTheme :
      config.theme ? config.theme : undefined;

    resolvedProps = {
      config: {
        ...config,
        ...(effectiveTheme && { theme: effectiveTheme }),
        styling: config.styling ? {
          ...config.styling,
          themeOverrides: config.styling.themeOverrides
        } : undefined,
        data: config.data ? truncateData(config.data) : undefined
      },
      adapters: {
        fetchData: '[Function: fetchData]',
        createRecord: '[Function: createRecord]',
        updateRecord: '[Function: updateRecord]',
        deleteRecord: '[Function: deleteRecord]',
      },
      showConfigDetails,
      renderIcon: renderIcon ? (currentIconRenderer === renderIcon ? 'Custom renderer (from Icons tab)' : 'FontAwesome renderer') : undefined,
      ...(overrides && Object.keys(overrides).length > 0 && { overrides }),
      ...(className && { className }),
      ...(style && { style }),
      ...(loading !== undefined && { loading }),
      ...(error && { error: typeof error === 'string' ? error : error.message }),
      ...(customLoading && { customLoading: '[Custom Loading Component]' }),
      ...(customError && { customError: '[Custom Error Component]' }),
    };
  }

  return (
    <AppliedConfigViewer
      resolvedProps={resolvedProps}
      note={resolvedConfig ? "This shows the actual resolved configuration from Widgemo's onResolvedProps callback (excludes data for privacy). Data adapters are shown as function references for brevity." : "This shows the effective, resolved configuration after defaults + overrides + auto-generation. Data adapters are shown as function references for brevity."}
    />
  );
};