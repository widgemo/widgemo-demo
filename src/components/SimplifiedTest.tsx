import React, { useState, useMemo } from 'react';
import { Widgemo, WidgemoThemeProvider } from 'widgemo-core';
import '../../node_modules/widgemo-core/dist/style.css';
import type { WidgemoConfig, ColumnConfig } from 'widgemo-core';
import widgemoExamples from '../data/widgemoExamples';
import { useTheme } from '../hooks/useTheme';

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

export const SimplifiedTest: React.FC = () => {
  console.log('🚀 SimplifiedTest component rendering');

  const { currentTheme } = useTheme();

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
      <h1>Widgemo Product Primitive</h1>
      <h4 className="mb-3">Below are various examples demonstrating the capabilities of the Widgemo Product Primitive using the Widgemo component.</h4>
      <h4 className="mb-3">Each example showcases different configurations and data sets to illustrate the flexibility and power of Widgemo in rendering complex data-driven UIs.</h4>

      {/* Theme Toggle - Available in all environments */}
      <div className="mb-4 p-3 rounded" style={{ backgroundColor: 'var(--app-bg-secondary)', border: '1px solid var(--app-border)' }}>
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
        <div className="mb-4 p-3 rounded" style={{ backgroundColor: 'var(--app-bg-secondary)', border: '1px solid var(--app-border)' }}>
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
        {/* Test section for custom field types */}
        <div className="col-12 mb-4">
          <h2>🧪 Custom Field Type Test: Progress Bar</h2>
          <p>Testing the custom 'progress' field type registered above.</p>
          <Widgemo
            data={[
              { id: 1, name: 'Task A', progress: 75 },
              { id: 2, name: 'Task B', progress: 45 },
              { id: 3, name: 'Task C', progress: 90 },
              { id: 4, name: 'Task D', progress: 25 }
            ]}
            config={{
              devMode: true,
              zones: {
                content: {
                  mode: 'table',
                  columns: [
                    { field: 'name', header: 'Task Name', type: 'text' } as const,
                    { field: 'progress', header: 'Progress', type: 'number', renderAs: 'customProgress', renderAsOptions: { showPercentage: true, color: '#28a745' } } as const
                  ] as ColumnConfig[]
                }
              }
            }}
            className="my-custom-widgemo"
          />
        </div>

        {/* JSON Field Type Test */}
        <div className="col-12 mb-4">
          <h2>JSON Field Type Test</h2>
          <p>Testing custom JSON field type with collapsible sections and color coding</p>
          <Widgemo
            data={[
              {
                id: 1,
                name: 'Simple Object',
                jsonData: JSON.stringify({ name: "John", age: 30, active: true, score: 85.5 })
              },
              {
                id: 2,
                name: 'Nested Object',
                jsonData: JSON.stringify({
                  user: { id: 123, profile: { theme: "dark", notifications: true } },
                  settings: { autoSave: false, language: "en" }
                })
              },
              {
                id: 3,
                name: 'Array Data',
                jsonData: JSON.stringify({
                  items: [
                    { id: 1, name: "Item A", tags: ["red", "small"] },
                    { id: 2, name: "Item B", tags: ["blue", "large"] }
                  ]
                })
              }
            ]}
            config={{
              devMode: true,
              zones: {
                content: {
                  mode: 'table',
                  columns: [
                    { field: 'name', header: 'Data Type', type: 'text' } as const,
                    { field: 'jsonData', header: 'JSON Data', type: 'text', renderAs: 'jsonView', renderAsOptions: { collapsed: true, maxDepth: 4 } } as const
                  ] as ColumnConfig[]
                }
              }
            }}
            className="my-custom-widgemo"
          />
        </div>

        {/* TEST: Only render the first example */}
        {(() => {
          const firstExample = examplesWithDevMode[0];
          if (!firstExample) {
            return <div>No examples found</div>;
          }
          console.log('Rendering first example:', firstExample.id, firstExample.title);
          return (
            <div key={firstExample.id} className="col-12 mb-4">
              <h2>{firstExample.title}</h2>
              <p>{firstExample.description}</p>
              <div style={{ border: '2px solid red', padding: '10px', margin: '10px 0' }}>
                <strong>DEBUG: This should render a Widgemo component below</strong>
              </div>
              {/* Rendering Widgemo with stable props from examples array. */}
              {useWidgemoCoreDefaultTheming ? (
                <WidgemoThemeProvider theme={currentTheme}>
                  <Widgemo
                    key={`${firstExample.id}-${includeWidgemoInspector}`}
                    data={firstExample.data}
                    config={firstExample.config}
                    configVersion='legacy'
                    className="my-custom-widgemo"
                    {...(firstExample.id === 'performance-monitoring' ? { id: 'performance-monitoring-demo' } : {})}
                  />
                </WidgemoThemeProvider>
              ) : (
                <Widgemo
                  key={`${firstExample.id}-${includeWidgemoInspector}`}
                  data={firstExample.data}
                  config={firstExample.config}
                  configVersion='legacy'
                  className="my-custom-widgemo"
                  {...(firstExample.id === 'performance-monitoring' ? { id: 'performance-monitoring-demo' } : {})}
                />
              )}
            </div>
          );
        })()}
      </div>
    </div>
  );
};