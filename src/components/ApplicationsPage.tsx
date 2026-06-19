import React from 'react';
import { Card, Col, Container, Row, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaChartLine, FaWallet, FaLayerGroup, FaBolt, FaCubes } from 'react-icons/fa';

export const ApplicationsPage: React.FC = () => {
  return (
    <Container fluid className="py-4" style={{ maxWidth: '1400px' }}>
      <div className="mb-4">
        <h1 style={{ fontSize: '1.85rem', fontWeight: 700, marginBottom: '0.4rem' }}>Applications</h1>
        <p className="text-muted mb-0" style={{ fontSize: '0.95rem' }}>
          Full application experiences built with multiple Widgemo instances. These are advanced examples that show
          how mode combinations, shared filters, and interaction flows work together in real interfaces.
        </p>
      </div>

      <Row className="g-4 mb-4">
        <Col lg={6}>
          <Card className="h-100 shadow-sm theme-aware-card">
            <Card.Body className="d-flex flex-column">
              <div className="d-flex align-items-center mb-3">
                <FaChartLine className="text-primary me-2" />
                <h2 className="mb-0" style={{ fontSize: '1.2rem', fontWeight: 600 }}>Team Portfolio</h2>
              </div>
              <p className="text-muted" style={{ fontSize: '0.9rem' }}>
                Executive delivery dashboard with KPI snapshots, throughput trends, initiative health, execution lanes,
                and summary highlights.
              </p>
              <div className="mb-3">
                <Badge bg="secondary" className="me-2">Table</Badge>
                <Badge bg="secondary" className="me-2">Chart</Badge>
                <Badge bg="secondary" className="me-2">Board</Badge>
                <Badge bg="secondary" className="me-2">Carousel</Badge>
              </div>
              <ul className="text-muted mb-4" style={{ fontSize: '0.86rem', paddingLeft: '1rem' }}>
                <li>Shared period/team filters across widgets</li>
                <li>Board drag interactions with lane constraints</li>
                <li>Focused initiative workflows</li>
              </ul>
              <div className="mt-auto d-flex gap-2">
                <Button as={Link as any} to="/dashboard" variant="primary">
                  Open Team Portfolio
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={6}>
          <Card className="h-100 shadow-sm theme-aware-card">
            <Card.Body className="d-flex flex-column">
              <div className="d-flex align-items-center mb-3">
                <FaWallet className="text-success me-2" />
                <h2 className="mb-0" style={{ fontSize: '1.2rem', fontWeight: 600 }}>Finance Tracker</h2>
              </div>
              <p className="text-muted" style={{ fontSize: '0.9rem' }}>
                Cashflow command center with liquidity KPIs, forecasts, upcoming events timeline, transaction
                intelligence, alerts triage, and scenario planning.
              </p>
              <div className="mb-3">
                <Badge bg="secondary" className="me-2">Grid</Badge>
                <Badge bg="secondary" className="me-2">Timeline</Badge>
                <Badge bg="secondary" className="me-2">Board</Badge>
                <Badge bg="secondary" className="me-2">Carousel</Badge>
              </div>
              <ul className="text-muted mb-4" style={{ fontSize: '0.86rem', paddingLeft: '1rem' }}>
                <li>Domain-focused renderers and iconography</li>
                <li>Account, risk, and forecast control loops</li>
                <li>Realistic finance UX composition</li>
              </ul>
              <div className="mt-auto d-flex gap-2">
                <Button as={Link as any} to="/cashflow-dashboard" variant="success">
                  Open Finance Tracker
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="theme-aware-card shadow-sm">
        <Card.Body>
          <h3 style={{ fontSize: '1rem', fontWeight: 600 }} className="mb-3">Patterns Proven by These Applications</h3>
          <Row className="g-3">
            <Col md={4}>
              <div className="d-flex align-items-center">
                <FaLayerGroup className="me-2 text-primary" />
                <div>
                  <strong style={{ fontSize: '0.9rem' }}>Composability</strong>
                  <div className="text-muted" style={{ fontSize: '0.82rem' }}>Multiple Widgemos in one cohesive workflow.</div>
                </div>
              </div>
            </Col>
            <Col md={4}>
              <div className="d-flex align-items-center">
                <FaBolt className="me-2 text-warning" />
                <div>
                  <strong style={{ fontSize: '0.9rem' }}>Interactivity</strong>
                  <div className="text-muted" style={{ fontSize: '0.82rem' }}>Actions, filters, and drag interactions at scale.</div>
                </div>
              </div>
            </Col>
            <Col md={4}>
              <div className="d-flex align-items-center">
                <FaCubes className="me-2 text-info" />
                <div>
                  <strong style={{ fontSize: '0.9rem' }}>Mode Flexibility</strong>
                  <div className="text-muted" style={{ fontSize: '0.82rem' }}>Table, grid, board, chart, carousel, and timeline together.</div>
                </div>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};
