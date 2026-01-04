import React, { useState, useMemo } from 'react';
import { Row, Col, Card, Modal, Button, Dropdown, Badge } from 'react-bootstrap';
import Slider from 'react-slick';
import { FaPlay, FaFilter, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Widgemo } from 'widgemo-core';
import type { WidgemoConfig, WidgemoAdapters } from 'widgemo-core';
import { galleryConfigs, mockAdapters } from '../data/sampleData';
import { mergeThemeIntoConfig, getThemeBackgroundColor } from '../utils/themeUtils';
import { DemoSection } from './DemoSection';
import type { SampleData } from '../data/sampleData';

// Import slick carousel CSS
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface GallerySectionProps {
  onLoadToSandbox: (config: WidgemoConfig, data?: SampleData[]) => void;
  currentTheme: string;
}

interface GalleryItem {
  config: WidgemoConfig;
  name: string;
  description: string;
  data?: SampleData[];
  theme?: string;
  mode: string;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ onLoadToSandbox, currentTheme }) => {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modeFilter, setModeFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'carousel'>('grid');

  // Get unique modes for filter dropdown
  const availableModes = useMemo(() => {
    const modes = Array.from(new Set(galleryConfigs.map(item => item.mode)));
    return modes.sort();
  }, []);

  // Filter items based on selected mode
  const filteredItems = useMemo(() => {
    if (modeFilter === 'all') return galleryConfigs;
    return galleryConfigs.filter(item => item.mode === modeFilter);
  }, [modeFilter]);

  const handleItemClick = (item: GalleryItem) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleLoadToSandbox = () => {
    if (selectedItem) {
      onLoadToSandbox(selectedItem.config, selectedItem.data);
      setShowModal(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedItem(null);
  };

  const CustomArrow = ({ direction, onClick }: { direction: 'next' | 'prev'; onClick?: () => void }) => (
    <button
      className={`slick-arrow slick-${direction}`}
      onClick={onClick}
      style={{
        background: 'rgba(0,0,0,0.5)',
        border: 'none',
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        zIndex: 1,
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        right: direction === 'next' ? '-20px' : 'auto',
        left: direction === 'prev' ? '-20px' : 'auto',
      }}
    >
      {direction === 'next' ? <FaChevronRight /> : <FaChevronLeft />}
    </button>
  );

  // Carousel settings
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ],
    nextArrow: <CustomArrow direction="next" />,
    prevArrow: <CustomArrow direction="prev" />,
  };

  const renderGalleryItem = (item: GalleryItem, index: number) => {
    // Create dynamic adapters for items with custom data
    const itemAdapters: WidgemoAdapters = item.data ? {
      ...mockAdapters,
      fetchData: async () => ({
        data: item.data!,
        total: item.data!.length,
      }),
    } : mockAdapters;

    return (
      <Col xs={12} sm={6} lg={4} xl={3} key={index} className="mb-4">
        <Card
          className="h-100 shadow-sm hover-lift theme-aware-card gallery-item"
          style={{ cursor: 'pointer', minHeight: '280px' }}
          onClick={() => handleItemClick(item)}
        >
          <div className="gallery-preview-container" style={{
            height: '180px',
            overflow: 'hidden',
            position: 'relative',
            backgroundColor: getThemeBackgroundColor(item.theme || currentTheme),
            borderRadius: '0.375rem 0.375rem 0 0'
          }}>
            <div style={{
              transform: 'scale(0.5)',
              transformOrigin: 'top left',
              width: '200%',
              height: '200%',
              pointerEvents: 'none'
            }}>
              <Widgemo
                config={mergeThemeIntoConfig(item.config, item.theme || currentTheme)}
                adapters={itemAdapters}
                showConfigDetails={false}
                baseColor={getThemeBackgroundColor(item.theme || currentTheme)}
              />
            </div>
            <div className="gallery-overlay">
              <FaPlay className="play-icon" />
            </div>
          </div>
          <Card.Body className="d-flex flex-column p-3">
            <div className="d-flex justify-content-between align-items-start mb-2">
              <Card.Title className="h6 mb-0 flex-grow-1">{item.name}</Card.Title>
              <Badge bg="secondary" className="ms-2 text-capitalize">
                {item.mode}
              </Badge>
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
    <DemoSection
      id="gallery"
      title="Gallery"
      subtitle="Explore different configurations and modes"
      className="bg-light"
    >
      {/* Controls */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex gap-2">
          <Dropdown>
            <Dropdown.Toggle variant="outline-secondary" size="sm">
              <FaFilter className="me-2" />
              Mode: {modeFilter === 'all' ? 'All' : modeFilter.charAt(0).toUpperCase() + modeFilter.slice(1)}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setModeFilter('all')}>
                All Modes
              </Dropdown.Item>
              {availableModes.map(mode => (
                <Dropdown.Item
                  key={mode}
                  onClick={() => setModeFilter(mode)}
                  className="text-capitalize"
                >
                  {mode}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <div className="d-flex gap-2">
          <Button
            variant={viewMode === 'grid' ? 'primary' : 'outline-primary'}
            size="sm"
            onClick={() => setViewMode('grid')}
          >
            Grid
          </Button>
          <Button
            variant={viewMode === 'carousel' ? 'primary' : 'outline-primary'}
            size="sm"
            onClick={() => setViewMode('carousel')}
          >
            Carousel
          </Button>
        </div>
      </div>

      {/* Gallery Content */}
      {viewMode === 'grid' ? (
        <Row className="g-3">
          {filteredItems.map((item, index) => renderGalleryItem(item, index))}
        </Row>
      ) : (
        <div className="carousel-container">
          <Slider {...carouselSettings}>
            {filteredItems.map((item, index) => {
              // Create dynamic adapters for items with custom data
              const itemAdapters: WidgemoAdapters = item.data ? {
                ...mockAdapters,
                fetchData: async () => ({
                  data: item.data!,
                  total: item.data!.length,
                }),
              } : mockAdapters;

              return (
                <div key={index} className="px-2">
                  <Card
                    className="h-100 shadow-sm hover-lift theme-aware-card gallery-item"
                    style={{ cursor: 'pointer', minHeight: '280px' }}
                    onClick={() => handleItemClick(item)}
                  >
                    <div className="gallery-preview-container" style={{
                      height: '180px',
                      overflow: 'hidden',
                      position: 'relative',
                      backgroundColor: getThemeBackgroundColor(item.theme || currentTheme),
                      borderRadius: '0.375rem 0.375rem 0 0'
                    }}>
                      <div style={{
                        transform: 'scale(0.5)',
                        transformOrigin: 'top left',
                        width: '200%',
                        height: '200%',
                        pointerEvents: 'none'
                      }}>
                        <Widgemo
                          config={mergeThemeIntoConfig(item.config, item.theme || currentTheme)}
                          adapters={itemAdapters}
                          showConfigDetails={false}
                          baseColor={getThemeBackgroundColor(item.theme || currentTheme)}
                        />
                      </div>
                      <div className="gallery-overlay">
                        <FaPlay className="play-icon" />
                      </div>
                    </div>
                    <Card.Body className="d-flex flex-column p-3">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <Card.Title className="h6 mb-0 flex-grow-1">{item.name}</Card.Title>
                        <Badge bg="secondary" className="ms-2 text-capitalize">
                          {item.mode}
                        </Badge>
                      </div>
                      <Card.Text className="text-muted small flex-grow-1">
                        {item.description}
                      </Card.Text>
                      <div className="mt-auto">
                        <small className="text-muted">Click to preview</small>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              );
            })}
          </Slider>
        </div>
      )}

      {/* Preview Modal */}
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        size="xl"
        centered
        className="gallery-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedItem?.name}
            {selectedItem && (
              <Badge bg="secondary" className="ms-2 text-capitalize">
                {selectedItem.mode}
              </Badge>
            )}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ minHeight: '500px' }}>
          {selectedItem && (() => {
            // Create dynamic adapters for the selected item
            const selectedItemAdapters: WidgemoAdapters = selectedItem.data ? {
              ...mockAdapters,
              fetchData: async () => ({
                data: selectedItem.data!,
                total: selectedItem.data!.length,
              }),
            } : mockAdapters;

            return (
              <Widgemo
                config={mergeThemeIntoConfig(selectedItem.config, selectedItem.theme || currentTheme)}
                adapters={selectedItemAdapters}
                showConfigDetails={true}
                baseColor={getThemeBackgroundColor(selectedItem.theme || currentTheme)}
              />
            );
          })()}
          {selectedItem && (
            <div className="mt-3">
              <p className="text-muted">{selectedItem.description}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleLoadToSandbox}>
            Load to Sandbox
          </Button>
        </Modal.Footer>
      </Modal>

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

          .carousel-container {
            margin: 0 -15px;
          }

          .slick-dots li button:before {
            color: #6c757d !important;
          }

          .slick-dots li.slick-active button:before {
            color: #0d6efd !important;
          }

          .hover-lift:hover {
            transform: translateY(-2px);
            transition: transform 0.2s ease;
          }

          .theme-aware-card {
            transition: all 0.2s ease;
          }

          .gallery-modal .modal-dialog {
            max-width: 95vw;
          }

          .gallery-modal .modal-body {
            padding: 1.5rem;
          }
        `
      }} />
    </DemoSection>
  );
};