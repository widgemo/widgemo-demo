export interface AccountHealthRenderAsOptions {
  thresholds?: {
    critical?: number;
    watch?: number;
  };
  showNumeric?: boolean;
}

export const registerAccountHealthField = () => ({
  name: 'accountHealthMeter',
  render: (value: unknown, options: import('@widgemo/widgemo-core').RenderAsOptions) => {
    const healthOptions = options as AccountHealthRenderAsOptions;
    const score = Math.max(0, Math.min(100, Number(value) || 0));
    const criticalThreshold = healthOptions.thresholds?.critical ?? 35;
    const watchThreshold = healthOptions.thresholds?.watch ?? 65;

    const tone = score < criticalThreshold
      ? { color: '#c53030', background: 'rgba(229, 62, 62, 0.2)', label: 'Critical' }
      : score < watchThreshold
        ? { color: '#c05621', background: 'rgba(237, 137, 54, 0.2)', label: 'Watch' }
        : { color: '#2f855a', background: 'rgba(56, 161, 105, 0.18)', label: 'Healthy' };

    return (
      <div style={{ minWidth: '130px' }}>
        <div
          style={{
            width: '100%',
            height: '8px',
            borderRadius: '999px',
            backgroundColor: '#e2e8f0',
            overflow: 'hidden',
            marginBottom: '0.25rem',
          }}
        >
          <div
            style={{
              width: `${score}%`,
              height: '100%',
              borderRadius: '999px',
              backgroundColor: tone.color,
              transition: 'width 220ms ease',
            }}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.4rem' }}>
          <span
            style={{
              backgroundColor: tone.background,
              color: tone.color,
              borderRadius: '999px',
              fontSize: '0.62rem',
              fontWeight: 700,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              padding: '0.14rem 0.42rem',
            }}
          >
            {tone.label}
          </span>
          {(healthOptions.showNumeric ?? true) && (
            <span style={{ color: '#4a5568', fontSize: '0.72rem', fontWeight: 700 }}>{score}</span>
          )}
        </div>
      </div>
    );
  },
  defaultOptions: {
    showNumeric: true,
  },
});
