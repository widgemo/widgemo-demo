import { Widgemo } from 'widgemo-core';
import type { WidgemoConfig } from 'widgemo-core';
import { useState, useEffect } from 'react';
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
      <Widgemo config={exampleConfig} adapters={adapters} />
      
      <h2 style={{ marginTop: '4rem' }}>Another Widgemo (Cards mode)</h2>
      <Widgemo
        config={{ ...exampleConfig, mode: 'cards', title: 'Users as Cards' }}
        adapters={adapters}
      />
    </div>
  );
}

export default App;
