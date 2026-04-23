import type { WidgemoConfig, WidgemoAdapters } from '@widgemo/widgemo-core';
import type { SampleData } from './types';

// Neutral sample data for teaser - User Database
export const teaserSampleData: SampleData[] = [
  { id: 1, name: 'Alice Johnson', email: 'alice.johnson@company.com', role: 'Manager', department: 'Engineering', status: 'active', lastLogin: '2024-01-15', progress: 85, rating: 4.5, amount: 125000, src: 'https://media.istockphoto.com/id/1317804578/photo/one-businesswoman-headshot-smiling-at-the-camera.webp?a=1&b=1&s=612x612&w=0&k=20&c=0ez7MLSYsOlKDghpVAUDMVf_gT5B_DfKmRNKqElOLUA=' },
  { id: 2, name: 'Bob Smith', email: 'bob.smith@company.com', role: 'Developer', department: 'Engineering', status: 'active', lastLogin: '2024-01-14', progress: 92, rating: 4.8, amount: 95000, src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face' },
  { id: 3, name: 'Carol Williams', email: 'carol.williams@company.com', role: 'Designer', department: 'Design', status: 'inactive', lastLogin: '2024-01-10', progress: 45, rating: 3.9, amount: 78000, src: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face' },
  { id: 4, name: 'David Brown', email: 'david.brown@company.com', role: 'Developer', department: 'Engineering', status: 'pending', lastLogin: '2024-01-15', progress: 78, rating: 4.2, amount: 88000, src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' },
  { id: 5, name: 'Eva Davis', email: 'eva.davis@company.com', role: 'Analyst', department: 'Business', status: 'active', lastLogin: '2024-01-13', progress: 67, rating: 4.1, amount: 72000, src: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face' },
];

// Sample data for currency precision handling
export const currencyPrecisionSampleData: SampleData[] = [
  { id: 1, description: 'Default (2 decimals)', amount: 123.456789, minFrac: 2, maxFrac: 2 },
  { id: 2, description: 'No decimals', amount: 123.456789, minFrac: 0, maxFrac: 0 },
  { id: 3, description: '1 decimal', amount: 123.456789, minFrac: 1, maxFrac: 1 },
  { id: 4, description: '3 decimals', amount: 123.456789, minFrac: 3, maxFrac: 3 },
  { id: 5, description: '0-2 decimals', amount: 123.456789, minFrac: 0, maxFrac: 2 },
  { id: 6, description: '1-4 decimals', amount: 123.456789, minFrac: 1, maxFrac: 4 },
  { id: 7, description: 'Crypto style (4-8)', amount: 0.12345678, minFrac: 4, maxFrac: 8 },
  { id: 8, description: 'Stock prices (2-4)', amount: 123.456789, minFrac: 2, maxFrac: 4 }
];

// Sample data for JSON field type testing
// Sample data for JSON field type testing
export const jsonSampleData: SampleData[] = [
  {
    id: 1,
    name: "Simple Object",
    jsonData: `{"name": "John", "age": 30, "active": true}`
  },
  {
    id: 2,
    name: "Nested Object", 
    jsonData: `{"user": {"id": 123, "profile": {"theme": "dark"}}, "settings": {"autoSave": false}}`
  },
  {
    id: 3,
    name: "Array Data",
    jsonData: `{"items": [{"id": 1, "name": "Item A"}, {"id": 2, "name": "Item B"}]}`
  }
];
// Sample data for currency compact handling
export const currencyCompactSampleData: SampleData[] = [
  { id: 1, description: 'Thousand', amount: 1500, threshold: 1000 },
  { id: 2, description: 'Ten Thousand', amount: 12500, threshold: 1000 },
  { id: 3, description: 'Hundred Thousand', amount: 250000, threshold: 1000 },
  { id: 4, description: 'Million', amount: 1850000, threshold: 1000 },
  { id: 5, description: 'Ten Million', amount: 12750000, threshold: 1000 },
  { id: 6, description: 'Billion', amount: 2300000000, threshold: 1000 },
  { id: 7, description: 'Higher Threshold', amount: 500000, threshold: 1000000 },
  { id: 8, description: 'No Compact', amount: 1500000, threshold: 10000000 }
];

// Sample data for currency EdgeCases handling
export const currencyEdgeCasesSampleData: SampleData[] = [
  { id: 1, description: 'Normal positive', value: 123.45 },
  { id: 2, description: 'Normal negative', value: -67.89 },
  { id: 3, description: 'Zero', value: 0 },
  { id: 4, description: 'Very small', value: 0.000001 },
  { id: 5, description: 'Very large', value: 999999999.99 },
  { id: 6, description: 'String number', value: '456.78' },
  { id: 7, description: 'Invalid string', value: 'not-a-number' },
  { id: 8, description: 'Null value', value: null },
  { id: 9, description: 'Undefined value', value: undefined },
  { id: 10, description: 'NaN', value: NaN }
];

// Sample data for currency decimal handling
export const currencyDecimalSampleData: SampleData[] = [
  { id: 1, description: 'Small amount', amount: 12.34 },
  { id: 2, description: 'Medium amount', amount: 123.45 },
  { id: 3, description: 'Large amount', amount: 1234.56 },
  { id: 4, description: 'Very large', amount: 12345.67 },
  { id: 5, description: 'Negative small', amount: -12.34 },
  { id: 6, description: 'Negative large', amount: -1234.56 },
  { id: 7, description: 'Zero amount', amount: 0.00 },
  { id: 8, description: 'Fractional', amount: 0.12 }
];

// Sample data for currency positioning  handling
export const currencyPositioningSampleData: SampleData[] = [
  { id: 1, description: 'USD Prefix (default)', currency: 'USD', position: 'prefix', amount: 123.45 },
  { id: 2, description: 'EUR Prefix', currency: 'EUR', position: 'prefix', amount: 123.45 },
  { id: 3, description: 'GBP Prefix', currency: 'GBP', position: 'prefix', amount: 123.45 },
  { id: 4, description: 'USD Suffix', currency: 'USD', position: 'suffix', amount: 123.45 },
  { id: 5, description: 'EUR Suffix', currency: 'EUR', position: 'suffix', amount: 123.45 },
  { id: 6, description: 'GBP Suffix', currency: 'GBP', position: 'suffix', amount: 123.45 },
  { id: 7, description: 'No Symbol', currency: 'USD', position: 'none', amount: 123.45 },
  { id: 8, description: 'Custom Position', currency: 'EUR', position: 'custom', amount: 123.45 }
];

// Sample data for currency international  handling
export const currencyInternationalSampleData: SampleData[] = [
  { id: 1, country: 'United States', currency: 'USD', locale: 'en-US', amount: 1234.56 },
  { id: 2, country: 'Germany', currency: 'EUR', locale: 'de-DE', amount: 1234.56 },
  { id: 3, country: 'United Kingdom', currency: 'GBP', locale: 'en-GB', amount: 1234.56 },
  { id: 4, country: 'Japan', currency: 'JPY', locale: 'ja-JP', amount: 1234.56 },
  { id: 5, country: 'France', currency: 'EUR', locale: 'fr-FR', amount: 1234.56 },
  { id: 6, country: 'Canada', currency: 'CAD', locale: 'en-CA', amount: 1234.56 },
  { id: 7, country: 'Australia', currency: 'AUD', locale: 'en-AU', amount: 1234.56 },
  { id: 8, country: 'Switzerland', currency: 'CHF', locale: 'de-CH', amount: 1234.56 }
];

// Sample data for currency examples  handling
export const currencyExamplesSampleData: SampleData[] = [
  { id: 1, name: 'US Product', price: 29.99, currency: 'USD', locale: 'en-US' },
  { id: 2, name: 'EU Product', price: 24.50, currency: 'EUR', locale: 'de-DE' },
  { id: 3, name: 'UK Product', price: 19.99, currency: 'GBP', locale: 'en-GB' },
  { id: 4, name: 'JP Product', price: 3500, currency: 'JPY', locale: 'ja-JP' },
  { id: 5, name: 'Large Amount', price: 1500000, currency: 'USD', locale: 'en-US' },
  { id: 6, name: 'Negative Amount', price: -45.67, currency: 'USD', locale: 'en-US' },
  { id: 7, name: 'Zero Amount', price: 0, currency: 'USD', locale: 'en-US' },
  { id: 8, name: 'Fractional Price', price: 12.3456, currency: 'USD', locale: 'en-US' }
];

// Sample data for Action Links handling
export const actionLinksSampleData: SampleData[] = [
  { id: 1, name: 'Edit Profile', action: 'edit', target: 'profile', url: '#edit-profile', text: 'Edit' },
  { id: 2, name: 'Delete Item', action: 'delete', target: 'item', url: '#delete', text: 'Delete' },
  { id: 3, name: 'Download File', action: 'download', target: 'report.pdf', url: '/api/download/report.pdf', text: 'Download' },
  { id: 4, name: 'Send Email', action: 'email', target: 'user@example.com', url: 'mailto:user@example.com', text: 'Email User' },
  { id: 5, name: 'Call Phone', action: 'call', target: '+1234567890', url: 'tel:+1234567890', text: 'Call Now' },
  { id: 6, name: 'Open Chat', action: 'chat', target: 'support', url: '#chat-support', text: 'Start Chat' }
];

// Sample data for Action Options handling
export const actionOptionsSampleData: SampleData[] = [
  { id: 1, name: 'Google Search', url: 'https://google.com', displayText: 'Search the Web', category: 'external' },
  { id: 2, name: 'GitHub Profile', url: 'https://github.com', displayText: 'View Code', category: 'external' },
  { id: 3, name: 'Local Docs', url: '/docs', displayText: 'Documentation', category: 'internal' },
  { id: 4, name: 'Company Site', url: 'https://example.com', displayText: 'Visit Company', category: 'external' },
  { id: 5, name: 'Dashboard', url: '/dashboard', displayText: 'Go to Dashboard', category: 'internal' },
  { id: 6, name: 'API Reference', url: 'https://api.example.com/docs', displayText: 'API Docs', category: 'external' }
];

// Sample data for Kanban handling
export const kanbanSampleData: SampleData[] = [
  { id: 1, name: 'Design homepage mockup', status: 'todo', priority: 'high', assignee: 'Alice' },
  { id: 2, name: 'Implement user authentication', status: 'in-progress', priority: 'high', assignee: 'Bob' },
  { id: 3, name: 'Write API documentation', status: 'review', priority: 'medium', assignee: 'Alice' },
  { id: 4, name: 'Fix mobile responsiveness', status: 'done', priority: 'low', assignee: 'Charlie' },
  { id: 5, name: 'Add unit tests', status: 'todo', priority: 'medium', assignee: 'Bob' },
  { id: 6, name: 'Setup CI/CD pipeline', status: 'in-progress', priority: 'high', assignee: 'Alice' },
  { id: 7, name: 'Database optimization', status: 'review', priority: 'medium', assignee: 'Charlie' },
  { id: 8, name: 'User feedback integration', status: 'todo', priority: 'low', assignee: 'Bob' }
];

// Sample data for Swatches handling
export const swatchesSampleData: SampleData[] = [
  { id: 1, name: 'Primary Color', color: '#007bff', description: 'Brand primary color' },
  { id: 2, name: 'Success Color', color: '#28a745', description: 'Success state color' },
  { id: 3, name: 'Warning Color', color: '#ffc107', description: 'Warning state color' },
  { id: 4, name: 'Danger Color', color: '#dc3545', description: 'Error state color' },
];

// Sample data for Currency Dynamic handling
export const currencyDynamicSampleData: SampleData[] = [
  { id: 1, product: 'US Software', region: 'US', currency: 'USD', price: 99.99, discount: 0 },
  { id: 2, product: 'EU Software', region: 'EU', currency: 'EUR', price: 89.99, discount: 10 },
  { id: 3, product: 'UK Software', region: 'UK', currency: 'GBP', price: 79.99, discount: 5 },
  { id: 4, product: 'JP Software', region: 'JP', currency: 'JPY', price: 12000, discount: 0 },
  { id: 5, product: 'CA Hardware', region: 'CA', currency: 'CAD', price: 249.99, discount: 15 },
  { id: 6, product: 'AU Service', region: 'AU', currency: 'AUD', price: 149.99, discount: 20 },
  { id: 7, product: 'CH Premium', region: 'CH', currency: 'CHF', price: 199.99, discount: 0 },
  { id: 8, product: 'Bulk Order', region: 'US', currency: 'USD', price: 50000, discount: 25 }
];

// Sample data for link testing
export const linkTestData: SampleData[] = [
  { id: 1, name: 'Google', url: 'https://google.com', description: 'Search Engine' },
  { id: 2, name: 'GitHub', url: 'https://github.com', description: 'Code Repository' },
  { id: 3, name: 'Stack Overflow', url: 'https://stackoverflow.com', description: 'Developer Q&A' },
  { id: 4, name: 'MDN Web Docs', url: 'https://developer.mozilla.org', description: 'Web Documentation' },
];

// Sample data for Ratings testing
export const ratingsSampleData: SampleData[] = [
  { id: 1, name: 'Product A', rating: 4.5, hearts: 3, cost: 5, reviews: 128 },
  { id: 2, name: 'Product B', rating: 3, hearts: 4.5, cost: 1, reviews: 45 },
  { id: 3, name: 'Product C', rating: 5, hearts: 2, cost: 1.6, reviews: 89 },
  { id: 4, name: 'Product D', rating: 0, hearts: 5, cost: 2.1, reviews: 0 },
  { id: 5, name: 'Product E', rating: 2.5, hearts: 1.5, cost: 0.8, reviews: 67 }
];

// Sample data for Progress testing
export const progressSampleData: SampleData[] = [
  { id: 1, name: 'High Priority Task', progress: 85, priority: 'high', size: 'large' },
  { id: 2, name: 'Medium Priority Task', progress: 60, priority: 'medium', size: 'medium' },
  { id: 3, name: 'Low Priority Task', progress: 30, priority: 'low', size: 'small' },
  { id: 4, name: 'Critical Task', progress: 95, priority: 'critical', size: 'large' },
  { id: 5, name: 'Normal Task', progress: 45, priority: 'medium', size: 'medium' }
];

// Sample data for Progress Variants testing
export const progressVariantsSampleData: SampleData[] = [
  { id: 1, name: 'Standard Progress', progress: 65, color: '#007bff' },
  { id: 2, name: 'Success Progress', progress: 80, color: '#28a745' },
  { id: 3, name: 'Warning Progress', progress: 45, color: '#ffc107' },
  { id: 4, name: 'Danger Progress', progress: 25, color: '#dc3545' },
  { id: 5, name: 'No Text Progress', progress: 70, color: '#6f42c1', showText: false },
  { id: 6, name: 'Tall Progress', progress: 55, color: '#20c997', height: '30px' }
];

// Sample data for Progress Example testing
export const progressExampleSampleData: SampleData[] = [
  { id: 1, name: 'Task A', progress: 75, status: 'in-progress', priority: 'high' },
  { id: 2, name: 'Task B', progress: 30, status: 'started', priority: 'medium' },
  { id: 3, name: 'Task C', progress: 100, status: 'completed', priority: 'low' },
  { id: 4, name: 'Task D', progress: 0, status: 'not-started', priority: 'high' },
  { id: 5, name: 'Task E', progress: 45, status: 'in-progress', priority: 'medium' },
  { id: 6, name: 'Task F', progress: 90, status: 'review', priority: 'low' },
  { id: 7, name: 'Task G', progress: -5, status: 'error', priority: 'high' }, // Test negative value
  { id: 8, name: 'Task H', progress: 150, status: 'overflow', priority: 'low' } // Test >100 value
];

// Sample data for Project and complex items layout testing
export const projectExampleSampleData: SampleData[] = [
  { id: 1, title: 'Task A', description: 'Description for Task A', completion: 75, status: 'active', priority: 'high', assignee: 'Alice', dueDate: '2024-02-15' },
  { id: 2, title: 'Task B', description: 'Description for Task B', completion: 30, status: 'active', priority: 'medium', assignee: 'Bob', dueDate: '2024-03-01' },
  { id: 3, title: 'Task C', description: 'Description for Task C', completion: 100, status: 'pending', priority: 'low', assignee: 'Charlie', dueDate: '2024-01-30' },
  { id: 4, title: 'Task D', description: 'Description for Task D', completion: 0, status: 'inactive', priority: 'high', assignee: 'David', dueDate: '2024-04-10' },
  { id: 5, title: 'Task E', description: 'Description for Task E', completion: 45, status: 'pending', priority: 'medium', assignee: 'Eva', dueDate: '2024-02-28' },
  { id: 6, title: 'Task F', description: 'Description for Task F', completion: 90, status: 'inactive', priority: 'low', assignee: 'Frank', dueDate: '2024-03-15' },
  { id: 7, title: 'Task G', description: 'Description for Task G', completion: -5, status: 'pending', priority: 'high', assignee: 'Grace', dueDate: '2024-04-01' },
  { id: 8, title: 'Task H', description: 'Description for Task H', completion: 150, status: 'active', priority: 'low', assignee: 'Hank', dueDate: '2024-05-20' } 
];

// Sample data for 12 users
export const twelveUsersData: SampleData[] = teaserSampleData.slice(0, 12);

// Additional data slices
export const twoUsersData: SampleData[] = teaserSampleData.slice(0, 2);
export const threeUsersData: SampleData[] = teaserSampleData.slice(0, 3);
export const fourUsersData: SampleData[] = teaserSampleData.slice(0, 4);
export const fiveUsersData: SampleData[] = teaserSampleData.slice(0, 5);
export const sixUsersData: SampleData[] = teaserSampleData.slice(0, 6);
export const eightUsersData: SampleData[] = teaserSampleData.slice(0, 8);

// Sample data for image gallery
export const imageGalleryData: SampleData[] = [
  { id: 1, name: 'Mountain Landscape', src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop', category: 'Nature', description: 'Beautiful mountain vista' },
  { id: 2, name: 'Ocean Sunset', src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=350&fit=crop', category: 'Nature', description: 'Stunning ocean sunset' },
  { id: 3, name: 'City Skyline', src: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop', category: 'Urban', description: 'Modern city skyline' },
  { id: 4, name: 'Forest Path', src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=400&fit=crop', category: 'Nature', description: 'Peaceful forest trail' },
  { id: 5, name: 'Desert Dunes', src: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=400&h=280&fit=crop', category: 'Nature', description: 'Golden desert landscape' },
  { id: 6, name: 'Architecture', src: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=320&fit=crop', category: 'Urban', description: 'Modern architectural design' },
  { id: 7, name: 'Wildlife', src: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=360&fit=crop', category: 'Wildlife', description: 'Majestic wildlife portrait' },
  { id: 8, name: 'Abstract Art', src: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=290&fit=crop', category: 'Art', description: 'Contemporary abstract art' },
  { id: 9, name: 'Street Photography', src: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=400&h=380&fit=crop', category: 'Urban', description: 'Vibrant street life' },
  { id: 10, name: 'Macro Nature', src: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=400&h=270&fit=crop', category: 'Nature', description: 'Detailed macro photography' },
  { id: 11, name: 'Portrait', src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=330&fit=crop', category: 'Portrait', description: 'Beautiful portrait photography' },
  { id: 12, name: 'Food Photography', src: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=310&fit=crop', category: 'Food', description: 'Delicious food presentation' },
];

export const galleryConfigs: Array<{
  id: string;
  config: WidgemoConfig;
  name: string;
  description: string;
  data?: SampleData[];
  mode: string;
}> = [
    {
      id: 'data-management',
      name: 'Data Management',
      mode: 'table',
      config: {
        id: 'data-management',
        zones: {
          header: {
            actions: [
              { id: 'add', label: 'Add User', icon: 'add', placement: 'pinned' },
              { id: 'refresh', label: 'Refresh', icon: 'refresh', placement: 'pinned' },
              { id: 'columnSelector', label: 'Columns', icon: 'settings', placement: 'menu' },
              { id: 'deletedToggle', label: 'Show Deleted', icon: 'eye', placement: 'menu' }
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
                placement: 'pinned',
                onClick: () => { } // Demo action
              },
              {
                id: 'delete',
                label: 'Delete',
                icon: 'trash',
                variant: 'danger',
                placement: 'pinned',
                onClick: () => { } // Demo action
              }
            ],
            data: teaserSampleData
          }
        },
        collapse: { initialState: 'expanded' }
      },
      description: 'Full-featured data management table with CRUD operations'
    },
    {
      id: 'kanban-board',
      name: 'Kanban Board',
      mode: 'board',
      config: {
        id: 'kanban-board',
        zones: {
          header: {
            actions: [
              {
                id: 'add',
                label: 'Add User Profile',
                icon: 'add',
                placement: 'pinned',
                onClick: () => alert('Add User Profile clicked!')
              }
            ]
          },
          content: {
            mode: 'board',
            layout: {},
            item: {
              layout: { type: 'auto' },
              fields: [
                { key: 'name', label: 'Name' },
                { key: 'role', label: 'Role' },
                { key: 'department', label: 'Department' },
                { key: 'status', label: 'Active' }
              ]
            },
            itemActions: [
              {
                id: 'view',
                label: 'View',
                icon: 'eye',
                variant: 'secondary',
                placement: 'pinned',
                onClick: (entity: any) => alert(`View ${entity.name}`)
              }
            ],
            data: teaserSampleData
          }
        },
        collapse: { initialState: 'expanded' }
      },
      description: 'Kanban style board with configurable columns and swimlanes. Drag and drop to rearrange cards.'
    },
    {
      id: 'image-grid-contain-fit',
      name: 'Image Grid - Contain Fit',
      mode: 'grid',
      config: {
        id: 'image-grid-contain-fit',
        zones: {
          header: {
            actions: [
              { id: 'refresh', label: 'Refresh', icon: 'refresh', placement: 'pinned' }
            ]
          },
          content: {
            mode: 'grid',
            layout: {},
            item: {
              layout: { type: 'auto' },
              fields: [
                { key: 'name', label: 'Title' },
                { key: 'category', label: 'Category' },
              ]
            },
            data: imageGalleryData.slice(0, 9)
          }
        },
        collapse: { initialState: 'expanded' }
      },
      description: 'Image grid using "contain" object-fit, showing full images with potential letterboxing/pillarboxing.'
    },
    {
      id: 'clean-chart',
      name: 'Clean Chart',
      mode: 'chart',
      config: {
        id: 'image-gallery',
        zones: {
          header: {
            actions: [
              { id: 'refresh', label: 'Refresh', icon: 'refresh', placement: 'pinned' }
            ]
          },
          content: {
            mode: 'chart',
            layout: {},
            item: {
              layout: { type: 'auto' },
              fields: [
                { key: 'department', label: 'Department' },
                { key: 'name', label: 'User' },
                { key: 'status', label: 'Active' },
              ]
            },
            data: teaserSampleData
          }
        }
      },
      description: 'Chart showing active users by department'
    },
    {
      id: 'basic-grid',
      name: 'Basic Grid',
      mode: 'grid',
      config: {
        id: 'basic-grid',
        zones: {
          header: {
            actions: [
              { id: 'refresh', label: 'Refresh', icon: 'refresh', placement: 'pinned' }
            ]
          },
          content: {
            mode: 'grid',
            layout: {},
            item: {
              layout: { type: 'auto' },
              fields: [
                { key: 'department', label: 'Department' },
                { key: 'name', label: 'Lead' },
                { key: 'role', label: 'Role' },
              ]
            },
            data: teaserSampleData
          }
        }
      },
      description: 'Department grid showing team leads and roles'
    },
    {
      id: 'dynamic-background',
      name: 'Dynamic Background',
      mode: 'table',
      config: {
        id: 'dynamic-background',

        zones: {
          content: {
            mode: 'table',
            layout: {},
            item: {
              layout: { type: 'auto' },
              fields: [
                { key: 'name', label: 'Name' },
                { key: 'role', label: 'Role' },
                { key: 'department', label: 'Department' },
                { key: 'status', label: 'Active' },
              ]
            },
            data: teaserSampleData
          }
        }
      },
      description: 'Table with dynamic background turned off. Dynamic background adapts to theme (lighter on dark themes, darker on light themes) by default'
    },
    {
      id: 'minimal-table',
      name: 'Minimal Table',
      mode: 'table',
      config: {
        id: 'minimal-table',
        zones: {
          header: {
            actions: [
              { id: 'refresh', label: 'Refresh', icon: 'refresh', placement: 'menu' }
            ]
          },
          content: {
            mode: 'table',
            layout: {},
            item: {
              layout: { type: 'auto' },
              fields: [
                { key: 'name', label: 'Name' },
                { key: 'lastLogin', label: 'Last Login' },
              ]
            },
            data: teaserSampleData
          }
        }
      },
      description: 'Simple table view without header and controls'
    },
    {
      id: 'advanced',
      name: 'Advanced',
      mode: 'table',
      config: {
        id: 'advanced',
        zones: {
          header: {
            actions: [
              { id: 'refresh', label: 'Refresh', icon: 'refresh', placement: 'pinned' },
              { id: 'viewToggle', label: 'View Toggle', icon: 'eye', placement: 'menu' },
              { id: 'columnSelector', label: 'Columns', icon: 'settings', placement: 'menu' },
              { id: 'add', label: 'Add', icon: 'add', placement: 'menu' }
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
                { key: 'department', label: 'Department' },
                { key: 'role', label: 'Role' },
                { key: 'status', label: 'Active' },
                { key: 'lastLogin', label: 'Last Login' },
              ]
            },
            itemActions: [
              {
                id: 'edit',
                label: 'Edit',
                icon: 'edit',
                variant: 'secondary',
                placement: 'menu',
                onClick: () => { } // Demo action
              },
              {
                id: 'delete',
                label: 'Delete',
                icon: 'trash',
                variant: 'danger',
                placement: 'menu',
                onClick: () => { } // Demo action
              }
            ],
            pagination: { pageSize: 5, initialPage: 1 },
            sorting: [{ fieldKey: 'id', direction: 'asc' }],
            filtering: [],
            data: teaserSampleData
          }
        }
      },
      description: 'Full-featured user management with pagination, sorting, and filtering'
    },
    {
      id: 'sales-dashboard',
      name: 'Sales Dashboard',
      mode: 'chart',
      config: {
        id: 'sales-dashboard',

        zones: {
          content: {
            mode: 'chart',
            layout: {},
            item: {
              layout: { type: 'auto' },
              fields: [
                { key: 'month', label: 'Month' },
                { key: 'sales', label: 'Sales' },
                { key: 'target', label: 'Target' },
              ]
            },
            data: [
              { month: 'Jan', sales: 4000, target: 4500 },
              { month: 'Feb', sales: 3000, target: 3500 },
              { month: 'Mar', sales: 5000, target: 4800 },
              { month: 'Apr', sales: 4500, target: 5000 },
              { month: 'May', sales: 6000, target: 5500 },
              { month: 'Jun', sales: 5500, target: 6000 },
            ]
          }
        }
      },
      description: 'Line chart showing sales performance over time',
      data: [
        { name: 'Jan', month: 'Jan', sales: 12000, target: 15000 },
        { name: 'Feb', month: 'Feb', sales: 15000, target: 15000 },
        { name: 'Mar', month: 'Mar', sales: 18000, target: 15000 },
        { name: 'Apr', month: 'Apr', sales: 14000, target: 15000 },
        { name: 'May', month: 'May', sales: 22000, target: 15000 },
        { name: 'Jun', month: 'Jun', sales: 19000, target: 15000 },
      ]
    },
    {
      id: 'task-management',
      name: 'Task Management',
      mode: 'board',
      config: {
        id: 'task-management',
        zones: {
          content: {
            mode: 'board',
            layout: {},
            item: {
              layout: { type: 'auto' },
              fields: [
                { key: 'title', label: 'Task' },
                { key: 'priority', label: 'Priority' },
                { key: 'status', label: 'Status' },
                { key: 'assignee', label: 'Assignee' },
              ]
            },
            itemActions: [
              {
                id: 'edit',
                label: 'Edit',
                icon: 'edit',
                variant: 'secondary',
                placement: 'menu',
                onClick: () => { } // Demo action
              },
              {
                id: 'delete',
                label: 'Delete',
                icon: 'trash',
                variant: 'danger',
                placement: 'menu',
                onClick: () => { } // Demo action
              }
            ],
            data: [
              { name: 'Authentication', title: 'Implement user authentication', priority: 'high', status: false, assignee: 'Alice' },
              { name: 'Dashboard', title: 'Design new dashboard', priority: 'medium', status: true, assignee: 'Bob' },
              { name: 'Documentation', title: 'Write documentation', priority: 'low', status: false, assignee: 'Carol' },
              { name: 'Mobile', title: 'Fix mobile responsiveness', priority: 'high', status: true, assignee: 'David' },
            ]
          }
        },
        collapse: { initialState: 'expanded' }
      },
      description: 'Kanban-style task board with priority and status'
    },
    {
      id: 'image-gallery',
      name: 'Image Gallery',
      mode: 'grid',
      config: {
        id: 'image-gallery',

        zones: {
          content: {
            mode: 'grid',
            layout: {},
            item: {
              layout: { type: 'auto' },
              fields: [
                { key: 'name', label: 'Title' },
                { key: 'category', label: 'Category' },
                { key: 'description', label: 'Description' },
              ]
            },
            data: imageGalleryData
          }
        }
      },
      description: 'Image gallery with masonry layout, lazy loading, and hover overlays. Click images to view details.'
    },
    {
      id: 'image-grid-no-text',
      name: 'Image Grid - No Text',
      mode: 'grid',
      config: {
        id: 'image-grid-no-text',
        zones: {
          header: {
            actions: [
              { id: 'refresh', label: 'Refresh', icon: 'refresh', placement: 'pinned' }
            ]
          },
          content: {
            mode: 'grid',
            layout: {},
            item: {
              layout: { type: 'auto' },
              fields: [
                { key: 'name', label: 'Title' },
                { key: 'category', label: 'Category' },
              ]
            },
            data: imageGalleryData.slice(0, 8)
          }
        }
      },
      description: 'Clean image grid without text overlays, fixed height layout with 4 columns.'
    },
    {
      id: 'compact-image-grid',
      name: 'Compact Image Grid',
      mode: 'grid',
      config: {
        id: 'compact-image-grid',

        zones: {
          header: {
            actions: [
              { id: 'refresh', label: 'Refresh', icon: 'refresh', placement: 'pinned' }
            ]
          },
          content: {
            mode: 'grid',
            layout: {},
            item: {
              layout: { type: 'auto' },
              fields: [
                { key: 'name', label: 'Title' },
              ]
            },
            data: imageGalleryData
          }
        }
      },
      description: 'Compact 6-column image grid with small cells, perfect for thumbnails or overview displays.'
    },
    {
      id: 'large-image-showcase',
      name: 'Large Image Showcase',
      mode: 'grid',
      config: {
        id: 'large-image-showcase',

        zones: {
          header: {
            actions: [
              { id: 'refresh', label: 'Refresh', icon: 'refresh', placement: 'pinned' }
            ]
          },
          content: {
            mode: 'grid',
            layout: {},
            item: {
              layout: { type: 'auto' },
              fields: [
                { key: 'name', label: 'Title' },
                { key: 'category', label: 'Category' },
                { key: 'description', label: 'Description' },
              ]
            },
            data: imageGalleryData
          }
        }
      },
      description: 'Large 2-column masonry layout showcasing images with detailed text overlays.'
    },
    {
      id: 'nature-gallery-background-images',
      name: 'Nature Gallery - Background Images',
      mode: 'board',
      config: {
        id: 'nature-gallery-background-images',

        zones: {
          header: {
            actions: [
              { id: 'refresh', label: 'Refresh', icon: 'refresh', placement: 'pinned' }
            ]
          },
          content: {
            mode: 'board',
            layout: {},
            item: {
              layout: { type: 'auto' },
              fields: [
                { key: 'name', label: 'Title' },
                { key: 'category', label: 'Category' },
                { key: 'description', label: 'Description' },
              ]
            },
            data: imageGalleryData
          }
        }
      },
      description: 'Board view with images as card backgrounds, overlay text for readability, and dynamic color backgrounds',
      data: imageGalleryData
    },
    {
      id: 'image-gallery-board-header-body',
      name: 'Image Gallery Board - Header & Body',
      mode: 'board',
      config: {
        id: 'image-gallery-board-header-body',

        zones: {
          header: {
            actions: [
              { id: 'refresh', label: 'Refresh', icon: 'refresh', placement: 'pinned' }
            ]
          },
          content: {
            mode: 'board',
            layout: {},
            item: {
              layout: { type: 'auto' },
              fields: [
                { key: 'name', label: 'Title' },
                { key: 'category', label: 'Category' },
                { key: 'description', label: 'Description' },
              ]
            },
            data: imageGalleryData
          }
        }
      },
      description: 'Board view with images as card headers, custom column definitions, and static backgrounds with borders',
      data: imageGalleryData
    },
    {
      id: 'table-with-multiple-images',
      name: 'Table with Multiple Images',
      mode: 'table',
      config: {
        id: 'table-with-multiple-images',
        zones: {
          header: {
            actions: [
              { id: 'refresh', label: 'Refresh', icon: 'refresh', placement: 'pinned' }
            ]
          },
          content: {
            mode: 'table',
            layout: {},
            item: {
              layout: { type: 'auto' },
              fields: [
                { key: 'name', label: 'Title' },
                { key: 'category', label: 'Category' },
                { key: 'description', label: 'Description' },
              ]
            },
            data: imageGalleryData.map(item => ({
              ...item,
              thumbnail: (item.src as string)
                .replace(/w=\d+/g, 'w=120')
                .replace(/h=\d+/g, 'h=80')
            }))
          }
        }
      },
      description: 'Table with multiple image columns - thumbnail and full-size preview with different sizes and shapes'
    },
    {
      id: 'table-with-medium-size-images',
      name: 'Table with Medium Size Images',
      mode: 'table',
      config: {
        id: 'table-with-medium-size-images',
        zones: {
          header: {
            actions: [
              { id: 'refresh', label: 'Refresh', icon: 'refresh', placement: 'pinned' }
            ]
          },
          content: {
            mode: 'table',
            layout: {},
            item: {
              layout: { type: 'auto' },
              fields: [
                { key: 'name', label: 'Title' },
                { key: 'category', label: 'Category' },
                { key: 'description', label: 'Description' },
              ]
            },
            data: imageGalleryData.slice(0, 6)
          }
        }
      },
      description: 'Table with images displayed in cells with cover fit'
    },
    {
      id: 'table-with-large-images',
      name: 'Table with Large Images',
      mode: 'table',
      config: {
        id: 'table-with-large-images',
        collapse: { initialState: 'expanded' },

        zones: {
          header: {
            actions: [
              {
                id: 'refresh',
                label: 'Refresh',
                icon: 'refresh',
                placement: 'pinned',
                onClick: () => alert('Refresh clicked!')
              }
            ]
          },
          content: {
            mode: 'table',
            layout: {},
            item: {
              layout: { type: 'auto' },
              fields: [
                { key: 'name', label: 'Title' },
                { key: 'category', label: 'Category' },
                { key: 'description', label: 'Description' },
              ]
            },
            data: imageGalleryData.slice(0, 4)
          }
        }
      },
      description: 'Table with large rounded images using contain fit, showing full image content with borders'
    },
    {
      id: 'link-rendering',
      name: 'Link Rendering Test',
      mode: 'table',
      config: {
        id: 'link-rendering',

        zones: {
          header: {
            actions: [
              { id: 'refresh', label: 'Refresh', icon: 'refresh', placement: 'pinned' }
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
                {
                  key: 'url',
                  label: 'URL'
                },
                { key: 'description', label: 'Description' },
              ]
            },
            data: linkTestData
          }
        }
      },
      description: 'Table demonstrating clickable link rendering with external link warnings'
    },
  ];

// Default sandbox configuration
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

// Teaser configurations with varying settings for each mode
export const teaserConfigs: Array<{ config: WidgemoConfig; description: string }> = [
  {
    config: {
      id: 'teaser-table',
      zones: {
        header: {
          actions: [
            { id: 'refresh', label: 'Refresh', icon: 'refresh', placement: 'pinned' },
            { id: 'add', label: 'Add User', icon: 'add', placement: 'pinned' }
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
          data: teaserSampleData
        }
      }
    },
    description: 'A table view with actions and custom labels'
  },
  {
    config: {
      id: 'teaser-board',
      zones: {
        header: {
          actions: [
            { id: 'refresh', label: 'Refresh', icon: 'refresh', placement: 'pinned' }
          ]
        },
        content: {
          mode: 'board',
          layout: {},
          item: {
            layout: { type: 'auto' },
            fields: [
              { key: 'name', label: 'Name' },
              { key: 'email', label: 'Email' },
              { key: 'department', label: 'Department' },
            ]
          },
          itemActions: [
            {
              id: 'view',
              label: 'View',
              icon: 'eye',
              variant: 'secondary',
              placement: 'pinned'
            }
          ],
          data: teaserSampleData
        }
      }
    },
    description: 'A kanban-style board with contact info'
  },
  {
    config: {
      id: 'teaser-grid',
      zones: {
        header: {
          actions: [
            { id: 'refresh', label: 'Refresh', icon: 'refresh', placement: 'pinned' }
          ]
        },
        content: {
          mode: 'grid',
          layout: {},
          item: {
            layout: { type: 'auto' },
            fields: [
              { key: 'department', label: 'Department' },
              { key: 'name', label: 'Lead' },
              { key: 'role', label: 'Role' },
            ]
          },
          data: teaserSampleData
        }
      }
    },
    description: 'A grid showing departments and leads'
  },
  {
    config: {
      id: 'teaser-gallery',
      zones: {
        header: {
          actions: [
            { id: 'refresh', label: 'Refresh', icon: 'refresh', placement: 'pinned' }
          ]
        },
        content: {
          mode: 'grid',
          layout: {},
          item: {
            layout: { type: 'auto' },
            fields: [
              { key: 'name', label: 'Name' },
              { key: 'role', label: 'Role' },
            ]
          },
          data: teaserSampleData
        }
      }
    },
    description: 'A gallery-style grid showing user avatars'
  },
];

// Sample data for badge field rendering
export const badgeSampleData: SampleData[] = [
  { id: 1, name: 'Implement user authentication', status: 'completed', priority: 'high', assignee: 'Alice', category: 'security' },
  { id: 2, name: 'Design dashboard layout', status: 'in-progress', priority: 'medium', assignee: 'Bob', category: 'ui' },
  { id: 3, name: 'Write API documentation', status: 'pending', priority: 'low', assignee: 'Charlie', category: 'docs' },
  { id: 4, name: 'Fix payment processing bug', status: 'completed', priority: 'critical', assignee: 'Alice', category: 'bug' },
  { id: 5, name: 'Add dark mode support', status: 'in-progress', priority: 'high', assignee: 'Diana', category: 'feature' },
  { id: 6, name: 'Database migration', status: 'cancelled', priority: 'medium', assignee: 'Bob', category: 'infrastructure' },
  { id: 7, name: 'User feedback analysis', status: 'pending', priority: 'low', assignee: 'Eve', category: 'analytics' },
  { id: 8, name: 'Performance optimization', status: 'completed', priority: 'high', assignee: 'Alice', category: 'performance' },
  { id: 9, name: 'Mobile responsive fixes', status: 'in-progress', priority: 'medium', assignee: 'Charlie', category: 'ui' },
  { id: 10, name: 'Security audit', status: 'pending', priority: 'critical', assignee: 'Frank', category: 'security' },
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