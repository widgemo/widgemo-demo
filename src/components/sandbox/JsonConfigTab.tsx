import React from 'react';
import { Button, Dropdown } from 'react-bootstrap';
import { FaCopy, FaDownload, FaExternalLinkAlt } from 'react-icons/fa';
import type { WidgemoConfig } from 'widgemo-core';

interface PresetOption {
  name: string;
  config: WidgemoConfig;
}

interface JsonConfigTabProps {
  /** Current JSON string being edited */
  currentJson: string;
  /** Callback when JSON changes */
  onJsonChange: (newJson: string) => void;
  /** Callback when Apply Changes is clicked */
  onApply: () => void;
  /** Available preset configurations */
  presets: PresetOption[];
  /** Callback when a preset is loaded */
  onLoadPreset: (presetConfig: WidgemoConfig, presetName?: string) => void;
  /** JSON validation error message, if any */
  jsonError?: string | null;
  /** Callback to show reference modal */
  onShowReference?: () => void;
  /** Callback to show CodeSandbox modal */
  onShowCodeSandbox?: () => void;
  /** Callback to copy current JSON to clipboard */
  onCopyToClipboard?: () => void;
  /** Callback to download current JSON */
  onDownloadConfig?: () => void;
}

/**
 * JsonConfigTab - A focused component for JSON configuration editing
 *
 * Features:
 * - JSON textarea editor with monospace font
 * - Load preset dropdown with available configurations
 * - Apply Changes button with validation feedback
 * - Export dropdown (copy, download, CodeSandbox)
 * - Error display for invalid JSON
 * - Reference button for configuration documentation
 *
 * Future extensibility:
 * - JSON formatting/prettifying
 * - Syntax highlighting in editor
 * - Auto-complete suggestions
 * - JSON schema validation
 * - Undo/redo functionality
 * - Import from file
 */
export const JsonConfigTab: React.FC<JsonConfigTabProps> = ({
  currentJson,
  onJsonChange,
  onApply,
  presets,
  onLoadPreset,
  jsonError,
  onShowReference,
  onShowCodeSandbox,
  onCopyToClipboard,
  onDownloadConfig,
}) => {
  const handleJsonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    onJsonChange(newValue);
  };

  return (
    <div className="d-flex flex-column h-100" style={{ minHeight: 0 }}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0">Configuration Editor</h5>
        <div className="d-flex gap-2">
          <Dropdown>
            <Dropdown.Toggle
              variant="outline-secondary"
              size="sm"
              id="preset-dropdown"
              aria-label="Load preset configuration"
            >
              Load Preset
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {presets.map((item, index) => (
                <Dropdown.Item
                  key={index}
                  onClick={() => onLoadPreset(item.config, item.name)}
                >
                  {item.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          {onShowReference && (
            <Button
              variant="outline-info"
              size="sm"
              onClick={onShowReference}
              aria-label="Show configuration reference"
            >
              Reference
            </Button>
          )}
        </div>
      </div>

      {jsonError && (
        <div className="alert alert-danger small mb-3" role="alert">
          <strong>JSON Error:</strong> {jsonError}
        </div>
      )}

      <div
        className="flex-grow-1 d-flex flex-column overflow-hidden full-area"
        style={{ minHeight: 0 }}
      >
        <textarea
          className="form-control flex-grow-1 mb-2"
          style={{
            fontFamily: 'monospace',
            fontSize: '0.875rem',
            resize: 'none'
          }}
          value={currentJson}
          onChange={handleJsonChange}
          spellCheck={false}
          aria-label="JSON configuration editor"
          aria-describedby={jsonError ? "json-error" : undefined}
        />
      </div>

      <div className="d-flex gap-2 flex-shrink-0">
        <Button
          variant="primary"
          size="sm"
          onClick={onApply}
          disabled={!!jsonError}
          className="flex-grow-1"
          aria-label="Apply configuration changes"
        >
          Apply Changes
        </Button>
        <Dropdown>
          <Dropdown.Toggle
            variant="outline-secondary"
            size="sm"
            id="export-dropdown"
            aria-label="Export options"
          >
            <FaDownload className="me-1" />
            Export
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {onCopyToClipboard && (
              <Dropdown.Item onClick={onCopyToClipboard}>
                <FaCopy className="me-2" />
                Copy JSON
              </Dropdown.Item>
            )}
            {onDownloadConfig && (
              <Dropdown.Item onClick={onDownloadConfig}>
                <FaDownload className="me-2" />
                Download JSON
              </Dropdown.Item>
            )}
            {onShowCodeSandbox && (
              <Dropdown.Item onClick={onShowCodeSandbox}>
                <FaExternalLinkAlt className="me-2" />
                CodeSandbox
              </Dropdown.Item>
            )}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
};