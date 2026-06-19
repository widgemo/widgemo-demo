import React, { useMemo } from 'react';
import { Row, Col, Card, Badge } from 'react-bootstrap';
import { Widgemo, type FieldConfig, type WidgemoConfig } from '@widgemo/widgemo-core';
import { teaserSampleData } from '../../data/sampleData';

interface AnatomySectionProps {
  currentTheme?: string;
}

const baseFields: FieldConfig[] = [
  { key: 'name', label: 'Name', type: 'text' },
  { key: 'role', label: 'Role', type: 'text' },
  { key: 'status', label: 'Status', type: 'text', renderAs: 'badge' },
];

export const AnatomySection: React.FC<AnatomySectionProps> = () => {
  const sampleData = useMemo(() => teaserSampleData.slice(0, 4), []);

  const tableConfig: WidgemoConfig = {
    zones: {
      content: {
        mode: 'table',
        item: {
          fields: baseFields,
          layout: { type: 'auto' },
        },
      },
    },
  };

  const gridConfig: WidgemoConfig = {
    zones: {
      content: {
        mode: 'grid',
        modeConfig: { grid: { maxColumns: 2, gap: '0.6rem' } },
        item: {
          fields: baseFields,
          layout: { type: 'auto' },
        },
      },
    },
  };

  const boardConfig: WidgemoConfig = {
    zones: {
      content: {
        mode: 'board',
        modeConfig: {
          board: {
            columns: {
              field: 'status',
              items: [
                { id: 'active', label: 'Active', value: 'active' },
                { id: 'pending', label: 'Pending', value: 'pending' },
                { id: 'inactive', label: 'Inactive', value: 'inactive' },
              ],
            },
            dragEnabled: false,
          },
        },
        item: {
          fields: baseFields,
          layout: { type: 'auto' },
        },
      },
    },
  };

  return (
    <section id="anatomy" className="section-block theme-aware-section">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div className="section-header">
          <h2 className="section-title theme-aware-text">How Widgemo Works</h2>
          <p className="section-subtitle theme-aware-text">
            One primitive, many outputs. The same data and field schema can render as table, grid, and board with config alone.
          </p>
        </div>

        <Row className="g-4 mb-4">
          <Col xl={4}>
            <Card className="h-100 shadow-sm theme-aware-card">
              <Card.Body className="p-3">
                <h3 className="mb-2" style={{ fontSize: '0.95rem', fontWeight: 600 }}>Table</h3>
                <Widgemo data={sampleData} config={tableConfig} className="my-custom-widgemo" />
              </Card.Body>
            </Card>
          </Col>
          <Col xl={4}>
            <Card className="h-100 shadow-sm theme-aware-card">
              <Card.Body className="p-3">
                <h3 className="mb-2" style={{ fontSize: '0.95rem', fontWeight: 600 }}>Grid</h3>
                <Widgemo data={sampleData} config={gridConfig} className="my-custom-widgemo" />
              </Card.Body>
            </Card>
          </Col>
          <Col xl={4}>
            <Card className="h-100 shadow-sm theme-aware-card">
              <Card.Body className="p-3">
                <h3 className="mb-2" style={{ fontSize: '0.95rem', fontWeight: 600 }}>Board</h3>
                <Widgemo data={sampleData} config={boardConfig} className="my-custom-widgemo" />
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="g-4">
          <Col lg={6}>
            <Card className="h-100 shadow-sm theme-aware-card">
              <Card.Body className="p-3">
                <h3 className="mb-3" style={{ fontSize: '1rem', fontWeight: 600 }}>Core Layers</h3>
                <div className="d-flex align-items-center mb-2">
                  <Badge bg="primary" className="me-2">Header</Badge>
                  <span style={{ fontSize: '0.86rem' }}>Titles, summary, top-level actions</span>
                </div>
                <div className="d-flex align-items-center mb-2">
                  <Badge bg="success" className="me-2">Content</Badge>
                  <span style={{ fontSize: '0.86rem' }}>Modes, filtering, grouping, pagination, interactions</span>
                </div>
                <div className="d-flex align-items-center mb-2">
                  <Badge bg="warning" className="me-2">Item & Fields</Badge>
                  <span style={{ fontSize: '0.86rem' }}>Value semantics and render behavior</span>
                </div>
                <div className="d-flex align-items-center mb-2">
                  <Badge bg="info" className="me-2">Theme</Badge>
                  <span style={{ fontSize: '0.86rem' }}>Visual identity and system consistency</span>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={6}>
            <Card className="h-100 shadow-sm theme-aware-card">
              <Card.Body className="p-3">
                <h3 className="mb-3" style={{ fontSize: '1rem', fontWeight: 600 }}>Extension Story</h3>
                <p className="text-muted mb-2" style={{ fontSize: '0.86rem' }}>
                  Start with built-ins, then extend only where your product needs it.
                </p>
                <ul className="text-muted" style={{ fontSize: '0.84rem', paddingLeft: '1rem' }}>
                  <li>Custom renderAs for new visual treatments</li>
                  <li>Custom field types for domain semantics</li>
                  <li>Custom modes for layout strategies</li>
                  <li>Custom icons and hooks for product integration</li>
                </ul>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </section>
  );
};
