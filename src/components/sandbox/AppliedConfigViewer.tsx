import React, { useState } from 'react';
import { Card, Button, Collapse, Alert } from 'react-bootstrap';
import { FaCopy, FaChevronDown, FaChevronRight } from 'react-icons/fa';

interface AppliedConfigViewerProps {
  /** The resolved/merged props object to display */
  resolvedProps: Record<string, any>;
  /** Optional: controlled collapse state */
  isCollapsed?: boolean;
  /** Optional: callback when collapse state changes */
  onToggle?: (collapsed: boolean) => void;
  /** Optional: custom title for the section */
  title?: string;
  /** Optional: explanatory note below the title */
  note?: string;
}

/**
 * AppliedConfigViewer - A reusable component for displaying resolved configuration props
 *
 * Features:
 * - Collapsible accordion-style display
 * - Syntax-highlighted JSON with color coding
 * - Copy-to-clipboard functionality with feedback
 * - Theme-aware (dark mode support)
 * - Accessible (ARIA labels, keyboard navigation)
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
  isCollapsed: controlledCollapsed,
  onToggle,
  title = "Applied Configuration",
  note = "This shows the effective, resolved configuration after defaults + overrides + auto-generation"
}) => {
  // Use controlled state if provided, otherwise manage internally
  const [internalCollapsed, setInternalCollapsed] = useState(true);
  const isCollapsed = controlledCollapsed ?? internalCollapsed;

  const [copyStatus, setCopyStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleToggle = () => {
    if (onToggle) {
      onToggle(!isCollapsed);
    } else {
      setInternalCollapsed(!isCollapsed);
    }
  };

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(resolvedProps, null, 2));
      setCopyStatus('success');
      setTimeout(() => setCopyStatus('idle'), 2000);
    } catch (err) {
      setCopyStatus('error');
      setTimeout(() => setCopyStatus('idle'), 2000);
    }
  };

  return (
    <Card className="mt-3">
      <Card.Header
        className="d-flex justify-content-between align-items-center"
        style={{ cursor: 'pointer' }}
        onClick={handleToggle}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleToggle();
          }
        }}
        aria-expanded={!isCollapsed}
        aria-controls="applied-config-content"
      >
        <div className="d-flex align-items-center">
          {isCollapsed ? <FaChevronRight className="me-2" /> : <FaChevronDown className="me-2" />}
          <h6 className="mb-0">{title}</h6>
        </div>
        <Button
          variant="outline-secondary"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            handleCopyToClipboard();
          }}
          disabled={isCollapsed}
          aria-label="Copy configuration to clipboard"
        >
          <FaCopy className="me-1" />
          {copyStatus === 'success' ? 'Copied!' : copyStatus === 'error' ? 'Failed' : 'Copy'}
        </Button>
      </Card.Header>
      <Collapse in={!isCollapsed}>
        <div id="applied-config-content">
          <Card.Body>
            {note && (
              <Alert variant="info" className="mb-3">
                <small>{note}</small>
              </Alert>
            )}
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
                maxHeight: '400px',
                margin: 0,
                fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
              }}
            >
              <code
                style={{
                  color: 'var(--bs-light)',
                }}
                dangerouslySetInnerHTML={{
                  __html: JSON.stringify(resolvedProps, null, 2)
                    .replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, (match) => {
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
          </Card.Body>
        </div>
      </Collapse>
    </Card>
  );
};