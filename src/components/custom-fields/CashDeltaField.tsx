export interface CashDeltaRenderAsOptions {
  showPercent?: boolean;
  showArrow?: boolean;
  precision?: number;
  positiveColor?: string;
  negativeColor?: string;
  neutralColor?: string;
}

export const registerCashDeltaField = () => ({
  name: 'cashDelta',
  render: (value: unknown, options: import('@widgemo/widgemo-core').RenderAsOptions) => {
    const deltaOptions = options as CashDeltaRenderAsOptions;
    const numeric = Number(value) || 0;
    const precision = deltaOptions.precision ?? 0;
    const showPercent = deltaOptions.showPercent ?? false;
    const showArrow = deltaOptions.showArrow ?? true;
    const positiveColor = deltaOptions.positiveColor ?? '#2f855a';
    const negativeColor = deltaOptions.negativeColor ?? '#c53030';
    const neutralColor = deltaOptions.neutralColor ?? '#718096';

    const isPositive = numeric > 0;
    const isNegative = numeric < 0;
    const color = isPositive ? positiveColor : isNegative ? negativeColor : neutralColor;
    const arrow = isPositive ? 'UP' : isNegative ? 'DOWN' : 'FLAT';
    const formatted = Math.abs(numeric).toFixed(precision);

    return (
      <span style={{ color, fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.01em' }}>
        {showArrow ? `${arrow} ` : ''}
        {isNegative ? '-' : isPositive ? '+' : ''}
        {formatted}
        {showPercent ? '%' : ''}
      </span>
    );
  },
  defaultOptions: {
    showPercent: false,
    showArrow: true,
    precision: 0,
  },
});
