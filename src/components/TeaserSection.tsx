import React, { useState, useEffect } from 'react';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';
import { Widgemo } from 'widgemo-core';
import { teaserConfigs, mockAdapters } from '../data/sampleData';
import { mergeThemeIntoConfig, getThemeBackgroundColor } from '../utils/themeUtils';

interface TeaserSectionProps {
  onExploreGallery: () => void;
  onJumpToSandbox: () => void;
  shouldHaveDarkText: boolean;
  currentTheme: string;
}

export const TeaserSection: React.FC<TeaserSectionProps> = ({
  onExploreGallery,
  onJumpToSandbox,
  shouldHaveDarkText,
  currentTheme
}) => {
  const [currentConfigIndex, setCurrentConfigIndex] = useState(0);
  const [isLargeScreen, setIsLargeScreen] = useState(() => {
    // Detect initial screen size
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(min-width: 992px)').matches;
    }
    return true; // Default to large screen
  });
  const configsLength = teaserConfigs.length;

  // Detect screen size changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 992px)'); // Bootstrap lg breakpoint

    const handleResize = (e: MediaQueryListEvent) => {
      setIsLargeScreen(e.matches);
    };

    mediaQuery.addEventListener('change', handleResize);
    return () => mediaQuery.removeEventListener('change', handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentConfigIndex(prev => (prev + 1) % configsLength);
    }, 3000);
    return () => clearInterval(interval);
  }, [configsLength]);

  const currentTeaserItem = teaserConfigs[currentConfigIndex];
  const teaserConfig = mergeThemeIntoConfig(currentTeaserItem.config, currentTheme);

  return (
    <section id="teaser" className="bg-gradient" style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: shouldHaveDarkText ? '#161616' : 'white',
      paddingTop: '120px', // Fixed distance from navbar
      height: isLargeScreen ? '800px' : '1200px' // Responsive height based on screen size
    }}>
      <Container>
        <Row>
          <Col lg={4} className="mb-5 mb-lg-0">
            <h1 className="display-1 fw-bold mb-4">
              Experience <span className="text-warning">Widgemo</span>
            </h1>
            <h2 className="h3 mb-4 fw-light">
              One Configurable React Primitive for Infinite UIs
            </h2>
            <p className="lead mb-4" style={{ color: shouldHaveDarkText ? '#161616' : 'white' }}>
              Configuration over custom code. Render cards, tables, grids, charts, and more—from a single component,
              data-agnostic and themeable.
            </p>
            <div className="d-flex gap-3 flex-wrap">
              <Button
                size="lg"
                variant="light"
                className="px-4 py-3 fw-bold"
                onClick={onExploreGallery}
              >
                Explore Gallery
              </Button>
              <Button
                size="lg"
                variant="primary"
                className="px-4 py-3 fw-bold shadow"
                onClick={onJumpToSandbox}
              >
                Jump to Sandbox
              </Button>
            </div>
          </Col>
          <Col lg={8}>
            <Card className="shadow-lg border-0 theme-aware-card">
              <Card.Body className="p-1">
                <div className="mb-3">
                  <small className="text-muted">
                    <strong>{currentTeaserItem.config.title}</strong>
                    <span className="ms-2">(Auto-cycling every 3s)</span>
                  </small>
                  <br />
                  <small className="text-muted">{currentTeaserItem.description}</small>
                </div>
                <div style={{ maxHeight: '400px', overflow: 'auto', padding: '8px' }}>
                  <Widgemo
                    key={currentConfigIndex}
                    config={teaserConfig}
                    adapters={mockAdapters}
                    showConfigDetails={false}
                    baseColor={getThemeBackgroundColor(currentTheme)}
                  />
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};