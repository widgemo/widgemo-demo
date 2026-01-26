import React from 'react';
import { SimplifiedWidgemo, registerHook, registerIcon } from 'widgemo-core';
import type { Entity } from 'widgemo-core';
import widgemoExamples from '../data/widgemoExamples';
import { fontAwesomeRenderIcon } from '../utils/fontAwesomeIconRenderer';
// Extend Window interface for performance metrics
declare global {
  interface Window {
    lastRenderTime?: number;
    lastRenderCount?: number;
    performanceMeasured?: boolean;
  }
}
// Global variable to store pending metrics
// Register performance monitoring hooks at module level
let renderCount = 0;
let renderQueue: number[] = [];
// Pre-render hook to start timing
registerHook({
  name: 'preRender',
  hook: (...args: unknown[]) => {
    const [componentName] = args as [string, { data: Entity[]; className?: string }];
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
export const SimplifiedTest: React.FC = () => {
  console.log('SimplifiedTest rendering');
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
      `}</style>
      <h1 className="mb-4">Widgemo Product Primitive - ZoneRenderer Test</h1>
      <div className="row">
        <div className="col-12 mb-4">
          <h2>Mode - Table Mode - Plain</h2>
          <p>Basic table mode with default styling and actions.</p>
          <SimplifiedWidgemo
            data={widgemoExamples.find(e => e.id === 'table-plain')!.data}
            config={widgemoExamples.find(e => e.id === 'table-plain')!.config}
            className="my-custom-widgemo"
          />
        </div>
        <div className="col-12 mb-4">
          <h2>Mode - Table Mode - Alternating Rows</h2>
          <p>Table mode with alternating row colors for better readability.</p>
          <SimplifiedWidgemo
            data={widgemoExamples.find(e => e.id === 'table-alternating')!.data}
            config={widgemoExamples.find(e => e.id === 'table-alternating')!.config}
            className="my-custom-widgemo"
          />
        </div>
        <div className="col-12 mb-4">
          <h2>Mode - Table Mode - Row Dividers</h2>
          <p>Table mode with row separators for clear data separation.</p>
          <SimplifiedWidgemo
            data={widgemoExamples.find(e => e.id === 'table-row-dividers')!.data}
            config={widgemoExamples.find(e => e.id === 'table-row-dividers')!.config}
            className="my-custom-widgemo"
          />
        </div>
        <div className="col-12 mb-4">
          <h2>FieldRenderer Test - Type-Specific Rendering</h2>
          <p>Testing FieldRenderer with type-specific rendering for different data types.</p>
          <SimplifiedWidgemo
            data={widgemoExamples.find(e => e.id === 'field-renderer-test')!.data}
            config={widgemoExamples.find(e => e.id === 'field-renderer-test')!.config}
            className="my-custom-widgemo"
          />
        </div>
        <div className="col-12 mb-4">
          <h2>Mode - Table Mode - Conditional Borders</h2>
          <p>Table mode with conditional borders based on data values, alternating rows disabled.</p>
          <SimplifiedWidgemo
            data={widgemoExamples.find(e => e.id === 'conditional-borders')!.data}
            config={widgemoExamples.find(e => e.id === 'conditional-borders')!.config}
            className="my-custom-widgemo"
          />
        </div>
        <div className="col-12 mb-4">
          <h2>CarouselMode - Swipeable Carousel</h2>
          <p>Testing CarouselMode with drag gestures, navigation arrows, and indicators. Drag or use arrows to navigate.</p>
          <SimplifiedWidgemo
            data={widgemoExamples.find(e => e.id === 'carousel-mode')!.data}
            config={widgemoExamples.find(e => e.id === 'carousel-mode')!.config}
            className="my-custom-widgemo"
          />
        </div>
        <div className="col-12 mb-4">
          <h2>Image Gallery - FieldRenderer Lightbox</h2>
          <p>Testing FieldRenderer image type with lightbox functionality using dedicated image data.</p>
          <SimplifiedWidgemo
            data={widgemoExamples.find(e => e.id === 'image-gallery')!.data}
            config={widgemoExamples.find(e => e.id === 'image-gallery')!.config}
            className="my-custom-widgemo"
          />
        </div>
        <div className="col-12 mb-4">
          <h2>Mode - Table Mode - Groupable Columns</h2>
          <p>Table mode with groupable columns for data organization.</p>
          <SimplifiedWidgemo
            data={widgemoExamples.find(e => e.id === 'table-groupable-columns')!.data}
            config={widgemoExamples.find(e => e.id === 'table-groupable-columns')!.config}
            className="my-custom-widgemo"
          />
        </div>
        <div className="col-12 mb-4">
          <h2>Performance Monitoring - Pre/Post Render Hooks</h2>
          <p>Testing preRender and postRender hooks for performance monitoring. Check console for logs and see live performance metrics below.</p>
          <SimplifiedWidgemo
            id="performance-monitoring-demo"
            data={widgemoExamples.find(e => e.id === 'performance-monitoring')!.data}
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
                  table: {
                    rowSeparator: false,
                    pagination: { page: 1, pageSize: 5 }
                  }
                },
                footer: {
                  enabled: true,
                  title: 'Performance Stats',
                  subtitle: (_data, id) => `widgemo.id: ${JSON.stringify(id)}`
                }
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};
export default SimplifiedTest;
