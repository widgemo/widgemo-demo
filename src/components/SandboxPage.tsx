import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import { SandboxSection } from './SandboxSection';
import { defaultSandboxConfig, teaserSampleData, galleryConfigs } from '../data/sampleData';

export const SandboxPage: React.FC = () => {
  const { currentTheme } = useTheme();
  const [searchParams] = useSearchParams();

  // Get initial config from URL params
  const initialConfig = useMemo(() => {
    const configId = searchParams.get('config');
    if (configId) {
      const configItem = galleryConfigs.find(item => item.id === configId);
      if (configItem) {
        // For gallery configs, don't inject theme properties so they use core defaults
        return configItem.config;
      }
    }
    // For default sandbox, don't inject theme properties so it uses core defaults
    return defaultSandboxConfig;
  }, [searchParams]);

  // Get initial theme mode - use 'defaults' for gallery configs, 'config' for default
  const initialThemeMode = useMemo(() => {
    const configId = searchParams.get('config');
    return configId ? 'defaults' : 'config';
  }, [searchParams]);

  const initialData = useMemo(() => {
    const configId = searchParams.get('config');
    if (configId) {
      const configItem = galleryConfigs.find(item => item.id === configId);
      return configItem?.data || teaserSampleData;
    }
    return teaserSampleData;
  }, [searchParams]);

  return (
    <div className={`${currentTheme}`} style={{ 
      position: 'fixed',
      top: '56px', // Account for navbar height
      left: 0,
      right: 0,
      bottom: 0,
      width: '100vw',
      height: 'calc(100vh - 56px)',
      overflow: 'hidden',
      background: `linear-gradient(to bottom, var(--border-color) 0%, var(--bg-color) 100%) fixed`,
      backgroundSize: '100% 100vh'
    }}>
      <SandboxSection
        key={searchParams.get('config') || 'default'}
        initialConfig={initialConfig}
        initialData={initialData}
        initialThemeMode={initialThemeMode}
        currentTheme={currentTheme}
      />
    </div>
  );
};