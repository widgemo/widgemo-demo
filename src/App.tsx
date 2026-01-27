import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { AppNavbar } from './components/Navbar';
import { MainPage } from './components/MainPage';
import { SandboxPage } from './components/SandboxPage';
import { SimplifiedTest } from './components/SimplifiedTest';
import { getThemeConfig } from './utils/themeConfig';

function AppContent() {
  console.log('📱 AppContent rendering');
  const { currentTheme } = useTheme();
  const themeConfig = getThemeConfig(currentTheme);
  
  return (
    <div 
      className={`App ${currentTheme}`}
      style={{
        background: `linear-gradient(to bottom, ${themeConfig?.borderColor || '#cccccc'} 0%, ${themeConfig?.backgroundColor || '#ffffff'} 100%) fixed`,
        backgroundSize: '100% 100vh',
        minHeight: '100vh',
        color: themeConfig?.textColor || '#333333'
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
  console.log('🚀 App component rendering');
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
