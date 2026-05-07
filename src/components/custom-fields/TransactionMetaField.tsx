export interface TransactionMetaRenderAsOptions {
  showAccount?: boolean;
}

export const registerTransactionMetaField = () => ({
  name: 'transactionMeta',
  render: (_value: unknown, options: import('@widgemo/widgemo-core').RenderAsOptions, entity: import('@widgemo/widgemo-core').Entity) => {
    const metaOptions = options as TransactionMetaRenderAsOptions;
    const merchant = String(entity.merchant ?? 'Unknown merchant');
    const category = String(entity.category ?? 'Uncategorized');
    const accountName = String(entity.accountName ?? 'Unknown account');

    return (
      <div style={{ display: 'grid', gap: '0.08rem', minWidth: '150px' }}>
        <span style={{ color: 'var(--app-text-primary)', fontWeight: 600, fontSize: '0.82rem', lineHeight: 1.2 }}>
          {merchant}
        </span>
        <span style={{ color: 'var(--app-text-muted)', fontSize: '0.68rem', lineHeight: 1.2 }}>
          {category}
          {metaOptions.showAccount !== false ? ` · ${accountName}` : ''}
        </span>
      </div>
    );
  },
  defaultOptions: {
    showAccount: true,
  },
});
