import React, { useEffect, useMemo, useState } from 'react';
import { Widgemo, WidgemoThemeProvider } from '@widgemo/widgemo-core';
import type { WidgemoConfig } from '@widgemo/widgemo-core';
import progressiveExamples from '../data/progressiveExamples';
import { useTheme } from '../hooks/useTheme';
import { setDemoActionListener } from '../utils/demoActionBus';
import type { DemoActionPayload } from '../utils/demoActionBus';
import { DemoActionModal } from './DemoActionModal';

const forcedProviderThemeByExampleId: Record<string, 'light' | 'dark'> = {
  'progressive-48-theme-provider-light-validation': 'light',
  'progressive-50-theme-provider-dark-validation': 'dark',
};

function injectDevMode(config: WidgemoConfig, enabled: boolean): WidgemoConfig {
  if (!config) return config;

  const existingDevMode = config.devMode;

  if (existingDevMode && typeof existingDevMode === 'object') {
    return {
      ...config,
      devMode: {
        ...existingDevMode,
        enabled,
      },
    };
  }

  return {
    ...config,
    devMode: enabled,
  };
}

export const ProgressiveExamplesPage: React.FC = () => {
  const [actionPayload, setActionPayload] = useState<DemoActionPayload | null>(null);

  useEffect(() => {
    setDemoActionListener(setActionPayload);
    return () => setDemoActionListener(null);
  }, []);

  const { currentTheme } = useTheme();

  const isDevEnvironment =
    import.meta.env.DEV ||
    window.location.hostname === 'dev.widgemo.com' ||
    window.location.hostname === 'localhost' ||
    window.location.hostname === '10.0.0.229';

  const [includeWidgemoInspector, setIncludeWidgemoInspectorState] = useState(() => {
    if (isDevEnvironment) {
      const saved = localStorage.getItem('widgemo-progressive-inspector-toggle');
      return saved === 'true';
    }
    return false;
  });

  const setIncludeWidgemoInspector = (value: boolean) => {
    setIncludeWidgemoInspectorState(value);
    if (isDevEnvironment) {
      localStorage.setItem('widgemo-progressive-inspector-toggle', value.toString());
    }
  };

  const examplesWithDevMode = useMemo(() => {
    if (!isDevEnvironment) {
      return progressiveExamples;
    }

    return progressiveExamples.map((example) => ({
      ...example,
      config: injectDevMode(example.config, includeWidgemoInspector),
    }));
  }, [includeWidgemoInspector, isDevEnvironment]);

  return (
    <div
      className="container"
      style={{
        minHeight: '100vh',
        padding: '1.5rem',
        paddingTop: '3rem',
      }}
    >
      <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem' }}>Progressive Examples</h1>
      <p className="mb-1 text-muted" style={{ fontSize: '0.875rem' }}>
        This page contains a progressive sequence of Widgemo examples from minimal defaults to advanced configurations.
      </p>
      <p className="mb-3 text-muted" style={{ fontSize: '0.875rem' }}>
        Each item adds a few settings so you can observe how configuration evolves the same data through richer behaviors and modes.
      </p>

      {isDevEnvironment && (
        <div
          className="mb-4 p-3 rounded"
          style={{ backgroundColor: 'var(--app-bg-secondary)', border: '1px solid var(--app-border)' }}
        >
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="widgemo-progressive-inspector-toggle"
              checked={includeWidgemoInspector}
              onChange={(e) => setIncludeWidgemoInspector(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="widgemo-progressive-inspector-toggle">
              <strong>Include Widgemo Inspector</strong>
            </label>
          </div>
        </div>
      )}

      <div className="row">
        {examplesWithDevMode.map((example) => (
          <div key={example.id} className="col-12 mb-3">
            <h2 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.1rem' }}>{example.title}</h2>
            <p style={{ fontSize: '0.8125rem', color: 'var(--app-text-muted)', marginBottom: '0.5rem' }}>
              {example.description}
            </p>
            <WidgemoThemeProvider theme={forcedProviderThemeByExampleId[example.id] ?? currentTheme}>
              <Widgemo data={example.data} config={example.config} className="my-custom-widgemo" />
            </WidgemoThemeProvider>
          </div>
        ))}
      </div>

      <DemoActionModal payload={actionPayload} onClose={() => setActionPayload(null)} />
    </div>
  );
};

export default ProgressiveExamplesPage;
