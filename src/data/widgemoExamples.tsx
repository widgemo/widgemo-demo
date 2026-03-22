import { teaserSampleData } from './sampleData';
import type { SampleData } from './types';
import type { Entity } from 'widgemo-core';
// Memoized to prevent recreation on renders, improving performance by avoiding unnecessary computations.
export const twoUsersData = teaserSampleData.slice(0, 2);
// Memoized to prevent recreation on renders, improving performance by avoiding unnecessary computations.
export const threeUsersData = teaserSampleData.slice(0, 3);
// Memoized to prevent recreation on renders, improving performance by avoiding unnecessary computations.
export const fourUsersData = teaserSampleData.slice(0, 4);
// Memoized to prevent recreation on renders, improving performance by avoiding unnecessary computations.
export const fiveUsersData = teaserSampleData.slice(0, 5);
// Memoized to prevent recreation on renders, improving performance by avoiding unnecessary computations.
export const sixUsersData = teaserSampleData.slice(0, 6);
// Memoized to prevent recreation on renders, improving performance by avoiding unnecessary computations.
export const eightUsersData = teaserSampleData.slice(0, 8);
export const twentyUsersData = teaserSampleData.slice(0, 20);
// Memoized to prevent recreation on renders, improving performance by avoiding unnecessary computations.
export const twelveUsersData = teaserSampleData.slice(0, 12);
// Moved outside to prevent recreation on every render, ensuring stable props for better performance.


// Array of examples for dynamic rendering in SimplifiedTest.
const widgemoExamples: Array<{
  id: string;
  title: string;
  description: string;
  data: Entity[];
  config: any;
}> = [
  {
    id: 'timeline-mode',
    title: 'Timeline Mode',
    description: 'Timeline mode displaying chronological events with dates, titles, and descriptions',
    data: [
      {
        id: 1,
        date: '2024-01-15',
        title: 'Project Kickoff',
        description: 'Initial project planning and team assembly completed. All stakeholders aligned on objectives.',
        category: 'Planning',
        status: 'completed'
      },
      {
        id: 2,
        date: '2024-02-01',
        title: 'Design Phase Complete',
        description: 'UI/UX designs finalized and approved. Wireframes and mockups delivered to development team.',
        category: 'Design',
        status: 'completed'
      },
      {
        id: 3,
        date: '2024-02-15',
        title: 'Development Started',
        description: 'Frontend and backend development initiated. Core architecture implemented.',
        category: 'Development',
        status: 'in-progress'
      },
      {
        id: 4,
        date: '2024-03-01',
        title: 'First Prototype Demo',
        description: 'Internal demo of first working prototype. Feedback collected from key stakeholders.',
        category: 'Milestone',
        status: 'completed'
      },
      {
        id: 5,
        date: '2024-03-15',
        title: 'Testing Phase',
        description: 'Comprehensive testing begins including unit tests, integration tests, and user acceptance testing.',
        category: 'Testing',
        status: 'pending'
      },
      {
        id: 6,
        date: '2024-04-01',
        title: 'Beta Release',
        description: 'Beta version released to select users for real-world testing and feedback.',
        category: 'Release',
        status: 'pending'
      },
      {
        id: 7,
        date: '2024-04-15',
        title: 'Production Launch',
        description: 'Full production deployment and public launch of the application.',
        category: 'Release',
        status: 'pending'
      }
    ],
    config: {
      zones: {
        header: {
          title: 'Project Timeline',
          subtitle: 'Chronological view of project milestones and events',
          icon: { name: 'calendar', size: 24, color: '#2196f3' }
        },
        content: {
          mode: 'timeline',
          timeline: {
            dateField: 'date',
            sortOrder: 'asc' as const,
            orientation: 'horizontal' as const,
            showLines: true,
            color: '#2196f3',
            dateFormat: {
              year: 'numeric' as const, // 'numeric' | '2-digit'
              month: 'short' as const, // 'numeric' | '2-digit' | 'long' | 'short' | 'narrow'
              day: 'numeric' as const, // 'numeric' | '2-digit'
              hour: 'numeric' as const, // 'numeric' | '2-digit'
              minute: 'numeric' as const, // 'numeric' | '2-digit'
              weekday: 'short', // 'long' | 'short' | 'narrow'
              era: undefined, // 'long' | 'short' | 'narrow'
              timeZoneName: 'short', // 'long' | 'short'
              hour12: undefined, // boolean
              minute12: undefined, // boolean
              second: undefined // 'numeric' | '2-digit'
            }
          }
        },
        footer: {
          subtitle: 'Timeline mode with horizontal orientation and connecting lines'
        }
      }
    }
  },
 
  {
    id: 'actions-overflow-demo',
    title: 'Actions Overflow Demo',
    description: 'Demonstrates responsive action overflow with tuck-to-menu functionality',
    data: twoUsersData,
    config: {
      zones: {
        header: {
          title: 'Actions Overflow Demo',
          subtitle: 'Resize the window to see actions tuck into overflow menu',
          actions: [
            {
              id: 'add-user',
              label: 'Add User',
              icon: 'add',
              placement: 'always',
              onTrigger: () => alert('Add User clicked!')
            },
            {
              id: 'edit-user',
              label: 'Edit User',
              icon: 'edit',
              placement: 'always',
              pinned: true,
              onTrigger: () => alert('Edit User clicked!')
            },
            {
              id: 'delete-user',
              label: 'Delete User',
              icon: 'delete',
              placement: 'onHover',
              pinned: true,
              onTrigger: () => alert('Delete User clicked!')
            },
            {
              id: 'view-profile',
              label: 'View Profile',
              icon: 'view',
              placement: 'onHover',
              onTrigger: () => alert('View Profile clicked!')
            },
            {
              id: 'send-message',
              label: 'Send Message',
              icon: 'message',
              placement: 'menu',
              onTrigger: () => alert('Send Message clicked!')
            },
            {
              id: 'share-user',
              label: 'Share User',
              icon: 'share',
              placement: 'menu',
              onTrigger: () => alert('Share User clicked!')
            },
            {
              id: 'export-user',
              label: 'Export User',
              icon: 'export',
              placement: 'menu',
              onTrigger: () => alert('Export User clicked!')
            },
            {
              id: 'archive-user',
              label: 'Archive User',
              icon: 'archive',
              placement: 'menu',
              onTrigger: () => alert('Archive User clicked!')
            }
          ],
          actionOverflow: {
            maxInline: { mobile: 1, tablet: 2, desktop: 3 },
            menuLabel: 'More Actions',
            indicator: 'pulse'
          }
        },
        content: {
          mode: 'table',
          data: twoUsersData,
          layout: {},
          item: {
            fields: [
              { key: 'id', label: 'ID', width: '60px' },
              { key: 'name', label: 'Name' },
              { key: 'email', label: 'Email' },
              { key: 'department', label: 'Department' }
            ]
          },
          itemActions: [
            {
              id: 'edit-item',
              label: 'Edit',
              icon: 'edit',
              placement: 'always',
              onClick: (entity: SampleData) => alert(`Edit ${entity.name}`)
            },
            {
              id: 'delete-item',
              label: 'Delete',
              icon: 'delete',
              placement: 'onHover',
              onClick: (entity: SampleData) => alert(`Delete ${entity.name}`)
            },
            {
              id: 'view-item',
              label: 'View Details',
              icon: 'view',
              placement: 'menu',
              onClick: (entity: SampleData) => alert(`View details for ${entity.name}`)
            },
            {
              id: 'duplicate-item',
              label: 'Duplicate',
              icon: 'duplicate',
              placement: 'menu',
              onClick: (entity: SampleData) => alert(`Duplicate ${entity.name}`)
            }
          ],
          actionOverflow: {
            maxInline: 2,
            menuLabel: 'More',
            indicator: 'scale'
          }
        }
      }
    }
  },

  {
    id: 'grid-mode',
    title: 'Grid Mode',
    description: 'Grid mode displaying data in a responsive card-based layout',
    data: teaserSampleData,
    config: {
      collapse: {
          initialState: 'expanded'
        },
      zones: {
        header: {
          icon: { name: 'database', size: 32, color: '#af654c' },
          title: 'User Grid',
          subtitle: 'Card-based grid layout with user profiles',
          themeOverrides: {
            //titleFontSize: '1.5rem',
            //padding: '1rem',
            //backgroundColor: '#f8f9fa',
            //borderColor: 'none',
            //borderWidth: '5px',
            //borderStyle: 'solid', 
            //borderRadius: '8px',
            //titleColor: '#aa7c12',
            //subtitleColor: '#0c599c',
            //iconColor: '#495057',
            //iconSize: 26
          },
          actions: [
            {
              id: 'add-user',
              label: 'Add User',
              icon: 'add',
              variant: 'primary',
              placement: 'always',
              onTrigger: () => alert('Add User clicked!')
            },
            {
              id: 'refresh',
              label: 'Refresh',
              icon: 'refresh',
              variant: 'secondary',
              placement: 'always',
              onTrigger: () => alert('Refresh clicked!')
            }
          ]
        },
        content: {
          mode: 'grid',
          columns: 3,
          item: {
            fields: [
              { key: 'name', label: 'Name' },
              { key: 'email', label: 'Email' },
              { key: 'role', label: 'Role' },
              { key: 'department', label: 'Department' }
            ]
          }
        },
        footer: {
          subtitle: 'Responsive grid layout with 3 columns on desktop',
          themeOverrides: {
            //padding: '0.5rem',
            //backgroundColor: '#f1f3f5',
            //borderColor: '#dee2e6',
            //borderWidth: '1px',
            //borderStyle: 'solid', 
            //borderRadius: '0 0 8px 8px',
            //subtitleColor: '#212529'
          }
        }
      },
      devMode: true
    }
  },

  // New unified examples
  {
    id: 'traditional-table',
    title: 'Traditional Table',
    description: 'Simple table layout with basic field display',
    data: fourUsersData,
    config: {
      zones: {
        header: {
          title: 'User Directory',
          subtitle: 'Traditional table view'
        },
        content: {
          mode: 'table',
          item: {
            fields: [
              { key: 'id', label: 'ID', width: '60px' },
              { key: 'name', label: 'Name' },
              { key: 'email', label: 'Email' },
              { key: 'department', label: 'Department' },
              { key: 'role', label: 'Role' }
            ]
          }
        }
      }
    }
  },

  {
    id: 'rich-cells-table',
    title: 'Rich Cells Table',
    description: 'Table with rich content including images and formatted data',
    data: fourUsersData,
    config: {
      zones: {
        header: {
          title: 'User Profiles',
          subtitle: 'Rich table with images and formatted content'
        },
        content: {
          mode: 'table',
          item: {
            fields: [
              { key: 'src', label: 'Avatar', type: 'image', width: '60px' },
              { key: 'name', label: 'Name', type: 'text' },
              { key: 'email', label: 'Email', type: 'email' },
              { key: 'department', label: 'Department', type: 'text', renderAs: 'badge' },
              { key: 'progress', label: 'Progress', type: 'number', renderAs: 'progress', width: '120px' },
              { key: 'amount', label: 'Salary', type: 'number', renderAs: 'currency', currencyOptions: { currency: 'USD' } }
            ]
          }
        }
      }
    }
  },

  {
    id: 'basic-grid-layout',
    title: 'Basic Grid Layout',
    description: 'Responsive grid with flex/grid layout and card-based display',
    data: sixUsersData,
    config: {
      zones: {
        header: {
          title: 'User Grid',
          subtitle: 'Responsive card layout'
        },
        content: {
          mode: 'grid',
          columns: { mobile: 1, tablet: 2, desktop: 3 },
          item: {
            fields: [
              { key: 'src', label: 'Avatar', type: 'image' },
              { key: 'name', label: 'Name' },
              { key: 'role', label: 'Role' },
              { key: 'department', label: 'Department' },
              { key: 'status', label: 'Status', type: 'text', renderAs: 'badge' }
            ]
          }
        }
      }
    }
  },

  {
    id: 'grouped-traditional-table',
    title: 'Grouped Traditional Table',
    description: 'Traditional table with data grouped by department',
    data: eightUsersData,
    config: {
      zones: {
        header: {
          title: 'Users by Department',
          subtitle: 'Grouped traditional table view'
        },
        content: {
          mode: 'table',
          groupBy: 'department',
          item: {
            fields: [
              { key: 'id', label: 'ID', width: '60px' },
              { key: 'name', label: 'Name' },
              { key: 'email', label: 'Email' },
              { key: 'role', label: 'Role' }
            ]
          }
        }
      }
    }
  },

  {
    id: 'grouped-rich-cells-table',
    title: 'Grouped Rich Cells Table',
    description: 'Rich cells table with data grouped by department and enhanced formatting',
    data: eightUsersData,
    config: {
      zones: {
        header: {
          title: 'Department Teams',
          subtitle: 'Grouped rich table with enhanced content'
        },
        content: {
          mode: 'table',
          groupBy: 'department',
          item: {
            fields: [
              { key: 'src', label: 'Avatar', type: 'image', width: '50px' },
              { key: 'name', label: 'Name', type: 'text' },
              { key: 'role', label: 'Role', type: 'text', renderAs: 'badge' },
              { key: 'progress', label: 'Progress', type: 'number', renderAs: 'progress', width: '100px' },
              { key: 'rating', label: 'Rating', type: 'number', renderAs: 'rating', width: '80px' }
            ]
          }
        }
      }
    }
  },

  {
    id: 'per-item-actions-demo',
    title: 'Per-Item Actions',
    description: 'Table demonstrating various action placements: pinned, onHover, and menu',
    data: fourUsersData,
    config: {
      zones: {
        header: {
          title: 'User Management',
          subtitle: 'Per-item actions with different placements'
        },
        content: {
          mode: 'table',
          item: {
            fields: [
              { key: 'id', label: 'ID', width: '60px' },
              { key: 'name', label: 'Name' },
              { key: 'email', label: 'Email' },
              { key: 'department', label: 'Department' },
              { key: 'status', label: 'Status', type: 'text', renderAs: 'badge' }
            ]
          },
          itemActions: [
            {
              id: 'edit-user',
              label: 'Edit',
              icon: 'edit',
              placement: 'always',
              onClick: (entity: SampleData) => alert(`Edit ${entity.name}`)
            },
            {
              id: 'view-profile',
              label: 'View Profile',
              icon: 'view',
              placement: 'onHover',
              onClick: (entity: SampleData) => alert(`View profile for ${entity.name}`)
            },
            {
              id: 'send-message',
              label: 'Send Message',
              icon: 'message',
              placement: 'onHover',
              onClick: (entity: SampleData) => alert(`Send message to ${entity.name}`)
            },
            {
              id: 'duplicate-user',
              label: 'Duplicate',
              icon: 'duplicate',
              placement: 'menu',
              onClick: (entity: SampleData) => alert(`Duplicate ${entity.name}`)
            },
            {
              id: 'archive-user',
              label: 'Archive',
              icon: 'archive',
              placement: 'menu',
              onClick: (entity: SampleData) => alert(`Archive ${entity.name}`)
            }
          ]
        }
      }
    }
  },

  {
    id: 'compact-list-view',
    title: 'Compact List View',
    description: 'Minimal list layout with essential information and actions',
    data: sixUsersData,
    config: {
      zones: {
        header: {
          title: 'User List',
          subtitle: 'Compact list with inline actions'
        },
        content: {
          mode: 'list',
          item: {
            fields: [
              { key: 'src', label: 'Avatar', type: 'image', width: '40px' },
              { key: 'name', label: 'Name' },
              { key: 'email', label: 'Email' },
              { key: 'department', label: 'Department', type: 'text', renderAs: 'badge' }
            ]
          },
          itemActions: [
            {
              id: 'edit',
              label: 'Edit',
              icon: 'edit',
              placement: 'always',
              onClick: (entity: SampleData) => alert(`Edit ${entity.name}`)
            },
            {
              id: 'delete',
              label: 'Delete',
              icon: 'delete',
              placement: 'onHover',
              onClick: (entity: SampleData) => alert(`Delete ${entity.name}`)
            }
          ]
        }
      }
    }
  },
  // ── Zone Layout Examples (Item 4) ────────────────────────────────────
  {
    id: 'zone-layout-icon-above',
    title: 'Zone Layout: Icon Above Title',
    description: 'header.layout.iconPosition = "above" — icon stacks vertically above the title instead of sitting beside it. Useful for dashboard-style headers where the icon acts as a visual anchor.',
    data: fourUsersData,
    config: {
      zones: {
        header: {
          title: 'Team Overview',
          subtitle: 'Engineering department',
          icon: { name: 'users', size: 28, color: '#4f46e5' },
          layout: { iconPosition: 'above' },
          actions: [
            {
              id: 'add-member',
              label: 'Add Member',
              icon: 'add',
              variant: 'primary',
              placement: 'always',
              onClick: () => alert('Add member')
            }
          ]
        },
        content: {
          mode: 'grid',
          item: {
            fields: [
              { key: 'name', label: 'Name' },
              { key: 'role', label: 'Role', renderAs: 'badge' },
              { key: 'department', label: 'Department' },
              { key: 'status', label: 'Status', renderAs: 'badge' }
            ],
            layout: { type: 'auto' }
          }
        }
      }
    }
  },
  {
    id: 'zone-layout-actions-below',
    title: 'Zone Layout: Actions Below Header',
    description: 'header.layout.actionsPosition = "below" — actions render in a dedicated row beneath the title/icon row. Ideal when you have many actions and want them clearly separated from the title.',
    data: threeUsersData,
    config: {
      zones: {
        header: {
          title: 'Reports Dashboard',
          subtitle: 'Monthly summary',
          icon: { name: 'chart', size: 22, color: '#059669' },
          layout: { actionsPosition: 'below' },
          actions: [
            {
              id: 'export-csv',
              label: 'Export CSV',
              icon: 'download',
              variant: 'secondary',
              placement: 'always',
              onClick: () => alert('Export CSV')
            },
            {
              id: 'export-pdf',
              label: 'Export PDF',
              icon: 'download',
              placement: 'always',
              onClick: () => alert('Export PDF')
            },
            {
              id: 'share',
              label: 'Share',
              icon: 'share',
              placement: 'always',
              onClick: () => alert('Share')
            }
          ]
        },
        content: {
          mode: 'table',
          layout: { table: { type: 'traditional' } },
          item: {
            fields: [
              { key: 'name', label: 'Name' },
              { key: 'role', label: 'Role' },
              { key: 'department', label: 'Department' },
              { key: 'amount', label: 'Salary', type: 'number', renderAs: 'currency', currencyOptions: { currency: 'USD' } }
            ],
            layout: { type: 'auto' }
          }
        }
      }
    }
  },
  {
    id: 'zone-layout-vertical',
    title: 'Zone Layout: Vertical Orientation',
    description: 'header.layout.orientation = "vertical" — all zone sections (icon/title, subtitle, actions) stack top-to-bottom instead of side-by-side. Good for narrow panels or card-style widgets.',
    data: twoUsersData,
    config: {
      zones: {
        header: {
          title: 'Active Alerts',
          subtitle: '2 unresolved issues require attention',
          icon: { name: 'warning', size: 24, color: '#d97706' },
          layout: { orientation: 'vertical' },
          actions: [
            {
              id: 'resolve-all',
              label: 'Resolve All',
              icon: 'check',
              variant: 'primary',
              placement: 'always',
              onClick: () => alert('Resolve all')
            }
          ]
        },
        content: {
          mode: 'grid',
          item: {
            fields: [
              { key: 'name', label: 'Name' },
              { key: 'status', label: 'Status', renderAs: 'badge' },
              { key: 'department', label: 'Department' }
            ],
            layout: { type: 'auto' }
          }
        },
        footer: {
          title: 'Last updated: just now',
          layout: { orientation: 'vertical' }
        }
      }
    }
  },
  {
    id: 'pagination-grid',
    title: 'Pagination — Grid (5 per page)',
    description: 'ContentConfig.pagination: 20 items displayed 5 at a time with prev/next controls.',
    data: twentyUsersData as Entity[],
    config: {
      zones: {
        header: {
          title: 'Team Directory',
          subtitle: '20 members · 5 per page',
          icon: 'users',
        },
        content: {
          mode: 'grid',
          pagination: { pageSize: 5, initialPage: 1 },
          modeConfig: {
            columns: 3,
          },
          item: {
            fields: [
              { key: 'name', label: 'Name', renderAs: 'text' },
              { key: 'role', label: 'Role' },
              { key: 'status', label: 'Status', renderAs: 'badge' },
            ],
          },
        },
      },
    },
  },
  {
    id: 'pagination-table',
    title: 'Pagination — Table (4 per page)',
    description: 'Same data in table mode, 4 rows per page. More than 7 pages shows X / Y indicator.',
    data: twentyUsersData as Entity[],
    config: {
      zones: {
        header: {
          title: 'User Table',
          subtitle: '20 records · 4 per page',
          icon: 'table',
        },
        content: {
          mode: 'table',
          pagination: { pageSize: 4, initialPage: 1 },
          item: {
            fields: [
              { key: 'name', label: 'Name' },
              { key: 'role', label: 'Role' },
              { key: 'status', label: 'Status', renderAs: 'badge' },
              { key: 'department', label: 'Department' },
            ],
          },
        },
      },
    },
  },
];
export default widgemoExamples;
