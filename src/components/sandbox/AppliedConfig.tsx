import React from 'react';
import { AppliedConfigViewer } from './AppliedConfigViewer';
import type { WidgemoProps, WidgemoConfig, WidgemoAdapters, WidgemoTheme } from '@widgemo/widgemo-core';

type ResolvedConfigSnapshot = WidgemoProps & {
  adapters?: WidgemoAdapters;
};

interface AppliedConfigProps {
  config: WidgemoConfig;
  adapters: WidgemoAdapters;
  showConfigDetails?: boolean;
  overrides?: Partial<WidgemoConfig>;
  className?: string;
  style?: React.CSSProperties;
  loading?: boolean;
  error?: string | Error;
  currentSandboxTheme?: WidgemoTheme | null;
  customLoading?: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  customError?: React.ComponentType<{ error: string | Error; onRetry?: () => void; className?: string; style?: React.CSSProperties }>;
  resolvedConfig?: ResolvedConfigSnapshot | null;
}

export function AppliedConfig(props: AppliedConfigProps) {
  const { config, showConfigDetails, overrides, className, style, loading, error, currentSandboxTheme, customLoading, customError, resolvedConfig } = props;
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
      (config as any).theme ? (config as any).theme : undefined;

    resolvedProps = {
      config: {
        ...config,
        ...(effectiveTheme && { theme: effectiveTheme }),
        styling: (config as any).styling ? {
          ...(config as any).styling,
          themeOverrides: (config as any).styling.themeOverrides
        } : undefined
      },
      adapters: {
        fetchData: '[Function: fetchData]',
        createRecord: '[Function: createRecord]',
        updateRecord: '[Function: updateRecord]',
        deleteRecord: '[Function: deleteRecord]',
      },
      showConfigDetails,
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