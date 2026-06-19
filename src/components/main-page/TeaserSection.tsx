import React, { useState, useEffect } from 'react';
import { Button, Row, Col, Card } from 'react-bootstrap';
import { Widgemo } from '@widgemo/widgemo-core';
import widgemoExamples from '../../data/widgemoExamples';

interface TeaserSectionProps {
  onExploreExamples: () => void;
  onJumpToSandbox: () => void;
  shouldHaveDarkText: boolean;
}

export const TeaserSection: React.FC<TeaserSectionProps> = ({
  onExploreExamples,
  onJumpToSandbox,
  shouldHaveDarkText
}) => {
  const [currentConfigIndex, setCurrentConfigIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const configsLength = widgemoExamples.length;

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

  const currentTeaserItem = widgemoExamples[currentConfigIndex];
  // const teaserConfig = mergeThemeIntoConfig(currentTeaserItem.config, currentTheme);
  
  return (
    <section id="teaser" className="theme-aware-section" style={{
      color: shouldHaveDarkText ? '#161616' : 'white'
    }}>
      <div className="max-w-screen-2xl mx-auto px-4 pt-5 pb-4 sm:px-6 sm:pt-6 lg:px-8 lg:pt-8 xl:px-12 xl:pt-12 2xl:px-16 2xl:pt-16">
        <Row>
          <Col lg={4} className="mb-5 mb-lg-0">
            <h1 className="display-1 fw-bold mb-4">
              Experience <span className="text-warning">Widgemo</span>
            </h1>
            <h2 className="mb-3 fw-light" style={{ fontSize: '1.125rem' }}>
              One Configurable React Primitive for Infinite UIs
            </h2>
            <p className="mb-4" style={{ fontSize: '1rem', color: shouldHaveDarkText ? '#161616' : 'white' }}>
              Configuration over custom code. Render boards, tables, grids, charts, and more—from a single component,
              data-agnostic and themeable.
            </p>
            <div className="d-flex gap-3 flex-wrap">
              <Button
                variant="secondary"
                className="px-3 py-2 fw-bold"
                onClick={onExploreExamples}
              >
                Explore Examples
              </Button>
              <Button
                variant="primary"
                className="px-3 py-2 fw-bold shadow"
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
                    <span style={{fontSize: '0.875rem'}}>Present your data as - <strong>{currentTeaserItem.description}</strong></span>
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
                  <Widgemo
                    key={currentConfigIndex}
                    data={currentTeaserItem.data}
                    config={currentTeaserItem.config}
                    className="my-custom-widgemo"
                  />
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </section>
  );
};