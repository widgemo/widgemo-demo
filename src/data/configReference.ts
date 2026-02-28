// Configuration reference data for documentation and examples

// Unified zones-based configuration properties for the Reference modal
export const widgemoConfigProperties: Array<{
  category: string;
  property: string;
  type: string;
  status: 'implemented' | 'partial' | 'not-implemented';
  description: string;
  usage: string;
  example?: string;
  isComplexType?: boolean;
  complexTypeSection?: string;
}> = [
  // UnifiedConfig properties
  { category: 'UnifiedConfig', property: 'id', type: 'string', status: 'implemented', description: 'Optional ID for debugging/configuration management', usage: 'Used for component identification but not extensively in logic.', example: '"my-widgemo"' },
  { category: 'UnifiedConfig', property: 'title', type: 'string', status: 'implemented', description: 'Title displayed in the component header', usage: 'Rendered in WidgemoHeader.tsx.', example: '"User Management"' },
  { category: 'UnifiedConfig', property: 'zones', type: 'ZoneConfig[]', status: 'implemented', description: 'Array of zone configurations defining the component layout and behavior', usage: 'Core to unified architecture; each zone defines a section of the component.', example: '[{ type: "data", mode: "table", fields: [...] }]', isComplexType: true, complexTypeSection: 'ZoneConfig' },
  { category: 'UnifiedConfig', property: 'theme', type: 'WidgemoTheme', status: 'implemented', description: 'Theme configuration for colors, fonts, and styling', usage: 'Applied throughout the component for consistent theming.', example: '{ colors: { primary: "#007bff" }, fonts: { body: "Arial" } }', isComplexType: true, complexTypeSection: 'WidgemoTheme' },
  { category: 'UnifiedConfig', property: 'actions', type: 'ActionsConfig', status: 'partial', description: 'Unified action configuration system', usage: 'New action system with definitions and placements; replaces legacy boolean actions.', example: '{ definitions: [{ id: "add" }], header: { always: ["refresh"] } }', isComplexType: true, complexTypeSection: 'ActionsConfig' },
  { category: 'UnifiedConfig', property: 'data', type: 'DataConfig', status: 'implemented', description: 'Data source and management configuration', usage: 'Defines how data is fetched, transformed, and managed.', example: '{ source: { type: "api", url: "/api/users" }, transform: {...} }', isComplexType: true, complexTypeSection: 'DataConfig' },
  { category: 'UnifiedConfig', property: 'pagination', type: '{ enabled?: boolean; defaultPageSize?: number; pageSizeOptions?: number[] }', status: 'implemented', description: 'Pagination config', usage: 'Handled with PaginationControls.tsx.', example: '{ enabled: true, defaultPageSize: 10 }', isComplexType: true, complexTypeSection: 'PaginationConfig' },
  { category: 'UnifiedConfig', property: 'sorting', type: "{ enabled?: boolean; defaultSort?: { field: string; direction: 'asc' | 'desc' } }", status: 'partial', description: 'Sorting config', usage: 'Default sort applied; UI toggles incomplete.', example: "{ enabled: true, defaultSort: { field: 'name', direction: 'asc' } }", isComplexType: true, complexTypeSection: 'SortingConfig' },
  { category: 'UnifiedConfig', property: 'filtering', type: '{ enabled?: boolean; filters?: Array<{...}> }', status: 'not-implemented', description: 'Filtering config', usage: 'Not implemented: Property defined but no filtering UI.', example: '{ enabled: true }', isComplexType: true, complexTypeSection: 'FilteringConfig' },
  { category: 'UnifiedConfig', property: 'emptyState', type: '{ message?: string; icon?: React.ComponentType; action?: {...} }', status: 'implemented', description: 'Empty state config', usage: 'Custom empty component in Widgemo.tsx.', example: '{ message: "No data", action: { label: "Add", onClick: () => {} } }', isComplexType: true, complexTypeSection: 'EmptyStateConfig' },
  { category: 'UnifiedConfig', property: 'i18n', type: '{ locale?: string; messages?: Record<string, string> }', status: 'not-implemented', description: 'Internationalization', usage: 'Not implemented: Property exists but no localization logic.', example: '{ locale: "en", messages: { add: "Add Item" } }' },

  // ZoneConfig properties
  { category: 'ZoneConfig', property: 'type', type: "'data' | 'header' | 'footer' | 'sidebar'", status: 'implemented', description: 'Zone type defining its purpose and layout', usage: 'Controls zone behavior and rendering.', example: "'data'" },
  { category: 'ZoneConfig', property: 'id', type: 'string', status: 'implemented', description: 'Unique identifier for the zone', usage: 'Used for zone management and theming.', example: '"main-data-zone"' },
  { category: 'ZoneConfig', property: 'title', type: 'string', status: 'implemented', description: 'Zone title for display', usage: 'Shown in zone headers.', example: '"User Data"' },
  { category: 'ZoneConfig', property: 'mode', type: "'table' | 'grid' | 'board' | 'chart'", status: 'implemented', description: 'Display mode for the zone', usage: 'Controls how data is rendered in this zone.', example: "'table'" },
  { category: 'ZoneConfig', property: 'fields', type: 'FieldConfig[]', status: 'implemented', description: 'Field definitions for this zone', usage: 'Defines which fields to display and how.', example: "[{ name: 'name', label: 'Name', type: 'text' }]", isComplexType: true, complexTypeSection: 'FieldConfig' },
  { category: 'ZoneConfig', property: 'grid', type: 'GridConfig', status: 'implemented', description: 'Grid-specific configuration', usage: 'Controls grid layout and behavior.', example: '{ minItemWidth: "200px" }', isComplexType: true, complexTypeSection: 'GridConfig' },
  { category: 'ZoneConfig', property: 'table', type: 'TableConfig', status: 'implemented', description: 'Table-specific configuration', usage: 'Controls table appearance and behavior.', example: '{ showBorders: true }', isComplexType: true, complexTypeSection: 'TableConfig' },
  { category: 'ZoneConfig', property: 'board', type: 'BoardConfig', status: 'implemented', description: 'Board/kanban-specific configuration', usage: 'Controls kanban board layout.', example: '{ columns: [{ id: "todo" }] }', isComplexType: true, complexTypeSection: 'BoardConfig' },
  { category: 'ZoneConfig', property: 'chart', type: 'ChartConfig', status: 'partial', description: 'Chart-specific configuration', usage: 'Controls chart rendering.', example: '{ type: "bar", xAxis: "name" }', isComplexType: true, complexTypeSection: 'ChartConfig' },
  { category: 'ZoneConfig', property: 'collapsible', type: 'boolean', status: 'implemented', description: 'Whether the zone can be collapsed', usage: 'Allows users to hide/show the zone.', example: 'true' },
  { category: 'ZoneConfig', property: 'defaultCollapsed', type: 'boolean', status: 'implemented', description: 'Whether the zone starts collapsed', usage: 'Sets initial collapse state.', example: 'false' },
  { category: 'ZoneConfig', property: 'icon', type: 'string | IconConfig', status: 'implemented', description: 'Icon for the zone', usage: 'Displayed in zone headers.', example: '"table"' },
  { category: 'ZoneConfig', property: 'subtitle', type: 'string | SubtitleRenderer', status: 'implemented', description: 'Zone subtitle or renderer function', usage: 'Additional zone description.', example: '"Current users"' },
  { category: 'ZoneConfig', property: 'actions', type: 'ZoneActionsConfig', status: 'partial', description: 'Zone-specific actions', usage: 'Actions available in this zone.', example: '{ header: ["refresh"] }', isComplexType: true, complexTypeSection: 'ZoneActionsConfig' },
  { category: 'ZoneConfig', property: 'theme', type: 'ZoneTheme', status: 'implemented', description: 'Zone-specific theming', usage: 'Overrides global theme for this zone.', example: '{ backgroundColor: "#f0f0f0" }', isComplexType: true, complexTypeSection: 'ZoneTheme' },

  // TableStylingConfig properties
  { category: 'TableStylingConfig', property: 'showBorder', type: 'boolean', status: 'implemented', description: 'Show table border', usage: 'Adds border around table.', example: 'true' },
  { category: 'TableStylingConfig', property: 'borderStyle', type: 'string', status: 'implemented', description: 'Table border style', usage: 'CSS border-style property.', example: "'solid'" },
  { category: 'TableStylingConfig', property: 'borderWidth', type: 'string', status: 'implemented', description: 'Table border width', usage: 'CSS border-width property.', example: "'1px'" },
  { category: 'TableStylingConfig', property: 'borderColor', type: 'string', status: 'implemented', description: 'Table border color', usage: 'CSS border-color property.', example: "'#ddd'" },
  { category: 'TableStylingConfig', property: 'cellBorder', type: 'boolean', status: 'implemented', description: 'Show borders between cells', usage: 'Adds borders between table cells.', example: 'true' },
  { category: 'TableStylingConfig', property: 'headerBorder', type: 'boolean', status: 'implemented', description: 'Show border under header row', usage: 'Adds border below table header.', example: 'true' },
  { category: 'TableStylingConfig', property: 'backgroundColor', type: 'string', status: 'implemented', description: 'Table background color', usage: 'Sets table background.', example: "'#ffffff'" },

  // DataConfig properties
  { category: 'DataConfig', property: 'source', type: 'DataSourceConfig', status: 'implemented', description: 'Data source configuration', usage: 'Defines how data is fetched and managed.', example: '{ type: "api", url: "/api/users" }', isComplexType: true, complexTypeSection: 'DataSourceConfig' },
  { category: 'DataConfig', property: 'transform', type: 'DataTransformConfig', status: 'partial', description: 'Data transformation configuration', usage: 'Transforms data after fetching.', example: '{ mapFields: {...} }', isComplexType: true, complexTypeSection: 'DataTransformConfig' },
  { category: 'DataConfig', property: 'cache', type: 'CacheConfig', status: 'not-implemented', description: 'Data caching configuration', usage: 'Not implemented.', example: '{ enabled: true, ttl: 300 }', isComplexType: true, complexTypeSection: 'CacheConfig' },

  // DataSourceConfig properties
  { category: 'DataSourceConfig', property: 'type', type: "'static' | 'api' | 'graphql' | 'custom'", status: 'implemented', description: 'Data source type', usage: 'Determines fetching method.', example: "'api'" },
  { category: 'DataSourceConfig', property: 'url', type: 'string', status: 'implemented', description: 'API endpoint URL', usage: 'For API data sources.', example: '"/api/users"' },
  { category: 'DataSourceConfig', property: 'method', type: "'GET' | 'POST'", status: 'implemented', description: 'HTTP method', usage: 'Request method for API calls.', example: "'GET'" },
  { category: 'DataSourceConfig', property: 'headers', type: 'Record<string, string>', status: 'implemented', description: 'HTTP headers', usage: 'Additional request headers.', example: '{ "Authorization": "Bearer token" }' },
  { category: 'DataSourceConfig', property: 'params', type: 'Record<string, any>', status: 'implemented', description: 'Query parameters', usage: 'URL query parameters.', example: '{ "limit": 10 }' },
  { category: 'DataSourceConfig', property: 'data', type: 'any[]', status: 'implemented', description: 'Static data array', usage: 'For static data sources.', example: '[{ id: 1, name: "John" }]' },

  // GridConfig properties
  { category: 'GridConfig', property: 'minItemWidth', type: 'string', status: 'implemented', description: 'Minimum width for grid items', usage: 'Creates responsive grid with auto-fit.', example: '"200px"' },
  { category: 'GridConfig', property: 'gap', type: 'string', status: 'implemented', description: 'Gap between grid items', usage: 'CSS gap property.', example: '"10px"' },
  { category: 'GridConfig', property: 'aspectRatio', type: 'string', status: 'not-implemented', description: 'Grid item aspect ratio', usage: 'Not implemented.', example: '"16/9"' },

  // TableConfig properties
  { category: 'TableConfig', property: 'showBorders', type: 'boolean', status: 'implemented', description: 'Show table borders', usage: 'Adds borders to table.', example: 'true' },
  { category: 'TableConfig', property: 'striped', type: 'boolean', status: 'implemented', description: 'Striped table rows', usage: 'Alternating row colors.', example: 'true' },
  { category: 'TableConfig', property: 'compact', type: 'boolean', status: 'implemented', description: 'Compact table spacing', usage: 'Reduces padding.', example: 'true' },

  // BoardConfig properties
  { category: 'BoardConfig', property: 'columns', type: 'Array<{ id: string; label?: string; color?: string }>', status: 'implemented', description: 'Board column definitions', usage: 'Defines kanban columns.', example: '[{ id: "todo", label: "To Do" }]' },
  { category: 'BoardConfig', property: 'groupBy', type: 'string', status: 'not-implemented', description: 'Field to group items by', usage: 'Not implemented.', example: '"status"' },
  { category: 'BoardConfig', property: 'draggable', type: 'boolean', status: 'partial', description: 'Enable drag and drop', usage: 'Basic drag logic exists.', example: 'true' },

  // EmptyStateConfig properties
  { category: 'EmptyStateConfig', property: 'message', type: 'string', status: 'implemented', description: 'Empty state message', usage: 'Displayed when no data.', example: '"No items found"' },
  { category: 'EmptyStateConfig', property: 'icon', type: 'React.ComponentType', status: 'implemented', description: 'Empty state icon component', usage: 'Custom icon for empty state.', example: 'MyIconComponent' },
  { category: 'EmptyStateConfig', property: 'action', type: 'Object', status: 'implemented', description: 'Empty state action button', usage: 'Button shown in empty state.', example: '{ label: "Add Item", onClick: () => {} }' },

  // HeaderConfig properties
  { category: 'HeaderConfig', property: 'discoverable', type: 'string[]', status: 'implemented', description: 'Buttons shown on hover', usage: 'Controls shown when hovering header.', example: '["viewToggle", "columnSelector"]' },
  { category: 'HeaderConfig', property: 'always', type: 'string[]', status: 'implemented', description: 'Buttons always visible', usage: 'Controls always shown in header.', example: '["refresh", "add"]' },
  { category: 'HeaderConfig', property: 'onMenu', type: 'string[]', status: 'not-implemented', description: 'Buttons in dropdown menu', usage: 'Not implemented.', example: '["export", "import"]' },
  { category: 'HeaderConfig', property: 'includeDeleted', type: 'boolean', status: 'not-implemented', description: 'Include deleted records', usage: 'Not implemented.', example: 'false' },

  // MediaConfig properties
  { category: 'MediaConfig', property: 'fields', type: 'Array<{field: string; label?: string; placement?: "cell" | "background" | "header" | "body" | "overlay" | "badge" | "carousel"; size?: "small" | "medium" | "large" | {width: number|string; height: number|string}; fit?: "cover" | "contain" | "fill" | "none" | "scale-down"; shape?: "square" | "circle" | "rounded"; lightbox?: boolean; altFn?: (item: any) => string; priority?: number; afterField?: string; position?: "start" | "end"}>', status: 'implemented', description: 'Array of media field configurations', usage: 'Each field defines how media is rendered. Label provides custom column header for table mode. Placement determines position: Table=cell only, Grid=cell/background, Board=background/header/body. AfterField positions column after specific field. Position places at start/end of table.', example: '[{ field: "thumbnail", label: "Photo", placement: "cell", size: "medium", fit: "cover", position: "start" }, { field: "gallery", label: "Images", placement: "cell", afterField: "name" }]', isComplexType: true, complexTypeSection: 'MediaFieldConfig' },
  { category: 'MediaConfig', property: 'defaultFit', type: "'cover' | 'contain'", status: 'implemented', description: 'Default CSS object-fit for all media', usage: 'Applied when field.fit is not specified.', example: "'cover'" },
  { category: 'MediaConfig', property: 'lazy', type: 'boolean', status: 'implemented', description: 'Enable lazy loading for all media', usage: 'Loads media on demand when near viewport.', example: 'false' },
  { category: 'MediaConfig', property: 'loadingPlaceholder', type: 'string', status: 'implemented', description: 'Loading placeholder media URL/data URI', usage: 'Shown while media loads.', example: '"data:image/svg+xml;base64,..."' },
  { category: 'MediaConfig', property: 'errorPlaceholder', type: 'string', status: 'implemented', description: 'Error placeholder media URL/data URI', usage: 'Shown when media fails to load.', example: '"data:image/svg+xml;base64,..."' },
  { category: 'MediaConfig', property: 'enableLightbox', type: 'boolean', status: 'implemented', description: 'Enable lightbox globally for all media', usage: 'Allows clicking media to open in lightbox.', example: 'true' },

  // ChartConfig properties
  { category: 'ChartConfig', property: 'type', type: "'bar' | 'line' | 'pie' | 'area' | 'scatter'", status: 'implemented', description: 'Chart type', usage: 'Basic chart types supported.', example: "'bar'" },
  { category: 'ChartConfig', property: 'xAxis', type: 'string', status: 'implemented', description: 'X-axis field name', usage: 'Field for chart x-axis.', example: "'name'" },
  { category: 'ChartConfig', property: 'yAxis', type: 'string | string[]', status: 'implemented', description: 'Y-axis field name(s)', usage: 'Field(s) for chart y-axis.', example: "'value'" },
  { category: 'ChartConfig', property: 'groupBy', type: 'string', status: 'not-implemented', description: 'Field to group data by', usage: 'Not implemented.', example: "'category'" },
  { category: 'ChartConfig', property: 'settings', type: 'Record<string, any>', status: 'partial', description: 'Additional chart settings', usage: 'Passed to Recharts components.', example: '{ showLegend: true }' },

  // PaginationConfig properties
  { category: 'PaginationConfig', property: 'enabled', type: 'boolean', status: 'implemented', description: 'Enable pagination', usage: 'Shows pagination controls.', example: 'true' },
  { category: 'PaginationConfig', property: 'defaultPageSize', type: 'number', status: 'implemented', description: 'Default items per page', usage: 'Initial page size.', example: '10' },
  { category: 'PaginationConfig', property: 'pageSizeOptions', type: 'number[]', status: 'implemented', description: 'Available page sizes', usage: 'Options in page size selector.', example: '[10, 25, 50]' },

  // SortingConfig properties
  { category: 'SortingConfig', property: 'enabled', type: 'boolean', status: 'partial', description: 'Enable sorting', usage: 'Allows column sorting.', example: 'true' },
  { category: 'SortingConfig', property: 'defaultSort', type: 'Object', status: 'implemented', description: 'Default sort configuration', usage: 'Initial sort applied.', example: '{ field: "name", direction: "asc" }' },

  // FilteringConfig properties
  { category: 'FilteringConfig', property: 'enabled', type: 'boolean', status: 'not-implemented', description: 'Enable filtering', usage: 'Not implemented.', example: 'true' },
  { category: 'FilteringConfig', property: 'filters', type: 'Array<{ field: string; type: "text" | "select" | "date" | "number" | "boolean"; options?: Array<{ value: string | number | boolean; label: string }> }>', status: 'not-implemented', description: 'Filter definitions', usage: 'Not implemented.', example: '[{ field: "status", type: "select", options: [{ value: "active", label: "Active" }] }]' },

  // FieldConfig properties
  { category: 'FieldConfig', property: 'name', type: 'string', status: 'implemented', description: 'Unique field name', usage: 'Used in rendering and data mapping.', example: '"id"' },
  { category: 'FieldConfig', property: 'label', type: 'string', status: 'implemented', description: 'Human-readable label', usage: 'Displayed in headers/labels.', example: '"ID"' },
  { category: 'FieldConfig', property: 'type', type: "'text' | 'number' | 'date' | 'boolean' | 'select' | 'relation' | 'textarea' | 'email' | 'url'", status: 'partial', description: 'Data type', usage: "Basic types rendered; 'relation', 'textarea' not fully.", example: "'text'" },
  { category: 'FieldConfig', property: 'options', type: 'Array<{ value: string | number | boolean; label: string }>', status: 'implemented', description: 'Options for select/relation', usage: 'For select fields.', example: '[{ value: "active", label: "Active" }]' },
  { category: 'FieldConfig', property: 'validation', type: 'Object', status: 'not-implemented', description: 'Validation rules', usage: 'Not implemented: Property exists but no validation logic.', example: '{ required: true }' },
  { category: 'FieldConfig', property: 'render', type: 'Object', status: 'not-implemented', description: 'Custom rendering', usage: 'Not implemented: Property exists but not used.', example: '{ component: MyComponent }' },
  { category: 'FieldConfig', property: 'renderAs', type: "'text' | 'boolean' | 'select' | 'custom' | 'link' | 'progress' | 'rating'", status: 'implemented', description: 'Render type', usage: 'Defaults to type. Use "link" to render text fields as clickable links, "progress" for progress bars, "rating" for star ratings.', example: "'link'" },
  { category: 'FieldConfig', property: 'booleanTrueLabel', type: 'string', status: 'implemented', description: 'True label for booleans', usage: 'Used in rendering.', example: '"Yes"' },
  { category: 'FieldConfig', property: 'booleanFalseLabel', type: 'string', status: 'implemented', description: 'False label for booleans', usage: 'Used in rendering.', example: '"No"' },
  { category: 'FieldConfig', property: 'sortable', type: 'boolean', status: 'not-implemented', description: 'Sortable flag', usage: 'Flag exists, but sorting UI incomplete.', example: 'true' },
  { category: 'FieldConfig', property: 'filterable', type: 'boolean', status: 'not-implemented', description: 'Filterable flag', usage: 'Not implemented: Flag exists, no filtering.', example: 'true' },
  { category: 'FieldConfig', property: 'editable', type: 'boolean', status: 'implemented', description: 'Editable flag', usage: 'Used in modals.', example: 'true' },
  { category: 'FieldConfig', property: 'visible', type: 'boolean', status: 'implemented', description: 'Visibility flag', usage: 'Controls display.', example: 'true' },
  { category: 'FieldConfig', property: 'width', type: 'number | string', status: 'not-implemented', description: 'Width in table', usage: 'Not implemented in table view.', example: '100' },
  { category: 'FieldConfig', property: 'align', type: "'left' | 'center' | 'right'", status: 'implemented', description: 'Text alignment', usage: 'Applied in table cells.', example: "'center'" },
  { category: 'FieldConfig', property: 'showLabel', type: 'boolean', status: 'implemented', description: 'Show label in cards', usage: 'For card views.', example: 'true' },
  { category: 'FieldConfig', property: 'linkOptions', type: 'Object', status: 'implemented', description: 'Link rendering options', usage: 'Used when renderAs is "link".', example: '{ newTab: true, externalWarning: true }', isComplexType: true, complexTypeSection: 'LinkOptions' },

  // LinkOptions properties
  { category: 'LinkOptions', property: 'text', type: 'string | ((entity: Entity) => string)', status: 'implemented', description: 'Custom link text', usage: 'If not provided, uses field value.', example: '"Click here"' },
  { category: 'LinkOptions', property: 'newTab', type: 'boolean', status: 'implemented', description: 'Open in new tab', usage: 'Adds target="_blank" and rel attributes.', example: 'true' },
  { category: 'LinkOptions', property: 'externalWarning', type: 'boolean', status: 'implemented', description: 'Show external link warning', usage: 'Adds visual indicator for external links.', example: 'true' },
  { category: 'LinkOptions', property: 'url', type: 'string | ((entity: Entity) => string)', status: 'implemented', description: 'Custom URL', usage: 'If different from field value.', example: '"https://example.com"' },

  // MediaFieldConfig properties (for mediaConfig.fields array)
  { category: 'MediaFieldConfig', property: 'field', type: 'string', status: 'implemented', description: 'Field name/path to extract media source', usage: 'Dot notation path to media field in data items.', example: '"src"' },
  { category: 'MediaFieldConfig', property: 'placement', type: "'cell' | 'background' | 'header' | 'body' | 'overlay' | 'badge' | 'carousel'", status: 'implemented', description: 'Where to place the media element', usage: 'Varies by mode: Table=cell only, Grid=cell/background, Board=background/header/body, Chart=none. Overlay/badge/carousel reserved for future use.', example: "'cell'" },
  { category: 'MediaFieldConfig', property: 'size', type: "'small' | 'medium' | 'large' | {width: number|string; height: number|string}", status: 'implemented', description: 'Size of the media element', usage: 'Predefined sizes or custom dimensions.', example: "'medium'" },
  { category: 'MediaFieldConfig', property: 'fit', type: "'cover' | 'contain' | 'fill' | 'none' | 'scale-down'", status: 'implemented', description: 'CSS object-fit property', usage: 'Controls how media fits within its container.', example: "'cover'" },
  { category: 'MediaFieldConfig', property: 'shape', type: "'square' | 'circle' | 'rounded'", status: 'implemented', description: 'Shape of the media element', usage: 'Applies border-radius styling.', example: "'rounded'" },
  { category: 'MediaFieldConfig', property: 'lightbox', type: 'boolean', status: 'implemented', description: 'Enable lightbox for this media field', usage: 'Allows clicking to open media in lightbox modal.', example: 'true' },
  { category: 'MediaFieldConfig', property: 'altFn', type: '(item: any) => string', status: 'implemented', description: 'Function to generate alt text', usage: 'Creates accessible alt text from item data.', example: '(item) => `Image of ${item.name}`' },
  { category: 'MediaFieldConfig', property: 'priority', type: 'number', status: 'implemented', description: 'Priority for primary media selection', usage: 'Higher numbers = higher priority when multiple media fields exist.', example: '1' },
  { category: 'MediaFieldConfig', property: 'label', type: 'string', status: 'implemented', description: 'Custom column header for table mode', usage: 'Human-readable label for media column headers in table view.', example: '"Photo"' },
  { category: 'MediaFieldConfig', property: 'afterField', type: 'string', status: 'implemented', description: 'Position column after specific field', usage: 'Places media column immediately after the specified field name in table mode.', example: '"name"' },
  { category: 'MediaFieldConfig', property: 'position', type: "'start' | 'end'", status: 'implemented', description: 'Position column at start or end', usage: 'Places media column at the beginning or end of the table. Overrides afterField.', example: '"start"' },

  // WidgemoProps properties
  { category: 'WidgemoProps', property: 'config', type: 'WidgemoConfig', status: 'implemented', description: 'Configuration object', usage: 'Core to component behavior.', example: '{ title: "Data", mode: "table" }' },
  { category: 'WidgemoProps', property: 'adapters', type: 'WidgemoAdapters', status: 'implemented', description: 'Data operation adapters', usage: 'Used for fetch/create/update/delete operations.', example: '{ fetchData: async () => ({ data: [] }) }' },
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
  { category: 'WidgemoProps', property: 'mediaConfig', type: '{...}', status: 'implemented', description: 'Media configuration', usage: 'Passed to views for media handling.', example: '{ fields: [{ field: "image" }] }' },

  // WidgemoAdapters properties
  { category: 'WidgemoAdapters', property: 'fetchData', type: 'Function', status: 'implemented', description: 'Fetch data with params', usage: 'Core data fetching functionality.', example: 'async (params) => ({ data: [], total: 0 })' },
  { category: 'WidgemoAdapters', property: 'createRecord', type: 'Function', status: 'implemented', description: 'Create record', usage: 'Used in add modal.', example: 'async (record) => ({ id: 1, ...record })' },
  { category: 'WidgemoAdapters', property: 'updateRecord', type: 'Function', status: 'implemented', description: 'Update record', usage: 'Used in edit modal.', example: 'async (id, record) => record' },
  { category: 'WidgemoAdapters', property: 'deleteRecord', type: 'Function', status: 'implemented', description: 'Delete record', usage: 'Used in delete action.', example: 'async (id) => {}' },
  { category: 'WidgemoAdapters', property: 'fetchConfig', type: 'Function', status: 'not-implemented', description: 'Fetch dynamic config', usage: 'Not implemented: Property exists but not used.', example: 'async (configId) => ({})' },
  { category: 'WidgemoAdapters', property: 'getAuthToken', type: 'Function', status: 'not-implemented', description: 'Auth token provider', usage: 'Not implemented: Property exists but no auth logic.', example: 'async () => "token"' },
  { category: 'WidgemoAdapters', property: 'onError', type: 'Function', status: 'implemented', description: 'Error handler', usage: 'Called on errors.', example: '(error) => console.error(error)' },
  { category: 'WidgemoAdapters', property: 'onSuccess', type: 'Function', status: 'implemented', description: 'Success handler', usage: 'Called on successes.', example: '(message, data) => console.log(message)' },
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
    actions: {
      definitions: [
        { id: 'refresh' },
        { id: 'add' },
        {
          id: 'edit',
          label: 'Edit',
          icon: 'edit',
          variant: 'secondary',
          iconOnly: true,
          onTrigger: () => {} // Demo action
        },
        {
          id: 'delete',
          label: 'Delete',
          icon: 'trash',
          variant: 'danger',
          iconOnly: true,
          onTrigger: () => {} // Demo action
        }
      ],
      header: {
        always: ['refresh'],
        onMenu: ['add']
      },
      item: {
        onMenu: ['edit', 'delete']
      }
    },
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
    actions: {
      definitions: [
        { id: 'refresh' },
        { id: 'viewToggle' },
        { id: 'columnSelector' },
        { id: 'add' },
        {
          id: 'edit',
          label: 'Edit',
          icon: 'edit',
          variant: 'secondary',
          iconOnly: true,
          onTrigger: () => {} // Demo action
        },
        {
          id: 'delete',
          label: 'Delete',
          icon: 'trash',
          variant: 'danger',
          iconOnly: true,
          onTrigger: () => {} // Demo action
        }
      ],
      header: {
        always: ['refresh'],
        discoverable: ['viewToggle'],
        onMenu: ['columnSelector', 'add']
      },
      item: {
        onMenu: ['edit', 'delete']
      }
    },
    styling: { shadow: true },
  },
};