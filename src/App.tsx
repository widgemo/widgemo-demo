import { Widgemo } from 'widgemo-core';
import type { WidgemoConfig } from 'widgemo-core';
import { useState, useEffect } from 'react';
import { Button, OverlayTrigger, Popover, DropdownButton, Dropdown } from 'react-bootstrap';
import { FaInfoCircle, FaCopy } from 'react-icons/fa';
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
  mode: 'table', // try 'cards', 'chart', etc.
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
  header: { showRefresh: true, showViewToggle: true },
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
  header: { showRefresh: false, showDeletedToggle: true },
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

  const themes = [
    { name: 'Light Default', value: 'light' },
    { name: 'Light Blue', value: 'light-blue' },
    { name: 'Light Green', value: 'light-green' },
    { name: 'Dark Default', value: 'dark' },
    { name: 'Dark Red', value: 'dark-red' },
    { name: 'Dark Purple', value: 'dark-purple' },
  ];

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

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

  const ConfigPopover = (config: WidgemoConfig) => (
    <Popover className="config-popover" style={{ width: '50vw', maxHeight: '60vh' }}>
      <Popover.Header className="d-flex align-items-center" style={{ position: 'relative', paddingRight: '2.5rem' }}>
        Configuration
        <Button
          variant="link"
          className="copy-button"
          size="sm"
          style={{ position: 'absolute', right: '0', top: '50%', transform: 'translateY(-50%)' }}
          onClick={async (e) => {
            e.stopPropagation();
            const text = JSON.stringify(config, null, 2);
            try {
              if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(text);
                alert('Configuration copied to clipboard!');
              } else {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = text;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                alert('Configuration copied to clipboard!');
              }
            } catch (err) {
              console.error('Failed to copy: ', err);
              alert('Failed to copy to clipboard');
            }
          }}
        >
          <FaCopy /> Copy
        </Button>
      </Popover.Header>
      <Popover.Body style={{ maxHeight: '50vh', overflowY: 'auto' }}>
        <pre>{JSON.stringify(config, null, 2)}</pre>
      </Popover.Body>
    </Popover>
  );

  return (
    <div className={`theme-${theme}`} style={{ padding: '2rem' }}>
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
      <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
        <OverlayTrigger
          trigger="click"
          placement="auto"
          rootClose={true}
          overlay={ConfigPopover(exampleConfig)}
        >
          <Button variant="light" size="sm"><FaInfoCircle /> Config Details</Button>
        </OverlayTrigger>
      </div>
      <Widgemo config={exampleConfig} adapters={adapters} />

      <h1 style={{ marginTop: '4rem', marginBottom: '2rem' }}>Table Variants</h1>

      <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Advanced Table with Pagination, Sorting, Filtering</h2>
        <OverlayTrigger
          trigger="click"
          placement="auto"
          rootClose={true}
          overlay={ConfigPopover(tableConfig2)}
        >
          <Button variant="light" size="sm"><FaInfoCircle /> Config Details</Button>
        </OverlayTrigger>
      </div>
      <Widgemo config={tableConfig2} adapters={adapters} />

      <div style={{ marginTop: '4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Simple Table</h2>
        <OverlayTrigger
          trigger="click"
          placement="auto"
          rootClose={true}
          overlay={ConfigPopover(simpleTableConfig)}
        >
          <Button variant="light" size="sm"><FaInfoCircle /> Config Details</Button>
        </OverlayTrigger>
      </div>
      <Widgemo config={simpleTableConfig} adapters={adapters} />

      <div style={{ marginTop: '4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Table with Sorting</h2>
        <OverlayTrigger
          trigger="click"
          placement="auto"
          rootClose={true}
          overlay={ConfigPopover(sortingTableConfig)}
        >
          <Button variant="light" size="sm"><FaInfoCircle /> Config Details</Button>
        </OverlayTrigger>
      </div>
      <Widgemo config={sortingTableConfig} adapters={adapters} />

      <div style={{ marginTop: '4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Table with Filtering</h2>
        <OverlayTrigger
          trigger="click"
          placement="auto"
          rootClose={true}
          overlay={ConfigPopover(filteringTableConfig)}
        >
          <Button variant="light" size="sm"><FaInfoCircle /> Config Details</Button>
        </OverlayTrigger>
      </div>
      <Widgemo config={filteringTableConfig} adapters={adapters} />

      <div style={{ marginTop: '4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Compact Table</h2>
        <OverlayTrigger
          trigger="click"
          placement="auto"
          rootClose={true}
          overlay={ConfigPopover(compactTableConfig)}
        >
          <Button variant="light" size="sm"><FaInfoCircle /> Config Details</Button>
        </OverlayTrigger>
      </div>
      <Widgemo config={compactTableConfig} adapters={adapters} />

      <div style={{ marginTop: '4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Minimal Table</h2>
        <OverlayTrigger
          trigger="click"
          placement="auto"
          rootClose={true}
          overlay={ConfigPopover(minimalTableConfig)}
        >
          <Button variant="light" size="sm"><FaInfoCircle /> Config Details</Button>
        </OverlayTrigger>
      </div>
      <Widgemo config={minimalTableConfig} adapters={adapters} />

      <h1 style={{ marginTop: '4rem', marginBottom: '2rem' }}>Card Variants</h1>

      <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Cards Mode</h2>
        <OverlayTrigger
          trigger="click"
          placement="auto"
          rootClose={true}
          overlay={ConfigPopover(cardsConfig)}
        >
          <Button variant="light" size="sm"><FaInfoCircle /> Config Details</Button>
        </OverlayTrigger>
      </div>
      <Widgemo config={cardsConfig} adapters={adapters} />

      <div style={{ marginTop: '4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Cards with Labels</h2>
        <OverlayTrigger
          trigger="click"
          placement="auto"
          rootClose={true}
          overlay={ConfigPopover(cardsWithLabelsConfig)}
        >
          <Button variant="light" size="sm"><FaInfoCircle /> Config Details</Button>
        </OverlayTrigger>
      </div>
      <Widgemo config={cardsWithLabelsConfig} adapters={adapters} />

      <div style={{ marginTop: '4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Cards with Full Actions</h2>
        <OverlayTrigger
          trigger="click"
          placement="auto"
          rootClose={true}
          overlay={ConfigPopover(cardsWithActionsConfig)}
        >
          <Button variant="light" size="sm"><FaInfoCircle /> Config Details</Button>
        </OverlayTrigger>
      </div>
      <Widgemo config={cardsWithActionsConfig} adapters={adapters} />

      <div style={{ marginTop: '4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Minimal Cards</h2>
        <OverlayTrigger
          trigger="click"
          placement="auto"
          rootClose={true}
          overlay={ConfigPopover(minimalCardsConfig)}
        >
          <Button variant="light" size="sm"><FaInfoCircle /> Config Details</Button>
        </OverlayTrigger>
      </div>
      <Widgemo config={minimalCardsConfig} adapters={adapters} />

      <div style={{ marginTop: '4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Centered Cards</h2>
        <OverlayTrigger
          trigger="click"
          placement="auto"
          rootClose={true}
          overlay={ConfigPopover(centeredCardsConfig)}
        >
          <Button variant="light" size="sm"><FaInfoCircle /> Config Details</Button>
        </OverlayTrigger>
      </div>
      <Widgemo config={centeredCardsConfig} adapters={adapters} />

      <div style={{ marginTop: '4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Minimal Cards</h2>
        <OverlayTrigger
          trigger="click"
          placement="auto"
          rootClose={true}
          overlay={ConfigPopover(minimalCardConfig)}
        >
          <Button variant="light" size="sm"><FaInfoCircle /> Config Details</Button>
        </OverlayTrigger>
      </div>
      <Widgemo config={minimalCardConfig} adapters={adapters} />
    </div>
  );
}

export default App;
