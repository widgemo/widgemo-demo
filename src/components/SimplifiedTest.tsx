import React, { useState, useMemo } from 'react';
import { Widgemo, registerWidgemoHook, registerWidgemoIcon, WidgemoThemeProvider } from 'widgemo-core';
import { createWidgemoCoreDefaultsTheme } from '../utils/widgemoThemeMapping';
import '../../node_modules/widgemo-core/dist/style.css';
import type { Entity, WidgemoConfig } from 'widgemo-core';
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
registerWidgemoHook({
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
registerWidgemoHook({
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
  'ellipsis-vertical', 'question-circle', 'star', 'heart', 'currency-dollar', 'dollar-sign', 'globe', 'info-circle'
];

iconNames.forEach(iconName => {
  registerWidgemoIcon({
    name: iconName,
    component: (props) => fontAwesomeRenderIcon({ name: iconName, ...props }), // Wrap to match expected signature
    defaultProps: { size: 16, color: 'currentColor' }
  });
});

/**
 * Injects devMode configuration into a Widgemo config, preserving existing settings except enabled state.
 * Ensures all examples have devMode injected for consistent toggle behavior.
 */
function injectDevMode(config: WidgemoConfig, enabled: boolean): WidgemoConfig {
  if (!config) return config;

  const existingDevMode = config.devMode;

  // Always inject devMode to ensure consistent toggle behavior across all examples
  if (existingDevMode && typeof existingDevMode === 'object') {
    // If devMode was an object, preserve all settings but override enabled
    return {
      ...config,
      devMode: {
        ...existingDevMode,
        enabled
      }
    };
  } else {
    // If devMode was a boolean, null, undefined, or any other value, replace with the enabled state
    return {
      ...config,
      devMode: enabled
    };
  }
}

/**
 * Refactored to separate configs and data from rendering logic, allowing dynamic rendering
 * and easier addition of new examples by modifying only the examples file.
 * Optimizations include module-level constants for configs/data to prevent recreation on renders.
 */
export const SimplifiedTest: React.FC = () => {
  console.log('SimplifiedTest rendering');

  // Production gating: Only enable devMode toggle in development environment
  const isDevEnvironment = process.env.NODE_ENV === 'development';

  // State for devMode toggle (only used in development) - loads from localStorage initially
  const [includeWidgemoInspector, setIncludeWidgemoInspectorState] = useState(() => {
    if (isDevEnvironment) {
      const saved = localStorage.getItem('widgemo-inspector-toggle');
      return saved === 'true';
    }
    return false;
  });

  // Custom setter that saves to localStorage
  const setIncludeWidgemoInspector = (value: boolean) => {
    setIncludeWidgemoInspectorState(value);
    if (isDevEnvironment) {
      localStorage.setItem('widgemo-inspector-toggle', value.toString());
    }
  };

  // State for theme provider toggle - loads from localStorage initially
  const [useWidgemoCoreDefaultTheming, setUseWidgemoCoreDefaultThemingState] = useState(() => {
    const saved = localStorage.getItem('widgemo-core-default-theming-toggle');
    return saved === 'true';
  });

  // Custom setter that saves to localStorage
  const setUseWidgemoCoreDefaultTheming = (value: boolean) => {
    setUseWidgemoCoreDefaultThemingState(value);
    localStorage.setItem('widgemo-core-default-theming-toggle', value.toString());
  };

  // Memoized examples with devMode injection (only in development)
  const examplesWithDevMode = useMemo(() => {
    if (!isDevEnvironment) {
      return widgemoExamples;
    }
    // Always inject devMode into all examples to ensure consistent toggle behavior
    return widgemoExamples.map(example => ({
      ...example,
      config: injectDevMode(example.config, includeWidgemoInspector)
    }));
  }, [includeWidgemoInspector, isDevEnvironment]);

  return (
    <div className="container mt-5" style={{ 
      minHeight: '100vh', 
      padding: '2rem'
    }}>
      {/* <style>{`
        .my-custom-widgemo {
          background-color: var(--widgemo-bg-color);
          border: 1px solid var(--widgemo-border-color);
          border-radius: 0.375rem;
          box-shadow: 0px 0px 8px var(--widgemo-shadow-color);
          padding: 0.5rem;
        } 
        .custom-footer-class {
          background-color: var(--widgemo-row-alt-bg);
          border-radius: 0.25rem;
          padding: 0.3rem;S
        }
        .custom-footer-class .zone-title {
          font-size: 14px; 
          color: #4f8fc7;
          padding-left: 0.5rem;
        }
        .custom-footer-class .zone-subtitle {
          font-size: 14px; 
          color: var(--widgemo-text-color);
        }
        .devmode-toggle-text {
          color: var(--widgemo-text-color);
        }
      `}</style> */}
      <h1 >Widgemo Product Primitive</h1>
      <h4 className="mb-3">Below are various examples demonstrating the capabilities of the Widgemo Product Primitive using the Widgemo component.</h4>
      <h4 className="mb-3">Each example showcases different configurations and data sets to illustrate the flexibility and power of Widgemo in rendering complex data-driven UIs.</h4>
      {/* <h5 className="mb-4"><strong>Note:</strong> all widgemos below use the <code className="css-class-code" title=".my-custom-widgemo {
          background-color: var(--bg-color);
          border: 1px solid var(--border-color);
          border-radius: 0.375rem;
          box-shadow: 0px 0px 8px var(--shadow-color);
          padding: 0.5rem;
        }">my-custom-widgemo</code> class for consistent styling.</h5> */}
      
      {/* Theme Toggle - Available in all environments */}
      <div className="mb-4 p-3 rounded" style={{ backgroundColor: 'var(--app-bg-primary)', border: '1px solid var(--app-border)' }}>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="widgemo-core-default-theming-toggle"
            checked={useWidgemoCoreDefaultTheming}
            onChange={(e) => setUseWidgemoCoreDefaultTheming(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="widgemo-core-default-theming-toggle">
            <strong>Use widgemo-core default theming</strong>
          </label>
        </div>
        <small className="devmode-toggle-text">
            When enabled, all Widgemo components below will use the widgemo-core default theme (ignoring the app theme).
            When disabled, the widgemos will use the widgemo-demo app theme (matching the current light/dark mode).
        </small>
      </div>
      
      {/* DevMode Toggle - Only shown in development environment */}
      {isDevEnvironment && (
        <div className="mb-4 p-3 rounded" style={{ backgroundColor: 'var(--app-bg-primary)', border: '1px solid var(--app-border)' }}>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="widgemo-inspector-toggle"
              checked={includeWidgemoInspector}
              onChange={(e) => setIncludeWidgemoInspector(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="widgemo-inspector-toggle">
              <strong>Include Widgemo Inspector</strong>
            </label>
          </div>
          <small className="devmode-toggle-text">
            When enabled, all Widgemo components below will have the inspector icon for configuration viewing.
            When disabled, the inspector is turned off for all components.
          </small>
        </div>
      )}
      
      <div className="row">
        {/* Dynamically rendering examples from widgemoExamples for better maintainability. */}
        {examplesWithDevMode.map((example) => (
          <div key={example.id} className="col-12 mb-4">
            <h2>{example.title}</h2>
            <p>{example.description}</p>
            {/* Rendering Widgemo with stable props from examples array. */}
            {useWidgemoCoreDefaultTheming ? (
              <WidgemoThemeProvider theme={createWidgemoCoreDefaultsTheme()}>
                <Widgemo
                  key={`${example.id}-${includeWidgemoInspector}`}
                  data={example.data}
                  config={example.config}
                  className="my-custom-widgemo"
                  {...(example.id === 'performance-monitoring' ? { id: 'performance-monitoring-demo' } : {})}
                />
              </WidgemoThemeProvider>
            ) : (
              <Widgemo
                key={`${example.id}-${includeWidgemoInspector}`}
                data={example.data}
                config={example.config}
                className="my-custom-widgemo"
                {...(example.id === 'performance-monitoring' ? { id: 'performance-monitoring-demo' } : {})}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
export default SimplifiedTest;
