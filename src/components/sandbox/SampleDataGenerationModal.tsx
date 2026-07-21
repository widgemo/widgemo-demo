import React, { useState, useCallback } from 'react';
import { Button, Modal, Form, Alert, Spinner, Table } from 'react-bootstrap';
import { FaRandom, FaEye, FaEyeSlash, FaCheck, FaTimes } from 'react-icons/fa';

interface SampleDataGenerationModalProps {
  /** Whether the modal is open */
  isOpen: boolean;
  /** Callback when the modal should be closed */
  onClose: () => void;
  /** Callback when data is generated and confirmed */
  onGenerate: (generatedData: Record<string, unknown>[], options: { adjustConfig: boolean; dataType: string }) => void;
}

/**
 * SampleDataGenerationModal - A modal for generating sample data
 *
 * Features:
 * - Form to select data type, count, and options
 * - Generate button with loading state
 * - Preview of generated data in table/JSON view
 * - Apply/Cancel buttons after generation
 * - Error handling and validation
 * - Accessibility features
 */
export const SampleDataGenerationModal: React.FC<SampleDataGenerationModalProps> = ({
  isOpen,
  onClose,
  onGenerate
}) => {
  // Form state
  const [dataType, setDataType] = useState('users');
  const [customEndpoint, setCustomEndpoint] = useState('');
  const [recordCount, setRecordCount] = useState(10);
  const [adjustConfig, setAdjustConfig] = useState(false);

  // Generation state
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedData, setGeneratedData] = useState<Record<string, unknown>[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState<'table' | 'json'>('table');

  // Reset generation state when modal opens
  React.useEffect(() => {
    if (isOpen) {
      setGeneratedData(null);
      setError(null);
      setIsGenerating(false);
      setPreviewMode('table');
    }
  }, [isOpen]);

  // Generate data function (moved from parent)
  const generateData = useCallback(async () => {
    setIsGenerating(true);
    setError(null);

    try {
      let data: Record<string, unknown>[] = [];

      if (dataType === 'custom-api') {
        if (!customEndpoint.trim()) {
          throw new Error('Please specify a custom API endpoint URL');
        }
        const response = await fetch(customEndpoint.trim());
        if (!response.ok) {
          throw new Error(`Failed to fetch from endpoint: ${customEndpoint}`);
        }
        const apiData: Record<string, unknown>[] = await response.json();
        data = Array.isArray(apiData) ? apiData.slice(0, recordCount) : [apiData];
      } else if (dataType.endsWith('-jsonplaceholder')) {
        const endpoint = dataType.replace('-jsonplaceholder', '');
        const response = await fetch(`https://jsonplaceholder.typicode.com/${endpoint}`);
        const apiData: Record<string, unknown>[] = await response.json();
        data = apiData.slice(0, recordCount);
      } else {
        // Generate local data
        const firstNames = ['Alice', 'Bob', 'Carol', 'David', 'Eva', 'Frank', 'Grace', 'Henry', 'Ivy', 'Jack'];
        const lastNames = ['Johnson', 'Smith', 'Williams', 'Brown', 'Davis', 'Miller', 'Wilson', 'Moore', 'Taylor', 'Anderson'];

        if (dataType === 'users') {
          const departments = ['Engineering', 'Design', 'Business', 'Marketing', 'Sales'];
          const roles = ['Manager', 'Developer', 'Designer', 'Analyst', 'Coordinator'];

          data = Array.from({ length: recordCount }, (_, i) => ({
            id: i + 1,
            name: `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`,
            email: `${firstNames[Math.floor(Math.random() * firstNames.length)].toLowerCase()}.${lastNames[Math.floor(Math.random() * lastNames.length)].toLowerCase()}@company.com`,
            role: roles[Math.floor(Math.random() * roles.length)],
            department: departments[Math.floor(Math.random() * departments.length)],
            status: Math.random() > 0.3,
            lastLogin: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          }));
        } else if (dataType === 'sales') {
          const products = ['Widget A', 'Widget B', 'Service X', 'Service Y', 'Package Z'];
          const regions = ['North', 'South', 'East', 'West', 'Central'];
          const statuses = ['Pending', 'Completed', 'Cancelled'];

          data = Array.from({ length: recordCount }, (_, i) => ({
            id: i + 1,
            product: products[Math.floor(Math.random() * products.length)],
            amount: Math.floor(Math.random() * 10000) + 100,
            region: regions[Math.floor(Math.random() * regions.length)],
            status: statuses[Math.floor(Math.random() * statuses.length)],
            date: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            customer: `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`,
          }));
        } else if (dataType === 'customers') {
          const industries = ['Technology', 'Healthcare', 'Finance', 'Retail', 'Manufacturing'];
          const sizes = ['Small', 'Medium', 'Large', 'Enterprise'];
          const statuses = ['Active', 'Inactive', 'Prospect'];

          data = Array.from({ length: recordCount }, (_, i) => {
            const name = `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
            return {
              id: i + 1,
              name: name,
              email: `${name.split(' ')[0].toLowerCase()}.${name.split(' ')[1].toLowerCase()}@company.com`,
              company: `${name.split(' ')[1]} ${industries[Math.floor(Math.random() * industries.length)]}`,
              industry: industries[Math.floor(Math.random() * industries.length)],
              size: sizes[Math.floor(Math.random() * sizes.length)],
              status: statuses[Math.floor(Math.random() * statuses.length)],
              lastContact: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            };
          });
        }
      }

      setGeneratedData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while generating data');
    } finally {
      setIsGenerating(false);
    }
  }, [dataType, customEndpoint, recordCount]);

  // Handle apply
  const handleApply = () => {
    if (generatedData) {
      onGenerate(generatedData, { adjustConfig, dataType });
      onClose();
    }
  };

  // Handle cancel
  const handleCancel = () => {
    onClose();
  };

  return (
    <Modal
      show={isOpen}
      onHide={onClose}
      size="xl"
      centered
      aria-labelledby="sample-data-generation-modal-title"
    >
      <Modal.Header closeButton>
        <Modal.Title id="sample-data-generation-modal-title">
          <FaRandom className="me-2" />
          Generate Sample Data
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!generatedData ? (
          // Generation form
          <>
            <div className="mb-3">
              <label htmlFor="data-type-select" className="form-label">Data Type</label>
              <Form.Select
                id="data-type-select"
                value={dataType}
                onChange={(e) => setDataType(e.target.value)}
                disabled={isGenerating}
              >
                <option value="users">Users (Local)</option>
                <option value="sales">Sales Records (Local)</option>
                <option value="customers">Customers (Local)</option>
                <option value="users-jsonplaceholder">Users (JSONPlaceholder)</option>
                <option value="posts-jsonplaceholder">Posts (JSONPlaceholder)</option>
                <option value="comments-jsonplaceholder">Comments (JSONPlaceholder)</option>
                <option value="albums-jsonplaceholder">Albums (JSONPlaceholder)</option>
                <option value="photos-jsonplaceholder">Photos (JSONPlaceholder)</option>
                <option value="todos-jsonplaceholder">Todos (JSONPlaceholder)</option>
                <option value="custom-api">Custom API Endpoint</option>
              </Form.Select>
            </div>

            {(dataType === 'custom-api' || dataType.endsWith('-jsonplaceholder')) && (
              <div className="mb-3">
                <label htmlFor="endpoint-input" className="form-label">
                  {dataType === 'custom-api' ? 'API Endpoint URL' : 'JSONPlaceholder Endpoint'}
                </label>
                <Form.Control
                  id="endpoint-input"
                  type="text"
                  placeholder={
                    dataType === 'custom-api'
                      ? 'e.g., https://api.example.com/users'
                      : dataType.replace('-jsonplaceholder', '')
                  }
                  value={customEndpoint}
                  onChange={(e) => setCustomEndpoint(e.target.value)}
                  disabled={isGenerating}
                  className="mb-2"
                />
                <small className="text-muted">
                  {dataType === 'custom-api'
                    ? 'Enter a full API endpoint URL to fetch data from any system'
                    : `This will fetch from https://jsonplaceholder.typicode.com/${dataType.replace('-jsonplaceholder', '')}`
                  }
                </small>
              </div>
            )}

            <div className="mb-3">
              <label htmlFor="record-count-input" className="form-label">Number of Records</label>
              <Form.Control
                id="record-count-input"
                type="number"
                min="1"
                max="100"
                value={recordCount}
                onChange={(e) => setRecordCount(parseInt(e.target.value) || 10)}
                disabled={isGenerating}
              />
            </div>

            <div className="mb-3">
              <Form.Check
                id="adjust-config-checkbox"
                type="checkbox"
                label="Adjust displayed fields to generated data (table/grid/list modes)"
                checked={adjustConfig}
                onChange={(e) => setAdjustConfig(e.target.checked)}
                disabled={isGenerating}
              />
            </div>

            <Alert variant="info">
              <small>
                <strong>Local options</strong> generate synthetic data. <strong>JSONPlaceholder options</strong> fetch real sample data from jsonplaceholder.typicode.com.
                <strong>Custom API Endpoint</strong> allows you to test with any external API by providing a full URL (e.g., https://api.example.com/users).
                When enabled, field adjustment updates visible item fields for table/grid/list style configurations and skips unsupported modes.
              </small>
            </Alert>

            {error && (
              <Alert variant="danger">
                <FaTimes className="me-2" />
                {error}
              </Alert>
            )}
          </>
        ) : (
          // Preview section
          <>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="mb-0">Preview Generated Data ({generatedData.length} records)</h5>
              <div className="btn-group" role="group">
                <Button
                  variant={previewMode === 'table' ? 'primary' : 'outline-primary'}
                  size="sm"
                  onClick={() => setPreviewMode('table')}
                >
                  <FaEye className="me-1" />
                  Table
                </Button>
                <Button
                  variant={previewMode === 'json' ? 'primary' : 'outline-primary'}
                  size="sm"
                  onClick={() => setPreviewMode('json')}
                >
                  <FaEyeSlash className="me-1" />
                  JSON
                </Button>
              </div>
            </div>

            {previewMode === 'table' && generatedData.length > 0 && (
              <div className="table-responsive" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                <Table striped bordered hover size="sm">
                  <thead className="table-dark">
                    <tr>
                      {Object.keys(generatedData[0]).map(key => (
                        <th key={key}>{key}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {generatedData.slice(0, 10).map((record, index) => (
                      <tr key={index}>
                        {Object.values(record).map((value, i) => (
                          <td key={i} style={{ maxWidth: '150px' }}>
                            {typeof value === 'boolean' ? (value ? 'Yes' : 'No') :
                             typeof value === 'object' ? JSON.stringify(value) :
                             String(value)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </Table>
                {generatedData.length > 10 && (
                  <small className="text-muted">Showing first 10 records. Full data will be applied.</small>
                )}
              </div>
            )}

            {previewMode === 'json' && (
              <pre className="bg-light p-3 rounded" style={{ maxHeight: '400px', overflowY: 'auto', fontSize: '0.85rem' }}>
                <code>{JSON.stringify(generatedData.slice(0, 5), null, 2)}</code>
                {generatedData.length > 5 && (
                  <div className="text-muted mt-2">... and {generatedData.length - 5} more records</div>
                )}
              </pre>
            )}
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        {!generatedData ? (
          <>
            <Button variant="secondary" onClick={onClose} disabled={isGenerating}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={generateData}
              disabled={isGenerating || (dataType === 'custom-api' && !customEndpoint.trim())}
            >
              {isGenerating ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" />
                  Generating...
                </>
              ) : (
                <>
                  <FaRandom className="me-2" />
                  Generate Data
                </>
              )}
            </Button>
          </>
        ) : (
          <>
            <Button variant="secondary" onClick={handleCancel}>
              Cancel
            </Button>
            <Button variant="success" onClick={handleApply}>
              <FaCheck className="me-2" />
              Apply Data
            </Button>
          </>
        )}
      </Modal.Footer>
    </Modal>
  );
};