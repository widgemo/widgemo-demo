const clamp = (value: number, min: number, max: number): number => Math.max(min, Math.min(max, value));

const seededNoise = (seed: number, index: number): number => {
  const x = Math.sin(seed * 12.9898 + index * 78.233) * 43758.5453;
  return x - Math.floor(x);
};

const toSeed = (input: string): number => {
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    hash = ((hash << 5) - hash) + input.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash) + 1;
};

export const registerAccountTrendSparkField = () => ({
  name: 'accountTrendSpark',
  render: (value: unknown, _options: import('@widgemo/widgemo-core').RenderAsOptions, entity: import('@widgemo/widgemo-core').Entity) => {
    const changePct = Number(value ?? 0);
    const seed = toSeed(String(entity.id ?? entity.accountName ?? 'trend'));
    const points: string[] = [];
    const trendBias = changePct >= 0 ? -0.7 : 0.7;

    for (let i = 0; i < 18; i += 1) {
      const x = i * 6;
      const noise = (seededNoise(seed, i) - 0.5) * 10;
      const slope = (i - 9) * trendBias;
      const y = clamp(18 + noise + slope, 4, 32);
      points.push(`${x},${y.toFixed(2)}`);
    }

    return (
      <div style={{ display: 'grid', gap: '0.1rem', minWidth: '116px' }}>
        <svg width="108" height="34" viewBox="0 0 108 34" aria-hidden="true">
          <polyline
            fill="none"
            stroke={changePct >= 0 ? '#35d4a1' : '#e67e7e'}
            strokeWidth="1.6"
            points={points.join(' ')}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span style={{ color: changePct >= 0 ? '#35d4a1' : '#e67e7e', fontSize: '0.66rem', fontWeight: 700, letterSpacing: '0.03em' }}>
          {changePct >= 0 ? '+' : ''}{changePct.toFixed(1)}%
        </span>
      </div>
    );
  },
});
