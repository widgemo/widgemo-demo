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

// Description overrides applied to catalog cards (replaces source descriptions for these IDs)
const DESCRIPTION_OVERRIDES: Record<string, string> = {
  'rich-cells-table': 'Images, formatted values, and badges in a rich table layout. A realistic starting point for any people or resource directory.',
  'basic-grid-layout': 'Responsive card grid driven entirely by field config. Switch from table to grid with one property change.',
  'per-item-actions-demo': 'Pinned, hover, and menu actions per row — configured declaratively, no custom render logic required.',
  'board-basic': "Kanban columns that emerge automatically from your data's status field. No column definitions, no drag-drop boilerplate.",
  'chart-throughput-mixed': 'Mixed series chart — bars, area, and line — from the same data and field schema as your table. One component, zero charting setup.',
  'responsive-mode-switching': 'Table on desktop, grid on tablet, carousel on mobile. Resize the window and watch Widgemo switch modes automatically.',
  'zone-dynamic-renderers': 'The zone header title and subtitle can reflect live data — record counts, derived labels, or any computed string. No external state required.',
  'renderas-badge-advanced': 'Render any field as a badge with icon, color, size, and style controlled by config. Use a colorMap function for data-driven badge colors.',
  'currency-advanced': 'Currency fields with compact notation, positive/negative colorization, locale formatting, and decimal control — all from field config.',
  'image-advanced': 'Every image display option in one view: objectFit, circular crop, border, shadow, lightbox, and lazy loading. Combine freely per field.',
  'item-layout-grid': 'Full CSS grid control per item — define columns, gap, and template areas to position fields exactly where you need them.',
  'carousel-full': 'Every carousel config option in one example: item dimensions, indicators, arrows, infinite scroll, autoplay, and drag threshold.',
  'chart-allocation-donut': 'Donut chart mode for composition and proportion data. Configure series, labels, and legend from the same field schema as your table.',
  'content-loading-state-skeleton-pie-chart': 'Skeleton loading variant shaped like a pie chart. Use it when your chart data loads async and you want a visually appropriate placeholder.',
  'content-loading-state-spinner': 'Built-in loading spinner state — animated, visually distinct from skeleton placeholders. Triggered by a single status prop.',
  'content-error-state': 'Error state with warning severity and a centered retry action. Configure message, severity, and retry behavior without custom error components.',
  'search-with-pagination': 'Search filters the full dataset first, then pagination slices the results. Page resets automatically on each new query — no wiring required.',
};

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

  const coreExamples = useMemo(() => {
    return widgemoExamples
      .filter((item) => coreExampleSet.has(item.id))
      .map((item) => ({
        ...item,
        description: DESCRIPTION_OVERRIDES[item.id] ?? item.description,
      }));
  }, [coreExampleSet]);

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
    <Container fluid className="pt-5 pb-4" style={{ maxWidth: '1500px' }}>
      <div className="mb-4">
        <h1 style={{ fontSize: '1.85rem', fontWeight: 700, marginBottom: '0.4rem' }}>Examples</h1>
        <p className="text-muted mb-0" style={{ fontSize: '0.95rem' }}>
          Real Widgemo configs, ready to explore. Open any example in the Sandbox to edit it live.
        </p>
      </div>

      <section>
        <div className="d-flex justify-content-end mb-3">
          <div style={{ minWidth: '340px', maxWidth: '540px', width: '100%' }}>
            <p className="text-muted mb-2" style={{ fontSize: '0.85rem' }}>
              Filter by capability, or search by name. Each card opens a live Sandbox.
            </p>
            <div className="d-flex gap-2">
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
