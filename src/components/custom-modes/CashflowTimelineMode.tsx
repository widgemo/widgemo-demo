import React from 'react';
import type { Entity } from '@widgemo/widgemo-core';

export interface CashflowTimelineConfig {
  dateField?: string;
  labelField?: string;
  amountField?: string;
  directionField?: string;
  accountField?: string;
  statusField?: string;
  groupBy?: 'day' | 'week';
  showRunningBalance?: boolean;
  highlightWindowDays?: number;
}

interface CashflowTimelineModeProps {
  data: Entity[];
  config?: Record<string, unknown> & { cashflowTimeline?: CashflowTimelineConfig };
}

const statusToneMap: Record<string, { background: string; color: string }> = {
  scheduled: { background: 'rgba(66, 153, 225, 0.16)', color: '#2b6cb0' },
  pending: { background: 'rgba(237, 137, 54, 0.18)', color: '#c05621' },
  posted: { background: 'rgba(56, 161, 105, 0.16)', color: '#2f855a' },
  overdue: { background: 'rgba(229, 62, 62, 0.16)', color: '#c53030' },
};

const CashflowTimelineMode: React.FC<CashflowTimelineModeProps> = ({
  data,
  config = {},
}) => {
  const timelineConfig = (config.cashflowTimeline ?? {}) as CashflowTimelineConfig;
  const {
    dateField = 'date',
    labelField = 'label',
    amountField = 'amount',
    directionField = 'direction',
    accountField = 'accountName',
    statusField = 'status',
    showRunningBalance = true,
    highlightWindowDays = 7,
  } = timelineConfig;

  const sorted = React.useMemo(() => {
    return [...data].sort((a, b) => {
      const aTime = new Date(String(a[dateField] ?? '1970-01-01')).getTime();
      const bTime = new Date(String(b[dateField] ?? '1970-01-01')).getTime();
      return aTime - bTime;
    });
  }, [data, dateField]);

  const today = React.useMemo(() => new Date(), []);

  return (
    <div style={{ padding: '0.25rem 0.15rem 0.35rem' }}>
      {sorted.map((row, index) => {
        const rawDate = new Date(String(row[dateField] ?? today.toISOString()));
        const amount = Number(row[amountField]) || 0;
        const direction = String(row[directionField] ?? (amount >= 0 ? 'inflow' : 'outflow')).toLowerCase();
        const status = String(row[statusField] ?? 'scheduled').toLowerCase();
        const isPositive = direction === 'inflow' || amount >= 0;
        const dayDiff = Math.floor((rawDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        const isSoon = dayDiff >= 0 && dayDiff <= highlightWindowDays;
        const tone = statusToneMap[status] ?? { background: 'rgba(113, 128, 150, 0.16)', color: '#4a5568' };

        return (
          <div key={String(row.id ?? `${row[labelField]}-${index}`)} style={{ display: 'flex', gap: '0.8rem', position: 'relative', paddingBottom: '0.95rem' }}>
            <div style={{ width: '22px', display: 'flex', justifyContent: 'center', position: 'relative', flexShrink: 0 }}>
              <span
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '999px',
                  marginTop: '0.28rem',
                  backgroundColor: isPositive ? '#2f855a' : '#c53030',
                  boxShadow: isSoon ? '0 0 0 4px rgba(66, 153, 225, 0.18)' : 'none',
                }}
              />
              {index < sorted.length - 1 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '1rem',
                    width: '2px',
                    bottom: '-0.15rem',
                    background: 'linear-gradient(180deg, rgba(148, 163, 184, 0.55), rgba(148, 163, 184, 0.2))',
                  }}
                />
              )}
            </div>

            <div style={{ flex: 1, minWidth: 0, border: '1px solid rgba(148, 163, 184, 0.24)', borderRadius: '0.72rem', backgroundColor: 'var(--app-bg-secondary)', padding: '0.62rem 0.72rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.55rem', alignItems: 'baseline', marginBottom: '0.25rem' }}>
                <strong style={{ fontSize: '0.86rem', color: 'var(--app-text-primary)' }}>{String(row[labelField] ?? 'Cash Event')}</strong>
                <span style={{ fontSize: '0.72rem', color: 'var(--app-text-muted)' }}>
                  {new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(rawDate)}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.6rem', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.42rem', flexWrap: 'wrap' }}>
                  <span
                    style={{
                      backgroundColor: tone.background,
                      color: tone.color,
                      fontSize: '0.62rem',
                      fontWeight: 700,
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                      borderRadius: '999px',
                      padding: '0.14rem 0.44rem',
                    }}
                  >
                    {status}
                  </span>
                  <span style={{ color: 'var(--app-text-muted)', fontSize: '0.72rem' }}>{String(row[accountField] ?? 'Account')}</span>
                </div>

                <span style={{ color: isPositive ? '#2f855a' : '#c53030', fontWeight: 700, fontSize: '0.8rem' }}>
                  {amount >= 0 ? '+' : '-'}${Math.abs(amount).toLocaleString()}
                </span>
              </div>

              {showRunningBalance && (
                <div style={{ marginTop: '0.35rem', fontSize: '0.71rem', color: 'var(--app-text-muted)' }}>
                  Running Balance: <strong style={{ color: 'var(--app-text-primary)' }}>${Math.round(Number(row.runningBalance) || 0).toLocaleString()}</strong>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CashflowTimelineMode;
