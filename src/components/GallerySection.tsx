import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { Widgemo } from 'widgemo-core';
import type { WidgemoConfig } from 'widgemo-core';
import { galleryConfigs, mockAdapters } from '../data/sampleData';
import { mergeThemeIntoConfig, getThemeBackgroundColor } from '../utils/themeUtils';
import { DemoSection } from './DemoSection';
import type { SampleData } from '../data/sampleData';

interface GallerySectionProps {
  onLoadToSandbox: (config: WidgemoConfig, data?: SampleData[]) => void;
  currentTheme: string;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ onLoadToSandbox, currentTheme }) => (
  <DemoSection
    id="gallery"
    title="Gallery"
    subtitle="Explore different configurations and modes"
    className="bg-light"
  >
    <Row>
      {galleryConfigs.map((item, index) => (
        <Col lg={6} xl={6} key={index} className="mb-4">
          <Card
            className="h-100 shadow-sm hover-lift theme-aware-card"
            style={{ cursor: 'pointer' }}
            onClick={() => onLoadToSandbox(item.config)}
          >
            <Card.Body className="d-flex flex-column">
              <div style={{ flex: 1, minHeight: '200px', marginBottom: '1rem' }}>
                <Widgemo
                  config={mergeThemeIntoConfig(item.config, currentTheme)}
                  adapters={mockAdapters}
                  showConfigDetails={true}
                  baseColor={getThemeBackgroundColor(currentTheme)}
                />
              </div>
              <Card.Title className="h6">{item.name}</Card.Title>
              <Card.Text className="text-muted small">{item.description}</Card.Text>
              <div className="mt-auto">
                <small className="text-muted">Click to load in sandbox</small>
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  </DemoSection>
);