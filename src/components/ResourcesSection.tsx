import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaBook, FaGithub } from 'react-icons/fa';

export const ResourcesSection: React.FC = () => (
  <footer id="resources" className="bg-dark text-light py-5">
    <Container>
      <Row className="text-center mb-4">
        <Col>
          <h2 className="display-5 fw-bold mb-3" style={{ color: 'white' }}>Resources</h2>
          <p className="lead">
            "Configuration is the new code. Build once, configure everywhere."
          </p>
        </Col>
      </Row>
      <Row className="g-4">
        <Col md={4}>
          <Card className="bg-secondary text-light border-0 h-100">
            <Card.Body className="text-center">
              <FaBook className="display-4 mb-3 text-warning" />
              <h5>Docs</h5>
              <p>Comprehensive documentation and API reference</p>
              <Button variant="outline-light" size="sm">Coming Soon</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="bg-secondary text-light border-0 h-100">
            <Card.Body className="text-center">
              <FaGithub className="display-4 mb-3 text-warning" />
              <h5>GitHub</h5>
              <p>Source code, issues, and contributions</p>
              <Button variant="outline-light" size="sm">View Repository</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="bg-secondary text-light border-0 h-100">
            <Card.Body className="text-center">
              <div className="display-4 mb-3 text-warning">$</div>
              <h5>Install</h5>
              <code className="d-block bg-dark p-2 rounded">npm install widgemo-core</code>
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
    </Container>
  </footer>
);