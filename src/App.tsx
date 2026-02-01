import { Routes, Route } from 'react-router-dom';
import { useMemo } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { WidgemoThemeProvider } from 'widgemo-core';
import { AppNavbar } from './components/Navbar';
import { MainPage } from './components/MainPage';
import { SandboxPage } from './components/SandboxPage';
import { SimplifiedTest } from './components/SimplifiedTest';
import { useTheme } from './hooks/useTheme';
import './App.css';

function AppContent() {
  const { currentTheme } = useTheme();
  
  // For now, use no theme overrides - let the base themes handle everything
  // Apps can add specific overrides here as needed
  const widgemoThemeOverrides = useMemo(() => {
    return undefined; // No overrides - use base themes as-is
  }, []);

  return (
    <WidgemoThemeProvider mode={currentTheme} theme={widgemoThemeOverrides}>
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
