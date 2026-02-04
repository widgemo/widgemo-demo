import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { WidgemoThemeProvider, widgemoRegistry } from 'widgemo-core';
import { AppNavbar } from './components/Navbar';
import { MainPage } from './components/MainPage';
import { SandboxPage } from './components/SandboxPage';
import { SimplifiedTest } from './components/SimplifiedTest';
import { useTheme } from './hooks/useTheme';
import './App.css';

// Define interface for progress bar field config
interface ProgressBarFieldConfig {
  type: 'progress';
  showPercentage?: boolean;
  color?: string;
  height?: string;
}

// Define interface for JSON field config
interface JsonFieldConfig {
  type: 'json';
  collapsed?: boolean;
  maxDepth?: number;
  showLineNumbers?: boolean;
  theme?: 'light' | 'dark';
}

function AppContent() {
  const { currentTheme } = useTheme();
  
  // Register custom field type for progress bars
  // Progress bar - active
  widgemoRegistry.registerWidgemoFieldType({
    name: 'progress',
    render: (value, config) => {
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

  // Register custom field type for JSON display
  // JSON - collapsible, color-coded, pretty-printed
  widgemoRegistry.registerWidgemoFieldType({
    name: 'json',
    render: (value, config) => {
      const customConfig = config as unknown as JsonFieldConfig;
      const collapsed = customConfig.collapsed ?? true;
      const maxDepth = customConfig.maxDepth ?? 3;
      const theme = customConfig.theme ?? 'light';

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
        const [isCollapsed, setIsCollapsed] = React.useState(initialCollapsed && depth > 0);
        
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
            backgroundColor: theme === 'dark' ? '#2d3748' : '#f8f9fa',
            border: `1px solid ${theme === 'dark' ? '#4a5568' : '#dee2e6'}`,
            borderRadius: '4px',
            color: theme === 'dark' ? '#e2e8f0' : '#212529'
          }}
        >
          <JsonTree data={jsonData} />
        </div>
      );
    },
    defaultConfig: {}
  });

  // Other icons - commented out for testing
  /*
  widgemoRegistry.registerWidgemoIcon({
    name: 'database',
    component: (props: { className?: string; size?: number; color?: string }) => 
      fontAwesomeRenderIcon({ name: 'database', ...props }),
    defaultProps: { size: 16, color: '#007acc' }
  });

  widgemoRegistry.registerWidgemoIcon({
    name: 'users',
    component: (props: { className?: string; size?: number; color?: string }) => 
      fontAwesomeRenderIcon({ name: 'users', ...props }),
    defaultProps: { size: 16, color: '#28a745' }
  });

  widgemoRegistry.registerWidgemoIcon({
    name: 'clock',
    component: (props: { className?: string; size?: number; color?: string }) => 
      fontAwesomeRenderIcon({ name: 'clock', ...props }),
    defaultProps: { size: 16, color: '#6c757d' }
  });

  widgemoRegistry.registerWidgemoIcon({
    name: 'plus',
    component: (props: { className?: string; size?: number; color?: string }) => 
      fontAwesomeRenderIcon({ name: 'plus', ...props }),
    defaultProps: { size: 16, color: '#007bff' }
  });

  widgemoRegistry.registerWidgemoIcon({
    name: 'edit',
    component: (props: { className?: string; size?: number; color?: string }) => 
      fontAwesomeRenderIcon({ name: 'edit', ...props }),
    defaultProps: { size: 16, color: '#ffc107' }
  });

  widgemoRegistry.registerWidgemoIcon({
    name: 'delete',
    component: (props: { className?: string; size?: number; color?: string }) => 
      fontAwesomeRenderIcon({ name: 'delete', ...props }),
    defaultProps: { size: 16, color: '#dc3545' }
  });

  widgemoRegistry.registerWidgemoIcon({
    name: 'view',
    component: (props: { className?: string; size?: number; color?: string }) => 
      fontAwesomeRenderIcon({ name: 'view', ...props }),
    defaultProps: { size: 16, color: '#17a2b8' }
  });

  widgemoRegistry.registerWidgemoIcon({
    name: 'search',
    component: (props: { className?: string; size?: number; color?: string }) => 
      fontAwesomeRenderIcon({ name: 'search', ...props }),
    defaultProps: { size: 16, color: '#6c757d' }
  });

  widgemoRegistry.registerWidgemoIcon({
    name: 'filter',
    component: (props: { className?: string; size?: number; color?: string }) => 
      fontAwesomeRenderIcon({ name: 'filter', ...props }),
    defaultProps: { size: 16, color: '#6c757d' }
  });

  widgemoRegistry.registerWidgemoIcon({
    name: 'sort',
    component: (props: { className?: string; size?: number; color?: string }) => 
      fontAwesomeRenderIcon({ name: 'sort', ...props }),
    defaultProps: { size: 16, color: '#6c757d' }
  });

  widgemoRegistry.registerWidgemoIcon({
    name: 'download',
    component: (props: { className?: string; size?: number; color?: string }) => 
      fontAwesomeRenderIcon({ name: 'download', ...props }),
    defaultProps: { size: 16, color: '#28a745' }
  });

  widgemoRegistry.registerWidgemoIcon({
    name: 'upload',
    component: (props: { className?: string; size?: number; color?: string }) => 
      fontAwesomeRenderIcon({ name: 'upload', ...props }),
    defaultProps: { size: 16, color: '#007bff' }
  });

  widgemoRegistry.registerWidgemoIcon({
    name: 'star',
    component: (props: { className?: string; size?: number; color?: string }) => 
      fontAwesomeRenderIcon({ name: 'star', ...props }),
    defaultProps: { size: 16, color: '#ffc107' }
  });

  widgemoRegistry.registerWidgemoIcon({
    name: 'heart',
    component: (props: { className?: string; size?: number; color?: string }) => 
      fontAwesomeRenderIcon({ name: 'heart', ...props }),
    defaultProps: { size: 16, color: '#dc3545' }
  });
  */
  
  return (
    <WidgemoThemeProvider theme={currentTheme}>
      <div className="App" style={{ 
        minHeight: '100vh',
        color: 'var(--app-text-primary)',
        transition: 'color 0.3s ease'
      }}>
        <AppNavbar />

        <div style={{ marginTop: '56px' }}>
          <Routes>
            <Route
              path="/"
              element={<MainPage />}
            />
            <Route
              path="/sandbox"
              element={<SandboxPage />}
            />
            <Route
              path="/simplified-test"
              element={<SimplifiedTest />}
            />
          </Routes>
        </div>
      </div>
    </WidgemoThemeProvider>
  );
}

function App() {
  console.log('🚀 App component rendering');
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
