import React from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { FaBook, FaGithub } from 'react-icons/fa';

export const ResourcesSection: React.FC = () => (
  <footer id="resources" className="bg-dark text-light py-4">
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
      <Row className="text-center mb-3">
        <Col>
          <h2 className="fw-bold mb-2" style={{ color: 'white', fontSize: '1.625rem', letterSpacing: '-0.02em' }}>Resources</h2>
          <p style={{ fontSize: '0.9375rem' }}>
            &quot;Configuration is the new code. Build once, configure everywhere.&quot;
          </p>
        </Col>
      </Row>
      <Row className="g-4">
        <Col md={4}>
          <Card className="bg-secondary text-light border-0 h-100">
            <Card.Body className="text-center p-3">
              <FaBook className="mb-2 text-warning" size={28} />
              <h5 style={{ fontSize: '0.9375rem', fontWeight: 600 }}>Docs</h5>
              <p style={{ fontSize: '0.875rem' }}>Comprehensive documentation and API reference</p>
              <Button variant="outline-light" size="sm" href="https://docs.widgemo.com/core" target="_blank" rel="noopener noreferrer">
                View Docs →
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="bg-secondary text-light border-0 h-100">
            <Card.Body className="text-center p-3">
              <FaGithub className="mb-2 text-warning" size={28} />
              <h5 style={{ fontSize: '0.9375rem', fontWeight: 600 }}>GitHub</h5>
              <p style={{ fontSize: '0.875rem' }}>Source code, issues, and contributions</p>
              <Button variant="outline-light" size="sm" href="https://github.com/widgemo/widgemo-core" target="_blank" rel="noopener noreferrer">
                View Repository →
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="bg-secondary text-light border-0 h-100">
            <Card.Body className="text-center p-3">
              <div className="mb-2 text-warning" style={{ fontSize: '1.75rem', lineHeight: 1 }}>$</div>
              <h5 style={{ fontSize: '0.9375rem', fontWeight: 600 }}>Install</h5>
              <code className="d-block bg-dark p-2 rounded" style={{ fontSize: '0.8125rem' }}>npm install widgemo-core</code>
              <Button variant="outline-light" size="sm" className="mt-2">Copy Command</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <hr className="my-4" />
      <Row className="text-center">
        <Col>
          <p className="mb-2">
            For feedback, questions, or to learn more about Widgemo, visit our main site:
          </p>
          <Button variant="outline-light" href="https://widgemo.com" target="_blank" rel="noopener noreferrer">
            widgemo.com
          </Button>
        </Col>
      </Row>
    </div>
  </footer>
);