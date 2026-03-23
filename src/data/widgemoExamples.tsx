import React from 'react';
import { teaserSampleData } from './sampleData';
import type { SampleData } from './types';
import type { Entity, ActionContext } from 'widgemo-core';
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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const widgemoExamples: Array<{
  id: string;
  title: string;
  description: string;
  data: Entity[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    description: 'Simple table layout with basic field display. Email column uses wrap: true to allow line wrapping; other columns use the default truncation.',
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
              // wrap: true + type: 'email' — wraps with forced break-word for long addresses
              { key: 'email', label: 'Email', type: 'email', wrap: true },
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
    description: 'Traditional table with data grouped by department. item.wrap: true enables natural line wrapping across all columns.',
    data: eightUsersData,
    config: {
      zones: {
        header: {
          title: 'Users by Department',
          subtitle: 'Grouped traditional table — item.wrap: true'
        },
        content: {
          mode: 'table',
          groupBy: 'department',
          item: {
            // item-level wrap: true — all fields in every cell wrap freely
            wrap: true,
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
  {
    id: 'responsive-mode-switching',
    title: 'Responsive Mode Switching',
    description: 'content.responsive.breakpoints switches the display mode per viewport: table on desktop → grid on tablet → carousel on mobile. Resize the window to see the mode change live.',
    data: twelveUsersData as Entity[],
    config: {
      zones: {
        header: {
          title: 'Responsive View',
          subtitle: 'Desktop: table · Tablet: grid · Mobile: carousel',
          icon: 'table',
        },
        content: {
          mode: 'table',
          responsive: {
            breakpoints: {
              tablet: { mode: 'grid' },
              mobile: { mode: 'carousel' },
            },
          },
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
  {
    id: 'search-grid',
    title: 'Search — Grid (live filter)',
    description: 'content.search enables a debounced search bar that filters all string fields client-side. Try searching by name, role, or department.',
    data: twentyUsersData as Entity[],
    config: {
      zones: {
        header: {
          title: 'Team Directory',
          subtitle: 'Type to filter 20 members',
          icon: 'users',
        },
        content: {
          mode: 'grid',
          search: { placeholder: 'Search by name, role…' },
          item: {
            fields: [
              { key: 'name', label: 'Name', renderAs: 'text' },
              { key: 'role', label: 'Role' },
              { key: 'status', label: 'Status', renderAs: 'badge' },
              { key: 'department', label: 'Department' },
            ],
          },
        },
      },
    },
  },
  {
    id: 'search-with-pagination',
    title: 'Search + Pagination combined',
    description: 'Search filters the full dataset first, then pagination slices the filtered results. Page resets to 1 on each new query.',
    data: twentyUsersData as Entity[],
    config: {
      zones: {
        header: {
          title: 'User Directory',
          subtitle: 'Search then page through results',
          icon: 'table',
        },
        content: {
          mode: 'table',
          search: { placeholder: 'Search members…' },
          pagination: { pageSize: 5 },
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
  {
    id: 'board-basic',
    title: 'Board — Columns by field value',
    description: 'Kanban board grouping items by status. Columns are driven by item.status — no filter functions required.',
    data: twentyUsersData as Entity[],
    config: {
      zones: {
        header: {
          title: 'Team Status Board',
          subtitle: 'Columns driven by item.status — WIP limits on Active & Pending',
          icon: 'table',
        },
        content: {
          mode: 'board',
          modeConfig: {
            board: {
              columnField: 'status',
              columns: [
                { id: 'active',   label: 'Active',   color: '#28a745', wipLimit: 8 },
                { id: 'pending',  label: 'Pending',  color: '#fd7e14', wipLimit: 4 },
                { id: 'inactive', label: 'Inactive', color: '#6c757d' },
              ],
              dragEnabled: true,
              item: {
                fields: [
                  { key: 'name',       label: 'Name',       type: 'text' as const },
                  { key: 'role',       label: 'Role' },
                  { key: 'department', label: 'Department' },
                ],
                layout: { type: 'auto' as const },
              },
            },
          },
        },
      },
    },
  },
  {
    id: 'board-swimlanes',
    title: 'Board — Columns × Swimlane rows',
    description: 'Status columns crossed with department swimlane rows. Each cell shows items matching both column value (status) and row value (department).',
    data: twentyUsersData as Entity[],
    config: {
      zones: {
        header: {
          title: 'Team Board by Dept',
          subtitle: 'Columns = status · Rows = department',
          icon: 'table',
        },
        content: {
          mode: 'board',
          modeConfig: {
            board: {
              columnField: 'status',
              columns: [
                { id: 'active',   label: 'Active',   color: '#28a745' },
                { id: 'pending',  label: 'Pending',  color: '#fd7e14' },
                { id: 'inactive', label: 'Inactive', color: '#6c757d' },
              ],
              swimlanes: {
                field: 'department',
                order: ['Engineering', 'Design', 'Business'],
              },
              dragEnabled: true,
              item: {
                fields: [
                  { key: 'name', label: 'Name', type: 'text' as const },
                  { key: 'role', label: 'Role' },
                ],
                layout: { type: 'auto' as const },
              },
            },
          },
        },
      },
    },
  },

  // ── NEW: Config Root Options ─────────────────────────────────────────────
  {
    id: 'config-root-options',
    title: 'Config Root Options',
    description: 'WidgemoConfig.collapse (initially collapsed), .style (inline border/radius), .preRender hook. ZoneConfig.style and .className on footer.',
    data: fourUsersData as Entity[],
    config: {
      id: 'config-root-options',
      collapse: { initialState: 'collapsed' },
      style: { border: '2px solid #6610f2', borderRadius: '12px' },
      preRender: () => console.log('[preRender] config-root-options rendered'),
      zones: {
        header: {
          title: 'Collapsible Widget',
          subtitle: 'Click the collapse button to expand',
          icon: { name: 'users', size: 24, color: '#6610f2' },
          style: { background: 'linear-gradient(135deg, #f3e5ff 0%, #e8d5ff 100%)' },
        },
        content: {
          mode: 'table',
          item: {
            fields: [
              { key: 'name', label: 'Name' },
              { key: 'role', label: 'Role' },
              { key: 'department', label: 'Department' },
            ],
            layout: { type: 'auto' },
          },
        },
        footer: {
          subtitle: 'Footer styled via zone.className + zone.style',
          className: 'text-center',
          style: { fontStyle: 'italic', padding: '0.75rem' },
        },
      },
    },
  },

  // ── NEW: Zone themeOverrides ──────────────────────────────────────────────
  {
    id: 'zone-theme-overrides',
    title: 'Zone themeOverrides',
    description: 'ZoneConfig.themeOverrides applied fully: titleFontSize, titleColor, subtitleColor, backgroundColor, borderColor, borderWidth, borderStyle, borderRadius, padding, iconColor, iconSize.',
    data: threeUsersData as Entity[],
    config: {
      id: 'zone-theme-overrides',
      zones: {
        header: {
          title: 'Custom Styled Zone',
          subtitle: 'via themeOverrides on ZoneConfig',
          icon: { name: 'chart', size: 28 },
          themeOverrides: {
            titleFontSize: '1.4rem',
            titleColor: '#ffffff',
            subtitleColor: '#e0d0ff',
            backgroundColor: '#4f46e5',
            borderColor: '#3730a3',
            borderWidth: '2px',
            borderStyle: 'solid',
            borderRadius: '8px 8px 0 0',
            padding: '1.25rem',
            iconColor: '#ffffff',
            iconSize: 22,
          },
        },
        content: {
          mode: 'grid',
          item: {
            fields: [
              { key: 'name', label: 'Name' },
              { key: 'role', label: 'Role', renderAs: 'badge' },
              { key: 'department', label: 'Department' },
            ],
            layout: { type: 'auto' },
          },
        },
        footer: {
          subtitle: 'Footer uses themeOverrides too',
          themeOverrides: {
            backgroundColor: '#eef2ff',
            borderColor: '#c7d2fe',
            borderWidth: '1px',
            borderStyle: 'solid',
            borderRadius: '0 0 8px 8px',
            padding: '0.75rem 1.25rem',
            subtitleColor: '#4f46e5',
          },
        },
      },
    },
  },

  // ── NEW: Zone Collapse, enabled=false, customSections ────────────────────
  {
    id: 'zone-collapse-options',
    title: 'Zone Collapse & enabled',
    description: 'ZoneConfig.collapse: header starts collapsed (button=true), footer has collapse.button=false. ZoneConfig.enabled=false hides a zone entirely. ZoneConfig.customSections adds arbitrary React nodes.',
    data: fourUsersData as Entity[],
    config: {
      id: 'zone-collapse-options',
      zones: {
        header: {
          title: 'Collapsible Header Zone',
          subtitle: 'Starts collapsed — click arrow to expand',
          icon: { name: 'settings', size: 22 },
          collapse: { initialState: 'collapsed', button: true },
          customSections: [
            React.createElement('div', {
              key: 'banner',
              style: { padding: '0.5rem 1rem', background: '#fff3cd', borderRadius: '4px', fontSize: '0.85rem', marginTop: '0.5rem' },
            }, '⚠️ customSections: rendered via ZoneConfig.customSections[]'),
          ],
        },
        content: {
          mode: 'grid',
          item: {
            fields: [
              { key: 'name', label: 'Name' },
              { key: 'role', label: 'Role' },
            ],
            layout: { type: 'auto' },
          },
        },
        footer: {
          title: 'Fixed Footer (no collapse button)',
          subtitle: 'collapse.button=false hides the expand/collapse toggle',
          collapse: { initialState: 'expanded', button: false },
        },
      },
    },
  },

  // ── NEW: Zone Dynamic Renderers (titleRenderer / subtitleRenderer) ────────
  {
    id: 'zone-dynamic-renderers',
    title: 'Zone: titleRenderer & subtitleRenderer',
    description: 'ZoneConfig.titleRenderer and subtitleRenderer as functions that receive live data and return strings. ActionConfig.handler receives the full ActionContext (entity, data, zone).',
    data: eightUsersData as Entity[],
    config: {
      id: 'zone-dynamic-renderers',
      zones: {
        header: {
          titleRenderer: (data: Entity[]) => `Team Overview (${data.length} members)`,
          subtitleRenderer: (data: Entity[]) =>
            `Active: ${data.filter(d => d.status === 'active').length} · Inactive: ${data.filter(d => d.status === 'inactive').length} · Pending: ${data.filter(d => d.status === 'pending').length}`,
          icon: { name: 'users', size: 22, color: '#059669' },
          collapse: { initialState: 'fixed' },
          actions: [
            {
              id: 'export',
              label: 'Export',
              icon: 'download',
              placement: 'always' as const,
              handler: (context: ActionContext) => alert(`Exporting ${context.data.length} records from zone: ${context.zone}`),
            },
          ],
        },
        content: {
          mode: 'table',
          item: {
            fields: [
              { key: 'name', label: 'Name' },
              { key: 'status', label: 'Status', renderAs: 'badge' },
              { key: 'department', label: 'Department' },
            ],
            layout: { type: 'auto' },
          },
        },
      },
    },
  },

  // ── NEW: Zone Title as React.ReactNode ────────────────────────────────────
  {
    id: 'zone-title-node',
    title: 'Zone title/subtitle as ReactNode',
    description: 'ZoneConfig.title and .subtitle accept React.ReactNode — render rich JSX markup including badges, spans, or custom styling inline in zone headers.',
    data: threeUsersData as Entity[],
    config: {
      id: 'zone-title-node',
      zones: {
        header: {
          title: React.createElement('span', null,
            'Team Overview ',
            React.createElement('span', {
              style: { fontSize: '0.7em', background: '#dcfce7', color: '#059669', borderRadius: '6px', padding: '2px 8px', marginLeft: '8px', fontWeight: 'normal' }
            }, '● Live')
          ),
          subtitle: React.createElement('span', { style: { color: '#6c757d' } },
            'Showing ',
            React.createElement('strong', null, '3'),
            ' members · Updated just now'
          ),
          icon: { name: 'users', size: 22 },
        },
        content: {
          mode: 'table',
          item: {
            fields: [
              { key: 'name', label: 'Name' },
              { key: 'role', label: 'Role' },
              { key: 'status', label: 'Status', renderAs: 'badge' },
            ],
            layout: { type: 'auto' },
          },
        },
      },
    },
  },

  // ── NEW: Action Types: Dropdown, handler, visibleIf, pinned ──────────────
  {
    id: 'action-types-dropdown',
    title: 'Actions: dropdown, handler, visibleIf, pinned',
    description: 'ActionConfig type="dropdown" with nested items[]. ActionConfig.handler receives ActionContext. ActionConfig.visibleIf filters per entity. .pinned prevents tucking. actionOverflow indicator="color-shift"/"none".',
    data: threeUsersData as Entity[],
    config: {
      id: 'action-types-dropdown',
      zones: {
        header: {
          title: 'Dropdown Actions Demo',
          subtitle: 'type="dropdown" with nested items · handler(ActionContext) · indicator="color-shift"',
          actions: [
            {
              id: 'create',
              label: 'Create',
              icon: 'add',
              type: 'dropdown' as const,
              placement: 'always' as const,
              items: [
                { id: 'create-user', label: 'New User', icon: 'user', onClick: () => alert('New User') },
                { id: 'create-team', label: 'New Team', icon: 'users', onClick: () => alert('New Team') },
                { id: 'create-report', label: 'New Report', icon: 'chart', onClick: () => alert('New Report') },
              ],
            },
            {
              id: 'export-all',
              label: 'Export All',
              icon: 'download',
              placement: 'always' as const,
              handler: (ctx: ActionContext) => alert(`Exporting ${ctx.data.length} items from zone: ${ctx.zone}`),
            },
            {
              id: 'settings',
              label: 'Settings',
              icon: 'settings',
              placement: 'menu' as const,
              handler: (ctx: ActionContext) => alert(`Settings from ${ctx.zone}`),
            },
          ],
          actionOverflow: {
            maxInline: { mobile: 1, tablet: 2, desktop: 3 },
            menuLabel: 'More',
            indicator: 'color-shift' as const,
          },
        },
        content: {
          mode: 'table',
          item: {
            fields: [
              { key: 'name', label: 'Name' },
              { key: 'role', label: 'Role' },
              { key: 'status', label: 'Status', renderAs: 'badge' },
            ],
            layout: { type: 'auto' },
          },
          itemActions: [
            {
              id: 'item-actions-menu',
              label: 'Actions',
              type: 'dropdown' as const,
              placement: 'always' as const,
              items: [
                { id: 'view', label: 'View', icon: 'view', onClick: (e: Entity) => alert(`View ${e.name as string}`) },
                { id: 'edit', label: 'Edit', icon: 'edit', onClick: (e: Entity) => alert(`Edit ${e.name as string}`) },
              ],
            },
            {
              id: 'pinned-delete',
              label: 'Delete',
              icon: 'delete',
              placement: 'always' as const,
              pinned: true,
              visibleIf: (e: Entity) => e.status === 'active',
              onClick: (e: Entity) => alert(`Delete ${e.name as string}`),
            },
          ],
          actionOverflow: { maxInline: 2, menuLabel: 'More', indicator: 'none' as const },
        },
      },
    },
  },

  // ── NEW: Table Layout Options (striped/hover/showHeader) + ColumnConfig ───
  {
    id: 'table-layout-options',
    title: 'Table layout.table & ColumnConfig',
    description: 'layout.table: striped, hover, showHeader. ModeConfig.columns as ColumnConfig[] for per-column width, align, header label, sortable. FieldConfig.align on fields.',
    data: sixUsersData as Entity[],
    config: {
      id: 'table-layout-options',
      zones: {
        header: {
          title: 'Table Layout Options',
          subtitle: 'striped=true · hover=true · ColumnConfig[] for per-column settings',
          icon: { name: 'table', size: 22, color: '#0d6efd' },
        },
        content: {
          mode: 'table',
          layout: {
            table: {
              type: 'traditional',
              striped: true,
              hover: true,
              showHeader: true,
            },
          },
          modeConfig: {
            columns: [
              { field: 'id', header: '#', width: '50px', align: 'center' as const },
              { field: 'name', header: 'Full Name', width: '180px', align: 'left' as const, sortable: true },
              { field: 'email', header: 'Email Address', type: 'email' as const, sortable: true },
              { field: 'department', header: 'Team', align: 'center' as const },
              { field: 'progress', header: 'Progress %', align: 'center' as const, renderAs: 'progress' as const, progressOptions: { color: '#28a745', height: 8, showPercentage: true } },
              { field: 'amount', header: 'Salary', align: 'right' as const, renderAs: 'currency' as const, currencyOptions: { currency: 'USD', decimalAlign: true } },
            ] ,
          },
          item: {
            fields: [
              { key: 'id', label: '#', width: '50px', align: 'center' as const },
              { key: 'name', label: 'Full Name', align: 'left' as const },
              { key: 'email', label: 'Email Address', type: 'email' as const },
              { key: 'department', label: 'Team', align: 'center' as const },
              { key: 'progress', label: 'Progress %', renderAs: 'progress', renderAsOptions: { color: '#28a745', height: 8, showPercentage: true } },
              { key: 'amount', label: 'Salary', renderAs: 'currency', renderAsOptions: { currency: 'USD', decimalAlign: true }, align: 'right' as const },
            ],
            layout: { type: 'auto' },
          },
        },
      },
    },
  },

  // ── NEW: Field Types: boolean, swatch, formatter, condition, visible, span ─
  {
    id: 'field-boolean-swatch',
    title: 'Field: boolean, swatch, formatter, condition, visible, span',
    description: 'type="boolean" with booleanTrueLabel/booleanFalseLabel. type="swatch" renders a color dot. formatter transforms raw values. condition hides fields per-entity. visible=false removes entirely. span for multi-column stretch.',
    data: [
      { id: 1, name: 'Alice', isActive: true, isVerified: true, tierColor: '#ffd700', tier: 'Gold', score: 92 },
      { id: 2, name: 'Bob',   isActive: false, isVerified: true,  tierColor: '#c0c0c0', tier: 'Silver', score: 71 },
      { id: 3, name: 'Carol', isActive: true,  isVerified: false, tierColor: '#cd7f32', tier: 'Bronze', score: 55 },
      { id: 4, name: 'David', isActive: false, isVerified: false, tierColor: '#6c757d', tier: 'Basic', score: 38 },
    ] as Entity[],
    config: {
      id: 'field-boolean-swatch',
      zones: {
        header: { title: 'Boolean, Swatch & Field Options', subtitle: 'booleanTrueLabel · swatch type · formatter · condition · visible=false · span' },
        content: {
          mode: 'table',
          item: {
            fields: [
              { key: 'name', label: 'Name' },
              // type='boolean' with custom labels
              { key: 'isActive', label: 'Active', type: 'boolean' as const, booleanTrueLabel: '✓ Active', booleanFalseLabel: '✗ Inactive' },
              { key: 'isVerified', label: 'Verified', type: 'boolean' as const, booleanTrueLabel: 'Verified', booleanFalseLabel: 'Unverified', align: 'center' as const },
              // type='swatch' renders a color dot from the hex value
              { key: 'tierColor', label: 'Tier Color', type: 'swatch' as const },
              // formatter transforms the raw value
              { key: 'score', label: 'Score', formatter: (val: unknown) => `${val} pts` },
              // condition: only show tier for high scorers
              { key: 'tier', label: 'Tier (score≥70 only)', renderAs: 'badge', condition: (entity: Entity) => (entity.score as number) >= 70 },
              // visible=false — completely suppressed
              { key: 'id', label: 'ID (hidden)', visible: false },
            ],
            layout: { type: 'auto' },
          },
        },
      },
    },
  },

  // ── NEW: renderAs: link — all linkOptions ─────────────────────────────────
  {
    id: 'renderas-link',
    title: 'renderAs: link — linkOptions',
    description: 'renderAs="link" with renderAsOptions: text (static), text (function), url (function), newTab, externalWarning. Shows unified renderAsOptions API alongside legacy linkOptions.',
    data: [
      { id: 1, name: 'GitHub',    url: 'https://github.com',           username: 'alice', docUrl: 'https://github.com' },
      { id: 2, name: 'Docs',      url: 'https://docs.example.com',    username: 'bob',   docUrl: 'https://docs.example.com' },
      { id: 3, name: 'Dashboard', url: 'https://app.example.com',     username: 'carol', docUrl: 'https://app.example.com' },
    ] as Entity[],
    config: {
      id: 'renderas-link',
      zones: {
        header: { title: 'Link Field Rendering', subtitle: 'renderAsOptions: static text · dynamic text fn · dynamic url fn · newTab · externalWarning' },
        content: {
          mode: 'table',
          item: {
            fields: [
              { key: 'name', label: 'Resource' },
              // Static custom text
              { key: 'url', label: 'Static Text', renderAs: 'link', renderAsOptions: { text: 'Open →', newTab: true } },
              // Dynamic text & url from entity
              { key: 'username', label: 'Dynamic URL', renderAs: 'link', renderAsOptions: {
                url: (entity: Entity) => `https://github.com/${entity.username}`,
                text: (entity: Entity) => `@${entity.username}`,
                newTab: true,
              }},
              // Legacy linkOptions approach
              { key: 'docUrl', label: 'External Warning', renderAs: 'link', linkOptions: { newTab: true, externalWarning: true } },
            ],
            layout: { type: 'auto' },
          },
        },
      },
    },
  },

  // ── NEW: renderAs: badge — icon & iconPosition variants ──────────────────
  {
    id: 'renderas-badge-advanced',
    title: 'renderAs: badge — icons, style, size',
    description: 'Badge colorMap with icon+iconPosition: "left", "right", "only". Badge style "inline" vs "badge". Badge size "sm", "md", "lg". Dynamic colorMap via function.',
    data: [
      { id: 1, name: 'Alice', priority: 'high',   status: 'active',   tier: 'gold'   },
      { id: 2, name: 'Bob',   priority: 'medium', status: 'pending',  tier: 'silver' },
      { id: 3, name: 'Carol', priority: 'low',    status: 'inactive', tier: 'bronze' },
      { id: 4, name: 'David', priority: 'high',   status: 'active',   tier: 'gold'   },
    ] as Entity[],
    config: {
      id: 'renderas-badge-advanced',
      zones: {
        header: { title: 'Badge Rendering Options', subtitle: 'iconPosition: left · right · only · style: inline · size: sm/md/lg' },
        content: {
          mode: 'table',
          item: {
            fields: [
              { key: 'name', label: 'Name' },
              // icon left, size sm
              { key: 'priority', label: 'Priority (icon left, sm)', renderAs: 'badge', renderAsOptions: {
                colorMap: {
                  high:   { background: '#dc3545', text: '#fff', icon: 'warning', iconPosition: 'left' },
                  medium: { background: '#fd7e14', text: '#fff', icon: 'warning', iconPosition: 'left' },
                  low:    { background: '#28a745', text: '#fff', icon: 'check',   iconPosition: 'left' },
                },
                size: 'sm',
              }},
              // icon only, size lg
              { key: 'status', label: 'Status (icon only, lg)', renderAs: 'badge', renderAsOptions: {
                colorMap: {
                  active:   { background: '#28a745', text: '#fff', icon: 'check', iconPosition: 'only' },
                  pending:  { background: '#ffc107', text: '#333', icon: 'clock', iconPosition: 'only' },
                  inactive: { background: '#6c757d', text: '#fff', icon: 'close', iconPosition: 'only' },
                },
                size: 'lg',
              }},
              // style inline + icon right, size md
              { key: 'tier', label: 'Tier (inline, icon right)', renderAs: 'badge', renderAsOptions: {
                colorMap: {
                  gold:   { color: '#b8860b', icon: 'star', iconPosition: 'right' },
                  silver: { color: '#708090', icon: 'star', iconPosition: 'right' },
                  bronze: { color: '#cd7f32', icon: 'star', iconPosition: 'right' },
                },
                style: 'inline',
                size: 'md',
              }},
            ],
            layout: { type: 'auto' },
          },
        },
      },
    },
  },

  // ── NEW: renderAs: progress & rating — all options ───────────────────────
  {
    id: 'renderAs-progress-rating',
    title: 'renderAs: progress & rating — options',
    description: 'Progress: dynamic color fn, height, showPercentage, backgroundColor. Rating: max, size, color, emptyColor, custom icon name.',
    data: [
      { id: 1, name: 'Alice', progress: 85, effort: 30, rating: 4.5, satisfaction: 3 },
      { id: 2, name: 'Bob',   progress: 92, effort: 75, rating: 4.8, satisfaction: 5 },
      { id: 3, name: 'Carol', progress: 45, effort: 55, rating: 3.2, satisfaction: 2 },
      { id: 4, name: 'David', progress: 78, effort: 90, rating: 4.0, satisfaction: 4 },
    ] as Entity[],
    config: {
      id: 'renderAs-progress-rating',
      zones: {
        header: { title: 'Progress & Rating Fields', subtitle: 'Dynamic color fn · custom height · showPercentage · max · emptyColor · custom icon' },
        content: {
          mode: 'table',
          item: {
            fields: [
              { key: 'name', label: 'Name' },
              // Progress with dynamic color function
              { key: 'progress', label: 'Progress (colored)', renderAs: 'progress', renderAsOptions: {
                color: (entity: Entity) => (entity.progress as number) >= 80 ? '#28a745' : (entity.progress as number) >= 50 ? '#ffc107' : '#dc3545',
                backgroundColor: '#e9ecef',
                height: 12,
                showPercentage: true,
              }},
              // Thin bar, no percentage label
              { key: 'effort', label: 'Effort (thin, no %)', renderAs: 'progress', renderAsOptions: {
                color: '#0d6efd',
                height: 4,
                showPercentage: false,
              }},
              // Rating default 5 stars
              { key: 'rating', label: 'Rating (★, gold)', renderAs: 'rating', renderAsOptions: {
                max: 5,
                color: '#ffd700',
                emptyColor: '#dee2e6',
                size: 18,
              }},
              // Rating with heart icon
              { key: 'satisfaction', label: 'Satisfaction (♥, 5)', renderAs: 'rating', renderAsOptions: {
                max: 5,
                icon: 'heart',
                color: '#e91e63',
                emptyColor: '#f8bbd0',
                size: 20,
              }},
            ],
            layout: { type: 'auto' },
          },
        },
      },
    },
  },

  // ── NEW: renderAs: currency — advanced options ────────────────────────────
  {
    id: 'currency-advanced',
    title: 'renderAs: currency — advanced options',
    description: 'compact notation, colorize (pos/neg/zero colors), negativeFormat="parentheses", decimalAlign, locale (de-DE), minimumFractionDigits, symbolPosition.',
    data: [
      { id: 1, name: 'Revenue Q1', amount: 1850000,    balance: 12345.67,  expense: -4250    },
      { id: 2, name: 'Revenue Q2', amount: 2350000,    balance: -8901.23,  expense: -1234567 },
      { id: 3, name: 'Revenue Q3', amount: 750000,     balance: 45678.00,  expense: 0        },
      { id: 4, name: 'Revenue Q4', amount: 12750000,   balance: -123456.78, expense: -750    },
    ] as Entity[],
    config: {
      id: 'currency-advanced',
      zones: {
        header: { title: 'Currency Formatting Options', subtitle: 'compact · colorize · negativeFormat=parentheses · decimalAlign · locale=de-DE' },
        content: {
          mode: 'table',
          item: {
            fields: [
              { key: 'name', label: 'Period' },
              // Compact notation (1.85M)
              { key: 'amount', label: 'Amount (compact)', renderAs: 'currency', renderAsOptions: {
                currency: 'USD',
                compact: true,
                compactThreshold: 1000,
              }},
              // Colorize + decimalAlign
              { key: 'balance', label: 'Balance (colorized)', renderAs: 'currency', renderAsOptions: {
                currency: 'USD',
                colorize: true,
                positiveColor: '#28a745',
                negativeColor: '#dc3545',
                zeroColor: '#6c757d',
                decimalAlign: true,
              }},
              // Parentheses for negatives, 0 decimals, EUR locale
              { key: 'expense', label: 'Expense (parens, €, de-DE)', renderAs: 'currency', renderAsOptions: {
                currency: 'EUR',
                locale: 'de-DE',
                negativeFormat: 'parentheses',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }},
            ],
            layout: { type: 'auto' },
          },
        },
      },
    },
  },

  // ── NEW: Image Field — all imageOptions ──────────────────────────────────
  {
    id: 'image-advanced',
    title: 'Image Field — all imageOptions',
    description: 'imageOptions: objectFit (cover/contain/scale-down), circular, borderRadius, border, shadow, backgroundColor, lightbox, lazy. Table with multiple image columns for comparison.',
    data: fourUsersData.map(u => ({ ...u, srcCover: u.src, srcCircular: u.src, srcContain: u.src, srcScale: u.src })) as Entity[],
    config: {
      id: 'image-advanced',
      zones: {
        header: { title: 'Image Field Options', subtitle: 'objectFit · circular · border · shadow · lightbox · lazy' },
        content: {
          mode: 'table',
          item: {
            fields: [
              { key: 'name', label: 'Name' },
              // Cover fit + lightbox + shadow + lazy
              { key: 'srcCover', label: 'Cover + Lightbox', type: 'image' as const, imageOptions: {
                objectFit: 'cover' as const,
                width: 60, height: 60,
                lightbox: true,
                shadow: '0 2px 8px rgba(0,0,0,0.2)',
                lazy: true,
              }},
              // Circular + border
              { key: 'srcCircular', label: 'Circular + border', type: 'image' as const, imageOptions: {
                circular: true,
                width: 50, height: 50,
                border: '2px solid #0d6efd',
              }},
              // Contain + background + borderRadius
              { key: 'srcContain', label: 'Contain + BG', type: 'image' as const, imageOptions: {
                objectFit: 'contain' as const,
                width: 60, height: 60,
                borderRadius: '8px',
                backgroundColor: '#f0f2f5',
              }},
              // Scale-down
              { key: 'srcScale', label: 'Scale-down', type: 'image' as const, imageOptions: {
                objectFit: 'scale-down' as const,
                width: 60, height: 60,
                borderRadius: 4,
                alt: 'User profile photo',
              }},
            ],
            layout: { type: 'auto' },
          },
        },
      },
    },
  },

  // ── NEW: Item conditionalBorder, conditionalBackgroundColor, cardOptions ──
  {
    id: 'item-conditionals-and-card',
    title: 'Item: conditionalBorder, conditionalBackground, cardOptions',
    description: 'ItemConfig.conditionalBorder adds colored left borders by status. conditionalBackgroundColor highlights active cards. cardOptions applies base card appearance globally.',
    data: sixUsersData as Entity[],
    config: {
      id: 'item-conditionals-and-card',
      zones: {
        header: { title: 'Conditional Item Styling', subtitle: 'conditionalBorder by status · conditionalBackgroundColor · cardOptions base styling' },
        content: {
          mode: 'grid',
          modeConfig: { grid: { maxColumns: 3, gap: '1rem' } },
          item: {
            fields: [
              { key: 'name', label: 'Name' },
              { key: 'status', label: 'Status', renderAs: 'badge' },
              { key: 'role', label: 'Role' },
            ],
            layout: { type: 'auto' },
            conditionalBorder: (entity: Entity) => {
              if (entity.status === 'active')   return { color: '#28a745', thickness: 3, placement: 'left' };
              if (entity.status === 'pending')  return { color: '#ffc107', thickness: 3, placement: 'left' };
              if (entity.status === 'inactive') return { color: '#dc3545', thickness: 3, placement: 'left' };
              return null;
            },
            conditionalBackgroundColor: (entity: Entity) => {
              if (entity.status === 'active') return { backgroundColor: '#f0fff4', color: '#212529' };
              return undefined;
            },
            cardOptions: {
              border: true,
              borderStyle: 'solid',
              borderWidth: '1px',
              borderColor: '#dee2e6',
              borderRadius: '10px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              padding: '1rem',
            },
          },
        },
      },
    },
  },

  // ── NEW: Item Layout: flex ────────────────────────────────────────────────
  {
    id: 'item-layout-flex',
    title: 'Item Layout: type="flex"',
    description: 'ItemConfig.layout.type="flex" with direction, wrap, justify, align. Creates horizontal card rows with aligned content.',
    data: threeUsersData as Entity[],
    config: {
      id: 'item-layout-flex',
      zones: {
        header: { title: 'Flex Item Layout', subtitle: 'layout.type="flex" · direction="row" · align="center"' },
        content: {
          mode: 'grid',
          modeConfig: { grid: { maxColumns: 1 } },
          item: {
            fields: [
              { key: 'src',        label: 'Photo', type: 'image' as const, imageOptions: { circular: true, width: 48, height: 48 } },
              { key: 'name',       label: 'Name',  showLabel: false },
              { key: 'role',       label: 'Role',  renderAs: 'badge' },
              { key: 'status',     label: 'Status', renderAs: 'badge' },
              { key: 'department', label: 'Dept' },
            ],
            layout: {
              type: 'flex',
              flex: {
                direction: 'row',
                wrap: false,
                justify: 'flex-start',
                align: 'center',
              },
            },
          },
        },
      },
    },
  },

  // ── NEW: Item Layout: grid (with columns/gap) + sections ─────────────────
  {
    id: 'item-layout-sections',
    title: 'Item Layout: type="sections" & template',
    description: 'ItemConfig.layout.type="sections" with SectionConfig[]: titled sections grouping fields by key string. Also shows ItemConfig.template (ItemTemplate.sections) as full FieldConfig-based approach.',
    data: threeUsersData as Entity[],
    config: {
      id: 'item-layout-sections',
      zones: {
        header: { title: 'Sectioned Item Layout', subtitle: 'layout.type="sections" · SectionConfig with title + fields keys' },
        content: {
          mode: 'grid',
          modeConfig: { grid: { maxColumns: 1 } },
          item: {
            fields: [
              { key: 'name',       label: 'Name' },
              { key: 'email',      label: 'Email', type: 'email' as const },
              { key: 'role',       label: 'Role',       renderAs: 'badge' },
              { key: 'department', label: 'Department' },
              { key: 'status',     label: 'Status',     renderAs: 'badge' },
              { key: 'progress',   label: 'Performance', renderAs: 'progress' },
            ],
            layout: {
              type: 'sections',
              sections: [
                { title: 'Contact',  fields: ['name', 'email'] },
                { title: 'Role',     fields: ['role', 'department'] },
                { title: 'Metrics', fields: ['status', 'progress'] },
              ],
            },
          },
        },
      },
    },
  },

  // ── NEW: Item Layout: grid (CSS grid with areas) ──────────────────────────
  {
    id: 'item-layout-grid',
    title: 'Item Layout: type="grid" (CSS grid)',
    description: 'ItemConfig.layout.type="grid" with columns, gap, and grid-template-areas for precise field positioning.',
    data: threeUsersData as Entity[],
    config: {
      id: 'item-layout-grid',
      zones: {
        header: { title: 'Grid Item Layout', subtitle: 'layout.type="grid" with columns, gap, and template areas' },
        content: {
          mode: 'grid',
          modeConfig: { grid: { maxColumns: 1 } },
          item: {
            fields: [
              { key: 'src',        label: 'Photo', type: 'image' as const, imageOptions: { circular: true, width: 56, height: 56 } },
              { key: 'name',       label: 'Name', showLabel: false },
              { key: 'email',      label: 'Email', type: 'email' as const, showLabel: false },
              { key: 'role',       label: 'Role', renderAs: 'badge' },
              { key: 'department', label: 'Dept' },
            ],
            layout: {
              type: 'grid',
              grid: {
                columns: '56px 1fr 1fr',
                gap: '0.5rem',
                areas: [
                  '"photo name   role"',
                  '"photo email  dept"',
                ],
              },
            },
          },
        },
      },
    },
  },

  // ── NEW: Grid ModeConfig — all options ───────────────────────────────────
  {
    id: 'grid-modeconfig-full',
    title: 'Grid ModeConfig — all options',
    description: 'ModeConfig.grid: gap, minItemWidth, maxColumns, autoFlow, justifyItems, alignItems. Breakpoints (mobile/tablet/desktop) for responsive column sizing.',
    data: twelveUsersData as Entity[],
    config: {
      id: 'grid-modeconfig-full',
      zones: {
        header: { title: 'Grid Mode Full Config', subtitle: 'gap · minItemWidth · maxColumns · autoFlow · justifyItems · alignItems · breakpoints' },
        content: {
          mode: 'grid',
          modeConfig: {
            grid: {
              gap: '1.5rem',
              minItemWidth: '220px',
              maxColumns: 4,
              autoFlow: 'row' as const,
              justifyItems: 'stretch' as const,
              alignItems: 'start' as const,
              breakpoints: {
                mobile: '480px',
                tablet: '768px',
                desktop: '1200px',
              },
            },
          },
          item: {
            fields: [
              { key: 'name',       label: 'Name' },
              { key: 'role',       label: 'Role',   renderAs: 'badge' },
              { key: 'department', label: 'Dept' },
              { key: 'status',     label: 'Status', renderAs: 'badge' },
            ],
            layout: { type: 'auto' },
          },
        },
      },
    },
  },

  // ── NEW: Carousel ModeConfig — all options ───────────────────────────────
  {
    id: 'carousel-full',
    title: 'Carousel — all ModeConfig options',
    description: 'ModeConfig.carousel: itemWidth, itemHeight, gap, showIndicators, showArrows, infinite, autoPlay, autoPlayInterval, dragThreshold.',
    data: eightUsersData as Entity[],
    config: {
      id: 'carousel-full',
      zones: {
        header: { title: 'Carousel Mode Full Config', subtitle: 'itemWidth · itemHeight · gap · indicators · arrows · infinite · autoPlay · dragThreshold' },
        content: {
          mode: 'carousel',
          modeConfig: {
            carousel: {
              itemWidth: 260,
              itemHeight: 200,
              gap: 16,
              showIndicators: true,
              showArrows: true,
              infinite: true,
              autoPlay: true,
              autoPlayInterval: 3500,
              dragThreshold: 50,
            },
          },
          item: {
            fields: [
              { key: 'src',        label: 'Photo', type: 'image' as const, imageOptions: { objectFit: 'cover' as const, width: '100%', height: 100, borderRadius: '6px 6px 0 0' } },
              { key: 'name',       label: 'Name',  showLabel: false },
              { key: 'role',       label: 'Role',  renderAs: 'badge' },
              { key: 'department', label: 'Dept' },
            ],
            layout: { type: 'auto' },
          },
        },
      },
    },
  },

  // ── NEW: Content loadingState ────────────────────────────────────────────
  {
    id: 'content-loading-state',
    title: 'Content: loadingState',
    description: 'ContentConfig.status="loading" with loadingState: indicator="skeleton", message as function, enabled=true.',
    data: fourUsersData as Entity[],
    config: {
      id: 'content-loading-state',
      zones: {
        header: { title: 'Loading State', subtitle: 'status="loading" · indicator="skeleton" · message fn' },
        content: {
          mode: 'table',
          status: 'loading' as const,
          loadingState: {
            enabled: true,
            indicator: 'skeleton' as const,
            message: () => `Loading records…`,
          },
          item: {
            fields: [
              { key: 'name', label: 'Name' },
              { key: 'role', label: 'Role' },
            ],
            layout: { type: 'auto' },
          },
        },
      },
    },
  },

  // ── NEW: Content errorState ──────────────────────────────────────────────
  {
    id: 'content-error-state',
    title: 'Content: errorState with retry',
    description: 'ContentConfig.status="error" with errorState: message fn, retry button (label + onRetry callback), severity="warning".',
    data: [] as Entity[],
    config: {
      id: 'content-error-state',
      zones: {
        header: { title: 'Error State', subtitle: 'status="error" · errorState message fn · retry · severity="warning"' },
        content: {
          mode: 'table',
          status: 'error' as const,
          error: { message: 'Failed to load data from server' },
          errorState: {
            enabled: true,
            message: (err: unknown) => `Error: ${(err as Error)?.message ?? 'Something went wrong'}`,
            retry: { label: 'Try Again', onRetry: () => alert('Retry triggered!') },
            severity: 'warning' as const,
          },
          item: {
            fields: [{ key: 'name', label: 'Name' }],
            layout: { type: 'auto' },
          },
        },
      },
    },
  },

  // ── NEW: Content groupings (GroupingConfig) ───────────────────────────────
  {
    id: 'content-groupings',
    title: 'ContentConfig.groupings',
    description: 'groupings[]: GroupingConfig with fieldKey, initiallyCollapsed=true, and custom renderer function. Different from legacy groupBy string.',
    data: eightUsersData as Entity[],
    config: {
      id: 'content-groupings',
      zones: {
        header: { title: 'Groupings Config', subtitle: 'groupings[].fieldKey · initiallyCollapsed · custom renderer fn' },
        content: {
          mode: 'table',
          groupings: [
            {
              fieldKey: 'department',
              initiallyCollapsed: true,
              renderer: (groupValue: unknown, count: number, isCollapsed: boolean) =>
                `${groupValue} — ${count} members ${isCollapsed ? '▶' : '▼'}`,
            },
          ],
          item: {
            fields: [
              { key: 'name',   label: 'Name' },
              { key: 'role',   label: 'Role',   renderAs: 'badge' },
              { key: 'status', label: 'Status', renderAs: 'badge' },
            ],
            layout: { type: 'auto' },
          },
        },
      },
    },
  },

  // ── NEW: Content filtering, sorting, virtualization, style, themeOverrides ─
  {
    id: 'content-filtering-sorting',
    title: 'Content: filtering, sorting, style, themeOverrides',
    description: 'ContentConfig.filtering (static operator+value filter), .sorting (initial sort), .style (inline CSS on content zone), .themeOverrides on content.',
    data: twentyUsersData as Entity[],
    config: {
      id: 'content-filtering-sorting',
      zones: {
        header: { title: 'Static Filtering & Sorting', subtitle: 'filtering: status=active · sorting: name asc · content.style · content.themeOverrides' },
        content: {
          mode: 'table',
          filtering: [
            { fieldKey: 'status', operator: 'eq', value: 'active' },
          ],
          sorting: [
            { fieldKey: 'name', direction: 'asc' as const },
          ],
          style: { border: '2px solid #0d6efd', borderRadius: '6px' },
          themeOverrides: {
            backgroundColor: '#f0f8ff',
          },
          item: {
            fields: [
              { key: 'name',       label: 'Name' },
              { key: 'role',       label: 'Role' },
              { key: 'status',     label: 'Status',     renderAs: 'badge' },
              { key: 'department', label: 'Department' },
            ],
            layout: { type: 'auto' },
          },
        },
      },
    },
  },

  // ── NEW: Search — advanced options ───────────────────────────────────────
  {
    id: 'search-advanced',
    title: 'Search — fields, debounceMs, onSearch',
    description: 'content.search: fields restricts search to name+role only (ignores department). debounceMs=500. onSearch callback logs each query. search.enabled explicitly set.',
    data: twentyUsersData as Entity[],
    config: {
      id: 'search-advanced',
      zones: {
        header: { title: 'Advanced Search Config', subtitle: 'search.fields · debounceMs=500 · onSearch callback (check console)' },
        content: {
          mode: 'grid',
          search: {
            enabled: true,
            placeholder: 'Search by name or role only…',
            fields: ['name', 'role'],
            debounceMs: 500,
            onSearch: (query: string) => console.log('[onSearch]', query),
          },
          item: {
            fields: [
              { key: 'name',       label: 'Name' },
              { key: 'role',       label: 'Role',       renderAs: 'badge' },
              { key: 'department', label: 'Department' },
              { key: 'status',     label: 'Status',     renderAs: 'badge' },
            ],
            layout: { type: 'auto' },
          },
        },
      },
    },
  },

  // ── NEW: Board advanced (actions, actionsPosition, hooks, swimlane labels) ─
  {
    id: 'board-advanced',
    title: 'Board — card actions, hooks, swimlane labels',
    description: 'BoardModeConfig: card actions array, actionsPosition="hover", hooks.onDragStart/onDrop (console logs), swimlanes.labels+defaultLabel, BoardColumnConfig.value (explicit match value differs from id).',
    data: twentyUsersData as Entity[],
    config: {
      id: 'board-advanced',
      zones: {
        header: { title: 'Advanced Board Config', subtitle: 'card actions · actionsPosition=hover · hooks · swimlane labels+defaultLabel · column.value' },
        content: {
          mode: 'board',
          modeConfig: {
            board: {
              columnField: 'status',
              columns: [
                { id: 'col-active',   label: '▶ Active',      value: 'active',   color: '#28a745' },
                { id: 'col-pending',  label: '⏳ In Progress', value: 'pending',  color: '#fd7e14' },
                { id: 'col-inactive', label: '✓ Done',         value: 'inactive', color: '#6c757d' },
              ],
              swimlanes: {
                field: 'department',
                order: ['Engineering', 'Design', 'Business'],
                labels: {
                  Engineering: 'R&D Engineering',
                  Design:      'Product Design',
                  Business:    'Business Dev',
                },
                defaultLabel: 'Other Teams',
              },
              dragEnabled: true,
              actionsPosition: 'hover' as const,
              actions: {
                card: [
                  {
                    id: 'card-view',
                    label: 'View',
                    icon: 'view',
                    placement: 'always' as const,
                    onClick: (entity: Entity) => alert(`Viewing: ${entity.name as string}`),
                  },
                  {
                    id: 'card-edit',
                    label: 'Edit',
                    icon: 'edit',
                    placement: 'menu' as const,
                    onClick: (entity: Entity) => alert(`Editing: ${entity.name as string}`),
                  },
                ],
              },
              hooks: {
                onDragStart: (item: Entity, fromColumn: string) => console.log('[onDragStart]', item.name, 'from', fromColumn),
                onDrop: (item: Entity, fromColumn: string, toColumn: string) => console.log('[onDrop]', item.name, `${fromColumn} → ${toColumn}`),
              },
              item: {
                fields: [
                  { key: 'name', label: 'Name', type: 'text' as const },
                  { key: 'role', label: 'Role', renderAs: 'badge' },
                ],
                layout: { type: 'auto' as const },
              },
            },
          },
        },
      },
    },
  },

  // ── NEW: DevMode — full DevModeConfig object ──────────────────────────────
  {
    id: 'devmode-full',
    title: 'DevMode — full DevModeConfig object',
    description: 'devMode as DevModeConfig: enabled, zone (places icon in "footer"), overlay.showHeader, showDocsLink, showBranding, excludeFields. Only visible in development environment.',
    data: threeUsersData as Entity[],
    config: {
      id: 'devmode-full',
      devMode: {
        enabled: true,
        zone: 'footer' as const,
        overlay: {
          showHeader: true,
          showDocsLink: 'https://docs.widgemo.com',
          showBranding: true,
          excludeFields: ['zones.content.data'],
        },
      },
      zones: {
        header: { title: 'DevMode Full Config', subtitle: 'DevModeConfig object · zone="footer" · overlay options' },
        content: {
          mode: 'table',
          item: {
            fields: [
              { key: 'name',   label: 'Name' },
              { key: 'role',   label: 'Role' },
              { key: 'status', label: 'Status', renderAs: 'badge' },
            ],
            layout: { type: 'auto' },
          },
        },
        footer: {
          subtitle: 'The DevMode icon appears here (only in dev environment)',
        },
      },
    },
  },
];
export default widgemoExamples;
