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
  { id: 1, name: 'Alice Johnson', email: 'alice.johnson@company.com', role: 'Manager', department: 'Engineering', status: true, lastLogin: '2024-01-15', src: 'https://media.istockphoto.com/id/1317804578/photo/one-businesswoman-headshot-smiling-at-the-camera.webp?a=1&b=1&s=612x612&w=0&k=20&c=0ez7MLSYsOlKDghpVAUDMVf_gT5B_DfKmRNKqElOLUA=' },
  { id: 2, name: 'Bob Smith', email: 'bob.smith@company.com', role: 'Developer', department: 'Engineering', status: true, lastLogin: '2024-01-14', src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face' },
  { id: 3, name: 'Carol Williams', email: 'carol.williams@company.com', role: 'Designer', department: 'Design', status: false, lastLogin: '2024-01-10', src: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face' },
  { id: 4, name: 'David Brown', email: 'david.brown@company.com', role: 'Developer', department: 'Engineering', status: true, lastLogin: '2024-01-15', src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' },
  { id: 5, name: 'Eva Davis', email: 'eva.davis@company.com', role: 'Analyst', department: 'Business', status: true, lastLogin: '2024-01-13', src: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face' },
];

// Sample data for link testing
export const linkTestData: SampleData[] = [
  { id: 1, name: 'Google', url: 'https://google.com', description: 'Search Engine' },
  { id: 2, name: 'GitHub', url: 'https://github.com', description: 'Code Repository' },
  { id: 3, name: 'Stack Overflow', url: 'https://stackoverflow.com', description: 'Developer Q&A' },
  { id: 4, name: 'MDN Web Docs', url: 'https://developer.mozilla.org', description: 'Web Documentation' },
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
        actions: {
          definitions: [
            { id: 'add', label: 'Add User' },
            { id: 'refresh' },
            { id: 'columnSelector' },
            { id: 'deletedToggle' },
            {
              id: 'edit',
              label: 'Edit',
              icon: 'edit',
              variant: 'secondary',
              iconOnly: true,
              onTrigger: () => {} // Demo action
            },
            {
              id: 'delete',
              label: 'Delete',
              icon: 'trash',
              variant: 'danger',
              iconOnly: true,
              onTrigger: () => {} // Demo action
            }
          ],
          header: {
            always: ['refresh', 'add'],
            onMenu: ['columnSelector', 'deletedToggle']
          },
          item: {
            onMenu: ['edit', 'delete']
          }
        },
        theme: { shadow: false },
        styling: { compact: true },
        collapsible: 'fixed',
      },
      description: 'Full-featured data management table with CRUD operations',
      data: teaserSampleData
    },
    {
      id: 'kanban-board',
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
        actions: {
          definitions: [
            { id: 'add', label: 'Add User Profile' },
            {
              id: 'view',
              label: 'View',
              icon: 'eye',
              variant: 'secondary',
              iconOnly: true,
              onTrigger: () => {} // Demo action
            }
          ],
          header: {
            always: ['add']
          },
          item: {
            always: ['view']
          }
        },
        styling: {
          board: {
            groupBy: 'role',
            swimlaneBy: 'department',
            draggable: true,
            showColumnHeaders: true,
            showItemCount: true,
            minColumnWidth: '200px',
            gap: '8px'
          }
        },
        collapsible: 'fixed',
      },
      description: 'Kanban style board with configurable columns and swimlanes. Drag and drop to rearrange cards.',
      data: teaserSampleData
    },
    {
      id: 'image-grid-contain-fit',
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
        mediaConfig: {
          fields: [{
            field: 'src',
            fit: 'contain',
            lightbox: true
          }],
          lazy: false,
          loadingPlaceholder: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkxvYWRpbmcuLi48L3RleHQ+PC9zdmc+'
        },
        theme: { shadow: false, dynamicBackground: false },
        styling: {
          grid: {
            columns: 3,
            cellSize: { width: 250, height: 200 },
            gap: '15px',
            backgroundColor: '#f8f9fa',
            imageGrid: {
              masonry: false
            }
          }
        },
        actions: {
          definitions: [
            { id: 'refresh' }
          ],
          header: {
            always: ['refresh']
          }
        },
        collapsible: 'fixed',
      },
      description: 'Image grid using "contain" object-fit, showing full images with potential letterboxing/pillarboxing.',
      data: imageGalleryData.slice(0, 9)
    },
    {
      id: 'clean-chart',
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
      id: 'basic-grid',
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
        actions: {
          definitions: [
            { id: 'refresh' }
          ],
          header: {
            always: ['refresh']
          }
        }
      },
      description: 'Department grid showing team leads and roles',
      data: teaserSampleData
    },
    {
      id: 'dynamic-background',
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
        theme: { dynamicBackground: false },
        styling: {},
      },
      description: 'Table with dynamic background turned off. Dynamic background adapts to theme (lighter on dark themes, darker on light themes) by default',
      data: teaserSampleData
    },
    {
      id: 'minimal-table',
      name: 'Minimal Table',
      mode: 'table',
      config: {
        mode: 'table',
        dataSource: { type: 'static' },
        fields: [
          { name: 'name', label: 'Name', type: 'text' },
          { name: 'lastLogin', label: 'Last Login', type: 'date' },
        ],
        actions: {
          definitions: [
            { id: 'refresh' }
          ],
          header: {
            onMenu: ['refresh']
          }
        },
        styling: { compact: true },
      },
      description: 'Simple table view without header and controls',
      data: teaserSampleData
    },
    {
      id: 'advanced',
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
        actions: {
          definitions: [
            { id: 'refresh' },
            { id: 'viewToggle' },
            { id: 'columnSelector' },
            { id: 'add' },
            {
              id: 'edit',
              label: 'Edit',
              icon: 'edit',
              variant: 'secondary',
              iconOnly: true,
              onTrigger: () => {} // Demo action
            },
            {
              id: 'delete',
              label: 'Delete',
              icon: 'trash',
              variant: 'danger',
              iconOnly: true,
              onTrigger: () => {} // Demo action
            }
          ],
          header: {
            always: ['refresh'],
            discoverable: ['viewToggle'],
            onMenu: ['columnSelector', 'add']
          },
          item: {
            onMenu: ['edit', 'delete']
          }
        },
        pagination: { enabled: true, defaultPageSize: 5 },
        sorting: { enabled: true },
        filtering: { enabled: true },
        styling: {},
      },
      description: 'Full-featured user management with pagination, sorting, and filtering',
      data: teaserSampleData
    },
    {
      id: 'sales-dashboard',
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
        theme: { shadow: true },
        styling: {},
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
        actions: {
          definitions: [
            {
              id: 'edit',
              label: 'Edit',
              icon: 'edit',
              variant: 'secondary',
              iconOnly: true,
              onTrigger: () => {} // Demo action
            },
            {
              id: 'delete',
              label: 'Delete',
              icon: 'trash',
              variant: 'danger',
              iconOnly: true,
              onTrigger: () => {} // Demo action
            }
          ],
          item: {
            onMenu: ['edit', 'delete']
          }
        },
        theme: { shadow: true, dynamicBackground: false },
        styling: {
          board: {
            groupBy: 'status',
            swimlaneBy: 'priority',
          },
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
      id: 'image-gallery',
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
        mediaConfig: {
          fields: [{
            field: 'src',
            fit: 'cover',
            lightbox: true
          }],
          lazy: false,
          loadingPlaceholder: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkxvYWRpbmcuLi48L3RleHQ+PC9zdmc+'
        },
        theme: { shadow: true },
        styling: {
          grid: {
            columns: 'auto',
            cellSize: { width: 250, height: 200 },
            gap: '15px',
            imageGrid: {
              masonry: true
            }
          }
        },
        actions: {
          definitions: [
            { id: 'refresh' }
          ],
          header: {
            always: ['refresh']
          }
        },
        collapsible: 'fixed',
      },
      description: 'Image gallery with masonry layout, lazy loading, and hover overlays. Click images to view details.',
      data: imageGalleryData
    },
    {
      id: 'image-grid-no-text',
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
        mediaConfig: {
          fields: [{
            field: 'src',
            fit: 'cover',
            lightbox: true
          }],
          lazy: false,
          loadingPlaceholder: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkxvYWRpbmcuLi48L3RleHQ+PC9zdmc+'
        },
        theme: { shadow: true },
        styling: {
          grid: {
            columns: 4,
            cellSize: { width: 200, height: 180 },
            gap: '12px',
            imageGrid: {
              masonry: false // Fixed height grid
            }
          }
        },
        actions: {
          definitions: [
            { id: 'refresh' }
          ],
          header: {
            always: ['refresh']
          }
        },
        collapsible: 'fixed',
      },
      description: 'Clean image grid without text overlays, fixed height layout with 4 columns.',
      data: imageGalleryData.slice(0, 8) // Use first 8 images
    },
    {
      id: 'compact-image-grid',
      name: 'Compact Image Grid',
      mode: 'grid',
      config: {
        title: 'Compact Image Grid',
        mode: 'grid',
        dataSource: { type: 'static' },
        fields: [
          { name: 'name', label: 'Title', type: 'text' },
        ],
        mediaConfig: {
          fields: [{
            field: 'src',
            fit: 'cover',
            lightbox: true
          }],
          lazy: false,
          loadingPlaceholder: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkxvYWRpbmcuLi48L3RleHQ+PC9zdmc+'
        },
        theme: { shadow: false },
        styling: {
          grid: {
            columns: 6,
            cellSize: { width: 150, height: 120 },
            gap: '8px',
            imageGrid: {
              masonry: false
            }
          },
          compact: true
        },
        actions: {
          definitions: [
            { id: 'refresh' }
          ],
          header: {
            always: ['refresh']
          }
        },
        collapsible: 'fixed',
      },
      description: 'Compact 6-column image grid with small cells, perfect for thumbnails or overview displays.',
      data: imageGalleryData
    },
    {
      id: 'large-image-showcase',
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
        mediaConfig: {
          fields: [{
            field: 'src',
            fit: 'cover',
            lightbox: true
          }],
          lazy: false,
          loadingPlaceholder: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkxvYWRpbmcuLi48L3RleHQ+PC9zdmc+'
        },
        theme: { shadow: true },
        styling: {
          grid: {
            columns: 2,
            gap: '20px',
            imageGrid: {
              masonry: true
            }
          }
        },
        actions: {
          definitions: [
            { id: 'refresh' }
          ],
          header: {
            always: ['refresh']
          }
        },
        collapsible: 'fixed',
      },
      description: 'Large 2-column masonry layout showcasing images with detailed text overlays.',
      data: imageGalleryData
    },
    {
      id: 'nature-gallery-background-images',
      name: 'Nature Gallery - Background Images',
      mode: 'board',
      config: {
        title: 'Nature Gallery - Background Images',
        mode: 'board',
        dataSource: { type: 'static' },
        fields: [
          { name: 'name', label: 'Title', type: 'text' },
          { name: 'category', label: 'Category', type: 'text' },
          { name: 'description', label: 'Description', type: 'text' },
        ],
        mediaConfig: {
          fields: [{
            field: 'src',
            placement: 'background',
            fit: 'cover',
            lightbox: true
          }],
          lazy: true,
          loadingPlaceholder: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkxvYWRpbmcuLi48L3RleHQ+PC9zdmc+',
          errorPlaceholder: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+RXJyb3I8L3RleHQ+PC9zdmc+'
        },
        styling: {
          board: {
            groupBy: 'category',
            draggable: true,
            showColumnHeaders: true,
            showItemCount: true,
            minColumnWidth: '280px',
            gap: '12px',
            imagePlacement: 'background'
          },
          card: {
            showBorder: true,
            borderRadius: '8px',
            shadow: true,
            backgroundColor: 'rgba(255, 255, 255, 0.9)'
          }
        },
        theme: { dynamicBackground: true },
        actions: {
          definitions: [
            { id: 'refresh' }
          ],
          header: {
            always: ['refresh']
          }
        },
        collapsible: 'fixed',
      },
      description: 'Board view with images as card backgrounds, overlay text for readability, and dynamic color backgrounds',
      data: imageGalleryData
    },
    {
      id: 'image-gallery-board-header-body',
      name: 'Image Gallery Board - Header & Body',
      mode: 'board',
      config: {
        title: 'Photo Portfolio - Header & Body Images',
        mode: 'board',
        dataSource: { type: 'static' },
        fields: [
          { name: 'name', label: 'Title', type: 'text' },
          { name: 'category', label: 'Category', type: 'text' },
          { name: 'description', label: 'Description', type: 'text' },
        ],
        mediaConfig: {
          fields: [{
            field: 'src',
            placement: 'header',
            fit: 'cover',
            lightbox: true
          }],
          lazy: true,
          loadingPlaceholder: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+TG9hZGluZy4uLjwvdGV4dD48L3N2Zz4=',
          errorPlaceholder: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZmVkN2Q3Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+RXJyb3I8L3RleHQ+PC9zdmc+'
        },
        styling: {
          board: {
            columns: [
              { id: 'Nature', label: 'Nature & Landscapes' },
              { id: 'Urban', label: 'Urban & Architecture' },
              { id: 'Art', label: 'Art & Abstract' },
              { id: 'Portrait', label: 'Portraits' }
            ],
            groupBy: 'category',
            draggable: true,
            showColumnHeaders: true,
            showItemCount: true,
            minColumnWidth: '320px',
            gap: '16px',
            imagePlacement: 'header'
          },
          card: {
            showBorder: true,
            borderRadius: '12px',
            shadow: true,
            backgroundColor: '#ffffff'
          }
        },
        theme: { dynamicBackground: false },
        actions: {
          definitions: [
            { id: 'refresh' }
          ],
          header: {
            always: ['refresh']
          }
        },
        collapsible: 'fixed',
      },
      description: 'Board view with images as card headers, custom column definitions, and static backgrounds with borders',
      data: imageGalleryData
    },
    {
      id: 'table-with-avatar-images',
      name: 'Table with Avatar Images',
      mode: 'table',
      config: {
        title: 'User Profiles with Avatars',
        mode: 'table',
        dataSource: { type: 'static' },
        fields: [
          { name: 'name', label: 'Name', type: 'text' },
          { name: 'role', label: 'Role', type: 'text' },
          { name: 'department', label: 'Department', type: 'text' },
          { name: 'status', label: 'Active', type: 'boolean', booleanTrueLabel: "🟢 Online", booleanFalseLabel: "🔴 Offline" },
        ],
        mediaConfig: {
          fields: [{
            field: 'src',
            label: '',
            placement: 'cell',
            size: 'small',
            shape: 'circle',
            fit: 'cover',
            lightbox: true,
            position: 'start'
          }],
          lazy: false,
          loadingPlaceholder: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIyMCIgZmlsbD0iI2Y4ZjlmYSIvPjxjaXJjbGUgY3g9IjIwIiBjeT0iMTUiIHI9IjMiIGZpbGw9IiNhZGI1YmQiLz48L3N2Zz4='
        },
        theme: { shadow: true },
        styling: { compact: true },
        actions: {
          definitions: [
            { id: 'refresh' }
          ],
          header: {
            always: ['refresh']
          }
        },
        collapsible: 'fixed',
      },
      description: 'Table view with circular avatar images in cells, showing user profiles with online status',
      data: teaserSampleData
    },
    {
      id: 'table-with-multiple-images',
      name: 'Table with Multiple Images',
      mode: 'table',
      config: {
        title: 'Image Gallery Table',
        mode: 'table',
        dataSource: { type: 'static' },
        fields: [
          { name: 'name', label: 'Title', type: 'text' },
          { name: 'category', label: 'Category', type: 'text' },
          { name: 'description', label: 'Description', type: 'text' },
        ],
        mediaConfig: {
          fields: [
            {
              field: 'thumbnail',
              label: '',
              placement: 'cell',
              size: 'small',
              shape: 'rounded',
              fit: 'cover',
              position: 'start',
              priority: 1
            },
            {
              field: 'src',
              label: 'Image Preview',
              placement: 'cell',
              size: 'medium',
              shape: 'square',
              fit: 'contain',
              lightbox: true,
              afterField: 'category',
              priority: 2
            }
          ],
          lazy: false,
          loadingPlaceholder: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDEyMCAxMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEyMCIgaGVpZ2h0PSIxMjAiIGZpbGw9IiNmOGY5ZmEiLz48Y2lyY2xlIGN4PSI2MCIgY3k9IjUwIiBy0iMTUiIGZpbGw9IiNhZGI1YmQiIG9wYWNpdHk9IjAuMyIvPjxwYXRoIGQ9Im02MCA3MCAxMCAxMCAxMC0xMCIgc3Ryb2tlPSIjYWRiNWJkIiBzdHJva2Utd2lkdGg9IjMiIGZpbGw9Im5vbmUiIG9wYWNpdHk9IjAuMyIvPjx0ZXh0IHg9IjYwIiB5PSI5NSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjEwIiBmaWxsPSIjOTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5Mb2FkaW5nLi4uPC90ZXh0Pjwvc3ZnPg=='
        },
        theme: { shadow: true },
        styling: { compact: true },
        actions: {
          definitions: [
            { id: 'refresh' }
          ],
          header: {
            always: ['refresh']
          }
        },
        collapsible: 'fixed',
      },
      description: 'Table with multiple image columns - thumbnail and full-size preview with different sizes and shapes',
      data: imageGalleryData.map(item => ({
        ...item,
        thumbnail: (item.src as string)
          .replace(/w=\d+/g, 'w=120')
          .replace(/h=\d+/g, 'h=80')
      }))
    },
    {
      id: 'table-with-medium-size-images',
      name: 'Table with Medium Size Images',
      mode: 'table',
      config: {
        title: 'Image Portfolio Table',
        mode: 'table',
        dataSource: { type: 'static' },
        fields: [
          { name: 'name', label: 'Title', type: 'text' },
          { name: 'category', label: 'Category', type: 'text' },
          { name: 'description', label: 'Description', type: 'text' },
        ],
        mediaConfig: {
          fields: [{
            field: 'src',
            placement: 'cell',
            fit: 'cover',
            lightbox: true
          }],
          lazy: false,
          loadingPlaceholder: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2Y4ZjlmYSIvPjxjaXJjbGUgY3g9IjEwMCIgY3k9IjgwIiBy0iMjAiIGZpbGw9IiNhZGI1YmQiIG9wYWNpdHk9IjAuMyIvPjx0ZXh0IHg9IjEwMCIgeT0iMTYwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkxvYWRpbmcuLi48L3RleHQ+PC9zdmc+'
        },
        theme: { shadow: true },
        styling: {
          table: {
            // backgroundColor: 'rgba(255, 255, 255, 0.9)'
          }
        },
        actions: {
          definitions: [
            { id: 'refresh' }
          ],
          header: {
            always: ['refresh']
          }
        },
        collapsible: 'fixed',
      },
      description: 'Table with images displayed in cells with cover fit',
      data: imageGalleryData.slice(0, 6)
    },
    {
      id: 'table-with-large-images',
      name: 'Table with Large Images',
      mode: 'table',
      config: {
        title: 'Image Showcase Table',
        mode: 'table',
        dataSource: { type: 'static' },
        fields: [
          { name: 'name', label: 'Title', type: 'text' },
          { name: 'category', label: 'Category', type: 'text' },
          { name: 'description', label: 'Description', type: 'text' },
        ],
        mediaConfig: {
          fields: [{
            field: 'src',
            placement: 'cell',
            size: 'large',
            shape: 'rounded',
            fit: 'contain',
            lightbox: true
          }],
          lazy: false,
          loadingPlaceholder: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDEyMCAxMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEyMCIgaGVpZ2h0PSIxMjAiIGZpbGw9IiNmOGY5ZmEiLz48Y2lyY2xlIGN4PSI2MCIgY3k9IjUwIiBy0iMTUiIGZpbGw9IiNhZGI1YmQiIG9wYWNpdHk9IjAuMyIvPjx0ZXh0IHg9IjYwIiB5PSI5NSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjEwIiBmaWxsPSIjOTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5Mb2FkaW5nLi4uPC90ZXh0Pjwvc3ZnPg=='
        },
        theme: { shadow: true },
        styling: {
          table: {
            cellBorder: true,
            borderColor: '#e9ecef'
          }
        },
        collapsible: 'fixed',
        header: { always: ['refresh'] }
      },
      description: 'Table with large rounded images using contain fit, showing full image content with borders',
      data: imageGalleryData.slice(0, 4)
    },
    {
      id: 'link-rendering',
      name: 'Link Rendering Test',
      mode: 'table',
      config: {
        title: 'Clickable Links',
        mode: 'table',
        dataSource: { type: 'static' },
        fields: [
          { name: 'id', label: 'ID', type: 'number' },
          { name: 'name', label: 'Name', type: 'text' },
          { 
            name: 'url', 
            label: 'URL', 
            type: 'text',
            renderAs: 'link',
            linkOptions: {
              newTab: true,
              externalWarning: true
            }
          },
          { name: 'description', label: 'Description', type: 'text' },
        ],
        actions: {
          definitions: [
            { id: 'refresh' },
          ]
        },
        header: { always: ['refresh'] }
      },
      description: 'Table demonstrating clickable link rendering with external link warnings',
      data: linkTestData
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
  actions: {
    definitions: [
      { id: 'add' },
      { id: 'refresh' },
      {
        id: 'edit',
        label: 'Edit',
        icon: 'edit',
        variant: 'secondary',
        iconOnly: true,
        onTrigger: () => {} // Demo action
      },
      {
        id: 'delete',
        label: 'Delete',
        icon: 'trash',
        variant: 'danger',
        iconOnly: true,
        onTrigger: () => {} // Demo action
      }
    ],
    header: {
      always: ['refresh', 'add'],
      onMenu: ['deleteToggle']
    },
    item: {
      onMenu: ['edit', 'delete']
    }
  },
  theme: { shadow: true, showBorder: true },
  styling: {},
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
      actions: {
        definitions: [
          { id: 'add', label: 'Add User' },
          { id: 'refresh' },
          { id: 'deleteToggle' },
          {
            id: 'edit',
            label: 'Edit',
            icon: 'edit',
            variant: 'secondary',
            iconOnly: true,
            onTrigger: () => {} // Demo action
          },
          {
            id: 'delete',
            label: 'Delete',
            icon: 'trash',
            variant: 'danger',
            iconOnly: true,
            onTrigger: () => {} // Demo action
          }
        ],
        header: {
          always: ['refresh', 'add'],
          onMenu: ['deleteToggle']
        },
        item: {
          onMenu: ['edit', 'delete']
        }
      },
      styling: { compact: true },
      labels: { add: 'Add User' }
    },
    description: 'A table view with actions and custom labels'
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
      actions: {
        definitions: [
          { id: 'refresh' },
          {
            id: 'view',
            label: 'View',
            icon: 'eye',
            variant: 'secondary',
            iconOnly: true,
            onTrigger: () => {} // Demo action
          }
        ],
        header: {
          always: ['refresh']
        },
        item: {
          always: ['view']
        }
      },
      styling: {
        board: {
          groupBy: "role",
        },
      },
      collapsible: 'fixed',
    },
    description: 'A kanban-style board with contact info'
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
      actions: {
        definitions: [
          { id: 'refresh' }
        ],
        header: {
          always: ['refresh']
        }
      },
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
    description: 'A grid showing departments and leads'
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
      mediaConfig: {
        fields: [{
          field: 'src',
          fit: 'cover',
          lightbox: true
        }],
        lazy: false,
        loadingPlaceholder: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkxvYWRpbmcuLi48L3RleHQ+PC9zdmc+'
      },
      styling: {
        compact: true,
        grid: {
          columns: 5,
          cellSize: { width: 120, height: 150 },
          gap: '8px',
          imageGrid: {
            masonry: false
          }
        }
      },
      actions: {
        definitions: [
          { id: 'refresh' }
        ],
        header: {
          always: ['refresh']
        }
      }
    },
    description: 'A gallery-style grid showing user avatars'
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