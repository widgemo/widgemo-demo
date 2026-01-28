// This file contains pre-defined examples for widgemo components.
// Configs and data are extracted to module-level constants for performance optimization.
// These objects are not recreated on each render, ensuring stable references and preventing unnecessary re-renders.
// Memoization is achieved through static exports, allowing React to optimize component updates.

import type { ActionContext, Entity, SimplifiedWidgemoConfig, ColumnConfig, BoardColumnConfig } from 'widgemo-core';
import { FaPlus, FaEdit, FaSync, FaDownload, FaWifi } from 'react-icons/fa';
import { FaUserSlash } from 'react-icons/fa6';
import { currencyDecimalSampleData, currencyCompactSampleData, currencyEdgeCasesSampleData, currencyExamplesSampleData, currencyInternationalSampleData, currencyPositioningSampleData, currencyPrecisionSampleData, teaserSampleData, actionLinksSampleData, actionOptionsSampleData, currencyDynamicSampleData, linkTestData, kanbanSampleData, swatchesSampleData, ratingsSampleData, progressSampleData, progressVariantsSampleData, progressExampleSampleData, badgeSampleData } from './sampleData';

interface TaskEntity {
  id: number;
  name: string;
  progress: number;
  priority: 'low' | 'medium' | 'high' | 'critical';
  size: 'small' | 'medium' | 'large';
}

interface LinkDemoEntity {
  id: number;
  name: string;
  url: string;
  displayText: string;
  category: 'internal' | 'external';
}

interface ActionLinkEntity {
  id: number;
  name: string;
  action: string;
  target: string;
  url: string;
  text: string;
}

interface CurrencyDemoEntity {
  id: number;
  name: string;
  price: number;
  currency: string;
  locale: string;
  country?: string;
  amount?: number;
  description?: string;
  position?: string;
  minFrac?: number;
  maxFrac?: number;
  threshold?: number;
  category?: string;
  product?: string;
  region?: string;
  discount?: number;
  value?: number;
}

interface SampleData {
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

// Memoized to prevent recreation on renders, improving performance by avoiding unnecessary computations.
export const twelveUsersData = teaserSampleData.slice(0, 12);

// Moved outside to prevent recreation on every render, ensuring stable props for better performance.
export const collapsibleHeaderConfig: SimplifiedWidgemoConfig = {
  devMode: true,
  zones: {
    header: {
      enabled: true,
      collapse: { initialState: 'expanded', button: true },
      icon: { src: 'database', size: 24, color: '#c4530d' },
      title: 'User Database',
      subtitle: (data) => `Manage your ${data.length} team member(s)`,
      actions: [
        {
          id: 'add-user',
          label: 'Add User',
          icon: 'add',
          variant: 'primary',
          onTrigger: () => alert('Add User clicked!')
        },
        {
          id: 'refresh',
          label: 'Refresh',
          icon: 'refresh',
          onTrigger: () => alert('Refresh clicked!'),
          iconOnly: true,
          placement: 'discoverable'
        },
        {
          id: 'export',
          label: 'Export Data',
          icon: 'download',
          onTrigger: () => alert('Export clicked!'),
          iconOnly: true,
          placement: 'discoverable'
        }
      ]
    },
    content: {
      // enabled: true,
      title: 'Data:'
    },
    footer: {
      // enabled: true,
      title: '* Data last updated',
      subtitle: '5 minutes ago'
    }
  }
};

// Moved outside to prevent recreation on every render, ensuring stable props for better performance.
export const fixedHeaderConfig: SimplifiedWidgemoConfig = {
  devMode: true,
  zones: {
    header: {
      enabled: true,
      collapse: { initialState: 'fixed' },
      icon: { src: 'users', size: 24, color: '#15abf0' },
      title: 'Team Overview',
      subtitle: 'Quick stats and actions'
    },
    content: { enabled: true },
    footer: {
      enabled: true,
      className: 'custom-footer-class',
      title: (data) => `Team Members (${data.length} users)`,
      subtitle: '- "Manage your team efficiently"',
      actions: [
        {
          id: 'export-data',
          label: 'Export Data',
          icon: 'export',
          variant: 'primary',
          onTrigger: () => alert('Export Data clicked!')
        },
        {
          id: 'refresh',
          label: 'Refresh',
          icon: 'refresh',
          onTrigger: () => alert('Refresh clicked!'),
          iconOnly: true,
          placement: 'discoverable'
        }
      ]
    }
  }
};

// Moved outside to prevent recreation on every render, ensuring stable props for better performance.
export const reactElementTitleConfig: SimplifiedWidgemoConfig = {
  devMode: true,
  zones: {
    header: {
      enabled: true,
      icon: { src: 'html5', size: 24, color: '#ff0000' },
      title: (
        <span>
          Welcome to <a href="#" style={{ color: '#007bff', textDecoration: 'none' }}>Widgemo</a> -
          <strong style={{ color: '#28a745' }}>Enhanced</strong> Experience
        </span>
      ),
      subtitle: (
        <div>
          <em>Click here</em> for <a href="#" style={{ color: '#dc3545' }}>help</a> or
          <button
            onClick={() => alert('Get Started clicked!')}
            style={{
              background: '#007bff',
              color: 'white',
              border: 'none',
              padding: '4px 8px',
              borderRadius: '4px',
              cursor: 'pointer',
              marginLeft: '4px'
            }}
          >
            Get Started
          </button>
        </div>
      ),
      actions: [
        {
          id: 'add-user',
          label: 'Add User',
          icon: 'add',
          variant: 'primary',
          onTrigger: () => alert('Add User clicked!')
        },
        {
          id: 'refresh',
          label: 'Refresh',
          icon: 'refresh',
          onTrigger: () => alert('Refresh clicked!'),
          iconOnly: true,
          placement: 'discoverable'
        },
        {
          id: 'export',
          label: 'Export Data',
          icon: 'export',
          onTrigger: () => alert('Export clicked!'),
          iconOnly: true,
          placement: 'discoverable'
        }
      ]
    },
    content: {
      enabled: true
    },
    footer: { enabled: false }
  }
};

// Moved outside to prevent recreation on every render, ensuring stable props for better performance.
export const actionsSystemTestConfig: SimplifiedWidgemoConfig = {
  devMode: true,
  zones: {
    header: {
      enabled: true,
      collapse: { initialState: 'collapsed', button: true },
      icon: { src: 'teamspeak', size: 24, color: '#b977d5' },
      title: 'Actions Demo',
      subtitle: 'Variants, Placements, and Menu',
      actions: [
        {
          id: 'add',
          label: 'Add Item',
          icon: 'add',
          variant: 'primary',
          onTrigger: () => alert('Add Item clicked!')
        },
        {
          id: 'refresh',
          label: 'Refresh',
          icon: 'refresh',
          variant: 'secondary',
          onTrigger: () => alert('Refresh clicked!')
        },
        {
          id: 'export',
          label: 'Export',
          icon: 'export',
          onTrigger: () => alert('Export clicked!'),
          iconOnly: true
        },
        {
          id: 'settings',
          label: 'Settings',
          icon: 'settings',
          variant: 'danger',
          onTrigger: () => alert('Settings clicked!'),
          placement: 'discoverable'
        },
        {
          id: 'all',
          label: 'View All',
          icon: 'eye',
          variant: 'success',
          onTrigger: () => alert('View All clicked!'),
          placement: 'menu'
        },
        {
          id: 'chart',
          label: 'Chart Mode',
          icon: 'chart-pie',
          variant: 'success',
          onTrigger: () => alert('Chart Mode clicked!'),
          iconOnly: true
        },
        {
          id: 'bar',
          label: 'Bar Chart Mode',
          icon: 'chart-bar',
          variant: 'primary',
          onTrigger: () => alert('Chart Mode clicked!'),
          placement: 'menu'
        }
      ]
    },
    content: { enabled: true },
    footer: { enabled: false }
  }
};

// Moved outside to prevent recreation on every render, ensuring stable props for better performance.
export const compactLayoutConfig: SimplifiedWidgemoConfig = {
  zones: {
    header: {
      enabled: true,
      layout: { preset: 'compact' },
      icon: { src: 'square', size: 20, color: '#d9b711' },
      title: 'Compact Layout Demo',
      subtitle: 'Smaller header elements',
      actions: [
        {
          id: 'add',
          label: 'Add Item',
          icon: 'add',
          variant: 'primary',
          onTrigger: () => alert('Add Item clicked!')
        },
        {
          id: 'refresh',
          label: 'Refresh',
          icon: 'refresh',
          variant: 'ghost',
          onTrigger: () => alert('Refresh clicked!'),
          iconOnly: true,
          placement: 'discoverable'
        },
        {
          id: 'delete',
          label: 'Delete All',
          icon: 'trash',
          onTrigger: () => alert('Delete clicked!'),
          placement: 'menu'
        }
      ]
    },
    content: {
      enabled: true
    },
    footer: { enabled: false }
  }
};

// Moved outside to prevent recreation on every render, ensuring stable props for better performance.
export const minimalLayoutConfig: SimplifiedWidgemoConfig = {
  zones: {
    header: {
      enabled: true,
      layout: { preset: 'minimal' },
      icon: { src: 'clock', size: 20, color: '#11a661' },
      title: 'Minimal Layout Demo',
      subtitle: 'Title and collapse only',
      actions: [
        {
          id: 'add',
          label: 'Add Item',
          icon: 'add',
          variant: 'primary',
          onTrigger: () => alert('Add Item clicked!')
        },
        {
          id: 'refresh',
          label: 'Refresh',
          icon: 'refresh',
          variant: 'ghost',
          onTrigger: () => alert('Refresh clicked!'),
          iconOnly: true,
          placement: 'discoverable'
        }
      ]
    },
    content: {
      enabled: true
    },
    footer: { enabled: false }
  }
};

// Moved outside to prevent recreation on every render, ensuring stable props for better performance.
export const centeredLayoutConfig: SimplifiedWidgemoConfig = {
  zones: {
    header: {
      enabled: true,
      layout: { preset: 'centered' },
      icon: { src: 'centercode', size: 20, color: '#a41540' },
      title: 'Centered Layout Demo',
      subtitle: 'Actions loaded as a centered layout on the foot zone'
    },
    content: {
      enabled: true
    },
    footer: {
      enabled: true, layout: { preset: 'centered' }, actions: [
        {
          id: 'add',
          label: 'Add Item',
          icon: 'add',
          variant: 'primary',
          onTrigger: () => alert('Add Item clicked!')
        },
        {
          id: 'refresh',
          label: 'Refresh',
          icon: 'refresh',
          variant: 'secondary',
          onTrigger: () => alert('Refresh clicked!')
        },
        {
          id: 'export',
          label: 'Export',
          icon: 'export',
          variant: 'secondary',
          onTrigger: () => alert('Export clicked!')
        },
        {
          id: 'share',
          label: 'Share',
          icon: 'share',
          variant: 'secondary',
          onTrigger: () => alert('Share clicked!')
        }
      ]
    }
  }
};

// Moved outside to prevent recreation on every render, ensuring stable props for better performance.
export const customLayoutConfig: SimplifiedWidgemoConfig = {
  zones: {
    header: {
      enabled: true,
      layout: {
        custom: {
          order: ['title', 'icon', 'collapse', { type: 'spacer' }, 'subtitle', 'actions'],
          align: 'space-between',
          gap: '1rem'
        }
      },
      icon: { src: 'puzzle-piece', size: 24, color: '#019b93' },
      title: 'Custom Layout Demo',
      subtitle: 'Using layout.custom for flexible arrangements',
      actions: [
        {
          id: 'add',
          label: 'Add Item',
          icon: 'add',
          variant: 'primary',
          onTrigger: () => alert('Add Item clicked!')
        },
        {
          id: 'refresh',
          label: 'Refresh',
          icon: 'refresh',
          variant: 'secondary',
          onTrigger: () => alert('Refresh clicked!')
        }
      ]
    },
    content: {
      enabled: true
    },
    footer: { enabled: false }
  }
};

// Moved outside to prevent recreation on every render, ensuring stable props for better performance.
export const customLayoutWithCustomElementConfig: SimplifiedWidgemoConfig = {
  zones: {
    header: {
      enabled: true,
      layout: {
        custom: {
          order: ['title', { type: 'custom', content: <span style={{ backgroundColor: '#ff4444', color: 'white', padding: '2px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}>LIVE</span> }, { type: 'spacer' }, 'actions'],
          align: 'space-between',
          gap: '1rem'
        }
      },
      title: 'Live Dashboard',
      subtitle: 'Real-time data with custom status indicator',
      actions: [
        {
          id: 'add',
          label: 'Add Item',
          icon: 'add',
          variant: 'primary',
          onTrigger: () => alert('Add Item clicked!')
        },
        {
          id: 'refresh',
          label: 'Refresh',
          icon: 'refresh',
          variant: 'secondary',
          onTrigger: () => alert('Refresh clicked!')
        }
      ]
    },
    content: {
      enabled: true
    },
    footer: { enabled: false }
  }
};

// Moved outside to prevent recreation on every render, ensuring stable props for better performance.
export const customLayoutVerticalConfig: SimplifiedWidgemoConfig = {
  zones: {
    header: {
      enabled: true,
      layout: {
        custom: {
          order: ['icon', 'title', 'subtitle', 'actions'],
          direction: 'vertical',
          align: 'center',
          gap: '0.5rem'
        }
      },
      icon: { src: 'chart-line', size: 24, color: '#28a745' },
      title: 'Analytics Dashboard',
      subtitle: 'Vertical layout with centered alignment',
      actions: [
        {
          id: 'add',
          label: 'Add Metric',
          icon: 'add',
          variant: 'primary',
          onTrigger: () => alert('Add Metric clicked!')
        },
        {
          id: 'refresh',
          label: 'Refresh Data',
          icon: 'refresh',
          variant: 'secondary',
          onTrigger: () => alert('Refresh Data clicked!')
        },
        {
          id: 'export',
          label: 'Export Report',
          icon: 'export',
          variant: 'secondary',
          onTrigger: () => alert('Export Report clicked!')
        }
      ]
    },
    content: {
      enabled: true
    },
    footer: { enabled: false }
  }
};

// Moved outside to prevent recreation on every render, ensuring stable props for better performance.
export const customLayoutWithGroupsConfig: SimplifiedWidgemoConfig = {
  zones: {
    header: {
      enabled: true,
      layout: {
        custom: {
          order: [
            { type: 'group', elements: ['icon', 'title'], direction: 'horizontal' },
            'subtitle',
            {
              type: 'custom', content: (
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <button className="btn btn-primary btn-sm" onClick={() => alert('Add Item clicked!')}>
                    <FaPlus style={{ marginRight: '0.25rem' }} /> Add Item
                  </button>
                  <button className="btn btn-secondary btn-sm" onClick={() => alert('Edit clicked!')}>
                    <FaEdit style={{ marginRight: '0.25rem' }} /> Edit
                  </button>
                </div>
              )
            },
            {
              type: 'custom', content: (
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <button className="btn btn-ghost btn-sm" onClick={() => alert('Refresh clicked!')}>
                    <FaSync style={{ marginRight: '0.25rem' }} /> Refresh
                  </button>
                  <button className="btn btn-success btn-sm" onClick={() => alert('Export clicked!')}>
                    <FaDownload style={{ marginRight: '0.25rem' }} /> Export
                  </button>
                </div>
              )
            }
          ],
          direction: 'vertical',
          align: 'center',
          gap: '0.5rem'
        }
      },
      icon: { src: 'table', size: 24, color: '#6f42c1' },
      title: 'Grouped Layout Demo',
      subtitle: 'Icon and title grouped together, actions in separate rows'
    },
    content: {
      enabled: true
    },
    footer: { enabled: false }
  }
};

// Moved outside to prevent recreation on every render, ensuring stable props for better performance.
export const headlessWidgemoConfig: SimplifiedWidgemoConfig = {
  devMode: true,
  zones: {
    header: {
      enabled: false  // This makes it headless
    },
    content: {
      enabled: true,
      mode: 'grid'
    },
    footer: {
      enabled: true,
      title: 'Actions (Footer)',
      subtitle: 'Since header is disabled, actions are placed here',
      actions: [
        {
          id: 'add-item',
          label: 'Add Item',
          icon: 'add',
          variant: 'primary',
          onTrigger: (context) => {
            console.log(`🆔 Add Item clicked on headless widgemo: ${context.widgemoId}`);
            console.log(`📍 Placement: ${context.placement}`);
            alert(`Add Item clicked!\nWidgemo ID: ${context.widgemoId}\nPlacement: ${context.placement}`);
          }
        },
        {
          id: 'bulk-edit',
          label: 'Bulk Edit',
          icon: 'edit',
          variant: 'secondary',
          onTrigger: (context) => {
            console.log(`🆔 Bulk Edit clicked on headless widgemo: ${context.widgemoId}`);
            console.log(`📍 Placement: ${context.placement}`);
            alert(`Bulk Edit clicked!\nWidgemo ID: ${context.widgemoId}\nPlacement: ${context.placement}`);
          }
        },
        {
          id: 'export-data',
          label: 'Export Data',
          icon: 'export',
          variant: 'success',
          onTrigger: (context) => {
            console.log(`🆔 Export Data clicked on headless widgemo: ${context.widgemoId}`);
            console.log(`📍 Placement: ${context.placement}`);
            alert(`Export Data clicked!\nWidgemo ID: ${context.widgemoId}\nPlacement: ${context.placement}`);
          }
        }
      ]
    }
  }
};

// Moved outside to prevent recreation on every render, ensuring stable props for better performance.
export const headlessFooterlessWidgemoConfig: SimplifiedWidgemoConfig = {
  devMode: true,
  zones: {
    header: {
      enabled: false  // This makes it headless
    },
    content: {
      enabled: true,
      mode: 'grid'
    },
    footer: {
      enabled: false,
      title: 'Actions (Footer)',
      subtitle: 'Since header is disabled, actions are placed here',
      actions: [
        {
          id: 'add-item',
          label: 'Add Item',
          icon: 'add',
          variant: 'primary',
          onTrigger: (context) => {
            console.log(`🆔 Add Item clicked on headless widgemo: ${context.widgemoId}`);
            console.log(`📍 Placement: ${context.placement}`);
            alert(`Add Item clicked!\nWidgemo ID: ${context.widgemoId}\nPlacement: ${context.placement}`);
          }
        },
        {
          id: 'bulk-edit',
          label: 'Bulk Edit',
          icon: 'edit',
          variant: 'secondary',
          onTrigger: (context) => {
            console.log(`🆔 Bulk Edit clicked on headless widgemo: ${context.widgemoId}`);
            console.log(`📍 Placement: ${context.placement}`);
            alert(`Bulk Edit clicked!\nWidgemo ID: ${context.widgemoId}\nPlacement: ${context.placement}`);
          }
        },
        {
          id: 'export-data',
          label: 'Export Data',
          icon: 'export',
          variant: 'success',
          onTrigger: (context) => {
            console.log(`🆔 Export Data clicked on headless widgemo: ${context.widgemoId}`);
            console.log(`📍 Placement: ${context.placement}`);
            alert(`Export Data clicked!\nWidgemo ID: ${context.widgemoId}\nPlacement: ${context.placement}`);
          }
        }
      ]
    }
  }
};

// Moved outside to prevent recreation on every render, ensuring stable props for better performance.
export const instanceIdDemoConfig: SimplifiedWidgemoConfig = {
  zones: {
    header: {
      enabled: true,
      title: 'Instance ID Demo',
      subtitle: 'Actions log widgemoId to console',
      actions: [
        {
          id: 'add',
          label: 'Add Item',
          icon: 'add',
          variant: 'primary',
          onTrigger: (context) => {
            console.log(`🆔 Add Item clicked on widgemo instance: ${context.widgemoId}`);
            console.log(`📍 Placement: ${context.placement}`);
            if (context.record) {
              console.log(`👤 Item ID: ${context.record.id}`);
            }
            alert(`Add Item clicked!\nWidgemo ID: ${context.widgemoId}\nPlacement: ${context.placement}`);
          }
        },
        {
          id: 'edit',
          label: 'Edit',
          icon: 'edit',
          variant: 'secondary',
          onTrigger: (context) => {
            console.log(`🆔 Edit clicked on widgemo instance: ${context.widgemoId}`);
            console.log(`📍 Placement: ${context.placement}`);
            if (context.record) {
              console.log(`👤 Item ID: ${context.record.id}`);
            }
            alert(`Edit clicked!\nWidgemo ID: ${context.widgemoId}\nPlacement: ${context.placement}`);
          }
        },
        {
          id: 'delete',
          label: 'Delete',
          icon: 'delete',
          variant: 'danger',
          onTrigger: (context) => {
            console.log(`🆔 Delete clicked on widgemo instance: ${context.widgemoId}`);
            console.log(`📍 Placement: ${context.placement}`);
            if (context.record) {
              console.log(`👤 Item ID: ${context.record.id}`);
            }
            alert(`Delete clicked!\nWidgemo ID: ${context.widgemoId}\nPlacement: ${context.placement}`);
          }
        }
      ]
    },
    content: {
      enabled: true
    },
    footer: { enabled: false }
  }
};

// Moved outside to prevent recreation on every render, ensuring stable props for better performance.
export const gridModeWithItemRendererConfig: SimplifiedWidgemoConfig = {
  zones: {
    header: {
      enabled: true,
      title: 'Grid Mode with Item Templates',
      subtitle: 'ItemRenderer with custom field organization',
      actions: [
        {
          id: 'share',
          label: 'Share',
          icon: 'share',
          variant: 'primary',
          onTrigger: () => alert('Share clicked!')
        }
      ]
    },
    content: {
      enabled: true,
      mode: 'grid',
      columns: 3, // 3 columns for the grid
      item: {
        style: 'card',
        template: {
          sections: [
            {
              title: 'Profile',
              fields: [
                { key: 'name', label: 'Name' },
                { key: 'role', label: 'Role' }
              ]
            },
            {
              title: 'Contact',
              fields: [
                { key: 'email', label: 'Email' },
                { key: 'department', label: 'Department' }
              ]
            }
          ]
        }
      },
      itemConfig: {
        conditionalBorder: (entity: Entity) => {
          const role = (entity as unknown as SampleData).role as string;
          switch (role) {
            case 'Manager':
              return { color: '#007bff', thickness: 3, placement: 'all' };
            case 'Developer':
              return { color: '#28a745', thickness: 4 };
            case 'Analyst':
              return { color: '#dc3545', thickness: 6, placement: 'top' };
            default:
              return undefined;
          }
        }
      }
    },
    footer: { enabled: false }
  }
};

// Moved outside to prevent recreation on every render, ensuring stable props for better performance.
export const tableAlternatingConfig: SimplifiedWidgemoConfig = {
  zones: {
    header: {
      enabled: true,
      title: 'Table Mode Demo',
      subtitle: 'Default Header Layout with Actions - Alternating Row Backgrounds & Separators Enabled',
      actions: [
        {
          id: 'add',
          label: 'Add Item',
          icon: 'add',
          variant: 'primary',
          onTrigger: () => alert('Add Item clicked!')
        },
        {
          id: 'refresh',
          label: 'Refresh',
          icon: 'refresh',
          variant: 'ghost',
          onTrigger: () => alert('Refresh clicked!'),
          iconOnly: true,
          placement: 'discoverable'
        },
        {
          id: 'export',
          label: 'Export',
          icon: 'export',
          onTrigger: () => alert('Export clicked!'),
          iconOnly: false,
          placement: 'menu'
        },
        {
          id: 'settings',
          label: 'Settings',
          icon: 'settings',
          variant: 'danger',
          onTrigger: () => alert('Settings clicked!'),
          placement: 'discoverable'
        },
        {
          id: 'all',
          label: 'View All',
          icon: 'eye',
          variant: 'success',
          onTrigger: () => alert('View All clicked!'),
          placement: 'menu'
        },
        {
          id: 'chart',
          label: 'Chart Mode',
          icon: 'chart-pie',
          variant: 'primary',
          onTrigger: () => alert('Chart Mode clicked!'),
          iconOnly: false,
          placement: 'discoverable'
        },
        {
          id: 'bar',
          label: 'Bar Chart Mode',
          icon: 'chart-bar',
          variant: 'primary',
          onTrigger: () => alert('Chart Mode clicked!'),
          placement: 'menu'
        }
      ]
    },
    content: {
      enabled: true,
      mode: 'table',
      columns: [
        { field: 'name', header: 'Full Name', sortable: true, width: '200px', type: 'text' },
        { field: 'email', header: 'Email Address', sortable: true, width: '250px', type: 'email' },
        { field: 'role', header: 'Role', sortable: true, align: 'center', type: 'text' },
        { field: 'department', header: 'Department', sortable: true, type: 'text' },
        { field: 'status', header: 'Active', sortable: true, align: 'center', type: 'boolean', booleanTrueLabel: <><FaWifi style={{ marginRight: '4px' }} /> Active</>, booleanFalseLabel: <><FaUserSlash style={{ marginRight: '4px' }} /> Inactive</> },
        { field: 'lastLogin', header: 'Last Login', sortable: true, type: 'date' }
      ] as ColumnConfig[],
      table: {
        sort: { field: 'lastLogin', direction: 'desc' },
        pagination: { page: 1, pageSize: 5 },
        actionsColumn: true,
        alternatingRows: true,
        rowSeparator: false,
        hooks: {
          onSort: (field: string, direction: 'asc' | 'desc') => console.log(`Sort by ${field} ${direction}`)
        }
      },
      itemConfig: {
        actions: {
          item: [
            {
              id: 'edit',
              label: 'Edit',
              icon: 'edit',
              variant: 'ghost',
              placement: 'always',
              iconOnly: true,
              handler: (context: ActionContext) => alert(`Edit ${context.entity?.name}`)
            },
            {
              id: 'view',
              label: 'View Details',
              icon: 'eye',
              variant: 'secondary',
              placement: 'discoverable',
              handler: (context: ActionContext) => alert(`View ${context.entity?.name}`)
            },
            {
              id: 'delete',
              label: 'Delete',
              icon: 'delete',
              variant: 'danger',
              placement: 'menu',
              handler: (context: ActionContext) => alert(`Delete ${context.entity?.name}`)
            },
            {
              id: 'share',
              label: 'Share',
              icon: 'share',
              variant: 'primary',
              placement: 'menu',
              handler: (context: ActionContext) => alert(`Share ${context.entity?.name}`)
            }
          ]
        }
      }
    },
    footer: {
      enabled: true,
      subtitle: (_data, id) => `widgemo.id: ${JSON.stringify(id)}`
    }
  }
};

// Moved outside to prevent recreation on every render, ensuring stable props for better performance.
export const tableRowDividersConfig: SimplifiedWidgemoConfig = {
  zones: {
    header: {
      enabled: true,
      title: 'User Management',
      subtitle: 'Sortable table with actions - Alternating Row Backgrounds & Separators Disabled',
      actions: [
        {
          id: 'add',
          label: 'Add Item',
          icon: 'add',
          variant: 'primary',
          onTrigger: () => alert('Add Item clicked!')
        },
        {
          id: 'refresh',
          label: 'Refresh',
          icon: 'refresh',
          variant: 'ghost',
          onTrigger: () => alert('Refresh clicked!'),
          iconOnly: true,
          placement: 'discoverable'
        },
        {
          id: 'export',
          label: 'Export',
          icon: 'export',
          onTrigger: () => alert('Export clicked!'),
          iconOnly: false,
          placement: 'menu'
        },
        {
          id: 'settings',
          label: 'Settings',
          icon: 'settings',
          variant: 'danger',
          onTrigger: () => alert('Settings clicked!'),
          placement: 'discoverable'
        },
        {
          id: 'all',
          label: 'View All',
          icon: 'eye',
          variant: 'success',
          onTrigger: () => alert('View All clicked!'),
          placement: 'menu'
        },
        {
          id: 'chart',
          label: 'Chart Mode',
          icon: 'chart-pie',
          variant: 'primary',
          onTrigger: () => alert('Chart Mode clicked!'),
          iconOnly: false,
          placement: 'discoverable'
        },
        {
          id: 'bar',
          label: 'Bar Chart Mode',
          icon: 'chart-bar',
          variant: 'primary',
          onTrigger: () => alert('Chart Mode clicked!'),
          placement: 'menu'
        }
      ]
    },
    content: {
      enabled: true,
      mode: 'table',
      columns: [
        { field: 'name', header: 'Name', sortable: true },
        { field: 'email', header: 'Email', sortable: true },
        { field: 'role', header: 'Role', align: 'center' },
        { field: 'status', header: 'Status', align: 'center' }
      ],
      table: {
        actionsColumn: true,
        alternatingRows: false,
        rowSeparator: true
      },
      itemConfig: {
        actions: {
          item: [
            {
              id: 'view',
              label: 'View',
              icon: 'view',
              variant: 'ghost',
              placement: 'always',
              handler: (context: ActionContext) => alert(`View ${context.entity?.name}`)
            },
            {
              id: 'edit',
              label: 'Edit',
              icon: 'edit',
              variant: 'primary',
              placement: 'always',
              iconOnly: true,
              handler: (context: ActionContext) => alert(`Edit ${context.entity?.name}`)
            },
            {
              id: 'delete',
              label: 'Delete',
              icon: 'trash',
              variant: 'danger',
              placement: 'menu',
              handler: (context: ActionContext) => alert(`Delete ${context.entity?.name}`)
            }
          ]
        }
      }
    },
    footer: {
      enabled: true,
      subtitle: (_data, id) => `widgemo.id: ${JSON.stringify(id)}`
    }
  }
};

// Moved outside to prevent recreation on every render, ensuring stable props for better performance.
export const tableGroupableColumnsConfig: SimplifiedWidgemoConfig = {
  zones: {
    header: {
      enabled: true,
      title: 'Table Mode - Groupable Columns',
      subtitle: 'Hover over groupable columns to see grouping options',
      actions: [
        {
          id: 'add',
          label: 'Add Item',
          icon: 'add',
          variant: 'primary',
          onTrigger: () => alert('Add Item clicked!')
        }
      ]
    },
    content: {
      enabled: true,
      mode: 'table',
      columns: [
        { field: 'name', header: 'Full Name', sortable: true, groupable: true, width: '200px', type: 'text' },
        { field: 'email', header: 'Email Address', sortable: true, groupable: true, width: '250px', type: 'email' },
        { field: 'role', header: 'Role', sortable: true, groupable: true, align: 'center', type: 'text' },
        { field: 'department', header: 'Department', sortable: true, type: 'text' },
        { field: 'status', header: 'Active', sortable: true, align: 'center', type: 'boolean', booleanTrueLabel: <><FaWifi style={{ marginRight: '4px' }} /> Active</>, booleanFalseLabel: <><FaUserSlash style={{ marginRight: '4px' }} /> Inactive</> },
        { field: 'lastLogin', header: 'Last Login', sortable: true, type: 'date' }
      ] as ColumnConfig[],
      table: {
        sort: { field: 'lastLogin', direction: 'desc' },
        pagination: { page: 1, pageSize: 10 },
        actionsColumn: true,
        alternatingRows: true,
        rowSeparator: true,
        hooks: {
          onSort: (field: string, direction: 'asc' | 'desc') => console.log(`Sort by ${field} ${direction}`),
          onGroup: (field: string | null) => console.log(`Group by ${field || 'none'}`)
        }
      },
      itemConfig: {
        actions: {
          item: [
            {
              id: 'edit',
              label: 'Edit',
              icon: 'edit',
              variant: 'ghost',
              placement: 'always',
              iconOnly: true,
              handler: (context: ActionContext) => alert(`Edit ${context.entity?.name}`)
            },
            {
              id: 'delete',
              label: 'Delete',
              icon: 'trash',
              variant: 'danger',
              placement: 'menu',
              handler: (context: ActionContext) => alert(`Delete ${context.entity?.name}`)
            }
          ]
        }
      }
    },
    footer: {
      enabled: true,
      subtitle: (_data, id) => `widgemo.id: ${JSON.stringify(id)}`
    }
  }
};

// Moved outside to prevent recreation on every render, ensuring stable props for better performance.
export const tablePlainConfig: SimplifiedWidgemoConfig = {
  zones: {
    header: {
      enabled: true,
      title: 'Table Mode - Plain',
      subtitle: 'Basic table mode with default styling and actions.'
    },
    content: {
      enabled: true,
      mode: 'table',
      columns: [
        { field: 'name', header: 'Name', sortable: true },
        { field: 'email', header: 'Email', sortable: true },
        { field: 'role', header: 'Role', align: 'center' },
        { field: 'status', header: 'Status', align: 'center' }
      ],
      table: {
        actionsColumn: true,
        alternatingRows: false,
        rowSeparator: true
      },
      itemConfig: {
        actions: {
          item: [
            {
              id: 'view',
              label: 'View',
              icon: 'view',
              variant: 'ghost',
              handler: (context: ActionContext) => alert(`View ${context.entity?.name}`)
            }
          ]
        }
      }
    },
    footer: {
      enabled: true,
      subtitle: (_data, id) => `widgemo.id: ${JSON.stringify(id)}`
    }
  }
};

// Moved outside to prevent recreation on every render, ensuring stable props for better performance.
export const fieldRendererTestConfig: SimplifiedWidgemoConfig = {
  zones: {
    header: {
      enabled: true,
      title: 'FieldRenderer Demo',
      subtitle: 'Type-specific field rendering with images'
    },
    content: {
      enabled: true,
      mode: 'grid',
      columns: 2,
      item: {
        style: 'card',
        template: {
          sections: [
            {
              title: 'Profile with Image',
              fields: [
                { key: 'src', label: 'Photo', type: 'image' },
                { key: 'name', label: 'Name', type: 'text' },
                { key: 'role', label: 'Role', type: 'text' }
              ]
            },
            {
              title: 'Details',
              fields: [
                { key: 'email', label: 'Email', type: 'email' },
                { key: 'department', label: 'Department', type: 'text' },
                { key: 'status', label: 'Active', type: 'boolean' },
                { key: 'lastLogin', label: 'Last Login', type: 'date' }
              ]
            }
          ]
        }
      }
    },
    footer: { enabled: false }
  }
};

// Moved outside to prevent recreation on every render, ensuring stable props for better performance.
export const imageGalleryConfig: SimplifiedWidgemoConfig = {
  zones: {
    header: {
      enabled: true,
      title: 'Image Gallery',
      subtitle: 'Click images to open lightbox'
    },
    content: {
      enabled: true,
      mode: 'grid',
      columns: 3,
      item: {
        style: 'card',
        template: {
          sections: [
            {
              fields: [
                { key: 'src', label: 'Image', type: 'image' },
                { key: 'name', label: 'Title', type: 'text' },
                { key: 'category', label: 'Category', type: 'text' }
              ]
            }
          ]
        }
      }
    },
    footer: { enabled: false }
  }
};

// Moved outside to prevent recreation on every render, ensuring stable props for better performance.
export const progressBarFieldsConfig: SimplifiedWidgemoConfig = {
  zones: {
    header: {
      enabled: true,
      title: 'Progress Bar Demo',
      subtitle: 'FieldRenderer progress bars with custom colors and styling'
    },
    content: {
      enabled: true,
      mode: 'table',
      columns: [
        { field: 'name', header: 'Task Name', sortable: true },
        { field: 'progress', header: 'Progress', type: 'number', renderAs: 'progress', progressOptions: { color: '#28a745', showPercentage: true } },
        { field: 'status', header: 'Status', align: 'center' },
        { field: 'priority', header: 'Priority', align: 'center' }
      ] as ColumnConfig[]
    },
    footer: { enabled: false }
  }
};

// Moved outside to prevent recreation on every render, ensuring stable props for better performance.
export const progressBarVariantsConfig: SimplifiedWidgemoConfig = {
  zones: {
    header: {
      enabled: true,
      title: 'Progress Bar Variants',
      subtitle: 'Different colors, heights, and text display options'
    },
    content: {
      enabled: true,
      mode: 'table',
      columns: [
        { field: 'name', header: 'Variant', sortable: true },
        {
          field: 'progress',
          header: 'Progress Bar',
          type: 'number',
          renderAs: 'progress'
        }
      ] as ColumnConfig[]
    },
    footer: { enabled: false }
  }
};

// Moved outside to prevent recreation on every render, ensuring stable props for better performance.
export const progressBarFunctionsConfig: SimplifiedWidgemoConfig = {
  zones: {
    header: {
      enabled: true,
      title: 'Progress Bar Functions',
      subtitle: 'Dynamic styling based on priority and size fields'
    },
    content: {
      enabled: true,
      mode: 'table',
      columns: [
        { field: 'name', header: 'Task Name', sortable: true },
        { field: 'priority', header: 'Priority', align: 'center' },
        { field: 'size', header: 'Size', align: 'center' },
        {
          field: 'progress',
          sortable: true,
          header: 'Progress Bar',
          type: 'number',
          renderAs: 'progress',
          progressOptions: {
            color: (entity: TaskEntity) => {
              switch (entity.priority) {
                case 'critical': return '#dc3545';
                case 'high': return '#fd7e14';
                case 'medium': return '#ffc107';
                case 'low': return '#28a745';
                default: return '#007bff';
              }
            },
            backgroundColor: 'var(--bg-color)',
            height: (entity: TaskEntity) => entity.size === 'large' ? '30px' : entity.size === 'medium' ? '25px' : '20px',
            showPercentage: (entity: TaskEntity) => entity.priority === 'critical' || entity.progress > 80,
            textColor: (entity: TaskEntity) => entity.priority === 'critical' ? '#ffffff' : '#000000'
          }
        }
      ] as ColumnConfig[]
    },
    footer: { enabled: false }
  }
};

// Moved outside to prevent recreation on every render, ensuring stable props for better performance.
export const ratingFieldConfig: SimplifiedWidgemoConfig = {
  zones: {
    header: {
      enabled: true,
      title: 'Rating Field Demo',
      subtitle: 'Star ratings with half-star support'
    },
    content: {
      enabled: true,
      mode: 'table',
      columns: [
        { field: 'name', header: 'Product Name', sortable: true },
        {
          field: 'rating', header: 'Rating', type: 'number', renderAs: 'rating', align: 'center',
          ratingOptions: {
            //max: 8,
            //color: '#ff5107',
            emptyColor: 'var(--bg-color)',
            size: 20
            //iconName: 'star'
          }
        },
        {
          field: 'hearts', header: 'Hearts', type: 'number', renderAs: 'rating', align: 'center',
          ratingOptions: {
            max: 5,
            color: '#e91e63',
            emptyColor: '#fdbfd4',
            size: 18,
            iconName: 'heart'
          }
        },
        {
          field: 'cost', header: 'Cost', type: 'number', renderAs: 'rating', align: 'center',
          ratingOptions: {
            max: 5,
            color: '#0f6005',
            emptyColor: 'var(--bg-color)',
            size: 20,
            iconName: 'dollar-sign'
          }
        },
        { field: 'reviews', header: 'Reviews', align: 'center' }
      ] as ColumnConfig[]
    },
    footer: { enabled: false }
  }
};

// Moved outside to prevent recreation on every render, ensuring stable props for better performance.
export const badgeFieldConfig: SimplifiedWidgemoConfig = {
  zones: {
    header: {
      enabled: true,
      title: 'Badge Field Demo',
      subtitle: 'Status badges with semantic icons and automatic text colors'
    },
    content: {
      enabled: true,
      mode: 'table',
      columns: [
        { field: 'id', header: 'ID', type: 'number', width: '50px' },
        { field: 'name', header: 'Task Name', type: 'text' },
        {
          field: 'status',
          header: 'Status (Semantic Icons)',
          type: 'badge',
          align: 'center',
          badgeOptions: {
            colorMap: {
              'completed': { background: '#28a745', icon: 'check-circle' },
              'in-progress': { background: '#ffc107', icon: 'clock' },
              'pending': { background: '#6c757d', icon: 'pause' },
              'cancelled': { background: '#dc3545', icon: 'x-circle' }
            },
            size: 'md'
          }
        },
        {
          field: 'priority',
          header: 'Priority (Mixed Styles)',
          type: 'badge',
          align: 'center',
          badgeOptions: {
            colorMap: {
              'low': { background: '#e3f2fd', text: '#1976d2' }, // Light blue bg, dark blue text
              'medium': { background: '#fff3e0', text: '#f57c00' }, // Light orange bg, dark orange text
              'high': { background: '#fd7e14', icon: 'check-circle' }, // Orange with icon
              'critical': { background: '#dc3545', icon: 'x-circle', iconPosition: 'only' } // Icon only
            },
            size: 'sm'
          }
        }
      ] as ColumnConfig[]
    },
    footer: { enabled: false }
  }
};

// Moved outside to prevent recreation on every render, ensuring stable props for better performance.
export const carouselModeConfig: SimplifiedWidgemoConfig = {
  zones: {
    header: {
      enabled: true,
      title: 'User Carousel',
      subtitle: 'Swipe or click to navigate through users'
    },
    content: {
      enabled: true,
      mode: 'carousel',
      carousel: {
        itemWidth: 320,
        itemHeight: 240,
        gap: 16,
        showIndicators: true,
        showArrows: true,
        infinite: false,
        autoPlay: false,
        dragThreshold: 50
      },
      item: {
        style: 'card',
        template: {
          sections: [
            {
              title: 'Profile',
              fields: [
                { key: 'src', label: 'Photo', type: 'image', imageOptions: { width: 120, height: 120, lightbox: true } },
                { key: 'name', label: 'Name', type: 'text' },
                { key: 'role', label: 'Role', type: 'text' }
              ]
            },
            {
              title: 'Contact',
              fields: [
                { key: 'email', label: 'Email', type: 'email' },
                { key: 'department', label: 'Department', type: 'text' }
              ]
            }
          ]
        }
      }
    },
    footer: { enabled: false }
  }
};

// Moved outside to prevent recreation on every render, ensuring stable props for better performance.
export const swatchExampleConfig: SimplifiedWidgemoConfig = {
  zones: {
    header: {
      enabled: true,
      title: 'Color Swatches',
      subtitle: 'Custom field type registry demonstration'
    },
    content: {
      enabled: true,
      mode: 'grid',
      columns: 2,
      item: {
        style: 'card',
        template: {
          sections: [
            {
              fields: [
                { key: 'color', label: 'Swatch', type: 'swatch' },
                { key: 'name', label: 'Color Name', type: 'text' },
                { key: 'description', label: 'Description', type: 'text' }
              ]
            }
          ]
        }
      }
    },
    footer: { enabled: false }
  }
};

// Moved outside to prevent recreation on every render, ensuring stable props for better performance.
export const hooksSystemTestConfig: SimplifiedWidgemoConfig = {
  preRender: () => {
    console.log('🔧 Pre-render hook executed: Preparing Widgemo component');
  },
  zones: {
    header: {
      enabled: true,
      title: 'Hooks Demo',
      subtitle: 'Pre/Post render hooks active'
    },
    content: {
      enabled: true,
      mode: 'grid',
      columns: 2,
      item: {
        style: 'card',
        template: {
          sections: [
            {
              title: 'User Info',
              fields: [
                { key: 'name', label: 'Name' },
                { key: 'email', label: 'Email' }
              ]
            }
          ]
        }
      }
    },
    footer: {
      enabled: true,
      title: 'Hook Status',
      subtitle: 'Hooks executed successfully'
    }
  }
};

// Moved outside to prevent recreation on every render, ensuring stable props for better performance.
export const carouselConfig: SimplifiedWidgemoConfig = {
  zones: {
    header: {
      enabled: true,
      title: 'User Carousel',
      subtitle: 'Swipe or click to navigate through users'
    },
    content: {
      enabled: true,
      mode: 'carousel',
      carousel: {
        itemWidth: 320,
        itemHeight: 240,
        gap: 16,
        showIndicators: true,
        showArrows: true,
        infinite: false,
        autoPlay: false,
        dragThreshold: 50
      },
      item: {
        style: 'card',
        template: {
          sections: [
            {
              title: 'Profile',
              fields: [
                { key: 'src', label: 'Photo', type: 'image', imageOptions: { width: 120, height: 120, lightbox: true } },
                { key: 'name', label: 'Name', type: 'text' },
                { key: 'role', label: 'Role', type: 'text' }
              ]
            },
            {
              title: 'Contact',
              fields: [
                { key: 'email', label: 'Email', type: 'email' },
                { key: 'department', label: 'Department', type: 'text' }
              ]
            }
          ]
        }
      }
    },
    footer: { enabled: false }
  }
};

// Moved outside to prevent recreation on every render, ensuring stable props for better performance.
export const conditionalBackgroundColorsConfig: SimplifiedWidgemoConfig = {
  zones: {
    header: {
      enabled: true,
      title: 'User Management',
      subtitle: 'Conditional background colors with matching text colors - Active: Green, Inactive: Red'
    },
    content: {
      enabled: true,
      mode: 'table',
      columns: [
        { field: 'name', header: 'Name', sortable: true },
        { field: 'email', header: 'Email', sortable: true },
        { field: 'role', header: 'Role', align: 'center' },
        { field: 'status', header: 'Status', align: 'center' }
      ],
      table: {
        actionsColumn: true,
        alternatingRows: false,
        rowSeparator: true
      },
      itemConfig: {
        actions: {
          item: [
            {
              id: 'view',
              label: 'View',
              icon: 'view',
              variant: 'ghost',
              handler: (context: ActionContext) => alert(`View ${context.entity?.name}`)
            }
          ]
        },
        conditionalBackgroundColor: (entity: Entity) => {
          const status = entity.status as boolean;
          if (status === true) {
            return { backgroundColor: '#e8f5e8', color: '#2d5a2d' }; // Light green bg with dark green text
          } else if (status === false) {
            return { backgroundColor: '#ffe8e8', color: '#8b1a1a' }; // Light red bg with dark red text
          }
          return undefined;
        }
      }
    },
    footer: {
      enabled: true,
      subtitle: (_data, id) => `widgemo.id: ${JSON.stringify(id)}`
    }
  }
};

// Moved outside to prevent recreation on every render, ensuring stable props for better performance.
export const conditionalBordersConfig: SimplifiedWidgemoConfig = {
  zones: {
    header: {
      enabled: true,
      title: 'User Management',
      subtitle: 'Conditional borders - Manager: Blue left border, Developer: Green top border, Analyst: Red right border'
    },
    content: {
      enabled: true,
      mode: 'table',
      columns: [
        { field: 'name', header: 'Name', sortable: true },
        { field: 'email', header: 'Email', sortable: true },
        { field: 'role', header: 'Role', align: 'center' },
        { field: 'status', header: 'Status', align: 'center' }
      ],
      table: {
        actionsColumn: true,
        alternatingRows: false,
        rowSeparator: true
      },
      itemConfig: {
        conditionalBorder: (entity: Entity) => {
          const role = entity.role as string;
          switch (role) {
            case 'Manager':
              return { color: '#007bff', thickness: 5 };
            case 'Developer':
              return { color: '#28a745', thickness: 5 };
            case 'Analyst':
              return { color: '#dc3545', thickness: 5, placement: 'right' };
            default:
              return undefined;
          }
        },
        actions: {
          item: [
            {
              id: 'view',
              label: 'View',
              icon: 'view',
              variant: 'ghost',
              handler: (context: ActionContext) => alert(`View ${context.entity?.name}`)
            }
          ]
        }
      }
    },
    footer: {
      enabled: true,
      subtitle: (_data, id) => `widgemo.id: ${JSON.stringify(id)}`
    }
  }
};

// Moved outside to prevent recreation on every render, ensuring stable props for better performance.
export const performanceMonitoringConfig: SimplifiedWidgemoConfig = {
  preRender: () => {
    if (!window.performanceMeasured && performance.getEntriesByName('widgemo-start').length === 0) {
      performance.mark('widgemo-start');
    }
  },
  zones: {
    header: {
      enabled: true,
      icon: { src: 'clock', size: 24, color: '#06a10e' },
      title: 'Performance Monitored Component',
      subtitle: 'Pre/Post render hooks active'
    },
    content: {
      enabled: true,
      mode: 'table',
      columns: [
        { field: 'name', header: 'Name', sortable: true },
        { field: 'email', header: 'Email', sortable: true },
        { field: 'role', header: 'Role', align: 'center' },
        { field: 'department', header: 'Department', sortable: true }
      ],
      table: {
        rowSeparator: false,
        pagination: { page: 1, pageSize: 5 }
      }
    },
    footer: {
      enabled: true,
      title: 'Performance Stats',
      subtitle: 'Check browser console for timing data'
    }
  }
};

// Moved outside to prevent recreation on every render, ensuring stable props for better performance.
export const boardModeConfig: SimplifiedWidgemoConfig = {
  zones: {
    header: {
      enabled: true,
      title: 'Project Kanban Board',
      subtitle: 'Drag tasks between columns to update status'
    },
    content: {
      enabled: true,
      mode: 'board',
      columns: [
        { id: 'todo', label: 'To Do', filter: (item: Entity) => item.status === 'todo' },
        { id: 'in-progress', label: 'In Progress', filter: (item: Entity) => item.status === 'in-progress' },
        { id: 'review', label: 'Review', filter: (item: Entity) => item.status === 'review' },
        { id: 'done', label: 'Done', filter: (item: Entity) => item.status === 'done' }
      ] as BoardColumnConfig[],
      board: {
        swimlanes: {
          groupBy: 'assignee',
          order: ['Alice', 'Bob', 'Charlie']
        },
        dragEnabled: true,
        actionsPosition: 'hover',
        sortWithinColumn: 'priority'
      },
      item: {
        template: {
          sections: [
            {
              title: 'Task',
              fields: [
                { key: 'name', label: 'Title', type: 'text' },
                { key: 'priority', label: 'Priority', type: 'text' }
              ]
            }
          ]
        }
      }
    },
    footer: { enabled: false }
  }
};

// Moved outside to prevent recreation on every render, ensuring stable props for better performance.
export const linkRenderingConfig: SimplifiedWidgemoConfig = {
  zones: {
    header: {
      enabled: true,
      title: 'Clickable Links Demo',
      subtitle: 'Text fields rendered as links with external warnings',
      actions: [
        {
          id: 'refresh',
          label: 'Refresh',
          icon: 'refresh',
          variant: 'ghost',
          onTrigger: () => alert('Refresh clicked!'),
          iconOnly: true,
          placement: 'discoverable'
        }
      ]
    },
    content: {
      enabled: true,
      mode: 'table',
      columns: [
        { field: 'id', header: 'ID', type: 'number', width: '60px' },
        { field: 'name', header: 'Name', type: 'text' },
        {
          field: 'url',
          header: 'URL',
          type: 'text',
          renderAs: 'link',
          linkOptions: {
            newTab: true,
            externalWarning: true
          }
        },
        { field: 'description', header: 'Description', type: 'text' }
      ] as ColumnConfig[],
      table: {
        alternatingRows: true,
        rowSeparator: false
      }
    },
    footer: { enabled: false }
  }
};

// Moved outside to prevent recreation on every render, ensuring stable props for better performance.
export const linkRenderingCustomConfig: SimplifiedWidgemoConfig = {
  zones: {
    header: {
      enabled: true,
      title: 'Advanced Link Options Demo',
      subtitle: 'Custom text, dynamic URLs, and link behaviors'
    },
    content: {
      enabled: true,
      mode: 'table',
      columns: [
        { field: 'id', header: 'ID', type: 'number', width: '60px' },
        { field: 'name', header: 'Name', type: 'text' },
        {
          field: 'url',
          header: 'Basic Link',
          type: 'text',
          renderAs: 'link'
        },
        {
          field: 'url',
          header: 'Custom Text Link',
          type: 'text',
          renderAs: 'link',
          linkOptions: {
            text: 'Click Here',
            newTab: true
          }
        },
        {
          field: 'displayText',
          header: 'Dynamic Text',
          type: 'text',
          renderAs: 'link',
          linkOptions: {
            url: (entity: LinkDemoEntity) => entity.url,
            newTab: (entity: LinkDemoEntity) => entity.category === 'external'
          }
        },
        {
          field: 'url',
          header: 'External Warning',
          type: 'text',
          renderAs: 'link',
          linkOptions: {
            externalWarning: true,
            newTab: true
          }
        },
        {
          field: 'url',
          header: 'Function URL',
          type: 'text',
          renderAs: 'link',
          linkOptions: {
            text: (entity: LinkDemoEntity) => `${entity.name} (${entity.category})`,
            url: (entity: LinkDemoEntity) => entity.url,
            newTab: (entity: LinkDemoEntity) => entity.category === 'external',
            externalWarning: (entity: LinkDemoEntity) => entity.category === 'external'
          }
        },
        { field: 'category', header: 'Category', type: 'text', align: 'center' }
      ] as ColumnConfig[],
      table: {
        alternatingRows: true,
        rowSeparator: false
      }
    },
    footer: { enabled: false }
  }
};

// Moved outside to prevent recreation on every render, ensuring stable props for better performance.
export const linkRenderingActionLinksConfig: SimplifiedWidgemoConfig = {
  zones: {
    header: {
      enabled: true,
      title: 'Action Links Demo',
      subtitle: 'Links that perform actions or use special protocols'
    },
    content: {
      enabled: true,
      mode: 'table',
      columns: [
        { field: 'id', header: 'ID', type: 'number', width: '60px' },
        { field: 'name', header: 'Action', type: 'text' },
        { field: 'action', header: 'Type', type: 'text', align: 'center' },
        {
          field: 'url',
          header: 'Direct Link',
          type: 'text',
          renderAs: 'link',
          linkOptions: {
            newTab: (entity: ActionLinkEntity) => entity.action === 'download'
          }
        },
        {
          field: 'text',
          header: 'Custom Action Link',
          type: 'text',
          renderAs: 'link',
          linkOptions: {
            url: (entity: ActionLinkEntity) => entity.url,
            text: (entity: ActionLinkEntity) => entity.text,
            newTab: (entity: ActionLinkEntity) => ['download', 'email'].includes(entity.action),
            externalWarning: (entity: ActionLinkEntity) => entity.action === 'download'
          }
        },
        {
          field: 'target',
          header: 'Target',
          type: 'text',
          align: 'center'
        }
      ] as ColumnConfig[],
      table: {
        alternatingRows: true,
        rowSeparator: false
      }
    },
    footer: { enabled: false }
  }
};

// Moved outside to prevent recreation on every render, ensuring stable props for better performance.
export const tableGroupingConfig: SimplifiedWidgemoConfig = {
  zones: {
    header: {
      enabled: true,
      title: 'Table Grouping Demo',
      subtitle: 'Rows grouped by department with expand/collapse functionality',
      actions: [
        {
          id: 'add',
          label: 'Add Item',
          icon: 'add',
          variant: 'primary',
          onTrigger: () => alert('Add Item clicked!')
        },
        {
          id: 'refresh',
          label: 'Refresh',
          icon: 'refresh',
          variant: 'ghost',
          onTrigger: () => alert('Refresh clicked!'),
          iconOnly: true,
          placement: 'discoverable'
        },
        {
          id: 'export',
          label: 'Export',
          icon: 'export',
          onTrigger: () => alert('Export clicked!'),
          iconOnly: false,
          placement: 'menu'
        }
      ]
    },
    content: {
      enabled: true,
      mode: 'table',
      columns: [
        { field: 'name', header: 'Full Name', sortable: true, width: '200px', type: 'text' },
        { field: 'email', header: 'Email Address', sortable: true, width: '250px', type: 'email' },
        { field: 'role', header: 'Role', sortable: true, align: 'left', type: 'text' },
        { field: 'department', header: 'Department', sortable: true, groupable: true, type: 'text' },
        { field: 'status', header: 'Active', sortable: true, align: 'center', type: 'boolean', booleanTrueLabel: <><FaWifi style={{ marginRight: '4px' }} /> Active</>, booleanFalseLabel: <><FaUserSlash style={{ marginRight: '4px' }} /> Inactive</> },
        { field: 'lastLogin', header: 'Last Login', sortable: true, type: 'date' }
      ] as ColumnConfig[],
      table: {
        sort: { field: 'department', direction: 'asc' },
        pagination: { page: 1, pageSize: 20 },
        actionsColumn: true,
        alternatingRows: true,
        rowSeparator: false,
        grouping: {
          groupBy: 'department',
          initialExpanded: true,
          showExpandAll: true,
          collapsible: true,
          groupHeaderRenderer: (groupValue: unknown, count: number, isExpanded: boolean) => (
            <span style={{
              fontWeight: 'bold',
              color: isExpanded ? '#28a745' : '#007bff'
            }}>
              {String(groupValue || 'No Department')} ({count} {count === 1 ? 'member' : 'members'})
            </span>
          )
        },
        hooks: {
          onSort: (field: string, direction: 'asc' | 'desc') => console.log(`Sort by ${field} ${direction}`),
          onGroupToggle: (groupValue: unknown, isExpanded: boolean) => console.log(`Group ${String(groupValue)} ${isExpanded ? 'expanded' : 'collapsed'}`)
        }
      },
      itemConfig: {
        actions: {
          item: [
            {
              id: 'edit',
              label: 'Edit',
              icon: 'edit',
              variant: 'ghost',
              placement: 'always',
              iconOnly: true,
              handler: (context: ActionContext) => alert(`Edit ${context.entity?.name}`)
            },
            {
              id: 'view',
              label: 'View Details',
              icon: 'eye',
              variant: 'secondary',
              placement: 'discoverable',
              handler: (context: ActionContext) => alert(`View ${context.entity?.name}`)
            },
            {
              id: 'delete',
              label: 'Delete',
              icon: 'delete',
              variant: 'danger',
              placement: 'menu',
              handler: (context: ActionContext) => alert(`Delete ${context.entity?.name}`)
            }
          ]
        }
      }
    },
    footer: {
      enabled: true,
      subtitle: (_data, id) => `widgemo.id: ${JSON.stringify(id)}`
    }
  }
};

// Moved outside to prevent recreation on every render, ensuring stable props for better performance.
export const currencyFieldRenderingConfig: SimplifiedWidgemoConfig = {
  zones: {
    header: {
      enabled: true,
      title: 'Currency Field Examples',
      subtitle: 'Various currency formatting options and locales'
    },
    content: {
      enabled: true,
      mode: 'table',
      columns: [
        { field: 'id', header: 'ID', type: 'number', width: '60px' },
        { field: 'name', header: 'Product', type: 'text' },
        {
          field: 'price',
          header: 'Default USD',
          type: 'number',
          renderAs: 'currency',
          currencyOptions: {
            currency: 'USD',
            locale: 'en-US'
          }
        },
        {
          field: 'price',
          header: 'EUR (Germany)',
          type: 'number',
          renderAs: 'currency',
          currencyOptions: {
            currency: (entity: CurrencyDemoEntity) => entity.currency,
            locale: (entity: CurrencyDemoEntity) => entity.locale
          }
        },
        {
          field: 'price',
          header: 'No Symbol',
          type: 'number',
          renderAs: 'currency',
          currencyOptions: {
            currency: 'USD',
            showSymbol: false,
            symbolPosition: 'suffix'
          }
        },
        {
          field: 'price',
          header: 'Colorized',
          type: 'number',
          renderAs: 'currency',
          currencyOptions: {
            currency: 'USD',
            colorize: true
          }
        },
        {
          field: 'price',
          header: 'Custom Colors',
          type: 'number',
          renderAs: 'currency',
          currencyOptions: {
            currency: 'USD',
            colorize: true,
            positiveColor: '#2e7d32', // Dark green
            negativeColor: '#d32f2f', // Dark red
            zeroColor: '#1976d2'      // Blue
          }
        },
        {
          field: 'price',
          header: 'Parentheses',
          type: 'number',
          renderAs: 'currency',
          currencyOptions: {
            currency: 'USD',
            negativeFormat: 'parentheses'
          }
        },
        {
          field: 'price',
          header: 'Compact',
          type: 'number',
          renderAs: 'currency',
          currencyOptions: {
            currency: 'USD',
            compact: true,
            compactThreshold: 100000
          }
        },
        {
          field: 'price',
          header: '1 Decimal',
          type: 'number',
          renderAs: 'currency',
          currencyOptions: {
            currency: 'USD',
            minimumFractionDigits: 1,
            maximumFractionDigits: 1
          }
        }
      ] as ColumnConfig[],
      table: {
        alternatingRows: true,
        rowSeparator: false,
        grouping: {
          groupBy: 'locale',
          initialExpanded: false,
          showExpandAll: true,
          collapsible: true
        },
      }
    },
    footer: { enabled: false }
  }
};

// Moved outside to prevent recreation on every render, ensuring stable props for better performance.
export const currencyInternationalConfig: SimplifiedWidgemoConfig = {
  zones: {
    header: {
      enabled: true,
      title: 'International Currency Formatting',
      subtitle: 'Proper locale-specific formatting for different countries'
    },
    content: {
      enabled: true,
      mode: 'table',
      columns: [
        { field: 'id', header: 'ID', type: 'number', width: '50px' },
        { field: 'country', header: 'Country', type: 'text' },
        {
          field: 'amount',
          header: 'Formatted Currency',
          type: 'number',
          renderAs: 'currency',
          currencyOptions: {
            currency: (entity: CurrencyDemoEntity) => entity.currency,
            locale: (entity: CurrencyDemoEntity) => entity.locale
          }
        },
        { field: 'currency', header: 'Code', type: 'text', align: 'center', width: '60px' },
        { field: 'locale', header: 'Locale', type: 'text', align: 'center' }
      ] as ColumnConfig[],
      table: {
        alternatingRows: true,
        rowSeparator: false
      }
    },
    footer: { enabled: false }
  }
};

// Moved outside to prevent recreation on every render, ensuring stable props for better performance.
export const currencySymbolPositioningConfig: SimplifiedWidgemoConfig = {
  zones: {
    header: {
      enabled: true,
      title: 'Currency Symbol Positioning',
      subtitle: 'Prefix, suffix, and no symbol options'
    },
    content: {
      enabled: true,
      mode: 'table',
      columns: [
        { field: 'id', header: 'ID', type: 'number', width: '50px' },
        { field: 'description', header: 'Description', type: 'text' },
        {
          field: 'amount',
          header: 'Prefix',
          type: 'number',
          renderAs: 'currency',
          currencyOptions: {
            currency: (entity: CurrencyDemoEntity) => entity.currency,
            symbolPosition: 'prefix'
          }
        },
        {
          field: 'amount',
          header: 'Suffix',
          type: 'number',
          renderAs: 'currency',
          currencyOptions: {
            currency: (entity: CurrencyDemoEntity) => entity.currency,
            symbolPosition: 'suffix'
          }
        },
        {
          field: 'amount',
          header: 'No Symbol',
          type: 'number',
          renderAs: 'currency',
          currencyOptions: {
            currency: (entity: CurrencyDemoEntity) => entity.currency,
            showSymbol: false
          }
        },
        { field: 'position', header: 'Position', type: 'text', align: 'center' }
      ] as ColumnConfig[],
      table: {
        alternatingRows: true,
        rowSeparator: false
      }
    },
    footer: { enabled: false }
  }
};

// Moved outside to prevent recreation on every render, ensuring stable props for better performance.
export const currencyDecimalAlignmentConfig: SimplifiedWidgemoConfig = {
  zones: {
    header: {
      enabled: true,
      title: 'Decimal Point Alignment',
      subtitle: 'Currency values aligned to decimal points for consistent formatting'
    },
    content: {
      enabled: true,
      mode: 'table',
      columns: [
        { field: 'id', header: 'ID', type: 'number', width: '50px' },
        { field: 'description', header: 'Description', type: 'text' },
        {
          field: 'amount',
          header: 'Standard',
          type: 'number',
          renderAs: 'currency',
          currencyOptions: {
            currency: 'USD',
            decimalAlign: false
          }
        },
        {
          field: 'amount',
          header: 'Decimal Aligned',
          type: 'number',
          renderAs: 'currency',
          currencyOptions: {
            currency: 'USD',
            decimalAlign: true
          }
        },
        {
          field: 'amount',
          header: 'EUR Aligned',
          type: 'number',
          renderAs: 'currency',
          currencyOptions: {
            currency: 'EUR',
            locale: 'de-DE',
            decimalAlign: true
          }
        },
        {
          field: 'amount',
          header: 'JPY Aligned',
          type: 'number',
          renderAs: 'currency',
          currencyOptions: {
            currency: 'JPY',
            locale: 'ja-JP',
            decimalAlign: true
          }
        }
      ] as ColumnConfig[],
      table: {
        alternatingRows: true,
        rowSeparator: false
      }
    },
    footer: { enabled: false }
  }
};

// Moved outside to prevent recreation on every render, ensuring stable props for better performance.
export const currencyDecimalPrecisionConfig: SimplifiedWidgemoConfig = {
  zones: {
    header: {
      enabled: true,
      title: 'Decimal Precision Control',
      subtitle: 'Minimum and maximum fraction digits configuration'
    },
    content: {
      enabled: true,
      mode: 'table',
      columns: [
        { field: 'id', header: 'ID', type: 'number', width: '50px' },
        { field: 'description', header: 'Description', type: 'text' },
        {
          field: 'amount',
          header: '2 Decimals',
          type: 'number',
          renderAs: 'currency',
          currencyOptions: {
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            decimalAlign: true
          }
        },
        {
          field: 'amount',
          header: '0 Decimals',
          type: 'number',
          renderAs: 'currency',
          currencyOptions: {
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
            decimalAlign: true
          }
        },
        {
          field: 'amount',
          header: '1-3 Decimals',
          type: 'number',
          renderAs: 'currency',
          currencyOptions: {
            currency: 'USD',
            minimumFractionDigits: 1,
            maximumFractionDigits: 3,
            decimalAlign: true
          }
        },
        {
          field: 'amount',
          header: '4-6 Decimals',
          type: 'number',
          renderAs: 'currency',
          currencyOptions: {
            currency: 'USD',
            minimumFractionDigits: 4,
            maximumFractionDigits: 6,
            decimalAlign: true
          }
        }
      ] as ColumnConfig[],
      table: {
        alternatingRows: true,
        rowSeparator: false
      }
    },
    footer: { enabled: false }
  }
};

// Moved outside to prevent recreation on every render, ensuring stable props for better performance.
export const currencyCompactNotationConfig: SimplifiedWidgemoConfig = {
  zones: {
    header: {
      enabled: true,
      title: 'Compact Notation for Large Numbers',
      subtitle: 'K, M, B suffixes for thousands, millions, billions'
    },
    content: {
      enabled: true,
      mode: 'table',
      columns: [
        { field: 'id', header: 'ID', type: 'number', width: '50px' },
        { field: 'description', header: 'Description', type: 'text' },
        {
          field: 'amount',
          header: 'Regular',
          type: 'number',
          renderAs: 'currency',
          currencyOptions: {
            currency: 'USD',
            compact: false
          }
        },
        {
          field: 'amount',
          header: 'Compact (1K+)',
          type: 'number',
          renderAs: 'currency',
          currencyOptions: {
            currency: 'USD',
            compact: true,
            compactThreshold: 1000,
            decimalAlign: true
          }
        },
        {
          field: 'amount',
          header: 'Compact (1M+)',
          type: 'number',
          renderAs: 'currency',
          currencyOptions: {
            currency: 'USD',
            compact: true,
            compactThreshold: 1000000,
            decimalAlign: true
          }
        },
        {
          field: 'amount',
          header: 'Compact (10M+)',
          type: 'number',
          renderAs: 'currency',
          currencyOptions: {
            currency: 'USD',
            compact: true,
            compactThreshold: 10000000,
            decimalAlign: true
          }
        }
      ] as ColumnConfig[],
      table: {
        alternatingRows: true,
        rowSeparator: false
      }
    },
    footer: { enabled: false }
  }
};

// Moved outside to prevent recreation on every render, ensuring stable props for better performance.
export const currencyDynamicOptionsConfig: SimplifiedWidgemoConfig = {
  zones: {
    header: {
      enabled: true,
      title: 'Dynamic Currency Options',
      subtitle: 'Function-based options that adapt to data values'
    },
    content: {
      enabled: true,
      mode: 'table',
      columns: [
        { field: 'id', header: 'ID', type: 'number', width: '50px' },
        { field: 'product', header: 'Product', type: 'text' },
        { field: 'region', header: 'Region', type: 'text', align: 'center', width: '60px' },
        {
          field: 'price',
          header: 'Regional Currency',
          type: 'number',
          renderAs: 'currency',
          currencyOptions: {
            currency: (entity: CurrencyDemoEntity) => entity.currency,
            locale: (entity: CurrencyDemoEntity) => {
              const localeMap: Record<string, string> = {
                'US': 'en-US', 'EU': 'de-DE', 'UK': 'en-GB',
                'JP': 'ja-JP', 'CA': 'en-CA', 'AU': 'en-AU', 'CH': 'de-CH'
              };
              return localeMap[entity.region || 'US'] || 'en-US';
            }
          }
        },
        {
          field: 'price',
          header: 'With Discount Color',
          type: 'number',
          renderAs: 'currency',
          currencyOptions: {
            currency: (entity: CurrencyDemoEntity) => entity.currency,
            colorize: (entity: CurrencyDemoEntity) => (entity.discount || 0) > 0,
            compact: (entity: CurrencyDemoEntity) => entity.price > 10000,
            compactThreshold: 10000
          }
        },
        {
          field: 'discount',
          header: 'Discount %',
          type: 'number',
          align: 'center',
          width: '80px'
        }
      ] as ColumnConfig[],
      table: {
        alternatingRows: true,
        rowSeparator: false
      }
    },
    footer: { enabled: false }
  }
};

// Moved outside to prevent recreation on every render, ensuring stable props for better performance.
export const currencyEdgeCasesConfig: SimplifiedWidgemoConfig = {
  zones: {
    header: {
      enabled: true,
      title: 'Currency Edge Cases',
      subtitle: 'How currency fields handle various input types and edge cases'
    },
    content: {
      enabled: true,
      mode: 'table',
      columns: [
        { field: 'id', header: 'ID', type: 'number', width: '50px' },
        { field: 'description', header: 'Description', type: 'text' },
        {
          field: 'value',
          header: 'Raw Value',
          type: 'text'
        },
        {
          field: 'value',
          header: 'Currency (USD)',
          type: 'number',
          renderAs: 'currency',
          currencyOptions: {
            currency: 'USD',
            colorize: true,
            negativeFormat: 'parentheses'
          }
        },
        {
          field: 'value',
          header: 'Currency (EUR)',
          type: 'number',
          renderAs: 'currency',
          currencyOptions: {
            currency: 'EUR',
            locale: 'de-DE',
            colorize: true,
            negativeFormat: 'parentheses'
          }
        },
        {
          field: 'value',
          header: 'Compact',
          type: 'number',
          renderAs: 'currency',
          currencyOptions: {
            currency: 'USD',
            compact: true,
            compactThreshold: 1000000,
            colorize: true,
            negativeFormat: 'parentheses'
          }
        }
      ] as ColumnConfig[],
      table: {
        alternatingRows: true,
        rowSeparator: false
      }
    },
    footer: { enabled: false }
  }
};

// Array of examples for dynamic rendering in SimplifiedTest.
const widgemoExamples = [
  {
    id: 'collapsible-header',
    title: 'Collapsible Header Zone',
    description: 'Header Zone: Enabled, collapsible with button, title and subtitle functions',
    data: teaserSampleData,
    config: collapsibleHeaderConfig
  },
  {
    id: 'fixed-header',
    title: 'Fixed Header Zone',
    description: 'Header Zone: Enabled, fixed position, title and subtitle',
    data: twoUsersData,
    config: fixedHeaderConfig
  },
  {
    id: 'react-element-title',
    title: 'React Element Title Example',
    description: 'Header Zone: Enabled, React element as title, subtitle',
    data: fourUsersData,
    config: reactElementTitleConfig
  },
  {
    id: 'actions-system-test',
    title: 'Actions System Test',
    description: 'Header Zone: Enabled with actions, Content Zone: Table mode with actions column',
    data: teaserSampleData,
    config: actionsSystemTestConfig
  },
  {
    id: 'compact-layout',
    title: 'Zone Layouts Test - Compact Layout',
    description: 'Compact layout with reduced spacing',
    data: fiveUsersData,
    config: compactLayoutConfig
  },
  {
    id: 'minimal-layout',
    title: 'Zone Layouts Test - Minimal Layout',
    description: 'Minimal layout with no padding',
    data: fiveUsersData,
    config: minimalLayoutConfig
  },
  {
    id: 'centered-layout',
    title: 'Zone Layouts Test - Centered Layout',
    description: 'Centered layout with max width',
    data: fiveUsersData,
    config: centeredLayoutConfig
  },
  {
    id: 'custom-layout',
    title: 'Custom Layout Test',
    description: 'Custom layout with specific dimensions',
    data: fiveUsersData,
    config: customLayoutConfig
  },
  {
    id: 'custom-layout-custom-element',
    title: 'Custom Layout with Custom Element',
    description: 'Custom layout with custom element in header',
    data: fiveUsersData,
    config: customLayoutWithCustomElementConfig
  },
  {
    id: 'custom-layout-vertical',
    title: 'Custom Layout with Vertical Direction',
    description: 'Custom layout with vertical direction',
    data: fiveUsersData,
    config: customLayoutVerticalConfig
  },
  {
    id: 'custom-layout-groups',
    title: 'Custom Layout with Groups',
    description: 'Custom layout with grouped zones',
    data: fiveUsersData,
    config: customLayoutWithGroupsConfig
  },
  {
    id: 'headless-widgemo',
    title: 'Headless Widgemo Example',
    description: 'Headless mode with no zones',
    data: sixUsersData,
    config: headlessWidgemoConfig
  },
   {
    id: 'headless-footerless-widgemo',
    title: 'Headless and Footerless Widgemo Example',
    description: 'Headless mode with no zones, including no footer',
    data: sixUsersData,
    config: headlessFooterlessWidgemoConfig
  },
  {
    id: 'instance-id-demo',
    title: 'Widgemo Instance ID Demo',
    description: 'Instance ID for multiple widgemos',
    data: threeUsersData,
    config: instanceIdDemoConfig
  },
  {
    id: 'grid-mode-item-renderer',
    title: 'Mode System Test - Grid Mode with ItemRenderer',
    description: 'Grid mode with custom item renderer and conditional borders',
    data: sixUsersData,
    config: gridModeWithItemRendererConfig
  },
  {
    id: 'table-alternating',
    title: 'Mode - Table - Alternating',
    description: 'Table mode with alternating row colors',
    data: eightUsersData,
    config: tableAlternatingConfig
  },
  {
    id: 'table-row-dividers',
    title: 'Mode - Table Mode - Row Dividers',
    description: 'Table mode with row separators',
    data: fiveUsersData,
    config: tableRowDividersConfig
  },
  {
    id: 'table-groupable-columns',
    title: 'Mode - Table Mode - Groupable Columns',
    description: 'Table mode with groupable columns',
    data: twelveUsersData,
    config: tableGroupableColumnsConfig
  },
  {
    id: 'table-plain',
    title: 'Mode - Table Mode - Plain',
    description: 'Plain table mode',
    data: fiveUsersData,
    config: tablePlainConfig
  },
  {
    id: 'field-renderer-test',
    title: 'FieldRenderer Test - Type-Specific Rendering',
    description: 'FieldRenderer with type-specific rendering',
    data: fourUsersData,
    config: fieldRendererTestConfig
  },
  {
    id: 'conditional-background-colors',
    title: 'Mode - Table Mode - Conditional Background Colors',
    description: 'Table mode with conditional background colors',
    data: eightUsersData,
    config: conditionalBackgroundColorsConfig
  },
  {
    id: 'conditional-borders',
    title: 'Mode - Table Mode - Conditional Borders',
    description: 'Table mode with conditional borders',
    data: eightUsersData,
    config: conditionalBordersConfig
  },
  {
    id: 'image-gallery',
    title: 'Image Gallery - FieldRenderer Lightbox',
    description: 'Image gallery with lightbox',
    data: sixUsersData,
    config: imageGalleryConfig
  },
  {
    id: 'progress-bar-fields',
    title: 'FieldRenderer Test - Progress Bar Fields',
    description: 'Progress bar fields',
    data: progressExampleSampleData,
    config: progressBarFieldsConfig
  },
  {
    id: 'progress-bar-variants',
    title: 'FieldRenderer Test - Progress Bar Variants',
    description: 'Progress bar variants',
    data: progressVariantsSampleData,
    config: progressBarVariantsConfig
  },
  {
    id: 'progress-bar-functions',
    title: 'FieldRenderer Test - Progress Bar Functions',
    description: 'Progress bar with functions',
    data: progressSampleData,
    config: progressBarFunctionsConfig
  },
  {
    id: 'rating-field',
    title: 'FieldRenderer Test - Rating Field',
    description: 'Rating field',
    data: ratingsSampleData,
    config: ratingFieldConfig
  },
  {
    id: 'badge-field',
    title: 'FieldRenderer Test - Badge Field',
    description: 'Status badges with color mapping',
    data: badgeSampleData,
    config: badgeFieldConfig
  },
  {
    id: 'carousel-mode',
    title: 'CarouselMode - Swipeable Carousel',
    description: 'Carousel mode',
    data: fiveUsersData,
    config: carouselConfig
  },
  {
    id: 'swatch-example',
    title: 'Field Type Registry - Swatch Example',
    description: 'Swatch example',
    data: swatchesSampleData,
    config: swatchExampleConfig
  },
  {
    id: 'hooks-system-test',
    title: 'Hooks System Test - Pre/Post Render',
    description: 'Hooks system test',
    data: fourUsersData,
    config: hooksSystemTestConfig
  },
  {
    id: 'performance-monitoring',
    title: 'Performance Monitoring - Pre/Post Render Hooks',
    description: 'Performance monitoring',
    data: eightUsersData,
    config: performanceMonitoringConfig
  },
  {
    id: 'board-mode',
    title: 'BoardMode - Kanban Board',
    description: 'Board mode',
    data: kanbanSampleData,
    config: boardModeConfig
  },
  {
    id: 'link-rendering',
    title: 'Link Rendering',
    description: 'Link rendering',
    data: linkTestData,
    config: linkRenderingConfig
  },
  {
    id: 'link-rendering-custom',
    title: 'Link Rendering - Custom Text and URLs',
    description: 'Custom link rendering',
    data: actionOptionsSampleData,
    config: linkRenderingCustomConfig
  },
  {
    id: 'link-rendering-action-links',
    title: 'Link Rendering - Action Links',
    description: 'Action links',
    data: actionLinksSampleData,
    config: linkRenderingActionLinksConfig
  },
  {
    id: 'table-grouping',
    title: 'Mode - Table - Grouping',
    description: 'Table grouping',
    data: eightUsersData,
    config: tableGroupingConfig
  },
  {
    id: 'currency-field-rendering',
    title: 'Currency Field Rendering',
    description: 'Currency field rendering',
    data: currencyExamplesSampleData,
    config: currencyFieldRenderingConfig
  },
  {
    id: 'currency-field-locale',
    title: 'Currency Field - International Showcase',
    description: 'Currency with locales',
    data: currencyInternationalSampleData,
    config: currencyInternationalConfig
  },
  {
    id: 'currency-field-position',
    title: 'Currency Field - Symbol Positioning',
    description: 'Currency symbol positioning',
    data: currencyPositioningSampleData,
    config: currencySymbolPositioningConfig
  },
  {
    id: 'currency-field-alignment',
    title: 'Currency Field - Decimal Alignment',
    description: 'Currency decimal alignment',
    data: currencyDecimalSampleData,
    config: currencyDecimalAlignmentConfig
  },
  {
    id: 'currency-field-precision',
    title: 'Currency Field - Decimal Precision',
    description: 'Currency decimal precision',
    data: currencyPrecisionSampleData,
    config: currencyDecimalPrecisionConfig
  },
  {
    id: 'currency-field-compact',
    title: 'Currency Field - Compact Notation',
    description: 'Currency compact notation',
    data: currencyCompactSampleData,
    config: currencyCompactNotationConfig
  },
  {
    id: 'currency-dynamic-compact',
    title: 'Currency Field - Dynamic',
    description: 'Currency dynamic',
    data: currencyDynamicSampleData,
    config: currencyDynamicOptionsConfig
  },
  {
    id: 'currency-edge-compact',
    title: 'Currency Field - Edge Cases',
    description: 'Currency edge cases',
    data: currencyEdgeCasesSampleData,
    config: currencyEdgeCasesConfig
  }
];

export default widgemoExamples;
