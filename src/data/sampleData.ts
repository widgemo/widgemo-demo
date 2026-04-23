import type { WidgemoConfig } from '@widgemo/widgemo-core';
import type { SampleData } from './types';

// Neutral sample data for teaser - User Database
export const teaserSampleData: SampleData[] = [
  { id: 1, name: 'Alice Johnson', email: 'alice.johnson@company.com', role: 'Manager', department: 'Engineering', status: 'active', lastLogin: '2024-01-15', progress: 85, rating: 4.5, amount: 125000, src: 'https://media.istockphoto.com/id/1317804578/photo/one-businesswoman-headshot-smiling-at-the-camera.webp?a=1&b=1&s=612x612&w=0&k=20&c=0ez7MLSYsOlKDghpVAUDMVf_gT5B_DfKmRNKqElOLUA=' },
  { id: 2, name: 'Bob Smith', email: 'bob.smith@company.com', role: 'Developer', department: 'Engineering', status: 'active', lastLogin: '2024-01-14', progress: 92, rating: 4.8, amount: 95000, src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face' },
  { id: 3, name: 'Carol Williams', email: 'carol.williams@company.com', role: 'Designer', department: 'Design', status: 'inactive', lastLogin: '2024-01-10', progress: 45, rating: 3.9, amount: 78000, src: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face' },
  { id: 4, name: 'David Brown', email: 'david.brown@company.com', role: 'Developer', department: 'Engineering', status: 'pending', lastLogin: '2024-01-15', progress: 78, rating: 4.2, amount: 88000, src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' },
  { id: 5, name: 'Eva Davis', email: 'eva.davis@company.com', role: 'Analyst', department: 'Business', status: 'active', lastLogin: '2024-01-13', progress: 67, rating: 4.1, amount: 72000, src: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face' },
];

export const defaultSandboxConfig: WidgemoConfig = {
  id: 'default-sandbox',
  zones: {
    header: {
      actions: [
        { id: 'refresh', label: 'Refresh', icon: 'refresh', placement: 'pinned' },
        { id: 'add', label: 'Add', icon: 'add', placement: 'pinned' }
      ]
    },
    content: {
      mode: 'table',
      layout: {},
      item: {
        layout: { type: 'auto' },
        fields: [
          { key: 'id', label: 'ID' },
          { key: 'name', label: 'Name' },
          { key: 'email', label: 'Email' },
          { key: 'role', label: 'Role' },
          { key: 'department', label: 'Department' },
          { key: 'status', label: 'Active' },
        ]
      },
      itemActions: [
        {
          id: 'edit',
          label: 'Edit',
          icon: 'edit',
          variant: 'secondary',
          placement: 'menu'
        },
        {
          id: 'delete',
          label: 'Delete',
          icon: 'trash',
          variant: 'danger',
          placement: 'menu'
        }
      ],
      data: []
    },
  }
};

