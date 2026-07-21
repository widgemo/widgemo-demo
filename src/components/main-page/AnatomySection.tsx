import React, { useMemo, useState, useEffect } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { Widgemo, type FieldConfig, type WidgemoConfig } from '@widgemo/widgemo-core';
import { FaCogs, FaLayerGroup, FaPlug, FaChevronDown } from 'react-icons/fa';
import {
  getLiquiditySnapshotPreviewData,
  liquiditySnapshotSummaryConfig,
} from '../../config/liquiditySnapshotPreview';
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
  const [activePanel, setActivePanel] = useState<'config-driven' | 'composable' | 'extensible' | null>(null);
  const sampleData = useMemo(() => teaserSampleData.slice(0, 4), []);
  const liquiditySnapshotData = useMemo(() => getLiquiditySnapshotPreviewData(), []);

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

  const configDrivenSnippet = `// Switch the mode. That's it.
const config = {
  zones: {
    content: {
      mode: "table"   // change to "board", "grid", or "chart"
    }
  }
}`;

  const extensibleSnippet = `// Custom renderer — drop in anywhere
const renderAs = (value, item) => (
  <span style={{
    background: value > 80 ? '#22c55e' : '#f59e0b',
    color: 'white',
    padding: '2px 8px',
    borderRadius: '999px',
    fontSize: '0.75rem',
  }}>
    {value}%
  </span>
)

// Wire it to any field
{
  key: 'progress',
  label: 'Progress',
  renderAs: renderAs
}`;

  const ConfigDrivenPanel = () => (
    <Row className="g-4 align-items-start">
      <Col xs={12} md={6}>
        <span style={snippetLabelStyle}>config snippet</span>
        <pre
          style={{
            ...codeBlockBase,
            border: '1px solid var(--app-border, #dee2e6)',
          }}
        >
          <code>{configDrivenSnippet}</code>
        </pre>
      </Col>
      <Col xs={12} md={6}>
        <div className="mb-2" style={{ fontSize: '0.72rem', color: 'var(--app-text-muted, #64748b)', fontFamily: 'monospace' }}>
          mode: table
        </div>
        <div
          style={{
            height: '174px',
            overflow: 'hidden',
            borderRadius: '8px',
            border: '1px solid var(--app-border, #dee2e6)',
            background: 'var(--app-bg-primary)',
            marginBottom: '0.75rem',
          }}
        >
          <div style={{ transform: 'scale(0.75)', transformOrigin: 'top left', width: '133.333%', pointerEvents: 'none' }}>
            <Widgemo data={sampleData} config={tableConfig} className="my-custom-widgemo" />
          </div>
        </div>

        <div className="mb-2" style={{ fontSize: '0.72rem', color: 'var(--app-text-muted, #64748b)', fontFamily: 'monospace' }}>
          mode: board
        </div>
        <div
          style={{
            height: '174px',
            overflow: 'hidden',
            borderRadius: '8px',
            border: '1px solid var(--app-border, #dee2e6)',
            background: 'var(--app-bg-primary)',
          }}
        >
          <div style={{ transform: 'scale(0.75)', transformOrigin: 'top left', width: '133.333%', pointerEvents: 'none' }}>
            <Widgemo data={sampleData} config={boardConfig} className="my-custom-widgemo" />
          </div>
        </div>

        <p className="mb-0 mt-2" style={{ fontSize: '0.82rem', color: 'var(--app-text-muted, #64748b)' }}>
          Same data. Same config shape. One property changed.
        </p>
      </Col>
    </Row>
  );

  const ComposablePanel = () => (
    <Row className="g-4 align-items-start">
      <Col xs={12} md={6}>
        <h4 style={{ fontSize: '0.96rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.5rem' }}>
          Multiple instances. One cohesive UI.
        </h4>
        <p style={{ fontSize: '0.84rem', color: 'rgba(255, 255, 255, 0.78)', marginBottom: '1rem' }}>
          Drop several Widgemo instances onto the same page. Wire them to shared state for filters, selections, or time ranges. Each instance renders independently — but they behave as one.
        </p>

        <div
          style={{
            border: '1px solid rgba(95, 75, 139, 0.35)',
            borderRadius: '10px',
            padding: '0.85rem',
            background: 'rgba(19, 16, 28, 0.72)',
          }}
        >
          <div className="d-flex justify-content-between gap-2">
            {['Table', 'Chart', 'Board'].map((label) => (
              <div
                key={label}
                style={{
                  flex: 1,
                  borderRadius: '8px',
                  border: '1px solid rgba(148, 163, 184, 0.45)',
                  padding: '0.45rem 0.35rem',
                  textAlign: 'center',
                  fontSize: '0.72rem',
                  color: '#ffffff',
                  fontFamily: "'JetBrains Mono', 'Fira Code', Consolas, monospace",
                  background: 'rgba(30, 27, 45, 0.82)',
                }}
              >
                {label}
              </div>
            ))}
          </div>

          <div className="d-flex justify-content-around mt-1 mb-1">
            {[0, 1, 2].map((index) => (
              <div key={index} style={{ height: '14px', borderLeft: '1px solid #5f4b8b' }} />
            ))}
          </div>

          <div className="d-flex justify-content-center mb-1">
            <div style={{ width: '1px', height: '12px', backgroundColor: '#5f4b8b' }} />
          </div>

          <div
            style={{
              borderRadius: '8px',
              padding: '0.5rem 0.55rem',
              textAlign: 'center',
              fontSize: '0.72rem',
              color: '#ffffff',
              fontFamily: "'JetBrains Mono', 'Fira Code', Consolas, monospace",
              background: 'rgba(95, 75, 139, 0.2)',
              border: '1px solid rgba(95, 75, 139, 0.55)',
            }}
          >
            Shared Filter State
          </div>
        </div>
      </Col>

      <Col xs={12} md={6}>
        <div
          style={{
            maxHeight: '380px',
            overflow: 'hidden',
            borderRadius: '8px',
            border: '1px solid var(--app-border, #dee2e6)',
            background: 'var(--app-bg-primary)',
          }}
        >
          <div style={{ pointerEvents: 'none' }}>
            <Widgemo data={liquiditySnapshotData} config={liquiditySnapshotSummaryConfig} className="my-custom-widgemo" />
          </div>
        </div>
        <p className="mb-0 mt-2" style={{ fontSize: '0.82rem', color: 'var(--app-text-muted, #64748b)' }}>
          This is a live Widgemo instance — the same one used in the Finance Tracker demo.
        </p>
      </Col>
    </Row>
  );

  const ExtensiblePanel = () => {
    const extensibleDemoConfig: WidgemoConfig = {
      zones: {
        content: {
          mode: 'table',
          item: {
            fields: baseFields.map((field) => {
              if (field.key !== 'status') {
                return field;
              }

              return {
                ...field,
                renderAs: 'badge',
                renderAsOptions: {
                  colorMap: {
                    active: { background: '#22c55e', text: '#ffffff' },
                    pending: { background: '#f59e0b', text: '#ffffff' },
                    inactive: { background: '#64748b', text: '#ffffff' },
                  },
                  size: 'sm',
                },
              };
            }),
            layout: { type: 'auto' },
          },
        },
      },
    };

    return (
      <Row className="g-4 align-items-start">
        <Col xs={12} md={6}>
          <span style={snippetLabelStyle}>custom render snippet</span>
          <pre
            style={{
              ...codeBlockBase,
              border: '1px solid var(--app-border, #dee2e6)',
            }}
          >
            <code>{extensibleSnippet}</code>
          </pre>
        </Col>
        <Col xs={12} md={6}>
          <div
            style={{
              maxHeight: '360px',
              overflow: 'hidden',
              borderRadius: '8px',
              border: '1px solid var(--app-border, #dee2e6)',
              background: 'var(--app-bg-primary)',
            }}
          >
            <div style={{ pointerEvents: 'none' }}>
              <Widgemo data={sampleData} config={extensibleDemoConfig} className="my-custom-widgemo" />
            </div>
          </div>
          <p className="mb-0 mt-2" style={{ fontSize: '0.82rem', color: 'var(--app-text-muted, #64748b)' }}>
            The status field now renders as a custom badge — no changes to the component, only to the field config.
          </p>
        </Col>
      </Row>
    );
  };

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
            <Card
              className="h-100 shadow-sm theme-aware-card"
              onClick={() => setActivePanel(activePanel === 'config-driven' ? null : 'config-driven')}
              style={
                activePanel === 'config-driven'
                  ? { borderColor: '#5f4b8b', borderWidth: '2px', borderStyle: 'solid', cursor: 'pointer' }
                  : { cursor: 'pointer' }
              }
            >
              <Card.Body className="p-3 p-md-4">
                <div className="mb-3" aria-hidden="true">
                  <FaCogs style={{ fontSize: '2rem', color: '#5f4b8b' }} />
                </div>
                <h3 className="mb-2" style={{ fontSize: '1rem', fontWeight: 700 }}>Config-Driven</h3>
                <p className="text-muted mb-0" style={{ fontSize: '0.87rem', lineHeight: 1.5 }}>
                  One prop controls the entire UI mode. Switch from table to board to chart without touching your components.
                </p>
                <div className="d-flex justify-content-end mt-2">
                  <FaChevronDown
                    style={{
                      fontSize: '0.75rem',
                      color: 'var(--app-text-muted, #64748b)',
                      transform: activePanel === 'config-driven' ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s ease',
                    }}
                  />
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} md={6} lg={4}>
            <Card
              className="h-100 shadow-sm theme-aware-card"
              onClick={() => setActivePanel(activePanel === 'composable' ? null : 'composable')}
              style={
                activePanel === 'composable'
                  ? { borderColor: '#5f4b8b', borderWidth: '2px', borderStyle: 'solid', cursor: 'pointer' }
                  : { cursor: 'pointer' }
              }
            >
              <Card.Body className="p-3 p-md-4">
                <div className="mb-3" aria-hidden="true">
                  <FaLayerGroup style={{ fontSize: '2rem', color: '#5f4b8b' }} />
                </div>
                <h3 className="mb-2" style={{ fontSize: '1rem', fontWeight: 700 }}>Composable</h3>
                <p className="text-muted mb-0" style={{ fontSize: '0.87rem', lineHeight: 1.5 }}>
                  Multiple Widgemo instances share filters, state, and interactions. Build dashboards, not widgets.
                </p>
                <div className="d-flex justify-content-end mt-2">
                  <FaChevronDown
                    style={{
                      fontSize: '0.75rem',
                      color: 'var(--app-text-muted, #64748b)',
                      transform: activePanel === 'composable' ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s ease',
                    }}
                  />
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} md={6} lg={4}>
            <Card
              className="h-100 shadow-sm theme-aware-card"
              onClick={() => setActivePanel(activePanel === 'extensible' ? null : 'extensible')}
              style={
                activePanel === 'extensible'
                  ? { borderColor: '#5f4b8b', borderWidth: '2px', borderStyle: 'solid', cursor: 'pointer' }
                  : { cursor: 'pointer' }
              }
            >
              <Card.Body className="p-3 p-md-4">
                <div className="mb-3" aria-hidden="true">
                  <FaPlug style={{ fontSize: '2rem', color: '#5f4b8b' }} />
                </div>
                <h3 className="mb-2" style={{ fontSize: '1rem', fontWeight: 700 }}>Extensible</h3>
                <p className="text-muted mb-0" style={{ fontSize: '0.87rem', lineHeight: 1.5 }}>
                  Drop in custom renderers, field types, and modes exactly where your product needs them. Nothing is locked.
                </p>
                <div className="d-flex justify-content-end mt-2">
                  <FaChevronDown
                    style={{
                      fontSize: '0.75rem',
                      color: 'var(--app-text-muted, #64748b)',
                      transform: activePanel === 'extensible' ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s ease',
                    }}
                  />
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col xs={12}>
            <div
              style={{
                maxHeight: activePanel ? '600px' : '0px',
                overflow: 'hidden',
                transition: 'max-height 0.35s ease',
              }}
            >
              {activePanel && (
                <div
                  style={{
                    padding: '2rem',
                    marginTop: '0.5rem',
                    borderRadius: '0.5rem',
                    backgroundColor: 'rgba(95, 75, 139, 0.08)',
                    border: '1px solid rgba(95, 75, 139, 0.2)',
                  }}
                >
                  {activePanel === 'config-driven' && <ConfigDrivenPanel />}
                  {activePanel === 'composable' && <ComposablePanel />}
                  {activePanel === 'extensible' && <ExtensiblePanel />}
                </div>
              )}
            </div>
          </Col>
        </Row>

      </div>
    </section>
  );
};
