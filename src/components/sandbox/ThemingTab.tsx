import React from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import { FaCheck } from 'react-icons/fa';
import { generatePalette } from 'widgemo-core';
import type { WidgemoTheme } from 'widgemo-core';

interface ThemingTabProps {
  /** Current primary color */
  primaryColor: string;
  /** Whether to use Widgemo defaults */
  useThemeDefaults: boolean;
  /** Custom theme properties */
  customTheme: Partial<WidgemoTheme>;
  /** Whether dark mode is enabled */
  darkMode: boolean;
  /** Callback when primary color changes */
  onPrimaryColorChange: (color: string) => void;
  /** Callback when defaults toggle changes */
  onUseDefaultsChange: (useDefaults: boolean) => void;
  /** Callback when custom theme changes */
  onCustomThemeChange: (theme: Partial<WidgemoTheme>) => void;
  /** Callback when dark mode changes */
  onDarkModeChange: (dark: boolean) => void;
  /** Callback when apply theme is clicked */
  onApplyTheme: () => void;
}

/**
 * ThemingTab - A focused component for theme configuration and visualization
 *
 * Features:
 * - Primary color picker with hex input
 * - Auto palette generation preview with color swatches
 * - Custom theme property editors (border radius, spacing, fonts)
 * - Dark mode toggle
 * - Use defaults switch
 * - Apply theme button with feedback
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
  primaryColor,
  useThemeDefaults,
  customTheme,
  darkMode,
  onPrimaryColorChange,
  onUseDefaultsChange,
  onCustomThemeChange,
  onDarkModeChange,
  onApplyTheme,
}) => {
  const handleCustomThemeChange = (key: keyof WidgemoTheme, value: string) => {
    onCustomThemeChange({
      ...customTheme,
      [key]: value || undefined
    });
  };

  const palette = useThemeDefaults
    ? generatePalette('#0066cc', { dark: false })
    : generatePalette(primaryColor, { dark: darkMode });

  return (
    <div className="d-flex flex-column h-100">
      <div className="flex-grow-1 overflow-auto">
        <div className="row g-3">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h6 className="mb-0">Theme Configuration</h6>
              <Form.Check
                type="switch"
                label="Use Widgemo Defaults"
                checked={useThemeDefaults}
                onChange={(e) => onUseDefaultsChange(e.target.checked)}
              />
            </div>
          </div>

          {!useThemeDefaults && (
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
              The palette is automatically generated from your primary color using WCAG-compliant contrast calculations.
            </Alert>
          </div>
        </div>
      </div>
      <div className="flex-shrink-0 mt-3">
        <Button
          variant="primary"
          size="sm"
          onClick={onApplyTheme}
          aria-label="Apply theme changes to preview"
        >
          <FaCheck className="me-1" />
          Apply Theme
        </Button>
      </div>
    </div>
  );
};