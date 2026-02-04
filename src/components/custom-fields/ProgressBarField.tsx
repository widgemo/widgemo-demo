// Define interface for progress bar renderAs options
export interface ProgressBarRenderAsOptions {
  showPercentage?: boolean;
  color?: string;
  height?: string;
  maxValue?: number;
}

export const registerProgressBarField = () => ({
  name: 'customProgress',
  render: (value: unknown, options: import('widgemo-core').RenderAsOptions) => {
    const progressOptions = options as ProgressBarRenderAsOptions;
    const progress = Math.min(100, Math.max(0, Number(value) || 0));
    const showPercentage = progressOptions.showPercentage !== false;
    const color = progressOptions.color || '#007bff';
    const height = progressOptions.height || '8px';

    return (
      <div className="progress-container" style={{ width: '100%', maxWidth: '200px' }}>
        <div
          className="progress-bar"
          style={{
            width: '100%',
            height,
            backgroundColor: '#e9ecef',
            borderRadius: '4px',
            overflow: 'hidden'
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: '100%',
              backgroundColor: color,
              transition: 'width 0.3s ease',
              borderRadius: '4px'
            }}
          />
        </div>
        {showPercentage && (
          <div style={{
            fontSize: '12px',
            color: '#6c757d',
            textAlign: 'center',
            marginTop: '2px'
          }}>
            {progress}%
          </div>
        )}
      </div>
    );
  },
  defaultOptions: {
    showPercentage: true,
    color: '#007bff',
    height: '8px',
    maxValue: 100
  }
});