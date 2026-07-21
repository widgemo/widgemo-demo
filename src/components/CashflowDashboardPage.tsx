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
  getAccountsNetWorthTrend,
  getAccountsPageRows,
  getAccountsSummaryRows,
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
import {
  LIQUIDITY_SNAPSHOT_DEFAULT_HORIZON,
  LIQUIDITY_SNAPSHOT_DEFAULT_POSTURE,
  LIQUIDITY_SNAPSHOT_DEFAULT_SCOPE,
} from '../config/liquiditySnapshotPreview';
import { useTheme } from '../hooks/useTheme';

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
  { key: 'accounts', label: 'Accounts', icon: 'finance-wallet', implemented: true },
  { key: 'approvals', label: 'Approvals', icon: 'finance-transfer', implemented: false },
  { key: 'autopilot', label: 'Autopilot Rules', icon: 'finance-autopay', implemented: false },
  { key: 'settings', label: 'Settings', icon: 'finance-reserve', implemented: false },
];

export const CashflowDashboardPage: React.FC = () => {
  const { currentTheme } = useTheme();
  const [activeNav, setActiveNav] = useState<DashboardNavKey>('command');
  const [summaryMetric, setSummaryMetric] = useState<'totals' | 'percent'>('totals');
  const [selectedScope, setSelectedScope] = useState<AccountScope>(LIQUIDITY_SNAPSHOT_DEFAULT_SCOPE);
  const [selectedHorizon, setSelectedHorizon] = useState<ForecastHorizon>(LIQUIDITY_SNAPSHOT_DEFAULT_HORIZON);
  const [selectedPosture, setSelectedPosture] = useState<RiskPosture>(LIQUIDITY_SNAPSHOT_DEFAULT_POSTURE);
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
        renderAs: 'deltaValue',
        renderAsOptions: { trendIndicator: true, fractionDigits: 0 },
        showLabel: false,
      },
      {
        key: 'healthScore',
        label: 'Health',
        type: 'number',
        renderAs: 'scoreMeter',
        renderAsOptions: {
          showValue: true,
          valueAsPercent: false,
          decimals: 0,
          tagPosition: 'top',
          tagAlign: 'left',
          valueAlign: 'right',
          bands: [
            { max: 35, label: 'Critical', color: '#c53030', background: 'rgba(229, 62, 62, 0.18)' },
            { max: 65, label: 'Watch', color: '#c05621', background: 'rgba(237, 137, 54, 0.18)' },
            { label: 'Healthy', color: '#2f855a', background: 'rgba(56, 161, 105, 0.16)' },
          ],
        },
        showLabel: false,
      },
      {
        key: 'confidence',
        label: 'Confidence',
        type: 'number',
        renderAs: 'scoreMeter',
        renderAsOptions: {
          density: 'compact',
          valueAsPercent: true,
          decimals: 0,
          tagPosition: 'bottom',
          tagAlign: 'right',
          valueAlign: 'left',
          bands: [
            { min: 85, label: 'High', color: '#2b6cb0', background: 'rgba(43, 108, 176, 0.14)' },
            { min: 70, label: 'Good', color: '#2f855a', background: 'rgba(56, 161, 105, 0.14)' },
            { min: 55, label: 'Medium', color: '#c05621', background: 'rgba(237, 137, 54, 0.15)' },
            { label: 'Low', color: '#c53030', background: 'rgba(229, 62, 62, 0.14)' },
          ],
        },
        showLabel: false,
      },
      {
        key: 'status',
        label: 'Status',
        type: 'text',
        renderAs: 'badge',
        renderAsOptions: { style: 'badge', size: 'sm' },
        showLabel: false,
      },
    ],
    [],
  );

  const summaryConfig = useMemo<WidgemoConfig<Entity>>(
    () => ({
      containerFrame: { shadow: 'none', borderRadius: 0 },
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
      containerFrame: { shadow: 'none', borderRadius: 0 },
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
    [forecastFields, forecastRows.length, horizonActions, selectedHorizon, selectedPosture],
  );

  const eventFields = useMemo<FieldConfig[]>(
    () => [
      { key: 'label', label: 'Event', type: 'text' },
      { key: 'amount', label: 'Amount', type: 'number' },
      { key: 'accountName', label: 'Account', type: 'text' },
      { key: 'status', label: 'Status', type: 'text' },
      {
        key: 'date',
        label: 'Date',
        type: 'date',
        renderAs: 'date',
        renderAsOptions: { parseMode: 'iso-date', locale: 'en-US', timezone: 'local', formatPreset: 'medium' },
      },
    ],
    [],
  );

  const eventsConfig = useMemo<WidgemoConfig<Entity>>(
    () => ({
      id: 'cashflow-events-timeline-widget',
      containerFrame: { shadow: 'none', borderRadius: 0 },
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
    [eventFields, scopeActions, selectedHorizon],
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
      {
        key: 'postedAt',
        label: 'Posted',
        type: 'date',
        renderAs: 'date',
        renderAsOptions: { parseMode: 'iso-date', locale: 'en-US', timezone: 'local', formatPreset: 'short' },
        sortable: true,
        width: '120px',
      },
      {
        key: 'flowType',
        label: 'Flow',
        type: 'text',
        renderAs: 'badge',
        renderAsOptions: { style: 'badge', size: 'sm' },
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
        renderAs: 'scoreMeter',
        renderAsOptions: {
          density: 'compact',
          valueAsPercent: true,
          decimals: 0,
          showValue: true,
          tagPosition: 'top',
          tagAlign: 'left',
          valueAlign: 'right',
          bands: [
            { min: 85, label: 'Stable', color: '#2f855a', background: 'rgba(56, 161, 105, 0.14)' },
            { min: 70, label: 'Review', color: '#2b6cb0', background: 'rgba(43, 108, 176, 0.14)' },
            { min: 50, label: 'Watch', color: '#c05621', background: 'rgba(237, 137, 54, 0.15)' },
            { label: 'Risk', color: '#c53030', background: 'rgba(229, 62, 62, 0.14)' },
          ],
        },
        width: '115px',
      },
      {
        key: 'recurrence',
        label: 'Recurrence',
        type: 'text',
        renderAs: 'badge',
        renderAsOptions: { style: 'badge', size: 'sm' },
        width: '110px',
      },
      { key: 'tags', label: 'Tags', type: 'text', width: '190px', wrap: true },
    ],
    [],
  );

  const transactionConfig = useMemo<WidgemoConfig<Entity>>(
    () => ({
      id: 'cashflow-transactions-widget',
      containerFrame: { shadow: 'none', borderRadius: 0 },
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
            alternatingRows: true,
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
              onAction: () => showDemoNotice('Categorize transaction'),
            },
            {
              id: 'add-watchlist',
              label: 'Watch',
              icon: 'finance-alert',
              placement: 'menu',
              onAction: () => showDemoNotice('Add transaction to watch list'),
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
        renderAs: 'badge',
        renderAsOptions: { style: 'badge', size: 'sm' },
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
      containerFrame: { shadow: 'none', borderRadius: 0 },
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
              onAction: () => showDemoNotice('Resolve alert'),
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
        renderAs: 'badge',
        renderAsOptions: { style: 'badge', size: 'sm' },
        showLabel: false,
      },
      {
        key: 'confidence',
        label: 'Confidence',
        type: 'number',
        renderAs: 'scoreMeter',
        renderAsOptions: {
          density: 'compact',
          valueAsPercent: true,
          decimals: 0,
          tagPosition: 'bottom',
          tagAlign: 'left',
          valueAlign: 'right',
          showValue: true,
        },
        showLabel: false,
      },
    ],
    [],
  );

  const scenarioConfig = useMemo<WidgemoConfig<Entity>>(
    () => ({
      id: 'cashflow-scenarios-widget',
      containerFrame: { shadow: 'none', borderRadius: 0 },
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
              onAction: () => showDemoNotice('Apply scenario'),
            },
            {
              id: 'inspect-scenario',
              label: 'Inspect',
              icon: 'finance-forecast',
              placement: 'menu',
              onAction: () => showDemoNotice('Inspect scenario'),
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

  const accountsRows = useMemo(
    () => getAccountsPageRows(selectedScope),
    [selectedScope],
  );

  const accountsNetWorthRows = useMemo(
    () => getAccountsNetWorthTrend(selectedScope, selectedHorizon),
    [selectedScope, selectedHorizon],
  );

  const accountsSummaryRows = useMemo(
    () => getAccountsSummaryRows(selectedScope),
    [selectedScope],
  );

  const creditCardRows = useMemo(
    () => accountsRows.filter((row) => String(row.group) === 'Credit Cards'),
    [accountsRows],
  );

  const cashRows = useMemo(
    () => accountsRows.filter((row) => String(row.group) === 'Cash'),
    [accountsRows],
  );

  const accountsNetWorthStats = useMemo(() => {
    const first = Number(accountsNetWorthRows[0]?.netWorth ?? 0);
    const last = Number(accountsNetWorthRows[accountsNetWorthRows.length - 1]?.netWorth ?? 0);
    const change = last - first;
    const percent = first === 0 ? 0 : (change / first) * 100;

    return {
      total: last,
      change,
      percent,
    };
  }, [accountsNetWorthRows]);

  const accountsNetWorthFields = useMemo<FieldConfig[]>(
    () => [
      { key: 'label', label: 'Date', type: 'text' },
      { key: 'netWorth', label: 'Net Worth', type: 'number' },
    ],
    [],
  );

  const accountListFields = useMemo<FieldConfig[]>(
    () => [
      {
        key: 'accountName',
        label: 'Account',
        showLabel: false,
        type: 'text',
        width: '370px',
        wrap: false,
        renderAs: 'accountMeta',
        renderAsOptions: { showOwner: true },
      },
      {
        key: 'monthChangePct',
        label: 'Trend',
        showLabel: false,
        type: 'number',
        width: '138px',
        renderAs: 'sparkTrend',
      },
      {
        key: 'balance',
        label: 'Balance',
        showLabel: false,
        type: 'number',
        width: '140px',
        renderAs: 'accountBalance',
      },
    ],
    [],
  );

  const summaryFields = useMemo<FieldConfig[]>(
    () => [
      {
        key: 'section',
        label: 'Section',
        type: 'text',
        showLabel: false,
        width: '110px',
        wrap: false,
      },
      {
        key: 'total',
        label: summaryMetric === 'totals' ? 'Totals' : 'Percent',
        type: 'number',
        showLabel: false,
        renderAs: 'compositionBar',
        renderAsOptions: {
          style: 'segmented',
          legend: 'inline',
          percentages: summaryMetric === 'percent',
          totals: summaryMetric === 'totals',
          total: (entity: Entity) => Number((entity as { total?: number }).total ?? 0),
          segments: (entity: Entity) => (entity as { segments?: Array<{ label?: string; value: number | string; color?: string }> }).segments ?? [],
          barHeight: 11,
          segmentGap: '4px',
          cornerRadius: '8px',
          cornerScope: 'segment',
          gap: '0.35rem',
        },
      },
    ],
    [summaryMetric],
  );

  const summaryActions = useMemo<ActionConfig<Entity>[]>(
    () => [
      {
        id: 'summary-totals',
        label: 'Totals',
        icon: 'finance-sum',
        placement: 'pinned',
        variant: summaryMetric === 'totals' ? 'primary' : 'secondary',
        onAction: () => setSummaryMetric('totals'),
      },
      {
        id: 'summary-percent',
        label: 'Percent',
        icon: 'finance-percent',
        placement: 'pinned',
        variant: summaryMetric === 'percent' ? 'primary' : 'secondary',
        onAction: () => setSummaryMetric('percent'),
      },
    ],
    [summaryMetric],
  );

  const accountsSummaryCompositionRows = useMemo(() => {
    const colorByCategory: Record<string, string> = {
      'Real Estate': '#8b5cf6',
      Investments: '#67c5df',
      Vehicles: '#f97316',
      Cash: '#33b37a',
      Loans: '#f5c242',
      'Credit Cards': '#ef4444',
    };

    const grouped = accountsSummaryRows.reduce<Record<string, {
      id: string;
      section: string;
      total: number;
      segments: Array<{ label: string; value: number; color: string }>;
    }>>((acc, row) => {
      const section = String(row.section ?? 'Other');
      const entry = acc[section] ?? {
        id: `accounts-summary-section-${section.toLowerCase()}`,
        section,
        total: Number(row.total ?? 0),
        segments: [],
      };

      const label = String(row.category ?? 'Unknown');
      const value = Number(row.amount ?? 0);

      if (Number.isFinite(value) && value > 0) {
        entry.segments.push({
          label,
          value,
          color: colorByCategory[label] ?? '#6b7280',
        });
      }

      if (!entry.total || entry.total <= 0) {
        entry.total = Number(row.total ?? 0);
      }

      acc[section] = entry;
      return acc;
    }, {});

    const rows = Object.values(grouped).map((row) => {
      const computedTotal = row.total > 0
        ? row.total
        : row.segments.reduce((sum, segment) => sum + segment.value, 0);

      return {
        ...row,
        total: computedTotal,
      };
    });

    const priority = ['Assets', 'Liabilities'];
    const prioritized = priority
      .map((section) => rows.find((row) => row.section === section))
      .filter((row): row is (typeof rows)[number] => Boolean(row));
    const remainder = rows.filter((row) => !priority.includes(row.section));

    return [...prioritized, ...remainder];
  }, [accountsSummaryRows]);

  const accountsNetWorthConfig = useMemo<WidgemoConfig<Entity>>(
    () => ({
      id: 'accounts-net-worth-performance',
      containerFrame: { shadow: 'none', borderRadius: 0 },
      zones: {
        header: {
          title: 'Net Worth',
          subtitle: `$${Math.round(accountsNetWorthStats.total).toLocaleString()}  ${accountsNetWorthStats.change >= 0 ? '↑' : '↓'} ${Math.abs(accountsNetWorthStats.change).toLocaleString()} (${accountsNetWorthStats.percent >= 0 ? '+' : ''}${accountsNetWorthStats.percent.toFixed(1)}%) · ${forecastHorizonLabels[selectedHorizon]} change`,
          actions: horizonActions,
          actionOverflow: { maxInline: { mobile: 1, tablet: 2, desktop: 3 }, menuLabel: 'Range' },
          themeOverrides: {
            backgroundColor: 'var(--app-bg-secondary)',
            borderColor: 'var(--app-border)',
            padding: '0.75rem 0.85rem 0.55rem',
            borderRadius: '2px 2px 0 0',
          },
        },
        content: createChartContent(accountsNetWorthFields, {
          chart: {
            xAxis: 'label',
            series: [
              { type: 'area', key: 'netWorth', label: 'Net Worth', color: '#21c8ff', areaGradient: true },
              { type: 'line', key: 'netWorth', label: 'Net Worth (line)', color: '#20e0ff', showDots: false, lineThickness: 2.8 },
            ],
            height: 255,
            showGrid: true,
            showLegend: false,
            legendAlign: 'right',
            tooltip: { position: 'top-right' },
          },
          themeOverrides: {
            backgroundColor: 'var(--app-bg-secondary)',
            borderColor: 'var(--app-border)',
            padding: '0.15rem 0.65rem 0.65rem',
            borderRadius: '0 0 2px 2px',
          },
        }),
      },
    }),
    [accountsNetWorthFields, accountsNetWorthStats.change, accountsNetWorthStats.percent, accountsNetWorthStats.total, horizonActions, selectedHorizon],
  );

  const creditCardsConfig = useMemo<WidgemoConfig<Entity>>(
    () => ({
      id: 'accounts-credit-cards',
      containerFrame: { shadow: 'none', borderRadius: 0 },
      collapse: { initialState: 'expanded' },
      zones: {
        header: {
          title: 'Credit Cards',
          subtitle: `${creditCardRows.length} accounts`,
          themeOverrides: {
            backgroundColor: 'var(--app-bg-secondary)',
            borderColor: 'var(--app-border)',
            padding: '0.6rem 0.75rem 0.45rem',
            borderRadius: '2px 2px 0 0',
          },
        },
        content: createTableContent(accountListFields, {
          table: {
            type: 'rich-cells',
            columns: 3,
            hover: true,
            alternatingRows: false,
            showHeader: false,
            rowSeparator: true,
          },
          themeOverrides: {
            backgroundColor: 'var(--app-bg-secondary)',
            borderColor: 'var(--app-border)',
            padding: '0.15rem 0.55rem 0.55rem',
            borderRadius: '0 0 2px 2px',
          },
        }),
      },
    }),
    [accountListFields, creditCardRows.length],
  );

  const cashAccountsConfig = useMemo<WidgemoConfig<Entity>>(
    () => ({
      id: 'accounts-cash',
      containerFrame: { shadow: 'none', borderRadius: 0 },
      collapse: { initialState: 'expanded' },
      zones: {
        header: {
          title: 'Cash',
          subtitle: `${cashRows.length} accounts`,
          themeOverrides: {
            backgroundColor: 'var(--app-bg-secondary)',
            borderColor: 'var(--app-border)',
            padding: '0.6rem 0.75rem 0.45rem',
            borderRadius: '2px 2px 0 0',
          },
        },
        content: createTableContent(accountListFields, {
          table: {
            type: 'rich-cells',
            columns: 3,
            hover: true,
            alternatingRows: false,
            showHeader: false,
            rowSeparator: true,
          },
          themeOverrides: {
            backgroundColor: 'var(--app-bg-secondary)',
            borderColor: 'var(--app-border)',
            padding: '0.15rem 0.55rem 0.55rem',
            borderRadius: '0 0 2px 2px',
          },
        }),
      },
    }),
    [accountListFields, cashRows.length],
  );

  const accountsSummaryConfig = useMemo<WidgemoConfig<Entity>>(
    () => ({
      id: 'accounts-summary',
      containerFrame: { shadow: 'none', borderRadius: 0 },
      zones: {
        header: {
          title: 'Summary',
          subtitle: summaryMetric === 'totals' ? 'Assets and liabilities composition (totals)' : 'Assets and liabilities composition (percent)',
          actions: summaryActions,
          actionOverflow: { maxInline: { mobile: 2, tablet: 2, desktop: 2 }, menuLabel: 'View' },
          themeOverrides: {
            backgroundColor: 'var(--app-bg-secondary)',
            borderColor: 'var(--app-border)',
            padding: '0.6rem 0.75rem 0.45rem',
            borderRadius: '2px 2px 0 0',
          },
        },
        content: createGridContent(summaryFields, {
          grid: {
            minItemWidth: '280px',
            maxColumns: 2,
            gap: '0',
          },
          item: {
            cardOptions: {
              border: true,
              borderColor: 'var(--app-border)',
              borderRadius: '2px',
              backgroundColor: 'var(--app-bg-primary)',
            },
          },
          themeOverrides: {
            backgroundColor: 'var(--app-bg-secondary)',
            borderColor: 'var(--app-border)',
            padding: '0',
            borderRadius: '0 0 2px 2px',
          },
        }),
      },
    }),
    [summaryFields, summaryActions, summaryMetric],
  );

  const isAccountsView = activeNav === 'accounts';
  const cashflowAppThemeStyle = useMemo(
    () => (currentTheme === 'dark'
      ? {
          '--app-bg-primary': '#10151d',
          '--app-bg-secondary': '#1a1f2a',
          '--app-text-primary': '#e4ebf5',
          '--app-text-muted': '#8f9bb0',
          '--app-border': '#2a3342',
          '--cashflow-accent': '#4d79d9',
          '--cashflow-accent-bg': 'rgba(77, 121, 217, 0.18)',
        }
      : {
          '--app-bg-primary': '#f2f5fb',
          '--app-bg-secondary': '#ffffff',
          '--app-text-primary': '#1f2a3d',
          '--app-text-muted': '#66758f',
          '--app-border': '#d7deeb',
          '--cashflow-accent': '#315fbf',
          '--cashflow-accent-bg': 'rgba(49, 95, 191, 0.12)',
        }) as React.CSSProperties,
    [currentTheme],
  );

  return (
    <div
      style={{
        ...cashflowAppThemeStyle,
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
                      border: `1px solid ${isActive ? 'var(--cashflow-accent)' : 'var(--app-border)'}`,
                      backgroundColor: isActive ? 'var(--cashflow-accent-bg)' : 'var(--app-bg-primary)',
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
            {isAccountsView ? (
              <>
                <div style={{ marginBottom: '0.55rem' }}>
                  <div className="d-flex flex-wrap justify-content-between align-items-start gap-3">
                    <div>
                      <h1 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '0.2rem' }}>Accounts</h1>
                      <p style={{ marginBottom: 0, color: 'var(--app-text-muted)', fontSize: '0.9rem' }}>
                        {accountScopeLabels[selectedScope]} view · {forecastHorizonLabels[selectedHorizon]} performance window
                      </p>
                    </div>
                    <div className="d-flex flex-wrap gap-2" style={{ minWidth: '320px', justifyContent: 'flex-end' }}>
                      <button type="button" className="btn btn-sm btn-outline-secondary" style={{ borderRadius: '2px', borderColor: 'var(--app-border)', color: 'var(--app-text-muted)' }} onClick={() => showDemoNotice('Filters panel')}>Filters</button>
                      <button type="button" className="btn btn-sm btn-outline-secondary" style={{ borderRadius: '2px', borderColor: 'var(--app-border)', color: 'var(--app-text-muted)' }} onClick={() => showDemoNotice('Edit owners')}>Edit owners</button>
                      <button type="button" className="btn btn-sm btn-outline-secondary" style={{ borderRadius: '2px', borderColor: 'var(--app-border)', color: 'var(--app-text-muted)' }} onClick={() => showDemoNotice('Refresh all accounts')}>Refresh all</button>
                      <button type="button" className="btn btn-sm" style={{ borderRadius: '2px', backgroundColor: '#f5742f', color: '#fff', border: '1px solid #f5742f' }} onClick={() => showDemoNotice('Add account flow')}>+ Add account</button>
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
                    <Widgemo data={accountsNetWorthRows} config={injectDevMode(accountsNetWorthConfig)} />
                  </div>

                  <div className="col-12 col-xl-8 d-flex flex-column gap-2">
                    <div className="w-100">
                      <Widgemo data={creditCardRows} config={injectDevMode(creditCardsConfig)} />
                    </div>
                    <div className="w-100">
                      <Widgemo data={cashRows} config={injectDevMode(cashAccountsConfig)} />
                    </div>
                  </div>

                  <div className="col-12 col-xl-4 d-flex">
                    <div className="w-100 h-100">
                      <Widgemo data={accountsSummaryCompositionRows} config={injectDevMode(accountsSummaryConfig)} />
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
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

                <div
                  className="p-3 mb-2"
                  style={{ backgroundColor: 'var(--app-bg-secondary)', border: '1px solid var(--app-border)', borderRadius: '2px' }}
                >
                  <h2 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.25rem' }}>Registry in Action</h2>
                  <p style={{ marginBottom: '0.35rem', color: 'var(--app-text-muted)', fontSize: '0.88rem' }}>
                    This dashboard highlights real extension points in production-like flows, not synthetic tests.
                  </p>
                  <ul style={{ marginBottom: 0, paddingLeft: '1.1rem', color: 'var(--app-text-muted)', fontSize: '0.84rem' }}>
                    <li>Custom icons power finance navigation and action glyphs (finance-* icon set).</li>
                    <li>Custom renderAs formatters drive rich account and transaction presentation.</li>
                    <li>Custom mode renders the cashflow timeline for event sequencing.</li>
                  </ul>
                </div>

                <div className="row g-2">
                  <div className="col-12">
                    <Widgemo data={kpiRows} config={injectDevMode(summaryConfig)} />
                  </div>

                  <div className="col-12 col-xxl-8 d-flex flex-column gap-2">
                    <div className="w-100">
                      <Widgemo data={forecastRows} config={injectDevMode(forecastConfig)} />
                    </div>
                    <div className="w-100">
                      <p style={{ marginBottom: '0.25rem', color: 'var(--app-text-muted)', fontSize: '0.8rem' }}>
                        Registry note: this table uses custom renderAs entries like transactionMeta and badge for compact, domain-aware transaction context.
                      </p>
                      <Widgemo data={transactionRows} config={injectDevMode(transactionConfig)} />
                    </div>
                  </div>

                  <div className="col-12 col-xxl-4 d-flex flex-column gap-2">
                    <div className="w-100">
                      <p style={{ marginBottom: '0.25rem', color: 'var(--app-text-muted)', fontSize: '0.8rem' }}>
                        Registry note: this Events widget runs on the custom cashflow-timeline mode registered by the app.
                      </p>
                      <Widgemo data={eventsRows} config={injectDevMode(eventsConfig)} />
                    </div>
                    <div className="w-100">
                      <Widgemo data={scenarioRows} config={injectDevMode(scenarioConfig)} />
                    </div>
                  </div>

                  <div className="col-12">
                    <Widgemo data={alertRows} config={injectDevMode(boardConfig)} />
                  </div>
                </div>
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default CashflowDashboardPage;
