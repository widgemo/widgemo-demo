export interface CashPillRenderAsOptions {
  rounded?: boolean;
  compact?: boolean;
}

const toneMap: Record<string, { background: string; color: string; label: string }> = {
  inflow: { background: 'rgba(56, 161, 105, 0.15)', color: '#2f855a', label: 'INFLOW' },
  outflow: { background: 'rgba(229, 62, 62, 0.14)', color: '#c53030', label: 'OUTFLOW' },
  transfer: { background: 'rgba(66, 153, 225, 0.16)', color: '#2b6cb0', label: 'TRANSFER' },
  recurring: { background: 'rgba(128, 90, 213, 0.16)', color: '#6b46c1', label: 'RECURRING' },
  scheduled: { background: 'rgba(66, 153, 225, 0.16)', color: '#2b6cb0', label: 'SCHEDULED' },
  pending: { background: 'rgba(237, 137, 54, 0.17)', color: '#c05621', label: 'PENDING' },
  posted: { background: 'rgba(72, 187, 120, 0.15)', color: '#2f855a', label: 'POSTED' },
  overdue: { background: 'rgba(229, 62, 62, 0.14)', color: '#c53030', label: 'OVERDUE' },
  critical: { background: 'rgba(229, 62, 62, 0.14)', color: '#c53030', label: 'CRITICAL' },
  watch: { background: 'rgba(237, 137, 54, 0.17)', color: '#c05621', label: 'WATCH' },
  info: { background: 'rgba(113, 128, 150, 0.2)', color: '#4a5568', label: 'INFO' },
  recommended: { background: 'rgba(90, 103, 216, 0.17)', color: '#434190', label: 'RECOMMENDED' },
  optional: { background: 'rgba(113, 128, 150, 0.2)', color: '#4a5568', label: 'OPTIONAL' },
};

export const registerCashPillField = () => ({
  name: 'cashPill',
  render: (value: unknown, options: import('@widgemo/widgemo-core').RenderAsOptions) => {
    const pillOptions = options as CashPillRenderAsOptions;
    const raw = String(value ?? 'info').toLowerCase();
    const tone = toneMap[raw] ?? { background: 'rgba(113, 128, 150, 0.2)', color: '#4a5568', label: raw.toUpperCase() };

    return (
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: pillOptions.compact ? '0.12rem 0.4rem' : '0.18rem 0.52rem',
          borderRadius: pillOptions.rounded === false ? '0.35rem' : '999px',
          backgroundColor: tone.background,
          color: tone.color,
          fontSize: pillOptions.compact ? '0.64rem' : '0.68rem',
          fontWeight: 700,
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
        }}
      >
        {tone.label}
      </span>
    );
  },
  defaultOptions: {
    rounded: true,
    compact: false,
  },
});
