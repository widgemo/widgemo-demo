import React, { useCallback } from 'react';
import { Button, Form } from 'react-bootstrap';
import { FaUpload, FaRandom, FaCheck } from 'react-icons/fa';

interface SampleDataTabProps {
  /** Current sample data array */
  currentData: Record<string, unknown>[];
  /** Current JSON text in the editor */
  jsonEditorText: string;
  /** Callback when JSON editor text changes */
  onJsonEditorTextChange: (text: string) => void;
  /** Current entity label (singular) */
  entityLabel: string;
  /** Current entity label (plural) */
  entityLabelPlural: string;
  /** Callback when generate button is clicked */
  onGenerateClick: () => void;
  /** Callback when file upload occurs */
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /** Callback when save changes is clicked */
  onSaveChanges: () => void;
}

/**
 * SampleDataTab - A focused component for viewing, editing, and generating sample data
 *
 * Features:
 * - Display of current data count and entity type
 * - Generate new sample data button (opens generation modal)
 * - Upload JSON file functionality
 * - Live JSON editor with syntax highlighting
 * - Save changes with validation
 * - Automatic entity type detection
 * - Error handling and user feedback
 *
 * Future extensibility:
 * - Add more data source adapters (API endpoints, databases)
 * - Support for CSV import/export
 * - Data transformation and filtering
 * - Schema validation
 * - Data preview in table format
 * - Bulk operations (duplicate, delete, modify)
 * - Data templates and presets
 * - Real-time collaboration features
 * - Data versioning and history
 */
export const SampleDataTab: React.FC<SampleDataTabProps> = ({
  currentData,
  jsonEditorText,
  onJsonEditorTextChange,
  entityLabel,
  entityLabelPlural,
  onGenerateClick,
  onFileUpload,
  onSaveChanges,
}) => {
  const handleFileUploadClick = useCallback(() => {
    document.getElementById('data-upload')?.click();
  }, []);

  return (
    <div className="d-flex flex-column h-100">
      <div className="flex-shrink-0">
        <p className="small text-muted mb-2">
          Sample Source Data{' '}
          <small className="ms-2">
            {currentData.length} {entityLabelPlural.toLowerCase()}
          </small>
        </p>
        <div className="d-flex gap-2 flex-wrap mb-3">
          <Button
            variant="outline-success"
            size="sm"
            onClick={onGenerateClick}
            aria-label="Generate new sample data"
          >
            <FaRandom className="me-1" />
            Generate
          </Button>
          <Form.Control
            type="file"
            accept=".json"
            onChange={onFileUpload}
            style={{ display: 'none' }}
            id="data-upload"
            aria-label="Upload JSON data file"
          />
          <Button
            variant="outline-primary"
            size="sm"
            onClick={handleFileUploadClick}
            aria-label="Upload JSON file"
          >
            <FaUpload className="me-1" />
            Upload JSON
          </Button>
        </div>
      </div>

      <div className="flex-grow-1 d-flex flex-column">
        <Form.Label className="small fw-bold flex-shrink-0">JSON Data</Form.Label>
        <Form.Control
          as="textarea"
          value={jsonEditorText}
          onChange={(e) => onJsonEditorTextChange(e.target.value)}
          style={{
            fontFamily: 'monospace',
            fontSize: '0.75rem',
            minHeight: '200px'
          }}
          className="flex-grow-1"
          spellCheck={false}
          aria-label="JSON data editor"
          placeholder="Enter JSON array of data objects..."
        />
      </div>

      <div className="flex-shrink-0 mt-2">
        <Button
          variant="primary"
          size="sm"
          onClick={onSaveChanges}
          aria-label="Save JSON data changes"
        >
          <FaCheck className="me-1" />
          Save Changes
        </Button>
      </div>
    </div>
  );
};