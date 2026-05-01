import type {
  ActionConfig,
  InteractionContext,
  ContentConfig,
  Entity,
  FieldConfig,
  ItemConfig,
  TableModeConfig,
  WidgemoConfig,
} from '@widgemo/widgemo-core';
import { teaserSampleData } from './sampleData';
import { fireDemoAction, type DemoActionSource } from '../utils/demoActionBus';

type ProgressiveExample = {
  id: string;
  title: string;
  description: string;
  data: Entity[];
  config: WidgemoConfig<Entity>;
};

const eightUsersData = teaserSampleData.slice(0, 8) as Entity[];
const tenUsersData = teaserSampleData.slice(0, 10) as Entity[];
const twentyUsersData = teaserSampleData.slice(0, 20) as Entity[];

const autoItemLayout = { type: 'auto' as const };
const traditionalTableConfig = { type: 'traditional' as const };
const statusColorMap = {
  active: '#198754',
  pending: '#ffc107',
  inactive: '#dc3545',
};

const toTitle = (value: string): string =>
  value
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (char) => char.toUpperCase())
    .trim();

const autoDiscoveredFields: FieldConfig[] = Object.keys(teaserSampleData[0] ?? {}).map((key) => ({
  key,
  label: toTitle(key),
}));

const namedFields: FieldConfig[] = [
  { key: 'name', label: 'Name', type: 'text' },
  { key: 'email', label: 'Email', type: 'email' },
  { key: 'role', label: 'Role', type: 'text' },
  { key: 'department', label: 'Department', type: 'text' },
  { key: 'lastLogin', label: 'Last Login', type: 'date' },
  { key: 'status', label: 'Status', type: 'text' },
];

const sortableFields: FieldConfig[] = [
  { key: 'name', label: 'Name', type: 'text', sortable: true, width: '160px' },
  { key: 'email', label: 'Email', type: 'email', sortable: false },
  { key: 'role', label: 'Role', type: 'text' },
  { key: 'department', label: 'Department', type: 'text', sortable: true, width: '140px' },
  { key: 'lastLogin', label: 'Last Login', type: 'date', sortable: true, width: '130px' },
  { key: 'status', label: 'Status', type: 'text', sortable: false },
];

const statusField: FieldConfig = {
  key: 'status',
  label: 'Status',
  type: 'text',
  renderAs: 'badge',
  renderAsOptions: {
    colorMap: statusColorMap,
  },
};

const currencyField: FieldConfig = {
  key: 'amount',
  label: 'Salary',
  type: 'number',
  renderAs: 'currency',
  renderAsOptions: { currency: 'USD', locale: 'en-US', compact: false },
};

const ratingField: FieldConfig = {
  key: 'rating',
  label: 'Rating',
  type: 'number',
  renderAs: 'rating',
  renderAsOptions: { max: 5, color: '#f59e0b' },
};

const progressField: FieldConfig = {
  key: 'progress',
  label: 'Progress',
  type: 'number',
  renderAs: 'progress',
  renderAsOptions: { color: '#4caf50', showPercentage: true },
};

const avatarField: FieldConfig = {
  key: 'src',
  label: 'Avatar',
  type: 'image',
  imageOptions: { circular: true, width: 36, height: 36 },
};

const badgeCurrencyFields: FieldConfig[] = [
  { key: 'name', label: 'Name', type: 'text', sortable: true },
  { key: 'email', label: 'Email', type: 'email' },
  { key: 'role', label: 'Role', type: 'text' },
  { key: 'department', label: 'Department', type: 'text', sortable: true },
  statusField,
  currencyField,
];

const richFields: FieldConfig[] = [
  avatarField,
  { key: 'name', label: 'Name', type: 'text', sortable: true },
  { key: 'department', label: 'Department', type: 'text' },
  statusField,
  progressField,
  ratingField,
];

const createItem = (fields: FieldConfig[], overrides: Partial<ItemConfig<Entity>> = {}): ItemConfig<Entity> => ({
  fields,
  layout: autoItemLayout,
  ...overrides,
});

const createTableContent = (
  data: Entity[],
  fields: FieldConfig[],
  overrides: Omit<Partial<ContentConfig<Entity>>, 'mode' | 'data' | 'layout' | 'item' | 'modeConfig'> & {
    table?: TableModeConfig;
    item?: Partial<ItemConfig<Entity>>;
  } = {},
): ContentConfig<Entity> => {
  const { table, item, ...rest } = overrides;
  void data;
  return {
    mode: 'table',
    ...(table ? { modeConfig: { table } } : {}),
    item: createItem(fields, item),
    ...rest,
  };
};

const emitDemoInteraction = (ctx: InteractionContext): void => {
  fireDemoAction({
    actionId: ctx.interactionId,
    actionLabel: ctx.interactionLabel,
    source: 'interactions.onEvent',
    ...(ctx.entity ? { entity: ctx.entity as Record<string, unknown> } : {}),
    data: ctx.data as Record<string, unknown>[],
    zone: ctx.zone,
  });
};

const emitLocalInteraction = (ctx: InteractionContext, source: DemoActionSource): void => {
  fireDemoAction({
    actionId: ctx.interactionId,
    actionLabel: ctx.interactionLabel,
    source,
    ...(ctx.entity ? { entity: ctx.entity as Record<string, unknown> } : {}),
    data: ctx.data as Record<string, unknown>[],
    zone: ctx.zone,
  });
};

const localActionHandler = (source: DemoActionSource = 'action.onAction') =>
  (ctx: InteractionContext): void => {
    emitLocalInteraction(ctx, source);
  };

const zoneAction = (
  id: string,
  label: string,
  icon: string,
  placement: ActionConfig<Entity>['placement'],
  variant?: string,
  onAction?: (ctx: InteractionContext) => void,
): ActionConfig<Entity> => ({
  id,
  label,
  icon,
  placement,
  ...(variant ? { variant } : {}),
  ...(onAction ? { onAction } : {}),
});

const itemAction = (
  id: string,
  label: string,
  icon: string,
  placement: ActionConfig<Entity>['placement'],
  variant?: string,
  visibleIf?: (entity: Entity) => boolean,
  onAction?: (ctx: InteractionContext) => void,
): ActionConfig<Entity> => ({
  id,
  label,
  icon,
  placement,
  ...(variant ? { variant } : {}),
  ...(visibleIf ? { visibleIf } : {}),
  ...(onAction ? { onAction } : {}),
});

export const progressiveExamples: ProgressiveExample[] = [
  {
    id: 'progressive-1-zero-config',
    title: 'Progressive 1 — Zero Config',
    description:
      'This is the smallest configuration that is fully type-safe against the current WidgemoConfig contract: table mode plus item.fields/layout scaffolding. The fields mirror what runtime auto-discovery would surface.',
    data: eightUsersData,
    config: {
      id: 'progressive-1',
      zones: {
        content: createTableContent(eightUsersData, autoDiscoveredFields),
      },
    },
  },
  {
    id: 'progressive-2-named-fields',
    title: 'Progressive 2 — Named Fields',
    description:
      'Adds explicit item.fields with key, label, and type so the columns are intentional instead of auto-shaped. This is the first step from generic rendering to a curated schema.',
    data: eightUsersData,
    config: {
      id: 'progressive-2',
      zones: {
        content: createTableContent(eightUsersData, namedFields),
      },
    },
  },
  {
    id: 'progressive-3-sortable',
    title: 'Progressive 3 — Sortable Columns + Table Layout',
    description:
      'Adds sortable columns and a traditional table layout, plus width hints on selected fields. This is where the table starts behaving like a data grid rather than a plain listing.',
    data: tenUsersData,
    config: {
      id: 'progressive-3',
      zones: {
        content: createTableContent(tenUsersData, sortableFields, {
          table: traditionalTableConfig,
        }),
      },
    },
  },
  {
    id: 'progressive-4-pagination-search',
    title: 'Progressive 4 — Pagination + Search',
    description:
      'Adds search and pagination. Search is restricted to name, email, and department, while pagination limits the table to 5 rows per page.',
    data: twentyUsersData,
    config: {
      id: 'progressive-4',
      zones: {
        content: createTableContent(twentyUsersData, namedFields.map((field) => ({
          ...field,
          sortable: field.key === 'name' || field.key === 'department' || field.key === 'lastLogin',
        })), {
          pagination: { pageSize: 5 },
          search: {
            enabled: true,
            placeholder: 'Search users…',
            fields: ['name', 'email', 'department'],
          },
        }),
      },
    },
  },
  {
    id: 'progressive-4a-table-padding-zero',
    title: 'Progressive 4A — Table Horizontal Padding: 0',
    description:
      'Overrides table content horizontal padding to 0. Search and pagination stay inside the same content container, so they align with the zero-padding table edges.',
    data: twentyUsersData,
    config: {
      id: 'progressive-4a',
      zones: {
        content: createTableContent(twentyUsersData, namedFields.map((field) => ({
          ...field,
          sortable: field.key === 'name' || field.key === 'department' || field.key === 'lastLogin',
        })), {
          pagination: { pageSize: 5 },
          search: {
            enabled: true,
            placeholder: 'Search users…',
            fields: ['name', 'email', 'department'],
          },
          style: { paddingLeft: '0', paddingRight: '0' },
        }),
      },
    },
  },
  {
    id: 'progressive-4b-table-padding-wide',
    title: 'Progressive 4B — Table Horizontal Padding: 1.5rem',
    description:
      'Overrides table content horizontal padding to 1.5rem. Search and pagination inherit the same container spacing, so all table controls align consistently.',
    data: twentyUsersData,
    config: {
      id: 'progressive-4b',
      zones: {
        content: createTableContent(twentyUsersData, namedFields.map((field) => ({
          ...field,
          sortable: field.key === 'name' || field.key === 'department' || field.key === 'lastLogin',
        })), {
          pagination: { pageSize: 5 },
          search: {
            enabled: true,
            placeholder: 'Search users…',
            fields: ['name', 'email', 'department'],
          },
          style: { paddingLeft: '1.5rem', paddingRight: '1.5rem' },
        }),
      },
    },
  },
  {
    id: 'progressive-5-badges-currency',
    title: 'Progressive 5 — Badges + Currency',
    description:
      'Introduces rich field rendering with a badge-based status field and a currency-formatted salary field. The underlying data stays the same; only presentation changes.',
    data: tenUsersData,
    config: {
      id: 'progressive-5',
      zones: {
        content: createTableContent(tenUsersData, badgeCurrencyFields, {
          table: traditionalTableConfig,
        }),
      },
    },
  },
  {
    id: 'progressive-6-progress-rating-avatar',
    title: 'Progressive 6 — Progress Bar + Star Rating + Avatar',
    description:
      'Adds richer per-field visualization: circular avatar images, progress bars, and rating stars alongside the existing status badge.',
    data: eightUsersData,
    config: {
      id: 'progressive-6',
      zones: {
        content: createTableContent(eightUsersData, richFields, {
          table: traditionalTableConfig,
        }),
      },
    },
  },
  {
    id: 'progressive-7-grouping',
    title: 'Progressive 7 — Grouping',
    description:
      'Adds table grouping by department. Groups are expanded by default so the same table becomes easier to scan in clustered sections.',
    data: twentyUsersData,
    config: {
      id: 'progressive-7',
      zones: {
        content: createTableContent(
          twentyUsersData,
          [
            { key: 'name', label: 'Name', type: 'text', sortable: true },
            { key: 'role', label: 'Role', type: 'text' },
            statusField,
            currencyField,
            ratingField,
          ],
          {
            table: traditionalTableConfig,
            groupings: [
              {
                fieldKey: 'department',
                initiallyCollapsed: false,
              },
            ],
          },
        ),
      },
    },
  },
  {
    id: 'progressive-8-header-zone',
    title: 'Progressive 8 — Header Zone',
    description:
      'Adds a header zone with title, subtitle, and icon so the widget gains framing and context beyond the raw content area.',
    data: tenUsersData,
    config: {
      id: 'progressive-8',
      zones: {
        header: {
          title: 'Team Directory',
          subtitle: 'All active employees',
          icon: 'users',
        },
        content: createTableContent(tenUsersData, badgeCurrencyFields, {
          table: traditionalTableConfig,
        }),
      },
    },
  },
  {
    id: 'progressive-9-zone-actions',
    title: 'Progressive 9 — Zone Actions',
    description:
        'Adds header zone actions. The Add User button uses a local action.onAction callback, while Export falls back to the global interactions.onEvent sink.',
    data: tenUsersData,
    config: {
      id: 'progressive-9',
      zones: {
        header: {
          title: 'Team Directory',
          subtitle: 'All active employees',
          icon: 'users',
          actions: [
            zoneAction('add-user', 'Add User', 'add', 'pinned', 'primary', localActionHandler()),
            zoneAction('export', 'Export', 'download', 'pinned', 'secondary'),
          ],
        },
        content: createTableContent(tenUsersData, badgeCurrencyFields, {
          table: traditionalTableConfig,
        }),
      },
    },
  },
  {
    id: 'progressive-10-item-actions',
    title: 'Progressive 10 — Per-Item Actions',
    description:
      'Adds per-row actions with three placements: pinned, onHover, and menu. Edit uses local action.onAction while others can still use the fallback sink. The delete action remains conditionally visible only for inactive users.',
    data: tenUsersData,
    config: {
      id: 'progressive-10',
      zones: {
        header: {
          title: 'Team Directory',
          subtitle: 'All active employees',
          icon: 'users',
          actions: [zoneAction('add-user', 'Add User', 'add', 'pinned', 'primary')],
        },
        content: createTableContent(
          tenUsersData,
          [
            { key: 'name', label: 'Name', type: 'text', sortable: true },
            { key: 'email', label: 'Email', type: 'email' },
            { key: 'role', label: 'Role', type: 'text' },
            { key: 'department', label: 'Department', type: 'text' },
            statusField,
          ],
          {
            table: traditionalTableConfig,
            actions: [
              itemAction('edit-user', 'Edit', 'edit', 'pinned', 'secondary', undefined, localActionHandler()),
              itemAction('view-profile', 'View Profile', 'view', 'onHover'),
              itemAction('archive-user', 'Archive', 'archive', 'menu'),
              itemAction('delete-user', 'Delete', 'delete', 'menu', 'danger', (entity) => entity.status === 'inactive'),
            ],
          },
        ),
      },
    },
  },
  {
    id: 'progressive-11-footer-zone',
    title: 'Progressive 11 — Footer Zone',
    description:
      'Adds a footer zone for lightweight metadata and keeps the item actions introduced in the previous step.',
    data: tenUsersData,
    config: {
      id: 'progressive-11',
      zones: {
        header: {
          title: 'Team Directory',
          subtitle: 'All active employees',
          icon: 'users',
          actions: [zoneAction('add-user', 'Add User', 'add', 'pinned', 'primary')],
        },
        content: createTableContent(
          tenUsersData,
          [
            { key: 'name', label: 'Name', type: 'text', sortable: true },
            { key: 'email', label: 'Email', type: 'email' },
            { key: 'role', label: 'Role', type: 'text' },
            { key: 'department', label: 'Department', type: 'text' },
            statusField,
          ],
          {
            table: traditionalTableConfig,
            actions: [
              itemAction('edit-user', 'Edit', 'edit', 'pinned', 'secondary'),
              itemAction('delete-user', 'Delete', 'delete', 'menu', 'danger'),
            ],
          },
        ),
        footer: {
          subtitle: '10 employees · Last synced just now',
        },
      },
    },
  },
  {
    id: 'progressive-12-row-click',
    title: 'Progressive 12 — Row Click Interaction',
    description:
      'Adds row-level gesture handling via content.gestures[{ type: "row-click" }].onTrigger with local-first callback semantics.',
    data: tenUsersData,
    config: {
      id: 'progressive-12',
      zones: {
        header: {
          title: 'Clickable Rows',
          subtitle: 'Click any row to see the entity payload',
          icon: 'users',
        },
        content: createTableContent(
          tenUsersData,
          [
            { key: 'name', label: 'Name', type: 'text', sortable: true },
            { key: 'email', label: 'Email', type: 'email' },
            { key: 'role', label: 'Role', type: 'text' },
            { key: 'department', label: 'Department', type: 'text', sortable: true },
            statusField,
          ],
          {
            table: traditionalTableConfig,
            gestures: [
              {
                type: 'row-click',
                enabled: true,
                interactionId: 'row-click',
                interactionLabel: 'Row Click',
                onTrigger: localActionHandler('gestures[row-click].onTrigger'),
              },
            ],
          },
        ),
        footer: {
          subtitle: 'Click any row to inspect the selected entity',
        },
      },
    },
  },
  {
    id: 'progressive-13-sorting-filtering',
    title: 'Progressive 13 — Sorting + Filtering',
    description:
      'Adds initial sorting and static filtering so the widget opens already focused on active users ordered by name.',
    data: twentyUsersData,
    config: {
      id: 'progressive-13',
      zones: {
        header: {
          title: 'Active Users Only',
          subtitle: 'Static filter: status=active · sorted by name asc',
          icon: 'users',
        },
        content: createTableContent(twentyUsersData, badgeCurrencyFields, {
          table: traditionalTableConfig,
          filtering: [{ fieldKey: 'status', operator: 'eq', value: 'active' }],
          sorting: [{ fieldKey: 'name', direction: 'asc' }],
        }),
        footer: {
          subtitle: 'Filtering runs before pagination and sorting shapes the initial order',
        },
      },
    },
  },
  {
    id: 'progressive-14-combined',
    title: 'Progressive 14 — Combined: Pagination + Search + Grouping + Actions',
    description:
      'Combines search, pagination, grouping, header actions, item actions, currency, badges, and rating into a single composable table example.',
    data: twentyUsersData,
    config: {
      id: 'progressive-14',
      zones: {
        header: {
          title: 'Team Directory',
          subtitle: 'Grouped by department · search · 5 per page',
          icon: 'users',
          actions: [
            zoneAction('add-user', 'Add User', 'add', 'pinned', 'primary'),
            zoneAction('export-csv', 'Export CSV', 'download', 'menu'),
          ],
        },
        content: createTableContent(
          twentyUsersData,
          [
            { key: 'name', label: 'Name', type: 'text', sortable: true },
            { key: 'email', label: 'Email', type: 'email' },
            { key: 'role', label: 'Role', type: 'text' },
            statusField,
            currencyField,
            ratingField,
          ],
          {
            table: traditionalTableConfig,
            pagination: { pageSize: 5 },
            search: {
              enabled: true,
              placeholder: 'Search users…',
              fields: ['name', 'email', 'department'],
            },
            groupings: [{ fieldKey: 'department', initiallyCollapsed: false }],
            actions: [
              itemAction('edit-user', 'Edit', 'edit', 'pinned', 'secondary'),
              itemAction('view-profile', 'View Profile', 'view', 'onHover'),
              itemAction('delete-user', 'Delete', 'delete', 'menu', 'danger'),
            ],
          },
        ),
        footer: {
          subtitle: '20 employees total · grouped by department · search + pagination are composable',
        },
      },
    },
  },
  {
    id: 'progressive-15-full-showcase',
    title: 'Progressive 15 — Full Feature Showcase',
    description:
      'Combines header actions, footer metadata, avatars, badges, currency, progress, rating, grouping, pagination, search, sortable fields, and row actions into the most feature-rich typed example in the progression.',
    data: twentyUsersData,
    config: {
      id: 'progressive-15',
      collapse: { initialState: 'expanded' },
      zones: {
        header: {
          title: 'Team Directory',
          subtitle: 'Full-feature progressive example — all phases combined',
          icon: 'users',
          actions: [
            zoneAction('add-user', 'Add User', 'add', 'pinned', 'primary'),
            zoneAction('export-csv', 'Export CSV', 'download', 'pinned', 'secondary'),
            zoneAction('settings', 'Settings', 'settings', 'menu'),
          ],
        },
        content: createTableContent(
          twentyUsersData,
          [
            avatarField,
            { key: 'name', label: 'Name', type: 'text', sortable: true },
            { key: 'email', label: 'Email', type: 'email' },
            { key: 'role', label: 'Role', type: 'text' },
            { key: 'department', label: 'Department', type: 'text', sortable: true },
            { key: 'lastLogin', label: 'Last Login', type: 'date', sortable: true },
            statusField,
            currencyField,
            progressField,
            ratingField,
          ],
          {
            table: traditionalTableConfig,
            pagination: { pageSize: 5 },
            search: {
              enabled: true,
              placeholder: 'Search users…',
              fields: ['name', 'email', 'department'],
            },
            groupings: [{ fieldKey: 'department', initiallyCollapsed: false }],
            actions: [
              itemAction('edit-user', 'Edit', 'edit', 'pinned', 'secondary'),
              itemAction('view-profile', 'View Profile', 'view', 'onHover'),
              itemAction('archive-user', 'Archive', 'archive', 'menu'),
              itemAction('delete-user', 'Delete', 'delete', 'menu', 'danger'),
            ],
          },
        ),
        footer: {
          subtitle: 'Progressive Example 15 of 15 · All features enabled',
        },
      },
    },
  },
  // ── modeConfig.table: traditional settings ────────────────────────────────
  {
    id: 'progressive-16-traditional-striped',
    title: 'Progressive 16 — Traditional: striped',
    description:
      'Sets modeConfig.table.striped = true on a traditional table. Bootstrap\'s table-striped class is applied, giving every other row an alternating background so long lists are easier to scan.',
    data: tenUsersData,
    config: {
      id: 'progressive-16',
      zones: {
        header: {
          title: 'Striped Table',
          subtitle: 'modeConfig.table.striped = true',
          icon: 'table',
        },
        content: createTableContent(tenUsersData, badgeCurrencyFields, {
          table: { type: 'traditional', striped: true },
        }),
      },
    },
  },
  {
    id: 'progressive-17-traditional-hover-off',
    title: 'Progressive 17 — Traditional: hover disabled',
    description:
      'Sets modeConfig.table.hover = false. By default the table-hover class is present and rows highlight on mouse-over. This example explicitly opts out so the table stays visually static on hover — useful for read-heavy dashboards where highlight creates noise.',
    data: tenUsersData,
    config: {
      id: 'progressive-17',
      zones: {
        header: {
          title: 'No Hover Effect',
          subtitle: 'modeConfig.table.hover = false',
          icon: 'table',
        },
        content: createTableContent(tenUsersData, badgeCurrencyFields, {
          table: { type: 'traditional', striped: true, hover: false },
        }),
      },
    },
  },
  {
    id: 'progressive-18-traditional-no-header',
    title: 'Progressive 18 — Traditional: no header',
    description:
      'Sets modeConfig.table.showHeader = false. The <thead> row is omitted entirely. This is useful for compact inline tables where column meaning is already established by surrounding context.',
    data: eightUsersData,
    config: {
      id: 'progressive-18',
      zones: {
        header: {
          title: 'Headerless Table',
          subtitle: 'modeConfig.table.showHeader = false',
          icon: 'table',
        },
        content: createTableContent(eightUsersData, namedFields, {
          table: { type: 'traditional', showHeader: false },
        }),
      },
    },
  },
  // ── modeConfig.table: rich-cells settings ────────────────────────────────
  {
    id: 'progressive-19-rich-cells-1col',
    title: 'Progressive 19 — Rich Cells: 1 column',
    description:
      'Sets modeConfig.table.type = "rich-cells" with columns = 1 (the default). Each row is rendered as a full-width card that contains the full item layout rather than a flat row of cells. Avatar, badges, progress bars, and ratings render inside the card.',
    data: eightUsersData,
    config: {
      id: 'progressive-19',
      zones: {
        header: {
          title: 'Rich Cells — Single Column',
          subtitle: 'modeConfig.table = { type: "rich-cells", columns: 1 }',
          icon: 'grid',
        },
        content: createTableContent(eightUsersData, richFields, {
          table: { type: 'rich-cells', columns: 1 },
        }),
      },
    },
  },
  {
    id: 'progressive-20-rich-cells-2col',
    title: 'Progressive 20 — Rich Cells: 2 columns',
    description:
      'Sets modeConfig.table.columns = 2. The same card-based rendering is split into two side-by-side columns, halving the vertical space used. Field groupings via item.layout.sections can label each column independently. Adds row-click gesture metadata under content.gestures with type="row-click" and uses global interactions.onEvent as fallback.',
    data: eightUsersData,
    config: {
      id: 'progressive-20',
      zones: {
        header: {
          title: 'Rich Cells — Two Columns',
          subtitle: 'modeConfig.table = { type: "rich-cells", columns: 2 }',
          icon: 'grid',
        },
        content: createTableContent(eightUsersData, richFields, {
          table: { type: 'rich-cells', columns: 2 },
          gestures: [
            {
              type: 'row-click',
              enabled: true,
              interactionId: 'row-click',
              interactionLabel: 'Row Click',
            },
          ],
        }),
      },
    },
  },
  {
    id: 'progressive-21-rich-cells-3col-no-header',
    title: 'Progressive 21 — Rich Cells: 3 columns, no header',
    description:
      'Combines columns = 3 with showHeader = false on rich-cells. The column label row is hidden so the card grid flows without any header row, which suits compact dashboard panels where visual density matters more than explicit column titles.',
    data: tenUsersData,
    config: {
      id: 'progressive-21',
      zones: {
        header: {
          title: 'Rich Cells — Three Columns, No Header',
          subtitle: 'modeConfig.table = { type: "rich-cells", columns: 3, showHeader: false }',
          icon: 'grid',
        },
        content: createTableContent(tenUsersData, richFields, {
          table: { type: 'rich-cells', columns: 3, showHeader: false },
        }),
      },
    },
  },
  {
    id: 'progressive-22-rich-cells-striped',
    title: 'Progressive 22 — Rich Cells: striped rows',
    description:
      'Sets modeConfig.table.striped = true on rich-cells. Alternating row backgrounds are applied the same way they are in traditional tables, while content remains split into rich cell columns.',
    data: tenUsersData,
    config: {
      id: 'progressive-22',
      zones: {
        header: {
          title: 'Rich Cells — Striped Rows',
          subtitle: 'modeConfig.table = { type: "rich-cells", columns: 2, striped: true }',
          icon: 'grid',
        },
        content: createTableContent(tenUsersData, richFields, {
          table: { type: 'rich-cells', columns: 2, striped: true },
        }),
      },
    },
  },
  {
    id: 'progressive-23-rich-cells-hover-off',
    title: 'Progressive 23 — Rich Cells: hover disabled',
    description:
      'Sets modeConfig.table.hover = false on rich-cells. This disables row highlight-on-hover while preserving the striped row treatment.',
    data: tenUsersData,
    config: {
      id: 'progressive-23',
      zones: {
        header: {
          title: 'Rich Cells — No Hover Highlight',
          subtitle: 'modeConfig.table = { type: "rich-cells", columns: 2, striped: true, hover: false }',
          icon: 'grid',
        },
        content: createTableContent(tenUsersData, richFields, {
          table: { type: 'rich-cells', columns: 2, striped: true, hover: false },
        }),
      },
    },
  },
];

export const progressiveExamplesWithInteractionSink: ProgressiveExample[] = progressiveExamples.map((example) => ({
  ...example,
  config: {
    ...example.config,
    interactions: {
      ...example.config.interactions,
      onEvent: emitDemoInteraction,
    },
  },
}));

export default progressiveExamplesWithInteractionSink;
