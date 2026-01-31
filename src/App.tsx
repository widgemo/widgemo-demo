import { Routes, Route } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { WidgemoThemeProvider } from 'widgemo-core';
import { createWidgemoTheme } from './utils/widgemoThemeMapping';
import { AppNavbar } from './components/Navbar';
import { MainPage } from './components/MainPage';
import { SandboxPage } from './components/SandboxPage';
import { SimplifiedTest } from './components/SimplifiedTest';
import './App.css';

function AppContent() {
  const [isDark, setIsDark] = useState(() => 
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  
  // Track system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => setIsDark(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Recreate theme when dark mode changes to ensure correct colors
  const widgemoTheme = useMemo(() => createWidgemoTheme(isDark), [isDark]);

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
