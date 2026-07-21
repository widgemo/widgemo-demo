import React from 'react';
import { Button, Dropdown, Form } from 'react-bootstrap';
import { FaCopy, FaDownload, FaExternalLinkAlt } from 'react-icons/fa';
import type { WidgemoConfig } from '@widgemo/widgemo-core';

interface PresetOption {
  name: string;
  config: WidgemoConfig;
  data: Record<string, unknown>[];
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
  onLoadPreset: (preset: PresetOption) => void;
  /** Whether preset loading should include matching sample data */
  loadPresetWithData: boolean;
  /** Callback when load-with-data preference changes */
  onLoadPresetWithDataChange: (value: boolean) => void;
  /** JSON validation error message, if any */
  jsonError?: string | null;
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
 *
 */
export const JsonConfigTab: React.FC<JsonConfigTabProps> = ({
  currentJson,
  onJsonChange,
  onApply,
  presets,
  onLoadPreset,
  loadPresetWithData,
  onLoadPresetWithDataChange,
  jsonError,
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
            <Dropdown.Menu
              style={{
                minWidth: '360px',
                maxWidth: '520px',
                padding: 0,
                overflow: 'hidden',
              }}
            >
              <div
                className="px-3 py-2 border-bottom"
                style={{
                  backgroundColor: 'var(--bs-dropdown-bg, #fff)',
                }}
              >
                <div className="small text-muted mb-2" style={{ lineHeight: 1.35 }}>
                  Presets load configuration only by default and keep your current Sample Data.
                </div>
                <div className="small text-muted mb-2" style={{ lineHeight: 1.35 }}>
                  Opening Sandbox from an Example loads matching config and sample data.
                </div>
                <Form.Check
                  type="checkbox"
                  id="load-preset-with-data"
                  label="Also load preset sample data"
                  checked={loadPresetWithData}
                  onChange={(event) => onLoadPresetWithDataChange(event.target.checked)}
                  className="small"
                  onClick={(event) => event.stopPropagation()}
                />
              </div>
              <div
                style={{
                  maxHeight: '220px',
                  overflowY: 'auto',
                  overflowX: 'hidden',
                }}
              >
                {presets.map((item, index) => (
                  <Dropdown.Item
                    key={index}
                    onClick={() => onLoadPreset(item)}
                    title={item.name}
                    style={{
                      whiteSpace: 'normal',
                      lineHeight: 1.25,
                      wordBreak: 'break-word',
                    }}
                  >
                    {item.name}
                  </Dropdown.Item>
                ))}
              </div>
            </Dropdown.Menu>
          </Dropdown>
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