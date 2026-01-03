import React, { useState, useEffect, useCallback } from 'react';
import { Widgemo } from 'widgemo-core';
import type { WidgemoConfig, WidgemoAdapters } from 'widgemo-core';
import { Button, Container, Row, Col, Card, Nav, Navbar, Dropdown, Modal, Form, Alert } from 'react-bootstrap';
import { Panel, Group, Separator } from 'react-resizable-panels';
import { FaGithub, FaBook, FaPalette, FaCopy, FaDownload, FaUpload, FaRandom, FaExternalLinkAlt } from 'react-icons/fa';
import './App.css';

// Define types for sample data
interface SampleData extends Record<string, unknown> {
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
      title: 'Table',
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
      title: 'Cards',
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
      title: 'Tiles',
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
      title: 'Chart',
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
      title: 'Advanced',
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
              <Card.Body className="p-1">
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
const GallerySection: React.FC<{ onLoadToSandbox: (config: WidgemoConfig, data?: SampleData[]) => void }> = ({ onLoadToSandbox }) => (
  <DemoSection
    id="gallery"
    title="Gallery"
    subtitle="Explore different configurations and modes"
    className="bg-light"
  >
    <Row>
      {galleryConfigs.map((item, index) => (
        <Col lg={6} xl={4} key={index} className="mb-4">
          <Card
            className="h-100 shadow-sm hover-lift theme-aware-card"
            style={{ cursor: 'pointer' }}
            onClick={() => onLoadToSandbox(item.config)}
          >
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
                <small className="text-muted">Click to load in sandbox</small>
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  </DemoSection>
);

// Sandbox component with split view
const SandboxSection: React.FC<{
  initialConfig: WidgemoConfig;
  initialData: Record<string, unknown>[];
  onConfigChange: (config: WidgemoConfig) => void;
  onDataChange: (data: Record<string, unknown>[]) => void;
}> = ({ initialConfig, initialData, onConfigChange, onDataChange }) => {
  const [configJson, setConfigJson] = useState(JSON.stringify(initialConfig, null, 2));
  const [config, setConfig] = useState(initialConfig);
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [showReferenceModal, setShowReferenceModal] = useState(false);
  const [customData, setCustomData] = useState<Record<string, unknown>[]>(initialData);
  const [entityLabel, setEntityLabel] = useState('User');
  const [entityLabelPlural, setEntityLabelPlural] = useState('Users');
  const [exportStatus, setExportStatus] = useState<string | null>(null);
  const [showCodeSandboxModal, setShowCodeSandboxModal] = useState(false);
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [dataType, setDataType] = useState('users');
  const [recordCount, setRecordCount] = useState(10);
  const [adjustConfig, setAdjustConfig] = useState(false);
  const [customEndpoint, setCustomEndpoint] = useState('');

  // Generate random dataset
  const generateRandomData = useCallback(async (type: string, count: number, shouldAdjustConfig: boolean) => {
    let randomData: Record<string, unknown>[] = [];

    // Update entity labels based on data type
    const updateEntityLabels = (dataType: string) => {
      switch (dataType) {
        case 'users':
        case 'users-api':
          setEntityLabel('User');
          setEntityLabelPlural('Users');
          break;
        case 'sales':
          setEntityLabel('Sale');
          setEntityLabelPlural('Sales Records');
          break;
        case 'customers':
          setEntityLabel('Customer');
          setEntityLabelPlural('Customers');
          break;
        case 'posts-api':
          setEntityLabel('Post');
          setEntityLabelPlural('Posts');
          break;
        case 'users-jsonplaceholder':
          setEntityLabel('User');
          setEntityLabelPlural('Users');
          break;
        case 'posts-jsonplaceholder':
          setEntityLabel('Post');
          setEntityLabelPlural('Posts');
          break;
        case 'comments-jsonplaceholder':
          setEntityLabel('Comment');
          setEntityLabelPlural('Comments');
          break;
        case 'albums-jsonplaceholder':
          setEntityLabel('Album');
          setEntityLabelPlural('Albums');
          break;
        case 'photos-jsonplaceholder':
          setEntityLabel('Photo');
          setEntityLabelPlural('Photos');
          break;
        case 'todos-jsonplaceholder':
          setEntityLabel('Todo');
          setEntityLabelPlural('Todos');
          break;
        case 'custom-api': {
          const endpointName = customEndpoint.trim() || 'Custom';
          setEntityLabel(endpointName.charAt(0).toUpperCase() + endpointName.slice(1));
          setEntityLabelPlural(endpointName.charAt(0).toUpperCase() + endpointName.slice(1) + 's');
          break;
        }
        default:
          setEntityLabel('Record');
          setEntityLabelPlural('Records');
      }
    };

    updateEntityLabels(type);

    try {
      if (type === 'custom-api') {
        // Fetch from custom API endpoint
        if (!customEndpoint.trim()) {
          throw new Error('Please specify a custom API endpoint URL');
        }
        const response = await fetch(customEndpoint.trim());
        if (!response.ok) {
          throw new Error(`Failed to fetch from endpoint: ${customEndpoint}`);
        }
        const apiData: Record<string, unknown>[] = await response.json();
        randomData = Array.isArray(apiData) ? apiData.slice(0, count) : [apiData];
      } else if (type.endsWith('-jsonplaceholder')) {
        // Fetch from JSONPlaceholder
        const endpoint = type.replace('-jsonplaceholder', '');
        const response = await fetch(`https://jsonplaceholder.typicode.com/${endpoint}`);
        const apiData: Record<string, unknown>[] = await response.json();
        randomData = apiData.slice(0, count);
      } else {
        // Generate local data based on type
        const firstNames = ['Alice', 'Bob', 'Carol', 'David', 'Eva', 'Frank', 'Grace', 'Henry', 'Ivy', 'Jack'];
        const lastNames = ['Johnson', 'Smith', 'Williams', 'Brown', 'Davis', 'Miller', 'Wilson', 'Moore', 'Taylor', 'Anderson'];

        if (type === 'users') {
          const departments = ['Engineering', 'Design', 'Business', 'Marketing', 'Sales'];
          const roles = ['Manager', 'Developer', 'Designer', 'Analyst', 'Coordinator'];

          randomData = Array.from({ length: count }, (_, i) => ({
            id: i + 1,
            name: `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`,
            email: `${firstNames[Math.floor(Math.random() * firstNames.length)].toLowerCase()}.${lastNames[Math.floor(Math.random() * lastNames.length)].toLowerCase()}@company.com`,
            role: roles[Math.floor(Math.random() * roles.length)],
            department: departments[Math.floor(Math.random() * departments.length)],
            status: Math.random() > 0.3,
            lastLogin: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          }));
        } else if (type === 'sales') {
          const products = ['Widget A', 'Widget B', 'Service X', 'Service Y', 'Package Z'];
          const regions = ['North', 'South', 'East', 'West', 'Central'];
          const statuses = ['Pending', 'Completed', 'Cancelled'];

          randomData = Array.from({ length: count }, (_, i) => ({
            id: i + 1,
            product: products[Math.floor(Math.random() * products.length)],
            amount: Math.floor(Math.random() * 10000) + 100,
            region: regions[Math.floor(Math.random() * regions.length)],
            status: statuses[Math.floor(Math.random() * statuses.length)],
            date: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            customer: `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`,
          }));
        } else if (type === 'customers') {
          const industries = ['Technology', 'Healthcare', 'Finance', 'Retail', 'Manufacturing'];
          const sizes = ['Small', 'Medium', 'Large', 'Enterprise'];
          const statuses = ['Active', 'Inactive', 'Prospect'];

          randomData = Array.from({ length: count }, (_, i) => {
            const name = `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
            return {
              id: i + 1,
              name: name,
              email: `${name.split(' ')[0].toLowerCase()}.${name.split(' ')[1].toLowerCase()}@company.com`,
              company: `${name.split(' ')[1]} ${industries[Math.floor(Math.random() * industries.length)]}`,
              industry: industries[Math.floor(Math.random() * industries.length)],
              size: sizes[Math.floor(Math.random() * sizes.length)],
              status: statuses[Math.floor(Math.random() * statuses.length)],
              lastContact: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            };
          });
        }
      }

      setCustomData(randomData);
      onDataChange(randomData);
      setExportStatus('Data generated successfully!');
      setTimeout(() => setExportStatus(null), 3000);

      // Adjust configuration if requested
      if (shouldAdjustConfig && randomData.length > 0) {
        const sampleRecord = randomData[0] as Record<string, unknown>;
        const fields = Object.keys(sampleRecord).map(key => {
          const value = sampleRecord[key];
          let fieldType: string = 'text';
          
          if (typeof value === 'number') fieldType = 'number';
          else if (typeof value === 'boolean') fieldType = 'boolean';
          else if (value && typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)) fieldType = 'date';
          else if (value && typeof value === 'string' && value.includes('@')) fieldType = 'email';

          return {
            name: key,
            label: key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1'),
            type: fieldType,
            sortable: fieldType !== 'boolean',
            filterable: true
          };
        });

        // Get appropriate title based on data type
        const getTitleForType = (dataType: string) => {
          switch (dataType) {
            case 'users':
            case 'users-api':
            case 'users-jsonplaceholder':
              return 'User Management';
            case 'sales':
              return 'Sales Records';
            case 'customers':
              return 'Customer Management';
            case 'posts-api':
            case 'posts-jsonplaceholder':
              return 'Blog Posts';
            case 'comments-jsonplaceholder':
              return 'Comments';
            case 'albums-jsonplaceholder':
              return 'Photo Albums';
            case 'photos-jsonplaceholder':
              return 'Photos';
            case 'todos-jsonplaceholder':
              return 'Todo Items';
            case 'custom-api': {
              const endpointName = customEndpoint.trim() || 'Custom';
              return endpointName.charAt(0).toUpperCase() + endpointName.slice(1) + ' Data';
            }
            default:
              return 'Data Management';
          }
        };

        const newConfig = {
          ...JSON.parse(configJson),
          title: getTitleForType(type),
          fields: fields
        };

        const newConfigJson = JSON.stringify(newConfig, null, 2);
        setConfigJson(newConfigJson);
        setConfig(newConfig);
        onConfigChange(newConfig);
      }

      return randomData;
    } catch (error) {
      console.error('Error generating data:', error);
      setExportStatus('Error generating data. Using local generation.');
      setTimeout(() => setExportStatus(null), 3000);
      
      // Fallback to local generation
      const fallbackData = Array.from({ length: count }, (_, i) => ({
        id: i + 1,
        name: `User ${i + 1}`,
        email: `user${i + 1}@company.com`,
        role: 'User',
        department: 'General',
        status: Math.random() > 0.3,
        lastLogin: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      }));
      setCustomData(fallbackData);
      onDataChange(fallbackData);
      return fallbackData;
    }
  }, [configJson, onConfigChange, onDataChange, customEndpoint]);

  // Handle file upload
  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const jsonData = JSON.parse(e.target?.result as string);
        if (Array.isArray(jsonData)) {
          setCustomData(jsonData as Record<string, unknown>[]);
          onDataChange(jsonData as Record<string, unknown>[]);
          setExportStatus('Data uploaded successfully!');
          setTimeout(() => setExportStatus(null), 3000);
        } else {
          setExportStatus('Error: Data must be an array of objects');
          setTimeout(() => setExportStatus(null), 3000);
        }
      } catch {
        setExportStatus('Error: Invalid JSON file');
        setTimeout(() => setExportStatus(null), 3000);
      }
    };
    reader.readAsText(file);
    // Reset file input
    event.target.value = '';
  }, [onDataChange]);

  // Copy JSON to clipboard
  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(configJson);
      setExportStatus('Configuration copied to clipboard!');
      setTimeout(() => setExportStatus(null), 3000);
    } catch {
      // Fallback for browsers that don't support clipboard API or require user interaction
      try {
        const textArea = document.createElement('textarea');
        textArea.value = configJson;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setExportStatus('Configuration copied to clipboard!');
        setTimeout(() => setExportStatus(null), 3000);
      } catch {
        setExportStatus('Failed to copy to clipboard');
        setTimeout(() => setExportStatus(null), 3000);
      }
    }
  }, [configJson]);

  // Generate CodeSandbox link
  const generateCodeSandboxLink = useCallback(() => {
    const sandboxConfig = {
      title: 'Widgemo Demo',
      description: 'Interactive Widgemo configuration demo',
      template: 'react',
      files: {
        'index.js': {
          content: `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);`
        },
        'App.js': {
          content: `import React, { useState } from 'react';
import { Widgemo } from 'widgemo-core';

function App() {
  const [data] = useState(${JSON.stringify(customData, null, 2)});
  
  const config = ${configJson};
  
  const adapters = {
    fetchData: async () => ({ data, total: data.length }),
    createRecord: async (record) => ({ ...record, id: Date.now() }),
    updateRecord: async (id, record) => record,
    deleteRecord: async () => {},
  };

  return (
    <div className="container mt-4">
      <h1>Widgemo ${entityLabel} Management</h1>
      <Widgemo config={config} adapters={adapters} />
    </div>
  );
}

export default App;`
        },
        'package.json': {
          content: JSON.stringify({
            name: 'widgemo-demo',
            version: '0.1.0',
            dependencies: {
              'react': '^18.0.0',
              'react-dom': '^18.0.0',
              'widgemo-core': 'latest',
              'bootstrap': '^5.3.0'
            }
          }, null, 2)
        },
        'index.html': {
          content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Widgemo Demo</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
  <div id="root"></div>
</body>
</html>`
        }
      }
    };

    // Base64 encode the sandbox configuration
    const encodedConfig = btoa(JSON.stringify(sandboxConfig));
    const codesandboxUrl = `https://codesandbox.io/api/v1/sandboxes/define?parameters=${encodeURIComponent(encodedConfig)}`;

    // Open in new tab
    window.open(codesandboxUrl, '_blank');
  }, [configJson, customData, entityLabel]);

  // Download config as JSON file
  const downloadConfig = useCallback(() => {
    const blob = new Blob([configJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'widgemo-config.json';
    link.click();
    URL.revokeObjectURL(url);
  }, [configJson]);

  // Show CodeSandbox modal
  const showCodeSandboxModalHandler = useCallback(() => {
    setShowCodeSandboxModal(true);
  }, []);

  // Dynamic adapters that use custom data
  const dynamicAdapters: WidgemoAdapters = {
    fetchData: async () => ({
      data: customData,
      total: customData.length,
    }),
    createRecord: async (record: Record<string, unknown>) => ({ ...record, id: Date.now() }),
    updateRecord: async (_id: unknown, record: Record<string, unknown>) => record,
    deleteRecord: async () => {},
  };

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
      onConfigChange(parsed);
      setJsonError(null);
    } catch (error) {
      setJsonError((error as Error).message);
    }
  };

  // Sync with initial props
  useEffect(() => {
    setConfig(initialConfig);
    setConfigJson(JSON.stringify(initialConfig, null, 2));
  }, [initialConfig]);

  useEffect(() => {
    setCustomData(initialData);
  }, [initialData]);

  const loadPreset = (presetConfig: WidgemoConfig, presetTitle?: string) => {
    const json = JSON.stringify(presetConfig, null, 2);
    const titleComment = presetTitle ? `// ${presetTitle}\n` : '';
    const commentedJson = `${titleComment}${json}`;
    setConfigJson(commentedJson);
    setConfig(presetConfig);
    onConfigChange(presetConfig);
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
      <Card className="shadow theme-aware-card p-1">
        <Card.Body className="p-0">
          <Group>
            <Panel defaultSize={35} minSize={30}>
              <div className="p-4 h-100 d-flex flex-column">
                {/* Export Status */}
                {exportStatus && (
                  <Alert variant={exportStatus.includes('Error') ? 'danger' : 'success'} className="py-2 mb-3">
                    {exportStatus}
                  </Alert>
                )}

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
                <div className="d-flex gap-2">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={applyConfig}
                    disabled={!!jsonError}
                    className="flex-grow-1"
                  >
                    Apply Changes
                  </Button>
                  <Dropdown>
                    <Dropdown.Toggle variant="outline-secondary" size="sm" id="export-dropdown">
                      <FaDownload className="me-1" />
                      Export
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={copyToClipboard}>
                        <FaCopy className="me-2" />
                        Copy JSON
                      </Dropdown.Item>
                      <Dropdown.Item onClick={downloadConfig}>
                        <FaDownload className="me-2" />
                        Download JSON
                      </Dropdown.Item>
                      <Dropdown.Item onClick={showCodeSandboxModalHandler}>
                        <FaExternalLinkAlt className="me-2" />
                        CodeSandbox
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>

                {/* Data Management */}
                <div className="mt-3">
                  <h6 className="mb-2">Change Widgemo Source Data</h6>
                  <div className="d-flex gap-2 flex-wrap">
                    <Button
                      variant="outline-success"
                      size="sm"
                      onClick={() => setShowGenerateModal(true)}
                    >
                      <FaRandom className="me-1" />
                      Generate Random
                    </Button>
                    <Form.Control
                      type="file"
                      accept=".json"
                      onChange={handleFileUpload}
                      style={{ display: 'none' }}
                      id="data-upload"
                    />
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => document.getElementById('data-upload')?.click()}
                    >
                      <FaUpload className="me-1" />
                      Upload JSON
                    </Button>
                    <small className="text-muted align-self-center">
                      {customData.length} {entityLabelPlural.toLowerCase()}
                    </small>
                  </div>
                </div>
              </div>
            </Panel>
            <Separator className="bg-secondary" style={{ width: '1.5px' }} />
            <Panel defaultSize={65} minSize={30}>
              <div className="p-4 h-100">
                <h5 className="mb-3">Live Preview</h5>
                <div style={{ maxHeight: 'calc(100vh - 300px)', overflow: 'auto' }}>
                  <Widgemo
                    config={config}
                    adapters={dynamicAdapters}
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

          <div className="mb-4">
            <h6 className="text-info">Data Format Examples</h6>
            <small className="text-muted mb-3 d-block">JSON structure examples for uploading custom data</small>

            <div className="mb-3">
              <h6 className="text-info">Users Data</h6>
              <pre className="bg-light p-2 rounded small"><code>{`[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john.doe@company.com",
    "role": "Developer",
    "department": "Engineering",
    "status": true,
    "lastLogin": "2024-01-15"
  },
  {
    "id": 2,
    "name": "Jane Smith",
    "email": "jane.smith@company.com",
    "role": "Designer",
    "department": "Design",
    "status": false,
    "lastLogin": "2024-01-10"
  }
]`}</code></pre>
            </div>

            <div className="mb-3">
              <h6 className="text-info">Sales Records</h6>
              <pre className="bg-light p-2 rounded small"><code>{`[
  {
    "id": 1,
    "product": "Widget A",
    "amount": 1250.50,
    "region": "North",
    "status": "Completed",
    "date": "2024-01-15",
    "customer": "ABC Corp"
  },
  {
    "id": 2,
    "product": "Service X",
    "amount": 850.00,
    "region": "South",
    "status": "Pending",
    "date": "2024-01-14",
    "customer": "XYZ Ltd"
  }
]`}</code></pre>
            </div>

            <div className="mb-3">
              <h6 className="text-info">Customer Data</h6>
              <pre className="bg-light p-2 rounded small"><code>{`[
  {
    "id": 1,
    "name": "Alice Johnson",
    "email": "alice@company.com",
    "company": "Tech Solutions Inc",
    "industry": "Technology",
    "size": "Medium",
    "status": "Active",
    "lastContact": "2024-01-12"
  },
  {
    "id": 2,
    "name": "Bob Wilson",
    "email": "bob@enterprise.com",
    "company": "Global Corp",
    "industry": "Finance",
    "size": "Large",
    "status": "Active",
    "lastContact": "2024-01-10"
  }
]`}</code></pre>
            </div>

            <div className="mb-3">
              <h6 className="text-info">Blog Posts</h6>
              <pre className="bg-light p-2 rounded small"><code>{`[
  {
    "id": 1,
    "title": "Getting Started with React",
    "body": "React is a popular JavaScript library...",
    "author": "John Doe",
    "email": "john@example.com",
    "status": true,
    "createdAt": "2024-01-15"
  },
  {
    "id": 2,
    "title": "Advanced TypeScript Tips",
    "body": "TypeScript provides excellent type safety...",
    "author": "Jane Smith",
    "email": "jane@example.com",
    "status": true,
    "createdAt": "2024-01-14"
  }
]`}</code></pre>
            </div>

            <div className="mb-3">
              <h6 className="text-info">API Data Sources</h6>
              <p className="small text-muted mb-2">
                <strong>JSONPlaceholder Options:</strong> The dropdown includes direct options for all JSONPlaceholder endpoints (users, posts, comments, albums, photos, todos) that fetch real sample data.
              </p>
              <p className="small text-muted mb-2">
                <strong>Custom API Endpoint:</strong> For testing with external APIs, select "Custom API Endpoint" and provide a full URL (e.g., https://api.github.com/users, https://jsonplaceholder.typicode.com/comments).
                The system will attempt to fetch and display data from any valid JSON API endpoint.
              </p>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        show={showCodeSandboxModal}
        onHide={() => setShowCodeSandboxModal(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Export to CodeSandbox</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-muted mb-3">
            Customize the entity labels for your CodeSandbox demo:
          </p>
          <div className="mb-3">
            <label className="form-label">Entity Label (singular)</label>
            <Form.Control
              placeholder="e.g., User, Product, Task"
              value={entityLabel}
              onChange={(e) => setEntityLabel(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Entity Label (plural)</label>
            <Form.Control
              placeholder="e.g., Users, Products, Tasks"
              value={entityLabelPlural}
              onChange={(e) => setEntityLabelPlural(e.target.value)}
            />
          </div>
          <div className="alert alert-info">
            <small>
              This will generate a live CodeSandbox demo with your current configuration and data.
              The demo will include a title like "Widgemo {entityLabel} Management".
            </small>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCodeSandboxModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => { generateCodeSandboxLink(); setShowCodeSandboxModal(false); }}>
            <FaExternalLinkAlt className="me-2" />
            Generate CodeSandbox
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showGenerateModal}
        onHide={() => setShowGenerateModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Generate Random Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label className="form-label">Data Type</label>
            <Form.Select value={dataType} onChange={(e) => setDataType(e.target.value)}>
              <option value="users">Users (Local)</option>
              <option value="sales">Sales Records (Local)</option>
              <option value="customers">Customers (Local)</option>
              <option value="users-jsonplaceholder">Users (JSONPlaceholder)</option>
              <option value="posts-jsonplaceholder">Posts (JSONPlaceholder)</option>
              <option value="comments-jsonplaceholder">Comments (JSONPlaceholder)</option>
              <option value="albums-jsonplaceholder">Albums (JSONPlaceholder)</option>
              <option value="photos-jsonplaceholder">Photos (JSONPlaceholder)</option>
              <option value="todos-jsonplaceholder">Todos (JSONPlaceholder)</option>
              <option value="custom-api">Custom API Endpoint</option>
            </Form.Select>
          </div>
          {(dataType === 'custom-api' || dataType.endsWith('-jsonplaceholder')) && (
            <div className="mb-3">
              <label className="form-label">
                {dataType === 'custom-api' ? 'API Endpoint URL' : 'JSONPlaceholder Endpoint'}
              </label>
              <Form.Control
                type="text"
                placeholder={
                  dataType === 'custom-api'
                    ? 'e.g., https://api.example.com/users'
                    : dataType.replace('-jsonplaceholder', '')
                }
                value={customEndpoint}
                onChange={(e) => setCustomEndpoint(e.target.value)}
                className="mb-2"
              />
              <small className="text-muted">
                {dataType === 'custom-api'
                  ? 'Enter a full API endpoint URL to fetch data from any system'
                  : `This will fetch from https://jsonplaceholder.typicode.com/${dataType.replace('-jsonplaceholder', '')}`
                }
              </small>
            </div>
          )}
          <div className="mb-3">
            <label className="form-label">Number of Records</label>
            <Form.Control
              type="number"
              min="1"
              max="100"
              value={recordCount}
              onChange={(e) => setRecordCount(parseInt(e.target.value) || 10)}
            />
          </div>
          <div className="mb-3">
            <Form.Check
              type="checkbox"
              label="Adjust current configuration to match generated data fields"
              checked={adjustConfig}
              onChange={(e) => setAdjustConfig(e.target.checked)}
            />
          </div>
          <div className="alert alert-info">
            <small>
              <strong>Local options</strong> generate synthetic data. <strong>JSONPlaceholder options</strong> fetch real sample data from jsonplaceholder.typicode.com.
              <strong>Custom API Endpoint</strong> allows you to test with any external API by providing a full URL (e.g., https://api.example.com/users).
              Adjusting configuration will update the fields in your current setup to match the generated data structure.
            </small>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowGenerateModal(false)}>
            Cancel
          </Button>
          <Button 
            variant="primary" 
            onClick={() => { 
              generateRandomData(dataType, recordCount, adjustConfig); 
              setShowGenerateModal(false); 
            }}
          >
            <FaRandom className="me-2" />
            Generate Data
          </Button>
        </Modal.Footer>
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
          <Card.Body className='p-1'>
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
          <Card.Body className='p-1'>
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

  // Sandbox state management
  const [sandboxConfig, setSandboxConfig] = useState(defaultSandboxConfig);
  const [sandboxData, setSandboxData] = useState<Record<string, unknown>[]>(teaserSampleData);

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

  // Gallery integration callbacks
  const loadConfigToSandbox = (config: WidgemoConfig, data?: SampleData[]) => {
    setSandboxConfig(config);
    if (data) {
      setSandboxData(data as Record<string, unknown>[]);
    }
    scrollToSection('sandbox');
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

      <GallerySection onLoadToSandbox={loadConfigToSandbox} />

      <SandboxSection
        initialConfig={sandboxConfig}
        initialData={sandboxData}
        onConfigChange={setSandboxConfig}
        onDataChange={setSandboxData}
      />

      <AdvancedExamplesSection />

      <ResourcesSection />
    </div>
  );
}

export default App;
