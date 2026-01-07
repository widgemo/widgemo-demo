// Configuration reference data for documentation and examples

// Existing fieldTypes, chartTypes, viewModes, presetConfigs remain unchanged...

// New: Comprehensive property references for the Reference modal
export const widgemoConfigProperties: Array<{
  category: string;
  property: string;
  type: string;
  status: 'implemented' | 'partial' | 'not-implemented';
  description: string;
  usage: string;
  example?: string;
}> = [
  // WidgemoConfig properties
  { category: 'WidgemoConfig', property: 'id', type: 'string', status: 'implemented', description: 'Optional ID for debugging/configuration management', usage: 'Used for component identification but not extensively in logic.', example: '"my-widgemo"' },
  { category: 'WidgemoConfig', property: 'title', type: 'string', status: 'implemented', description: 'Title displayed in the component header', usage: 'Rendered in WidgemoHeader.tsx.', example: '"User Management"' },
  { category: 'WidgemoConfig', property: 'mode', type: "'table' | 'board' | 'grid' | 'chart'", status: 'implemented', description: 'Display mode for data', usage: "Controls rendering in Widgemo.tsx; 'table', 'board', 'grid' fully supported; 'chart' partially via ChartView.tsx.", example: "'table'" },
  { category: 'WidgemoConfig', property: 'defaultMode', type: "Same as mode", status: 'implemented', description: 'Default view mode', usage: 'Sets initial mode if mode not specified.', example: "'table'" },
  { category: 'WidgemoConfig', property: 'collapsible', type: "'collapsed' | 'expanded' | 'fixed'", status: 'implemented', description: 'Collapsibility of the component', usage: 'Handled in Widgemo.tsx with toggle logic.', example: "'expanded'" },
  { category: 'WidgemoConfig', property: 'tableName', type: 'string', status: 'implemented', description: 'Table name for database operations', usage: 'Passed to modals for CRUD operations.', example: '"users"' },
  { category: 'WidgemoConfig', property: 'customComponent', type: 'React.ComponentType<any>', status: 'not-implemented', description: 'Custom component for rendering records', usage: 'Not implemented: Property exists but not used in rendering logic.', example: 'MyCustomComponent' },
  { category: 'WidgemoConfig', property: 'drillDown', type: '(record: any) => void', status: 'not-implemented', description: 'Drill-down function for navigation', usage: 'Partially implemented: Property exists, but no UI triggers or full integration.', example: '(record) => console.log(record)' },
  { category: 'WidgemoConfig', property: 'dataSource', type: "{ type?: 'static' | 'api' | 'graphql' | 'custom'; config?: Record<string, any> }", status: 'partial', description: 'Data source configuration', usage: "Used to determine data fetching; 'api' handled in useWidgemoData.ts.", example: "{ type: 'api', config: { url: '/api/users' } }" },
  { category: 'WidgemoConfig', property: 'fields', type: 'FieldConfig[]', status: 'implemented', description: 'Field definitions', usage: 'Core to rendering in views like TableView.tsx.', example: "[{ name: 'id', label: 'ID', type: 'text' }]" },
  { category: 'WidgemoConfig', property: 'actions', type: "{ create?: boolean; edit?: boolean; delete?: boolean; view?: boolean; custom?: Array<{...}> }", status: 'partial', description: 'Action configuration', usage: 'CRUD modals exist; custom actions not fully wired.', example: "{ create: true, edit: true }" },
  { category: 'WidgemoConfig', property: 'chartConfig', type: "{ type: 'bar' | 'line' | 'pie' | 'area' | 'scatter'; xAxis?: string; yAxis?: string | string[]; groupBy?: string; settings?: Record<string, any> }", status: 'partial', description: 'Chart-specific config', usage: 'Basic types via Recharts in ChartView.tsx; advanced features like groupBy not implemented.', example: "{ type: 'bar', xAxis: 'name', yAxis: 'value' }" },
  { category: 'WidgemoConfig', property: 'pagination', type: '{ enabled?: boolean; defaultPageSize?: number; pageSizeOptions?: number[] }', status: 'implemented', description: 'Pagination config', usage: 'Handled with PaginationControls.tsx.', example: '{ enabled: true, defaultPageSize: 10 }' },
  { category: 'WidgemoConfig', property: 'sorting', type: "{ enabled?: boolean; defaultSort?: { field: string; direction: 'asc' | 'desc' } }", status: 'partial', description: 'Sorting config', usage: 'Default sort applied; UI toggles incomplete.', example: "{ enabled: true, defaultSort: { field: 'name', direction: 'asc' } }" },
  { category: 'WidgemoConfig', property: 'filtering', type: '{ enabled?: boolean; filters?: Array<{...}> }', status: 'not-implemented', description: 'Filtering config', usage: 'Not implemented: Property defined but no filtering UI.', example: '{ enabled: true }' },
  { category: 'WidgemoConfig', property: 'styling', type: 'Complex object for theming', status: 'partial', description: 'Styling options (global, table, card, etc.)', usage: 'Applied in views; not all sub-properties fully supported.', example: '{ theme: "dark", compact: true }' },
  { category: 'WidgemoConfig', property: 'emptyState', type: '{ message?: string; icon?: React.ComponentType; action?: {...} }', status: 'implemented', description: 'Empty state config', usage: 'Custom empty component in Widgemo.tsx.', example: '{ message: "No data", action: { label: "Add", onClick: () => {} } }' },
  { category: 'WidgemoConfig', property: 'i18n', type: '{ locale?: string; messages?: Record<string, string> }', status: 'not-implemented', description: 'Internationalization', usage: 'Not implemented: Property exists but no localization logic.', example: '{ locale: "en", messages: { add: "Add Item" } }' },
  { category: 'WidgemoConfig', property: 'header', type: '{ discoverable?: string[]; always?: string[]; onMenu?: string[]; includeDeleted?: boolean }', status: 'partial', description: 'Header config', usage: 'Button arrays handled in WidgemoHeader.tsx; onMenu and includeDeleted not fully.', example: '{ always: ["refresh"], discoverable: ["add"] }' },
  { category: 'WidgemoConfig', property: 'labels', type: '{ add?: string; empty?: string; loading?: string; refresh?: string; actions?: string }', status: 'partial', description: 'UI labels', usage: 'Some used in components; not all customizable.', example: '{ add: "Create New" }' },
  { category: 'WidgemoConfig', property: 'imagesConfig', type: '{ field?: string; fit?: ...; lazy?: boolean; altFn?: (item: any) => string; ... }', status: 'implemented', description: 'Image configuration', usage: 'Used in ImageRenderer.tsx for rendering images in views.', example: '{ field: "src", fit: "cover" }' },

  // WidgemoProps properties
  { category: 'WidgemoProps', property: 'config', type: 'WidgemoConfig', status: 'implemented', description: 'Configuration object', usage: 'Core to component behavior.', example: '{ title: "Data", mode: "table" }' },
  { category: 'WidgemoProps', property: 'adapters', type: 'WidgemoAdapters', status: 'implemented', description: 'Data operation adapters', usage: 'Used for fetch/create/update/delete in useWidgemoData.ts.', example: '{ fetchData: async () => ({ data: [] }) }' },
  { category: 'WidgemoProps', property: 'overrides', type: 'Partial<WidgemoConfig>', status: 'implemented', description: 'Runtime configuration overrides', usage: 'Merged with config in Widgemo.tsx.', example: '{ title: "Override Title" }' },
  { category: 'WidgemoProps', property: 'className', type: 'string', status: 'implemented', description: 'Additional CSS class', usage: 'Applied to root element.', example: '"my-custom-class"' },
  { category: 'WidgemoProps', property: 'style', type: 'React.CSSProperties', status: 'implemented', description: 'Custom styling', usage: 'Applied to root element.', example: '{ backgroundColor: "red" }' },
  { category: 'WidgemoProps', property: 'loading', type: 'boolean', status: 'implemented', description: 'External loading state', usage: 'Overrides internal loading.', example: 'true' },
  { category: 'WidgemoProps', property: 'error', type: 'string | Error', status: 'implemented', description: 'External error state', usage: 'Overrides internal error.', example: '"Network error"' },
  { category: 'WidgemoProps', property: 'onReady', type: '() => void', status: 'implemented', description: 'Ready callback', usage: 'Called after initial data fetch.', example: '() => console.log("Ready")' },
  { category: 'WidgemoProps', property: 'onDataChange', type: '(data: any[]) => void', status: 'implemented', description: 'Data change callback', usage: 'Triggered on data updates.', example: '(data) => console.log(data)' },
  { category: 'WidgemoProps', property: 'onRecordSelect', type: '(record: any) => void', status: 'not-implemented', description: 'Record select callback', usage: 'Not implemented: Property exists but no selection logic.', example: '(record) => console.log(record)' },
  { category: 'WidgemoProps', property: 'onCustomAction', type: '(action: string, record?: any) => void', status: 'partial', description: 'Custom action callback', usage: 'Partially implemented: For actions, but not fully wired.', example: '(action, record) => console.log(action)' },
  { category: 'WidgemoProps', property: 'customLoading', type: 'React.ComponentType<{...}>', status: 'implemented', description: 'Custom loading component', usage: 'Used in Widgemo.tsx.', example: 'MyLoadingComponent' },
  { category: 'WidgemoProps', property: 'customError', type: 'React.ComponentType<{...}>', status: 'implemented', description: 'Custom error component', usage: 'Used with retry logic.', example: 'MyErrorComponent' },
  { category: 'WidgemoProps', property: 'customEmpty', type: 'React.ComponentType<{...}>', status: 'implemented', description: 'Custom empty component', usage: 'Used for empty states.', example: 'MyEmptyComponent' },
  { category: 'WidgemoProps', property: 'baseColor', type: 'string', status: 'implemented', description: 'Base color for contrast', usage: 'Used in background calculation.', example: '"#ffffff"' },
  { category: 'WidgemoProps', property: 'autoContrast', type: 'boolean', status: 'implemented', description: 'Enable contrast adjustment', usage: 'Defaults to true.', example: 'true' },
  { category: 'WidgemoProps', property: 'contrastAmount', type: 'number', status: 'implemented', description: 'Contrast amount', usage: 'Used in background calculation.', example: '0.05' },
  { category: 'WidgemoProps', property: 'overrideBackground', type: 'string', status: 'implemented', description: 'Manual background override', usage: 'Highest priority.', example: '"#f0f0f0"' },
  { category: 'WidgemoProps', property: 'showConfigDetails', type: 'boolean', status: 'implemented', description: 'Show config details button', usage: 'Adds button in header.', example: 'true' },
  { category: 'WidgemoProps', property: 'imagesConfig', type: '{...}', status: 'implemented', description: 'Image configuration', usage: 'Passed to views for image handling.', example: '{ field: "image" }' },

  // WidgemoAdapters properties
  { category: 'WidgemoAdapters', property: 'fetchData', type: 'Function', status: 'implemented', description: 'Fetch data with params', usage: 'Core data fetching in useWidgemoData.ts.', example: 'async (params) => ({ data: [], total: 0 })' },
  { category: 'WidgemoAdapters', property: 'createRecord', type: 'Function', status: 'implemented', description: 'Create record', usage: 'Used in add modal.', example: 'async (record) => ({ id: 1, ...record })' },
  { category: 'WidgemoAdapters', property: 'updateRecord', type: 'Function', status: 'implemented', description: 'Update record', usage: 'Used in edit modal.', example: 'async (id, record) => record' },
  { category: 'WidgemoAdapters', property: 'deleteRecord', type: 'Function', status: 'implemented', description: 'Delete record', usage: 'Used in delete action.', example: 'async (id) => {}' },
  { category: 'WidgemoAdapters', property: 'fetchConfig', type: 'Function', status: 'not-implemented', description: 'Fetch dynamic config', usage: 'Not implemented: Property exists but not used.', example: 'async (configId) => ({})' },
  { category: 'WidgemoAdapters', property: 'getAuthToken', type: 'Function', status: 'not-implemented', description: 'Auth token provider', usage: 'Not implemented: Property exists but no auth logic.', example: 'async () => "token"' },
  { category: 'WidgemoAdapters', property: 'onError', type: 'Function', status: 'implemented', description: 'Error handler', usage: 'Called on errors.', example: '(error) => console.error(error)' },
  { category: 'WidgemoAdapters', property: 'onSuccess', type: 'Function', status: 'implemented', description: 'Success handler', usage: 'Called on successes.', example: '(message, data) => console.log(message)' },

  // FieldConfig properties
  { category: 'FieldConfig', property: 'name', type: 'string', status: 'implemented', description: 'Unique field name', usage: 'Used in rendering and data mapping.', example: '"id"' },
  { category: 'FieldConfig', property: 'label', type: 'string', status: 'implemented', description: 'Human-readable label', usage: 'Displayed in headers/labels.', example: '"ID"' },
  { category: 'FieldConfig', property: 'type', type: "'text' | 'number' | 'date' | 'boolean' | 'select' | 'relation' | 'textarea' | 'email' | 'url'", status: 'partial', description: 'Data type', usage: "Basic types rendered; 'relation', 'textarea' not fully.", example: "'text'" },
  { category: 'FieldConfig', property: 'options', type: 'Array<{ value: any; label: string }>', status: 'implemented', description: 'Options for select/relation', usage: 'For select fields.', example: '[{ value: "active", label: "Active" }]' },
  { category: 'FieldConfig', property: 'validation', type: 'Object', status: 'not-implemented', description: 'Validation rules', usage: 'Not implemented: Property exists but no validation logic.', example: '{ required: true }' },
  { category: 'FieldConfig', property: 'render', type: 'Object', status: 'not-implemented', description: 'Custom rendering', usage: 'Not implemented: Property exists but not used.', example: '{ component: MyComponent }' },
  { category: 'FieldConfig', property: 'renderAs', type: "'text' | 'boolean' | 'select' | 'custom'", status: 'not-implemented', description: 'Render type', usage: 'Defaults to type.', example: "'boolean'" },
  { category: 'FieldConfig', property: 'booleanTrueLabel', type: 'string', status: 'implemented', description: 'True label for booleans', usage: 'Used in rendering.', example: '"Yes"' },
  { category: 'FieldConfig', property: 'booleanFalseLabel', type: 'string', status: 'implemented', description: 'False label for booleans', usage: 'Used in rendering.', example: '"No"' },
  { category: 'FieldConfig', property: 'sortable', type: 'boolean', status: 'not-implemented', description: 'Sortable flag', usage: 'Flag exists, but sorting UI incomplete.', example: 'true' },
  { category: 'FieldConfig', property: 'filterable', type: 'boolean', status: 'not-implemented', description: 'Filterable flag', usage: 'Not implemented: Flag exists, no filtering.', example: 'true' },
  { category: 'FieldConfig', property: 'editable', type: 'boolean', status: 'implemented', description: 'Editable flag', usage: 'Used in modals.', example: 'true' },
  { category: 'FieldConfig', property: 'visible', type: 'boolean', status: 'implemented', description: 'Visibility flag', usage: 'Controls display.', example: 'true' },
  { category: 'FieldConfig', property: 'width', type: 'number | string', status: 'not-implemented', description: 'Width in table', usage: 'Not implemented in table view.', example: '100' },
  { category: 'FieldConfig', property: 'align', type: "'left' | 'center' | 'right'", status: 'implemented', description: 'Text alignment', usage: 'Applied in table cells.', example: "'center'" },
  { category: 'FieldConfig', property: 'showLabel', type: 'boolean', status: 'implemented', description: 'Show label in cards', usage: 'For card views.', example: 'true' },
];

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
  { value: 'board', label: 'Board' },
  { value: 'grid', label: 'Grid' },
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