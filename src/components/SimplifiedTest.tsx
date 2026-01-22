import React from 'react';
import { SimplifiedWidgemo, registerHook, registerIcon } from 'widgemo-core';
import type { ActionContext, Entity, SimplifiedWidgemoConfig } from 'widgemo-core';
import { teaserSampleData, imageGalleryData } from '../data/sampleData';
import {
  FaDatabase,
  FaPlus,
  FaSync,
  FaDownload,
  FaCog,
  FaTrash,
  FaEdit,
  FaEye,
  FaSearch,
  FaFilter,
  FaSort,
  FaChevronUp,
  FaChevronDown,
  FaUsers,
  FaTeamspeak,
  FaClock,
  FaSquare,
  FaHtml5,
  FaCentercode,
  FaPuzzlePiece
} from 'react-icons/fa';
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
// Register icons for the demo
registerIcon({
  name: 'database',
  component: FaDatabase,
  defaultProps: { size: 16 }
});
registerIcon({
  name: 'add',
  component: FaPlus,
  defaultProps: { size: 16 }
});
registerIcon({
  name: 'plus',
  component: FaPlus,
  defaultProps: { size: 16 }
});
registerIcon({
  name: 'refresh',
  component: FaSync,
  defaultProps: { size: 16 }
});
registerIcon({
  name: 'sync',
  component: FaSync,
  defaultProps: { size: 16 }
});
registerIcon({
  name: 'export',
  component: FaDownload,
  defaultProps: { size: 16 }
});
registerIcon({
  name: 'download',
  component: FaDownload,
  defaultProps: { size: 16 }
});
registerIcon({
  name: 'settings',
  component: FaCog,
  defaultProps: { size: 16 }
});
registerIcon({
  name: 'delete',
  component: FaTrash,
  defaultProps: { size: 16 }
});
registerIcon({
  name: 'trash',
  component: FaTrash,
  defaultProps: { size: 16 }
});
registerIcon({
  name: 'edit',
  component: FaEdit,
  defaultProps: { size: 16 }
});
registerIcon({
  name: 'view',
  component: FaEye,
  defaultProps: { size: 16 }
});
registerIcon({
  name: 'search',
  component: FaSearch,
  defaultProps: { size: 16 }
});
registerIcon({
  name: 'filter',
  component: FaFilter,
  defaultProps: { size: 16 }
});
registerIcon({
  name: 'sort',
  component: FaSort,
  defaultProps: { size: 16 }
});
registerIcon({
  name: 'chevron-up',
  component: FaChevronUp,
  defaultProps: { size: 16 }
});
registerIcon({
  name: 'chevron-down',
  component: FaChevronDown,
  defaultProps: { size: 16 }
});
registerIcon({
  name: 'users',
  component: FaUsers,
  defaultProps: { size: 16 }
});
registerIcon({
  name: 'teamspeak',
  component: FaTeamspeak,
  defaultProps: { size: 16 }
});
registerIcon({
  name: 'clock',
  component: FaClock,
  defaultProps: { size: 16 }
});
registerIcon({
  name: 'square',
  component: FaSquare,
  defaultProps: { size: 16 }
});
registerIcon({
  name: 'html5',
  component: FaHtml5,
  defaultProps: { size: 16 }
});
registerIcon({
  name: 'centercode',
  component: FaCentercode,
  defaultProps: { size: 16 }
});
registerIcon({
  name: 'centercode',
  component: FaCentercode,
  defaultProps: { size: 16 }
});
registerIcon({
  name: 'puzzle-piece',
  component: FaPuzzlePiece,
  defaultProps: { size: 16 }
});
// Extended ZoneConfig for board mode
type BoardContentConfig = {
  enabled: boolean;
  mode: 'board';
  columns: { id: string; label: string; filter: (item: Entity) => boolean }[];
  swimlanes: {
    groupBy: string;
    order: string[];
  };
  dragEnabled: boolean;
  actionsPosition: string;
  sortWithinColumn: string;
  item: {
    template: {
      sections: {
        title: string;
        fields: { key: string; label?: string; type: string }[];
      }[];
    };
  };
};
// Register icons at module level
registerIcon({
  name: 'database',
  component: FaDatabase,
  defaultProps: { size: 16 }
});
registerIcon({
  name: 'add',
  component: FaPlus,
  defaultProps: { size: 16 }
});
registerIcon({
  name: 'refresh',
  component: FaSync,
  defaultProps: { size: 16 }
});
registerIcon({
  name: 'export',
  component: FaDownload,
  defaultProps: { size: 16 }
});
registerIcon({
  name: 'settings',
  component: FaCog,
  defaultProps: { size: 16 }
});
registerIcon({
  name: 'delete',
  component: FaTrash,
  defaultProps: { size: 16 }
});
registerIcon({
  name: 'edit',
  component: FaEdit,
  defaultProps: { size: 16 }
});
registerIcon({
  name: 'view',
  component: FaEye,
  defaultProps: { size: 16 }
});
registerIcon({
  name: 'search',
  component: FaSearch,
  defaultProps: { size: 16 }
});
registerIcon({
  name: 'filter',
  component: FaFilter,
  defaultProps: { size: 16 }
});
registerIcon({
  name: 'sort',
  component: FaSort,
  defaultProps: { size: 16 }
});
registerIcon({
  name: 'chevron-up',
  component: FaChevronUp,
  defaultProps: { size: 16 }
});
registerIcon({
  name: 'chevron-down',
  component: FaChevronDown,
  defaultProps: { size: 16 }
});
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
                      icon: 'export',
                      onTrigger: () => alert('Export clicked!'),
                      iconOnly: true,
                      placement: 'discoverable'
                    }
                  ]
                },
                content: {
                  enabled: true,
                  title: 'Data Overview'
                },
                footer: {
                  enabled: true,
                  collapse: { initialState: 'fixed' },
                  title: 'Footer Information',
                  subtitle: 'Additional details and links'
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
                      order: ['title', 'icon', 'collapse', { type: 'spacer' }, 'subtitle','actions'],
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
                <li>Group 2: Primary actions in horizontal row</li>
                <li>Group 3: Secondary actions in separate horizontal row</li>
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
                      order: [
                        { type: 'group', elements: ['icon', 'title'], direction: 'horizontal' },
                        'subtitle',
                        { type: 'group', elements: ['actions'], direction: 'horizontal' }
                      ],
                      direction: 'vertical',
                      align: 'center',
                      gap: '0.5rem'
                    }
                  },
                  icon: { src: 'table', size: 24, color: '#6f42c1' },
                  title: 'Grouped Layout Demo',
                  subtitle: 'Icon and title grouped together, actions in separate rows',
                  actions: [
                    {
                      id: 'add',
                      label: 'Add Item',
                      icon: 'add',
                      variant: 'primary',
                      onTrigger: () => alert('Add Item clicked!')
                    },
                    {
                      id: 'edit',
                      label: 'Edit',
                      icon: 'edit',
                      variant: 'secondary',
                      onTrigger: () => alert('Edit clicked!')
                    },
                    {
                      id: 'refresh',
                      label: 'Refresh',
                      icon: 'refresh',
                      variant: 'ghost',
                      onTrigger: () => alert('Refresh clicked!'),
                      placement: 'discoverable'
                    },
                    {
                      id: 'export',
                      label: 'Export',
                      icon: 'export',
                      variant: 'success',
                      onTrigger: () => alert('Export clicked!'),
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
                footer: { enabled: false }
              }
            }}
          />
        </div>

        <div className="col-12 mb-4">
          <h2>Mode System Test - Table Mode</h2>
          <p>Testing ModeRenderer with table mode, sortable columns, and pagination.</p>
          <SimplifiedWidgemo
            data={teaserSampleData.slice(0, 8)} // Limit to 8 items for demo
            className="my-custom-widgemo"
            config={{
              zones: {
                header: {
                  enabled: true,
                  title: 'Table Mode Demo',
                  subtitle: 'Default Header Layout with Actions',
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
                    { field: 'name', header: 'Full Name', sortable: true, width: '200px' },
                    { field: 'email', header: 'Email Address', sortable: true, width: '250px' },
                    { field: 'role', header: 'Role', sortable: true, align: 'center' },
                    { field: 'department', header: 'Department', sortable: true },
                    { field: 'status', header: 'Active', align: 'center' }
                  ],
                  sort: { field: 'name', direction: 'asc' },
                  pagination: { page: 1, pageSize: 5 },
                  tableActions: {
                    item: [
                      {
                        id: 'edit',
                        label: 'Edit',
                        icon: 'edit',
                        variant: 'ghost',
                        handler: (context: ActionContext) => alert(`Edit ${context.entity?.name}`)
                      },
                      {
                        id: 'delete',
                        label: 'Delete',
                        icon: 'delete',
                        variant: 'danger',
                        handler: (context: ActionContext) => alert(`Delete ${context.entity?.name}`)
                      }
                    ]
                  },
                  actionsColumn: true,
                  hooks: {
                    onSort: (field: string, direction: 'asc' | 'desc') => console.log(`Sort by ${field} ${direction}`),
                    preRowRender: (entity: Entity) => ({ ...entity, status: entity.status ? 'Yes' : 'No' })
                  }
                },
                footer: { enabled: false }
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
                  ],
                  swimlanes: {
                    groupBy: 'assignee',
                    order: ['Alice', 'Bob', 'Charlie']
                  },
                  dragEnabled: true,
                  actionsPosition: 'hover',
                  sortWithinColumn: 'priority',
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
                } as BoardContentConfig, // Board mode requires different column config
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
// Story testing export - TableMode example
export const TableModeExample = () => (
  <div style={{ padding: '20px' }}>
    <h3>TableMode Example</h3>
    <SimplifiedWidgemo
      data={teaserSampleData.slice(0, 5)}
      className="my-custom-widgemo"
      config={{
        zones: {
          header: {
            enabled: true,
            title: 'User Management',
            subtitle: 'Sortable table with actions'
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
                  handler: (context: ActionContext) => alert(`View ${context.entity?.name}`)
                },
                {
                  id: 'edit',
                  label: 'Edit',
                  icon: 'edit',
                  variant: 'primary',
                  handler: (context: ActionContext) => alert(`Edit ${context.entity?.name}`)
                }
              ]
            },
            actionsColumn: true
          },
          footer: { enabled: false }
        }
      }}
    />
  </div>
);
// Story testing export - React Element Title Example
export const ReactElementTitleExample = () => (
  <div style={{ padding: '20px' }}>
    <h3>React Element Title Example</h3>
    <SimplifiedWidgemo
      data={teaserSampleData.slice(0, 3)}
      className="my-custom-widgemo"
      config={{
        zones: {
          header: {
            enabled: true,
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
            enabled: true,
            mode: 'table',
            columns: [
              { field: 'name', header: 'Name', sortable: true },
              { field: 'email', header: 'Email', sortable: true },
              { field: 'role', header: 'Role', align: 'center' }
            ]
          },
          footer: { enabled: false }
        }
      }}
    />
  </div>
);
