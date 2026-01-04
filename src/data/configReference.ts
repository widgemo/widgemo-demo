// Configuration reference data for documentation and examples

export const configReference = {
  dataSource: {
    type: 'static' as const,
    // Note: For dynamic data sources, you would specify:
    // type: 'api',
    // url: 'https://api.example.com/data',
    // method: 'GET',
    // headers: { 'Authorization': 'Bearer token' },
  },
  fields: [
    {
      name: 'fieldName',
      label: 'Display Label',
      type: 'text' as const, // 'text' | 'number' | 'boolean' | 'date' | 'select' | 'textarea'
      required: false,
      sortable: true,
      filterable: true,
      options: [], // For select type: [{ value: 'option1', label: 'Option 1' }]
      validation: {
        min: 0, // For number
        max: 100, // For number
        pattern: '', // Regex pattern
        custom: null, // Custom validation function
      },
    },
  ],
  actions: {
    create: true,
    edit: true,
    delete: true,
    view: true,
    export: false,
    import: false,
  },
  pagination: {
    enabled: true,
    defaultPageSize: 10,
    pageSizeOptions: [5, 10, 25, 50],
  },
  sorting: {
    enabled: true,
    defaultSort: { field: 'name', direction: 'asc' as const },
  },
  filtering: {
    enabled: true,
    defaultFilters: [],
  },
  header: {
    always: ['refresh'], // Always visible buttons
    discoverable: ['viewToggle'], // Buttons shown on hover/focus
    onMenu: ['columnSelector', 'add'], // Buttons in dropdown menu
  },
  styling: {
    compact: false,
    shadow: true,
    showBorder: true,
    dynamicBackground: true,
    card: {
      shadow: true,
      showBorder: true,
      padding: 'md',
    },
    table: {
      striped: false,
      hover: true,
      borderless: false,
    },
  },
  chartConfig: {
    type: 'bar' as const, // 'bar' | 'line' | 'pie' | 'doughnut'
    xAxis: 'categoryField',
    yAxis: 'valueField',
    groupBy: 'groupField', // For grouped charts
    colors: ['#ff5722', '#2196f3', '#4caf50'], // Custom color palette
    showLegend: true,
    showGrid: true,
  },
  modals: {
    create: { size: 'md' as const },
    edit: { size: 'md' as const },
    delete: { size: 'sm' as const },
    view: { size: 'lg' as const },
  },
};

export const fieldTypes = [
  { value: 'text', label: 'Text' },
  { value: 'number', label: 'Number' },
  { value: 'boolean', label: 'Boolean' },
  { value: 'date', label: 'Date' },
  { value: 'select', label: 'Select' },
  { value: 'textarea', label: 'Textarea' },
];

export const chartTypes = [
  { value: 'bar', label: 'Bar Chart' },
  { value: 'line', label: 'Line Chart' },
  { value: 'pie', label: 'Pie Chart' },
  { value: 'doughnut', label: 'Doughnut Chart' },
];

export const viewModes = [
  { value: 'table', label: 'Table' },
  { value: 'cards', label: 'Cards' },
  { value: 'tiles', label: 'Tiles' },
  { value: 'chart', label: 'Chart' },
];

export const presetConfigs = {
  minimal: {
    title: 'Minimal',
    mode: 'table' as const,
    dataSource: { type: 'static' as const },
    fields: [
      { name: 'name', label: 'Name', type: 'text' as const },
      { name: 'value', label: 'Value', type: 'number' as const },
    ],
    header: { onMenu: ['refresh'] },
    styling: { compact: true },
  },
  standard: {
    title: 'Standard',
    mode: 'table' as const,
    dataSource: { type: 'static' as const },
    fields: [
      { name: 'id', label: 'ID', type: 'number' as const },
      { name: 'name', label: 'Name', type: 'text' as const },
      { name: 'status', label: 'Active', type: 'boolean' as const },
    ],
    actions: { create: true, edit: true, delete: true },
    header: { always: ['refresh'], onMenu: ['add'] },
    styling: { shadow: true },
  },
  advanced: {
    title: 'Advanced',
    mode: 'table' as const,
    dataSource: { type: 'static' as const },
    fields: [
      { name: 'id', label: 'ID', type: 'number' as const, sortable: true },
      { name: 'name', label: 'Name', type: 'text' as const, filterable: true },
      { name: 'category', label: 'Category', type: 'select' as const, options: [], filterable: true },
      { name: 'status', label: 'Active', type: 'boolean' as const, filterable: true },
      { name: 'createdAt', label: 'Created', type: 'date' as const, sortable: true },
    ],
    actions: { create: true, edit: true, delete: true },
    pagination: { enabled: true, defaultPageSize: 10 },
    sorting: { enabled: true },
    filtering: { enabled: true },
    header: { always: ['refresh'], discoverable: ['viewToggle'], onMenu: ['columnSelector', 'add'] },
    styling: { shadow: true },
  },
};