import type { ActionContext, Entity, WidgemoConfig, ColumnConfig, BoardColumnConfig } from 'widgemo-core';
import { FaPlus, FaEdit, FaSync, FaDownload, FaWifi } from 'react-icons/fa';
import { FaUserSlash } from 'react-icons/fa6';
import { currencyDecimalSampleData, currencyCompactSampleData, currencyEdgeCasesSampleData, currencyExamplesSampleData, currencyInternationalSampleData, currencyPositioningSampleData, currencyPrecisionSampleData, teaserSampleData, actionLinksSampleData, actionOptionsSampleData, currencyDynamicSampleData, linkTestData, kanbanSampleData, swatchesSampleData, ratingsSampleData, progressSampleData, progressVariantsSampleData, progressExampleSampleData, badgeSampleData, projectExampleSampleData } from './sampleData';
import type { SampleData } from './types';
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
export const collapsibleHeaderConfig: WidgemoConfig = {
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
          onClick: () => alert('Add User clicked!')
        },
        {
          id: 'refresh',
          label: 'Refresh',
          icon: 'refresh',
          onClick: () => alert('Refresh clicked!'),
          iconOnly: true,
          placement: 'onHover'
        },
        {
          id: 'export',
          label: 'Export Data',
          icon: 'download',
          onClick: () => alert('Export clicked!'),
          iconOnly: true,
          placement: 'onHover'
        }
      ]
    },
    content: {
      enabled: true,
      mode: 'grid'
    },
    footer: {
      enabled: true,
      icon: { src: 'info-circle', size: 18, color: '#0d56c4' },
      subtitle: 'Last refresh: 5 minutes ago'
    }
  }
};
// Moved outside to prevent recreation on every render, ensuring stable props for better performance.
export const fixedHeaderConfig: WidgemoConfig = {
  devMode: {
    enabled: true,
    zone: 'footer'
  },
  zones: {
    header: {
      enabled: true,
      collapse: { initialState: 'fixed' },
      icon: { src: 'users', size: 24},
      title: 'Team Overview',
      subtitle: 'Quick stats and actions'
    },
    content: {
      enabled: true,
      mode: 'grid'
    },
    footer: {
      enabled: true,
      icon: { src: 'users'},
      className: 'custom-footer-class',
      title: (data) => `Team Members (${data.length} users)`,
      subtitle: '- "Manage your team efficiently"',
      actions: [
        {
          id: 'export-data',
          label: 'Export Data',
          icon: 'export',
          variant: 'primary',
          onClick: () => alert('Export Data clicked!')
        },
        {
          id: 'refresh',
          label: 'Refresh',
          icon: 'refresh',
          onClick: () => alert('Refresh clicked!'),
          iconOnly: true,
          placement: 'onHover'
        }
      ]
    }
  }
};
// Moved outside to prevent recreation on every render, ensuring stable props for better performance.
export const reactElementTitleConfig: WidgemoConfig = {
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
          onClick: () => alert('Add User clicked!')
        },
        {
          id: 'refresh',
          label: 'Refresh',
          icon: 'refresh',
          onClick: () => alert('Refresh clicked!'),
          iconOnly: true,
          placement: 'onHover'
        },
        {
          id: 'export',
          label: 'Export Data',
          icon: 'export',
          onClick: () => alert('Export clicked!'),
          iconOnly: true,
          placement: 'onHover'
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
export const actionsSystemTestConfig: WidgemoConfig = {
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
          onClick: () => alert('Add Item clicked!')
        },
        {
          id: 'refresh',
          label: 'Refresh',
          icon: 'refresh',
          variant: 'secondary',
          onClick: () => alert('Refresh clicked!')
        },
        {
          id: 'export',
          label: 'Export',
          icon: 'export',
          onClick: () => alert('Export clicked!'),
          iconOnly: true
        },
        {
          id: 'settings',
          label: 'Settings',
          icon: 'settings',
          variant: 'danger',
          onClick: () => alert('Settings clicked!'),
          placement: 'onHover'
        },
        {
          id: 'all',
          label: 'View All',
          icon: 'eye',
          variant: 'success',
          onClick: () => alert('View All clicked!'),
          placement: 'menu'
        },
        {
          id: 'chart',
          label: 'Chart Mode',
          icon: 'chart-pie',
          variant: 'success',
          onClick: () => alert('Chart Mode clicked!'),
          iconOnly: true
        },
        {
          id: 'bar',
          label: 'Bar Chart Mode',
          icon: 'chart-bar',
          variant: 'primary',
          onClick: () => alert('Chart Mode clicked!'),
          placement: 'menu'
        }
      ]
    },
    content: { enabled: true },
    footer: { enabled: false }
  }
};
// Moved outside to prevent recreation on every render, ensuring stable props for better performance.
export const compactLayoutConfig: WidgemoConfig = {
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
          onClick: () => alert('Add Item clicked!')
        },
        {
          id: 'refresh',
          label: 'Refresh',
          icon: 'refresh',
          variant: 'ghost',
          onClick: () => alert('Refresh clicked!'),
          iconOnly: true,
          placement: 'onHover'
        },
        {
          id: 'delete',
          label: 'Delete All',
          icon: 'trash',
          onClick: () => alert('Delete clicked!'),
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
export const minimalLayoutConfig: WidgemoConfig = {
  zones: {
    header: {
      enabled: true,
      layout: { preset: 'minimal' },
      icon: { src: 'clock'},
      title: 'Minimal Layout Demo',
      subtitle: 'Title and collapse only',
      actions: [
        {
          id: 'add',
          label: 'Add Item',
          icon: 'add',
          variant: 'primary',
          onClick: () => alert('Add Item clicked!')
        },
        {
          id: 'refresh',
          label: 'Refresh',
          icon: 'refresh',
          variant: 'ghost',
          onClick: () => alert('Refresh clicked!'),
          iconOnly: true,
          placement: 'onHover'
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
export const centeredLayoutConfig: WidgemoConfig = {
  zones: {
    header: {
      enabled: true,
      layout: { preset: 'centered' },
      icon: { src: 'align-center', size: 20, color: '#a41540' },
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
          onClick: () => alert('Add Item clicked!')
        },
        {
          id: 'refresh',
          label: 'Refresh',
          icon: 'refresh',
          variant: 'secondary',
          onClick: () => alert('Refresh clicked!')
        },
        {
          id: 'export',
          label: 'Export',
          icon: 'export',
          variant: 'secondary',
          onClick: () => alert('Export clicked!')
        },
        {
          id: 'share',
          label: 'Share',
          icon: 'share',
          variant: 'secondary',
          onClick: () => alert('Share clicked!')
        }
      ]
    }
  }
};
// Moved outside to prevent recreation on every render, ensuring stable props for better performance.
export const customLayoutConfig: WidgemoConfig = {
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
          onClick: () => alert('Add Item clicked!')
        },
        {
          id: 'refresh',
          label: 'Refresh',
          icon: 'refresh',
          variant: 'secondary',
          onClick: () => alert('Refresh clicked!')
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
export const customLayoutWithCustomElementConfig: WidgemoConfig = {
  zones: {
    header: {
      enabled: true,
      title: 'Live Dashboard',
      subtitle: 'Real-time data with status indicator',
      actions: [
        {
          id: 'add',
          label: 'Add Item',
          icon: 'add',
          variant: 'primary',
          onClick: () => alert('Add Item clicked!')
        },
        {
          id: 'refresh',
          label: 'Refresh',
          icon: 'refresh',
          variant: 'secondary',
          onClick: () => alert('Refresh clicked!')
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
export const customLayoutVerticalConfig: WidgemoConfig = {
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
