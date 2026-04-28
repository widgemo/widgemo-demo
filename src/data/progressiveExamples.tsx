import { teaserSampleData } from './sampleData';
import type { Entity, ActionContext, WidgemoConfig } from '@widgemo/widgemo-core';
import { fireDemoAction } from '../utils/demoActionBus';

// Data slices used across progressive examples
const eightUsersData = teaserSampleData.slice(0, 8) as Entity[];
const tenUsersData = teaserSampleData.slice(0, 10) as Entity[];
const twentyUsersData = teaserSampleData.slice(0, 20) as Entity[];

// ─── Progressive Examples ─────────────────────────────────────────────────────
// Each example builds on the previous one, introducing one or two new features
// so the progression is educational: start from zero config and grow to full.
// ─────────────────────────────────────────────────────────────────────────────

export const progressiveExamples: Array<{
  id: string;
  title: string;
  description: string;
  data: Entity[];
  config: WidgemoConfig;
}> = [
  // ── Phase 1 — Table Basics ────────────────────────────────────────────────

  {
    id: 'progressive-1-zero-config',
    title: 'Progressive 1 — Zero Config',
    description: 'Raw Widgemo with the absolute minimum: just { id, zones.content.mode }. No fields, no header, no footer, no actions. Widgemo auto-discovers all entity keys and renders them as plain text columns.',
    data: eightUsersData,
    config: {
      id: 'progressive-1',
      zones: {
        content: {
          mode: 'table',
        },
      },
    },
  },

  {
    id: 'progressive-2-named-fields',
    title: 'Progressive 2 — Named Fields',
    description: 'Adds zones.content.item.fields to define columns explicitly. Each field has a key (entity property), type (text/email/date/number), and label shown as the column header. Without this, Widgemo auto-discovers keys in insertion order.',
    data: eightUsersData,
    config: {
      id: 'progressive-2',
      zones: {
        content: {
          mode: 'table',
          item: {
            fields: [
              { key: 'name', label: 'Name', type: 'text' },
              { key: 'email', label: 'Email', type: 'email' },
              { key: 'role', label: 'Role', type: 'text' },
              { key: 'department', label: 'Department', type: 'text' },
              { key: 'lastLogin', label: 'Last Login', type: 'date' },
              { key: 'status', label: 'Status', type: 'text' },
            ],
          },
        },
      },
    },
  },

  {
    id: 'progressive-3-sortable',
    title: 'Progressive 3 — Sortable Columns + Table Layout',
    description: 'Adds sortable: true on name, department, and lastLogin. Adds zones.content.layout.table.type: "traditional" for a classic bordered table. Width hints applied to constrain certain columns.',
    data: tenUsersData,
    config: {
      id: 'progressive-3',
      zones: {
        content: {
          mode: 'table',
          layout: { table: { type: 'traditional' } },
          item: {
            fields: [
              { key: 'name', label: 'Name', type: 'text', sortable: true, width: '160px' },
              { key: 'email', label: 'Email', type: 'email' },
              { key: 'role', label: 'Role', type: 'text' },
              { key: 'department', label: 'Department', type: 'text', sortable: true, width: '140px' },
              { key: 'lastLogin', label: 'Last Login', type: 'date', sortable: true, width: '130px' },
              { key: 'status', label: 'Status', type: 'text' },
            ],
          },
        },
      },
    },
  },

  {
    id: 'progressive-4-pagination-search',
    title: 'Progressive 4 — Pagination + Search',
    description: 'Adds zones.content.pagination (pageSize: 5) to split 20 rows into pages, and zones.content.search with enabled, placeholder, and fields restriction to name/email/department. Page resets to 1 on each new query.',
    data: twentyUsersData,
    config: {
      id: 'progressive-4',
      zones: {
        content: {
          mode: 'table',
          pagination: { pageSize: 5 },
          search: {
            enabled: true,
            placeholder: 'Search users…',
            fields: ['name', 'email', 'department'],
          },
          item: {
            fields: [
              { key: 'name', label: 'Name', type: 'text', sortable: true },
              { key: 'email', label: 'Email', type: 'email' },
              { key: 'role', label: 'Role', type: 'text' },
              { key: 'department', label: 'Department', type: 'text', sortable: true },
              { key: 'lastLogin', label: 'Last Login', type: 'date', sortable: true },
              { key: 'status', label: 'Status', type: 'text' },
            ],
          },
        },
      },
    },
  },

  // ── Phase 2 — Rich Field Display ─────────────────────────────────────────

  {
    id: 'progressive-5-badges-currency',
    title: 'Progressive 5 — Badges + Currency',
    description: 'Adds renderAs: "badge" on status with a colorMap: { active: "success", pending: "warning", inactive: "danger" }, and renderAs: "currency" on amount (salary) with renderAsOptions: { currency: "USD", locale: "en-US", compact: false }.',
    data: tenUsersData,
    config: {
      id: 'progressive-5',
      zones: {
        content: {
          mode: 'table',
          layout: { table: { type: 'traditional' } },
          item: {
            fields: [
              { key: 'name', label: 'Name', type: 'text', sortable: true },
              { key: 'email', label: 'Email', type: 'email' },
              { key: 'role', label: 'Role', type: 'text' },
              { key: 'department', label: 'Department', type: 'text' },
              {
                key: 'status',
                label: 'Status',
                type: 'text',
                renderAs: 'badge',
                renderAsOptions: {
                  colorMap: {
                    active: 'success',
                    pending: 'warning',
                    inactive: 'danger',
                  },
                },
              },
              {
                key: 'amount',
                label: 'Salary',
                type: 'number',
                renderAs: 'currency',
                renderAsOptions: { currency: 'USD', locale: 'en-US', compact: false },
              },
            ],
          },
        },
      },
    },
  },

  {
    id: 'progressive-6-progress-rating-avatar',
    title: 'Progressive 6 — Progress Bar + Star Rating + Avatar',
    description: 'Adds renderAs: "progress" on progress with renderAsOptions: { color: "#4caf50", showPercentage: true }; renderAs: "rating" on rating with renderAsOptions: { max: 5, color: "#f59e0b" }; and type: "image" with imageOptions: { shape: "circle", width: 36, height: 36 } on src.',
    data: eightUsersData,
    config: {
      id: 'progressive-6',
      zones: {
        content: {
          mode: 'table',
          layout: { table: { type: 'traditional' } },
          item: {
            fields: [
              {
                key: 'src',
                label: 'Avatar',
                type: 'image',
                imageOptions: { shape: 'circle', width: 36, height: 36 },
              },
              { key: 'name', label: 'Name', type: 'text', sortable: true },
              { key: 'department', label: 'Department', type: 'text' },
              {
                key: 'status',
                label: 'Status',
                type: 'text',
                renderAs: 'badge',
                renderAsOptions: {
                  colorMap: {
                    active: 'success',
                    pending: 'warning',
                    inactive: 'danger',
                  },
                },
              },
              {
                key: 'progress',
                label: 'Progress',
                type: 'number',
                renderAs: 'progress',
                renderAsOptions: { color: '#4caf50', showPercentage: true },
              },
              {
                key: 'rating',
                label: 'Rating',
                type: 'number',
                renderAs: 'rating',
                renderAsOptions: { max: 5, color: '#f59e0b' },
              },
            ],
          },
        },
      },
    },
  },

  {
    id: 'progressive-7-grouping',
    title: 'Progressive 7 — Grouping + Aggregates',
    description: 'Adds zones.content.groupings with fieldKey: "department" and initiallyCollapsed: false so groups expand by default. Aggregates count name, avg rating, and sum amount per group. Sortable columns and status badges from previous examples are retained.',
    data: twentyUsersData,
    config: {
      id: 'progressive-7',
      zones: {
        content: {
          mode: 'table',
          layout: { table: { type: 'traditional' } },
          groupings: [
            {
              fieldKey: 'department',
              initiallyCollapsed: false,
              aggregates: [
                { type: 'count', fieldKey: 'name', label: 'Members' },
                { type: 'avg', fieldKey: 'rating', label: 'Avg Rating' },
                { type: 'sum', fieldKey: 'amount', label: 'Total Salary' },
              ],
            },
          ],
          item: {
            fields: [
              { key: 'name', label: 'Name', type: 'text', sortable: true },
              { key: 'role', label: 'Role', type: 'text' },
              {
                key: 'status',
                label: 'Status',
                type: 'text',
                renderAs: 'badge',
                renderAsOptions: {
                  colorMap: {
                    active: 'success',
                    pending: 'warning',
                    inactive: 'danger',
                  },
                },
              },
              {
                key: 'amount',
                label: 'Salary',
                type: 'number',
                renderAs: 'currency',
                renderAsOptions: { currency: 'USD', locale: 'en-US', compact: false },
              },
              {
                key: 'rating',
                label: 'Rating',
                type: 'number',
                renderAs: 'rating',
                renderAsOptions: { max: 5, color: '#f59e0b' },
              },
            ],
          },
        },
      },
    },
  },

  // ── Phase 3 — Zones & Actions ─────────────────────────────────────────────

  {
    id: 'progressive-8-header-zone',
    title: 'Progressive 8 — Header Zone',
    description: 'Adds zones.header with title: "Team Directory", subtitle: "All active employees", and icon: "users". The header zone provides context and branding. Rich fields (badges + currency) from Example 5 are retained.',
    data: tenUsersData,
    config: {
      id: 'progressive-8',
      zones: {
        header: {
          title: 'Team Directory',
          subtitle: 'All active employees',
          icon: 'users',
        },
        content: {
          mode: 'table',
          layout: { table: { type: 'traditional' } },
          item: {
            fields: [
              { key: 'name', label: 'Name', type: 'text', sortable: true },
              { key: 'email', label: 'Email', type: 'email' },
              { key: 'role', label: 'Role', type: 'text' },
              { key: 'department', label: 'Department', type: 'text', sortable: true },
              {
                key: 'status',
                label: 'Status',
                type: 'text',
                renderAs: 'badge',
                renderAsOptions: {
                  colorMap: {
                    active: 'success',
                    pending: 'warning',
                    inactive: 'danger',
                  },
                },
              },
              {
                key: 'amount',
                label: 'Salary',
                type: 'number',
                renderAs: 'currency',
                renderAsOptions: { currency: 'USD', locale: 'en-US', compact: false },
              },
            ],
          },
        },
      },
    },
  },

  {
    id: 'progressive-9-zone-actions',
    title: 'Progressive 9 — Zone Actions',
    description: 'Adds zones.header.actions with an "Add User" pinned primary action and an "Export" pinned secondary action. Each action uses onAction: (ctx: ActionContext) => fireDemoAction(...) — no onClick, no handler.',
    data: tenUsersData,
    config: {
      id: 'progressive-9',
      zones: {
        header: {
          title: 'Team Directory',
          subtitle: 'All active employees',
          icon: 'users',
          actions: [
            {
              id: 'add-user',
              label: 'Add User',
              icon: 'add',
              placement: 'pinned',
              variant: 'primary',
              onAction: (ctx: ActionContext) =>
                fireDemoAction({
                  actionId: 'add-user',
                  actionLabel: 'Add User',
                  source: 'onAction',
                  data: ctx.data as Record<string, unknown>[],
                  zone: ctx.zone,
                }),
            },
            {
              id: 'export',
              label: 'Export',
              icon: 'download',
              placement: 'pinned',
              variant: 'secondary',
              onAction: (ctx: ActionContext) =>
                fireDemoAction({
                  actionId: 'export',
                  actionLabel: 'Export',
                  source: 'onAction',
                  data: ctx.data as Record<string, unknown>[],
                  zone: ctx.zone,
                }),
            },
          ],
        },
        content: {
          mode: 'table',
          layout: { table: { type: 'traditional' } },
          item: {
            fields: [
              { key: 'name', label: 'Name', type: 'text', sortable: true },
              { key: 'email', label: 'Email', type: 'email' },
              { key: 'role', label: 'Role', type: 'text' },
              { key: 'department', label: 'Department', type: 'text', sortable: true },
              {
                key: 'status',
                label: 'Status',
                type: 'text',
                renderAs: 'badge',
                renderAsOptions: {
                  colorMap: {
                    active: 'success',
                    pending: 'warning',
                    inactive: 'danger',
                  },
                },
              },
              {
                key: 'amount',
                label: 'Salary',
                type: 'number',
                renderAs: 'currency',
                renderAsOptions: { currency: 'USD', locale: 'en-US', compact: false },
              },
            ],
          },
        },
      },
    },
  },

  {
    id: 'progressive-10-item-actions',
    title: 'Progressive 10 — Per-Item Actions',
    description: 'Adds zones.content.itemActions with three placements: "pinned" (Edit — always visible), "onHover" (View Profile — appears on hover), and "menu" (Archive — tucked in overflow menu). Each uses onAction with fireDemoAction.',
    data: tenUsersData,
    config: {
      id: 'progressive-10',
      zones: {
        header: {
          title: 'Team Directory',
          subtitle: 'All active employees',
          icon: 'users',
          actions: [
            {
              id: 'add-user',
              label: 'Add User',
              icon: 'add',
              placement: 'pinned',
              variant: 'primary',
              onAction: (ctx: ActionContext) =>
                fireDemoAction({
                  actionId: 'add-user',
                  actionLabel: 'Add User',
                  source: 'onAction',
                  data: ctx.data as Record<string, unknown>[],
                  zone: ctx.zone,
                }),
            },
          ],
        },
        content: {
          mode: 'table',
          layout: { table: { type: 'traditional' } },
          item: {
            fields: [
              { key: 'name', label: 'Name', type: 'text', sortable: true },
              { key: 'email', label: 'Email', type: 'email' },
              { key: 'role', label: 'Role', type: 'text' },
              { key: 'department', label: 'Department', type: 'text' },
              {
                key: 'status',
                label: 'Status',
                type: 'text',
                renderAs: 'badge',
                renderAsOptions: {
                  colorMap: {
                    active: 'success',
                    pending: 'warning',
                    inactive: 'danger',
                  },
                },
              },
            ],
          },
          itemActions: [
            {
              id: 'edit-user',
              label: 'Edit',
              icon: 'edit',
              placement: 'pinned',
              variant: 'secondary',
              onAction: (ctx: ActionContext) =>
                fireDemoAction({
                  actionId: 'edit-user',
                  actionLabel: 'Edit',
                  source: 'onAction',
                  entity: ctx.entity as Record<string, unknown>,
                }),
            },
            {
              id: 'view-profile',
              label: 'View Profile',
              icon: 'view',
              placement: 'onHover',
              onAction: (ctx: ActionContext) =>
                fireDemoAction({
                  actionId: 'view-profile',
                  actionLabel: 'View Profile',
                  source: 'onAction',
                  entity: ctx.entity as Record<string, unknown>,
                }),
            },
            {
              id: 'archive-user',
              label: 'Archive',
              icon: 'archive',
              placement: 'menu',
              onAction: (ctx: ActionContext) =>
                fireDemoAction({
                  actionId: 'archive-user',
                  actionLabel: 'Archive',
                  source: 'onAction',
                  entity: ctx.entity as Record<string, unknown>,
                }),
            },
          ],
        },
      },
    },
  },

  {
    id: 'progressive-11-footer-zone',
    title: 'Progressive 11 — Footer Zone',
    description: 'Adds zones.footer with a subtitle showing record count context. The footer zone is a lightweight way to add metadata or disclaimers below the content area without cluttering the header.',
    data: tenUsersData,
    config: {
      id: 'progressive-11',
      zones: {
        header: {
          title: 'Team Directory',
          subtitle: 'All active employees',
          icon: 'users',
          actions: [
            {
              id: 'add-user',
              label: 'Add User',
              icon: 'add',
              placement: 'pinned',
              variant: 'primary',
              onAction: (ctx: ActionContext) =>
                fireDemoAction({
                  actionId: 'add-user',
                  actionLabel: 'Add User',
                  source: 'onAction',
                  data: ctx.data as Record<string, unknown>[],
                  zone: ctx.zone,
                }),
            },
          ],
        },
        content: {
          mode: 'table',
          layout: { table: { type: 'traditional' } },
          item: {
            fields: [
              { key: 'name', label: 'Name', type: 'text', sortable: true },
              { key: 'email', label: 'Email', type: 'email' },
              { key: 'role', label: 'Role', type: 'text' },
              { key: 'department', label: 'Department', type: 'text' },
              {
                key: 'status',
                label: 'Status',
                type: 'text',
                renderAs: 'badge',
                renderAsOptions: {
                  colorMap: {
                    active: 'success',
                    pending: 'warning',
                    inactive: 'danger',
                  },
                },
              },
            ],
          },
          itemActions: [
            {
              id: 'edit-user',
              label: 'Edit',
              icon: 'edit',
              placement: 'pinned',
              variant: 'secondary',
              onAction: (ctx: ActionContext) =>
                fireDemoAction({
                  actionId: 'edit-user',
                  actionLabel: 'Edit',
                  source: 'onAction',
                  entity: ctx.entity as Record<string, unknown>,
                }),
            },
            {
              id: 'delete-user',
              label: 'Delete',
              icon: 'delete',
              placement: 'menu',
              variant: 'danger',
              onAction: (ctx: ActionContext) =>
                fireDemoAction({
                  actionId: 'delete-user',
                  actionLabel: 'Delete',
                  source: 'onAction',
                  entity: ctx.entity as Record<string, unknown>,
                }),
            },
          ],
        },
        footer: {
          subtitle: '10 employees · Last synced just now',
        },
      },
    },
  },

  {
    id: 'progressive-12-row-click',
    title: 'Progressive 12 — Row Click Interaction',
    description: 'Adds zones.content.interaction.onRowClick to fire fireDemoAction when the user clicks any row. This is distinct from per-item actions — it covers the full row area. Compatible with sortable columns and badge rendering.',
    data: tenUsersData,
    config: {
      id: 'progressive-12',
      zones: {
        header: {
          title: 'Clickable Rows',
          subtitle: 'Click any row to see the entity payload',
          icon: 'users',
        },
        content: {
          mode: 'table',
          layout: { table: { type: 'traditional' } },
          item: {
            fields: [
              { key: 'name', label: 'Name', type: 'text', sortable: true },
              { key: 'email', label: 'Email', type: 'email' },
              { key: 'role', label: 'Role', type: 'text' },
              { key: 'department', label: 'Department', type: 'text', sortable: true },
              {
                key: 'status',
                label: 'Status',
                type: 'text',
                renderAs: 'badge',
                renderAsOptions: {
                  colorMap: {
                    active: 'success',
                    pending: 'warning',
                    inactive: 'danger',
                  },
                },
              },
            ],
          },
          interaction: {
            onRowClick: (item: unknown) =>
              fireDemoAction({
                actionId: 'row-click',
                actionLabel: 'Row Click',
                source: 'onClick',
                entity: item as Record<string, unknown>,
              }),
          },
        },
        footer: {
          subtitle: 'Click any row · email column uses type="email" (plain text, participates in row-click)',
        },
      },
    },
  },

  {
    id: 'progressive-13-sorting-filtering',
    title: 'Progressive 13 — Sorting + Filtering',
    description: 'Adds zones.content.sorting (initial sort: name asc) and zones.content.filtering (static filter: status = "active" only). Filtering runs before pagination; sorting runs within the filtered result set.',
    data: twentyUsersData,
    config: {
      id: 'progressive-13',
      zones: {
        header: {
          title: 'Active Users Only',
          subtitle: 'Static filter: status=active · sorted by name asc',
          icon: 'users',
        },
        content: {
          mode: 'table',
          layout: { table: { type: 'traditional' } },
          filtering: [
            { fieldKey: 'status', operator: 'eq', value: 'active' },
          ],
          sorting: [
            { fieldKey: 'name', direction: 'asc' },
          ],
          item: {
            fields: [
              { key: 'name', label: 'Name', type: 'text', sortable: true },
              { key: 'email', label: 'Email', type: 'email' },
              { key: 'role', label: 'Role', type: 'text' },
              { key: 'department', label: 'Department', type: 'text', sortable: true },
              {
                key: 'status',
                label: 'Status',
                type: 'text',
                renderAs: 'badge',
                renderAsOptions: {
                  colorMap: {
                    active: 'success',
                    pending: 'warning',
                    inactive: 'danger',
                  },
                },
              },
              {
                key: 'amount',
                label: 'Salary',
                type: 'number',
                renderAs: 'currency',
                renderAsOptions: { currency: 'USD', locale: 'en-US', compact: false },
              },
            ],
          },
        },
        footer: {
          subtitle: 'content.filtering pre-reduces the dataset · content.sorting sets the initial column order',
        },
      },
    },
  },

  {
    id: 'progressive-14-combined',
    title: 'Progressive 14 — Combined: Pagination + Search + Grouping + Actions',
    description: 'Combines pagination (pageSize: 5), search (name/email/department), groupings by department, rich field rendering (badges + currency + rating), header zone with actions, and item actions — demonstrating feature composability.',
    data: twentyUsersData,
    config: {
      id: 'progressive-14',
      zones: {
        header: {
          title: 'Team Directory',
          subtitle: 'Grouped by department · search · 5 per page',
          icon: 'users',
          actions: [
            {
              id: 'add-user',
              label: 'Add User',
              icon: 'add',
              placement: 'pinned',
              variant: 'primary',
              onAction: (ctx: ActionContext) =>
                fireDemoAction({
                  actionId: 'add-user',
                  actionLabel: 'Add User',
                  source: 'onAction',
                  data: ctx.data as Record<string, unknown>[],
                  zone: ctx.zone,
                }),
            },
            {
              id: 'export-csv',
              label: 'Export CSV',
              icon: 'download',
              placement: 'menu',
              onAction: (ctx: ActionContext) =>
                fireDemoAction({
                  actionId: 'export-csv',
                  actionLabel: 'Export CSV',
                  source: 'onAction',
                  data: ctx.data as Record<string, unknown>[],
                  zone: ctx.zone,
                }),
            },
          ],
        },
        content: {
          mode: 'table',
          layout: { table: { type: 'traditional' } },
          pagination: { pageSize: 5 },
          search: {
            enabled: true,
            placeholder: 'Search users…',
            fields: ['name', 'email', 'department'],
          },
          groupings: [
            { fieldKey: 'department', initiallyCollapsed: false },
          ],
          item: {
            fields: [
              { key: 'name', label: 'Name', type: 'text', sortable: true },
              { key: 'email', label: 'Email', type: 'email' },
              { key: 'role', label: 'Role', type: 'text' },
              {
                key: 'status',
                label: 'Status',
                type: 'text',
                renderAs: 'badge',
                renderAsOptions: {
                  colorMap: {
                    active: 'success',
                    pending: 'warning',
                    inactive: 'danger',
                  },
                },
              },
              {
                key: 'amount',
                label: 'Salary',
                type: 'number',
                renderAs: 'currency',
                renderAsOptions: { currency: 'USD', locale: 'en-US', compact: false },
              },
              {
                key: 'rating',
                label: 'Rating',
                type: 'number',
                renderAs: 'rating',
                renderAsOptions: { max: 5, color: '#f59e0b' },
              },
            ],
          },
          itemActions: [
            {
              id: 'edit-user',
              label: 'Edit',
              icon: 'edit',
              placement: 'pinned',
              variant: 'secondary',
              onAction: (ctx: ActionContext) =>
                fireDemoAction({
                  actionId: 'edit-user',
                  actionLabel: 'Edit',
                  source: 'onAction',
                  entity: ctx.entity as Record<string, unknown>,
                }),
            },
            {
              id: 'view-profile',
              label: 'View Profile',
              icon: 'view',
              placement: 'onHover',
              onAction: (ctx: ActionContext) =>
                fireDemoAction({
                  actionId: 'view-profile',
                  actionLabel: 'View Profile',
                  source: 'onAction',
                  entity: ctx.entity as Record<string, unknown>,
                }),
            },
            {
              id: 'delete-user',
              label: 'Delete',
              icon: 'delete',
              placement: 'menu',
              variant: 'danger',
              onAction: (ctx: ActionContext) =>
                fireDemoAction({
                  actionId: 'delete-user',
                  actionLabel: 'Delete',
                  source: 'onAction',
                  entity: ctx.entity as Record<string, unknown>,
                }),
            },
          ],
        },
        footer: {
          subtitle: '20 employees total · grouped by department · search + pagination composable',
        },
      },
    },
  },

  {
    id: 'progressive-15-full-showcase',
    title: 'Progressive 15 — Full Feature Showcase',
    description: 'Everything combined: header zone with Add/Export actions, footer zone, avatar (type: "image"), badges (colorMap), currency, progress bar, star rating, grouping by department, pagination (5 per page), search, sortable columns, and item actions (Edit pinned, View Profile on hover, Archive/Delete in menu).',
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
            {
              id: 'add-user',
              label: 'Add User',
              icon: 'add',
              placement: 'pinned',
              variant: 'primary',
              onAction: (ctx: ActionContext) =>
                fireDemoAction({
                  actionId: 'add-user',
                  actionLabel: 'Add User',
                  source: 'onAction',
                  data: ctx.data as Record<string, unknown>[],
                  zone: ctx.zone,
                }),
            },
            {
              id: 'export-csv',
              label: 'Export CSV',
              icon: 'download',
              placement: 'pinned',
              variant: 'secondary',
              onAction: (ctx: ActionContext) =>
                fireDemoAction({
                  actionId: 'export-csv',
                  actionLabel: 'Export CSV',
                  source: 'onAction',
                  data: ctx.data as Record<string, unknown>[],
                  zone: ctx.zone,
                }),
            },
            {
              id: 'settings',
              label: 'Settings',
              icon: 'settings',
              placement: 'menu',
              onAction: (ctx: ActionContext) =>
                fireDemoAction({
                  actionId: 'settings',
                  actionLabel: 'Settings',
                  source: 'onAction',
                  data: ctx.data as Record<string, unknown>[],
                  zone: ctx.zone,
                }),
            },
          ],
        },
        content: {
          mode: 'table',
          layout: { table: { type: 'traditional' } },
          pagination: { pageSize: 5 },
          search: {
            enabled: true,
            placeholder: 'Search users…',
            fields: ['name', 'email', 'department'],
          },
          groupings: [
            { fieldKey: 'department', initiallyCollapsed: false },
          ],
          item: {
            fields: [
              {
                key: 'src',
                label: 'Avatar',
                type: 'image',
                imageOptions: { shape: 'circle', width: 36, height: 36 },
              },
              { key: 'name', label: 'Name', type: 'text', sortable: true },
              { key: 'email', label: 'Email', type: 'email' },
              { key: 'role', label: 'Role', type: 'text' },
              { key: 'department', label: 'Department', type: 'text', sortable: true },
              { key: 'lastLogin', label: 'Last Login', type: 'date', sortable: true },
              {
                key: 'status',
                label: 'Status',
                type: 'text',
                renderAs: 'badge',
                renderAsOptions: {
                  colorMap: {
                    active: 'success',
                    pending: 'warning',
                    inactive: 'danger',
                  },
                },
              },
              {
                key: 'amount',
                label: 'Salary',
                type: 'number',
                renderAs: 'currency',
                renderAsOptions: { currency: 'USD', locale: 'en-US', compact: false },
              },
              {
                key: 'progress',
                label: 'Progress',
                type: 'number',
                renderAs: 'progress',
                renderAsOptions: { color: '#4caf50', showPercentage: true },
              },
              {
                key: 'rating',
                label: 'Rating',
                type: 'number',
                renderAs: 'rating',
                renderAsOptions: { max: 5, color: '#f59e0b' },
              },
            ],
          },
          itemActions: [
            {
              id: 'edit-user',
              label: 'Edit',
              icon: 'edit',
              placement: 'pinned',
              variant: 'secondary',
              onAction: (ctx: ActionContext) =>
                fireDemoAction({
                  actionId: 'edit-user',
                  actionLabel: 'Edit',
                  source: 'onAction',
                  entity: ctx.entity as Record<string, unknown>,
                }),
            },
            {
              id: 'view-profile',
              label: 'View Profile',
              icon: 'view',
              placement: 'onHover',
              onAction: (ctx: ActionContext) =>
                fireDemoAction({
                  actionId: 'view-profile',
                  actionLabel: 'View Profile',
                  source: 'onAction',
                  entity: ctx.entity as Record<string, unknown>,
                }),
            },
            {
              id: 'archive-user',
              label: 'Archive',
              icon: 'archive',
              placement: 'menu',
              onAction: (ctx: ActionContext) =>
                fireDemoAction({
                  actionId: 'archive-user',
                  actionLabel: 'Archive',
                  source: 'onAction',
                  entity: ctx.entity as Record<string, unknown>,
                }),
            },
            {
              id: 'delete-user',
              label: 'Delete',
              icon: 'delete',
              placement: 'menu',
              variant: 'danger',
              onAction: (ctx: ActionContext) =>
                fireDemoAction({
                  actionId: 'delete-user',
                  actionLabel: 'Delete',
                  source: 'onAction',
                  entity: ctx.entity as Record<string, unknown>,
                }),
            },
          ],
        },
        footer: {
          subtitle: 'Progressive Example 15 of 15 · All features enabled',
        },
      },
    },
  },
];

export default progressiveExamples;
