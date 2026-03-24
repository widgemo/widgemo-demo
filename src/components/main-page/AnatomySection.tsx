import React from 'react';
import { Row, Col, Card, Badge } from 'react-bootstrap';
import { FaLayerGroup, FaCog, FaCodeBranch, FaPuzzlePiece } from 'react-icons/fa';

interface AnatomySectionProps {
  currentTheme?: string;
}

export const AnatomySection: React.FC<AnatomySectionProps> = () => {
  return (
    <section id="anatomy" className="section-block theme-aware-section">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div className="section-header">
          <h2 className="section-title theme-aware-text">Anatomy of a Widgemo</h2>
          <p className="section-subtitle theme-aware-text">Understanding the configurable layers of the primitive</p>
        </div>
      <div className="mb-4">
        <Row className="g-4">
          {/* The Single Primitive */}
          <Col lg={12} className="mb-4">
            <Card className="h-100 shadow-sm theme-aware-card">
              <Card.Body className="p-3">
                <div className="d-flex align-items-center mb-2">
                  <FaLayerGroup className="text-primary me-2" size={18} />
                  <h3 className="mb-0" style={{ fontSize: '1rem', fontWeight: 600 }}>The Single Primitive</h3>
                </div>
                <p className="text-muted mb-3" style={{ fontSize: '0.875rem' }}>
                  One React component that adapts to render boards, tables, grids, charts, and more through configuration alone.
                </p>
                <div className="text-center">
                  {/* Placeholder for diagram showing one component → many modes */}
                  <div style={{
                    height: '140px',
                    backgroundColor: 'rgba(0,0,0,0.06)',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px dashed var(--app-border)'
                  }}>
                    <div className="text-center">
                      <FaLayerGroup size={28} className="text-muted mb-1" />
                      <p className="text-muted mb-0" style={{ fontSize: '0.75rem' }}>
                        [Diagram: Widgemo Component → Table, Board, Grid, Chart modes]<br/>
                        <em>Future: Interactive SVG showing component transformation</em>
                      </p>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Core Layers of Configurability */}
          <Col lg={6}>
            <Card className="h-100 shadow-sm theme-aware-card">
              <Card.Body className="p-3">
                <div className="d-flex align-items-center mb-2">
                  <FaCog className="text-success me-2" size={18} />
                  <h3 className="mb-0" style={{ fontSize: '1rem', fontWeight: 600 }}>Core Layers of Configurability</h3>
                </div>
                <p className="text-muted mb-3" style={{ fontSize: '0.875rem' }}>
                  Four independent configuration layers that can be mixed and matched.
                </p>
                <div className="mb-3">
                  <div className="d-flex align-items-center mb-1">
                    <Badge bg="primary" className="me-2">Header</Badge>
                    <span style={{ fontSize: '0.8125rem' }}>Controls, actions, and navigation</span>
                  </div>
                  <div className="d-flex align-items-center mb-1">
                    <Badge bg="success" className="me-2">Content</Badge>
                    <span style={{ fontSize: '0.8125rem' }}>Layout, rendering, and display modes</span>
                  </div>
                  <div className="d-flex align-items-center mb-1">
                    <Badge bg="warning" className="me-2">Theme</Badge>
                    <span style={{ fontSize: '0.8125rem' }}>Colors, spacing, and visual styling</span>
                  </div>
                  <div className="d-flex align-items-center mb-1">
                    <Badge bg="info" className="me-2">Capabilities</Badge>
                    <span style={{ fontSize: '0.8125rem' }}>Features, interactions, and behaviors</span>
                  </div>
                </div>
                {/* Annotated screenshot of configuration layers */}
                <img
                  src="/annotated.jpg"
                  alt="Annotated screenshot showing the four layers of Widgemo configuration: Header, Content, Theme, and Capabilities"
                  className="img-fluid rounded shadow-sm"
                  style={{ maxHeight: '400px', width: '100%', objectFit: 'contain' }}
                />
              </Card.Body>
            </Card>
          </Col>

          {/* How Modes Adapt */}
          <Col lg={6}>
            <Card className="h-100 shadow-sm theme-aware-card">
              <Card.Body className="p-3">
                <div className="d-flex align-items-center mb-2">
                  <FaCodeBranch className="text-warning me-2" size={18} />
                  <h3 className="mb-0" style={{ fontSize: '1rem', fontWeight: 600 }}>How Modes Adapt</h3>
                </div>
                <p className="text-muted mb-3" style={{ fontSize: '0.875rem' }}>
                  The same data rendered differently through mode configuration alone.
                </p>
                {/* Placeholder for side-by-side mode comparison */}
                <div style={{
                  height: '140px',
                  backgroundColor: 'rgba(0,0,0,0.2)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px dashed rgba(255,255,255,0.3)'
                }}>
                  <div className="text-center">
                    <FaCodeBranch size={28} className="text-muted mb-2" />
                    <p className="text-muted mb-0" style={{ fontSize: '0.75rem' }}>
                      [Side-by-side Comparison]<br/>
                      <em>Future: Carousel showing same data in Table/Board/Grid modes</em>
                    </p>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Extending with Overrides */}
          <Col lg={6}>
            <Card className="h-100 shadow-sm theme-aware-card">
              <Card.Body className="p-3">
                <div className="d-flex align-items-center mb-2">
                  <FaPuzzlePiece className="text-info me-2" size={18} />
                  <h3 className="mb-0" style={{ fontSize: '1rem', fontWeight: 600 }}>Extending with Overrides</h3>
                </div>
                <p className="text-muted mb-3" style={{ fontSize: '0.875rem' }}>
                  Customize behavior through adapter functions and render prop overrides.
                </p>
                <div className="bg-dark p-3 rounded mb-3" style={{ fontSize: '0.875rem' }}>
                  <pre style={{ color: '#e9ecef', margin: 0 }}>
{`// Custom data adapter
const customAdapters = {
  fetchData: async (params) => {
    const response = await api.get('/data', { params });
    return {
      data: response.data.items,
      total: response.data.total
    };
  }
};`}
                  </pre>
                </div>
                {/* Placeholder for before/after comparison */}
                <div style={{
                  height: '100px',
                  backgroundColor: 'rgba(0,0,0,0.2)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px dashed rgba(255,255,255,0.3)'
                }}>
                  <div className="text-center">
                    <FaPuzzlePiece size={28} className="text-muted mb-2" />
                    <p className="text-muted mb-0" style={{ fontSize: '0.75rem' }}>
                      [Before/After Comparison]<br/>
                      <em>Future: Split view showing default vs customized rendering</em>
                    </p>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Parent-Child Composition */}
          <Col lg={6}>
            <Card className="h-100 shadow-sm theme-aware-card">
              <Card.Body className="p-3">
                <div className="d-flex align-items-center mb-2">
                  <FaLayerGroup className="text-danger me-2" size={18} />
                  <h3 className="mb-0" style={{ fontSize: '1rem', fontWeight: 600 }}>Parent-Child Composition</h3>
                </div>
                <p className="text-muted mb-3" style={{ fontSize: '0.875rem' }}>
                  Compose complex interfaces by nesting Widgemo instances with different configurations.
                </p>
                {/* Placeholder for composition diagram */}
                <div style={{
                  height: '140px',
                  backgroundColor: 'rgba(0,0,0,0.2)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px dashed rgba(255,255,255,0.3)'
                }}>
                  <div className="text-center">
                    <FaLayerGroup size={28} className="text-muted mb-2" />
                    <p className="text-muted mb-0" style={{ fontSize: '0.75rem' }}>
                      [Composition Diagram]<br/>
                      <em>Future: Tree diagram showing parent-child Widgemo relationships</em>
                    </p>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  </section>
  );
};