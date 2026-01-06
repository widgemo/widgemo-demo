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
  { id: 1, name: 'Alice Johnson', email: 'alice.johnson@company.com', role: 'Manager', department: 'Engineering', status: true, lastLogin: '2024-01-15', src: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face' },
  { id: 2, name: 'Bob Smith', email: 'bob.smith@company.com', role: 'Developer', department: 'Engineering', status: true, lastLogin: '2024-01-14', src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face' },
  { id: 3, name: 'Carol Williams', email: 'carol.williams@company.com', role: 'Designer', department: 'Design', status: false, lastLogin: '2024-01-10', src: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face' },
  { id: 4, name: 'David Brown', email: 'david.brown@company.com', role: 'Developer', department: 'Engineering', status: true, lastLogin: '2024-01-15', src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' },
  { id: 5, name: 'Eva Davis', email: 'eva.davis@company.com', role: 'Analyst', department: 'Business', status: true, lastLogin: '2024-01-13', src: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face' },
];

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
  config: WidgemoConfig;
  name: string;
  description: string;
  data?: SampleData[];
  mode: string;
}> = [
    {
      name: 'Data Management',
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
        header: { always: ['refresh', 'add'], onMenu: ['columnSelector', 'deletedToggle'] },
        styling: { compact: true, shadow: true },
        labels: { add: 'Add User' },
        collapsible: 'fixed',
      },
      description: 'Full-featured data management table with CRUD operations',
      data: teaserSampleData
    },
    {
      name: 'Kanban Board',
      mode: 'board',
      config: {
        title: 'Users by Role and Dept',
        mode: 'board',
        dataSource: { type: 'static' },
        fields: [
          { name: 'name', label: 'Name', type: 'text' },
          { name: 'email', label: 'Email', type: 'text' },
          { name: 'role', label: 'Role', type: 'text', visible: false },
          { name: 'department', label: 'Department', type: 'text', visible: false },
          { name: 'status', label: 'Active', type: 'boolean' },
        ],
        actions: { view: true },
        styling: {
          board: {
            groupBy: 'role',
            swimlaneBy: 'department',
            draggable: true,
            showColumnHeaders: true,
            showItemCount: true,
            columnWidth: '200px',
            gap: '8px'
          }, shadow: true
        },
        collapsible: 'fixed',
        header: { always: ['add'] },
        labels: { add: 'Add User Profile' }
      },
      description: 'Kanban style board with configurable columns and swimlanes. Drag and drop to rearrange cards.',
      data: teaserSampleData
    },
    {
      name: 'Image Grid - Contain Fit',
      mode: 'grid',
      config: {
        title: 'Image Grid - Contain Fit',
        mode: 'grid',
        dataSource: { type: 'static' },
        fields: [
          { name: 'name', label: 'Title', type: 'text' },
          { name: 'category', label: 'Category', type: 'text' },
        ],
        imagesConfig: {
          field: 'src',
          fit: 'contain', // Show full image, may have letterboxing
          lazy: true,
          showTextOverlay: true,
          placeholder: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkxvYWRpbmcuLi48L3RleHQ+PC9zdmc+'
        },
        styling: {
          grid: {
            columns: 3,
            cellSize: { width: 250, height: 200 },
            gap: '15px',
            backgroundColor: '#f8f9fa',
            imageGrid: {
              masonry: false
            }
          },
          shadow: true
        },
        collapsible: 'fixed',
        header: { always: ['refresh'] }
      },
      description: 'Image grid using "contain" object-fit, showing full images with potential letterboxing/pillarboxing.',
      data: imageGalleryData.slice(0, 9)
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
      data: teaserSampleData
    },
    {
      name: 'Basic Grid',
      mode: 'grid',
      config: {
        title: 'Basic Grid',
        mode: 'grid',
        dataSource: { type: 'static' },
        fields: [
          { name: 'department', label: 'Department', type: 'text' },
          { name: 'name', label: 'Lead', type: 'text' },
          { name: 'role', label: 'Role', type: 'text' },
        ],
        styling: {
          compact: true,
          grid: {
            columns: 3,
            cellSize: {
              width: 200,
              height: 200
            },
            gap: '10px',
            showGridLines: true,
            aspectRatio: '1/1'
          }
        },
        header: {
          always: [
            'refresh'
          ]
        }
      },
      description: 'Department grid showing team leads and roles',
      data: teaserSampleData
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
      data: teaserSampleData
    },
    {
      name: 'Minimal Table',
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
      description: 'Simple table view without header and controls',
      data: teaserSampleData
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
      data: teaserSampleData
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
      ]
    },
    {
      name: 'Task Management',
      mode: 'board',
      config: {
        title: 'Task Board',
        mode: 'board',
        dataSource: { type: 'static' },
        fields: [
          { name: 'title', label: 'Task', type: 'text' },
          {
            name: 'priority', label: 'Priority', type: 'select', options: [
              { value: 'high', label: 'High' },
              { value: 'medium', label: 'Medium' },
              { value: 'low', label: 'Low' },
            ],
            visible: false,
          },
          { name: 'status', label: 'Status', type: 'boolean', booleanTrueLabel: "☒ Completed", booleanFalseLabel: "☐ Pending", visible: false },
          { name: 'assignee', label: 'Assignee', type: 'text' },
        ],
        actions: { edit: true, delete: true },
        styling: {
          board: {
            groupBy: 'status',
            swimlaneBy: 'priority',
          },
          shadow: true
        },
        collapsible: 'fixed',
      },
      description: 'Kanban-style task board with priority and status',
      data: [
        { name: 'Authentication', title: 'Implement user authentication', priority: 'high', status: false, assignee: 'Alice' },
        { name: 'Dashboard', title: 'Design new dashboard', priority: 'medium', status: true, assignee: 'Bob' },
        { name: 'Documentation', title: 'Write documentation', priority: 'low', status: false, assignee: 'Carol' },
        { name: 'Mobile', title: 'Fix mobile responsiveness', priority: 'high', status: true, assignee: 'David' },
      ]
    },
    {
      name: 'Image Gallery',
      mode: 'grid',
      config: {
        title: 'Image Gallery',
        mode: 'grid',
        dataSource: { type: 'static' },
        fields: [
          { name: 'name', label: 'Title', type: 'text' },
          { name: 'category', label: 'Category', type: 'text' },
          { name: 'description', label: 'Description', type: 'text' },
        ],
        imagesConfig: {
          field: 'src',
          fit: 'cover',
          lazy: true,
          showTextOverlay: true,
          placeholder: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkxvYWRpbmcuLi48L3RleHQ+PC9zdmc+'
        },
        styling: {
          grid: {
            columns: 'auto',
            cellSize: { width: 250, height: 200 },
            gap: '15px',
            imageGrid: {
              masonry: true
            }
          },
          shadow: true
        },
        collapsible: 'fixed',
        header: { always: ['refresh'] }
      },
      description: 'Image gallery with masonry layout, lazy loading, and hover overlays. Click images to view details.',
      data: imageGalleryData
    },
    {
      name: 'Image Grid - No Text',
      mode: 'grid',
      config: {
        title: 'Image Grid - No Text',
        mode: 'grid',
        dataSource: { type: 'static' },
        fields: [
          { name: 'name', label: 'Title', type: 'text' },
          { name: 'category', label: 'Category', type: 'text' },
        ],
        imagesConfig: {
          field: 'src',
          fit: 'cover',
          lazy: true,
          showTextOverlay: false, // No text overlay
          placeholder: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkxvYWRpbmcuLi48L3RleHQ+PC9zdmc+'
        },
        styling: {
          grid: {
            columns: 4,
            cellSize: { width: 200, height: 180 },
            gap: '12px',
            imageGrid: {
              masonry: false // Fixed height grid
            }
          },
          shadow: true
        },
        collapsible: 'fixed',
        header: { always: ['refresh'] }
      },
      description: 'Clean image grid without text overlays, fixed height layout with 4 columns.',
      data: imageGalleryData.slice(0, 8) // Use first 8 images
    },
    {
      name: 'Compact Image Grid',
      mode: 'grid',
      config: {
        title: 'Compact Image Grid',
        mode: 'grid',
        dataSource: { type: 'static' },
        fields: [
          { name: 'name', label: 'Title', type: 'text' },
        ],
        imagesConfig: {
          field: 'src',
          fit: 'cover',
          lazy: true,
          showTextOverlay: true,
          placeholder: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkxvYWRpbmcuLi48L3RleHQ+PC9zdmc+'
        },
        styling: {
          grid: {
            columns: 6,
            cellSize: { width: 150, height: 120 },
            gap: '8px',
            imageGrid: {
              masonry: false
            }
          },
          shadow: false,
          compact: true
        },
        collapsible: 'fixed',
        header: { always: ['refresh'] }
      },
      description: 'Compact 6-column image grid with small cells, perfect for thumbnails or overview displays.',
      data: imageGalleryData
    },
    {
      name: 'Large Image Showcase',
      mode: 'grid',
      config: {
        title: 'Large Image Showcase',
        mode: 'grid',
        dataSource: { type: 'static' },
        fields: [
          { name: 'name', label: 'Title', type: 'text' },
          { name: 'category', label: 'Category', type: 'text' },
          { name: 'description', label: 'Description', type: 'text' },
        ],
        imagesConfig: {
          field: 'src',
          fit: 'cover',
          lazy: true,
          showTextOverlay: true,
          placeholder: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkxvYWRpbmcuLi48L3RleHQ+PC9zdmc+'
        },
        styling: {
          grid: {
            columns: 2,
            cellSize: { width: 400, height: 300 },
            gap: '20px',
            imageGrid: {
              masonry: true
            }
          },
          shadow: true
        },
        collapsible: 'fixed',
        header: { always: ['refresh'] }
      },
      description: 'Large 2-column masonry layout showcasing images with detailed text overlays.',
      data: imageGalleryData
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
      title: 'User Profiles Board',
      mode: 'board',
      dataSource: { type: 'static' },
      fields: [
        { name: 'name', label: 'Name', type: 'text' },
        { name: 'email', label: 'Email', type: 'text' },
        { name: 'department', label: 'Department', type: 'text' },
      ],
      actions: { view: true },
      header: { always: ['refresh'] },
      styling: {
        board: {
          groupBy: "role",
        },
      },
      collapsible: 'fixed',
    },
    description: 'User profile board with contact info'
  },
  {
    config: {
      title: 'Department Overview',
      mode: 'grid',
      dataSource: { type: 'static' },
      fields: [
        { name: 'department', label: 'Department', type: 'text' },
        { name: 'name', label: 'Lead', type: 'text' },
        { name: 'role', label: 'Role', type: 'text' },
      ],
      header: { always: ['refresh'] },
      styling: {
        compact: true,
        grid: {
          columns: 3,
          cellSize: {
            width: 170,
            height: 170
          },
          showGridLines: true,
          aspectRatio: '1/1'
        }
      },
    },
    description: 'Department grid showing team leads'
  },
  {
    config: {
      title: 'User Avatars',
      mode: 'grid',
      dataSource: { type: 'static' },
      fields: [
        { name: 'name', label: 'Name', type: 'text', showLabel: false },
        { name: 'role', label: 'Role', type: 'text', visible: false },
      ],
      imagesConfig: {
        field: 'src',
        fit: 'cover',
        lazy: true,
        showTextOverlay: true,
        placeholder: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkxvYWRpbmcuLi48L3RleHQ+PC9zdmc+'
      },
      styling: {
        compact: true,
        grid: {
          columns: 5,
          cellSize: {
            width: 120,
            height: 120
          },
          gap: '8px',
          imageGrid: {
            masonry: false
          }
        }
      },
      header: { always: ['refresh'] }
    },
    description: 'User avatar gallery with names and roles'
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