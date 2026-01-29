import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { useTheme } from './hooks/useTheme';
import { WidgemoThemeProvider } from 'widgemo-core';
import { AppNavbar } from './components/Navbar';
import { MainPage } from './components/MainPage';
import { SandboxPage } from './components/SandboxPage';
import { SimplifiedTest } from './components/SimplifiedTest';
import './App.css';

function AppContent() {
  const { currentTheme: theme } = useTheme();

  // Bridge app theme to widgemo theme
  const appAccent = theme === 'dark' ? 'hsl(110 168 254)' : 'hsl(249 115 22)';
  const appBgPrimary = theme === 'dark' ? '#121212' : '#ffffff';
  const appTextPrimary = theme === 'dark' ? '#e0e0e0' : '#495057';
  const appBorder = theme === 'dark' ? '#343a40' : '#dee2e6';
  const appTextSecondary = theme === 'dark' ? '#adb5bd' : '#6c757d';

  const widgemoOverrides = {
    colors: {
      primary: appAccent,
      background: appBgPrimary,
      text: appTextPrimary,
      border: appBorder,
      secondary: appTextSecondary,
      success: appAccent, // Reuse accent for success
    }
  };

  return (
    <WidgemoThemeProvider theme={widgemoOverrides}>
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
