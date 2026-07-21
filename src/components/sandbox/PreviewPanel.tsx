import React from 'react';
// import { Widgemo } from 'widgemo-core';
import { Widgemo } from '@widgemo/widgemo-core';
import type { WidgemoConfig } from '@widgemo/widgemo-core';

interface PreviewPanelProps {
  // Configuration
  config: WidgemoConfig;
  data: Record<string, unknown>[];

  // Size controls
  width: number;
  height: number;
  isAutoWidth: boolean;
  isAutoHeight: boolean;
  showDevOverlay: boolean;
}

export const PreviewPanel: React.FC<PreviewPanelProps> = ({
  config,
  data,
  width,
  height,
  isAutoWidth,
  isAutoHeight,
  showDevOverlay,
}) => {
  // Keep dev overlay opt-in for public-facing sandbox use.
  const getConfig = () => {
    const modifiedConfig = { ...config };

    if (showDevOverlay) {
      modifiedConfig.devMode = {
        enabled: true,
        zone: 'auto',
        overlay: {
          excludeFields: ['zones.content.status', 'zones.content.error']
        }
      };
    }

    return modifiedConfig;
  };

  return (
    <div className="p-4 h-100">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0">Live Preview</h5>
      </div>
      <div
        style={{
          ...(isAutoHeight ? { maxHeight: 'calc(100vh - 300px)' } : { height: `${height}px` }),
          overflow: 'auto',
          padding: '8px',
          width: isAutoWidth ? 'auto' : `${width}px`
        }}
      >
        <Widgemo 
          data={data} 
          config={getConfig()} 
          className="my-custom-widgemo"
        />
      </div>
    </div>
  );
};