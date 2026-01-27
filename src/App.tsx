import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { AppNavbar } from './components/Navbar';
import { MainPage } from './components/MainPage';
import { SandboxPage } from './components/SandboxPage';
import { SimplifiedTest } from './components/SimplifiedTest';

function AppContent() {
  const { currentTheme } = useTheme();
  
  return (
    <div 
      className={`App ${currentTheme}`}
      style={{
        background: `linear-gradient(to bottom, var(--border-color) 0%, var(--bg-color) 100%) fixed`,
        backgroundSize: '100% 100vh',
        minHeight: '100vh'
      }}
    >
      <div>
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
    </div>
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
