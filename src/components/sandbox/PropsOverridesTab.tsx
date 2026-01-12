import React, { useCallback } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import { FaCheck, FaUndo } from 'react-icons/fa';

interface PropsOverridesTabProps {
  /** Current overrides JSON string */
  overridesJson: string;
  /** Callback when overrides JSON changes */
  onOverridesJsonChange: (value: string) => void;
  /** Current CSS class name */
  className: string;
  /** Callback when class name changes */
  onClassNameChange: (value: string) => void;
  /** Current inline styles JSON string */
  styleJson: string;
  /** Callback when style JSON changes */
  onStyleJsonChange: (value: string) => void;
  /** Whether loading state is enabled */
  loading: boolean;
  /** Callback when loading state changes */
  onLoadingChange: (value: boolean) => void;
  /** Current error message */
  error: string;
  /** Callback when error message changes */
  onErrorChange: (value: string) => void;
  /** Whether base color override is enabled */
  overrideBaseColorEnabled: boolean;
  /** Callback when base color override toggle changes */
  onOverrideBaseColorEnabledChange: (value: boolean) => void;
  /** Current base color value */
  baseColor: string;
  /** Callback when base color changes */
  onBaseColorChange: (value: string) => void;
  /** Whether background override is enabled */
  overrideBackgroundEnabled: boolean;
  /** Callback when background override toggle changes */
  onOverrideBackgroundEnabledChange: (value: boolean) => void;
  /** Current override background value */
  overrideBackground: string;
  /** Callback when override background changes */
  onOverrideBackgroundChange: (value: string) => void;
  /** Whether auto contrast is enabled */
  autoContrast: boolean;
  /** Callback when auto contrast changes */
  onAutoContrastChange: (value: boolean) => void;
  /** Current contrast amount */
  contrastAmount: number;
  /** Callback when contrast amount changes */
  onContrastAmountChange: (value: number) => void;
  /** Whether to show config details */
  showConfigDetails: boolean;
  /** Callback when show config details changes */
  onShowConfigDetailsChange: (value: boolean) => void;
  /** Callback when apply advanced properties is clicked */
  onApplyAdvancedProperties: () => void;
  /** Callback when reset all is clicked */
  onResetAll: () => void;
}

/**
 * PropsOverridesTab - A focused component for configuring advanced Widgemo properties and overrides
 *
 * Features:
 * - Partial config overrides via JSON textarea
 * - CSS class name and inline styles configuration
 * - Loading and error state controls
 * - Base color and background overrides with toggles
 * - Contrast settings with auto/manual options
 * - Config details visibility toggle
 * - Apply and reset functionality
 * - Validation and error handling
 *
 * Future extensibility:
 * - Add more override fields as Widgemo evolves
 * - Support for function-based properties (adapters, callbacks)
 * - Import/export of override configurations
 * - Preset override templates
 * - Advanced validation with schema checking
 * - Property dependency management
 * - Undo/redo functionality
 * - Live preview of overrides
 */
export const PropsOverridesTab: React.FC<PropsOverridesTabProps> = ({
  overridesJson,
  onOverridesJsonChange,
  className,
  onClassNameChange,
  styleJson,
  onStyleJsonChange,
  loading,
  onLoadingChange,
  error,
  onErrorChange,
  overrideBaseColorEnabled,
  onOverrideBaseColorEnabledChange,
  baseColor,
  onBaseColorChange,
  overrideBackgroundEnabled,
  onOverrideBackgroundEnabledChange,
  overrideBackground,
  onOverrideBackgroundChange,
  autoContrast,
  onAutoContrastChange,
  contrastAmount,
  onContrastAmountChange,
  showConfigDetails,
  onShowConfigDetailsChange,
  onApplyAdvancedProperties,
  onResetAll,
}) => {
  const handleContrastAmountChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0.05;
    onContrastAmountChange(value);
  }, [onContrastAmountChange]);

  return (
    <div className="d-flex flex-column h-100">
      <div className="flex-grow-1 overflow-auto">
        <div className="row g-3">
          <div className="col-12">
            <Form.Label className="small fw-bold">Overrides (Partial Config)</Form.Label>
            <Form.Control
              as="textarea"
              size="sm"
              rows={3}
              value={overridesJson}
              onChange={(e) => onOverridesJsonChange(e.target.value)}
              placeholder="{}"
              style={{ fontFamily: 'monospace', fontSize: '0.75rem' }}
              aria-label="Partial configuration overrides JSON"
            />
          </div>

          <div className="col-md-6">
            <Form.Label className="small fw-bold">CSS Class Name</Form.Label>
            <Form.Control
              type="text"
              size="sm"
              value={className}
              onChange={(e) => onClassNameChange(e.target.value)}
              placeholder="custom-class"
              aria-label="CSS class name"
            />
          </div>

          <div className="col-md-6">
            <Form.Label className="small fw-bold">Inline Styles (JSON)</Form.Label>
            <Form.Control
              as="textarea"
              size="sm"
              rows={2}
              value={styleJson}
              onChange={(e) => onStyleJsonChange(e.target.value)}
              placeholder="{}"
              style={{ fontFamily: 'monospace', fontSize: '0.75rem' }}
              aria-label="Inline styles JSON"
            />
          </div>

          <div className="col-md-6">
            <Form.Label className="small fw-bold">Loading State</Form.Label>
            <Form.Check
              type="checkbox"
              checked={loading}
              onChange={(e) => onLoadingChange(e.target.checked)}
              label="Show loading spinner"
              aria-label="Toggle loading state"
            />
          </div>

          <div className="col-md-6">
            <Form.Label className="small fw-bold">Error Message</Form.Label>
            <Form.Control
              type="text"
              size="sm"
              value={error}
              onChange={(e) => onErrorChange(e.target.value)}
              placeholder="Error message (leave empty for no error)"
              aria-label="Error message"
            />
          </div>

          <div className="col-md-4">
            <Form.Label className="small fw-bold">Base Color</Form.Label>
            <Form.Check
              type="checkbox"
              checked={overrideBaseColorEnabled}
              onChange={(e) => onOverrideBaseColorEnabledChange(e.target.checked)}
              label="Override base color"
              className="mb-2"
              aria-label="Enable base color override"
            />
            <div className="d-flex gap-2">
              <Form.Control
                type="color"
                size="sm"
                value={baseColor}
                onChange={(e) => onBaseColorChange(e.target.value)}
                style={{ width: '60px' }}
                disabled={!overrideBaseColorEnabled}
                aria-label="Base color picker"
              />
              <Form.Control
                type="text"
                size="sm"
                value={baseColor}
                onChange={(e) => onBaseColorChange(e.target.value)}
                placeholder="#ffffff"
                className="flex-grow-1"
                disabled={!overrideBaseColorEnabled}
                aria-label="Base color hex value"
              />
            </div>
          </div>

          <div className="col-md-4">
            <Form.Label className="small fw-bold">Override Background</Form.Label>
            <Form.Check
              type="checkbox"
              checked={overrideBackgroundEnabled}
              onChange={(e) => onOverrideBackgroundEnabledChange(e.target.checked)}
              label="Override background"
              className="mb-2"
              aria-label="Enable background override"
            />
            <div className="d-flex gap-2">
              <Form.Control
                type="color"
                size="sm"
                value={overrideBackground}
                onChange={(e) => onOverrideBackgroundChange(e.target.value)}
                style={{ width: '60px' }}
                disabled={!overrideBackgroundEnabled}
                aria-label="Background color picker"
              />
              <Form.Control
                type="text"
                size="sm"
                value={overrideBackground}
                onChange={(e) => onOverrideBackgroundChange(e.target.value)}
                placeholder="#f0f0f0"
                className="flex-grow-1"
                disabled={!overrideBackgroundEnabled}
                aria-label="Background color hex value"
              />
            </div>
          </div>

          <div className="col-md-4">
            <Form.Label className="small fw-bold">Contrast Settings</Form.Label>
            <div className="d-flex gap-2 align-items-center">
              <Form.Check
                type="checkbox"
                checked={autoContrast}
                onChange={(e) => onAutoContrastChange(e.target.checked)}
                label="Auto"
                className="me-2"
                aria-label="Enable auto contrast"
              />
              <Form.Control
                type="number"
                size="sm"
                min="0.01"
                max="0.2"
                step="0.01"
                value={contrastAmount}
                onChange={handleContrastAmountChange}
                disabled={!autoContrast}
                style={{ width: '80px' }}
                aria-label="Contrast amount"
              />
            </div>
          </div>

          <div className="col-12">
            <Form.Check
              type="checkbox"
              checked={showConfigDetails}
              onChange={(e) => onShowConfigDetailsChange(e.target.checked)}
              label="Show config details button (for development)"
              aria-label="Show config details button"
            />
          </div>

          <div className="col-12">
            <Alert variant="info" className="py-2 small">
              <strong>Note:</strong> Some properties are excluded from editing as they require function implementations or complex objects:
              <code className="ms-1">adapters</code>,
              <code className="ms-1">onReady</code>,
              <code className="ms-1">onDataChange</code>,
              <code className="ms-1">onRecordSelect</code>,
              <code className="ms-1">onCustomAction</code>,
              <code className="ms-1">customLoading</code>,
              <code className="ms-1">customError</code>,
              <code className="ms-1">customEmpty</code>
            </Alert>
          </div>
        </div>
      </div>

      <div className="flex-shrink-0 mt-3">
        <div className="d-flex gap-2">
          <Button
            variant="primary"
            size="sm"
            onClick={onApplyAdvancedProperties}
            className="flex-grow-1"
            aria-label="Apply advanced properties to preview"
          >
            <FaCheck className="me-1" />
            Apply Advanced Properties
          </Button>
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={onResetAll}
            aria-label="Reset all advanced properties to defaults"
          >
            <FaUndo className="me-1" />
            Reset All
          </Button>
        </div>
      </div>
    </div>
  );
};