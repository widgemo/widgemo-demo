import React from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaChartLine, FaWallet } from 'react-icons/fa';

interface AdvancedSectionProps {
  currentTheme: string;
}

export const AdvancedSection: React.FC<AdvancedSectionProps> = () => (
  <section id="applications-preview" className="section-block theme-aware-section">
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
      <div className="section-header">
        <h2 className="section-title theme-aware-text">What Full Apps Look Like</h2>
        <p className="section-subtitle theme-aware-text">Working mockups showing what Widgemo looks like at application scale. Not production apps — but close enough to matter.</p>
      </div>
      <Row className="g-4">
        <Col lg={6}>
          <Card className="h-100 shadow-sm theme-aware-card">
            <div style={{ overflow: 'hidden', borderRadius: '0.375rem 0.375rem 0 0' }}>
              <img
                src="/assets/app-thumb-team-portfolio.png"
                alt="Team Portfolio dashboard preview"
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  borderRadius: '0.375rem 0.375rem 0 0',
                }}
                onError={(event) => {
                  event.currentTarget.style.visibility = 'hidden';
                }}
              />
            </div>
            <Card.Body className="d-flex flex-column">
              <div className="d-flex align-items-center mb-3">
                <FaChartLine className="text-primary me-2" />
                <h3 className="mb-0" style={{ fontSize: '1.05rem', fontWeight: 600 }}>Team Portfolio</h3>
              </div>
              <p className="text-muted" style={{ fontSize: '0.9rem' }}>
                A realistic project delivery dashboard mockup. KPI cards, throughput trends, execution lanes, and initiative health — multiple Widgemo instances sharing filters and state in one cohesive layout.
              </p>
              <div className="mt-auto d-flex gap-2">
                <Button as={Link as any} to="/dashboard" variant="primary" className="px-3 py-2">
                  Explore Team Portfolio →
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={6}>
          <Card className="h-100 shadow-sm theme-aware-card">
            <div style={{ overflow: 'hidden', borderRadius: '0.375rem 0.375rem 0 0' }}>
              <img
                src="/assets/app-thumb-finance-tracker.png"
                alt="Finance Tracker dashboard preview"
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  borderRadius: '0.375rem 0.375rem 0 0',
                }}
                onError={(event) => {
                  event.currentTarget.style.visibility = 'hidden';
                }}
              />
            </div>
            <Card.Body className="d-flex flex-column">
              <div className="d-flex align-items-center mb-3">
                <FaWallet className="text-success me-2" />
                <h3 className="mb-0" style={{ fontSize: '1.05rem', fontWeight: 600 }}>Finance Tracker</h3>
              </div>
              <p className="text-muted" style={{ fontSize: '0.9rem' }}>
                A realistic cashflow dashboard mockup built almost entirely from Widgemo instances. Forecasts, alerts, transactions, and scenario planning — configured, not coded.
              </p>
              <div className="mt-auto d-flex gap-2">
                <Button as={Link as any} to="/cashflow-dashboard" variant="success" className="px-3 py-2">
                  Explore Finance Tracker →
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <div className="text-center mt-4">
        <Button as={Link as any} to="/applications" variant="outline-primary" className="px-4 py-2">
          Explore All Demos →
        </Button>
      </div>
    </div>
  </section>
);