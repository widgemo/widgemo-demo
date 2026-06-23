import React, { useMemo, useState, useEffect } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { Widgemo, type FieldConfig, type WidgemoConfig } from '@widgemo/widgemo-core';
import { FaCogs, FaLayerGroup, FaPlug } from 'react-icons/fa';
import { teaserSampleData } from '../../data/sampleData';

interface AnatomySectionProps {
  currentTheme?: string;
}

const baseFields: FieldConfig[] = [
  { key: 'name', label: 'Name', type: 'text' },
  { key: 'role', label: 'Role', type: 'text' },
  { key: 'status', label: 'Status', type: 'text', renderAs: 'badge' },
];

// Shortened dataset — 3 records showing the shape (name, role, status used by table/grid/board;
// progress + rating used by chart)
const DATA_SNIPPET = `[
  { name: "Alice Johnson", role: "Manager",
    status: "active",   progress: 85, rating: 4.5 },
  { name: "Bob Smith",    role: "Developer",
    status: "active",   progress: 92, rating: 4.8 },
  { name: "Carol Williams", role: "Designer",
    status: "inactive", progress: 45, rating: 3.9 },
  // ...
]`;

// True config delta per mode — only the properties that differ from the others
const CONFIG_DELTA: Record<'table' | 'grid' | 'board' | 'chart', string> = {
  table: `{
  mode: "table"
}`,
  grid: `{
  mode: "grid",
  modeConfig: {
    grid: { maxColumns: 2, gap: "0.6rem" }
  }
}`,
  board: `{
  mode: "board",
  modeConfig: {
    board: {
      columns: { field: "status" },
      dragEnabled: false
    }
  }
}`,
  chart: `{
  mode: "chart",
  modeConfig: {
    chart: {
      xAxis: "name",
      series: [
        { type: "bar", key: "progress" },
        { type: "line", key: "rating" }
      ]
    }
  },
  // item.fields also switches to numeric keys
  // (name, progress, rating) for chart axes
}`,
};

const codeBlockBase: React.CSSProperties = {
  background: 'var(--app-code-bg, rgba(0, 0, 0, 0.06))',
  borderRadius: '6px',
  padding: '0.75rem',
  margin: 0,
  fontSize: '0.72rem',
  lineHeight: 1.6,
  fontFamily: "'JetBrains Mono', 'Fira Code', Consolas, monospace",
  overflowX: 'auto' as const,
  color: 'var(--app-text-primary)',
  whiteSpace: 'pre' as const,
};

const snippetLabelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '0.68rem',
  fontFamily: 'monospace',
  color: 'var(--app-text-muted, #64748b)',
  marginBottom: '0.35rem',
  letterSpacing: '0.06em',
  textTransform: 'uppercase' as const,
  opacity: 0.75,
};

export const AnatomySection: React.FC<AnatomySectionProps> = () => {
  const [activeMode, setActiveMode] = useState<'table' | 'grid' | 'board' | 'chart'>('table');
  const [deltaVisible, setDeltaVisible] = useState(true);
  const sampleData = useMemo(() => teaserSampleData.slice(0, 4), []);

  // Fade the config delta panel out briefly then back in on mode change
  useEffect(() => {
    setDeltaVisible(false);
    const t = setTimeout(() => setDeltaVisible(true), 30);
    return () => clearTimeout(t);
  }, [activeMode]);

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

  const chartConfig: WidgemoConfig = {
    zones: {
      content: {
        mode: 'chart',
        modeConfig: {
          chart: {
            xAxis: 'name',
            series: [
              { type: 'bar', key: 'progress', label: 'Progress' },
              { type: 'line', key: 'rating', label: 'Rating', showDots: true },
            ],
            height: 220,
            showGrid: true,
            showLegend: true,
            legendAlign: 'center',
          },
        },
        item: {
          fields: [
            { key: 'name', label: 'Name', type: 'text' },
            { key: 'progress', label: 'Progress', type: 'number' },
            { key: 'rating', label: 'Rating', type: 'number' },
          ],
          layout: { type: 'auto' },
        },
      },
    },
  };

  const activeConfig =
    activeMode === 'table'
      ? tableConfig
      : activeMode === 'grid'
        ? gridConfig
        : activeMode === 'board'
          ? boardConfig
          : chartConfig;

  return (
    <section id="anatomy" className="section-block theme-aware-section">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">

        {/* 1. Section heading */}
        <div className="section-header">
          <h2 className="section-title theme-aware-text">Same Data. Any Mode.</h2>
          <p className="section-subtitle theme-aware-text">
            Click a mode to see how a single config property changes everything.
          </p>
        </div>

        {/* Demo unit — buttons + snippet row + live preview wrapped together */}
        <Card className="shadow-sm theme-aware-card mb-4">
          <Card.Body className="p-3 p-md-4">

            {/* 2. Mode buttons */}
            <div className="d-flex flex-wrap justify-content-center gap-2 mb-4">
              {(['table', 'grid', 'board', 'chart'] as const).map((mode) => {
                const label = mode.charAt(0).toUpperCase() + mode.slice(1);
                const isActive = activeMode === mode;
                return (
                  <Button
                    key={mode}
                    type="button"
                    onClick={() => setActiveMode(mode)}
                    variant={isActive ? 'primary' : 'outline-secondary'}
                    className="rounded-pill px-3 py-1 fw-semibold"
                    style={
                      isActive
                        ? { backgroundColor: '#5f4b8b', borderColor: '#5f4b8b' }
                        : {
                            borderColor: 'var(--app-border, #cbd5e1)',
                            color: 'var(--app-text-muted, #64748b)',
                            fontWeight: 500,
                          }
                    }
                  >
                    {label}
                  </Button>
                );
              })}
            </div>

            {/* 3. Two-panel snippet row: fixed data (left) + changing config delta (right) */}
            <Row className="g-3 mb-3 align-items-start">
              {/* Left — "your data" — never changes */}
              <Col xs={12} md={5}>
                <span style={snippetLabelStyle}>your data</span>
                <pre
                  style={{
                    ...codeBlockBase,
                    border: '1px solid var(--app-border, #dee2e6)',
                    opacity: 0.72,
                  }}
                >
                  <code>{DATA_SNIPPET}</code>
                </pre>
              </Col>

              {/* Right — "config change" — updates on every mode switch */}
              <Col xs={12} md={7}>
                <span style={snippetLabelStyle}>config change</span>
                <div
                  style={{
                    opacity: deltaVisible ? 1 : 0,
                    transition: 'opacity 0.15s ease',
                  }}
                >
                  <pre
                    style={{
                      ...codeBlockBase,
                      border: '1px solid var(--app-border, #dee2e6)',
                      borderLeft: '3px solid #5f4b8b',
                    }}
                  >
                    <code>{CONFIG_DELTA[activeMode]}</code>
                  </pre>
                </div>
              </Col>
            </Row>

            {/* 4. Live Widgemo preview — full card width, read-only */}
            <div
              style={{
                minHeight: '320px',
                maxHeight: '320px',
                overflow: 'hidden',
                borderRadius: '8px',
                border: '1px solid var(--app-border, #dee2e6)',
                background: 'var(--app-bg-primary)',
                padding: '0.25rem',
              }}
            >
              <div style={{ pointerEvents: 'none' }}>
                <Widgemo data={sampleData} config={activeConfig} className="my-custom-widgemo" />
              </div>
            </div>

            {/* 5. Caption + built-with callout */}
            <p className="text-center text-muted mb-0 mt-2" style={{ fontSize: '0.86rem' }}>
              The same data. The same component. Four completely different UIs — no extra code.
            </p>

          </Card.Body>
        </Card>

        <div className="section-header mt-4">
          <h2 className="section-title theme-aware-text">Why Widgemo Is Different</h2>
        </div>

        <Row className="g-4">
          <Col xs={12} md={6} lg={4}>
            <Card className="h-100 shadow-sm theme-aware-card">
              <Card.Body className="p-3 p-md-4">
                <div className="mb-3" aria-hidden="true">
                  <FaCogs style={{ fontSize: '2rem', color: '#5f4b8b' }} />
                </div>
                <h3 className="mb-2" style={{ fontSize: '1rem', fontWeight: 700 }}>Config-Driven</h3>
                <p className="text-muted mb-0" style={{ fontSize: '0.87rem', lineHeight: 1.5 }}>
                  One prop controls the entire UI mode. Switch from table to board to chart without touching your components.
                </p>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} md={6} lg={4}>
            <Card className="h-100 shadow-sm theme-aware-card">
              <Card.Body className="p-3 p-md-4">
                <div className="mb-3" aria-hidden="true">
                  <FaLayerGroup style={{ fontSize: '2rem', color: '#5f4b8b' }} />
                </div>
                <h3 className="mb-2" style={{ fontSize: '1rem', fontWeight: 700 }}>Composable</h3>
                <p className="text-muted mb-0" style={{ fontSize: '0.87rem', lineHeight: 1.5 }}>
                  Multiple Widgemo instances share filters, state, and interactions. Build dashboards, not widgets.
                </p>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} md={6} lg={4}>
            <Card className="h-100 shadow-sm theme-aware-card">
              <Card.Body className="p-3 p-md-4">
                <div className="mb-3" aria-hidden="true">
                  <FaPlug style={{ fontSize: '2rem', color: '#5f4b8b' }} />
                </div>
                <h3 className="mb-2" style={{ fontSize: '1rem', fontWeight: 700 }}>Extensible</h3>
                <p className="text-muted mb-0" style={{ fontSize: '0.87rem', lineHeight: 1.5 }}>
                  Drop in custom renderers, field types, and modes exactly where your product needs them. Nothing is locked.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

      </div>
    </section>
  );
};
