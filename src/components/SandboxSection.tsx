import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { Card } from 'react-bootstrap';
import { Panel, Group, Separator } from 'react-resizable-panels';
import { FaCopy } from 'react-icons/fa';
import type { WidgemoConfig } from '@widgemo/widgemo-core';
import widgemoExamples from '../data/widgemoExamples';
import { PreviewPanel } from './sandbox/PreviewPanel';
import { LeftPanel } from './sandbox/LeftPanel';
import { AppliedConfig } from './sandbox/AppliedConfig';
import { ConfigurationReferenceModal } from './sandbox/ConfigurationReferenceModal';
import { SampleDataGenerationModal } from './sandbox/SampleDataGenerationModal';
import { CodeSandboxExportModal } from './sandbox/CodeSandboxExportModal';
import type { Theme } from '../utils/themeConfig';
import { sanitizeReactInternals } from '../utils';

// Custom loading component that matches widgemo-core's expected interface
const CustomLoadingComponent: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className, style }) => (
  <div className={`d-flex flex-column align-items-center justify-content-center p-4 ${className || ''}`} style={style}>
    <div className="spinner-border text-primary mb-3" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
    <h5 className="text-muted">Custom Loading Component</h5>
    <p className="text-center text-muted small">
      This is a custom loading component that can be passed to Widgemo via the customLoading prop.
    </p>
  </div>
);

// Custom error component that matches widgemo-core's expected interface
const CustomErrorComponent: React.FC<{
  error: string | Error;
  onRetry?: () => void;
  className?: string;
  style?: React.CSSProperties;
}> = ({ error, onRetry, className, style }) => (
  <div className={`d-flex flex-column align-items-center justify-content-center p-4 ${className || ''}`} style={style}>
    <div className="text-danger mb-3">
      <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
      </svg>
    </div>
    <h5 className="text-danger mb-2">Custom Error Component</h5>
    <p className="text-center text-muted small mb-3">
      This is a custom error component that can be passed to Widgemo via the customError prop.
    </p>
    <div className="bg-light border border-danger p-3 rounded w-100 text-center mb-3">
      <code className="text-danger fw-bold">{typeof error === 'string' ? error : error.message}</code>
    </div>
    {onRetry && (
      <button className="btn btn-outline-danger btn-sm" onClick={onRetry}>
        Retry
      </button>
    )}
  </div>
);

interface SandboxSectionProps {
  initialConfig: WidgemoConfig;
  initialData: Record<string, unknown>[];
  onConfigChange?: (config: WidgemoConfig) => void;
  onDataChange?: (data: Record<string, unknown>[]) => void;
  currentTheme: Theme;
  // initialThemeMode?: 'defaults' | 'config' | 'custom';
}

export const SandboxSection: React.FC<SandboxSectionProps> = ({
  initialConfig,
  initialData,
  onConfigChange,
  onDataChange,
  currentTheme,
  // initialThemeMode = 'config'
}) => {
  const [configJson, setConfigJson] = useState(JSON.stringify(sanitizeReactInternals(JSON.parse(JSON.stringify(initialConfig))), null, 2));
  const [config, setConfig] = useState(initialConfig);
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [showReferenceModal, setShowReferenceModal] = useState(false);

  // Additional WidgemoProps state
  const [overridesJson, setOverridesJson] = useState('{}');
  const [className, setClassName] = useState('');
  const [styleJson, setStyleJson] = useState('{}');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [useCustomLoading, setUseCustomLoading] = useState(false);
  const [useCustomError, setUseCustomError] = useState(false);
  const [baseColor, setBaseColor] = useState('');
  const [autoContrast, setAutoContrast] = useState(true);
  const [contrastAmount, setContrastAmount] = useState(0.05);
  const [overrideBackground, setOverrideBackground] = useState('');
  const [showConfigDetails, setShowConfigDetails] = useState(false);
  const [applyAdvancedProps, setApplyAdvancedProps] = useState(false);
  const [renderTrigger, setRenderTrigger] = useState(0);

  // Applied Configuration panel state
  const [isAppliedConfigCollapsed, setIsAppliedConfigCollapsed] = useState(false);
  const [appliedConfigCopyStatus, setAppliedConfigCopyStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // SimplifiedWidgemo doesn't need resolved props

  // Active tab state
  const [activeTab, setActiveTab] = useState(() => {
    const saved = localStorage.getItem('sandbox-active-tab');
    return saved || 'config-editor';
  });

  // Save active tab to localStorage
  useEffect(() => {
    localStorage.setItem('sandbox-active-tab', activeTab);
  }, [activeTab]);

  // Control whether to override specific properties
  const [overrideBaseColorEnabled, setOverrideBaseColorEnabled] = useState(false);
  const [overrideBackgroundEnabled, setOverrideBackgroundEnabled] = useState(false);

  // Applied advanced props state (to prevent live updates)
  const [appliedOverrides, setAppliedOverrides] = useState<Partial<WidgemoConfig>>({});
  const [appliedClassName, setAppliedClassName] = useState('');
  const [appliedStyleJson, setAppliedStyleJson] = useState('{}');

  // Preview dimensions state
  const [width, setWidth] = useState<number>(400);
  const [height, setHeight] = useState<number>(300);
  const [isAutoWidth, setIsAutoWidth] = useState<boolean>(true);
  const [isAutoHeight, setIsAutoHeight] = useState<boolean>(true);

  // Theming state
  // const [themeMode, setThemeMode] = useState<'defaults' | 'config' | 'custom'>(initialThemeMode);
  // const [primaryColor, setPrimaryColor] = useState('#0066cc');
  // const [customTheme, setCustomTheme] = useState<Partial<WidgemoTheme>>({});
  // const [darkMode, setDarkMode] = useState(false);

  // Ensure darkMode is used for TypeScript
  // void darkMode;

  // Note: darkMode is used by ThemingTab for palette generation display
  // const [autoGeneratePalette, setAutoGeneratePalette] = useState(true);


  const [customData, setCustomData] = useState<Record<string, unknown>[]>(initialData);
  const [entityLabel, setEntityLabel] = useState('User');
  const [entityLabelPlural, setEntityLabelPlural] = useState('Users');
  const [exportStatus, setExportStatus] = useState<string | null>(null);

  // Sync jsonEditorText with customData
  useEffect(() => {
    setJsonEditorText(JSON.stringify(customData, null, 2));
  }, [customData]);
  const [showCodeSandboxModal, setShowCodeSandboxModal] = useState(false);
  const [showSampleGen, setShowSampleGen] = useState(false);
  const [jsonEditorText, setJsonEditorText] = useState('');

  // Current theme based on theming tab settings
  // const currentSandboxTheme = useMemo(() => {
  //   switch (themeMode) {
  //     case 'defaults':
  //       // For defaults mode, return null to use widgemo defaults
  //       return null;
  //     case 'config':
  //       return undefined; // undefined means use config.theme as-is
  //     case 'custom':
  //       return {
  //         colors: {
  //           primary: primaryColor,
  //           ...customTheme.colors
  //         },
  //         ...customTheme
  //       } as WidgemoTheme;
  //     default:
  //       return null;
  //   }
  // }, [themeMode, primaryColor, customTheme]);

  const currentSandboxTheme = undefined;

  // Determine if dark mode is actually active based on current theme
  // const isDarkModeActive = useMemo(() => {
  //   // Dark mode is now handled via CSS variables, check the current theme
  //   return currentTheme === 'dark' || currentTheme.startsWith('theme-dark');
  // }, [currentTheme]);

  // Transform widgemoExamples to PresetOption format for JsonConfigTab
  const presetOptions = useMemo(() => {
    return widgemoExamples.map(config => ({
      name: config.title,
      config: config.config as WidgemoConfig
    }));
  }, []);

  // Copy JSON to clipboard
  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(configJson);
      setExportStatus('Configuration copied to clipboard!');
      setTimeout(() => setExportStatus(null), 3000);
    } catch {
      // Fallback for browsers that don't support clipboard API or require user interaction
      try {
        const textArea = document.createElement('textarea');
        textArea.value = configJson;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setExportStatus('Configuration copied to clipboard!');
        setTimeout(() => setExportStatus(null), 3000);
      } catch {
        setExportStatus('Failed to copy to clipboard');
        setTimeout(() => setExportStatus(null), 3000);
      }
    }
  }, [configJson]);

  // Copy applied configuration to clipboard
  const copyAppliedConfigToClipboard = useCallback(async () => {
    console.log('Copy button clicked, config:', config);
    
    const configText = JSON.stringify(sanitizeReactInternals(JSON.parse(JSON.stringify(config))), null, 2);
    console.log('Config text to copy:', configText.substring(0, 100) + '...');
    
    // Try fallback first (more reliable in localhost/development)
    try {
      const textArea = document.createElement('textarea');
      textArea.value = configText;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const success = document.execCommand('copy');
      document.body.removeChild(textArea);
      if (success) {
        console.log('Fallback copy succeeded');
        setAppliedConfigCopyStatus('success');
        setTimeout(() => setAppliedConfigCopyStatus('idle'), 2000);
        return;
      } else {
        throw new Error('execCommand returned false');
      }
    } catch (fallbackError) {
      console.log('Fallback copy failed, trying modern API:', fallbackError);
    }
    
    // Try modern clipboard API as fallback
    try {
      await navigator.clipboard.writeText(configText);
      console.log('Modern clipboard API succeeded');
      setAppliedConfigCopyStatus('success');
      setTimeout(() => setAppliedConfigCopyStatus('idle'), 2000);
    } catch (error) {
      console.log('Both copy methods failed:', error);
      setAppliedConfigCopyStatus('error');
      setTimeout(() => setAppliedConfigCopyStatus('idle'), 2000);
    }
  }, [config]);

  // Download config as JSON file
  const downloadConfig = useCallback(() => {
    const blob = new Blob([configJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'widgemo-config.json';
    link.click();
    URL.revokeObjectURL(url);
  }, [configJson]);

  const applyConfig = () => {
    try {
      // Remove comment lines (lines starting with //) before parsing
      const cleanJson = configJson
        .split('\n')
        .filter(line => !line.trim().startsWith('//'))
        .join('\n')
        .trim();

      const parsed = JSON.parse(cleanJson);
      
      // Apply current theme settings if not in 'config' mode
      if (currentSandboxTheme !== undefined) {
        parsed.theme = currentSandboxTheme;
      }
      
      setConfig(parsed);
      if (onConfigChange) onConfigChange(parsed);
      setJsonError(null);
    } catch (error) {
      setJsonError((error as Error).message);
    }
  };

  // Sync with initial props
  useEffect(() => {
    setConfig(initialConfig);
    setConfigJson(JSON.stringify(sanitizeReactInternals(JSON.parse(JSON.stringify(initialConfig))), null, 2));
  }, [initialConfig]);

  useEffect(() => {
    setCustomData(initialData);
  }, [initialData]);

  const lastAppliedThemeRef = useRef(currentTheme);

  // Update theme ref when currentTheme changes (but don't modify sandbox config)
  useEffect(() => {
    lastAppliedThemeRef.current = currentTheme;
  }, [currentTheme]);

  const loadPreset = (presetConfig: WidgemoConfig, presetTitle?: string) => {
    // Don't inject theme properties - let presets use their own themes or fall back to defaults
    const json = JSON.stringify(sanitizeReactInternals(JSON.parse(JSON.stringify(presetConfig))), null, 2);
    const titleComment = presetTitle ? `// ${presetTitle}\n` : '';
    const commentedJson = `${titleComment}${json}`;
    setConfigJson(commentedJson);
    setConfig(presetConfig);
    if (onConfigChange) onConfigChange(presetConfig);
    // Don't apply the config automatically - wait for user to click Apply Changes
    setJsonError(null);
  };

  // Theming handlers
  // const handleThemeModeChange = useCallback((mode: 'defaults' | 'config' | 'custom') => {
  //   setThemeMode(mode);
  // }, []);

  // const handlePrimaryColorChange = useCallback((color: string) => {
  //   setPrimaryColor(color);
  // }, []);

  // const handleCustomThemeChange = useCallback((theme: Partial<WidgemoTheme>) => {
  //   setCustomTheme(theme);
  // }, []);

  // const handleDarkModeChange = useCallback((dark: boolean) => {
  //   setDarkMode(dark);
  // }, []);

  // Props & Overrides handlers
  const handleOverridesJsonChange = useCallback((value: string) => {
    setOverridesJson(value);
  }, []);

  const handleClassNameChange = useCallback((value: string) => {
    setClassName(value);
  }, []);

  const handleStyleJsonChange = useCallback((value: string) => {
    setStyleJson(value);
  }, []);

  const handleLoadingChange = useCallback((value: boolean) => {
    setLoading(value);
  }, []);

  const handleErrorChange = useCallback((value: string) => {
    setError(value);
  }, []);

  const handleOverrideBaseColorEnabledChange = useCallback((value: boolean) => {
    setOverrideBaseColorEnabled(value);
  }, []);

  const handleBaseColorChange = useCallback((value: string) => {
    setBaseColor(value);
  }, []);

  const handleOverrideBackgroundEnabledChange = useCallback((value: boolean) => {
    setOverrideBackgroundEnabled(value);
  }, []);

  const handleOverrideBackgroundChange = useCallback((value: string) => {
    setOverrideBackground(value);
  }, []);

  const handleAutoContrastChange = useCallback((value: boolean) => {
    setAutoContrast(value);
  }, []);

  const handleContrastAmountChange = useCallback((value: number) => {
    setContrastAmount(value);
  }, []);

  const handleShowConfigDetailsChange = useCallback((value: boolean) => {
    setShowConfigDetails(value);
  }, []);

  const handleApplyAdvancedProperties = useCallback(() => {
    try {
      // Parse overrides JSON
      const parsedOverrides = overridesJson.trim() ? JSON.parse(overridesJson) : {};
      setAppliedOverrides(parsedOverrides);

      // Parse style JSON (though we don't store it separately, just validate)
      if (styleJson.trim()) {
        JSON.parse(styleJson);
      }

      // Apply all current values to applied state
      setAppliedClassName(className);
      setAppliedStyleJson(styleJson);
      setApplyAdvancedProps(true);
      setExportStatus('Advanced properties applied successfully!');
      setTimeout(() => setExportStatus(null), 3000);
    } catch (error) {
      setExportStatus(`Error applying advanced properties: ${(error as Error).message}`);
      setTimeout(() => setExportStatus(null), 5000);
    }
  }, [overridesJson, styleJson, className]);

  const handleApplyLoadingStates = useCallback(() => {
    // Force re-render of preview
    setRenderTrigger(prev => prev + 1);
    setExportStatus('Loading and error states applied successfully!');
    setTimeout(() => setExportStatus(null), 3000);
  }, []);

  const handleUseCustomLoadingChange = useCallback((value: boolean) => {
    setUseCustomLoading(value);
  }, []);

  const handleUseCustomErrorChange = useCallback((value: boolean) => {
    setUseCustomError(value);
  }, []);

  const handleResetAll = useCallback(() => {
    setOverridesJson('{}');
    setClassName('');
    setStyleJson('{}');
    setBaseColor('#ffffff');
    setOverrideBackground('#f0f0f0');
    setAutoContrast(true);
    setContrastAmount(0.05);
    setOverrideBaseColorEnabled(false);
    setOverrideBackgroundEnabled(false);
    setApplyAdvancedProps(false);
    setExportStatus('Advanced properties reset to defaults!');
    setTimeout(() => setExportStatus(null), 3000);
  }, []);

  // Sample Data handlers
  const handleJsonEditorTextChange = useCallback((text: string) => {
    setJsonEditorText(text);
  }, []);

  // Handle data generation from modal
  const handleGenerateData = useCallback((generatedData: Record<string, unknown>[], options: { adjustConfig: boolean; dataType: string }) => {
    // Update entity labels based on data type
    const updateEntityLabels = (dataType: string) => {
      switch (dataType) {
        case 'users':
        case 'users-api':
          setEntityLabel('User');
          setEntityLabelPlural('Users');
          break;
        case 'sales':
          setEntityLabel('Sale');
          setEntityLabelPlural('Sales Records');
          break;
        case 'customers':
          setEntityLabel('Customer');
          setEntityLabelPlural('Customers');
          break;
        case 'posts-api':
          setEntityLabel('Post');
          setEntityLabelPlural('Posts');
          break;
        case 'users-jsonplaceholder':
          setEntityLabel('User');
          setEntityLabelPlural('Users');
          break;
        case 'posts-jsonplaceholder':
          setEntityLabel('Post');
          setEntityLabelPlural('Posts');
          break;
        case 'comments-jsonplaceholder':
          setEntityLabel('Comment');
          setEntityLabelPlural('Comments');
          break;
        case 'albums-jsonplaceholder':
          setEntityLabel('Album');
          setEntityLabelPlural('Albums');
          break;
        case 'photos-jsonplaceholder':
          setEntityLabel('Photo');
          setEntityLabelPlural('Photos');
          break;
        case 'todos-jsonplaceholder':
          setEntityLabel('Todo');
          setEntityLabelPlural('Todos');
          break;
        case 'custom-api': {
          const endpointName = 'Custom';
          setEntityLabel(endpointName.charAt(0).toUpperCase() + endpointName.slice(1));
          setEntityLabelPlural(endpointName.charAt(0).toUpperCase() + endpointName.slice(1) + 's');
          break;
        }
        default:
          setEntityLabel('Record');
          setEntityLabelPlural('Records');
      }
    };

    updateEntityLabels(options.dataType);

    setCustomData(generatedData);
    if (onDataChange) onDataChange(generatedData);
    setExportStatus('Data generated successfully!');
    setTimeout(() => setExportStatus(null), 3000);

    // Adjust configuration if requested
    if (options.adjustConfig && generatedData.length > 0) {
      const sampleRecord = generatedData[0] as Record<string, unknown>;
      const fields = Object.keys(sampleRecord).map(key => {
        const value = sampleRecord[key];
        let fieldType: string = 'text';

        if (typeof value === 'number') fieldType = 'number';
        else if (typeof value === 'boolean') fieldType = 'boolean';
        else if (value && typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)) fieldType = 'date';
        else if (value && typeof value === 'string' && value.includes('@')) fieldType = 'email';

        return {
          name: key,
          label: key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1'),
          type: fieldType,
          sortable: fieldType !== 'boolean',
          filterable: true
        };
      });

      // Get appropriate title based on data type
      const getTitleForType = (dataType: string) => {
        switch (dataType) {
          case 'users':
          case 'users-api':
          case 'users-jsonplaceholder':
            return 'User Management';
          case 'sales':
            return 'Sales Records';
          case 'customers':
            return 'Customer Management';
          case 'posts-api':
          case 'posts-jsonplaceholder':
            return 'Blog Posts';
          case 'comments-jsonplaceholder':
            return 'Comments';
          case 'albums-jsonplaceholder':
            return 'Photo Albums';
          case 'photos-jsonplaceholder':
            return 'Photos';
          case 'todos-jsonplaceholder':
            return 'Todo Items';
          case 'custom-api': {
            const endpointName = 'Custom';
            return endpointName.charAt(0).toUpperCase() + endpointName.slice(1) + ' Data';
          }
          default:
            return 'Data Management';
        }
      };

      const newConfig = {
        ...JSON.parse(configJson),
        title: getTitleForType(options.dataType),
        fields: fields
      };

      const newConfigJson = JSON.stringify(newConfig, null, 2);
      setConfigJson(newConfigJson);
      setConfig(newConfig);
      if (onConfigChange) onConfigChange(newConfig);
    }
  }, [configJson, onConfigChange, onDataChange]);

  const handleSampleDataFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const content = e.target?.result as string;
          const parsed = JSON.parse(content);
          if (Array.isArray(parsed)) {
            setCustomData(parsed);
            if (onDataChange) onDataChange(parsed);
            setExportStatus('Data uploaded successfully!');
            setTimeout(() => setExportStatus(null), 3000);
          } else {
            throw new Error('Data must be an array of objects');
          }
        } catch (error) {
          setExportStatus(`Error: ${(error as Error).message}`);
          setTimeout(() => setExportStatus(null), 5000);
        }
      };
      reader.readAsText(file);
    }
  }, [onDataChange]);

  const handleSaveChanges = useCallback(() => {
    try {
      const parsed = JSON.parse(jsonEditorText);
      if (Array.isArray(parsed)) {
        setCustomData(parsed);
        if (onDataChange) onDataChange(parsed);
        // Update entity labels based on data structure
        if (parsed.length > 0) {
          const firstItem = parsed[0];
          if (typeof firstItem === 'object' && firstItem !== null) {
            const keys = Object.keys(firstItem);
            if (keys.includes('name') && keys.includes('email')) {
              setEntityLabel('User');
              setEntityLabelPlural('Users');
            } else if (keys.includes('title') && keys.includes('body')) {
              setEntityLabel('Post');
              setEntityLabelPlural('Posts');
            } else {
              setEntityLabel('Record');
              setEntityLabelPlural('Records');
            }
          }
        }
        setExportStatus('Data updated successfully!');
        setTimeout(() => setExportStatus(null), 3000);
      } else {
        throw new Error('Data must be an array');
      }
    } catch (error) {
      setExportStatus(`Error parsing JSON: ${(error as Error).message}`);
      setTimeout(() => setExportStatus(null), 5000);
    }
  }, [jsonEditorText, onDataChange]);

  return (
    <div className="h-100 d-flex flex-column">
      <Card className="shadow theme-aware-card sandbox-card h-100 d-flex flex-column">
        <Card.Body className="p-0 theme-aware-card sandbox-card d-flex flex-column flex-grow-1" style={{ minHeight: 0 }}>
          <Group className="h-100 d-flex" style={{ minHeight: 0 }}>
            <Panel
              defaultSize={35}
              minSize={30}
              className="d-flex flex-column h-100"
              style={{ minHeight: 0 }}
            >
              <LeftPanel
                activeTab={activeTab}
                onTabChange={setActiveTab}
                exportStatus={exportStatus}
                // JsonConfigTab props
                currentJson={configJson}
                onJsonChange={(newJson) => {
                  setConfigJson(newJson);
                  if (jsonError) {
                    setJsonError(null);
                  }
                }}
                onApplyJson={applyConfig}
                presets={presetOptions}
                onLoadPreset={loadPreset}
                jsonError={jsonError}
                onShowReference={() => setShowReferenceModal(true)}
                onShowCodeSandbox={() => setShowCodeSandboxModal(true)}
                onCopyToClipboard={copyToClipboard}
                onDownloadConfig={downloadConfig}
                // PropsOverridesTab props
                overridesJson={overridesJson}
                onOverridesJsonChange={handleOverridesJsonChange}
                className={className}
                onClassNameChange={handleClassNameChange}
                styleJson={styleJson}
                onStyleJsonChange={handleStyleJsonChange}
                overrideBaseColorEnabled={overrideBaseColorEnabled}
                onOverrideBaseColorEnabledChange={handleOverrideBaseColorEnabledChange}
                baseColor={baseColor}
                onBaseColorChange={handleBaseColorChange}
                overrideBackgroundEnabled={overrideBackgroundEnabled}
                onOverrideBackgroundEnabledChange={handleOverrideBackgroundEnabledChange}
                overrideBackground={overrideBackground}
                onOverrideBackgroundChange={handleOverrideBackgroundChange}
                autoContrast={autoContrast}
                onAutoContrastChange={handleAutoContrastChange}
                contrastAmount={contrastAmount}
                onContrastAmountChange={handleContrastAmountChange}
                showConfigDetails={showConfigDetails}
                onShowConfigDetailsChange={handleShowConfigDetailsChange}
                onApplyAdvancedProperties={handleApplyAdvancedProperties}
                onResetAll={handleResetAll}
                // SampleDataTab props
                currentData={customData}
                jsonEditorText={jsonEditorText}
                onJsonEditorTextChange={handleJsonEditorTextChange}
                entityLabelPlural={entityLabelPlural}
                onGenerateClick={() => setShowSampleGen(true)}
                onFileUpload={handleSampleDataFileUpload}
                onSaveChanges={handleSaveChanges}
                // LoadingStatesTab props
                showLoading={loading}
                onShowLoadingChange={handleLoadingChange}
                errorMessage={error}
                onErrorMessageChange={handleErrorChange}
                onApplyChanges={handleApplyLoadingStates}
                useCustomLoading={useCustomLoading}
                onUseCustomLoadingChange={handleUseCustomLoadingChange}
                useCustomError={useCustomError}
                onUseCustomErrorChange={handleUseCustomErrorChange}
              />
            </Panel>
            <Separator className="bg-secondary" style={{ width: '1.5px' }} />
            <Panel defaultSize={50} minSize={30} className="flex-grow-1 overflow-auto">
              <PreviewPanel
                key={renderTrigger}
                config={config}
                data={customData}
                width={width}
                height={height}
                isAutoWidth={isAutoWidth}
                isAutoHeight={isAutoHeight}
                onWidthChange={setWidth}
                onHeightChange={setHeight}
                onAutoWidthChange={setIsAutoWidth}
                onAutoHeightChange={setIsAutoHeight}
              />
            </Panel>
            {!isAppliedConfigCollapsed && (
              <>
                <Separator className="bg-secondary" style={{ width: '1.5px' }} />
                <Panel defaultSize={15} minSize={10} className="d-flex flex-column">
                  <div className="d-flex align-items-center justify-content-between p-2 border-bottom theme-aware-card">
                    <h6 className="mb-0 fw-bold">Applied Config</h6>
                    <div className="d-flex gap-1">
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={copyAppliedConfigToClipboard}
                        disabled={false}
                        title="Copy configuration to clipboard"
                        aria-label="Copy configuration to clipboard"
                      >
                        <FaCopy className="me-1" />
                        {appliedConfigCopyStatus === 'success' ? 'Copied!' : appliedConfigCopyStatus === 'error' ? 'Failed' : 'Copy'}
                      </button>
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => setIsAppliedConfigCollapsed(true)}
                        title="Collapse panel"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                  <div className="flex-grow-1 overflow-auto p-2">
                    <AppliedConfig
                      config={config}
                      showConfigDetails={showConfigDetails}
                      loading={loading}
                      error={error}
                      overrides={applyAdvancedProps && Object.keys(appliedOverrides || {}).length > 0 ? appliedOverrides : undefined}
                      className={applyAdvancedProps && appliedClassName ? appliedClassName : undefined}
                      style={applyAdvancedProps && appliedStyleJson?.trim() ? JSON.parse(appliedStyleJson) : undefined}
                      currentSandboxTheme={currentSandboxTheme}
                      customLoading={useCustomLoading ? CustomLoadingComponent : undefined}
                      customError={useCustomError ? CustomErrorComponent : undefined}
                    />
                  </div>
                </Panel>
              </>
            )}
            {isAppliedConfigCollapsed && (
              <div className="d-flex align-items-center">
                <button
                  className="btn btn-sm btn-outline-secondary d-flex align-items-center justify-content-center"
                  onClick={() => setIsAppliedConfigCollapsed(false)}
                  title="Expand Applied Configuration panel"
                  style={{
                    writingMode: 'vertical-rl',
                    textOrientation: 'mixed',
                    height: '120px',
                    width: '24px',
                    borderRadius: '4px 0 0 4px',
                    marginLeft: '2px'
                  }}
                >
                  <span style={{ fontSize: '11px', letterSpacing: '1px' }}>APPLIED</span>
                </button>
              </div>
            )}
          </Group>
        </Card.Body>
      </Card>

      {/* Modals */}
      <ConfigurationReferenceModal
        isOpen={showReferenceModal}
        onClose={() => setShowReferenceModal(false)}
      />

      <CodeSandboxExportModal
        isOpen={showCodeSandboxModal}
        onClose={() => setShowCodeSandboxModal(false)}
        currentConfig={{
          configJson,
          customData,
          entityLabel
        }}
      />

      <SampleDataGenerationModal
        isOpen={showSampleGen}
        onClose={() => setShowSampleGen(false)}
        onGenerate={handleGenerateData}
      />

      <style>
        {`
          .sandbox-card [data-panel] {
            background: transparent !important;
          }
          .sandbox-card [data-panel-group] {
            background: transparent !important;
          }
          .sandbox-card .panel-background {
            background: transparent !important;
          }
        `}
      </style>
    </div>
  );
};