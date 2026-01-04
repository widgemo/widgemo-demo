import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { FaPalette } from 'react-icons/fa';

interface ThemeSelectorProps {
  currentTheme: string;
  onThemeChange: (theme: string) => void;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  currentTheme,
  onThemeChange
}) => {
  const themes = [
    { key: 'theme-light', label: 'Light', color: '#ffffff' },
    { key: 'theme-light-blue', label: 'Light Blue', color: '#f0f8ff' },
    { key: 'theme-light-green', label: 'Light Green', color: '#f0fff0' },
    { key: 'theme-light-purple', label: 'Light Purple', color: '#f8f0ff' },
    { key: 'theme-dark', label: 'Dark', color: '#1a1a1a' },
    { key: 'theme-dark-red', label: 'Dark Red', color: '#2a1a1a' },
    { key: 'theme-dark-purple', label: 'Dark Purple', color: '#1a1a2a' },
    { key: 'theme-dark-teal', label: 'Dark Teal', color: '#1a2a2a' },
  ];

  const currentThemeData = themes.find(t => t.key === currentTheme);

  return (
    <Dropdown className="ms-3">
      <Dropdown.Toggle variant="outline-secondary" size="sm" id="theme-selector">
        <FaPalette className="me-2" />
        {currentThemeData?.label || 'Theme'}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {themes.map(theme => (
          <Dropdown.Item
            key={theme.key}
            active={currentTheme === theme.key}
            onClick={() => onThemeChange(theme.key)}
            className="d-flex align-items-center"
          >
            <div
              className="me-2"
              style={{
                width: '16px',
                height: '16px',
                backgroundColor: theme.color,
                border: '1px solid #ccc',
                borderRadius: '2px'
              }}
            />
            {theme.label}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};