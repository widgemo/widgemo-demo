import React, { useState, useMemo, useEffect } from 'react';
import { Widgemo, WidgemoThemeProvider } from '@widgemo/widgemo-core';
import type { WidgemoConfig } from '@widgemo/widgemo-core';
import widgemoExamples from '../data/widgemoExamples';
import { useTheme } from '../hooks/useTheme';
import { setDemoActionListener } from '../utils/demoActionBus';
import type { DemoActionPayload } from '../utils/demoActionBus';
import { DemoActionModal } from './DemoActionModal';

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

  const [actionPayload, setActionPayload] = useState<DemoActionPayload | null>(null);

  // Register the demo action listener so fireDemoAction() in examples opens this modal
  useEffect(() => {
    setDemoActionListener(setActionPayload);
    return () => setDemoActionListener(null);
  }, []);

  const { currentTheme } = useTheme();

  // Production gating: Only enable devMode toggle in development environment
  const isDevEnvironment = import.meta.env.DEV || window.location.hostname === "dev.widgemo.com" || window.location.hostname === "localhost";

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
    <div className="container" style={{
      minHeight: '100vh',
      padding: '1.5rem',
      paddingTop: '3rem'
    }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem' }}>Widgemo Product Primitive</h1>
      <p className="mb-1 text-muted" style={{ fontSize: '0.875rem' }}>Below are various examples demonstrating the capabilities of the Widgemo Product Primitive using the Widgemo component.</p>
      <p className="mb-3 text-muted" style={{ fontSize: '0.875rem' }}>Each example showcases different configurations and data sets to illustrate the flexibility and power of Widgemo in rendering complex data-driven UIs.</p>

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
        <div className="col-12 mb-3">
          <h2 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.1rem' }}>🧪 Custom Field Type Test: Progress Bar</h2>
          <p style={{ fontSize: '0.8125rem', color: 'var(--app-text-muted)', marginBottom: '0.5rem' }}>Testing the custom 'progress' field type registered above.</p>
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
                header: {
                  title: 'Task Progress Tracker',
                  subtitle: 'Custom progress bar field renderer via widgemoRegistry.registerWidgemoRenderAs'
                },
                content: {
                  mode: 'table',
                  item: {
                    fields: [
                      { key: 'name', label: 'Task Name' },
                      { key: 'progress', label: 'Progress', renderAs: 'customProgress', renderAsOptions: { showPercentage: true, color: '#007bff', height: '8px' } }
                    ],
                    layout: { type: 'auto' }
                  }
                }
              }
            }}
            className="my-custom-widgemo"
          />
        </div>

        {/* JSON Field Type Test */}
        <div className="col-12 mb-3">
          <h2 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.1rem' }}>JSON Field Type Test</h2>
          <p style={{ fontSize: '0.8125rem', color: 'var(--app-text-muted)', marginBottom: '0.5rem' }}>Testing core JSON preview renderer with collapsible sections and color coding</p>
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
                  item: {
                    fields: [
                      { key: 'name', label: 'Data Type' },
                      { key: 'jsonData', label: 'JSON Data', renderAs: 'jsonPreview', renderAsOptions: { defaultCollapsed: true, maxDepth: 3 } }
                    ],
                    layout: { type: 'auto' }
                  }
                },
                footer: {
                  subtitle: 'Core JSON preview renderer — collapsible nodes, color-coded values'
                }
              }
            }}
            className="my-custom-widgemo"
          />
        </div>

        {/* TEST: Only render the first example */}
        {/* RESTORED: Now rendering ALL examples with unified configs */}
        {examplesWithDevMode.map((example) => (
          <div key={example.id} className="col-12 mb-3">
            <h2 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.1rem' }}>{example.title}</h2>
            <p style={{ fontSize: '0.8125rem', color: 'var(--app-text-muted)', marginBottom: '0.5rem' }}>{example.description}</p>
            {/* Rendering Widgemo with stable props from examples array. */}
            {useWidgemoCoreDefaultTheming ? (
              <WidgemoThemeProvider theme={currentTheme}>
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

      <DemoActionModal
        payload={actionPayload}
        onClose={() => setActionPayload(null)}
      />
    </div>
  );
};