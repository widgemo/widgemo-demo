import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Widgemo,
  type ActionConfig,
  type BoardModeConfig,
  type ChartModeConfig,
  type ChartTooltipContext,
  type ContentConfig,
  type Entity,
  type FieldConfig,
  type InteractionContext,
  type ItemConfig,
  type ModeConfig,
  type TableModeConfig,
  type WidgemoConfig,
} from '@widgemo/widgemo-core';
import {
  accountScopeLabels,
  forecastHorizonLabels,
  riskPostureLabels,
  getAlerts,
  getCashEvents,
  getCashflowKpis,
  getForecastPoints,
  getScenarios,
  getTransactions,
  type AccountScope,
  type ForecastHorizon,
  type RiskPosture,
} from '../data/cashflowDashboardData';

const autoItemLayout = { type: 'auto' as const };

const createItem = (fields: FieldConfig[], overrides: Partial<ItemConfig<Entity>> = {}): ItemConfig<Entity> => ({
  fields,
  layout: autoItemLayout,
  ...overrides,
});

const createGridContent = (
  fields: FieldConfig[],
  overrides: Omit<Partial<ContentConfig<Entity>>, 'mode' | 'item' | 'modeConfig'> & {
    grid?: NonNullable<ModeConfig['grid']>;
    item?: Partial<ItemConfig<Entity>>;
  } = {},
): ContentConfig<Entity> => {
  const { grid, item, ...rest } = overrides;

  return {
    mode: 'grid',
    ...(grid ? { modeConfig: { grid } } : {}),
    item: createItem(fields, item),
    ...rest,
  };
};

const createTableContent = (
  fields: FieldConfig[],
  overrides: Omit<Partial<ContentConfig<Entity>>, 'mode' | 'item' | 'modeConfig'> & {
    table?: TableModeConfig;
    item?: Partial<ItemConfig<Entity>>;
  } = {},
): ContentConfig<Entity> => {
  const { table, item, ...rest } = overrides;

  return {
    mode: 'table',
    ...(table ? { modeConfig: { table } } : {}),
    item: createItem(fields, item),
    ...rest,
  };
};

const createBoardContent = (
  fields: FieldConfig[],
  overrides: Omit<Partial<ContentConfig<Entity>>, 'mode' | 'item' | 'modeConfig'> & {
    board?: BoardModeConfig;
    item?: Partial<ItemConfig<Entity>>;
  } = {},
): ContentConfig<Entity> => {
  const { board, item, ...rest } = overrides;

  return {
    mode: 'board',
    ...(board ? { modeConfig: { board } } : {}),
    item: createItem(fields, item),
    ...rest,
  };
};

const createCarouselContent = (
  fields: FieldConfig[],
  overrides: Omit<Partial<ContentConfig<Entity>>, 'mode' | 'item' | 'modeConfig'> & {
    carousel?: NonNullable<ModeConfig['carousel']>;
    item?: Partial<ItemConfig<Entity>>;
  } = {},
): ContentConfig<Entity> => {
  const { carousel, item, ...rest } = overrides;

  return {
    mode: 'carousel',
    ...(carousel ? { modeConfig: { carousel } } : {}),
    item: createItem(fields, item),
    ...rest,
  };
};

const createChartContent = (
  fields: FieldConfig[],
  overrides: Omit<Partial<ContentConfig<Entity>>, 'mode' | 'item' | 'modeConfig'> & {
    chart?: ChartModeConfig;
    item?: Partial<ItemConfig<Entity>>;
  } = {},
): ContentConfig<Entity> => {
  const { chart, item, ...rest } = overrides;

  return {
    mode: 'chart',
    ...(chart ? { modeConfig: { chart } } : {}),
    item: createItem(fields, item),
    ...rest,
  };
};

const createCustomModeContent = (
  mode: string,
  fields: FieldConfig[],
  modeConfig: Record<string, unknown>,
  overrides: Omit<Partial<ContentConfig<Entity>>, 'mode' | 'item' | 'modeConfig'> & {
    item?: Partial<ItemConfig<Entity>>;
  } = {},
): ContentConfig<Entity> => {
  const { item, ...rest } = overrides;

  return {
    mode,
    modeConfig,
    item: createItem(fields, item),
    ...rest,
  };
};

const accountScopeOptions: AccountScope[] = ['all', 'personal', 'business', 'joint'];
const horizonOptions: ForecastHorizon[] = ['7d', '30d', '90d'];
const postureOptions: RiskPosture[] = ['conservative', 'expected', 'aggressive'];

type DashboardNavKey = 'command' | 'accounts' | 'approvals' | 'autopilot' | 'settings';

const dashboardNavItems: Array<{ key: DashboardNavKey; label: string; icon: string; implemented: boolean }> = [
  { key: 'command', label: 'Command Center', icon: 'finance-forecast', implemented: true },
  { key: 'accounts', label: 'Accounts', icon: 'finance-wallet', implemented: false },
  { key: 'approvals', label: 'Approvals', icon: 'finance-transfer', implemented: false },
  { key: 'autopilot', label: 'Autopilot Rules', icon: 'finance-autopay', implemented: false },
  { key: 'settings', label: 'Settings', icon: 'finance-reserve', implemented: false },
];

export const CashflowDashboardPage: React.FC = () => {
  const [activeNav, setActiveNav] = useState<DashboardNavKey>('command');
  const [selectedScope, setSelectedScope] = useState<AccountScope>('all');
  const [selectedHorizon, setSelectedHorizon] = useState<ForecastHorizon>('30d');
  const [selectedPosture, setSelectedPosture] = useState<RiskPosture>('expected');
  const [focusedAlertId, setFocusedAlertId] = useState<string | null>(null);
  const [showInspector, setShowInspector] = useState(true);
  const [demoNotice, setDemoNotice] = useState<string | null>(null);

  const showDemoNotice = useCallback((actionLabel: string) => {
    setDemoNotice(`${actionLabel} is part of this demo/showcase and is not fully implemented yet.`);
  }, []);

  useEffect(() => {
    if (!demoNotice) {
      return;
    }

    const timeoutId = window.setTimeout(() => setDemoNotice(null), 3600);
    return () => window.clearTimeout(timeoutId);
  }, [demoNotice]);

  const kpiRows = useMemo(
    () => getCashflowKpis(selectedScope, selectedHorizon, selectedPosture),
    [selectedScope, selectedHorizon, selectedPosture],
  );
  const forecastRows = useMemo(
    () => getForecastPoints(selectedScope, selectedHorizon, selectedPosture),
    [selectedScope, selectedHorizon, selectedPosture],
  );
  const eventsRows = useMemo(
    () => getCashEvents(selectedScope, selectedHorizon),
    [selectedScope, selectedHorizon],
  );
  const transactionRows = useMemo(
    () => getTransactions(selectedScope, selectedPosture),
    [selectedScope, selectedPosture],
  );
  const alertRows = useMemo(
    () => getAlerts(selectedScope, selectedPosture),
    [selectedScope, selectedPosture],
  );
  const scenarioRows = useMemo(
    () => getScenarios(selectedScope, selectedHorizon, selectedPosture),
    [selectedScope, selectedHorizon, selectedPosture],
  );

  const injectDevMode = (config: WidgemoConfig<Entity>): WidgemoConfig<Entity> => {
    if (config.devMode && typeof config.devMode === 'object') {
      return {
        ...config,
        devMode: {
          ...config.devMode,
          enabled: showInspector,
        },
      };
    }

    return {
      ...config,
      devMode: showInspector,
    };
  };

  const scopeActions = useMemo<ActionConfig<Entity>[]>(
    () => accountScopeOptions.map((scope) => ({
      id: `scope-${scope}`,
      label: accountScopeLabels[scope],
      icon: 'finance-wallet',
      placement: scope === selectedScope ? 'pinned' : 'menu',
      variant: scope === selectedScope ? 'primary' : 'secondary',
      onAction: () => setSelectedScope(scope),
    })),
    [selectedScope],
  );

  const horizonActions = useMemo<ActionConfig<Entity>[]>(
    () => horizonOptions.map((horizon) => ({
      id: `horizon-${horizon}`,
      label: forecastHorizonLabels[horizon],
      icon: 'finance-forecast',
      placement: horizon === selectedHorizon ? 'pinned' : 'menu',
      variant: horizon === selectedHorizon ? 'primary' : 'secondary',
      onAction: () => setSelectedHorizon(horizon),
    })),
    [selectedHorizon],
  );

  const postureActions = useMemo<ActionConfig<Entity>[]>(
    () => postureOptions.map((posture) => ({
      id: `posture-${posture}`,
      label: riskPostureLabels[posture],
      icon: 'finance-alert',
      placement: posture === selectedPosture ? 'pinned' : 'menu',
      variant: posture === selectedPosture ? 'warning' : 'secondary',
      onAction: () => setSelectedPosture(posture),
    })),
    [selectedPosture],
  );

  const kpiFields = useMemo<FieldConfig[]>(
    () => [
      { key: 'title', label: 'Metric', type: 'text', showLabel: false, wrap: false },
      {
        key: 'value',
        label: 'Value',
        type: 'number',
        renderAs: 'currency',
        renderAsOptions: { currency: 'USD', locale: 'en-US', compact: true },
        showLabel: false,
      },
      {
        key: 'delta',
        label: 'Delta',
        type: 'number',
        renderAs: 'cashDelta',
        renderAsOptions: { showArrow: true, precision: 0 },
        showLabel: false,
      },
      {
        key: 'healthScore',
        label: 'Health',
        type: 'number',
        renderAs: 'accountHealthMeter',
        renderAsOptions: { showNumeric: true },
        showLabel: false,
      },
      {
        key: 'confidence',
        label: 'Confidence',
        type: 'number',
        renderAs: 'forecastConfidence',
        showLabel: false,
      },
      {
        key: 'status',
        label: 'Status',
        type: 'text',
        renderAs: 'cashPill',
        renderAsOptions: { compact: true },
        showLabel: false,
      },
    ],
    [],
  );

  const summaryConfig = useMemo<WidgemoConfig<Entity>>(
    () => ({
      id: 'cashflow-liquidity-snapshot',
      containerShadow: 'none',
      zones: {
        header: {
          title: 'Liquidity Snapshot',
          subtitle: `${accountScopeLabels[selectedScope]} · ${forecastHorizonLabels[selectedHorizon]} · ${riskPostureLabels[selectedPosture]}`,
          icon: 'finance-reserve',
          actions: [...scopeActions, ...horizonActions, ...postureActions],
          actionOverflow: { maxInline: { mobile: 1, tablet: 2, desktop: 4 }, menuLabel: 'Filters' },
          themeOverrides: {
            backgroundColor: 'var(--app-bg-secondary)',
            borderColor: 'var(--app-border)',
            padding: '0.7rem 0.85rem 0.55rem',
            borderRadius: '1px 1px 0 0',
            iconSize: 24,
          },
        },
        content: createGridContent(kpiFields, {
          grid: { minItemWidth: '260px', gap: '0.8rem', maxColumns: 4 },
          item: {
            cardOptions: {
              border: true,
              borderColor: 'var(--app-border)',
              borderRadius: '2px',
              backgroundColor: 'var(--app-bg-primary)',
              boxShadow: '0 8px 20px rgba(15, 23, 42, 0.06)',
            },
            conditionalBorder: (row) => {
              const status = String(row.status ?? 'watch');
              const color = status === 'healthy' ? '#2f855a' : status === 'critical' ? '#c53030' : '#c05621';
              return { color, thickness: 3, placement: 'top' };
            },
          },
          themeOverrides: {
            backgroundColor: 'var(--app-bg-secondary)',
            borderColor: 'var(--app-border)',
            padding: '0.62rem 0.85rem 0.75rem',
            borderRadius: '0 0 1px 1px',
          },
        }),
        footer: {
          subtitle: `${kpiRows.length} KPI records · Scope ${accountScopeLabels[selectedScope]} · Horizon ${forecastHorizonLabels[selectedHorizon]}`,
          style: { padding: '0.2rem 0.5rem', fontSize: '0.68rem', lineHeight: 1.2 },
        },
      },
    }),
    [
      accountScopeLabels,
      forecastHorizonLabels,
      horizonActions,
      kpiFields,
      kpiRows.length,
      postureActions,
      scopeActions,
      selectedHorizon,
      selectedPosture,
      selectedScope,
    ],
  );

  const forecastFields = useMemo<FieldConfig[]>(
    () => [
      { key: 'label', label: 'Window', type: 'text' },
      { key: 'checkingProjected', label: 'Checking', type: 'number' },
      { key: 'savingsProjected', label: 'Savings', type: 'number' },
      { key: 'reserveFloor', label: 'Reserve', type: 'number' },
      { key: 'confidence', label: 'Confidence', type: 'number' },
    ],
    [],
  );

  const forecastConfig = useMemo<WidgemoConfig<Entity>>(
    () => ({
      id: 'cashflow-forecast-widget',
      containerShadow: 'none',
      collapse: { initialState: 'expanded' },
      zones: {
        header: {
          title: 'Multi-Account Forecast',
          icon: 'finance-forecast',
          actions: horizonActions,
          actionOverflow: { maxInline: { mobile: 1, tablet: 2, desktop: 3 }, menuLabel: 'Horizon' },
          themeOverrides: {
            backgroundColor: 'var(--app-bg-secondary)',
            borderColor: 'var(--app-border)',
            padding: '0.7rem 0.85rem 0.55rem',
            borderRadius: '3px 3px 0 0',
            iconSize: 24,
          },
        },
        content: createChartContent(forecastFields, {
          chart: {
            xAxis: 'label',
            series: [
              { type: 'bar', key: 'checkingProjected', label: 'Checking', color: '#5f4b8b' },
              { type: 'line', key: 'savingsProjected', label: 'Savings', color: '#4c7a97', showDots: true, lineThickness: 3.8 },
              { type: 'area', key: 'reserveFloor', label: 'Reserve Floor', color: '#7a8799', areaGradient: true },
            ],
            height: 330,
            showGrid: true,
            showLegend: true,
            legendAlign: 'center',
            tooltip: {
              position: 'top-right',
              render: (ctx: ChartTooltipContext) => {
                const row = ctx.entity as Entity;
                const lowPoint = Number(row.projectedMin ?? 0);
                const confidence = Number(row.confidence ?? 0);
                return (
                  <div style={{ minWidth: '215px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                      <strong>{String(row.label ?? '')}</strong>
                      <span style={{ fontSize: '0.72rem', color: 'var(--app-text-muted)' }}>{ctx.seriesKey}</span>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '3px 8px', fontSize: '12px' }}>
                      <span style={{ color: 'var(--app-text-muted)' }}>Series Value</span>
                      <span style={{ textAlign: 'right', fontWeight: 700 }}>${Math.round(ctx.value).toLocaleString()}</span>
                      <span style={{ color: 'var(--app-text-muted)' }}>Projected Min</span>
                      <span style={{ textAlign: 'right', fontWeight: 700 }}>${Math.round(lowPoint).toLocaleString()}</span>
                      <span style={{ color: 'var(--app-text-muted)' }}>Confidence</span>
                      <span style={{ textAlign: 'right', fontWeight: 700 }}>{confidence}%</span>
                    </div>
                  </div>
                );
              },
            },
          },
          themeOverrides: {
            backgroundColor: 'var(--app-bg-secondary)',
            borderColor: 'var(--app-border)',
            padding: '0.28rem 0.75rem 0.6rem',
            borderRadius: '0 0 3px 3px',
          },
        }),
        footer: {
          subtitle: `${forecastRows.length} forecast points · ${selectedHorizon.toUpperCase()} timeline · ${riskPostureLabels[selectedPosture]} posture`,
          style: { padding: '0.2rem 0.5rem', fontSize: '0.68rem', lineHeight: 1.2 },
        },
      },
    }),
    [forecastFields, forecastRows.length, horizonActions, riskPostureLabels, selectedHorizon, selectedPosture],
  );

  const eventFields = useMemo<FieldConfig[]>(
    () => [
      { key: 'label', label: 'Event', type: 'text' },
      { key: 'amount', label: 'Amount', type: 'number' },
      { key: 'accountName', label: 'Account', type: 'text' },
      { key: 'status', label: 'Status', type: 'text' },
      { key: 'date', label: 'Date', type: 'date' },
    ],
    [],
  );

  const eventsConfig = useMemo<WidgemoConfig<Entity>>(
    () => ({
      id: 'cashflow-events-timeline-widget',
      containerShadow: 'none',
      zones: {
        header: {
          title: 'Upcoming Events',
          icon: 'finance-transfer',
          actions: scopeActions,
          actionOverflow: { maxInline: { mobile: 1, tablet: 2, desktop: 3 }, menuLabel: 'Accounts' },
          themeOverrides: {
            backgroundColor: 'var(--app-bg-secondary)',
            borderColor: 'var(--app-border)',
            padding: '0.7rem 0.85rem 0.55rem',
            borderRadius: '3px 3px 0 0',
            iconSize: 24,
          },
        },
        content: createCustomModeContent(
          'cashflow-timeline',
          eventFields,
          {
            cashflowTimeline: {
              dateField: 'date',
              labelField: 'label',
              amountField: 'amount',
              directionField: 'direction',
              accountField: 'accountName',
              statusField: 'status',
              showRunningBalance: true,
              highlightWindowDays: selectedHorizon === '7d' ? 3 : 7,
            },
          },
          {
            themeOverrides: {
              backgroundColor: 'var(--app-bg-secondary)',
              borderColor: 'var(--app-border)',
              padding: '0.38rem 0.45rem 0.35rem',
              borderRadius: '0 0 3px 3px',
            },
          },
        ),
      },
    }),
    [eventFields, scopeActions, selectedHorizon, selectedScope],
  );

  const transactionFields = useMemo<FieldConfig[]>(
    () => [
      {
        key: 'merchant',
        label: 'Merchant',
        type: 'text',
        renderAs: 'transactionMeta',
        renderAsOptions: { showAccount: true },
        sortable: true,
        width: '240px',
      },
      { key: 'postedAt', label: 'Posted', type: 'date', sortable: true, width: '120px' },
      {
        key: 'flowType',
        label: 'Flow',
        type: 'text',
        renderAs: 'cashPill',
        renderAsOptions: { compact: true },
        width: '100px',
      },
      {
        key: 'amountSigned',
        label: 'Amount',
        type: 'number',
        renderAs: 'currency',
        renderAsOptions: { currency: 'USD', locale: 'en-US' },
        sortable: true,
        width: '120px',
      },
      {
        key: 'anomalyScore',
        label: 'Anomaly',
        type: 'number',
        renderAs: 'forecastConfidence',
        renderAsOptions: { compact: true },
        width: '115px',
      },
      {
        key: 'recurrence',
        label: 'Recurrence',
        type: 'text',
        renderAs: 'cashPill',
        renderAsOptions: { compact: true },
        width: '110px',
      },
      { key: 'tags', label: 'Tags', type: 'text', width: '190px', wrap: true },
    ],
    [],
  );

  const transactionConfig = useMemo<WidgemoConfig<Entity>>(
    () => ({
      id: 'cashflow-transactions-widget',
      containerShadow: 'none',
      collapse: { initialState: 'expanded' },
      zones: {
        header: {
          title: 'Transactions Intelligence',
          icon: 'finance-income',
          actions: postureActions,
          actionOverflow: { maxInline: { mobile: 1, tablet: 2, desktop: 3 }, menuLabel: 'Risk Posture' },
          themeOverrides: {
            backgroundColor: 'var(--app-bg-secondary)',
            borderColor: 'var(--app-border)',
            padding: '0.7rem 0.85rem 0.55rem',
            borderRadius: '3px 3px 0 0',
            iconSize: 24,
          },
        },
        content: createTableContent(transactionFields, {
          table: {
            type: 'traditional',
            hover: true,
            striped: true,
            showHeader: true,
          },
          search: { enabled: true, placeholder: 'Search merchant, category, or tag' },
          pagination: { pageSize: 8 },
          sorting: [{ fieldKey: 'postedAt', direction: 'desc' }],
          actions: [
            {
              id: 'categorize-transaction',
              label: 'Categorize',
              icon: 'finance-transfer',
              placement: 'pinned',
              variant: 'secondary',
              onAction: (_ctx: InteractionContext) => showDemoNotice('Categorize transaction'),
            },
            {
              id: 'add-watchlist',
              label: 'Watch',
              icon: 'finance-alert',
              placement: 'menu',
              onAction: (_ctx: InteractionContext) => showDemoNotice('Add transaction to watch list'),
            },
          ],
          themeOverrides: {
            backgroundColor: 'var(--app-bg-secondary)',
            borderColor: 'var(--app-border)',
            padding: '0.62rem 0.85rem 0.75rem',
            borderRadius: '0 0 3px 3px',
          },
        }),
        footer: {
          subtitle: `${transactionRows.length} transactions · sorted by newest first · searchable across merchant/category/tag`,
          style: { padding: '0.2rem 0.5rem', fontSize: '0.68rem', lineHeight: 1.2 },
        },
      },
    }),
    [postureActions, showDemoNotice, transactionFields, transactionRows.length],
  );

  const alertFields = useMemo<FieldConfig[]>(
    () => [
      { key: 'title', label: 'Alert', type: 'text', wrap: true },
      {
        key: 'severity',
        label: 'Severity',
        type: 'text',
        renderAs: 'cashPill',
        renderAsOptions: { compact: true },
      },
      { key: 'accountName', label: 'Account', type: 'text' },
      {
        key: 'predictedImpact',
        label: 'Impact',
        type: 'number',
        renderAs: 'currency',
        renderAsOptions: { currency: 'USD', locale: 'en-US' },
      },
      { key: 'recommendation', label: 'Recommendation', type: 'text', wrap: true },
    ],
    [],
  );

  const boardConfig = useMemo<WidgemoConfig<Entity>>(
    () => ({
      id: 'cashflow-alerts-board-widget',
      containerShadow: 'none',
      collapse: { initialState: 'expanded' },
      zones: {
        header: {
          title: 'Alerts Triage',
          subtitle: 'Prioritize forecast risks and cashflow exceptions by severity',
          icon: 'finance-alert',
          themeOverrides: {
            backgroundColor: 'var(--app-bg-secondary)',
            borderColor: 'var(--app-border)',
            padding: '0.7rem 0.85rem 0.55rem',
            borderRadius: '3px 3px 0 0',
            iconSize: 24,
          },
        },
        content: createBoardContent(alertFields, {
          board: {
            columns: {
              field: 'lane',
              items: [
                { id: 'critical', label: 'Critical', value: 'Critical', color: '#c53030' },
                { id: 'watch', label: 'Watch', value: 'Watch', color: '#c05621' },
                { id: 'info', label: 'Info', value: 'Info', color: '#4a5568' },
              ],
            },
            dragEnabled: true,
          },
          gestures: [
            {
              type: 'item-click',
              enabled: true,
              interactionId: 'cashflow-alert-focus',
              interactionLabel: 'Focus Alert',
              onTrigger: (ctx: InteractionContext) => {
                setFocusedAlertId(String(ctx.entity?.id ?? ''));
              },
            },
          ],
          actions: [
            {
              id: 'resolve-alert',
              label: 'Resolve',
              icon: 'finance-reserve',
              placement: 'menu',
              onAction: (_ctx: InteractionContext) => showDemoNotice('Resolve alert'),
            },
          ],
          themeOverrides: {
            backgroundColor: 'var(--app-bg-secondary)',
            borderColor: 'var(--app-border)',
            padding: '0.62rem 0.85rem 0.75rem',
            borderRadius: '0 0 3px 3px',
          },
        }),
        footer: {
          subtitle: `${alertRows.length} alerts · ${alertRows.filter((row) => row.lane === 'Critical').length} critical · ${alertRows.filter((row) => row.lane === 'Watch').length} watch`,
          style: { padding: '0.2rem 0.5rem', fontSize: '0.68rem', lineHeight: 1.2 },
        },
      },
    }),
    [alertFields, alertRows, showDemoNotice],
  );

  const scenarioFields = useMemo<FieldConfig[]>(
    () => [
      { key: 'title', label: 'Scenario', type: 'text', showLabel: false, wrap: true },
      { key: 'summary', label: 'Summary', type: 'text', showLabel: false, wrap: true },
      {
        key: 'impactAmount',
        label: 'Impact',
        type: 'number',
        renderAs: 'currency',
        renderAsOptions: { currency: 'USD', locale: 'en-US', compact: false },
        showLabel: false,
      },
      {
        key: 'status',
        label: 'Status',
        type: 'text',
        renderAs: 'cashPill',
        renderAsOptions: { compact: true },
        showLabel: false,
      },
      {
        key: 'confidence',
        label: 'Confidence',
        type: 'number',
        renderAs: 'forecastConfidence',
        showLabel: false,
      },
    ],
    [],
  );

  const scenarioConfig = useMemo<WidgemoConfig<Entity>>(
    () => ({
      id: 'cashflow-scenarios-widget',
      containerShadow: 'none',
      collapse: { initialState: 'collapsed' },
      zones: {
        header: {
          title: 'Scenario Playbook',
          subtitle: focusedAlertId ? `Focused on alert ${focusedAlertId}` : 'Actionable playbook recommendations',
          icon: 'finance-autopay',
          actions: scopeActions,
          actionOverflow: { maxInline: { mobile: 1, tablet: 2, desktop: 3 }, menuLabel: 'Scope' },
          themeOverrides: {
            backgroundColor: 'var(--app-bg-secondary)',
            borderColor: 'var(--app-border)',
            padding: '0.7rem 0.85rem 0.55rem',
            borderRadius: '3px 3px 0 0',
            iconSize: 24,
          },
        },
        content: createCarouselContent(scenarioFields, {
          carousel: {
            showIndicators: true,
            showArrows: true,
            autoPlay: false,
          },
          item: {
            cardOptions: {
              border: true,
              borderColor: 'var(--app-border)',
              borderRadius: '2px',
              padding: '0.75rem',
              backgroundColor: 'var(--app-bg-primary)',
              boxShadow: '0 10px 24px rgba(15, 23, 42, 0.08)',
            },
          },
          actions: [
            {
              id: 'apply-scenario',
              label: 'Apply',
              icon: 'finance-transfer',
              placement: 'pinned',
              onAction: (_ctx: InteractionContext) => showDemoNotice('Apply scenario'),
            },
            {
              id: 'inspect-scenario',
              label: 'Inspect',
              icon: 'finance-forecast',
              placement: 'menu',
              onAction: (_ctx: InteractionContext) => showDemoNotice('Inspect scenario'),
            },
          ],
          themeOverrides: {
            backgroundColor: 'var(--app-bg-secondary)',
            borderColor: 'var(--app-border)',
            padding: '0.62rem 0.85rem 0.75rem',
            borderRadius: '0 0 3px 3px',
          },
        }),
        footer: {
          subtitle: `${scenarioRows.length} scenarios · avg confidence ${Math.round(
            scenarioRows.reduce((sum, row) => sum + (Number(row.confidence) || 0), 0) / Math.max(scenarioRows.length, 1),
          )}% · ${focusedAlertId ? 'filtered by focused alert context' : 'global recommendations'}`,
          style: { padding: '0.2rem 0.5rem', fontSize: '0.68rem', lineHeight: 1.2 },
        },
      },
    }),
    [focusedAlertId, scenarioFields, scenarioRows, scopeActions, showDemoNotice],
  );

  return (
    <div
      style={{
        minHeight: '100vh',
        padding: '0.65rem 0.8rem',
        background: 'linear-gradient(180deg, var(--app-bg-primary) 0%, var(--app-bg-secondary) 100%)',
      }}
    >
      <div className="container-fluid" style={{ maxWidth: '1700px' }}>
        <div className="row g-2">
          <aside className="col-12 col-lg-3 col-xl-2">
            <div
              style={{
                position: 'sticky',
                top: '76px',
                border: '1px solid var(--app-border)',
                backgroundColor: 'var(--app-bg-secondary)',
                borderRadius: '3px',
                padding: '0.5rem',
                display: 'grid',
                gap: '0.5rem',
              }}
            >
              <div style={{ padding: '0.35rem 0.35rem 0.55rem' }}>
                <div style={{ fontSize: '0.72rem', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--app-text-muted)' }}>
                  Cashflow App
                </div>
                <strong style={{ fontSize: '0.98rem' }}>Navigation</strong>
              </div>
              {dashboardNavItems.map((item) => {
                const isActive = item.key === activeNav;
                return (
                  <button
                    key={item.key}
                    type="button"
                    className="btn btn-sm text-start"
                    onClick={() => {
                      setActiveNav(item.key);
                      if (!item.implemented) {
                        showDemoNotice(`${item.label} section`);
                      }
                    }}
                    style={{
                      borderRadius: '2px',
                      border: `1px solid ${isActive ? '#5f4b8b' : 'var(--app-border)'}`,
                      backgroundColor: isActive ? 'rgba(95, 75, 139, 0.14)' : 'var(--app-bg-primary)',
                      color: 'var(--app-text-primary)',
                      fontWeight: isActive ? 700 : 500,
                      padding: '0.4rem 0.5rem',
                    }}
                  >
                    {item.label}
                  </button>
                );
              })}

              <div style={{ marginTop: '0.3rem', borderTop: '1px solid var(--app-border)', paddingTop: '0.55rem' }}>
                <button
                  type="button"
                  className="btn btn-outline-secondary btn-sm w-100"
                  onClick={() => showDemoNotice('Run cashflow autopilot')}
                >
                  Run Autopilot
                </button>
              </div>
            </div>
          </aside>

          <main className="col-12 col-lg-9 col-xl-10">
            <div style={{ marginBottom: '0.55rem' }}>
              <div className="d-flex flex-wrap justify-content-between align-items-start gap-3">
                <div>
                  <h1 style={{ fontSize: '1.9rem', fontWeight: 700, marginBottom: '0.25rem' }}>Cash Flow Command Center</h1>
                  <p style={{ marginBottom: '0.25rem', color: 'var(--app-text-muted)', maxWidth: '980px' }}>
                    Registry showcase dashboard built almost entirely from Widgemo tiles with mixed styles: minimal and rich headers,
                    footer zones, collapsed sections, borderless modules, and custom renderers/modes.
                  </p>
                  <p style={{ marginBottom: 0, color: 'var(--app-text-muted)', fontSize: '0.92rem' }}>
                    Current context: {accountScopeLabels[selectedScope]} · {forecastHorizonLabels[selectedHorizon]} · {riskPostureLabels[selectedPosture]}
                  </p>
                </div>
                <div className="d-flex flex-column gap-2" style={{ minWidth: '280px' }}>
                  <div className="p-2 rounded d-flex gap-2" style={{ backgroundColor: 'var(--app-bg-secondary)', border: '1px solid var(--app-border)', borderRadius: '2px' }}>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => showDemoNotice('Export dashboard bundle')}
                    >
                      Export
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => showDemoNotice('Share dashboard snapshot')}
                    >
                      Share
                    </button>
                  </div>
                  <div
                    className="p-3 rounded"
                    style={{ backgroundColor: 'var(--app-bg-secondary)', border: '1px solid var(--app-border)', borderRadius: '2px' }}
                  >
                    <div className="form-check mb-0">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="cashflow-dashboard-inspector-toggle"
                        checked={showInspector}
                        onChange={(e) => setShowInspector(e.target.checked)}
                      />
                      <label className="form-check-label" htmlFor="cashflow-dashboard-inspector-toggle">
                        <strong>Show Widgemo Inspector</strong>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {demoNotice && (
              <div
                className="alert alert-warning py-2 px-3"
                role="status"
                style={{ borderRadius: '2px', border: '1px solid rgba(192, 86, 33, 0.4)', marginBottom: '0.5rem' }}
              >
                {demoNotice}
              </div>
            )}

            <div className="row g-2">
              <div className="col-12">
                <Widgemo data={kpiRows} config={injectDevMode(summaryConfig)} />
              </div>

              <div className="col-12 col-xxl-8 d-flex">
                <div className="w-100 h-100">
                  <Widgemo data={forecastRows} config={injectDevMode(forecastConfig)} />
                </div>
              </div>

              <div className="col-12 col-xxl-4 d-flex">
                <div className="w-100 h-100">
                  <Widgemo data={eventsRows} config={injectDevMode(eventsConfig)} />
                </div>
              </div>

              <div className="col-12 col-xl-8 d-flex">
                <div className="w-100 h-100">
                  <Widgemo data={transactionRows} config={injectDevMode(transactionConfig)} />
                </div>
              </div>

              <div className="col-12 col-xl-4 d-flex">
                <div className="w-100 h-100">
                  <Widgemo data={scenarioRows} config={injectDevMode(scenarioConfig)} />
                </div>
              </div>

              <div className="col-12">
                <Widgemo data={alertRows} config={injectDevMode(boardConfig)} />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default CashflowDashboardPage;
