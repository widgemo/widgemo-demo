export interface ForecastConfidenceRenderAsOptions {
  compact?: boolean;
}

export const registerForecastConfidenceField = () => ({
  name: 'forecastConfidence',
  render: (value: unknown, options: import('@widgemo/widgemo-core').RenderAsOptions) => {
    const confidenceOptions = options as ForecastConfidenceRenderAsOptions;
    const score = Math.max(0, Math.min(100, Number(value) || 0));

    const tone = score >= 85
      ? { color: '#2b6cb0', label: 'High' }
      : score >= 70
        ? { color: '#2f855a', label: 'Good' }
        : score >= 55
          ? { color: '#c05621', label: 'Medium' }
          : { color: '#c53030', label: 'Low' };

    return (
      <div style={{ minWidth: confidenceOptions.compact ? '92px' : '120px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.2rem' }}>
          <span style={{ fontSize: '0.62rem', color: tone.color, fontWeight: 700, letterSpacing: '0.03em', textTransform: 'uppercase' }}>
            {tone.label}
          </span>
          <span style={{ fontSize: '0.66rem', color: '#4a5568', fontWeight: 700 }}>{score}%</span>
        </div>
        <div
          style={{
            width: '100%',
            height: confidenceOptions.compact ? '6px' : '7px',
            borderRadius: '999px',
            backgroundColor: '#edf2f7',
            overflow: 'hidden',
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
      </div>
    );
  },
  defaultOptions: {
    compact: false,
  },
});
