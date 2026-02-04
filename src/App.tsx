import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { WidgemoThemeProvider, widgemoRegistry } from 'widgemo-core';
import { AppNavbar } from './components/Navbar';
import { MainPage } from './components/MainPage';
import { SandboxPage } from './components/SandboxPage';
import { SimplifiedTest } from './components/SimplifiedTest';
import { useTheme } from './hooks/useTheme';
import { registerProgressBarField, registerJsonField } from './components/custom-fields';
import './App.css';

function AppContent() {
  const { currentTheme } = useTheme();
  
  // Register custom field types
  widgemoRegistry.registerWidgemoFieldType(registerProgressBarField());

  widgemoRegistry.registerWidgemoFieldType(registerJsonField());

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
      <div className="App" style={{ 
        minHeight: '100vh',
        color: 'var(--app-text-primary)',
        transition: 'color 0.3s ease'
      }}>
        <AppNavbar />

        <div style={{ marginTop: '56px' }}>
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
          </Routes>
        </div>
      </div>
    </WidgemoThemeProvider>
  );
}

function App() {
  console.log('🚀 App component rendering');
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
