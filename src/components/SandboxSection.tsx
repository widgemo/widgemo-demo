import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { Card } from 'react-bootstrap';
import { Panel, Group, Separator } from 'react-resizable-panels';
import type { WidgemoConfig } from '@widgemo/widgemo-core';
import widgemoExamples from '../data/widgemoExamples';
import { PreviewPanel } from './sandbox/PreviewPanel';
import { LeftPanel } from './sandbox/LeftPanel';
import { SampleDataGenerationModal } from './sandbox/SampleDataGenerationModal';
import { CodeSandboxExportModal } from './sandbox/CodeSandboxExportModal';
import type { Theme } from '../utils/themeConfig';
import { sanitizeReactInternals } from '../utils';

interface SandboxSectionProps {
  initialConfig: WidgemoConfig;
  initialData: Record<string, unknown>[];
  initialPresetName?: string;
  onConfigChange?: (config: WidgemoConfig) => void;
  onDataChange?: (data: Record<string, unknown>[]) => void;
  currentTheme: Theme;
  // initialThemeMode?: 'defaults' | 'config' | 'custom';
}

interface PresetOption {
  id: string;
  name: string;
  config: WidgemoConfig;
  data: Record<string, unknown>[];
}

const SANDBOX_PRESET_IDS = [
  'rich-cells-table',
  'basic-grid-layout',
  'carousel-full',
  'board-basic',
  'chart-throughput-mixed',
  'chart-allocation-donut',
  'responsive-mode-switching',
  'per-item-actions-demo',
  'search-with-pagination',
  'grouped-rows-with-collapse',
  'zone-dynamic-renderers',
  'renderas-badge-advanced',
  'currency-advanced',
  'image-advanced',
  'item-layout-grid',
  'content-loading-state-skeleton-pie-chart',
  'content-loading-state-spinner',
  'content-error-state',
] as const;

export const SandboxSection: React.FC<SandboxSectionProps> = ({
  initialConfig,
  initialData,
  initialPresetName,
  onConfigChange,
  onDataChange,
  currentTheme,
  // initialThemeMode = 'config'
}) => {
  const buildCommentedConfigJson = useCallback((cfg: WidgemoConfig, presetName?: string) => {
    const json = JSON.stringify(sanitizeReactInternals(JSON.parse(JSON.stringify(cfg))), null, 2);
    return presetName ? `// ${presetName}\n${json}` : json;
  }, []);

  const [configJson, setConfigJson] = useState(buildCommentedConfigJson(initialConfig, initialPresetName));
  const [config, setConfig] = useState(initialConfig);
  const [jsonError, setJsonError] = useState<string | null>(null);

  // Additional WidgemoProps state
  const [overridesJson, setOverridesJson] = useState('{}');
  const [className, setClassName] = useState('');
  const [styleJson, setStyleJson] = useState('{}');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [baseColor, setBaseColor] = useState('');
  const [autoContrast, setAutoContrast] = useState(true);
  const [contrastAmount, setContrastAmount] = useState(0.05);
  const [overrideBackground, setOverrideBackground] = useState('');
  const [showConfigDetails, setShowConfigDetails] = useState(false);
  const [renderTrigger, setRenderTrigger] = useState(0);

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

  // Preview dimensions state
  const [width, setWidth] = useState<number>(400);
  const [height, setHeight] = useState<number>(300);
  const [isAutoWidth, setIsAutoWidth] = useState<boolean>(true);
  const [isAutoHeight, setIsAutoHeight] = useState<boolean>(true);
  const [showDevOverlay, setShowDevOverlay] = useState(false);
  const [loadPresetWithData, setLoadPresetWithData] = useState(false);

  // Save preset loading preference to localStorage
  useEffect(() => {
    localStorage.setItem('sandbox-load-preset-with-data', String(loadPresetWithData));
  }, [loadPresetWithData]);

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
  const [lastLoadedPresetName, setLastLoadedPresetName] = useState<string | undefined>(initialPresetName);
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

  useEffect(() => {
    const saved = localStorage.getItem('sandbox-load-preset-with-data');
    if (saved === 'true') {
      setLoadPresetWithData(true);
    }
  }, []);

  // Determine if dark mode is actually active based on current theme
  // const isDarkModeActive = useMemo(() => {
  //   // Dark mode is now handled via CSS variables, check the current theme
  //   return currentTheme === 'dark' || currentTheme.startsWith('theme-dark');
  // }, [currentTheme]);

  const sandboxPresetIdSet = useMemo(() => new Set<string>(SANDBOX_PRESET_IDS), []);

  // Transform curated example set to PresetOption format for JsonConfigTab
  const presetOptions = useMemo(() => {
    return widgemoExamples
      .filter((item) => sandboxPresetIdSet.has(item.id))
      .map((item) => ({
        id: item.id,
        name: item.title,
        config: item.config as WidgemoConfig,
        data: item.data as Record<string, unknown>[],
      }));
  }, [sandboxPresetIdSet]);

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

  // Download config as JSON file
  const downloadConfig = useCallback(() => {
    const toFilenameBase = (value: string): string => {
      const base = value
        .toLowerCase()
        .replace(/["']/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .slice(0, 80);

      return base || 'widgemo-config';
    };

    const commentLine = configJson
      .split('\n')
      .find((line) => line.trim().startsWith('//'))
      ?.replace(/^\s*\/\//, '')
      .trim();

    const defaultFileName = `${toFilenameBase(lastLoadedPresetName || commentLine || 'widgemo-config')}.json`;
    const userInput = window.prompt('Enter a file name for this configuration:', defaultFileName);

    if (userInput === null) {
      return;
    }

    const trimmedInput = userInput.trim();
    if (!trimmedInput) {
      setExportStatus('Download cancelled: file name is required.');
      setTimeout(() => setExportStatus(null), 3000);
      return;
    }

    const withExtension = trimmedInput.toLowerCase().endsWith('.json') ? trimmedInput : `${trimmedInput}.json`;
    const safeFileName = withExtension.replace(/[<>:"/\\|?*\u0000-\u001F]/g, '').trim() || defaultFileName;

    const blob = new Blob([configJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = safeFileName;
    link.click();
    URL.revokeObjectURL(url);
  }, [configJson, lastLoadedPresetName]);

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
    setConfigJson(buildCommentedConfigJson(initialConfig, initialPresetName));
    setLastLoadedPresetName(initialPresetName);
  }, [buildCommentedConfigJson, initialConfig, initialPresetName]);

  useEffect(() => {
    setCustomData(initialData);
  }, [initialData]);

  const lastAppliedThemeRef = useRef(currentTheme);

  // Update theme ref when currentTheme changes (but don't modify sandbox config)
  useEffect(() => {
    lastAppliedThemeRef.current = currentTheme;
  }, [currentTheme]);

  const loadPreset = (preset: PresetOption) => {
    // Don't inject theme properties - let presets use their own themes or fall back to defaults
    setConfigJson(buildCommentedConfigJson(preset.config, preset.name));
    setConfig(preset.config);
    setLastLoadedPresetName(preset.name);
    if (onConfigChange) onConfigChange(preset.config);

    if (loadPresetWithData) {
      setCustomData(preset.data);
      if (onDataChange) onDataChange(preset.data);
      setExportStatus('Loaded preset config and matching sample data.');
      setTimeout(() => setExportStatus(null), 3000);
    } else {
      setExportStatus('Loaded preset config only. Current sample data was kept.');
      setTimeout(() => setExportStatus(null), 3000);
    }

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
      void (overridesJson.trim() ? JSON.parse(overridesJson) : {});

      // Parse style JSON (though we don't store it separately, just validate)
      if (styleJson.trim()) {
        JSON.parse(styleJson);
      }

      setExportStatus('Advanced properties applied successfully!');
      setTimeout(() => setExportStatus(null), 3000);
    } catch (error) {
      setExportStatus(`Error applying advanced properties: ${(error as Error).message}`);
      setTimeout(() => setExportStatus(null), 5000);
    }
  }, [overridesJson, styleJson]);

  const handleApplyLoadingStates = useCallback(() => {
    // Force re-render of preview
    setRenderTrigger(prev => prev + 1);
    setExportStatus('Loading and error states applied successfully!');
    setTimeout(() => setExportStatus(null), 3000);
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
                loadPresetWithData={loadPresetWithData}
                onLoadPresetWithDataChange={setLoadPresetWithData}
                jsonError={jsonError}
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
                showDevOverlay={showDevOverlay}
                onShowDevOverlayChange={setShowDevOverlay}
                isAutoWidth={isAutoWidth}
                onAutoWidthChange={setIsAutoWidth}
                isAutoHeight={isAutoHeight}
                onAutoHeightChange={setIsAutoHeight}
                width={width}
                onWidthChange={setWidth}
                height={height}
                onHeightChange={setHeight}
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
                showDevOverlay={showDevOverlay}
                loading={loading}
                error={error}
                onRetry={() => {
                  setLoading(false);
                  setError('');
                }}
              />
            </Panel>
          </Group>
        </Card.Body>
      </Card>

      {/* Modals */}
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