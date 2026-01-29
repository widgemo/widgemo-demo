import React, { useState, useEffect } from 'react';
import { Button, Row, Col, Card } from 'react-bootstrap';
// import { Widgemo } from 'widgemo-core';
import { teaserConfigs, mockAdapters, teaserSampleData } from '../data/sampleData';
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
  const [progress, setProgress] = useState(0);
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
      setProgress(0); // Reset progress when changing config
    }, 3000);
    return () => clearInterval(interval);
  }, [configsLength]);

  // Progress bar animation - synchronized with config changes
  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const nextProgress = prev + 1;
        return nextProgress >= 100 ? 0 : nextProgress;
      });
    }, 30); // Update every 30ms for smooth animation (3000ms / 100 = 30ms)
    return () => clearInterval(progressInterval);
  }, []);

  const currentTeaserItem = teaserConfigs[currentConfigIndex];
  const teaserConfig = mergeThemeIntoConfig(currentTeaserItem.config, currentTheme);
  
  // Create dynamic adapters - all teasers use the same user data
  const teaserAdapters = React.useMemo(() => {
    return {
      ...mockAdapters,
      fetchData: async () => ({
        data: teaserSampleData,
        total: teaserSampleData.length,
      }),
    };
  }, []);

  return (
    <section id="teaser" className="py-5 theme-aware-section" style={{
      color: shouldHaveDarkText ? '#161616' : 'white',
      height: isLargeScreen ? '800px' : '1200px' // Responsive height based on screen size
    }}>
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <Row>
          <Col lg={4} className="mb-5 mb-lg-0">
            <h1 className="display-1 fw-bold mb-4">
              Experience <span className="text-warning">Widgemo</span>
            </h1>
            <h2 className="h3 mb-4 fw-light">
              One Configurable React Primitive for Infinite UIs
            </h2>
            <p className="lead mb-4" style={{ color: shouldHaveDarkText ? '#161616' : 'white' }}>
              Configuration over custom code. Render boards, tables, grids, charts, and more—from a single component,
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
            <Card className="shadow-lg border-0 theme-aware-card" style={{ height: '500px', overflow: 'hidden' }}>
              <Card.Body className="p-3 d-flex flex-column h-100">
                <div className="mb-3 flex-shrink-0">
                  <small className="text-muted d-flex justify-content-between align-items-center ms-2">
                    <span style={{fontSize: '1.2rem'}}>Present your data as - <strong>{currentTeaserItem.description}</strong></span>
                    <div style={{ width: '120px' }}>
                      <div className="progress" style={{ height: '4px' }}>
                        <div
                          className="progress-bar bg-primary"
                          role="progressbar"
                          style={{
                            width: `${progress}%`,
                            transition: 'none'
                          }}
                          aria-valuenow={progress}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        />
                      </div>
                    </div>
                  </small>
                </div>
                <div inert className="flex-grow-1 overflow-auto" style={{ padding: '8px' }}>
                  {/* <Widgemo
                    key={currentConfigIndex}
                    config={{ ...teaserConfig, theme: { ...teaserConfig.theme, baseColor: getThemeBackgroundColor(currentTheme) } }}
                    adapters={teaserAdapters}
                    showConfigDetails={false}
                  /> */}
                  <div>Teaser Widgemo commented out for testing simplified version</div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </section>
  );
};