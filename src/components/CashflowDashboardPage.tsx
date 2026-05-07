import React, { useMemo, useState } from 'react';
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

export const CashflowDashboardPage: React.FC = () => {
  const [selectedScope, setSelectedScope] = useState<AccountScope>('all');
  const [selectedHorizon, setSelectedHorizon] = useState<ForecastHorizon>('30d');
  const [selectedPosture, setSelectedPosture] = useState<RiskPosture>('expected');
  const [focusedAlertId, setFocusedAlertId] = useState<string | null>(null);
  const [showInspector, setShowInspector] = useState(true);

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
            padding: '0.9rem 1rem 0.7rem',
            borderRadius: '18px 18px 0 0',
          },
        },
        content: createGridContent(kpiFields, {
          grid: { minItemWidth: '260px', gap: '0.8rem', maxColumns: 4 },
          item: {
            cardOptions: {
              border: true,
              borderColor: 'var(--app-border)',
              borderRadius: '14px',
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
            padding: '0.8rem 1rem 1rem',
            borderRadius: '0 0 18px 18px',
          },
        }),
      },
    }),
    [horizonActions, kpiFields, postureActions, scopeActions, selectedHorizon, selectedPosture, selectedScope],
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
      zones: {
        header: {
          title: 'Multi-Account Forecast',
          subtitle: 'Projected cash position with reserve floor and confidence context',
          icon: 'finance-forecast',
          actions: horizonActions,
          actionOverflow: { maxInline: { mobile: 1, tablet: 2, desktop: 3 }, menuLabel: 'Horizon' },
          themeOverrides: {
            backgroundColor: 'var(--app-bg-secondary)',
            borderColor: 'var(--app-border)',
            padding: '0.9rem 1rem 0.7rem',
            borderRadius: '18px 18px 0 0',
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
            padding: '0.8rem 1rem 1rem',
            borderRadius: '0 0 18px 18px',
          },
        }),
      },
    }),
    [forecastFields, horizonActions],
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
          title: 'Upcoming Cash Events',
          subtitle: 'Recurring flows, large movements, and payment checkpoints',
          icon: 'finance-transfer',
          actions: scopeActions,
          actionOverflow: { maxInline: { mobile: 1, tablet: 2, desktop: 3 }, menuLabel: 'Accounts' },
          themeOverrides: {
            backgroundColor: 'var(--app-bg-secondary)',
            borderColor: 'var(--app-border)',
            padding: '0.9rem 1rem 0.7rem',
            borderRadius: '18px 18px 0 0',
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
              padding: '0.8rem 1rem 1rem',
              borderRadius: '0 0 18px 18px',
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
      zones: {
        header: {
          title: 'Transactions Intelligence',
          subtitle: 'Rich-cell transaction stream with anomaly and recurrence context',
          icon: 'finance-income',
          actions: postureActions,
          actionOverflow: { maxInline: { mobile: 1, tablet: 2, desktop: 3 }, menuLabel: 'Risk Posture' },
          themeOverrides: {
            backgroundColor: 'var(--app-bg-secondary)',
            borderColor: 'var(--app-border)',
            padding: '0.9rem 1rem 0.7rem',
            borderRadius: '18px 18px 0 0',
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
              onAction: (_ctx: InteractionContext) => {},
            },
            {
              id: 'add-watchlist',
              label: 'Watch',
              icon: 'finance-alert',
              placement: 'menu',
              onAction: (_ctx: InteractionContext) => {},
            },
          ],
          themeOverrides: {
            backgroundColor: 'var(--app-bg-secondary)',
            borderColor: 'var(--app-border)',
            padding: '0.8rem 1rem 1rem',
            borderRadius: '0 0 18px 18px',
          },
        }),
      },
    }),
    [postureActions, transactionFields],
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
      zones: {
        header: {
          title: 'Alerts Triage',
          subtitle: 'Prioritize forecast risks and cashflow exceptions by severity',
          icon: 'finance-alert',
          themeOverrides: {
            backgroundColor: 'var(--app-bg-secondary)',
            borderColor: 'var(--app-border)',
            padding: '0.9rem 1rem 0.7rem',
            borderRadius: '18px 18px 0 0',
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
              onAction: (_ctx: InteractionContext) => {},
            },
          ],
          themeOverrides: {
            backgroundColor: 'var(--app-bg-secondary)',
            borderColor: 'var(--app-border)',
            padding: '0.8rem 1rem 1rem',
            borderRadius: '0 0 18px 18px',
          },
        }),
      },
    }),
    [alertFields],
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
            padding: '0.9rem 1rem 0.7rem',
            borderRadius: '18px 18px 0 0',
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
              borderRadius: '14px',
              padding: '1rem',
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
              onAction: (_ctx: InteractionContext) => {},
            },
            {
              id: 'inspect-scenario',
              label: 'Inspect',
              icon: 'finance-forecast',
              placement: 'menu',
              onAction: (_ctx: InteractionContext) => {},
            },
          ],
          themeOverrides: {
            backgroundColor: 'var(--app-bg-secondary)',
            borderColor: 'var(--app-border)',
            padding: '0.8rem 1rem 1rem',
            borderRadius: '0 0 18px 18px',
          },
        }),
      },
    }),
    [focusedAlertId, scenarioFields, scopeActions],
  );

  return (
    <div
      style={{
        minHeight: '100vh',
        padding: '1.5rem',
        background: 'linear-gradient(180deg, var(--app-bg-primary) 0%, var(--app-bg-secondary) 100%)',
      }}
    >
      <div className="container-fluid" style={{ maxWidth: '1620px' }}>
        <div style={{ marginBottom: '1.2rem' }}>
          <div className="d-flex flex-wrap justify-content-between align-items-start gap-3">
            <div>
              <h1 style={{ fontSize: '1.9rem', fontWeight: 700, marginBottom: '0.25rem' }}>Cash Flow Command Center</h1>
              <p style={{ marginBottom: '0.25rem', color: 'var(--app-text-muted)', maxWidth: '980px' }}>
                Registry showcase dashboard built almost entirely from Widgemo tiles: custom renderers, custom icons,
                custom mode, rich table cells, and mixed-series forecasting.
              </p>
              <p style={{ marginBottom: 0, color: 'var(--app-text-muted)', fontSize: '0.92rem' }}>
                Current context: {accountScopeLabels[selectedScope]} · {forecastHorizonLabels[selectedHorizon]} · {riskPostureLabels[selectedPosture]}
              </p>
            </div>
            <div
              className="p-3 rounded"
              style={{ minWidth: '270px', backgroundColor: 'var(--app-bg-secondary)', border: '1px solid var(--app-border)' }}
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

        <div className="row g-3">
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
      </div>
    </div>
  );
};

export default CashflowDashboardPage;
