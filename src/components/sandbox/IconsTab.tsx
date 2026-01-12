import React, { useCallback } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import { FaCheck } from 'react-icons/fa';

interface IconsTabProps {
  /** Current icon library selection */
  iconLibrary: 'none' | 'react-icons' | 'lucide' | 'heroicons';
  /** Callback when icon library changes */
  onIconLibraryChange: (library: 'none' | 'react-icons' | 'lucide' | 'heroicons') => void;
  /** Current test icon name */
  testIconName: string;
  /** Callback when test icon name changes */
  onTestIconNameChange: (name: string) => void;
  /** Current test icon size */
  testIconSize: number;
  /** Callback when test icon size changes */
  onTestIconSizeChange: (size: number) => void;
  /** Current test icon class name */
  testIconClassName: string;
  /** Callback when test icon class name changes */
  onTestIconClassNameChange: (className: string) => void;
  /** Current custom renderIcon function code */
  customRenderIcon: string;
  /** Callback when custom renderIcon changes */
  onCustomRenderIconChange: (code: string) => void;
  /** Callback when apply icons is clicked */
  onApplyIcons: () => void;
}

/**
 * IconsTab - A focused component for testing and configuring icon renderers
 *
 * Features:
 * - Icon library selector (Widgemo defaults, React Icons, Lucide, Heroicons)
 * - Interactive icon testing with name, size, and className controls
 * - Live preview of selected icons
 * - Custom renderIcon function editor
 * - Mini Widgemo preview showing icon integration
 * - Apply icons functionality with feedback
 * - Coming soon alerts for planned libraries
 *
 * Future extensibility:
 * - Add more icon libraries (Material Icons, Feather, etc.)
 * - Dynamic imports for actual icon libraries
 * - Icon search and filtering
 * - Icon pack management
 * - Custom icon upload
 * - Icon theme variants (filled, outlined, etc.)
 * - Accessibility icon validation
 * - Icon performance metrics
 * - Export/import icon configurations
 */
export const IconsTab: React.FC<IconsTabProps> = ({
  iconLibrary,
  onIconLibraryChange,
  testIconName,
  onTestIconNameChange,
  testIconSize,
  onTestIconSizeChange,
  testIconClassName,
  onTestIconClassNameChange,
  customRenderIcon,
  onCustomRenderIconChange,
  onApplyIcons,
}) => {
  const handleIconSizeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value >= 8 && value <= 48) {
      onTestIconSizeChange(value);
    }
  }, [onTestIconSizeChange]);

  const renderIconPreview = () => {
    try {
      const iconName = testIconName.trim();
      if (iconName) {
        // This is a simplified version - in real implementation you'd need to handle dynamic imports
        return (
          <div className="d-flex align-items-center justify-content-center gap-2">
            <span
              className={testIconClassName}
              style={{ fontSize: `${testIconSize}px` }}
              aria-label={`Preview of ${iconName} icon`}
            >
              ⭐
            </span>
            <small className="text-muted">Preview: {iconName} ({testIconSize}px)</small>
          </div>
        );
      }
      return <small className="text-muted">Enter an icon name to preview</small>;
    } catch (error) {
      return <small className="text-danger">Invalid icon name</small>;
    }
  };

  return (
    <div className="d-flex flex-column h-100">
      <div className="flex-grow-1 overflow-auto">
        <div className="row g-3">
          <div className="col-12">
            <Form.Label className="small fw-bold">Icon Library</Form.Label>
            <Form.Select
              size="sm"
              value={iconLibrary}
              onChange={(e) => onIconLibraryChange(e.target.value as typeof iconLibrary)}
              aria-label="Select icon library"
            >
              <option value="none">None (Widgemo Defaults)</option>
              <option value="react-icons">React Icons</option>
              <option value="lucide">Lucide (Coming Soon)</option>
              <option value="heroicons">Heroicons (Coming Soon)</option>
            </Form.Select>
          </div>

          {iconLibrary === 'none' && (
            <div className="col-12">
              <Alert variant="info" className="py-2 small">
                <strong>Widgemo Defaults:</strong> Uses inline SVG icons or no icons. Perfect for zero-dependency setups.
              </Alert>
            </div>
          )}

          {iconLibrary === 'react-icons' && (
            <>
              <div className="col-md-6">
                <Form.Label className="small fw-bold">Icon Name</Form.Label>
                <Form.Control
                  type="text"
                  size="sm"
                  value={testIconName}
                  onChange={(e) => onTestIconNameChange(e.target.value)}
                  placeholder="FaStar, MdHome, etc."
                  aria-label="Icon name for testing"
                />
              </div>
              <div className="col-md-3">
                <Form.Label className="small fw-bold">Size</Form.Label>
                <Form.Control
                  type="number"
                  size="sm"
                  value={testIconSize}
                  onChange={handleIconSizeChange}
                  min="8"
                  max="48"
                  aria-label="Icon size in pixels"
                />
              </div>
              <div className="col-md-3">
                <Form.Label className="small fw-bold">Class Name</Form.Label>
                <Form.Control
                  type="text"
                  size="sm"
                  value={testIconClassName}
                  onChange={(e) => onTestIconClassNameChange(e.target.value)}
                  placeholder="text-primary"
                  aria-label="CSS class name for icon"
                />
              </div>

              <div className="col-12">
                <Form.Label className="small fw-bold">Icon Preview</Form.Label>
                <div className="border rounded p-3 text-center">
                  {renderIconPreview()}
                </div>
              </div>

              <div className="col-12">
                <Form.Label className="small fw-bold">Custom renderIcon Function</Form.Label>
                <Form.Control
                  as="textarea"
                  size="sm"
                  rows={3}
                  value={customRenderIcon}
                  onChange={(e) => onCustomRenderIconChange(e.target.value)}
                  placeholder={`(iconName, props) => {
  // Your custom icon rendering logic
  return <YourIconComponent {...props} />;
}`}
                  style={{ fontFamily: 'monospace', fontSize: '0.75rem' }}
                  aria-label="Custom renderIcon function code"
                />
              </div>
            </>
          )}

          {(iconLibrary === 'lucide' || iconLibrary === 'heroicons') && (
            <div className="col-12">
              <Alert variant="warning" className="py-2 small">
                <strong>Coming Soon:</strong> {iconLibrary} integration will be available in a future update.
                For now, use React Icons or Widgemo defaults.
              </Alert>
            </div>
          )}

          <div className="col-12">
            <Form.Label className="small fw-bold">Example Integration</Form.Label>
            <div className="border rounded p-3">
              <small className="text-muted d-block mb-2">Mini Widgemo preview with current icon settings:</small>
              <div style={{
                border: '1px solid #dee2e6',
                borderRadius: '4px',
                padding: '8px',
                backgroundColor: '#f8f9fa',
                fontSize: '12px'
              }}>
                <div className="d-flex align-items-center gap-2 mb-1">
                  <span>📊</span>
                  <span className="fw-bold">Sample Data Table</span>
                  <span>⚙️</span>
                </div>
                <div className="small text-muted">
                  {iconLibrary === 'none' ? 'Using default inline SVGs' :
                   iconLibrary === 'react-icons' ? `Using ${testIconName} from React Icons` :
                   'Custom icon renderer'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-shrink-0 mt-3">
        <Button
          variant="primary"
          size="sm"
          onClick={onApplyIcons}
          aria-label="Apply icon settings to preview"
        >
          <FaCheck className="me-1" />
          Apply Icons
        </Button>
      </div>
    </div>
  );
};