import React, { useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { Widgemo } from 'widgemo-core';
import type { WidgemoConfig, WidgemoAdapters } from 'widgemo-core';
import { applyThemeToElement } from 'widgemo-core';
import { getThemeBackgroundColor } from '../../utils/themeUtils';
import { AppliedConfig } from '../AppliedConfig';

interface PreviewPanelProps {
  // Configuration
  config: WidgemoConfig;
  adapters: WidgemoAdapters;
  showConfigDetails?: boolean;

  // Theme and styling
  currentTheme: string;
  currentSandboxTheme?: any;
  currentIconRenderer?: any;

  // Size controls
  width: number;
  height: number;
  isAutoWidth: boolean;
  isAutoHeight: boolean;
  onWidthChange: (width: number) => void;
  onHeightChange: (height: number) => void;
  onAutoWidthChange: (auto: boolean) => void;
  onAutoHeightChange: (auto: boolean) => void;

  // Advanced props
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
  customLoadingComponent?: () => React.ReactElement;
  customErrorComponent?: (error: string) => React.ReactElement;
}

export const PreviewPanel: React.FC<PreviewPanelProps> = ({
  config,
  adapters,
  showConfigDetails,
  currentTheme,
  currentSandboxTheme,
  currentIconRenderer,
  width,
  height,
  isAutoWidth,
  isAutoHeight,
  onWidthChange,
  onHeightChange,
  onAutoWidthChange,
  onAutoHeightChange,
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
}) => {
  const previewRef = React.useRef<HTMLDivElement>(null);

  // Apply custom theme to preview container
  useEffect(() => {
    if (previewRef.current && currentSandboxTheme) {
      applyThemeToElement(previewRef.current, currentSandboxTheme);
    }
  }, [currentSandboxTheme]);

  return (
    <div className="p-4 h-100">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0">Live Preview</h5>
        <div className="d-flex align-items-center gap-3">
          <Form.Check
            type="checkbox"
            label="Auto width"
            checked={isAutoWidth}
            onChange={(e) => onAutoWidthChange(e.target.checked)}
          />
          <Form.Check
            type="checkbox"
            label="Auto height"
            checked={isAutoHeight}
            onChange={(e) => onAutoHeightChange(e.target.checked)}
          />
          <div className="d-flex gap-2 ms-3">
            {!isAutoWidth && (
              <div className="d-flex align-items-center gap-2">
                <Form.Label className="mb-0" style={{ width: '80px' }}>Width (px)</Form.Label>
                <Form.Control
                  type="number"
                  value={width}
                  onChange={(e) => onWidthChange(Number(e.target.value))}
                  min="100"
                  max="1200"
                  size="sm"
                  style={{width: '70px'}}
                />
              </div>
            )}
            {!isAutoHeight && (
              <div className="d-flex align-items-center gap-2">
                <Form.Label className="mb-0" style={{ width: '80px' }}>Height (px)</Form.Label>
                <Form.Control
                  type="number"
                  value={height}
                  onChange={(e) => onHeightChange(Number(e.target.value))}
                  min="100"
                  max="800"
                  size="sm"
                  style={{width: '70px'}}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <div
        ref={previewRef}
        style={{
          ...(isAutoHeight ? { maxHeight: 'calc(100vh - 300px)' } : { height: `${height}px` }),
          overflow: 'auto',
          padding: '8px',
          width: isAutoWidth ? 'auto' : `${width}px`
        }}
      >
        <Widgemo
          config={config}
          adapters={adapters}
          showConfigDetails={showConfigDetails}
          baseColor={getThemeBackgroundColor(currentTheme)}
          renderIcon={currentIconRenderer}
          {...((appliedLoading || customLoadingComponent) && { loading: appliedLoading || !!customLoadingComponent })}
          {...((appliedError || customErrorComponent) && { error: appliedError || (customErrorComponent ? 'Custom error' : '') })}
          {...(customLoadingComponent && { loadingComponent: customLoadingComponent })}
          {...(customErrorComponent && { errorComponent: customErrorComponent })}
          {...(applyAdvancedProps && {
            ...(Object.keys(appliedOverrides || {}).length > 0 && { overrides: appliedOverrides }),
            ...(appliedClassName && { className: appliedClassName }),
            ...(appliedStyleJson?.trim() && { style: JSON.parse(appliedStyleJson) }),
            ...(appliedBaseColor && { baseColor: appliedBaseColor }),
            ...(appliedOverrideBackground && { overrideBackground: appliedOverrideBackground }),
            ...(appliedAutoContrast !== true && { autoContrast: appliedAutoContrast }),
            ...(appliedContrastAmount !== undefined && Math.abs(appliedContrastAmount - 0.05) > 0.001 && { contrastAmount: appliedContrastAmount }),
          })}
        />
      </div>
      <AppliedConfig
        config={config}
        adapters={adapters}
        showConfigDetails={showConfigDetails}
        baseColor={getThemeBackgroundColor(currentTheme)}
        renderIcon={currentIconRenderer}
        loading={appliedLoading}
        error={appliedError}
        overrides={applyAdvancedProps && Object.keys(appliedOverrides || {}).length > 0 ? appliedOverrides : undefined}
        className={applyAdvancedProps && appliedClassName ? appliedClassName : undefined}
        style={applyAdvancedProps && appliedStyleJson?.trim() ? JSON.parse(appliedStyleJson) : undefined}
        autoContrast={applyAdvancedProps && appliedAutoContrast !== true ? appliedAutoContrast : undefined}
        contrastAmount={applyAdvancedProps && appliedContrastAmount !== undefined && Math.abs(appliedContrastAmount - 0.05) > 0.001 ? appliedContrastAmount : undefined}
        overrideBackground={applyAdvancedProps ? appliedOverrideBackground : undefined}
        currentSandboxTheme={currentSandboxTheme}
        currentIconRenderer={currentIconRenderer}
      />
    </div>
  );
};