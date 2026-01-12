import React, { useState } from 'react';
import { Card, Button, Collapse, Alert } from 'react-bootstrap';
import { FaCopy, FaChevronDown, FaChevronRight } from 'react-icons/fa';

interface AppliedConfigProps {
  config: any;
  adapters: any;
  showConfigDetails?: boolean;
  baseColor?: string;
  renderIcon?: any;
  overrides?: any;
  className?: string;
  style?: any;
  loading?: boolean;
  error?: string | Error;
  autoContrast?: boolean;
  contrastAmount?: number;
  overrideBackground?: string;
  currentSandboxTheme?: any;
  currentIconRenderer?: any;
}

export const AppliedConfig: React.FC<AppliedConfigProps> = ({
  config,
  adapters,
  showConfigDetails,
  baseColor,
  renderIcon,
  overrides,
  className,
  style,
  loading,
  error,
  autoContrast,
  contrastAmount,
  overrideBackground,
  currentSandboxTheme,
  currentIconRenderer,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [copyStatus, setCopyStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Build the effective configuration object
  const effectiveConfig = React.useMemo(() => {
    // Helper to truncate large arrays/objects
    const truncateData = (data: any, maxItems = 3): any => {
      if (Array.isArray(data)) {
        if (data.length > maxItems) {
          return [...data.slice(0, maxItems), `... ${data.length - maxItems} more items`];
        }
        return data;
      }
      if (typeof data === 'object' && data !== null) {
        const keys = Object.keys(data);
        if (keys.length > maxItems) {
          const truncated: any = {};
          keys.slice(0, maxItems).forEach(key => {
            truncated[key] = data[key];
          });
          truncated[`... ${keys.length - maxItems} more properties`] = '...';
          return truncated;
        }
      }
      return data;
    };

    const mergedProps: any = {
      // Main configuration
      config: {
        ...config,
        // Add theme info if available
        styling: config.styling ? {
          ...config.styling,
          themeConfig: currentSandboxTheme ? { ...currentSandboxTheme } : config.styling.themeConfig
        } : undefined,
        // Truncate large data for display
        data: config.data ? truncateData(config.data) : undefined
      },
      // Adapters (shown as function references)
      adapters: {
        fetchData: '[Function: fetchData]',
        createRecord: '[Function: createRecord]',
        updateRecord: '[Function: updateRecord]',
        deleteRecord: '[Function: deleteRecord]',
      },
      // Display options
      showConfigDetails,
      baseColor,
      renderIcon: renderIcon ? (currentIconRenderer === renderIcon ? 'Custom renderer (from Icons tab)' : 'FontAwesome renderer') : undefined,
      // Advanced props (only if applied)
      ...(overrides && Object.keys(overrides).length > 0 && { overrides }),
      ...(className && { className }),
      ...(style && { style }),
      ...(loading !== undefined && { loading }),
      ...(error && { error: typeof error === 'string' ? error : error.message }),
      ...(autoContrast !== undefined && { autoContrast }),
      ...(contrastAmount !== undefined && { contrastAmount }),
      ...(overrideBackground && { overrideBackground }),
    };

    return mergedProps;
  }, [
    config,
    adapters,
    showConfigDetails,
    baseColor,
    renderIcon,
    currentIconRenderer,
    overrides,
    className,
    style,
    loading,
    error,
    autoContrast,
    contrastAmount,
    overrideBackground,
    currentSandboxTheme,
  ]);

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(effectiveConfig, null, 2));
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
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="d-flex align-items-center">
          {isExpanded ? <FaChevronDown className="me-2" /> : <FaChevronRight className="me-2" />}
          <h6 className="mb-0">Applied Configuration</h6>
        </div>
        <Button
          variant="outline-secondary"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            handleCopyToClipboard();
          }}
          disabled={!isExpanded}
          aria-label="Copy configuration to clipboard"
        >
          <FaCopy className="me-1" />
          {copyStatus === 'success' ? 'Copied!' : copyStatus === 'error' ? 'Failed' : 'Copy'}
        </Button>
      </Card.Header>
      <Collapse in={isExpanded}>
        <div>
          <Card.Body>
            <Alert variant="info" className="mb-3">
              <small>
                This shows the effective, resolved configuration after defaults + overrides + auto-generation.
                Data adapters are shown as function references for brevity.
              </small>
            </Alert>
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
                  __html: JSON.stringify(effectiveConfig, null, 2)
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