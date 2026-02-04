// Define interface for progress bar field config
export interface ProgressBarFieldConfig {
  type: 'progress';
  showPercentage?: boolean;
  color?: string;
  height?: string;
}

export const registerProgressBarField = () => ({
  name: 'progress',
  render: (value: unknown, config: unknown) => {
    const progress = Math.min(100, Math.max(0, Number(value) || 0));
    // Access custom config properties with proper typing
    const customConfig = config as unknown as ProgressBarFieldConfig;
    const showPercentage = customConfig.showPercentage !== false;
    const color = customConfig.color || '#007bff';
    const height = customConfig.height || '8px';

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
  defaultConfig: {}
});