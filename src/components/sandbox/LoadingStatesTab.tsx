import React, { useState, useCallback } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { FaCheck } from 'react-icons/fa';

interface LoadingStatesTabProps {
  /** Whether loading state is enabled */
  showLoading: boolean;
  /** Callback when loading state changes */
  onShowLoadingChange: (show: boolean) => void;
  /** Current error message */
  errorMessage: string;
  /** Callback when error message changes */
  onErrorMessageChange: (message: string) => void;
  /** Callback when apply changes is clicked */
  onApplyChanges: () => void;
}

/**
 * LoadingStatesTab - A focused component for configuring loading and error states
 *
 * Features:
 * - Toggle for showing loading spinner
 * - Input field for custom error messages
 * - Clean, accessible UI with proper labels
 * - Real-time preview integration
 *
 * Future extensibility:
 * - Add loading spinner customization (size, color, type)
 * - Support for custom loading components/renderers
 * - Loading timeout configuration
 * - Multiple error state types (warning, info, success)
 * - Error message templates/presets
 * - Loading progress indicators
 * - Skeleton loading states
 * - Async operation simulation
 * - Loading state animations
 */
export const LoadingStatesTab: React.FC<LoadingStatesTabProps> = ({
  showLoading,
  onShowLoadingChange,
  errorMessage,
  onErrorMessageChange,
  onApplyChanges,
}) => {
  // Local state for pending changes
  const [localShowLoading, setLocalShowLoading] = useState(showLoading);
  const [localErrorMessage, setLocalErrorMessage] = useState(errorMessage);

  // Sync local state when props change
  React.useEffect(() => {
    setLocalShowLoading(showLoading);
  }, [showLoading]);

  React.useEffect(() => {
    setLocalErrorMessage(errorMessage);
  }, [errorMessage]);

  const handleApplyChanges = useCallback(() => {
    onShowLoadingChange(localShowLoading);
    onErrorMessageChange(localErrorMessage);
    onApplyChanges();
  }, [localShowLoading, localErrorMessage, onShowLoadingChange, onErrorMessageChange, onApplyChanges]);

  return (
    <div className="d-flex flex-column h-100">
      <div className="flex-grow-1 overflow-auto">
        <div className="row g-3">
          <div className="col-12">
            <h6 className="mb-3 text-primary">Loading & Error States</h6>
            <p className="small text-muted mb-4">
              Configure loading spinners and error messages to test different states in your Widgemo component.
            </p>
          </div>

          <div className="col-md-6">
            <Form.Label className="small fw-bold">Loading State</Form.Label>
            <Form.Check
              type="checkbox"
              checked={localShowLoading}
              onChange={(e) => setLocalShowLoading(e.target.checked)}
              label="Show loading spinner"
              aria-label="Toggle loading state"
            />
            <Form.Text className="text-muted">
              When enabled, displays a loading spinner instead of data.
            </Form.Text>
          </div>

          <div className="col-md-6">
            <Form.Label className="small fw-bold">Error Message</Form.Label>
            <Form.Control
              type="text"
              size="sm"
              value={localErrorMessage}
              onChange={(e) => setLocalErrorMessage(e.target.value)}
              placeholder="Error message (leave empty for no error)"
              aria-label="Error message"
            />
            <Form.Text className="text-muted">
              Custom error message to display. Leave empty to show no error.
            </Form.Text>
          </div>

          <div className="col-12">
            <Alert variant="info" className="py-2">
              <small>
                <strong>Note:</strong> Changes are applied to the preview when you click "Apply Changes".
                Use these controls to test how your Widgemo component handles different loading and error states.
              </small>
            </Alert>
          </div>
        </div>
      </div>

      <div className="flex-shrink-0 mt-3">
        <Button
          variant="primary"
          size="sm"
          onClick={handleApplyChanges}
          aria-label="Apply loading and error state changes"
        >
          <FaCheck className="me-1" />
          Apply Changes
        </Button>
      </div>
    </div>
  );
};