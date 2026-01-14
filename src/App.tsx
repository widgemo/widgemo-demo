import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, ThemeContext } from './contexts/ThemeContext';
import { AppNavbar } from './components/Navbar';
import { MainPage } from './components/MainPage';
import { SandboxPage } from './components/SandboxPage';
import { useContext } from 'react';
import { getThemeBorderColor, getThemeBackgroundColor } from './utils/themeConfig';

function AppContent() {
  const { currentTheme } = useContext(ThemeContext);
  
  return (
    <div 
      className={`App ${currentTheme}`}
      style={{
        background: `linear-gradient(to bottom, ${getThemeBorderColor(currentTheme)} 0%, ${getThemeBackgroundColor(currentTheme)} 100%)`,
        backgroundAttachment: 'fixed',
        minHeight: '100vh'
      }}
    >
      <AppNavbar />

      <Routes>
        <Route
          path="/"
          element={<MainPage />}
        />
        <Route
          path="/sandbox"
          element={<SandboxPage />}
        />
      </Routes>
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
