import React from 'react';
import { Button } from 'react-bootstrap';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../hooks/useTheme';

export const ThemeToggle: React.FC = () => {
  const { currentTheme, setCurrentTheme } = useTheme();

  const toggleTheme = () => {
    setCurrentTheme(currentTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <Button
      variant="outline-light"
      size="sm"
      onClick={toggleTheme}
      className="d-flex align-items-center gap-2"
      title={`Switch to ${currentTheme === 'light' ? 'dark' : 'light'} mode`}
    >
      {currentTheme === 'light' ? (
        <>
          <FaMoon size={14} />
          <span className="d-none d-sm-inline">Dark Mode</span>
        </>
      ) : (
        <>
          <FaSun size={14} />
          <span className="d-none d-sm-inline">Light Mode</span>
        </>
      )}
    </Button>
  );
};