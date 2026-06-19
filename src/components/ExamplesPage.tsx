import React, { useMemo, useState } from 'react';
import { Badge, Button, Card, Col, Container, Form, Modal, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Widgemo, WidgemoThemeProvider, type Entity, type WidgemoConfig } from '@widgemo/widgemo-core';
import widgemoExamples from '../data/widgemoExamples';
import { useTheme } from '../hooks/useTheme';

interface ExampleItem {
  id: string;
  title: string;
  description: string;
  data: Entity[];
  config: WidgemoConfig;
}

const FEATURED_IDS = [
  'rich-cells-table',
  'basic-grid-layout',
  'board-basic',
  'chart-throughput-mixed',
  'per-item-actions-demo',
  'zone-dynamic-renderers',
  'item-layout-grid',
  'content-loading-state-spinner',
] as const;

const CORE_EXAMPLE_IDS = [
  'rich-cells-table',
  'basic-grid-layout',
  'carousel-full',
  'board-basic',
  'chart-throughput-mixed',
  'chart-allocation-donut',
  'responsive-mode-switching',
  'per-item-actions-demo',
  'search-with-pagination',
  'zone-dynamic-renderers',
  'renderas-badge-advanced',
  'currency-advanced',
  'image-advanced',
  'item-layout-grid',
  'content-loading-state-skeleton-pie-chart',
  'content-loading-state-spinner',
  'content-error-state',
] as const;

const CATEGORY_BY_ID: Record<string, string> = {
  'rich-cells-table': 'Core Modes',
  'basic-grid-layout': 'Core Modes',
  'carousel-full': 'Core Modes',
  'board-basic': 'Core Modes',
  'responsive-mode-switching': 'Core Modes',
  'per-item-actions-demo': 'Interactions',
  'search-with-pagination': 'Interactions',
  'zone-dynamic-renderers': 'Data Presentation',
  'renderas-badge-advanced': 'Data Presentation',
  'currency-advanced': 'Data Presentation',
  'image-advanced': 'Data Presentation',
  'item-layout-grid': 'Layout',
  'chart-throughput-mixed': 'Core Modes',
  'chart-allocation-donut': 'Core Modes',
  'content-loading-state-spinner': 'States',
  'content-error-state': 'States',
};

const CATEGORIES = ['All', 'Core Modes', 'Interactions', 'Data Presentation', 'Layout', 'States'] as const;

export const ExamplesPage: React.FC = () => {
  const { currentTheme } = useTheme();
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>('All');
  const [selectedItem, setSelectedItem] = useState<ExampleItem | null>(null);
  const [showModal, setShowModal] = useState(false);

  const coreExampleSet = useMemo(() => new Set<string>(CORE_EXAMPLE_IDS), []);
  const featuredSet = useMemo(() => new Set(FEATURED_IDS), []);

  const coreExamples = useMemo(() => {
    return widgemoExamples.filter((item) => coreExampleSet.has(item.id));
  }, [coreExampleSet]);

  const featuredExamples = useMemo(() => {
    return coreExamples.filter((item) => featuredSet.has(item.id as (typeof FEATURED_IDS)[number]));
  }, [coreExamples, featuredSet]);

  const filteredCatalog = useMemo(() => {
    const query = search.trim().toLowerCase();

    return coreExamples.filter((item) => {
      const inferredCategory = CATEGORY_BY_ID[item.id] ?? 'States';
      const matchesCategory = category === 'All' || inferredCategory === category;
      const matchesSearch =
        query.length === 0 ||
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.id.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [category, coreExamples, search]);

  const openPreview = (item: ExampleItem) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const closePreview = () => {
    setShowModal(false);
    setSelectedItem(null);
  };

  const handleTryInSandbox = (id: string) => {
    navigate(`/sandbox?config=${id}`);
  };

  const renderCard = (item: ExampleItem) => {
    const itemCategory = CATEGORY_BY_ID[item.id] ?? 'States';

    return (
      <Col xs={12} md={6} xl={4} key={item.id}>
        <Card className="h-100 shadow-sm theme-aware-card" style={{ minHeight: '290px' }}>
          <div
            style={{
              height: '150px',
              overflow: 'hidden',
              borderRadius: '0.375rem 0.375rem 0 0',
              backgroundColor: 'transparent',
            }}
          >
            <div
              style={{
                transform: 'scale(0.5)',
                transformOrigin: 'top left',
                width: '200%',
                height: '200%',
                pointerEvents: 'none',
              }}
            >
              <WidgemoThemeProvider theme={currentTheme}>
                <Widgemo data={item.data} config={item.config} className="my-custom-widgemo" />
              </WidgemoThemeProvider>
            </div>
          </div>
          <Card.Body className="d-flex flex-column">
            <div className="d-flex justify-content-between align-items-start mb-2">
              <Card.Title style={{ fontSize: '0.95rem', marginBottom: 0 }}>{item.title}</Card.Title>
            </div>
            <div className="mb-2">
              <Badge bg="secondary" style={{ fontSize: '0.65rem' }}>{itemCategory}</Badge>
            </div>
            <Card.Text className="text-muted" style={{ fontSize: '0.82rem' }}>
              {item.description}
            </Card.Text>
            <div className="mt-auto d-flex gap-2">
              <Button size="sm" variant="outline-secondary" onClick={() => openPreview(item)}>
                Preview
              </Button>
              <Button size="sm" variant="primary" onClick={() => handleTryInSandbox(item.id)}>
                Try in Sandbox
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Col>
    );
  };

  return (
    <Container fluid className="py-4" style={{ maxWidth: '1500px' }}>
      <div className="mb-4">
        <h1 style={{ fontSize: '1.85rem', fontWeight: 700, marginBottom: '0.4rem' }}>Examples</h1>
        <p className="text-muted mb-0" style={{ fontSize: '0.95rem' }}>
          Core Widgemo capabilities only. This catalog is intentionally curated to 17 examples.
        </p>
        <p className="text-muted mb-0" style={{ fontSize: '0.85rem' }}>
          Custom mode showcases (including timeline) are intentionally kept in Applications.
        </p>
      </div>

      <section className="mb-5">
        <h2 style={{ fontSize: '1.2rem', fontWeight: 600 }} className="mb-3">Featured Examples</h2>
        <Row className="g-3">
          {featuredExamples.map(renderCard)}
        </Row>
      </section>

      <section>
        <div className="d-flex flex-wrap align-items-center justify-content-between mb-3 gap-2">
          <h2 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: 0 }}>Core Catalog</h2>
          <div className="d-flex gap-2" style={{ minWidth: '340px', maxWidth: '540px', width: '100%' }}>
            <Form.Control
              size="sm"
              value={search}
              placeholder="Search examples..."
              onChange={(event) => setSearch(event.target.value)}
            />
            <Form.Select
              size="sm"
              value={category}
              onChange={(event) => setCategory(event.target.value as (typeof CATEGORIES)[number])}
              style={{ maxWidth: '180px' }}
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </Form.Select>
          </div>
        </div>

        <Row className="g-3">
          {filteredCatalog.map(renderCard)}
        </Row>
      </section>

      {selectedItem && (
        <Modal show={showModal} onHide={closePreview} size="xl" centered>
          <Modal.Header closeButton>
            <Modal.Title>{selectedItem.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <WidgemoThemeProvider theme={currentTheme}>
              <Widgemo data={selectedItem.data} config={selectedItem.config} className="my-custom-widgemo" />
            </WidgemoThemeProvider>
            <p className="mt-3 mb-0">{selectedItem.description}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closePreview}>Close</Button>
            <Button variant="primary" onClick={() => handleTryInSandbox(selectedItem.id)}>Try in Sandbox</Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );
};
