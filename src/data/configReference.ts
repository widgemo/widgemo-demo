// Configuration reference data for documentation and examples

// Zones-based configuration properties for the Reference modal
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
  { category: 'WidgemoConfig', property: 'id', type: 'string', status: 'implemented', description: 'Optional ID for debugging/configuration management', usage: 'Used for component identification and diagnostics.', example: '"my-widgemo"' },
  { category: 'WidgemoConfig', property: 'containerFrame', type: 'ContainerFrame', status: 'implemented', description: 'Outer shell styling controls for the widgemo container.', usage: 'Use this for shell-level borders, padding, and shadow rather than per-zone styling.', example: '{ shadow: true }' },
  { category: 'WidgemoConfig', property: 'zones', type: '{ header?: ZoneConfig; content: ContentConfig; footer?: ZoneConfig }', status: 'implemented', description: 'Object containing header, content, and footer zones.', usage: 'This is the main configuration entrypoint for composing the component.', example: '{ header: { title: "Users" }, content: { mode: "table", item: { fields: [...] } } }', isComplexType: true, complexTypeSection: 'ContentConfig' },
  { category: 'WidgemoConfig', property: 'theme', type: 'WidgemoTheme', status: 'implemented', description: 'Theme configuration for colors, fonts, and styling', usage: 'Applied throughout the component for consistent theming.', example: '{ colors: { primary: "#007bff" }, fonts: { body: "Arial" } }', isComplexType: true, complexTypeSection: 'WidgemoTheme' },
  { category: 'WidgemoConfig', property: 'collapse', type: '{ initialState: "expanded" | "collapsed" | "fixed"; button?: boolean }', status: 'implemented', description: 'Controls the root widgemo collapse state.', usage: 'Use this to start the whole component expanded, collapsed, or fixed open.', example: '{ initialState: "expanded" }' },
  { category: 'WidgemoConfig', property: 'style', type: 'React.CSSProperties', status: 'implemented', description: 'Inline styles applied to the outer widgemo container.', usage: 'Use for one-off shell styling overrides.', example: '{ borderRadius: "12px" }' },
  { category: 'WidgemoConfig', property: 'devMode', type: 'boolean | DevModeConfig', status: 'implemented', description: 'Developer tooling and inspector configuration.', usage: 'Enable or customize dev overlays and inspector behavior.', example: 'true' },
  { category: 'WidgemoConfig', property: 'interactions', type: '{ onEvent?: InteractionEventHandler }', status: 'implemented', description: 'Global interaction sink for actions and gestures.', usage: 'Use this when you want a single callback for all widgemo interactions.', example: '{ onEvent: (context) => console.log(context) }' },
  { category: 'WidgemoConfig', property: 'preRender', type: '() => void', status: 'implemented', description: 'Hook invoked before the component renders.', usage: 'Useful for setup or instrumentation in advanced integrations.', example: '() => console.log("pre-render")' },

  // ZoneConfig properties
  { category: 'ZoneConfig', property: 'enabled', type: 'boolean', status: 'implemented', description: 'Whether the zone is rendered.', usage: 'Use this to disable a header or footer zone without removing its configuration.', example: 'true' },
  { category: 'ZoneConfig', property: 'layout', type: 'ZoneLayout', status: 'implemented', description: 'Layout options for title, subtitle, icon, and action composition.', usage: 'Controls header/footer presentation such as title alignment or actions below the title.', example: '{ titlePosition: "center", actionsPosition: "below" }' },
  { category: 'ZoneConfig', property: 'title', type: 'string | ((data) => string) | React.ReactNode', status: 'implemented', description: 'Zone title for display.', usage: 'Shown in zone headers and footers.', example: '"User Data"' },
  { category: 'ZoneConfig', property: 'subtitle', type: 'string | ((data, id) => string) | React.ReactNode', status: 'implemented', description: 'Zone subtitle or renderer function.', usage: 'Use for supporting context under the title.', example: '"Current users"' },
  { category: 'ZoneConfig', property: 'icon', type: 'string | IconConfig', status: 'implemented', description: 'Icon for the zone.', usage: 'Displayed next to the title in header/footer zones.', example: '"table"' },
  { category: 'ZoneConfig', property: 'actions', type: 'ActionConfig[]', status: 'implemented', description: 'Canonical zone-level actions.', usage: 'Use arrays of action configs for zone actions.', example: '[{ id: "refresh", label: "Refresh", placement: "pinned" }]' },
  { category: 'ZoneConfig', property: 'actionOverflow', type: '{ maxInline?: number | { mobile: number; tablet: number; desktop: number }; menuLabel?: string; menuTooltip?: string; indicator?: "pulse" | "scale" | "color-shift" | "none" }', status: 'implemented', description: 'Overflow behavior for zone actions.', usage: 'Controls when zone actions tuck into a menu.', example: '{ maxInline: 2, menuLabel: "More" }' },
  { category: 'ZoneConfig', property: 'collapse', type: '{ initialState: "expanded" | "collapsed" | "fixed"; button?: boolean }', status: 'implemented', description: 'Per-zone collapse behavior.', usage: 'Use on header or footer zones when the zone itself should be collapsible.', example: '{ initialState: "expanded" }' },
  { category: 'ZoneConfig', property: 'className', type: 'string', status: 'implemented', description: 'Custom CSS class for the zone wrapper.', usage: 'Use for app-level styling hooks.', example: '"text-center"' },
  { category: 'ZoneConfig', property: 'themeOverrides', type: 'ZoneTheme', status: 'implemented', description: 'Per-zone theme overrides.', usage: 'Override typography, colors, spacing, and borders for a specific zone.', example: '{ backgroundColor: "#f0f0f0" }', isComplexType: true, complexTypeSection: 'ZoneTheme' },
  { category: 'ZoneConfig', property: 'style', type: 'React.CSSProperties', status: 'implemented', description: 'Inline styles for the zone wrapper.', usage: 'Use for one-off CSS overrides on the rendered zone element.', example: '{ padding: "1rem" }' },

  // ContentConfig properties
  { category: 'ContentConfig', property: 'mode', type: '"table" | "grid" | "board" | "carousel" | "chart" | string', status: 'implemented', description: 'Display mode for the content zone.', usage: 'This chooses the renderer used for the content area.', example: '"table"' },
  { category: 'ContentConfig', property: 'item', type: 'ItemConfig', status: 'implemented', description: 'Item rendering configuration.', usage: 'Defines the fields and layout used to render each entity.', example: '{ fields: [{ key: "name", label: "Name" }], layout: { type: "auto" } }', isComplexType: true, complexTypeSection: 'FieldConfig' },
  { category: 'ContentConfig', property: 'modeConfig', type: 'ModeConfig', status: 'implemented', description: 'Mode-specific configuration for table, grid, board, carousel, or chart.', usage: 'Use this to pass renderer-specific options without mixing them into the base content config.', example: '{ table: { type: "traditional" } }' },
  { category: 'ContentConfig', property: 'actions', type: 'ActionConfig[]', status: 'implemented', description: 'Per-item action definitions.', usage: 'These are rendered within content items and rows.', example: '[{ id: "edit", label: "Edit", placement: "menu" }]' },
  { category: 'ContentConfig', property: 'actionOverflow', type: '{ maxInline?: number | { mobile: number; tablet: number; desktop: number }; menuLabel?: string; menuTooltip?: string; indicator?: "pulse" | "scale" | "color-shift" | "none" }', status: 'implemented', description: 'Overflow rules for content item actions.', usage: 'Controls when per-item actions collapse into a menu.', example: '{ maxInline: 2, indicator: "none" }' },
  { category: 'ContentConfig', property: 'groupings', type: 'GroupingConfig[]', status: 'implemented', description: 'Grouping rules for organizing content data.', usage: 'Use this to group items by one or more fields.', example: '[{ fieldKey: "department" }]', isComplexType: true, complexTypeSection: 'GroupingConfig' },
  { category: 'ContentConfig', property: 'sorting', type: 'SortConfig[]', status: 'implemented', description: 'Sorting rules for content data.', usage: 'Applies initial sort order and mode-aware sorting behavior.', example: '[{ fieldKey: "name", direction: "asc" }]', isComplexType: true, complexTypeSection: 'SortingConfig' },
  { category: 'ContentConfig', property: 'filtering', type: 'StaticFilterRule[]', status: 'implemented', description: 'Static filter rules for content data.', usage: 'Filters entities before rendering.', example: '[{ fieldKey: "status", operator: "eq", value: "active" }]', isComplexType: true, complexTypeSection: 'StaticFilterRule' },
  { category: 'ContentConfig', property: 'search', type: '{ enabled?: boolean; placeholder?: string; fields?: string[]; debounceMs?: number; onSearch?: (query: string) => void }', status: 'implemented', description: 'Search bar configuration.', usage: 'Adds client-side or callback-driven search behavior to the content zone.', example: '{ enabled: true, placeholder: "Search users..." }' },
  { category: 'ContentConfig', property: 'pagination', type: '{ pageSize: number; initialPage?: number; onPageChange?: (page: number) => void }', status: 'implemented', description: 'Pagination settings for content data.', usage: 'Slices visible data into pages after filtering and sorting.', example: '{ pageSize: 10 }', isComplexType: true, complexTypeSection: 'PaginationConfig' },
  { category: 'ContentConfig', property: 'responsive', type: '{ breakpoints: Record<string, { mode?: string; modeConfig?: Partial<ModeConfig> }> }', status: 'implemented', description: 'Responsive mode and config overrides.', usage: 'Switch modes or override mode settings at named breakpoints.', example: '{ breakpoints: { mobile: { mode: "carousel" } } }' },
  { category: 'ContentConfig', property: 'status', type: '"idle" | "loading" | "success" | "error"', status: 'implemented', description: 'Render status for loading and error states.', usage: 'Use this with loadingState or errorState to render non-success states.', example: '"loading"' },

  // TableStylingConfig properties
  { category: 'TableStylingConfig', property: 'showBorder', type: 'boolean', status: 'implemented', description: 'Show table border', usage: 'Adds border around table.', example: 'true' },
  { category: 'TableStylingConfig', property: 'borderStyle', type: 'string', status: 'implemented', description: 'Table border style', usage: 'CSS border-style property.', example: "'solid'" },
  { category: 'TableStylingConfig', property: 'borderWidth', type: 'string', status: 'implemented', description: 'Table border width', usage: 'CSS border-width property.', example: "'1px'" },
  { category: 'TableStylingConfig', property: 'borderColor', type: 'string', status: 'implemented', description: 'Table border color', usage: 'CSS border-color property.', example: "'#ddd'" },
  { category: 'TableStylingConfig', property: 'cellBorder', type: 'boolean', status: 'implemented', description: 'Show borders between cells', usage: 'Adds borders between table cells.', example: 'true' },
  { category: 'TableStylingConfig', property: 'headerBorder', type: 'boolean', status: 'implemented', description: 'Show border under header row', usage: 'Adds border below table header.', example: 'true' },
  { category: 'TableStylingConfig', property: 'backgroundColor', type: 'string', status: 'implemented', description: 'Table background color', usage: 'Sets table background.', example: "'#ffffff'" },

  // GridConfig properties
  { category: 'GridConfig', property: 'minItemWidth', type: 'string', status: 'implemented', description: 'Minimum width for grid items', usage: 'Creates responsive grid with auto-fit.', example: '"200px"' },
  { category: 'GridConfig', property: 'gap', type: 'string', status: 'implemented', description: 'Gap between grid items', usage: 'CSS gap property.', example: '"10px"' },
  { category: 'GridConfig', property: 'aspectRatio', type: 'string', status: 'not-implemented', description: 'Grid item aspect ratio', usage: 'Not implemented.', example: '"16/9"' },

  // TableConfig properties
  { category: 'TableConfig', property: 'showBorders', type: 'boolean', status: 'implemented', description: 'Show table borders', usage: 'Adds borders to table.', example: 'true' },
  { category: 'TableConfig', property: 'alternatingRows', type: 'boolean', status: 'implemented', description: 'Alternating row backgrounds', usage: 'Toggle alternating row colors.', example: 'true' },
  { category: 'TableConfig', property: 'compact', type: 'boolean', status: 'implemented', description: 'Compact table spacing', usage: 'Reduces padding.', example: 'true' },

  // BoardConfig properties
  { category: 'BoardConfig', property: 'columns', type: '{ field: string; items: Array<{ id: string; label: string; value?: string | number | boolean; color?: string }> }', status: 'implemented', description: 'Board column axis configuration', usage: 'Defines the field used for columns and the column items.', example: '{ field: "status", items: [{ id: "todo", label: "To Do" }] }' },
  { category: 'BoardConfig', property: 'swimlanes', type: '{ field: string; items: Array<{ id: string; label: string; value?: string | number | boolean; color?: string }>; layout?: { type: "collapsible" | "matrix" } }', status: 'implemented', description: 'Board swimlane axis configuration', usage: 'Defines the field used for swimlanes and the swimlane items.', example: '{ field: "department", items: [{ id: "engineering", label: "Engineering", value: "Engineering" }] }' },
  { category: 'BoardConfig', property: 'dragEnabled', type: 'boolean', status: 'implemented', description: 'Enable drag and drop', usage: 'Enables board drag and drop interactions.', example: 'true' },

  // EmptyStateConfig properties
  { category: 'EmptyStateConfig', property: 'message', type: 'string', status: 'implemented', description: 'Empty state message', usage: 'Displayed when no data.', example: '"No items found"' },
  { category: 'EmptyStateConfig', property: 'icon', type: 'React.ComponentType', status: 'implemented', description: 'Empty state icon component', usage: 'Custom icon for empty state.', example: 'MyIconComponent' },
  { category: 'EmptyStateConfig', property: 'action', type: 'Object', status: 'implemented', description: 'Empty state action button', usage: 'Button shown in empty state.', example: '{ label: "Add Item", onClick: () => {} }' },

  // HeaderConfig properties
  { category: 'HeaderConfig', property: 'onHover', type: 'string[]', status: 'implemented', description: 'Buttons shown on hover', usage: 'Controls shown when hovering header.', example: '["viewToggle", "columnSelector"]' },
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
  { category: 'ChartConfig', property: 'yAxis', type: 'string | string[]', status: 'implemented', description: 'Field(s) used for chart series values.', usage: 'Point each series at one or more numeric fields.', example: "'value'" },
  { category: 'ChartConfig', property: 'settings', type: 'Record<string, any>', status: 'partial', description: 'Additional chart settings', usage: 'Passed to Recharts components.', example: '{ showLegend: true }' },

  // PaginationConfig properties
  { category: 'PaginationConfig', property: 'enabled', type: 'boolean', status: 'implemented', description: 'Enable pagination', usage: 'Shows pagination controls.', example: 'true' },
  { category: 'PaginationConfig', property: 'defaultPageSize', type: 'number', status: 'implemented', description: 'Default items per page', usage: 'Initial page size.', example: '10' },
  { category: 'PaginationConfig', property: 'pageSizeOptions', type: 'number[]', status: 'implemented', description: 'Available page sizes', usage: 'Options in page size selector.', example: '[10, 25, 50]' },

  // SortingConfig properties
  { category: 'SortingConfig', property: 'enabled', type: 'boolean', status: 'partial', description: 'Enable sorting', usage: 'Allows column sorting.', example: 'true' },
  { category: 'SortingConfig', property: 'defaultSort', type: 'Object', status: 'implemented', description: 'Default sort configuration', usage: 'Initial sort applied.', example: '{ field: "name", direction: "asc" }' },

  // StaticFilterRule properties
  { category: 'StaticFilterRule', property: 'fieldKey', type: 'string', status: 'implemented', description: 'Entity field key used for the filter check.', usage: 'Must match a field on each data item.', example: '"status"' },
  { category: 'StaticFilterRule', property: 'operator', type: '"eq" | "ne" | "contains" | "startswith" | "gt" | "lt"', status: 'implemented', description: 'Comparison operator for the filter rule.', usage: 'Use one of the supported static operators from core.', example: '"eq"' },
  { category: 'StaticFilterRule', property: 'value', type: 'string | number | boolean', status: 'implemented', description: 'Comparison value for the selected operator.', usage: 'Compared against the field value on each entity.', example: '"active"' },

  // FieldConfig properties
  { category: 'FieldConfig', property: 'key', type: 'string', status: 'implemented', description: 'Unique field key', usage: 'Used in rendering and data mapping.', example: '"id"' },
  { category: 'FieldConfig', property: 'label', type: 'string', status: 'implemented', description: 'Human-readable label', usage: 'Displayed in headers/labels.', example: '"ID"' },
  { category: 'FieldConfig', property: 'type', type: "'text' | 'number' | 'date' | 'time' | 'datetime' | 'timestamp' | 'duration' | 'boolean' | 'select' | 'relation' | 'textarea' | 'email' | 'url'", status: 'partial', description: 'Data type', usage: "Temporal types require explicit renderAsOptions contracts: parseMode for date/time/datetime/timestamp and unit for duration.", example: "'date'" },
  { category: 'FieldConfig', property: 'options', type: 'Array<{ value: string | number | boolean; label: string }>', status: 'implemented', description: 'Options for select/relation', usage: 'For select fields.', example: '[{ value: "active", label: "Active" }]' },
  { category: 'FieldConfig', property: 'validation', type: 'Object', status: 'not-implemented', description: 'Validation rules', usage: 'Not implemented: Property exists but no validation logic.', example: '{ required: true }' },
  { category: 'FieldConfig', property: 'render', type: 'Object', status: 'not-implemented', description: 'Custom rendering', usage: 'Not implemented: Property exists but not used.', example: '{ component: MyComponent }' },
  { category: 'FieldConfig', property: 'renderAs', type: "'text' | 'boolean' | 'select' | 'custom' | 'link' | 'progress' | 'rating' | 'date' | 'time' | 'datetime' | 'timestamp' | 'duration'", status: 'implemented', description: 'Render type', usage: 'Defaults to type. Temporal renderers require explicit parseMode/unit contracts in renderAsOptions.', example: "'date'" },
  { category: 'FieldConfig', property: 'booleanTrueLabel', type: 'string', status: 'implemented', description: 'True label for booleans', usage: 'Used in rendering.', example: '"Yes"' },
  { category: 'FieldConfig', property: 'booleanFalseLabel', type: 'string', status: 'implemented', description: 'False label for booleans', usage: 'Used in rendering.', example: '"No"' },
  { category: 'FieldConfig', property: 'sortable', type: 'boolean', status: 'not-implemented', description: 'Sortable flag', usage: 'Flag exists, but sorting UI incomplete.', example: 'true' },
  { category: 'FieldConfig', property: 'filterable', type: 'boolean', status: 'not-implemented', description: 'Filterable flag', usage: 'Not implemented: Flag exists, no filtering.', example: 'true' },
  { category: 'FieldConfig', property: 'editable', type: 'boolean', status: 'implemented', description: 'Editable flag', usage: 'Used in modals.', example: 'true' },
  { category: 'FieldConfig', property: 'visible', type: 'boolean', status: 'implemented', description: 'Visibility flag', usage: 'Controls display.', example: 'true' },
  { category: 'FieldConfig', property: 'width', type: 'number | string', status: 'not-implemented', description: 'Width in table', usage: 'Not implemented in table view.', example: '100' },
  { category: 'FieldConfig', property: 'align', type: "'left' | 'center' | 'right'", status: 'implemented', description: 'Text alignment', usage: 'Applied in table cells.', example: "'center'" },
  { category: 'FieldConfig', property: 'showLabel', type: 'boolean', status: 'implemented', description: 'Show label in cards', usage: 'For card views.', example: 'true' },
  { category: 'FieldConfig', property: 'renderAsOptions', type: 'Object', status: 'implemented', description: 'Renderer-specific options for renderAs modes such as link, currency, badge, progress, rating, and temporal renderers.', usage: 'Used with renderAs to customize formatting and interactive behavior. Temporal renderers must provide parseMode/unit.', example: "{ parseMode: 'iso-date', formatPreset: 'medium' }", isComplexType: true, complexTypeSection: 'RenderAsOptions' },

  // RenderAsOptions properties
  { category: 'RenderAsOptions', property: 'text', type: 'string | ((entity: Entity) => string)', status: 'implemented', description: 'Custom link text when renderAs is "link".', usage: 'If not provided, uses the field value.', example: '"Click here"' },
  { category: 'RenderAsOptions', property: 'newTab', type: 'boolean', status: 'implemented', description: 'Open link renderers in a new tab.', usage: 'Adds target="_blank" and rel attributes.', example: 'true' },
  { category: 'RenderAsOptions', property: 'externalWarning', type: 'boolean', status: 'implemented', description: 'Show an external-link indicator for link renderers.', usage: 'Useful when links navigate away from the current app.', example: 'true' },
  { category: 'RenderAsOptions', property: 'url', type: 'string | ((entity: Entity) => string)', status: 'implemented', description: 'Custom URL when renderAs is "link".', usage: 'Use this when the link target differs from the field value.', example: '"https://example.com"' },

  // MediaFieldConfig properties (for mediaConfig.fields array)
  { category: 'MediaFieldConfig', property: 'field', type: 'string', status: 'implemented', description: 'Field name/path to extract media source', usage: 'Dot notation path to media field in data items.', example: '"src"' },
  { category: 'MediaFieldConfig', property: 'placement', type: "'cell' | 'background' | 'header' | 'body' | 'overlay' | 'badge' | 'carousel'", status: 'implemented', description: 'Where to place the media element', usage: 'Varies by mode: Table=cell only, Grid=cell/background, Board=background/header/body, Chart=none. Overlay, badge, and carousel placements are currently unsupported.', example: "'cell'" },
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
  { category: 'WidgemoProps', property: 'data', type: 'T[]', status: 'implemented', description: 'Array of data entities to display', usage: 'The data to be rendered by the component.', example: '[{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }]' },
  { category: 'WidgemoProps', property: 'config', type: 'WidgemoConfig<T>', status: 'implemented', description: 'Configuration object', usage: 'Core to component behavior and rendering options.', example: '{ zones: { content: { mode: "table", item: { fields: [...] } } } }' },
  { category: 'WidgemoProps', property: 'className', type: 'string', status: 'implemented', description: 'Additional CSS class', usage: 'Applied to root element for styling integration.', example: '"my-widgemo-wrapper"' },
  { category: 'WidgemoProps', property: 'id', type: 'string', status: 'implemented', description: 'Unique identifier for the component', usage: 'Used for debugging and component identification.', example: '"data-table-1"' },
  { category: 'WidgemoProps', property: 'loading', type: 'boolean', status: 'implemented', description: 'External loading state', usage: 'Shows loading UI when true.', example: 'true' },
  { category: 'WidgemoProps', property: 'error', type: 'any', status: 'implemented', description: 'External error state', usage: 'Shows error UI when set. Pass an error object or message.', example: '{ message: "Failed to load data" }' },
  { category: 'WidgemoProps', property: 'onRetry', type: '() => void', status: 'implemented', description: 'Retry callback when error state is active', usage: 'Called when user clicks the retry button in error UI.', example: '() => refetchData()' },
];

export const fieldTypes = [
  { value: 'text', label: 'Text' },
  { value: 'number', label: 'Number' },
  { value: 'boolean', label: 'Boolean' },
  { value: 'date', label: 'Date' },
  { value: 'time', label: 'Time' },
  { value: 'datetime', label: 'Datetime' },
  { value: 'timestamp', label: 'Timestamp' },
  { value: 'duration', label: 'Duration' },
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
    id: 'preset-minimal',
    collapse: { initialState: 'expanded' as const },
    zones: {
      header: {
        title: 'Minimal',
        subtitle: 'Smallest current table preset',
      },
      content: {
        mode: 'table' as const,
        modeConfig: { table: { type: 'traditional' as const } },
        item: {
          layout: { type: 'auto' as const },
          fields: [
            { key: 'name', label: 'Name', type: 'text' as const },
            { key: 'value', label: 'Value', type: 'number' as const },
          ],
        },
      },
    },
  },
  standard: {
    id: 'preset-standard',
    collapse: { initialState: 'expanded' as const },
    zones: {
      header: {
        title: 'Standard',
        subtitle: 'Basic table preset with header actions',
        actions: [
          { id: 'refresh', label: 'Refresh', icon: 'refresh', placement: 'pinned' as const },
          { id: 'add', label: 'Add', icon: 'add', placement: 'menu' as const },
        ],
      },
      content: {
        mode: 'table' as const,
        modeConfig: { table: { type: 'traditional' as const, hover: true } },
        item: {
          layout: { type: 'auto' as const },
          fields: [
            { key: 'id', label: 'ID', type: 'number' as const },
            { key: 'name', label: 'Name', type: 'text' as const },
            { key: 'status', label: 'Active', type: 'boolean' as const },
          ],
        },
        actions: [
          { id: 'edit', label: 'Edit', icon: 'edit', placement: 'menu' as const },
          { id: 'delete', label: 'Delete', icon: 'delete', placement: 'menu' as const, variant: 'danger' as const },
        ],
      },
    },
    containerFrame: { shadow: true },
  },
  advanced: {
    id: 'preset-advanced',
    collapse: { initialState: 'expanded' as const },
    zones: {
      header: {
        title: 'Advanced',
        subtitle: 'Search, pagination, sorting, and action overflow',
        actions: [
          { id: 'refresh', label: 'Refresh', icon: 'refresh', placement: 'pinned' as const },
          { id: 'view-toggle', label: 'View Toggle', icon: 'view', placement: 'onHover' as const },
          { id: 'column-selector', label: 'Columns', icon: 'table', placement: 'menu' as const },
          { id: 'add', label: 'Add', icon: 'add', placement: 'menu' as const },
        ],
        actionOverflow: { maxInline: 2, menuLabel: 'More' },
      },
      content: {
        mode: 'table' as const,
        modeConfig: {
          table: {
            type: 'traditional' as const,
            alternatingRows: true,
            hover: true,
            showHeader: true,
          },
        },
        search: { enabled: true, placeholder: 'Search records...' },
        pagination: { pageSize: 10 },
        sorting: [{ fieldKey: 'createdAt', direction: 'desc' as const }],
        item: {
          layout: { type: 'auto' as const },
          fields: [
            { key: 'id', label: 'ID', type: 'number' as const, sortable: true },
            { key: 'name', label: 'Name', type: 'text' as const, filterable: true },
            { key: 'category', label: 'Category', type: 'select' as const, options: [], filterable: true },
            { key: 'status', label: 'Active', type: 'boolean' as const, filterable: true },
            {
              key: 'createdAt',
              label: 'Created',
              type: 'date' as const,
              renderAs: 'date' as const,
              renderAsOptions: { parseMode: 'iso-date', locale: 'en-US', timezone: 'local', formatPreset: 'short' },
              sortable: true,
            },
          ],
        },
        actions: [
          { id: 'edit', label: 'Edit', icon: 'edit', placement: 'menu' as const },
          { id: 'delete', label: 'Delete', icon: 'delete', placement: 'menu' as const, variant: 'danger' as const },
        ],
      },
    },
    containerFrame: { shadow: true },
  },
};