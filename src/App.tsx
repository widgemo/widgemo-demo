import { Routes, Route } from 'react-router-dom';
import { useMemo } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { WidgemoThemeProvider } from 'widgemo-core';
import { createWidgemoTheme } from './utils/widgemoThemeMapping';
import { AppNavbar } from './components/Navbar';
import { MainPage } from './components/MainPage';
import { SandboxPage } from './components/SandboxPage';
import { SimplifiedTest } from './components/SimplifiedTest';
import { useTheme } from './hooks/useTheme';
import './App.css';

function AppContent() {
  const { currentTheme } = useTheme();
  
  // Create widgemo theme based on app's current theme, not system preference
  const widgemoTheme = useMemo(() => createWidgemoTheme(currentTheme === 'dark'), [currentTheme]);

  return (
    <WidgemoThemeProvider theme={widgemoTheme}>
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
