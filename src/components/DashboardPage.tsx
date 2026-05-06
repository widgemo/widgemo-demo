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
  dashboardPeriodLabels,
  dashboardTeamLabels,
  getAllocationData,
  getBoardCards,
  getDashboardKpis,
  getHighlights,
  getPortfolioRows,
  getThroughputData,
  type DashboardPeriod,
  type DashboardTeam,
  type ThroughputPoint,
} from '../data/dashboardData';

const autoItemLayout = { type: 'auto' as const };

const statusColorMap = {
  Healthy: '#1f8f5f',
  Focused: '#3157d5',
  Watch: '#d97706',
  Attention: '#b42318',
  'On Track': '#1f8f5f',
  'At Risk': '#b54708',
  Blocked: '#b42318',
};

const riskColorMap = {
  Low: '#1f8f5f',
  Medium: '#b54708',
  High: '#b42318',
};

const priorityColorMap = {
  Low: '#64748b',
  Medium: '#3157d5',
  High: '#b54708',
  Critical: '#b42318',
};

const signalColorMap = {
  Green: '#1f8f5f',
  Amber: '#b54708',
  Red: '#b42318',
};

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

const periodOptions: DashboardPeriod[] = ['30d', 'quarter', 'year'];
const teamOptions: DashboardTeam[] = ['all', 'platform', 'delivery', 'growth'];
const BOARD_STATE_STORAGE_KEY = 'widgemo-dashboard-board-state-v1';

const loadPersistedBoardState = (): Entity[] => {
  try {
    const raw = localStorage.getItem(BOARD_STATE_STORAGE_KEY);
    if (!raw) {
      return getBoardCards('all');
    }

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return getBoardCards('all');
    }

    const isValid = parsed.every(
      (item) =>
        item &&
        typeof item === 'object' &&
        typeof item.id === 'string' &&
        typeof item.lane === 'string',
    );

    return isValid ? (parsed as Entity[]) : getBoardCards('all');
  } catch {
    return getBoardCards('all');
  }
};

export const DashboardPage: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<DashboardPeriod>('quarter');
  const [selectedTeam, setSelectedTeam] = useState<DashboardTeam>('all');
  const [focusedInitiative, setFocusedInitiative] = useState<string | null>(null);
  const [includeWidgemoInspector, setIncludeWidgemoInspectorState] = useState(() => {
    const saved = localStorage.getItem('widgemo-dashboard-inspector-toggle');
    return saved === 'true';
  });
  const [allBoardCards, setAllBoardCards] = useState<Entity[]>(() => loadPersistedBoardState());

  const setIncludeWidgemoInspector = (value: boolean) => {
    setIncludeWidgemoInspectorState(value);
    localStorage.setItem('widgemo-dashboard-inspector-toggle', value.toString());
  };

  const injectDevMode = (config: WidgemoConfig<Entity>): WidgemoConfig<Entity> => {
    const existingDevMode = config.devMode;

    if (existingDevMode && typeof existingDevMode === 'object') {
      return {
        ...config,
        devMode: {
          ...existingDevMode,
          enabled: includeWidgemoInspector,
        },
      };
    }

    return {
      ...config,
      devMode: includeWidgemoInspector,
    };
  };

  const boardCardsForTeam = useMemo(
    () => allBoardCards.filter((card) => selectedTeam === 'all' || card.teamKey === selectedTeam),
    [allBoardCards, selectedTeam],
  );

  const boardBlockedCount = useMemo(
    () => boardCardsForTeam.filter((card) => card.lane === 'blocked').length,
    [boardCardsForTeam],
  );

  const kpiData = useMemo(() => {
    const base = getDashboardKpis(selectedPeriod, selectedTeam);
    return base.map((item) => {
      if (item.metric !== 'Blocked work') {
        return item;
      }

      const blockedProgress = Math.max(0, Math.min(100, Math.round(100 - boardBlockedCount * 18)));
      return {
        ...item,
        value: String(boardBlockedCount),
        status: boardBlockedCount <= 1 ? 'Healthy' : boardBlockedCount <= 3 ? 'Watch' : 'Attention',
        progress: blockedProgress,
      };
    });
  }, [selectedPeriod, selectedTeam, boardBlockedCount]);
  const throughputData = useMemo(() => getThroughputData(selectedPeriod, selectedTeam), [selectedPeriod, selectedTeam]);
  const allocationData = useMemo(() => getAllocationData(selectedTeam), [selectedTeam]);
  const portfolioRows = useMemo(() => getPortfolioRows(selectedTeam), [selectedTeam]);
  const boardCards = useMemo(() => {
    if (!focusedInitiative) {
      return boardCardsForTeam;
    }
    return boardCardsForTeam.filter((card) => card.initiative === focusedInitiative);
  }, [boardCardsForTeam, focusedInitiative]);
  const highlights = useMemo(
    () => getHighlights(selectedTeam, focusedInitiative),
    [selectedTeam, focusedInitiative],
  );
  const riskPulseRows = useMemo(() => {
    return portfolioRows
      .filter((row) => row.risk !== 'Low' || row.status === 'Blocked' || row.status === 'At Risk')
      .sort((a, b) => String(a.dueDate).localeCompare(String(b.dueDate)))
      .slice(0, 5);
  }, [portfolioRows]);

  useEffect(() => {
    localStorage.setItem(BOARD_STATE_STORAGE_KEY, JSON.stringify(allBoardCards));
  }, [allBoardCards]);

  const periodActions = useMemo<ActionConfig<Entity>[]>(
    () =>
      periodOptions.map((period) => ({
        id: `period-${period}`,
        label: dashboardPeriodLabels[period],
        placement: 'pinned',
        variant: selectedPeriod === period ? 'primary' : 'outline-secondary',
        onAction: () => setSelectedPeriod(period),
      })),
    [selectedPeriod],
  );

  const teamActions = useMemo<ActionConfig<Entity>[]>(
    () =>
      teamOptions.map((team) => ({
        id: `team-${team}`,
        label: dashboardTeamLabels[team],
        placement: 'pinned',
        variant: selectedTeam === team ? 'primary' : 'outline-secondary',
        onAction: () => setSelectedTeam(team),
      })),
    [selectedTeam],
  );

  const focusActions = useMemo<ActionConfig<Entity>[]>(() => {
    if (!focusedInitiative) {
      return [];
    }

    return [
      {
        id: 'clear-focus',
        label: 'Clear Focus',
        placement: 'pinned',
        variant: 'outline-secondary',
        onAction: () => setFocusedInitiative(null),
      },
    ];
  }, [focusedInitiative]);

  const kpiFields = useMemo<FieldConfig[]>(
    () => [
      { key: 'metric', label: 'Metric', type: 'text', showLabel: false, wrap: false },
      { key: 'value', label: 'Value', type: 'text', showLabel: false, wrap: false },
      { key: 'note', label: 'Note', type: 'text', showLabel: false },
      {
        key: 'status',
        label: 'Status',
        type: 'text',
        showLabel: false,
        renderAs: 'badge',
        renderAsOptions: { colorMap: statusColorMap },
      },
      {
        key: 'progress',
        label: 'Progress',
        type: 'number',
        showLabel: false,
        renderAs: 'progress',
        renderAsOptions: {
          showPercentage: true,
          color: (entity: Entity) => {
            const status = String(entity.status ?? 'Watch');
            return statusColorMap[status as keyof typeof statusColorMap] ?? '#3157d5';
          },
        },
      },
    ],
    [],
  );

  const throughputFields = useMemo<FieldConfig[]>(
    () => [
      { key: 'label', label: 'Sprint', type: 'text' },
      { key: 'planned', label: 'Planned', type: 'number' },
      { key: 'completed', label: 'Completed', type: 'number' },
      { key: 'spillover', label: 'Spillover', type: 'number' },
    ],
    [],
  );

  const allocationFields = useMemo<FieldConfig[]>(
    () => [
      { key: 'workstream', label: 'Workstream', type: 'text' },
      { key: 'count', label: 'Capacity', type: 'number' },
    ],
    [],
  );

  const portfolioFields = useMemo<FieldConfig[]>(
    () => [
      { key: 'initiative', label: 'Initiative', type: 'text', sortable: true, width: '220px' },
      { key: 'team', label: 'Team', type: 'text', width: '120px' },
      { key: 'owner', label: 'Owner', type: 'text', width: '140px' },
      { key: 'phase', label: 'Phase', type: 'text', width: '110px' },
      {
        key: 'status',
        label: 'Status',
        type: 'text',
        renderAs: 'badge',
        renderAsOptions: { colorMap: statusColorMap },
        width: '120px',
      },
      {
        key: 'confidence',
        label: 'Confidence',
        type: 'number',
        renderAs: 'progress',
        renderAsOptions: {
          showPercentage: true,
          color: (entity: Entity) => {
            const value = Number(entity.confidence ?? 0);
            if (value >= 85) return '#1f8f5f';
            if (value >= 70) return '#b54708';
            return '#b42318';
          },
        },
        width: '160px',
      },
      {
        key: 'budget',
        label: 'Budget',
        type: 'number',
        renderAs: 'currency',
        renderAsOptions: { currency: 'USD', compact: true, locale: 'en-US' },
        align: 'right',
        width: '120px',
      },
      { key: 'dueDate', label: 'Due', type: 'date', sortable: true, width: '120px' },
      {
        key: 'risk',
        label: 'Risk',
        type: 'text',
        renderAs: 'badge',
        renderAsOptions: { colorMap: riskColorMap },
        width: '110px',
      },
    ],
    [],
  );

  const boardFields = useMemo<FieldConfig[]>(
    () => [
      { key: 'title', label: 'Title', type: 'text', showLabel: false },
      { key: 'initiative', label: 'Initiative', type: 'text', showLabel: false },
      { key: 'owner', label: 'Owner', type: 'text', wrap: false },
      { key: 'eta', label: 'ETA', type: 'text', wrap: false },
      {
        key: 'priority',
        label: 'Priority',
        type: 'text',
        renderAs: 'badge',
        renderAsOptions: { colorMap: priorityColorMap },
        showLabel: false,
      },
    ],
    [],
  );

  const highlightFields = useMemo<FieldConfig[]>(
    () => [
      {
        key: 'signal',
        label: 'Signal',
        type: 'text',
        renderAs: 'badge',
        renderAsOptions: { colorMap: signalColorMap },
        showLabel: false,
      },
      { key: 'headline', label: 'Headline', type: 'text', showLabel: false },
      { key: 'detail', label: 'Detail', type: 'text', showLabel: false },
      { key: 'owner', label: 'Owner', type: 'text', wrap: false },
      { key: 'dueText', label: 'Next step', type: 'text' },
    ],
    [],
  );

  const riskPulseFields = useMemo<FieldConfig[]>(
    () => [
      { key: 'initiative', label: 'Initiative', type: 'text', showLabel: false },
      {
        key: 'risk',
        label: 'Risk',
        type: 'text',
        renderAs: 'badge',
        renderAsOptions: { colorMap: riskColorMap },
        showLabel: false,
      },
      {
        key: 'status',
        label: 'Status',
        type: 'text',
        renderAs: 'badge',
        renderAsOptions: { colorMap: statusColorMap },
        showLabel: false,
      },
      { key: 'owner', label: 'Owner', type: 'text', wrap: false },
      { key: 'dueDate', label: 'Due', type: 'date', wrap: false },
    ],
    [],
  );

  const focusSubtitle = focusedInitiative ? `Focused on ${focusedInitiative}` : 'No initiative focus applied';
  const pageSubtitle = `${dashboardTeamLabels[selectedTeam]} · ${dashboardPeriodLabels[selectedPeriod]}`;

  const handleBoardDrop = useCallback((ctx: InteractionContext) => {
    const movedId = String(ctx.entity?.id ?? '');
    const toColumnId = String(ctx.to?.columnId ?? '');
    const toIndex = ctx.to?.index;

    if (!movedId || !toColumnId) {
      return;
    }

    setAllBoardCards((prev) => {
      const movedCard = prev.find((card) => String(card.id ?? '') === movedId);
      if (!movedCard) {
        return prev;
      }

      const isVisible = (card: Entity): boolean => {
        const teamMatch = selectedTeam === 'all' || card.teamKey === selectedTeam;
        const focusMatch = !focusedInitiative || card.initiative === focusedInitiative;
        return teamMatch && focusMatch;
      };

      const withoutMoved = prev.filter((card) => String(card.id ?? '') !== movedId);
      const updatedMoved = { ...movedCard, lane: toColumnId };

      const destinationCards = withoutMoved.filter(
        (card) => isVisible(card) && String(card.lane ?? '') === toColumnId,
      );
      const boundedIndex = Math.max(0, Math.min(toIndex ?? destinationCards.length, destinationCards.length));

      let insertAt = withoutMoved.length;

      if (destinationCards.length > 0 && boundedIndex < destinationCards.length) {
        const targetId = String(destinationCards[boundedIndex].id ?? '');
        insertAt = withoutMoved.findIndex((card) => String(card.id ?? '') === targetId);
      } else if (destinationCards.length > 0) {
        const lastDestId = String(destinationCards[destinationCards.length - 1].id ?? '');
        const lastDestIndex = withoutMoved.findIndex((card) => String(card.id ?? '') === lastDestId);
        insertAt = lastDestIndex + 1;
      } else {
        const visibleCards = withoutMoved.filter((card) => isVisible(card));
        if (visibleCards.length > 0) {
          const lastVisibleId = String(visibleCards[visibleCards.length - 1].id ?? '');
          const lastVisibleIndex = withoutMoved.findIndex((card) => String(card.id ?? '') === lastVisibleId);
          insertAt = lastVisibleIndex + 1;
        }
      }

      const next = [...withoutMoved];
      next.splice(insertAt, 0, updatedMoved);
      return next;
    });
  }, [selectedTeam, focusedInitiative]);

  const summaryConfig = useMemo<WidgemoConfig<Entity>>(
    () => ({
      id: 'dashboard-summary',
      containerShadow: 'none',
      zones: {
        header: {
          title: 'Program snapshot',
          subtitle: `${pageSubtitle} · ${focusSubtitle}`,
          actions: periodActions,
          actionOverflow: { maxInline: { mobile: 1, tablet: 2, desktop: 3 }, menuLabel: 'Ranges' },
          themeOverrides: {
            backgroundColor: 'var(--app-bg-secondary)',
            borderColor: 'var(--app-border)',
            titleColor: 'var(--app-text-primary)',
            subtitleColor: 'var(--app-text-muted)',
            padding: '1rem 1.1rem 0.75rem',
            borderRadius: '18px 18px 0 0',
          },
        },
        content: createGridContent(kpiFields, {
          grid: { gap: '0.85rem', minItemWidth: '200px', maxColumns: 4, autoFlow: 'row' },
          themeOverrides: {
            backgroundColor: 'var(--app-bg-secondary)',
            borderColor: 'var(--app-border)',
            padding: '0.9rem 1rem 1rem',
            borderRadius: '0 0 18px 18px',
          },
          item: {
            cardOptions: {
              border: true,
              borderColor: 'var(--app-border)',
              borderRadius: '16px',
              padding: '1rem',
              backgroundColor: 'var(--app-bg-primary)',
              boxShadow: '0 10px 30px rgba(15, 23, 42, 0.06)',
            },
            conditionalBorder: (entity) => {
              const status = String(entity.status ?? 'Watch');
              const color = statusColorMap[status as keyof typeof statusColorMap] ?? '#3157d5';
              return { color, thickness: 3, placement: 'top' };
            },
          },
        }),
      },
    }),
    [focusSubtitle, kpiFields, pageSubtitle, periodActions],
  );

  const throughputConfig = useMemo<WidgemoConfig<Entity>>(
    () => ({
      id: 'dashboard-throughput',
      containerShadow: 'none',
      zones: {
        header: {
          title: 'Throughput trend',
          subtitle: `Visible work completed versus committed scope · ${dashboardTeamLabels[selectedTeam]}`,
          actions: teamActions,
          actionOverflow: { maxInline: { mobile: 1, tablet: 2, desktop: 4 }, menuLabel: 'Teams' },
          themeOverrides: {
            backgroundColor: 'var(--app-bg-secondary)',
            borderColor: 'var(--app-border)',
            padding: '0.95rem 1rem 0.7rem',
            borderRadius: '18px 18px 0 0',
          },
        },
        content: createChartContent(throughputFields, {
          chart: {
            type: 'bar',
            xAxis: 'label',
            yAxis: ['completed', 'planned'],
            height: 320,
            colors: ['#3157d5', '#9cb7ff'],
            showGrid: true,
            showLabels: false,
            legendAlign: 'left',
            tooltip: {
              position: 'top-right',
              render: (ctx: ChartTooltipContext) => {
                const entity = ctx.entity as ThroughputPoint;
                const variance = entity.completed - entity.planned;
                const utilization = entity.planned === 0 ? 0 : Math.round((entity.completed / entity.planned) * 100);
                return (
                  <div style={{ minWidth: '210px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.45rem' }}>
                      <strong>{entity.label}</strong>
                      <span style={{ color: 'var(--widgemo-color-textMuted, #64748b)', fontSize: '12px' }}>{entity.team}</span>
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--widgemo-color-text, #475569)', marginBottom: '0.45rem' }}>{entity.focus}</div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '4px 10px', fontSize: '12px' }}>
                      <span style={{ color: 'var(--widgemo-color-textMuted, #64748b)' }}>Completed</span>
                      <span style={{ fontWeight: 600, textAlign: 'right' }}>{entity.completed}</span>
                      <span style={{ color: 'var(--widgemo-color-textMuted, #64748b)' }}>Planned</span>
                      <span style={{ fontWeight: 600, textAlign: 'right' }}>{entity.planned}</span>
                      <span style={{ color: 'var(--widgemo-color-textMuted, #64748b)' }}>Spillover</span>
                      <span style={{ fontWeight: 600, textAlign: 'right' }}>{entity.spillover}</span>
                      <span style={{ color: 'var(--widgemo-color-textMuted, #64748b)' }}>Variance</span>
                      <span
                        style={{
                          fontWeight: 600,
                          textAlign: 'right',
                          color: variance >= 0 ? 'var(--widgemo-color-success, #1f8f5f)' : 'var(--widgemo-color-danger, #b42318)',
                        }}
                      >
                        {variance >= 0 ? '+' : ''}
                        {variance}
                      </span>
                      <span style={{ color: 'var(--widgemo-color-textMuted, #64748b)' }}>Utilization</span>
                      <span style={{ fontWeight: 600, textAlign: 'right' }}>{utilization}%</span>
                    </div>
                  </div>
                );
              },
            },
          },
          themeOverrides: {
            backgroundColor: 'var(--app-bg-secondary)',
            borderColor: 'var(--app-border)',
            padding: '0.85rem 1rem 1rem',
            borderRadius: '0 0 18px 18px',
          },
        }),
      },
    }),
    [selectedTeam, teamActions, throughputFields],
  );

  const allocationConfig = useMemo<WidgemoConfig<Entity>>(
    () => ({
      id: 'dashboard-allocation',
      containerShadow: 'none',
      zones: {
        header: {
          title: 'Capacity allocation',
          subtitle: `${dashboardTeamLabels[selectedTeam]} work split`,
          themeOverrides: {
            backgroundColor: 'var(--app-bg-secondary)',
            borderColor: 'var(--app-border)',
            padding: '0.95rem 1rem 0.7rem',
            borderRadius: '18px 18px 0 0',
          },
        },
        content: createChartContent(allocationFields, {
          chart: {
            type: 'donut',
            xAxis: 'workstream',
            yAxis: 'count',
            height: 320,
            showLegend: true,
            legendAlign: 'center',
            showLabels: true,
            donutInnerRadiusRatio: 0.62,
          },
          themeOverrides: {
            backgroundColor: 'var(--app-bg-secondary)',
            borderColor: 'var(--app-border)',
            padding: '0.85rem 1rem 1rem',
            borderRadius: '0 0 18px 18px',
          },
        }),
      },
    }),
    [allocationFields, selectedTeam],
  );

  const portfolioConfig = useMemo<WidgemoConfig<Entity>>(
    () => ({
      id: 'dashboard-portfolio',
      containerShadow: 'none',
      zones: {
        header: {
          title: 'Initiative health table',
          subtitle: `${portfolioRows.length} initiatives in view`,
          themeOverrides: {
            backgroundColor: 'var(--app-bg-secondary)',
            borderColor: 'var(--app-border)',
            padding: '0.95rem 1rem 0.7rem',
            borderRadius: '18px 18px 0 0',
          },
        },
        content: createTableContent(portfolioFields, {
          table: {
            type: 'traditional',
            hover: true,
            alternatingRows: true,
            rowSeparator: true,
            actionsColumn: true,
          },
          sorting: [{ fieldKey: 'dueDate', direction: 'asc' }],
          search: { enabled: true, placeholder: 'Search initiative, owner, or milestone' },
          pagination: { pageSize: 10 },
          actions: [
            {
              id: 'focus-initiative',
              label: 'Focus',
              icon: 'view',
              placement: 'pinned',
              variant: 'outline-primary',
              onAction: (ctx: InteractionContext) => {
                const initiative = String(ctx.entity?.initiative ?? '');
                setFocusedInitiative(initiative || null);
              },
            },
            {
              id: 'filter-team',
              label: 'Isolate Team',
              icon: 'filter',
              placement: 'menu',
              onAction: (ctx: InteractionContext) => {
                const nextTeam = ctx.entity?.teamKey as DashboardTeam | undefined;
                if (nextTeam) {
                  setSelectedTeam(nextTeam);
                }
              },
            },
          ],
          gestures: [
            {
              type: 'item-click',
              interactionId: 'focus-by-row-click',
              interactionLabel: 'Focus initiative',
              onTrigger: (ctx: InteractionContext) => {
                const initiative = String(ctx.entity?.initiative ?? '');
                setFocusedInitiative(initiative || null);
              },
            },
          ],
          themeOverrides: {
            backgroundColor: 'var(--app-bg-secondary)',
            borderColor: 'var(--app-border)',
            padding: '0.35rem 0.55rem 0.7rem',
            borderRadius: '0 0 18px 18px',
          },
        }),
      },
    }),
    [portfolioFields, portfolioRows.length],
  );

  const boardConfig = useMemo<WidgemoConfig<Entity>>(
    () => ({
      id: 'dashboard-board',
      containerShadow: 'none',
      zones: {
        header: {
          title: 'Execution lanes',
          subtitle: `${dashboardTeamLabels[selectedTeam]} work queue · ${focusSubtitle}`,
          actions: focusActions,
          themeOverrides: {
            backgroundColor: 'var(--app-bg-secondary)',
            borderColor: 'var(--app-border)',
            padding: '0.95rem 1rem 0.7rem',
            borderRadius: '18px 18px 0 0',
          },
        },
        content: createBoardContent(boardFields, {
          board: {
            columns: {
              field: 'lane',
              items: [
                { id: 'ready', label: 'Ready to Ship', value: 'ready', color: '#1f8f5f' },
                { id: 'on-track', label: 'On Track', value: 'on-track', color: '#3157d5' },
                { id: 'watch', label: 'Watch', value: 'watch', color: '#b54708', wipLimit: 2 },
                { id: 'blocked', label: 'Blocked', value: 'blocked', color: '#b42318', wipLimit: 1 },
              ],
            },
            dragEnabled: true,
          },
          gestures: [
            {
              type: 'item-drop',
              interactionId: 'dashboard-board-drop',
              interactionLabel: 'Move board card',
              onTrigger: handleBoardDrop,
            },
          ],
          actions: [
            {
              id: 'focus-board-initiative',
              label: 'Focus Initiative',
              icon: 'view',
              placement: 'pinned',
              onAction: (ctx: InteractionContext) => {
                const initiative = String(ctx.entity?.initiative ?? '');
                setFocusedInitiative(initiative || null);
              },
            },
          ],
          themeOverrides: {
            backgroundColor: 'var(--app-bg-secondary)',
            borderColor: 'var(--app-border)',
            padding: '0.8rem 0.85rem 1rem',
            borderRadius: '0 0 18px 18px',
          },
          item: {
            cardOptions: {
              border: true,
              borderColor: 'var(--app-border)',
              borderRadius: '14px',
              padding: '0.85rem',
              backgroundColor: 'var(--app-bg-primary)',
            },
          },
        }),
      },
    }),
    [boardFields, focusActions, focusSubtitle, selectedTeam, handleBoardDrop],
  );

  const riskPulseConfig = useMemo<WidgemoConfig<Entity>>(
    () => ({
      id: 'dashboard-risk-pulse',
      containerShadow: 'none',
      zones: {
        header: {
          title: 'Risk pulse',
          subtitle: `${riskPulseRows.length} priority items need attention`,
          themeOverrides: {
            backgroundColor: 'var(--app-bg-secondary)',
            borderColor: 'var(--app-border)',
            padding: '0.95rem 1rem 0.7rem',
            borderRadius: '18px 18px 0 0',
          },
        },
        content: createTableContent(riskPulseFields, {
          table: {
            type: 'traditional',
            hover: true,
            alternatingRows: true,
            rowSeparator: true,
          },
          actions: [
            {
              id: 'focus-risk-item',
              label: 'Focus',
              icon: 'view',
              placement: 'pinned',
              variant: 'outline-primary',
              onAction: (ctx: InteractionContext) => {
                const initiative = String(ctx.entity?.initiative ?? '');
                setFocusedInitiative(initiative || null);
              },
            },
          ],
          themeOverrides: {
            backgroundColor: 'var(--app-bg-secondary)',
            borderColor: 'var(--app-border)',
            padding: '0.35rem 0.55rem 0.7rem',
            borderRadius: '0 0 18px 18px',
          },
        }),
      },
    }),
    [riskPulseFields, riskPulseRows.length],
  );

  const highlightsConfig = useMemo<WidgemoConfig<Entity>>(
    () => ({
      id: 'dashboard-highlights',
      containerShadow: 'none',
      zones: {
        header: {
          title: 'Executive brief',
          subtitle: focusedInitiative ? `Showing notes for ${focusedInitiative}` : 'Click a slide to focus the dashboard',
          actions: focusActions,
          themeOverrides: {
            backgroundColor: 'var(--app-bg-secondary)',
            borderColor: 'var(--app-border)',
            titleColor: 'var(--app-text-primary)',
            subtitleColor: 'var(--app-text-muted)',
            padding: '0.95rem 1rem 0.7rem',
            borderRadius: '18px 18px 0 0',
          },
        },
        content: createCarouselContent(highlightFields, {
          carousel: {
            itemWidth: 320,
            itemHeight: 'auto',
            gap: 16,
            showIndicators: true,
            showArrows: true,
            infinite: true,
            autoPlay: true,
            autoPlayInterval: 5500,
          },
          gestures: [
            {
              type: 'item-click',
              interactionId: 'focus-highlight',
              interactionLabel: 'Focus highlighted initiative',
              onTrigger: (ctx: InteractionContext) => {
                const initiative = String(ctx.entity?.initiative ?? '');
                setFocusedInitiative(initiative || null);
              },
            },
          ],
          themeOverrides: {
            backgroundColor: 'var(--app-bg-secondary)',
            borderColor: 'var(--app-border)',
            padding: '0.95rem 1rem 1rem',
            borderRadius: '0 0 18px 18px',
          },
          item: {
            cardOptions: {
              border: true,
              borderColor: 'var(--app-border)',
              borderRadius: '16px',
              padding: '1rem',
              backgroundColor: 'var(--app-bg-primary)',
              boxShadow: '0 10px 28px rgba(15, 23, 42, 0.12)',
            },
            conditionalBorder: (entity) => {
              const signal = String(entity.signal ?? 'Amber');
              const color = signalColorMap[signal as keyof typeof signalColorMap] ?? '#b54708';
              return { color, thickness: 4, placement: 'left' };
            },
          },
        }),
      },
    }),
    [focusActions, focusedInitiative, highlightFields],
  );

  return (
    <div
      style={{
        minHeight: '100vh',
        padding: '1.5rem',
        background: 'linear-gradient(180deg, var(--app-bg-primary) 0%, var(--app-bg-secondary) 100%)',
      }}
    >
      <div className="container-fluid" style={{ maxWidth: '1600px' }}>
        <div style={{ marginBottom: '1.2rem' }}>
          <div className="d-flex flex-wrap justify-content-between align-items-start gap-3">
            <div>
              <h1 style={{ fontSize: '1.9rem', fontWeight: 700, marginBottom: '0.25rem' }}>Widgemo Dashboard Mock</h1>
              <p style={{ marginBottom: '0.25rem', color: 'var(--app-text-muted)', maxWidth: '960px' }}>
                A classic operations dashboard assembled entirely from Widgemo instances: KPIs, charts, table, board, and rotating leadership notes.
              </p>
              <p style={{ marginBottom: 0, color: 'var(--app-text-muted)', fontSize: '0.92rem' }}>
                Use Widgemo actions to switch time range, isolate a team, and focus the page on a single initiative.
              </p>
            </div>
            <div
              className="p-3 rounded"
              style={{
                minWidth: '270px',
                backgroundColor: 'var(--app-bg-secondary)',
                border: '1px solid var(--app-border)',
              }}
            >
              <div className="form-check mb-0">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="widgemo-dashboard-inspector-toggle"
                  checked={includeWidgemoInspector}
                  onChange={(e) => setIncludeWidgemoInspector(e.target.checked)}
                />
                <label className="form-check-label" htmlFor="widgemo-dashboard-inspector-toggle">
                  <strong>Show Widgemo Inspector</strong>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="row g-3">
          <div className="col-12">
            <Widgemo data={kpiData} config={injectDevMode(summaryConfig)} />
          </div>

          <div className="col-12 col-xl-8">
            <Widgemo data={throughputData} config={injectDevMode(throughputConfig)} />
          </div>

          <div className="col-12 col-xl-4">
            <Widgemo data={allocationData} config={injectDevMode(allocationConfig)} />
          </div>

          <div className="col-12 col-xxl-8">
            <Widgemo data={portfolioRows} config={injectDevMode(portfolioConfig)} />
          </div>

          <div className="col-12 col-xxl-4">
            <div className="d-grid gap-3">
              <Widgemo data={highlights} config={injectDevMode(highlightsConfig)} />
              <Widgemo data={riskPulseRows} config={injectDevMode(riskPulseConfig)} />
            </div>
          </div>

          <div className="col-12">
            <Widgemo data={boardCards} config={injectDevMode(boardConfig)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;