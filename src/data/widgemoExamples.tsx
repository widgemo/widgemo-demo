import React from 'react';
import { teaserSampleData } from './sampleData';
import type { Entity, InteractionContext } from '@widgemo/widgemo-core';
import { fireDemoAction } from '../utils/demoActionBus';
// Memoized to prevent recreation on renders, improving performance by avoiding unnecessary computations.
export const twoUsersData = teaserSampleData.slice(0, 2);
// Memoized to prevent recreation on renders, improving performance by avoiding unnecessary computations.
export const threeUsersData = teaserSampleData.slice(0, 3);
// Memoized to prevent recreation on renders, improving performance by avoiding unnecessary computations.
export const fourUsersData = teaserSampleData.slice(0, 4);
// Memoized to prevent recreation on renders, improving performance by avoiding unnecessary computations.
export const fiveUsersData = teaserSampleData.slice(0, 5);
// Memoized to prevent recreation on renders, improving performance by avoiding unnecessary computations.
export const sixUsersData = teaserSampleData.slice(0, 6);
// Memoized to prevent recreation on renders, improving performance by avoiding unnecessary computations.
export const eightUsersData = teaserSampleData.slice(0, 8);
// Memoized to prevent recreation on renders, improving performance by avoiding unnecessary computations.
export const tenUsersData = teaserSampleData.slice(0, 10);
export const twentyUsersData = teaserSampleData.slice(0, 20);
// Memoized to prevent recreation on renders, improving performance by avoiding unnecessary computations.
export const twelveUsersData = teaserSampleData.slice(0, 12);
// Moved outside to prevent recreation on every render, ensuring stable props for better performance.

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
  });
};


// Array of examples for dynamic rendering in SimplifiedTest.
const widgemoExamples: Array<{
  id: string;
  title: string;
  description: string;
  data: Entity[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  config: any;
}> = [
  {
    id: 'timeline-mode',
    title: 'Timeline Mode',
    description: 'Timeline mode displaying chronological events with dates, titles, and descriptions',
    data: [
      {
        id: 1,
        date: '2024-01-15',
        title: 'Project Kickoff',
        description: 'Initial project planning and team assembly completed. All stakeholders aligned on objectives.',
        category: 'Planning',
        status: 'completed'
      },
      {
        id: 2,
        date: '2024-02-01',
        title: 'Design Phase Complete',
        description: 'UI/UX designs finalized and approved. Wireframes and mockups delivered to development team.',
        category: 'Design',
        status: 'completed'
      },
      {
        id: 3,
        date: '2024-02-15',
        title: 'Development Started',
        description: 'Frontend and backend development initiated. Core architecture implemented.',
        category: 'Development',
        status: 'in-progress'
      },
      {
        id: 4,
        date: '2024-03-01',
        title: 'First Prototype Demo',
        description: 'Internal demo of first working prototype. Feedback collected from key stakeholders.',
        category: 'Milestone',
        status: 'completed'
      },
      {
        id: 5,
        date: '2024-03-15',
        title: 'Testing Phase',
        description: 'Comprehensive testing begins including unit tests, integration tests, and user acceptance testing.',
        category: 'Testing',
        status: 'pending'
      },
      {
        id: 6,
        date: '2024-04-01',
        title: 'Beta Release',
        description: 'Beta version released to select users for real-world testing and feedback.',
        category: 'Release',
        status: 'pending'
      },
      {
        id: 7,
        date: '2024-04-15',
        title: 'Production Launch',
        description: 'Full production deployment and public launch of the application.',
        category: 'Release',
        status: 'pending'
      }
    ],
    config: {
      containerFrame: { shadow: 'none' },
      collapse: { initialState: 'expanded' },
      zones: {
        header: {
          title: 'Project Timeline',
          subtitle: 'Chronological view of project milestones and events',
          icon: { name: 'calendar', size: 24, color: '#2196f3' }
        },
        content: {
          mode: 'timeline',
          themeOverrides: {
            padding: '1rem'
          },
          timeline: {
            dateField: 'date',
            sortOrder: 'asc' as const,
            orientation: 'horizontal' as const,
            showLines: true,
            color: '#2196f3',
            dateFormat: {
              year: 'numeric' as const, // 'numeric' | '2-digit'
              month: 'short' as const, // 'numeric' | '2-digit' | 'long' | 'short' | 'narrow'
              day: 'numeric' as const, // 'numeric' | '2-digit'
              hour: 'numeric' as const, // 'numeric' | '2-digit'
              minute: 'numeric' as const, // 'numeric' | '2-digit'
              weekday: 'short', // 'long' | 'short' | 'narrow'
              era: undefined, // 'long' | 'short' | 'narrow'
              timeZoneName: 'short', // 'long' | 'short'
              hour12: undefined, // boolean
              minute12: undefined, // boolean
              second: undefined // 'numeric' | '2-digit'
            }
          }
        },
        footer: {
          subtitle: 'Timeline mode with horizontal orientation and connecting lines'
        }
      }
    }
  },
 
  {
    id: 'actions-overflow-demo',
    title: 'Actions Overflow Demo',
    description: 'Demonstrates responsive action overflow with tuck-to-menu functionality',
    data: twoUsersData,
    config: {
      collapse: { initialState: 'expanded' },
      zones: {
        header: {
          title: 'Actions Overflow Demo',
          subtitle: 'Resize the window to see actions tuck into overflow menu',
          actions: [
            {
              id: 'add-user',
              label: 'Add User',
              icon: 'add',
              placement: 'pinned',
              variant: 'primary',
              onAction: (ctx: InteractionContext) => fireDemoAction({ actionId: 'add-user', actionLabel: 'Add User', source: 'action.onAction', data: ctx.data as Record<string, unknown>[], zone: ctx.zone })
            },
            {
              id: 'edit-user',
              label: 'Edit User',
              icon: 'edit',
              placement: 'pinned',
              variant: 'secondary',
              onAction: (ctx: InteractionContext) => fireDemoAction({ actionId: 'edit-user', actionLabel: 'Edit User', source: 'action.onAction', data: ctx.data as Record<string, unknown>[], zone: ctx.zone })
            },
            {
              id: 'delete-user',
              label: 'Delete User',
              icon: 'delete',
              placement: 'pinned',
              variant: 'danger',
              onAction: (ctx: InteractionContext) => fireDemoAction({ actionId: 'delete-user', actionLabel: 'Delete User', source: 'action.onAction', data: ctx.data as Record<string, unknown>[], zone: ctx.zone })
            },
            {
              id: 'view-profile',
              label: 'View Profile',
              icon: 'view',
              placement: 'onHover',
              onAction: (ctx: InteractionContext) => fireDemoAction({ actionId: 'view-profile', actionLabel: 'View Profile', source: 'action.onAction', data: ctx.data as Record<string, unknown>[], zone: ctx.zone })
            },
            {
              id: 'send-message',
              label: 'Send Message',
              icon: 'message',
              placement: 'menu',
              onAction: (ctx: InteractionContext) => fireDemoAction({ actionId: 'send-message', actionLabel: 'Send Message', source: 'action.onAction', data: ctx.data as Record<string, unknown>[], zone: ctx.zone })
            },
            {
              id: 'share-user',
              label: 'Share User',
              icon: 'share',
              placement: 'menu',
              onAction: (ctx: InteractionContext) => fireDemoAction({ actionId: 'share-user', actionLabel: 'Share User', source: 'action.onAction', data: ctx.data as Record<string, unknown>[], zone: ctx.zone })
            },
            {
              id: 'export-user',
              label: 'Export User',
              icon: 'export',
              placement: 'menu',
              onAction: (ctx: InteractionContext) => fireDemoAction({ actionId: 'export-user', actionLabel: 'Export User', source: 'action.onAction', data: ctx.data as Record<string, unknown>[], zone: ctx.zone })
            },
            {
              id: 'archive-user',
              label: 'Archive User',
              icon: 'archive',
              placement: 'menu',
              onAction: (ctx: InteractionContext) => fireDemoAction({ actionId: 'archive-user', actionLabel: 'Archive User', source: 'action.onAction', data: ctx.data as Record<string, unknown>[], zone: ctx.zone })
            }
          ],
          actionOverflow: {
            maxInline: { mobile: 1, tablet: 2, desktop: 3 },
            menuLabel: 'More...',
            indicator: 'pulse'
          }
        },
        content: {
          mode: 'table',
          layout: {},
          item: {
            fields: [
              { key: 'id', label: 'ID', width: '60px' },
              { key: 'name', label: 'Name' },
              { key: 'email', label: 'Email' },
              { key: 'department', label: 'Department' }
            ]
          },
          itemActions: [
            {
              id: 'edit-item',
              label: 'Edit',
              icon: 'edit',
              placement: 'pinned',
              variant: 'secondary',
              onAction: (ctx: InteractionContext) => fireDemoAction({ actionId: 'edit-item', actionLabel: 'Edit', source: 'action.onAction', entity: ctx.entity as Record<string, unknown> })
            },
            {
              id: 'delete-item',
              label: 'Delete',
              icon: 'delete',
              placement: 'onHover',
              variant: 'danger',
              onAction: (ctx: InteractionContext) => fireDemoAction({ actionId: 'delete-item', actionLabel: 'Delete', source: 'action.onAction', entity: ctx.entity as Record<string, unknown> })
            },
            {
              id: 'archive-item',
              label: 'Archive',
              icon: 'archive',
              placement: 'onHover',
              onAction: (ctx: InteractionContext) => fireDemoAction({ actionId: 'archive-item', actionLabel: 'Archive', source: 'action.onAction', entity: ctx.entity as Record<string, unknown> })
            },
            {
              id: 'view-item',
              label: 'View Details',
              icon: 'view',
              placement: 'menu',
              onAction: (ctx: InteractionContext) => fireDemoAction({ actionId: 'view-item', actionLabel: 'View Details', source: 'action.onAction', entity: ctx.entity as Record<string, unknown> })
            },
            {
              id: 'duplicate-item',
              label: 'Duplicate',
              icon: 'copy',
              placement: 'menu',
              onAction: (ctx: InteractionContext) => fireDemoAction({ actionId: 'duplicate-item', actionLabel: 'Duplicate', source: 'action.onAction', entity: ctx.entity as Record<string, unknown> })
            }
          ],
          actionOverflow: {
            maxInline: 2,
            indicator: 'scale'
          }
        }
      }
    }
  },

  // ── Action Overflow: indicator variants ──────────────────────────────────
  {
    id: 'action-overflow-indicator-pulse',
    title: 'Action Overflow — indicator: pulse',
    description: 'maxInline: 2 forces overflow on desktop. When overflow count increases the ⋯ button plays a scale + blue ripple animation (indicator: "pulse", the default).',
    data: twoUsersData,
    config: {
      collapse: { initialState: 'expanded' },
      zones: {
        header: {
          title: 'Indicator: pulse',
          subtitle: 'Overflow button pulses with a blue ripple when items tuck in',
          actions: [
            { id: 'p-save', label: 'Save', icon: 'save', placement: 'pinned' as const, onAction: (ctx: InteractionContext) => fireDemoAction({ actionId: 'p-save', actionLabel: 'Save', source: 'action.onAction', data: ctx.data as Record<string, unknown>[], zone: ctx.zone }) },
            { id: 'p-edit', label: 'Edit', icon: 'edit', placement: 'pinned' as const, onAction: (ctx: InteractionContext) => fireDemoAction({ actionId: 'p-edit', actionLabel: 'Edit', source: 'action.onAction', data: ctx.data as Record<string, unknown>[], zone: ctx.zone }) },
            { id: 'p-share', label: 'Share', icon: 'share', placement: 'menu' as const, onAction: (ctx: InteractionContext) => fireDemoAction({ actionId: 'p-share', actionLabel: 'Share', source: 'action.onAction', data: ctx.data as Record<string, unknown>[], zone: ctx.zone }) },
            { id: 'p-export', label: 'Export', icon: 'export', placement: 'menu' as const, onAction: (ctx: InteractionContext) => fireDemoAction({ actionId: 'p-export', actionLabel: 'Export', source: 'action.onAction', data: ctx.data as Record<string, unknown>[], zone: ctx.zone }) },
            { id: 'p-delete', label: 'Delete', icon: 'delete', placement: 'menu' as const, onAction: (ctx: InteractionContext) => fireDemoAction({ actionId: 'p-delete', actionLabel: 'Delete', source: 'action.onAction', data: ctx.data as Record<string, unknown>[], zone: ctx.zone }) },
          ],
          actionOverflow: {
            maxInline: { mobile: 1, tablet: 2, desktop: 2 },
            menuTooltip: 'More actions',
            indicator: 'pulse' as const,
          },
        },
        content: { mode: 'table', item: { fields: [{ key: 'name', label: 'Name' }, { key: 'role', label: 'Role' }] } },
      },
    },
  },

  {
    id: 'action-overflow-indicator-scale',
    title: 'Action Overflow — indicator: scale',
    description: 'Same layout as the pulse example but uses indicator: "scale" — a clean scale-only pop with no color change.',
    data: twoUsersData,
    config: {
      collapse: { initialState: 'expanded' },
      zones: {
        header: {
          title: 'Indicator: scale',
          subtitle: 'Overflow button pops with a scale-only animation — no ripple, no color',
          actions: [
            { id: 's-save', label: 'Save', icon: 'save', placement: 'pinned' as const, onAction: (ctx: InteractionContext) => fireDemoAction({ actionId: 's-save', actionLabel: 'Save', source: 'action.onAction', data: ctx.data as Record<string, unknown>[], zone: ctx.zone }) },
            { id: 's-edit', label: 'Edit', icon: 'edit', placement: 'pinned' as const, onAction: (ctx: InteractionContext) => fireDemoAction({ actionId: 's-edit', actionLabel: 'Edit', source: 'action.onAction', data: ctx.data as Record<string, unknown>[], zone: ctx.zone }) },
            { id: 's-share', label: 'Share', icon: 'share', placement: 'menu' as const, onAction: (ctx: InteractionContext) => fireDemoAction({ actionId: 's-share', actionLabel: 'Share', source: 'action.onAction', data: ctx.data as Record<string, unknown>[], zone: ctx.zone }) },
            { id: 's-export', label: 'Export', icon: 'export', placement: 'menu' as const, onAction: (ctx: InteractionContext) => fireDemoAction({ actionId: 's-export', actionLabel: 'Export', source: 'action.onAction', data: ctx.data as Record<string, unknown>[], zone: ctx.zone }) },
            { id: 's-delete', label: 'Delete', icon: 'delete', placement: 'menu' as const, onAction: (ctx: InteractionContext) => fireDemoAction({ actionId: 's-delete', actionLabel: 'Delete', source: 'action.onAction', data: ctx.data as Record<string, unknown>[], zone: ctx.zone }) },
          ],
          actionOverflow: {
            maxInline: { mobile: 1, tablet: 2, desktop: 2 },
            menuTooltip: 'More actions',
            indicator: 'scale' as const,
          },
        },
        content: { mode: 'table', item: { fields: [{ key: 'name', label: 'Name' }, { key: 'role', label: 'Role' }] } },
      },
    },
  },

  {
    id: 'action-overflow-indicator-color-shift',
    title: 'Action Overflow — indicator: color-shift',
    description: 'indicator: "color-shift" flashes the overflow button background and border to the primary color — no movement. Useful when motion-reduction is preferred.',
    data: twoUsersData,
    config: {
      collapse: { initialState: 'expanded' },
      zones: {
        header: {
          title: 'Indicator: color-shift',
          subtitle: 'Overflow button flashes its border and background tint — no scale movement',
          actions: [
            { id: 'c-save', label: 'Save', icon: 'save', placement: 'pinned' as const, onAction: (ctx: InteractionContext) => fireDemoAction({ actionId: 'c-save', actionLabel: 'Save', source: 'action.onAction', data: ctx.data as Record<string, unknown>[], zone: ctx.zone }) },
            { id: 'c-edit', label: 'Edit', icon: 'edit', placement: 'pinned' as const, onAction: (ctx: InteractionContext) => fireDemoAction({ actionId: 'c-edit', actionLabel: 'Edit', source: 'action.onAction', data: ctx.data as Record<string, unknown>[], zone: ctx.zone }) },
            { id: 'c-share', label: 'Share', icon: 'share', placement: 'menu' as const, onAction: (ctx: InteractionContext) => fireDemoAction({ actionId: 'c-share', actionLabel: 'Share', source: 'action.onAction', data: ctx.data as Record<string, unknown>[], zone: ctx.zone }) },
            { id: 'c-export', label: 'Export', icon: 'export', placement: 'menu' as const, onAction: (ctx: InteractionContext) => fireDemoAction({ actionId: 'c-export', actionLabel: 'Export', source: 'action.onAction', data: ctx.data as Record<string, unknown>[], zone: ctx.zone }) },
            { id: 'c-delete', label: 'Delete', icon: 'delete', placement: 'menu' as const, onAction: (ctx: InteractionContext) => fireDemoAction({ actionId: 'c-delete', actionLabel: 'Delete', source: 'action.onAction', data: ctx.data as Record<string, unknown>[], zone: ctx.zone }) },
          ],
          actionOverflow: {
            maxInline: { mobile: 1, tablet: 2, desktop: 2 },
            menuTooltip: 'More actions',
            indicator: 'color-shift' as const,
          },
        },
        content: { mode: 'table', item: { fields: [{ key: 'name', label: 'Name' }, { key: 'role', label: 'Role' }] } },
      },
    },
  },

  {
    id: 'grid-mode',
    title: 'Grid Mode',
    description: 'Grid mode with a centered header (header.layout.titlePosition = "center"). Title and subtitle stack below each other and are horizontally centered in the header bar.',
    data: teaserSampleData,
    config: {
      containerFrame: { shadow: 'none' },
      collapse: { initialState: 'expanded' },
      zones: {
        header: {
          icon: { name: 'database', size: 32, color: '#af654c' },
          title: 'User Grid',
          subtitle: 'Card-based grid layout with user profiles',
          layout: { titlePosition: 'center' },
          themeOverrides: {
            //titleFontSize: '1.5rem',
            //padding: '1rem',
            //backgroundColor: '#f8f9fa',
            //borderColor: 'none',
            //borderWidth: '5px',
            //borderStyle: 'solid', 
            //borderRadius: '8px',
            //titleColor: '#aa7c12',
            //subtitleColor: '#0c599c',
            //iconColor: '#495057',
            //iconSize: 26
          },
          actions: [
            {
              id: 'add-user',
              label: 'Add User',
              icon: 'add',
              variant: 'primary',
              placement: 'pinned',
              onAction: (ctx: InteractionContext) => fireDemoAction({ actionId: 'add-user', actionLabel: 'Add User', source: 'action.onAction', data: ctx.data as Record<string, unknown>[], zone: ctx.zone })
            },
            {
              id: 'refresh',
              label: 'Refresh',
              icon: 'refresh',
              variant: 'secondary',
              placement: 'pinned',
              onAction: (ctx: InteractionContext) => fireDemoAction({ actionId: 'refresh', actionLabel: 'Refresh', source: 'action.onAction', data: ctx.data as Record<string, unknown>[], zone: ctx.zone })
            }
          ]
        },
        content: {
          mode: 'grid',
          themeOverrides: {
            padding: '1rem'
          },
          columns: 3,
          item: {
            fields: [
              { key: 'name', label: 'Name' },
              { key: 'email', label: 'Email' },
              { key: 'role', label: 'Role' },
              { key: 'department', label: 'Department' }
            ]
          }
        },
        footer: {
          subtitle: 'Responsive grid layout with 3 columns on desktop',
          themeOverrides: {
            //padding: '0.5rem',
            //backgroundColor: '#f1f3f5',
            //borderColor: '#dee2e6',
            //borderWidth: '1px',
            //borderStyle: 'solid', 
            //borderRadius: '0 0 8px 8px',
            //subtitleColor: '#212529'
          }
        }
      },
      devMode: true
    }
  },

  // New unified examples
  {
    id: 'traditional-table',
    title: 'Traditional Table',
    description: 'Simple table layout with basic field display. Email column uses wrap: true to allow line wrapping; other columns use the default truncation. hover=false: row hover highlight is disabled.',
    data: fourUsersData,
    config: {
      containerFrame: { shadow: 'none' },
      collapse: { initialState: 'expanded' },
      zones: {
        header: {
          title: 'User Directory',
          subtitle: 'Traditional table view · hover=false'
        },
        content: {
          mode: 'table',
          themeOverrides: {
            padding: '1rem'
          },
          layout: {
            table: {
              type: 'traditional',
              hover: false,
            },
          },
          item: {
            fields: [
              { key: 'id', label: 'ID', width: '60px' },
              { key: 'name', label: 'Name' },
              // wrap: true + type: 'email' — wraps with forced break-word for long addresses
              { key: 'email', label: 'Email', type: 'email', wrap: true },
              { key: 'department', label: 'Department' },
              { key: 'role', label: 'Role' }
            ]
          }
        }
      }
    }
  },

  {
    id: 'row-click',
    title: 'Row Click (item-click gesture)',
    description: 'Demonstrates gestures[item-click]. Click any row — including the email cell — to fire interactions.onEvent. The email column uses type: "email" which renders as plain text so it participates in row-click normally. Use renderAs: "link" instead if you want email cells to open a mailto: link and skip the row handler.',
    data: fourUsersData,
    config: {
      collapse: { initialState: 'expanded' },
      zones: {
        header: {
          title: 'Clickable Rows',
          subtitle: 'Click any cell (including the plain-text email) to fire interactions.onEvent via item-click gesture'
        },
        content: {
          mode: 'table',
          modeConfig: { table: { type: 'traditional' } },
          gestures: [
            { type: 'item-click', enabled: true, interactionId: 'row-click', interactionLabel: 'Row Click' }
          ],
          item: {
            fields: [
              { key: 'id',         label: 'ID',         width: '60px' },
              { key: 'name',       label: 'Name' },
              // type: 'email' renders plain text — clicking it fires interactions.onEvent like any other cell
              { key: 'email',      label: 'Email',      type: 'email' },
              { key: 'department', label: 'Department' },
              { key: 'role',       label: 'Role' },
            ]
          },
        }
      }
    }
  },

  {
    id: 'row-click-with-link',
    title: 'Row Click with Email Link (renderAs: link)',
    description: 'Like row-click, but the email column uses renderAs: "link" which renders a real <a href="mailto:..."> tag. Clicking the email opens the mail client and does NOT fire item-click (stopPropagation). Clicking any other cell still fires interactions.onEvent via the item-click gesture.',
    data: fourUsersData,
    config: {
      collapse: { initialState: 'expanded' },
      zones: {
        header: {
          title: 'Clickable Rows + Email Link',
          subtitle: 'Click a row to fire interactions.onEvent · click the email to open mailto: (gesture skipped)'
        },
        content: {
          mode: 'table',
          modeConfig: { table: { type: 'traditional' } },
          gestures: [
            { type: 'item-click', enabled: true, interactionId: 'row-click', interactionLabel: 'Row Click' }
          ],
          item: {
            fields: [
              { key: 'id',         label: 'ID',         width: '60px' },
              { key: 'name',       label: 'Name' },
              // renderAs: 'link' renders <a href="mailto:..."> — clicking stops item-click propagation
              { key: 'email',      label: 'Email',      type: 'email', renderAs: 'link' },
              { key: 'department', label: 'Department' },
              { key: 'role',       label: 'Role' },
            ]
          },
        }
      }
    }
  },

  {
    id: 'rich-cells-table',
    title: 'Rich Cells Table',
    description: 'Table with rich content including images and formatted data. hover=false: row hover highlight is disabled.',
    data: fourUsersData,
    config: {
      collapse: { initialState: 'expanded' },
      zones: {
        header: {
          title: 'User Profiles',
          subtitle: 'Rich table with images and formatted content · hover=false'
        },
        content: {
          mode: 'table',
          layout: {
            table: {
              type: 'rich-cells',
              hover: false,
            },
          },
          item: {
            fields: [
              { key: 'src', label: 'Avatar', type: 'image', width: '60px' },
              { key: 'name', label: 'Name', type: 'text' },
              { key: 'email', label: 'Email', type: 'email' },
              { key: 'department', label: 'Department', type: 'text', renderAs: 'badge' },
              { key: 'progress', label: 'Progress', type: 'number', renderAs: 'progress', width: '120px' },
              { key: 'amount', label: 'Salary', type: 'number', renderAs: 'currency', renderAsOptions: { currency: 'USD' } }
            ]
          }
        }
      }
    }
  },

  {
    id: 'basic-grid-layout',
    title: 'Basic Grid Layout',
    description: 'Responsive grid with flex/grid layout and card-based display',
    data: sixUsersData,
    config: {
      collapse: { initialState: 'expanded' },
      zones: {
        header: {
          title: 'User Grid',
          subtitle: 'Responsive card layout'
        },
        content: {
          mode: 'grid',
          columns: { mobile: 1, tablet: 2, desktop: 3 },
          item: {
            fields: [
              { key: 'src', label: 'Avatar', type: 'image' },
              { key: 'name', label: 'Name' },
              { key: 'role', label: 'Role' },
              { key: 'department', label: 'Department' },
              { key: 'status', label: 'Status', type: 'text', renderAs: 'badge' }
            ]
          }
        }
      }
    }
  },

  {
    id: 'borderless-grid-cards',
    title: 'Grid / No Container Chrome',
    description: 'Grid/card layout with normal item card styling, while omitting only the outer Widgemo container chrome.',
    data: sixUsersData,
    config: {
      containerFrame: { border: 'none' },
      collapse: { initialState: 'expanded' },
      zones: {
        header: {
          title: 'Containerless Grid',
          subtitle: 'Grid layout without outer container styling — ideal for embedding within other card components'
        },
        content: {
          mode: 'grid',
          modeConfig: {
            grid: {
              minItemWidth: '220px',
              maxColumns: 4,
              gap: '0.75rem'
            }
          },
          item: {
            layout: { type: 'auto' },
            fields: [
              { key: 'src', label: 'Avatar', type: 'image' },
              { key: 'name', label: 'Name' },
              { key: 'role', label: 'Role' },
              { key: 'department', label: 'Department' },
              { key: 'status', label: 'Status', type: 'text', renderAs: 'badge' }
            ]
          }
        }
      }
    }
  },

  {
    id: 'container-trim-none-table',
    title: 'Container Trim None (Table)',
    description: 'Uses config.containerFrame.border = "none" to remove outer shell trim while keeping normal table and item rendering.',
    data: fourUsersData,
    config: {
      containerFrame: { border: 'none' },
      collapse: { initialState: 'expanded' },
      zones: {
        header: {
          title: 'Embedded User Table',
          subtitle: 'No outer widgemo shell chrome'
        },
        content: {
          mode: 'table',
          modeConfig: { table: { type: 'traditional' } },
          item: {
            fields: [
              { key: 'name', label: 'Name' },
              { key: 'email', label: 'Email', type: 'email' },
              { key: 'department', label: 'Department' },
              { key: 'status', label: 'Status', renderAs: 'badge' }
            ]
          }
        },
        footer: {
          subtitle: 'containerFrame.border none keeps content rendering but removes shell trim'
        }
      }
    }
  },

  {
    id: 'container-trim-none-grid-basic',
    title: 'Container Trim None (Grid)',
    description: 'Grid mode with containerFrame.border set to none; content cards render normally without outer Widgemo shell trim.',
    data: sixUsersData,
    config: {
      containerFrame: { border: 'none' },
      collapse: { initialState: 'expanded' },
      zones: {
        header: {
          title: 'Embedded Grid',
          subtitle: 'No outer shell, normal card rendering'
        },
        content: {
          mode: 'grid',
          modeConfig: {
            grid: {
              minItemWidth: '220px',
              maxColumns: 4,
              gap: '0.75rem'
            }
          },
          item: {
            fields: [
              { key: 'src', label: 'Avatar', type: 'image' },
              { key: 'name', label: 'Name' },
              { key: 'role', label: 'Role' },
              { key: 'department', label: 'Department' },
              { key: 'status', label: 'Status', renderAs: 'badge' }
            ],
            layout: { type: 'auto' }
          }
        }
      }
    }
  },

  {
    id: 'container-trim-none-list',
    title: 'Container Trim None (List)',
    description: 'List mode with containerFrame.border none for embedding in parent cards or custom page sections.',
    data: sixUsersData,
    config: {
      containerFrame: { border: 'none' },
      collapse: { initialState: 'expanded' },
      zones: {
        header: {
          title: 'Embedded List',
          subtitle: 'List mode without outer shell trim'
        },
        content: {
          mode: 'list',
          item: {
            fields: [
              { key: 'src', label: 'Avatar', type: 'image', width: '40px' },
              { key: 'name', label: 'Name' },
              { key: 'role', label: 'Role' },
              { key: 'department', label: 'Department' },
              { key: 'status', label: 'Status', renderAs: 'badge' }
            ],
            layout: { type: 'auto' }
          }
        }
      }
    }
  },

  {
    id: 'container-trim-none-timeline',
    title: 'Container Trim None (Timeline)',
    description: 'Timeline mode with containerFrame.border none; timeline visuals render without the outer Widgemo shell.',
    data: [
      {
        id: 1,
        date: '2024-01-15',
        title: 'Kickoff',
        description: 'Project kickoff and planning complete.',
        status: 'completed'
      },
      {
        id: 2,
        date: '2024-02-01',
        title: 'Design',
        description: 'Design finalized and approved.',
        status: 'completed'
      },
      {
        id: 3,
        date: '2024-02-15',
        title: 'Development',
        description: 'Development started.',
        status: 'in-progress'
      }
    ],
    config: {
      containerFrame: { border: 'none' },
      collapse: { initialState: 'expanded' },
      zones: {
        header: {
          title: 'Embedded Timeline',
          subtitle: 'Timeline mode without outer shell trim'
        },
        content: {
          mode: 'timeline',
          timeline: {
            dateField: 'date',
            sortOrder: 'asc' as const,
            orientation: 'horizontal' as const,
            showLines: true,
            color: '#2196f3'
          }
        }
      }
    }
  },

  {
    id: 'container-trim-none-carousel',
    title: 'Container Trim None (Carousel)',
    description: 'Carousel mode with containerFrame.border none for seamless embedding in custom layouts.',
    data: tenUsersData,
    config: {
      containerFrame: { border: 'none' },
      collapse: { initialState: 'expanded' },
      zones: {
        header: {
          title: 'Embedded Carousel',
          subtitle: 'Carousel mode without outer shell trim'
        },
        content: {
          mode: 'carousel',
          modeConfig: {
            carousel: {
              itemWidth: 260,
              gap: 16,
              showIndicators: true,
              showArrows: true,
              infinite: true
            }
          },
          item: {
            fields: [
              { key: 'src', label: 'Photo', type: 'image', imageOptions: { objectFit: 'cover', width: '100%', height: 100 } },
              { key: 'name', label: 'Name', showLabel: false },
              { key: 'role', label: 'Role', renderAs: 'badge' },
              { key: 'department', label: 'Department' }
            ],
            layout: { type: 'auto' }
          }
        }
      }
    }
  },

  {
    id: 'container-trim-none-board',
    title: 'Container Trim None (Board)',
    description: 'Board mode with containerFrame.border none while keeping normal column and card rendering.',
    data: twentyUsersData as Entity[],
    config: {
      containerFrame: { border: 'none' },
      collapse: { initialState: 'expanded' },
      zones: {
        header: {
          title: 'Embedded Board',
          subtitle: 'Board mode without outer shell trim'
        },
        content: {
          mode: 'board',
          modeConfig: {
            board: {
              columns: {
                field: 'status',
                items: [
                  { id: 'active', label: 'Active', color: '#28a745' },
                  { id: 'pending', label: 'Pending', color: '#fd7e14' },
                  { id: 'inactive', label: 'Inactive', color: '#6c757d' }
                ]
              },
              dragEnabled: true
            }
          },
          gestures: [
            {
              type: 'item-drop',
              enabled: true,
              interactionId: 'board-drop',
              interactionLabel: 'Board Drop'
            }
          ],
          item: {
            fields: [
              { key: 'name', label: 'Name', type: 'text' as const },
              { key: 'role', label: 'Role' },
              { key: 'department', label: 'Department' }
            ],
            layout: { type: 'auto' as const }
          }
        }
      }
    }
  },

  {
    id: 'grouped-traditional-table',
    title: 'Grouped Traditional Table',
    description: 'Traditional table with data grouped by department via groupings[].fieldKey. item.wrap: true enables natural line wrapping across all columns.',
    data: eightUsersData,
    config: {
      collapse: { initialState: 'expanded' },
      zones: {
        header: {
          title: 'Users by Department',
          subtitle: 'Grouped traditional table — groupings[].fieldKey · item.wrap: true'
        },
        content: {
          mode: 'table',
          groupings: [
            { fieldKey: 'department' },
          ],
          item: {
            // item-level wrap: true — all fields in every cell wrap freely
            wrap: true,
            fields: [
              { key: 'id', label: 'ID', width: '60px' },
              { key: 'name', label: 'Name' },
              { key: 'email', label: 'Email' },
              { key: 'role', label: 'Role' }
            ]
          }
        }
      }
    }
  },

  {
    id: 'grouped-rich-cells-table',
    title: 'Grouped Rich Cells Table',
    description: 'Rich cells table with data grouped by department via groupings[].fieldKey and enhanced formatting.',
    data: eightUsersData,
    config: {
      collapse: { initialState: 'expanded' },
      zones: {
        header: {
          title: 'Department Teams',
          subtitle: 'Grouped rich table with enhanced content · groupings[].fieldKey'
        },
        content: {
          mode: 'table',
          groupings: [
            { fieldKey: 'department' },
          ],
          item: {
            fields: [
              { key: 'src', label: 'Avatar', type: 'image', width: '50px' },
              { key: 'name', label: 'Name', type: 'text' },
              { key: 'role', label: 'Role', type: 'text', renderAs: 'badge' },
              { key: 'progress', label: 'Progress', type: 'number', renderAs: 'progress', width: '100px' },
              { key: 'rating', label: 'Rating', type: 'number', renderAs: 'rating', width: '80px' }
            ]
          }
        }
      }
    }
  },

  {
    id: 'per-item-actions-demo',
    title: 'Per-Item Actions',
    description: 'Table demonstrating various action placements: pinned, onHover, and menu',
    data: fourUsersData,
    config: {
      collapse: { initialState: 'expanded' },
      zones: {
        header: {
          title: 'User Management',
          subtitle: 'Per-item actions with different placements'
        },
        content: {
          mode: 'table',
          item: {
            fields: [
              { key: 'id', label: 'ID', width: '60px' },
              { key: 'name', label: 'Name' },
              { key: 'email', label: 'Email' },
              { key: 'department', label: 'Department' },
              { key: 'status', label: 'Status', type: 'text', renderAs: 'badge' }
            ]
          },
          itemActions: [
            {
              id: 'edit-user',
              label: 'Edit',
              icon: 'edit',
              placement: 'pinned',
              onAction: (ctx: InteractionContext) => fireDemoAction({ actionId: 'edit-user', actionLabel: 'Edit', source: 'action.onAction', entity: ctx.entity as Record<string, unknown> })
            },
            {
              id: 'view-profile',
              label: 'View Profile',
              icon: 'view',
              placement: 'onHover',
              onAction: (ctx: InteractionContext) => fireDemoAction({ actionId: 'view-profile', actionLabel: 'View Profile', source: 'action.onAction', entity: ctx.entity as Record<string, unknown> })
            },
            {
              id: 'send-message',
              label: 'Send Message',
              icon: 'message',
              placement: 'onHover',
              onAction: (ctx: InteractionContext) => fireDemoAction({ actionId: 'send-message', actionLabel: 'Send Message', source: 'action.onAction', entity: ctx.entity as Record<string, unknown> })
            },
            {
              id: 'duplicate-user',
              label: 'Duplicate',
              icon: 'duplicate',
              placement: 'menu',
              onAction: (ctx: InteractionContext) => fireDemoAction({ actionId: 'duplicate-user', actionLabel: 'Duplicate', source: 'action.onAction', entity: ctx.entity as Record<string, unknown> })
            },
            {
              id: 'archive-user',
              label: 'Archive',
              icon: 'archive',
              placement: 'menu',
              onAction: (ctx: InteractionContext) => fireDemoAction({ actionId: 'archive-user', actionLabel: 'Archive', source: 'action.onAction', entity: ctx.entity as Record<string, unknown> })
            }
          ]
        }
      }
    }
  },

  {
    id: 'compact-list-view',
    title: 'Compact List View',
    description: 'Minimal list layout with essential information and actions',
    data: sixUsersData,
    config: {
      containerFrame: { shadow: 'none' },
      collapse: { initialState: 'expanded' },
      zones: {
        header: {
          title: 'User List',
          subtitle: 'Compact list with inline actions'
        },
        content: {
          mode: 'list',
          themeOverrides: {
            padding: '1rem'
          },
          item: {
            fields: [
              { key: 'src', label: 'Avatar', type: 'image', width: '40px' },
              { key: 'name', label: 'Name' },
              { key: 'email', label: 'Email' },
              { key: 'department', label: 'Department', type: 'text', renderAs: 'badge' }
            ]
          },
          itemActions: [
            {
              id: 'edit',
              label: 'Edit',
              icon: 'edit',
              placement: 'pinned',
              onAction: (ctx: InteractionContext) => fireDemoAction({ actionId: 'edit', actionLabel: 'Edit', source: 'action.onAction', entity: ctx.entity as Record<string, unknown> })
            },
            {
              id: 'delete',
              label: 'Delete',
              icon: 'delete',
              placement: 'onHover',
              onAction: (ctx: InteractionContext) => fireDemoAction({ actionId: 'delete', actionLabel: 'Delete', source: 'action.onAction', entity: ctx.entity as Record<string, unknown> })
            }
          ]
        }
      }
    }
  },
  // ── Zone Layout Examples (Item 4) ────────────────────────────────────
  {
    id: 'zone-layout-icon-above',
    title: 'Zone Layout: Icon Above Title + Inline Subtitle',
    description: 'header.layout.iconPosition = "above" stacks the icon vertically above the title. header.layout.subtitlePosition = "inline" places the subtitle in its own centre column rather than stacking below the title — useful when you want a brief tagline separated from the heading.',
    data: fourUsersData,
    config: {
      collapse: { initialState: 'expanded' },
      zones: {
        header: {
          title: 'Team Overview',
          subtitle: 'Engineering department',
          icon: { name: 'users', size: 28, color: '#4f46e5' },
          layout: { iconPosition: 'above', subtitlePosition: 'inline' },
          actions: [
            {
              id: 'add-member',
              label: 'Add Member',
              icon: 'add',
              variant: 'primary',
              placement: 'pinned',
              onAction: (ctx: InteractionContext) => fireDemoAction({ actionId: 'add-member', actionLabel: 'Add Member', source: 'action.onAction', data: ctx.data as Record<string, unknown>[], zone: ctx.zone })
            }
          ]
        },
        content: {
          mode: 'grid',
          item: {
            fields: [
              { key: 'name', label: 'Name' },
              { key: 'role', label: 'Role', renderAs: 'badge' },
              { key: 'department', label: 'Department' },
              { key: 'status', label: 'Status', renderAs: 'badge' }
            ],
            layout: { type: 'auto' }
          }
        }
      }
    }
  },
  {
    id: 'zone-layout-vertical',
    title: 'Zone Layout: Vertical Orientation + Centered Footer',
    description: 'header.layout.orientation = "vertical" stacks all zone sections top-to-bottom. The footer uses layout.titlePosition = "center" to center its label — demonstrating that layout options apply to both header and footer zones independently.',
    data: twoUsersData,
    config: {
      collapse: { initialState: 'fixed' },
      zones: {
        header: {
          title: 'Active Alerts',
          subtitle: '2 unresolved issues require attention',
          icon: { name: 'warning', size: 24, color: '#d97706' },
          layout: { orientation: 'vertical' },
          actions: [
            {
              id: 'resolve-all',
              label: 'Resolve All',
              icon: 'check',
              variant: 'primary',
              placement: 'pinned',
              onAction: (ctx: InteractionContext) => fireDemoAction({ actionId: 'resolve-all', actionLabel: 'Resolve All', source: 'action.onAction', data: ctx.data as Record<string, unknown>[], zone: ctx.zone })
            }
          ]
        },
        content: {
          mode: 'grid',
          item: {
            fields: [
              { key: 'name', label: 'Name' },
              { key: 'status', label: 'Status', renderAs: 'badge' },
              { key: 'department', label: 'Department' }
            ],
            layout: { type: 'auto' }
          }
        },
        footer: {
          title: 'Last updated: just now',
          layout: { orientation: 'vertical', titlePosition: 'center' }
        }
      }
    }
  },
  {
    id: 'pagination-grid',
    title: 'Pagination — Grid (5 per page)',
    description: 'ContentConfig.pagination: 20 items displayed 5 at a time with prev/next controls.',
    data: twentyUsersData as Entity[],
    config: {
      collapse: { initialState: 'expanded' },
      zones: {
        header: {
          title: 'Team Directory',
          subtitle: '20 members · 5 per page',
          icon: 'users',
        },
        content: {
          mode: 'grid',
          pagination: { pageSize: 5, initialPage: 1 },
          modeConfig: {
            columns: 3,
          },
          item: {
            fields: [
              { key: 'name', label: 'Name', renderAs: 'text' },
              { key: 'role', label: 'Role' },
              { key: 'status', label: 'Status', renderAs: 'badge' },
            ],
          },
        },
      },
    },
  },
  {
    id: 'pagination-table',
    title: 'Pagination — Table (4 per page)',
    description: 'Same data in table mode, 4 rows per page. More than 7 pages shows X / Y indicator.',
    data: twentyUsersData as Entity[],
    config: {
      collapse: { initialState: 'expanded' },
      zones: {
        header: {
          title: 'User Table',
          subtitle: '20 records · 4 per page',
          icon: 'table',
        },
        content: {
          mode: 'table',
          pagination: { pageSize: 4, initialPage: 1 },
          item: {
            fields: [
              { key: 'name', label: 'Name' },
              { key: 'role', label: 'Role' },
              { key: 'status', label: 'Status', renderAs: 'badge' },
              { key: 'department', label: 'Department' },
            ],
          },
        },
      },
    },
  },
  {
    id: 'responsive-mode-switching',
    title: 'Responsive Mode Switching',
    description: 'content.responsive.breakpoints switches the display mode per viewport: table on desktop → grid on tablet → carousel on mobile. Resize the window to see the mode change live.',
    data: twelveUsersData as Entity[],
    config: {
      collapse: { initialState: 'expanded' },
      zones: {
        header: {
          title: 'Responsive View',
          subtitle: 'Desktop: table · Tablet: grid · Mobile: carousel',
          icon: 'table',
        },
        content: {
          mode: 'table',
          responsive: {
            breakpoints: {
              tablet: { mode: 'grid' },
              mobile: { mode: 'carousel' },
            },
          },
          item: {
            fields: [
              { key: 'name', label: 'Name' },
              { key: 'role', label: 'Role' },
              { key: 'status', label: 'Status', renderAs: 'badge' },
              { key: 'department', label: 'Department' },
            ],
          },
        },
      },
    },
  },
  {
    id: 'search-grid',
    title: 'Search — Grid (live filter)',
    description: 'content.search enables a debounced search bar that filters all string fields client-side. Try searching by name, role, or department.',
    data: twentyUsersData as Entity[],
    config: {
      collapse: { initialState: 'expanded' },
      zones: {
        header: {
          title: 'Team Directory',
          subtitle: 'Type to filter 20 members',
          icon: 'users',
        },
        content: {
          mode: 'grid',
          search: { placeholder: 'Search by name, role…' },
          item: {
            fields: [
              { key: 'name', label: 'Name', renderAs: 'text' },
              { key: 'role', label: 'Role' },
              { key: 'status', label: 'Status', renderAs: 'badge' },
              { key: 'department', label: 'Department' },
            ],
          },
        },
      },
    },
  },
  {
    id: 'search-with-pagination',
    title: 'Search + Pagination combined',
    description: 'Search filters the full dataset first, then pagination slices the filtered results. Page resets to 1 on each new query.',
    data: twentyUsersData as Entity[],
    config: {
      collapse: { initialState: 'expanded' },
      zones: {
        header: {
          title: 'User Directory',
          subtitle: 'Search then page through results',
          icon: 'table',
        },
        content: {
          mode: 'table',
          search: { placeholder: 'Search members…' },
          pagination: { pageSize: 5 },
          item: {
            fields: [
              { key: 'name', label: 'Name' },
              { key: 'role', label: 'Role' },
              { key: 'status', label: 'Status', renderAs: 'badge' },
              { key: 'department', label: 'Department' },
            ],
          },
        },
      },
    },
  },
  {
    id: 'board-basic',
    title: 'Board — Columns by field value',
    description: 'Kanban board grouping items by status. Columns are driven by item.status — no filter functions required.',
    data: twentyUsersData as Entity[],
    config: {
      containerFrame: { shadow: 'none' },
      collapse: { initialState: 'expanded' },
      zones: {
        header: {
          title: 'Team Status Board',
          subtitle: 'Columns driven by item.status — WIP limits on Active & Pending',
          icon: 'table',
        },
        content: {
          mode: 'board',
          themeOverrides: {
            padding: '1rem'
          },
          modeConfig: {
            board: {
              columns: {
                field: 'status',
                items: [
                  { id: 'active',   label: 'Active',   color: '#28a745', wipLimit: 8 },
                  { id: 'pending',  label: 'Pending',  color: '#fd7e14', wipLimit: 4 },
                  { id: 'inactive', label: 'Inactive', color: '#6c757d' },
                ]
              },
              dragEnabled: true,
            },
          },
          gestures: [
            {
              type: 'item-drop',
              enabled: true,
              interactionId: 'board-drop',
              interactionLabel: 'Board Drop'
            }
          ],
          item: {
            fields: [
              { key: 'name',       label: 'Name',       type: 'text' as const },
              { key: 'role',       label: 'Role' },
              { key: 'department', label: 'Department' },
            ],
            layout: { type: 'auto' as const },
          },
        },
      },
    },
  },
  {
    id: 'board-swimlanes',
    title: 'Board — Columns × Swimlane rows',
    description: 'Status columns crossed with department swimlane rows. Each cell shows items matching both column value (status) and row value (department).',
    data: twentyUsersData as Entity[],
    config: {
      collapse: { initialState: 'expanded' },
      zones: {
        header: {
          title: 'Team Board by Dept',
          subtitle: 'Columns = status · Rows = department',
          icon: 'table',
        },
        content: {
          mode: 'board',
          modeConfig: {
            board: {
              columns: {
                field: 'status',
                items: [
                  { id: 'active',   label: 'Active',   color: '#28a745' },
                  { id: 'pending',  label: 'Pending',  color: '#fd7e14' },
                  { id: 'inactive', label: 'Inactive', color: '#6c757d' },
                ]
              },
              swimlanes: {
                field: 'department',
                items: [
                  { id: 'eng',  label: 'Engineering', value: 'Engineering' },
                  { id: 'des',  label: 'Design',      value: 'Design' },
                  { id: 'bus',  label: 'Business',    value: 'Business' },
                ]
              },
              dragEnabled: true,
            },
          },
          gestures: [
            {
              type: 'item-drop',
              enabled: true,
              interactionId: 'board-drop',
              interactionLabel: 'Board Drop'
            }
          ],
          item: {
            fields: [
              { key: 'name', label: 'Name', type: 'text' as const },
              { key: 'role', label: 'Role' },
            ],
            layout: { type: 'auto' as const },
          },
        },
      },
    },
  },

  // ── NEW: Config Root Options ─────────────────────────────────────────────
  {
    id: 'config-root-options',
    title: 'Config Root Options',
    description: 'WidgemoConfig.collapse (initially collapsed, click header to expand), .style (inline border/radius), .preRender hook. ZoneConfig.style and .className on footer.',
    data: fourUsersData as Entity[],
    config: {
      id: 'config-root-options',
      collapse: { initialState: 'collapsed' },
      style: { border: '2px solid #6610f2', borderRadius: '12px' },
      preRender: () => {},
      zones: {
        header: {
          title: 'Collapsible Widget',
          subtitle: 'Click the header chevron to expand',
          icon: { name: 'users', size: 24, color: '#6610f2' },
          style: { background: 'linear-gradient(135deg, #f3e5ff 0%, #e8d5ff 100%)' },
        },
        content: {
          mode: 'table',
          item: {
            fields: [
              { key: 'name', label: 'Name' },
              { key: 'role', label: 'Role' },
              { key: 'department', label: 'Department' },
            ],
            layout: { type: 'auto' },
          },
        },
        footer: {
          subtitle: 'Footer styled via zone.className + zone.style',
          className: 'text-center',
          style: { fontStyle: 'italic', padding: '0.75rem' },
        },
      },
    },
  },

  // ── NEW: Zone themeOverrides ──────────────────────────────────────────────
  {
    id: 'zone-theme-overrides',
    title: 'Zone themeOverrides',
    description: 'ZoneConfig.themeOverrides applied fully: titleFontSize, titleColor, subtitleColor, backgroundColor, borderColor, borderWidth, borderStyle, borderRadius, padding, iconColor, iconSize.',
    data: threeUsersData as Entity[],
    config: {
      id: 'zone-theme-overrides',
      collapse: { initialState: 'expanded' },
      zones: {
        header: {
          title: 'Custom Styled Zone',
          subtitle: 'via themeOverrides on ZoneConfig',
          icon: { name: 'chart', size: 28 },
          themeOverrides: {
            titleFontSize: '1.4rem',
            titleColor: '#ffffff',
            subtitleColor: '#e0d0ff',
            backgroundColor: '#4f46e5',
            borderColor: '#3730a3',
            borderWidth: '2px',
            borderStyle: 'solid',
            borderRadius: '8px 8px 0 0',
            padding: '1.25rem',
            iconColor: '#ffffff',
            iconSize: 22,
          },
        },
        content: {
          mode: 'grid',
          item: {
            fields: [
              { key: 'name', label: 'Name' },
              { key: 'role', label: 'Role', renderAs: 'badge' },
              { key: 'department', label: 'Department' },
            ],
            layout: { type: 'auto' },
          },
        },
        footer: {
          subtitle: 'Footer uses themeOverrides too',
          themeOverrides: {
            backgroundColor: '#eef2ff',
            borderColor: '#c7d2fe',
            borderWidth: '1px',
            borderStyle: 'solid',
            borderRadius: '0 0 8px 8px',
            padding: '0.75rem 1.25rem',
            subtitleColor: '#4f46e5',
          },
        },
      },
    },
  },

  // ── NEW: Zone Collapse, enabled=false, customSections ────────────────────
  {
    id: 'zone-collapse-options',
    title: 'Zone Collapse & enabled',
    description: 'ZoneConfig.collapse: header starts collapsed (button=true), footer has collapse.button=false. ZoneConfig.enabled=false hides a zone entirely. ZoneConfig.customSections adds arbitrary React nodes.',
    data: fourUsersData as Entity[],
    config: {
      id: 'zone-collapse-options',
      collapse: { initialState: 'collapsed' },
      zones: {
        header: {
          title: 'Collapsible Header Zone',
          subtitle: 'Starts collapsed — click arrow to expand',
          icon: { name: 'settings', size: 22 },
          collapse: { initialState: 'collapsed', button: true },
          customSections: [
            React.createElement('div', {
              key: 'banner',
              style: { padding: '0.5rem 1rem', background: '#fff3cd', borderRadius: '4px', fontSize: '0.85rem', marginTop: '0.5rem' },
            }, '⚠️ customSections: rendered via ZoneConfig.customSections[]'),
          ],
        },
        content: {
          mode: 'grid',
          item: {
            fields: [
              { key: 'name', label: 'Name' },
              { key: 'role', label: 'Role' },
            ],
            layout: { type: 'auto' },
          },
        },
        footer: {
          title: 'Fixed Footer (no collapse button)',
          subtitle: 'collapse.button=false hides the expand/collapse toggle',
          collapse: { initialState: 'expanded', button: false },
        },
      },
    },
  },

  // ── Zone Dynamic Title/Subtitle (function form) ──────────────────────────
  {
    id: 'zone-dynamic-renderers',
    title: 'Zone: dynamic title & subtitle',
    description: 'ZoneConfig.title and .subtitle accept a function (data, id?) => string that receives the live data array on every render. Use it to reflect counts or derived summaries without external state.',
    data: eightUsersData as Entity[],
    config: {
      id: 'zone-dynamic-renderers',
      collapse: { initialState: 'fixed' },
      zones: {
        header: {
          title: (data: Entity[]) => `Team Overview (${data.length} members)`,
          subtitle: (data: Entity[]) =>
            `Active: ${data.filter(d => d.status === 'active').length} · Inactive: ${data.filter(d => d.status === 'inactive').length} · Pending: ${data.filter(d => d.status === 'pending').length}`,
          icon: { name: 'users', size: 22, color: '#059669' },
          collapse: { initialState: 'fixed' },
          actions: [
            {
              id: 'export',
              label: 'Export',
              icon: 'download',
              placement: 'pinned' as const,
              onAction: (context: InteractionContext) => fireDemoAction({ actionId: 'export', actionLabel: 'Export', source: 'action.onAction', data: context.data as Record<string, unknown>[], zone: context.zone }),
            },
          ],
        },
        content: {
          mode: 'table',
          item: {
            fields: [
              { key: 'name', label: 'Name' },
              { key: 'status', label: 'Status', renderAs: 'badge' },
              { key: 'department', label: 'Department' },
            ],
            layout: { type: 'auto' },
          },
        },
      },
    },
  },

  // ── NEW: Zone Title as React.ReactNode ────────────────────────────────────
  {
    id: 'zone-title-node',
    title: 'Zone title/subtitle as ReactNode',
    description: 'ZoneConfig.title and .subtitle accept React.ReactNode — render rich JSX markup including badges, spans, or custom styling inline in zone headers.',
    data: threeUsersData as Entity[],
    config: {
      id: 'zone-title-node',
      collapse: { initialState: 'expanded' },
      zones: {
        header: {
          title: React.createElement('span', null,
            'Team Overview ',
            React.createElement('span', {
              style: { fontSize: '0.7em', background: '#dcfce7', color: '#059669', borderRadius: '6px', padding: '2px 8px', marginLeft: '8px', fontWeight: 'normal' }
            }, '● Live')
          ),
          subtitle: React.createElement('span', { style: { color: '#6c757d' } },
            'Showing ',
            React.createElement('strong', null, '3'),
            ' members · Updated just now'
          ),
          icon: { name: 'users', size: 22 },
        },
        content: {
          mode: 'table',
          item: {
            fields: [
              { key: 'name', label: 'Name' },
              { key: 'role', label: 'Role' },
              { key: 'status', label: 'Status', renderAs: 'badge' },
            ],
            layout: { type: 'auto' },
          },
        },
      },
    },
  },

  // ── NEW: Action Types: Dropdown, handler, visibleIf, pinned ──────────────
  {
    id: 'action-types-dropdown',
    title: 'Actions: placement API, handler, visibleIf',
    description: 'ActionConfig placement API: pinned / onHover / menu. ActionConfig.handler receives ActionContext. ActionConfig.visibleIf filters per entity. actionOverflow indicator="color-shift"/"none".',
    data: threeUsersData as Entity[],
    config: {
      id: 'action-types-dropdown',
      collapse: { initialState: 'expanded' },
      zones: {
        header: {
          title: 'Zone Actions Demo',
          subtitle: 'placement: pinned / menu · handler(ActionContext) · indicator="color-shift"',
          actions: [
            { id: 'create-user', label: 'New User', icon: 'user', placement: 'pinned' as const, onAction: (ctx: InteractionContext) => fireDemoAction({ actionId: 'create-user', actionLabel: 'New User', source: 'action.onAction', data: ctx.data as Record<string, unknown>[], zone: ctx.zone }) },
            { id: 'create-team', label: 'New Team', icon: 'users', placement: 'menu' as const, onAction: (ctx: InteractionContext) => fireDemoAction({ actionId: 'create-team', actionLabel: 'New Team', source: 'action.onAction', data: ctx.data as Record<string, unknown>[], zone: ctx.zone }) },
            { id: 'create-report', label: 'New Report', icon: 'chart', placement: 'menu' as const, onAction: (ctx: InteractionContext) => fireDemoAction({ actionId: 'create-report', actionLabel: 'New Report', source: 'action.onAction', data: ctx.data as Record<string, unknown>[], zone: ctx.zone }) },
            {
              id: 'export-all',
              label: 'Export All',
              icon: 'download',
              placement: 'pinned' as const,
              onAction: (ctx: InteractionContext) => fireDemoAction({ actionId: 'export-all', actionLabel: 'Export All', source: 'action.onAction', data: ctx.data as Record<string, unknown>[], zone: ctx.zone }),
            },
            {
              id: 'settings',
              label: 'Settings',
              icon: 'settings',
              placement: 'menu' as const,
              onAction: (ctx: InteractionContext) => fireDemoAction({ actionId: 'settings', actionLabel: 'Settings', source: 'action.onAction', data: ctx.data as Record<string, unknown>[], zone: ctx.zone }),
            },
          ],
          actionOverflow: {
            maxInline: { mobile: 1, tablet: 2, desktop: 3 },
            menuLabel: 'More',
            indicator: 'color-shift' as const,
          },
        },
        content: {
          mode: 'table',
          item: {
            fields: [
              { key: 'name', label: 'Name' },
              { key: 'role', label: 'Role' },
              { key: 'status', label: 'Status', renderAs: 'badge' },
            ],
            layout: { type: 'auto' },
          },
          itemActions: [
            { id: 'view', label: 'View', icon: 'view', placement: 'pinned' as const, onAction: (ctx: InteractionContext) => fireDemoAction({ actionId: 'view', actionLabel: 'View', source: 'action.onAction', entity: ctx.entity as Record<string, unknown> }) },
            { id: 'edit', label: 'Edit', icon: 'edit', placement: 'menu' as const, onAction: (ctx: InteractionContext) => fireDemoAction({ actionId: 'edit', actionLabel: 'Edit', source: 'action.onAction', entity: ctx.entity as Record<string, unknown> }) },
            {
              id: 'pinned-delete',
              label: 'Delete',
              icon: 'delete',
              placement: 'pinned' as const,
              visibleIf: (e: Entity) => e.status === 'active',
              onAction: (ctx: InteractionContext) => fireDemoAction({ actionId: 'pinned-delete', actionLabel: 'Delete', source: 'action.onAction', entity: ctx.entity as Record<string, unknown> }),
            },
          ],
          actionOverflow: { maxInline: 2, menuLabel: 'More', indicator: 'none' as const },
        },
      },
    },
  },

  // ── Actions: visibleIf — conditional per-row action visibility ───────────
  {
    id: 'action-visible-if',
    title: 'Actions: visibleIf (conditional visibility)',
    description: 'visibleIf: (entity) => boolean controls whether an action renders for a given row. "Deactivate" appears only for active users; "Activate" only for inactive/pending. Rows with different statuses show different action sets.',
    data: fiveUsersData as Entity[],
    config: {
      id: 'action-visible-if',
      collapse: { initialState: 'expanded' },
      zones: {
        header: {
          title: 'visibleIf Demo',
          subtitle: 'Each row shows only the action that matches its status',
        },
        content: {
          mode: 'table',
          item: {
            fields: [
              { key: 'name', label: 'Name' },
              { key: 'role', label: 'Role' },
              { key: 'status', label: 'Status', renderAs: 'badge' as const },
            ],
            layout: { type: 'auto' },
          },
          itemActions: [
            {
              id: 'deactivate',
              label: 'Deactivate',
              icon: 'close',
              placement: 'pinned' as const,
              visibleIf: (e: Entity) => e.status === 'active',
              onAction: (ctx: InteractionContext) => fireDemoAction({ actionId: 'deactivate', actionLabel: 'Deactivate', source: 'action.onAction', entity: ctx.entity as Record<string, unknown> }),
            },
            {
              id: 'activate',
              label: 'Activate',
              icon: 'refresh',
              placement: 'pinned' as const,
              visibleIf: (e: Entity) => e.status !== 'active',
              onAction: (ctx: InteractionContext) => fireDemoAction({ actionId: 'activate', actionLabel: 'Activate', source: 'action.onAction', entity: ctx.entity as Record<string, unknown> }),
            },
          ],
          actionOverflow: { maxInline: 1, menuLabel: 'More', indicator: 'none' as const },
        },
      },
    },
  },

  // ── Table Layout Options — item.fields with table-specific options ────────
  {
    id: 'table-layout-options',
    title: 'Table layout.table & item.fields',
    description: 'layout.table: alternatingRows, showHeader. item.fields (FieldConfig) is the unified config for all modes — use key/label, align, width, sortable on fields directly.',
    data: sixUsersData as Entity[],
    config: {
      id: 'table-layout-options',
      collapse: { initialState: 'expanded' },
      zones: {
        header: {
          title: 'Table Layout Options',
          subtitle: 'alternatingRows=true · item.fields with align, width, sortable',
          icon: { name: 'table', size: 22, color: '#0d6efd' },
        },
        content: {
          mode: 'table',
          layout: {
            table: {
              type: 'traditional',
              alternatingRows: true,
              showHeader: true,
            },
          },
          item: {
            fields: [
              { key: 'id', label: '#', width: '50px', align: 'center' as const },
              { key: 'name', label: 'Full Name', width: '180px', align: 'left' as const, sortable: true },
              { key: 'email', label: 'Email Address', type: 'email' as const, sortable: true },
              { key: 'department', label: 'Team', align: 'center' as const },
              { key: 'progress', label: 'Progress %', align: 'center' as const, renderAs: 'progress', renderAsOptions: { color: '#28a745', height: 8, showPercentage: true } },
              { key: 'amount', label: 'Salary', align: 'right' as const, renderAs: 'currency', renderAsOptions: { currency: 'USD', decimalAlign: true } },
            ],
            layout: { type: 'auto' },
          },
        },
      },
    },
  },

  // ── NEW: Field Types: boolean, swatch, formatter, condition, visible ─
  {
    id: 'field-boolean-swatch',
    title: 'Field: boolean, swatch, formatter, condition, visible',
    description: 'type="boolean" with booleanTrueLabel/booleanFalseLabel. type="swatch" renders a color dot. formatter transforms raw values. condition hides fields per-entity. visible=false removes entirely.',
    data: [
      { id: 1, name: 'Alice', isActive: true, isVerified: true, tierColor: '#ffd700', tier: 'Gold', score: 92 },
      { id: 2, name: 'Bob',   isActive: false, isVerified: true,  tierColor: '#c0c0c0', tier: 'Silver', score: 71 },
      { id: 3, name: 'Carol', isActive: true,  isVerified: false, tierColor: '#cd7f32', tier: 'Bronze', score: 55 },
      { id: 4, name: 'David', isActive: false, isVerified: false, tierColor: '#6c757d', tier: 'Basic', score: 38 },
    ] as Entity[],
    config: {
      id: 'field-boolean-swatch',
      collapse: { initialState: 'expanded' },
      zones: {
        header: { title: 'Boolean, Swatch & Field Options', subtitle: 'booleanTrueLabel · swatch type · formatter · condition · visible=false' },
        content: {
          mode: 'table',
          item: {
            fields: [
              { key: 'name', label: 'Name' },
              // type='boolean' with custom labels
              { key: 'isActive', label: 'Active', type: 'boolean' as const, booleanTrueLabel: '✓ Active', booleanFalseLabel: '✗ Inactive' },
              { key: 'isVerified', label: 'Verified', type: 'boolean' as const, booleanTrueLabel: 'Verified', booleanFalseLabel: 'Unverified', align: 'center' as const },
              // type='swatch' renders a color dot from the hex value
              { key: 'tierColor', label: 'Tier Color', type: 'swatch' as const },
              // formatter transforms the raw value
              { key: 'score', label: 'Score', formatter: (val: unknown) => `${val} pts` },
              // condition: only show tier for high scorers
              { key: 'tier', label: 'Tier (score≥70 only)', renderAs: 'badge', condition: (entity: Entity) => (entity.score as number) >= 70 },
              // visible=false — completely suppressed
              { key: 'id', label: 'ID (hidden)', visible: false },
            ],
            layout: { type: 'auto' },
          },
        },
      },
    },
  },

  // ── NEW: Field span in grid field layout ─────────────────────────────────
  {
    id: 'field-span-grid-layout',
    title: 'Field: span (grid field layout)',
    description: 'FieldConfig.span stretches selected fields across multiple columns when item.layout.type="grid".',
    data: [
      {
        id: 1,
        name: 'Aurora Chen',
        role: 'Design Lead',
        team: 'Design Systems',
        summary: 'Leads cross-functional design initiatives and drives consistency across product surfaces.',
      },
      {
        id: 2,
        name: 'Mateo Silva',
        role: 'Platform Engineer',
        team: 'Core Platform',
        summary: 'Owns platform reliability and performance guardrails for internal developer tooling.',
      },
    ] as Entity[],
    config: {
      id: 'field-span-grid-layout',
      collapse: { initialState: 'expanded' },
      zones: {
        header: {
          title: 'Field span with layout.grid',
          subtitle: 'summary uses span: 2 in a two-column field grid',
        },
        content: {
          mode: 'grid',
          modeConfig: {
            grid: {
              minItemWidth: '320px',
              gap: '0.75rem',
            },
          },
          item: {
            fields: [
              { key: 'name', label: 'Name' },
              { key: 'role', label: 'Role' },
              { key: 'team', label: 'Team' },
              { key: 'summary', label: 'Summary', span: 2, wrap: true },
            ],
            layout: {
              type: 'grid',
              grid: {
                columns: 'repeat(2, minmax(0, 1fr))',
                gap: '0.5rem 0.75rem',
              },
            },
          },
        },
      },
    },
  },

  // ── NEW: renderAs: link — renderAsOptions ─────────────────────────────────
  {
    id: 'renderas-link',
    title: 'renderAs: link — renderAsOptions',
    description: 'renderAs="link" with renderAsOptions: text (static), text (function), url (function), newTab, and externalWarning.',
    data: [
      { id: 1, name: 'GitHub',    url: 'https://github.com',           username: 'alice', docUrl: 'https://github.com' },
      { id: 2, name: 'Docs',      url: 'https://docs.example.com',    username: 'bob',   docUrl: 'https://docs.example.com' },
      { id: 3, name: 'Dashboard', url: 'https://app.example.com',     username: 'carol', docUrl: 'https://app.example.com' },
    ] as Entity[],
    config: {
      id: 'renderas-link',
      collapse: { initialState: 'expanded' },
      zones: {
        header: { title: 'Link Field Rendering', subtitle: 'renderAsOptions: static text · dynamic text fn · dynamic url fn · newTab · externalWarning' },
        content: {
          mode: 'table',
          item: {
            fields: [
              { key: 'name', label: 'Resource' },
              // Static custom text
              { key: 'url', label: 'Static Text', renderAs: 'link', renderAsOptions: { text: 'Open →', newTab: true } },
              // Dynamic text & url from entity
              { key: 'username', label: 'Dynamic URL', renderAs: 'link', renderAsOptions: {
                url: (entity: Entity) => `https://github.com/${entity.username}`,
                text: (entity: Entity) => `@${entity.username}`,
                newTab: true,
              }},
              { key: 'docUrl', label: 'External Warning', renderAs: 'link', renderAsOptions: { newTab: true, externalWarning: true } },
            ],
            layout: { type: 'auto' },
          },
        },
      },
    },
  },

  // ── NEW: renderAs: badge — icon & iconPosition variants ──────────────────
  {
    id: 'renderas-badge-advanced',
    title: 'renderAs: badge — icons, style, size',
    description: 'Badge colorMap with icon+iconPosition: "left", "right", "only". Badge style "inline" vs "badge". Badge size "sm", "md", "lg". Dynamic colorMap via function.',
    data: [
      { id: 1, name: 'Alice', priority: 'high',   status: 'active',   tier: 'gold',   segment: 'engineering' },
      { id: 2, name: 'Bob',   priority: 'medium', status: 'pending',  tier: 'silver', segment: 'operations' },
      { id: 3, name: 'Carol', priority: 'low',    status: 'inactive', tier: 'bronze', segment: 'support' },
      { id: 4, name: 'David', priority: 'high',   status: 'active',   tier: 'gold',   segment: 'platform' },
    ] as Entity[],
    config: {
      id: 'renderas-badge-advanced',
      collapse: { initialState: 'expanded' },
      zones: {
        header: { title: 'Badge Rendering Options', subtitle: 'iconPosition: left · right · only · style: inline · size: sm/md/lg' },
        content: {
          mode: 'table',
          item: {
            fields: [
              { key: 'name', label: 'Name' },
              // icon left, size sm
              { key: 'priority', label: 'Priority (icon left, sm)', renderAs: 'badge', renderAsOptions: {
                colorMap: {
                  high:   { background: '#dc3545', text: '#fff', icon: 'warning', iconPosition: 'left' },
                  medium: { background: '#fd7e14', text: '#fff', icon: 'warning', iconPosition: 'left' },
                  low:    { background: '#28a745', text: '#fff', icon: 'check',   iconPosition: 'left' },
                },
                size: 'sm',
              }},
              // icon only, size lg
              { key: 'status', label: 'Status (icon only, lg)', renderAs: 'badge', renderAsOptions: {
                colorMap: {
                  active:   { background: '#28a745', text: '#fff', icon: 'check', iconPosition: 'only' },
                  pending:  { background: '#ffc107', text: '#333', icon: 'clock', iconPosition: 'only' },
                  inactive: { background: '#6c757d', text: '#fff', icon: 'close', iconPosition: 'only' },
                },
                size: 'lg',
              }},
              // className adds an app-specific CSS hook to the rendered badge
              { key: 'segment', label: 'Segment (className hook)', renderAs: 'badge', renderAsOptions: {
                colorMap: {
                  engineering: { background: '#0d6efd', text: '#fff' },
                  operations:   { background: '#6f42c1', text: '#fff' },
                  support:      { background: '#198754', text: '#fff' },
                  platform:     { background: '#20c997', text: '#053c33' },
                },
                className: 'demo-badge-emphasis',
                size: 'md',
              }},
              // style inline + icon right, size md
              { key: 'tier', label: 'Tier (inline, icon right)', renderAs: 'badge', renderAsOptions: {
                colorMap: {
                  gold:   { color: '#b8860b', icon: 'star', iconPosition: 'right' },
                  silver: { color: '#708090', icon: 'star', iconPosition: 'right' },
                  bronze: { color: '#cd7f32', icon: 'star', iconPosition: 'right' },
                },
                style: 'inline',
                size: 'md',
              }},
            ],
            layout: { type: 'auto' },
          },
        },
      },
    },
  },

  // ── NEW: renderAs: progress & rating — all options ───────────────────────
  {
    id: 'renderAs-progress-rating',
    title: 'renderAs: progress & rating — options',
    description: 'Progress: dynamic color fn, height, showPercentage, backgroundColor. Rating: max, size, color, emptyColor, custom icon name.',
    data: [
      { id: 1, name: 'Alice', progress: 85, effort: 30, rating: 4.5, satisfaction: 3 },
      { id: 2, name: 'Bob',   progress: 92, effort: 75, rating: 4.8, satisfaction: 5 },
      { id: 3, name: 'Carol', progress: 45, effort: 55, rating: 3.2, satisfaction: 2 },
      { id: 4, name: 'David', progress: 78, effort: 90, rating: 4.0, satisfaction: 4 },
    ] as Entity[],
    config: {
      id: 'renderAs-progress-rating',
      collapse: { initialState: 'expanded' },
      zones: {
        header: { title: 'Progress & Rating Fields', subtitle: 'Dynamic color fn · custom height · showPercentage · max · emptyColor · custom icon' },
        content: {
          mode: 'table',
          item: {
            fields: [
              { key: 'name', label: 'Name' },
              // Progress with dynamic color function
              { key: 'progress', label: 'Progress (colored)', renderAs: 'progress', renderAsOptions: {
                color: (entity: Entity) => (entity.progress as number) >= 80 ? '#28a745' : (entity.progress as number) >= 50 ? '#ffc107' : '#dc3545',
                backgroundColor: '#e9ecef',
                height: 12,
                showPercentage: true,
              }},
              // Thin bar, no percentage label
              { key: 'effort', label: 'Effort (thin, no %)', renderAs: 'progress', renderAsOptions: {
                color: '#0d6efd',
                height: 4,
                showPercentage: false,
              }},
              // Rating default 5 stars
              { key: 'rating', label: 'Rating (★, gold)', renderAs: 'rating', renderAsOptions: {
                max: 5,
                color: '#ffd700',
                emptyColor: '#dee2e6',
                size: 18,
              }},
              // Rating with heart icon
              { key: 'satisfaction', label: 'Satisfaction (♥, 5)', renderAs: 'rating', renderAsOptions: {
                max: 5,
                icon: 'heart',
                color: '#e91e63',
                emptyColor: '#f8bbd0',
                size: 20,
              }},
            ],
            layout: { type: 'auto' },
          },
        },
      },
    },
  },

  // ── NEW: renderAs: currency — advanced options ────────────────────────────
  {
    id: 'currency-advanced',
    title: 'renderAs: currency — advanced options',
    description: 'compact notation, colorize (pos/neg/zero colors), negativeFormat="parentheses", decimalAlign, locale (de-DE), minimumFractionDigits, symbolPosition.',
    data: [
      { id: 1, name: 'Revenue Q1', amount: 1850000,    balance: 12345.67,  expense: -4250    },
      { id: 2, name: 'Revenue Q2', amount: 2350000,    balance: -8901.23,  expense: -1234567 },
      { id: 3, name: 'Revenue Q3', amount: 750000,     balance: 45678.00,  expense: 0        },
      { id: 4, name: 'Revenue Q4', amount: 12750000,   balance: -123456.78, expense: -750    },
    ] as Entity[],
    config: {
      id: 'currency-advanced',
      collapse: { initialState: 'expanded' },
      zones: {
        header: { title: 'Currency Formatting Options', subtitle: 'compact · colorize · negativeFormat=parentheses · decimalAlign · locale=de-DE' },
        content: {
          mode: 'table',
          item: {
            fields: [
              { key: 'name', label: 'Period' },
              // Compact notation (1.85M)
              { key: 'amount', label: 'Amount (compact)', renderAs: 'currency', renderAsOptions: {
                currency: 'USD',
                compact: true,
                compactThreshold: 1000,
              }},
              // Colorize + decimalAlign
              { key: 'balance', label: 'Balance (colorized)', renderAs: 'currency', renderAsOptions: {
                currency: 'USD',
                colorize: true,
                positiveColor: '#28a745',
                negativeColor: '#dc3545',
                zeroColor: '#6c757d',
                decimalAlign: true,
              }},
              // Parentheses for negatives, 0 decimals, EUR locale
              { key: 'expense', label: 'Expense (parens, €, de-DE)', renderAs: 'currency', renderAsOptions: {
                currency: 'EUR',
                locale: 'de-DE',
                negativeFormat: 'parentheses',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }},
            ],
            layout: { type: 'auto' },
          },
        },
      },
    },
  },

  // ── NEW: renderAs: compositionBar — compact table + summary cards ──────
  {
    id: 'renderas-composition-bar-compact-table',
    title: 'renderAs: compositionBar — compact table',
    description: 'Compact table-style composition bars with legend suppressed. Demonstrates default compositionBar visuals (segmented style + per-segment corner rounding).',
    data: [
      {
        id: 1,
        stream: 'Paid Media',
        allocation: {
          segments: [
            { label: 'Search', value: 46, color: '#2f80ed' },
            { label: 'Social', value: 34, color: '#27ae60' },
            { label: 'Display', value: 20, color: '#f2994a' },
          ],
        },
      },
      {
        id: 2,
        stream: 'Lifecycle',
        allocation: {
          segments: [
            { label: 'Email', value: 58, color: '#6c5ce7' },
            { label: 'In-app', value: 24, color: '#00b894' },
            { label: 'SMS', value: 18, color: '#fdcb6e' },
          ],
        },
      },
      {
        id: 3,
        stream: 'Sales Enablement',
        allocation: {
          segments: [
            { label: 'Demos', value: 41, color: '#0984e3' },
            { label: 'POCs', value: 37, color: '#00cec9' },
            { label: 'Follow-up', value: 22, color: '#fab1a0' },
          ],
        },
      },
    ] as Entity[],
    config: {
      id: 'renderas-composition-bar-compact-table',
      collapse: { initialState: 'expanded' },
      zones: {
        header: {
          title: 'Composition Bar (Compact Table)',
          subtitle: 'defaults: style=segmented · cornerScope=segment · legend=none · compact barHeight',
        },
        content: {
          mode: 'table',
          item: {
            fields: [
              { key: 'stream', label: 'Workstream' },
              {
                key: 'allocation',
                label: 'Channel Mix',
                renderAs: 'compositionBar',
                width: '320px',
                renderAsOptions: {
                  legend: 'none',
                  percentages: true,
                  totals: false,
                  barHeight: 8,
                  gap: '0.25rem',
                },
              },
            ],
            layout: { type: 'auto' },
          },
        },
        footer: {
          subtitle: 'Expected: each segment shows labeled inline legend rows with value + percentage.',
        },
      },
    },
  },

  {
    id: 'renderas-composition-bar-grid-summary',
    title: 'renderAs: compositionBar — grid summary cards',
    description: 'Card/grid summary usage showing continuous style with band-level corners for a smooth single-track look.',
    data: [
      {
        id: 1,
        portfolio: 'Enterprise Pipeline',
        owner: 'Revenue Ops',
        summaryMix: {
          segments: [
            { label: 'Committed', value: 340, color: '#16a085' },
            { label: 'Best Case', value: 120, color: '#f39c12' },
            { label: 'At Risk', value: 40, color: '#e74c3c' },
          ],
        },
      },
      {
        id: 2,
        portfolio: 'Product Adoption',
        owner: 'Growth',
        summaryMix: {
          segments: [
            { label: 'Activated', value: 510, color: '#2980b9' },
            { label: 'Trialing', value: 140, color: '#8e44ad' },
            { label: 'Dormant', value: 70, color: '#c0392b' },
          ],
        },
      },
      {
        id: 3,
        portfolio: 'Support Load',
        owner: 'CX',
        summaryMix: {
          segments: [
            { label: 'Resolved', value: 780, color: '#27ae60' },
            { label: 'In Review', value: 210, color: '#f1c40f' },
            { label: 'Escalated', value: 55, color: '#d35400' },
          ],
        },
      },
    ] as Entity[],
    config: {
      id: 'renderas-composition-bar-grid-summary',
      collapse: { initialState: 'expanded' },
      zones: {
        header: {
          title: 'Composition Bar (Grid Summary Cards)',
          subtitle: 'style=continuous · cornerScope=track · mode="grid" · inline legend · totals=true',
        },
        content: {
          mode: 'grid',
          modeConfig: {
            grid: {
              minItemWidth: '300px',
              gap: '0.9rem',
            },
          },
          item: {
            fields: [
              { key: 'portfolio', label: 'Portfolio' },
              { key: 'owner', label: 'Owner', renderAs: 'badge' },
              {
                key: 'summaryMix',
                label: 'Composition Snapshot',
                renderAs: 'compositionBar',
                renderAsOptions: {
                  style: 'continuous',
                  cornerScope: 'track',
                  cornerRadius: '999px',
                  legend: 'inline',
                  percentages: false,
                  totals: true,
                  barHeight: 12,
                  gap: '0.4rem',
                },
              },
            ],
            layout: { type: 'auto' },
          },
        },
        footer: {
          subtitle: 'Expected: legend stays inline while totals row summarizes each card composition.',
        },
      },
    },
  },

  {
    id: 'renderas-composition-bar-palette-numeric-table',
    title: 'renderAs: compositionBar — palette + numeric array + fixed total',
    description: 'Shows numeric-array field input with custom palette plus segmented style tuning (`segmentGap`, `cornerRadius`, `cornerScope`).',
    data: [
      { id: 1, team: 'Acquisition', workload: [44, 26, 18, 12] },
      { id: 2, team: 'Lifecycle', workload: [39, 31, 17, 13] },
      { id: 3, team: 'Retention', workload: [47, 22, 20, 11] },
    ] as Entity[],
    config: {
      id: 'renderas-composition-bar-palette-numeric-table',
      collapse: { initialState: 'expanded' },
      zones: {
        header: {
          title: 'Composition Bar (Palette + Numeric Arrays)',
          subtitle: 'style=segmented · cornerScope=both · cornerRadius=7px · segmentGap=4px',
        },
        content: {
          mode: 'table',
          item: {
            fields: [
              { key: 'team', label: 'Team' },
              {
                key: 'workload',
                label: 'Workload Split',
                renderAs: 'compositionBar',
                renderAsOptions: {
                  style: 'segmented',
                  cornerScope: 'both',
                  cornerRadius: '7px',
                  segmentGap: '4px',
                  legend: 'inline',
                  percentages: true,
                  totals: true,
                  total: 120,
                  palette: ['#2563eb', '#22c55e', '#f59e0b', '#ef4444'],
                  barHeight: '10px',
                  gap: 6,
                },
              },
            ],
            layout: { type: 'auto' },
          },
        },
      },
    },
  },

  {
    id: 'renderas-composition-bar-callback-segments-total-callback',
    title: 'renderAs: compositionBar — segments callback + total callback',
    description: 'Shows callback-driven segment generation from entity fields plus callback total override, with square segmented blocks (no corner rounding).',
    data: [
      { id: 1, portfolio: 'North America', cash: 220, equity: 540, debt: 140, hedge: 100, portfolioTotal: 1200 },
      { id: 2, portfolio: 'EMEA', cash: 180, equity: 410, debt: 220, hedge: 90, portfolioTotal: 1100 },
      { id: 3, portfolio: 'APAC', cash: 140, equity: 360, debt: 160, hedge: 80, portfolioTotal: 900 },
    ] as Entity[],
    config: {
      id: 'renderas-composition-bar-callback-segments-total-callback',
      collapse: { initialState: 'expanded' },
      zones: {
        header: {
          title: 'Composition Bar (Segments Callback)',
          subtitle: 'segments(entity)=>[] · total(entity)=>number · style=segmented · cornerScope=none',
        },
        content: {
          mode: 'grid',
          modeConfig: { grid: { minItemWidth: '320px', gap: '0.9rem' } },
          item: {
            fields: [
              { key: 'portfolio', label: 'Portfolio' },
              {
                key: 'portfolio',
                label: 'Derived Mix',
                renderAs: 'compositionBar',
                renderAsOptions: {
                  style: 'segmented',
                  cornerScope: 'none',
                  segmentGap: '5px',
                  legend: 'inline',
                  percentages: true,
                  totals: true,
                  total: (entity: Entity) => Number((entity as { portfolioTotal?: number }).portfolioTotal ?? 0),
                  segments: (entity: Entity) => {
                    const row = entity as { cash?: number; equity?: number; debt?: number; hedge?: number };
                    return [
                      { label: 'Cash', value: row.cash ?? 0, color: '#10b981' },
                      { label: 'Equity', value: row.equity ?? 0, color: '#3b82f6' },
                      { label: 'Debt', value: row.debt ?? 0, color: '#f59e0b' },
                      { label: 'Hedge', value: row.hedge ?? 0, color: '#8b5cf6' },
                    ];
                  },
                  barHeight: 14,
                  gap: '0.5rem',
                },
              },
            ],
            layout: { type: 'auto' },
          },
        },
      },
    },
  },

  {
    id: 'renderas-composition-bar-segmentcolors-object-input',
    title: 'renderAs: compositionBar — object segments + segmentColors alias',
    description: 'Shows field value object with heterogeneous segment keys and segmentColors alias usage, with compact segmented chips.',
    data: [
      {
        id: 1,
        stream: 'Platform',
        objectMix: { segments: [
          { name: 'Core', amount: 48 },
          { key: 'Integrations', total: '31' },
          { label: 'Support', value: 21 },
        ] },
      },
      {
        id: 2,
        stream: 'Product',
        objectMix: { segments: [
          { name: 'Discovery', amount: 36 },
          { key: 'Delivery', total: '44' },
          { label: 'Ops', value: 20 },
        ] },
      },
    ] as Entity[],
    config: {
      id: 'renderas-composition-bar-segmentcolors-object-input',
      collapse: { initialState: 'expanded' },
      zones: {
        header: {
          title: 'Composition Bar (segmentColors Alias + Object Input)',
          subtitle: 'segmentColors alias · object value input · style=segmented · cornerRadius=5px',
        },
        content: {
          mode: 'table',
          item: {
            fields: [
              { key: 'stream', label: 'Stream' },
              {
                key: 'objectMix',
                label: 'Object Segment Input',
                renderAs: 'compositionBar',
                renderAsOptions: {
                  style: 'segmented',
                  cornerScope: 'segment',
                  cornerRadius: '5px',
                  segmentGap: 3,
                  legend: 'inline',
                  percentages: false,
                  totals: false,
                  segmentColors: ['#0ea5e9', '#14b8a6', '#f97316'],
                  barHeight: '11px',
                  gap: '0.3rem',
                },
              },
            ],
            layout: { type: 'auto' },
          },
        },
      },
    },
  },

  {
    id: 'renderas-composition-bar-static-segments-option',
    title: 'renderAs: compositionBar — static segments option',
    description: 'Shows static segment array configured directly in renderAsOptions.segments, rendered as continuous with rounded band + segment edges.',
    data: [
      { id: 1, scenario: 'Baseline' },
      { id: 2, scenario: 'Optimistic' },
      { id: 3, scenario: 'Conservative' },
    ] as Entity[],
    config: {
      id: 'renderas-composition-bar-static-segments-option',
      collapse: { initialState: 'expanded' },
      zones: {
        header: {
          title: 'Composition Bar (Static Segments in Options)',
          subtitle: 'segments=[...] in options · style=continuous · cornerScope=both · totals=true',
        },
        content: {
          mode: 'table',
          item: {
            fields: [
              { key: 'scenario', label: 'Scenario' },
              {
                key: 'scenario',
                label: 'Static Mix',
                renderAs: 'compositionBar',
                renderAsOptions: {
                  style: 'continuous',
                  cornerScope: 'both',
                  cornerRadius: '10px',
                  legend: 'none',
                  percentages: false,
                  totals: true,
                  total: 100,
                  segments: [
                    { label: 'A', value: 45, color: '#2563eb' },
                    { label: 'B', value: 35, color: '#22c55e' },
                    { label: 'C', value: 20, color: '#f59e0b' },
                  ],
                  barHeight: 6,
                  gap: 2,
                },
              },
            ],
            layout: { type: 'auto' },
          },
        },
      },
    },
  },

  // ── NEW: Image Field — all imageOptions ──────────────────────────────────
  {
    id: 'image-advanced',
    title: 'Image Field — all imageOptions',
    description: 'imageOptions: objectFit (cover/contain/scale-down), circular, borderRadius, border, shadow, backgroundColor, lightbox, lazy. Table with multiple image columns for comparison.',
    data: fourUsersData.map(u => ({ ...u, srcCover: u.src, srcCircular: u.src, srcContain: u.src, srcScale: u.src })) as Entity[],
    config: {
      id: 'image-advanced',
      collapse: { initialState: 'expanded' },
      zones: {
        header: { title: 'Image Field Options', subtitle: 'objectFit · circular · border · shadow · lightbox · lazy' },
        content: {
          mode: 'table',
          item: {
            fields: [
              { key: 'name', label: 'Name' },
              // Cover fit + lightbox + shadow + lazy
              { key: 'srcCover', label: 'Cover + Lightbox', type: 'image' as const, imageOptions: {
                objectFit: 'cover' as const,
                width: 60, height: 60,
                lightbox: true,
                shadow: '0 2px 8px rgba(0,0,0,0.2)',
                lazy: true,
              }},
              // Circular + border
              { key: 'srcCircular', label: 'Circular + border', type: 'image' as const, imageOptions: {
                circular: true,
                width: 50, height: 50,
                border: '2px solid #0d6efd',
              }},
              // Contain + background + borderRadius
              { key: 'srcContain', label: 'Contain + BG', type: 'image' as const, imageOptions: {
                objectFit: 'contain' as const,
                width: 60, height: 60,
                borderRadius: '8px',
                backgroundColor: '#f0f2f5',
              }},
              // Scale-down
              { key: 'srcScale', label: 'Scale-down', type: 'image' as const, imageOptions: {
                objectFit: 'scale-down' as const,
                width: 60, height: 60,
                borderRadius: 4,
                alt: 'User profile photo',
              }},
            ],
            layout: { type: 'auto' },
          },
        },
      },
    },
  },

  // ── NEW: Item conditionalBorder, conditionalBackgroundColor, cardOptions ──
  {
    id: 'item-conditionals-and-card',
    title: 'Item: conditionalBorder, conditionalBackground, cardOptions',
    description: 'ItemConfig.conditionalBorder adds colored left borders by status. conditionalBackgroundColor highlights active cards. cardOptions applies base card appearance globally.',
    data: sixUsersData as Entity[],
    config: {
      id: 'item-conditionals-and-card',
      collapse: { initialState: 'expanded' },
      zones: {
        header: { title: 'Conditional Item Styling', subtitle: 'conditionalBorder by status · conditionalBackgroundColor · cardOptions base styling' },
        content: {
          mode: 'grid',
          modeConfig: { grid: { maxColumns: 3, gap: '1rem' } },
          item: {
            fields: [
              { key: 'name', label: 'Name' },
              { key: 'status', label: 'Status', renderAs: 'badge' },
              { key: 'role', label: 'Role' },
            ],
            layout: { type: 'auto' },
            conditionalBorder: (entity: Entity) => {
              if (entity.status === 'active')   return { color: '#28a745', thickness: 3, placement: 'left' };
              if (entity.status === 'pending')  return { color: '#ffc107', thickness: 3, placement: 'left' };
              if (entity.status === 'inactive') return { color: '#dc3545', thickness: 3, placement: 'left' };
              return null;
            },
            conditionalBackgroundColor: (entity: Entity) => {
              if (entity.status === 'active') return { backgroundColor: '#f0fff4', color: '#212529' };
              return undefined;
            },
            cardOptions: {
              border: true,
              borderStyle: 'solid',
              borderWidth: '1px',
              borderColor: '#dee2e6',
              borderRadius: '10px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              padding: '1rem',
            },
          },
        },
      },
    },
  },

  // ── NEW: Item Layout: flex ────────────────────────────────────────────────
  {
    id: 'item-layout-flex',
    title: 'Item Layout: type="flex"',
    description: 'ItemConfig.layout.type="flex" with direction, wrap, justify, align. Creates horizontal card rows with aligned content.',
    data: threeUsersData as Entity[],
    config: {
      id: 'item-layout-flex',
      collapse: { initialState: 'expanded' },
      zones: {
        header: { title: 'Flex Item Layout', subtitle: 'layout.type="flex" · direction="row" · align="center"' },
        content: {
          mode: 'grid',
          modeConfig: { grid: { maxColumns: 1 } },
          item: {
            fields: [
              { key: 'src',        label: 'Photo', type: 'image' as const, imageOptions: { circular: true, width: 48, height: 48 } },
              { key: 'name',       label: 'Name',  showLabel: false },
              { key: 'role',       label: 'Role',  renderAs: 'badge' },
              { key: 'status',     label: 'Status', renderAs: 'badge' },
              { key: 'department', label: 'Dept' },
            ],
            layout: {
              type: 'flex',
              flex: {
                direction: 'row',
                wrap: false,
                justify: 'flex-start',
                align: 'center',
              },
            },
          },
        },
      },
    },
  },

  // ── NEW: Item Layout: grid (with columns/gap) + sections ─────────────────
  {
    id: 'item-layout-sections',
    title: 'Item Layout: type="sections" & template',
    description: 'ItemConfig.layout.type="sections" with SectionConfig[]: titled sections grouping fields by key string. Also shows ItemConfig.template (ItemTemplate.sections) as full FieldConfig-based approach.',
    data: threeUsersData as Entity[],
    config: {
      id: 'item-layout-sections',
      collapse: { initialState: 'expanded' },
      zones: {
        header: { title: 'Sectioned Item Layout', subtitle: 'layout.type="sections" · SectionConfig with title + fields keys' },
        content: {
          mode: 'grid',
          modeConfig: { grid: { maxColumns: 1 } },
          item: {
            fields: [
              { key: 'name',       label: 'Name' },
              { key: 'email',      label: 'Email', type: 'email' as const },
              { key: 'role',       label: 'Role',       renderAs: 'badge' },
              { key: 'department', label: 'Department' },
              { key: 'status',     label: 'Status',     renderAs: 'badge' },
              { key: 'progress',   label: 'Performance', renderAs: 'progress' },
            ],
            layout: {
              type: 'sections',
              sections: [
                { title: 'Contact',  fields: ['name', 'email'] },
                { title: 'Role',     fields: ['role', 'department'] },
                { title: 'Metrics', fields: ['status', 'progress'] },
              ],
            },
          },
        },
      },
    },
  },

  // ── NEW: Item Layout: grid (CSS grid with areas) ──────────────────────────
  {
    id: 'item-layout-grid',
    title: 'Item Layout: type="grid" (CSS grid)',
    description: 'ItemConfig.layout.type="grid" with columns, gap, and grid-template-areas for precise field positioning.',
    data: threeUsersData as Entity[],
    config: {
      id: 'item-layout-grid',
      collapse: { initialState: 'expanded' },
      zones: {
        header: { title: 'Grid Item Layout', subtitle: 'layout.type="grid" with columns, gap, and template areas' },
        content: {
          mode: 'grid',
          modeConfig: { grid: { maxColumns: 1 } },
          item: {
            fields: [
              { key: 'photo',      label: 'Photo', type: 'image' as const, imageOptions: { circular: true, width: 56, height: 56 } },
              { key: 'name',       label: 'Name', showLabel: false },
              { key: 'email',      label: 'Email', type: 'email' as const, showLabel: false },
              { key: 'role',       label: 'Role', renderAs: 'badge' },
              { key: 'department', label: 'Dept' },
            ],
            layout: {
              type: 'grid',
              grid: {
                columns: '56px 1fr 1fr',
                gap: '0.5rem',
                areas: [
                  '"photo name   role"',
                  '"photo email  department"',
                ],
              },
            },
          },
        },
      },
    },
  },

  // ── NEW: Grid ModeConfig — all options ───────────────────────────────────
  {
    id: 'grid-modeconfig-full',
    title: 'Grid ModeConfig — all options',
    description: 'ModeConfig.grid: gap, minItemWidth, maxColumns, autoFlow, justifyItems, and alignItems. Responsive switching belongs in content.responsive.breakpoints.',
    data: twelveUsersData as Entity[],
    config: {
      id: 'grid-modeconfig-full',
      collapse: { initialState: 'expanded' },
      zones: {
        header: { title: 'Grid Mode Full Config', subtitle: 'gap · minItemWidth · maxColumns · autoFlow · justifyItems · alignItems' },
        content: {
          mode: 'grid',
          modeConfig: {
            grid: {
              gap: '1.5rem',
              minItemWidth: '220px',
              maxColumns: 4,
              autoFlow: 'row' as const,
              justifyItems: 'stretch' as const,
              alignItems: 'start' as const,
            },
          },
          item: {
            fields: [
              { key: 'name',       label: 'Name' },
              { key: 'role',       label: 'Role',   renderAs: 'badge' },
              { key: 'department', label: 'Dept' },
              { key: 'status',     label: 'Status', renderAs: 'badge' },
            ],
            layout: { type: 'auto' },
          },
        },
      },
    },
  },

  // ── NEW: Carousel ModeConfig — all options ───────────────────────────────
  {
    id: 'carousel-full',
    title: 'Carousel — all ModeConfig options',
    description: 'ModeConfig.carousel: itemWidth, itemHeight, gap, showIndicators, showArrows, infinite, revolving, autoPlay, autoPlayInterval, dragThreshold.',
    data: tenUsersData as Entity[],
    config: {
      id: 'carousel-full',
      containerFrame: { shadow: 'none' },
      collapse: { initialState: 'expanded' },
      zones: {
        header: { title: 'Carousel Mode Full Config', subtitle: 'itemWidth · itemHeight · gap · indicators · arrows · infinite · autoPlay · dragThreshold' },
        content: {
          mode: 'carousel',
          themeOverrides: {
            padding: '1rem'
          },
          modeConfig: {
            carousel: {
              itemWidth: 260,
              itemHeight: 200,
              gap: 16,
              showIndicators: true,
              showArrows: true,
              infinite: true,
              revolving: true,
              autoPlay: true,
              autoPlayInterval: 3500,
              dragThreshold: 50,
            },
          },
          item: {
            fields: [
              { key: 'src',        label: 'Photo', type: 'image' as const, imageOptions: { objectFit: 'cover' as const, width: '100%', height: 100, borderRadius: '6px 6px 0 0' } },
              { key: 'name',       label: 'Name',  showLabel: false },
              { key: 'role',       label: 'Role',  renderAs: 'badge' },
              { key: 'department', label: 'Dept' },
            ],
            layout: { type: 'auto' },
          },
        },
      },
    },
  },

  {
    id: 'carousel-revolving-default',
    title: 'Carousel Revolving: default (unset)',
    description: 'Revolving is not set here (default). Infinite wrapping is enabled to verify default revolving behavior.',
    data: tenUsersData as Entity[],
    config: {
      id: 'carousel-revolving-default',
      collapse: { initialState: 'expanded' },
      zones: {
        header: {
          title: 'Carousel Revolving Default',
          subtitle: 'infinite: true · revolving: (unset/default)',
        },
        content: {
          mode: 'carousel',
          modeConfig: {
            carousel: {
              itemWidth: 260,
              itemHeight: 200,
              gap: 16,
              showIndicators: true,
              showArrows: true,
              infinite: true,
              autoPlay: false,
            },
          },
          item: {
            fields: [
              { key: 'src', label: 'Photo', type: 'image' as const, imageOptions: { objectFit: 'cover' as const, width: '100%', height: 100, borderRadius: '6px 6px 0 0' } },
              { key: 'name', label: 'Name', showLabel: false },
              { key: 'role', label: 'Role', renderAs: 'badge' },
              { key: 'department', label: 'Dept' },
            ],
            layout: { type: 'auto' },
          },
        },
      },
    },
  },

  {
    id: 'carousel-revolving-true',
    title: 'Carousel Revolving: true',
    description: 'Infinite wrap with revolving=true (no rewind animation on boundary wrap).',
    data: tenUsersData as Entity[],
    config: {
      id: 'carousel-revolving-true',
      collapse: { initialState: 'expanded' },
      zones: {
        header: {
          title: 'Carousel Revolving True',
          subtitle: 'infinite: true · revolving: true',
        },
        content: {
          mode: 'carousel',
          modeConfig: {
            carousel: {
              itemWidth: 260,
              itemHeight: 200,
              gap: 16,
              showIndicators: true,
              showArrows: true,
              infinite: true,
              revolving: true,
              autoPlay: false,
            },
          },
          item: {
            fields: [
              { key: 'src', label: 'Photo', type: 'image' as const, imageOptions: { objectFit: 'cover' as const, width: '100%', height: 100, borderRadius: '6px 6px 0 0' } },
              { key: 'name', label: 'Name', showLabel: false },
              { key: 'role', label: 'Role', renderAs: 'badge' },
              { key: 'department', label: 'Dept' },
            ],
            layout: { type: 'auto' },
          },
        },
      },
    },
  },

  {
    id: 'carousel-revolving-false',
    title: 'Carousel Revolving: false',
    description: 'Infinite wrap with revolving=false (uses rewind-style wrap behavior).',
    data: tenUsersData as Entity[],
    config: {
      id: 'carousel-revolving-false',
      collapse: { initialState: 'expanded' },
      zones: {
        header: {
          title: 'Carousel Revolving False',
          subtitle: 'infinite: true · revolving: false',
        },
        content: {
          mode: 'carousel',
          modeConfig: {
            carousel: {
              itemWidth: 260,
              itemHeight: 200,
              gap: 16,
              showIndicators: true,
              showArrows: true,
              infinite: true,
              revolving: false,
              autoPlay: false,
            },
          },
          item: {
            fields: [
              { key: 'src', label: 'Photo', type: 'image' as const, imageOptions: { objectFit: 'cover' as const, width: '100%', height: 100, borderRadius: '6px 6px 0 0' } },
              { key: 'name', label: 'Name', showLabel: false },
              { key: 'role', label: 'Role', renderAs: 'badge' },
              { key: 'department', label: 'Dept' },
            ],
            layout: { type: 'auto' },
          },
        },
      },
    },
  },

  // ── NEW: Content loadingState ────────────────────────────────────────────
  {
    id: 'content-loading-state-skeleton-text-bars',
    title: 'Content: loadingState skeleton (text-bars)',
    description: 'Demonstrates skeleton variant="text-bars" with shimmer animation for baseline text placeholder loading UI.',
    data: fourUsersData as Entity[],
    config: {
      id: 'content-loading-state-skeleton-text-bars',
      collapse: { initialState: 'expanded' },
      zones: {
        header: { title: 'Loading State — Skeleton Text Bars', subtitle: 'status="loading" · indicator="skeleton" · variant="text-bars" · animation="shimmer"' },
        content: {
          mode: 'table',
          status: 'loading' as const,
          loadingState: {
            enabled: true,
            indicator: 'skeleton' as const,
            skeleton: {
              variant: 'text-bars' as const,
              animation: 'shimmer' as const,
            },
            message: () => 'Loading records with text-bar placeholders…',
          },
          item: {
            fields: [
              { key: 'name', label: 'Name' },
              { key: 'role', label: 'Role' },
            ],
            layout: { type: 'auto' },
          },
        },
      },
    },
  },

  {
    id: 'content-loading-state-skeleton-table-cells',
    title: 'Content: loadingState skeleton (table-cells)',
    description: 'Demonstrates skeleton variant="table-cells" to mimic tabular loading placeholders before rows resolve.',
    data: fourUsersData as Entity[],
    config: {
      id: 'content-loading-state-skeleton-table-cells',
      collapse: { initialState: 'expanded' },
      zones: {
        header: { title: 'Loading State — Skeleton Table Cells', subtitle: 'status="loading" · indicator="skeleton" · variant="table-cells"' },
        content: {
          mode: 'table',
          status: 'loading' as const,
          loadingState: {
            enabled: true,
            indicator: 'skeleton' as const,
            skeleton: {
              variant: 'table-cells' as const,
              animation: 'shimmer' as const,
            },
            message: () => 'Loading tabular cells…',
          },
          item: {
            fields: [
              { key: 'name', label: 'Name' },
              { key: 'role', label: 'Role' },
            ],
            layout: { type: 'auto' },
          },
        },
      },
    },
  },

  {
    id: 'content-loading-state-skeleton-cards-grid',
    title: 'Content: loadingState skeleton (cards-grid, morph)',
    description: 'Demonstrates skeleton variant="cards-grid" with animation="morph" so animation behavior is explicit in runtime.',
    data: fourUsersData as Entity[],
    config: {
      id: 'content-loading-state-skeleton-cards-grid',
      collapse: { initialState: 'expanded' },
      zones: {
        header: { title: 'Loading State — Skeleton Cards Grid', subtitle: 'status="loading" · indicator="skeleton" · variant="cards-grid" · animation="morph"' },
        content: {
          mode: 'grid',
          status: 'loading' as const,
          loadingState: {
            enabled: true,
            indicator: 'skeleton' as const,
            skeleton: {
              variant: 'cards-grid' as const,
              animation: 'morph' as const,
            },
            message: () => 'Loading card placeholders with morph animation…',
          },
          item: {
            fields: [
              { key: 'name', label: 'Name' },
              { key: 'role', label: 'Role' },
            ],
            layout: { type: 'auto' },
          },
        },
      },
    },
  },

  {
    id: 'content-loading-state-skeleton-pie-chart',
    title: 'Content: loadingState skeleton (pie-chart)',
    description: 'Demonstrates skeleton variant="pie-chart" for chart-like loading presentation with legend placeholders.',
    data: fourUsersData as Entity[],
    config: {
      id: 'content-loading-state-skeleton-pie-chart',
      collapse: { initialState: 'expanded' },
      zones: {
        header: { title: 'Loading State — Skeleton Pie Chart', subtitle: 'status="loading" · indicator="skeleton" · variant="pie-chart"' },
        content: {
          mode: 'chart',
          status: 'loading' as const,
          loadingState: {
            enabled: true,
            indicator: 'skeleton' as const,
            skeleton: {
              variant: 'pie-chart' as const,
              animation: 'shimmer' as const,
            },
            message: () => 'Loading chart placeholders…',
          },
          item: {
            fields: [
              { key: 'name', label: 'Name' },
              { key: 'role', label: 'Role' },
            ],
            layout: { type: 'auto' },
          },
        },
      },
    },
  },

  {
    id: 'content-loading-state-spinner',
    title: 'Content: loadingState (spinner)',
    description: 'Demonstrates built-in loading indicator="spinner" with animated rotation so it is visually distinct from skeleton placeholders.',
    data: fourUsersData as Entity[],
    config: {
      id: 'content-loading-state-spinner',
      collapse: { initialState: 'expanded' },
      zones: {
        header: { title: 'Loading State — Spinner', subtitle: 'status="loading" · indicator="spinner" · animated spin' },
        content: {
          mode: 'table',
          status: 'loading' as const,
          loadingState: {
            enabled: true,
            indicator: 'spinner' as const,
            message: () => 'Loading records with animated spinner…',
          },
          item: {
            fields: [
              { key: 'name', label: 'Name' },
              { key: 'role', label: 'Role' },
            ],
            layout: { type: 'auto' },
          },
        },
      },
    },
  },

  {
    id: 'content-loading-state-renderer-override',
    title: 'Content: loadingState renderer override',
    description: 'Demonstrates loadingState.renderer taking precedence even when indicator="spinner" is configured, while still receiving message/data props.',
    data: fourUsersData as Entity[],
    config: {
      id: 'content-loading-state-renderer-override',
      collapse: { initialState: 'expanded' },
      zones: {
        header: { title: 'Loading State — Custom Renderer', subtitle: 'status="loading" · loadingState.renderer override' },
        content: {
          mode: 'table',
          status: 'loading' as const,
          loadingState: {
            enabled: true,
            indicator: 'spinner' as const,
            message: () => 'Loading records through custom renderer…',
            renderer: ({ message, data }: { message?: string; data?: Entity[] }) => (
              <div
                style={{
                  border: '1px dashed var(--widgemo-color-border, #dee2e6)',
                  borderRadius: '8px',
                  padding: '12px 14px',
                  background: 'var(--widgemo-color-surfaceBg, #f8f9fa)',
                  color: 'var(--widgemo-color-text, #212529)',
                }}
              >
                <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>Custom Loading Renderer</div>
                <div style={{ fontSize: '0.82rem', marginBottom: '0.35rem' }}>{message ?? 'Loading…'}</div>
                <div style={{ fontSize: '0.76rem', opacity: 0.8, marginBottom: '0.35rem' }}>Configured indicator: spinner (renderer override is active)</div>
                <div style={{ fontSize: '0.76rem', opacity: 0.8 }}>Rows in current payload: {data?.length ?? 0}</div>
              </div>
            ),
          },
          item: {
            fields: [
              { key: 'name', label: 'Name' },
              { key: 'role', label: 'Role' },
            ],
            layout: { type: 'auto' },
          },
        },
      },
    },
  },

  // ── NEW: Content errorState ──────────────────────────────────────────────
  {
    id: 'content-error-state',
    title: 'Content: errorState warning + retry',
    description: 'Demonstrates status="error" with severity="warning" and a centered retry action visually separated below the message.',
    data: [] as Entity[],
    config: {
      id: 'content-error-state',
      collapse: { initialState: 'expanded' },
      zones: {
        header: { title: 'Error State — Warning + Retry', subtitle: 'status="error" · severity="warning" · centered retry below message' },
        content: {
          mode: 'table',
          status: 'error' as const,
          error: { message: 'Failed to load data from server' },
          errorState: {
            enabled: true,
            message: (err: unknown) => `Error: ${(err as Error)?.message ?? 'Something went wrong'}`,
            retry: {
              label: 'Try Again',
              onRetry: () =>
                fireDemoAction({
                  actionId: 'content-error-retry',
                  actionLabel: 'Try Again',
                  source: 'action.onAction',
                  zone: 'content',
                  data: [] as Record<string, unknown>[],
                }),
            },
            severity: 'warning' as const,
          },
          item: {
            fields: [{ key: 'name', label: 'Name' }],
            layout: { type: 'auto' },
          },
        },
        footer: {
          subtitle: 'Expected: warning tone + centered retry button under message with visible spacing.',
        },
      },
    },
  },

  {
    id: 'content-error-state-severity-info',
    title: 'Content: errorState severity=info',
    description: 'Demonstrates severity="info" runtime tone so users can compare info, warning, and error presentations.',
    data: [] as Entity[],
    config: {
      id: 'content-error-state-severity-info',
      collapse: { initialState: 'expanded' },
      zones: {
        header: { title: 'Error State — Severity Info', subtitle: 'status="error" · severity="info" · informational tone' },
        content: {
          mode: 'table',
          status: 'error' as const,
          error: { message: 'Background sync is delayed; latest snapshot is still usable.' },
          errorState: {
            enabled: true,
            message: (err: unknown) => `Info severity demo: ${(err as Error)?.message ?? 'Informational state'}`,
            severity: 'info' as const,
            retry: false,
          },
          item: {
            fields: [{ key: 'name', label: 'Name' }],
            layout: { type: 'auto' },
          },
        },
        footer: {
          subtitle: 'Expected: softer informational tone than warning/error states.',
        },
      },
    },
  },

  {
    id: 'content-error-state-severity-error',
    title: 'Content: errorState severity=error',
    description: 'Demonstrates severity="error" styling with a centered retry action to compare against warning and info severities.',
    data: [] as Entity[],
    config: {
      id: 'content-error-state-severity-error',
      collapse: { initialState: 'expanded' },
      zones: {
        header: { title: 'Error State — Severity Error', subtitle: 'status="error" · severity="error" · centered retry below message' },
        content: {
          mode: 'table',
          status: 'error' as const,
          error: { message: 'Batch processing failed after multiple retries' },
          errorState: {
            enabled: true,
            message: (err: unknown) => `Error severity demo: ${(err as Error)?.message ?? 'Unknown failure'}`,
            severity: 'error' as const,
            retry: {
              label: 'Retry Batch',
              onRetry: () =>
                fireDemoAction({
                  actionId: 'content-error-severity-error-retry',
                  actionLabel: 'Retry Batch',
                  source: 'action.onAction',
                  zone: 'content',
                  data: [] as Record<string, unknown>[],
                }),
            },
          },
          item: {
            fields: [{ key: 'name', label: 'Name' }],
            layout: { type: 'auto' },
          },
        },
        footer: {
          subtitle: 'Expected: strongest error tone + centered retry button under message with visible spacing.',
        },
      },
    },
  },

  // ── NEW: Content groupings (GroupingConfig) ───────────────────────────────
  {
    id: 'content-groupings',
    title: 'ContentConfig.groupings',
    description: 'groupings[]: GroupingConfig with fieldKey, initiallyCollapsed=true, and custom renderer function.',
    data: eightUsersData as Entity[],
    config: {
      id: 'content-groupings',
      collapse: { initialState: 'expanded' },
      zones: {
        header: { title: 'Groupings Config', subtitle: 'groupings[].fieldKey · initiallyCollapsed · custom renderer fn' },
        content: {
          mode: 'table',
          groupings: [
            {
              fieldKey: 'department',
              initiallyCollapsed: true,
              renderer: (groupValue: unknown, count: number, isCollapsed: boolean) =>
                `${groupValue} — ${count} members ${isCollapsed ? '▶' : '▼'}`,
            },
          ],
          item: {
            fields: [
              { key: 'name',   label: 'Name' },
              { key: 'role',   label: 'Role',   renderAs: 'badge' },
              { key: 'status', label: 'Status', renderAs: 'badge' },
            ],
            layout: { type: 'auto' },
          },
        },
      },
    },
  },

  // ── Grouping — individual settings showcased ────────────────────────────
  {
    id: 'grouping-expanded-default',
    title: 'Grouping: fieldKey only (expanded by default)',
    description: 'groupings[0] with only fieldKey set — the minimum required config. Groups expand by default (initiallyCollapsed defaults to false). The default group header renders as "GroupValue (N)".',
    data: eightUsersData as Entity[],
    config: {
      id: 'grouping-expanded-default',
      collapse: { initialState: 'expanded' },
      zones: {
        header: { title: 'Grouped by Department', subtitle: 'groupings[].fieldKey only · expanded by default · default label format' },
        content: {
          mode: 'table',
          groupings: [
            { fieldKey: 'department' },
          ],
          item: {
            fields: [
              { key: 'name',   label: 'Name' },
              { key: 'role',   label: 'Role',   renderAs: 'badge' },
              { key: 'status', label: 'Status', renderAs: 'badge' },
            ],
            layout: { type: 'auto' },
          },
        },
      },
    },
  },

  {
    id: 'grouping-by-different-field',
    title: 'Grouping by a different field (status)',
    description: 'Any field can be used as groupings[].fieldKey. Here fieldKey="status" groups rows by active/inactive/pending. initiallyCollapsed: false is set explicitly (same as the default) to show the option.',
    data: eightUsersData as Entity[],
    config: {
      id: 'grouping-by-different-field',
      collapse: { initialState: 'expanded' },
      zones: {
        header: { title: 'Grouped by Status', subtitle: 'fieldKey="status" · initiallyCollapsed=false (explicit)' },
        content: {
          mode: 'table',
          groupings: [
            { fieldKey: 'status', initiallyCollapsed: false },
          ],
          item: {
            fields: [
              { key: 'name',       label: 'Name' },
              { key: 'role',       label: 'Role',       renderAs: 'badge' },
              { key: 'department', label: 'Department' },
            ],
            layout: { type: 'auto' },
          },
        },
      },
    },
  },

  {
    id: 'grouping-renderer-jsx',
    title: 'Grouping: renderer returning JSX',
    description: 'renderer receives (groupValue, count, isCollapsed) and returns a React element — here a styled inline badge. Groups start collapsed (initiallyCollapsed: true). All three renderer params are used.',
    data: eightUsersData as Entity[],
    config: {
      id: 'grouping-renderer-jsx',
      collapse: { initialState: 'expanded' },
      zones: {
        header: { title: 'Grouped by Department', subtitle: 'renderer → JSX badge · all three params: groupValue, count, isCollapsed' },
        content: {
          mode: 'table',
          groupings: [
            {
              fieldKey: 'department',
              initiallyCollapsed: true,
              renderer: (groupValue: unknown, count: number, isCollapsed: boolean) => (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{
                    backgroundColor: '#4f46e5',
                    color: '#fff',
                    borderRadius: '12px',
                    padding: '2px 10px',
                    fontSize: '12px',
                    fontWeight: 600,
                  }}>
                    {String(groupValue)}
                  </span>
                  <span style={{ fontSize: '12px', color: '#6b7280' }}>
                    {count} {count === 1 ? 'member' : 'members'} · {isCollapsed ? 'click to expand' : 'click to collapse'}
                  </span>
                </span>
              ),
            },
          ],
          item: {
            fields: [
              { key: 'name',   label: 'Name' },
              { key: 'role',   label: 'Role',   renderAs: 'badge' },
              { key: 'status', label: 'Status', renderAs: 'badge' },
            ],
            layout: { type: 'auto' },
          },
        },
      },
    },
  },

  {
    id: 'grouping-rich-cells',
    title: 'Grouping in rich-cells table',
    description: 'groupings also works with layout.table.type="rich-cells". Groups are expanded by default. fieldKey="department", columns=2.',
    data: eightUsersData as Entity[],
    config: {
      id: 'grouping-rich-cells',
      collapse: { initialState: 'expanded' },
      zones: {
        header: { title: 'Grouped Rich-Cells Table', subtitle: 'groupings · type="rich-cells" · columns=2' },
        content: {
          mode: 'table',
          modeConfig: { table: { type: 'rich-cells', columns: 2 } },
          groupings: [
            { fieldKey: 'department' },
          ],
          item: {
            fields: [
              { key: 'name',   label: 'Name' },
              { key: 'role',   label: 'Role',   renderAs: 'badge' },
              { key: 'status', label: 'Status', renderAs: 'badge' },
              { key: 'email',  label: 'Email' },
            ],
            layout: { type: 'auto' },
          },
        },
      },
    },
  },

  {
    id: 'grouping-with-sorting',
    title: 'Grouping combined with sorting',
    description: 'sorting applies within each group. groupings: fieldKey="department", sorting: name asc. Items inside each department group are sorted alphabetically by name.',
    data: eightUsersData as Entity[],
    config: {
      id: 'grouping-with-sorting',
      collapse: { initialState: 'expanded' },
      zones: {
        header: { title: 'Grouped + Sorted', subtitle: 'groupings · sorting name asc · items sorted alphabetically within each group' },
        content: {
          mode: 'table',
          groupings: [
            { fieldKey: 'department' },
          ],
          sorting: [
            { fieldKey: 'name', direction: 'asc' as const },
          ],
          item: {
            fields: [
              { key: 'name',   label: 'Name' },
              { key: 'role',   label: 'Role',   renderAs: 'badge' },
              { key: 'status', label: 'Status', renderAs: 'badge' },
            ],
            layout: { type: 'auto' },
          },
        },
      },
    },
  },

  {
    id: 'grouping-controls-dropdown-only',
    title: 'Grouping Controls — Dropdown Only',
    description: 'groupings[].showDropdownControl=true and showHeaderControls=false. Users change grouping from the dropdown without header icons.',
    data: eightUsersData as Entity[],
    config: {
      id: 'grouping-controls-dropdown-only',
      collapse: { initialState: 'expanded' },
      zones: {
        header: { title: 'Grouping Controls: Dropdown Only', subtitle: 'showDropdownControl=true · showHeaderControls=false' },
        content: {
          mode: 'table',
          groupings: [
            {
              fieldKey: 'department',
              showDropdownControl: true,
              showHeaderControls: false,
            },
          ],
          item: {
            fields: [
              { key: 'name', label: 'Name' },
              { key: 'role', label: 'Role', renderAs: 'badge' },
              { key: 'department', label: 'Department', groupable: true },
              { key: 'status', label: 'Status', renderAs: 'badge', groupable: true },
            ],
            layout: { type: 'auto' },
          },
        },
      },
    },
  },

  {
    id: 'grouping-controls-icons-only',
    title: 'Grouping Controls — Header Icons Only',
    description: 'Header grouping icons are enabled by groupable fields while dropdown remains hidden.',
    data: eightUsersData as Entity[],
    config: {
      id: 'grouping-controls-icons-only',
      collapse: { initialState: 'expanded' },
      zones: {
        header: { title: 'Grouping Controls: Header Icons Only', subtitle: 'showDropdownControl=false (default) · showHeaderControls=true' },
        content: {
          mode: 'table',
          groupings: [
            {
              fieldKey: 'department',
              showHeaderControls: true,
            },
          ],
          item: {
            fields: [
              { key: 'name', label: 'Name' },
              { key: 'role', label: 'Role', renderAs: 'badge' },
              { key: 'department', label: 'Department', groupable: true },
              { key: 'status', label: 'Status', renderAs: 'badge', groupable: true },
            ],
            layout: { type: 'auto' },
          },
        },
      },
    },
  },

  {
    id: 'grouping-controls-dropdown-and-icons',
    title: 'Grouping Controls — Dropdown + Header Icons',
    description: 'Both grouping controls are enabled so users can use either dropdown or header icons.',
    data: eightUsersData as Entity[],
    config: {
      id: 'grouping-controls-dropdown-and-icons',
      collapse: { initialState: 'expanded' },
      zones: {
        header: { title: 'Grouping Controls: Dropdown + Header Icons', subtitle: 'showDropdownControl=true · showHeaderControls=true' },
        content: {
          mode: 'table',
          groupings: [
            {
              fieldKey: 'department',
              showDropdownControl: true,
              showHeaderControls: true,
            },
          ],
          item: {
            fields: [
              { key: 'name', label: 'Name' },
              { key: 'role', label: 'Role', renderAs: 'badge' },
              { key: 'department', label: 'Department', groupable: true },
              { key: 'status', label: 'Status', renderAs: 'badge', groupable: true },
            ],
            layout: { type: 'auto' },
          },
        },
      },
    },
  },

  // ── NEW: Content filtering, sorting, virtualization, style, themeOverrides ─
  {
    id: 'content-filtering-sorting',
    title: 'Content: filtering, sorting, style, themeOverrides',
    description: 'ContentConfig.filtering (static operator+value filter), .sorting (initial sort), .style (inline CSS on content zone), .themeOverrides on content.',
    data: twentyUsersData as Entity[],
    config: {
      id: 'content-filtering-sorting',
      collapse: { initialState: 'expanded' },
      zones: {
        header: { title: 'Static Filtering & Sorting', subtitle: 'filtering: status=active · sorting: name asc · content.style · content.themeOverrides' },
        content: {
          mode: 'table',
          filtering: [
            { fieldKey: 'status', operator: 'eq', value: 'active' },
          ],
          sorting: [
            { fieldKey: 'name', direction: 'asc' as const },
          ],
          style: { border: '2px solid #0d6efd', borderRadius: '6px' },
          themeOverrides: {
            backgroundColor: '#f0f8ff',
          },
          item: {
            fields: [
              { key: 'name',       label: 'Name' },
              { key: 'role',       label: 'Role' },
              { key: 'status',     label: 'Status',     renderAs: 'badge' },
              { key: 'department', label: 'Department' },
            ],
            layout: { type: 'auto' },
          },
        },
      },
    },
  },

  // ── NEW: Search — advanced options ───────────────────────────────────────
  {
    id: 'search-advanced',
    title: 'Search — fields, debounceMs, onSearch',
    description: 'content.search: fields restricts search to name+role only (ignores department). debounceMs=500. onSearch callback logs each query. search.enabled explicitly set.',
    data: twentyUsersData as Entity[],
    config: {
      id: 'search-advanced',
      collapse: { initialState: 'expanded' },
      zones: {
        header: { title: 'Advanced Search Config', subtitle: 'search.fields · debounceMs=500 · onSearch callback (check console)' },
        content: {
          mode: 'grid',
          search: {
            enabled: true,
            placeholder: 'Search by name or role only…',
            fields: ['name', 'role'],
            debounceMs: 500,
            onSearch: (query: string) => console.log('[onSearch]', query),
          },
          item: {
            fields: [
              { key: 'name',       label: 'Name' },
              { key: 'role',       label: 'Role',       renderAs: 'badge' },
              { key: 'department', label: 'Department' },
              { key: 'status',     label: 'Status',     renderAs: 'badge' },
            ],
            layout: { type: 'auto' },
          },
        },
      },
    },
  },

  // ── NEW: Board advanced (actions, hooks, swimlane labels) ─────────────────
  {
    id: 'board-advanced',
    title: 'Board — card actions, swimlane items',
    description: 'BoardModeConfig with columns and swimlanes using items arrays. ContentConfig.actions for card actions. dragEnabled for drag-and-drop.',
    data: twentyUsersData as Entity[],
    config: {
      id: 'board-advanced',
      collapse: { initialState: 'expanded' },
      zones: {
        header: { title: 'Advanced Board Config', subtitle: 'columns · swimlanes with items · card actions · dragEnabled' },
        content: {
          mode: 'board',
          modeConfig: {
            board: {
              columns: {
                field: 'status',
                items: [
                  { id: 'col-active',   label: '▶ Active',      value: 'active',   color: '#28a745' },
                  { id: 'col-pending',  label: '⏳ In Progress', value: 'pending',  color: '#fd7e14' },
                  { id: 'col-inactive', label: '✓ Done',         value: 'inactive', color: '#6c757d' },
                ]
              },
              swimlanes: {
                field: 'department',
                items: [
                  { id: 'eng',  label: 'R&D Engineering', value: 'Engineering' },
                  { id: 'des',  label: 'Product Design',  value: 'Design' },
                  { id: 'bus',  label: 'Business Dev',    value: 'Business' },
                ]
              },
              dragEnabled: true,
            },
          },
          gestures: [
            {
              type: 'item-drop',
              enabled: true,
              interactionId: 'board-drop',
              interactionLabel: 'Board Drop'
            }
          ],
          actions: [
            {
              id: 'card-view',
              label: 'View',
              icon: 'view',
              placement: 'pinned' as const,
              onAction: (ctx: InteractionContext) => fireDemoAction({ actionId: 'card-view', actionLabel: 'View', source: 'action.onAction', entity: ctx.entity as Record<string, unknown> }),
            },
            {
              id: 'card-edit',
              label: 'Edit',
              icon: 'edit',
              placement: 'menu' as const,
              onAction: (ctx: InteractionContext) => fireDemoAction({ actionId: 'card-edit', actionLabel: 'Edit', source: 'action.onAction', entity: ctx.entity as Record<string, unknown> }),
            },
          ],
          item: {
            fields: [
              { key: 'name', label: 'Name', type: 'text' as const },
              { key: 'role', label: 'Role', renderAs: 'badge' },
            ],
            layout: { type: 'auto' as const },
          },
        },
      },
    },
  },

  // ── NEW: DevMode — full DevModeConfig object ──────────────────────────────
  {
    id: 'devmode-full',
    title: 'DevMode — full DevModeConfig object',
    description: 'devMode as DevModeConfig: enabled, zone (places icon in "footer"), overlay.showHeader, showDocsLink, showBranding, excludeFields. Only visible in development environment.',
    data: threeUsersData as Entity[],
    config: {
      id: 'devmode-full',
      collapse: { initialState: 'collapsed' },
      devMode: {
        enabled: true,
        zone: 'footer' as const,
        overlay: {
          showHeader: true,
          showDocsLink: 'https://docs.widgemo.com',
          showBranding: true,
          excludeFields: [],
        },
      },
      zones: {
        header: { title: 'DevMode Full Config', subtitle: 'DevModeConfig object · zone="footer" · overlay options' },
        content: {
          mode: 'table',
          item: {
            fields: [
              { key: 'name',   label: 'Name' },
              { key: 'role',   label: 'Role' },
              { key: 'status', label: 'Status', renderAs: 'badge' },
            ],
            layout: { type: 'auto' },
          },
        },
        footer: {
          subtitle: 'The DevMode icon appears here (only in dev environment)',
        },
      },
    },
  },
];

const widgemoExamplesWithInteractionSink = widgemoExamples.map((example) => ({
  ...example,
  config: {
    ...example.config,
    interactions: {
      ...(example.config?.interactions ?? {}),
      onEvent: emitDemoInteraction,
    },
  },
}));

export default widgemoExamplesWithInteractionSink;
