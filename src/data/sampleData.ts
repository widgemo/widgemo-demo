import type { WidgemoConfig } from '@widgemo/widgemo-core';
import type { SampleData } from './types';

// Neutral sample data for teaser - User Database
export const teaserSampleData: SampleData[] = [
  { id: 1, name: 'Alice Johnson', email: 'alice.johnson@company.com', role: 'Manager', department: 'Engineering', status: 'active', lastLogin: '2024-01-15', progress: 85, rating: 4.5, amount: 125000, src: 'https://media.istockphoto.com/id/1317804578/photo/one-businesswoman-headshot-smiling-at-the-camera.webp?a=1&b=1&s=612x612&w=0&k=20&c=0ez7MLSYsOlKDghpVAUDMVf_gT5B_DfKmRNKqElOLUA=' },
  { id: 2, name: 'Bob Smith', email: 'bob.smith@company.com', role: 'Developer', department: 'Engineering', status: 'active', lastLogin: '2024-01-14', progress: 92, rating: 4.8, amount: 95000, src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face' },
  { id: 3, name: 'Carol Williams', email: 'carol.williams@company.com', role: 'Designer', department: 'Design', status: 'inactive', lastLogin: '2024-01-10', progress: 45, rating: 3.9, amount: 78000, src: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face' },
  { id: 4, name: 'David Brown', email: 'david.brown@company.com', role: 'Developer', department: 'Engineering', status: 'pending', lastLogin: '2024-01-15', progress: 78, rating: 4.2, amount: 88000, src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' },
  { id: 5, name: 'Eva Davis', email: 'eva.davis@company.com', role: 'Analyst', department: 'Business', status: 'active', lastLogin: '2024-01-13', progress: 67, rating: 4.1, amount: 72000, src: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face' },
  { id: 6, name: 'Frank Miller', email: 'frank.miller@company.com', role: 'QA Engineer', department: 'Engineering', status: 'active', lastLogin: '2024-01-12', progress: 74, rating: 4.0, amount: 81000, src: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face' },
  { id: 7, name: 'Grace Wilson', email: 'grace.wilson@company.com', role: 'Product Manager', department: 'Product', status: 'pending', lastLogin: '2024-01-11', progress: 58, rating: 3.8, amount: 99000, src: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face' },
  { id: 8, name: 'Henry Taylor', email: 'henry.taylor@company.com', role: 'DevOps Engineer', department: 'Infrastructure', status: 'active', lastLogin: '2024-01-16', progress: 88, rating: 4.6, amount: 102000, src: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face' },
  { id: 9, name: 'Ivy Martinez', email: 'ivy.martinez@company.com', role: 'UX Researcher', department: 'Design', status: 'inactive', lastLogin: '2024-01-08', progress: 39, rating: 3.7, amount: 76000, src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face' },
  { id: 10, name: 'Jack Anderson', email: 'jack.anderson@company.com', role: 'Data Analyst', department: 'Business', status: 'active', lastLogin: '2024-01-09', progress: 63, rating: 4.0, amount: 79000, src: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face' },
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
      actions: [
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
      ]
    },
  }
};

