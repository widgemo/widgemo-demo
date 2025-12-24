import { Widgemo } from 'widgemo-core';
import type { WidgemoConfig } from 'widgemo-core';
import { useState, useEffect } from 'react';
import { Button, DropdownButton, Dropdown } from 'react-bootstrap';
import './App.css';

// Define User type
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  active: boolean;
}

// Mock data for demonstration
const mockUsers: User[] = [
  { id: 1, name: 'Alice', email: 'alice@example.com', role: 'Admin', active: true },
  { id: 2, name: 'Bob', email: 'bob@example.com', role: 'User', active: false },
];

const exampleConfig: WidgemoConfig = {
  title: 'Users Management',
  // mode: 'table', // Now optional - defaults to 'table'
  dataSource: { type: 'static' },
  fields: [
    { name: 'id', label: 'ID', type: 'number' },
    { name: 'name', label: 'Full Name', type: 'text' },
    { name: 'email', label: 'Email', type: 'text' },
    {
      name: 'role',
      label: 'Role',
      type: 'select',
      options: [
        { value: 'Admin', label: 'Administrator' },
        { value: 'User', label: 'Regular User' },
      ],
    },
    { name: 'active', label: 'Active', type: 'boolean', booleanTrueLabel: '🟢 Online', booleanFalseLabel: '🔴 Offline' },
  ],
  actions: {
    create: true,
    edit: true,
    delete: true,
  },
  labels: {
    add: 'Add Record',
    empty: 'No data yet — but fetch succeeded!',
    loading: 'Loading records...',
  },
};

// Full configuration with all possible properties (commented out unused ones)
const fullConfigJson = `{
  "id": "users-management", // Optional ID for debugging
  "title": "Users Management",
  // "mode": "table", // Optional: 'table' | 'cards' | 'tiles' | 'chart' | 'text' | 'image' | 'list' (defaults to 'table')
  // "defaultMode": "table", // Optional: Default mode when mode is not specified ('table' | 'cards' | 'tiles' | 'chart' | 'text' | 'image' | 'list')
  // "collapsible": "expanded", // 'collapsed' | 'expanded' | 'fixed' (default: 'expanded')
  // "tableName": "users", // Table name for database operations
  // "customComponent": null, // Custom component for rendering records
  // "drillDown": null, // Drill-down function for navigation
  "dataSource": {
    "type": "static", // 'static' | 'api' | 'graphql' | 'custom'
    // "config": {} // Additional configuration for the data source
  },
  "fields": [
    { "name": "id", "label": "ID", "type": "number" },
    { "name": "name", "label": "Full Name", "type": "text" },
    { "name": "email", "label": "Email", "type": "email" },
    {
      "name": "role",
      "label": "Role",
      "type": "select",
      "options": [
        { "value": "Admin", "label": "Administrator" },
        { "value": "User", "label": "Regular User" }
      ]
    },
    { "name": "active", "label": "Active", "type": "boolean", "booleanTrueLabel": "🟢 Online", "booleanFalseLabel": "🔴 Offline" }
  ],
  "actions": {
    "create": true,
    "edit": true,
    "delete": true
    // "view": false, // Enable view/detail functionality
    // "custom": [] // Custom actions array
  },
  // "chartConfig": { // Chart-specific configuration
  //   "type": "bar", // 'bar' | 'line' | 'pie' | 'area' | 'scatter'
  //   "xAxis": "name",
  //   "yAxis": "id"
  // },
  // "pagination": { // Pagination configuration
  //   "enabled": true,
  //   "defaultPageSize": 10,
  //   "pageSizeOptions": [5, 10, 25, 50]
  // },
  // "sorting": { // Sorting configuration
  //   "enabled": true,
  //   "defaultSort": { "field": "name", "direction": "asc" }
  // },
  // "filtering": { // Filtering configuration
  //   "enabled": true,
  //   "filters": []
  // },
  // "styling": { // Styling and theming options
  //   "className": "",
  //   "theme": "light", // 'light' | 'dark' | 'auto'
  //   "compact": false,
  //   "baseColor": "#ffffff", // Base color for automatic background contrast
  //   "autoContrast": true, // Enable automatic background contrast adjustment
  //   "contrastAmount": 0.05, // Contrast adjustment amount (0-1)
  //   "overrideBackground": false, // Override default background with computed color
  //   "table": {
  //     "showBorder": true,
  //     "borderStyle": "solid",
  //     "cellBorder": true,
  //     "backgroundColor": "var(--bg-color)",
  //     "shadow": true
  //   },
  //   "card": {
  //     "showBorder": true,
  //     "borderRadius": "4px",
  //     "shadow": true
  //   }
  // },
  // "emptyState": { // Empty state configuration
  //   "message": "No data available",
  //   "action": { "label": "Add First Item", "onClick": null }
  // },
  // "i18n": { // Internationalization options
  //   "locale": "en",
  //   "messages": {}
  // },
  // "header": { // Header configuration
  //   "showRefresh": "always",
  //   "showViewToggle": "discoverable",
  //   "showColumnSelector": "none",
  //   "showDeletedToggle": "none",
  //   "showAdd": "always",
  //   "includeDeleted": false
  // },
  "labels": { // Configurable UI strings
    "add": "Add Record",
    "empty": "No data yet — but fetch succeeded!",
    "loading": "Loading records..."
    // "refresh": "Refresh",
    // "actions": "Actions"
  }
}`;

const tableConfig2: WidgemoConfig = {
  title: 'Advanced Table',
  mode: 'table',
  dataSource: { type: 'static' },
  fields: [
    { name: 'id', label: 'ID', type: 'number', align: 'center' },
    { name: 'name', label: 'Name', type: 'text', sortable: true },
    { name: 'email', label: 'Email', type: 'email', filterable: true },
    {
      name: 'role', label: 'Role', type: 'select', options: [
        { value: 'Admin', label: 'Admin' },
        { value: 'User', label: 'User' },
      ], editable: true
    },
    { name: 'active', label: 'Active', type: 'boolean' },
  ],
  actions: { create: true, edit: true, delete: true },
  pagination: { enabled: true, defaultPageSize: 5 },
  sorting: { enabled: true },
  filtering: { enabled: true },
  header: { showRefresh: 'always', showViewToggle: 'discoverable', showAdd: 'always' },
  styling: { table: { backgroundColor: 'var(--bg-color)', shadow: true } },
};

const simpleTableConfig: WidgemoConfig = {
  title: 'Simple Table',
  mode: 'table',
  dataSource: { type: 'static' },
  fields: [
    { name: 'id', label: 'ID', type: 'number' },
    { name: 'name', label: 'Name', type: 'text' },
    { name: 'email', label: 'Email', type: 'email' },
    {
      name: 'role', label: 'Role', type: 'select', options: [
        { value: 'Admin', label: 'Admin' },
        { value: 'User', label: 'User' },
      ]
    },
    { name: 'active', label: 'Active', type: 'boolean' },
  ],
  styling: { table: { backgroundColor: 'var(--bg-color)', shadow: true } },
};

const sortingTableConfig: WidgemoConfig = {
  title: 'Table with Sorting',
  mode: 'table',
  dataSource: { type: 'static' },
  fields: [
    { name: 'id', label: 'ID', type: 'number', sortable: true },
    { name: 'name', label: 'Name', type: 'text', sortable: true },
    { name: 'email', label: 'Email', type: 'email', sortable: true },
    {
      name: 'role', label: 'Role', type: 'select', options: [
        { value: 'Admin', label: 'Admin' },
        { value: 'User', label: 'User' },
      ], sortable: true
    },
    { name: 'active', label: 'Active', type: 'boolean', sortable: true },
  ],
  actions: { view: true },
  sorting: { enabled: true },
  styling: { table: { backgroundColor: 'var(--bg-color)', shadow: true } },
};

const filteringTableConfig: WidgemoConfig = {
  title: 'Table with Filtering',
  mode: 'table',
  dataSource: { type: 'static' },
  fields: [
    { name: 'id', label: 'ID', type: 'number', filterable: true },
    { name: 'name', label: 'Name', type: 'text', filterable: true },
    { name: 'email', label: 'Email', type: 'email', filterable: true },
    {
      name: 'role', label: 'Role', type: 'select', options: [
        { value: 'Admin', label: 'Admin' },
        { value: 'User', label: 'User' },
      ], filterable: true
    },
    { name: 'active', label: 'Active', type: 'boolean', filterable: true },
  ],
  actions: { edit: true },
  filtering: { enabled: true },
  styling: { table: { backgroundColor: 'var(--bg-color)', shadow: true } },
};

const compactTableConfig: WidgemoConfig = {
  title: 'Compact Table',
  mode: 'table',
  dataSource: { type: 'static' },
  fields: [
    { name: 'id', label: 'ID', type: 'number', align: 'center' },
    { name: 'name', label: 'Name', type: 'text' },
    { name: 'email', label: 'Email', type: 'email' },
    {
      name: 'role', label: 'Role', type: 'select', options: [
        { value: 'Admin', label: 'Admin' },
        { value: 'User', label: 'User' },
      ]
    },
    { name: 'active', label: 'Active', type: 'boolean' },
  ],
  actions: { create: true, edit: true, delete: true },
  pagination: { enabled: true, defaultPageSize: 3 },
  sorting: { enabled: true },
  filtering: { enabled: true },
  styling: { table: { backgroundColor: 'var(--bg-color)', shadow: false } },
};

const minimalTableConfig: WidgemoConfig = {
  title: 'Minimal Table',
  mode: 'table',
  dataSource: { type: 'static' },
  fields: [
    { name: 'id', label: 'ID', type: 'number' },
    { name: 'name', label: 'Name', type: 'text' },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'role', label: 'Role', type: 'text' },
    { name: 'active', label: 'Active', type: 'boolean' },
  ],
};

const cardsConfig: WidgemoConfig = {
  title: 'User Cards',
  mode: 'cards',
  dataSource: { type: 'static' },
  fields: [
    { name: 'id', label: 'ID', type: 'number', align: 'center', showLabel: false },
    { name: 'name', label: 'Name', type: 'text' },
    { name: 'email', label: 'Email', type: 'email', showLabel: false },
    {
      name: 'role', label: 'Role', type: 'select', options: [
        { value: 'Admin', label: 'Admin' },
        { value: 'User', label: 'User' },
      ]
    },
    { name: 'active', label: 'Active', type: 'boolean', align: 'right' },
  ],
  actions: { view: true },
  styling: { card: { shadow: true } },
};

const cardsWithLabelsConfig: WidgemoConfig = {
  title: 'Cards with Labels',
  mode: 'cards',
  dataSource: { type: 'static' },
  fields: [
    { name: 'id', label: 'ID', type: 'number', align: 'center', showLabel: true },
    { name: 'name', label: 'Name', type: 'text', showLabel: true },
    { name: 'email', label: 'Email', type: 'email', showLabel: true },
    {
      name: 'role', label: 'Role', type: 'select', options: [
        { value: 'Admin', label: 'Admin' },
        { value: 'User', label: 'User' },
      ], showLabel: true
    },
    { name: 'active', label: 'Active', type: 'boolean', align: 'right', showLabel: true },
  ],
  actions: { view: true },
  styling: { card: { shadow: true } },
};

const cardsWithActionsConfig: WidgemoConfig = {
  title: 'Cards with Full Actions',
  mode: 'cards',
  dataSource: { type: 'static' },
  fields: [
    { name: 'id', label: 'ID', type: 'number', align: 'center', showLabel: false },
    { name: 'name', label: 'Name', type: 'text' },
    { name: 'email', label: 'Email', type: 'email', showLabel: false },
    {
      name: 'role', label: 'Role', type: 'select', options: [
        { value: 'Admin', label: 'Admin' },
        { value: 'User', label: 'User' },
      ]
    },
    { name: 'active', label: 'Active', type: 'boolean', align: 'right' },
  ],
  actions: { create: true, edit: true, delete: true },
  header: { showRefresh: 'none', showDeletedToggle: 'always', showAdd: 'always' },
  styling: { card: { shadow: true } },
};

const minimalCardsConfig: WidgemoConfig = {
  title: 'Minimal Cards',
  mode: 'cards',
  dataSource: { type: 'static' },
  fields: [
    { name: 'name', label: 'Name', type: 'text' },
    { name: 'email', label: 'Email', type: 'email' },
    {
      name: 'role', label: 'Role', type: 'select', options: [
        { value: 'Admin', label: 'Admin' },
        { value: 'User', label: 'User' },
      ]
    },
  ],
  styling: { card: { shadow: false } },
};

const centeredCardsConfig: WidgemoConfig = {
  title: 'Centered Cards',
  mode: 'cards',
  dataSource: { type: 'static' },
  fields: [
    { name: 'id', label: 'ID', type: 'number', align: 'center', showLabel: true },
    { name: 'name', label: 'Name', type: 'text', align: 'center', showLabel: true },
    { name: 'email', label: 'Email', type: 'email', align: 'center', showLabel: true },
    {
      name: 'role', label: 'Role', type: 'select', options: [
        { value: 'Admin', label: 'Admin' },
        { value: 'User', label: 'User' },
      ], align: 'center', showLabel: true
    },
    { name: 'active', label: 'Active', type: 'boolean', align: 'center', showLabel: true },
  ],
  actions: { edit: true },
  styling: { card: { shadow: true } },
};

const minimalCardConfig: WidgemoConfig = {
  title: 'Minimal Cards',
  mode: 'cards',
  dataSource: { type: 'static' },
  fields: [
    { name: 'id', label: 'ID', type: 'number' },
    { name: 'name', label: 'Name', type: 'text' },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'role', label: 'Role', type: 'text' },
    { name: 'active', label: 'Active', type: 'boolean' },
  ],
};

function App() {
  const [data, setData] = useState<User[]>(mockUsers);
  const [theme, setTheme] = useState<string>('light');
  const [config, setConfig] = useState<WidgemoConfig>(exampleConfig);
  const [configJson, setConfigJson] = useState<string>(fullConfigJson);

  const themes = [
    { name: 'Light Default', value: 'light' },
    { name: 'Light Blue', value: 'light-blue' },
    { name: 'Light Green', value: 'light-green' },
    { name: 'Dark Default', value: 'dark' },
    { name: 'Dark Red', value: 'dark-red' },
    { name: 'Dark Purple', value: 'dark-purple' },
  ];

  const themeBaseColors: Record<string, string> = {
    light: '#ffffff',
    'light-blue': '#f0f8ff',
    'light-green': '#f0fff0',
    dark: '#1a1a1a',
    'dark-red': '#2a1a1a',
    'dark-purple': '#f8f0ff',
  };

  const baseColor = themeBaseColors[theme] || '#ffffff';

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.body.className = `theme-${theme}`;
  }, [theme]);

  const applyConfig = () => {
    try {
      // Remove // comments before parsing
      const cleanedJson = configJson.replace(/\/\/.*$/gm, '').replace(/,\s*}/g, '}').replace(/,\s*]/g, ']');
      const newConfig = JSON.parse(cleanedJson) as WidgemoConfig;
      setConfig(newConfig);
    } catch (error) {
      alert('Invalid JSON: ' + (error as Error).message);
    }
  };

  const resetConfig = () => {
    setConfig(exampleConfig);
    setConfigJson(fullConfigJson);
  };

  const adapters = {
    fetchData: async (params: Record<string, unknown>) => {
      console.log('Widgemo called fetchData with params:', params);
      await new Promise(resolve => setTimeout(resolve, 300));
      const result = { data: mockUsers, total: mockUsers.length };
      console.log('fetchData returning:', result);
      return result;
    },
    createRecord: async (record: Record<string, unknown>) => {
      const newRecord = { ...record, id: Math.max(...data.map(d => d.id)) + 1 } as User;
      setData([...data, newRecord]);
      return newRecord;
    },
    updateRecord: async (id: number, record: Record<string, unknown>) => {
      setData(data.map(item => (item.id === id ? { ...item, ...record } : item)));
    },
    deleteRecord: async (id: number) => {
      setData(data.filter(item => item.id !== id));
    },
  };

    return (
    <div style={{ padding: '2rem' }}>
      <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Widgemo Core Demo</h1>
        <DropdownButton
          title={`Theme: ${themes.find(t => t.value === theme)?.name}`}
          onSelect={(eventKey) => eventKey && setTheme(eventKey)}
          variant="light"
          id="theme-dropdown"
        >
          {themes.map(t => (
            <Dropdown.Item
              key={t.value}
              eventKey={t.value}
              style={{ color: t.value.includes('light') ? '#000000' : '#ffffff' }}
            >
              {t.value.includes('light') ? '🌞' : '🌙'} {t.name}
            </Dropdown.Item>
          ))}
        </DropdownButton>
      </div>
      <Widgemo config={config} adapters={adapters} baseColor={baseColor} showConfigDetails={true} />

      <div style={{ marginTop: '2rem', marginBottom: '2rem' }}>
        <h3>Sandbox - Edit Configuration</h3>
        <textarea
          className="form-control"
          value={configJson}
          onChange={(e) => setConfigJson(e.target.value)}
          rows={20}
          style={{ fontFamily: 'monospace' }}
        />
        <div style={{ marginTop: '1rem' }}>
          <Button variant="primary" onClick={applyConfig} style={{ marginRight: '1rem' }}>Apply Changes</Button>
          <Button variant="secondary" onClick={resetConfig}>Reset to Default</Button>
        </div>
      </div>

      <h1 style={{ marginTop: '4rem', marginBottom: '2rem' }}>Table Variants</h1>

      <Widgemo config={tableConfig2} adapters={adapters} baseColor={baseColor} showConfigDetails={true} />
      <p></p>
      <Widgemo config={simpleTableConfig} adapters={adapters} baseColor={baseColor} showConfigDetails={true} />
      <p></p>
      <Widgemo config={sortingTableConfig} adapters={adapters} baseColor={baseColor} showConfigDetails={true} />
      <p></p>
      <Widgemo config={filteringTableConfig} adapters={adapters} baseColor={baseColor} showConfigDetails={true} />
      <p></p>
      <Widgemo config={compactTableConfig} adapters={adapters} baseColor={baseColor} showConfigDetails={true} />
      <p></p>
      <Widgemo config={minimalTableConfig} adapters={adapters} baseColor={baseColor} showConfigDetails={true} />

      <h1 style={{ marginTop: '4rem', marginBottom: '2rem' }}>Card Variants</h1>


      <Widgemo config={cardsConfig} adapters={adapters} baseColor={baseColor} showConfigDetails={true} />
      <p></p>
      <Widgemo config={cardsWithLabelsConfig} adapters={adapters} baseColor={baseColor} showConfigDetails={true} />
      <p></p>
      <Widgemo config={cardsWithActionsConfig} adapters={adapters} baseColor={baseColor} showConfigDetails={true} />
      <p></p>
      <Widgemo config={minimalCardsConfig} adapters={adapters} baseColor={baseColor} showConfigDetails={true} />
      <p></p>
      <Widgemo config={centeredCardsConfig} adapters={adapters} baseColor={baseColor} showConfigDetails={true} />
      <p></p>
      <Widgemo config={minimalCardConfig} adapters={adapters} baseColor={baseColor} showConfigDetails={true} />
    </div>
  );
}

export default App;
