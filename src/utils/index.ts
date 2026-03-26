export * from './themeConfig';
export * from './themeUtils';

/** Recursively strip React serialization artifacts (_owner, _store, null key/ref) */
export function sanitizeReactInternals(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(sanitizeReactInternals);
  }
  if (value !== null && typeof value === 'object') {
    const obj = value as Record<string, unknown>;
    const result: Record<string, unknown> = {};
    for (const k of Object.keys(obj)) {
      if (k === '_owner' || k === '_store' || k === '__self' || k === '__source') continue;
      if ((k === 'key' || k === 'ref') && obj[k] === null) continue;
      result[k] = sanitizeReactInternals(obj[k]);
    }
    return result;
  }
  return value;
}