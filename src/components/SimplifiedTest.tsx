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
const renderQueue: number[] = [];
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
/**
 * Refactored to separate configs and data from rendering logic, allowing dynamic rendering
 * and easier addition of new examples by modifying only the examples file.
 * Optimizations include module-level constants for configs/data to prevent recreation on renders.
 */
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
      <h1 >Widgemo Product Primitive</h1>
      <h4 className="mb-3">Below are various examples demonstrating the capabilities of the Widgemo Product Primitive using the SimplifiedWidgemo component.</h4>
      <h4 className="mb-3">Each example showcases different configurations and data sets to illustrate the flexibility and power of Widgemo in rendering complex data-driven UIs.</h4>
      <h5 className="mb-4"><strong>Note:</strong> all widgemos below use the <code className="css-class-code" title="Placeholder text for the popover. Specific content will be added later.">my-custom-widgemo</code> class for consistent styling.</h5>
      <div className="row">
        {/* Dynamically rendering examples from widgemoExamples for better maintainability. */}
        {widgemoExamples.map((example) => (
          <div key={example.id} className="col-12 mb-4">
            <h2>{example.title}</h2>
            <p>{example.description}</p>
            {/* Rendering SimplifiedWidgemo with stable props from examples array. */}
            <SimplifiedWidgemo
              data={example.data}
              config={example.config}
              className="my-custom-widgemo"
              {...(example.id === 'performance-monitoring' ? { id: 'performance-monitoring-demo' } : {})}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
export default SimplifiedTest;
