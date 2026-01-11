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
  isComplexType?: boolean;
  complexTypeSection?: string;
}> = [
  // WidgemoConfig properties
  { category: 'WidgemoConfig', property: 'id', type: 'string', status: 'implemented', description: 'Optional ID for debugging/configuration management', usage: 'Used for component identification but not extensively in logic.', example: '"my-widgemo"' },
  { category: 'WidgemoConfig', property: 'title', type: 'string', status: 'implemented', description: 'Title displayed in the component header', usage: 'Rendered in WidgemoHeader.tsx.', example: '"User Management"' },
  { category: 'WidgemoConfig', property: 'mode', type: "'table' | 'board' | 'grid' | 'chart'", status: 'implemented', description: 'Display mode for data', usage: "Controls rendering in Widgemo.tsx; 'table', 'board', 'grid' fully supported; 'chart' partially via ChartView.tsx.", example: "'table'" },
  { category: 'WidgemoConfig', property: 'defaultMode', type: "Same as mode", status: 'implemented', description: 'Default view mode if mode not specified', usage: 'Sets initial mode if mode not specified.', example: "'table'" },
  { category: 'WidgemoConfig', property: 'collapsible', type: "'collapsed' | 'expanded' | 'fixed'", status: 'implemented', description: 'Component collapsibility with toggle logic', usage: 'Handled in Widgemo.tsx with toggle logic.', example: "'expanded'" },
  { category: 'WidgemoConfig', property: 'tableName', type: 'string', status: 'implemented', description: 'Table name passed to CRUD modals', usage: 'Passed to modals for CRUD operations.', example: '"users"' },
  { category: 'WidgemoConfig', property: 'customComponent', type: 'React.ComponentType<any>', status: 'not-implemented', description: 'Custom component for rendering records', usage: 'Not implemented: Property exists but not used in rendering logic.', example: 'MyCustomComponent' },
  { category: 'WidgemoConfig', property: 'drillDown', type: '(record: any) => void', status: 'not-implemented', description: 'Drill-down navigation function', usage: 'Partially implemented: Property exists, but no UI triggers or full integration.', example: '(record) => console.log(record)' },
  { category: 'WidgemoConfig', property: 'dataSource', type: "{ type?: 'static' | 'api' | 'graphql' | 'custom'; config?: Record<string, any> }", status: 'partial', description: 'Data source configuration', usage: "Used to determine data fetching; 'api' handled via adapters.", example: "{ type: 'api', config: { url: '/api/users' } }" },
  { category: 'WidgemoConfig', property: 'fields', type: 'FieldConfig[]', status: 'implemented', description: 'Field definitions (core functionality)', usage: 'Core to rendering in views like TableView.tsx.', example: "[{ name: 'id', label: 'ID', type: 'text' }]", isComplexType: true, complexTypeSection: 'FieldConfig' },
  { category: 'WidgemoConfig', property: 'actions', type: "{ create?: boolean; edit?: boolean; delete?: boolean; view?: boolean; custom?: Array<{...}> }", status: 'partial', description: 'Action configuration', usage: 'CRUD modals exist; custom actions not fully wired.', example: "{ create: true, edit: true }" },
  { category: 'WidgemoConfig', property: 'chartConfig', type: "{ type: 'bar' | 'line' | 'pie' | 'area' | 'scatter'; xAxis?: string; yAxis?: string | string[]; groupBy?: string; settings?: Record<string, any> }", status: 'partial', description: 'Chart-specific config', usage: 'Basic types via Recharts in ChartView.tsx; advanced features like groupBy not implemented.', example: "{ type: 'bar', xAxis: 'name', yAxis: 'value' }", isComplexType: true, complexTypeSection: 'ChartConfig' },
  { category: 'WidgemoConfig', property: 'pagination', type: '{ enabled?: boolean; defaultPageSize?: number; pageSizeOptions?: number[] }', status: 'implemented', description: 'Pagination config', usage: 'Handled with PaginationControls.tsx.', example: '{ enabled: true, defaultPageSize: 10 }', isComplexType: true, complexTypeSection: 'PaginationConfig' },
  { category: 'WidgemoConfig', property: 'sorting', type: "{ enabled?: boolean; defaultSort?: { field: string; direction: 'asc' | 'desc' } }", status: 'partial', description: 'Sorting config', usage: 'Default sort applied; UI toggles incomplete.', example: "{ enabled: true, defaultSort: { field: 'name', direction: 'asc' } }", isComplexType: true, complexTypeSection: 'SortingConfig' },
  { category: 'WidgemoConfig', property: 'filtering', type: '{ enabled?: boolean; filters?: Array<{...}> }', status: 'not-implemented', description: 'Filtering config', usage: 'Not implemented: Property defined but no filtering UI.', example: '{ enabled: true }', isComplexType: true, complexTypeSection: 'FilteringConfig' },
  { category: 'WidgemoConfig', property: 'styling', type: 'StylingConfig', status: 'partial', description: 'Styling and theming options', usage: 'Applied in views; not all sub-properties fully supported.', example: '{ theme: "dark", compact: true }', isComplexType: true, complexTypeSection: 'StylingConfig' },
  { category: 'WidgemoConfig', property: 'emptyState', type: '{ message?: string; icon?: React.ComponentType; action?: {...} }', status: 'implemented', description: 'Empty state config', usage: 'Custom empty component in Widgemo.tsx.', example: '{ message: "No data", action: { label: "Add", onClick: () => {} } }', isComplexType: true, complexTypeSection: 'EmptyStateConfig' },
  { category: 'WidgemoConfig', property: 'i18n', type: '{ locale?: string; messages?: Record<string, string> }', status: 'not-implemented', description: 'Internationalization', usage: 'Not implemented: Property exists but no localization logic.', example: '{ locale: "en", messages: { add: "Add Item" } }' },
  { category: 'WidgemoConfig', property: 'header', type: '{ discoverable?: string[]; always?: string[]; onMenu?: string[]; includeDeleted?: boolean }', status: 'partial', description: 'Header config', usage: 'Button arrays handled in WidgemoHeader.tsx; onMenu and includeDeleted not fully.', example: '{ always: ["refresh"], discoverable: ["add"] }', isComplexType: true, complexTypeSection: 'HeaderConfig' },
  { category: 'WidgemoConfig', property: 'labels', type: '{ add?: string; empty?: string; loading?: string; refresh?: string; actions?: string }', status: 'partial', description: 'UI labels', usage: 'Some used in components; not all customizable.', example: '{ add: "Create New" }' },
  { category: 'WidgemoConfig', property: 'mediaConfig', type: '{ fields: Array<{field: string; placement?: string; size?: ...; fit?: ...; shape?: ...; lightbox?: boolean; altFn?: Function; priority?: number}>; defaultFit?: string; lazy?: boolean; loadingPlaceholder?: string; errorPlaceholder?: string; enableLightbox?: boolean }', status: 'implemented', description: 'Media configuration for images/videos', usage: 'Used in MediaRenderer.tsx for rendering media in views. Placement options vary by mode: Table=cell, Grid=cell/background, Board=background/header/body.', example: '{ fields: [{ field: "src", placement: "cell" }], lazy: false }', isComplexType: true, complexTypeSection: 'MediaConfig' },

  // StylingConfig properties
  { category: 'StylingConfig', property: 'className', type: 'string', status: 'implemented', description: 'Additional CSS class name', usage: 'Applied to root element.', example: '"my-custom-class"' },
  { category: 'StylingConfig', property: 'theme', type: "'light' | 'dark' | 'auto'", status: 'implemented', description: 'Theme selection', usage: 'Controls color scheme.', example: "'dark'" },
  { category: 'StylingConfig', property: 'compact', type: 'boolean', status: 'implemented', description: 'Compact spacing and sizing', usage: 'Reduces padding and margins.', example: 'true' },
  { category: 'StylingConfig', property: 'shadow', type: 'boolean', status: 'implemented', description: 'Show shadow for the component', usage: 'Adds drop shadow.', example: 'true' },
  { category: 'StylingConfig', property: 'showBorder', type: 'boolean', status: 'implemented', description: 'Show border for the component', usage: 'Adds border around component.', example: 'true' },
  { category: 'StylingConfig', property: 'dynamicBackground', type: 'boolean', status: 'implemented', description: 'Adapt background color based on theme', usage: 'Automatically adjusts background.', example: 'true' },
  { category: 'StylingConfig', property: 'table', type: 'TableStylingConfig', status: 'implemented', description: 'Table-specific styling options', usage: 'Controls table appearance.', example: '{ showBorder: true, cellBorder: true }', isComplexType: true, complexTypeSection: 'TableStylingConfig' },
  { category: 'StylingConfig', property: 'card', type: 'CardStylingConfig', status: 'implemented', description: 'Card-specific styling options', usage: 'Controls card appearance.', example: '{ showBorder: true, shadow: true }', isComplexType: true, complexTypeSection: 'CardStylingConfig' },
  { category: 'StylingConfig', property: 'grid', type: 'GridStylingConfig', status: 'partial', description: 'Grid-specific styling options', usage: 'Controls grid layout.', example: '{ columns: 3, gap: "10px" }', isComplexType: true, complexTypeSection: 'GridStylingConfig' },
  { category: 'StylingConfig', property: 'board', type: 'BoardStylingConfig', status: 'partial', description: 'Board-specific styling options', usage: 'Controls kanban board appearance.', example: '{ draggable: true, showColumnHeaders: true }', isComplexType: true, complexTypeSection: 'BoardStylingConfig' },

  // TableStylingConfig properties
  { category: 'TableStylingConfig', property: 'showBorder', type: 'boolean', status: 'implemented', description: 'Show table border', usage: 'Adds border around table.', example: 'true' },
  { category: 'TableStylingConfig', property: 'borderStyle', type: 'string', status: 'implemented', description: 'Table border style', usage: 'CSS border-style property.', example: "'solid'" },
  { category: 'TableStylingConfig', property: 'borderWidth', type: 'string', status: 'implemented', description: 'Table border width', usage: 'CSS border-width property.', example: "'1px'" },
  { category: 'TableStylingConfig', property: 'borderColor', type: 'string', status: 'implemented', description: 'Table border color', usage: 'CSS border-color property.', example: "'#ddd'" },
  { category: 'TableStylingConfig', property: 'cellBorder', type: 'boolean', status: 'implemented', description: 'Show borders between cells', usage: 'Adds borders between table cells.', example: 'true' },
  { category: 'TableStylingConfig', property: 'headerBorder', type: 'boolean', status: 'implemented', description: 'Show border under header row', usage: 'Adds border below table header.', example: 'true' },
  { category: 'TableStylingConfig', property: 'backgroundColor', type: 'string', status: 'implemented', description: 'Table background color', usage: 'Sets table background.', example: "'#ffffff'" },

  // CardStylingConfig properties
  { category: 'CardStylingConfig', property: 'showBorder', type: 'boolean', status: 'implemented', description: 'Show card borders', usage: 'Adds borders around cards.', example: 'true' },
  { category: 'CardStylingConfig', property: 'borderStyle', type: 'string', status: 'implemented', description: 'Card border style', usage: 'CSS border-style property.', example: "'solid'" },
  { category: 'CardStylingConfig', property: 'borderWidth', type: 'string', status: 'implemented', description: 'Card border width', usage: 'CSS border-width property.', example: "'1px'" },
  { category: 'CardStylingConfig', property: 'borderColor', type: 'string', status: 'implemented', description: 'Card border color', usage: 'CSS border-color property.', example: "'#ddd'" },
  { category: 'CardStylingConfig', property: 'borderRadius', type: 'string', status: 'implemented', description: 'Card border radius', usage: 'CSS border-radius property.', example: "'8px'" },
  { category: 'CardStylingConfig', property: 'shadow', type: 'boolean', status: 'implemented', description: 'Show card drop shadow', usage: 'Adds shadow to cards.', example: 'true' },
  { category: 'CardStylingConfig', property: 'backgroundColor', type: 'string', status: 'implemented', description: 'Card background color', usage: 'Sets card background.', example: "'#ffffff'" },

  // GridStylingConfig properties
  { category: 'GridStylingConfig', property: 'columns', type: 'number | "auto"', status: 'implemented', description: 'Number of grid columns', usage: 'Sets grid column count.', example: '3' },
  { category: 'GridStylingConfig', property: 'cellSize', type: 'Object', status: 'not-implemented', description: 'Grid cell dimensions', usage: 'Not implemented.', example: '{ width: 200, height: 150 }' },
  { category: 'GridStylingConfig', property: 'gap', type: 'string', status: 'implemented', description: 'Gap between grid items', usage: 'CSS gap property.', example: "'10px'" },
  { category: 'GridStylingConfig', property: 'showGridLines', type: 'boolean', status: 'not-implemented', description: 'Show grid lines', usage: 'Not implemented.', example: 'true' },
  { category: 'GridStylingConfig', property: 'aspectRatio', type: 'string', status: 'not-implemented', description: 'Grid aspect ratio', usage: 'Not implemented.', example: "'16/9'" },
  { category: 'GridStylingConfig', property: 'backgroundColor', type: 'string', status: 'implemented', description: 'Grid background color', usage: 'Sets grid background.', example: "'#f5f5f5'" },
  { category: 'GridStylingConfig', property: 'imageGrid', type: 'Object', status: 'not-implemented', description: 'Image grid configuration', usage: 'Not implemented.', example: '{ masonry: true }' },

  // BoardStylingConfig properties
  { category: 'BoardStylingConfig', property: 'columns', type: 'Array<{ id: string; label?: string }>', status: 'implemented', description: 'Board column definitions', usage: 'Defines kanban columns.', example: '[{ id: "todo", label: "To Do" }]' },
  { category: 'BoardStylingConfig', property: 'groupBy', type: 'string', status: 'not-implemented', description: 'Field to group items by', usage: 'Not implemented.', example: '"status"' },
  { category: 'BoardStylingConfig', property: 'swimlanes', type: 'Array<{ id: string; label?: string }>', status: 'not-implemented', description: 'Swimlane definitions', usage: 'Not implemented.', example: '[{ id: "high", label: "High Priority" }]' },
  { category: 'BoardStylingConfig', property: 'swimlaneBy', type: 'string', status: 'not-implemented', description: 'Field for swimlane grouping', usage: 'Not implemented.', example: '"priority"' },
  { category: 'BoardStylingConfig', property: 'draggable', type: 'boolean', status: 'partial', description: 'Enable drag and drop', usage: 'Basic drag logic exists.', example: 'true' },
  { category: 'BoardStylingConfig', property: 'showColumnHeaders', type: 'boolean', status: 'implemented', description: 'Show column headers', usage: 'Displays column titles.', example: 'true' },
  { category: 'BoardStylingConfig', property: 'showItemCount', type: 'boolean', status: 'not-implemented', description: 'Show item count in columns', usage: 'Not implemented.', example: 'true' },
  { category: 'BoardStylingConfig', property: 'minColumnWidth', type: 'string', status: 'not-implemented', description: 'Minimum column width', usage: 'Not implemented.', example: "'200px'" },
  { category: 'BoardStylingConfig', property: 'gap', type: 'string', status: 'implemented', description: 'Gap between columns', usage: 'CSS gap property.', example: "'10px'" },
  { category: 'BoardStylingConfig', property: 'imagePlacement', type: 'string', status: 'implemented', description: 'Image placement in board cards', usage: 'Controls image position.', example: "'header'" },
  { category: 'BoardStylingConfig', property: 'columnCornerRadius', type: 'string', status: 'not-implemented', description: 'Corner radius for columns', usage: 'Not implemented.', example: "'8px'" },

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
  { category: 'FilteringConfig', property: 'filters', type: 'Array<{ field: string; type: "text" | "select" | "date" | "number" | "boolean"; options?: Array<{ value: any; label: string }> }>', status: 'not-implemented', description: 'Filter definitions', usage: 'Not implemented.', example: '[{ field: "status", type: "select", options: [{ value: "active", label: "Active" }] }]' },

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