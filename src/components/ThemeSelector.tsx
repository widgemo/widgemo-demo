/*
 * LEGACY COMPONENT - No longer used after switching to simple light/dark toggle
 * Replaced by ThemeToggle.tsx for cleaner UI
 * Keeping commented out for reference
 */

/*
import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { FaPalette } from 'react-icons/fa';
import type { Theme } from '../utils/themeConfig';
import { getAllThemes, getThemeConfig } from '../utils/themeConfig';

interface ThemeSelectorProps {
  currentTheme: Theme;
  onThemeChange: (theme: Theme) => void;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  currentTheme,
  onThemeChange
}) => {
  const themes = getAllThemes();
  const currentThemeData = getThemeConfig(currentTheme);

  return (
    <Dropdown className="ms-3">
      <Dropdown.Toggle variant="outline-secondary" size="sm" id="theme-selector" style={{ width: '150px' }}>
        <FaPalette className="me-2" />
        {currentThemeData?.label || 'Theme'}
      </Dropdown.Toggle>
      <Dropdown.Menu align={{lg: 'end'}}>
        {themes.map(theme => (
          <Dropdown.Item
            key={theme.key}
            active={currentTheme === theme.key}
            onClick={() => {
              console.log('ThemeSelector: Selecting theme:', theme.key);
              onThemeChange(theme.key);
            }}
            className="d-flex align-items-center"
          >
            <div
              className="me-2"
              style={{
                width: '16px',
                height: '16px',
                backgroundColor: theme.backgroundColor,
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
*/