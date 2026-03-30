import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { WidgemoThemeProvider, widgemoRegistry } from '@widgemo/widgemo-core';
import { AppNavbar, DevBanner } from './components/navigation';
import { MainPage } from './components/MainPage';
import { SandboxPage } from './components/SandboxPage';
import { SimplifiedTest } from './components/SimplifiedTest';
import { useTheme } from './hooks/useTheme';
import { TimelineMode } from './components/custom-modes';
import { registerProgressBarField, registerJsonField } from './components/custom-fields';
import './App.css';

// Register custom renderAs renderers once at module level
widgemoRegistry.registerWidgemoRenderAs(registerProgressBarField());
widgemoRegistry.registerWidgemoRenderAs(registerJsonField());

function AppContent() {
  const { currentTheme } = useTheme();
  const [bannerVisible, setBannerVisible] = useState(
    window.location.hostname === 'dev.widgemo.com' &&
    localStorage.getItem('widgemo-devbanner-dismissed') !== 'true'
  );
  const [navOffset, setNavOffset] = useState(0);
  
  // Register custom modes
  widgemoRegistry.registerWidgemoMode({
    name: 'timeline',
    component: TimelineMode,
    defaultConfig: {
      dateField: 'date',
      titleField: 'title',
      sortOrder: 'desc',
      orientation: 'vertical',
      showLines: true,
      color: '#007bff'
    }
  });

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
              path="*"
              element={
                <div style={{ padding: '2rem', backgroundColor: 'yellow' }}>
                  <h1>Route Not Found</h1>
                  <p>Current path: {window.location.pathname}</p>
                  <p>Available routes: /, /sandbox, /simplified-test</p>
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
