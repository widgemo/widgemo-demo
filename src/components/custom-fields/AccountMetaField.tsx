export interface AccountMetaRenderAsOptions {
  showOwner?: boolean;
}

export const registerAccountMetaField = () => ({
  name: 'accountMeta',
  render: (_value: unknown, options: import('@widgemo/widgemo-core').RenderAsOptions, entity: import('@widgemo/widgemo-core').Entity) => {
    const metaOptions = options as AccountMetaRenderAsOptions;
    const accountName = String(entity.accountName ?? 'Unknown account');
    const accountType = String(entity.accountType ?? 'Account');
    const owner = String(entity.owner ?? 'Unassigned');
    const shared = Boolean(entity.shared);
    const balance = Number(entity.balance ?? 0);

    return (
      <div style={{ display: 'grid', gap: '0.08rem', minWidth: '200px' }}>
        <span style={{ color: 'var(--app-text-primary)', fontWeight: 600, fontSize: '0.82rem', lineHeight: 1.2 }}>
          {accountName}
        </span>
        <span style={{ color: 'var(--app-text-muted)', fontSize: '0.67rem', lineHeight: 1.2 }}>
          {accountType}
          {metaOptions.showOwner !== false ? `  ·  ${owner}` : ''}
          {shared ? '  ·  Shared' : ''}
        </span>
        {balance === 0 && (
          <span style={{ color: '#d57272', fontSize: '0.64rem', lineHeight: 1.15, fontWeight: 600 }}>
            Account disconnected
          </span>
        )}
      </div>
    );
  },
  defaultOptions: {
    showOwner: true,
  },
});
