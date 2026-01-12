import React from 'react';
import { Form, Alert } from 'react-bootstrap';
import { generatePalette } from 'widgemo-core';
import type { WidgemoTheme } from 'widgemo-core';

type ThemeMode = 'defaults' | 'config' | 'custom';

interface ThemingTabProps {
  /** Current theme mode */
  themeMode: ThemeMode;
  /** Current primary color (for custom mode) */
  primaryColor: string;
  /** Custom theme properties (for custom mode) */
  customTheme: Partial<WidgemoTheme>;
  /** Whether dark mode is enabled (for custom mode) */
  darkMode: boolean;
  /** Current config theme (for display in config mode) */
  configTheme?: Partial<WidgemoTheme>;
  /** Callback when theme mode changes */
  onThemeModeChange: (mode: ThemeMode) => void;
  /** Callback when primary color changes */
  onPrimaryColorChange: (color: string) => void;
  /** Callback when custom theme changes */
  onCustomThemeChange: (theme: Partial<WidgemoTheme>) => void;
  /** Callback when dark mode changes */
  onDarkModeChange: (dark: boolean) => void;
}

/**
 * ThemingTab - A focused component for theme configuration and visualization
 *
 * Features:
 * - Three theme modes: Use Widgemo Defaults, Use Config, Custom Theme
 * - Primary color picker with hex input (Custom mode)
 * - Auto palette generation preview with color swatches
 * - Custom theme property editors (border radius, spacing, fonts) (Custom mode)
 * - Dark mode toggle (Custom mode)
 * - Live preview integration
 *
 * Future extensibility:
 * - More color pickers (secondary, accent, etc.)
 * - Advanced theme properties (shadows, gradients)
 * - Theme import/export
 * - Preset themes
 * - Accessibility contrast checking
 * - Theme validation
 */
export const ThemingTab: React.FC<ThemingTabProps> = ({
  themeMode,
  primaryColor,
  customTheme,
  darkMode,
  configTheme,
  onThemeModeChange,
  onPrimaryColorChange,
  onCustomThemeChange,
  onDarkModeChange,
}) => {
  const handleCustomThemeChange = (key: keyof WidgemoTheme, value: string) => {
    onCustomThemeChange({
      ...customTheme,
      [key]: value || undefined
    });
  };

  // Generate palette based on current mode
  const getPaletteForMode = () => {
    switch (themeMode) {
      case 'defaults':
        return generatePalette('#0066cc', { dark: false });
      case 'config':
        return configTheme ? generatePalette(
          configTheme.primary || '#0066cc',
          { dark: configTheme.dark || false }
        ) : generatePalette('#0066cc', { dark: false });
      case 'custom':
        return generatePalette(primaryColor, { dark: darkMode });
      default:
        return generatePalette('#0066cc', { dark: false });
    }
  };

  const palette = getPaletteForMode();

  return (
    <div className="d-flex flex-column h-100">
      <div className="flex-grow-1 overflow-auto">
        <div className="row g-3">
          <div className="col-12">
            <h6 className="mb-3">Theme Mode</h6>
            <Form.Group>
              <Form.Check
                type="radio"
                label="Use Widgemo Defaults"
                name="themeMode"
                value="defaults"
                checked={themeMode === 'defaults'}
                onChange={(e) => onThemeModeChange(e.target.value as ThemeMode)}
                className="mb-2"
              />
              <Form.Text className="text-muted small mb-3 d-block">
                Ignore theme property in JSON config and use Widgemo's built-in default theme.
              </Form.Text>

              <Form.Check
                type="radio"
                label="Use Config"
                name="themeMode"
                value="config"
                checked={themeMode === 'config'}
                onChange={(e) => onThemeModeChange(e.target.value as ThemeMode)}
                className="mb-2"
              />
              <Form.Text className="text-muted small mb-3 d-block">
                Use theming information directly from the Config JSON in the config editor.
              </Form.Text>

              <Form.Check
                type="radio"
                label="Custom Theme"
                name="themeMode"
                value="custom"
                checked={themeMode === 'custom'}
                onChange={(e) => onThemeModeChange(e.target.value as ThemeMode)}
                className="mb-2"
              />
              <Form.Text className="text-muted small mb-3 d-block">
                Override the JSON config and apply custom theme settings below.
              </Form.Text>
            </Form.Group>
          </div>

          {themeMode === 'custom' && (
            <>
              <div className="col-md-6">
                <Form.Label className="small fw-bold">Primary Color</Form.Label>
                <div className="d-flex gap-2">
                  <Form.Control
                    type="color"
                    value={primaryColor}
                    onChange={(e) => onPrimaryColorChange(e.target.value)}
                    style={{ width: '60px' }}
                    aria-label="Primary color picker"
                  />
                  <Form.Control
                    type="text"
                    size="sm"
                    value={primaryColor}
                    onChange={(e) => onPrimaryColorChange(e.target.value)}
                    placeholder="#0066cc"
                    className="flex-grow-1"
                    aria-label="Primary color hex value"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <Form.Label className="small fw-bold">Dark Mode</Form.Label>
                <Form.Check
                  type="switch"
                  checked={darkMode}
                  onChange={(e) => onDarkModeChange(e.target.checked)}
                  label={darkMode ? 'Enabled' : 'Disabled'}
                  aria-label="Toggle dark mode"
                />
              </div>

              <div className="col-12">
                <Form.Label className="small fw-bold">Custom Theme Properties</Form.Label>
                <div className="row g-2">
                  <div className="col-md-6">
                    <Form.Control
                      type="text"
                      size="sm"
                      placeholder="Border Radius (e.g., 8px)"
                      value={customTheme.borderRadius || ''}
                      onChange={(e) => handleCustomThemeChange('borderRadius', e.target.value)}
                      aria-label="Border radius"
                    />
                  </div>
                  <div className="col-md-6">
                    <Form.Control
                      type="text"
                      size="sm"
                      placeholder="Spacing (e.g., 16px)"
                      value={customTheme.spacing || ''}
                      onChange={(e) => handleCustomThemeChange('spacing', e.target.value)}
                      aria-label="Base spacing"
                    />
                  </div>
                  <div className="col-md-6">
                    <Form.Control
                      type="text"
                      size="sm"
                      placeholder="Font Family"
                      value={customTheme.fontFamily || ''}
                      onChange={(e) => handleCustomThemeChange('fontFamily', e.target.value)}
                      aria-label="Font family"
                    />
                  </div>
                  <div className="col-md-6">
                    <Form.Control
                      type="text"
                      size="sm"
                      placeholder="Font Size (e.g., 14px)"
                      value={customTheme.fontSize || ''}
                      onChange={(e) => handleCustomThemeChange('fontSize', e.target.value)}
                      aria-label="Base font size"
                    />
                  </div>
                </div>
              </div>
            </>
          )}

          {themeMode === 'config' && configTheme && (
            <div className="col-12">
              <Alert variant="info" className="py-2">
                <strong>Current Config Theme:</strong>
                <pre className="mt-2 mb-0 small">{JSON.stringify(configTheme, null, 2)}</pre>
              </Alert>
            </div>
          )}

          <div className="col-12">
            <Form.Label className="small fw-bold">Generated Palette Preview</Form.Label>
            <div className="row g-2">
              <div className="col-md-4">
                <div className="border rounded p-2 text-center">
                  <div
                    className="rounded mb-1"
                    style={{
                      height: '40px',
                      backgroundColor: palette.primary,
                      color: palette.text,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      fontWeight: 'bold'
                    }}
                    aria-label={`Primary color: ${palette.primary}`}
                  >
                    Primary
                  </div>
                  <small className="text-muted d-block">{palette.primary}</small>
                </div>
              </div>
              <div className="col-md-4">
                <div className="border rounded p-2 text-center">
                  <div
                    className="rounded mb-1"
                    style={{
                      height: '40px',
                      backgroundColor: palette.primaryLight,
                      color: '#000',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px'
                    }}
                    aria-label={`Primary light color: ${palette.primaryLight}`}
                  >
                    Light
                  </div>
                  <small className="text-muted d-block">{palette.primaryLight}</small>
                </div>
              </div>
              <div className="col-md-4">
                <div className="border rounded p-2 text-center">
                  <div
                    className="rounded mb-1"
                    style={{
                      height: '40px',
                      backgroundColor: palette.primaryDark,
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px'
                    }}
                    aria-label={`Primary dark color: ${palette.primaryDark}`}
                  >
                    Dark
                  </div>
                  <small className="text-muted d-block">{palette.primaryDark}</small>
                </div>
              </div>
              <div className="col-md-6">
                <div className="border rounded p-2 text-center">
                  <div
                    className="rounded mb-1"
                    style={{
                      height: '40px',
                      backgroundColor: palette.accent,
                      color: '#000',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px'
                    }}
                    aria-label={`Accent color: ${palette.accent}`}
                  >
                    Accent
                  </div>
                  <small className="text-muted d-block">{palette.accent}</small>
                </div>
              </div>
              <div className="col-md-6">
                <div className="border rounded p-2 text-center">
                  <div
                    className="rounded mb-1"
                    style={{
                      height: '40px',
                      backgroundColor: palette.background,
                      color: palette.text === '#ffffff' ? '#000' : '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px'
                    }}
                    aria-label={`Background color: ${palette.background}`}
                  >
                    Background
                  </div>
                  <small className="text-muted d-block">{palette.background}</small>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12">
            <Alert variant="info" className="py-2 small">
              <strong>Theme Integration:</strong> Changes here will be applied to the live preview on the right.
              {themeMode === 'defaults' && ' Using Widgemo\'s built-in default theme.'}
              {themeMode === 'config' && ' Using theme configuration from the JSON config editor.'}
              {themeMode === 'custom' && ' The palette is automatically generated from your primary color using WCAG-compliant contrast calculations.'}
            </Alert>
          </div>
        </div>
      </div>
    </div>
  );
};