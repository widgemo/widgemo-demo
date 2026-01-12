import React from 'react';
import { Button, Alert } from 'react-bootstrap';
import { JsonConfigTab } from './JsonConfigTab';
import { ThemingTab } from './ThemingTab';
import { PropsOverridesTab } from './PropsOverridesTab';
import { IconsTab } from './IconsTab';
import { SampleDataTab } from './SampleDataTab';
import { LoadingStatesTab } from './LoadingStatesTab';
import type { WidgemoTheme } from 'widgemo-core';

interface PresetOption {
  name: string;
  config: any;
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
  onLoadPreset: (presetConfig: any, presetName?: string) => void;
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

  // ThemingTab props
  themeMode: 'defaults' | 'config' | 'custom';
  primaryColor: string;
  customTheme: Partial<WidgemoTheme>;
  darkMode: boolean;
  configTheme?: Partial<WidgemoTheme>;
  onThemeModeChange: (mode: 'defaults' | 'config' | 'custom') => void;
  onPrimaryColorChange: (color: string) => void;
  onCustomThemeChange: (theme: Partial<WidgemoTheme>) => void;
  onDarkModeChange: (dark: boolean) => void;
  onApplyTheme: () => void;

  // IconsTab props
  iconLibrary: 'none' | 'react-icons' | 'lucide' | 'heroicons';
  onIconLibraryChange: (library: 'none' | 'react-icons' | 'lucide' | 'heroicons') => void;

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
  useCustomLoading: boolean;
  onUseCustomLoadingChange: (value: boolean) => void;
  useCustomError: boolean;
  onUseCustomErrorChange: (value: boolean) => void;
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
  // ThemingTab props
  themeMode,
  primaryColor,
  customTheme,
  darkMode,
  configTheme,
  onThemeModeChange,
  onPrimaryColorChange,
  onCustomThemeChange,
  onDarkModeChange,
  onApplyTheme,
  // IconsTab props
  iconLibrary,
  onIconLibraryChange,
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
  useCustomLoading,
  onUseCustomLoadingChange,
  useCustomError,
  onUseCustomErrorChange,
}) => {
  const tabs = [
    { id: 'config-editor', label: 'Config Editor' },
    { id: 'advanced-properties', label: 'Advanced Properties' },
    { id: 'theming', label: 'Theming' },
    { id: 'icons', label: 'Icons' },
    { id: 'sample-data', label: 'Sample Data' },
    { id: 'loading-states', label: 'Loading & States' },
  ];

  return (
    <div className="p-4 h-100 d-flex flex-column">
      {/* Export Status */}
      {exportStatus && (
        <Alert variant={exportStatus.includes('Error') ? 'danger' : 'success'} className="py-2 mb-3">
          {exportStatus}
        </Alert>
      )}

      <div className="mb-3">
        <div className="btn-group w-100" role="tablist">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? 'primary' : 'outline-primary'}
              onClick={() => onTabChange(tab.id)}
              className="rounded-0"
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls={`tabpanel-${tab.id}`}
              id={`tab-${tab.id}`}
            >
              {tab.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex-grow-1" role="tabpanel" aria-labelledby={`tab-${activeTab}`}>
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

        {activeTab === 'advanced-properties' && (
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
        )}

        {activeTab === 'theming' && (
          <ThemingTab
            themeMode={themeMode}
            primaryColor={primaryColor}
            customTheme={customTheme}
            darkMode={darkMode}
            configTheme={configTheme}
            onThemeModeChange={onThemeModeChange}
            onPrimaryColorChange={onPrimaryColorChange}
            onCustomThemeChange={onCustomThemeChange}
            onDarkModeChange={onDarkModeChange}
            onApplyTheme={onApplyTheme}
          />
        )}

        {activeTab === 'icons' && (
          <IconsTab
            iconLibrary={iconLibrary}
            onIconLibraryChange={onIconLibraryChange}
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

        {activeTab === 'loading-states' && (
          <LoadingStatesTab
            showLoading={showLoading}
            onShowLoadingChange={onShowLoadingChange}
            errorMessage={errorMessage}
            onErrorMessageChange={onErrorMessageChange}
            onApplyChanges={onApplyChanges}
            useCustomLoading={useCustomLoading}
            onUseCustomLoadingChange={onUseCustomLoadingChange}
            useCustomError={useCustomError}
            onUseCustomErrorChange={onUseCustomErrorChange}
          />
        )}
      </div>
    </div>
  );
};