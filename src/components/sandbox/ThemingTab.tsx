import React from 'react';
import { Form, Alert, Button } from 'react-bootstrap';
import { generatePalette } from 'widgemo-core';
import type { WidgemoTheme } from 'widgemo-core';
import { defaultTheme } from 'widgemo-core';
import { getThemeBorderColor } from '../../utils/themeConfig';

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
  /** Whether to auto-generate palette colors */
  autoGeneratePalette: boolean;
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
  /** Callback when auto-generate palette changes */
  onAutoGeneratePaletteChange: (auto: boolean) => void;
  /** Current global theme key for border styling */
  currentTheme: string;
}

/**
 * ThemingTab - A focused component for theme configuration and visualization
 *
 * Features:
 * - Three theme modes: Use Widgemo Defaults, Use Config theme properties, Custom Theme
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
  autoGeneratePalette,
  configTheme,
  onThemeModeChange,
  onPrimaryColorChange,
  onCustomThemeChange,
  onDarkModeChange,
  onAutoGeneratePaletteChange,
  currentTheme,
}) => {
  const handleCustomThemeChange = (key: keyof WidgemoTheme, value: string | boolean) => {
    onCustomThemeChange({
      ...customTheme,
      [key]: value || undefined
    });
  };

  const handleResetToDefaults = () => {
    onCustomThemeChange({});
    onPrimaryColorChange(defaultTheme.primary!);
    onDarkModeChange(defaultTheme.dark!);
    onAutoGeneratePaletteChange(true);
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
        if (autoGeneratePalette) {
          return generatePalette(primaryColor, { dark: darkMode });
        } else {
          // Use custom theme values, with fallbacks to generated palette
          const generated = generatePalette(primaryColor, { dark: darkMode });
          return {
            primary: customTheme.primary || primaryColor,
            primaryLight: customTheme.primaryLight || generated.primaryLight,
            primaryDark: customTheme.primaryDark || generated.primaryDark,
            accent: customTheme.accent || generated.accent,
            text: customTheme.text || generated.text,
            background: customTheme.background || generated.background,
            secondary: customTheme.secondary || defaultTheme.secondary,
            success: customTheme.success || defaultTheme.success,
            warning: customTheme.warning || defaultTheme.warning,
            danger: customTheme.danger || defaultTheme.danger,
            info: customTheme.info || defaultTheme.info,
            light: customTheme.light || defaultTheme.light,
            colorDark: customTheme.colorDark || defaultTheme.colorDark,
          };
        }
      default:
        return generatePalette('#0066cc', { dark: false });
    }
  };

  const palette = getPaletteForMode();

  // Get theme border color for styling the preview cards
  const themeBorderColor = getThemeBorderColor(currentTheme);

  return (
    <div className="d-flex flex-column h-100">
      <div className="flex-grow-1 overflow-auto" style={{ overflowX: 'hidden' }}>
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
                label="Use Config theme properties"
                name="themeMode"
                value="config"
                checked={themeMode === 'config'}
                onChange={(e) => onThemeModeChange(e.target.value as ThemeMode)}
                className="mb-2"
              />
              <Form.Text className="text-muted small mb-3 d-block">
                Use theme properties directly from the Config JSON in the config editor.
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
              <div className="col-md-6">
                <Form.Label className="small fw-bold">Auto-Generate Palette</Form.Label>
                <Form.Check
                  type="switch"
                  checked={autoGeneratePalette}
                  onChange={(e) => onAutoGeneratePaletteChange(e.target.checked)}
                  label={autoGeneratePalette ? 'Enabled' : 'Disabled'}
                  aria-label="Toggle auto-generated palette"
                />
                <Form.Text className="text-muted small">
                  When enabled, colors like accent, primaryLight are auto-generated from primary color.
                </Form.Text>
              </div>
              <div className="col-12">
                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={handleResetToDefaults}
                  className="w-100"
                >
                  Reset to Defaults
                </Button>
                <Form.Text className="text-muted small">
                  Reset all custom theme properties to Widgemo's default values.
                </Form.Text>
              </div>

              <div className="col-12">
                <Form.Label className="small fw-bold">Color Palette</Form.Label>
                <div className="row g-2">
                  {!autoGeneratePalette && (
                    <>
                      <div className="col-md-6">
                        <Form.Control
                          type="text"
                          size="sm"
                          placeholder="Primary Light (e.g., #338fff)"
                          value={customTheme.primaryLight || ''}
                          onChange={(e) => handleCustomThemeChange('primaryLight', e.target.value)}
                          aria-label="Primary light color"
                        />
                      </div>
                      <div className="col-md-6">
                        <Form.Control
                          type="text"
                          size="sm"
                          placeholder="Primary Dark (e.g., #004d99)"
                          value={customTheme.primaryDark || ''}
                          onChange={(e) => handleCustomThemeChange('primaryDark', e.target.value)}
                          aria-label="Primary dark color"
                        />
                      </div>
                      <div className="col-md-6">
                        <Form.Control
                          type="text"
                          size="sm"
                          placeholder="Accent (e.g., #66a3ff)"
                          value={customTheme.accent || ''}
                          onChange={(e) => handleCustomThemeChange('accent', e.target.value)}
                          aria-label="Accent color"
                        />
                      </div>
                      <div className="col-md-6">
                        <Form.Control
                          type="text"
                          size="sm"
                          placeholder="Text on Primary (e.g., #ffffff)"
                          value={customTheme.text || ''}
                          onChange={(e) => handleCustomThemeChange('text', e.target.value)}
                          aria-label="Text color"
                        />
                      </div>
                      <div className="col-md-6">
                        <Form.Control
                          type="text"
                          size="sm"
                          placeholder="Background (e.g., #ffffff)"
                          value={customTheme.background || ''}
                          onChange={(e) => handleCustomThemeChange('background', e.target.value)}
                          aria-label="Background color"
                        />
                      </div>
                    </>
                  )}
                  <div className="col-md-6">
                    <Form.Label className="small fw-bold">Secondary</Form.Label>
                    <div className="d-flex gap-2">
                      <Form.Control
                        type="color"
                        value={customTheme.secondary || '#6c757d'}
                        onChange={(e) => handleCustomThemeChange('secondary', e.target.value)}
                        style={{ width: '60px' }}
                        aria-label="Secondary color picker"
                      />
                      <Form.Control
                        type="text"
                        size="sm"
                        value={customTheme.secondary || ''}
                        onChange={(e) => handleCustomThemeChange('secondary', e.target.value)}
                        placeholder="#6c757d"
                        className="flex-grow-1"
                        aria-label="Secondary color hex value"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <Form.Label className="small fw-bold">Success</Form.Label>
                    <div className="d-flex gap-2">
                      <Form.Control
                        type="color"
                        value={customTheme.success || '#28a745'}
                        onChange={(e) => handleCustomThemeChange('success', e.target.value)}
                        style={{ width: '60px' }}
                        aria-label="Success color picker"
                      />
                      <Form.Control
                        type="text"
                        size="sm"
                        value={customTheme.success || ''}
                        onChange={(e) => handleCustomThemeChange('success', e.target.value)}
                        placeholder="#28a745"
                        className="flex-grow-1"
                        aria-label="Success color hex value"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <Form.Label className="small fw-bold">Warning</Form.Label>
                    <div className="d-flex gap-2">
                      <Form.Control
                        type="color"
                        value={customTheme.warning || '#ffc107'}
                        onChange={(e) => handleCustomThemeChange('warning', e.target.value)}
                        style={{ width: '60px' }}
                        aria-label="Warning color picker"
                      />
                      <Form.Control
                        type="text"
                        size="sm"
                        value={customTheme.warning || ''}
                        onChange={(e) => handleCustomThemeChange('warning', e.target.value)}
                        placeholder="#ffc107"
                        className="flex-grow-1"
                        aria-label="Warning color hex value"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <Form.Label className="small fw-bold">Danger</Form.Label>
                    <div className="d-flex gap-2">
                      <Form.Control
                        type="color"
                        value={customTheme.danger || '#dc3545'}
                        onChange={(e) => handleCustomThemeChange('danger', e.target.value)}
                        style={{ width: '60px' }}
                        aria-label="Danger color picker"
                      />
                      <Form.Control
                        type="text"
                        size="sm"
                        value={customTheme.danger || ''}
                        onChange={(e) => handleCustomThemeChange('danger', e.target.value)}
                        placeholder="#dc3545"
                        className="flex-grow-1"
                        aria-label="Danger color hex value"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <Form.Label className="small fw-bold">Info</Form.Label>
                    <div className="d-flex gap-2">
                      <Form.Control
                        type="color"
                        value={customTheme.info || '#17a2b8'}
                        onChange={(e) => handleCustomThemeChange('info', e.target.value)}
                        style={{ width: '60px' }}
                        aria-label="Info color picker"
                      />
                      <Form.Control
                        type="text"
                        size="sm"
                        value={customTheme.info || ''}
                        onChange={(e) => handleCustomThemeChange('info', e.target.value)}
                        placeholder="#17a2b8"
                        className="flex-grow-1"
                        aria-label="Info color hex value"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <Form.Label className="small fw-bold">Light</Form.Label>
                    <div className="d-flex gap-2">
                      <Form.Control
                        type="color"
                        value={customTheme.light || '#f8f9fa'}
                        onChange={(e) => handleCustomThemeChange('light', e.target.value)}
                        style={{ width: '60px' }}
                        aria-label="Light color picker"
                      />
                      <Form.Control
                        type="text"
                        size="sm"
                        value={customTheme.light || ''}
                        onChange={(e) => handleCustomThemeChange('light', e.target.value)}
                        placeholder="#f8f9fa"
                        className="flex-grow-1"
                        aria-label="Light color hex value"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <Form.Label className="small fw-bold">Dark Text</Form.Label>
                    <div className="d-flex gap-2">
                      <Form.Control
                        type="color"
                        value={customTheme.colorDark || '#343a40'}
                        onChange={(e) => handleCustomThemeChange('colorDark', e.target.value)}
                        style={{ width: '60px' }}
                        aria-label="Dark text color picker"
                      />
                      <Form.Control
                        type="text"
                        size="sm"
                        value={customTheme.colorDark || ''}
                        onChange={(e) => handleCustomThemeChange('colorDark', e.target.value)}
                        placeholder="#343a40"
                        className="flex-grow-1"
                        aria-label="Dark text color hex value"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12">
                <Form.Label className="small fw-bold">Typography & Spacing</Form.Label>
                <div className="row g-2">
                  <div className="col-md-6">
                    <Form.Control
                      type="text"
                      size="sm"
                      placeholder="Border Radius (e.g., 6px)"
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

              <div className="col-12">
                <Form.Label className="small fw-bold">Component Colors</Form.Label>
                <div className="row g-2">
                  <div className="col-md-6">
                    <Form.Label className="small fw-bold">Card Background</Form.Label>
                    <div className="d-flex gap-2">
                      <Form.Control
                        type="color"
                        value={customTheme.cardBg || '#ffffff'}
                        onChange={(e) => handleCustomThemeChange('cardBg', e.target.value)}
                        style={{ width: '60px' }}
                        aria-label="Card background color picker"
                      />
                      <Form.Control
                        type="text"
                        size="sm"
                        value={customTheme.cardBg || ''}
                        onChange={(e) => handleCustomThemeChange('cardBg', e.target.value)}
                        placeholder="#ffffff"
                        className="flex-grow-1"
                        aria-label="Card background color hex value"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <Form.Label className="small fw-bold">Card Border</Form.Label>
                    <div className="d-flex gap-2">
                      <Form.Control
                        type="color"
                        value={customTheme.cardBorder || '#dee2e6'}
                        onChange={(e) => handleCustomThemeChange('cardBorder', e.target.value)}
                        style={{ width: '60px' }}
                        aria-label="Card border color picker"
                      />
                      <Form.Control
                        type="text"
                        size="sm"
                        value={customTheme.cardBorder || ''}
                        onChange={(e) => handleCustomThemeChange('cardBorder', e.target.value)}
                        placeholder="#dee2e6"
                        className="flex-grow-1"
                        aria-label="Card border color hex value"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <Form.Label className="small fw-bold">Table Background</Form.Label>
                    <div className="d-flex gap-2">
                      <Form.Control
                        type="color"
                        value={customTheme.tableBg || '#ffffff'}
                        onChange={(e) => handleCustomThemeChange('tableBg', e.target.value)}
                        style={{ width: '60px' }}
                        aria-label="Table background color picker"
                      />
                      <Form.Control
                        type="text"
                        size="sm"
                        value={customTheme.tableBg || ''}
                        onChange={(e) => handleCustomThemeChange('tableBg', e.target.value)}
                        placeholder="#ffffff"
                        className="flex-grow-1"
                        aria-label="Table background color hex value"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <Form.Label className="small fw-bold">Table Border</Form.Label>
                    <div className="d-flex gap-2">
                      <Form.Control
                        type="color"
                        value={customTheme.tableBorder || '#dee2e6'}
                        onChange={(e) => handleCustomThemeChange('tableBorder', e.target.value)}
                        style={{ width: '60px' }}
                        aria-label="Table border color picker"
                      />
                      <Form.Control
                        type="text"
                        size="sm"
                        value={customTheme.tableBorder || ''}
                        onChange={(e) => handleCustomThemeChange('tableBorder', e.target.value)}
                        placeholder="#dee2e6"
                        className="flex-grow-1"
                        aria-label="Table border color hex value"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <Form.Label className="small fw-bold">Header Background</Form.Label>
                    <Form.Control
                      type="text"
                      size="sm"
                      value={customTheme.headerBg || ''}
                      onChange={(e) => handleCustomThemeChange('headerBg', e.target.value)}
                      placeholder="transparent"
                      aria-label="Header background color"
                    />
                  </div>
                </div>
              </div>

              <div className="col-12">
                <Form.Label className="small fw-bold">Interactive Elements</Form.Label>
                <div className="row g-2">
                  <div className="col-md-6">
                    <Form.Control
                      type="text"
                      size="sm"
                      placeholder="Button Border Radius (e.g., 4px)"
                      value={customTheme.buttonBorderRadius || ''}
                      onChange={(e) => handleCustomThemeChange('buttonBorderRadius', e.target.value)}
                      aria-label="Button border radius"
                    />
                  </div>
                  <div className="col-md-6">
                    <Form.Control
                      type="text"
                      size="sm"
                      placeholder="Button Padding (e.g., 4px 8px)"
                      value={customTheme.buttonPadding || ''}
                      onChange={(e) => handleCustomThemeChange('buttonPadding', e.target.value)}
                      aria-label="Button padding"
                    />
                  </div>
                  <div className="col-md-6">
                    <Form.Control
                      type="text"
                      size="sm"
                      placeholder="Button Height (e.g., 32px)"
                      value={customTheme.buttonHeight || ''}
                      onChange={(e) => handleCustomThemeChange('buttonHeight', e.target.value)}
                      aria-label="Button height"
                    />
                  </div>
                  <div className="col-md-6">
                    <Form.Control
                      type="text"
                      size="sm"
                      placeholder="Ghost Button Border (e.g., none)"
                      value={customTheme.ghostButtonBorder || ''}
                      onChange={(e) => handleCustomThemeChange('ghostButtonBorder', e.target.value)}
                      aria-label="Ghost button border"
                    />
                  </div>
                  <div className="col-md-6">
                    <Form.Label className="small fw-bold">Ghost Button Hover</Form.Label>
                    <div className="d-flex gap-2">
                      <Form.Control
                        type="color"
                        value={customTheme.ghostButtonHoverBg || '#e9ecef'}
                        onChange={(e) => handleCustomThemeChange('ghostButtonHoverBg', e.target.value)}
                        style={{ width: '60px' }}
                        aria-label="Ghost button hover background color picker"
                      />
                      <Form.Control
                        type="text"
                        size="sm"
                        value={customTheme.ghostButtonHoverBg || ''}
                        onChange={(e) => handleCustomThemeChange('ghostButtonHoverBg', e.target.value)}
                        placeholder="#e9ecef"
                        className="flex-grow-1"
                        aria-label="Ghost button hover background color hex value"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <Form.Control
                      type="text"
                      size="sm"
                      placeholder="Input Border Radius (e.g., 4px)"
                      value={customTheme.inputBorderRadius || ''}
                      onChange={(e) => handleCustomThemeChange('inputBorderRadius', e.target.value)}
                      aria-label="Input border radius"
                    />
                  </div>
                  <div className="col-md-6">
                    <Form.Control
                      type="text"
                      size="sm"
                      placeholder="Input Padding (e.g., 4px 8px)"
                      value={customTheme.inputPadding || ''}
                      onChange={(e) => handleCustomThemeChange('inputPadding', e.target.value)}
                      aria-label="Input padding"
                    />
                  </div>
                </div>
              </div>

              <div className="col-12">
                <Form.Label className="small fw-bold">Effects & States</Form.Label>
                <div className="row g-2">
                  <div className="col-md-6">
                    <Form.Label className="small fw-bold">Shadow Color</Form.Label>
                    <Form.Control
                      type="text"
                      size="sm"
                      value={customTheme.shadowColor || ''}
                      onChange={(e) => handleCustomThemeChange('shadowColor', e.target.value)}
                      placeholder="rgba(0, 0, 0, 0.15)"
                      aria-label="Shadow color"
                    />
                  </div>
                  <div className="col-md-6">
                    <Form.Label className="small fw-bold">Focus Color</Form.Label>
                    <div className="d-flex gap-2">
                      <Form.Control
                        type="color"
                        value={customTheme.focusColor || '#0066cc'}
                        onChange={(e) => handleCustomThemeChange('focusColor', e.target.value)}
                        style={{ width: '60px' }}
                        aria-label="Focus color picker"
                      />
                      <Form.Control
                        type="text"
                        size="sm"
                        value={customTheme.focusColor || ''}
                        onChange={(e) => handleCustomThemeChange('focusColor', e.target.value)}
                        placeholder="#0066cc"
                        className="flex-grow-1"
                        aria-label="Focus color hex value"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <Form.Check
                      type="switch"
                      checked={customTheme.shadow !== undefined ? customTheme.shadow : defaultTheme.shadow}
                      onChange={(e) => handleCustomThemeChange('shadow', e.target.checked)}
                      label="Enable Shadows"
                      aria-label="Toggle shadows"
                    />
                  </div>
                  <div className="col-md-6">
                    <Form.Check
                      type="switch"
                      checked={customTheme.showBorder !== undefined ? customTheme.showBorder : defaultTheme.showBorder}
                      onChange={(e) => handleCustomThemeChange('showBorder', e.target.checked)}
                      label="Show Borders"
                      aria-label="Toggle borders"
                    />
                  </div>
                  <div className="col-md-6">
                    <Form.Check
                      type="switch"
                      checked={customTheme.dynamicBackground !== undefined ? customTheme.dynamicBackground : defaultTheme.dynamicBackground}
                      onChange={(e) => handleCustomThemeChange('dynamicBackground', e.target.checked)}
                      label="Dynamic Background"
                      aria-label="Toggle dynamic background"
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
                <div className="rounded p-2 text-center" style={{ border: `1px solid ${themeBorderColor}` }}>
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
                <div className="rounded p-2 text-center" style={{ border: `1px solid ${themeBorderColor}` }}>
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
                <div className="rounded p-2 text-center" style={{ border: `1px solid ${themeBorderColor}` }}>
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
                <div className="rounded p-2 text-center" style={{ border: `1px solid ${themeBorderColor}` }}>
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
                <div className="rounded p-2 text-center" style={{ border: `1px solid ${themeBorderColor}` }}>
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