import React from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';

interface AdvancedSectionProps {
  currentTheme: string;
}

export const AdvancedSection: React.FC<AdvancedSectionProps> = () => (
  <section id="advanced" className="section-block theme-aware-section">
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
      <div className="section-header">
        <h2 className="section-title theme-aware-text">Advanced Usage</h2>
        <p className="section-subtitle theme-aware-text">Compositions, nesting, parent-controls, dashboards, and special configurations</p>
      </div>
    <Row className="justify-content-center">
      <Col lg={8} className="text-center">
        <Card className="shadow theme-aware-card border-0 bg-transparent">
          <Card.Body className="py-4">
            <div className="mb-3">
              <h3 className="text-muted mb-2" style={{ fontSize: '1rem' }}>🚧 Coming Soon</h3>
              <p className="text-muted mb-3" style={{ fontSize: '0.9375rem' }}>
                We're building the foundation for truly extensible UIs with advanced compositions,
                nested components, parent-controlled capabilities, and sophisticated dashboard configurations.
              </p>
              <p className="text-muted" style={{ fontSize: '0.875rem' }}>
                In the meantime, explore the <strong>Sandbox</strong> to experiment with current capabilities
                and see how Widgemo can adapt to your data visualization needs.
              </p>
            </div>
            <Button
              variant="outline-primary"
              onClick={() => {
                const element = document.getElementById('sandbox');
                if (element) {
                  const navbarHeight = 56;
                  const elementPosition = element.offsetTop - navbarHeight;
                  window.scrollTo({ top: elementPosition, behavior: 'smooth' });
                }
              }}
              className="px-4 py-2"
            >
              Jump to Sandbox →
            </Button>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </div>
</section>
);