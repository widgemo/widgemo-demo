import React, { useEffect, useMemo, useState } from 'react';
import { Widgemo, WidgemoThemeProvider, useWidgemoTheme } from '@widgemo/widgemo-core';
import type { WidgemoConfig } from '@widgemo/widgemo-core';
import progressiveExamples from '../data/progressiveExamples';
import { useTheme } from '../hooks/useTheme';
import { setDemoActionListener } from '../utils/demoActionBus';
import type { DemoActionPayload } from '../utils/demoActionBus';
import { DemoActionModal } from './DemoActionModal';

type ExampleHarnessMode = 'app-theme' | 'provider-light' | 'provider-dark' | 'provider-auto' | 'no-provider';

const exampleHarnessModeById: Record<string, ExampleHarnessMode> = {
  'progressive-48-theme-provider-light-validation': 'provider-light',
  'progressive-50-theme-provider-dark-validation': 'provider-dark',
  'progressive-52-theme-auto-snapshot-behavior': 'provider-auto',
  'progressive-54-theme-hook-with-provider': 'app-theme',
  'progressive-55-theme-hook-without-provider': 'no-provider',
};

const ThemeHookProbe: React.FC<{ label: string }> = ({ label }) => {
  const theme = useWidgemoTheme();
  const rootKeys = Object.keys(theme ?? {});
  const colorKeys = Object.keys(theme?.colors ?? {});
  const spacingKeys = Object.keys(theme?.spacing ?? {});
  const isEmpty = rootKeys.length === 0;

  return (
    <div
      className="mb-2 p-2 rounded"
      style={{
        fontSize: '0.75rem',
        backgroundColor: 'var(--app-bg-secondary)',
        border: '1px dashed var(--app-border)',
        color: 'var(--app-text-muted)',
      }}
    >
      <strong>{label}</strong>
      {' · '}
      root keys: {rootKeys.length}
      {' · '}
      colors: {colorKeys.length}
      {' · '}
      spacing: {spacingKeys.length}
      {' · '}
      empty object: {isEmpty ? 'yes' : 'no'}
    </div>
  );
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

  const renderExample = (example: typeof examplesWithDevMode[number]) => {
    const harnessMode = exampleHarnessModeById[example.id] ?? 'app-theme';
    const shouldShowHookProbe =
      example.id === 'progressive-54-theme-hook-with-provider' ||
      example.id === 'progressive-55-theme-hook-without-provider';

    if (harnessMode === 'no-provider') {
      return (
        <>
          {shouldShowHookProbe && <ThemeHookProbe label="useWidgemoTheme() probe" />}
          <Widgemo data={example.data} config={example.config} className="my-custom-widgemo" />
        </>
      );
    }

    const providerTheme =
      harnessMode === 'provider-light'
        ? 'light'
        : harnessMode === 'provider-dark'
          ? 'dark'
          : harnessMode === 'provider-auto'
            ? 'auto'
            : currentTheme;

    return (
      <WidgemoThemeProvider theme={providerTheme}>
        {shouldShowHookProbe && <ThemeHookProbe label="useWidgemoTheme() probe" />}
        <Widgemo data={example.data} config={example.config} className="my-custom-widgemo" />
      </WidgemoThemeProvider>
    );
  };

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
            {renderExample(example)}
          </div>
        ))}
      </div>

      <DemoActionModal payload={actionPayload} onClose={() => setActionPayload(null)} />
    </div>
  );
};

export default ProgressiveExamplesPage;
