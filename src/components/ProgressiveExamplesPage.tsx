import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Widgemo, WidgemoThemeProvider, useWidgemoTheme, widgemoRegistry } from '@widgemo/widgemo-core';
import type { Entity, WidgemoConfig } from '@widgemo/widgemo-core';
import progressiveExamples from '../data/progressiveExamples';
import { useTheme } from '../hooks/useTheme';
import { setDemoActionListener } from '../utils/demoActionBus';
import type { DemoActionPayload } from '../utils/demoActionBus';
import { DemoActionModal } from './DemoActionModal';

type ExampleHarnessMode = 'app-theme' | 'provider-light' | 'provider-dark' | 'provider-auto' | 'no-provider';
type LifecycleHookMode = 'default' | 'custom-onItemClick';
type LifecycleHookName = 'preRender' | 'postRender' | 'onItemClick' | 'onModeChange' | 'onDragDrop';

type LifecycleMonitorEntry = {
  hook: LifecycleHookName;
  component?: string;
  configId?: string;
  detail?: Record<string, unknown>;
};

type LifecycleExampleState = {
  fired: Partial<Record<LifecycleHookName, boolean>>;
  lastPayload: Partial<Record<LifecycleHookName, string>>;
};

type ModeWidth = 'desktop' | 'mobile';

type ArmableLifecycleHook = 'onItemClick' | 'onModeChange' | 'onDragDrop';

const LIFECYCLE_MONITOR_EVENT_NAME = 'widgemo-lifecycle-monitor';

const lifecycleConfigIds = [
  'progressive-57',
  'progressive-58',
  'progressive-59',
  'progressive-60',
  'progressive-61',
  'progressive-62',
  'progressive-63',
] as const;

const lifecycleConfigIdSet = new Set<string>(lifecycleConfigIds);

const emptyLifecycleState = (): LifecycleExampleState => ({
  fired: {},
  lastPayload: {},
});

const buildInitialLifecycleState = (): Record<string, LifecycleExampleState> => ({
  'progressive-57': emptyLifecycleState(),
  'progressive-58': emptyLifecycleState(),
  'progressive-59': emptyLifecycleState(),
  'progressive-60': emptyLifecycleState(),
  'progressive-61': emptyLifecycleState(),
  'progressive-62': emptyLifecycleState(),
  'progressive-63': emptyLifecycleState(),
});

const emitLifecycleMonitorEntry = (entry: LifecycleMonitorEntry): void => {
  if (typeof window === 'undefined') return;
  window.setTimeout(() => {
    window.dispatchEvent(new CustomEvent<LifecycleMonitorEntry>(LIFECYCLE_MONITOR_EVENT_NAME, {
      detail: entry,
    }));
  }, 0);
};

const payloadSummary = (detail?: Record<string, unknown>): string => {
  if (!detail) return 'No payload captured.';
  try {
    const value = JSON.stringify(detail);
    return value.length > 220 ? `${value.slice(0, 220)}...` : value;
  } catch {
    return '[payload unavailable]';
  }
};

const exampleHarnessModeById: Record<string, ExampleHarnessMode> = {
  'progressive-48-theme-provider-light-validation': 'provider-light',
  'progressive-50-theme-provider-dark-validation': 'provider-dark',
  'progressive-52-theme-auto-snapshot-behavior': 'provider-auto',
  'progressive-54-theme-hook-with-provider': 'app-theme',
  'progressive-55-theme-hook-without-provider': 'no-provider',
};

const ThemeHookProbe: React.FC<{ label: string }> = ({ label }) => {
  const theme = useWidgemoTheme();
  const rootKeys = Object.keys(theme ?? {});
  const colorKeys = Object.keys(theme?.colors ?? {});
  const spacingKeys = Object.keys(theme?.spacing ?? {});
  const isEmpty = rootKeys.length === 0;

  return (
    <div
      className="mb-2 p-2 rounded"
      style={{
        fontSize: '0.75rem',
        backgroundColor: 'var(--app-bg-secondary)',
        border: '1px dashed var(--app-border)',
        color: 'var(--app-text-muted)',
      }}
    >
      <strong>{label}</strong>
      {' · '}
      root keys: {rootKeys.length}
      {' · '}
      colors: {colorKeys.length}
      {' · '}
      spacing: {spacingKeys.length}
      {' · '}
      empty object: {isEmpty ? 'yes' : 'no'}
    </div>
  );
};

function injectDevMode(config: WidgemoConfig, enabled: boolean): WidgemoConfig {
  if (!config) return config;

  const existingDevMode = config.devMode;

  if (existingDevMode && typeof existingDevMode === 'object') {
    return {
      ...config,
      devMode: {
        ...existingDevMode,
        enabled,
      },
    };
  }

  return {
    ...config,
    devMode: enabled,
  };
}

type ContainerFrameShowcaseCard = {
  id: string;
  title: string;
  caption: string;
  data: Entity[];
  config: WidgemoConfig<Entity>;
  shellStyle?: React.CSSProperties;
  /** Optional outer host wrapper style — use to show a tinted surface behind shellless examples */
  hostStyle?: React.CSSProperties;
};

const containerFrameTableRows: Entity[] = [
  { id: 'ops-1', flow: 'Payroll approvals', owner: 'Finance Ops', status: 'Ready', amount: 84000 },
  { id: 'ops-2', flow: 'Vendor settlement', owner: 'Treasury', status: 'Watch', amount: 126500 },
  { id: 'ops-3', flow: 'Renewal reserve release', owner: 'Revenue Ops', status: 'Ready', amount: 212000 },
];

const containerFrameGridRows: Entity[] = [
  {
    id: 'event-1',
    title: 'Release reserve batch',
    owner: 'Treasury',
    eta: '08:30',
    summary: 'Release reserve batch for renewal payouts and partner disbursements in the morning window.',
  },
  {
    id: 'event-2',
    title: 'Freeze low-confidence transfers',
    owner: 'Risk',
    eta: '10:15',
    summary: 'Freeze low-confidence transfers until the daily fraud review clears the queue for posting.',
  },
];

const containerFrameOverflowRows: Entity[] = [
  {
    id: 'plan-1',
    stream: 'North America payroll cutover',
    owner: 'Finance Systems Program Office',
    window: 'Mon 08:00-11:30 UTC',
    note: 'Coordinate payroll release, treasury funding, and partner confirmation across three approval queues before settlement.',
  },
  {
    id: 'plan-2',
    stream: 'Marketplace reserve unwind',
    owner: 'Treasury Controls',
    window: 'Mon 13:00-16:00 UTC',
    note: 'Review reserve exceptions, release approved balance tranches, and confirm downstream payout routing with operations.',
  },
  {
    id: 'plan-3',
    stream: 'Enterprise renewal reserve release',
    owner: 'Revenue Operations',
    window: 'Tue 09:00-12:00 UTC',
    note: 'Finalize renewal schedules and release batched disbursements once the customer health hold list is cleared.',
  },
  {
    id: 'plan-4',
    stream: 'Credit exposure review lane',
    owner: 'Risk Strategy Council',
    window: 'Tue 14:00-17:30 UTC',
    note: 'Walk the low-confidence queue, annotate exceptions, and route escalations to manual review with cash-impact notes.',
  },
  {
    id: 'plan-5',
    stream: 'Partner payout readiness',
    owner: 'Partner Success Operations',
    window: 'Wed 07:30-10:30 UTC',
    note: 'Confirm remittance files, reconcile bank acknowledgements, and hold the final release until all ledger checks pass.',
  },
  {
    id: 'plan-6',
    stream: 'Liquidity exception cleanup',
    owner: 'Cash Management Office',
    window: 'Wed 15:00-18:00 UTC',
    note: 'Resolve stale exceptions, update fallback funding plans, and document approval ownership for the next operating window.',
  },
];

const containerFrameShowcaseCards: ContainerFrameShowcaseCard[] = [
  {
    id: 'container-frame-borderless-inline',
    title: 'Embedded approvals strip',
    caption: 'Border off + shadow off removes outer shell chrome so the queue can sit inline inside a parent surface.',
    data: containerFrameTableRows,
    config: {
      containerFrame: { border: 'none', shadow: 'none' },
      zones: {
        header: { title: 'Embedded Approvals', subtitle: 'Inline approvals queue', icon: 'table' },
        content: {
          mode: 'table',
          modeConfig: { table: { type: 'traditional', alternatingRows: true } },
          item: {
            fields: [
              { key: 'flow', label: 'Flow', type: 'text' },
              { key: 'owner', label: 'Owner', type: 'text' },
              { key: 'status', label: 'Status', type: 'text', renderAs: 'badge', renderAsOptions: { style: 'badge', size: 'sm' } },
              { key: 'amount', label: 'Amount', type: 'number', renderAs: 'currency', renderAsOptions: { currency: 'USD', locale: 'en-US', compact: true } },
            ],
            layout: { type: 'auto' },
          },
        },
      },
    },
  },
  {
    id: 'container-frame-shellless',
    title: 'Shellless queue (shell: none)',
    caption:
      "Shell none removes the entire outer surface — background, border, and shadow all disappear. The widget floats inside whatever surface hosts it. Compare to the borderless strip above: that one still has its own background and reads like a card; this one genuinely blends into the parent.",
    data: containerFrameTableRows,
    hostStyle: { background: 'var(--app-bg-secondary)', border: '1px dashed var(--app-border)', borderRadius: '6px', padding: '1rem' },
    config: {
      containerFrame: { shell: 'none' },
      zones: {
        header: { title: 'Embedded Approvals', subtitle: 'Shellless — no outer surface', icon: 'table' },
        content: {
          mode: 'table',
          modeConfig: { table: { type: 'traditional', alternatingRows: true } },
          item: {
            fields: [
              { key: 'flow', label: 'Flow', type: 'text' },
              { key: 'owner', label: 'Owner', type: 'text' },
              { key: 'status', label: 'Status', type: 'text', renderAs: 'badge', renderAsOptions: { style: 'badge', size: 'sm' } },
              { key: 'amount', label: 'Amount', type: 'number', renderAs: 'currency', renderAsOptions: { currency: 'USD', locale: 'en-US', compact: true } },
            ],
            layout: { type: 'auto' },
          },
        },
      },
    },
  },
  {
    id: 'container-frame-rounded-shadow',
    title: 'Rounded forecast shell',
    caption: 'Border on + shadow on + rounded radius gives a softer card treatment for executive-facing summaries.',
    data: containerFrameGridRows,
    config: {
      containerFrame: { border: 'on', shadow: 'on', borderRadius: 'rounded' },
      zones: {
        header: { title: 'Forecast Commitments', subtitle: 'Executive summary card', icon: 'chart-bar' },
        content: {
          mode: 'grid',
          modeConfig: { grid: { minItemWidth: '220px', gap: '12px', maxColumns: 2 } },
          item: {
            fields: [
              { key: 'title', label: 'Title', type: 'text' },
              { key: 'owner', label: 'Owner', type: 'text' },
              { key: 'eta', label: 'ETA', type: 'text' },
              { key: 'summary', label: 'Summary', type: 'text' },
            ],
            layout: { type: 'auto' },
          },
        },
      },
    },
  },
  {
    id: 'container-frame-square-shell',
    title: 'Square settlement shell',
    caption: 'Square radius + shadow off keeps edges crisp for denser operational tables and admin layouts.',
    data: containerFrameTableRows,
    config: {
      containerFrame: { border: 'on', shadow: 'none', borderRadius: 'square' },
      zones: {
        header: { title: 'Settlement Handoff', subtitle: 'Operations board handoff', icon: 'settings' },
        content: {
          mode: 'table',
          modeConfig: { table: { type: 'traditional', alternatingRows: false } },
          item: {
            fields: [
              { key: 'flow', label: 'Flow', type: 'text' },
              { key: 'owner', label: 'Owner', type: 'text' },
              { key: 'status', label: 'Status', type: 'text', renderAs: 'badge' },
            ],
            layout: { type: 'auto' },
          },
        },
      },
    },
  },
  {
    id: 'container-frame-accented-shell',
    title: 'Accent review shell',
    caption: 'Explicit radius plus borderColor and borderWidth creates a branded frame without changing inner widget structure.',
    data: containerFrameTableRows,
    config: {
      containerFrame: {
        border: 'on',
        shadow: 'on',
        borderRadius: '18px',
        borderColor: '#0d6efd',
        borderWidth: '2px',
      },
      zones: {
        header: { title: 'Exception Review', subtitle: 'Branded shell for escalation context', icon: 'warning' },
        content: {
          mode: 'table',
          modeConfig: { table: { type: 'traditional', alternatingRows: true } },
          item: {
            fields: [
              { key: 'flow', label: 'Flow', type: 'text' },
              { key: 'owner', label: 'Owner', type: 'text' },
              { key: 'amount', label: 'Amount', type: 'number', renderAs: 'currency', renderAsOptions: { currency: 'USD', locale: 'en-US', compact: true } },
            ],
            layout: { type: 'auto' },
          },
        },
      },
    },
  },
  {
    id: 'container-frame-overflow-hidden',
    title: 'Clipped planning shell',
    caption: 'Expected difference: this fixed-size shell cuts off the table at the edge, so extra rows and wide columns are not reachable.',
    data: containerFrameOverflowRows,
    shellStyle: { width: '320px', maxWidth: '100%' },
    config: {
      containerFrame: { border: 'on', shadow: 'on', borderRadius: 'rounded', overflow: 'hidden' },
      style: { height: '250px' },
      zones: {
        header: { title: 'Planning Window', subtitle: 'Narrow shell with clipped overflow', icon: 'calendar' },
        content: {
          mode: 'table',
          modeConfig: { table: { type: 'traditional', alternatingRows: true } },
          style: { minWidth: '940px' },
          item: {
            fields: [
              { key: 'stream', label: 'Planning stream', type: 'text', width: '260px' },
              { key: 'owner', label: 'Owner', type: 'text', width: '220px' },
              { key: 'window', label: 'Window', type: 'text', width: '180px' },
              { key: 'note', label: 'Operating note', type: 'text', width: '520px' },
            ],
            layout: { type: 'auto' },
          },
        },
      },
    },
  },
  {
    id: 'container-frame-overflow-auto',
    title: 'Scrollable planning shell',
    caption: 'Expected difference: this same fixed-size shell exposes a scrollable region so the extra rows and wide columns stay accessible.',
    data: containerFrameOverflowRows,
    shellStyle: { width: '320px', maxWidth: '100%' },
    config: {
      containerFrame: { border: 'on', shadow: 'on', borderRadius: 'rounded', overflow: 'auto' },
      style: { height: '250px' },
      zones: {
        header: { title: 'Planning Window', subtitle: 'Narrow shell with scrollable overflow', icon: 'calendar' },
        content: {
          mode: 'table',
          modeConfig: { table: { type: 'traditional', alternatingRows: true } },
          style: { minWidth: '940px' },
          item: {
            fields: [
              { key: 'stream', label: 'Planning stream', type: 'text', width: '260px' },
              { key: 'owner', label: 'Owner', type: 'text', width: '220px' },
              { key: 'window', label: 'Window', type: 'text', width: '180px' },
              { key: 'note', label: 'Operating note', type: 'text', width: '520px' },
            ],
            layout: { type: 'auto' },
          },
        },
      },
    },
  },
];

export const ProgressiveExamplesPage: React.FC = () => {
  const [actionPayload, setActionPayload] = useState<DemoActionPayload | null>(null);
  const [onItemClickHookMode, setOnItemClickHookMode] = useState<LifecycleHookMode>('default');
  const [postRenderWrapperEnabled, setPostRenderWrapperEnabled] = useState<boolean>(true);
  const [example61Width, setExample61Width] = useState<ModeWidth>('desktop');
  const [lifecycleStateByConfigId, setLifecycleStateByConfigId] =
    useState<Record<string, LifecycleExampleState>>(buildInitialLifecycleState);
  const [exampleRenderKeyByConfigId, setExampleRenderKeyByConfigId] = useState<Record<string, number>>({
    'progressive-57': 0,
    'progressive-58': 0,
    'progressive-59': 0,
    'progressive-60': 0,
    'progressive-61': 0,
    'progressive-62': 0,
    'progressive-63': 0,
  });

  const armedTargetByHookRef = useRef<Record<ArmableLifecycleHook, string | null>>({
    onItemClick: null,
    onModeChange: null,
    onDragDrop: null,
  });

  useEffect(() => {
    setDemoActionListener(setActionPayload);
    return () => setDemoActionListener(null);
  }, []);

  const recordLifecycleEvidence = useCallback((configId: string, hook: LifecycleHookName, detail?: Record<string, unknown>) => {
    if (!lifecycleConfigIdSet.has(configId)) {
      return;
    }

    const summary = payloadSummary(detail);
    setLifecycleStateByConfigId((previous) => {
      const current = previous[configId] ?? emptyLifecycleState();
      const alreadyFired = current.fired[hook] === true;
      const sameSummary = current.lastPayload[hook] === summary;

      if (alreadyFired && sameSummary) {
        return previous;
      }

      return {
        ...previous,
        [configId]: {
          fired: {
            ...current.fired,
            [hook]: true,
          },
          lastPayload: {
            ...current.lastPayload,
            [hook]: summary,
          },
        },
      };
    });
  }, []);

  const clearLifecycleEvidence = useCallback((configId: string, hooks?: LifecycleHookName[]) => {
    setLifecycleStateByConfigId((previous) => {
      const current = previous[configId];
      if (!current) {
        return previous;
      }

      const hookNames = hooks ?? ['preRender', 'postRender', 'onItemClick', 'onModeChange', 'onDragDrop'];
      const nextFired = { ...current.fired };
      const nextLastPayload = { ...current.lastPayload };
      let changed = false;

      hookNames.forEach((hookName) => {
        if (nextFired[hookName]) {
          delete nextFired[hookName];
          changed = true;
        }
        if (nextLastPayload[hookName]) {
          delete nextLastPayload[hookName];
          changed = true;
        }
      });

      if (!changed) {
        return previous;
      }

      return {
        ...previous,
        [configId]: {
          fired: nextFired,
          lastPayload: nextLastPayload,
        },
      };
    });
  }, []);

  const bumpExampleRenderKey = useCallback((configId: string) => {
    setExampleRenderKeyByConfigId((previous) => ({
      ...previous,
      [configId]: (previous[configId] ?? 0) + 1,
    }));
  }, []);

  const armHookCapture = useCallback((hookName: ArmableLifecycleHook, configId: string) => {
    armedTargetByHookRef.current[hookName] = configId;
  }, []);

  const applyLifecycleHooks = useCallback((mode: LifecycleHookMode) => {
    widgemoRegistry.registerWidgemoHook({
      name: 'preRender',
      hook: (...args: unknown[]) => {
        const componentName = String(args[0] ?? 'unknown');
        const payload = args[1] as { id?: string } | undefined;
        const configId = payload?.id;

        if (configId && lifecycleConfigIdSet.has(configId)) {
          emitLifecycleMonitorEntry({
            hook: 'preRender',
            component: componentName,
            configId,
            detail: { passthrough: true },
          });
        }

        return payload;
      },
    });

    widgemoRegistry.registerWidgemoHook({
      name: 'postRender',
      hook: (...args: unknown[]) => {
        const componentName = String(args[0] ?? 'unknown');
        const renderedNode = args[1] as React.ReactElement | undefined;

        if (componentName === 'Widgemo') {
          const configId = (renderedNode?.props as { id?: string } | undefined)?.id;
          if (configId && lifecycleConfigIdSet.has(configId)) {
            const isWrapped = configId === 'progressive-58' && postRenderWrapperEnabled;
            emitLifecycleMonitorEntry({
              hook: 'postRender',
              component: componentName,
              configId,
              detail: { wrapped: isWrapped, wrapperPath: isWrapped ? 'custom' : 'default' },
            });

            if (isWrapped) {
              return (
                <div
                  data-lifecycle-postrender-wrapper="true"
                  style={{
                    border: '2px dashed #0ea5e9',
                    borderRadius: '8px',
                    padding: '0.35rem',
                    background: 'rgba(14, 165, 233, 0.05)',
                  }}
                >
                  <div
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      color: '#0369a1',
                      marginBottom: '0.35rem',
                    }}
                  >
                    postRender wrapper active (progressive-58)
                  </div>
                  {renderedNode}
                </div>
              );
            }
          }
        }

        return renderedNode;
      },
    });

    widgemoRegistry.registerWidgemoHook({
      name: 'onItemClick',
      hook: (...args: unknown[]) => {
        const item = (args[0] as Record<string, unknown> | undefined) ?? {};
        const index = typeof args[1] === 'number' ? args[1] : -1;
        const metadata = (args[2] as Record<string, unknown> | undefined) ?? {};
        const isCustom = mode === 'custom-onItemClick';

        const metadataConfigId = typeof metadata.configId === 'string' ? metadata.configId : undefined;
        const scopedConfigId = metadataConfigId ?? armedTargetByHookRef.current.onItemClick;

        if (scopedConfigId && lifecycleConfigIdSet.has(scopedConfigId)) {
          emitLifecycleMonitorEntry({
            hook: 'onItemClick',
            configId: scopedConfigId,
            detail: {
              itemName: item.name,
              index,
              metadata,
              source: metadata.source,
              mode: metadata.mode,
              customHook: isCustom,
            },
          });
        }
      },
    });

    widgemoRegistry.registerWidgemoHook({
      name: 'onModeChange',
      hook: (...args: unknown[]) => {
        const payload = (args[0] as Record<string, unknown> | undefined) ?? {};
        const payloadConfigId = typeof payload.configId === 'string' ? payload.configId : undefined;
        const scopedConfigId = payloadConfigId ?? armedTargetByHookRef.current.onModeChange;

        if (scopedConfigId && lifecycleConfigIdSet.has(scopedConfigId)) {
          emitLifecycleMonitorEntry({
            hook: 'onModeChange',
            configId: scopedConfigId,
            detail: {
              previousMode: payload.previousMode,
              nextMode: payload.nextMode,
              requestedMode: payload.requestedMode,
              breakpoint: payload.breakpoint,
              reason: payload.reason,
            },
          });
        }
      },
    });

    widgemoRegistry.registerWidgemoHook({
      name: 'onDragDrop',
      hook: (...args: unknown[]) => {
        const payload = (args[0] as Record<string, unknown> | undefined) ?? {};
        const payloadConfigId = typeof payload.configId === 'string' ? payload.configId : undefined;
        const scopedConfigId = payloadConfigId ?? armedTargetByHookRef.current.onDragDrop;

        if (scopedConfigId && lifecycleConfigIdSet.has(scopedConfigId)) {
          emitLifecycleMonitorEntry({
            hook: 'onDragDrop',
            configId: scopedConfigId,
            detail: {
              from: payload.from,
              to: payload.to,
              fromLocation: payload.fromLocation,
              toLocation: payload.toLocation,
              itemName: (payload.item as { name?: unknown } | undefined)?.name,
            },
          });
        }
      },
    });
  }, [postRenderWrapperEnabled]);

  useEffect(() => {
    applyLifecycleHooks(onItemClickHookMode);

    return () => {
      applyLifecycleHooks('default');
    };
  }, [applyLifecycleHooks, onItemClickHookMode]);

  useEffect(() => {
    const handler = (event: Event) => {
      const entry = (event as CustomEvent<LifecycleMonitorEntry>).detail;
      if (!entry || !entry.configId || !lifecycleConfigIdSet.has(entry.configId)) {
        return;
      }

      recordLifecycleEvidence(entry.configId, entry.hook, entry.detail);
    };

    window.addEventListener(LIFECYCLE_MONITOR_EVENT_NAME, handler as EventListener);

    return () => {
      window.removeEventListener(LIFECYCLE_MONITOR_EVENT_NAME, handler as EventListener);
    };
  }, [recordLifecycleEvidence]);

  const { currentTheme } = useTheme();

  const isDevEnvironment =
    import.meta.env.DEV ||
    window.location.hostname === 'dev.widgemo.com' ||
    window.location.hostname === 'localhost' ||
    window.location.hostname === '10.0.0.229';

  const [includeWidgemoInspector, setIncludeWidgemoInspectorState] = useState(() => {
    if (isDevEnvironment) {
      const saved = localStorage.getItem('widgemo-progressive-inspector-toggle');
      return saved === 'true';
    }
    return false;
  });

  const setIncludeWidgemoInspector = (value: boolean) => {
    setIncludeWidgemoInspectorState(value);
    if (isDevEnvironment) {
      localStorage.setItem('widgemo-progressive-inspector-toggle', value.toString());
    }
  };

  const examplesWithDevMode = useMemo(() => {
    if (!isDevEnvironment) {
      return progressiveExamples;
    }

    return progressiveExamples.map((example) => ({
      ...example,
      config: injectDevMode(example.config, includeWidgemoInspector),
    }));
  }, [includeWidgemoInspector, isDevEnvironment]);

  const lifecycleState = (configId: string): LifecycleExampleState => lifecycleStateByConfigId[configId] ?? emptyLifecycleState();

  const statusBadge = (configId: string, hook: LifecycleHookName, label: string) => {
    const fired = lifecycleState(configId).fired[hook] === true;
    return (
      <span className={`badge ${fired ? 'text-bg-success' : 'text-bg-secondary'}`}>
        {label}: {fired ? 'Hook fired' : 'Not fired'}
      </span>
    );
  };

  const summaryLine = (configId: string, hook: LifecycleHookName) => {
    const summary = lifecycleState(configId).lastPayload[hook] ?? 'No payload captured.';
    return (
      <div
        className="rounded p-2"
        style={{
          fontSize: '0.75rem',
          backgroundColor: 'var(--app-bg-primary)',
          border: '1px solid var(--app-border)',
          color: 'var(--app-text-muted)',
          fontFamily: 'monospace',
          lineHeight: 1.35,
        }}
      >
        Last payload summary: {summary}
      </div>
    );
  };

  const remountExample = (configId: string, hooksToClear: LifecycleHookName[]) => {
    clearLifecycleEvidence(configId, hooksToClear);
    bumpExampleRenderKey(configId);
  };

  const armItemClickCaptureFor = (configId: string) => {
    if (configId !== 'progressive-63' && onItemClickHookMode !== 'default') {
      setOnItemClickHookMode('default');
    }
    armHookCapture('onItemClick', configId);
    clearLifecycleEvidence(configId, ['onItemClick']);
  };

  const setExample61Viewport = (mode: ModeWidth) => {
    setExample61Width(mode);
    armHookCapture('onModeChange', 'progressive-61');
    clearLifecycleEvidence('progressive-61', ['onModeChange']);

    try {
      Object.defineProperty(window, 'innerWidth', {
        configurable: true,
        writable: true,
        value: mode === 'mobile' ? 500 : 1200,
      });
      window.dispatchEvent(new Event('resize'));
    } catch {
      // no-op
    }
  };

  const armDragDropCaptureFor62 = () => {
    armHookCapture('onDragDrop', 'progressive-62');
    clearLifecycleEvidence('progressive-62', ['onDragDrop']);
  };

  const setOnItemClickHookRegistration = (mode: LifecycleHookMode) => {
    setOnItemClickHookMode(mode);
    armHookCapture('onItemClick', 'progressive-63');
    clearLifecycleEvidence('progressive-63', ['onItemClick']);
  };

  const renderLifecyclePanel = (configId?: string) => {
    if (!configId || !lifecycleConfigIdSet.has(configId)) {
      return null;
    }

    if (configId === 'progressive-57') {
      return (
        <div
          className="mb-2 p-2 rounded"
          style={{ backgroundColor: 'var(--app-bg-secondary)', border: '1px solid var(--app-border)' }}
        >
          <div className="d-flex flex-wrap gap-2 align-items-center mb-2">
            {statusBadge(configId, 'preRender', 'preRender')}
            <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => remountExample(configId, ['preRender'])}>
              Mount / Refresh
            </button>
          </div>
          {summaryLine(configId, 'preRender')}
        </div>
      );
    }

    if (configId === 'progressive-58') {
      return (
        <div
          className="mb-2 p-2 rounded"
          style={{ backgroundColor: 'var(--app-bg-secondary)', border: '1px solid var(--app-border)' }}
        >
          <div className="d-flex flex-wrap gap-2 align-items-center mb-2">
            {statusBadge(configId, 'postRender', 'postRender')}
            <span className={`badge ${postRenderWrapperEnabled ? 'text-bg-info' : 'text-bg-dark'}`}>
              Wrapper path: {postRenderWrapperEnabled ? 'custom wrapped' : 'default passthrough'}
            </span>
            <button
              type="button"
              className="btn btn-sm btn-outline-primary"
              onClick={() => {
                setPostRenderWrapperEnabled((previous) => !previous);
                remountExample(configId, ['postRender']);
              }}
            >
              Toggle Wrapper Path
            </button>
            <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => remountExample(configId, ['postRender'])}>
              Refresh
            </button>
          </div>
          {summaryLine(configId, 'postRender')}
        </div>
      );
    }

    if (configId === 'progressive-59') {
      return (
        <div
          className="mb-2 p-2 rounded"
          style={{ backgroundColor: 'var(--app-bg-secondary)', border: '1px solid var(--app-border)' }}
        >
          <div className="d-flex flex-wrap gap-2 align-items-center mb-2">
            {statusBadge(configId, 'onItemClick', 'onItemClick')}
            <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => armItemClickCaptureFor(configId)}>
              Arm Carousel Click Capture
            </button>
            <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => clearLifecycleEvidence(configId, ['onItemClick'])}>
              Clear
            </button>
          </div>
          <div className="text-muted mb-2" style={{ fontSize: '0.75rem' }}>
            After arming, click a carousel indicator then a card. Source should show indicator vs card.
          </div>
          {summaryLine(configId, 'onItemClick')}
        </div>
      );
    }

    if (configId === 'progressive-60') {
      return (
        <div
          className="mb-2 p-2 rounded"
          style={{ backgroundColor: 'var(--app-bg-secondary)', border: '1px solid var(--app-border)' }}
        >
          <div className="d-flex flex-wrap gap-2 align-items-center mb-2">
            {statusBadge(configId, 'onItemClick', 'onItemClick')}
            <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => armItemClickCaptureFor(configId)}>
              Arm Board Click Capture
            </button>
            <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => clearLifecycleEvidence(configId, ['onItemClick'])}>
              Clear
            </button>
          </div>
          <div className="text-muted mb-2" style={{ fontSize: '0.75rem' }}>
            After arming, click any board card. Payload should include mode=board and column context.
          </div>
          {summaryLine(configId, 'onItemClick')}
        </div>
      );
    }

    if (configId === 'progressive-61') {
      return (
        <div
          className="mb-2 p-2 rounded"
          style={{ backgroundColor: 'var(--app-bg-secondary)', border: '1px solid var(--app-border)' }}
        >
          <div className="d-flex flex-wrap gap-2 align-items-center mb-2">
            {statusBadge(configId, 'onModeChange', 'onModeChange')}
            <span className={`badge ${example61Width === 'desktop' ? 'text-bg-primary' : 'text-bg-warning'}`}>
              Container mode: {example61Width}
            </span>
            <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => setExample61Viewport('desktop')}>
              Set Desktop Width
            </button>
            <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => setExample61Viewport('mobile')}>
              Set Mobile Width
            </button>
          </div>
          <div className="text-muted mb-2" style={{ fontSize: '0.75rem' }}>
            Buttons change local container width and trigger resize to produce deterministic mode transitions.
          </div>
          {summaryLine(configId, 'onModeChange')}
        </div>
      );
    }

    if (configId === 'progressive-62') {
      return (
        <div
          className="mb-2 p-2 rounded"
          style={{ backgroundColor: 'var(--app-bg-secondary)', border: '1px solid var(--app-border)' }}
        >
          <div className="d-flex flex-wrap gap-2 align-items-center mb-2">
            {statusBadge(configId, 'onDragDrop', 'onDragDrop')}
            <button type="button" className="btn btn-sm btn-outline-primary" onClick={armDragDropCaptureFor62}>
              Arm Drag Capture
            </button>
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary"
              onClick={() => {
                armDragDropCaptureFor62();
                remountExample(configId, ['onDragDrop']);
              }}
            >
              Reset Board
            </button>
          </div>
          <div className="text-muted mb-2" style={{ fontSize: '0.75rem' }}>
            Arm capture, drag a card between columns, then review from/to and location summary below.
          </div>
          {summaryLine(configId, 'onDragDrop')}
        </div>
      );
    }

    if (configId === 'progressive-63') {
      return (
        <div
          className="mb-2 p-2 rounded"
          style={{ backgroundColor: 'var(--app-bg-secondary)', border: '1px solid var(--app-border)' }}
        >
          <div className="d-flex flex-wrap gap-2 align-items-center mb-2">
            {statusBadge(configId, 'onItemClick', 'onItemClick')}
            <span className={`badge ${onItemClickHookMode === 'custom-onItemClick' ? 'text-bg-warning' : 'text-bg-success'}`}>
              Custom hook active: {onItemClickHookMode === 'custom-onItemClick' ? 'yes' : 'no'}
            </span>
            <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => setOnItemClickHookRegistration('default')}>
              Register Default Hook
            </button>
            <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => setOnItemClickHookRegistration('custom-onItemClick')}>
              Register Custom Hook
            </button>
          </div>
          <div className="text-muted mb-2" style={{ fontSize: '0.75rem' }}>
            Register a hook mode, then click an indicator or card in this example. Payload should show customHook=true only in custom mode.
          </div>
          {summaryLine(configId, 'onItemClick')}
        </div>
      );
    }

    return null;
  };

  const renderExample = (example: typeof examplesWithDevMode[number]) => {
    const harnessMode = exampleHarnessModeById[example.id] ?? 'app-theme';
    const shouldShowHookProbe =
      example.id === 'progressive-54-theme-hook-with-provider' ||
      example.id === 'progressive-55-theme-hook-without-provider';

    const configId = example.id;
    const renderKey = lifecycleConfigIdSet.has(configId)
      ? `${configId}-${exampleRenderKeyByConfigId[configId] ?? 0}`
      : configId;

    const widgetElement = harnessMode === 'no-provider'
      ? (
        <div key={renderKey}>
          {shouldShowHookProbe && <ThemeHookProbe label="useWidgemoTheme() probe" />}
          <Widgemo data={example.data} config={example.config} id={example.id} className="my-custom-widgemo" />
        </div>
      )
      : (
        <WidgemoThemeProvider
          key={renderKey}
          theme={
            harnessMode === 'provider-light'
              ? 'light'
              : harnessMode === 'provider-dark'
                ? 'dark'
                : harnessMode === 'provider-auto'
                  ? 'auto'
                  : currentTheme
          }
        >
          {shouldShowHookProbe && <ThemeHookProbe label="useWidgemoTheme() probe" />}
          <Widgemo data={example.data} config={example.config} id={example.id} className="my-custom-widgemo" />
        </WidgemoThemeProvider>
      );

    if (configId === 'progressive-61') {
      return (
        <div
          style={{
            width: example61Width === 'mobile' ? '500px' : '100%',
            maxWidth: '100%',
            transition: 'width 220ms ease',
          }}
        >
          {widgetElement}
        </div>
      );
    }

    return widgetElement;
  };

  return (
    <div
      className="container"
      style={{
        minHeight: '100vh',
        padding: '1.5rem',
        paddingTop: '3rem',
      }}
    >
      <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem' }}>Progressive Examples</h1>
      <p className="mb-1 text-muted" style={{ fontSize: '0.875rem' }}>
        This page contains a progressive sequence of Widgemo examples from minimal defaults to advanced configurations.
      </p>
      <p className="mb-3 text-muted" style={{ fontSize: '0.875rem' }}>
        Each item adds a few settings so you can observe how configuration evolves the same data through richer behaviors and modes.
      </p>

      {isDevEnvironment && (
        <div
          className="mb-4 p-3 rounded"
          style={{ backgroundColor: 'var(--app-bg-secondary)', border: '1px solid var(--app-border)' }}
        >
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="widgemo-progressive-inspector-toggle"
              checked={includeWidgemoInspector}
              onChange={(e) => setIncludeWidgemoInspector(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="widgemo-progressive-inspector-toggle">
              <strong>Include Widgemo Inspector</strong>
            </label>
          </div>
        </div>
      )}

      <div className="row">
        <div className="col-12 mb-4">
          <h2 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.1rem' }}>ContainerFrame In Context</h2>
          <p style={{ fontSize: '0.8125rem', color: 'var(--app-text-muted)', marginBottom: '0.75rem' }}>
            Practical shell treatments showing how containerFrame changes border, shadow, radius, accenting, and overflow behavior in real widget contexts.
          </p>
          <div className="row g-3">
            {containerFrameShowcaseCards.map((card) => (
              <div key={card.id} className="col-12 col-xl-6">
                <div className="h-100">
                  <h3 style={{ fontSize: '0.98rem', fontWeight: 600, marginBottom: '0.35rem' }}>{card.title}</h3>
                  <div style={card.hostStyle}>
                    <div style={card.shellStyle}>
                      <WidgemoThemeProvider theme={currentTheme}>
                        <Widgemo
                          data={card.data}
                          config={injectDevMode(card.config, includeWidgemoInspector)}
                          className="my-custom-widgemo"
                        />
                      </WidgemoThemeProvider>
                    </div>
                  </div>
                  <p style={{ fontSize: '0.78rem', color: 'var(--app-text-muted)', marginTop: '0.45rem', marginBottom: 0 }}>
                    {card.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {examplesWithDevMode.map((example) => {
          const configId = example.id;
          return (
            <div key={example.id} className="col-12 mb-3">
              <h2 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.1rem' }}>{example.title}</h2>
              <p style={{ fontSize: '0.8125rem', color: 'var(--app-text-muted)', marginBottom: '0.5rem' }}>
                {example.description}
              </p>
              {renderLifecyclePanel(configId)}
              {renderExample(example)}
            </div>
          );
        })}
      </div>

      <DemoActionModal payload={actionPayload} onClose={() => setActionPayload(null)} />
    </div>
  );
};

export default ProgressiveExamplesPage;
