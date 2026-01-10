import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, ThemeContext } from './contexts/ThemeContext';
import { AppNavbar } from './components/Navbar';
import { MainPage } from './components/MainPage';
import { SandboxPage } from './components/SandboxPage';
import { useContext } from 'react';

function AppContent() {
  const { currentTheme } = useContext(ThemeContext);
  
  return (
    <div className={`App ${currentTheme}`}>
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
