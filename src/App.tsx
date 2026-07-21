import { Suspense, lazy, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { WidgemoThemeProvider, widgemoRegistry, registerTheme, getTheme } from '@widgemo/widgemo-core';
import { AppNavbar, DevBanner } from './components/navigation';
import { MainPage } from './components/MainPage';
import { useTheme } from './hooks/useTheme';
import { TimelineMode, CashflowTimelineMode } from './components/custom-modes';
import {
  registerProgressBarField,
  registerTransactionMetaField,
  registerAccountMetaField,
  registerAccountBalanceField,
} from './components/custom-fields';
import './App.css';

const SandboxPage = lazy(() => import('./components/SandboxPage').then((module) => ({ default: module.SandboxPage })));
const ExamplesPage = lazy(() => import('./components/ExamplesPage').then((module) => ({ default: module.ExamplesPage })));
const ProgressiveExamplesPage = lazy(() => import('./components/ProgressiveExamplesPage').then((module) => ({ default: module.ProgressiveExamplesPage })));
const DashboardPage = lazy(() => import('./components/DashboardPage').then((module) => ({ default: module.DashboardPage })));
const CashflowDashboardPage = lazy(() => import('./components/CashflowDashboardPage').then((module) => ({ default: module.CashflowDashboardPage })));

// Register custom renderAs renderers once at module level
widgemoRegistry.registerWidgemoRenderAs(registerProgressBarField());
widgemoRegistry.registerWidgemoRenderAs(registerTransactionMetaField());
widgemoRegistry.registerWidgemoRenderAs(registerAccountMetaField());
widgemoRegistry.registerWidgemoRenderAs(registerAccountBalanceField());

let registryInitialized = false;

const demoRegistryContrastTheme = {
  colors: {
    background: '#fff7ed',
    surfaceBg: '#ffedd5',
    text: '#7c2d12',
    textMuted: '#9a3412',
    border: '#fdba74',
    cardBg: '#fff7ed',
    cardBorder: '#fdba74',
    tableBg: '#fff7ed',
    tableHeaderBg: '#ffedd5',
    actionButtonBg: '#ea580c',
    actionButtonColor: '#ffffff',
    actionButtonBorder: '#c2410c',
    actionMenuBg: '#fff7ed',
    actionMenuColor: '#7c2d12',
    actionMenuItemHoverBg: '#ffedd5',
    actionMenuItemHoverColor: '#7c2d12',
    titleText: '#7c2d12',
    subtitleText: '#9a3412',
  },
  spacing: {
    borderRadius: '8px',
  },
  zone: {
    backgroundColor: '#ffedd5',
    borderColor: '#fdba74',
    titleColor: '#7c2d12',
    subtitleColor: '#9a3412',
  },
  action: {
    buttonBg: '#ea580c',
    buttonColor: '#ffffff',
    buttonBorder: '#c2410c',
    menuBg: '#fff7ed',
    menuBorder: '1px solid #fdba74',
  },
} as const;

const RouteFallback = () => (
  <div
    className="d-flex align-items-center justify-content-center"
    style={{ minHeight: '40vh', color: 'var(--app-text-muted)' }}
  >
    Loading page...
  </div>
);

const financeIconPathMap: Record<string, string> = {
  'finance-wallet': 'M3 6.8c0-1.1.9-2 2-2h11c1.1 0 2 .9 2 2v8.4c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V6.8zm2 .2v8h11V7H5zm8.2 2.1a1.8 1.8 0 110 3.6 1.8 1.8 0 010-3.6z',
  'finance-forecast': 'M2.8 15.6V4.4h1.8v9.4h11.8v1.8H2.8zm3.4-2.8l2.8-3.2 2.2 1.8 3.4-4 1.4 1.2-4.5 5.2-2.3-1.8-1.8 2.1-1.2-1.3z',
  'finance-transfer': 'M2.4 6.2h10.2l-1.8-1.8 1.2-1.3 3.9 3.9-3.9 3.9-1.2-1.3 1.8-1.8H2.4V6.2zm13.2 5.6H5.4l1.8 1.8-1.2 1.3-3.9-3.9 3.9-3.9 1.2 1.3-1.8 1.8h10.2v1.6z',
  'finance-alert': 'M9.5 2.3l7.1 12.4c.4.7-.1 1.5-.9 1.5H3.3c-.8 0-1.3-.8-.9-1.5L9.5 2.3zm.1 4.1c-.4 0-.7.3-.7.7v4c0 .4.3.7.7.7s.7-.3.7-.7v-4c0-.4-.3-.7-.7-.7zm0 7.2a.9.9 0 100 1.8.9.9 0 000-1.8z',
  'finance-reserve': 'M3.1 6.1l6.4-3.2 6.4 3.2v1.8H3.1V6.1zm1.3 3.1h1.8v4.8H4.4V9.2zm3.8 0H10v4.8H8.2V9.2zm3.8 0h1.8v4.8H12V9.2zM2.8 15.1h13.4v1.8H2.8v-1.8z',
  'finance-income': 'M3.2 15.6V3.8H5v11.8H3.2zm3.2 0V8.6h1.8v7H6.4zm3.2 0V6.2h1.8v9.4H9.6zm3.2 0V9.8h1.8v5.8h-1.8z',
  'finance-autopay': 'M9.6 2.8a6.9 6.9 0 016.7 5.3h1.7l-2.4 2.4-2.4-2.4h1.4a5.1 5.1 0 10-.9 4.2l1.4.9A6.9 6.9 0 119.6 2.8zm-.9 3.3h1.8v3.2l2.5 1.5-.9 1.5-3.4-2V6.1z',
  'finance-sum': 'M4.1 4h11.8v1.8H7.3l4.1 4.2-4.1 4.2h8.6V16H4.1v-1.7l4.8-4.3-4.8-4.3V4z',
  'finance-percent': 'M6.3 5.2a1.6 1.6 0 110 3.2 1.6 1.6 0 010-3.2zm7.4 6.4a1.6 1.6 0 110 3.2 1.6 1.6 0 010-3.2zM6.2 14.8l7.6-9.6 1.4 1.1-7.6 9.6-1.4-1.1z',
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

  registerTheme('demo-registry-contrast', demoRegistryContrastTheme);
  void getTheme('demo-registry-contrast');

  registerFinanceIcons();
  registryInitialized = true;
};

function AppContent() {
  ensureRegistryExtensions();

  const { currentTheme } = useTheme();
  const siteBannerHeight = 38;
  const navbarBaseHeight = 88;
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
    <>
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

        <div style={{ marginTop: `${navOffset + navbarBaseHeight}px` }}>
          <div
            style={{
              minHeight: `${siteBannerHeight}px`,
              display: 'flex',
              alignItems: 'center',
              background: 'rgba(95, 75, 139, 0.35)',
              color: '#ffffff',
              borderBottom: '1px solid rgba(255, 255, 255, 0.14)',
              fontSize: '0.85rem',
              fontWeight: 700,
              lineHeight: 1.25,
            }}
          >
            <span
              style={{
                width: '100%',
                textAlign: 'center',
                color: '#ffffff',
                opacity: 1,
                textShadow: '0 1px 2px rgba(0,0,0,0.5)',
                padding: '0.35rem 1rem',
              }}
            >
              This demo site is built entirely with Widgemo — every data view you see is a live instance.
            </span>
          </div>

          <Suspense fallback={<RouteFallback />}>
            <Routes>
              <Route
                path="/"
                element={<WidgemoThemeProvider theme={currentTheme}><MainPage /></WidgemoThemeProvider>}
              />
              <Route
                path="/sandbox"
                element={<WidgemoThemeProvider theme={currentTheme}><SandboxPage /></WidgemoThemeProvider>}
              />
              <Route
                path="/examples"
                element={<WidgemoThemeProvider theme={currentTheme}><ExamplesPage /></WidgemoThemeProvider>}
              />
              <Route
                path="/applications"
                element={<Navigate to="/examples#app-mockups" replace />}
              />
              <Route
                path="/lab"
                element={<WidgemoThemeProvider theme={currentTheme}><ProgressiveExamplesPage /></WidgemoThemeProvider>}
              />
              <Route
                path="/progressive-examples"
                element={<Navigate to="/lab" replace />}
              />
              <Route
                path="/simplified-test"
                element={<Navigate to="/examples" replace />}
              />
              <Route
                path="/dashboard"
                element={<WidgemoThemeProvider theme={currentTheme}><DashboardPage /></WidgemoThemeProvider>}
              />
              <Route
                path="/cashflow-dashboard"
                element={<WidgemoThemeProvider theme={currentTheme}><CashflowDashboardPage /></WidgemoThemeProvider>}
              />
              <Route
                path="*"
                element={
                  <WidgemoThemeProvider theme={currentTheme}>
                    <div style={{ padding: '2rem', backgroundColor: 'yellow' }}>
                      <h1>Route Not Found</h1>
                      <p>Current path: {window.location.pathname}</p>
                      <p>Available routes: /, /examples, /sandbox, /lab, /dashboard, /cashflow-dashboard</p>
                    </div>
                  </WidgemoThemeProvider>
                }
              />
            </Routes>
          </Suspense>
        </div>
      </div>
    </>
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
