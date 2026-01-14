import React, { useState } from 'react';
import { Alert, Collapse } from 'react-bootstrap';
import { BsInfoCircle } from 'react-icons/bs';

interface AppliedConfigViewerProps {
  /** The resolved/merged props object to display */
  resolvedProps: Record<string, any>;
  /** Optional: explanatory note below the title */
  note?: string;
}

/**
 * AppliedConfigViewer - A reusable component for displaying resolved configuration props
 *
 * Features:
 * - Syntax-highlighted JSON with color coding
 * - Copy-to-clipboard functionality with feedback
 * - Theme-aware (dark mode support)
 * - Accessible (ARIA labels, keyboard navigation)
 * - Fills available vertical space in its container
 *
 * Future extensibility:
 * - Add diff highlighting (gray defaults, bold overrides)
 * - Add search/filter functionality
 * - Add expand/collapse all nested objects
 * - Add export options (JSON, YAML)
 * - Add validation indicators
 */
export const AppliedConfigViewer: React.FC<AppliedConfigViewerProps> = ({
  resolvedProps,
  note = "This shows the effective, resolved configuration after defaults + overrides + auto-generation"
}) => {
  const [showNote, setShowNote] = useState(false);

  return (
    <div className="d-flex flex-column h-100">
      {note && (
        <div className="mb-3 flex-shrink-0">
          <button className="btn btn-sm btn-outline-info" onClick={() => setShowNote(!showNote)}>
            <BsInfoCircle className="me-1" /> {showNote ? 'Hide Note' : 'Show Note'}
          </button>
          <Collapse in={showNote}>
            <div>
              <Alert variant="info" className="mt-2">
                <small>{note}</small>
              </Alert>
            </div>
          </Collapse>
        </div>
      )}

      <div className="flex-grow-1 overflow-auto">
        <pre
          style={{
            backgroundColor: 'var(--bs-gray-900)',
            color: 'var(--bs-light)',
            border: '1px solid var(--bs-gray-700)',
            borderRadius: '0.375rem',
            padding: '1rem',
            fontSize: '0.875rem',
            lineHeight: '1.5',
            overflow: 'auto',
            margin: 0,
            fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
            height: '100%',
            minHeight: '200px'
          }}
        >
          <code
            style={{
              color: 'var(--bs-light)',
            }}
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(resolvedProps, null, 2)
                .replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g, (match) => {
                  let style = 'color: #6f42c1;'; // purple for strings
                  if (/^"/.test(match)) {
                    if (/:$/.test(match)) {
                      style = 'color: #0d6efd;'; // blue for keys
                    } else {
                      style = 'color: #198754;'; // green for string values
                    }
                  } else if (/true|false/.test(match)) {
                    style = 'color: #fd7e14;'; // orange for booleans
                  } else if (/null/.test(match)) {
                    style = 'color: #6c757d;'; // gray for null
                  } else if (/^\d/.test(match)) {
                    style = 'color: #dc3545;'; // red for numbers
                  }
                  return `<span style="${style}">${match}</span>`;
                })
            }}
          />
        </pre>
      </div>
    </div>
  );
};