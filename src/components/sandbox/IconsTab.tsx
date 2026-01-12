import React from 'react';
import { Form, Alert } from 'react-bootstrap';

interface IconsTabProps {
  /** Current icon library selection */
  iconLibrary: 'none' | 'react-icons' | 'lucide' | 'heroicons';
  /** Callback when icon library changes */
  onIconLibraryChange: (library: 'none' | 'react-icons' | 'lucide' | 'heroicons') => void;
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
}) => {

  return (
    <div className="d-flex flex-column h-100">
      <div className="flex-grow-1 overflow-auto" style={{ overflowX: 'hidden' }}>
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
              <option value="lucide">Lucide</option>
              <option value="heroicons">Heroicons</option>
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
            <div className="col-12">
              <Alert variant="success" className="py-2 small">
                <strong>React Icons:</strong> Maps common icon names used by Widgemo (like 'plus', 'settings', 'table', 'refresh') to FontAwesome icons from react-icons. 
                Provides a modern, consistent icon set with proper accessibility.
              </Alert>
            </div>
          )}

          {iconLibrary === 'lucide' && (
            <div className="col-12">
              <Alert variant="success" className="py-2 small">
                <strong>Lucide:</strong> Maps common icon names to Lucide icons from react-icons. 
                Features a clean, modern design with excellent readability and consistency.
              </Alert>
            </div>
          )}

          {iconLibrary === 'heroicons' && (
            <div className="col-12">
              <Alert variant="success" className="py-2 small">
                <strong>Heroicons:</strong> Maps common icon names to Heroicons from react-icons. 
                Features a clean, consistent design system with both outline and solid variants.
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
                  {iconLibrary === 'none' ? 'Using default inline SVGs from widgemo-core' :
                   iconLibrary === 'react-icons' ? 'Using FontAwesome icons from react-icons library' :
                   iconLibrary === 'lucide' ? 'Using Lucide icons from react-icons library' :
                   iconLibrary === 'heroicons' ? 'Using Heroicons from react-icons library' :
                   'Custom icon renderer'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};