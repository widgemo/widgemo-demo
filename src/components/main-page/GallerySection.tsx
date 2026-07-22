import React, { useEffect, useState, useMemo } from 'react';
import { Row, Col, Card, Modal, Button, Badge } from 'react-bootstrap';
import { FaPlay } from 'react-icons/fa';
import { Widgemo, WidgemoThemeProvider, type Entity, type WidgemoConfig } from '@widgemo/widgemo-core';
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

const FEATURED_EXAMPLE_IDS = [
  'rich-cells-table',
  'basic-grid-layout',
  'board-basic',
  'chart-throughput-mixed',
  'responsive-mode-switching',
  'per-item-actions-demo',
] as const;

const FEATURED_DESCRIPTION_BY_ID: Record<string, string> = {
  'rich-cells-table': 'Images, formatted values, and badges in a rich table layout. A realistic starting point for any people or resource directory.',
  'basic-grid-layout': 'Responsive card grid driven entirely by field config. Switch from table to grid with one property change.',
  'per-item-actions-demo': 'Pinned, hover, and menu actions per row — configured declaratively, no custom render logic required.',
  'board-basic': "Kanban columns that emerge automatically from your data's status field. No column definitions, no drag-drop boilerplate.",
  'chart-throughput-mixed': 'Mixed series chart — bars, area, and line — from the same data and field schema as your table. One component, zero charting setup.',
  'responsive-mode-switching': 'Table on desktop, grid on tablet, carousel on mobile. Resize the window and watch Widgemo switch modes automatically.',
};

const FEATURED_CATEGORY_BY_ID: Record<string, string> = {
  'rich-cells-table': 'Core Modes',
  'basic-grid-layout': 'Core Modes',
  'board-basic': 'Core Modes',
  'chart-throughput-mixed': 'Core Modes',
  'responsive-mode-switching': 'Core Modes',
  'per-item-actions-demo': 'Interactions',
};

export const GallerySection: React.FC<GallerySectionProps> = ({ onLoadToSandbox, currentTheme }) => {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (typeof document === 'undefined' || !showModal) return;

    const rootStyle = document.documentElement.style;
    const previousValue = rootStyle.getPropertyValue('--widgemo-dropdown-z-index');
    rootStyle.setProperty('--widgemo-dropdown-z-index', '1080');

    return () => {
      if (previousValue) {
        rootStyle.setProperty('--widgemo-dropdown-z-index', previousValue);
      } else {
        rootStyle.removeProperty('--widgemo-dropdown-z-index');
      }
    };
  }, [showModal]);

  // Public homepage should show a curated examples preview, not the entire catalog.
  const filteredItems = useMemo(() => {
    const featuredIdSet = new Set<string>(FEATURED_EXAMPLE_IDS);
    return widgemoExamples
      .filter((item) => featuredIdSet.has(item.id))
      .map((item) => ({
        ...item,
        description: FEATURED_DESCRIPTION_BY_ID[item.id] ?? item.description,
      }));
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
    return (
      <Col xs={12} sm={6} md={6} lg={4} xl={3} xxl={3} key={index} className="mb-3" style={{ minWidth: '260px', maxWidth: '400px' }}>
        <Card
          className="h-100 shadow-sm hover-lift theme-aware-card gallery-item"
          style={{ cursor: 'pointer', minHeight: '240px' }}
          onClick={() => handleItemClick(item)}
        >
          <div className="gallery-preview-container" style={{
            height: '160px',
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
          <Card.Body className="d-flex flex-column p-2">
            <div className="d-flex justify-content-between align-items-start mb-1">
              <Card.Title className="mb-0 flex-grow-1" style={{ fontSize: '0.8125rem', fontWeight: 600 }}>{item.title}</Card.Title>
            </div>
            <div className="mb-2">
              <Badge bg="secondary" style={{ fontSize: '0.65rem' }}>
                {FEATURED_CATEGORY_BY_ID[item.id] ?? 'Examples'}
              </Badge>
            </div>
            <Card.Text className="text-muted flex-grow-1" style={{ fontSize: '0.75rem' }}>
              {item.description}
            </Card.Text>
            <div className="mt-auto">
              <small className="text-muted" style={{ fontSize: '0.6875rem' }}>Click to preview</small>
            </div>
          </Card.Body>
        </Card>
      </Col>
    );
  };

  return (
    <section id="examples-preview" className="section-block theme-aware-section">
      <div className="px-4">
        <div className="section-header">
          <h2 className="section-title theme-aware-text">Examples Preview</h2>
          <p className="section-subtitle theme-aware-text">A tightly curated, core-only preview focused on the most important Widgemo capabilities.</p>
        </div>

      {/* Gallery Content */}
      <Row className="g-3">
        {filteredItems.map((item, index) => renderGalleryItem(item, index))}
      </Row>
      </div>

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
              Try in Sandbox
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