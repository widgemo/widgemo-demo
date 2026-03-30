import React, { useEffect, useRef } from 'react';

const STORAGE_KEY = 'widgemo-devbanner-dismissed';

interface DevBannerProps {
  visible: boolean;
  onDismiss: () => void;
  onHeightChange: (height: number) => void;
}

export const DevBanner: React.FC<DevBannerProps> = ({ visible, onDismiss, onHeightChange }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!visible || !ref.current) {
      onHeightChange(0);
      return;
    }
    // Report initial height
    onHeightChange(ref.current.offsetHeight);
    // Track height changes (e.g. when text wraps on resize)
    const ro = new ResizeObserver(entries => {
      onHeightChange(entries[0].borderBoxSize[0]?.blockSize ?? entries[0].contentRect.height);
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, [visible, onHeightChange]);

  if (!visible) return null;

  const handleDismiss = () => {
    localStorage.setItem(STORAGE_KEY, 'true');
    onDismiss();
  };

  return (
    <div
      ref={ref}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1031,
        backgroundColor: '#b45309',
        color: '#fffbeb',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.25rem 0.75rem',
        padding: '0.625rem 1rem',
        fontSize: '0.8125rem',
        fontWeight: 500,
        boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
      }}
    >
      <span style={{ flex: '1 1 220px' }}>
        🚧 This is a live development preview — things may break, change, or disappear without notice.
      </span>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexShrink: 0 }}>
        <a
          href="https://widgemo.com"
          style={{ color: '#fef3c7', textDecoration: 'underline', fontSize: '0.8125rem' }}
        >
          ← Back to widgemo.com
        </a>
        <button
          onClick={handleDismiss}
          aria-label="Dismiss banner"
          style={{
            background: 'none',
            border: 'none',
            color: '#fef3c7',
            cursor: 'pointer',
            fontSize: '1.1rem',
            lineHeight: 1,
            padding: '0.2rem 0.3rem',
            opacity: 0.8,
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '0.8')}
        >
          ✕
        </button>
      </div>
    </div>
  );
};
