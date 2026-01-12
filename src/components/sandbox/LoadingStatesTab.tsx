import React, { useState, useCallback } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { FaCheck, FaSpinner, FaExclamationTriangle } from 'react-icons/fa';

interface LoadingStatesTabProps {
  /** Whether loading state is enabled */
  showLoading: boolean;
  /** Callback when loading state changes */
  onShowLoadingChange: (show: boolean) => void;
  /** Current error message */
  errorMessage: string;
  /** Callback when error message changes */
  onErrorMessageChange: (message: string) => void;
  /** Whether to use custom loading component */
  useCustomLoading: boolean;
  /** Callback when custom loading toggle changes */
  onUseCustomLoadingChange: (use: boolean) => void;
  /** Whether to use custom error component */
  useCustomError: boolean;
  /** Callback when custom error toggle changes */
  onUseCustomErrorChange: (use: boolean) => void;
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
  useCustomLoading,
  onUseCustomLoadingChange,
  useCustomError,
  onUseCustomErrorChange,
  onApplyChanges,
}) => {
  // Local state for pending changes
  const [localShowLoading, setLocalShowLoading] = useState(showLoading);
  const [localErrorMessage, setLocalErrorMessage] = useState(errorMessage);
  const [localUseCustomLoading, setLocalUseCustomLoading] = useState(useCustomLoading);
  const [localUseCustomError, setLocalUseCustomError] = useState(useCustomError);

  // Sync local state when props change
  React.useEffect(() => {
    setLocalShowLoading(showLoading);
  }, [showLoading]);

  React.useEffect(() => {
    setLocalErrorMessage(errorMessage);
  }, [errorMessage]);

  React.useEffect(() => {
    setLocalUseCustomLoading(useCustomLoading);
  }, [useCustomLoading]);

  React.useEffect(() => {
    setLocalUseCustomError(useCustomError);
  }, [useCustomError]);

  // Disable custom error when there's no error message
  React.useEffect(() => {
    if (!localErrorMessage.trim()) {
      setLocalUseCustomError(false);
    }
  }, [localErrorMessage]);

  const handleApplyChanges = useCallback(() => {
    onShowLoadingChange(localShowLoading);
    onErrorMessageChange(localErrorMessage);
    onUseCustomLoadingChange(localUseCustomLoading);
    onUseCustomErrorChange(localUseCustomError);
    onApplyChanges();
  }, [localShowLoading, localErrorMessage, localUseCustomLoading, localUseCustomError, onShowLoadingChange, onErrorMessageChange, onUseCustomLoadingChange, onUseCustomErrorChange, onApplyChanges]);

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
            <hr className="my-3" />
            <h6 className="mb-3 text-primary">Custom Components</h6>
          </div>

          <div className="col-md-6">
            <Form.Label className="small fw-bold">Custom Loading</Form.Label>
            <Form.Check
              type="checkbox"
              checked={localUseCustomLoading}
              onChange={(e) => setLocalUseCustomLoading(e.target.checked)}
              label="Use custom loading component"
              aria-label="Toggle custom loading component"
            />
            <Form.Text className="text-muted">
              Replace default spinner with a custom loading component.
            </Form.Text>
            {localUseCustomLoading && (
              <Alert variant="info" className="mt-2 py-2">
                <small>
                  <FaSpinner className="me-1" />
                  Custom loading shows: "Loading your amazing data..."
                </small>
              </Alert>
            )}
          </div>

          <div className="col-md-6">
            <Form.Label className="small fw-bold">Custom Error</Form.Label>
            <Form.Check
              type="checkbox"
              checked={localUseCustomError}
              onChange={(e) => setLocalUseCustomError(e.target.checked)}
              disabled={!localErrorMessage.trim()}
              label="Use custom error component"
              aria-label="Toggle custom error component"
            />
            <Form.Text className="text-muted">
              Replace default error with a custom error component. {!localErrorMessage.trim() && "Requires an error message."}
            </Form.Text>
            {localUseCustomError && (
              <Alert variant="warning" className="mt-2 py-2">
                <small>
                  <FaExclamationTriangle className="me-1" />
                  Custom error shows elegant red-themed design with error icon, bordered error message box, and retry button.
                </small>
              </Alert>
            )}
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