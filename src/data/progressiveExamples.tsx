import type {
  ActionConfig,
  ActionContext,
  ContentConfig,
  Entity,
  FieldConfig,
  ItemConfig,
  WidgemoConfig,
} from '@widgemo/widgemo-core';
import { teaserSampleData } from './sampleData';
import { fireDemoAction } from '../utils/demoActionBus';

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
const traditionalTableLayout = { table: { type: 'traditional' as const } };
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
  overrides: Omit<Partial<ContentConfig<Entity>>, 'mode' | 'data' | 'layout' | 'item'> & {
    layout?: ContentConfig<Entity>['layout'];
    item?: Partial<ItemConfig<Entity>>;
  } = {},
): ContentConfig<Entity> => {
  const { layout, item, ...rest } = overrides;
  void data;
  return {
    mode: 'table',
    layout: layout ?? {},
    item: createItem(fields, item),
    ...rest,
  };
};

const zoneAction = (
  id: string,
  label: string,
  icon: string,
  placement: ActionConfig<Entity>['placement'],
  variant?: string,
): ActionConfig<Entity> => ({
  id,
  label,
  icon,
  placement,
  ...(variant ? { variant } : {}),
  onAction: (ctx: ActionContext) =>
    fireDemoAction({
      actionId: id,
      actionLabel: label,
      source: 'onAction',
      data: ctx.data as Record<string, unknown>[],
      zone: ctx.zone,
    }),
});

const itemAction = (
  id: string,
  label: string,
  icon: string,
  placement: ActionConfig<Entity>['placement'],
  variant?: string,
  visibleIf?: (entity: Entity) => boolean,
): ActionConfig<Entity> => ({
  id,
  label,
  icon,
  placement,
  ...(variant ? { variant } : {}),
  ...(visibleIf ? { visibleIf } : {}),
  onAction: (ctx: ActionContext) =>
    fireDemoAction({
      actionId: id,
      actionLabel: label,
      source: 'onAction',
      entity: ctx.entity as Record<string, unknown>,
    }),
});

export const progressiveExamples: ProgressiveExample[] = [
  {
    id: 'progressive-1-zero-config',
    title: 'Progressive 1 — Zero Config',
    description:
      'This is the smallest configuration that is fully type-safe against the current WidgemoConfig contract: table mode plus the required content.data, content.layout, and item.fields/layout scaffolding. The fields mirror what runtime auto-discovery would surface.',
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
          layout: traditionalTableLayout,
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
          layout: traditionalTableLayout,
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
          layout: traditionalTableLayout,
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
            layout: traditionalTableLayout,
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
          layout: traditionalTableLayout,
        }),
      },
    },
  },
  {
    id: 'progressive-9-zone-actions',
    title: 'Progressive 9 — Zone Actions',
    description:
      'Adds header zone actions using onAction(ActionContext). These actions operate on the whole dataset in scope rather than a single row.',
    data: tenUsersData,
    config: {
      id: 'progressive-9',
      zones: {
        header: {
          title: 'Team Directory',
          subtitle: 'All active employees',
          icon: 'users',
          actions: [
            zoneAction('add-user', 'Add User', 'add', 'pinned', 'primary'),
            zoneAction('export', 'Export', 'download', 'pinned', 'secondary'),
          ],
        },
        content: createTableContent(tenUsersData, badgeCurrencyFields, {
          layout: traditionalTableLayout,
        }),
      },
    },
  },
  {
    id: 'progressive-10-item-actions',
    title: 'Progressive 10 — Per-Item Actions',
    description:
      'Adds per-row actions with three placements: pinned, onHover, and menu. The delete action is conditionally visible only for inactive users.',
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
            layout: traditionalTableLayout,
            itemActions: [
              itemAction('edit-user', 'Edit', 'edit', 'pinned', 'secondary'),
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
            layout: traditionalTableLayout,
            itemActions: [
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
      'Adds row-level interaction through content.interaction.onRowClick. This is separate from item actions because the whole row becomes clickable.',
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
            layout: traditionalTableLayout,
            interaction: {
              onRowClick: (item) =>
                fireDemoAction({
                  actionId: 'row-click',
                  actionLabel: 'Row Click',
                  source: 'onClick',
                  entity: item as Record<string, unknown>,
                }),
            },
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
          layout: traditionalTableLayout,
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
            layout: traditionalTableLayout,
            pagination: { pageSize: 5 },
            search: {
              enabled: true,
              placeholder: 'Search users…',
              fields: ['name', 'email', 'department'],
            },
            groupings: [{ fieldKey: 'department', initiallyCollapsed: false }],
            itemActions: [
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
            layout: traditionalTableLayout,
            pagination: { pageSize: 5 },
            search: {
              enabled: true,
              placeholder: 'Search users…',
              fields: ['name', 'email', 'department'],
            },
            groupings: [{ fieldKey: 'department', initiallyCollapsed: false }],
            itemActions: [
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
];

export default progressiveExamples;
