import type { Entity, FieldConfig, WidgemoConfig } from '@widgemo/widgemo-core';
import {
  accountScopeLabels,
  forecastHorizonLabels,
  riskPostureLabels,
  getCashflowKpis,
  type AccountScope,
  type ForecastHorizon,
  type RiskPosture,
} from '../data/cashflowDashboardData';

export const LIQUIDITY_SNAPSHOT_DEFAULT_SCOPE: AccountScope = 'all';
export const LIQUIDITY_SNAPSHOT_DEFAULT_HORIZON: ForecastHorizon = '30d';
export const LIQUIDITY_SNAPSHOT_DEFAULT_POSTURE: RiskPosture = 'expected';

const liquiditySnapshotFields: FieldConfig[] = [
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
];

export const getLiquiditySnapshotPreviewData = (): Entity[] => {
  return getCashflowKpis(
    LIQUIDITY_SNAPSHOT_DEFAULT_SCOPE,
    LIQUIDITY_SNAPSHOT_DEFAULT_HORIZON,
    LIQUIDITY_SNAPSHOT_DEFAULT_POSTURE,
  );
};

export const liquiditySnapshotSummaryConfig: WidgemoConfig<Entity> = {
  containerFrame: { shadow: 'none', borderRadius: 0 },
  zones: {
    header: {
      title: 'Liquidity Snapshot',
      subtitle: `${accountScopeLabels[LIQUIDITY_SNAPSHOT_DEFAULT_SCOPE]} · ${forecastHorizonLabels[LIQUIDITY_SNAPSHOT_DEFAULT_HORIZON]} · ${riskPostureLabels[LIQUIDITY_SNAPSHOT_DEFAULT_POSTURE]}`,
      icon: 'finance-reserve',
      themeOverrides: {
        backgroundColor: 'var(--app-bg-secondary)',
        borderColor: 'var(--app-border)',
        padding: '0.7rem 0.85rem 0.55rem',
        borderRadius: '1px 1px 0 0',
        iconSize: 24,
      },
    },
    content: {
      mode: 'grid',
      modeConfig: {
        grid: { minItemWidth: '260px', gap: '0.8rem', maxColumns: 4 },
      },
      item: {
        fields: liquiditySnapshotFields,
        layout: { type: 'auto' },
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
    },
    footer: {
      subtitle: `4 KPI records · Scope ${accountScopeLabels[LIQUIDITY_SNAPSHOT_DEFAULT_SCOPE]} · Horizon ${forecastHorizonLabels[LIQUIDITY_SNAPSHOT_DEFAULT_HORIZON]}`,
      style: { padding: '0.2rem 0.5rem', fontSize: '0.68rem', lineHeight: 1.2 },
    },
  },
};
