import React, { useCallback } from 'react';
import { Button, Modal, Alert } from 'react-bootstrap';

interface CodeSandboxExportModalProps {
  /** Whether the modal is open */
  isOpen: boolean;
  /** Callback when the modal should be closed */
  onClose: () => void;
  /** Current configuration to export */
  currentConfig?: {
    configJson: string;
    customData: Record<string, unknown>[];
    entityLabel: string;
  };
  /** Optional export callback */
  onExport?: (config: object) => void;
}

/**
 * CodeSandboxExportModal - A modal for exporting Widgemo configurations to CodeSandbox
 *
 * Features:
 * - Placeholder UI for CodeSandbox export functionality
 * - Generate CodeSandbox link with current configuration
 * - Cancel/Close functionality
 * - Accessibility features
 */
export const CodeSandboxExportModal: React.FC<CodeSandboxExportModalProps> = ({
  isOpen,
  onClose,
  currentConfig,
  onExport
}) => {
  // Generate CodeSandbox link
  const generateCodeSandboxLink = useCallback(() => {
    if (!currentConfig) {
      console.warn('No configuration provided for CodeSandbox export');
      return;
    }

    const { configJson, customData, entityLabel } = currentConfig;

    const sandboxConfig = {
      title: 'Widgemo Demo',
      description: 'Interactive Widgemo configuration demo',
      template: 'react',
      files: {
        'index.js': {
          content: `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);`
        },
        'App.js': {
          content: `import React, { useState } from 'react';
import { Widgemo } from '@widgemo/widgemo-core';

function App() {
  const [data] = useState(${JSON.stringify(customData, null, 2)});

  const config = ${configJson};

  const adapters = {
    fetchData: async () => ({ data, total: data.length }),
    createRecord: async (record) => ({ ...record, id: Date.now() }),
    updateRecord: async (id, record) => record,
    deleteRecord: async () => {},
  };

  return (
    <div className="container mt-4">
      <h1>Widgemo ${entityLabel} Management</h1>
      <Widgemo config={config} adapters={adapters} />
    </div>
  );
}

export default App;`
        },
        'package.json': {
          content: JSON.stringify({
            name: 'widgemo-demo',
            version: '0.1.0',
            dependencies: {
              'react': '^18.0.0',
              'react-dom': '^18.0.0',
              'widgemo-core': 'latest',
              'bootstrap': '^5.3.0'
            }
          }, null, 2)
        },
        'index.html': {
          content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Widgemo Demo</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
  <div id="root"></div>
</body>
</html>`
        }
      }
    };

    // Base64 encode the sandbox configuration
    const encodedConfig = btoa(JSON.stringify(sandboxConfig));
    const codesandboxUrl = `https://codesandbox.io/api/v1/sandboxes/define?parameters=${encodeURIComponent(encodedConfig)}`;

    // Call optional export callback
    if (onExport) {
      onExport(sandboxConfig);
    }

    // Open in new tab
    window.open(codesandboxUrl, '_blank');
  }, [currentConfig, onExport]);

  const handleExport = () => {
    generateCodeSandboxLink();
    onClose();
  };

  return (
    <Modal
      show={isOpen}
      onHide={onClose}
      centered
      aria-labelledby="codesandbox-export-modal-title"
    >
      <Modal.Header closeButton>
        <Modal.Title id="codesandbox-export-modal-title">
          Export to CodeSandbox
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Alert variant="info">
          <strong>CodeSandbox Export</strong>
          <p className="mb-2">
            This will create a new CodeSandbox with your current Widgemo configuration and sample data.
          </p>
          <small>
            The sandbox will include:
            <ul className="mb-0 mt-2">
              <li>React application with Widgemo component</li>
              <li>Your current configuration settings</li>
              <li>Sample data for testing</li>
              <li>Bootstrap styling</li>
            </ul>
          </small>
        </Alert>

        {!currentConfig && (
          <Alert variant="warning">
            <strong>No Configuration Available</strong>
            <p>Please ensure you have a valid configuration before exporting.</p>
          </Alert>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={handleExport}
          disabled={!currentConfig}
        >
          Generate CodeSandbox
        </Button>
      </Modal.Footer>
    </Modal>
  );
};