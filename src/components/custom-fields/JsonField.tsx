import { useState } from 'react';

// Define interface for JSON field config
export interface JsonFieldConfig {
  type: 'json';
  collapsed?: boolean;
  maxDepth?: number;
}

export const registerJsonField = () => ({
  name: 'json',
  render: (value: unknown, config: unknown) => {
    const customConfig = config as unknown as JsonFieldConfig;
    const collapsed = customConfig.collapsed ?? true;
    const maxDepth = customConfig.maxDepth ?? 3;

    // Parse JSON if it's a string, otherwise use as-is
    let jsonData;
    try {
      jsonData = typeof value === 'string' ? JSON.parse(value) : value;
    } catch {
      return (
        <div style={{
          color: '#dc3545',
          fontFamily: 'monospace',
          fontSize: '12px',
          padding: '8px',
          backgroundColor: '#f8d7da',
          border: '1px solid #f5c6cb',
          borderRadius: '4px'
        }}>
          Invalid JSON: {String(value)}
        </div>
      );
    }

    // JSON Tree Component
    const JsonTree: React.FC<{
      data: unknown;
      depth?: number;
      path?: string;
      collapsed?: boolean;
    }> = ({ data, depth = 0, path = '', collapsed: initialCollapsed = collapsed }) => {
      const [isCollapsed, setIsCollapsed] = useState(initialCollapsed && depth > 0);

      const toggleCollapse = () => setIsCollapsed(!isCollapsed);

      const getValueStyle = (value: unknown) => {
        if (value === null) return { color: '#6c757d', fontStyle: 'italic' };
        if (typeof value === 'boolean') return { color: '#007bff', fontWeight: 'bold' };
        if (typeof value === 'number') return { color: '#28a745', fontWeight: 'bold' };
        if (typeof value === 'string') return { color: '#dc3545' };
        return { color: '#495057' };
      };

      const renderValue = (val: unknown) => {
        if (val === null) return <span style={getValueStyle(val)}>null</span>;
        if (typeof val === 'boolean') return <span style={getValueStyle(val)}>{val.toString()}</span>;
        if (typeof val === 'number') return <span style={getValueStyle(val)}>{val}</span>;
        if (typeof val === 'string') return <span style={getValueStyle(val)}>"{val}"</span>;
        if (Array.isArray(val)) {
          if (depth >= maxDepth) {
            return <span style={{ color: '#6c757d' }}>[...]</span>;
          }
          return (
            <div style={{ marginLeft: depth > 0 ? '20px' : '0' }}>
              {depth > 0 && (
                <div
                  onClick={toggleCollapse}
                  style={{
                    cursor: 'pointer',
                    userSelect: 'none',
                    color: '#007bff',
                    fontWeight: 'bold'
                  }}
                >
                  {isCollapsed ? '▶' : '▼'} [{val.length}]
                </div>
              )}
              {!isCollapsed && (
                <div style={{ marginLeft: '10px' }}>
                  {val.map((item, index) => (
                    <div key={index} style={{ margin: '2px 0' }}>
                      <span style={{ color: '#6c757d' }}>{index}:</span>{' '}
                      <JsonTree
                        data={item}
                        depth={depth + 1}
                        path={`${path}[${index}]`}
                        collapsed={collapsed}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        }
        if (typeof val === 'object') {
          if (depth >= maxDepth) {
            return <span style={{ color: '#6c757d' }}>{'{}'}</span>;
          }
          const keys = Object.keys(val);
          return (
            <div style={{ marginLeft: depth > 0 ? '20px' : '0' }}>
              {depth > 0 && (
                <div
                  onClick={toggleCollapse}
                  style={{
                    cursor: 'pointer',
                    userSelect: 'none',
                    color: '#007bff',
                    fontWeight: 'bold'
                  }}
                >
                  {isCollapsed ? '▶' : '▼'} {'{}'} ({keys.length} keys)
                </div>
              )}
              {!isCollapsed && (
                <div style={{ marginLeft: '10px' }}>
                  {keys.map(key => (
                    <div key={key} style={{ margin: '2px 0' }}>
                      <span style={{ color: '#dc3545' }}>"{key}"</span>
                      <span style={{ color: '#6c757d' }}>:</span>{' '}
                      <JsonTree
                        data={(val as Record<string, unknown>)[key]}
                        depth={depth + 1}
                        path={`${path}.${key}`}
                        collapsed={collapsed}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        }
        return <span style={getValueStyle(val)}>{String(val)}</span>;
      };

      return renderValue(data);
    };

    return (
      <div
        className="json-field-container"
        style={{
          fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
          fontSize: '11px',
          lineHeight: '1.4',
          maxHeight: '300px',
          overflow: 'auto',
          padding: '8px',
          backgroundColor: '#f8f9fa',
          border: `1px solid #dee2e6`,
          borderRadius: '4px',
          color: '#212529'
        }}
      >
        <JsonTree data={jsonData} />
      </div>
    );
  },
  defaultConfig: {}
});