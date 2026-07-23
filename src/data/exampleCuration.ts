export const CURATED_EXAMPLE_IDS = {
  richCellsTable: 'rich-cells-table',
  basicGridLayout: 'basic-grid-layout',
  carouselFull: 'carousel-full',
  boardBasic: 'board-basic',
  chartThroughputMixed: 'chart-throughput-mixed',
  chartAllocationDonut: 'chart-allocation-donut',
  responsiveModeSwitching: 'responsive-mode-switching',
  perItemActionsDemo: 'per-item-actions-demo',
  searchWithPagination: 'search-with-pagination',
  groupedRowsWithCollapse: 'grouped-rows-with-collapse',
  zoneDynamicRenderers: 'zone-dynamic-renderers',
  renderasBadgeAdvanced: 'renderas-badge-advanced',
  currencyAdvanced: 'currency-advanced',
  imageAdvanced: 'image-advanced',
  itemLayoutGrid: 'item-layout-grid',
  contentLoadingStateSkeletonPieChart: 'content-loading-state-skeleton-pie-chart',
  contentLoadingStateSpinner: 'content-loading-state-spinner',
  contentErrorState: 'content-error-state',
} as const;

export const EXAMPLE_CATEGORY_BY_ID: Record<string, string> = {
  [CURATED_EXAMPLE_IDS.richCellsTable]: 'Core Modes',
  [CURATED_EXAMPLE_IDS.basicGridLayout]: 'Core Modes',
  [CURATED_EXAMPLE_IDS.carouselFull]: 'Core Modes',
  [CURATED_EXAMPLE_IDS.boardBasic]: 'Core Modes',
  [CURATED_EXAMPLE_IDS.chartThroughputMixed]: 'Core Modes',
  [CURATED_EXAMPLE_IDS.chartAllocationDonut]: 'Core Modes',
  [CURATED_EXAMPLE_IDS.responsiveModeSwitching]: 'Core Modes',
  [CURATED_EXAMPLE_IDS.perItemActionsDemo]: 'Interactions',
  [CURATED_EXAMPLE_IDS.searchWithPagination]: 'Interactions',
  [CURATED_EXAMPLE_IDS.groupedRowsWithCollapse]: 'Interactions',
  [CURATED_EXAMPLE_IDS.zoneDynamicRenderers]: 'Data Presentation',
  [CURATED_EXAMPLE_IDS.renderasBadgeAdvanced]: 'Data Presentation',
  [CURATED_EXAMPLE_IDS.currencyAdvanced]: 'Data Presentation',
  [CURATED_EXAMPLE_IDS.imageAdvanced]: 'Data Presentation',
  [CURATED_EXAMPLE_IDS.itemLayoutGrid]: 'Layout',
  [CURATED_EXAMPLE_IDS.contentLoadingStateSpinner]: 'States',
  [CURATED_EXAMPLE_IDS.contentErrorState]: 'States',
};

export const EXAMPLES_PAGE_CORE_IDS = [
  CURATED_EXAMPLE_IDS.richCellsTable,
  CURATED_EXAMPLE_IDS.basicGridLayout,
  CURATED_EXAMPLE_IDS.carouselFull,
  CURATED_EXAMPLE_IDS.boardBasic,
  CURATED_EXAMPLE_IDS.chartThroughputMixed,
  CURATED_EXAMPLE_IDS.chartAllocationDonut,
  CURATED_EXAMPLE_IDS.responsiveModeSwitching,
  CURATED_EXAMPLE_IDS.perItemActionsDemo,
  CURATED_EXAMPLE_IDS.searchWithPagination,
  CURATED_EXAMPLE_IDS.groupedRowsWithCollapse,
  CURATED_EXAMPLE_IDS.zoneDynamicRenderers,
  CURATED_EXAMPLE_IDS.renderasBadgeAdvanced,
  CURATED_EXAMPLE_IDS.currencyAdvanced,
  CURATED_EXAMPLE_IDS.imageAdvanced,
  CURATED_EXAMPLE_IDS.itemLayoutGrid,
  CURATED_EXAMPLE_IDS.contentLoadingStateSkeletonPieChart,
  CURATED_EXAMPLE_IDS.contentLoadingStateSpinner,
  CURATED_EXAMPLE_IDS.contentErrorState,
] as const;

export const GALLERY_FEATURED_IDS = [
  CURATED_EXAMPLE_IDS.richCellsTable,
  CURATED_EXAMPLE_IDS.basicGridLayout,
  CURATED_EXAMPLE_IDS.boardBasic,
  CURATED_EXAMPLE_IDS.chartThroughputMixed,
  CURATED_EXAMPLE_IDS.responsiveModeSwitching,
  CURATED_EXAMPLE_IDS.perItemActionsDemo,
] as const;

export const EXAMPLES_PAGE_DESCRIPTION_BY_ID: Record<string, string> = {
  [CURATED_EXAMPLE_IDS.richCellsTable]: 'Images, formatted values, and badges in a rich table layout. A realistic starting point for any people or resource directory.',
  [CURATED_EXAMPLE_IDS.basicGridLayout]: 'Responsive card grid driven entirely by field config. Switch from table to grid with one property change.',
  [CURATED_EXAMPLE_IDS.perItemActionsDemo]: 'Pinned, hover, and menu actions per row - configured declaratively, no custom render logic required.',
  [CURATED_EXAMPLE_IDS.boardBasic]: "Kanban columns that emerge automatically from your data's status field. No column definitions, no drag-drop boilerplate.",
  [CURATED_EXAMPLE_IDS.chartThroughputMixed]: 'Mixed series chart - bars, area, and line - from the same data and field schema as your table. One component, zero charting setup.',
  [CURATED_EXAMPLE_IDS.responsiveModeSwitching]: 'Table on desktop, grid on tablet, carousel on mobile. Resize the window and watch Widgemo switch modes automatically.',
  [CURATED_EXAMPLE_IDS.zoneDynamicRenderers]: 'The zone header title and subtitle can reflect live data - record counts, derived labels, or any computed string. No external state required.',
  [CURATED_EXAMPLE_IDS.renderasBadgeAdvanced]: 'Render any field as a badge with icon, color, size, and style controlled by config. Use a colorMap function for data-driven badge colors.',
  [CURATED_EXAMPLE_IDS.currencyAdvanced]: 'Currency fields with compact notation, positive/negative colorization, locale formatting, and decimal control - all from field config.',
  [CURATED_EXAMPLE_IDS.imageAdvanced]: 'Every image display option in one view: objectFit, circular crop, border, shadow, lightbox, and lazy loading. Combine freely per field.',
  [CURATED_EXAMPLE_IDS.itemLayoutGrid]: 'Full CSS grid control per item - define columns, gap, and template areas to position fields exactly where you need them.',
  [CURATED_EXAMPLE_IDS.carouselFull]: 'Every carousel config option in one example: item dimensions, indicators, arrows, infinite scroll, autoplay, and drag threshold.',
  [CURATED_EXAMPLE_IDS.chartAllocationDonut]: 'Donut chart mode for composition and proportion data. Configure series, labels, and legend from the same field schema as your table.',
  [CURATED_EXAMPLE_IDS.contentLoadingStateSkeletonPieChart]: 'Skeleton loading variant shaped like a pie chart. Use it when your chart data loads async and you want a visually appropriate placeholder.',
  [CURATED_EXAMPLE_IDS.contentLoadingStateSpinner]: 'Built-in loading spinner state - animated, visually distinct from skeleton placeholders. Triggered by a single status prop.',
  [CURATED_EXAMPLE_IDS.contentErrorState]: 'Error state with warning severity and a centered retry action. Configure message, severity, and retry behavior without custom error components.',
  [CURATED_EXAMPLE_IDS.searchWithPagination]: 'Search filters the full dataset first, then pagination slices the results. Page resets automatically on each new query - no wiring required.',
  [CURATED_EXAMPLE_IDS.groupedRowsWithCollapse]: 'Group records by field and collapse each group independently. Pure config-driven grouping with no custom components.',
};

// Home gallery currently uses the same curated copy; keep a dedicated export for explicit per-surface overrides.
export const GALLERY_DESCRIPTION_BY_ID: Record<string, string> = {
  ...EXAMPLES_PAGE_DESCRIPTION_BY_ID,
};

export const EXAMPLES_PAGE_CATEGORIES = [
  'All',
  'Core Modes',
  'Interactions',
  'Data Presentation',
  'Layout',
  'States',
  'App Mockups',
] as const;
