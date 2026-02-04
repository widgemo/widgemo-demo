import React from 'react';
import { AppliedConfigViewer } from './AppliedConfigViewer';
import type { ResolvedWidgemoProps, LegacyWidgemoConfig, WidgemoAdapters, RenderIcon, WidgemoTheme } from 'widgemo-core';

interface AppliedConfigProps {
  config: LegacyWidgemoConfig;
  adapters: WidgemoAdapters;
  showConfigDetails?: boolean;
  renderIcon?: RenderIcon;
  overrides?: Partial<LegacyWidgemoConfig>;
  className?: string;
  style?: React.CSSProperties;
  loading?: boolean;
  error?: string | Error;
  currentSandboxTheme?: WidgemoTheme | null;
  currentIconRenderer?: RenderIcon;
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
        } : undefined
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