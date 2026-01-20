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
  FaUsers
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
          border: 1px solid #e1e5e9;
          border-radius: 0.375rem;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
          padding: 0.5rem;
        }
        
        .custom-footer-class .zone-title {
          font-size: 14px; 
          color: #0c7ee2;
        }
      `}</style>
      <h1 className="mb-4">ZoneRenderer Test - Widgemo Product Primitive [CACHE BUST]</h1>
      <div className="row">
        <div className="col-12 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Collapsible Header Zone</h5>
              <p className="card-text">Testing ZoneRenderer with collapse functionality, icon, and dynamic title.</p>
              <SimplifiedWidgemo
                data={teaserSampleData}
                className="my-custom-widgemo"
                config={{
                  zones: {
                    header: {
                      enabled: true,
                      collapse: { initialState: 'expanded', button: true },
                      icon: { src: 'database', size: 24, color: '#c4530d' },
                      title: (data) => `User Database (${data.length} users)`,
                      subtitle: 'Manage your team members',
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
          </div>
        </div>

        <div className="col-12 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Fixed Header Zone</h5>
              <p className="card-text">Testing ZoneRenderer with fixed (non-collapsible) header and custom-footer-class with footer actions.</p>
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
                    }
                  }
                }}
              />
            </div>
          </div>
        </div>

        <div className="col-12 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Actions System Test</h5>
              <p className="card-text">Testing ActionsRenderer with core actions registry and menu dropdown.</p>
              <SimplifiedWidgemo
                data={teaserSampleData}
                className="my-custom-widgemo"
                config={{
                  zones: {
                    header: {
                      enabled: true,
                      title: 'Actions Demo',
                      //subtitle: 'Core actions with menu',
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
                          variant: 'primary',
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
          </div>
        </div>

        <div className="col-12 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Mode System Test - Grid Mode with ItemRenderer</h5>
              <p className="card-text">Testing ModeRenderer with grid mode, configurable columns, and ItemRenderer templates.</p>
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
          </div>
        </div>

        <div className="col-12 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Mode System Test - Table Mode</h5>
              <p className="card-text">Testing ModeRenderer with table mode, sortable columns, and pagination.</p>
              <SimplifiedWidgemo
                data={teaserSampleData.slice(0, 8)} // Limit to 8 items for demo
                className="my-custom-widgemo"
                config={{
                  zones: {
                    header: {
                      enabled: true,
                      title: 'Table Mode Demo',
                      subtitle: 'Sortable columns with pagination'
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
          </div>
        </div>

        <div className="col-12 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">FieldRenderer Test - Type-Specific Rendering</h5>
              <p className="card-text">Testing FieldRenderer with different field types including images with lightbox functionality.</p>
              <SimplifiedWidgemo
                data={teaserSampleData.slice(0, 4)} // Use first 4 users with images
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
          </div>
        </div>

        <div className="col-12 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Image Gallery - FieldRenderer Lightbox</h5>
              <p className="card-text">Testing FieldRenderer image type with lightbox functionality using dedicated image data.</p>
              <SimplifiedWidgemo
                data={imageGalleryData.slice(0, 6)} // Use first 6 images
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
          </div>
        </div>

        <div className="col-12 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">CarouselMode - Swipeable Carousel</h5>
              <p className="card-text">Testing CarouselMode with drag gestures, navigation arrows, and indicators. Drag or use arrows to navigate.</p>
              <SimplifiedWidgemo
                data={teaserSampleData.slice(0, 5)} // Use first 5 users for carousel
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
          </div>
        </div>

        <div className="col-12 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Field Type Registry - Swatch Example</h5>
              <p className="card-text">Testing the field type registry with custom 'swatch' field type for color display.</p>
              <SimplifiedWidgemo
                data={[
                  { id: 1, name: 'Primary Color', color: '#007bff', description: 'Brand primary color' },
                  { id: 2, name: 'Success Color', color: '#28a745', description: 'Success state color' },
                  { id: 3, name: 'Warning Color', color: '#ffc107', description: 'Warning state color' },
                  { id: 4, name: 'Danger Color', color: '#dc3545', description: 'Error state color' },
                ]}
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
          </div>
        </div>

        <div className="col-12 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Hooks System Test - Pre/Post Render</h5>
              <p className="card-text">Testing preRender and postRender hooks for customization. Check console for hook execution logs.</p>
              <SimplifiedWidgemo
                data={teaserSampleData.slice(0, 4)}
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
          </div>
        </div>

        <div className="col-12 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Performance Monitoring - Pre/Post Render Hooks</h5>
              <p className="card-text">Testing preRender and postRender hooks for performance monitoring. Check console for logs and see live performance metrics below.</p>
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
          </div>
        </div>

        <div className="col-12 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">BoardMode - Kanban Board</h5>
              <p className="card-text">Testing BoardMode with drag-and-drop functionality, swimlanes, and configurable columns for task management.</p>
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
