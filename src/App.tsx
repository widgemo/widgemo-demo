import { Widgemo } from 'widgemo-core';
import type { WidgemoConfig } from 'widgemo-core';
import { useState } from 'react';
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
    { name: 'active', label: 'Active', type: 'boolean' },
  ],
  actions: {
    create: true,
    edit: true,
    delete: true,
  },
};

function App() {
  const [data, setData] = useState<User[]>(mockUsers);

  const adapters = {
    fetchData: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      return { data: mockUsers, total: mockUsers.length };
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
      <h1>Widgemo Core Demo</h1>
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
