import React, { useState, useCallback } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { FaBook } from 'react-icons/fa';
import { widgemoConfigProperties, presetConfigs } from '../../data/configReference';

const getReferenceAccent = (sectionName: string) => {
  if (sectionName === 'WidgemoConfig') {
    return {
      textClass: 'text-primary',
      borderClass: 'border-primary',
    };
  }

  if (sectionName === 'WidgemoProps') {
    return {
      textClass: 'text-success',
      borderClass: 'border-success',
    };
  }

  return {
    textClass: 'text-info',
    borderClass: 'border-info',
  };
};

interface ConfigurationReferenceModalProps {
  /** Whether the modal is open */
  isOpen: boolean;
  /** Callback when the modal should be closed */
  onClose: () => void;
}

/**
 * ConfigurationReferenceModal - A comprehensive reference modal for Widgemo configuration
 *
 * Features:
 * - Interactive navigation with breadcrumb trail
 * - Property documentation with implementation status
 * - Code examples and usage patterns
 * - Responsive layout with navigation sidebar
 * - Accessible with proper ARIA roles and keyboard navigation
 * - Theme-aware styling
 *
 * @param isOpen - Controls modal visibility
 * @param onClose - Called when modal should close
 */
export const ConfigurationReferenceModal: React.FC<ConfigurationReferenceModalProps> = ({
  isOpen,
  onClose,
}) => {
  // Modal-specific state
  const [currentReferenceSection, setCurrentReferenceSection] = useState<string>('WidgemoConfig');
  const [referenceBreadcrumb, setReferenceBreadcrumb] = useState<string[]>(['WidgemoConfig']);

  // Navigation handlers
  const navigateToSection = useCallback((sectionName: string) => {
    setCurrentReferenceSection(sectionName);
    setReferenceBreadcrumb(prev => [...prev, sectionName]);
  }, []);

  const navigateToBreadcrumbIndex = useCallback((index: number) => {
    if (index >= 0 && index < referenceBreadcrumb.length) {
      const newBreadcrumb = referenceBreadcrumb.slice(0, index + 1);
      setReferenceBreadcrumb(newBreadcrumb);
      setCurrentReferenceSection(newBreadcrumb[newBreadcrumb.length - 1]);
    }
  }, [referenceBreadcrumb]);

  const navigateBack = useCallback(() => {
    if (referenceBreadcrumb.length > 1) {
      const newBreadcrumb = referenceBreadcrumb.slice(0, -1);
      setReferenceBreadcrumb(newBreadcrumb);
      setCurrentReferenceSection(newBreadcrumb[newBreadcrumb.length - 1]);
    }
  }, [referenceBreadcrumb]);

  // Reset state when modal closes
  const handleClose = useCallback(() => {
    onClose();
    // Reset to initial state for next open
    setCurrentReferenceSection('WidgemoConfig');
    setReferenceBreadcrumb(['WidgemoConfig']);
  }, [onClose]);

  const { textClass, borderClass } = getReferenceAccent(currentReferenceSection);

  return (
    <Modal show={isOpen} onHide={handleClose} size="xl" centered>
      <Modal.Header closeButton>
        <Modal.Title>
          <FaBook className="me-2" />
          Configuration Reference
          {referenceBreadcrumb.length > 1 && (
            <small className="text-muted ms-2">
              {referenceBreadcrumb.map((segment, index) => (
                <span key={index}>
                  {index > 0 && <span className="mx-1">→</span>}
                  <span
                    className={index === referenceBreadcrumb.length - 1 ? 'fw-bold' : 'text-decoration-underline'}
                    style={{ cursor: index === referenceBreadcrumb.length - 1 ? 'default' : 'pointer' }}
                    onClick={() => index < referenceBreadcrumb.length - 1 && navigateToBreadcrumbIndex(index)}
                  >
                    {segment}
                  </span>
                </span>
              ))}
            </small>
          )}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ maxHeight: '80vh', overflow: 'hidden' }}>
        <div className="row h-100">
          {/* Left Navigation Panel */}
          <div className="col-md-3 border-end" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
            <div className="p-3">
              {referenceBreadcrumb.length > 1 && (
                <Button
                  variant="outline-secondary"
                  size="sm"
                  className="mb-3 w-100"
                  onClick={navigateBack}
                >
                  ← Back to {referenceBreadcrumb[referenceBreadcrumb.length - 2]}
                </Button>
              )}

              <h6 className="mb-3 text-primary">Navigation</h6>
              <nav>
                {Object.entries(
                  widgemoConfigProperties
                    .filter(prop => prop.category === currentReferenceSection)
                    .reduce((acc, prop) => {
                      if (!acc[prop.category]) acc[prop.category] = [];
                      acc[prop.category].push(prop);
                      return acc;
                    }, {} as Record<string, typeof widgemoConfigProperties>)
                ).map(([category, properties]) => (
                  <div key={category} className="mb-3">
                    <h6 className="text-muted small mb-2">{category}</h6>
                    {properties.map((prop, index) => (
                      <button
                        key={index}
                        className={`nav-link text-start p-1 small ${
                          prop.status === 'implemented' ? 'text-success' :
                          prop.status === 'partial' ? 'text-warning' :
                          'text-danger'
                        }`}
                        onClick={() => {
                          const element = document.getElementById(`property-${category}-${prop.property}`);
                          element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }}
                        style={{ background: 'none', border: 'none', width: '100%', fontSize: '0.85rem' }}
                      >
                        {prop.property}
                        <span className="ms-1">
                          {prop.status === 'implemented' ? '✅' :
                           prop.status === 'partial' ? '⚠️' : '❌'}
                        </span>
                      </button>
                    ))}
                  </div>
                ))}
              </nav>
            </div>
          </div>

          {/* Right Content Panel */}
          <div className="col-md-9" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
            {(() => {
              // Get current section properties
              const currentSectionProps = widgemoConfigProperties.filter(prop =>
                prop.category === currentReferenceSection
              );

              return (
                <>
                  {/* Section Header */}
                  <div className="mb-4">
                    <h4 className={textClass}>
                      {currentReferenceSection}
                      <span className="badge bg-light text-dark ms-2">{currentSectionProps.length} properties</span>
                    </h4>
                  </div>

                  {/* Properties List */}
                  {currentSectionProps.map((prop, index) => (
                    <div
                      key={index}
                      id={`property-${currentReferenceSection}-${prop.property}`}
                      className={`mb-3 p-3 border-start border-3 ${borderClass}`}
                      style={{ backgroundColor: 'rgba(0,0,0,0.02)' }}
                    >
                      <div className="d-flex align-items-center mb-2">
                        <code className={`fw-bold me-2 ${textClass}`} style={{ fontSize: '1.1rem' }}>
                          {prop.property}
                        </code>
                        <span
                          className={`badge me-2 ${
                            prop.isComplexType ? 'bg-info text-white' : 'bg-secondary'
                          }`}
                          style={prop.isComplexType ? { cursor: 'pointer', textDecoration: 'underline', border: '1px solid #0dcaf0' } : {}}
                          onClick={() => {
                            if (prop.isComplexType && prop.complexTypeSection) {
                              navigateToSection(prop.complexTypeSection);
                            }
                          }}
                        >
                          {prop.type}
                        </span>
                        <span className={`badge ${
                          prop.status === 'implemented' ? 'bg-success' :
                          prop.status === 'partial' ? 'bg-warning text-dark' :
                          'bg-danger'
                        }`}>
                          {prop.status === 'implemented' ? '✅' : prop.status === 'partial' ? '⚠️' : '❌'} {prop.status.replace('-', ' ')}
                        </span>
                      </div>
                      <p className="text-muted mb-2">{prop.description}</p>
                      <div className="mb-2">
                        <strong className="text-muted">Usage:</strong>
                        <p className="mb-1">{prop.usage}</p>
                      </div>
                      {prop.example && (
                        <div>
                          <strong className="text-success">Example:</strong>
                          <pre className="bg-light p-2 rounded mt-1 mb-0" style={{ fontSize: '0.85rem' }}>
                            <code>{prop.example}</code>
                          </pre>
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Show additional content only on root section */}
                  {currentReferenceSection === 'WidgemoConfig' && (
                    <>
                      <div className="mb-4">
                        <h6 className="text-info">Data Format Examples</h6>
                        <small className="text-muted mb-3 d-block">JSON structure examples for uploading custom data</small>

                        <div className="mb-3">
                          <h6 className="text-info">Users Data</h6>
                          <pre className="bg-light p-2 rounded small"><code>{`[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john.doe@company.com",
    "role": "Manager",
    "department": "Engineering",
    "status": true,
    "lastLogin": "2024-01-15"
  },
  {
    "id": 2,
    "name": "Jane Smith",
    "email": "jane.smith@company.com",
    "role": "Developer",
    "department": "Engineering",
    "status": true,
    "lastLogin": "2024-01-14"
  }
]`}</code></pre>
                        </div>

                        <div className="mb-3">
                          <h6 className="text-info">Sales Records</h6>
                          <pre className="bg-light p-2 rounded small"><code>{`[
  {
    "id": 1,
    "product": "Widget A",
    "amount": 1250.50,
    "region": "North",
    "status": "Completed",
    "date": "2024-01-15",
    "customer": "ABC Corp"
  },
  {
    "id": 2,
    "product": "Service X",
    "amount": 850.00,
    "region": "South",
    "status": "Pending",
    "date": "2024-01-14",
    "customer": "XYZ Ltd"
  }
]`}</code></pre>
                        </div>

                        <div className="mb-3">
                          <h6 className="text-info">Customer Data</h6>
                          <pre className="bg-light p-2 rounded small"><code>{`[
  {
    "id": 1,
    "name": "Alice Johnson",
    "email": "alice@company.com",
    "company": "Tech Solutions Inc",
    "industry": "Technology",
    "size": "Medium",
    "status": "Active",
    "lastContact": "2024-01-12"
  },
  {
    "id": 2,
    "name": "Bob Wilson",
    "email": "bob@enterprise.com",
    "company": "Global Corp",
    "industry": "Finance",
    "size": "Large",
    "status": "Active",
    "lastContact": "2024-01-10"
  }
]`}</code></pre>
                        </div>

                        <div className="mb-3">
                          <h6 className="text-info">API Data Sources</h6>
                          <p className="small text-muted mb-2">
                            <strong>JSONPlaceholder Options:</strong> The dropdown includes direct options for all JSONPlaceholder endpoints (users, posts, comments, albums, photos, todos) that fetch real sample data.
                          </p>
                          <p className="small text-muted mb-2">
                            <strong>Custom API Endpoint:</strong> For testing with external APIs, select "Custom API Endpoint" and provide a full URL (e.g., https://api.github.com/users, https://jsonplaceholder.typicode.com/comments).
                            The system will attempt to fetch and display data from any valid JSON API endpoint.
                          </p>
                        </div>
                      </div>

                      <div className="mb-4">
                        <h6 className="text-success">Preset Configurations</h6>
                        <small className="text-muted mb-3 d-block">Ready-to-use configuration templates</small>
                        {Object.entries(presetConfigs).map(([key, config]) => {
                          const presetTitle = config.zones.header?.title ?? key;
                          const presetMode = config.zones.content.mode;
                          const presetFieldCount = config.zones.content.item.fields.length;

                          return (
                            <div key={key} className="mb-3 p-2 border-start border-success">
                              <code className="text-success fw-bold">{key}</code>
                              <span className="badge bg-secondary ms-2">{presetTitle}</span>
                              <br />
                              <small className="text-muted">{presetMode} mode with {presetFieldCount} fields</small>
                            </div>
                          );
                        })}
                      </div>
                    </>
                  )}
                </>
              );
            })()}
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};