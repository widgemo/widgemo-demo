import {
  coreActions,
  createAction,
  createActions,
} from '@widgemo/widgemo-core';
import type {
  ActionConfig,
  BoardModeConfig,
  ChartModeConfig,
  ContentConfig,
  Entity,
  FieldConfig,
  InteractionContext,
  ItemConfig,
  ModeConfig,
  TableModeConfig,
  WidgemoConfig,
} from '@widgemo/widgemo-core';
import type { CSSProperties } from 'react';
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
const monthlyKpiData: Entity[] = [
  { month: 'Jan', revenue: 42, cost: 26, users: 120 },
  { month: 'Feb', revenue: 47, cost: 28, users: 140 },
  { month: 'Mar', revenue: 45, cost: 30, users: 136 },
  { month: 'Apr', revenue: 54, cost: 32, users: 168 },
  { month: 'May', revenue: 58, cost: 34, users: 182 },
  { month: 'Jun', revenue: 63, cost: 36, users: 210 },
];

const temporalOperationsData: Entity[] = [
  {
    id: 'temp-1',
    operation: 'Payroll Sync',
    settlementDate: '2026-05-29',
    checkpointTime: '08:15:10',
    postedAt: '2026-05-29T08:15:10Z',
    updatedAtEpochSec: 1780042510,
    ingestedAtEpochMs: 1780042810000,
    processingSec: 3661,
    queueLagMs: 48250,
    reconciliationMin: 61.25,
  },
  {
    id: 'temp-2',
    operation: 'Reserve Sweep',
    settlementDate: '2026-05-30',
    checkpointTime: '11:42:33',
    postedAt: '2026-05-30T11:42:33Z',
    updatedAtEpochSec: 1780141353,
    ingestedAtEpochMs: 1780141633000,
    processingSec: 915,
    queueLagMs: 129000,
    reconciliationMin: 15.4,
  },
  {
    id: 'temp-3',
    operation: 'Invoice Clear',
    settlementDate: '2026-05-31',
    checkpointTime: '14:05:01',
    postedAt: '2026-05-31T14:05:01Z',
    updatedAtEpochSec: 1780236301,
    ingestedAtEpochMs: 1780236541000,
    processingSec: 172,
    queueLagMs: 7200,
    reconciliationMin: 2.86,
  },
  {
    id: 'temp-4',
    operation: 'Partner Payout',
    settlementDate: '2026-06-01',
    checkpointTime: '18:20:44',
    postedAt: '2026-06-01T18:20:44Z',
    updatedAtEpochSec: 1780338044,
    ingestedAtEpochMs: 1780338344000,
    processingSec: 5400,
    queueLagMs: 240000,
    reconciliationMin: 90,
  },
];

const lifecycleBoardData: Entity[] = [
  { id: 1, name: 'Hook Task A', status: 'todo', department: 'Engineering' },
  { id: 2, name: 'Hook Task B', status: 'todo', department: 'Design' },
  { id: 3, name: 'Hook Task C', status: 'done', department: 'Business' },
  { id: 4, name: 'Hook Task D', status: 'done', department: 'Engineering' },
];

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
  {
    key: 'lastLogin',
    label: 'Last Login',
    type: 'date',
    renderAs: 'date',
    renderAsOptions: { parseMode: 'iso-date', locale: 'en-US', timezone: 'local', formatPreset: 'medium' },
  },
  { key: 'status', label: 'Status', type: 'text' },
];

const sortableFields: FieldConfig[] = [
  { key: 'name', label: 'Name', type: 'text', sortable: true, width: '160px' },
  { key: 'email', label: 'Email', type: 'email', sortable: false },
  { key: 'role', label: 'Role', type: 'text' },
  { key: 'department', label: 'Department', type: 'text', sortable: true, width: '140px' },
  {
    key: 'lastLogin',
    label: 'Last Login',
    type: 'date',
    renderAs: 'date',
    renderAsOptions: { parseMode: 'iso-date', locale: 'en-US', timezone: 'local', formatPreset: 'short' },
    sortable: true,
    width: '130px',
  },
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

const groupingControlFields: FieldConfig[] = [
  { key: 'name', label: 'Name', type: 'text', sortable: true },
  { key: 'role', label: 'Role', type: 'text' },
  { key: 'department', label: 'Department', type: 'text', sortable: true, groupable: true },
  {
    key: 'status',
    label: 'Status',
    type: 'text',
    renderAs: 'badge',
    groupable: true,
    renderAsOptions: {
      colorMap: statusColorMap,
    },
  },
];

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

const customGridProfileFields: FieldConfig[] = [
  {
    key: 'src',
    label: 'Avatar',
    type: 'image',
    showLabel: false,
    imageOptions: { circular: true, width: 48, height: 48 },
  },
  { key: 'name', label: 'Name', type: 'text', showLabel: false, wrap: false },
  {
    key: 'email',
    label: 'Email',
    type: 'email',
    showLabel: false,
    renderAs: 'link',
    wrap: false,
  },
  { key: 'department', label: 'Department', type: 'text', wrap: false },
  currencyField,
  {
    ...progressField,
    showLabel: false,
  },
  {
    ...statusField,
    showLabel: false,
  },
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

const createGridContent = (
  data: Entity[],
  fields: FieldConfig[],
  overrides: Omit<Partial<ContentConfig<Entity>>, 'mode' | 'data' | 'layout' | 'item' | 'modeConfig'> & {
    grid?: NonNullable<ModeConfig['grid']>;
    item?: Partial<ItemConfig<Entity>>;
  } = {},
): ContentConfig<Entity> => {
  const { grid, item, ...rest } = overrides;
  void data;
  return {
    mode: 'grid',
    ...(grid ? { modeConfig: { grid } } : {}),
    item: createItem(fields, item),
    ...rest,
  };
};

const createCarouselContent = (
  data: Entity[],
  fields: FieldConfig[],
  overrides: Omit<Partial<ContentConfig<Entity>>, 'mode' | 'data' | 'layout' | 'item' | 'modeConfig'> & {
    carousel?: NonNullable<ModeConfig['carousel']>;
    item?: Partial<ItemConfig<Entity>>;
  } = {},
): ContentConfig<Entity> => {
  const { carousel, item, ...rest } = overrides;
  void data;
  return {
    mode: 'carousel',
    ...(carousel ? { modeConfig: { carousel } } : {}),
    item: createItem(fields, item),
    ...rest,
  };
};

const createBoardContent = (
  data: Entity[],
  fields: FieldConfig[],
  overrides: Omit<Partial<ContentConfig<Entity>>, 'mode' | 'data' | 'layout' | 'item' | 'modeConfig'> & {
    board?: BoardModeConfig;
    item?: Partial<ItemConfig<Entity>>;
  } = {},
): ContentConfig<Entity> => {
  const { board, item, ...rest } = overrides;
  void data;
  return {
    mode: 'board',
    ...(board ? { modeConfig: { board } } : {}),
    item: createItem(fields, item),
    ...rest,
  };
};

const createChartContent = (
  data: Entity[],
  fields: FieldConfig[],
  overrides: Omit<Partial<ContentConfig<Entity>>, 'mode' | 'data' | 'layout' | 'item' | 'modeConfig'> & {
    chart?: ChartModeConfig;
    item?: Partial<ItemConfig<Entity>>;
  } = {},
): ContentConfig<Entity> => {
  const { chart, item, ...rest } = overrides;
  void data;
  return {
    mode: 'chart',
    ...(chart ? { modeConfig: { chart } } : {}),
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
    ...(ctx.from ? { from: ctx.from } : {}),
    ...(ctx.to ? { to: ctx.to } : {}),
    ...(ctx.fieldKey !== undefined ? { fieldKey: ctx.fieldKey } : {}),
    ...(ctx.fieldValue !== undefined ? { fieldValue: ctx.fieldValue } : {}),
    ...(ctx.fieldLabel !== undefined ? { fieldLabel: ctx.fieldLabel } : {}),
    ...(ctx.relatedEntity !== undefined ? { relatedEntity: ctx.relatedEntity } : {}),
  });
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
  onAction: (ctx: InteractionContext) =>
    fireDemoAction({
      actionId: id,
      actionLabel: label,
      source: 'action.onAction',
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
  onAction: (ctx: InteractionContext) =>
    fireDemoAction({
      actionId: id,
      actionLabel: label,
      source: 'action.onAction',
      entity: ctx.entity as Record<string, unknown>,
    }),
});

const coreZoneAction = (
  actionId: string,
  overrides: Partial<ActionConfig<Entity>> = {},
): ActionConfig<Entity> => {
  const action = createAction(actionId, overrides);

  return {
    ...action,
    onAction: (ctx: InteractionContext) =>
      fireDemoAction({
        actionId: action.id,
        actionLabel: action.label,
        source: 'action.onAction',
        data: ctx.data as Record<string, unknown>[],
        zone: ctx.zone,
      }),
  };
};

const coreItemActions = (
  actions: Array<{ id: string; overrides?: Partial<ActionConfig<Entity>> }>,
): ActionConfig<Entity>[] =>
  createActions(actions).map((action) => ({
    ...action,
    onAction: (ctx: InteractionContext) =>
      fireDemoAction({
        actionId: action.id,
        actionLabel: action.label,
        source: 'action.onAction',
        entity: ctx.entity as Record<string, unknown>,
      }),
  }));

export const progressiveExamples: ProgressiveExample[] = [
  {
    id: 'progressive-1-zero-config',
    title: 'Progressive 1 — Zero Config',
    description:
      'This is the smallest configuration that is fully type-safe against the current WidgemoConfig contract: table mode plus item.fields/layout scaffolding. The fields mirror what runtime auto-discovery would surface.',
    data: eightUsersData,
    config: {
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
    id: 'progressive-4c-table-alternating-default-omitted',
    title: 'Progressive 4C — Table Row Striping: alternatingRows Omitted (Default)',
    description:
      'Validates default striping behavior with alternatingRows omitted. Core default should render alternating row backgrounds in traditional table mode.',
    data: twentyUsersData,
    config: {
      zones: {
        content: createTableContent(twentyUsersData, namedFields.map((field) => ({
          ...field,
          sortable: field.key === 'name' || field.key === 'department' || field.key === 'lastLogin',
        })), {
          table: { type: 'traditional' },
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
    id: 'progressive-4d-table-alternating-true',
    title: 'Progressive 4D — Table Row Striping: alternatingRows=true',
    description:
      'Explicitly enables alternating row backgrounds using alternatingRows=true to match canonical core striping behavior.',
    data: twentyUsersData,
    config: {
      zones: {
        content: createTableContent(twentyUsersData, namedFields.map((field) => ({
          ...field,
          sortable: field.key === 'name' || field.key === 'department' || field.key === 'lastLogin',
        })), {
          table: { type: 'traditional', alternatingRows: true },
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
    id: 'progressive-4e-table-alternating-false-conditional-bg',
    title: 'Progressive 4E — Table Row Striping: alternatingRows=false + conditionalBackgroundColor',
    description:
      'Disables alternating rows while applying conditionalBackgroundColor to status-specific rows. This demonstrates custom row backgrounds without zebra striping.',
    data: twentyUsersData,
    config: {
      zones: {
        content: createTableContent(twentyUsersData, namedFields.map((field) => ({
          ...field,
          sortable: field.key === 'name' || field.key === 'department' || field.key === 'lastLogin',
        })), {
          table: {
            type: 'traditional',
            alternatingRows: false,
            conditionalBackgroundColor: (entity: Entity) => {
              const status = String(entity.status ?? '').toLowerCase();
              if (status === 'inactive') return '#fef2f2';
              if (status === 'pending') return '#fffbeb';
              return undefined;
            },
          },
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
    id: 'progressive-4f-table-alternating-false-no-conditional-bg',
    title: 'Progressive 4F — Table Row Striping: alternatingRows=false (No conditionalBackgroundColor)',
    description:
      'Disables alternating row backgrounds with no conditional overrides. Rows should use a uniform background.',
    data: twentyUsersData,
    config: {
      zones: {
        content: createTableContent(twentyUsersData, namedFields.map((field) => ({
          ...field,
          sortable: field.key === 'name' || field.key === 'department' || field.key === 'lastLogin',
        })), {
          table: { type: 'traditional', alternatingRows: false },
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
    id: 'progressive-5-badges-currency',
    title: 'Progressive 5 — Badges + Currency',
    description:
      'Introduces rich field rendering with a badge-based status field and a currency-formatted salary field. The underlying data stays the same; only presentation changes.',
    data: tenUsersData,
    config: {
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
    id: 'progressive-7a-grouping-dropdown-only',
    title: 'Progressive 7A — Grouping Controls: Dropdown Only',
    description:
      'Shows only the grouping dropdown by enabling showDropdownControl and disabling header controls.',
    data: twentyUsersData,
    config: {
      zones: {
        content: createTableContent(twentyUsersData, groupingControlFields, {
          table: traditionalTableConfig,
          groupings: [
            {
              fieldKey: 'department',
              initiallyCollapsed: false,
              showDropdownControl: true,
              showHeaderControls: false,
            },
          ],
        }),
      },
    },
  },
  {
    id: 'progressive-7b-grouping-icons-only',
    title: 'Progressive 7B — Grouping Controls: Header Icons Only',
    description:
      'Shows grouping controls in table headers only. No dropdown is rendered.',
    data: twentyUsersData,
    config: {
      zones: {
        content: createTableContent(twentyUsersData, groupingControlFields, {
          table: traditionalTableConfig,
          groupings: [
            {
              fieldKey: 'department',
              initiallyCollapsed: false,
              showHeaderControls: true,
            },
          ],
        }),
      },
    },
  },
  {
    id: 'progressive-7c-grouping-dropdown-and-icons',
    title: 'Progressive 7C — Grouping Controls: Dropdown + Header Icons',
    description:
      'Enables both grouping control surfaces so users can switch grouping via dropdown or header icons.',
    data: twentyUsersData,
    config: {
      zones: {
        content: createTableContent(twentyUsersData, groupingControlFields, {
          table: traditionalTableConfig,
          groupings: [
            {
              fieldKey: 'department',
              initiallyCollapsed: false,
              showDropdownControl: true,
              showHeaderControls: true,
            },
          ],
        }),
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
      'Adds header zone actions using onAction(ActionContext). These actions operate on the whole dataset in scope rather than a single row.',
    data: tenUsersData,
    config: {
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
          table: traditionalTableConfig,
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
    id: 'progressive-10b-core-action-builders',
    title: 'Progressive 10B — Core Action Builders',
    description:
      'Uses widgemo-core\'s shipped action helpers exactly as implemented: createAction(actionId, overrides), createActions([{ id, overrides }]), and direct coreActions preset spreads.',
    data: tenUsersData,
    config: {
      zones: {
        header: {
          title: 'Core Builder Actions',
          subtitle: 'Preset-backed actions via createAction/createActions/coreActions',
          icon: 'users',
          actions: [
            coreZoneAction('add', { id: 'add-user', label: 'Add User', placement: 'pinned', variant: 'primary' }),
            coreZoneAction('refresh', { id: 'sync-users', label: 'Sync', placement: 'pinned', variant: 'secondary' }),
            {
              ...coreActions.export,
              id: 'export-users',
              label: 'Export Users',
              onAction: (ctx: InteractionContext) =>
                fireDemoAction({
                  actionId: 'export-users',
                  actionLabel: 'Export Users',
                  source: 'action.onAction',
                  data: ctx.data as Record<string, unknown>[],
                  zone: ctx.zone,
                }),
            },
          ],
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
            actions: coreItemActions([
              { id: 'edit', overrides: { id: 'edit-user', label: 'Edit User', placement: 'pinned', variant: 'secondary' } },
              { id: 'view', overrides: { id: 'view-profile', label: 'View Profile', placement: 'onHover' } },
              {
                id: 'delete',
                overrides: {
                  id: 'delete-user',
                  label: 'Delete User',
                  placement: 'menu',
                  variant: 'danger',
                  visibleIf: (entity) => entity.status === 'inactive',
                },
              },
            ]),
            actionOverflow: {
              maxInline: { mobile: 1, tablet: 2, desktop: 2 },
              menuLabel: 'More',
              indicator: 'pulse',
            },
          },
        ),
        footer: {
          subtitle: 'Builders are preset helpers, not arbitrary action factories',
        },
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
      'Adds row-level click via gestures[item-click] routed to interactions.onEvent. This is separate from item actions because the whole row becomes clickable.',
    data: tenUsersData,
    config: {
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
                type: 'item-click',
                enabled: true,
                interactionId: 'row-click',
                interactionLabel: 'Row Click',
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
            {
              key: 'lastLogin',
              label: 'Last Login',
              type: 'date',
              renderAs: 'date',
              renderAsOptions: { parseMode: 'iso-date', locale: 'en-US', timezone: 'local', formatPreset: 'short' },
              sortable: true,
            },
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

  // ─── Grid Mode ─────────────────────────────────────────────────────────────

  {
    id: 'progressive-16-grid-basic',
    title: 'Progressive 16 — Grid: Basic',
    description: 'Switches the content zone to grid mode. Items are arranged in a responsive auto-fit grid with default settings.',
    data: tenUsersData,
    config: {
      zones: {
        header: { title: 'User Grid', icon: 'grid' },
        content: createGridContent(tenUsersData, [
          { key: 'name', label: 'Name', type: 'text' },
          { key: 'role', label: 'Role', type: 'text' },
          { key: 'department', label: 'Department', type: 'text' },
        ]),
      },
    },
  },

  {
    id: 'progressive-17-grid-config',
    title: 'Progressive 17 — Grid: Custom Layout',
    description: 'Configures the grid with a custom minItemWidth and gap to control density and responsiveness.',
    data: tenUsersData,
    config: {
      zones: {
        header: { title: 'User Grid — Custom Layout', subtitle: 'min 220px items, 16px gap', icon: 'grid' },
        content: createGridContent(tenUsersData, [
          { key: 'name', label: 'Name', type: 'text' },
          { key: 'role', label: 'Role', type: 'text' },
          { key: 'department', label: 'Department', type: 'text' },
          statusField,
        ], { grid: { minItemWidth: '220px', gap: '16px' } }),
      },
    },
  },

  {
    id: 'progressive-17a-grid-alignment',
    title: 'Progressive 17A — Grid: Advanced Alignment (Optional)',
    description: 'Low-level CSS Grid controls (autoFlow, justifyItems, alignItems). Usually not needed for first-release demos, but available for advanced fine-tuning.',
    data: tenUsersData,
    config: {
      zones: {
        header: {
          title: 'User Grid — Advanced Alignment',
          subtitle: 'Optional advanced controls: autoFlow=row · justifyItems=stretch · alignItems=stretch',
          icon: 'grid',
        },
        content: createGridContent(tenUsersData, [
          avatarField,
          { key: 'name', label: 'Name', type: 'text' },
          { key: 'role', label: 'Role', type: 'text' },
          { key: 'department', label: 'Department', type: 'text' },
          statusField,
        ], {
          grid: {
            minItemWidth: '220px',
            gap: '14px',
            maxColumns: 3,
            autoFlow: 'row',
            justifyItems: 'stretch',
            alignItems: 'stretch',
          },
        }),
      },
    },
  },

  {
    id: 'progressive-17b-responsive-breakpoints',
    title: 'Progressive 17B — Responsive: Breakpoint Mode Switch',
    description: 'Demonstrates content.responsive.breakpoints switching between carousel (mobile), grid (tablet), and table (desktop).',
    data: tenUsersData,
    config: {
      zones: {
        header: {
          title: 'Responsive Mode Switching',
          subtitle: 'Resize viewport: mobile=carousel · tablet=grid · desktop=table',
          icon: 'responsive',
        },
        content: createTableContent(tenUsersData, [
          { key: 'name', label: 'Name', type: 'text', sortable: true },
          { key: 'role', label: 'Role', type: 'text' },
          { key: 'department', label: 'Department', type: 'text' },
          statusField,
        ], {
          table: traditionalTableConfig,
          responsive: {
            breakpoints: {
              mobile: {
                mode: 'carousel',
                modeConfig: {
                  carousel: { showArrows: true, showIndicators: true, autoPlay: false },
                },
              },
              tablet: {
                mode: 'grid',
                modeConfig: {
                  grid: { minItemWidth: '220px', gap: '12px' },
                },
              },
              desktop: {
                mode: 'table',
                modeConfig: {
                  table: traditionalTableConfig,
                },
              },
            },
          },
        }),
      },
    },
  },

  {
    id: 'progressive-17c-responsive-docs-parity',
    title: 'Progressive 17C — Responsive: Docs Parity (Desktop/Tablet/Mobile)',
    description: 'Mirrors the docs Responsive Mode Switching snippet: base desktop mode is table, tablet override switches to grid, and mobile override switches to carousel.',
    data: tenUsersData,
    config: {
      zones: {
        header: {
          title: 'Responsive Mode Switching (Docs Parity)',
          subtitle: 'desktop >= 1024: table · tablet 768-1023: grid · mobile < 768: carousel',
          icon: 'responsive',
        },
        content: {
          mode: 'table',
          item: {
            fields: [
              { key: 'name', label: 'Name' },
              { key: 'department', label: 'Department' },
              { key: 'status', label: 'Status', renderAs: 'badge' },
            ],
            layout: { type: 'auto' },
          },
          responsive: {
            breakpoints: {
              tablet: {
                mode: 'grid',
              },
              mobile: {
                mode: 'carousel',
              },
            },
          },
        },
        footer: {
          subtitle: 'Resize test: <768 mobile=carousel, 768-1023 tablet=grid, >=1024 desktop=table (base mode)',
        },
      },
    },
  },

  {
    id: 'progressive-18-grid-rich-fields',
    title: 'Progressive 18 — Grid: Rich Fields',
    description: 'Grid cards with rich field types: avatar image, status badge, progress bar, and star rating.',
    data: tenUsersData,
    config: {
      zones: {
        header: { title: 'Team Grid — Rich Cards', icon: 'grid' },
        content: createGridContent(tenUsersData, [
          avatarField,
          { key: 'name', label: 'Name', type: 'text' },
          { key: 'role', label: 'Role', type: 'text' },
          statusField,
          progressField,
          ratingField,
        ], { grid: { minItemWidth: '240px', gap: '12px' } }),
      },
    },
  },

  {
    id: 'progressive-19-grid-actions',
    title: 'Progressive 19 — Grid: Item Actions',
    description: 'Adds pinned and menu item actions to grid cards, and zone-level actions in the header.',
    data: tenUsersData,
    config: {
      zones: {
        header: {
          title: 'Team Grid — Actions',
          icon: 'grid',
          actions: [
            zoneAction('add-user', 'Add User', 'add', 'pinned', 'primary'),
            zoneAction('export-grid', 'Export', 'download', 'menu'),
          ],
        },
        content: createGridContent(tenUsersData, [
          { key: 'name', label: 'Name', type: 'text' },
          { key: 'role', label: 'Role', type: 'text' },
          statusField,
        ], {
          grid: { minItemWidth: '220px', gap: '12px' },
          actions: [
            itemAction('view-user', 'View', 'view', 'pinned', 'secondary'),
            itemAction('edit-user', 'Edit', 'edit', 'onHover'),
            itemAction('delete-user', 'Delete', 'delete', 'menu', 'danger'),
          ],
        }),
      },
    },
  },

  {
    id: 'progressive-20-grid-full',
    title: 'Progressive 20 — Grid: Full Showcase',
    description: 'Full grid showcase: rich fields, item actions, zone header/footer, custom layout, and max columns cap.',
    data: twentyUsersData,
    config: {
      zones: {
        header: {
          title: 'Team Directory',
          subtitle: 'All team members',
          icon: 'grid',
          actions: [
            zoneAction('invite-user', 'Invite', 'add', 'pinned', 'primary'),
            zoneAction('export-csv', 'Export CSV', 'download', 'menu'),
          ],
        },
        content: createGridContent(twentyUsersData, [
          avatarField,
          { key: 'name', label: 'Name', type: 'text' },
          { key: 'department', label: 'Department', type: 'text' },
          statusField,
          progressField,
          ratingField,
          currencyField,
        ], {
          grid: { minItemWidth: '240px', gap: '16px', maxColumns: 4 },
          actions: [
            itemAction('view-profile', 'View Profile', 'view', 'pinned', 'secondary'),
            itemAction('message', 'Message', 'message', 'onHover'),
            itemAction('edit', 'Edit', 'edit', 'menu'),
            itemAction('archive', 'Archive', 'archive', 'menu'),
          ],
        }),
        footer: { subtitle: '20 team members · grid view' },
      },
    },
  },

  {
    id: 'progressive-20a-grid-custom-card-layout',
    title: 'Progressive 20a — Grid: Custom Card Layout',
    description: 'Uses a precise CSS-grid card layout: avatar left, stacked name and clickable email, department and salary row, progress row, and status plus rating row. The full card is clickable.',
    data: tenUsersData,
    config: {
      zones: {
        header: {
          title: 'Team Grid — Custom Profile Cards',
          subtitle: 'Click a card for interaction events or click the email to open mail',
          icon: 'grid',
        },
        content: createGridContent(tenUsersData, customGridProfileFields, {
          grid: { minItemWidth: '300px', gap: '16px', maxColumns: 3 },
          gestures: [
            {
              type: 'item-click',
              enabled: true,
              interactionId: 'profile-card-click',
              interactionLabel: 'Profile Card Click',
            },
          ],
          item: {
            layout: {
              type: 'grid',
              grid: {
                columns: '48px minmax(0, 1fr) auto',
                gap: '0.5rem 0.75rem',
                areas: [
                  '"src name name"',
                  '"src email email"',
                  '"department department amount"',
                  '"progress progress progress"',
                  '"status rating rating"',
                ],
              },
            },
          },
        }),
        footer: { subtitle: 'Custom grid card layout with item-click and mailto links' },
      },
    },
  },

  // ─── Carousel Mode ──────────────────────────────────────────────────────────

  {
    id: 'progressive-21-carousel-basic',
    title: 'Progressive 21 — Carousel: Basic',
    description: 'Switches to carousel mode. Items scroll horizontally with default settings — no arrows or indicators.',
    data: tenUsersData,
    config: {
      zones: {
        header: { title: 'User Carousel', icon: 'carousel' },
        content: createCarouselContent(tenUsersData, [
          { key: 'name', label: 'Name', type: 'text' },
          { key: 'role', label: 'Role', type: 'text' },
          { key: 'department', label: 'Department', type: 'text' },
        ]),
      },
    },
  },

  {
    id: 'progressive-22-carousel-navigation',
    title: 'Progressive 22 — Carousel: Navigation Controls',
    description: 'Enables arrow buttons and slide indicators for explicit navigation.',
    data: tenUsersData,
    config: {
      zones: {
        header: { title: 'User Carousel — Navigation', subtitle: 'Arrows + indicators enabled', icon: 'carousel' },
        content: createCarouselContent(tenUsersData, [
          { key: 'name', label: 'Name', type: 'text' },
          { key: 'role', label: 'Role', type: 'text' },
          statusField,
        ], { carousel: { showArrows: true, showIndicators: true } }),
      },
    },
  },

  {
    id: 'progressive-23-carousel-autoplay',
    title: 'Progressive 23 — Carousel: Auto-Play',
    description: 'Enables infinite looping with auto-play every 3 seconds. No navigation controls for a passive, self-advancing carousel experience.',
    data: tenUsersData,
    config: {
      zones: {
        header: { title: 'User Carousel — Auto-Play', subtitle: 'Infinite loop, 3s interval', icon: 'carousel' },
        content: createCarouselContent(tenUsersData, [
          avatarField,
          { key: 'name', label: 'Name', type: 'text' },
          { key: 'role', label: 'Role', type: 'text' },
        ], { carousel: { showArrows: false, showIndicators: false, infinite: true, autoPlay: true, autoPlayInterval: 3000 } }),
      },
    },
  },

  {
    id: 'progressive-23a-carousel-revolving-true',
    title: 'Progressive 23A — Carousel: Infinite + Revolving (Continuous Wrap)',
    description: 'Comparison baseline with infinite=true and revolving=true. Continuous wrap keeps forward momentum across the loop boundary.',
    data: tenUsersData,
    config: {
      zones: {
        header: {
          title: 'Carousel Looping — Continuous Wrap',
          subtitle: 'infinite=true · revolving=true',
          icon: 'carousel',
        },
        content: createCarouselContent(tenUsersData, [
          avatarField,
          { key: 'name', label: 'Name', type: 'text' },
          { key: 'role', label: 'Role', type: 'text' },
          statusField,
        ], {
          carousel: {
            itemWidth: 260,
            gap: 16,
            showArrows: true,
            showIndicators: true,
            infinite: true,
            revolving: true,
            autoPlay: false,
          },
        }),
      },
    },
  },

  {
    id: 'progressive-23b-carousel-revolving-false',
    title: 'Progressive 23B — Carousel: Infinite + Rewinding Loop',
    description: 'Same config as 23A except revolving=false. This produces a rewind-style loop at the boundary.',
    data: tenUsersData,
    config: {
      zones: {
        header: {
          title: 'Carousel Looping — Rewind Style',
          subtitle: 'infinite=true · revolving=false',
          icon: 'carousel',
        },
        content: createCarouselContent(tenUsersData, [
          avatarField,
          { key: 'name', label: 'Name', type: 'text' },
          { key: 'role', label: 'Role', type: 'text' },
          statusField,
        ], {
          carousel: {
            itemWidth: 260,
            gap: 16,
            showArrows: true,
            showIndicators: true,
            infinite: true,
            revolving: false,
            autoPlay: false,
          },
        }),
      },
    },
  },

  {
    id: 'progressive-24-carousel-dimensions',
    title: 'Progressive 24 — Carousel: Custom Dimensions',
    description: 'Sets explicit item width and gap for a tighter or wider card presentation.',
    data: tenUsersData,
    config: {
      zones: {
        header: { title: 'User Carousel — Custom Sizing', subtitle: '260px items, 20px gap', icon: 'carousel' },
        content: createCarouselContent(tenUsersData, [
          avatarField,
          { key: 'name', label: 'Name', type: 'text' },
          { key: 'role', label: 'Role', type: 'text' },
          statusField,
          ratingField,
        ], {
          carousel: { itemWidth: 260, gap: 20, showArrows: true },
          gestures: [
            {
              type: 'item-click',
              enabled: true,
              interactionId: 'carousel-card-click',
              interactionLabel: 'Carousel Card Click',
            },
          ],
        }),
      },
    },
  },

  {
    id: 'progressive-25-carousel-full',
    title: 'Progressive 25 — Carousel: Full Showcase',
    description: 'Full carousel showcase: rich fields, auto-play, arrows, indicators, zone actions, and item actions.',
    data: twentyUsersData,
    config: {
      zones: {
        header: {
          title: 'Team Showcase',
          subtitle: 'Infinite carousel · auto-play',
          icon: 'carousel',
          actions: [
            zoneAction('add-member', 'Add Member', 'add', 'pinned', 'primary'),
            zoneAction('export', 'Export', 'download', 'menu'),
          ],
        },
        content: createCarouselContent(twentyUsersData, [
          avatarField,
          { key: 'name', label: 'Name', type: 'text' },
          { key: 'department', label: 'Department', type: 'text' },
          statusField,
          progressField,
          ratingField,
        ], {
          carousel: { itemWidth: 280, gap: 16, showArrows: true, showIndicators: true, infinite: true, autoPlay: true, autoPlayInterval: 4000 },
          actions: [
            itemAction('view-profile', 'View', 'view', 'pinned', 'secondary'),
            itemAction('message', 'Message', 'message', 'onHover'),
          ],
        }),
        footer: { subtitle: 'Infinite loop · 20 team members' },
      },
    },
  },

  // ─── Board Mode ─────────────────────────────────────────────────────────────

  {
    id: 'progressive-26-board-basic',
    title: 'Progressive 26 — Board: Basic Columns',
    description: 'Introduces board (Kanban) mode. Items are sorted into status columns using the columns.field and columns.items config.',
    data: twentyUsersData,
    config: {
      zones: {
        header: { title: 'Status Board', subtitle: 'Items grouped by status column', icon: 'table' },
        content: createBoardContent(twentyUsersData, [
          { key: 'name', label: 'Name', type: 'text' },
          { key: 'role', label: 'Role', type: 'text' },
        ], {
          board: {
            columns: {
              field: 'status',
              items: [
                { id: 'active', label: 'Active' },
                { id: 'pending', label: 'Pending' },
                { id: 'inactive', label: 'Inactive' },
              ],
            },
          },
        }),
      },
    },
  },

  {
    id: 'progressive-27-board-header-footer',
    title: 'Progressive 27 — Board: Header & Footer',
    description: 'Adds a header with title/icon/zone actions and a footer subtitle to the board.',
    data: twentyUsersData,
    config: {
      zones: {
        header: {
          title: 'Team Board',
          subtitle: 'Status columns',
          icon: 'table',
          actions: [
            zoneAction('add-task', 'Add Task', 'add', 'pinned', 'primary'),
            zoneAction('export-board', 'Export', 'download', 'menu'),
          ],
        },
        content: createBoardContent(twentyUsersData, [
          { key: 'name', label: 'Name', type: 'text' },
          { key: 'role', label: 'Role', type: 'text' },
        ], {
          board: {
            columns: {
              field: 'status',
              items: [
                { id: 'active', label: 'Active', color: '#10b981' },
                { id: 'pending', label: 'Pending', color: '#f59e0b' },
                { id: 'inactive', label: 'Inactive', color: '#6b7280' },
              ],
            },
          },
        }),
        footer: { subtitle: 'Kanban board with header and footer zones' },
      },
    },
  },

  {
    id: 'progressive-28-board-card-actions',
    title: 'Progressive 28 — Board: Card Actions',
    description: 'Adds pinned, hover, and menu actions to board cards, and enables item-click gestures.',
    data: twentyUsersData,
    config: {
      zones: {
        header: { title: 'Team Board — Card Actions', icon: 'table' },
        content: createBoardContent(twentyUsersData, [
          { key: 'name', label: 'Name', type: 'text' },
          { key: 'role', label: 'Role', type: 'text' },
        ], {
          board: {
            columns: {
              field: 'status',
              items: [
                { id: 'active', label: 'Active', color: '#10b981' },
                { id: 'pending', label: 'Pending', color: '#f59e0b' },
                { id: 'inactive', label: 'Inactive', color: '#6b7280' },
              ],
            },
          },
          actions: [
            itemAction('open-user', 'Open', 'view', 'pinned', 'secondary'),
            itemAction('message-user', 'Message', 'message', 'onHover'),
            itemAction('archive-user', 'Archive', 'archive', 'menu'),
          ],
          gestures: [
            { type: 'item-click', enabled: true, interactionId: 'card-click', interactionLabel: 'Card Click' },
          ],
        }),
      },
    },
  },

  {
    id: 'progressive-29-board-drag',
    title: 'Progressive 29 — Board: Drag & Drop',
    description: 'Enables drag-and-drop between columns. Cards can be dragged across status columns with a drop gesture callback.',
    data: twentyUsersData,
    config: {
      zones: {
        header: { title: 'Team Board — Drag & Drop', subtitle: 'Drag cards between columns', icon: 'table' },
        content: createBoardContent(twentyUsersData, [
          { key: 'name', label: 'Name', type: 'text' },
          { key: 'role', label: 'Role', type: 'text' },
        ], {
          board: {
            columns: {
              field: 'status',
              items: [
                { id: 'active', label: 'Active', color: '#10b981' },
                { id: 'pending', label: 'Pending', color: '#f59e0b' },
                { id: 'inactive', label: 'Inactive', color: '#6b7280' },
              ],
            },
            dragEnabled: true,
          },
          actions: [
            itemAction('open-user', 'Open', 'view', 'pinned', 'secondary'),
          ],
          gestures: [
            { type: 'item-drop', enabled: true, interactionId: 'board-drop', interactionLabel: 'Board Drop' },
          ],
        }),
        footer: { subtitle: 'Drag cards to change status' },
      },
    },
  },

  {
    id: 'progressive-30-board-wip-limits',
    title: 'Progressive 30 — Board: WIP Limits',
    description: 'Adds work-in-progress (WIP) limits to columns. The column header is highlighted when the limit is exceeded.',
    data: twentyUsersData,
    config: {
      zones: {
        header: { title: 'Team Board — WIP Limits', subtitle: 'Columns highlight when limit exceeded', icon: 'table' },
        content: createBoardContent(twentyUsersData, [
          { key: 'name', label: 'Name', type: 'text' },
          { key: 'role', label: 'Role', type: 'text', renderAs: 'badge' },
        ], {
          board: {
            columns: {
              field: 'status',
              items: [
                { id: 'active', label: 'Active', color: '#10b981', wipLimit: 6 },
                { id: 'pending', label: 'Pending', color: '#f59e0b', wipLimit: 4 },
                { id: 'inactive', label: 'Inactive', color: '#6b7280' },
              ],
            },
            dragEnabled: true,
          },
          actions: [
            itemAction('open-user', 'Open', 'view', 'pinned', 'secondary'),
          ],
        }),
        footer: { subtitle: 'Active: max 6 · Pending: max 4' },
      },
    },
  },

  // ─── Board Mode: Swimlanes ──────────────────────────────────────────────────

  {
    id: 'progressive-31-board-swimlanes',
    title: 'Progressive 31 — Board: Swimlanes (Collapsible)',
    description: 'Adds department swimlane rows. By default swimlanes use collapsible mode, each showing its own column headers. Toggle the chevron to collapse a swimlane.',
    data: twentyUsersData,
    config: {
      zones: {
        header: { title: 'Team Board by Department', subtitle: 'Status columns × department swimlanes', icon: 'table' },
        content: createBoardContent(twentyUsersData, [
          { key: 'name', label: 'Name', type: 'text' },
          { key: 'role', label: 'Role', type: 'text' },
        ], {
          board: {
            columns: {
              field: 'status',
              items: [
                { id: 'active', label: 'Active', color: '#10b981' },
                { id: 'pending', label: 'Pending', color: '#f59e0b' },
                { id: 'inactive', label: 'Inactive', color: '#6b7280' },
              ],
            },
            swimlanes: {
              field: 'department',
              items: [
                { id: 'engineering', label: 'Engineering', value: 'Engineering' },
                { id: 'design', label: 'Design', value: 'Design' },
                { id: 'business', label: 'Business', value: 'Business' },
              ],
            },
          },
        }),
        footer: { subtitle: 'Collapsible swimlanes — headers repeat per lane by default' },
      },
    },
  },

  {
    id: 'progressive-32-board-swimlanes-actions',
    title: 'Progressive 32 — Board: Swimlanes + Card Actions',
    description: 'Combines collapsible swimlanes with card actions and an item-click gesture.',
    data: twentyUsersData,
    config: {
      zones: {
        header: {
          title: 'Team Board with Actions',
          subtitle: 'Collapsible swimlanes + card actions',
          icon: 'table',
          actions: [
            zoneAction('invite-user', 'Invite User', 'add', 'pinned', 'primary'),
            zoneAction('export-board', 'Export CSV', 'download', 'menu'),
          ],
        },
        content: createBoardContent(twentyUsersData, [
          { key: 'name', label: 'Name', type: 'text' },
          { key: 'role', label: 'Role', type: 'text' },
        ], {
          board: {
            columns: {
              field: 'status',
              items: [
                { id: 'active', label: 'Active', color: '#10b981' },
                { id: 'pending', label: 'Pending', color: '#f59e0b' },
                { id: 'inactive', label: 'Inactive', color: '#6b7280' },
              ],
            },
            swimlanes: {
              field: 'department',
              items: [
                { id: 'engineering', label: 'Engineering', value: 'Engineering' },
                { id: 'design', label: 'Design', value: 'Design' },
                { id: 'business', label: 'Business', value: 'Business' },
              ],
            },
          },
          actions: [
            itemAction('open-user', 'Open User', 'view', 'pinned', 'secondary'),
            itemAction('message-user', 'Message', 'message', 'onHover'),
            itemAction('more-options', 'More', 'menu', 'menu'),
          ],
          gestures: [
            { type: 'item-click', enabled: true, interactionId: 'card-click', interactionLabel: 'Card Click' },
          ],
        }),
        footer: { subtitle: 'Board with zone actions, card actions, and item-click gestures' },
      },
    },
  },

  {
    id: 'progressive-33-board-matrix',
    title: 'Progressive 33 — Board: Matrix Swimlanes',
    description: 'Uses layout: { type: "matrix" } for a traditional matrix board with a single sticky column header row and swimlane label column on the left.',
    data: twentyUsersData,
    config: {
      zones: {
        header: { title: 'Team Board — Matrix Layout', subtitle: 'Status columns × department rows', icon: 'table' },
        content: createBoardContent(twentyUsersData, [
          { key: 'name', label: 'Name', type: 'text' },
          { key: 'role', label: 'Role', type: 'text' },
        ], {
          board: {
            columns: {
              field: 'status',
              items: [
                { id: 'active', label: 'Active', color: '#10b981' },
                { id: 'pending', label: 'Pending', color: '#f59e0b' },
                { id: 'inactive', label: 'Inactive', color: '#6b7280' },
              ],
            },
            swimlanes: {
              field: 'department',
              items: [
                { id: 'engineering', label: 'Engineering', value: 'Engineering' },
                { id: 'design', label: 'Design', value: 'Design' },
                { id: 'business', label: 'Business', value: 'Business' },
              ],
              layout: { type: 'matrix' },
            },
          },
        }),
        footer: { subtitle: 'Matrix layout: single header row, swimlane labels on left' },
      },
    },
  },

  {
    id: 'progressive-34-board-advanced',
    title: 'Progressive 34 — Board: Advanced (Drag, Labels, WIP)',
    description: 'Final full-featured board: matrix swimlanes, drag-and-drop, custom swimlane labels, WIP limits, card actions, and drop gesture callbacks.',
    data: twentyUsersData,
    config: {
      zones: {
        header: {
          title: 'Advanced Team Board',
          subtitle: 'Drag-enabled matrix board with swimlane labels, WIP limits, and drop callbacks',
          icon: 'table',
          actions: [
            zoneAction('invite-user', 'Invite User', 'add', 'pinned', 'primary'),
            zoneAction('sync-board', 'Sync', 'refresh', 'pinned', 'secondary'),
            zoneAction('export-board', 'Export CSV', 'download', 'menu'),
          ],
        },
        content: createBoardContent(twentyUsersData, [
          { key: 'name', label: 'Name', type: 'text' },
          { key: 'role', label: 'Role', type: 'text', renderAs: 'badge' },
        ], {
          board: {
            columns: {
              field: 'status',
              items: [
                { id: 'active', label: '▶ Active', value: 'active', color: '#10b981', wipLimit: 8 },
                { id: 'pending', label: '⏳ Pending', value: 'pending', color: '#f59e0b', wipLimit: 5 },
                { id: 'inactive', label: '✓ Inactive', value: 'inactive', color: '#6b7280' },
              ],
            },
            swimlanes: {
              field: 'department',
              items: [
                { id: 'engineering', label: '🚀 R&D Engineering', value: 'Engineering' },
                { id: 'design', label: '✏️ Product Design', value: 'Design' },
                { id: 'business', label: '💼 Business Dev', value: 'Business' },
              ],
              layout: { type: 'matrix' },
            },
            dragEnabled: true,
          },
          actions: [
            itemAction('open-user', 'Open User', 'view', 'pinned', 'secondary'),
            itemAction('message-user', 'Message', 'message', 'onHover'),
            itemAction('more-options', 'More', 'menu', 'menu'),
          ],
          gestures: [
            { type: 'item-click', enabled: true, interactionId: 'card-click', interactionLabel: 'Card Click' },
            { type: 'item-drop', enabled: true, interactionId: 'board-drop', interactionLabel: 'Board Drop' },
          ],
        }),
        footer: { subtitle: 'Full board: drag-and-drop, WIP limits, custom swimlane labels, content actions, drop callbacks' },
      },
    },
  },

  {
    id: 'progressive-35-board-global-headers',
    title: 'Progressive 35 — Board: Collapsible Swimlanes with Global Header Row',
    description: 'Demonstrates repeatingHeaders: false on collapsible swimlanes, producing a single global column header row above all swimlanes rather than repeating headers per lane.',
    data: twentyUsersData,
    config: {
      zones: {
        header: { title: 'Board with Single Global Header Row', subtitle: 'Collapsible swimlanes · unified column headers', icon: 'table' },
        content: createBoardContent(twentyUsersData, [
          { key: 'name', label: 'Name', type: 'text' },
          { key: 'role', label: 'Role', type: 'text', renderAs: 'badge' },
        ], {
          board: {
            columns: {
              field: 'status',
              items: [
                { id: 'active', label: '▶ Active', value: 'active', color: '#10b981' },
                { id: 'pending', label: '⏳ Pending', value: 'pending', color: '#f59e0b' },
                { id: 'inactive', label: '✓ Inactive', value: 'inactive', color: '#6b7280' },
              ],
            },
            swimlanes: {
              field: 'department',
              items: [
                { id: 'engineering', label: '🚀 Engineering', value: 'Engineering' },
                { id: 'design', label: '✏️ Design', value: 'Design' },
                { id: 'business', label: '💼 Business', value: 'Business' },
              ],
              layout: { type: 'collapsible', defaultCollapsed: false },
              repeatingHeaders: false,
            },
            dragEnabled: true,
          },
          actions: [
            itemAction('open-user', 'Open User', 'view', 'pinned', 'secondary'),
            itemAction('message-user', 'Message', 'message', 'onHover'),
          ],
          gestures: [
            { type: 'item-drop', enabled: true, interactionId: 'board-drop', interactionLabel: 'Board Drop' },
          ],
        }),
        footer: { subtitle: 'repeatingHeaders: false → single header row above all swimlanes' },
      },
    },
  },

  // ─── Board Mode: Column Config ─────────────────────────────────────────────

  {
    id: 'progressive-35a-board-column-value-mapping',
    title: 'Progressive 35A — Board: Column Value Mapping',
    description: 'Shows that columns.items[].id does not have to match the data field value. Use value to explicitly declare what field value routes items into this column. Here id is a slug ("eng-active") and value is the real field string ("active").',
    data: twentyUsersData,
    config: {
      zones: {
        header: {
          title: 'Board — Explicit Value Mapping',
          subtitle: 'id ≠ value: slug ids route by value string',
          icon: 'table',
        },
        content: createBoardContent(twentyUsersData, [
          { key: 'name', label: 'Name', type: 'text' },
          { key: 'department', label: 'Department', type: 'text' },
          statusField,
        ], {
          board: {
            columns: {
              field: 'status',
              items: [
                { id: 'col-active',   label: 'Active',   value: 'active',   color: '#10b981' },
                { id: 'col-pending',  label: 'Pending',  value: 'pending',  color: '#f59e0b' },
                { id: 'col-inactive', label: 'Inactive', value: 'inactive', color: '#6b7280' },
              ],
            },
          },
        }),
        footer: { subtitle: 'id="col-active" routes items where status === "active"' },
      },
    },
  },

  {
    id: 'progressive-35b-board-column-width-wip',
    title: 'Progressive 35B — Board: Column Width + WIP Limits',
    description: 'Sets visibly different widths per column and adds wipLimit to Active and Pending so the header highlights when the count exceeds the limit.',
    data: twentyUsersData,
    config: {
      zones: {
        header: {
          title: 'Board — Column Width & WIP Limits',
          subtitle: 'Active: 340px/limit 5 · Pending: 260px/limit 3 · Inactive: 200px',
          icon: 'table',
        },
        content: createBoardContent(twentyUsersData, [
          { key: 'name', label: 'Name', type: 'text' },
          { key: 'role', label: 'Role', type: 'text', renderAs: 'badge' },
          statusField,
        ], {
          board: {
            columns: {
              field: 'status',
              items: [
                { id: 'active',   label: 'Active',   color: '#10b981', width: '340px', wipLimit: 5 },
                { id: 'pending',  label: 'Pending',  color: '#f59e0b', width: '260px', wipLimit: 3 },
                { id: 'inactive', label: 'Inactive', color: '#6b7280', width: '200px' },
              ],
            },
          },
        }),
        footer: { subtitle: 'Column widths differ visually · WIP limit exceeded columns are highlighted' },
      },
    },
  },

  {
    id: 'progressive-35c-board-column-filter',
    title: 'Progressive 35C — Board: Filter-Based Column Routing (Advanced)',
    description: 'Uses items[].filter for custom routing logic. Note: filter is a function and cannot be expressed as plain JSON — it requires code-level config. Here "High Performers" catches progress >= 70 regardless of status, "Needs Attention" catches progress < 40, and "Mid Range" catches everything else.',
    data: twentyUsersData,
    config: {
      zones: {
        header: {
          title: 'Board — Filter-Based Routing',
          subtitle: 'items[].filter: function-based routing, not JSON config',
          icon: 'table',
        },
        content: createBoardContent(twentyUsersData, [
          { key: 'name', label: 'Name', type: 'text' },
          { key: 'department', label: 'Department', type: 'text' },
          progressField,
          statusField,
        ], {
          board: {
            columns: {
              field: 'progress',
              items: [
                {
                  id: 'high',
                  label: 'High Performers',
                  color: '#10b981',
                  filter: (entity: Entity) => typeof entity.progress === 'number' && entity.progress >= 70,
                },
                {
                  id: 'mid',
                  label: 'Mid Range',
                  color: '#3b82f6',
                  filter: (entity: Entity) => typeof entity.progress === 'number' && entity.progress >= 40 && entity.progress < 70,
                },
                {
                  id: 'low',
                  label: 'Needs Attention',
                  color: '#ef4444',
                  filter: (entity: Entity) => typeof entity.progress === 'number' && entity.progress < 40,
                },
              ],
            },
          },
        }),
        footer: { subtitle: 'filter fn overrides field-value matching — code config only' },
      },
    },
  },

  {
    id: 'progressive-35d-board-swimlane-value-and-filter',
    title: 'Progressive 35D — Board: Swimlane Value + Filter Routing',
    description: 'Demonstrates mixed swimlane routing in one board: Engineering and Design lanes route by explicit value mapping, while a third lane uses a filter predicate to capture all remaining departments. This keeps lane assignment deterministic and easy to verify.',
    data: twentyUsersData,
    config: {
      zones: {
        header: {
          title: 'Board — Swimlane Value + Filter Routing',
          subtitle: 'Engineering/Design use value · Others use filter predicate',
          icon: 'table',
        },
        content: createBoardContent(twentyUsersData, [
          { key: 'name', label: 'Name', type: 'text' },
          { key: 'department', label: 'Department', type: 'text' },
          { key: 'role', label: 'Role', type: 'text', renderAs: 'badge' },
        ], {
          board: {
            columns: {
              field: 'status',
              items: [
                { id: 'active', label: 'Active', value: 'active', color: '#10b981' },
                { id: 'pending', label: 'Pending', value: 'pending', color: '#f59e0b' },
                { id: 'inactive', label: 'Inactive', value: 'inactive', color: '#6b7280' },
              ],
            },
            swimlanes: {
              field: 'department',
              items: [
                { id: 'lane-eng', label: 'Engineering (value)', value: 'Engineering' },
                { id: 'lane-design', label: 'Design (value)', value: 'Design' },
                {
                  id: 'lane-other',
                  label: 'Other Departments (filter)',
                  filter: (entity: Entity) => {
                    const department = entity.department;
                    return typeof department === 'string' && department !== 'Engineering' && department !== 'Design';
                  },
                },
              ],
              layout: { type: 'matrix' },
            },
          },
        }),
        footer: { subtitle: 'Value-mapped lanes: Engineering/Design · Filter lane: all remaining departments' },
      },
    },
  },

  {
    id: 'progressive-36-chart-basic',
    title: 'Progressive 36 - Chart: Basic Bar',
    description: 'Introduces chart mode with a basic bar chart using month on the x-axis and revenue as a single y-axis series.',
    data: monthlyKpiData,
    config: {
      zones: {
        header: { title: 'Monthly Revenue', subtitle: 'Basic chart mode setup', icon: 'chart-bar' },
        content: createChartContent(monthlyKpiData, [
          { key: 'month', label: 'Month', type: 'text' },
          { key: 'revenue', label: 'Revenue', type: 'number' },
        ], {
          chart: {
            xAxis: 'month',
            series: [{ type: 'bar', key: 'revenue' }],
            height: 320,
          },
        }),
      },
    },
  },

  {
    id: 'progressive-37-chart-line-multiseries',
    title: 'Progressive 37 - Chart: Multi-Series Line',
    description: 'Switches to a line chart and plots revenue and cost together to compare trends over time.',
    data: monthlyKpiData,
    config: {
      zones: {
        header: { title: 'Revenue vs Cost Trend', subtitle: 'Line chart with two series', icon: 'chart-line' },
        content: createChartContent(monthlyKpiData, [
          { key: 'month', label: 'Month', type: 'text' },
          { key: 'revenue', label: 'Revenue', type: 'number' },
          { key: 'cost', label: 'Cost', type: 'number' },
        ], {
          chart: {
            xAxis: 'month',
            series: [{ type: 'line', key: 'revenue' }, { type: 'line', key: 'cost' }],
            height: 320,
            showGrid: true,
            showLegend: true,
          },
        }),
      },
    },
  },

  {
    id: 'progressive-38-chart-area-labels',
    title: 'Progressive 38 - Chart: Area with Labels',
    description: 'Uses an area chart and enables labels to make each monthly value readable directly on the chart.',
    data: monthlyKpiData,
    config: {
      zones: {
        header: { title: 'Revenue Area', subtitle: 'Area chart with labels', icon: 'chart-line' },
        content: createChartContent(monthlyKpiData, [
          { key: 'month', label: 'Month', type: 'text' },
          { key: 'revenue', label: 'Revenue', type: 'number' },
        ], {
          chart: {
            xAxis: 'month',
            series: [{ type: 'area', key: 'revenue' }],
            showLabels: true,
            height: 320,
          },
        }),
      },
    },
  },

  {
    id: 'progressive-39-chart-pie',
    title: 'Progressive 39 - Chart: Pie',
    description: 'Renders a pie chart to visualize how monthly users are distributed across the period.',
    data: monthlyKpiData,
    config: {
      zones: {
        header: { title: 'User Distribution by Month', subtitle: 'Pie chart mode', icon: 'chart-pie' },
        content: createChartContent(monthlyKpiData, [
          { key: 'month', label: 'Month', type: 'text' },
          { key: 'users', label: 'Users', type: 'number' },
        ], {
          chart: {
            xAxis: 'month',
            series: [{ type: 'pie', key: 'users' }],
            showLabels: true,
            height: 340,
          },
        }),
      },
    },
  },

  {
    id: 'progressive-40-chart-custom-colors',
    title: 'Progressive 40 - Chart: Custom Colors + No Grid',
    description: 'Applies a custom palette and disables the grid to show chart styling controls with the same data.',
    data: monthlyKpiData,
    config: {
      zones: {
        header: { title: 'Styled Revenue Bar', subtitle: 'Custom colors and presentation settings', icon: 'chart-bar' },
        content: createChartContent(monthlyKpiData, [
          { key: 'month', label: 'Month', type: 'text' },
          { key: 'revenue', label: 'Revenue', type: 'number' },
        ], {
          chart: {
            xAxis: 'month',
            series: [{ type: 'bar', key: 'revenue' }],
            colors: ['#1d4ed8', '#047857', '#b45309', '#b91c1c', '#7c3aed', '#0f766e'],
            showGrid: false,
            showLegend: false,
            height: 320,
          },
        }),
      },
    },
  },

  {
    id: 'progressive-41-chart-click-gesture',
    title: 'Progressive 41 - Chart: Item Click Gesture',
    description: 'Adds item-click gesture wiring in chart mode so bars emit canonical interaction events.',
    data: monthlyKpiData,
    config: {
      zones: {
        header: {
          title: 'Interactive Revenue Chart',
          subtitle: 'Click any bar to emit content item-click interaction',
          icon: 'chart-bar',
        },
        content: createChartContent(monthlyKpiData, [
          { key: 'month', label: 'Month', type: 'text' },
          { key: 'revenue', label: 'Revenue', type: 'number' },
        ], {
          chart: {
            xAxis: 'month',
            series: [{ type: 'bar', key: 'revenue' }],
            height: 320,
          },
          gestures: [
            {
              type: 'item-click',
              enabled: true,
              interactionId: 'chart-item-click',
              interactionLabel: 'Chart Item Click',
            },
          ],
        }),
        footer: { subtitle: 'Interaction payloads are routed to the demo action sink.' },
      },
    },
  },

  {
    id: 'progressive-42-chart-grouped-bar',
    title: 'Progressive 42 - Chart: Grouped Bar',
    description: 'Plots revenue and cost side-by-side each month using multiple yAxis keys, demonstrating grouped bar chart layout.',
    data: monthlyKpiData,
    config: {
      zones: {
        header: { title: 'Revenue vs Cost (Grouped Bars)', subtitle: 'Multiple yAxis series on a bar chart', icon: 'chart-bar' },
        content: createChartContent(monthlyKpiData, [
          { key: 'month', label: 'Month', type: 'text' },
          { key: 'revenue', label: 'Revenue', type: 'number' },
          { key: 'cost', label: 'Cost', type: 'number' },
        ], {
          chart: {
            xAxis: 'month',
            series: [{ type: 'bar', key: 'revenue' }, { type: 'bar', key: 'cost' }],
            height: 320,
            showGrid: true,
            showLabels: false,
            legendAlign: 'center',
            tooltip: { position: 'top' },
          },
        }),
      },
    },
  },

  {
    id: 'progressive-43-chart-horizontal-bar',
    title: 'Progressive 43 - Chart: Horizontal Bar',
    description: 'Rotates the bar chart 90° with orientation: horizontal to compare revenue per month with categories on the y-axis.',
    data: monthlyKpiData,
    config: {
      zones: {
        header: { title: 'Monthly Revenue (Horizontal)', subtitle: 'Bar chart with horizontal orientation', icon: 'chart-bar' },
        content: createChartContent(monthlyKpiData, [
          { key: 'month', label: 'Month', type: 'text' },
          { key: 'revenue', label: 'Revenue', type: 'number' },
          { key: 'cost', label: 'Cost', type: 'number' },
        ], {
          chart: {
            orientation: 'horizontal',
            xAxis: 'month',
            series: [{ type: 'bar', key: 'revenue' }, { type: 'bar', key: 'cost' }],
            height: 340,
            showGrid: true,
            showLabels: true,
            legendAlign: 'center',
            tooltip: { position: 'left' },
          },
        }),
      },
    },
  },
  {
    id: 'progressive-44-chart-custom-tooltip',
    title: 'Progressive 44 - Chart: Custom Tooltip Renderer',
    description:
      'Demonstrates a fully custom tooltip render function that renders a rich card with revenue, cost, users, and computed margin.',
    data: monthlyKpiData,
    config: {
      zones: {
        header: {
          title: 'Revenue with Custom Tooltip',
          subtitle: 'Hover a bar to see the custom-rendered tooltip card',
          icon: 'chart-bar',
        },
        content: createChartContent(
          monthlyKpiData,
          [
            { key: 'month', label: 'Month', type: 'text' },
            { key: 'revenue', label: 'Revenue', type: 'number' },
            { key: 'cost', label: 'Cost', type: 'number' },
            { key: 'users', label: 'Users', type: 'number' },
          ],
          {
            chart: {
              xAxis: 'month',
              series: [{ type: 'bar', key: 'revenue' }, { type: 'bar', key: 'cost' }],
              height: 320,
              showGrid: true,
              showLabels: false,
              legendAlign: 'center',
              tooltip: {
                position: 'top-right',
                render: (ctx) => {
                  const entity = ctx.entity as {
                    month?: string;
                    revenue?: number;
                    cost?: number;
                    users?: number;
                  };
                  const margin =
                    entity.revenue != null && entity.cost != null
                      ? entity.revenue - entity.cost
                      : null;
                  const marginPct =
                    margin != null && entity.cost
                      ? ((margin / entity.cost) * 100).toFixed(1)
                      : null;
                  return (
                    <div style={{ minWidth: '180px' }}>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.4rem',
                          marginBottom: '0.5rem',
                          borderBottom: '1px solid var(--widgemo-color-border, #dee2e6)',
                          paddingBottom: '0.4rem',
                        }}
                      >
                        <span
                          style={{
                            width: 10,
                            height: 10,
                            borderRadius: '50%',
                            backgroundColor: ctx.color,
                            display: 'inline-block',
                            flexShrink: 0,
                          }}
                        />
                        <strong style={{ fontSize: '13px' }}>{entity.month}</strong>
                      </div>
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: 'auto 1fr',
                          gap: '2px 8px',
                          fontSize: '12px',
                        }}
                      >
                        <span style={{ color: 'var(--widgemo-color-textMuted, #6c757d)' }}>Revenue</span>
                        <span style={{ fontWeight: 600, textAlign: 'right' }}>
                          ${entity.revenue ?? '–'}
                        </span>
                        <span style={{ color: 'var(--widgemo-color-textMuted, #6c757d)' }}>Cost</span>
                        <span style={{ fontWeight: 600, textAlign: 'right' }}>
                          ${entity.cost ?? '–'}
                        </span>
                        <span style={{ color: 'var(--widgemo-color-textMuted, #6c757d)' }}>Users</span>
                        <span style={{ fontWeight: 600, textAlign: 'right' }}>
                          {entity.users ?? '–'}
                        </span>
                        {margin !== null && (
                          <>
                            <span style={{ color: 'var(--widgemo-color-textMuted, #6c757d)' }}>
                              Margin
                            </span>
                            <span
                              style={{
                                fontWeight: 600,
                                textAlign: 'right',
                                color:
                                  margin >= 0
                                    ? 'var(--widgemo-color-success, #28a745)'
                                    : 'var(--widgemo-color-danger, #dc3545)',
                              }}
                            >
                              ${margin} {marginPct ? `(${marginPct}%)` : ''}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  );
                },
              },
            },
          },
        ),
      },
    },
  },
  {
    id: 'progressive-45-chart-line-thick-with-points',
    title: 'Progressive 45 - Chart: Thick Line + Points',
    description:
      'Demonstrates lineThickness and showDots together for a stronger trend line with visible point markers.',
    data: monthlyKpiData,
    config: {
      zones: {
        header: {
          title: 'Revenue Trend (Thick + Points)',
          subtitle: 'lineThickness + showDots in line mode',
          icon: 'chart-line',
        },
        content: createChartContent(monthlyKpiData, [
          { key: 'month', label: 'Month', type: 'text' },
          { key: 'revenue', label: 'Revenue', type: 'number' },
          { key: 'cost', label: 'Cost', type: 'number' },
        ], {
          chart: {
            xAxis: 'month',
            series: [{ type: 'line', key: 'revenue' }, { type: 'line', key: 'cost' }],
            height: 320,
            showGrid: true,
            showLegend: true,
            lineThickness: 2,
            showDots: true,
          },
        }),
      },
    },
  },

  {
    id: 'progressive-46-chart-area-gradient-styles',
    title: 'Progressive 46 - Chart: Area Gradient + Thick Line + Points',
    description:
      'Shows areaGradient enabled with a thicker line and point markers, combining all new line/area style controls.',
    data: monthlyKpiData,
    config: {
      zones: {
        header: {
          title: 'Area Trend Styling Controls',
          subtitle: 'areaGradient + lineThickness + showDots in area mode',
          icon: 'chart-line',
        },
        content: createChartContent(monthlyKpiData, [
          { key: 'month', label: 'Month', type: 'text' },
          { key: 'revenue', label: 'Revenue', type: 'number' },
        ], {
          chart: {
            xAxis: 'month',
            series: [{ type: 'area', key: 'revenue' }],
            height: 320,
            showGrid: true,
            showLabels: false,
            lineThickness: 10,
            showDots: true,
            areaGradient: false,
          },
        }),
      },
    },
  },
  {
    id: 'progressive-47-chart-mixed-bar-line-overlay',
    title: 'Progressive 47 - Chart: Mixed Series Overlay (Bar + Line)',
    description:
      'Demonstrates mixed cartesian series by overlaying a line on top of bars in a single chart using the new series model.',
    data: monthlyKpiData,
    config: {
      zones: {
        header: {
          title: 'Revenue Bars + Cost Line',
          subtitle: 'Mixed series overlay in one chart',
          icon: 'chart-bar',
        },
        content: createChartContent(monthlyKpiData, [
          { key: 'month', label: 'Month', type: 'text' },
          { key: 'revenue', label: 'Revenue', type: 'number' },
          { key: 'cost', label: 'Cost', type: 'number' },
        ], {
          chart: {
            xAxis: 'month',
            series: [
              { type: 'bar', key: 'revenue', label: 'Revenue' },
              { type: 'line', key: 'cost', label: 'Cost', showDots: true, lineThickness: 3.5 },
            ],
            height: 320,
            showGrid: true,
            showLabels: false,
            showLegend: true,
            legendAlign: 'center',
            colors: ['#3157d5', '#b42318'],
          },
        }),
      },
    },
  },

  // ─── Theme Validation ───────────────────────────────────────────────────────

  {
    id: 'progressive-48-theme-provider-light-validation',
    title: 'Progressive 48 - Theme Validation Pair: Provider Light',
    description:
      'Provider-driven full-surface validation (light side of the pair). Uses the same config/data as Progressive 50; only the provider theme differs.',
    data: eightUsersData,
    config: {
      zones: {
        header: {
          title: 'Provider Theme Surface Validation',
          subtitle: 'Light provider preset (same config as Progressive 50)',
          icon: 'settings',
          actions: [
            zoneAction('provider-theme-validate', 'Provider Theme Check', 'check', 'pinned', 'primary'),
          ],
        },
        content: createTableContent(eightUsersData, [
          { key: 'name', label: 'Name', type: 'text' },
          { key: 'department', label: 'Department', type: 'text' },
          statusField,
        ], {
          table: traditionalTableConfig,
          pagination: { pageSize: 4 },
        }),
        footer: {
          subtitle: 'Expected: full light surfaces (container, table, and action controls) from provider theme="light".',
        },
      },
    },
  },

  {
    id: 'progressive-49-theme-token-object-override',
    title: 'Progressive 49 - Theme: Action Tokens (Button + Menu)',
    description:
      'Validates CSS-variable-driven action theming for both button and menu surfaces. ActionTheme remains typed API, but runtime visuals here are intentionally demonstrated through token variables.',
    data: eightUsersData,
    config: {
      style: ({
        '--widgemo-color-primary': '#7c3aed',
        '--widgemo-color-text': '#ffffff',
        '--widgemo-borderRadius': '12px',
        '--widgemo-color-actionButtonBg': '#7c3aed',
        '--widgemo-color-actionButtonColor': '#ffffff',
        '--widgemo-color-actionButtonBorder': '#6d28d9',
        '--widgemo-color-actionButtonHoverBg': '#6d28d9',
        '--widgemo-color-actionButtonHoverBorder': '#5b21b6',
        '--widgemo-color-actionMenuBg': '#faf5ff',
        '--widgemo-color-actionMenuColor': '#4c1d95',
        '--widgemo-color-actionMenuItemHoverBg': '#ede9fe',
        '--widgemo-color-actionMenuItemHoverColor': '#312e81',
      } as unknown as CSSProperties),
      zones: {
        header: {
          title: 'Token Override Path',
          subtitle: 'Open the header menu to validate actionMenu tokens',
          icon: 'settings',
          actions: [
            zoneAction('theme-check-action', 'Tokenized Action', 'check', 'pinned', 'primary'),
            zoneAction('theme-check-menu', 'More Actions', 'menu', 'menu'),
          ],
        },
        content: createTableContent(eightUsersData, [
          { key: 'name', label: 'Name', type: 'text' },
          { key: 'role', label: 'Role', type: 'text' },
          statusField,
        ], {
          table: traditionalTableConfig,
          pagination: { pageSize: 4 },
        }),
        footer: {
          subtitle: 'Expected: pinned action button and menu surfaces both follow the configured action CSS variables.',
        },
      },
    },
  },

  {
    id: 'progressive-50-theme-provider-dark-validation',
    title: 'Progressive 50 - Theme Validation Pair: Provider Dark',
    description:
      'Provider-driven full-surface validation (dark side of the pair). Uses the same config/data as Progressive 48; only the provider theme differs.',
    data: eightUsersData,
    config: {
      zones: {
        header: {
          title: 'Provider Theme Surface Validation',
          subtitle: 'Dark provider preset (same config as Progressive 48)',
          icon: 'settings',
          actions: [
            zoneAction('provider-theme-validate', 'Provider Theme Check', 'check', 'pinned', 'primary'),
          ],
        },
        content: createTableContent(eightUsersData, [
          { key: 'name', label: 'Name', type: 'text' },
          { key: 'department', label: 'Department', type: 'text' },
          statusField,
        ], {
          table: traditionalTableConfig,
          pagination: { pageSize: 4 },
        }),
        footer: {
          subtitle: 'Expected: full dark surfaces (container, table, and action controls) from provider theme="dark".',
        },
      },
    },
  },

  {
    id: 'progressive-51-theme-css-var-fallback-and-override',
    title: 'Progressive 51 - Theme: CSS Variable Fallback and Override',
    description:
      'Validates fallback and override paths in one snapshot: header uses an undefined variable and falls back, while footer uses a defined variable and resolves to the override value.',
    data: eightUsersData,
    config: {
      style: ({
        '--widgemo-color-demo-override': '#dcfce7',
        '--widgemo-color-demo-override-text': '#166534',
      } as unknown as CSSProperties),
      zones: {
        header: {
          title: 'CSS Variable Fallback Path',
          subtitle: 'Uses undefined var() token with fallback',
          icon: 'settings',
          themeOverrides: {
            backgroundColor: 'var(--widgemo-color-demo-missing, #fee2e2)',
            titleColor: 'var(--widgemo-color-demo-missing-text, #991b1b)',
            subtitleColor: 'var(--widgemo-color-demo-missing-subtitle, #b91c1c)',
          },
        },
        content: createTableContent(eightUsersData, [
          { key: 'name', label: 'Name', type: 'text' },
          { key: 'role', label: 'Role', type: 'text' },
          statusField,
        ], {
          table: traditionalTableConfig,
          pagination: { pageSize: 4 },
        }),
        footer: {
          subtitle: 'Expected: header shows red fallback; footer tint resolves from --widgemo-color-demo-override.',
          themeOverrides: {
            backgroundColor: 'var(--widgemo-color-demo-override, #dbeafe)',
            subtitleColor: 'var(--widgemo-color-demo-override-text, #1e3a8a)',
          },
        },
      },
    },
  },

  {
    id: 'progressive-52-theme-auto-snapshot-behavior',
    title: 'Progressive 52 - Theme Validation: Provider Auto Snapshot',
    description:
      'Runnable provider auto-mode case. theme="auto" resolves from current OS/browser preference at mount time, then stays fixed until remount/reload.',
    data: eightUsersData,
    config: {
      zones: {
        header: {
          title: 'Provider Auto Snapshot Check',
          subtitle: 'Auto resolves on mount; does not live-update while mounted',
          icon: 'settings',
        },
        content: createTableContent(eightUsersData, [
          { key: 'name', label: 'Name', type: 'text' },
          { key: 'department', label: 'Department', type: 'text' },
          statusField,
        ], {
          table: traditionalTableConfig,
          pagination: { pageSize: 4 },
        }),
        footer: {
          subtitle: 'Test: change OS/browser color scheme while this page is open (no live change). Then refresh/remount to observe updated auto snapshot.',
        },
      },
    },
  },

  {
    id: 'progressive-53-theme-config-baseline-advanced',
    title: 'Progressive 53 - Theme: Config Theme Baseline (Advanced)',
    description:
      'Advanced/non-primary behavior: config.theme selects registry zone/action baselines. It is not the primary full-surface dark/light path; provider theme presets are the primary mechanism.',
    data: eightUsersData,
    config: {
      theme: 'dark',
      zones: {
        header: {
          title: 'Config Theme Baseline (Advanced)',
          subtitle: 'config.theme="dark" baseline for zone/action layers',
          icon: 'settings',
        },
        content: createTableContent(eightUsersData, [
          { key: 'name', label: 'Name', type: 'text' },
          { key: 'department', label: 'Department', type: 'text' },
          statusField,
        ], {
          table: traditionalTableConfig,
          pagination: { pageSize: 4 },
        }),
        footer: {
          subtitle: 'Expected: registry baseline applies to zone/action layers. Full-surface dark/light differences are validated in Progressive 48/50 provider pair.',
        },
      },
    },
  },

  {
    id: 'progressive-54-theme-hook-with-provider',
    title: 'Progressive 54 - Theme Hook: With Provider',
    description:
      'Hook validation (provider path). The page-level hook probe should report non-empty theme keys and resolved color tokens when this example is wrapped by WidgemoThemeProvider.',
    data: eightUsersData,
    config: {
      zones: {
        header: {
          title: 'Hook Probe — Provider Path',
          subtitle: 'Probe should show resolved colors/spacing key counts > 0',
          icon: 'settings',
        },
        content: createTableContent(eightUsersData, [
          { key: 'name', label: 'Name', type: 'text' },
          { key: 'role', label: 'Role', type: 'text' },
          statusField,
        ], {
          table: traditionalTableConfig,
          pagination: { pageSize: 4 },
        }),
        footer: {
          subtitle: 'Expected: hook probe indicates provider-resolved theme object (not empty).',
        },
      },
    },
  },

  {
    id: 'progressive-55-theme-hook-without-provider',
    title: 'Progressive 55 - Theme Hook: Without Provider',
    description:
      'Hook validation (no-provider path). This example intentionally renders without WidgemoThemeProvider so the hook probe can demonstrate empty-object behavior.',
    data: eightUsersData,
    config: {
      zones: {
        header: {
          title: 'Hook Probe — No Provider Path',
          subtitle: 'Probe should show 0 keys / empty-object shape',
          icon: 'settings',
        },
        content: createTableContent(eightUsersData, [
          { key: 'name', label: 'Name', type: 'text' },
          { key: 'role', label: 'Role', type: 'text' },
          statusField,
        ], {
          table: traditionalTableConfig,
          pagination: { pageSize: 4 },
        }),
        footer: {
          subtitle: 'Expected: hook probe shows empty theme object when no provider wrapper is present.',
        },
      },
    },
  },

  {
    id: 'progressive-56-theme-registry-named-config',
    title: 'Progressive 56 - Theme Registry: Named config.theme',
    description:
      'Registry validation using registerTheme + getTheme. This example applies a named config.theme and should visibly differ from default zone/action baselines.',
    data: eightUsersData,
    config: {
      theme: 'demo-registry-contrast',
      zones: {
        header: {
          title: 'Named Registry Theme',
          subtitle: 'config.theme="demo-registry-contrast" (registered in App startup)',
          icon: 'settings',
          actions: [
            zoneAction('registry-theme-check', 'Registry Theme Check', 'check', 'pinned', 'primary'),
          ],
        },
        content: createTableContent(eightUsersData, [
          { key: 'name', label: 'Name', type: 'text' },
          { key: 'department', label: 'Department', type: 'text' },
          statusField,
        ], {
          table: traditionalTableConfig,
          pagination: { pageSize: 4 },
        }),
        footer: {
          subtitle: 'Expected: visible registry theme baseline from named config.theme, independent of provider pair forcing in 48/50.',
        },
      },
    },
  },

  // ─── Lifecycle Hook Validation ─────────────────────────────────────────────

  {
    id: 'progressive-57-lifecycle-prerender-probe',
    title: 'Progressive 57 - Lifecycle: preRender Probe',
    description:
      'Validates preRender contract with local proof controls. Use Mount/Refresh on this card and confirm preRender status flips to Hook fired with a payload summary.',
    data: eightUsersData,
    config: {
      zones: {
        header: {
          title: 'preRender Validation',
          subtitle: 'Use local Mount/Refresh and confirm preRender status on this card.',
          icon: 'settings',
        },
        content: createTableContent(eightUsersData, [
          { key: 'name', label: 'Name', type: 'text' },
          { key: 'role', label: 'Role', type: 'text' },
          statusField,
        ], {
          table: traditionalTableConfig,
          pagination: { pageSize: 4 },
        }),
        footer: {
          subtitle: 'Expected: preRender fires and payload summary shows passthrough behavior.',
        },
      },
    },
  },

  {
    id: 'progressive-58-lifecycle-postrender-wrapper',
    title: 'Progressive 58 - Lifecycle: postRender Wrapper',
    description:
      'Validates postRender element override path with local wrapper controls. Toggle wrapper/default path and verify status + wrapper proof on this card.',
    data: eightUsersData,
    config: {
      zones: {
        header: {
          title: 'postRender Validation',
          subtitle: 'Toggle local wrapper path to compare default passthrough vs wrapped render.',
          icon: 'settings',
        },
        content: createGridContent(eightUsersData, [
          { key: 'name', label: 'Name', type: 'text' },
          { key: 'department', label: 'Department', type: 'text' },
          statusField,
        ], {
          grid: { minItemWidth: '240px', gap: '12px' },
        }),
        footer: {
          subtitle: 'Expected: postRender status and payload update, plus visible wrapper when custom path is active.',
        },
      },
    },
  },

  {
    id: 'progressive-59-lifecycle-onitemclick-carousel',
    title: 'Progressive 59 - Lifecycle: onItemClick (Carousel)',
    description:
      'Validates onItemClick metadata for carousel interactions with local controls. Arm capture here, then click indicator + card and compare source fields.',
    data: tenUsersData,
    config: {
      zones: {
        header: {
          title: 'onItemClick Carousel Validation',
          subtitle: 'Arm capture on this card, then click indicator and card to compare source metadata.',
          icon: 'carousel',
        },
        content: createCarouselContent(tenUsersData, [
          { key: 'name', label: 'Name', type: 'text' },
          { key: 'department', label: 'Department', type: 'text' },
          statusField,
        ], {
          carousel: { showIndicators: true, showArrows: true, infinite: false, itemWidth: 260 },
        }),
        footer: {
          subtitle: 'Expected: local payload summary includes mode=carousel and source=indicator/card.',
        },
      },
    },
  },

  {
    id: 'progressive-60-lifecycle-onitemclick-board',
    title: 'Progressive 60 - Lifecycle: onItemClick (Board)',
    description:
      'Validates onItemClick metadata for board cards with local controls. Arm capture then click a board card to inspect board context payload.',
    data: lifecycleBoardData,
    config: {
      zones: {
        header: {
          title: 'onItemClick Board Validation',
          subtitle: 'Arm local capture and click a board card to inspect mode/column metadata.',
          icon: 'table',
        },
        content: createBoardContent(lifecycleBoardData, [
          { key: 'name', label: 'Name', type: 'text' },
          { key: 'department', label: 'Department', type: 'text' },
        ], {
          board: {
            columns: {
              field: 'status',
              items: [
                { id: 'todo', label: 'To Do', value: 'todo', color: '#f59e0b' },
                { id: 'done', label: 'Done', value: 'done', color: '#10b981' },
              ],
            },
          },
        }),
        footer: {
          subtitle: 'Expected: local payload summary includes mode=board and columnId.',
        },
      },
    },
  },

  {
    id: 'progressive-61-lifecycle-onmodechange-responsive',
    title: 'Progressive 61 - Lifecycle: onModeChange (Responsive Fallback)',
    description:
      'Validates onModeChange emission on resolved mode transitions with local width controls. Use Desktop/Mobile buttons on this card to trigger deterministic changes.',
    data: tenUsersData,
    config: {
      zones: {
        header: {
          title: 'onModeChange Validation',
          subtitle: 'Use local Desktop/Mobile width buttons to trigger effective mode transitions.',
          icon: 'responsive',
        },
        content: {
          mode: 'table',
          item: {
            fields: [
              { key: 'name', label: 'Name' },
              { key: 'department', label: 'Department' },
              { key: 'status', label: 'Status', renderAs: 'badge' },
            ],
            layout: { type: 'auto' },
          },
          responsive: {
            breakpoints: {
              mobile: { mode: 'table' },
            },
          },
        },
        footer: {
          subtitle: 'Expected: onModeChange updates local status and shows previousMode/nextMode in payload summary.',
        },
      },
    },
  },

  {
    id: 'progressive-62-lifecycle-ondragdrop-board',
    title: 'Progressive 62 - Lifecycle: onDragDrop (Board)',
    description:
      'Validates onDragDrop payload fields with local drag controls. Arm capture, drag card across columns, and inspect from/to summary on this card.',
    data: lifecycleBoardData,
    config: {
      zones: {
        header: {
          title: 'onDragDrop Validation',
          subtitle: 'Arm local drag capture, then drag cards between To Do and Done columns.',
          icon: 'table',
        },
        content: createBoardContent(lifecycleBoardData, [
          { key: 'name', label: 'Name', type: 'text' },
          { key: 'department', label: 'Department', type: 'text' },
        ], {
          board: {
            columns: {
              field: 'status',
              items: [
                { id: 'todo', label: 'To Do', value: 'todo', color: '#f59e0b' },
                { id: 'done', label: 'Done', value: 'done', color: '#10b981' },
              ],
            },
            dragEnabled: true,
          },
        }),
        footer: {
          subtitle: 'Expected: local payload summary includes from/to and location indexes.',
        },
      },
    },
  },

  {
    id: 'progressive-63-lifecycle-reregister-last-write-wins',
    title: 'Progressive 63 - Lifecycle: Hook Re-registration (Last Write Wins)',
    description:
      'Validates custom hook re-registration with local controls. Register Default vs Custom on this card, then click indicator/card to verify last-write-wins payload behavior.',
    data: tenUsersData,
    config: {
      zones: {
        header: {
          title: 'Hook Re-registration Validation',
          subtitle: 'Use local Register Default/Custom controls and verify custom payload marker.',
          icon: 'settings',
        },
        content: createCarouselContent(tenUsersData, [
          { key: 'name', label: 'Name', type: 'text' },
          { key: 'role', label: 'Role', type: 'text' },
          statusField,
        ], {
          carousel: { showIndicators: true, showArrows: true, infinite: false, itemWidth: 260 },
        }),
        footer: {
          subtitle: 'Expected: local payload summary shows customHook=true only when custom registration is active.',
        },
      },
    },
  },

  {
    id: 'progressive-63a-config-driven-retry-error-state',
    title: 'Progressive 63A - Config-Driven Retry (errorState)',
    description:
      'Demonstrates config-driven retry behavior in content.errorState. This uses status="error", a message function, and a retry callback wired to the demo action sink.',
    data: eightUsersData,
    config: {
      zones: {
        header: {
          title: 'Config-Driven Retry Validation',
          subtitle: 'status="error" + errorState.message fn + retry callback (demo action modal)',
          icon: 'warning',
        },
        content: createTableContent(eightUsersData, [
          { key: 'name', label: 'Name', type: 'text' },
          { key: 'department', label: 'Department', type: 'text' },
          statusField,
        ], {
          table: traditionalTableConfig,
          status: 'error' as const,
          error: { message: 'Failed to load grouped records from the API.' },
          errorState: {
            enabled: true,
            message: (err: unknown) => `Retry path demo: ${(err as Error)?.message ?? 'Unknown fetch error'}`,
            retry: {
              label: 'Retry Fetch',
              onRetry: () =>
                fireDemoAction({
                  actionId: 'config-retry-fetch',
                  actionLabel: 'Retry Fetch',
                  source: 'action.onAction',
                  zone: 'content',
                  data: eightUsersData as Record<string, unknown>[],
                }),
            },
            severity: 'warning' as const,
          },
        }),
        footer: {
          subtitle: 'Expected: clicking Retry Fetch opens the demo action modal, confirming the callback fired.',
        },
      },
    },
  },

  {
    id: 'progressive-64-temporal-contracts-table',
    title: 'Progressive 64 - Temporal Contracts: Mixed Table',
    description:
      'Combines date, time, datetime, timestamp, and duration fields in one sortable table. Every temporal field declares explicit parse/unit contracts.',
    data: temporalOperationsData,
    config: {
      zones: {
        header: {
          title: 'Temporal Contracts — Mixed Table',
          subtitle: 'date + time + datetime + timestamp + timestamp(both) + duration (clock + humanized)',
          icon: 'table',
        },
        content: createTableContent(temporalOperationsData, [
          { key: 'operation', label: 'Operation', type: 'text', sortable: true, width: '180px' },
          {
            key: 'settlementDate',
            label: 'Date',
            type: 'date',
            renderAs: 'date',
            renderAsOptions: { parseMode: 'iso-date', locale: 'en-US', timezone: 'local', formatPreset: 'short' },
            sortable: true,
            width: '120px',
          },
          {
            key: 'checkpointTime',
            label: 'Time',
            type: 'time',
            renderAs: 'time',
            renderAsOptions: { parseMode: 'iso-time', locale: 'en-US', timezone: 'utc', showSeconds: true, hour12: false },
            sortable: true,
            width: '110px',
          },
          {
            key: 'postedAt',
            label: 'Datetime',
            type: 'datetime',
            renderAs: 'datetime',
            renderAsOptions: { parseMode: 'iso-datetime', locale: 'en-US', timezone: 'utc', formatPreset: 'short' },
            sortable: true,
            width: '170px',
          },
          {
            key: 'updatedAtEpochSec',
            label: 'Timestamp',
            type: 'timestamp',
            renderAs: 'timestamp',
            renderAsOptions: { parseMode: 'epoch-sec', locale: 'en-US', timezone: 'utc', formatPreset: 'short' },
            sortable: true,
            width: '170px',
          },
          {
            key: 'ingestedAtEpochMs',
            label: 'Timestamp (Abs + Relative)',
            type: 'timestamp',
            renderAs: 'timestamp',
            renderAsOptions: {
              parseMode: 'epoch-ms',
              locale: 'en-US',
              timezone: 'utc',
              formatPreset: 'short',
              relativeTime: true,
              relativeDisplay: 'both',
            },
            sortable: true,
            width: '220px',
          },
          {
            key: 'processingSec',
            label: 'Processing',
            type: 'duration',
            renderAs: 'duration',
            renderAsOptions: { unit: 'sec', format: 'clock' },
            sortable: true,
            width: '120px',
          },
          {
            key: 'queueLagMs',
            label: 'Queue Lag',
            type: 'duration',
            renderAs: 'duration',
            renderAsOptions: { unit: 'ms', format: 'humanized', precision: 2, showSign: false },
            sortable: true,
            width: '150px',
          },
        ], {
          table: traditionalTableConfig,
          sorting: [{ fieldKey: 'updatedAtEpochSec', direction: 'desc' }],
        }),
        footer: {
          subtitle: 'Sorting is contract-aware: parseMode drives chronology and duration.unit drives numeric duration ordering.',
        },
      },
    },
  },

  {
    id: 'progressive-65-temporal-render-options-matrix',
    title: 'Progressive 65 - Temporal Render Options Matrix',
    description:
      'Showcases temporal render variants: relative-only vs both absolute+relative, formatted time with seconds, and duration decimal/humanized output.',
    data: temporalOperationsData,
    config: {
      zones: {
        header: {
          title: 'Temporal Render Options Matrix',
          subtitle: 'relativeTime (relative vs both) + showSeconds/hour12 + duration decimal/humanized',
          icon: 'grid',
        },
        content: createGridContent(temporalOperationsData, [
          { key: 'operation', label: 'Operation', type: 'text', showLabel: false },
          {
            key: 'postedAt',
            label: 'Posted (Relative Only)',
            type: 'datetime',
            renderAs: 'datetime',
            renderAsOptions: { parseMode: 'iso-datetime', locale: 'en-US', timezone: 'utc', relativeTime: true, fallbackText: 'N/A' },
          },
          {
            key: 'updatedAtEpochSec',
            label: 'Updated (Absolute + Relative)',
            type: 'timestamp',
            renderAs: 'timestamp',
            renderAsOptions: {
              parseMode: 'epoch-sec',
              locale: 'en-US',
              timezone: 'utc',
              formatPreset: 'short',
              relativeTime: true,
              relativeDisplay: 'both',
              fallbackText: 'N/A',
            },
          },
          {
            key: 'ingestedAtEpochMs',
            label: 'Ingested (Absolute + Relative)',
            type: 'timestamp',
            renderAs: 'timestamp',
            renderAsOptions: {
              parseMode: 'epoch-ms',
              locale: 'en-US',
              timezone: 'utc',
              formatPreset: 'short',
              relativeTime: true,
              relativeDisplay: 'both',
              fallbackText: 'N/A',
            },
          },
          {
            key: 'checkpointTime',
            label: 'Checkpoint (12h)',
            type: 'time',
            renderAs: 'time',
            renderAsOptions: { parseMode: 'iso-time', locale: 'en-US', timezone: 'utc', showSeconds: true, hour12: true },
          },
          {
            key: 'reconciliationMin',
            label: 'Reconciliation (Decimal)',
            type: 'duration',
            renderAs: 'duration',
            renderAsOptions: { unit: 'min', format: 'decimal', precision: 2, showSign: false },
          },
          {
            key: 'processingSec',
            label: 'Processing (Humanized)',
            type: 'duration',
            renderAs: 'duration',
            renderAsOptions: { unit: 'sec', format: 'humanized', precision: 2, showSign: false },
          },
        ], {
          grid: { minItemWidth: '280px', gap: '14px', maxColumns: 2 },
          item: {
            cardOptions: {
              border: true,
              borderColor: 'var(--app-border)',
              borderRadius: '8px',
              backgroundColor: 'var(--app-bg-primary)',
              boxShadow: '0 6px 16px rgba(15, 23, 42, 0.08)',
            },
          },
        }),
        footer: {
          subtitle: 'Relative mode supports both layouts: relative-only or absolute timestamp with smaller relative text below.',
        },
      },
    },
  },
  // ─── Progressive 66 — Reference Field: Static Resolution ───────────────────
  {
    id: 'progressive-66-reference-field-static',
    title: 'Progressive 66 — Reference Field (Static Resolution)',
    description:
      'type: "reference" resolves a raw foreign key against a local options array and displays the matched label. relatedEntity declares the entity type the FK points to (e.g. "user", "project").',
    data: [
      { id: 't1', name: 'API redesign',    assignee: 'user-2', project: 'proj-1', reviewer: 'user-1' },
      { id: 't2', name: 'Onboarding flow', assignee: 'user-3', project: 'proj-2', reviewer: 'user-2' },
      { id: 't3', name: 'Billing export',  assignee: 'user-1', project: 'proj-1', reviewer: null     },
    ],
    config: {
      zones: {
        content: {
          mode: 'table',
          modeConfig: { table: { showHeader: true, hover: true } },
          item: {
            fields: [
              { key: 'name',     label: 'Task',     type: 'text' },
              {
                key: 'assignee',
                label: 'Assignee',
                type: 'reference',
                relatedEntity: 'user',
                options: [
                  { value: 'user-1', label: 'Aurora Chen' },
                  { value: 'user-2', label: 'Mateo Silva' },
                  { value: 'user-3', label: 'Priya Nair'  },
                ],
              },
              {
                key: 'project',
                label: 'Project',
                type: 'reference',
                relatedEntity: 'project',
                options: [
                  { value: 'proj-1', label: 'Platform v2' },
                  { value: 'proj-2', label: 'Growth'      },
                ],
              },
              {
                key: 'reviewer',
                label: 'Reviewer',
                type: 'reference',
                relatedEntity: 'user',
                options: [
                  { value: 'user-1', label: 'Aurora Chen' },
                  { value: 'user-2', label: 'Mateo Silva' },
                  { value: 'user-3', label: 'Priya Nair'  },
                ],
                condition: (entity) => entity.reviewer !== null && entity.reviewer !== undefined,
              },
            ],
            layout: { type: 'auto' },
          },
        },
      },
    },
  },
  // ─── Progressive 67 — Reference Field: Clickable + reference-click Event ────
  {
    id: 'progressive-67-reference-field-clickable',
    title: 'Progressive 67 — Reference Field (Clickable + reference-click Event)',
    description:
      'clickable: true renders the resolved label as an interactive element. Clicking fires a reference-click interaction event with fieldKey, fieldValue, fieldLabel, and relatedEntity populated. The host application handles navigation or drawer-open logic.',
    data: [
      { id: 't1', name: 'API redesign',    assignee: 'user-2', project: 'proj-1' },
      { id: 't2', name: 'Onboarding flow', assignee: 'user-3', project: 'proj-2' },
      { id: 't3', name: 'Billing export',  assignee: 'user-1', project: 'proj-1' },
    ],
    config: {
      zones: {
        content: {
          mode: 'table',
          modeConfig: { table: { showHeader: true, hover: true } },
          item: {
            fields: [
              { key: 'name', label: 'Task', type: 'text' },
              {
                key: 'assignee',
                label: 'Assignee',
                type: 'reference',
                relatedEntity: 'user',
                clickable: true,
                options: [
                  { value: 'user-1', label: 'Aurora Chen' },
                  { value: 'user-2', label: 'Mateo Silva' },
                  { value: 'user-3', label: 'Priya Nair'  },
                ],
              },
              {
                key: 'project',
                label: 'Project',
                type: 'reference',
                relatedEntity: 'project',
                clickable: true,
                options: [
                  { value: 'proj-1', label: 'Platform v2' },
                  { value: 'proj-2', label: 'Growth'      },
                ],
              },
            ],
            layout: { type: 'auto' },
          },
        },
      },
    },
  },
  // ─── Progressive 68 — ContentConfig.enabled Toggle ─────────────────────────
  {
    id: 'progressive-68-content-enabled-toggle',
    title: 'Progressive 68 — content.enabled (Interactive Toggle)',
    description:
      'Demonstrates ContentConfig.enabled. Use the checkbox above this example to switch content.enabled between true and false at runtime.',
    data: [
      { id: 'ce-1', name: 'Ava Brooks', team: 'Platform', status: 'active' },
      { id: 'ce-2', name: 'Noah Patel', team: 'Revenue', status: 'pending' },
      { id: 'ce-3', name: 'Mia Johnson', team: 'Operations', status: 'inactive' },
    ],
    config: {
      zones: {
        header: {
          title: 'content.enabled Demo',
          subtitle: 'Toggle the content zone on and off',
          icon: 'table',
        },
        content: {
          enabled: true,
          mode: 'table',
          modeConfig: {
            table: { type: 'traditional', showHeader: true, alternatingRows: true },
          },
          item: {
            fields: [
              { key: 'name', label: 'Name', type: 'text' },
              { key: 'team', label: 'Team', type: 'text' },
              {
                key: 'status',
                label: 'Status',
                type: 'text',
                renderAs: 'badge',
                renderAsOptions: {
                  colorMap: {
                    active: '#198754',
                    pending: '#ffc107',
                    inactive: '#dc3545',
                  },
                },
              },
            ],
            layout: { type: 'auto' },
          },
        },
      },
    },
  },
];

export const progressiveExamplesWithInteractionSink: ProgressiveExample[] = progressiveExamples.map((example) => ({
  ...example,
  config: {
    ...example.config,
    interactions: {
      onEvent: emitDemoInteraction,
    },
  },
}));

export default progressiveExamplesWithInteractionSink;
