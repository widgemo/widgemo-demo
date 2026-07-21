import React from 'react';
import { Alert, Nav, Form } from 'react-bootstrap';
import { JsonConfigTab } from './JsonConfigTab';
import { PropsOverridesTab } from './PropsOverridesTab';
import { SampleDataTab } from './SampleDataTab';
import { LoadingStatesTab } from './LoadingStatesTab';
import type { WidgemoConfig } from '@widgemo/widgemo-core';

interface PresetOption {
  name: string;
  config: WidgemoConfig;
}

export interface LeftPanelProps {
  // Tab state
  activeTab: string;
  onTabChange: (tab: string) => void;

  // Export status
  exportStatus: string | null;

  // JsonConfigTab props
  currentJson: string;
  onJsonChange: (json: string) => void;
  onApplyJson: () => void;
  presets: PresetOption[];
  onLoadPreset: (presetConfig: WidgemoConfig, presetName?: string) => void;
  jsonError: string | null;
  onShowReference: () => void;
  onShowCodeSandbox: () => void;
  onCopyToClipboard: () => void;
  onDownloadConfig: () => void;

  // PropsOverridesTab props
  overridesJson: string;
  onOverridesJsonChange: (value: string) => void;
  className: string;
  onClassNameChange: (value: string) => void;
  styleJson: string;
  onStyleJsonChange: (value: string) => void;
  overrideBaseColorEnabled: boolean;
  onOverrideBaseColorEnabledChange: (value: boolean) => void;
  baseColor: string;
  onBaseColorChange: (value: string) => void;
  overrideBackgroundEnabled: boolean;
  onOverrideBackgroundEnabledChange: (value: boolean) => void;
  overrideBackground: string;
  onOverrideBackgroundChange: (value: string) => void;
  autoContrast: boolean;
  onAutoContrastChange: (value: boolean) => void;
  contrastAmount: number;
  onContrastAmountChange: (value: number) => void;
  showConfigDetails: boolean;
  onShowConfigDetailsChange: (value: boolean) => void;
  onApplyAdvancedProperties: () => void;
  onResetAll: () => void;

  // SampleDataTab props
  currentData: Record<string, unknown>[];
  jsonEditorText: string;
  onJsonEditorTextChange: (text: string) => void;
  entityLabelPlural: string;
  onGenerateClick: () => void;
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSaveChanges: () => void;

  // LoadingStatesTab props
  showLoading: boolean;
  onShowLoadingChange: (value: boolean) => void;
  errorMessage: string;
  onErrorMessageChange: (value: string) => void;
  onApplyChanges: () => void;

  // Preview controls (moved from preview header)
  showDevOverlay: boolean;
  onShowDevOverlayChange: (value: boolean) => void;
  isAutoWidth: boolean;
  onAutoWidthChange: (value: boolean) => void;
  isAutoHeight: boolean;
  onAutoHeightChange: (value: boolean) => void;
  width: number;
  onWidthChange: (value: number) => void;
  height: number;
  onHeightChange: (value: number) => void;
}

export const LeftPanel: React.FC<LeftPanelProps> = ({
  activeTab,
  onTabChange,
  exportStatus,
  // JsonConfigTab props
  currentJson,
  onJsonChange,
  onApplyJson,
  presets,
  onLoadPreset,
  jsonError,
  onShowReference,
  onShowCodeSandbox,
  onCopyToClipboard,
  onDownloadConfig,
  // PropsOverridesTab props
  overridesJson,
  onOverridesJsonChange,
  className,
  onClassNameChange,
  styleJson,
  onStyleJsonChange,
  overrideBaseColorEnabled,
  onOverrideBaseColorEnabledChange,
  baseColor,
  onBaseColorChange,
  overrideBackgroundEnabled,
  onOverrideBackgroundEnabledChange,
  overrideBackground,
  onOverrideBackgroundChange,
  autoContrast,
  onAutoContrastChange,
  contrastAmount,
  onContrastAmountChange,
  showConfigDetails,
  onShowConfigDetailsChange,
  onApplyAdvancedProperties,
  onResetAll,
  // SampleDataTab props
  currentData,
  jsonEditorText,
  onJsonEditorTextChange,
  entityLabelPlural,
  onGenerateClick,
  onFileUpload,
  onSaveChanges,
  // LoadingStatesTab props
  showLoading,
  onShowLoadingChange,
  errorMessage,
  onErrorMessageChange,
  onApplyChanges,
  showDevOverlay,
  onShowDevOverlayChange,
  isAutoWidth,
  onAutoWidthChange,
  isAutoHeight,
  onAutoHeightChange,
  width,
  onWidthChange,
  height,
  onHeightChange,
}) => {
  const tabs = [
    { id: 'config-editor', label: 'Configuration' },
    { id: 'sample-data', label: 'Sample Data' },
    { id: 'advanced', label: 'Advanced' },
  ];

  return (
    <div className="p-3 h-100 d-flex flex-column" >
      <style>
        {`
          .left-panel-content * {
            max-width: 100% !important;
            box-sizing: border-box !important;
          }
          .left-panel-content .form-control,
          .left-panel-content .form-select,
          .left-panel-content textarea,
          .left-panel-content input {
            word-wrap: break-word !important;
            overflow-wrap: break-word !important;
          }
          .left-panel-tabs .nav-link {
            background-color: transparent !important;
            border: none !important;
            box-shadow: none !important;
          }
          .left-panel-tabs .nav-link.active {
            background-color: transparent !important;
            color: #fff !important;
            box-shadow: none !important;
          }
          .left-panel-tabs .nav-link:hover {
            background-color: rgba(255, 255, 255, 0.1) !important;
          }
        `}
      </style>
      {/* Export Status */}
      {exportStatus && (
        <Alert variant={exportStatus.includes('Error') ? 'danger' : 'success'} className="py-2 mb-3">
          {exportStatus}
        </Alert>
      )}

      <div className="mb-3 flex-shrink-0">
        <div className="bg-dark rounded" style={{ padding: '2px' }}>
          <Nav className="bg-dark rounded px-1 left-panel-tabs" role="tablist">
            {tabs.map((tab) => (
              <Nav.Link
                key={tab.id}
                active={activeTab === tab.id}
                onClick={() => onTabChange(tab.id)}
                className="text-nowrap mx-1"
                style={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  fontSize: '0.875rem',
                  padding: '6px 12px',
                  color: activeTab === tab.id ? '#fff' : '#adb5bd',
                  backgroundColor: activeTab === tab.id ? 'transparent' : 'transparent',
                  border: 'none',
                  transition: 'all 0.15s ease-in-out'
                }}
                onMouseEnter={(e) => {
                  if (activeTab !== tab.id) {
                    e.currentTarget.style.color = '#fff';
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== tab.id) {
                    e.currentTarget.style.color = '#adb5bd';
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
                role="tab"
                aria-selected={activeTab === tab.id}
                aria-controls={`tabpanel-${tab.id}`}
                id={`tab-${tab.id}`}
              >
                {tab.label}
              </Nav.Link>
            ))}
          </Nav>
        </div>
      </div>

      <div className="flex-grow-1 overflow-hidden left-panel-content" role="tabpanel" aria-labelledby={`tab-${activeTab}`} style={{ maxWidth: '100%' }}>
        {activeTab === 'config-editor' && (
          <JsonConfigTab
            currentJson={currentJson}
            onJsonChange={onJsonChange}
            onApply={onApplyJson}
            presets={presets}
            onLoadPreset={onLoadPreset}
            jsonError={jsonError}
            onShowReference={onShowReference}
            onShowCodeSandbox={onShowCodeSandbox}
            onCopyToClipboard={onCopyToClipboard}
            onDownloadConfig={onDownloadConfig}
          />
        )}

        {activeTab === 'sample-data' && (
          <SampleDataTab
            currentData={currentData}
            jsonEditorText={jsonEditorText}
            onJsonEditorTextChange={onJsonEditorTextChange}
            entityLabelPlural={entityLabelPlural}
            onGenerateClick={onGenerateClick}
            onFileUpload={onFileUpload}
            onSaveChanges={onSaveChanges}
          />
        )}

        {activeTab === 'advanced' && (
          <div className="h-100 overflow-auto pe-1">
            <div className="mb-3 p-2 border rounded">
              <h6 className="mb-2">Preview Controls</h6>
              <div className="d-flex flex-column gap-2">
                <Form.Check
                  type="checkbox"
                  label="Show Dev Overlay"
                  checked={showDevOverlay}
                  onChange={(event) => onShowDevOverlayChange(event.target.checked)}
                />
                <Form.Check
                  type="checkbox"
                  label="Auto width"
                  checked={isAutoWidth}
                  onChange={(event) => onAutoWidthChange(event.target.checked)}
                />
                {!isAutoWidth && (
                  <div className="d-flex align-items-center gap-2">
                    <Form.Label className="mb-0" style={{ width: '72px' }}>Width</Form.Label>
                    <Form.Control
                      type="number"
                      size="sm"
                      min="100"
                      max="1200"
                      value={width}
                      onChange={(event) => onWidthChange(Number(event.target.value))}
                    />
                  </div>
                )}
                <Form.Check
                  type="checkbox"
                  label="Auto height"
                  checked={isAutoHeight}
                  onChange={(event) => onAutoHeightChange(event.target.checked)}
                />
                {!isAutoHeight && (
                  <div className="d-flex align-items-center gap-2">
                    <Form.Label className="mb-0" style={{ width: '72px' }}>Height</Form.Label>
                    <Form.Control
                      type="number"
                      size="sm"
                      min="100"
                      max="800"
                      value={height}
                      onChange={(event) => onHeightChange(Number(event.target.value))}
                    />
                  </div>
                )}
              </div>
            </div>

            <details className="mb-3" open>
              <summary className="fw-semibold" style={{ cursor: 'pointer' }}>Loading & Error Testing</summary>
              <div className="mt-2 border rounded p-2">
                <LoadingStatesTab
                  showLoading={showLoading}
                  onShowLoadingChange={onShowLoadingChange}
                  errorMessage={errorMessage}
                  onErrorMessageChange={onErrorMessageChange}
                  onApplyChanges={onApplyChanges}
                />
              </div>
            </details>

            <details>
              <summary className="fw-semibold" style={{ cursor: 'pointer' }}>Configuration Overrides</summary>
              <div className="mt-2 border rounded p-2">
                <PropsOverridesTab
                  overridesJson={overridesJson}
                  onOverridesJsonChange={onOverridesJsonChange}
                  className={className}
                  onClassNameChange={onClassNameChange}
                  styleJson={styleJson}
                  onStyleJsonChange={onStyleJsonChange}
                  overrideBaseColorEnabled={overrideBaseColorEnabled}
                  onOverrideBaseColorEnabledChange={onOverrideBaseColorEnabledChange}
                  baseColor={baseColor}
                  onBaseColorChange={onBaseColorChange}
                  overrideBackgroundEnabled={overrideBackgroundEnabled}
                  onOverrideBackgroundEnabledChange={onOverrideBackgroundEnabledChange}
                  overrideBackground={overrideBackground}
                  onOverrideBackgroundChange={onOverrideBackgroundChange}
                  autoContrast={autoContrast}
                  onAutoContrastChange={onAutoContrastChange}
                  contrastAmount={contrastAmount}
                  onContrastAmountChange={onContrastAmountChange}
                  showConfigDetails={showConfigDetails}
                  onShowConfigDetailsChange={onShowConfigDetailsChange}
                  onApplyAdvancedProperties={onApplyAdvancedProperties}
                  onResetAll={onResetAll}
                />
              </div>
            </details>
          </div>
        )}
      </div>
    </div>
  );
};