import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { Button, Card, Alert, Form, Modal } from 'react-bootstrap';
import { Panel, Group, Separator } from 'react-resizable-panels';
import { FaUpload, FaRandom, FaBook, FaCheck } from 'react-icons/fa';
import type { WidgemoConfig, WidgemoAdapters, WidgemoTheme } from 'widgemo-core';
import { galleryConfigs } from '../data/sampleData';
import { mergeThemeIntoConfig } from '../utils/themeUtils';
import { presetConfigs, widgemoConfigProperties } from '../data/configReference';
import { fontAwesomeRenderIcon } from '../utils/fontAwesomeIconRenderer';
import { PreviewPanel } from './sandbox/PreviewPanel';
import { JsonConfigTab } from './sandbox/JsonConfigTab';
import { ThemingTab } from './sandbox/ThemingTab';
import { PropsOverridesTab } from './sandbox/PropsOverridesTab';
import { IconsTab } from './sandbox/IconsTab';

interface SandboxSectionProps {
  initialConfig: WidgemoConfig;
  initialData: Record<string, unknown>[];
  onConfigChange?: (config: WidgemoConfig) => void;
  onDataChange?: (data: Record<string, unknown>[]) => void;
  currentTheme: string;
}

export const SandboxSection: React.FC<SandboxSectionProps> = ({
  initialConfig,
  initialData,
  onConfigChange,
  onDataChange,
  currentTheme
}) => {
  const [configJson, setConfigJson] = useState(JSON.stringify(initialConfig, null, 2));
  const [config, setConfig] = useState(initialConfig);
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [showReferenceModal, setShowReferenceModal] = useState(false);
  const [currentReferenceSection, setCurrentReferenceSection] = useState<string>('WidgemoConfig');
  const [referenceBreadcrumb, setReferenceBreadcrumb] = useState<string[]>(['WidgemoConfig']);

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
  const [applyAdvancedProps, setApplyAdvancedProps] = useState(false);

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
  const [appliedLoading, setAppliedLoading] = useState(false);
  const [appliedError, setAppliedError] = useState('');
  const [appliedBaseColor, setAppliedBaseColor] = useState('');
  const [appliedAutoContrast, setAppliedAutoContrast] = useState(true);
  const [appliedContrastAmount, setAppliedContrastAmount] = useState(0.05);
  const [appliedOverrideBackground, setAppliedOverrideBackground] = useState('');

  // Preview dimensions state
  const [width, setWidth] = useState<number>(400);
  const [height, setHeight] = useState<number>(300);
  const [isAutoWidth, setIsAutoWidth] = useState<boolean>(true);
  const [isAutoHeight, setIsAutoHeight] = useState<boolean>(true);

  // Theming state
  const [primaryColor, setPrimaryColor] = useState('#0066cc');
  const [useThemeDefaults, setUseThemeDefaults] = useState(true);
  const [customTheme, setCustomTheme] = useState<Partial<WidgemoTheme>>({});
  const [darkMode, setDarkMode] = useState(false);

  // Icons state
  const [iconLibrary, setIconLibrary] = useState<'none' | 'react-icons' | 'lucide' | 'heroicons'>('none');
  const [testIconName, setTestIconName] = useState('FaStar');
  const [testIconSize, setTestIconSize] = useState(16);
  const [testIconClassName, setTestIconClassName] = useState('');
  const [customRenderIcon, setCustomRenderIcon] = useState('');

  // Handle navigation to complex type sections
  const navigateToSection = useCallback((sectionName: string) => {
    setCurrentReferenceSection(sectionName);
    setReferenceBreadcrumb(prev => [...prev, sectionName]);
  }, []);

  // Navigate to a specific breadcrumb index
  const navigateToBreadcrumbIndex = useCallback((index: number) => {
    if (index >= 0 && index < referenceBreadcrumb.length) {
      const newBreadcrumb = referenceBreadcrumb.slice(0, index + 1);
      setReferenceBreadcrumb(newBreadcrumb);
      setCurrentReferenceSection(newBreadcrumb[newBreadcrumb.length - 1]);
    }
  }, [referenceBreadcrumb]);

  const navigateBack = useCallback(() => {
    if (referenceBreadcrumb.length > 1) {
      const newBreadcrumb = referenceBreadcrumb.slice(0, -1);
      setReferenceBreadcrumb(newBreadcrumb);
      setCurrentReferenceSection(newBreadcrumb[newBreadcrumb.length - 1]);
    }
  }, [referenceBreadcrumb]);
  const [customData, setCustomData] = useState<Record<string, unknown>[]>(initialData);
  const [entityLabel, setEntityLabel] = useState('User');
  const [entityLabelPlural, setEntityLabelPlural] = useState('Users');
  const [exportStatus, setExportStatus] = useState<string | null>(null);

  // Sync jsonEditorText with customData
  useEffect(() => {
    setJsonEditorText(JSON.stringify(customData, null, 2));
  }, [customData]);
  const [showCodeSandboxModal, setShowCodeSandboxModal] = useState(false);
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [jsonEditorText, setJsonEditorText] = useState('');
  const [dataType, setDataType] = useState('users');
  const [recordCount, setRecordCount] = useState(10);
  const [adjustConfig, setAdjustConfig] = useState(false);
  const [customEndpoint, setCustomEndpoint] = useState('');

  // Current theme based on theming tab settings
  const currentSandboxTheme = useMemo(() => {
    if (useThemeDefaults) {
      return {};
    }
    return {
      primary: primaryColor,
      dark: darkMode,
      ...customTheme
    };
  }, [useThemeDefaults, primaryColor, darkMode, customTheme]);

  // Current icon renderer based on icons tab settings
  const currentIconRenderer = useMemo(() => {
    if (iconLibrary === 'none') {
      return fontAwesomeRenderIcon; // or a default inline SVG renderer
    }
    if (iconLibrary === 'react-icons') {
      // For demo purposes, return a mock renderer
      return ({ name: _name, size = 16, className, color }: { name: string; size?: number; className?: string; color?: string }) => {
        // This would normally import and render from react-icons
        return <span className={className} style={{ fontSize: `${size}px`, color }}>⭐</span>;
      };
    }
    return fontAwesomeRenderIcon;
  }, [iconLibrary]);

  // Generate random dataset
  const generateRandomData = useCallback(async (type: string, count: number, shouldAdjustConfig: boolean) => {
    let randomData: Record<string, unknown>[] = [];

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
          const endpointName = customEndpoint.trim() || 'Custom';
          setEntityLabel(endpointName.charAt(0).toUpperCase() + endpointName.slice(1));
          setEntityLabelPlural(endpointName.charAt(0).toUpperCase() + endpointName.slice(1) + 's');
          break;
        }
        default:
          setEntityLabel('Record');
          setEntityLabelPlural('Records');
      }
    };

    updateEntityLabels(type);

    try {
      if (type === 'custom-api') {
        // Fetch from custom API endpoint
        if (!customEndpoint.trim()) {
          throw new Error('Please specify a custom API endpoint URL');
        }
        const response = await fetch(customEndpoint.trim());
        if (!response.ok) {
          throw new Error(`Failed to fetch from endpoint: ${customEndpoint}`);
        }
        const apiData: Record<string, unknown>[] = await response.json();
        randomData = Array.isArray(apiData) ? apiData.slice(0, count) : [apiData];
      } else if (type.endsWith('-jsonplaceholder')) {
        // Fetch from JSONPlaceholder
        const endpoint = type.replace('-jsonplaceholder', '');
        const response = await fetch(`https://jsonplaceholder.typicode.com/${endpoint}`);
        const apiData: Record<string, unknown>[] = await response.json();
        randomData = apiData.slice(0, count);
      } else {
        // Generate local data based on type
        const firstNames = ['Alice', 'Bob', 'Carol', 'David', 'Eva', 'Frank', 'Grace', 'Henry', 'Ivy', 'Jack'];
        const lastNames = ['Johnson', 'Smith', 'Williams', 'Brown', 'Davis', 'Miller', 'Wilson', 'Moore', 'Taylor', 'Anderson'];

        if (type === 'users') {
          const departments = ['Engineering', 'Design', 'Business', 'Marketing', 'Sales'];
          const roles = ['Manager', 'Developer', 'Designer', 'Analyst', 'Coordinator'];

          randomData = Array.from({ length: count }, (_, i) => ({
            id: i + 1,
            name: `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`,
            email: `${firstNames[Math.floor(Math.random() * firstNames.length)].toLowerCase()}.${lastNames[Math.floor(Math.random() * lastNames.length)].toLowerCase()}@company.com`,
            role: roles[Math.floor(Math.random() * roles.length)],
            department: departments[Math.floor(Math.random() * departments.length)],
            status: Math.random() > 0.3,
            lastLogin: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          }));
        } else if (type === 'sales') {
          const products = ['Widget A', 'Widget B', 'Service X', 'Service Y', 'Package Z'];
          const regions = ['North', 'South', 'East', 'West', 'Central'];
          const statuses = ['Pending', 'Completed', 'Cancelled'];

          randomData = Array.from({ length: count }, (_, i) => ({
            id: i + 1,
            product: products[Math.floor(Math.random() * products.length)],
            amount: Math.floor(Math.random() * 10000) + 100,
            region: regions[Math.floor(Math.random() * regions.length)],
            status: statuses[Math.floor(Math.random() * statuses.length)],
            date: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            customer: `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`,
          }));
        } else if (type === 'customers') {
          const industries = ['Technology', 'Healthcare', 'Finance', 'Retail', 'Manufacturing'];
          const sizes = ['Small', 'Medium', 'Large', 'Enterprise'];
          const statuses = ['Active', 'Inactive', 'Prospect'];

          randomData = Array.from({ length: count }, (_, i) => {
            const name = `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
            return {
              id: i + 1,
              name: name,
              email: `${name.split(' ')[0].toLowerCase()}.${name.split(' ')[1].toLowerCase()}@company.com`,
              company: `${name.split(' ')[1]} ${industries[Math.floor(Math.random() * industries.length)]}`,
              industry: industries[Math.floor(Math.random() * industries.length)],
              size: sizes[Math.floor(Math.random() * sizes.length)],
              status: statuses[Math.floor(Math.random() * statuses.length)],
              lastContact: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            };
          });
        }
      }

      setCustomData(randomData);
      if (onDataChange) onDataChange(randomData);
      setExportStatus('Data generated successfully!');
      setTimeout(() => setExportStatus(null), 3000);

      // Adjust configuration if requested
      if (shouldAdjustConfig && randomData.length > 0) {
        const sampleRecord = randomData[0] as Record<string, unknown>;
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
              const endpointName = customEndpoint.trim() || 'Custom';
              return endpointName.charAt(0).toUpperCase() + endpointName.slice(1) + ' Data';
            }
            default:
              return 'Data Management';
          }
        };

        const newConfig = {
          ...JSON.parse(configJson),
          title: getTitleForType(type),
          fields: fields
        };

        const newConfigJson = JSON.stringify(newConfig, null, 2);
        setConfigJson(newConfigJson);
        setConfig(newConfig);
        if (onConfigChange) onConfigChange(newConfig);
      }

      return randomData;
    } catch (error) {
      console.error('Error generating data:', error);
      setExportStatus('Error generating data. Using local generation.');
      setTimeout(() => setExportStatus(null), 3000);

      // Fallback to local generation
      const fallbackData = Array.from({ length: count }, (_, i) => ({
        id: i + 1,
        name: `User ${i + 1}`,
        email: `user${i + 1}@company.com`,
        role: 'User',
        department: 'General',
        status: Math.random() > 0.3,
        lastLogin: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      }));
      setCustomData(fallbackData);
      if (onDataChange) onDataChange(fallbackData);
      return fallbackData;
    }
  }, [configJson, onConfigChange, onDataChange, customEndpoint]);

  // Handle file upload
  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const jsonData = JSON.parse(e.target?.result as string);
        if (Array.isArray(jsonData)) {
          setCustomData(jsonData as Record<string, unknown>[]);
          if (onDataChange) onDataChange(jsonData as Record<string, unknown>[]);
          setExportStatus('Data uploaded successfully!');
          setTimeout(() => setExportStatus(null), 3000);
        } else {
          setExportStatus('Error: Data must be an array of objects');
          setTimeout(() => setExportStatus(null), 3000);
        }
      } catch {
        setExportStatus('Error: Invalid JSON file');
        setTimeout(() => setExportStatus(null), 3000);
      }
    };
    reader.readAsText(file);
    // Reset file input
    event.target.value = '';
  }, [onDataChange]);

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

  // Generate CodeSandbox link
  const generateCodeSandboxLink = useCallback(() => {
    const sandboxConfig = {
      title: 'Widgemo Demo',
      description: 'Interactive Widgemo configuration demo',
      template: 'react',
      files: {
        'index.js': {
          content: `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);`
        },
        'App.js': {
          content: `import React, { useState } from 'react';
import { Widgemo } from 'widgemo-core';

function App() {
  const [data] = useState(${JSON.stringify(customData, null, 2)});
  
  const config = ${configJson};
  
  const adapters = {
    fetchData: async () => ({ data, total: data.length }),
    createRecord: async (record) => ({ ...record, id: Date.now() }),
    updateRecord: async (id, record) => record,
    deleteRecord: async () => {},
  };

  return (
    <div className="container mt-4">
      <h1>Widgemo ${entityLabel} Management</h1>
      <Widgemo config={config} adapters={adapters} />
    </div>
  );
}

export default App;`
        },
        'package.json': {
          content: JSON.stringify({
            name: 'widgemo-demo',
            version: '0.1.0',
            dependencies: {
              'react': '^18.0.0',
              'react-dom': '^18.0.0',
              'widgemo-core': 'latest',
              'bootstrap': '^5.3.0'
            }
          }, null, 2)
        },
        'index.html': {
          content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Widgemo Demo</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
  <div id="root"></div>
</body>
</html>`
        }
      }
    };

    // Base64 encode the sandbox configuration
    const encodedConfig = btoa(JSON.stringify(sandboxConfig));
    const codesandboxUrl = `https://codesandbox.io/api/v1/sandboxes/define?parameters=${encodeURIComponent(encodedConfig)}`;

    // Open in new tab
    window.open(codesandboxUrl, '_blank');
  }, [configJson, customData, entityLabel]);

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

  // Dynamic adapters that use custom data
  const dynamicAdapters: WidgemoAdapters = {
    fetchData: async () => ({
      data: customData,
      total: customData.length,
    }),
    createRecord: async (record: Record<string, unknown>) => ({ ...record, id: Date.now() }),
    updateRecord: async (_id: unknown, record: Record<string, unknown>) => record,
    deleteRecord: async () => {},
  };

  const applyConfig = () => {
    try {
      // Remove comment lines (lines starting with //) before parsing
      const cleanJson = configJson
        .split('\n')
        .filter(line => !line.trim().startsWith('//'))
        .join('\n')
        .trim();

      const parsed = JSON.parse(cleanJson);
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
    setConfigJson(JSON.stringify(initialConfig, null, 2));
  }, [initialConfig]);

  useEffect(() => {
    setCustomData(initialData);
  }, [initialData]);

  const lastAppliedThemeRef = useRef(currentTheme);

  // Update JSON editor and apply changes when theme changes
  useEffect(() => {
    if (lastAppliedThemeRef.current !== currentTheme) {
      try {
        // Parse current JSON (remove any comments first)
        const cleanJson = configJson.split('\n').filter(line => !line.trim().startsWith('//')).join('\n');
        const currentConfig = JSON.parse(cleanJson || '{}');

        // Update theme in config
        const targetTheme = currentTheme.startsWith('theme-light') ? 'light' :
                           currentTheme.startsWith('theme-dark') ? 'dark' : 'light';

        const updatedConfig = {
          ...currentConfig,
          styling: {
            ...currentConfig.styling,
            theme: targetTheme
          }
        };
        setConfigJson(JSON.stringify(updatedConfig, null, 2));

        // Auto-apply the changes
        setConfig(updatedConfig);
        if (onConfigChange) onConfigChange(updatedConfig);
        setJsonError(null);

        lastAppliedThemeRef.current = currentTheme;
      } catch {
        // If JSON is invalid, just update the ref
        lastAppliedThemeRef.current = currentTheme;
      }
    }
  }, [currentTheme, configJson, onConfigChange]);

  const loadPreset = (presetConfig: WidgemoConfig, presetTitle?: string) => {
    const themedConfig = mergeThemeIntoConfig(presetConfig, currentTheme);
    const json = JSON.stringify(themedConfig, null, 2);
    const titleComment = presetTitle ? `// ${presetTitle}\n` : '';
    const commentedJson = `${titleComment}${json}`;
    setConfigJson(commentedJson);
    setConfig(themedConfig);
    if (onConfigChange) onConfigChange(themedConfig);
    // Don't apply the config automatically - wait for user to click Apply Changes
    setJsonError(null);
  };

  // Theming handlers
  const handlePrimaryColorChange = useCallback((color: string) => {
    setPrimaryColor(color);
  }, []);

  const handleUseDefaultsChange = useCallback((useDefaults: boolean) => {
    setUseThemeDefaults(useDefaults);
  }, []);

  const handleCustomThemeChange = useCallback((theme: Partial<WidgemoTheme>) => {
    setCustomTheme(theme);
  }, []);

  const handleDarkModeChange = useCallback((dark: boolean) => {
    setDarkMode(dark);
  }, []);

  const handleApplyTheme = useCallback(() => {
    if (useThemeDefaults) {
      setCustomTheme({});
      setPrimaryColor('#0066cc');
      setDarkMode(false);
    }
    setExportStatus('Theme applied to preview!');
    setTimeout(() => setExportStatus(null), 3000);
  }, [useThemeDefaults]);

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
      setAppliedLoading(loading);
      setAppliedError(error);
      if (overrideBaseColorEnabled) {
        setAppliedBaseColor(baseColor);
      } else {
        setAppliedBaseColor('');
      }
      setAppliedAutoContrast(autoContrast);
      setAppliedContrastAmount(contrastAmount);
      if (overrideBackgroundEnabled) {
        setAppliedOverrideBackground(overrideBackground);
      } else {
        setAppliedOverrideBackground('');
      }

      setApplyAdvancedProps(true);
      setExportStatus('Advanced properties applied successfully!');
      setTimeout(() => setExportStatus(null), 3000);
    } catch (error) {
      setExportStatus(`Error applying advanced properties: ${(error as Error).message}`);
      setTimeout(() => setExportStatus(null), 5000);
    }
  }, [overridesJson, styleJson, className, loading, error, baseColor, autoContrast, contrastAmount, overrideBackground, overrideBaseColorEnabled, overrideBackgroundEnabled]);

  const handleResetAll = useCallback(() => {
    setOverridesJson('{}');
    setClassName('');
    setStyleJson('{}');
    setLoading(false);
    setError('');
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

  // Icons handlers
  const handleIconLibraryChange = useCallback((library: 'none' | 'react-icons' | 'lucide' | 'heroicons') => {
    setIconLibrary(library);
  }, []);

  const handleTestIconNameChange = useCallback((name: string) => {
    setTestIconName(name);
  }, []);

  const handleTestIconSizeChange = useCallback((size: number) => {
    setTestIconSize(size);
  }, []);

  const handleTestIconClassNameChange = useCallback((className: string) => {
    setTestIconClassName(className);
  }, []);

  const handleCustomRenderIconChange = useCallback((code: string) => {
    setCustomRenderIcon(code);
  }, []);

  const handleApplyIcons = useCallback(() => {
    setExportStatus('Icon settings applied to preview!');
    setTimeout(() => setExportStatus(null), 3000);
  }, []);

  return (
    <div className="h-100 d-flex flex-column">
      <Card className="shadow theme-aware-card flex-grow-1">
        <Card.Body className="p-0 theme-aware-card h-100 d-flex flex-column">
          <Group className="h-100">
            <Panel defaultSize={35} minSize={30}>
              <div className="p-4 h-100 d-flex flex-column">
                {/* Export Status */}
                {exportStatus && (
                  <Alert variant={exportStatus.includes('Error') ? 'danger' : 'success'} className="py-2 mb-3">
                    {exportStatus}
                  </Alert>
                )}

                <div className="mb-3">
                  <div className="btn-group w-100" role="group">
                    <Button
                      variant={activeTab === 'config-editor' ? 'primary' : 'outline-primary'}
                      onClick={() => setActiveTab('config-editor')}
                      className="rounded-0"
                    >
                      Config Editor
                    </Button>
                    <Button
                      variant={activeTab === 'advanced-properties' ? 'primary' : 'outline-primary'}
                      onClick={() => setActiveTab('advanced-properties')}
                      className="rounded-0"
                    >
                      Advanced Properties
                    </Button>
                    <Button
                      variant={activeTab === 'theming' ? 'primary' : 'outline-primary'}
                      onClick={() => setActiveTab('theming')}
                      className="rounded-0"
                    >
                      Theming
                    </Button>
                    <Button
                      variant={activeTab === 'icons' ? 'primary' : 'outline-primary'}
                      onClick={() => setActiveTab('icons')}
                      className="rounded-0"
                    >
                      Icons
                    </Button>
                    <Button
                      variant={activeTab === 'sample-data' ? 'primary' : 'outline-primary'}
                      onClick={() => setActiveTab('sample-data')}
                      className="rounded-0"
                    >
                      Sample Data
                    </Button>
                  </div>
                </div>

                {activeTab === 'config-editor' && (
                  <JsonConfigTab
                    currentJson={configJson}
                    onJsonChange={(newJson) => {
                      setConfigJson(newJson);
                      if (jsonError) {
                        setJsonError(null);
                      }
                    }}
                    onApply={applyConfig}
                    presets={galleryConfigs}
                    onLoadPreset={loadPreset}
                    jsonError={jsonError}
                    onShowReference={() => setShowReferenceModal(true)}
                    onShowCodeSandbox={() => setShowCodeSandboxModal(true)}
                    onCopyToClipboard={copyToClipboard}
                    onDownloadConfig={downloadConfig}
                  />
                )}

                {activeTab === 'advanced-properties' && (
                  <PropsOverridesTab
                    overridesJson={overridesJson}
                    onOverridesJsonChange={handleOverridesJsonChange}
                    className={className}
                    onClassNameChange={handleClassNameChange}
                    styleJson={styleJson}
                    onStyleJsonChange={handleStyleJsonChange}
                    loading={loading}
                    onLoadingChange={handleLoadingChange}
                    error={error}
                    onErrorChange={handleErrorChange}
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
                  />
                )}

                {activeTab === 'theming' && (
                  <ThemingTab
                    primaryColor={primaryColor}
                    useThemeDefaults={useThemeDefaults}
                    customTheme={customTheme}
                    darkMode={darkMode}
                    onPrimaryColorChange={handlePrimaryColorChange}
                    onUseDefaultsChange={handleUseDefaultsChange}
                    onCustomThemeChange={handleCustomThemeChange}
                    onDarkModeChange={handleDarkModeChange}
                    onApplyTheme={handleApplyTheme}
                  />
                )}

                {activeTab === 'icons' && (
                  <IconsTab
                    iconLibrary={iconLibrary}
                    onIconLibraryChange={handleIconLibraryChange}
                    testIconName={testIconName}
                    onTestIconNameChange={handleTestIconNameChange}
                    testIconSize={testIconSize}
                    onTestIconSizeChange={handleTestIconSizeChange}
                    testIconClassName={testIconClassName}
                    onTestIconClassNameChange={handleTestIconClassNameChange}
                    customRenderIcon={customRenderIcon}
                    onCustomRenderIconChange={handleCustomRenderIconChange}
                    onApplyIcons={handleApplyIcons}
                  />
                )}

                {activeTab === 'sample-data' && (
                  <div className="d-flex flex-column h-100">
                    <div className="flex-shrink-0">
                      <p className="small text-muted mb-2">Sample Source Data <small className="ms-2">{customData.length} {entityLabelPlural.toLowerCase()}</small></p>
                      <div className="d-flex gap-2 flex-wrap mb-3">
                        <Button
                          variant="outline-success"
                          size="sm"
                          onClick={() => setShowGenerateModal(true)}
                        >
                          <FaRandom className="me-1" />
                          Generate
                        </Button>
                        <Form.Control
                          type="file"
                          accept=".json"
                          onChange={handleFileUpload}
                          style={{ display: 'none' }}
                          id="data-upload"
                        />
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => document.getElementById('data-upload')?.click()}
                        >
                          <FaUpload className="me-1" />
                          Upload JSON
                        </Button>
                      </div>
                    </div>
                    <div className="flex-grow-1 d-flex flex-column">
                      <Form.Label className="small fw-bold flex-shrink-0">JSON Data</Form.Label>
                      <Form.Control
                        as="textarea"
                        value={jsonEditorText}
                        onChange={(e) => setJsonEditorText(e.target.value)}
                        style={{ fontFamily: 'monospace', fontSize: '0.75rem', minHeight: '200px' }}
                        className="flex-grow-1"
                        spellCheck={false}
                      />
                    </div>
                    <div className="flex-shrink-0 mt-2">
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => {
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
                        }}
                      >
                        <FaCheck className="me-1" />
                        Save Changes
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </Panel>
            <Separator className="bg-secondary" style={{ width: '1.5px' }} />
            <Panel defaultSize={65} minSize={30}>
              <PreviewPanel
                config={config}
                adapters={dynamicAdapters}
                showConfigDetails={showConfigDetails}
                currentTheme={currentTheme}
                currentSandboxTheme={currentSandboxTheme}
                currentIconRenderer={currentIconRenderer}
                width={width}
                height={height}
                isAutoWidth={isAutoWidth}
                isAutoHeight={isAutoHeight}
                onWidthChange={setWidth}
                onHeightChange={setHeight}
                onAutoWidthChange={setIsAutoWidth}
                onAutoHeightChange={setIsAutoHeight}
                applyAdvancedProps={applyAdvancedProps}
                appliedOverrides={appliedOverrides}
                appliedClassName={appliedClassName}
                appliedStyleJson={appliedStyleJson}
                appliedLoading={appliedLoading}
                appliedError={appliedError}
                appliedBaseColor={appliedBaseColor}
                appliedOverrideBackground={appliedOverrideBackground}
                appliedAutoContrast={appliedAutoContrast}
                appliedContrastAmount={appliedContrastAmount}
              />
            </Panel>
          </Group>
        </Card.Body>
      </Card>

      {/* Modals - simplified for now */}
      <Modal show={showReferenceModal} onHide={() => setShowReferenceModal(false)} size="xl" centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <FaBook className="me-2" />
            Configuration Reference
            {referenceBreadcrumb.length > 1 && (
              <small className="text-muted ms-2">
                {referenceBreadcrumb.map((segment, index) => (
                  <span key={index}>
                    {index > 0 && <span className="mx-1">→</span>}
                    <span
                      className={index === referenceBreadcrumb.length - 1 ? 'fw-bold' : 'text-decoration-underline'}
                      style={{ cursor: index === referenceBreadcrumb.length - 1 ? 'default' : 'pointer' }}
                      onClick={() => index < referenceBreadcrumb.length - 1 && navigateToBreadcrumbIndex(index)}
                    >
                      {segment}
                    </span>
                  </span>
                ))}
              </small>
            )}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: '80vh', overflow: 'hidden' }}>
          <div className="row h-100">
            {/* Left Navigation Panel */}
            <div className="col-md-3 border-end" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
              <div className="p-3">
                {referenceBreadcrumb.length > 1 && (
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    className="mb-3 w-100"
                    onClick={navigateBack}
                  >
                    ← Back to {referenceBreadcrumb[referenceBreadcrumb.length - 2]}
                  </Button>
                )}

                <h6 className="mb-3 text-primary">Navigation</h6>
                <nav>
                  {Object.entries(
                    widgemoConfigProperties
                      .filter(prop => prop.category === currentReferenceSection)
                      .reduce((acc, prop) => {
                        if (!acc[prop.category]) acc[prop.category] = [];
                        acc[prop.category].push(prop);
                        return acc;
                      }, {} as Record<string, typeof widgemoConfigProperties>)
                  ).map(([category, properties]) => (
                    <div key={category} className="mb-3">
                      <h6 className="text-muted small mb-2">{category}</h6>
                      {properties.map((prop, index) => (
                        <button
                          key={index}
                          className={`nav-link text-start p-1 small ${
                            prop.status === 'implemented' ? 'text-success' :
                            prop.status === 'partial' ? 'text-warning' :
                            'text-danger'
                          }`}
                          onClick={() => {
                            const element = document.getElementById(`property-${category}-${prop.property}`);
                            element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                          }}
                          style={{ background: 'none', border: 'none', width: '100%', fontSize: '0.85rem' }}
                        >
                          {prop.property}
                          <span className="ms-1">
                            {prop.status === 'implemented' ? '✅' :
                             prop.status === 'partial' ? '⚠️' : '❌'}
                          </span>
                        </button>
                      ))}
                    </div>
                  ))}
                </nav>
              </div>
            </div>

            {/* Right Content Panel */}
            <div className="col-md-9" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
              {(() => {
                // Get current section properties
                const currentSectionProps = widgemoConfigProperties.filter(prop =>
                  prop.category === currentReferenceSection
                );

                return (
                  <>
                    {/* Section Header */}
                    <div className="mb-4">
                      <h4 className={`${
                        currentReferenceSection === 'WidgemoConfig' ? 'text-primary' :
                        currentReferenceSection === 'WidgemoProps' ? 'text-success' :
                        currentReferenceSection === 'WidgemoAdapters' ? 'text-warning' :
                        'text-info'
                      }`}>
                        {currentReferenceSection}
                        <span className="badge bg-light text-dark ms-2">{currentSectionProps.length} properties</span>
                      </h4>
                    </div>

                    {/* Properties List */}
                    {currentSectionProps.map((prop, index) => (
                      <div
                        key={index}
                        id={`property-${currentReferenceSection}-${prop.property}`}
                        className={`mb-3 p-3 border-start border-3 ${
                          currentReferenceSection === 'WidgemoConfig' ? 'border-primary' :
                          currentReferenceSection === 'WidgemoProps' ? 'border-success' :
                          currentReferenceSection === 'WidgemoAdapters' ? 'border-warning' :
                          'border-info'
                        }`}
                        style={{ backgroundColor: 'rgba(0,0,0,0.02)' }}
                      >
                        <div className="d-flex align-items-center mb-2">
                          <code className={`fw-bold me-2 ${
                            currentReferenceSection === 'WidgemoConfig' ? 'text-primary' :
                            currentReferenceSection === 'WidgemoProps' ? 'text-success' :
                            currentReferenceSection === 'WidgemoAdapters' ? 'text-warning' :
                            'text-info'
                          }`} style={{ fontSize: '1.1rem' }}>
                            {prop.property}
                          </code>
                          <span
                            className={`badge me-2 ${
                              prop.isComplexType ? 'bg-info text-white' : 'bg-secondary'
                            }`}
                            style={prop.isComplexType ? { cursor: 'pointer', textDecoration: 'underline', border: '1px solid #0dcaf0' } : {}}
                            onClick={() => {
                              if (prop.isComplexType && prop.complexTypeSection) {
                                navigateToSection(prop.complexTypeSection);
                              }
                            }}
                          >
                            {prop.type}
                          </span>
                          <span className={`badge ${
                            prop.status === 'implemented' ? 'bg-success' :
                            prop.status === 'partial' ? 'bg-warning text-dark' :
                            'bg-danger'
                          }`}>
                            {prop.status === 'implemented' ? '✅' : prop.status === 'partial' ? '⚠️' : '❌'} {prop.status.replace('-', ' ')}
                          </span>
                        </div>
                        <p className="text-muted mb-2">{prop.description}</p>
                        <div className="mb-2">
                          <strong className="text-muted">Usage:</strong>
                          <p className="mb-1">{prop.usage}</p>
                        </div>
                        {prop.example && (
                          <div>
                            <strong className="text-success">Example:</strong>
                            <pre className="bg-light p-2 rounded mt-1 mb-0" style={{ fontSize: '0.85rem' }}>
                              <code>{prop.example}</code>
                            </pre>
                          </div>
                        )}
                      </div>
                    ))}

                    {/* Show additional content only on root section */}
                    {currentReferenceSection === 'WidgemoConfig' && (
                      <>
                        <div className="mb-4">
                          <h6 className="text-info">Data Format Examples</h6>
                          <small className="text-muted mb-3 d-block">JSON structure examples for uploading custom data</small>

                          <div className="mb-3">
                            <h6 className="text-info">Users Data</h6>
                            <pre className="bg-light p-2 rounded small"><code>{`[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john.doe@company.com",
    "role": "Developer",
    "department": "Engineering",
    "status": true,
    "lastLogin": "2024-01-15"
  },
  {
    "id": 2,
    "name": "Jane Smith",
    "email": "jane.smith@company.com",
    "role": "Designer",
    "department": "Design",
    "status": false,
    "lastLogin": "2024-01-10"
  }
]`}</code></pre>
                          </div>

                          <div className="mb-3">
                            <h6 className="text-info">Sales Records</h6>
                            <pre className="bg-light p-2 rounded small"><code>{`[
  {
    "id": 1,
    "product": "Widget A",
    "amount": 1250.50,
    "region": "North",
    "status": "Completed",
    "date": "2024-01-15",
    "customer": "ABC Corp"
  },
  {
    "id": 2,
    "product": "Service X",
    "amount": 850.00,
    "region": "South",
    "status": "Pending",
    "date": "2024-01-14",
    "customer": "XYZ Ltd"
  }
]`}</code></pre>
                          </div>

                          <div className="mb-3">
                            <h6 className="text-info">Customer Data</h6>
                            <pre className="bg-light p-2 rounded small"><code>{`[
  {
    "id": 1,
    "name": "Alice Johnson",
    "email": "alice@company.com",
    "company": "Tech Solutions Inc",
    "industry": "Technology",
    "size": "Medium",
    "status": "Active",
    "lastContact": "2024-01-12"
  },
  {
    "id": 2,
    "name": "Bob Wilson",
    "email": "bob@enterprise.com",
    "company": "Global Corp",
    "industry": "Finance",
    "size": "Large",
    "status": "Active",
    "lastContact": "2024-01-10"
  }
]`}</code></pre>
                          </div>

                          <div className="mb-3">
                            <h6 className="text-info">API Data Sources</h6>
                            <p className="small text-muted mb-2">
                              <strong>JSONPlaceholder Options:</strong> The dropdown includes direct options for all JSONPlaceholder endpoints (users, posts, comments, albums, photos, todos) that fetch real sample data.
                            </p>
                            <p className="small text-muted mb-2">
                              <strong>Custom API Endpoint:</strong> For testing with external APIs, select "Custom API Endpoint" and provide a full URL (e.g., https://api.github.com/users, https://jsonplaceholder.typicode.com/comments).
                              The system will attempt to fetch and display data from any valid JSON API endpoint.
                            </p>
                          </div>
                        </div>

                        <div className="mb-4">
                          <h6 className="text-success">Preset Configurations</h6>
                          <small className="text-muted mb-3 d-block">Ready-to-use configuration templates</small>
                          {Object.entries(presetConfigs).map(([key, config]) => (
                            <div key={key} className="mb-3 p-2 border-start border-success">
                              <code className="text-success fw-bold">{key}</code>
                              <span className="badge bg-secondary ms-2">{config.title}</span>
                              <br />
                              <small className="text-muted">{config.mode} mode with {config.fields.length} fields</small>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </>
                );
              })()}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowReferenceModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showCodeSandboxModal} onHide={() => setShowCodeSandboxModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Export to CodeSandbox</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>CodeSandbox export functionality would go here.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCodeSandboxModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={() => { generateCodeSandboxLink(); setShowCodeSandboxModal(false); }}>
            Generate CodeSandbox
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showGenerateModal} onHide={() => setShowGenerateModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Generate Random Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label className="form-label">Data Type</label>
            <Form.Select value={dataType} onChange={(e) => setDataType(e.target.value)}>
              <option value="users">Users (Local)</option>
              <option value="sales">Sales Records (Local)</option>
              <option value="customers">Customers (Local)</option>
              <option value="users-jsonplaceholder">Users (JSONPlaceholder)</option>
              <option value="posts-jsonplaceholder">Posts (JSONPlaceholder)</option>
              <option value="comments-jsonplaceholder">Comments (JSONPlaceholder)</option>
              <option value="albums-jsonplaceholder">Albums (JSONPlaceholder)</option>
              <option value="photos-jsonplaceholder">Photos (JSONPlaceholder)</option>
              <option value="todos-jsonplaceholder">Todos (JSONPlaceholder)</option>
              <option value="custom-api">Custom API Endpoint</option>
            </Form.Select>
          </div>
          {(dataType === 'custom-api' || dataType.endsWith('-jsonplaceholder')) && (
            <div className="mb-3">
              <label className="form-label">
                {dataType === 'custom-api' ? 'API Endpoint URL' : 'JSONPlaceholder Endpoint'}
              </label>
              <Form.Control
                type="text"
                placeholder={
                  dataType === 'custom-api'
                    ? 'e.g., https://api.example.com/users'
                    : dataType.replace('-jsonplaceholder', '')
                }
                value={customEndpoint}
                onChange={(e) => setCustomEndpoint(e.target.value)}
                className="mb-2"
              />
              <small className="text-muted">
                {dataType === 'custom-api'
                  ? 'Enter a full API endpoint URL to fetch data from any system'
                  : `This will fetch from https://jsonplaceholder.typicode.com/${dataType.replace('-jsonplaceholder', '')}`
                }
              </small>
            </div>
          )}
          <div className="mb-3">
            <label className="form-label">Number of Records</label>
            <Form.Control
              type="number"
              min="1"
              max="100"
              value={recordCount}
              onChange={(e) => setRecordCount(parseInt(e.target.value) || 10)}
            />
          </div>
          <div className="mb-3">
            <Form.Check
              type="checkbox"
              label="Adjust current configuration to match generated data fields"
              checked={adjustConfig}
              onChange={(e) => setAdjustConfig(e.target.checked)}
            />
          </div>
          <div className="alert alert-info">
            <small>
              <strong>Local options</strong> generate synthetic data. <strong>JSONPlaceholder options</strong> fetch real sample data from jsonplaceholder.typicode.com.
              <strong>Custom API Endpoint</strong> allows you to test with any external API by providing a full URL (e.g., https://api.example.com/users).
              Adjusting configuration will update the fields in your current setup to match the generated data structure.
            </small>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowGenerateModal(false)}>
            Cancel
          </Button>
          <Button 
            variant="primary" 
            onClick={() => { 
              generateRandomData(dataType, recordCount, adjustConfig); 
              setShowGenerateModal(false); 
            }}
          >
            <FaRandom className="me-2" />
            Generate Data
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};