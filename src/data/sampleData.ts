import type { WidgemoConfig, WidgemoAdapters } from 'widgemo-core';
export interface SampleData extends Record<string, unknown> {
  id?: number;
  name: string;
  email?: string;
  role?: string;
  department?: string;
  status?: boolean;
  lastLogin?: string;
  value?: number;
  category?: string;
  metric?: string;
  month?: string;
  sales?: number;
  tasks?: number;
  rating?: string;
  feedback?: string;
  activeUsers?: number;
  totalUsers?: number;
}

// Neutral sample data for teaser - User Database
export const teaserSampleData: SampleData[] = [
  { id: 1, name: 'Alice Johnson', email: 'alice.johnson@company.com', role: 'Manager', department: 'Engineering', status: true, lastLogin: '2024-01-15' },
  { id: 2, name: 'Bob Smith', email: 'bob.smith@company.com', role: 'Developer', department: 'Engineering', status: true, lastLogin: '2024-01-14' },
  { id: 3, name: 'Carol Williams', email: 'carol.williams@company.com', role: 'Designer', department: 'Design', status: false, lastLogin: '2024-01-10' },
  { id: 4, name: 'David Brown', email: 'david.brown@company.com', role: 'Developer', department: 'Engineering', status: true, lastLogin: '2024-01-15' },
  { id: 5, name: 'Eva Davis', email: 'eva.davis@company.com', role: 'Analyst', department: 'Business', status: true, lastLogin: '2024-01-13' },
];

export const galleryConfigs: Array<{
  config: WidgemoConfig;
  name: string;
  description: string;
  data?: SampleData[];
  theme?: string;
  mode: string;
}> = [
  {
    name: 'Data Management Table',
    mode: 'table',
    config: {
      title: 'Users',
      mode: 'table',
      dataSource: { type: 'static' },
      fields: [
        { name: 'id', label: 'ID', type: 'number' },
        { name: 'name', label: 'Name', type: 'text' },
        { name: 'email', label: 'Email', type: 'text' },
        { name: 'role', label: 'Role', type: 'text' },
        { name: 'department', label: 'Department', type: 'text' },
        { name: 'status', label: 'Active', type: 'boolean' },
      ],
      actions: { create: true, edit: true, delete: true },
      header: { always: ['refresh'], onMenu: ['columnSelector', 'add'] },
      styling: { compact: true, shadow: true },
    },
    description: 'Full-featured user management table with CRUD operations',
    data: teaserSampleData,
    theme: 'light'
  },
  {
    name: 'Simple Cards',
    mode: 'cards',
    config: {
      title: 'Profile Cards',
      mode: 'cards',
      dataSource: { type: 'static' },
      fields: [
        { name: 'name', label: 'Name', type: 'text' },
        { name: 'email', label: 'Email', type: 'text' },
        { name: 'role', label: 'Role', type: 'text' },
        { name: 'department', label: 'Department', type: 'text' },
        { name: 'status', label: 'Active', type: 'boolean' },
      ],
      actions: { view: true },
      styling: { card: { shadow: true, showBorder: true }, shadow: true },
    },
    description: 'User profile cards with contact and role information',
    data: teaserSampleData,
    theme: 'light'
  },
  {
    name: 'Basic Tiles',
    mode: 'tiles',
    config: {
      title: 'Basic Tiles',
      mode: 'tiles',
      dataSource: { type: 'static' },
      fields: [
        { name: 'department', label: 'Department', type: 'text' },
        { name: 'name', label: 'Lead', type: 'text' },
        { name: 'role', label: 'Role', type: 'text' },
      ],
      styling: { compact: true },
    },
    description: 'Department tiles showing team leads and roles',
    data: teaserSampleData,
    theme: 'light'
  },
  {
    name: 'Clean Chart',
    mode: 'chart',
    config: {
      title: 'Chart',
      mode: 'chart',
      dataSource: { type: 'static' },
      fields: [
        { name: 'department', label: 'Department', type: 'text' },
        { name: 'name', label: 'User', type: 'text' },
        { name: 'status', label: 'Active', type: 'boolean' },
      ],
      chartConfig: {
        type: 'bar',
        xAxis: 'department',
        yAxis: 'status',
      },
      styling: {},
    },
    description: 'Chart showing active users by department',
    data: teaserSampleData,
    theme: 'light'
  },
  {
    name: 'Dynamic Background',
    mode: 'table',
    config: {
      title: 'Dynamic Background',
      mode: 'table',
      dataSource: { type: 'static' },
      fields: [
        { name: 'name', label: 'Name', type: 'text' },
        { name: 'role', label: 'Role', type: 'text' },
        { name: 'department', label: 'Department', type: 'text' },
        { name: 'status', label: 'Active', type: 'boolean' },
      ],
      styling: { dynamicBackground: false, shadow: true },
    },
    description: 'Table with dynamic background turned off. Dynamic background adapts to theme (lighter on dark themes, darker on light themes) by default',
    data: teaserSampleData,
    theme: 'dark'
  },
  {
    name: 'Minimal',
    mode: 'table',
    config: {
      mode: 'table',
      dataSource: { type: 'static' },
      fields: [
        { name: 'name', label: 'Name', type: 'text' },
        { name: 'lastLogin', label: 'Last Login', type: 'date' },
      ],
      header: { onMenu: ['refresh'] },
      styling: { compact: true },
    },
    description: 'Simple view of active users with login information',
    data: teaserSampleData,
    theme: 'light'
  },
  {
    name: 'Advanced',
    mode: 'table',
    config: {
      title: 'Advanced',
      mode: 'table',
      dataSource: { type: 'static' },
      fields: [
        { name: 'id', label: 'ID', type: 'number', sortable: true },
        { name: 'name', label: 'Name', type: 'text', filterable: true },
        { name: 'email', label: 'Email', type: 'text', filterable: true },
        {
          name: 'department', label: 'Department', type: 'select', options: [
            { value: 'Engineering', label: 'Engineering' },
            { value: 'Design', label: 'Design' },
            { value: 'Business', label: 'Business' },
          ], filterable: true
        },
        { name: 'role', label: 'Role', type: 'text' },
        { name: 'status', label: 'Active', type: 'boolean', filterable: true },
        { name: 'lastLogin', label: 'Last Login', type: 'date', sortable: true },
      ],
      actions: { create: true, edit: true, delete: true },
      pagination: { enabled: true, defaultPageSize: 5 },
      sorting: { enabled: true },
      filtering: { enabled: true },
      header: { always: ['refresh'], discoverable: ['viewToggle'], onMenu: ['columnSelector', 'add'] },
      styling: {},
    },
    description: 'Full-featured user management with pagination, sorting, and filtering',
    data: teaserSampleData,
    theme: 'light'
  },
  {
    name: 'Sales Dashboard',
    mode: 'chart',
    config: {
      title: 'Sales Performance',
      mode: 'chart',
      dataSource: { type: 'static' },
      fields: [
        { name: 'month', label: 'Month', type: 'text' },
        { name: 'sales', label: 'Sales', type: 'number' },
        { name: 'target', label: 'Target', type: 'number' },
      ],
      chartConfig: {
        type: 'line',
        xAxis: 'month',
        yAxis: 'sales',
        settings: {
          colors: ['#2196f3', '#4caf50'],
          showLegend: true,
        },
      },
      styling: { shadow: true },
    },
    description: 'Line chart showing sales performance over time',
    data: [
      { name: 'Jan', month: 'Jan', sales: 12000, target: 15000 },
      { name: 'Feb', month: 'Feb', sales: 15000, target: 15000 },
      { name: 'Mar', month: 'Mar', sales: 18000, target: 15000 },
      { name: 'Apr', month: 'Apr', sales: 14000, target: 15000 },
      { name: 'May', month: 'May', sales: 22000, target: 15000 },
      { name: 'Jun', month: 'Jun', sales: 19000, target: 15000 },
    ],
    theme: 'light'
  },
  {
    name: 'Task Management',
    mode: 'cards',
    config: {
      title: 'Task Board',
      mode: 'cards',
      dataSource: { type: 'static' },
      fields: [
        { name: 'title', label: 'Task', type: 'text' },
        { name: 'priority', label: 'Priority', type: 'select', options: [
          { value: 'high', label: 'High' },
          { value: 'medium', label: 'Medium' },
          { value: 'low', label: 'Low' },
        ]},
        { name: 'status', label: 'Status', type: 'text' },
        { name: 'assignee', label: 'Assignee', type: 'text' },
      ],
      actions: { edit: true, delete: true },
      styling: { card: { shadow: true }, shadow: true },
    },
    description: 'Kanban-style task cards with priority and status',
    data: [
      { name: 'Authentication', title: 'Implement user authentication', priority: 'high', status: false, assignee: 'Alice' },
      { name: 'Dashboard', title: 'Design new dashboard', priority: 'medium', status: true, assignee: 'Bob' },
      { name: 'Documentation', title: 'Write documentation', priority: 'low', status: false, assignee: 'Carol' },
      { name: 'Mobile', title: 'Fix mobile responsiveness', priority: 'high', status: true, assignee: 'David' },
    ],
    theme: 'light'
  },
];

// Default sandbox configuration
export const defaultSandboxConfig: WidgemoConfig = {
  title: 'User Sandbox',
  mode: 'table',
  dataSource: { type: 'static' },
  fields: [
    { name: 'id', label: 'ID', type: 'number' },
    { name: 'name', label: 'Name', type: 'text' },
    { name: 'email', label: 'Email', type: 'text' },
    { name: 'role', label: 'Role', type: 'text' },
    { name: 'department', label: 'Department', type: 'text' },
    { name: 'status', label: 'Active', type: 'boolean' },
  ],
  actions: { create: true, edit: true, delete: true },
  styling: { shadow: true, showBorder: true },
};

// Teaser configurations with varying settings for each mode
export const teaserConfigs: Array<{ config: WidgemoConfig; description: string }> = [
  {
    config: {
      title: 'User Management Table',
      mode: 'table',
      dataSource: { type: 'static' },
      fields: [
        { name: 'id', label: 'ID', type: 'number' },
        { name: 'name', label: 'Name', type: 'text' },
        { name: 'email', label: 'Email', type: 'text' },
        { name: 'role', label: 'Role', type: 'text' },
        { name: 'department', label: 'Department', type: 'text' },
        { name: 'status', label: 'Active', type: 'boolean', "booleanTrueLabel": "🟢 Online", "booleanFalseLabel": "🔴 Offline" },
      ],
      actions: { create: true, edit: true, delete: true },
      header: { always: ['refresh', 'add'], onMenu: ['deleteToggle'] },
      styling: { compact: true },
      labels: { add: 'Add User' }
    },
    description: 'Full-featured user management table'
  },
  {
    config: {
      title: 'User Profile Cards',
      mode: 'cards',
      dataSource: { type: 'static' },
      fields: [
        { name: 'name', label: 'Name', type: 'text' },
        { name: 'email', label: 'Email', type: 'text' },
        { name: 'role', label: 'Role', type: 'text' },
        { name: 'department', label: 'Department', type: 'text' },
      ],
      actions: { view: true },
      header: { always: ['refresh'] },
      styling: { card: { shadow: true, showBorder: true } },
    },
    description: 'User profile cards with contact info'
  },
  {
    config: {
      title: 'Department Overview',
      mode: 'tiles',
      dataSource: { type: 'static' },
      fields: [
        { name: 'department', label: 'Department', type: 'text' },
        { name: 'name', label: 'Lead', type: 'text' },
        { name: 'role', label: 'Role', type: 'text' },
      ],
      header: { always: ['refresh'] },
      styling: { compact: true },
    },
    description: 'Department tiles showing team leads'
  },
  {
    config: {
      title: 'User Activity Chart',
      mode: 'chart',
      dataSource: { type: 'static' },
      fields: [
        { name: 'department', label: 'Department', type: 'text' },
        { name: 'name', label: 'User', type: 'text' },
        { name: 'status', label: 'Active', type: 'boolean' },
      ],
      chartConfig: {
        type: 'bar',
        xAxis: 'department',
        yAxis: 'status',
      },
      styling: {},
    },
    description: 'Chart showing active users by department'
  },
];

// Mock adapters for all Widgemo instances
export const mockAdapters: WidgemoAdapters = {
  fetchData: async () => ({
    data: teaserSampleData,
    total: teaserSampleData.length,
  }),
  createRecord: async (record: Record<string, unknown>) => ({ ...record, id: Date.now() }),
  updateRecord: async (_id: unknown, record: Record<string, unknown>) => record,
  deleteRecord: async () => { },
};