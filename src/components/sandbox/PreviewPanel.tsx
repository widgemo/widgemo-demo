import React from 'react';
import { Form } from 'react-bootstrap';
// import { Widgemo } from 'widgemo-core';
import { Widgemo } from 'widgemo-core';
import type { WidgemoConfig } from 'widgemo-core';

interface PreviewPanelProps {
  // Configuration
  config: WidgemoConfig;
  data: Record<string, unknown>[];

  // Size controls
  width: number;
  height: number;
  isAutoWidth: boolean;
  isAutoHeight: boolean;
  onWidthChange: (width: number) => void;
  onHeightChange: (height: number) => void;
  onAutoWidthChange: (auto: boolean) => void;
  onAutoHeightChange: (auto: boolean) => void;
}

export const PreviewPanel: React.FC<PreviewPanelProps> = ({
  config,
  data,
  width,
  height,
  isAutoWidth,
  isAutoHeight,
  onWidthChange,
  onHeightChange,
  onAutoWidthChange,
  onAutoHeightChange,
}) => {
  const previewRef = React.useRef<HTMLDivElement>(null);

  const [selectedTheme, setSelectedTheme] = React.useState('default');

  // Sugar props for testing
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  // Modify config to include devMode
  const getConfig = () => {
    const modifiedConfig = { ...config };
    // Enable devMode for testing
    modifiedConfig.devMode = {
      enabled: true,
      zone: 'auto',
      overlay: {
        excludeFields: ['zones.content.data', 'zones.content.status', 'zones.content.error']
      }
    };
    return modifiedConfig;
  };

  return (
    <div className="p-4 h-100">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0">Live Preview</h5>
        <div className="d-flex align-items-center gap-3">
          <Form.Select
            value={selectedTheme}
            onChange={(e) => setSelectedTheme(e.target.value)}
            size="sm"
            style={{ width: '120px' }}
          >
            <option value="default">Default Theme</option>
            <option value="dark">Dark Theme</option>
          </Form.Select>
          <Form.Check
            type="checkbox"
            label="Loading"
            checked={loading}
            onChange={(e) => setLoading(e.target.checked)}
          />
          <Form.Check
            type="checkbox"
            label="Error"
            checked={!!error}
            onChange={(e) => setError(e.target.checked ? 'Test error occurred' : null)}
          />
          <Form.Check
            type="checkbox"
            label="Auto width"
            checked={isAutoWidth}
            onChange={(e) => onAutoWidthChange(e.target.checked)}
          />
          <Form.Check
            type="checkbox"
            label="Auto height"
            checked={isAutoHeight}
            onChange={(e) => onAutoHeightChange(e.target.checked)}
          />
          <div className="d-flex gap-2 ms-3">
            {!isAutoWidth && (
              <div className="d-flex align-items-center gap-2">
                <Form.Label className="mb-0" style={{ width: '80px' }}>Width (px)</Form.Label>
                <Form.Control
                  type="number"
                  value={width}
                  onChange={(e) => onWidthChange(Number(e.target.value))}
                  min="100"
                  max="1200"
                  size="sm"
                  style={{width: '70px'}}
                />
              </div>
            )}
            {!isAutoHeight && (
              <div className="d-flex align-items-center gap-2">
                <Form.Label className="mb-0" style={{ width: '80px' }}>Height (px)</Form.Label>
                <Form.Control
                  type="number"
                  value={height}
                  onChange={(e) => onHeightChange(Number(e.target.value))}
                  min="100"
                  max="800"
                  size="sm"
                  style={{width: '70px'}}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <div
        ref={previewRef}
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
          loading={loading}
          error={error}
          onRetry={() => {
            setLoading(false);
            setError(null);
          }}
        />
      </div>
    </div>
  );
};