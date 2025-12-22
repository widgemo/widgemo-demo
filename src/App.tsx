import { Widgemo } from 'widgemo-core';
import type { WidgemoConfig } from 'widgemo-core';
import { useState, useEffect } from 'react';
import { Button, OverlayTrigger, Popover } from 'react-bootstrap';
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
    { name: 'active', label: 'Active', type: 'boolean', booleanTrueLabel:  '🟢 Online', booleanFalseLabel: '🔴 Offline' },
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
    { name: 'role', label: 'Role', type: 'select', options: [
      { value: 'Admin', label: 'Admin' },
      { value: 'User', label: 'User' },
    ], editable: true },
    { name: 'active', label: 'Active', type: 'boolean' },
  ],
  actions: { create: true, edit: true, delete: true },
  pagination: { enabled: true, defaultPageSize: 5 },
  sorting: { enabled: true },
  filtering: { enabled: true },
  styling: { table: { backgroundColor: 'var(--bg-color)', shadow: true } },
};

const cardsConfig: WidgemoConfig = {
  title: 'User Cards',
  mode: 'cards',
  dataSource: { type: 'static' },
  fields: [
    { name: 'id', label: 'ID', type: 'number', align: 'center', showLabel: false },
    { name: 'name', label: 'Name', type: 'text' },
    { name: 'email', label: 'Email', type: 'email', showLabel: false },
    { name: 'role', label: 'Role', type: 'select', options: [
      { value: 'Admin', label: 'Admin' },
      { value: 'User', label: 'User' },
    ] },
    { name: 'active', label: 'Active', type: 'boolean', align: 'right' },
  ],
  actions: { view: true },
  styling: { card: { shadow: true, borderRadius: '12px' } },
};

const tilesConfig: WidgemoConfig = {
  title: 'User Tiles',
  mode: 'tiles',
  dataSource: { type: 'static' },
  fields: [
    { name: 'name', label: 'Name', type: 'text' },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'role', label: 'Role', type: 'select', options: [
      { value: 'Admin', label: 'Admin' },
      { value: 'User', label: 'User' },
    ] },
  ],
  actions: { edit: true },
};

function App() {
  const [data, setData] = useState<User[]>(mockUsers);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
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
        <button 
          onClick={toggleTheme}
          style={{
            padding: '0.5rem 1rem',
            borderRadius: '0.5rem',
            border: `1px solid var(--border-color)`,
            background: `var(--button-bg)`,
            color: `var(--text-color)`,
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
        >
          {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
        </button>
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
      
      <div style={{ marginTop: '4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
        <h2>Tiles Mode</h2>
        <OverlayTrigger
          trigger="click"
          placement="auto"
          rootClose={true}
          overlay={ConfigPopover(tilesConfig)}
        >
          <Button variant="light" size="sm"><FaInfoCircle /> Config Details</Button>
        </OverlayTrigger>
      </div>
      <Widgemo config={tilesConfig} adapters={adapters} />
    </div>
  );
}

export default App;
