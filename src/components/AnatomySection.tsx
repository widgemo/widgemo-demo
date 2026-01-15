import React from 'react';
import { Row, Col, Card, Badge } from 'react-bootstrap';
import { FaLayerGroup, FaCog, FaCodeBranch, FaPuzzlePiece } from 'react-icons/fa';

interface AnatomySectionProps {
  currentTheme?: string;
}

export const AnatomySection: React.FC<AnatomySectionProps> = () => {
  return (
    <section id="anatomy" className="py-5 theme-aware-section">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div className="text-center mb-5">
          <h2 className="display-4 fw-bold mb-3 theme-aware-text">Anatomy of a Widgemo</h2>
          <p className="lead theme-aware-text">Understanding the configurable layers of the primitive</p>
        </div>
      <div className="mb-5">
        <Row className="g-4">
          {/* The Single Primitive */}
          <Col lg={12} className="mb-4">
            <Card className="h-100 shadow-sm theme-aware-card" style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <Card.Body className="p-4">
                <div className="d-flex align-items-center mb-3">
                  <FaLayerGroup className="text-primary me-3" size={24} />
                  <h3 className="h4 mb-0">The Single Primitive</h3>
                </div>
                <p className="text-muted mb-4">
                  One React component that adapts to render boards, tables, grids, charts, and more through configuration alone.
                </p>
                <div className="text-center">
                  {/* Placeholder for diagram showing one component → many modes */}
                  <div style={{
                    height: '200px',
                    backgroundColor: 'rgba(0,0,0,0.2)',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px dashed rgba(255,255,255,0.3)'
                  }}>
                    <div className="text-center">
                      <FaLayerGroup size={48} className="text-muted mb-2" />
                      <p className="text-muted small mb-0">
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
            <Card className="h-100 shadow-sm theme-aware-card" style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <Card.Body className="p-4">
                <div className="d-flex align-items-center mb-3">
                  <FaCog className="text-success me-3" size={24} />
                  <h3 className="h4 mb-0">Core Layers of Configurability</h3>
                </div>
                <p className="text-muted mb-4">
                  Four independent configuration layers that can be mixed and matched.
                </p>
                <div className="mb-3">
                  <div className="d-flex align-items-center mb-2">
                    <Badge bg="primary" className="me-2">Header</Badge>
                    <span className="small">Controls, actions, and navigation</span>
                  </div>
                  <div className="d-flex align-items-center mb-2">
                    <Badge bg="success" className="me-2">Content</Badge>
                    <span className="small">Layout, rendering, and display modes</span>
                  </div>
                  <div className="d-flex align-items-center mb-2">
                    <Badge bg="warning" className="me-2">Theme</Badge>
                    <span className="small">Colors, spacing, and visual styling</span>
                  </div>
                  <div className="d-flex align-items-center mb-2">
                    <Badge bg="info" className="me-2">Capabilities</Badge>
                    <span className="small">Features, interactions, and behaviors</span>
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
            <Card className="h-100 shadow-sm theme-aware-card" style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <Card.Body className="p-4">
                <div className="d-flex align-items-center mb-3">
                  <FaCodeBranch className="text-warning me-3" size={24} />
                  <h3 className="h4 mb-0">How Modes Adapt</h3>
                </div>
                <p className="text-muted mb-4">
                  The same data rendered differently through mode configuration alone.
                </p>
                {/* Placeholder for side-by-side mode comparison */}
                <div style={{
                  height: '200px',
                  backgroundColor: 'rgba(0,0,0,0.2)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px dashed rgba(255,255,255,0.3)'
                }}>
                  <div className="text-center">
                    <FaCodeBranch size={48} className="text-muted mb-2" />
                    <p className="text-muted small mb-0">
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
            <Card className="h-100 shadow-sm theme-aware-card" style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <Card.Body className="p-4">
                <div className="d-flex align-items-center mb-3">
                  <FaPuzzlePiece className="text-info me-3" size={24} />
                  <h3 className="h4 mb-0">Extending with Overrides</h3>
                </div>
                <p className="text-muted mb-4">
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
  },
  // Override renderers
  renderCell: (value, column) => (
    <CustomCell value={value} column={column} />
  )
};`}
                  </pre>
                </div>
                {/* Placeholder for before/after comparison */}
                <div style={{
                  height: '120px',
                  backgroundColor: 'rgba(0,0,0,0.2)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px dashed rgba(255,255,255,0.3)'
                }}>
                  <div className="text-center">
                    <FaPuzzlePiece size={32} className="text-muted mb-2" />
                    <p className="text-muted small mb-0">
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
            <Card className="h-100 shadow-sm theme-aware-card" style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <Card.Body className="p-4">
                <div className="d-flex align-items-center mb-3">
                  <FaLayerGroup className="text-danger me-3" size={24} />
                  <h3 className="h4 mb-0">Parent-Child Composition</h3>
                </div>
                <p className="text-muted mb-4">
                  Compose complex interfaces by nesting Widgemo instances with different configurations.
                </p>
                {/* Placeholder for composition diagram */}
                <div style={{
                  height: '200px',
                  backgroundColor: 'rgba(0,0,0,0.2)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px dashed rgba(255,255,255,0.3)'
                }}>
                  <div className="text-center">
                    <FaLayerGroup size={48} className="text-muted mb-2" />
                    <p className="text-muted small mb-0">
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