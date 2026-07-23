export const registerAccountBalanceField = () => ({
  name: 'accountBalance',
  render: (value: unknown, _options: import('@widgemo/widgemo-core').RenderAsOptions, entity: import('@widgemo/widgemo-core').Entity) => {
    const numeric = Number(value ?? 0);
    const updatedAgo = String(entity.updatedAgo ?? 'unknown');

    return (
      <div style={{ display: 'grid', gap: '0.04rem', justifyItems: 'end', minWidth: '125px' }}>
        <span style={{ color: 'var(--app-text-primary)', fontWeight: 700, fontSize: '0.83rem', lineHeight: 1.2 }}>
          ${numeric.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </span>
        <span style={{ color: 'var(--app-text-muted)', fontSize: '0.64rem', lineHeight: 1.2 }}>
          {updatedAgo}
        </span>
      </div>
    );
  },
});
