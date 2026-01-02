import React, { useState, useEffect } from 'react';
import { Widgemo } from 'widgemo-core';
import type { WidgemoConfig, WidgemoAdapters } from 'widgemo-core';
import { Button, Container, Row, Col, Card, Nav, Navbar, Dropdown } from 'react-bootstrap';
import { Panel, Group, Separator } from 'react-resizable-panels';
import { FaGithub, FaBook, FaPalette } from 'react-icons/fa';
import './App.css';

// Define types for sample data
interface SampleData {
  name: string;
  value: number;
  category: string;
  id?: number;
  metric?: string;
  month?: string;
  sales?: number;
  status?: string;
  tasks?: number;
  rating?: string;
  feedback?: string;
}

// Neutral sample data for hero teaser
const heroSampleData: SampleData[] = [
  { name: 'Alpha', value: 42, category: 'A' },
  { name: 'Beta', value: 28, category: 'B' },
  { name: 'Gamma', value: 73, category: 'A' },
  { name: 'Delta', value: 15, category: 'C' },
  { name: 'Epsilon', value: 91, category: 'B' },
];

// Hero teaser configuration that cycles through modes
const createHeroConfig = (mode: 'table' | 'cards' | 'tiles' | 'chart'): WidgemoConfig => ({
  title: 'Live Demo',
  mode: mode,
  dataSource: { type: 'static' },
  fields: [
    { name: 'name', label: 'Name', type: 'text' },
    { name: 'value', label: 'Value', type: 'number' },
    { name: 'category', label: 'Category', type: 'text' },
  ],
  styling: { compact: true, theme: 'light' },
});

// Gallery configurations - reusing existing ones with neutral data
const galleryConfigs: Array<{ config: WidgemoConfig; description: string }> = [
  {
    config: {
      title: 'Data Table',
      mode: 'table',
      dataSource: { type: 'static' },
      fields: [
        { name: 'id', label: 'ID', type: 'number' },
        { name: 'name', label: 'Name', type: 'text' },
        { name: 'value', label: 'Value', type: 'number' },
        { name: 'category', label: 'Category', type: 'text' },
      ],
      actions: { create: true, edit: true, delete: true },
      header: { always: ['refresh'], onMenu: ['columnSelector', 'add'] },
      styling: { compact: true, theme: 'light' },
    },
    description: 'Full-featured data table with CRUD operations'
  },
  {
    config: {
      title: 'Card Layout',
      mode: 'cards',
      dataSource: { type: 'static' },
      fields: [
        { name: 'name', label: 'Name', type: 'text' },
        { name: 'value', label: 'Value', type: 'number' },
        { name: 'category', label: 'Category', type: 'text' },
      ],
      actions: { view: true },
      styling: { card: { shadow: true }, theme: 'light' },
    },
    description: 'Responsive card-based layout'
  },
  {
    config: {
      title: 'Compact Grid',
      mode: 'tiles',
      dataSource: { type: 'static' },
      fields: [
        { name: 'name', label: 'Name', type: 'text' },
        { name: 'value', label: 'Value', type: 'number' },
      ],
      styling: { compact: true, theme: 'light' },
    },
    description: 'Space-efficient tile grid'
  },
  {
    config: {
      title: 'Data Chart',
      mode: 'chart',
      dataSource: { type: 'static' },
      fields: [
        { name: 'category', label: 'Category', type: 'text' },
        { name: 'value', label: 'Value', type: 'number' },
      ],
      chartConfig: {
        type: 'bar',
        xAxis: 'category',
        yAxis: 'value',
      },
      styling: { theme: 'light' },
    },
    description: 'Interactive data visualization'
  },
  {
    config: {
      title: 'Minimal View',
      mode: 'table',
      dataSource: { type: 'static' },
      fields: [
        { name: 'name', label: 'Name', type: 'text' },
        { name: 'value', label: 'Value', type: 'number' },
      ],
      header: { onMenu: ['refresh'] },
      styling: { compact: true, theme: 'light' },
    },
    description: 'Clean, minimal interface'
  },
  {
    config: {
      title: 'Advanced Features',
      mode: 'table',
      dataSource: { type: 'static' },
      fields: [
        { name: 'id', label: 'ID', type: 'number', sortable: true },
        { name: 'name', label: 'Name', type: 'text', filterable: true },
        { name: 'value', label: 'Value', type: 'number', sortable: true },
        { name: 'category', label: 'Category', type: 'select', options: [
          { value: 'A', label: 'Category A' },
          { value: 'B', label: 'Category B' },
          { value: 'C', label: 'Category C' },
        ], filterable: true },
      ],
      actions: { create: true, edit: true, delete: true },
      pagination: { enabled: true, defaultPageSize: 5 },
      sorting: { enabled: true },
      filtering: { enabled: true },
      header: { always: ['refresh'], discoverable: ['viewToggle'], onMenu: ['columnSelector', 'add'] },
      styling: { theme: 'light' },
    },
    description: 'Full-featured with pagination, sorting, and filtering'
  },
];

// Default sandbox configuration
const defaultSandboxConfig: WidgemoConfig = {
  title: 'Sandbox',
  mode: 'table',
  dataSource: { type: 'static' },
  fields: [
    { name: 'id', label: 'ID', type: 'number' },
    { name: 'name', label: 'Name', type: 'text' },
    { name: 'value', label: 'Value', type: 'number' },
    { name: 'category', label: 'Category', type: 'text' },
  ],
  actions: { create: true, edit: true },
  styling: { theme: 'light' },
};

// Mock adapters for all Widgemo instances
const mockAdapters: WidgemoAdapters = {
  fetchData: async () => ({
    data: heroSampleData,
    total: heroSampleData.length,
  }),
  createRecord: async (record: Record<string, unknown>) => ({ ...record, id: Date.now() }),
  updateRecord: async (_id: unknown, record: Record<string, unknown>) => record,
  deleteRecord: async () => {},
};

// Demo section wrapper component
interface DemoSectionProps {
  id: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

const DemoSection: React.FC<DemoSectionProps> = ({ id, title, subtitle, children, className = '' }) => (
  <section id={id} className={`py-5 theme-aware-section ${className}`}>
    <Container>
      <div className="text-center mb-5">
        <h2 className="display-4 fw-bold mb-3">{title}</h2>
        {subtitle && <p className="lead">{subtitle}</p>}
      </div>
      {children}
    </Container>
  </section>
);

// Navigation component
const DemoNav: React.FC<{ activeSection: string; onSectionChange: (section: string) => void; currentTheme: string; onThemeChange: (theme: string) => void }> = ({
  activeSection,
  onSectionChange,
  currentTheme,
  onThemeChange
}) => {
  const sections = [
    { id: 'hero', label: 'Hero' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'sandbox', label: 'Sandbox' },
    { id: 'advanced', label: 'Advanced Examples' },
    { id: 'resources', label: 'Resources' },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 56; // Bootstrap navbar height
      const elementPosition = element.offsetTop - navbarHeight;
      window.scrollTo({ top: elementPosition, behavior: 'smooth' });
      onSectionChange(sectionId);
    }
  };

  return (
    <Navbar bg="dark" variant="dark" fixed="top" expand="lg" className="shadow">
      <Container>
        <Navbar.Brand href="#hero" onClick={() => scrollToSection('hero')}>
          <img src="/widgemo_deco.svg" alt="Widgemo" className="me-2" style={{ height: '32px', width: 'auto' }} />
          <strong>Widgemo</strong> Demo
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="demo-nav" />
        <Navbar.Collapse id="demo-nav">
          <Nav className="ms-auto">
            {sections.map(section => (
              <Nav.Link
                key={section.id}
                active={activeSection === section.id}
                onClick={() => scrollToSection(section.id)}
                className="mx-2"
              >
                {section.label}
              </Nav.Link>
            ))}
          </Nav>
          <ThemeSelector currentTheme={currentTheme} onThemeChange={onThemeChange} />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

// Hero component with cycling modes
const HeroSection: React.FC<{ onExploreGallery: () => void; onJumpToSandbox: () => void; shouldHaveDarkText: boolean }> = ({
  onExploreGallery,
  onJumpToSandbox,
  shouldHaveDarkText
}) => {
  const [currentModeIndex, setCurrentModeIndex] = useState(0);
  const [isLargeScreen, setIsLargeScreen] = useState(true); // Default to large screen
  const modes: ('table' | 'cards' | 'tiles' | 'chart')[] = ['table', 'cards', 'tiles', 'chart'];
  const modesLength = modes.length;

  // Detect screen size changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 992px)'); // Bootstrap lg breakpoint
    setIsLargeScreen(mediaQuery.matches);

    const handleResize = (e: MediaQueryListEvent) => {
      setIsLargeScreen(e.matches);
    };

    mediaQuery.addEventListener('change', handleResize);
    return () => mediaQuery.removeEventListener('change', handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentModeIndex(prev => (prev + 1) % modesLength);
    }, 3000);
    return () => clearInterval(interval);
  }, [modesLength]);

  const currentMode = modes[currentModeIndex];
  const heroConfig = createHeroConfig(currentMode);

  return (
    <section id="hero" className="bg-gradient" style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: shouldHaveDarkText ? '#161616' : 'white',
      paddingTop: '120px', // Fixed distance from navbar
      height: isLargeScreen ? '800px' : '1200px' // Responsive height based on screen size
    }}>
      <Container>
        <Row>
          <Col lg={6} className="mb-5 mb-lg-0">
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
          <Col lg={6}>
            <Card className="shadow-lg border-0 theme-aware-card">
              <Card.Body className="p-4">
                <div className="mb-3">
                  <small className="text-muted">
                    Mode: <strong>{currentMode.toUpperCase()}</strong>
                    <span className="ms-2">(Auto-cycling every 3s)</span>
                  </small>
                </div>
                <div style={{ maxHeight: '400px', overflow: 'auto' }}>
                  <Widgemo
                    key={currentMode}
                    config={heroConfig}
                    adapters={mockAdapters}
                    showConfigDetails={false}
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

// Gallery component
const GallerySection: React.FC = () => (
  <DemoSection
    id="gallery"
    title="Gallery"
    subtitle="Explore different configurations and modes"
    className="bg-light"
  >
    <Row>
      {galleryConfigs.map((item, index) => (
        <Col lg={6} xl={4} key={index} className="mb-4">
          <Card className="h-100 shadow-sm hover-lift theme-aware-card">
            <Card.Body className="d-flex flex-column">
              <div style={{ flex: 1, minHeight: '200px', marginBottom: '1rem' }}>
                <Widgemo
                  config={{ ...item.config, title: undefined }}
                  adapters={mockAdapters}
                  showConfigDetails={true}
                />
              </div>
              <Card.Title className="h6">{item.config.title}</Card.Title>
              <Card.Text className="text-muted small">{item.description}</Card.Text>
              <div className="mt-auto">
                <small className="text-muted">Hover for config • Future: Remix or load to sandbox</small>
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  </DemoSection>
);

// Sandbox component with split view
const SandboxSection: React.FC = () => {
  const [configJson, setConfigJson] = useState(JSON.stringify(defaultSandboxConfig, null, 2));
  const [config, setConfig] = useState(defaultSandboxConfig);
  const [jsonError, setJsonError] = useState<string | null>(null);

  const applyConfig = () => {
    try {
      const parsed = JSON.parse(configJson);
      setConfig(parsed);
      setJsonError(null);
    } catch (error) {
      setJsonError((error as Error).message);
    }
  };

  const loadPreset = (presetConfig: WidgemoConfig) => {
    const json = JSON.stringify(presetConfig, null, 2);
    setConfigJson(json);
    setConfig(presetConfig);
    setJsonError(null);
  };

  return (
    <DemoSection
      id="sandbox"
      title="Interactive Sandbox"
      subtitle="Edit configuration JSON and see changes instantly"
    >
      <Card className="shadow theme-aware-card">
        <Card.Body className="p-0">
          <Group>
            <Panel defaultSize={50} minSize={30}>
              <div className="p-4 h-100 d-flex flex-column">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="mb-0">Configuration Editor</h5>
                  <div>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      className="me-2"
                      onClick={() => loadPreset(galleryConfigs[0].config)}
                    >
                      Load Table Preset
                    </Button>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      className="me-2"
                      onClick={() => loadPreset(galleryConfigs[1].config)}
                    >
                      Load Cards Preset
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={applyConfig}
                      disabled={!!jsonError}
                    >
                      Apply Changes
                    </Button>
                  </div>
                </div>
                {jsonError && (
                  <div className="alert alert-danger small mb-3">
                    <strong>JSON Error:</strong> {jsonError}
                  </div>
                )}
                <textarea
                  className="form-control flex-grow-1"
                  style={{ fontFamily: 'monospace', fontSize: '0.875rem' }}
                  value={configJson}
                  onChange={(e) => setConfigJson(e.target.value)}
                  spellCheck={false}
                />
              </div>
            </Panel>
            <Separator className="bg-secondary" style={{ width: '2px' }} />
            <Panel defaultSize={50} minSize={30}>
              <div className="p-4 h-100">
                <h5 className="mb-3">Live Preview</h5>
                <div style={{ maxHeight: 'calc(100vh - 300px)', overflow: 'auto' }}>
                  <Widgemo
                    config={config}
                    adapters={mockAdapters}
                    showConfigDetails={true}
                  />
                </div>
              </div>
            </Panel>
          </Group>
        </Card.Body>
      </Card>
    </DemoSection>
  );
};

// Advanced Examples component
const AdvancedExamplesSection: React.FC = () => (
  <DemoSection
    id="advanced"
    title="Advanced Examples"
    subtitle="Complex compositions and future capabilities"
    className="bg-light"
  >
    <Row>
      <Col lg={6} className="mb-4">
        <Card className="shadow theme-aware-card">
          <Card.Body>
            <h5 className="card-title">Dashboard Layout</h5>
            <p className="text-muted">Multiple Widgemos in a dashboard configuration</p>
            <div className="row g-3">
              <div className="col-6">
                <Widgemo
                  config={{
                    title: 'Summary',
                    mode: 'cards',
                    dataSource: { type: 'static' },
                    fields: [
                      { name: 'metric', label: 'Metric', type: 'text' },
                      { name: 'value', label: 'Value', type: 'number' },
                    ],
                    styling: { compact: true, theme: 'light' },
                  }}
                  adapters={{
                    fetchData: async () => ({
                      data: [
                        { metric: 'Total', value: 150 },
                        { metric: 'Active', value: 89 },
                      ] as SampleData[],
                    }),
                  }}
                  showConfigDetails={false}
                />
              </div>
              <div className="col-6">
                <Widgemo
                  config={{
                    title: 'Chart',
                    mode: 'chart',
                    dataSource: { type: 'static' },
                    fields: [
                      { name: 'month', label: 'Month', type: 'text' },
                      { name: 'sales', label: 'Sales', type: 'number' },
                    ],
                    chartConfig: { type: 'line', xAxis: 'month', yAxis: 'sales' },
                    styling: { compact: true, theme: 'light' },
                  }}
                  adapters={{
                    fetchData: async () => ({
                      data: [
                        { month: 'Jan', sales: 400 },
                        { month: 'Feb', sales: 300 },
                        { month: 'Mar', sales: 600 },
                      ] as SampleData[],
                    }),
                  }}
                  showConfigDetails={false}
                />
              </div>
            </div>
            <small className="text-muted mt-2 d-block">
              Coming: Parent-controlled capabilities propagation via CapabilitiesProvider
            </small>
          </Card.Body>
        </Card>
      </Col>
      <Col lg={6} className="mb-4">
        <Card className="shadow theme-aware-card">
          <Card.Body>
            <h5 className="card-title">Nested Data Display</h5>
            <p className="text-muted">Hierarchical data with drill-down capabilities</p>
            <Widgemo
              config={{
                title: 'Projects',
                mode: 'table',
                dataSource: { type: 'static' },
                fields: [
                  { name: 'name', label: 'Project', type: 'text' },
                  { name: 'status', label: 'Status', type: 'select', options: [
                    { value: 'active', label: 'Active' },
                    { value: 'completed', label: 'Completed' },
                  ]},
                  { name: 'tasks', label: 'Tasks', type: 'number' },
                ],
                actions: { view: true },
                styling: { compact: true, theme: 'light' },
              }}
              adapters={{
                fetchData: async () => ({
                  data: [
                    { name: 'Website Redesign', status: 'active', tasks: 12 },
                    { name: 'Mobile App', status: 'completed', tasks: 8 },
                  ] as SampleData[],
                }),
              }}
              showConfigDetails={false}
            />
            <small className="text-muted mt-2 d-block">
              Coming: Drill-down navigation and nested Widgemo rendering
            </small>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </DemoSection>
);

// Resources/Footer component
const ResourcesSection: React.FC = () => (
  <footer id="resources" className="bg-dark text-light py-5">
    <Container>
      <Row className="text-center mb-4">
        <Col>
          <h2 className="display-5 fw-bold mb-3" style={{ color: 'white' }}>Resources</h2>
          <p className="lead">
            "Configuration is the new code. Build once, configure everywhere."
          </p>
        </Col>
      </Row>
      <Row className="g-4">
        <Col md={4}>
          <Card className="bg-secondary text-light border-0 h-100">
            <Card.Body className="text-center">
              <FaBook className="display-4 mb-3 text-warning" />
              <h5>Docs</h5>
              <p>Comprehensive documentation and API reference</p>
              <Button variant="outline-light" size="sm">Coming Soon</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="bg-secondary text-light border-0 h-100">
            <Card.Body className="text-center">
              <FaGithub className="display-4 mb-3 text-warning" />
              <h5>GitHub</h5>
              <p>Source code, issues, and contributions</p>
              <Button variant="outline-light" size="sm">View Repository</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="bg-secondary text-light border-0 h-100">
            <Card.Body className="text-center">
              <div className="display-4 mb-3 text-warning">$</div>
              <h5>Install</h5>
              <code className="d-block bg-dark p-2 rounded">npm install widgemo-core</code>
              <Button variant="outline-light" size="sm" className="mt-2">Copy Command</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <hr className="my-4" />
      <Row className="text-center">
        <Col>
          <p className="mb-2">
            For feedback, questions, or to learn more about Widgemo, visit our main site:
          </p>
          <Button variant="outline-light" href="https://widgemo.com" target="_blank" rel="noopener noreferrer">
            widgemo.com
          </Button>
        </Col>
      </Row>
    </Container>
  </footer>
);

// Theme selector component
const ThemeSelector: React.FC<{ currentTheme: string; onThemeChange: (theme: string) => void }> = ({
  currentTheme,
  onThemeChange
}) => {
  const themes = [
    { key: 'theme-light', label: 'Light', color: '#ffffff' },
    { key: 'theme-light-blue', label: 'Light Blue', color: '#f0f8ff' },
    { key: 'theme-light-green', label: 'Light Green', color: '#f0fff0' },
    { key: 'theme-light-purple', label: 'Light Purple', color: '#f8f0ff' },
    { key: 'theme-dark', label: 'Dark', color: '#1a1a1a' },
    { key: 'theme-dark-red', label: 'Dark Red', color: '#2a1a1a' },
    { key: 'theme-dark-purple', label: 'Dark Purple', color: '#1a1a2a' },
  ];

  const currentThemeData = themes.find(t => t.key === currentTheme);

  return (
    <Dropdown className="ms-3">
      <Dropdown.Toggle variant="outline-secondary" size="sm" id="theme-selector">
        <FaPalette className="me-2" />
        {currentThemeData?.label || 'Theme'}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {themes.map(theme => (
          <Dropdown.Item
            key={theme.key}
            active={currentTheme === theme.key}
            onClick={() => onThemeChange(theme.key)}
            className="d-flex align-items-center"
          >
            <div
              className="me-2"
              style={{
                width: '16px',
                height: '16px',
                backgroundColor: theme.color,
                border: '1px solid #ccc',
                borderRadius: '2px'
              }}
            />
            {theme.label}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

// Main App component
function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [currentTheme, setCurrentTheme] = useState(() => {
    // Detect system preference for light/dark theme
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'theme-dark' : 'theme-light';
    }
    return 'theme-light'; // fallback
  });

  // Determine if current theme should have dark hero text
  const shouldHaveDarkHeroText = currentTheme.startsWith('theme-light');

  // Handle scroll to update active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'gallery', 'sandbox', 'advanced', 'resources'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 56; // Bootstrap navbar height
      const elementPosition = element.offsetTop - navbarHeight;
      window.scrollTo({ top: elementPosition, behavior: 'smooth' });
    }
  };

  return (
    <div className={`App ${currentTheme}`}>
      <DemoNav 
        activeSection={activeSection} 
        onSectionChange={setActiveSection}
        currentTheme={currentTheme}
        onThemeChange={setCurrentTheme}
      />

      <HeroSection
        onExploreGallery={() => scrollToSection('gallery')}
        onJumpToSandbox={() => scrollToSection('sandbox')}
        shouldHaveDarkText={shouldHaveDarkHeroText}
      />

      <GallerySection />

      <SandboxSection />

      <AdvancedExamplesSection />

      <ResourcesSection />
    </div>
  );
}

export default App;
