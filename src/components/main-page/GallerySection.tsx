import React, { useState, useMemo } from 'react';
import { Row, Col, Card, Modal, Button } from 'react-bootstrap';
import { FaPlay } from 'react-icons/fa';
import { Widgemo, WidgemoThemeProvider, type Entity, type WidgemoConfig } from 'widgemo-core';
import widgemoExamples from '../../data/widgemoExamples';
import type { Theme } from '../../utils/themeConfig';

interface GallerySectionProps {
  onLoadToSandbox: (configId: string) => void;
  currentTheme: Theme;
}

interface GalleryItem {
  id: string;
  title: string;
  description: string;
  data: Entity[];
  config: WidgemoConfig;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ onLoadToSandbox, currentTheme }) => {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Filter items based on selected mode
  const filteredItems = useMemo(() => {
    return widgemoExamples;
  }, []);

  const handleItemClick = (item: GalleryItem) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleLoadToSandbox = () => {
    if (selectedItem) {
      onLoadToSandbox(selectedItem.id);
      setShowModal(false);
      setSelectedItem(null);
      // Scroll to sandbox section after modal closes
      setTimeout(() => {
        const sandboxElement = document.getElementById('sandbox');
        if (sandboxElement) {
          sandboxElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300); // Wait for modal close animation
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedItem(null);
  };

  const renderGalleryItem = (item: GalleryItem, index: number) => {
    // Debug: Log config for grid view
    console.log('Grid View - Config for', item.title + ':', item.config);

    return (
      <Col xs={12} sm={6} md={6} lg={4} xl={3} xxl={3} key={index} className="mb-4" style={{ minWidth: '280px', maxWidth: '400px' }}>
        <Card
          className="h-100 shadow-sm hover-lift theme-aware-card gallery-item"
          style={{ cursor: 'pointer', minHeight: '280px' }}
          onClick={() => handleItemClick(item)}
        >
          <div className="gallery-preview-container" style={{
            height: '180px',
            overflow: 'hidden',
            position: 'relative',
            backgroundColor: 'transparent',
            borderRadius: '0.375rem 0.375rem 0 0'
          }}>
            <div style={{
              backgroundColor: 'transparent', 
              transform: 'scale(0.5)',
              transformOrigin: 'top left',
              width: '200%',
              height: '200%',
              pointerEvents: 'none'
            }}>
              <WidgemoThemeProvider theme={currentTheme}>
                <Widgemo
                  data={item.data}
                  config={item.config}
                  className="my-custom-widgemo"
                />
              </WidgemoThemeProvider>
            </div>
            <div className="gallery-overlay">
              <FaPlay className="play-icon" />
            </div>
          </div>
          <Card.Body className="d-flex flex-column p-3">
            <div className="d-flex justify-content-between align-items-start mb-2">
              <Card.Title className="h6 mb-0 flex-grow-1">{item.title}</Card.Title>
            </div>
            <Card.Text className="text-muted small flex-grow-1">
              {item.description}
            </Card.Text>
            <div className="mt-auto">
              <small className="text-muted">Click to preview</small>
            </div>
          </Card.Body>
        </Card>
      </Col>
    );
  };

  return (
    <section id="gallery" className="py-5 theme-aware-section">
        <div className="text-center mb-5">
          <h2 className="display-4 fw-bold mb-3 theme-aware-text">Gallery</h2>
          <p className="lead theme-aware-text">Explore different configurations and modes</p>
        </div>

      {/* Gallery Content */}
      <Row className="g-3">
        {filteredItems.map((item, index) => renderGalleryItem(item, index))}
      </Row>

      {/* Preview Modal */}
      {selectedItem && (
        <Modal
          show={showModal}
          onHide={handleCloseModal}
          size="xl"
          centered
          backdrop={true}
        >
            <Modal.Header closeButton className={currentTheme}>
            <Modal.Title>
              {selectedItem.title}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className={currentTheme} style={{ minHeight: '500px' }}>
            <WidgemoThemeProvider theme={currentTheme}>
              <Widgemo
                data={selectedItem.data}
                config={selectedItem.config}
                className="my-custom-widgemo"
              />
            </WidgemoThemeProvider>
            <div className="mt-3">
              <p >{selectedItem.description}</p>
            </div>
          </Modal.Body>
          <Modal.Footer className={currentTheme}>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
            <Button variant="primary" onClick={handleLoadToSandbox}>
              Load to Sandbox
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      <style dangerouslySetInnerHTML={{
        __html: `
          .gallery-item:hover .gallery-overlay {
            opacity: 1;
          }

          .gallery-preview-container {
            position: relative;
          }

          .gallery-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.3s ease;
            border-radius: 0.375rem 0.375rem 0 0;
          }

          .play-icon {
            color: white;
            font-size: 2rem;
            filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
          }

          .hover-lift:hover {
            transform: translateY(-2px);
            transition: transform 0.2s ease;
          }

          .theme-aware-card {
            transition: all 0.2s ease;
            background: var(--app-bg-primary) !important;
            border: 1px solid var(--app-border) !important;
            color: var(--app-text-primary) !important;
          }

          /* Ensure popovers appear above modal */
          .modal-backdrop {
            z-index: 1040 !important;
          }

          .modal {
            z-index: 1045 !important;
          }

          .popover {
            z-index: 1050 !important;
          }

          .tooltip {
            z-index: 1050 !important;
          }

          /* Also target any popover-like elements */
          [role="tooltip"], [data-bs-toggle="popover"] {
            z-index: 1050 !important;
          }

          /* Target any element that might be a popover */
          .popover, .tooltip, .dropdown-menu {
            z-index: 1050 !important;
          }
        `
      }} />
  </section>
);
};