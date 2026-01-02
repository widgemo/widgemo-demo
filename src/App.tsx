import React, { useState, useEffect } from 'react';
import { Widgemo } from 'widgemo-core';
import type { WidgemoConfig, WidgemoAdapters } from 'widgemo-core';
import { Button, Container, Row, Col, Card, Nav, Navbar, Dropdown, Modal } from 'react-bootstrap';
import { Panel, Group, Separator } from 'react-resizable-panels';
import { FaGithub, FaBook, FaPalette } from 'react-icons/fa';
import './App.css';

// Define types for sample data
interface SampleData {
  id?: number;
  name: string;
  email?: string;
  role?: string;
  department?: string;
  status?: boolean;
  lastLogin?: string;
  value?: number;
  category?: string;
  metric?: string;
  month?: string;
  sales?: number;
  tasks?: number;
  rating?: string;
  feedback?: string;
  activeUsers?: number;
  totalUsers?: number;
}

// Neutral sample data for teaser - User Database
const teaserSampleData: SampleData[] = [
  { id: 1, name: 'Alice Johnson', email: 'alice.johnson@company.com', role: 'Manager', department: 'Engineering', status: true, lastLogin: '2024-01-15' },
  { id: 2, name: 'Bob Smith', email: 'bob.smith@company.com', role: 'Developer', department: 'Engineering', status: true, lastLogin: '2024-01-14' },
  { id: 3, name: 'Carol Williams', email: 'carol.williams@company.com', role: 'Designer', department: 'Design', status: false, lastLogin: '2024-01-10' },
  { id: 4, name: 'David Brown', email: 'david.brown@company.com', role: 'Developer', department: 'Engineering', status: true, lastLogin: '2024-01-15' },
  { id: 5, name: 'Eva Davis', email: 'eva.davis@company.com', role: 'Analyst', department: 'Business', status: true, lastLogin: '2024-01-13' },
];
const galleryConfigs: Array<{ config: WidgemoConfig; description: string }> = [
  {
    config: {
      title: 'User Management Table',
      mode: 'table',
      dataSource: { type: 'static' },
      fields: [
        { name: 'id', label: 'ID', type: 'number' },
        { name: 'name', label: 'Name', type: 'text' },
        { name: 'email', label: 'Email', type: 'text' },
        { name: 'role', label: 'Role', type: 'text' },
        { name: 'department', label: 'Department', type: 'text' },
        { name: 'status', label: 'Active', type: 'boolean' },
      ],
      actions: { create: true, edit: true, delete: true },
      header: { always: ['refresh'], onMenu: ['columnSelector', 'add'] },
      styling: { compact: true, theme: 'light' },
    },
    description: 'Full-featured user management table with CRUD operations'
  },
  {
    config: {
      title: 'User Profile Cards',
      mode: 'cards',
      dataSource: { type: 'static' },
      fields: [
        { name: 'name', label: 'Name', type: 'text' },
        { name: 'email', label: 'Email', type: 'text' },
        { name: 'role', label: 'Role', type: 'text' },
        { name: 'department', label: 'Department', type: 'text' },
        { name: 'status', label: 'Active', type: 'boolean' },
      ],
      actions: { view: true },
      styling: { card: { shadow: true }, theme: 'light' },
    },
    description: 'User profile cards with contact and role information'
  },
  {
    config: {
      title: 'Department Overview',
      mode: 'tiles',
      dataSource: { type: 'static' },
      fields: [
        { name: 'department', label: 'Department', type: 'text' },
        { name: 'name', label: 'Lead', type: 'text' },
        { name: 'role', label: 'Role', type: 'text' },
      ],
      styling: { compact: true, theme: 'light' },
    },
    description: 'Department tiles showing team leads and roles'
  },
  {
    config: {
      title: 'User Activity Chart',
      mode: 'chart',
      dataSource: { type: 'static' },
      fields: [
        { name: 'department', label: 'Department', type: 'text' },
        { name: 'name', label: 'User', type: 'text' },
        { name: 'status', label: 'Active', type: 'boolean' },
      ],
      chartConfig: {
        type: 'bar',
        xAxis: 'department',
        yAxis: 'status',
      },
      styling: { theme: 'light' },
    },
    description: 'Chart showing active users by department'
  },
  {
    config: {
      title: 'Active Users',
      mode: 'table',
      dataSource: { type: 'static' },
      fields: [
        { name: 'name', label: 'Name', type: 'text' },
        /* { name: 'email', label: 'Email', type: 'text' }, */
        { name: 'lastLogin', label: 'Last Login', type: 'date' },
      ],
      header: { onMenu: ['refresh'] },
      styling: { compact: true, theme: 'light' },
    },
    description: 'Simple view of active users with login information'
  },
  {
    config: {
      title: 'Advanced User Management',
      mode: 'table',
      dataSource: { type: 'static' },
      fields: [
        { name: 'id', label: 'ID', type: 'number', sortable: true },
        { name: 'name', label: 'Name', type: 'text', filterable: true },
        { name: 'email', label: 'Email', type: 'text', filterable: true },
        {
          name: 'department', label: 'Department', type: 'select', options: [
            { value: 'Engineering', label: 'Engineering' },
            { value: 'Design', label: 'Design' },
            { value: 'Business', label: 'Business' },
          ], filterable: true
        },
        { name: 'role', label: 'Role', type: 'text' },
        { name: 'status', label: 'Active', type: 'boolean', filterable: true },
        { name: 'lastLogin', label: 'Last Login', type: 'date', sortable: true },
      ],
      actions: { create: true, edit: true, delete: true },
      pagination: { enabled: true, defaultPageSize: 5 },
      sorting: { enabled: true },
      filtering: { enabled: true },
      header: { always: ['refresh'], discoverable: ['viewToggle'], onMenu: ['columnSelector', 'add'] },
      styling: { theme: 'light' },
    },
    description: 'Full-featured user management with pagination, sorting, and filtering'
  },
];

// Default sandbox configuration
const defaultSandboxConfig: WidgemoConfig = {
  title: 'User Sandbox',
  mode: 'table',
  dataSource: { type: 'static' },
  fields: [
    { name: 'id', label: 'ID', type: 'number' },
    { name: 'name', label: 'Name', type: 'text' },
    { name: 'email', label: 'Email', type: 'text' },
    { name: 'role', label: 'Role', type: 'text' },
    { name: 'department', label: 'Department', type: 'text' },
    { name: 'status', label: 'Active', type: 'boolean' },
  ],
  actions: { create: true, edit: true },
  styling: { theme: 'light' },
};

// Mock adapters for all Widgemo instances
const mockAdapters: WidgemoAdapters = {
  fetchData: async () => ({
    data: teaserSampleData,
    total: teaserSampleData.length,
  }),
  createRecord: async (record: Record<string, unknown>) => ({ ...record, id: Date.now() }),
  updateRecord: async (_id: unknown, record: Record<string, unknown>) => record,
  deleteRecord: async () => { },
};

// Define types for configuration reference
interface ConfigProperty {
  property: string;
  type: string;
  description: string;
  options?: string[];
  example?: string;
  optional?: boolean;
  properties?: SubProperty[];
}

interface SubProperty {
  name: string;
  type: string;
  description: string;
  options?: string[];
  optional?: boolean;
  example?: string;
}

interface ConfigSection {
  [key: string]: ConfigProperty[];
}

// Configuration reference data
const configReference: ConfigSection = {
  basic: [
    {
      property: 'title',
      type: 'string',
      description: 'The title displayed at the top of the component',
      example: '"User Management"'
    },
    {
      property: 'mode',
      type: 'string',
      description: 'Display mode for the data',
      options: ['table', 'cards', 'tiles', 'chart'],
      example: '"table"'
    },
    {
      property: 'dataSource',
      type: 'object',
      description: 'Configuration for data fetching',
      properties: [
        { name: 'type', type: 'string', options: ['static', 'api'], description: 'Data source type' },
        { name: 'url', type: 'string', description: 'API endpoint URL (for api type)', optional: true },
        { name: 'method', type: 'string', options: ['GET', 'POST'], description: 'HTTP method', optional: true }
      ]
    }
  ],
  fields: [
    {
      property: 'name',
      type: 'string',
      description: 'Field identifier/key from your data',
      example: '"name"'
    },
    {
      property: 'label',
      type: 'string',
      description: 'Display label for the field',
      example: '"Full Name"'
    },
    {
      property: 'type',
      type: 'string',
      description: 'Data type for rendering and validation',
      options: ['text', 'number', 'boolean', 'date', 'select', 'email', 'url'],
      example: '"text"'
    },
    {
      property: 'options',
      type: 'array',
      description: 'Available options for select fields',
      example: '[{ "value": "admin", "label": "Administrator" }]',
      optional: true
    },
    {
      property: 'sortable',
      type: 'boolean',
      description: 'Whether this field can be sorted',
      example: 'true',
      optional: true
    },
    {
      property: 'filterable',
      type: 'boolean',
      description: 'Whether this field can be filtered',
      example: 'true',
      optional: true
    }
  ],
  actions: [
    {
      property: 'create',
      type: 'boolean',
      description: 'Enable create/add new record functionality',
      example: 'true'
    },
    {
      property: 'edit',
      type: 'boolean',
      description: 'Enable edit existing records functionality',
      example: 'true'
    },
    {
      property: 'delete',
      type: 'boolean',
      description: 'Enable delete record functionality',
      example: 'true'
    },
    {
      property: 'view',
      type: 'boolean',
      description: 'Enable view record details functionality',
      example: 'true'
    }
  ],
  header: [
    {
      property: 'always',
      type: 'array',
      description: 'Buttons always visible in header',
      options: ['refresh', 'add', 'export', 'import'],
      example: '["refresh", "add"]'
    },
    {
      property: 'onMenu',
      type: 'array',
      description: 'Buttons available in header dropdown menu',
      options: ['columnSelector', 'filter', 'sort', 'export', 'import', 'add'],
      example: '["columnSelector", "filter"]'
    },
    {
      property: 'discoverable',
      type: 'array',
      description: 'Buttons that appear on hover/focus',
      options: ['viewToggle', 'density', 'fullscreen'],
      example: '["viewToggle"]'
    }
  ],
  styling: [
    {
      property: 'theme',
      type: 'string',
      description: 'Color theme',
      options: ['light', 'dark'],
      example: '"light"'
    },
    {
      property: 'compact',
      type: 'boolean',
      description: 'Use compact spacing and sizing',
      example: 'true'
    },
    {
      property: 'card',
      type: 'object',
      description: 'Card-specific styling options',
      properties: [
        { name: 'shadow', type: 'boolean', description: 'Add shadow to cards' },
        { name: 'border', type: 'boolean', description: 'Add border to cards' }
      ]
    }
  ],
  features: [
    {
      property: 'pagination',
      type: 'object',
      description: 'Pagination configuration',
      properties: [
        { name: 'enabled', type: 'boolean', description: 'Enable pagination' },
        { name: 'defaultPageSize', type: 'number', description: 'Default items per page', example: '10' },
        { name: 'pageSizeOptions', type: 'array', description: 'Available page size options', example: '[5, 10, 25, 50]' }
      ]
    },
    {
      property: 'sorting',
      type: 'object',
      description: 'Sorting configuration',
      properties: [
        { name: 'enabled', type: 'boolean', description: 'Enable sorting' },
        { name: 'defaultSort', type: 'object', description: 'Default sort configuration', example: '{ "field": "name", "direction": "asc" }' }
      ]
    },
    {
      property: 'filtering',
      type: 'object',
      description: 'Filtering configuration',
      properties: [
        { name: 'enabled', type: 'boolean', description: 'Enable filtering' },
        { name: 'defaultFilters', type: 'array', description: 'Default filter conditions' }
      ]
    }
  ],
  chart: [
    {
      property: 'chartConfig',
      type: 'object',
      description: 'Chart-specific configuration (only used in chart mode)',
      properties: [
        { name: 'type', type: 'string', options: ['bar', 'line', 'pie', 'doughnut'], description: 'Chart type' },
        { name: 'xAxis', type: 'string', description: 'Field name for X-axis' },
        { name: 'yAxis', type: 'string', description: 'Field name for Y-axis' },
        { name: 'groupBy', type: 'string', description: 'Field to group data by', optional: true },
        { name: 'aggregate', type: 'string', options: ['count', 'sum', 'avg', 'min', 'max'], description: 'Aggregation method for Y-axis', optional: true }
      ]
    }
  ]
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
    { id: 'teaser', label: 'Teaser' },
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
        <Navbar.Brand href="#teaser" onClick={() => scrollToSection('teaser')}>
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

// Teaser configurations with varying settings for each mode
const teaserConfigs: Array<{ config: WidgemoConfig; description: string }> = [
  {
    config: {
      title: 'User Management Table',
      mode: 'table',
      dataSource: { type: 'static' },
      fields: [
        { name: 'id', label: 'ID', type: 'number' },
        { name: 'name', label: 'Name', type: 'text' },
        { name: 'email', label: 'Email', type: 'text' },
        { name: 'role', label: 'Role', type: 'text' },
        { name: 'department', label: 'Department', type: 'text' },
        { name: 'status', label: 'Active', type: 'boolean', "booleanTrueLabel": "🟢 Online", "booleanFalseLabel": "🔴 Offline" },
      ],
      actions: { create: true, edit: true, delete: true },
      header: { always: ['refresh', 'add'], onMenu: ['deleteToggle'] },
      styling: { compact: true, theme: 'light' },
      labels: { add: 'Add User' }
    },
    description: 'Full-featured user management table'
  },
  {
    config: {
      title: 'User Profile Cards',
      mode: 'cards',
      dataSource: { type: 'static' },
      fields: [
        { name: 'name', label: 'Name', type: 'text' },
        { name: 'email', label: 'Email', type: 'text' },
        { name: 'role', label: 'Role', type: 'text' },
        { name: 'department', label: 'Department', type: 'text' },
      ],
      actions: { view: true },
      header: { always: ['refresh'] },
      styling: { card: { shadow: true }, theme: 'light' },
    },
    description: 'User profile cards with contact info'
  },
  {
    config: {
      title: 'Department Overview',
      mode: 'tiles',
      dataSource: { type: 'static' },
      fields: [
        { name: 'department', label: 'Department', type: 'text' },
        { name: 'name', label: 'Lead', type: 'text' },
        { name: 'role', label: 'Role', type: 'text' },
      ],
      header: { always: ['refresh'] },
      styling: { compact: true, theme: 'light' },
    },
    description: 'Department tiles showing team leads'
  },
  {
    config: {
      title: 'User Activity Chart',
      mode: 'chart',
      dataSource: { type: 'static' },
      fields: [
        { name: 'department', label: 'Department', type: 'text' },
        { name: 'name', label: 'User', type: 'text' },
        { name: 'status', label: 'Active', type: 'boolean' },
      ],
      chartConfig: {
        type: 'bar',
        xAxis: 'department',
        yAxis: 'status',
      },
      styling: { theme: 'light' },
    },
    description: 'Chart showing active users by department'
  },
];

// Teaser component with cycling configurations
const TeaserSection: React.FC<{ onExploreGallery: () => void; onJumpToSandbox: () => void; shouldHaveDarkText: boolean }> = ({
  onExploreGallery,
  onJumpToSandbox,
  shouldHaveDarkText
}) => {
  const [currentConfigIndex, setCurrentConfigIndex] = useState(0);
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
    }, 3000);
    return () => clearInterval(interval);
  }, [configsLength]);

  const currentTeaserItem = teaserConfigs[currentConfigIndex];
  const teaserConfig = currentTeaserItem.config;

  return (
    <section id="teaser" className="bg-gradient" style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: shouldHaveDarkText ? '#161616' : 'white',
      paddingTop: '120px', // Fixed distance from navbar
      height: isLargeScreen ? '800px' : '1200px' // Responsive height based on screen size
    }}>
      <Container>
        <Row>
          <Col lg={4} className="mb-5 mb-lg-0">
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
          <Col lg={8}>
            <Card className="shadow-lg border-0 theme-aware-card">
              <Card.Body className="p-4">
                <div className="mb-3">
                  <small className="text-muted">
                    <strong>{currentTeaserItem.config.title}</strong>
                    <span className="ms-2">(Auto-cycling every 3s)</span>
                  </small>
                  <br />
                  <small className="text-muted">{currentTeaserItem.description}</small>
                </div>
                <div style={{ maxHeight: '400px', overflow: 'auto' }}>
                  <Widgemo
                    key={currentConfigIndex}
                    config={teaserConfig}
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
  const [showReferenceModal, setShowReferenceModal] = useState(false);

  const applyConfig = () => {
    try {
      // Remove comment lines (lines starting with //) before parsing
      const cleanJson = configJson
        .split('\n')
        .filter(line => !line.trim().startsWith('//'))
        .join('\n')
        .trim();

      const parsed = JSON.parse(cleanJson);
      setConfig(parsed);
      setJsonError(null);
    } catch (error) {
      setJsonError((error as Error).message);
    }
  };

  const loadPreset = (presetConfig: WidgemoConfig, presetTitle?: string) => {
    const json = JSON.stringify(presetConfig, null, 2);
    const titleComment = presetTitle ? `// ${presetTitle}\n` : '';
    const commentedJson = `${titleComment}${json}`;
    setConfigJson(commentedJson);
    // Don't apply the config automatically - wait for user to click Apply Changes
    setJsonError(null);
  };

  return (
    <DemoSection
      id="sandbox"
      title="Interactive Sandbox"
      subtitle="Edit configuration JSON and see changes instantly"
      className="sandbox-taller"
    >
      <Card className="shadow theme-aware-card">
        <Card.Body className="p-0">
          <Group>
            <Panel defaultSize={35} minSize={30}>
              <div className="p-4 h-100 d-flex flex-column">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="mb-0">Configuration Editor</h5>
                  <div className="d-flex gap-2">
                    <Dropdown>
                      <Dropdown.Toggle variant="outline-secondary" size="sm" id="preset-dropdown">
                        Load Preset
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        {galleryConfigs.map((item, index) => (
                          <Dropdown.Item
                            key={index}
                            onClick={() => loadPreset(item.config, item.config.title)}
                          >
                            {item.config.title}
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                    <Button
                      variant="outline-info"
                      size="sm"
                      onClick={() => setShowReferenceModal(true)}
                    >
                      Reference
                    </Button>
                  </div>
                </div>
                {jsonError && (
                  <div className="alert alert-danger small mb-3">
                    <strong>JSON Error:</strong> {jsonError}
                  </div>
                )}
                <textarea
                  className="form-control flex-grow-1 mb-3"
                  style={{ fontFamily: 'monospace', fontSize: '0.875rem' }}
                  value={configJson}
                  onChange={(e) => {
                    setConfigJson(e.target.value);
                    // Clear any previous JSON errors when user starts typing
                    if (jsonError) {
                      setJsonError(null);
                    }
                  }}
                  spellCheck={false}
                />
                <Button
                  variant="primary"
                  size="sm"
                  onClick={applyConfig}
                  disabled={!!jsonError}
                  className="w-100"
                >
                  Apply Changes
                </Button>
              </div>
            </Panel>
            <Separator className="bg-secondary" style={{ width: '2px' }} />
            <Panel defaultSize={65} minSize={30}>
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

      <Modal
        show={showReferenceModal}
        onHide={() => setShowReferenceModal(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Configuration Reference</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: '70vh', overflow: 'auto' }}>
          <div className="mb-4">
            <h6 className="text-primary">Basic Properties</h6>
            {configReference.basic.map((prop, idx) => (
              <div key={idx} className="mb-3 p-2 border-start border-primary">
                <code className="text-primary fw-bold">{prop.property}</code>
                <span className="badge bg-secondary ms-2">{prop.type}</span>
                {prop.options && (
                  <small className="text-muted ms-2">
                    Options: {prop.options.join(', ')}
                  </small>
                )}
                <br />
                <small className="text-muted">{prop.description}</small>
                {prop.example && (
                  <div className="mt-1">
                    <small className="text-success">Example: {prop.example}</small>
                  </div>
                )}
                {prop.properties && (
                  <div className="mt-2">
                    <small className="text-muted">Sub-properties:</small>
                    <ul className="mb-0 mt-1">
                      {prop.properties.map((subProp: SubProperty, subIdx: number) => (
                        <li key={subIdx}>
                          <code>{subProp.name}</code> ({subProp.type})
                          {subProp.optional && <span className="text-muted"> - optional</span>}
                          {subProp.options && <span className="text-muted"> - {subProp.options.join(', ')}</span>}
                          <br />
                          <small className="text-muted">{subProp.description}</small>
                          {subProp.example && <small className="text-success"> - {subProp.example}</small>}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mb-4">
            <h6 className="text-success">Fields Configuration</h6>
            {configReference.fields.map((prop, idx) => (
              <div key={idx} className="mb-3 p-2 border-start border-success">
                <code className="text-success fw-bold">{prop.property}</code>
                <span className="badge bg-secondary ms-2">{prop.type}</span>
                {prop.optional && <span className="text-muted ms-2">(optional)</span>}
                {prop.options && (
                  <small className="text-muted ms-2">
                    Options: {prop.options.join(', ')}
                  </small>
                )}
                <br />
                <small className="text-muted">{prop.description}</small>
                {prop.example && (
                  <div className="mt-1">
                    <small className="text-success">Example: {prop.example}</small>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mb-4">
            <h6 className="text-warning">Actions</h6>
            {configReference.actions.map((prop, idx) => (
              <div key={idx} className="mb-3 p-2 border-start border-warning">
                <code className="text-warning fw-bold">{prop.property}</code>
                <span className="badge bg-secondary ms-2">{prop.type}</span>
                <br />
                <small className="text-muted">{prop.description}</small>
                {prop.example && (
                  <div className="mt-1">
                    <small className="text-success">Example: {prop.example}</small>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mb-4">
            <h6 className="text-info">Header Configuration</h6>
            {configReference.header.map((prop, idx) => (
              <div key={idx} className="mb-3 p-2 border-start border-info">
                <code className="text-info fw-bold">{prop.property}</code>
                <span className="badge bg-secondary ms-2">{prop.type}</span>
                {prop.options && (
                  <small className="text-muted ms-2">
                    Options: {prop.options.join(', ')}
                  </small>
                )}
                <br />
                <small className="text-muted">{prop.description}</small>
                {prop.example && (
                  <div className="mt-1">
                    <small className="text-success">Example: {prop.example}</small>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mb-4">
            <h6 className="text-secondary">Styling Options</h6>
            {configReference.styling.map((prop, idx) => (
              <div key={idx} className="mb-3 p-2 border-start border-secondary">
                <code className="text-secondary fw-bold">{prop.property}</code>
                <span className="badge bg-secondary ms-2">{prop.type}</span>
                {prop.options && (
                  <small className="text-muted ms-2">
                    Options: {prop.options.join(', ')}
                  </small>
                )}
                <br />
                <small className="text-muted">{prop.description}</small>
                {prop.example && (
                  <div className="mt-1">
                    <small className="text-success">Example: {prop.example}</small>
                  </div>
                )}
                {prop.properties && (
                  <div className="mt-2">
                    <small className="text-muted">Sub-properties:</small>
                    <ul className="mb-0 mt-1">
                      {prop.properties.map((subProp: SubProperty, subIdx: number) => (
                        <li key={subIdx}>
                          <code>{subProp.name}</code> ({subProp.type})
                          <br />
                          <small className="text-muted">{subProp.description}</small>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mb-4">
            <h6 className="text-danger">Advanced Features</h6>
            {configReference.features.map((prop, idx) => (
              <div key={idx} className="mb-3 p-2 border-start border-danger">
                <code className="text-danger fw-bold">{prop.property}</code>
                <span className="badge bg-secondary ms-2">{prop.type}</span>
                <br />
                <small className="text-muted">{prop.description}</small>
                {prop.properties && (
                  <div className="mt-2">
                    <small className="text-muted">Sub-properties:</small>
                    <ul className="mb-0 mt-1">
                      {prop.properties.map((subProp: SubProperty, subIdx: number) => (
                        <li key={subIdx}>
                          <code>{subProp.name}</code> ({subProp.type})
                          <br />
                          <small className="text-muted">{subProp.description}</small>
                          {subProp.example && <small className="text-success"> - {subProp.example}</small>}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mb-4">
            <h6 className="text-primary">Chart Configuration</h6>
            <small className="text-muted mb-2 d-block">Only used when mode is 'chart'</small>
            {configReference.chart.map((prop, idx) => (
              <div key={idx} className="mb-3 p-2 border-start border-primary">
                <code className="text-primary fw-bold">{prop.property}</code>
                <span className="badge bg-secondary ms-2">{prop.type}</span>
                <br />
                <small className="text-muted">{prop.description}</small>
                {prop.properties && (
                  <div className="mt-2">
                    <small className="text-muted">Sub-properties:</small>
                    <ul className="mb-0 mt-1">
                      {prop.properties.map((subProp: SubProperty, subIdx: number) => (
                        <li key={subIdx}>
                          <code>{subProp.name}</code> ({subProp.type})
                          {subProp.optional && <span className="text-muted"> - optional</span>}
                          {subProp.options && <span className="text-muted"> - {subProp.options.join(', ')}</span>}
                          <br />
                          <small className="text-muted">{subProp.description}</small>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Modal.Body>
      </Modal>
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
                      { name: 'department', label: 'Department', type: 'text' },
                      { name: 'activeUsers', label: 'Active Users', type: 'number' },
                      { name: 'totalUsers', label: 'Total Users', type: 'number' },
                    ],
                    styling: { compact: true, theme: 'light' },
                  }}
                  adapters={{
                    fetchData: async () => ({
                      data: [
                        { department: 'Engineering', activeUsers: 3, totalUsers: 4 },
                        { department: 'Design', activeUsers: 0, totalUsers: 1 },
                        { department: 'Business', activeUsers: 1, totalUsers: 1 },
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
                      { name: 'department', label: 'Department', type: 'text' },
                      { name: 'activeUsers', label: 'Active Users', type: 'number' },
                    ],
                    chartConfig: { type: 'bar', xAxis: 'department', yAxis: 'activeUsers' },
                    styling: { compact: true, theme: 'light' },
                  }}
                  adapters={{
                    fetchData: async () => ({
                      data: [
                        { department: 'Engineering', activeUsers: 3 },
                        { department: 'Design', activeUsers: 0 },
                        { department: 'Business', activeUsers: 1 },
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
            <h5 className="card-title">Team Directory</h5>
            <p className="text-muted">Browse users by department and role</p>
            <Widgemo
              config={{
                title: 'Team Members',
                mode: 'table',
                dataSource: { type: 'static' },
                fields: [
                  { name: 'name', label: 'Name', type: 'text' },
                  {
                    name: 'department', label: 'Department', type: 'select', options: [
                      { value: 'Engineering', label: 'Engineering' },
                      { value: 'Design', label: 'Design' },
                      { value: 'Business', label: 'Business' },
                    ]
                  },
                  { name: 'role', label: 'Role', type: 'text' },
                  { name: 'status', label: 'Active', type: 'boolean' },
                ],
                actions: { view: true },
                styling: { compact: true, theme: 'light' },
              }}
              adapters={{
                fetchData: async () => ({
                  data: teaserSampleData,
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
  const [activeSection, setActiveSection] = useState('teaser');
  const [currentTheme, setCurrentTheme] = useState(() => {
    // Detect system preference for light/dark theme
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'theme-dark' : 'theme-light';
    }
    return 'theme-light'; // fallback
  });

  // Determine if current theme should have dark teaser text
  const shouldHaveDarkTeaserText = currentTheme.startsWith('theme-light');

  // Handle scroll to update active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['teaser', 'gallery', 'sandbox', 'advanced', 'resources'];
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

      <TeaserSection
        onExploreGallery={() => scrollToSection('gallery')}
        onJumpToSandbox={() => scrollToSection('sandbox')}
        shouldHaveDarkText={shouldHaveDarkTeaserText}
      />

      <GallerySection />

      <SandboxSection />

      <AdvancedExamplesSection />

      <ResourcesSection />
    </div>
  );
}

export default App;
