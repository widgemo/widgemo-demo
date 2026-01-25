import React from 'react';
import { SimplifiedWidgemo, registerHook, registerIcon } from 'widgemo-core';
import type { ActionContext, Entity, SimplifiedWidgemoConfig, ColumnConfig, BoardColumnConfig } from 'widgemo-core';
import { teaserSampleData, imageGalleryData } from '../data/sampleData';
import { fontAwesomeRenderIcon } from '../utils/fontAwesomeIconRenderer';
import { FaPlus, FaEdit, FaSync, FaDownload, FaWifi } from 'react-icons/fa';
import { FaUserSlash } from 'react-icons/fa6';
// Extend Window interface for performance metrics
declare global {
  interface Window {
    lastRenderTime?: number;
    lastRenderCount?: number;
    performanceMeasured?: boolean;
  }
}
// Global variable to store pending metrics
let pendingMetrics: { time: number; count: number } | null = null;
// Register performance monitoring hooks at module level
let renderCount = 0;
let renderQueue: number[] = [];
// Pre-render hook to start timing
registerHook({
  name: 'preRender',
  hook: (...args: unknown[]) => {
    const [componentName] = args as [string, { data: Entity[]; config?: SimplifiedWidgemoConfig; className?: string }];
    if (componentName === 'Widgemo') {
      renderCount++;
      renderQueue.push(renderCount);
      const markName = `widgemo-render-${renderCount}-start`;
      performance.mark(markName);
    }
  }
});
// Post-render hook to measure and log performance
registerHook({
  name: 'postRender',
  hook: (...args: unknown[]) => {
    const renderId = renderQueue.shift();
    if (renderId) {
      const markName = `widgemo-render-${renderId}-end`;
      performance.mark(markName);
      try {
        const measureName = `widgemo-render-${renderId}`;
        performance.measure(measureName, `widgemo-render-${renderId}-start`, markName);
        const measure = performance.getEntriesByName(measureName)[0];
        const duration = measure.duration;
        console.log(`⏱️ Render #${renderId} completed in ${duration.toFixed(2)}ms`);
        // Store in global for potential display
        window.lastRenderTime = duration;
        window.lastRenderCount = renderId;
      } catch (error) {
        console.warn('Performance measurement error:', error);
      }
    }
    // Also check for component-specific mark
    if (performance.getEntriesByName('widgemo-start').length > 0) {
      performance.mark('widgemo-end');
      try {
        performance.measure('widgemo-total', 'widgemo-start', 'widgemo-end');
        const measure = performance.getEntriesByName('widgemo-total')[0];
        const duration = measure.duration;
        console.log(`⏱️ Total Widgemo render completed in ${duration.toFixed(2)}ms`);
        // Store metrics in global variable for component to consume
        pendingMetrics = { time: duration, count: 1 };
        // Set flag to prevent further measurements
        window.performanceMeasured = true;
        // Clear marks to prevent repeated measurements
        performance.clearMarks('widgemo-start');
        performance.clearMarks('widgemo-end');
        performance.clearMeasures('widgemo-total');
      } catch (error) {
        console.warn('Performance measurement error for widgemo-total:', error);
      }
    }
    return args[1] as React.ReactElement;
  }
});
// Register FontAwesome icons for the demo - overrides widgemo-core defaults

// Register FontAwesome versions of common icons to override widgemo-core defaults
const iconNames = [
  'database', 'add', 'plus', 'refresh', 'sync', 'download', 'settings',
  'delete', 'trash', 'edit', 'view', 'search', 'filter', 'sort', 'chevron-up',
  'chevron-down', 'users', 'teamspeak', 'clock', 'square', 'html5', 'centercode',
  'puzzle-piece', 'chart-line', 'chart-bar', 'chart-pie', 'table', 'th', 'columns',
  'copy', 'upload', 'random', 'external-link-alt', 'book', 'check', 'undo',
  'ellipsis-vertical', 'question-circle', 'star', 'heart', 'currency-dollar', 'dollar-sign'
];

iconNames.forEach(iconName => {
  registerIcon({
    name: iconName,
    component: (props) => fontAwesomeRenderIcon({ name: iconName, ...props }), // Wrap to match expected signature
    defaultProps: { size: 16, color: 'currentColor' }
  });
});
interface TaskEntity {
  id: number;
  name: string;
  progress: number;
  priority: 'low' | 'medium' | 'high' | 'critical';
  size: 'small' | 'medium' | 'large';
}

export const SimplifiedTest: React.FC = () => {
  const [lastRenderMetrics, setLastRenderMetrics] = React.useState<{ time: number; count: number } | null>(null);
  // Check for pending metrics after component mounts
  React.useEffect(() => {
    if (pendingMetrics) {
      setLastRenderMetrics(pendingMetrics);
      pendingMetrics = null;
    }
  }, []);
  // Cleanup on unmount
  React.useEffect(() => {
    // Reset performance measurement flag on mount
    window.performanceMeasured = false;
    return () => {
      // Clear any remaining performance entries
      renderQueue = [];
      try {
        for (let i = 1; i <= 10; i++) {
          performance.clearMarks(`widgemo-render-${i}-start`);
          performance.clearMarks(`widgemo-render-${i}-end`);
          performance.clearMeasures(`widgemo-render-${i}`);
        }
      } catch (error) {
        // Ignore cleanup errors
        console.warn('Cleanup error:', error);
      }
    };
  }, []);
  return (
    <div className="container mt-5">
      <style>{`
        .my-custom-widgemo {
          background-color: var(--bg-color);
          border: 1px solid var(--border-color);
          border-radius: 0.375rem;
          box-shadow: 0px 0px 8px var(--shadow-color);
          padding: 0.5rem;
        }
        .custom-footer-class {
          background-color: #d5d5d5;
          border-radius: 0.25rem;
          padding: 0.3rem;
        }
        .custom-footer-class .zone-title {
          font-size: 14px; 
          color: #065193;
          padding-left: 0.5rem;
        }
        .custom-footer-class .zone-subtitle {
          font-size: 14px; 
          color: #333334;
        }
      `}</style>
      <h1 className="mb-4">Widgemo Product Primitive - ZoneRenderer Test</h1>
      <div className="row">
        <div className="col-12 mb-4">
          <h2>Collapsible Header Zone</h2>
          <p>Testing ZoneRenderer with default header layout:</p>
          <ul>
            <li>Custom className: background-color, border, shadow, padding</li>
            <li>Header Zone: Default Layout
              <ul>
                <li>Collapsible - Expanded</li>
                <li>Icon</li>
                <li>Dynamic subtitle (includes data length)</li>
                <li>Actions: Add User (primary), Refresh (icon only - ghost - discoverable), Export (icon only - ghost - discoverable)</li>
              </ul>
            </li>
            <li>Content Zone: Default Mode
              <ul>
                <li>Title</li>
              </ul>
            </li>
            <li>Footer Zone: Default Layout
              <ul>
                <li>Non-collapsible - Fixed</li>
                <li>Title</li>
                <li>Subtitle</li>
              </ul>
            </li>
          </ul>
          <SimplifiedWidgemo
            data={teaserSampleData}
            className="my-custom-widgemo"
            config={{
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
            }}
          />
        </div>
        <div className="col-12 mb-4">
          <h2>Fixed Header Zone</h2>
          <p>Testing ZoneRenderer with fixed (non-collapsible) header and custom-footer-class with footer actions.</p>
          <ul>
            <li>Custom className: background-color, border, shadow, padding</li>
            <li>Header Zone: Default Layout
              <ul>
                <li>Non-Collapsible - Fixed</li>
                <li>Icon</li>
                <li>Title and Subtitle</li>
              </ul>
              <li>Content Zone: Default Mode
              </li>
              <li>Footer Zone: Default Layout
                <ul>
                  <li>Non-collapsible - Fixed</li>
                  <li>Custom className - Background color, round corners, colored text</li>
                  <li>Dynamic title (includes data length)</li>
                  <li>Actions: Export Data (primary), Refresh (icon only - ghost - discoverable)</li>
                </ul>
              </li>
            </li>
          </ul>
          <SimplifiedWidgemo
            data={teaserSampleData.slice(0, 2)}
            className="my-custom-widgemo"
            config={{
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
            }}
          />
        </div>

        <div className="col-12 mb-4">
          <h2>React Element Title Example</h2>
          <p>Testing ZoneRenderer with React elements in title and subtitle for rich formatting and
            <ul>
              <li>Custom className: background-color, border, shadow, padding</li>
              <li>Header Zone: Default Layout
                <ul>
                  <li>Collapsible - Expanded</li>
                  <li>Icon</li>
                  <li>Title and Subtitle - HTML/React Element</li>
                  <li>Actions: Add User (primary), Refresh (icon only - ghost - discoverable), Export Data (icon only - ghost - discoverable)</li>
                </ul>
                <li>Content Zone: Default Mode
                </li>
                <li>Footer Zone: Disabled
                </li>
              </li>
            </ul>
          </p>
          <SimplifiedWidgemo
            data={teaserSampleData.slice(0, 4)}
            className="my-custom-widgemo"
            config={{
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
            }}
          />
        </div>

        <div className="col-12 mb-4">
          <h2>Actions System Test</h2>
          <p>Testing ActionsRenderer with core actions registry and menu dropdown.</p>
          <ul>
            <li>Custom className: background-color, border, shadow, padding</li>
            <li>Header Zone: Default Layout
              <ul>
                <li>Collapsible - Collapsed</li>
                <li>Icon</li>
                <li>Title / Subtitle</li>
                <li>Actions: Add Item (primary), Refresh (secondary), Export (icon only - ghost), Chart Mode (icon only - success), Settings (discoverable - danger), View All (menu), Bar Chart Mode (menu)</li>
              </ul>
              <li>Content Zone: Default Mode
              </li>
              <li>Footer Zone: Not enabled
              </li>
            </li>
          </ul>
          <SimplifiedWidgemo
            data={teaserSampleData}
            className="my-custom-widgemo"
            config={{
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
            }}
          />
        </div>

        <div className="col-12 mb-4">
          <h2>Zone Layouts Test - Compact Layout</h2>
          <p>Testing compact header layout with smaller elements and actions.</p>
          <ul>
            <li>Custom className: background-color, border, shadow, padding</li>
            <li>Header Zone: Compact Layout
              <ul>
                <li>Collapsible - Expanded</li>
                <li>Icon</li>
                <li>Title only - Subtitle ignored</li>
                <li>Actions: Add Item (primary), Refresh (icon only - ghost - discoverable), Delete All (menu) - Discoverable and Fixed actions are all discoverable and icon only.</li>
              </ul>
              <li>Content Zone: Table Mode
              </li>
              <li>Footer Zone: Disabled
              </li>
            </li>
          </ul>
          <SimplifiedWidgemo
            data={teaserSampleData.slice(0, 5)}
            className="my-custom-widgemo"
            config={{
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
            }}
          />
        </div>

        <div className="col-12 mb-4">
          <h2>Zone Layouts Test - Minimal Layout</h2>
          <p>Testing minimal header layout with title only and collapse button.</p>
          <ul>
            <li>Custom className: background-color, border, shadow, padding</li>
            <li>Header Zone: Minimal Layout
              <ul>
                <li>Collapsible - Expanded</li>
                <li>Icon - ignored</li>
                <li>Title only - Subtitle ignored</li>
                <li>Actions - All as menu actions</li>
              </ul>
              <li>Content Zone: Table Mode
              </li>
              <li>Footer Zone: Disabled
              </li>
            </li>
          </ul>
          <SimplifiedWidgemo
            data={teaserSampleData.slice(0, 5)}
            className="my-custom-widgemo"
            config={{
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
            }}
          />
        </div>

        <div className="col-12 mb-4">
          <h2>Zone Layouts Test - Centered Layout</h2>
          <p>Testing centered header layout with footer actions.</p>
          <ul>
            <li>Custom className: background-color, border, shadow, padding</li>
            <li>Header Zone: Centered Layout
              <ul>
                <li>Collapsible - Expanded</li>
                <li>Icon</li>
                <li>Title & Subtitle - Top/Bottom</li>
              </ul>
              <li>Content Zone: Table Mode
              </li>
              <li>Footer Zone: Centered layout
                <ul>
                  <li>Actions: Add Item (primary), Refresh (secondary), Export (secondary), Share (secondary)</li>
                </ul>
              </li>
            </li>
          </ul>
          <SimplifiedWidgemo
            data={teaserSampleData.slice(0, 5)}
            className="my-custom-widgemo"
            config={{
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
            }}
          />
        </div>

        <div className="col-12 mb-4">
          <h2>Custom Layout Test</h2>
          <p>Testing ZoneRenderer with a custom layout configuration using the layout.custom property.</p>
          <ul>
            <li>Header Zone: Custom Layout
              <ul>
                <li>Layout: Custom order [title, icon, collapse, spacer, subtitle, actions]</li>
                <li>Title + Subtitle</li>
                <li>Actions: Add Item (primary), Refresh (secondary)</li>
              </ul>
            </li>
            <li>Content Zone: Enabled
            </li>
            <li>Footer Zone: Disabled
            </li>
          </ul>
          <SimplifiedWidgemo
            data={teaserSampleData.slice(0, 5)}
            className="my-custom-widgemo"
            config={{
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
            }}
          />
        </div>

        <div className="col-12 mb-4">
          <h2>Custom Layout with Custom Element</h2>
          <p>Testing ZoneRenderer with a custom layout that includes a custom React element using type: 'custom'.</p>
          <ul>
            <li>Header Zone: Custom Layout with Custom Element
              <ul>
                <li>Layout: Custom order [title, custom element, spacer, actions]</li>
                <li>Custom Element: A styled badge showing "LIVE" status</li>
                <li>Actions: Add Item (primary), Refresh (secondary)</li>
              </ul>
            </li>
            <li>Content Zone: Enabled
            </li>
            <li>Footer Zone: Disabled
            </li>
          </ul>
          <SimplifiedWidgemo
            data={teaserSampleData.slice(0, 5)}
            className="my-custom-widgemo"
            config={{
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
            }}
          />
        </div>

        <div className="col-12 mb-4">
          <h2>Custom Layout with Vertical Direction</h2>
          <p>Testing ZoneRenderer with a custom layout using direction: 'vertical' for stacked elements.</p>
          <ul>
            <li>Header Zone: Vertical Custom Layout
              <ul>
                <li>Layout: direction: 'vertical', order [title, subtitle, actions]</li>
                <li>All elements stacked vertically and centered</li>
                <li>Actions: Add Item (primary), Refresh (secondary), Export (secondary)</li>
              </ul>
            </li>
            <li>Content Zone: Enabled
            </li>
            <li>Footer Zone: Disabled
            </li>
          </ul>
          <SimplifiedWidgemo
            data={teaserSampleData.slice(0, 5)}
            className="my-custom-widgemo"
            config={{
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
            }}
          />
        </div>

        <div className="col-12 mb-4">
          <h2>Custom Layout with Groups</h2>
          <p>Testing ZoneRenderer with grouped elements using type: 'group' for complex layouts.</p>
          <ul>
            <li>Header Zone: Custom Layout with Groups
              <ul>
                <li>Layout: Groups for icon+title together, and separate action rows</li>
                <li>Group 1: Icon and title in same horizontal row</li>
                <li>Subtitle: Below the icon+title group</li>
                <li>Group 2: Primary actions (Add, Edit) in horizontal row - via custom element</li>
                <li>Group 3: Secondary actions (Refresh, Export) in separate horizontal row - via custom element</li>
              </ul>
            </li>
            <li>Content Zone: Enabled
            </li>
            <li>Footer Zone: Disabled
            </li>
          </ul>
          <SimplifiedWidgemo
            id="grouped-layout-demo"
            data={teaserSampleData.slice(0, 5)}
            className="my-custom-widgemo"
            config={{
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
            }}
          />
        </div>

        <div className="col-12 mb-4">
          <h2>Headless Widgemo Example</h2>
          <p>Testing a widgemo with no header zone enabled - exploring how to make actions available.</p>
          <ul>
            <li>Header Zone: Disabled (headless)
            </li>
            <li>Content Zone: Enabled with Grid mode
            </li>
            <li>Footer Zone: Enabled with actions (exploring alternative action placement)
              <ul>
                <li>Footer contains actions since header is disabled</li>
                <li>This demonstrates how actions can be placed in footer when header is not available</li>
              </ul>
            </li>
          </ul>
          <SimplifiedWidgemo
            id="headless-demo"
            data={teaserSampleData.slice(0, 6)}
            className="my-custom-widgemo"
            config={{
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
            }}
          />
        </div>

        <div className="col-12 mb-4">
          <h2>Widgemo Instance ID Demo</h2>
          <p>Testing widgemo instance ID support in action callbacks.</p>
          <ul>
            <li>Header Zone: Default layout with actions that log widgemoId
              <ul>
                <li>Actions demonstrate widgemoId parameter in onTrigger callbacks</li>
                <li>Check browser console for logged widgemoId values</li>
              </ul>
            </li>
            <li>Content Zone: Enabled
            </li>
            <li>Footer Zone: Disabled
            </li>
          </ul>
          <SimplifiedWidgemo
            id="instance-id-demo"
            data={teaserSampleData.slice(0, 3)}
            className="my-custom-widgemo"
            config={{
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
            }}
          />
        </div>

        <div className="col-12 mb-4">
          <h2>Mode System Test - Grid Mode with ItemRenderer</h2>
          <p>Testing ModeRenderer with grid mode, configurable columns, and ItemRenderer templates.</p>
          <SimplifiedWidgemo
            data={teaserSampleData.slice(0, 6)} // Limit to 6 items for better demo
            className="my-custom-widgemo"
            config={{
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
                  }
                },
                footer: { enabled: false}

              }
            }}
          />
        </div>

        <div className="col-12 mb-4">
          <h2>Mode - Table - Alternating</h2>
          <p>Table mode with alternating row backgrounds, sortable columns, and item actions.</p>
          <ul>
            <li>Custom className: background-color, border, shadow, padding</li>
            <li>Header Zone: Default Layout
              <ul>
                <li>Collapsible - Expanded</li>
                <li>Title + Subtitle</li>
                <li>Actions</li>
              </ul>
              <li>Content Zone: Table Mode
                <ul>
                  <li>Alternating Background - Enabled</li>
                  <li>Default Sorting - Last Login - Descending</li>
                  <li>Sortable Columns - All</li>
                  <li>Custom Choices for Active column - include icons</li>
                  <li>Actions column - enabled</li>
                  <ul>
                    <li>Edit - icons only - ghost</li>
                    <li>View Details - discoverable - secondary</li>
                    <li>Delete - menu</li>
                  </ul>
                </ul>
              </li>
              <li>Footer Zone: Disabled
              </li>
            </li>
          </ul>
          <SimplifiedWidgemo
            id='table-alternating-demo'
            data={teaserSampleData.slice(0, 8)} // Limit to 8 items for demo
            className="my-custom-widgemo"
            config={{
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
                  sort: { field: 'lastLogin', direction: 'desc' },
                  pagination: { page: 1, pageSize: 5 },
                  tableActions: {
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
                  },
                  actionsColumn: true,
                  alternatingRows: true,
                  rowSeparator: false,
                  hooks: {
                    onSort: (field: string, direction: 'asc' | 'desc') => console.log(`Sort by ${field} ${direction}`)
                  }
                },
                footer: { 
                  enabled: true, 
                  subtitle: (_data, id) => `widgemo.id: ${JSON.stringify(id)}` 
                }
              }
            }}
          />
        </div>

        <div style={{ padding: '20px' }}>
          <h2>Mode - Table Mode - Row Dividers</h2>
          <p>Table mode with row dividers only, sortable columns, and item actions.</p>
          <ul>
            <li>Custom className: background-color, border, shadow, padding</li>
            <li>Header Zone: Default Layout
              <ul>
                <li>Collapsible - Expanded</li>
                <li>Title + Subtitle</li>
              </ul>
              <li>Content Zone: Table Mode
                <ul>
                  <li>Alternating Background - Disabled</li>
                  <li>Sortable Columns (Name and Email)</li>
                  <li>Actions column - enabled</li>
                  <ul>
                    <li>View Details - ghost</li>
                    <li>Edit - icons only - primary</li>
                    <li>Delete - menu</li>
                  </ul>
                </ul>
              </li>
              <li>Footer Zone: Disabled
              </li>
            </li>
          </ul>
          <SimplifiedWidgemo
            id='table-row-dividers-demo'
            data={teaserSampleData.slice(0, 5)}
            className="my-custom-widgemo"
            config={{
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
                  tableActions: {
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
                  },
                  actionsColumn: true,
                  alternatingRows: false,
                  rowSeparator: true
                },
                footer: { 
                  enabled: true, 
                  subtitle: (_data, id) => `widgemo.id: ${JSON.stringify(id)}` 
                }
              }
            }}
          />
        </div>

        <div style={{ padding: '20px' }}>
          <h2>Mode - Table Mode - Plain</h2>
          <p>Table mode with no row markings, sortable columns, and item actions.</p>
          <ul>
            <li>Custom className: background-color, border, shadow, padding</li>
            <li>Header Zone: Default Layout
              <ul>
                <li>Collapsible - Expanded</li>
                <li>Title + Subtitle</li>
                <li>Actions</li>
              </ul>
              <li>Content Zone: Table Mode
                <ul>
                  <li>Alternating Background - Disabled</li>
                  <li>Sortable Columns (Name and Email)</li>
                  <li>Actions column - enabled</li>
                  <ul>
                    <li>View - ghost</li>
                  </ul>
                </ul>
              </li>
              <li>Footer Zone: Disabled
              </li>
            </li>
          </ul>
          <SimplifiedWidgemo
            id='table-plain-demo'
            data={teaserSampleData.slice(0, 5)}
            className="my-custom-widgemo"
            config={{
              zones: {
                header: {
                  enabled: true,
                  title: 'User Management',
                  subtitle: 'Sortable table with actions - Alternating Row Backgrounds & Separators Disabled'
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
                  tableActions: {
                    item: [
                      {
                        id: 'view',
                        label: 'View',
                        icon: 'view',
                        variant: 'ghost',
                        // placement: 'always',
                        handler: (context: ActionContext) => alert(`View ${context.entity?.name}`)
                      }
                    ]
                  },
                  actionsColumn: true,
                  alternatingRows: false,
                  rowSeparator: false
                },
                footer: { 
                  enabled: true, 
                  subtitle: (_data, id) => `widgemo.id: ${JSON.stringify(id)}` 
                }
              }
            }}
          />
        </div>

        <div className="col-12 mb-4">
          <h2>FieldRenderer Test - Type-Specific Rendering</h2>
          <p>Testing FieldRenderer with different field types including images with lightbox functionality.</p>
          <SimplifiedWidgemo
            data={teaserSampleData.slice(0, 4)} // Use first 4 users with images
            className="my-custom-widgemo"
            config={{
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
            }}
          />
        </div>

        <div className="col-12 mb-4">
          <h2>Image Gallery - FieldRenderer Lightbox</h2>
          <p>Testing FieldRenderer image type with lightbox functionality using dedicated image data.</p>
          <SimplifiedWidgemo
            data={imageGalleryData.slice(0, 6)} // Use first 6 images
            className="my-custom-widgemo"
            config={{
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
            }}
          />
        </div>

        <div className="col-12 mb-4">
          <h2>FieldRenderer Test - Progress Bar Fields</h2>
          <p>Testing FieldRenderer with progress bar field type showing completion percentages with custom styling.</p>
          <SimplifiedWidgemo
            data={[
              { id: 1, name: 'Task A', progress: 75, status: 'in-progress', priority: 'high' },
              { id: 2, name: 'Task B', progress: 30, status: 'started', priority: 'medium' },
              { id: 3, name: 'Task C', progress: 100, status: 'completed', priority: 'low' },
              { id: 4, name: 'Task D', progress: 0, status: 'not-started', priority: 'high' },
              { id: 5, name: 'Task E', progress: 45, status: 'in-progress', priority: 'medium' },
              { id: 6, name: 'Task F', progress: 90, status: 'review', priority: 'low' },
              { id: 7, name: 'Task G', progress: -5, status: 'error', priority: 'high' }, // Test negative value
              { id: 8, name: 'Task H', progress: 150, status: 'overflow', priority: 'low' } // Test >100 value
            ]}
            className="my-custom-widgemo"
            config={{
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
                    { field: 'progress', header: 'Progress', type: 'progress', progressOptions: { color: '#28a745', showPercentage: true } },
                    { field: 'status', header: 'Status', align: 'center' },
                    { field: 'priority', header: 'Priority', align: 'center' }
                  ] as ColumnConfig[]
                },
                footer: { enabled: false }
              }
            }}
          />
        </div>

        <div className="col-12 mb-4">
          <h2>FieldRenderer Test - Progress Bar Variants</h2>
          <p>Testing different progress bar configurations with custom colors, heights, and text options.</p>
          <SimplifiedWidgemo
            data={[
              { id: 1, name: 'Standard Progress', progress: 65, color: '#007bff' },
              { id: 2, name: 'Success Progress', progress: 80, color: '#28a745' },
              { id: 3, name: 'Warning Progress', progress: 45, color: '#ffc107' },
              { id: 4, name: 'Danger Progress', progress: 25, color: '#dc3545' },
              { id: 5, name: 'No Text Progress', progress: 70, color: '#6f42c1', showText: false },
              { id: 6, name: 'Tall Progress', progress: 55, color: '#20c997', height: '30px' }
            ]}
            className="my-custom-widgemo"
            config={{
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
                      type: 'progress'
                    }
                  ] as ColumnConfig[]
                },
                footer: { enabled: false }
              }
            }}
          />
        </div>

        <div className="col-12 mb-4">
          <h2>FieldRenderer Test - Progress Bar Functions</h2>
          <p>Testing function-based progressOptions that compute values dynamically based on entity data.</p>
          <SimplifiedWidgemo
            data={[
              { id: 1, name: 'High Priority Task', progress: 85, priority: 'high', size: 'large' },
              { id: 2, name: 'Medium Priority Task', progress: 60, priority: 'medium', size: 'medium' },
              { id: 3, name: 'Low Priority Task', progress: 30, priority: 'low', size: 'small' },
              { id: 4, name: 'Critical Task', progress: 95, priority: 'critical', size: 'large' },
              { id: 5, name: 'Normal Task', progress: 45, priority: 'medium', size: 'medium' }
            ]}
            className="my-custom-widgemo"
            config={{
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
                      type: 'progress',
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
            }}
          />
        </div>

        <div className="col-12 mb-4">
          <h2>FieldRenderer Test - Rating Field</h2>
          <p>Testing rating field type with star-based visual display, supporting half-stars and customizable options.</p>
          <SimplifiedWidgemo
            data={[
              { id: 1, name: 'Product A', rating: 4.5, hearts: 3, cost: 5, reviews: 128 },
              { id: 2, name: 'Product B', rating: 3, hearts: 4.5, cost: 1, reviews: 45 },
              { id: 3, name: 'Product C', rating: 5, hearts: 2, cost: 1.6, reviews: 89 },
              { id: 4, name: 'Product D', rating: 0, hearts: 5, cost: 2.1, reviews: 0 },
              { id: 5, name: 'Product E', rating: 2.5, hearts: 1.5, cost: 0.8, reviews: 67 }
            ]}
            className="my-custom-widgemo"
            config={{
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
                    { field: 'rating', header: 'Rating', type: 'rating', align: 'center',
                      ratingOptions: {
                        //max: 8,
                        //color: '#ff5107',
                        emptyColor: 'var(--bg-color)',
                        size: 20
                        //iconName: 'star'
                      }
                     },
                    { field: 'hearts', header: 'Hearts', type: 'rating', align: 'center',
                      ratingOptions: {
                        max: 5,
                        color: '#e91e63',
                        emptyColor: '#fdbfd4',
                        size: 18,
                        iconName: 'heart'
                      }
                     },
                     { field: 'cost', header: 'Cost', type: 'rating', align: 'center',
                      ratingOptions: {
                        max: 5,
                        color: '#0f6005',
                        emptyColor: 'var(--bg-color)',
                        //size: 18,
                        iconName: 'dollar-sign'
                      }
                     },
                    { field: 'reviews', header: 'Reviews', align: 'center' }
                  ] as ColumnConfig[]
                },
                footer: { enabled: false }
              }
            }}
          />
        </div>

        <div className="col-12 mb-4">
          <h2>CarouselMode - Swipeable Carousel</h2>
          <p>Testing CarouselMode with drag gestures, navigation arrows, and indicators. Drag or use arrows to navigate.</p>
          <SimplifiedWidgemo
            data={teaserSampleData.slice(0, 5)} // Use first 5 users for carousel
            className="my-custom-widgemo"
            config={{
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
            }}
          />
        </div>

        <div className="col-12 mb-4">
          <h2>Field Type Registry - Swatch Example</h2>
          <p>Testing the field type registry with custom 'swatch' field type for color display.</p>
          <SimplifiedWidgemo
            data={[
              { id: 1, name: 'Primary Color', color: '#007bff', description: 'Brand primary color' },
              { id: 2, name: 'Success Color', color: '#28a745', description: 'Success state color' },
              { id: 3, name: 'Warning Color', color: '#ffc107', description: 'Warning state color' },
              { id: 4, name: 'Danger Color', color: '#dc3545', description: 'Error state color' },
            ]}
            className="my-custom-widgemo"
            config={{
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
            }}
          />
        </div>

        <div className="col-12 mb-4">
          <h2>Hooks System Test - Pre/Post Render</h2>
          <p>Testing preRender and postRender hooks for customization. Check console for hook execution logs.</p>
          <SimplifiedWidgemo
            data={teaserSampleData.slice(0, 4)}
            className="my-custom-widgemo"
            config={{
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
            }}
          />
        </div>

        <div className="col-12 mb-4">
          <h2>Performance Monitoring - Pre/Post Render Hooks</h2>
          <p>Testing preRender and postRender hooks for performance monitoring. Check console for logs and see live performance metrics below.</p>
          <SimplifiedWidgemo
            id="performance-monitoring-demo"
            data={teaserSampleData.slice(0, 8)}
            className="my-custom-widgemo"
            config={{
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
                  rowSeparator: false,
                  columns: [
                    { field: 'name', header: 'Name', sortable: true },
                    { field: 'email', header: 'Email', sortable: true },
                    { field: 'role', header: 'Role', align: 'center' },
                    { field: 'department', header: 'Department', sortable: true }
                  ],
                  pagination: { page: 1, pageSize: 5 }
                },
                footer: {
                  enabled: true,
                  title: 'Performance Stats',
                  subtitle: lastRenderMetrics
                    ? `Last render: ${lastRenderMetrics.time.toFixed(2)}ms (render #${lastRenderMetrics.count})`
                    : 'Check browser console for timing data'
                }
              }
            }}
          />
          {lastRenderMetrics && (
            <div className="mt-3 p-3 bg-light rounded">
              <h6>Live Performance Metrics:</h6>
              <ul className="mb-0">
                <li><strong>Render Time:</strong> {lastRenderMetrics.time.toFixed(2)}ms</li>
                <li><strong>Render Count:</strong> #{lastRenderMetrics.count}</li>
                <li><strong>Status:</strong>
                  {lastRenderMetrics.time > 100 ? '🐌 Slow (>100ms)' :
                    lastRenderMetrics.time > 16.67 ? '⚡ OK (60fps)' : '🚀 Fast (<16.67ms)'}
                </li>
              </ul>
            </div>
          )}
        </div>

        <div className="col-12 mb-4">
          <h2>BoardMode - Kanban Board</h2>
          <p>Testing BoardMode with drag-and-drop functionality, swimlanes, and configurable columns for task management.</p>
          <SimplifiedWidgemo
            data={[
              { id: 1, name: 'Design homepage mockup', status: 'todo', priority: 'high', assignee: 'Alice' },
              { id: 2, name: 'Implement user authentication', status: 'in-progress', priority: 'high', assignee: 'Bob' },
              { id: 3, name: 'Write API documentation', status: 'review', priority: 'medium', assignee: 'Alice' },
              { id: 4, name: 'Fix mobile responsiveness', status: 'done', priority: 'low', assignee: 'Charlie' },
              { id: 5, name: 'Add unit tests', status: 'todo', priority: 'medium', assignee: 'Bob' },
              { id: 6, name: 'Setup CI/CD pipeline', status: 'in-progress', priority: 'high', assignee: 'Alice' },
              { id: 7, name: 'Database optimization', status: 'review', priority: 'medium', assignee: 'Charlie' },
              { id: 8, name: 'User feedback integration', status: 'todo', priority: 'low', assignee: 'Bob' }
            ]}
            className="my-custom-widgemo"
            config={{
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
            }}
          />
        </div>

      </div>
    </div>
  );
};
export default SimplifiedTest;
