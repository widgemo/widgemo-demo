import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, ThemeContext } from './contexts/ThemeContext';
import { AppNavbar } from './components/Navbar';
import { MainPage } from './components/MainPage';
import { SandboxPage } from './components/SandboxPage';
import { useContext } from 'react';

function AppContent() {
  const { currentTheme } = useContext(ThemeContext);
  
  console.log('AppContent rendering with theme:', currentTheme);
  
  return (
    <div 
      className={`App ${currentTheme}`}
      ref={(el) => {
        if (el) {
          const computedStyle = window.getComputedStyle(el);
          console.log('App background:', computedStyle.background);
          console.log('App background-image:', computedStyle.backgroundImage);
        }
      }}
      style={{
        background: `linear-gradient(to bottom, var(--border-color) 0%, var(--bg-color) 100%) fixed`,
        backgroundSize: '100% 100vh',
        minHeight: '100vh'
      }}
    >
      <div>
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
