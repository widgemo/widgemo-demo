import React from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { DemoSection } from './DemoSection';

interface AdvancedSectionProps {
  currentTheme: string;
}

export const AdvancedSection: React.FC<AdvancedSectionProps> = () => (
  <DemoSection
    id="advanced"
    title="Advanced Usage"
    subtitle="Compositions, nesting, parent-controls, dashboards, and special configurations"
    className="bg-light"
  >
    <Row className="justify-content-center">
      <Col lg={8} className="text-center">
        <Card className="shadow theme-aware-card border-0 bg-transparent">
          <Card.Body className="py-5">
            <div className="mb-4">
              <h3 className="text-muted mb-3">🚧 Coming Soon</h3>
              <p className="lead text-muted mb-4">
                We're building the foundation for truly extensible UIs with advanced compositions,
                nested components, parent-controlled capabilities, and sophisticated dashboard configurations.
              </p>
              <p className="text-muted">
                In the meantime, explore the <strong>Sandbox</strong> to experiment with current capabilities
                and see how Widgemo can adapt to your data visualization needs.
              </p>
            </div>
            <Button
              variant="outline-primary"
              size="lg"
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
  </DemoSection>
);