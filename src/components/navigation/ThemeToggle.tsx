import React from 'react';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../../hooks/useTheme';

export const ThemeToggle: React.FC = () => {
  const { currentTheme, setCurrentTheme } = useTheme();

  const toggleTheme = () => {
    setCurrentTheme(currentTheme === 'light' ? 'dark' : 'light');
  };

  const tooltipText = `Change to ${currentTheme === 'light' ? 'dark' : 'light'} mode`;

  return (
    <OverlayTrigger
      placement="bottom"
      overlay={<Tooltip id="theme-toggle-tooltip">{tooltipText}</Tooltip>}
    >
      <Button
        variant="outline-light"
        size="sm"
        onClick={toggleTheme}
        className="d-flex align-items-center justify-content-center rounded-circle"
        style={{ width: '40px', height: '40px' }}
        aria-label={tooltipText}
      >
        {currentTheme === 'light' ? (
          <FaMoon size={16} />
        ) : (
          <FaSun size={16} />
        )}
      </Button>
    </OverlayTrigger>
  );
};