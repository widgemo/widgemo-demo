import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { WidgemoThemeProvider, widgemoRegistry } from '@widgemo/widgemo-core';
import { AppNavbar, DevBanner } from './components/navigation';
import { MainPage } from './components/MainPage';
import { SandboxPage } from './components/SandboxPage';
import { SimplifiedTest } from './components/SimplifiedTest';
import { ProgressiveExamplesPage } from './components/ProgressiveExamplesPage';
import { DashboardPage } from './components/DashboardPage';
import { CashflowDashboardPage } from './components/CashflowDashboardPage';
import { useTheme } from './hooks/useTheme';
import { TimelineMode, CashflowTimelineMode } from './components/custom-modes';
import {
  registerProgressBarField,
  registerJsonField,
  registerCashDeltaField,
  registerCashPillField,
  registerAccountHealthField,
  registerForecastConfidenceField,
  registerTransactionMetaField,
} from './components/custom-fields';
import './App.css';

// Register custom renderAs renderers once at module level
widgemoRegistry.registerWidgemoRenderAs(registerProgressBarField());
widgemoRegistry.registerWidgemoRenderAs(registerJsonField());
widgemoRegistry.registerWidgemoRenderAs(registerCashDeltaField());
widgemoRegistry.registerWidgemoRenderAs(registerCashPillField());
widgemoRegistry.registerWidgemoRenderAs(registerAccountHealthField());
widgemoRegistry.registerWidgemoRenderAs(registerForecastConfidenceField());
widgemoRegistry.registerWidgemoRenderAs(registerTransactionMetaField());

let registryInitialized = false;

const financeIconPathMap: Record<string, string> = {
  'finance-wallet': 'M3 6.8c0-1.1.9-2 2-2h11c1.1 0 2 .9 2 2v8.4c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V6.8zm2 .2v8h11V7H5zm8.2 2.1a1.8 1.8 0 110 3.6 1.8 1.8 0 010-3.6z',
  'finance-forecast': 'M2.8 15.6V4.4h1.8v9.4h11.8v1.8H2.8zm3.4-2.8l2.8-3.2 2.2 1.8 3.4-4 1.4 1.2-4.5 5.2-2.3-1.8-1.8 2.1-1.2-1.3z',
  'finance-transfer': 'M2.4 6.2h10.2l-1.8-1.8 1.2-1.3 3.9 3.9-3.9 3.9-1.2-1.3 1.8-1.8H2.4V6.2zm13.2 5.6H5.4l1.8 1.8-1.2 1.3-3.9-3.9 3.9-3.9 1.2 1.3-1.8 1.8h10.2v1.6z',
  'finance-alert': 'M9.5 2.3l7.1 12.4c.4.7-.1 1.5-.9 1.5H3.3c-.8 0-1.3-.8-.9-1.5L9.5 2.3zm.1 4.1c-.4 0-.7.3-.7.7v4c0 .4.3.7.7.7s.7-.3.7-.7v-4c0-.4-.3-.7-.7-.7zm0 7.2a.9.9 0 100 1.8.9.9 0 000-1.8z',
  'finance-reserve': 'M3.1 6.1l6.4-3.2 6.4 3.2v1.8H3.1V6.1zm1.3 3.1h1.8v4.8H4.4V9.2zm3.8 0H10v4.8H8.2V9.2zm3.8 0h1.8v4.8H12V9.2zM2.8 15.1h13.4v1.8H2.8v-1.8z',
  'finance-income': 'M3.2 15.6V3.8H5v11.8H3.2zm3.2 0V8.6h1.8v7H6.4zm3.2 0V6.2h1.8v9.4H9.6zm3.2 0V9.8h1.8v5.8h-1.8z',
  'finance-autopay': 'M9.6 2.8a6.9 6.9 0 016.7 5.3h1.7l-2.4 2.4-2.4-2.4h1.4a5.1 5.1 0 10-.9 4.2l1.4.9A6.9 6.9 0 119.6 2.8zm-.9 3.3h1.8v3.2l2.5 1.5-.9 1.5-3.4-2V6.1z',
};

const registerFinanceIcons = () => {
  Object.entries(financeIconPathMap).forEach(([name, d]) => {
    widgemoRegistry.registerWidgemoIcon({
      name,
      component: ({ className, size = 16, color = 'currentColor' }: { className?: string; size?: number; color?: string }) => (
        <svg
          className={className}
          width={size}
          height={size}
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden="true"
          style={{ display: 'inline-block', verticalAlign: 'text-bottom' }}
        >
          <path d={d} fill={color} />
        </svg>
      ),
      defaultProps: { size: 16, color: '#5f4b8b' },
    });
  });
};

const ensureRegistryExtensions = () => {
  if (registryInitialized) {
    return;
  }

  widgemoRegistry.registerWidgemoMode({
    name: 'timeline',
    component: TimelineMode,
    defaultConfig: {
      dateField: 'date',
      titleField: 'title',
      sortOrder: 'desc',
      orientation: 'vertical',
      showLines: true,
      color: '#007bff',
    },
  });

  widgemoRegistry.registerWidgemoMode({
    name: 'cashflow-timeline',
    component: CashflowTimelineMode,
    defaultConfig: {
      dateField: 'date',
      labelField: 'label',
      amountField: 'amount',
      directionField: 'direction',
      accountField: 'accountName',
      statusField: 'status',
      showRunningBalance: true,
      highlightWindowDays: 7,
    },
  });

  registerFinanceIcons();
  registryInitialized = true;
};

function AppContent() {
  ensureRegistryExtensions();

  const { currentTheme } = useTheme();
  const [bannerVisible, setBannerVisible] = useState(
    window.location.hostname === 'dev.widgemo.com' &&
    localStorage.getItem('widgemo-devbanner-dismissed') !== 'true'
  );
  const [navOffset, setNavOffset] = useState(0);
  
  // Other icons - commented out for testing
  /*
  widgemoRegistry.registerWidgemoIcon({
    name: 'database',
    component: (props: { className?: string; size?: number; color?: string }) => 
      fontAwesomeRenderIcon({ name: 'database', ...props }),
    defaultProps: { size: 16, color: '#007acc' }
  });

  widgemoRegistry.registerWidgemoIcon({
    name: 'users',
    component: (props: { className?: string; size?: number; color?: string }) => 
      fontAwesomeRenderIcon({ name: 'users', ...props }),
    defaultProps: { size: 16, color: '#28a745' }
  });

  widgemoRegistry.registerWidgemoIcon({
    name: 'clock',
    component: (props: { className?: string; size?: number; color?: string }) => 
      fontAwesomeRenderIcon({ name: 'clock', ...props }),
    defaultProps: { size: 16, color: '#6c757d' }
  });

  widgemoRegistry.registerWidgemoIcon({
    name: 'plus',
    component: (props: { className?: string; size?: number; color?: string }) => 
      fontAwesomeRenderIcon({ name: 'plus', ...props }),
    defaultProps: { size: 16, color: '#007bff' }
  });

  widgemoRegistry.registerWidgemoIcon({
    name: 'edit',
    component: (props: { className?: string; size?: number; color?: string }) => 
      fontAwesomeRenderIcon({ name: 'edit', ...props }),
    defaultProps: { size: 16, color: '#ffc107' }
  });

  widgemoRegistry.registerWidgemoIcon({
    name: 'delete',
    component: (props: { className?: string; size?: number; color?: string }) => 
      fontAwesomeRenderIcon({ name: 'delete', ...props }),
    defaultProps: { size: 16, color: '#dc3545' }
  });

  widgemoRegistry.registerWidgemoIcon({
    name: 'view',
    component: (props: { className?: string; size?: number; color?: string }) => 
      fontAwesomeRenderIcon({ name: 'view', ...props }),
    defaultProps: { size: 16, color: '#17a2b8' }
  });

  widgemoRegistry.registerWidgemoIcon({
    name: 'search',
    component: (props: { className?: string; size?: number; color?: string }) => 
      fontAwesomeRenderIcon({ name: 'search', ...props }),
    defaultProps: { size: 16, color: '#6c757d' }
  });

  widgemoRegistry.registerWidgemoIcon({
    name: 'filter',
    component: (props: { className?: string; size?: number; color?: string }) => 
      fontAwesomeRenderIcon({ name: 'filter', ...props }),
    defaultProps: { size: 16, color: '#6c757d' }
  });

  widgemoRegistry.registerWidgemoIcon({
    name: 'sort',
    component: (props: { className?: string; size?: number; color?: string }) => 
      fontAwesomeRenderIcon({ name: 'sort', ...props }),
    defaultProps: { size: 16, color: '#6c757d' }
  });

  widgemoRegistry.registerWidgemoIcon({
    name: 'download',
    component: (props: { className?: string; size?: number; color?: string }) => 
      fontAwesomeRenderIcon({ name: 'download', ...props }),
    defaultProps: { size: 16, color: '#28a745' }
  });

  widgemoRegistry.registerWidgemoIcon({
    name: 'upload',
    component: (props: { className?: string; size?: number; color?: string }) => 
      fontAwesomeRenderIcon({ name: 'upload', ...props }),
    defaultProps: { size: 16, color: '#007bff' }
  });

  widgemoRegistry.registerWidgemoIcon({
    name: 'star',
    component: (props: { className?: string; size?: number; color?: string }) => 
      fontAwesomeRenderIcon({ name: 'star', ...props }),
    defaultProps: { size: 16, color: '#ffc107' }
  });

  widgemoRegistry.registerWidgemoIcon({
    name: 'heart',
    component: (props: { className?: string; size?: number; color?: string }) => 
      fontAwesomeRenderIcon({ name: 'heart', ...props }),
    defaultProps: { size: 16, color: '#dc3545' }
  });
  */
  
  return (
    <WidgemoThemeProvider theme={currentTheme}>
      <DevBanner
        visible={bannerVisible}
        onDismiss={() => setBannerVisible(false)}
        onHeightChange={setNavOffset}
      />
      <div className="App" style={{
        minHeight: '100vh',
        color: 'var(--app-text-primary)',
        transition: 'color 0.3s ease'
      }}>
        <AppNavbar topOffset={navOffset} />

        <div style={{ marginTop: `${56 + navOffset}px` }}>
          <Routes>
            <Route
              path="/"
              element={<MainPage />}
            />
            <Route
              path="/sandbox"
              element={<SandboxPage />}
            />
            <Route
              path="/simplified-test"
              element={<SimplifiedTest />}
            />
            <Route
              path="/progressive-examples"
              element={<ProgressiveExamplesPage />}
            />
            <Route
              path="/dashboard"
              element={<DashboardPage />}
            />
            <Route
              path="/cashflow-dashboard"
              element={<CashflowDashboardPage />}
            />
            <Route
              path="*"
              element={
                <div style={{ padding: '2rem', backgroundColor: 'yellow' }}>
                  <h1>Route Not Found</h1>
                  <p>Current path: {window.location.pathname}</p>
                  <p>Available routes: /, /sandbox, /simplified-test, /progressive-examples, /dashboard, /cashflow-dashboard</p>
                </div>
              }
            />
          </Routes>
        </div>
      </div>
    </WidgemoThemeProvider>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
